/**
 * POST /api/generate — Backend proxy do Gemini API
 *
 * Kluczowe: klucz API NIGDY nie trafia do klienta.
 * Odczytywany z process.env.GEMINI_API_KEY (plik .env.local, nie commitowany).
 *
 * Rozwiązuje krytyczny problem bezpieczeństwa z:
 * plans/captionforge-audit-i-roadmap.md — Plan 1 (Proxy dla klucza API)
 *
 * P0 — niezawodność (PLAN_generator-niezawodnosc-p0.md):
 * - AbortController z timeoutem 25 s per próba
 * - Retry z exponential backoff (3 próby) dla 429/5xx i błędów sieciowych
 * - responseSchema (Structured Output) — wymusza kontrakt JSON od Gemini
 * - Obsługa finishReason: MAX_TOKENS / brak kandydatów → fallback do mocka
 * - Logging diagnostyczny: requestId, attempt, latencyMs, source
 */
import { NextRequest, NextResponse } from "next/server";
import { buildGeminiPrompt, parseGeminiResponse, GENERATE_RESPONSE_SCHEMA } from "@/lib/gemini-prompt";
import { generateMockResult } from "@/lib/mock-templates";
import { GenerateRequestSchema } from "@/types/generator";

export const runtime = "nodejs";

// ── Soft rate limiting (in-memory, per IP) ───────────────────────────────────
const ipCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30; // max 30 req / godzinę
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ── Retry config ─────────────────────────────────────────────────────────────
const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const BACKOFF_MS = [500, 1500, 4000] as const;
const TIMEOUT_MS = 25_000;
const MAX_ATTEMPTS = 3;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();

  // Rate limit
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Zbyt wiele zapytań. Spróbuj za godzinę." },
      { status: 429 }
    );
  }

  // Parse + validate body
  const body: unknown = await req.json().catch(() => null);
  const parseResult = GenerateRequestSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Nieprawidłowe dane", details: parseResult.error.flatten() },
      { status: 400 }
    );
  }

  const params = parseResult.data;

  // API key check
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    console.error(
      "[/api/generate] Brak GEMINI_API_KEY — ustaw zmienną w .env.local"
    );
    // Zamiast 500 — zwróć mock z flagą, żeby dev mógł pracować bez klucza
    const mockResult = generateMockResult(params);
    console.info(
      JSON.stringify({ requestId, totalLatencyMs: Date.now() - startedAt, source: mockResult.source })
    );
    return NextResponse.json(mockResult);
  }

  // Call Gemini API z retry/backoff
  const geminiModel = "gemini-2.0-flash-lite";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;
  const prompt = buildGeminiPrompt(params);

  interface GeminiApiResponse {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
      finishReason?: string;
    }>;
  }

  async function callGeminiOnce(attempt: number): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const t0 = Date.now();
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
            responseMimeType: "application/json",
            responseSchema: GENERATE_RESPONSE_SCHEMA,
          },
        }),
      });
      console.info(
        JSON.stringify({ requestId, attempt, status: res.status, latencyMs: Date.now() - t0 })
      );
      return res;
    } finally {
      clearTimeout(timer);
    }
  }

  let geminiRes: Response | null = null;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      geminiRes = await callGeminiOnce(attempt);
      if (geminiRes.ok) break;
      if (!RETRYABLE_STATUSES.has(geminiRes.status)) break; // 4xx non-429 → nie retryuj
    } catch (err) {
      lastError = err;
      console.warn(
        JSON.stringify({ requestId, attempt, error: err instanceof Error ? err.message : String(err) })
      );
    }
    if (attempt < MAX_ATTEMPTS) {
      const jitter = Math.random() * 250;
      await sleep((BACKOFF_MS[attempt - 1] ?? 500) + jitter);
    }
  }

  // Wszystkie próby rzuciły wyjątek (np. sieć niedostępna)
  if (geminiRes === null) {
    console.warn(
      JSON.stringify({ requestId, event: "all_retries_failed", error: lastError instanceof Error ? lastError.message : String(lastError) })
    );
    const mockResult = generateMockResult(params);
    console.info(
      JSON.stringify({ requestId, totalLatencyMs: Date.now() - startedAt, source: mockResult.source })
    );
    return NextResponse.json(mockResult);
  }

  // Gemini rate limit (429) po wyczerpaniu retry → fallback na mock
  if (geminiRes.status === 429) {
    console.warn(
      JSON.stringify({ requestId, event: "gemini_rate_limit_exhausted" })
    );
    const mockResult = { ...generateMockResult(params), source: "mock" as const };
    console.info(
      JSON.stringify({ requestId, totalLatencyMs: Date.now() - startedAt, source: mockResult.source })
    );
    return NextResponse.json(mockResult);
  }

  // Inne błędy HTTP (5xx po retry, 4xx non-429) → zwróć błąd do klienta
  if (!geminiRes.ok) {
    const errorData = (await geminiRes.json().catch(() => ({}))) as {
      error?: { message?: string };
    };
    const msg = errorData.error?.message ?? geminiRes.statusText;
    console.error(
      JSON.stringify({ requestId, event: "gemini_error", status: geminiRes.status, msg })
    );
    return NextResponse.json(
      { error: `Gemini API error: ${msg}` },
      { status: 502 }
    );
  }

  // Sukces — parsuj odpowiedź
  const data = (await geminiRes.json()) as GeminiApiResponse;

  // Sprawdź finishReason
  const finishReason = data.candidates?.[0]?.finishReason;
  if (finishReason === "MAX_TOKENS") {
    console.warn(
      JSON.stringify({ requestId, event: "finish_reason_max_tokens" })
    );
    const mockResult = generateMockResult(params);
    console.info(
      JSON.stringify({ requestId, totalLatencyMs: Date.now() - startedAt, source: mockResult.source, finishReason })
    );
    return NextResponse.json(mockResult);
  }

  // Brak kandydatów lub brak tekstu → fallback
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    console.warn(
      JSON.stringify({ requestId, event: "no_candidates_or_text", finishReason })
    );
    const mockResult = generateMockResult(params);
    console.info(
      JSON.stringify({ requestId, totalLatencyMs: Date.now() - startedAt, source: mockResult.source })
    );
    return NextResponse.json(mockResult);
  }

  // parseGeminiResponse obsługuje walidację Zod + fallback do mocka wewnętrznie
  const result = parseGeminiResponse(data, params);

  console.info(
    JSON.stringify({ requestId, totalLatencyMs: Date.now() - startedAt, source: result.source, finishReason })
  );

  return NextResponse.json(result);
}

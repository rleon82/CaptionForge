/**
 * POST /api/generate — Backend proxy do Gemini API
 *
 * Kluczowe: klucz API NIGDY nie trafia do klienta.
 * Odczytywany z process.env.GEMINI_API_KEY (plik .env.local, nie commitowany).
 *
 * Rozwiązuje krytyczny problem bezpieczeństwa z:
 * plans/captionforge-audit-i-roadmap.md — Plan 1 (Proxy dla klucza API)
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildGeminiPrompt, parseGeminiResponse } from "@/lib/gemini-prompt";
import { generateMockResult } from "@/lib/mock-templates";

export const runtime = "nodejs";

// ── Zod schema — wspólna walidacja client + server ──────────────────────────
const GenerateRequestSchema = z.object({
  platform: z.enum(["instagram", "tiktok", "linkedin", "twitter", "facebook"]),
  tone: z.enum(["inspirational", "professional", "casual", "humorous", "educational"]),
  niche: z.string().max(100).default(""),
  language: z.enum(["pl", "en"]),
  topic: z.string().min(1, "Temat posta jest wymagany").max(200),
});

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

// ── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
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
    return NextResponse.json(generateMockResult(params));
  }

  // Call Gemini API
  const geminiModel = "gemini-2.0-flash";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;
  const prompt = buildGeminiPrompt(params);

  try {
    const geminiRes = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 2048 },
      }),
    });

    // Rate limit from Gemini → fallback na mock
    if (geminiRes.status === 429) {
      console.warn("[/api/generate] Gemini rate limit (429) — fallback na mock");
      return NextResponse.json({
        ...generateMockResult(params),
        source: "mock" as const,
      });
    }

    if (!geminiRes.ok) {
      const errorData = (await geminiRes.json().catch(() => ({}))) as {
        error?: { message?: string };
      };
      const msg = errorData.error?.message ?? geminiRes.statusText;
      return NextResponse.json(
        { error: `Gemini API error: ${msg}` },
        { status: 502 }
      );
    }

    const data = (await geminiRes.json()) as Parameters<typeof parseGeminiResponse>[0];
    const result = parseGeminiResponse(data, params);
    return NextResponse.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/generate] fetch error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

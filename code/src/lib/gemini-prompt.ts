/**
 * Funkcje do budowania promptu dla Gemini API i parsowania odpowiedzi.
 * Port z plans/gemini-api-integration.md (buildGeminiPrompt, parseGeminiResponse).
 *
 * P0 — niezawodność:
 * - GENERATE_RESPONSE_SCHEMA: Structured Output dla Gemini (wymusza kontrakt JSON)
 * - parseGeminiResponse: walidacja Zod + twarda walidacja `reach` + fallback do mocka
 */
import type { GenerateRequest, GenerateResult, Hashtag } from "@/types/generator";
import {
  GenerateResultPayloadSchema,
  HashtagReachSchema,
} from "@/types/generator";
import { generateMockResult } from "./mock-templates";

const PLATFORM_TIPS: Record<string, string> = {
  instagram: "Instagram — używaj emoji, zachęcaj do interakcji, max 2200 znaków",
  tiktok: "TikTok — krótko i dynamicznie, nawiązuj do trendów, max 300 znaków",
  linkedin: "LinkedIn — profesjonalnie, z wartością merytoryczną, storytelling",
  twitter: "X/Twitter — zwięźle, max 280 znaków, angażująco",
  facebook: "Facebook — konwersacyjnie, zachęcaj do dyskusji",
};

const TONE_DESCRIPTIONS: Record<string, string> = {
  inspirational: "inspirujący i motywujący",
  professional: "profesjonalny i ekspercki",
  casual: "luźny i przyjacielski",
  humorous: "humorystyczny i zabawny",
  educational: "edukacyjny i informacyjny",
};

const REACH_LABELS: Record<string, Record<string, string>> = {
  large: { pl: "🔥 Duży zasięg", en: "🔥 High reach" },
  medium: { pl: "📈 Średni zasięg", en: "📈 Medium reach" },
  small: { pl: "🎯 Niszowy", en: "🎯 Niche" },
};

/**
 * JSON Schema dla Gemini Structured Output.
 * Wymusza dokładny kontrakt odpowiedzi — eliminuje losowe łamanie formatu JSON.
 * Używany w generationConfig.responseSchema w route.ts.
 */
export const GENERATE_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    captions: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          text: { type: "string" },
          variant: { type: "string" },
        },
        required: ["id", "text", "variant"],
      },
    },
    hashtags: {
      type: "array",
      minItems: 10,
      maxItems: 15,
      items: {
        type: "object",
        properties: {
          tag: { type: "string" },
          reach: { type: "string", enum: ["large", "medium", "small"] },
        },
        required: ["tag", "reach"],
      },
    },
  },
  required: ["captions", "hashtags"],
} as const;

export function buildGeminiPrompt(params: GenerateRequest): string {
  const { platform, tone, niche, language, topic } = params;
  const langName = language === "pl" ? "polski" : "angielski";

  return `Jesteś ekspertem od social media copywritingu.

Wygeneruj dokładnie 3 różne warianty opisu posta oraz 10-15 hasztagów.

PARAMETRY:
- Platforma: ${PLATFORM_TIPS[platform] ?? platform}
- Ton głosu: ${TONE_DESCRIPTIONS[tone] ?? tone}
- Nisza/branża: ${niche || "ogólna"}
- Temat posta: ${topic}
- Język: ${langName}

WYMAGANIA DLA OPISÓW:
1. Każdy wariant musi mieć inny styl/podejście
2. Dopasuj długość do specyfiki platformy
3. Używaj emoji odpowiednio do tonu
4. Zakończ call-to-action lub pytaniem angażującym

WYMAGANIA DLA HASZTAGÓW:
1. Mix popularnych i niszowych hasztagów
2. Dopasowane do branży: ${niche || "ogólna"}
3. Oznacz każdy hasztag zasięgiem: large, medium lub small

ODPOWIEDZ W FORMACIE JSON — TYLKO JSON, bez dodatkowego tekstu:
{
  "captions": [
    {"id": 1, "text": "treść opisu 1", "variant": "Wariant 1"},
    {"id": 2, "text": "treść opisu 2", "variant": "Wariant 2"},
    {"id": 3, "text": "treść opisu 3", "variant": "Wariant 3"}
  ],
  "hashtags": [
    {"tag": "#hashtag1", "reach": "large"},
    {"tag": "#hashtag2", "reach": "medium"},
    {"tag": "#hashtag3", "reach": "small"}
  ]
}

Wartości reach: "large" = popularny, "medium" = średni, "small" = niszowy.
Pisz w języku: ${langName}.`;
}

interface GeminiApiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
    finishReason?: string;
  }>;
}

export function parseGeminiResponse(
  data: GeminiApiResponse,
  params: GenerateRequest
): GenerateResult {
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    console.warn("[parseGeminiResponse] Brak treści w odpowiedzi Gemini — fallback na mock");
    return generateMockResult(params);
  }

  // Gemini czasem zwraca JSON w bloku markdown — czyścimy
  const cleanJson = rawText
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanJson);
  } catch (err) {
    console.warn("[parseGeminiResponse] JSON.parse failed — fallback na mock:", err);
    return generateMockResult(params);
  }

  // Ścisła walidacja Zod
  const validation = GenerateResultPayloadSchema.safeParse(parsed);
  if (!validation.success) {
    console.warn(
      "[parseGeminiResponse] Zod validation failed — fallback na mock:",
      validation.error.flatten()
    );
    return generateMockResult(params);
  }

  const payload = validation.data;
  const lang = params.language;

  // Twarda walidacja `reach` z fallbackiem do "medium"
  const invalidReachValues: string[] = [];
  const hashtags: Hashtag[] = payload.hashtags.map((h) => {
    const reachResult = HashtagReachSchema.safeParse(h.reach);
    if (!reachResult.success) {
      invalidReachValues.push(h.reach);
      return {
        tag: h.tag,
        reach: "medium" as const,
        label: REACH_LABELS["medium"]?.[lang] ?? "📈 Średni zasięg",
      };
    }
    return {
      tag: h.tag,
      reach: reachResult.data,
      label: REACH_LABELS[reachResult.data]?.[lang] ?? reachResult.data,
    };
  });

  if (invalidReachValues.length > 0) {
    console.warn(
      `[parseGeminiResponse] Nieprawidłowe wartości reach (zamienione na "medium"): ${invalidReachValues.join(", ")}`
    );
  }

  return {
    captions: payload.captions,
    hashtags,
    platform: params.platform,
    tone: params.tone,
    language: params.language,
    source: "gemini",
  };
}

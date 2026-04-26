/**
 * Funkcje do budowania promptu dla Gemini API i parsowania odpowiedzi.
 * Port z plans/gemini-api-integration.md (buildGeminiPrompt, parseGeminiResponse).
 */
import type { GenerateRequest, GenerateResult, Hashtag } from "@/types/generator";
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
  }>;
}

export function parseGeminiResponse(
  data: GeminiApiResponse,
  params: GenerateRequest
): GenerateResult {
  try {
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("Brak treści w odpowiedzi Gemini");
    }

    // Gemini czasem zwraca JSON w bloku markdown — czyścimy
    const cleanJson = rawText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleanJson) as {
      captions?: Array<{ id: number; text: string; variant: string }>;
      hashtags?: Array<{ tag: string; reach: string }>;
    };

    const lang = params.language;

    const hashtags: Hashtag[] = (parsed.hashtags ?? []).map((h) => ({
      tag: h.tag,
      reach: (h.reach as Hashtag["reach"]) ?? "medium",
      label: REACH_LABELS[h.reach]?.[lang] ?? h.reach,
    }));

    return {
      captions: parsed.captions ?? [],
      hashtags,
      platform: params.platform,
      tone: params.tone,
      language: params.language,
      source: "gemini",
    };
  } catch (err) {
    console.error("Błąd parsowania odpowiedzi Gemini:", err);
    // Fallback na mock — użytkownik i tak dostanie wynik
    return generateMockResult(params);
  }
}

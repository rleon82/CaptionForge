/**
 * Typy dla generatora opisów — CaptionForge
 * Używane przez formularz (client), API route (server) i wyniki (client)
 *
 * Enums Platform / Tone / Language są definiowane przez schematy Zod —
 * dzięki z.infer jedno źródło prawdy (DRY) między typami a walidacją runtime.
 */
import { z } from "zod";

// ── Schematy Zod (importowane też przez route.ts) ────────────────────────────
export const PlatformSchema = z.enum([
  "instagram",
  "tiktok",
  "linkedin",
  "twitter",
  "facebook",
]);

export const ToneSchema = z.enum([
  "inspirational",
  "professional",
  "casual",
  "humorous",
  "educational",
]);

export const LanguageSchema = z.enum(["pl", "en"]);

export const HashtagReachSchema = z.enum(["large", "medium", "small"]);

/**
 * Schema opisująca payload zwracany przez Gemini wewnątrz parts[0].text.
 * Używana w parseGeminiResponse do ścisłej walidacji odpowiedzi AI.
 */
export const GenerateResultPayloadSchema = z.object({
  captions: z
    .array(
      z.object({
        id: z.number().int(),
        text: z.string().min(1),
        variant: z.string().min(1),
      })
    )
    .min(3)
    .max(3),
  hashtags: z
    .array(
      z.object({
        tag: z.string().min(1),
        reach: z.string(), // twarda walidacja przez HashtagReachSchema w parseGeminiResponse
      })
    )
    .min(10)
    .max(15),
});

export type GenerateResultPayload = z.infer<typeof GenerateResultPayloadSchema>;

export const GenerateRequestSchema = z.object({
  platform: PlatformSchema,
  tone: ToneSchema,
  niche: z.string().max(100).default(""),
  language: LanguageSchema,
  topic: z.string().min(1, "Temat posta jest wymagany").max(200),
});

// ── Typy wyprowadzone z schematów (z.infer) ───────────────────────────────────
export type Platform = z.infer<typeof PlatformSchema>;
export type Tone = z.infer<typeof ToneSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type HashtagReach = z.infer<typeof HashtagReachSchema>;
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export interface Caption {
  id: number;
  text: string;
  variant: string;
}

export interface Hashtag {
  tag: string;
  reach: HashtagReach;
  label?: string; // "🔥 Duży zasięg" / "📈 Średni" / "🎯 Niszowy"
}

export interface GenerateResult {
  captions: Caption[];
  hashtags: Hashtag[];
  platform: Platform;
  tone: Tone;
  language: Language;
  /** 'gemini' | 'mock' — informuje UI o źródle */
  source: "gemini" | "mock";
}

/** Stan UI generatora */
export type GeneratorState =
  | { status: "idle" }
  | { status: "loading"; stage: number }
  | { status: "success"; result: GenerateResult }
  | { status: "error"; message: string };

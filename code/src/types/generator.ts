/**
 * Typy dla generatora opisów — CaptionForge
 * Używane przez formularz (client), API route (server) i wyniki (client)
 */

export type Platform =
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "twitter"
  | "facebook";

export type Tone =
  | "inspirational"
  | "professional"
  | "casual"
  | "humorous"
  | "educational";

export type Language = "pl" | "en";

export type HashtagReach = "large" | "medium" | "small";

export interface GenerateRequest {
  platform: Platform;
  tone: Tone;
  niche: string;
  language: Language;
  topic: string;
}

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

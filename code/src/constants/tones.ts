import type { Tone } from "@/types/generator";

export interface ToneMeta {
  id: Tone;
  label: string;
  emoji: string;
  description: string;
}

export const TONES: readonly ToneMeta[] = [
  {
    id: "inspirational",
    label: "Inspirujący",
    emoji: "✨",
    description: "inspirujący i motywujący",
  },
  {
    id: "professional",
    label: "Profesjonalny",
    emoji: "💼",
    description: "profesjonalny i ekspercki",
  },
  {
    id: "casual",
    label: "Casualowy",
    emoji: "😎",
    description: "luźny i przyjacielski",
  },
  {
    id: "humorous",
    label: "Humorystyczny",
    emoji: "😄",
    description: "humorystyczny i zabawny",
  },
  {
    id: "educational",
    label: "Edukacyjny",
    emoji: "📚",
    description: "edukacyjny i informacyjny",
  },
] as const;

export const TONE_MAP = Object.fromEntries(
  TONES.map((t) => [t.id, t])
) as Record<Tone, ToneMeta>;

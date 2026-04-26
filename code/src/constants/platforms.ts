import type { Platform } from "@/types/generator";

export interface PlatformMeta {
  id: Platform;
  label: string;
  emoji: string;
  tip: string;
  charLimit: number;
  charWarning: number;
  hashtagLimit: number;
}

export const PLATFORMS: readonly PlatformMeta[] = [
  {
    id: "instagram",
    label: "Instagram",
    emoji: "📸",
    tip: "Instagram – używaj emoji, zachęcaj do interakcji, max 2200 znaków",
    charLimit: 2200,
    charWarning: 2000,
    hashtagLimit: 30,
  },
  {
    id: "tiktok",
    label: "TikTok",
    emoji: "🎵",
    tip: "TikTok – krótko i dynamicznie, nawiązuj do trendów, max 300 znaków",
    charLimit: 300,
    charWarning: 250,
    hashtagLimit: 5,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    emoji: "💼",
    tip: "LinkedIn – profesjonalnie, z wartością merytoryczną, storytelling",
    charLimit: 3000,
    charWarning: 2500,
    hashtagLimit: 5,
  },
  {
    id: "twitter",
    label: "X / Twitter",
    emoji: "🐦",
    tip: "X/Twitter – zwięźle, max 280 znaków, angażująco",
    charLimit: 280,
    charWarning: 250,
    hashtagLimit: 3,
  },
  {
    id: "facebook",
    label: "Facebook",
    emoji: "👥",
    tip: "Facebook – konwersacyjnie, zachęcaj do dyskusji",
    charLimit: 63206,
    charWarning: 5000,
    hashtagLimit: 10,
  },
] as const;

export const PLATFORM_MAP = Object.fromEntries(
  PLATFORMS.map((p) => [p.id, p])
) as Record<Platform, PlatformMeta>;

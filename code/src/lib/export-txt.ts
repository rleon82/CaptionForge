/**
 * ExportManager — eksport wyników generatora do pliku TXT.
 * UTF-8 BOM (\uFEFF) dla poprawnej obsługi polskich znaków w Notatniku/Excelu.
 * Port z js/features.js ExportManager.
 */
import type { GenerateRequest, GenerateResult } from "@/types/generator";
import { PLATFORM_MAP } from "@/constants/platforms";
import { TONE_MAP } from "@/constants/tones";

const REACH_EMOJIS: Record<string, string> = {
  large: "🔥",
  medium: "📈",
  small: "🎯",
};

export function buildTxt(params: GenerateRequest, result: GenerateResult): string {
  const platform = PLATFORM_MAP[params.platform]?.label ?? params.platform;
  const tone = TONE_MAP[params.tone]?.label ?? params.tone;
  const date = new Date().toLocaleString("pl-PL");

  const separator = "═".repeat(45);
  const divider = "─".repeat(45);

  const captionsText = result.captions
    .map(
      (c, i) =>
        `${c.variant.toUpperCase()}:\n${c.text}\n${i < result.captions.length - 1 ? "\n" + divider + "\n" : ""}`
    )
    .join("\n");

  const hashtagGroups = {
    large: result.hashtags.filter((h) => h.reach === "large"),
    medium: result.hashtags.filter((h) => h.reach === "medium"),
    small: result.hashtags.filter((h) => h.reach === "small"),
  };

  const hashtagsText = Object.entries(hashtagGroups)
    .filter(([, tags]) => tags.length > 0)
    .map(
      ([reach, tags]) =>
        `${REACH_EMOJIS[reach] ?? ""} ${tags.map((t) => t.tag).join(" ")}`
    )
    .join("\n");

  return [
    "CaptionForge – Wygenerowane opisy",
    `Data: ${date}`,
    `Platforma: ${platform} | Ton: ${tone}${params.niche ? ` | Nisza: ${params.niche}` : ""}`,
    "",
    separator,
    "",
    captionsText,
    "",
    separator,
    "",
    "HASZTAGI:",
    hashtagsText,
  ].join("\n");
}

export function exportTxt(params: GenerateRequest, result: GenerateResult): void {
  const content = buildTxt(params, result);
  const bom = "\uFEFF"; // UTF-8 BOM
  const blob = new Blob([bom + content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // Symulacja kliknięcia <a> — bez React renderowania
  const a = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0] ?? "2026-01-01";
  a.href = url;
  a.download = `captionforge-${params.platform}-${dateStr}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

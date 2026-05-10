"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import { PLATFORM_MAP } from "@/constants/platforms";
import { exportTxt } from "@/lib/export-txt";
import type { GeneratorState, Platform, GenerateResult, GenerateRequest } from "@/types/generator";

interface GeneratorResultsProps {
  state: GeneratorState;
  platform: Platform;
  params?: Partial<GenerateRequest>;
  onRegenerate: () => void;
}

const REACH_ICONS: Record<string, string> = {
  large: "🔥",
  medium: "📈",
  small: "🎯",
};

/** Licznik znaków per platforma */
function CharCounter({
  text,
  platform,
}: {
  text: string;
  platform: Platform;
}) {
  const limits = PLATFORM_MAP[platform];
  const count = text.length;
  const pct = (count / limits.charLimit) * 100;

  const colorClass =
    pct >= 95
      ? "text-[rgb(var(--color-danger))]"
      : pct >= 80
      ? "text-[rgb(var(--color-warning))]"
      : "text-[rgb(var(--color-success))]";

  return (
    <span className={cn("text-xs font-medium", colorClass)}>
      {count} / {limits.charLimit} znaków
    </span>
  );
}

/** Karta pojedynczego opisu */
function CaptionCard({
  caption,
  platform,
  hashtags,
}: {
  caption: GenerateResult["captions"][number];
  platform: Platform;
  hashtags: GenerateResult["hashtags"];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(caption.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [caption.text]);

  return (
    <div className="card p-5 space-y-3">
      {/* Wariant label */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--color-text-secondary))]">
          {caption.variant}
        </span>
        <CharCounter text={caption.text} platform={platform} />
      </div>

      {/* Caption text */}
      <p className="text-sm leading-relaxed">{caption.text}</p>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          "w-full py-2 rounded-xl text-sm font-medium transition-all duration-200",
          copied
            ? "bg-[rgb(var(--color-secondary)/0.15)] text-[rgb(var(--color-secondary))] border border-[rgb(var(--color-secondary)/0.3)]"
            : "btn-secondary"
        )}
      >
        {copied ? "✅ Skopiowano!" : "📋 Kopiuj opis"}
      </button>
    </div>
  );
}

export function GeneratorResults({
  state,
  platform,
  params,
  onRegenerate,
}: GeneratorResultsProps) {
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const handleCopyHashtags = useCallback(
    (result: GenerateResult) => {
      const tags = result.hashtags.map((h) => h.tag).join(" ");
      void navigator.clipboard.writeText(tags).then(() => {
        setCopiedHashtags(true);
        setTimeout(() => setCopiedHashtags(false), 2000);
      });
    },
    []
  );

  // Idle state — placeholder
  if (state.status === "idle") {
    return (
      <div className="card p-8 flex flex-col items-center justify-center text-center min-h-64">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="font-bold text-lg mb-2">Gotowy do generowania</h3>
        <p className="text-sm text-[rgb(var(--color-text-secondary))]">
          Uzupełnij formularz po lewej stronie i kliknij{" "}
          <strong>Generuj opisy</strong>, aby zobaczyć 3 unikalne warianty
          opisów.
        </p>
      </div>
    );
  }

  // Error state
  if (state.status === "error") {
    return (
      <div className="card p-8 flex flex-col items-center justify-center text-center min-h-64 border-red-200">
        <div className="text-4xl mb-4">❌</div>
        <p className="font-medium text-red-500 mb-4">{state.message}</p>
        <button onClick={onRegenerate} className="btn-secondary">
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  // Loading state
  if (state.status === "loading") {
    return (
      <div className="card p-8 flex flex-col items-center justify-center min-h-64">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-sm text-[rgb(var(--color-text-secondary))]">
          Generuję opisy… (etap {state.stage})
        </p>
      </div>
    );
  }

  // Success state
  const { result } = state;

  return (
    <div className="space-y-4">
      {/* Mock fallback banner — widoczny gdy AI niedostępne */}
      {result.source === "mock" && (
        <div className="rounded-xl border border-[rgb(var(--color-warning)/0.35)] bg-[rgb(var(--color-warning)/0.08)] px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-sm text-[rgb(var(--color-warning))]">
            <span className="mt-0.5 shrink-0">⚠️</span>
            <span>
              <strong>Tryb awaryjny — szablony</strong>
              <br />
              <span className="text-xs opacity-80">
                AI chwilowo niedostępne. Poniżej gotowe szablony — kliknij
                &ldquo;Spróbuj z AI&rdquo;, aby ponowić.
              </span>
            </span>
          </div>
          <button
            onClick={onRegenerate}
            className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[rgb(var(--color-warning)/0.4)] text-[rgb(var(--color-warning))] hover:bg-[rgb(var(--color-warning)/0.15)] transition-colors"
          >
            🔄 Spróbuj z AI
          </button>
        </div>
      )}

      {/* Caption cards */}
      {result.captions.map((caption) => (
        <CaptionCard
          key={caption.id}
          caption={caption}
          platform={platform}
          hashtags={result.hashtags}
        />
      ))}

      {/* Hashtags panel */}
      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">🏷️ Hasztagi</span>
          <button
            onClick={() => handleCopyHashtags(result)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200",
              copiedHashtags
                ? "bg-[rgb(var(--color-secondary)/0.15)] text-[rgb(var(--color-secondary))]"
                : "bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary)/0.2)]"
            )}
          >
            {copiedHashtags ? "✅ Skopiowano!" : "📋 Kopiuj wszystkie"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.hashtags.map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[rgb(var(--color-primary)/0.08)] text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary)/0.15)]"
              title={h.label}
            >
              {REACH_ICONS[h.reach]} {h.tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={onRegenerate} className="btn-secondary flex-1 text-sm">
          🔄 Generuj ponownie
        </button>
        {params && (
          <button
            onClick={() => exportTxt(params as GenerateRequest, result)}
            className="btn-secondary text-sm px-4"
            title="Eksportuj do TXT"
          >
            📥 TXT
          </button>
        )}
      </div>
    </div>
  );
}

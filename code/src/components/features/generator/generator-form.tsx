"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import { PLATFORMS } from "@/constants/platforms";
import { TONES } from "@/constants/tones";
import type { GenerateRequest, Language, Platform, Tone } from "@/types/generator";

const LANGUAGES = [
  { id: "pl" as Language, label: "🇵🇱 Polski" },
  { id: "en" as Language, label: "🇬🇧 English" },
];

const MAX_TOPIC_LENGTH = 200;

interface GeneratorFormProps {
  initialValues?: Partial<GenerateRequest>;
  isLoading?: boolean;
  onSubmit: (params: GenerateRequest) => void;
  onValuesChange?: (values: Partial<GenerateRequest>) => void;
}

export function GeneratorForm({
  initialValues,
  isLoading = false,
  onSubmit,
  onValuesChange,
}: GeneratorFormProps) {
  const [platform, setPlatform] = useState<Platform>(
    initialValues?.platform ?? "instagram"
  );
  const [tone, setTone] = useState<Tone>(
    initialValues?.tone ?? "inspirational"
  );
  const [language, setLanguage] = useState<Language>(
    initialValues?.language ?? "pl"
  );
  const [niche, setNiche] = useState(initialValues?.niche ?? "");
  const [topic, setTopic] = useState(initialValues?.topic ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync external initialValues (from history restore)
  useEffect(() => {
    if (initialValues?.platform) setPlatform(initialValues.platform);
    if (initialValues?.tone) setTone(initialValues.tone);
    if (initialValues?.language) setLanguage(initialValues.language);
    if (initialValues?.niche) setNiche(initialValues.niche);
    if (initialValues?.topic) setTopic(initialValues.topic);
  }, [initialValues]);

  // Notify parent of current values
  useEffect(() => {
    onValuesChange?.({ platform, tone, niche, language, topic });
  }, [platform, tone, niche, language, topic, onValuesChange]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!topic.trim()) newErrors["topic"] = "Temat posta jest wymagany.";
    if (topic.length > MAX_TOPIC_LENGTH)
      newErrors["topic"] = `Temat nie może przekraczać ${MAX_TOPIC_LENGTH} znaków.`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ platform, tone, niche, language, topic });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
      <h3 className="font-bold text-lg">Konfiguracja</h3>

      {/* Platform */}
      <div>
        <label className="block text-sm font-medium mb-2">
          📱 Platforma
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-medium transition-all duration-200",
                platform === p.id
                  ? "border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]"
                  : "border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary)/0.5)]"
              )}
            >
              <span className="text-lg">{p.emoji}</span>
              <span className="hidden sm:block truncate w-full text-center">
                {p.id === "twitter" ? "X/TW" : p.label.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <label className="block text-sm font-medium mb-2">🎨 Ton głosu</label>
        <div className="grid grid-cols-5 gap-2">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-medium transition-all duration-200",
                tone === t.id
                  ? "border-[rgb(var(--color-secondary))] bg-[rgb(var(--color-secondary)/0.1)] text-[rgb(var(--color-secondary))]"
                  : "border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-secondary)/0.5)]"
              )}
              title={t.label}
            >
              <span className="text-lg">{t.emoji}</span>
            </button>
          ))}
        </div>
        <div className="mt-1 text-xs text-[rgb(var(--color-text-secondary))]">
          Wybrany: {TONES.find((t) => t.id === tone)?.label}
        </div>
      </div>

      {/* Niche */}
      <div>
        <label htmlFor="niche" className="block text-sm font-medium mb-2">
          🏷️ Nisza / Branża{" "}
          <span className="text-[rgb(var(--color-text-secondary))] font-normal">
            (opcjonalnie)
          </span>
        </label>
        <input
          id="niche"
          type="text"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="np. fitness, technologia, moda, kulinaria..."
          className={cn(
            "w-full px-4 py-3 rounded-xl border text-sm bg-[rgb(var(--color-surface))] transition-colors",
            "border-[rgb(var(--color-border))] focus:border-[rgb(var(--color-primary))] focus:outline-none",
            "placeholder:text-[rgb(var(--color-text-secondary))]"
          )}
        />
        <p className="mt-1 text-xs text-[rgb(var(--color-text-secondary))]">
          Im bardziej precyzyjna nisza, tym lepsze hasztagi.
        </p>
      </div>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium mb-2">🌐 Język</label>
        <div className="flex gap-3">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLanguage(l.id)}
              className={cn(
                "flex-1 py-2 rounded-xl border text-sm font-medium transition-all duration-200",
                language === l.id
                  ? "border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]"
                  : "border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary)/0.5)]"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Topic */}
      <div>
        <label htmlFor="topic" className="block text-sm font-medium mb-2">
          ✍️ Temat posta *
        </label>
        <textarea
          id="topic"
          rows={4}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Opisz krótko o czym jest post... np. 'Poranny trening HIIT 20 minut bez sprzętu'"
          className={cn(
            "w-full px-4 py-3 rounded-xl border text-sm bg-[rgb(var(--color-surface))] transition-colors resize-none",
            errors["topic"]
              ? "border-red-400 focus:border-red-500"
              : "border-[rgb(var(--color-border))] focus:border-[rgb(var(--color-primary))]",
            "focus:outline-none placeholder:text-[rgb(var(--color-text-secondary))]"
          )}
        />
        {/* Character counter */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-red-500">{errors["topic"] ?? ""}</span>
          <span
            className={cn(
              "text-xs font-medium",
              topic.length > MAX_TOPIC_LENGTH
                ? "text-red-500"
                : topic.length > MAX_TOPIC_LENGTH * 0.85
                ? "text-[rgb(var(--color-warning))]"
                : "text-[rgb(var(--color-text-secondary))]"
            )}
          >
            {topic.length} / {MAX_TOPIC_LENGTH}
          </span>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full btn-primary py-4 text-base",
          isLoading && "opacity-75 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generuję...
          </>
        ) : (
          "✨ Generuj opisy"
        )}
      </button>

      <p className="text-xs text-center text-[rgb(var(--color-text-secondary))]">
        Możesz też nacisnąć{" "}
        <kbd className="px-1.5 py-0.5 rounded border border-[rgb(var(--color-border))] text-xs">
          Ctrl
        </kbd>{" "}
        +{" "}
        <kbd className="px-1.5 py-0.5 rounded border border-[rgb(var(--color-border))] text-xs">
          Enter
        </kbd>
      </p>
    </form>
  );
}

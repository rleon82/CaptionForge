"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const LOADING_STAGES = [
  { text: "Analizuję Twój temat...", icon: "🔍" },
  { text: "Generuję 3 warianty opisów...", icon: "✍️" },
  { text: "Dobieram hasztagi dla Twojej niszy...", icon: "🏷️" },
] as const;

const STAGE_DURATION_MS = 1800;

interface ProgressBarProps {
  isActive: boolean;
  /** stage 0-2 przekazywany z zewnątrz LUB zarządzany wewnętrznie */
  stage?: number;
  className?: string;
}

/**
 * Animowany pasek postępu z etapami tekstowymi.
 * Gdy isActive=true → automatycznie przechodzi przez etapy.
 * Gdy isActive=false → ukryty.
 */
export function ProgressBar({ isActive, stage: externalStage, className }: ProgressBarProps) {
  const [internalStage, setInternalStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentStage = externalStage ?? internalStage;

  useEffect(() => {
    if (!isActive) {
      setInternalStage(0);
      setProgress(0);
      return;
    }

    // Animuj postęp od 0 do 90 przez czas trwania wszystkich etapów
    const totalDuration = STAGE_DURATION_MS * LOADING_STAGES.length;
    const start = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(90, (elapsed / totalDuration) * 90);
      setProgress(pct);
    }, 50);

    // Etapy tekstowe
    const stageTimers: ReturnType<typeof setTimeout>[] = [];
    LOADING_STAGES.forEach((_, i) => {
      if (i === 0) return;
      stageTimers.push(
        setTimeout(() => setInternalStage(i), i * STAGE_DURATION_MS)
      );
    });

    return () => {
      clearInterval(progressInterval);
      stageTimers.forEach(clearTimeout);
    };
  }, [isActive]);

  if (!isActive) return null;

  const stage = LOADING_STAGES[currentStage];

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Etap tekstowy */}
      <div className="flex items-center gap-3 text-[rgb(var(--color-text-secondary))]">
        <span className="text-2xl" aria-hidden="true">
          {stage?.icon}
        </span>
        <span className="text-sm font-medium animate-pulse">
          {stage?.text}
        </span>
      </div>

      {/* Pasek postępu */}
      <div className="h-2 w-full bg-[rgb(var(--color-border))] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-secondary)))",
          }}
        />
      </div>

      {/* Kroki */}
      <div className="flex justify-between">
        {LOADING_STAGES.map((s, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors duration-300",
              i <= currentStage
                ? "text-[rgb(var(--color-primary))] font-medium"
                : "text-[rgb(var(--color-text-secondary))]"
            )}
          >
            <span
              className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center text-xs",
                i <= currentStage
                  ? "border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.1)]"
                  : "border-[rgb(var(--color-border))]"
              )}
            >
              {i < currentStage ? "✓" : i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useHistory } from "@/hooks/useHistory";
import { HistoryEntry } from "./history-entry";
import type { GenerateRequest } from "@/types/generator";

interface HistoryPanelProps {
  onRestore: (params: GenerateRequest) => void;
}

/**
 * Collapsible panel historii generacji.
 * Pojawia się pod sekcją generatora.
 */
export function HistoryPanel({ onRestore }: HistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { entries, removeEntry, clearAll, mounted } = useHistory();

  if (!mounted) return null;
  if (entries.length === 0) return null;

  return (
    <section className="section-container pb-12">
      {/* Accordion header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface-secondary))] hover:border-[rgb(var(--color-primary)/0.4)] transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-semibold">
          📜 Historia generacji ({entries.length}{" "}
          {entries.length === 1 ? "wpis" : entries.length < 5 ? "wpisy" : "wpisów"})
        </span>
        <span
          className={cn(
            "text-[rgb(var(--color-primary))] transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        >
          ▾
        </span>
      </button>

      {/* Content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[2000px] mt-4" : "max-h-0"
        )}
      >
        <div className="space-y-3">
          {entries.map((entry) => (
            <HistoryEntry
              key={entry.id}
              entry={entry}
              onRestore={(params) => {
                onRestore(params);
                // Scroll do generatora
                document.querySelector("#generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              onDelete={removeEntry}
            />
          ))}
        </div>

        {/* Clear all */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              if (window.confirm("Czy na pewno chcesz wyczyścić całą historię?")) {
                clearAll();
              }
            }}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            🗑️ Wyczyść historię
          </button>
        </div>
      </div>
    </section>
  );
}

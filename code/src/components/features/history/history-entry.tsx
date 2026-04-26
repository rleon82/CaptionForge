"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { exportTxt } from "@/lib/export-txt";
import { PLATFORM_MAP } from "@/constants/platforms";
import type { HistoryEntry as IHistoryEntry } from "@/types/history";
import type { GenerateRequest } from "@/types/generator";

interface HistoryEntryProps {
  entry: IHistoryEntry;
  onRestore: (params: GenerateRequest) => void;
  onDelete: (id: string) => void;
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryEntry({ entry, onRestore, onDelete }: HistoryEntryProps) {
  const [expanded, setExpanded] = useState(false);
  const platform = PLATFORM_MAP[entry.params.platform];

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="text-xl flex-shrink-0">{platform?.emoji ?? "📝"}</span>
          <div className="min-w-0">
            <div className="text-xs text-[rgb(var(--color-text-secondary))] mb-0.5">
              {formatDate(entry.timestamp)} · {platform?.label ?? entry.params.platform}
            </div>
            <div className="text-sm font-medium truncate">
              {entry.params.topic.slice(0, 60)}
              {entry.params.topic.length > 60 ? "…" : ""}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onRestore(entry.params)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary)/0.2)] transition-colors"
            title="Użyj ponownie"
          >
            🔄 Użyj
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium bg-[rgb(var(--color-surface-secondary))] hover:bg-[rgb(var(--color-border))] transition-colors"
          >
            {expanded ? "▲" : "▼"} Podgląd
          </button>
          <button
            onClick={() => exportTxt(entry.params, entry.result)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium bg-[rgb(var(--color-surface-secondary))] hover:bg-[rgb(var(--color-border))] transition-colors"
            title="Eksport TXT"
          >
            📥
          </button>
          <button
            onClick={() => {
              if (window.confirm("Usunąć ten wpis z historii?")) {
                onDelete(entry.id);
              }
            }}
            className="text-xs px-2 py-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Usuń"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Expanded preview */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 border-t border-[rgb(var(--color-border))]",
          expanded ? "max-h-96 py-4" : "max-h-0"
        )}
      >
        <div className="px-4 space-y-3">
          {entry.result.captions.map((caption) => (
            <div key={caption.id} className="text-sm bg-[rgb(var(--color-surface-secondary))] p-3 rounded-xl">
              <div className="text-xs font-bold text-[rgb(var(--color-text-secondary))] mb-1">
                {caption.variant}
              </div>
              <p className="leading-relaxed">{caption.text}</p>
            </div>
          ))}
          {entry.result.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {entry.result.hashtags.slice(0, 10).map((h, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-full bg-[rgb(var(--color-primary)/0.08)] text-[rgb(var(--color-primary))]"
                >
                  {h.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

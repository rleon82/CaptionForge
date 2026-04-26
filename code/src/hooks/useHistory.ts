"use client";

import { useState, useCallback, useEffect } from "react";
import { HistoryStorage } from "@/lib/history-storage";
import type { HistoryEntry } from "@/types/history";
import type { GenerateRequest, GenerateResult } from "@/types/generator";

/**
 * Hook do zarządzania historią generacji.
 * - Ładuje historię z localStorage przy mount
 * - Udostępnia add/remove/clear + reaktywny stan
 */
export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEntries(HistoryStorage.getAll());
    setMounted(true);
  }, []);

  const addEntry = useCallback(
    (params: GenerateRequest, result: GenerateResult) => {
      const entry = HistoryStorage.add({ params, result });
      setEntries((prev) => [entry, ...prev].slice(0, 50));
      return entry;
    },
    []
  );

  const removeEntry = useCallback((id: string) => {
    HistoryStorage.remove(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    HistoryStorage.clear();
    setEntries([]);
  }, []);

  return { entries, addEntry, removeEntry, clearAll, mounted };
}

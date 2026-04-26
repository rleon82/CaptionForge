/**
 * CRUD na localStorage dla historii generacji.
 * Klucz: 'captionforge-history', max 50 wpisów (FIFO).
 * Port z js/features.js HistoryManager.
 */
import type { HistoryEntry } from "@/types/history";

const STORAGE_KEY = "captionforge-history";
const MAX_ENTRIES = 50;

function readAll(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

function writeAll(entries: HistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    // localStorage pełny — usuń najstarszy wpis i spróbuj ponownie
    console.warn("localStorage pełny, usuwam najstarszy wpis historii:", e);
    const trimmed = entries.slice(1);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // Ignoruj
    }
  }
}

export const HistoryStorage = {
  getAll(): HistoryEntry[] {
    return readAll().sort((a, b) => b.timestamp - a.timestamp);
  },

  add(entry: Omit<HistoryEntry, "id" | "timestamp">): HistoryEntry {
    const newEntry: HistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    const existing = readAll();
    const updated = [newEntry, ...existing].slice(0, MAX_ENTRIES);
    writeAll(updated);
    return newEntry;
  },

  remove(id: string): void {
    const updated = readAll().filter((e) => e.id !== id);
    writeAll(updated);
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  count(): number {
    return readAll().length;
  },
};

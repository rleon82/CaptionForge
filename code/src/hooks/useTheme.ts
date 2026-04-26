"use client";

import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "captionforge-theme";

/**
 * Hook zarządzający dark/light mode.
 * - Odczytuje preferencję z localStorage lub prefers-color-scheme
 * - Ustawia data-theme na <html> i klasę 'dark' (Tailwind)
 * - Nasłuchuje na zmiany systemowe (gdy user nie ustawił ręcznie)
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Odczytaj aktualny stan ustawiony przez anti-FOUC script
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const systemPrefers = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initial = stored ?? systemPrefers;
    setThemeState(initial);
    setMounted(true);

    // Listener na zmiany systemowe (tylko gdy user nie wybrał ręcznie)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? "dark" : "light", false);
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const applyTheme = useCallback((newTheme: Theme, persist = true) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    if (persist) {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
    setThemeState(newTheme);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
  }, [theme, applyTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      applyTheme(newTheme);
    },
    [applyTheme]
  );

  return { theme, toggle, setTheme, mounted };
}

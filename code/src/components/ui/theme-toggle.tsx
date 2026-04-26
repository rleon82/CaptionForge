"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Przycisk przełączania dark/light mode.
 * Renderuje 🌙 w light mode, ☀️ w dark mode.
 * Ukryty do momentu hydratacji (mounted) — zapobiega niepoprawnym ikonom.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) {
    // Placeholder zajmujący miejsce — bez ikony, zapobiega layout shift
    return (
      <button
        aria-label="Motyw"
        className={cn(
          "w-10 h-10 rounded-xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface-secondary))]",
          className
        )}
        disabled
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Przełącz na jasny motyw" : "Przełącz na ciemny motyw"}
      title={theme === "dark" ? "Jasny motyw" : "Ciemny motyw"}
      className={cn(
        "w-10 h-10 rounded-xl border transition-all duration-200",
        "border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface-secondary))]",
        "hover:border-[rgb(var(--color-primary)/0.5)] hover:bg-[rgb(var(--color-primary)/0.1)]",
        "flex items-center justify-center text-lg",
        "focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary))]",
        className
      )}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

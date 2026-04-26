import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS class names with conflict resolution.
 * Usage: cn("px-4 py-2", condition && "bg-primary", "bg-secondary")
 * → "px-4 py-2 bg-secondary" (bg-primary overridden)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

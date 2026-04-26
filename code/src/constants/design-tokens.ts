/**
 * Design tokens — echo wartości z globals.css dla użycia w JS (np. Chart.js, canvas)
 * Źródło prawdy: globals.css CSS vars. Ten plik tylko je dokumentuje.
 */

export const COLORS = {
  primary: "#6C5CE7",
  primaryHover: "#5A4AD5",
  secondary: "#00B894",
  accent: "#FD79A8",
  dark: "#2D3436",
  light: "#F8F9FA",
  warning: "#F59E0B",
  danger: "#E17055",
  success: "#00B894",
} as const;

export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1200,
} as const;

export const TRANSITIONS = {
  theme: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
  card: "transform 0.2s ease, box-shadow 0.2s ease",
} as const;

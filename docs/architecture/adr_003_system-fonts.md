# ADR 003 — Rezygnacja z `next/font` na rzecz systemowego stosu czcionek

## Status

**Accepted** (kwiecień 2026)

## Context

Projekt CaptionForge używa Tailwind CSS jako systemu stylowania. Reguła [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md) §6 nakazuje używanie `next/font` z subset `latin-ext`, co jest standardowym podejściem eliminującym FOUT (Flash of Unstyled Text) i przetaktowania sieci fontów webowych.

W fazie MVP zdecydowano jednak o innym podejściu.

## Decision

CaptionForge **nie importuje własnych fontów** przez `next/font`. Zamiast tego stosuje systemowy stos czcionek skonfigurowany w [`code/tailwind.config.ts`](../../code/tailwind.config.ts):

```ts
fontFamily: {
  sans: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    "sans-serif",
  ],
},
```

## Uzasadnienie

1. **Zero LCP penalty** — systemowe fonty nie wymagają żadnego pobierania. Na urządzeniach mobilnych eliminuje to typowe opóźnienie 100–400 ms generowane przez custom font (nawet z `next/font` + `preload`).
2. **Brak FOUC / FOUT** — systemowy font jest dostępny natychmiast, zanim załaduje się jakikolwiek CSS czy JS.
3. **Uproszczenie MVP** — aplikacja nie buduje tożsamości wizualnej opartej na typografii w tym etapie; fokus UX jest na treści generowanej przez AI, nie na oprawie brandingowej.
4. **Zgodność z systemem kolorów** — cały design system jest oparty na CSS custom properties i tokenach w [`code/src/app/globals.css`](../../code/src/app/globals.css); brak `next/font` nie tworzy luki w spójności.

## Consequences

**Pozytywne:**
- ✅ Natychmiastowe renderowanie tekstu — brak dodatkowych round-trips do CDN Google Fonts.
- ✅ Mniej zależności w `layout.tsx` — uproszczona konfiguracja root layout.
- ✅ Perfekcyjna spójność z OS użytkownika (macOS: San Francisco / SF Pro, Windows: Segoe UI, Android: Roboto).

**Negatywne:**
- ⚠️ Brak kontroli nad typografią inter-platformową — font wygląda inaczej na macOS vs Windows vs Linux.
- ⚠️ Ograniczenia brandingowe — przy skalowaniu produktu (v2.x+) może być konieczna migracja do dedykowanego fontu (np. Inter, DM Sans) przez `next/font`.

**Neutralne:**
- 🔵 Re-evaluacja zaplanowana po osiągnięciu Product-Market Fit — w tym momencie warto zainwestować w spójną typografię brandingową.
- 🔵 Migracja jest prosta: wystarczy dodać `next/font/google` lub `next/font/local` do [`code/src/app/layout.tsx`](../../code/src/app/layout.tsx) i przekazać `className` do `<body>` lub `<html>`.

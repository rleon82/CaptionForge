# docs/roles/ux_ui

Rola **UX/UI** w projekcie CaptionForge — strażnik ścieżki użytkownika, systemu designu i dostępności. Zapewnia, że kod implementuje doświadczenie zaprojektowane w User Journey Map.

## Zakres odpowiedzialności

- Utrzymanie i aktualizacja [`docs/business/User_Journey_Map.md`](../../business/User_Journey_Map.md) — Journey MVP, Journey Docelowa, Gap Analysis.
- **System designu** — kolory, typografia, breakpointy zaimplementowane jako CSS Custom Properties w [`code/src/app/globals.css`](../../../code/src/app/globals.css) i mapowane w [`code/tailwind.config.ts`](../../../code/tailwind.config.ts).
- **Tokeny designu** — [`code/src/constants/design-tokens.ts`](../../../code/src/constants/design-tokens.ts) jako dokumentacja CSS vars.
- **Spójność komponentów UI** — atomowe komponenty w [`code/src/components/ui/`](../../../code/src/components/ui) (Button, ThemeToggle, ProgressBar, Toast).
- **Dostępność (WCAG)** — kontrast, nawigacja klawiaturą, semantyczny HTML, ARIA labels.
- **Definiowanie wymagań UX** w sekcji 4.3 (UX/DX) każdego nowego planu SDD.

## Kluczowe artefakty

| Artefakt | Lokalizacja | Status |
|----------|-------------|--------|
| User Journey Map | [`docs/business/User_Journey_Map.md`](../../business/User_Journey_Map.md) | ✅ Aktualne (MVP + Docelowa) |
| Globalne style + CSS vars | [`code/src/app/globals.css`](../../../code/src/app/globals.css) | ✅ Wdrożone |
| Konfiguracja Tailwind | [`code/tailwind.config.ts`](../../../code/tailwind.config.ts) | ✅ Wdrożona (`darkMode: ["class", '[data-theme="dark"]']`) |
| Tokeny designu | [`code/src/constants/design-tokens.ts`](../../../code/src/constants/design-tokens.ts) | ✅ Dokumentacja CSS vars |
| Atomowe komponenty UI | [`code/src/components/ui/`](../../../code/src/components/ui) | ✅ 4 komponenty (Button, ThemeToggle, ProgressBar, Toast) |
| Dark mode (anti-FOUC) | [`code/src/app/layout.tsx`](../../../code/src/app/layout.tsx) | ✅ Inline script przed hydratacją |

## Typowe zadania w cyklu SDD

1. **Aktualizacja User Journey** — przy nowej funkcjonalności dodaj/zmodyfikuj odpowiedni Stage w [`docs/business/User_Journey_Map.md`](../../business/User_Journey_Map.md) (Friction Points, Aha Moment, oczekiwany czas przejścia).
2. **Audyt spójności designu** — przed review planu sprawdź, czy nowe komponenty używają tokenów z [`code/src/constants/design-tokens.ts`](../../../code/src/constants/design-tokens.ts) i klas Tailwind zgodnie z konwencją kolejności (layout → spacing → sizing → typography → colors → effects → responsive → dark) z [`dev-coding-rules.md`](../../../kilocode/rules/dev-coding-rules.md) sekcja 5.1.
3. **Audyt dostępności** — sprawdź kontrast (light + dark), nawigację Tab, ARIA dla interaktywnych elementów (przyciski, formularze, accordion FAQ).
4. **Definiowanie wymagań UX w planie** — w sekcji 4.3 nowego planu SDD opisz: oczekiwany flow użytkownika, klasy `dark:` (jeśli dotyczy), responsywność (mobile-first), keyboard accessibility.
5. **Walidacja TM (testów manualnych)** — testy z list TM1, TM2, … w sekcji 8.3 planu wymagają oględzin UI; UX/UI je wykonuje i raportuje wynik.

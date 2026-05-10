# docs/roles/tester

Rola **Tester** w projekcie CaptionForge — strażnik jakości i Definition of Done. Definiuje sekcję 8 (Testy) każdego planu, pisze testy automatyczne dla nowych funkcjonalności i wykonuje testy manualne przed zamknięciem planu.

## Zakres odpowiedzialności

- **Definiowanie sekcji 8 (Testy)** w każdym nowym planie SDD — kategorie unit / integracyjne / manualne, kryteria zakończenia.
- **Testy unit** — Vitest / Jest dla [`code/src/lib/`](../../../code/src/lib) (czyste funkcje) i [`code/src/hooks/`](../../../code/src/hooks) (custom React hooks).
- **Testy integracyjne** — Route Handlerów ([`code/src/app/api/`](../../../code/src/app/api)) z mockowanym Gemini; flow UI z React Testing Library / Playwright.
- **Testy manualne** — wykonanie listy TM1, TM2, … z sekcji 8.3 każdego planu; raportowanie wyników (✅ / ❌ z opisem).
- **Weryfikacja Definition of Done** — przed oznaczeniem planu jako ukończony sprawdź wszystkie KA z sekcji 7 z dowodami (komendy + exit codes lub logi).
- **Audyt edge-case** — przy nowych funkcjonalnościach: pusta tablica, null/undefined, polskie znaki, długie łańcuchy (>200 znaków), HTTP timeouts, rate limiting.

## Kluczowe artefakty

| Artefakt | Lokalizacja | Status |
|----------|-------------|--------|
| Sekcja 8 każdego planu | [`docs/plans/PLAN_*.md`](../../plans) | ✅ Wymagana w szablonie SDD |
| Testy unit | `code/src/lib/*.test.ts`, `code/src/hooks/*.test.ts` | ⏳ Brak — do dodania w przyszłych planach |
| Testy integracyjne | `code/src/app/api/**/*.test.ts` | ⏳ Brak — do dodania |
| Testy E2E (Playwright) | `code/e2e/*.spec.ts` | ⏳ Brak — do rozważenia |
| Rate limit + Zod walidacja | [`code/src/app/api/generate/route.ts`](../../../code/src/app/api/generate/route.ts) | ✅ Wdrożone (30 req/h/IP, Zod schema) |
| Komendy weryfikacyjne | `cd code && npx tsc --noEmit && npm run lint && npm run build` | ✅ Obowiązkowe przed każdym DoD |

## Typowe zadania w cyklu SDD

1. **Pisanie sekcji 8 planu** — przy każdym nowym planie SDD wypełnij sekcje 8.1 (Unit), 8.2 (Integracyjne), 8.3 (Manualne) zgodnie z wytycznymi z [`dev-plan-workflow.md`](../../../kilocode/rules/dev-plan-workflow.md) sekcja 3.3. Dla planów meta-warstwy (dokumentacja, struktura katalogów) — `Nie dotyczy` w 8.1 i 8.2.
2. **Pisanie testów unit (Vitest)** — dla każdej nowej funkcji w [`code/src/lib/`](../../../code/src/lib) (np. `export-txt.ts`, `gemini-prompt.ts`) i każdego hooka w [`code/src/hooks/`](../../../code/src/hooks) (np. `useHistory.ts`, `useTheme.ts`). Pliki kolokowane: `[nazwa].test.ts`.
3. **Pisanie testów integracyjnych** — dla Route Handlerów (np. mock Gemini API + sprawdzenie walidacji Zod, rate limit, fallback na mock); dla flow UI (RTL — formularz → submit → wynik).
4. **Wykonanie testów manualnych** — z sekcji 8.3 planu: każdy TM opisuje co otworzyć / co kliknąć / oczekiwany rezultat. Raportuj wynik w sekcji 5 raportu workflow `implement` ([`dev-implement-workflow.md`](../../../kilocode/rules/dev-implement-workflow.md) sekcja 5).
5. **Weryfikacja KA przed zamknięciem planu** — przed `attempt_completion` (krok 6 workflow) sprawdź wszystkie KA z sekcji 7 planu z dowodem; jeśli któreś niespełnione — `ask_followup_question` zamiast „domknięcia" planu.

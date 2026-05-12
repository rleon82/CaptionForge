# docs/roles/developer

Rola **Developer** w projekcie CaptionForge — wykonawca planów SDD. Zamienia plan z [`docs/plans/PLAN_*.md`](../../plans) na działający kod plus zaktualizowane rejestry, zgodnie z formalnym 6-krokowym workflow.

## Zakres odpowiedzialności

- **Implementacja planów** zgodnie z [`kilocode/rules/dev-implement-workflow.md`](../../../kilocode/rules/dev-implement-workflow.md) — workflow 6-krokowy: Read → Verify → Implement → Test → Update Registries → Report.
- **Przestrzeganie standardów** z [`kilocode/rules/dev-coding-rules.md`](../../../kilocode/rules/dev-coding-rules.md) — Next.js App Router, TypeScript strict, Tailwind CSS, zakaz `any`, zakaz `dangerouslySetInnerHTML` bez sanityzacji.
- **Weryfikacja jakości kodu** — przed zamknięciem każdego planu obowiązkowo zielony wynik:
  ```bash
  cd code && npx tsc --noEmit && npm run lint && npm run build
  ```
- **Aktualizacja rejestrów** [`implemented_plans.md`](../../architecture/implemented_plans.md) i [`implemented_features.md`](../../architecture/implemented_features.md) po każdym wdrożeniu (krok 5 workflow).
- **Zakaz rozszerzania zakresu (YAGNI)** — implementacja wyłącznie tego, co jest w sekcji 2.1 planu.
- **Zakaz refaktorów poza planem** — modyfikacja wyłącznie plików z sekcji 5.1 planu.

## Kluczowe artefakty

| Artefakt | Lokalizacja | Status |
|----------|-------------|--------|
| Aplikacja Next.js | [`code/src/`](../../../code/src) | ✅ Produkcja |
| Standardy kodowania | [`kilocode/rules/dev-coding-rules.md`](../../../kilocode/rules/dev-coding-rules.md) | ✅ Aktualne |
| Workflow planowania | [`kilocode/rules/dev-plan-workflow.md`](../../../kilocode/rules/dev-plan-workflow.md) | ✅ Szablon SDD (8 sekcji) |
| Workflow implementacji | [`kilocode/rules/dev-implement-workflow.md`](../../../kilocode/rules/dev-implement-workflow.md) | ✅ 6-krokowy proces |
| Konfiguracja TypeScript | [`code/tsconfig.json`](../../../code/tsconfig.json) | ✅ Strict + noUncheckedIndexedAccess |
| Zależności | [`code/package.json`](../../../code/package.json) | ✅ Next 14.2, React 18, Zod 3 |
| Rejestr planów | [`implemented_plans.md`](../../architecture/implemented_plans.md) | ✅ Aktualizowany po każdym planie |
| Rejestr funkcjonalności | [`implemented_features.md`](../../architecture/implemented_features.md) | ✅ Aktualizowany po każdym planie |

## Typowe zadania w cyklu SDD

1. **Krok 1 (Read)** — przeczytaj cały plan + dokumenty referenced ([`dev-coding-rules.md`](../../../kilocode/rules/dev-coding-rules.md), istniejący kod w plikach z sekcji 5.1 planu).
2. **Krok 2 (Verify)** — zweryfikuj 5 punktów warunku wstępnego z [`dev-implement-workflow.md`](../../../kilocode/rules/dev-implement-workflow.md) sekcja 1; jeśli któryś niespełniony — `ask_followup_question` zamiast improwizacji.
3. **Krok 3 (Implement)** — wykonaj sekwencyjnie wszystkie kroki z sekcji 6 planu używając `apply_diff` (preferowane), `write_to_file`, `execute_command` (np. `git mv`); modyfikuj wyłącznie pliki z sekcji 5.1 planu.
4. **Krok 4 (Test)** — uruchom `cd code && npx tsc --noEmit && npm run lint && npm run build`; każde KA z sekcji 7 planu z dowodem (komenda + exit code lub log).
5. **Krok 5 (Update Registries)** — zmień `[ ]` → `[x]` w [`implemented_plans.md`](../../architecture/implemented_plans.md), aktualizuj/dodaj sekcję w [`implemented_features.md`](../../architecture/implemented_features.md) (jeśli plan dotyczy kodu, nie meta-warstwy).
6. **Krok 6 (Report)** — zgłoś ukończenie przez `attempt_completion` w formacie z [`dev-implement-workflow.md`](../../../kilocode/rules/dev-implement-workflow.md) sekcja 5.

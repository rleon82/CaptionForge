# docs/roles/product_owner

Rola **Product Owner** w projekcie CaptionForge — strażnik wizji produktu, priorytetyzacji backlogu (planów SDD) i Definition of Done. Łącznik między personami użytkowników a zespołem implementującym.

## Zakres odpowiedzialności

- Definiowanie i aktualizacja **wizji produktu** na bazie [`docs/business/Job_To_Be_Done.md`](../../business/Job_To_Be_Done.md) (persony Kasia + Tomek, 10 Job Snapshotów).
- **Priorytetyzacja backlogu** planów SDD w [`docs/plans/`](../../plans) — decyzja, który `PLAN_*.md` jest implementowany jako następny.
- **Pisanie nowych planów** (we współpracy z Architectem) zgodnie ze szablonem z [`kilocode/rules/dev-plan-workflow.md`](../../../kilocode/rules/dev-plan-workflow.md) — w szczególności sekcji 1 (Cel), 2 (Zakres) i 3 (Wymagania funkcjonalne).
- **Walidacja Definition of Done** każdego planu — sprawdzenie sekcji 7 (Kryteria akceptacji) przed zamknięciem planu.
- **Aktualizacja [`docs/business/User_Journey_Map.md`](../../business/User_Journey_Map.md)** przy nowych funkcjonalnościach (we współpracy z UX/UI).
- **Raportowanie postępu** interesariuszom na bazie [`implemented_plans.md`](../../architecture/implemented_plans.md) i [`implemented_features.md`](../../architecture/implemented_features.md).

## Kluczowe artefakty

| Artefakt | Lokalizacja | Status |
|----------|-------------|--------|
| Job-To-Be-Done Analysis | [`docs/business/Job_To_Be_Done.md`](../../business/Job_To_Be_Done.md) | ✅ Aktualne |
| User Journey Map | [`docs/business/User_Journey_Map.md`](../../business/User_Journey_Map.md) | ✅ Aktualne |
| Rejestr planów | [`implemented_plans.md`](../../architecture/implemented_plans.md) | ✅ Aktualizowany po każdym planie |
| Rejestr funkcjonalności | [`implemented_features.md`](../../architecture/implemented_features.md) | ✅ Aktualizowany po każdym planie |
| Backlog (lista planów) | [`docs/plans/`](../../plans) | ✅ Aktywny |

## Typowe zadania w cyklu SDD

1. **Pisanie planu SDD** — wypełnij szablon z [`dev-plan-workflow.md`](../../../kilocode/rules/dev-plan-workflow.md) sekcja 2; szczególną uwagę zwróć na sekcje 1 (Cel biznesowy), 2 (Zakres / Out of Scope), 3 (Wymagania funkcjonalne).
2. **Priorytetyzacja** — przed wskazaniem agentowi Developerowi, który plan ma implementować, zweryfikuj zależności (sekcja 5.3 planu).
3. **Walidacja po wdrożeniu** — po raporcie z workflow `implement` (krok 6) sprawdź, czy każde KA z sekcji 7 jest spełnione z dowodem; jeśli nie — odrzuć i wskaż brak.
4. **Aktualizacja User Journey** — przy każdej zmianie flow użytkownika (np. nowa sekcja landingu, nowy krok generatora) zaktualizuj [`docs/business/User_Journey_Map.md`](../../business/User_Journey_Map.md).
5. **Raport miesięczny** — zsumuj zmiany w [`implemented_features.md`](../../architecture/implemented_features.md) z ostatniego miesiąca; powiąż z metrykami z User Journey Map (sekcja „Metrics to Track").

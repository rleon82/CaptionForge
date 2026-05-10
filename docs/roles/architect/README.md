# docs/roles/architect

Rola **Architect** w projekcie CaptionForge — strażnik decyzji architektonicznych, modeli systemu i integracji zewnętrznych. Współpracuje z Product Ownerem przy pisaniu planów (sekcja 5 — Kontekst techniczny).

## Zakres odpowiedzialności

- **Decyzje architektoniczne** — pisanie ADR-ów (Architecture Decision Records) w [`docs/architecture/`](../../architecture).
- **Wysokopoziomowy opis systemu** — utrzymanie `docs/architecture/system_overview.md` (do utworzenia w Planie F).
- **Stos technologiczny** — utrzymanie [`docs/tech/technical-documentation.md`](../../tech/technical-documentation.md) jako jedynego źródła prawdy o architekturze Next.js, Server/Client Components, Route Handlerach.
- **Integracje zewnętrzne** — Google Gemini API ([`code/src/app/api/generate/route.ts`](../../../code/src/app/api/generate/route.ts), [`code/src/lib/gemini-prompt.ts`](../../../code/src/lib/gemini-prompt.ts)); przyszłe: backend, baza danych.
- **Granice modułów** — kontrakty między [`code/src/app/`](../../../code/src/app), [`code/src/components/`](../../../code/src/components), [`code/src/services/`](../../../code/src/services), [`code/src/lib/`](../../../code/src/lib).
- **Definiowanie wymagań niefunkcjonalnych** w sekcji 4 (wydajność, bezpieczeństwo, audytowalność) każdego nowego planu SDD.

## Kluczowe artefakty

| Artefakt | Lokalizacja | Status |
|----------|-------------|--------|
| Architecture Decision Records | [`docs/architecture/`](../../architecture) | ✅ Wdrożone (adr_001, adr_002) |
| System Overview | [`docs/architecture/system_overview.md`](../../architecture/system_overview.md) | ✅ Wdrożony |
| Dokumentacja techniczna | [`docs/tech/technical-documentation.md`](../../tech/technical-documentation.md) | ✅ Aktualna (kwiecień 2026) |
| Historyczny plan Vanilla | [`docs/architecture/legacy-vanilla-plan.md`](../../architecture/legacy-vanilla-plan.md) | ✅ Zachowany jako kontekst |
| Route Handlers (API) | [`code/src/app/api/generate/route.ts`](../../../code/src/app/api/generate/route.ts) | ✅ Wdrożony (Gemini proxy) |
| Konfiguracja TypeScript | [`code/tsconfig.json`](../../../code/tsconfig.json) | ✅ Strict + noUncheckedIndexedAccess |
| Konfiguracja Next.js | [`code/next.config.mjs`](../../../code/next.config.mjs) | ✅ reactStrictMode: true |
| Zależności (package.json) | [`code/package.json`](../../../code/package.json) | ✅ Next 14.2, React 18, Zod 3 |

## Typowe zadania w cyklu SDD

1. **Pisanie ADR** — przy każdej istotnej decyzji architektonicznej (wybór biblioteki, zmiana wzorca, integracja zewnętrzna) utwórz `docs/architecture/adr_NNN_<temat>.md` z sekcjami: Status, Context, Decision, Consequences.
2. **Review sekcji 5 planu (Kontekst techniczny)** — przed implementacją zweryfikuj listę plików w 5.1, zależności w 5.3 i stos w 5.4. Zapobiega rozjazdom między planem a rzeczywistością.
3. **Audyt zależności** — przeglądaj [`code/package.json`](../../../code/package.json) przy każdym planie dodającym nowy pakiet; weryfikuj kompatybilność wersji i wpływ na bundle size.
4. **Definiowanie wymagań niefunkcjonalnych** — w sekcji 4 nowego planu opisz: limity wydajnościowe (np. czas odpowiedzi API), wymagania bezpieczeństwa (np. server-only secrets), audytowalność (logowanie).
5. **Aktualizacja `technical-documentation.md`** — przy każdej zmianie architektury (nowy moduł, nowa integracja) zaktualizuj diagramy Mermaid i tabele w [`docs/tech/technical-documentation.md`](../../tech/technical-documentation.md).

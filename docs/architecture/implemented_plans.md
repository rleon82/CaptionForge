# Implemented Plans — CaptionForge

Lista wszystkich planów implementacyjnych projektu CaptionForge w metodyce SDD. Każdy plan odpowiada jednej atomowej funkcjonalności lub zmianie. Aktualizuj ten plik po każdym wdrożeniu (workflow `implement` — [`kilocode/rules/dev-implement-workflow.md`](kilocode/rules/dev-implement-workflow.md)).

---

## Plany historyczne (przed SDD)

- [x] [PLAN_szkielet-nextjs-captionforge.md](docs/plans/PLAN_szkielet-nextjs-captionforge.md) — Master plan migracji z Vanilla HTML/JS do Next.js 14 App Router + TypeScript + Tailwind — **status: DONE**
- [x] [PLAN_captionforge-audit-i-roadmap.md](docs/plans/PLAN_captionforge-audit-i-roadmap.md) — Audit kodu Vanilla + roadmapa dalszego rozwoju — **status: DONE**
- [x] [PLAN_captionforge-new-features.md](docs/plans/PLAN_captionforge-new-features.md) — Historia generacji, eksport TXT, licznik znaków, progress bar, dark mode — **status: DONE** (port do Next.js)
- [x] [PLAN_gemini-api-integration.md](docs/plans/PLAN_gemini-api-integration.md) — Integracja Google Gemini API — Strategy Pattern (oryg. Vanilla), wdrożona jako Route Handler w Next.js — **status: DONE**

## Plany SDD (roadmapa wdrożenia Spec Driven Development)

- [x] [PLAN_sdd-szablon-planu.md](docs/plans/PLAN_sdd-szablon-planu.md) — Plan C: Zastąpienie szablonu `dev-plan-workflow.md` szablonem SDD (8 sekcji) — **status: DONE**
- [x] [PLAN_sdd-struktura-katalogow.md](docs/plans/PLAN_sdd-struktura-katalogow.md) — Plan A: Struktura katalogów SDD + migracja dokumentacji do `docs/{architecture,business,tech,plans,roles}` — **status: DONE**
- [x] [PLAN_sdd-rejestry-projektu.md](docs/plans/PLAN_sdd-rejestry-projektu.md) — Plan B: Rejestry projektu (`implemented_plans.md`, `implemented_features.md`, `README.md` roota) — **status: DONE**
- [x] [PLAN_sdd-workflow-implement.md](docs/plans/PLAN_sdd-workflow-implement.md) — Plan D: Workflow `implement` (`kilocode/rules/dev-implement-workflow.md`) — **status: DONE**
- [x] [PLAN_sdd-dokumentacja-rol.md](docs/plans/PLAN_sdd-dokumentacja-rol.md) — Plan E: Wypełnienie merytoryczne `docs/roles/*/README.md` dla 5 ról (Product Owner, UX/UI, Architect, Developer, Tester) — **status: DONE**
- [x] [PLAN_sdd-architecture-adr.md](docs/plans/PLAN_sdd-architecture-adr.md) — Plan F: `docs/architecture/system_overview.md` + ADR-y (`adr_001_nextjs-app-router.md`, `adr_002_gemini-api.md`) — **status: DONE**

## Plany funkcjonalne (SDD)

- [x] [PLAN_generator-niezawodnosc-p0.md](docs/plans/PLAN_generator-niezawodnosc-p0.md) — Niezawodność generatora opisów (P0+P1+P2): Structured Output (`responseSchema`), retry/backoff serwer (3×), `AbortController` 25 s, walidacja Zod odpowiedzi, twarda walidacja `reach`, banner „Tryb awaryjny" w UI, retry klient (2×) — **status: DONE**
- [x] [PLAN_audyt-zgodnosci-kod-vs-dokumentacja.md](docs/plans/PLAN_audyt-zgodnosci-kod-vs-dokumentacja.md) — Audyt zgodności kodu z dokumentacją (2026-05-10) — 8 rozbieżności, wszystkie zamknięte — **status: DONE**
- [x] [PLAN_reaudyt-zgodnosci-2026-05-12.md](docs/plans/PLAN_reaudyt-zgodnosci-2026-05-12.md) — Re-audyt zgodności (2026-05-12) — weryfikacja plików pomocniczych, 16 dodatkowych poprawek — **status: DONE**

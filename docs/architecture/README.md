# docs/architecture

Wysokopoziomowy opis architektury systemu CaptionForge, decyzje architektoniczne (ADR — Architecture Decision Records), rejestry wdrożonych funkcji i planów, diagramy oraz historyczne plany techniczne zachowane jako kontekst.

## Zawartość

| Plik | Opis |
|------|------|
| [`system_overview.md`](system_overview.md) | Wysokopoziomowy opis systemu — cel, stack, architektura komponentów, integracje |
| [`adr_001_nextjs-app-router.md`](adr_001_nextjs-app-router.md) | ADR — wybór Next.js 14 App Router jako frameworka aplikacji |
| [`adr_002_gemini-api.md`](adr_002_gemini-api.md) | ADR — wybór Google Gemini 2.0 Flash Lite jako LLM backend; polityka resilience |
| [`adr_003_system-fonts.md`](adr_003_system-fonts.md) | ADR — rezygnacja z `next/font` na rzecz systemowego stosu czcionek (decyzja MVP) |
| [`implemented_features.md`](implemented_features.md) | Rejestr wdrożonych funkcjonalności: status, plany źródłowe, kluczowe pliki kodu |
| [`implemented_plans.md`](implemented_plans.md) | Rejestr wdrożonych planów SDD z datami i linkami |
| [`legacy-vanilla-plan.md`](legacy-vanilla-plan.md) | Historyczny plan wersji Vanilla HTML/CSS/JS (zachowany jako kontekst architektoniczny) |

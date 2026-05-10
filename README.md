# CaptionForge

Generator angażujących opisów i hasztagów dla mediów społecznościowych, napędzany AI (Google Gemini 2.0 Flash Lite). Aplikacja Next.js 14 (App Router) z landingiem + generatorem, backendowym proxy ukrywającym klucz API oraz automatycznym fallbackiem na szablony mockowe.

> **Wersja:** 2.0 · **Status:** MVP na Next.js + TypeScript · **Metodyka:** Spec Driven Development (SDD)

---

## Struktura repozytorium

```
captionforge/
├── README.md                    # Ten plik — indeks projektu
├── implemented_plans.md         # Rejestr planów SDD (co jest zaplanowane / wdrożone)
├── implemented_features.md      # Rejestr funkcjonalności (co jest zaimplementowane)
├── .gitignore
│
├── code/                        # Aplikacja Next.js 14 (produkcyjna)
│   ├── src/
│   │   ├── app/                 # Next.js App Router (strony, layout, API)
│   │   ├── components/          # Komponenty React (ui/ + features/)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utilsy, helpery, konfiguracje
│   │   ├── services/            # Logika komunikacji z API
│   │   ├── types/               # Typy TypeScript
│   │   └── constants/           # Stałe, enumy, konfiguracja
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                        # Dokumentacja projektu (SDD)
│   ├── README.md                # Indeks dokumentacji
│   ├── architecture/            # Architektura systemu, ADR-y
│   ├── business/                # Wymagania biznesowe, JTBD, User Journey
│   ├── tech/                    # Dokumentacja techniczna stosu
│   ├── plans/                   # Plany implementacyjne (PLAN_*.md)
│   └── roles/                   # Dokumentacja ról projektowych
│
├── kilocode/                    # Reguły i workflows agenta AI
│   ├── rules/                   # Standardy kodowania, workflow planowania
│   └── workflows/               # Workflow biznesowe (ICE, JTBD, GTM...)
│
└── vanilla web/                 # Historyczna wersja Vanilla HTML/CSS/JS (referencyjna)
```

---

## Szybki start

```bash
# 1. Przejdź do katalogu aplikacji
cd code

# 2. Zainstaluj zależności
npm install

# 3. Utwórz plik .env.local z kluczem Gemini API (opcjonalne — bez klucza działa mock)
echo "GEMINI_API_KEY=AIza..." > .env.local

# 4. Uruchom serwer deweloperski
npm run dev
# → http://localhost:3000
```

**Weryfikacja jakości kodu:**
```bash
cd code
npx tsc --noEmit   # TypeScript strict — 0 błędów
npm run lint       # ESLint — 0 błędów i warningów
npm run build      # Produkcyjny build — musi przejść
```

---

## Dokumentacja

| Dokument | Opis |
|----------|------|
| 📖 [docs/README.md](docs/README.md) | Indeks dokumentacji — spis treści, linki do wszystkich sekcji |
| 🏛️ [docs/architecture/](docs/architecture) | Architektura systemu, ADR-y, historyczny plan Vanilla |
| 💼 [docs/business/](docs/business) | JTBD, User Journey Map, persony użytkowników |
| ⚙️ [docs/tech/technical-documentation.md](docs/tech/technical-documentation.md) | Pełna dokumentacja techniczna Next.js, Gemini, diagramy Mermaid |
| 📋 [docs/plans/](docs/plans) | Plany implementacyjne SDD (`PLAN_*.md`) |
| 👥 [docs/roles/](docs/roles) | Dokumentacja ról: Product Owner, UX/UI, Architect, Developer, Tester |

---

## Reguły agenta AI

| Plik | Opis |
|------|------|
| 🤖 [kilocode/rules/who-am-i.md](kilocode/rules/who-am-i.md) | Persona agenta: SaaS Architect & Business Auditor |
| 📐 [kilocode/rules/dev-plan-workflow.md](kilocode/rules/dev-plan-workflow.md) | WF_Dev_Plan (SDD) — wzorzec tworzenia planów implementacyjnych (8 sekcji) |
| 🛠️ [kilocode/rules/dev-implement-workflow.md](kilocode/rules/dev-implement-workflow.md) | WF_Dev_Implement (SDD) — workflow implementacji planu (6 kroków: Read → Verify → Implement → Test → Update Registries → Report) |
| ⚙️ [kilocode/rules/dev-coding-rules.md](kilocode/rules/dev-coding-rules.md) | Standardy: Next.js App Router, TypeScript strict, Tailwind CSS |

---

## Rejestry projektu

| Plik | Opis |
|------|------|
| 📋 [implemented_plans.md](implemented_plans.md) | Lista wszystkich planów SDD z statusami `[x]`/`[ ]` |
| ✅ [implemented_features.md](implemented_features.md) | Inwentarz zaimplementowanych funkcjonalności z linkami do kodu |

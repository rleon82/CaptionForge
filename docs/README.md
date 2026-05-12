# ✍️ CaptionForge

**Generator angażujących opisów i hasztagów dla mediów społecznościowych, napędzany AI (Google Gemini).**

Aplikacja Next.js 14 (App Router) z landingiem + generatorem opartym na Gemini 2.0 Flash Lite, z backendowym proxy ukrywającym klucz API oraz automatycznym fallbackiem na szablony mockowe.

> **Wersja:** 2.0 · **Status:** Wdrożona · **Data:** Kwiecień 2026

---

## 📑 Spis treści dokumentacji

### Dokumentacja projektu ([`docs/`](.))

| Dokument | Opis |
|----------|------|
| 📖 **[README.md](README.md)** | Ten plik — szybki start, koncepcja, struktura, stack |
| 🔭 **[architecture/system_overview.md](architecture/system_overview.md)** | Wysokopoziomowy opis architektury: stack, diagramy Mermaid, integracje zewnętrzne — szybkie intro dla nowych developerów |
| 📖 **[tech/technical-documentation.md](tech/technical-documentation.md)** | Pełna dokumentacja techniczna: architektura Next.js, Server/Client Components, Route Handler, hooks, diagramy Mermaid |
| 🎯 **[business/Job_To_Be_Done.md](business/Job_To_Be_Done.md)** | Analiza JTBD: persony (Kasia — content creator, Tomek — freelancer SM), 10 Job Snapshotów, ryzyka biznesowe, MVP Scope |
| 🗺️ **[business/User_Journey_Map.md](business/User_Journey_Map.md)** | Ścieżka użytkownika: Journey MVP i docelowa, Gap Analysis, metryki konwersji, rekomendacje UX |
| ✅ **[architecture/implemented_features.md](architecture/implemented_features.md)** | Inwentarz wdrożonych funkcjonalności: status, plany źródłowe, kluczowe pliki kodu |
| 📋 **[architecture/implemented_plans.md](architecture/implemented_plans.md)** | Rejestr wdrożonych planów z datami i linkami do plików |
| 🏛️ **[architecture/legacy-vanilla-plan.md](architecture/legacy-vanilla-plan.md)** | Historyczny plan wersji Vanilla zachowany jako kontekst architektoniczny (design system, mapowanie Vanilla → Next.js) |

### Decyzje architektoniczne (ADR) ([`docs/architecture/`](architecture))

| ADR | Opis |
|-----|------|
| 🏗️ **[adr_001_nextjs-app-router.md](architecture/adr_001_nextjs-app-router.md)** | Wybór Next.js 14 App Router zamiast Pages Router / Vite SPA |
| 🤖 **[adr_002_gemini-api.md](architecture/adr_002_gemini-api.md)** | Wybór Google Gemini 2.0 Flash Lite jako LLM; polityka resilience (retry, Structured Output, fallback mock) |
| 🔤 **[adr_003_system-fonts.md](architecture/adr_003_system-fonts.md)** | Rezygnacja z `next/font` na rzecz systemowego stosu czcionek (decyzja MVP) |

### Plany implementacyjne ([`docs/plans/`](plans))

| Plan | Opis | Status |
|------|------|--------|
| 🏗️ **[PLAN_szkielet-nextjs-captionforge.md](plans/PLAN_szkielet-nextjs-captionforge.md)** | Master plan migracji do Next.js 14 — architektura, 8 planów atomowych | ✅ Wdrożony |
| 🔍 **[PLAN_captionforge-audit-i-roadmap.md](plans/PLAN_captionforge-audit-i-roadmap.md)** | Audit kodu Vanilla + plany dalszego rozwoju | ✅ Wdrożony |
| 🚀 **[PLAN_captionforge-new-features.md](plans/PLAN_captionforge-new-features.md)** | Historia, eksport TXT, licznik znaków, progress bar, dark mode | ✅ Wdrożony |
| 🔌 **[PLAN_gemini-api-integration.md](plans/PLAN_gemini-api-integration.md)** | Integracja Google Gemini — Strategy Pattern | ✅ Wdrożony |
| 🛡️ **[PLAN_generator-niezawodnosc-p0.md](plans/PLAN_generator-niezawodnosc-p0.md)** | P0/P1/P2 niezawodności: Structured Output, retry/backoff serwer + klient, AbortController, Zod walidacja odpowiedzi, banner trybu awaryjnego | ✅ Wdrożony |
| 🔎 **[PLAN_audyt-zgodnosci-kod-vs-dokumentacja.md](plans/PLAN_audyt-zgodnosci-kod-vs-dokumentacja.md)** | Audyt zgodności kodu z dokumentacją (2026-05-10) | ✅ Zrealizowany |
| 🔎 **[PLAN_reaudyt-zgodnosci-2026-05-12.md](plans/PLAN_reaudyt-zgodnosci-2026-05-12.md)** | Re-audyt zgodności (2026-05-12) — wszystkie rozbieżności zamknięte | ✅ Zrealizowany |
| 📐 **[PLAN_sdd-szablon-planu.md](plans/PLAN_sdd-szablon-planu.md)** | Szablon planu SDD — wzorzec atomowych planów implementacyjnych | ✅ Wdrożony |
| 📁 **[PLAN_sdd-struktura-katalogow.md](plans/PLAN_sdd-struktura-katalogow.md)** | Struktura katalogów SDD + migracja dokumentacji | ✅ Wdrożony |
| 🏛️ **[PLAN_sdd-architecture-adr.md](plans/PLAN_sdd-architecture-adr.md)** | Plan SDD — wzorce tworzenia ADR, rejestr decyzji architektonicznych | ✅ Wdrożony |
| 👥 **[PLAN_sdd-dokumentacja-rol.md](plans/PLAN_sdd-dokumentacja-rol.md)** | Plan SDD — dokumentacja ról (Architect, Developer, PO, Tester, UX/UI) | ✅ Wdrożony |
| 📊 **[PLAN_sdd-rejestry-projektu.md](plans/PLAN_sdd-rejestry-projektu.md)** | Plan SDD — rejestry projektu (implemented_features, implemented_plans) | ✅ Wdrożony |
| ⚙️ **[PLAN_sdd-workflow-implement.md](plans/PLAN_sdd-workflow-implement.md)** | Plan SDD — workflow implementacji (dev-implement-workflow) | ✅ Wdrożony |

### Reguły agenta AI ([`kilocode/rules/`](../kilocode/rules))

| Plik | Opis |
|------|------|
| 🤖 **[who-am-i.md](../kilocode/rules/who-am-i.md)** | Persona agenta: SaaS Architect & Business Auditor; dostępne workflows (ICE, JTBD, MVP Scoping, GTM…) |
| 📐 **[dev-plan-workflow.md](../kilocode/rules/dev-plan-workflow.md)** | WF_Dev_Plan — wzorzec tworzenia atomowych planów implementacyjnych |
| 🛠️ **[dev-implement-workflow.md](../kilocode/rules/dev-implement-workflow.md)** | WF_Dev_Implement — workflow implementacji planu (6 kroków: Read → Verify → Implement → Test → Update Registries → Report) |
| ⚙️ **[dev-coding-rules.md](../kilocode/rules/dev-coding-rules.md)** | Obowiązkowe standardy: Next.js App Router, TypeScript strict, Tailwind CSS, wzorce SC/CC, weryfikacja `tsc + lint + build` |

---

## 💡 Koncepcja produktu

### Problem, który rozwiązujemy

Twórcy treści i osoby zarządzające mediami społecznościowymi codziennie stają przed tym samym wyzwaniem: **wymyślanie angażujących opisów do postów**. Proces, który wydaje się prosty, w rzeczywistości pochłania 15–30 minut na jeden opis — od burzy mózgów, przez dobór tonu, po wyszukiwanie odpowiednich hasztagów. Przy 5+ postach tygodniowo to **5–10 godzin miesięcznie** utopione w żmudnej, repetytywnej pracy.

**Kluczowe bóle:**
- 🔴 **Blokada twórcza / wypalenie** — wymyślanie opisów od zera przy regularnej publikacji prowadzi do spadku jakości i motywacji
- 🔴 **Context switching** — zmiana tonu, niszy i platformy między postami/klientami wymaga mentalnego restartu
- 🟡 **Hasztagowy strzał w ciemno** — brak danych o skuteczności hasztagów; kopiowanie od innych; zero strategii
- 🟡 **Cross-platform adaptacja** — ten sam temat na Instagramie i TikToku wymaga innego podejścia

### Rozwiązanie CaptionForge

CaptionForge kompresuje cały proces do **10 sekund**: użytkownik wybiera platformę, ton głosu, podaje niszę i temat — a AI generuje 3 gotowe warianty opisu + zoptymalizowane hasztagi z oceną zasięgu. Bez zakładania konta, bez konfiguracji, bez czekania.

**Core Job-to-be-Done:**
> *"Kiedy siadam do tworzenia treści na social media, chcę wygenerować angażujący opis dopasowany do mojej platformy i tonu, żeby mieć gotowy post w <30 sekund zamiast 15–30 minut."*

---

## 🎯 Odbiorcy docelowi

### Persona 1: Kasia — Content Creator / Influencer

| Cecha | Opis |
|-------|------|
| **Wiek** | 22–35 lat |
| **Profil** | Twórczyni treści na Instagramie/TikToku, buduje markę osobistą w niszy (fitness, moda, lifestyle, kulinaria) |
| **Wolumen** | 5–8 postów/tydzień na 1–2 platformach |
| **Główny ból** | Wypalenie twórcze — po 5 postach w tygodniu opisy stają się wtórne |
| **Budżet** | 0–100 zł/miesiąc |
| **Priorytet** | Inspiracja + szybkość w jednej niszy |

### Persona 2: Tomek — Social Media Freelancer

| Cecha | Opis |
|-------|------|
| **Wiek** | 25–40 lat |
| **Profil** | Freelancer zarządzający 3–10 kontami klientów |
| **Wolumen** | 15–50 opisów/tydzień na wielu platformach |
| **Główny ból** | Context switching i niemożność skalowania |
| **Budżet** | 50–200 zł/miesiąc |
| **Priorytet** | Skalowanie + standaryzacja jakości |

Pełna analiza person: [business/Job_To_Be_Done.md](business/Job_To_Be_Done.md)

---

## 🏆 Przewaga konkurencyjna

| Aspekt | ChatGPT | Jasper / Copy.ai | CaptionForge |
|--------|---------|-------------------|--------------|
| Specjalizacja w social media | ❌ | ⚠️ | ✅ 100% focus |
| Hasztagi z oceną zasięgu | ❌ | ❌ | ✅ 🔥📈🎯 |
| Optymalizacja per platforma | ❌ | ⚠️ | ✅ Automatyczna |
| Czas do pierwszego wyniku | ~2 min | ~3 min | **<30 sekund** |
| Wymagane konto | ✅ | ✅ | ❌ **Nie** |
| Klucz API po stronie klienta | — | — | ❌ **Server-side proxy** |

---

## 🚀 Jak uruchomić

```bash
# 1. Wejdź do katalogu aplikacji
cd code

# 2. Zainstaluj zależności
npm install

# 3. Skonfiguruj klucz Gemini (opcjonalnie — bez klucza działa mock)
echo "GEMINI_API_KEY=AIza..." > .env.local

# 4. Uruchom serwer developerski
npm run dev
# → http://localhost:3000
```

**Produkcyjny build:**
```bash
npm run build && npm run start
```

**Jakość kodu:**
```bash
npm run lint          # ESLint
npx tsc --noEmit      # TypeScript strict check
```

> 🔑 Klucz Gemini pobierz z: https://aistudio.google.com/app/apikey
> ⚠️ Bez klucza API generator zwraca wyniki z mocka (szablony) — aplikacja nadal działa.

---

## 📁 Struktura projektu

```
captionforge/
├── code/                        # ← Aplikacja Next.js 14 (App Router)
│   ├── .env.local               # GEMINI_API_KEY (NIE commitować)
│   ├── next.config.mjs
│   ├── tailwind.config.ts       # Design tokens via CSS vars + dark via [data-theme]
│   ├── tsconfig.json            # strict + noUncheckedIndexedAccess
│   ├── package.json
│   └── src/
│       ├── app/
│       │   ├── layout.tsx       # Root layout + anti-FOUC script (dark mode)
│       │   ├── page.tsx         # Server Component — składa sekcje landingu
│       │   ├── globals.css      # CSS vars + Tailwind directives
│       │   └── api/generate/
│       │       └── route.ts     # POST — proxy do Gemini (klucz w ENV) + rate-limit
│       ├── components/
│       │   ├── ui/              # Button, ThemeToggle, ProgressBar, Toast
│       │   └── features/
│       │       ├── navbar.tsx, hero.tsx, features-grid.tsx,
│       │       ├── how-it-works.tsx, faq.tsx, cta-bottom.tsx, footer.tsx
│       │       ├── generator/   # Client: section + form + results
│       │       └── history/     # Client: panel + entry
│       ├── hooks/
│       │   ├── useTheme.ts      # Dark/light mode + systemowa preferencja
│       │   └── useHistory.ts    # Reaktywna historia (localStorage)
│       ├── lib/
│       │   ├── cn.ts            # clsx + tailwind-merge
│       │   ├── gemini-prompt.ts # buildGeminiPrompt + parseGeminiResponse
│       │   ├── mock-templates.ts
│       │   ├── history-storage.ts  # CRUD localStorage (max 50 wpisów)
│       │   └── export-txt.ts    # Blob API + UTF-8 BOM
│       ├── types/
│       │   ├── generator.ts     # Platform, Tone, Language, GenerateResult
│       │   └── history.ts       # HistoryEntry
│       └── constants/
│           ├── platforms.ts     # 5 platform + limity znaków
│           ├── tones.ts         # 5 tonów głosu
│           └── design-tokens.ts # Kolory (dokumentacja CSS vars)
├── docs/                        # Ten folder (dokumentacja)
├── docs/plans/                  # Plany implementacyjne (SDD)
├── vanilla web/                 # Historyczna wersja Vanilla HTML/CSS/JS (referencyjna)
└── kilocode/                    # Reguły i workflows agenta AI
```

---

## 🎨 Funkcje

### Landing Page (Server Components)
- **Navbar** — sticky z blur efektem przy scrollu, mobile menu, smooth-scroll (Client Component)
- **Hero** — nagłówek z gradientem, CTA, animowany mockup, statystyki
- **Features** — 6 kluczowych funkcji z ikonami SVG
- **How It Works** — 3 kroki z wizualizacjami
- **FAQ** — accordion (Client) z pytaniami i odpowiedziami
- **CTA Bottom** — finalne wezwanie do akcji
- **Footer** — linki produktowe, platformy, brand

### Generator (Client Component + Route Handler)
- Wybór platformy: Instagram, TikTok, LinkedIn, X/Twitter, Facebook
- Wybór tonu: inspirujący, profesjonalny, casualowy, humorystyczny, edukacyjny
- Pole niszy/branży, wybór języka (PL/EN), temat posta
- Generowanie 3 wariantów przez **Gemini 2.0 Flash Lite** — [`route.ts`](../code/src/app/api/generate/route.ts)
- Hasztagi z oceną zasięgu (🔥 duży, 📈 średni, 🎯 niszowy)
- Kopiowanie do schowka per opis + wszystkie hasztagi
- **Eksport do TXT** (UTF-8 BOM, Blob API) — [`lib/export-txt.ts`](../code/src/lib/export-txt.ts)
- **Licznik znaków** per platforma z progami safe/warning/danger
- **Walidacja Zod** po stronie serwera — spójna z typami klienta
- **Automatyczny fallback na mock** przy 429/braku klucza/błędzie parsowania
- **Banner „Tryb awaryjny"** z przyciskiem „🔄 Spróbuj z AI" gdy `source === "mock"`

### Niezawodność (Resilience)
- **Retry z backoffem** — serwer: 3× (500/1500/4000 ms), klient: 2× (800/2000 ms)
- **AbortController** 25 s timeout per próba
- **Structured Output** (`responseSchema` + `responseMimeType: "application/json"`) — wymusza kontrakt JSON od Gemini
- **Walidacja Zod** odpowiedzi Gemini — świadomy fallback przy każdym naruszeniu kontraktu

### Historia i motywy
- 🌙 **Dark / Light Mode** — hook [`useTheme`](../code/src/hooks/useTheme.ts) + anti-FOUC w `<head>` + listener na `prefers-color-scheme`
- 📊 **ProgressBar** — [`ui/progress-bar.tsx`](../code/src/components/ui/progress-bar.tsx) z etapami (Analizuję → Generuję → Dobieram hasztagi → Gotowe!)
- 📜 **Historia generacji** — hook [`useHistory`](../code/src/hooks/useHistory.ts) + [`HistoryStorage`](../code/src/lib/history-storage.ts), max 50 wpisów FIFO

### Bezpieczeństwo
- ✅ **Backend proxy** — klucz Gemini w `.env.local`, nigdy nie opuszcza serwera
- ✅ **Rate limiting** — in-memory per IP, 30 zapytań / godzinę
- ✅ **Walidacja Zod** — atak na payload odbijany z HTTP 400

---

## 🔧 Konfiguracja Gemini API

### Zmienne środowiskowe (`code/.env.local`)

```env
GEMINI_API_KEY=AIzaSy...
```

### Zmiana modelu

W [`route.ts`](../code/src/app/api/generate/route.ts):

```typescript
const geminiModel = "gemini-2.0-flash-lite"; // np. "gemini-2.5-flash" / "gemini-2.0-flash"
```

### Obsługa błędów

| Sytuacja | Zachowanie |
|----------|-----------|
| Brak `GEMINI_API_KEY` | Zwraca mock wynik + banner w UI |
| HTTP 429 (rate limit Gemini) | Retry 3× → fallback na mock z banerem |
| Rate limit lokalny (30/h/IP) | HTTP 429 z komunikatem PL |
| Błąd parsowania JSON / Zod fail | Fallback na mock w [`parseGeminiResponse`](../code/src/lib/gemini-prompt.ts) |
| Błąd sieci klienta | Toast: "❌ Brak połączenia z internetem." |
| Inny błąd Gemini | HTTP 502 z opisem |

---

## 🛠️ Stack technologiczny

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|-------------|
| **Framework** | Next.js 14.2 (App Router) | Server Components + Route Handlers + routing |
| **Runtime** | React 18 | Concurrent rendering |
| **Typy** | TypeScript 5 (strict + `noUncheckedIndexedAccess`) | Bezpieczeństwo typów |
| **Style** | Tailwind CSS v3 + CSS Custom Properties | Design tokens + dark via `[data-theme]` |
| **Walidacja** | Zod 3 | Wspólna schema client + server |
| **Utilities** | clsx + tailwind-merge | Composable className |
| **AI** | Google Gemini 2.0 Flash Lite | Szybki, tani tier, wysoka jakość polskiego |
| **Persystencja** | localStorage | Historia + motyw bez backendu |
| **Eksport** | Blob API | Pobieranie TXT po stronie klienta |

> **Decyzje architektoniczne:** [`adr_001`](architecture/adr_001_nextjs-app-router.md) (Next.js), [`adr_002`](architecture/adr_002_gemini-api.md) (Gemini), [`adr_003`](architecture/adr_003_system-fonts.md) (fonty)

---

## 📊 Analiza biznesowa

Pełna analiza dostępna w dokumentacji:
- **JTBD:** [business/Job_To_Be_Done.md](business/Job_To_Be_Done.md) — persony, 10 snapshotów, ryzyka, MVP Scope
- **User Journey:** [business/User_Journey_Map.md](business/User_Journey_Map.md) — ścieżka użytkownika, gap analysis
- **Plan techniczny (historyczny):** [architecture/legacy-vanilla-plan.md](architecture/legacy-vanilla-plan.md) — design system, kolory, breakpointy

---

## 🤖 Reguły agenta AI

| Reguła | Opis |
|--------|------|
| **`Dev_Coding_Rules`** | Stack: Next.js App Router + React 18 + TypeScript strict + Tailwind CSS. Zakaz `any`, wzorce SC/CC, weryfikacja `tsc + lint + build`. Szczegóły: [`dev-coding-rules.md`](../kilocode/rules/dev-coding-rules.md) |
| **`WF_Dev_Plan`** | Każdy plan implementacyjny musi być atomowy, używać szablonu z sekcjami-checkboxami i być zapisany w `plans/`. Szczegóły: [`dev-plan-workflow.md`](../kilocode/rules/dev-plan-workflow.md) |
| **`WF_Dev_Implement`** | Workflow implementacji planu: Read → Verify → Implement → Test → Update Registries → Report. Szczegóły: [`dev-implement-workflow.md`](../kilocode/rules/dev-implement-workflow.md) |
| **`SaaS Architect Persona`** | Agent działa jako SaaS Architect & Business Auditor — Lean First, Distribution First. Dostępne workflows: ICE Ranking, JTBD, MVP Scoping, GTM Strategy. Szczegóły: [`who-am-i.md`](../kilocode/rules/who-am-i.md) |

---

*Ostatnia aktualizacja: Maj 2026 · Wersja dokumentacji 2.1*

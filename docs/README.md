# ✍️ CaptionForge

**Generator angażujących opisów i hasztagów dla mediów społecznościowych, napędzany AI (Google Gemini).**

Aplikacja Next.js 14 (App Router) z landingiem + generatorem opartym na Gemini 2.0 Flash Lite, z backendowym proxy ukrywającym klucz API oraz automatycznym fallbackiem na szablony mockowe.

> **Wersja:** 2.0 · **Status:** MVP na Next.js + TypeScript · **Data:** Kwiecień 2026

---

## 📑 Spis treści dokumentacji

### Dokumentacja projektu ([`docs/`](.))

| Dokument | Opis |
|----------|------|
| 📖 **[README.md](README.md)** | Ten plik — szybki start, koncepcja, struktura, stack |
| 🏛️ **[architecture/legacy-vanilla-plan.md](architecture/legacy-vanilla-plan.md)** | Historyczny plan wersji Vanilla zachowany jako kontekst architektoniczny (design system, mapowanie Vanilla → Next.js) |
| 📖 **[tech/technical-documentation.md](tech/technical-documentation.md)** | Pełna dokumentacja techniczna: architektura Next.js, Server/Client Components, Route Handler, hooks, diagramy Mermaid |
| 🎯 **[business/Job_To_Be_Done.md](business/Job_To_Be_Done.md)** | Analiza JTBD: persony (Kasia — content creator, Tomek — freelancer SM), 10 Job Snapshotów, ryzyka biznesowe, MVP Scope |
| 🗺️ **[business/User_Journey_Map.md](business/User_Journey_Map.md)** | Ścieżka użytkownika: Journey MVP i docelowa, Gap Analysis, metryki konwersji, rekomendacje UX |

### Plany implementacyjne ([`docs/plans/`](plans))

| Plan | Opis | Status |
|------|------|--------|
| 🏗️ **[PLAN_szkielet-nextjs-captionforge.md](plans/PLAN_szkielet-nextjs-captionforge.md)** | Master plan migracji do Next.js 14 — architektura, 8 planów atomowych | ✅ Wdrożony |
| 🔍 **[PLAN_captionforge-audit-i-roadmap.md](plans/PLAN_captionforge-audit-i-roadmap.md)** | Audit kodu Vanilla + plany dalszego rozwoju (9 planów w 4 etapach) | ✅ Częściowo wdrożony |
| 🚀 **[PLAN_captionforge-new-features.md](plans/PLAN_captionforge-new-features.md)** | Historia, eksport TXT, licznik znaków, progress bar, dark mode | ✅ Wdrożony (port do Next.js) |
| 🔌 **[PLAN_gemini-api-integration.md](plans/PLAN_gemini-api-integration.md)** | Integracja Google Gemini — Strategy Pattern (oryg. Vanilla) | ✅ Wdrożony jako Route Handler |
| 📐 **[PLAN_sdd-szablon-planu.md](plans/PLAN_sdd-szablon-planu.md)** | Szablon planu SDD (Plan C) — zastąpienie dev-plan-workflow | ✅ Wdrożony |
| 📁 **[PLAN_sdd-struktura-katalogow.md](plans/PLAN_sdd-struktura-katalogow.md)** | Struktura katalogów SDD + migracja dokumentacji (Plan A) | ✅ Wdrożony |

### Reguły agenta AI ([`kilocode/rules/`](../kilocode/rules))

| Plik | Opis |
|------|------|
| 🤖 **[who-am-i.md](../kilocode/rules/who-am-i.md)** | Persona agenta: SaaS Architect & Business Auditor; dostępne workflows (ICE, JTBD, MVP Scoping, GTM…) |
| 📐 **[dev-plan-workflow.md](../kilocode/rules/dev-plan-workflow.md)** | WF_Dev_Plan — wzorzec tworzenia atomowych planów implementacyjnych |
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

Pełna analiza person: [Job_To_Be_Done.md](Job_To_Be_Done.md)

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
# Utwórz plik .env.local:
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
- **Hero** — nagłówek z gradientem, CTA, animowany mockup, statystyki
- **Features** — 6 kluczowych funkcji z ikonami SVG
- **How It Works** — 3 kroki z wizualizacjami
- **FAQ** — accordion (Client) z 3 pytaniami
- **CTA Bottom** — finalne wezwanie do akcji
- **Footer** — linki produktowe, platformy, brand

### Generator (Client Component + Route Handler)
- Wybór platformy: Instagram, TikTok, LinkedIn, X/Twitter, Facebook
- Wybór tonu: inspirujący, profesjonalny, casualowy, humorystyczny, edukacyjny
- Pole niszy/branży, wybór języka (PL/EN), temat posta
- Generowanie 3 wariantów przez **Gemini 2.0 Flash Lite** (model konfigurowalny w [`route.ts`](../code/src/app/api/generate/route.ts:79))
- Hasztagi z oceną zasięgu (🔥 duży, 📈 średni, 🎯 niszowy)
- Kopiowanie do schowka per opis + wszystkie hasztagi
- **Eksport do TXT** (UTF-8 BOM, Blob API) — [`lib/export-txt.ts`](../code/src/lib/export-txt.ts)
- **Licznik znaków** per platforma z progami safe/warning/danger
- **Walidacja Zod** po stronie serwera — spójna z typami klienta
- **Automatyczny fallback na mock** przy 429/braku klucza/błędzie parsowania

### Historia i motywy
- 🌙 **Dark / Light Mode** — hook [`useTheme`](../code/src/hooks/useTheme.ts) + anti-FOUC w `<head>` + listener na `prefers-color-scheme`
- 📊 **ProgressBar** — [`ui/progress-bar.tsx`](../code/src/components/ui/progress-bar.tsx) z etapami (Analizuję → Generuję → Dobieram hasztagi → Gotowe!)
- 📜 **Historia generacji** — hook [`useHistory`](../code/src/hooks/useHistory.ts) + [`HistoryStorage`](../code/src/lib/history-storage.ts), max 50 wpisów, przywracanie ustawień

### Bezpieczeństwo
- ✅ **Backend proxy** — klucz Gemini w `.env.local`, nigdy nie opuszcza serwera
- ✅ **Rate limiting** — in-memory per IP, 30 zapytań / godzinę (docelowo: Upstash/KV)
- ✅ **Walidacja Zod** — atak na payload odbijany z HTTP 400

---

## 🔧 Konfiguracja Gemini API

### Zmienne środowiskowe (`code/.env.local`)

```env
GEMINI_API_KEY=AIzaSy...
```

### Zmiana modelu

W [`route.ts`](../code/src/app/api/generate/route.ts:79):

```typescript
const geminiModel = "gemini-2.0-flash-lite"; // np. "gemini-2.5-flash" / "gemini-2.0-flash"
```

### Obsługa błędów

| Sytuacja | Zachowanie |
|----------|-----------|
| Brak `GEMINI_API_KEY` | Zwraca mock wynik (development) |
| HTTP 429 (rate limit Gemini) | Fallback na mock z `source: "mock"` |
| Rate limit lokalny (30/h/IP) | HTTP 429 z komunikatem PL |
| Błąd parsowania JSON | Fallback na mock w [`parseGeminiResponse`](../code/src/lib/gemini-prompt.ts) |
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
| **AI** | Google Gemini 2.0 Flash Lite | Szybki, tani tier, wysoka jakość |
| **Persystencja** | localStorage | Historia bez backendu |
| **Eksport** | Blob API | Pobieranie TXT po stronie klienta |

> **Odnośnik do reguł kodowania:** [`dev-coding-rules.md`](../kilocode/rules/dev-coding-rules.md)

---

## 📊 Analiza biznesowa

Pełna analiza dostępna w dokumentacji:
- **JTBD:** [business/Job_To_Be_Done.md](business/Job_To_Be_Done.md) — persony, 10 snapshotów, ryzyka, MVP Scope
- **User Journey:** [business/User_Journey_Map.md](business/User_Journey_Map.md) — ścieżka MVP i docelowa, gap analysis
- **Plan techniczny (historyczny):** [architecture/legacy-vanilla-plan.md](architecture/legacy-vanilla-plan.md) — design system, kolory, breakpointy
- **Audit kodu Vanilla:** [plans/PLAN_captionforge-audit-i-roadmap.md](plans/PLAN_captionforge-audit-i-roadmap.md)
- **Master plan Next.js:** [plans/PLAN_szkielet-nextjs-captionforge.md](plans/PLAN_szkielet-nextjs-captionforge.md)

---

## 🎯 Roadmap

### ✅ Faza 1 — Vanilla MVP (ukończona, zarchiwizowana w [`vanilla web/`](../vanilla%20web))
- [x] Landing + generator (mock + Gemini client-side)
- [x] Dark/light mode, historia, eksport TXT, ProgressBar, licznik znaków

### ✅ Faza 2 — Migracja na Next.js (ukończona)
- [x] Szkielet Next.js 14 App Router + TS strict + Tailwind
- [x] **Backend proxy** dla klucza Gemini ([`/api/generate`](../code/src/app/api/generate/route.ts)) — rozwiązane krytyczne ryzyko z Planu 1 audytu
- [x] Rate limiting per IP (soft, in-memory)
- [x] Walidacja Zod
- [x] Port wszystkich modułów: hooks, lib, components (Server + Client)

### 🟡 Faza 3 — UX & Konwersja (planowana)
- [ ] Sekcja Testimonials / Social Proof
- [ ] Animowany typewriter effect w Hero mockupie
- [ ] Inline edit wygenerowanych opisów (`contenteditable` / `<textarea>`)
- [ ] Presety konfiguracji (localStorage, max 5)

### 🟢 Faza 4 — Retencja (po walidacji)
- [ ] System kont użytkowników (Supabase Auth / NextAuth)
- [ ] Persystencja historii w chmurze
- [ ] Email sequences (onboarding + retention)
- [ ] Distributed rate limiting (Upstash Redis / Vercel KV)

### 🔵 Faza 5 — Skalowanie
- [ ] Analiza trendów hasztagów (real-time API)
- [ ] Integracja z Buffer/Later
- [ ] Eksport CSV/PDF
- [ ] Wielojęzyczność ponad PL/EN

> Pełna zalecana ścieżka realizacji: [captionforge-audit-i-roadmap.md](../plans/captionforge-audit-i-roadmap.md)

---

## 🤖 Reguły agenta AI

| Reguła | Opis |
|--------|------|
| **`Dev_Coding_Rules`** | Stack: Next.js App Router + React 18 + TypeScript strict + Tailwind CSS. Zakaz `any`, wzorce SC/CC, weryfikacja `tsc + lint + build`. Szczegóły: [`dev-coding-rules.md`](../kilocode/rules/dev-coding-rules.md) |
| **`WF_Dev_Plan`** | Każdy plan implementacyjny musi być atomowy, używać szablonu z sekcjami-checkboxami i być zapisany w `plans/`. Szczegóły: [`dev-plan-workflow.md`](../kilocode/rules/dev-plan-workflow.md) |
| **`SaaS Architect Persona`** | Agent działa jako SaaS Architect & Business Auditor — Lean First, Distribution First. Dostępne workflows: ICE Ranking, JTBD, MVP Scoping, GTM Strategy. Szczegóły: [`who-am-i.md`](../kilocode/rules/who-am-i.md) |

---

## 🔗 Powiązane zasoby

- [Dokumentacja techniczna](technical-documentation.md) — architektura Next.js, diagramy
- [Plan historyczny](plan.md) — design system, kolory, breakpointy
- [Analiza JTBD](Job_To_Be_Done.md) — persony, potrzeby, ryzyka
- [User Journey Map](User_Journey_Map.md) — ścieżki użytkownika, gap analysis
- [Master plan migracji](../plans/szkielet-nextjs-captionforge.md) — architektura szkieletu Next.js
- [Audit i Roadmap](../plans/captionforge-audit-i-roadmap.md) — 9 planów dalszego rozwoju
- [Reguły kodowania](../kilocode/rules/dev-coding-rules.md)

---

*Ostatnia aktualizacja: Kwiecień 2026 · Wersja dokumentacji 2.0 (po migracji na Next.js)*

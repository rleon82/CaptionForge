# Implemented Features — CaptionForge

Inwentarz zaimplementowanych funkcjonalności projektu CaptionForge. Każda funkcjonalność ma link do planu, który ją wprowadził, oraz listę kluczowych plików kodu. Aktualizuj ten plik po każdym wdrożeniu (workflow `implement` — [`kilocode/rules/dev-implement-workflow.md`](kilocode/rules/dev-implement-workflow.md)).

---

## Landing Page

- **Status:** DONE
- **Plan:** [PLAN_szkielet-nextjs-captionforge.md](docs/plans/PLAN_szkielet-nextjs-captionforge.md)
- **Opis:** Pełna strona landing page z sekcjami: Navbar (z ThemeToggle), Hero (gradient, CTA, mockup), Features (6 kart), How It Works (3 kroki), FAQ (accordion), CTA Bottom, Footer. Wszystkie sekcje jako Server Components z wyjątkiem FAQ (Client — accordion state) i Navbar (Client — scroll listener `useEffect`, mobile menu state `useState`, smooth-scroll `onClick`; zawiera leaf CC `ThemeToggle`).
- **Pliki:**
  - [`code/src/app/page.tsx`](code/src/app/page.tsx) — kompozycja sekcji (Server Component)
  - [`code/src/app/layout.tsx`](code/src/app/layout.tsx) — root layout + anti-FOUC script
  - [`code/src/components/features/hero.tsx`](code/src/components/features/hero.tsx)
  - [`code/src/components/features/features-grid.tsx`](code/src/components/features/features-grid.tsx)
  - [`code/src/components/features/how-it-works.tsx`](code/src/components/features/how-it-works.tsx)
  - [`code/src/components/features/faq.tsx`](code/src/components/features/faq.tsx)
  - [`code/src/components/features/cta-bottom.tsx`](code/src/components/features/cta-bottom.tsx)
  - [`code/src/components/features/footer.tsx`](code/src/components/features/footer.tsx)
  - [`code/src/components/features/navbar.tsx`](code/src/components/features/navbar.tsx)

---

## Generator opisów

- **Status:** DONE
- **Plan:** [PLAN_szkielet-nextjs-captionforge.md](docs/plans/PLAN_szkielet-nextjs-captionforge.md)
- **Opis:** Formularz generatora z 5 polami (platforma, ton głosu, nisza, język, temat posta), wyniki w 3 wariantach z hasztagami i oceną zasięgu, kopiowanie do schowka, licznik znaków per platforma, przycisk regeneracji. Cały generator jako Client Component z zarządzaniem stanem (idle → loading → success/error).
- **Pliki:**
  - [`code/src/components/features/generator/generator-section.tsx`](code/src/components/features/generator/generator-section.tsx) — główny CC z logiką stanu i fetch
  - [`code/src/components/features/generator/generator-form.tsx`](code/src/components/features/generator/generator-form.tsx) — formularz z walidacją
  - [`code/src/components/features/generator/generator-results.tsx`](code/src/components/features/generator/generator-results.tsx) — wyniki, kopiowanie, eksport
  - [`code/src/types/generator.ts`](code/src/types/generator.ts) — typy: Platform, Tone, Language, GenerateResult, GeneratorState
  - [`code/src/constants/platforms.ts`](code/src/constants/platforms.ts) — 5 platform + limity znaków
  - [`code/src/constants/tones.ts`](code/src/constants/tones.ts) — 5 tonów głosu

---

## Integracja Gemini API

- **Status:** DONE (rozszerzone przez PLAN_generator-niezawodnosc-p0.md)
- **Plan:** [PLAN_gemini-api-integration.md](docs/plans/PLAN_gemini-api-integration.md)
- **Opis:** Serwerowy Route Handler `POST /api/generate` jako proxy do Google Gemini 2.0 Flash Lite. Klucz API wyłącznie po stronie serwera (`GEMINI_API_KEY` w `.env.local`). Walidacja payloadu przez Zod, soft rate-limit in-memory 30 req/h per IP, fallback na mock szablony przy braku klucza / HTTP 429 / błędzie parsowania JSON.
- **Pliki:**
  - [`code/src/app/api/generate/route.ts`](code/src/app/api/generate/route.ts) — Route Handler (POST)
  - [`code/src/lib/gemini-prompt.ts`](code/src/lib/gemini-prompt.ts) — `buildGeminiPrompt()` + `parseGeminiResponse()`
  - [`code/src/lib/mock-templates.ts`](code/src/lib/mock-templates.ts) — fallback szablony (platforma × ton × język × nisza)

---

## Niezawodność generatora (P0/P1/P2)

- **Status:** DONE
- **Plan:** [PLAN_generator-niezawodnosc-p0.md](docs/plans/PLAN_generator-niezawodnosc-p0.md)
- **Opis:** Pakiet poprawek eliminujących „losowość" generatora. Serwer: Structured Output (`responseSchema`) wymuszający kontrakt JSON od Gemini, retry/backoff (3 próby, 500/1500/4000 ms + jitter) dla 429/5xx i błędów sieciowych, `AbortController` z timeoutem 25 s, walidacja Zod odpowiedzi z fallbackiem do mocka, twarda walidacja `reach` z fallbackiem do `"medium"`, obsługa `finishReason: MAX_TOKENS`, logging JSON z `requestId`. Klient: retry (2×, backoff 800/2000 ms) przy błędach sieciowych i 5xx. UI: banner „Tryb awaryjny — szablony" z przyciskiem „Spróbuj z AI" gdy `result.source === "mock"`.
- **Pliki:**
  - [`code/src/app/api/generate/route.ts`](code/src/app/api/generate/route.ts) — retry/backoff, AbortController, responseSchema, finishReason, logging
  - [`code/src/lib/gemini-prompt.ts`](code/src/lib/gemini-prompt.ts) — `GENERATE_RESPONSE_SCHEMA`, `parseGeminiResponse` z Zod + `reach` validation
  - [`code/src/types/generator.ts`](code/src/types/generator.ts) — `GenerateResultPayloadSchema`, `GenerateResultPayload`
  - [`code/src/components/features/generator/generator-results.tsx`](code/src/components/features/generator/generator-results.tsx) — banner mock + przycisk retry
  - [`code/src/components/features/generator/generator-section.tsx`](code/src/components/features/generator/generator-section.tsx) — retry klienta (2×)
  - [`code/.eslintrc.json`](code/.eslintrc.json) — konfiguracja ESLint (Next.js core-web-vitals)

---

## Historia generacji

- **Status:** DONE
- **Plan:** [PLAN_captionforge-new-features.md](docs/plans/PLAN_captionforge-new-features.md)
- **Opis:** Automatyczny zapis każdej generacji do `localStorage` (klucz `captionforge-history`, max 50 wpisów FIFO). Panel historii z listą wpisów, możliwością usunięcia pojedynczego wpisu i wyczyszczenia całej historii. Hook `useHistory` jako reaktywny wrapper nad `HistoryStorage` z obsługą SSR (flaga `mounted`).
- **Pliki:**
  - [`code/src/hooks/useHistory.ts`](code/src/hooks/useHistory.ts) — hook: entries, addEntry, removeEntry, clearAll
  - [`code/src/lib/history-storage.ts`](code/src/lib/history-storage.ts) — CRUD localStorage, max 50, FIFO
  - [`code/src/components/features/history/history-panel.tsx`](code/src/components/features/history/history-panel.tsx) — panel historii (CC)
  - [`code/src/components/features/history/history-entry.tsx`](code/src/components/features/history/history-entry.tsx) — pojedynczy wpis historii
  - [`code/src/types/history.ts`](code/src/types/history.ts) — typ HistoryEntry

---

## Eksport TXT

- **Status:** DONE
- **Plan:** [PLAN_captionforge-new-features.md](docs/plans/PLAN_captionforge-new-features.md)
- **Opis:** Pobieranie wyników generacji jako plik `.txt` z UTF-8 BOM (dla poprawnego wyświetlania polskich znaków w Notatniku Windows). Generowanie Blob po stronie klienta przez `URL.createObjectURL` — bez backendu.
- **Pliki:**
  - [`code/src/lib/export-txt.ts`](code/src/lib/export-txt.ts) — `exportTxt(result, params)` → download `.txt`

---

## Dark mode

- **Status:** DONE
- **Plan:** [PLAN_captionforge-new-features.md](docs/plans/PLAN_captionforge-new-features.md)
- **Opis:** Przełącznik trybu ciemnego/jasnego z persystencją w `localStorage` (klucz `captionforge-theme`). Anti-FOUC przez inline script w `layout.tsx` (przed hydratacją React). Tailwind skonfigurowany na `darkMode: ["class", '[data-theme="dark"]']` — wspiera obie selekcje. Automatyczne wykrywanie preferencji systemowej (`prefers-color-scheme`).
- **Pliki:**
  - [`code/src/hooks/useTheme.ts`](code/src/hooks/useTheme.ts) — hook: theme, toggleTheme, persystencja
  - [`code/src/components/ui/theme-toggle.tsx`](code/src/components/ui/theme-toggle.tsx) — przycisk toggle (CC)
  - [`code/src/app/layout.tsx`](code/src/app/layout.tsx) — inline anti-FOUC script (linia ~30)
  - [`code/tailwind.config.ts`](code/tailwind.config.ts) — `darkMode: ["class", '[data-theme="dark"]']`

---

## Progress bar

- **Status:** DONE
- **Plan:** [PLAN_captionforge-new-features.md](docs/plans/PLAN_captionforge-new-features.md)
- **Opis:** Animowany progress bar z 3 etapami tekstowymi podczas generowania opisów: „Analizuję temat...", „Generuję warianty...", „Dobieram hasztagi...". Automatyczne przejście między etapami co ~500 ms, reset po zakończeniu generowania.
- **Pliki:**
  - [`code/src/components/ui/progress-bar.tsx`](code/src/components/ui/progress-bar.tsx) — komponent CC z animacją etapów

---

## Toast notifications

- **Status:** DONE
- **Plan:** [PLAN_captionforge-new-features.md](docs/plans/PLAN_captionforge-new-features.md)
- **Opis:** Powiadomienia toast dla akcji użytkownika: „✅ Skopiowano!" po skopiowaniu opisu/hasztagów, „❌ Brak połączenia z internetem." przy błędzie fetch, „✅ Pobrano plik!" po eksporcie TXT. Auto-znikanie po 2 sekundach.
- **Pliki:**
  - [`code/src/components/ui/toast.tsx`](code/src/components/ui/toast.tsx) — komponent CC z zarządzaniem widocznością

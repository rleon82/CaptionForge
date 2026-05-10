# PLAN: Architecture Overview + ADR-y

> **Plan F** z roadmapy wdrożenia Spec Driven Development w CaptionForge — **ostatni plan SDD**.
> Tworzy wysokopoziomowy opis architektury (`system_overview.md`) i dwa Architecture Decision Records (ADR-y) udokumentowujące kluczowe decyzje projektu: wybór Next.js 14 App Router i wybór Google Gemini 2.0 Flash Lite.

---

## 1. Cel

Wypełnić katalog `docs/architecture/` (utworzony jako placeholder w Planie A) trzema artefaktami architektonicznymi wymaganymi przez metodykę **Spec Driven Development (SDD)**:
1. `system_overview.md` — wysokopoziomowy opis systemu CaptionForge: cel, stack, główne komponenty, integracje, granice systemu.
2. `adr_001_nextjs-app-router.md` — uzasadnienie wyboru Next.js 14 App Router vs alternatyw (Pages Router, Vite + React Router, Remix).
3. `adr_002_gemini-api.md` — uzasadnienie wyboru Google Gemini 2.0 Flash Lite vs alternatyw (OpenAI GPT-4, Anthropic Claude).

Cel biznesowy: **domknięcie roadmapy SDD** — po Planie F projekt CaptionForge ma 100% zgodność z metodyką SDD: pełna dokumentacja architektury (sekcja 1.2 wymagań SDD), audytowalne decyzje, samodokumentujące się repozytorium dla nowych członków zespołu i agentów AI.

---

## 2. Zakres

### 2.1. W zakresie

- Utworzenie pliku `docs/architecture/system_overview.md` z 5 sekcjami: opis systemu, stack, architektura komponentów, integracje zewnętrzne, granice systemu (co NIE jest w scope CaptionForge).
- Utworzenie pliku `docs/architecture/adr_001_nextjs-app-router.md` w formacie ADR (Status / Context / Decision / Consequences).
- Utworzenie pliku `docs/architecture/adr_002_gemini-api.md` w formacie ADR.
- Aktualizacja [`docs/architecture/README.md`](../architecture/README.md:1) — usunięcie noty `> Wypełnienie merytoryczne — Plan F.` i dodanie listy 3 nowych plików.
- Aktualizacja [`docs/roles/architect/README.md`](../roles/architect/README.md:1) — zmiana statusów w tabeli „Kluczowe artefakty" z `⏳ W Planie F` na `✅ Wdrożone` dla wpisów „Architecture Decision Records" i „System Overview".

### 2.2. Poza zakresem

- **Tworzenie kolejnych ADR-ów** (np. `adr_003_*`, `adr_004_*`) — to się dzieje przy KAŻDEJ przyszłej istotnej decyzji architektonicznej, nie w tym planie. Plan F tworzy pierwsze 2 ADR-y dokumentujące już-podjęte-i-wdrożone decyzje.
- **Modyfikacja [`docs/tech/technical-documentation.md`](../tech/technical-documentation.md:1)** — `system_overview.md` jest **wysokopoziomowym** wprowadzeniem do architektury; `technical-documentation.md` zostaje jako szczegółowy opis modułów. Plik `system_overview.md` MUSI cross-linkować do `technical-documentation.md` zamiast duplikować treść.
- **Tworzenie diagramów Mermaid w `system_overview.md`** poza prostym diagramem warstw — szczegółowe diagramy (sequence, state, data flow) już są w [`docs/tech/technical-documentation.md`](../tech/technical-documentation.md:1) sekcje 2.4–2.5.
- **Zmiana zawartości plików kodu** ([`code/src/**`](../../code/src:1)) — zerowy zakres.

---

## 3. Wymagania funkcjonalne

- **WF1.** Plik `docs/architecture/system_overview.md` MUSI zawierać 5 sekcji w kolejności:
  1. `## 1. Cel systemu` — 2–3 zdania o tym, co CaptionForge robi i dla kogo (na bazie [`docs/business/Job_To_Be_Done.md`](../business/Job_To_Be_Done.md:1)).
  2. `## 2. Stos technologiczny` — tabela z 6–8 warstwami (Framework / UI / Język / Style / Walidacja / AI Backend / Persystencja / Eksport) i wersjami; cross-link do [`docs/tech/technical-documentation.md`](../tech/technical-documentation.md:1) sekcja 5.
  3. `## 3. Architektura komponentów` — diagram Mermaid `graph TD` z 4 warstwami: Browser (UI/CC) → Next.js Server (Route Handler) → Gemini API + Browser Storage. Krótki opis każdej warstwy (1–2 zdania).
  4. `## 4. Integracje zewnętrzne` — tabela z 1 integracją (Gemini API) z polami: Nazwa / Typ / Komunikacja / Plik kontaktu (`code/src/app/api/generate/route.ts`) / Bezpieczeństwo (server-only). Cross-link do [`adr_002_gemini-api.md`](adr_002_gemini-api.md:1).
  5. `## 5. Granice systemu (Out of Scope MVP)` — lista 5–7 funkcji/integracji NIE będących częścią aktualnego CaptionForge MVP (na bazie sekcji „Do Not Build Yet" z [`docs/business/Job_To_Be_Done.md`](../business/Job_To_Be_Done.md:1)).

- **WF2.** Plik `docs/architecture/adr_001_nextjs-app-router.md` MUSI być w formacie ADR z 4 sekcjami:
  1. `## Status` — `Accepted (kwiecień 2026)`.
  2. `## Context` — opis sytuacji decyzyjnej: aplikacja przemigrowuje z Vanilla HTML/JS do nowoczesnego frameworka; potrzeba: SSR + streaming, ukrycie klucza API, TypeScript, testowalność. 2–3 zdania.
  3. `## Decision` — wybrano **Next.js 14 App Router** zamiast: Pages Router (legacy), Vite + React Router (brak SSR/streaming), Remix (mniej ekosystemu). Lista 3–5 powodów wyboru.
  4. `## Consequences` — pozytywne (zalety zrealizowane), negatywne/koszty (np. complexity SC vs CC, wymóg `'use client'`), neutralne (zmiany w workflow).

- **WF3.** Plik `docs/architecture/adr_002_gemini-api.md` MUSI być w formacie ADR z 4 sekcjami:
  1. `## Status` — `Accepted (kwiecień 2026)`.
  2. `## Context` — opis: aplikacja potrzebuje LLM do generowania opisów; wymagania: niska latencja (<5s), niska cena (MVP/free tier), polski język, generacja JSON, fallback przy awarii. 2–3 zdania.
  3. `## Decision` — wybrano **Google Gemini 2.0 Flash Lite** zamiast: OpenAI GPT-4 (drogi), GPT-3.5-turbo (gorsza jakość PL), Anthropic Claude (brak free tier w 2026), self-hosted Llama (koszt infrastruktury). Lista 3–5 powodów.
  4. `## Consequences` — pozytywne (cena, szybkość, jakość PL), negatywne (uzależnienie od jednego providera, mniejsza społeczność niż OpenAI, ograniczenia rate limit free tier), neutralne (Strategy Pattern w `gemini-prompt.ts` ułatwia przyszłą zmianę providera).

- **WF4.** Aktualizacja [`docs/architecture/README.md`](../architecture/README.md:1) — usunięcie noty `> Wypełnienie merytoryczne — Plan F.` i dodanie sekcji `## Zawartość` z listą 3 nowych plików:
  - `system_overview.md` — wysokopoziomowy opis systemu.
  - `adr_001_nextjs-app-router.md` — wybór frameworka.
  - `adr_002_gemini-api.md` — wybór LLM.
  - `legacy-vanilla-plan.md` — historyczny plan Vanilla (zachowany jako kontekst).

- **WF5.** Aktualizacja [`docs/roles/architect/README.md`](../roles/architect/README.md:1) — w tabeli „Kluczowe artefakty":
  - Wpis „Architecture Decision Records" — status `⏳ ADR-y w Planie F` → `✅ Wdrożone (adr_001, adr_002)`.
  - Wpis „System Overview" — status `⏳ W Planie F` → `✅ Wdrożony`.

- **WF6.** Wszystkie linki względne w 3 nowych plikach MUSZĄ prowadzić do istniejących plików (poziom `docs/architecture/` — czyli `../business/`, `../tech/`, `../../code/src/`).

---

## 4. Wymagania niefunkcjonalne

### 4.1. Wydajność

- Nie dotyczy. Operacje wyłącznie na plikach `*.md`.

### 4.2. Bezpieczeństwo

- Brak wpływu. Pliki architektoniczne nie zawierają sekretów.
- ADR-y MUSZĄ wzmiankować bezpieczeństwo jako consequence (np. `adr_002` — klucz Gemini nigdy w kliencie, server-only proxy).

### 4.3. UX/DX (Developer Experience)

- `system_overview.md` MUSI być czytelny w **3–5 minut** — dla nowego developera onboardującego się do projektu lub agenta AI przejmującego zadanie. Maksymalna długość: **80 linii**.
- Każdy ADR MUSI być czytelny w **2–3 minuty** — krótki, fokus na uzasadnienie decyzji, nie na implementację. Maksymalna długość per ADR: **50 linii**.
- Diagram Mermaid w `system_overview.md` MUSI używać prostej składni (bez double quotes w `[]`, bez parentheses w `[]`) — zgodnie z regułą z [`who-am-i.md`](../../kilocode/rules/who-am-i.md:1).

### 4.4. Audytowalność

- ADR-y są **niezmienne** po zaakceptowaniu (Status: Accepted). Jeśli przyszłe decyzje zmienią wybór — tworzymy NOWY ADR (`adr_NNN`) ze statusem `Supersedes adr_001` zamiast modyfikować stary.
- Każdy ADR MUSI mieć **datę** w sekcji Status — pozwala śledzić chronologię decyzji.

---

## 5. Kontekst techniczny

### 5.1. Komponenty / pliki dotknięte zmianą

| Plik | Typ zmiany | Opis |
|------|------------|------|
| `docs/architecture/system_overview.md` | Utworzenie | Wysokopoziomowy opis systemu z 5 sekcjami (WF1). |
| `docs/architecture/adr_001_nextjs-app-router.md` | Utworzenie | ADR uzasadniający wybór Next.js 14 App Router (WF2). |
| `docs/architecture/adr_002_gemini-api.md` | Utworzenie | ADR uzasadniający wybór Gemini 2.0 Flash Lite (WF3). |
| [`docs/architecture/README.md`](../architecture/README.md:1) | Modyfikacja | Usunięcie noty „Wypełnienie merytoryczne — Plan F" + dodanie sekcji „Zawartość" (WF4). |
| [`docs/roles/architect/README.md`](../roles/architect/README.md:1) | Modyfikacja (2 wiersze tabeli) | Zmiana statusów `⏳` → `✅` dla System Overview i ADR (WF5). |

### 5.2. API / Dane

- Brak. Operacje wyłącznie na markdown.

### 5.3. Zależności od innych modułów / planów

- **Wymaga ukończenia Planu A** (placeholder `docs/architecture/README.md` istnieje). ✅ Zrealizowane.
- **Wymaga ukończenia Planu E** (rola Architect ma sekcję „Kluczowe artefakty" do zaktualizowania). ✅ Zrealizowane.
- **Otwiera drogę dla:** żaden plan nie zależy od Planu F — to ostatni plan roadmapy SDD.

### 5.4. Stos technologiczny

- Markdown (CommonMark + GitHub Flavored Markdown).
- Mermaid diagram (jeden w `system_overview.md`).

### 5.5. Źródła do treści (na czym opieramy ADR-y)

- **`adr_001_nextjs-app-router.md`** — bazuje na [`docs/tech/technical-documentation.md`](../tech/technical-documentation.md:1) sekcja 2 (architektura) i [`docs/architecture/legacy-vanilla-plan.md`](../architecture/legacy-vanilla-plan.md:1) (kontekst migracji z Vanilla).
- **`adr_002_gemini-api.md`** — bazuje na [`docs/tech/technical-documentation.md`](../tech/technical-documentation.md:1) sekcja 4 (integracja Gemini), [`docs/plans/PLAN_gemini-api-integration.md`](PLAN_gemini-api-integration.md:1) i kodzie [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:1).
- **`system_overview.md`** — bazuje na [`docs/tech/technical-documentation.md`](../tech/technical-documentation.md:1) sekcja 2.1 (struktura plików), 2.2 (diagram), 5 (stack).

---

## 6. Kroki implementacji

1. **Utwórz** `docs/architecture/system_overview.md` (write_to_file) z 5 sekcjami zgodnie z WF1:
   - Sekcja 1: cel z [`Job_To_Be_Done.md`](../business/Job_To_Be_Done.md:1) (Core Job-to-be-Done).
   - Sekcja 2: tabela stosu z [`technical-documentation.md`](../tech/technical-documentation.md:1) sekcja 5.1.
   - Sekcja 3: prosty diagram Mermaid `graph TD` z 4 warstwami (Browser → Next.js Server → Gemini API + Browser Storage).
   - Sekcja 4: tabela integracji (1 wiersz: Gemini API).
   - Sekcja 5: lista 5–7 elementów Out of Scope z [`Job_To_Be_Done.md`](../business/Job_To_Be_Done.md:1) („Do Not Build Yet").

2. **Utwórz** `docs/architecture/adr_001_nextjs-app-router.md` (write_to_file) z 4 sekcjami zgodnie z WF2:
   - Status: `Accepted (kwiecień 2026)`.
   - Context: 2–3 zdania o migracji z Vanilla i wymaganiach (SSR, ukrycie klucza API, TypeScript).
   - Decision: wybór Next.js 14 App Router; lista 3–5 powodów (App Router > Pages Router dla streaming, Server Components, ekosystem Vercel, TypeScript-first).
   - Consequences: zalety (SC reduces JS bundle, Route Handlers for proxy, streaming), koszty (complexity SC/CC boundary, mandatory `'use client'`), neutralne.

3. **Utwórz** `docs/architecture/adr_002_gemini-api.md` (write_to_file) z 4 sekcjami zgodnie z WF3:
   - Status: `Accepted (kwiecień 2026)`.
   - Context: potrzeba LLM, wymagania (latency <5s, low cost, PL quality, JSON output, fallback).
   - Decision: Gemini 2.0 Flash Lite; lista powodów (cena, szybkość, jakość PL, free tier, JSON mode).
   - Consequences: zalety, koszty (vendor lock-in, mniejsza społeczność niż OpenAI, free tier limity), neutralne (Strategy Pattern w [`gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts:1) ułatwia migrację).

4. **Zaktualizuj** [`docs/architecture/README.md`](../architecture/README.md:1) (apply_diff):
   - Usuń linię `> Wypełnienie merytoryczne: Plan F (system_overview.md + adr_001_*.md + adr_002_*.md).`.
   - Dodaj sekcję `## Zawartość` z 4 wpisami (system_overview, adr_001, adr_002, legacy-vanilla-plan).

5. **Zaktualizuj** [`docs/roles/architect/README.md`](../roles/architect/README.md:1) (apply_diff) — w tabeli „Kluczowe artefakty":
   - Wiersz „Architecture Decision Records": status `⏳ ADR-y w Planie F` → `✅ Wdrożone (adr_001, adr_002)`.
   - Wiersz „System Overview": lokalizacja z `\`docs/architecture/system_overview.md\`` (bez linka, bo nie istnieje) → `[\`docs/architecture/system_overview.md\`](../../architecture/system_overview.md)`, status `⏳ W Planie F` → `✅ Wdrożony`.

6. **Aktualizacja rejestru** [`implemented_plans.md`](../../implemented_plans.md:1) (apply_diff): wpis Planu F z `[ ]` `PLANNED` → `[x]` `DONE` (część kroku 5 workflow `implement`).

---

## 7. Kryteria akceptacji

- **KA1.** Plik `docs/architecture/system_overview.md` istnieje i ma 5 sekcji `## ` (1. Cel systemu, 2. Stos, 3. Architektura, 4. Integracje, 5. Granice).
- **KA2.** Plik `docs/architecture/adr_001_nextjs-app-router.md` istnieje i ma 4 sekcje `## ` (Status, Context, Decision, Consequences). Status zawiera `Accepted` i datę `kwiecień 2026`.
- **KA3.** Plik `docs/architecture/adr_002_gemini-api.md` istnieje i ma 4 sekcje `## `. Status `Accepted` + data.
- **KA4.** Długości plików: `system_overview.md` ≤ 80 linii, `adr_001_*.md` ≤ 50 linii, `adr_002_*.md` ≤ 50 linii (sekcja 4.3 UX/DX).
- **KA5.** Plik [`docs/architecture/README.md`](../architecture/README.md:1) **nie zawiera** już noty „Wypełnienie merytoryczne" i zawiera sekcję `## Zawartość` z 4 wpisami.
- **KA6.** Plik [`docs/roles/architect/README.md`](../roles/architect/README.md:1) ma w tabeli „Kluczowe artefakty" status `✅ Wdrożone` dla wpisu „Architecture Decision Records" i `✅ Wdrożony` dla „System Overview".
- **KA7.** Wszystkie linki względne w 3 nowych plikach prowadzą do istniejących plików (sprawdzane wzrokowo, w szczególności: `../business/Job_To_Be_Done.md`, `../tech/technical-documentation.md`, `../../code/src/app/api/generate/route.ts`, `../../code/src/lib/gemini-prompt.ts`).
- **KA8.** Diagram Mermaid w `system_overview.md` parsuje się poprawnie w VS Code Markdown Preview (brak double quotes ani parentheses w `[]`).
- **KA9.** Brak zmian w plikach kodu źródłowego ([`code/src/**`](../../code/src:1)). Komendy `cd code && npx tsc --noEmit && npm run lint` zwracają **0 błędów**.
- **KA10.** Wpis Planu F w [`implemented_plans.md`](../../implemented_plans.md:1) zmieniony z `[ ]` na `[x]`, status `PLANNED` → `DONE`.
- **KA11.** **Definition of Done roadmapy SDD:** po wdrożeniu Planu F wszystkie 6 planów (A, B, C, D, E, F) ma status `[x] DONE` w `implemented_plans.md`. Roadmapa SDD jest **w 100% zrealizowana**.

---

## 8. Testy

### 8.1. Testy unit

- **Nie dotyczy.** Zmiana wyłącznie w `*.md`.

### 8.2. Testy integracyjne

- **Nie dotyczy.**

### 8.3. Testy manualne

- **TM1.** Otwórz `docs/architecture/system_overview.md` w VS Code Markdown Preview. Sprawdź:
  - Renderowanie 5 sekcji.
  - Diagram Mermaid renderuje się jako graf (nie kod) — bez błędów parsera.
  - Linki do `../business/Job_To_Be_Done.md`, `../tech/technical-documentation.md`, `adr_002_gemini-api.md` są klikalne.
- **TM2.** Otwórz `docs/architecture/adr_001_nextjs-app-router.md` i `adr_002_gemini-api.md`. Sprawdź format ADR (Status / Context / Decision / Consequences) i czytelność.
- **TM3.** W VS Code Markdown Preview otwórz [`docs/architecture/README.md`](../architecture/README.md:1) — sprawdź, że sekcja `## Zawartość` zawiera 4 klikalne linki do nowych plików.
- **TM4.** W VS Code Markdown Preview otwórz [`docs/roles/architect/README.md`](../roles/architect/README.md:1) — sprawdź, że tabela „Kluczowe artefakty" ma `✅ Wdrożone` i `✅ Wdrożony` dla ADR-ów i System Overview.
- **TM5.** Sprawdź długości:
  ```bash
  wc -l docs/architecture/system_overview.md docs/architecture/adr_*.md
  ```
  - `system_overview.md`: ≤ 80
  - `adr_001_*.md`: ≤ 50
  - `adr_002_*.md`: ≤ 50
- **TM6.** Sprawdź placeholdery:
  ```bash
  grep -l "Wypełnienie merytoryczne" docs/architecture/*.md docs/roles/*/README.md
  ```
  Wynik MUSI być **pusty**.
- **TM7.** Sprawdź w terminalu (potwierdza KA9):
  ```bash
  cd code && npx tsc --noEmit && npm run lint
  ```
  Wynik MUSI być **bez błędów**.
- **TM8.** **Final SDD validation:** sprawdź, że wszystkie 6 planów ma `[x]` w `implemented_plans.md`:
  ```bash
  grep -c "^- \[x\]" implemented_plans.md  # Oczekiwane: 10 (4 historyczne + 6 SDD)
  grep -c "^- \[ \]" implemented_plans.md  # Oczekiwane: 0
  ```

### 8.4. Definition of Done (skrót)

Plan F jest ukończony, gdy: KA1 ∧ KA2 ∧ KA3 ∧ KA4 ∧ KA5 ∧ KA6 ∧ KA7 ∧ KA8 ∧ KA9 ∧ KA10 ∧ KA11 ∧ TM1–TM8 wszystkie ✅.

**KA11 (100% SDD)** jest **finalnym kryterium roadmapy** — po jego spełnieniu projekt CaptionForge ma pełną zgodność z metodyką Spec Driven Development.

---

## 🚀 Następny krok

**Plan F jest ostatnim planem roadmapy SDD.** Po jego wdrożeniu nie ma kolejnego planu meta-warstwy do napisania — projekt jest w pełni zgodny z SDD.

Naturalnym **następnym krokiem PO Planie F** jest:

> **Powrót do funkcjonalnego rozwoju produktu.** Pierwszy plan funkcjonalny po wdrożeniu SDD powinien być pisany w nowym szablonie ([`dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1)) i implementowany zgodnie z workflow `implement` ([`dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md:1)).
>
> Sugerowane priorytety (z [`docs/business/User_Journey_Map.md`](../business/User_Journey_Map.md:1) sekcja IV „THE Bottleneck"):
> 1. **localStorage cache wyników** (Quick Win) — zapobiega utracie wyników przy refresh.
> 2. **Banner wartości pod outputem** (Quick Win) — `⏱️ Zaoszczędziłeś ~15 minut`.
> 3. **System kont (Supabase Auth)** (P1) — fundament retencji.
> 4. **Pierwsze testy unit + integracyjne** (P1) — `code/src/lib/*.test.ts` dla `export-txt.ts`, `gemini-prompt.ts`.
>
> Każda z tych funkcjonalności = osobny atomowy plan SDD (max 3 pliki kodu, 2–3 h).

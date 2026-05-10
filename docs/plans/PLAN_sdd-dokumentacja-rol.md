# PLAN: Dokumentacja ról projektowych SDD

> **Plan E** z roadmapy wdrożenia Spec Driven Development w CaptionForge.
> Wypełnia merytorycznie 5 plików `docs/roles/*/README.md` opisujących role projektowe wymagane przez SDD: Product Owner, UX/UI, Architect, Developer, Tester.

---

## 1. Cel

Wypełnić merytorycznie pięć plików `README.md` w katalogach `docs/roles/{product_owner, ux_ui, architect, developer, tester}/` — utworzonych jako placeholdery w Planie A. Każdy plik MUSI opisywać jedną rolę projektową w formacie zgodnym z metodyką **Spec Driven Development (SDD)**: zakres odpowiedzialności, kluczowe artefakty, typowe zadania w cyklu SDD oraz cross-linki do referencyjnych dokumentów (`docs/business/`, `docs/tech/`, `docs/architecture/`, `kilocode/rules/`).

Cel biznesowy: usunięcie ostatniego placeholdera „Wypełnienie merytoryczne — Plan E" z dokumentacji projektu. Po Planie E każda osoba wchodząca do projektu (lub agent AI przejmujący zadanie w danej roli) ma jeden punkt wejścia opisujący „co ta rola robi w SDD", co skraca onboarding z godzin do minut.

---

## 2. Zakres

### 2.1. W zakresie

- Aktualizacja pięciu plików (write_to_file lub apply_diff — w zależności od skali zmiany; tu rewrite będzie czytelniejszy):
  - [`docs/roles/product_owner/README.md`](../roles/product_owner/README.md:1)
  - [`docs/roles/ux_ui/README.md`](../roles/ux_ui/README.md:1)
  - [`docs/roles/architect/README.md`](../roles/architect/README.md:1)
  - [`docs/roles/developer/README.md`](../roles/developer/README.md:1)
  - [`docs/roles/tester/README.md`](../roles/tester/README.md:1)
- Każdy plik MUSI mieć jednolitą strukturę 5 sekcji (patrz WF1).
- Usunięcie noty `> Wypełnienie merytoryczne — Plan E.` z każdego z plików (po faktycznym wypełnieniu).

### 2.2. Poza zakresem

- **Tworzenie dodatkowych plików w `docs/roles/*/`** — jeden plik `README.md` na rolę wystarczy w MVP SDD (np. nie tworzymy `roles/product_owner/backlog.md` — backlog to oddzielny artefakt do utworzenia w przyszłym planie).
- **Modyfikacja [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:1) ani [`dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) ani [`dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md:1)** — pliki ról linkują do tych dokumentów, nie modyfikują ich.
- **Tworzenie ADR-ów ani `system_overview.md`** — to zakres **Planu F**.
- **Aktualizacja [`README.md`](../../README.md:1) (root)** — sekcja „Dokumentacja" już zawiera link do `docs/roles/`, nie wymaga zmiany.
- **Zmiana zawartości [`code/src/**`](../../code/src:1)** — zerowy zakres dotykający kodu aplikacji.

---

## 3. Wymagania funkcjonalne

- **WF1.** Każdy z 5 plików `docs/roles/*/README.md` MUSI mieć dokładnie te sekcje (w tej kolejności):
  1. **Nagłówek H1** — `# docs/roles/<nazwa>` (zachowana konwencja z Planu A).
  2. **Krótki opis (1–2 zdania)** — czym jest ta rola w projekcie CaptionForge.
  3. `## Zakres odpowiedzialności` — lista 4–6 punktów (każdy z linkiem do referencyjnego dokumentu/katalogu, gdzie to ma sens).
  4. `## Kluczowe artefakty` — tabela `| Artefakt | Lokalizacja | Status |` z listą dokumentów/plików, za które rola odpowiada.
  5. `## Typowe zadania w cyklu SDD` — numerowana lista 3–5 zadań, które rola wykonuje wielokrotnie (lifecycle: planowanie → implementacja → review → utrzymanie).

- **WF2.** **Product Owner** ([`docs/roles/product_owner/README.md`](../roles/product_owner/README.md:1)) MUSI zawierać:
  - Zakres odpowiedzialności obejmuje: wizję produktu, backlog (priorytetyzacja planów SDD), walidację Definition of Done, kontakt z personami z [`docs/business/Job_To_Be_Done.md`](../business/Job_To_Be_Done.md:1).
  - Kluczowe artefakty: [`docs/business/Job_To_Be_Done.md`](../business/Job_To_Be_Done.md:1), [`docs/business/User_Journey_Map.md`](../business/User_Journey_Map.md:1), [`implemented_plans.md`](../../implemented_plans.md:1), [`implemented_features.md`](../../implemented_features.md:1).
  - Typowe zadania: pisanie nowych planów (z Architectem), priorytetyzacja, akceptacja Definition of Done, raportowanie postępu interesariuszom.

- **WF3.** **UX/UI** ([`docs/roles/ux_ui/README.md`](../roles/ux_ui/README.md:1)) MUSI zawierać:
  - Zakres: User Journey Map (utrzymanie), system designu, dostępność (WCAG), spójność komponentów UI.
  - Kluczowe artefakty: [`docs/business/User_Journey_Map.md`](../business/User_Journey_Map.md:1), [`code/src/app/globals.css`](../../code/src/app/globals.css:1), [`code/tailwind.config.ts`](../../code/tailwind.config.ts:1), [`code/src/constants/design-tokens.ts`](../../code/src/constants/design-tokens.ts:1), [`code/src/components/ui/`](../../code/src/components/ui:1).
  - Typowe zadania: aktualizacja User Journey przy nowych funkcjonalnościach, walidacja spójności designu, audyt dostępności, definiowanie wymagań UX w sekcji 4.3 planu.

- **WF4.** **Architect** ([`docs/roles/architect/README.md`](../roles/architect/README.md:1)) MUSI zawierać:
  - Zakres: decyzje architektoniczne (ADR-y), modele systemu, integracje (Gemini API), granice modułów, wybór stosu technologicznego.
  - Kluczowe artefakty: [`docs/architecture/`](../architecture:1) (ADR-y, `system_overview.md` po Planie F), [`docs/tech/technical-documentation.md`](../tech/technical-documentation.md:1), [`code/src/app/api/`](../../code/src/app/api:1), [`code/src/services/`](../../code/src/services:1).
  - Typowe zadania: pisanie ADR-ów dla nowych decyzji, review sekcji 5 planów (Kontekst techniczny), audyt zależności (`code/package.json`), definiowanie wymagań niefunkcjonalnych (sekcja 4 planu).

- **WF5.** **Developer** ([`docs/roles/developer/README.md`](../roles/developer/README.md:1)) MUSI zawierać:
  - Zakres: implementacja planów zgodnie z [`kilocode/rules/dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md:1), przestrzeganie [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:1), weryfikacja jakości kodu (`tsc + lint + build`), aktualizacja rejestrów.
  - Kluczowe artefakty: [`code/src/`](../../code/src:1) (cała aplikacja), [`code/package.json`](../../code/package.json:1), [`code/tsconfig.json`](../../code/tsconfig.json:1), [`implemented_plans.md`](../../implemented_plans.md:1), [`implemented_features.md`](../../implemented_features.md:1).
  - Typowe zadania: 6-krokowy workflow implementacji (Read → Verify → Implement → Test → Update Registries → Report), refaktor wyłącznie w ramach planu, weryfikacja `tsc + lint + build`, raportowanie ukończenia.

- **WF6.** **Tester** ([`docs/roles/tester/README.md`](../roles/tester/README.md:1)) MUSI zawierać:
  - Zakres: definiowanie sekcji 8 (Testy) w planach, pisanie testów unit/integracyjnych, scenariusze testów manualnych, weryfikacja Definition of Done przed oznaczeniem planu jako ukończony.
  - Kluczowe artefakty: pliki `*.test.ts(x)` w [`code/src/`](../../code/src:1) (kolokowane przy testowanych modułach), Sekcja 8 każdego [`docs/plans/PLAN_*.md`](../plans:1).
  - Typowe zadania: pisanie testów Vitest dla [`code/src/lib/`](../../code/src/lib:1) i [`code/src/hooks/`](../../code/src/hooks:1), testy integracyjne Route Handlerów ([`code/src/app/api/`](../../code/src/app/api:1)), wykonanie testów manualnych z list TM1, TM2, … w każdym planie, weryfikacja KA przed zamknięciem planu.

- **WF7.** Każdy plik MUSI mieć **wszystkie linki względne** poprawne z perspektywy `docs/roles/<nazwa>/README.md` (poziom 3 zagłębienia od roota — `../../../code/`, `../../`, `../<inna-rola>/`).

- **WF8.** Po wdrożeniu, **żaden** z 5 plików nie zawiera już noty `> Wypełnienie merytoryczne — Plan E.` (sprawdzane przez `grep "Wypełnienie merytoryczne — Plan E" docs/roles/*/README.md` — wynik MUSI być pusty).

---

## 4. Wymagania niefunkcjonalne

### 4.1. Wydajność

- Nie dotyczy. Operacje wyłącznie na plikach `*.md`.

### 4.2. Bezpieczeństwo

- Brak wpływu. Pliki ról nie zawierają sekretów ani PII.

### 4.3. UX/DX (Developer Experience)

- Każdy plik MUSI mieścić się w **30–80 liniach** — krótki, scanowalny, używany jako szybka referencja, nie jako traktat.
- Spójna struktura 5 sekcji (WF1) między wszystkimi 5 plikami — DRY, łatwo porównać role.
- Tabela „Kluczowe artefakty" z 3 kolumnami (Artefakt / Lokalizacja / Status) — jednolity format we wszystkich plikach.

### 4.4. Audytowalność

- Każda kluczowa odpowiedzialność roli MUSI być **oparta na istniejącym dokumencie** w projekcie (nie wymyślamy ról „na zapas") — link do `docs/business/`, `docs/tech/`, `code/src/` itp.
- Plan E nie wprowadza nowych konceptów — tylko **dokumentuje istniejące** (zasada YAGNI z [`dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:235)).

---

## 5. Kontekst techniczny

### 5.1. Komponenty / pliki dotknięte zmianą

| Plik | Typ zmiany | Opis |
|------|------------|------|
| [`docs/roles/product_owner/README.md`](../roles/product_owner/README.md:1) | Rewrite (write_to_file) | Wypełnienie 5 sekcji zgodnie z WF2. |
| [`docs/roles/ux_ui/README.md`](../roles/ux_ui/README.md:1) | Rewrite | Wypełnienie zgodnie z WF3. |
| [`docs/roles/architect/README.md`](../roles/architect/README.md:1) | Rewrite | Wypełnienie zgodnie z WF4. |
| [`docs/roles/developer/README.md`](../roles/developer/README.md:1) | Rewrite | Wypełnienie zgodnie z WF5 (zachowanie aktualnego linku do `dev-implement-workflow.md`). |
| [`docs/roles/tester/README.md`](../roles/tester/README.md:1) | Rewrite | Wypełnienie zgodnie z WF6. |

### 5.2. API / Dane

- Brak. Operacje wyłącznie na markdown.

### 5.3. Zależności od innych modułów / planów

- **Wymaga ukończenia Planu A** (placeholdery `docs/roles/*/README.md` zostały utworzone). ✅ Zrealizowane.
- **Wymaga ukończenia Planu B** (linki w plikach ról wskazują na `implemented_plans.md` i `implemented_features.md`). ✅ Zrealizowane.
- **Wymaga ukończenia Planu D** (rola Developer linkuje do `dev-implement-workflow.md`). ✅ Zrealizowane.
- **Otwiera drogę dla:** Plan F (rola Architect odwołuje się do `docs/architecture/system_overview.md` + ADR-ów; Plan F je tworzy — lekka cyrkularność, ale akceptowalna, bo Plan E linkuje do **katalogu** `docs/architecture/`, nie do konkretnego pliku).

### 5.4. Stos technologiczny

- Markdown (CommonMark + GitHub Flavored Markdown).
- Brak narzędzi automatycznych.

---

## 6. Kroki implementacji

1. **Przepisz** [`docs/roles/product_owner/README.md`](../roles/product_owner/README.md:1) (write_to_file) zgodnie z WF1 + WF2 — 5 sekcji, lista 4–6 odpowiedzialności z linkami do `docs/business/`, tabela kluczowych artefaktów, lista 3–5 typowych zadań.
2. **Przepisz** [`docs/roles/ux_ui/README.md`](../roles/ux_ui/README.md:1) zgodnie z WF1 + WF3 — odpowiedzialności w UX/UI, linki do User Journey + design tokens + komponenty UI.
3. **Przepisz** [`docs/roles/architect/README.md`](../roles/architect/README.md:1) zgodnie z WF1 + WF4 — odpowiedzialności architektoniczne, linki do `docs/architecture/`, `docs/tech/`, `code/src/app/api/`, `code/src/services/`.
4. **Przepisz** [`docs/roles/developer/README.md`](../roles/developer/README.md:1) zgodnie z WF1 + WF5 — **zachowaj** istniejący link do [`kilocode/rules/dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md:1) z Planu D. Rozszerz o 6-krokowy workflow.
5. **Przepisz** [`docs/roles/tester/README.md`](../roles/tester/README.md:1) zgodnie z WF1 + WF6 — odpowiedzialności testerskie, linki do plików testów i sekcji 8 planów.
6. **Weryfikacja** — wykonaj `grep "Wypełnienie merytoryczne — Plan E" docs/roles/*/README.md` — wynik MUSI być pusty (WF8). Wykonaj `wc -l docs/roles/*/README.md` — każdy plik MUSI mieć 30–80 linii (sekcja 4.3 UX/DX).

---

## 7. Kryteria akceptacji

- **KA1.** Każdy z 5 plików `docs/roles/*/README.md` zawiera dokładnie 4 nagłówki: H1 (`# docs/roles/<nazwa>`) + 3 sekcje H2 (`## Zakres odpowiedzialności`, `## Kluczowe artefakty`, `## Typowe zadania w cyklu SDD`) — sprawdzane przez `for f in docs/roles/*/README.md; do echo "$f:"; grep -c "^## " "$f"; done` (każdy MUSI mieć **3** sekcje H2).
- **KA2.** **Żaden** z 5 plików nie zawiera już noty `> Wypełnienie merytoryczne` — sprawdzane przez `grep -l "Wypełnienie merytoryczne" docs/roles/*/README.md` (wynik MUSI być pusty).
- **KA3.** Każdy plik ma długość **30–80 linii** — sprawdzane przez `wc -l docs/roles/*/README.md`.
- **KA4.** Sekcja `## Kluczowe artefakty` w każdym pliku jest **tabelą** z 3 kolumnami (Artefakt / Lokalizacja / Status) — sprawdzane wzrokowo.
- **KA5.** Wszystkie linki względne w 5 plikach prowadzą do istniejących plików/katalogów — sprawdzane wzrokowo, w szczególności krytyczne ścieżki: `docs/business/Job_To_Be_Done.md`, `docs/business/User_Journey_Map.md`, `docs/architecture/`, `docs/tech/technical-documentation.md`, `kilocode/rules/dev-coding-rules.md`, `kilocode/rules/dev-implement-workflow.md`, `code/src/app/api/`, `code/src/components/ui/`, `code/src/lib/`, `code/src/hooks/`, `implemented_plans.md`, `implemented_features.md`.
- **KA6.** Brak zmian w plikach kodu źródłowego ([`code/src/**`](../../code/src:1)). Komendy `cd code && npx tsc --noEmit && npm run lint` zwracają **0 błędów**.
- **KA7.** Wpis Planu E w [`implemented_plans.md`](../../implemented_plans.md:1) zmieniony z `[ ]` na `[x]`, status `PLANNED` → `DONE` (część kroku 5 workflow `implement`).

---

## 8. Testy

### 8.1. Testy unit

- **Nie dotyczy.** Zmiana wyłącznie w `*.md`.

### 8.2. Testy integracyjne

- **Nie dotyczy.**

### 8.3. Testy manualne

- **TM1.** Otwórz każdy z 5 plików `docs/roles/*/README.md` w VS Code Markdown Preview (Cmd+Shift+V). Sprawdź:
  - Wszystkie 5 plików ma jednolitą strukturę (H1 + 3 sekcje H2).
  - Tabele „Kluczowe artefakty" renderują się poprawnie z 3 kolumnami.
  - Linki w sekcji „Zakres odpowiedzialności" są klikalne.
- **TM2.** W terminalu sprawdź długość plików:
  ```bash
  wc -l docs/roles/*/README.md
  ```
  Każdy plik MUSI mieć 30–80 linii.
- **TM3.** Sprawdź usunięcie placeholderów:
  ```bash
  grep -l "Wypełnienie merytoryczne" docs/roles/*/README.md
  ```
  Wynik MUSI być **pusty** (brak trafień).
- **TM4.** **Test cross-roli** — przeczytaj 5 plików w kolejności PO → UX → Architect → Developer → Tester. Sprawdź, czy:
  - Nie ma duplikacji odpowiedzialności (np. „pisanie planów" pojawia się tylko u PO i Architect, nie u Developera).
  - Każda rola ma jasne, niepokrywające się granice.
  - Linki cross-role (np. Developer → `dev-implement-workflow.md`) są spójne między plikami.
- **TM5.** Sprawdź w terminalu (potwierdza KA6):
  ```bash
  cd code && npx tsc --noEmit && npm run lint
  ```
  Wynik MUSI być **bez błędów**.

### 8.4. Definition of Done (skrót)

Plan E jest ukończony, gdy: KA1 ∧ KA2 ∧ KA3 ∧ KA4 ∧ KA5 ∧ KA6 ∧ KA7 ∧ TM1–TM5 wszystkie ✅.

---

## 🚀 Następny krok

Po zakończeniu Planu E, zgodnie z roadmapą SDD, **ostatnim** planem do realizacji jest:

> **Plan F — Architecture Overview + ADR-y.**
> Plik docelowy: `docs/plans/PLAN_sdd-architecture-adr.md`. Obejmuje:
> - utworzenie `docs/architecture/system_overview.md` (wysokopoziomowy opis CaptionForge: stack, architektura Next.js, integracja Gemini, decyzje kluczowe — na bazie `docs/tech/technical-documentation.md`);
> - utworzenie `docs/architecture/adr_001_nextjs-app-router.md` (ADR uzasadniający wybór Next.js 14 App Router vs Pages Router / inne frameworki);
> - utworzenie `docs/architecture/adr_002_gemini-api.md` (ADR uzasadniający wybór Google Gemini 2.0 Flash Lite vs OpenAI GPT-4 / Anthropic Claude).
>
> Po Planie F roadmapa SDD jest **w 100% wdrożona** — projekt CaptionForge zyskuje pełną zgodność z metodyką Spec Driven Development.

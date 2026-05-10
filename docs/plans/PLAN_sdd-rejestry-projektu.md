# PLAN: Rejestry projektu SDD (implemented_plans, implemented_features, README roota)

> **Plan B** z roadmapy wdrożenia Spec Driven Development w CaptionForge.
> Tworzy trzy pliki rejestrowe wymagane przez SDD: `implemented_plans.md`, `implemented_features.md` i główny `README.md` w roocie repozytorium.

---

## 1. Cel

Wprowadzić w repozytorium CaptionForge trzy pliki rejestrowe wymagane przez metodykę **Spec Driven Development (SDD)**:
1. `implemented_plans.md` — lista wszystkich planów z `docs/plans/` z polami statusu `[x]`/`[ ]`.
2. `implemented_features.md` — opis zaimplementowanych funkcjonalności na bazie aktualnego stanu `code/src/**`.
3. `README.md` w roocie repozytorium — indeks projektu opisujący strukturę SDD i kierujący do `docs/`, `code/`, `kilocode/`, `vanilla web/`.

Cel biznesowy: zapewnienie **jednego źródła prawdy** (single source of truth) o stanie projektu — każdy agent AI lub developer może w 30 sekund ustalić, co jest zaimplementowane, co jest zaplanowane i gdzie szukać kodu.

---

## 2. Zakres

### 2.1. W zakresie

- Utworzenie pliku `implemented_plans.md` w roocie repozytorium z listą wszystkich 6 planów z `docs/plans/` (statusy: `[x]` dla wdrożonych, `[ ]` dla zaplanowanych).
- Utworzenie pliku `implemented_features.md` w roocie repozytorium z opisem 8 zaimplementowanych funkcjonalności CaptionForge (na bazie aktualnego stanu `code/src/**`).
- Utworzenie pliku `README.md` w roocie repozytorium jako indeks projektu z opisem struktury SDD, linkami do `docs/`, `code/`, `kilocode/`, `vanilla web/` i szybkim startem.

### 2.2. Poza zakresem

- **Aktualizacja `docs/README.md`** — ten plik jest indeksem dokumentacji, nie roota repo; nie zmienia się w tym planie.
- **Aktualizacja `code/README.md`** — to wewnętrzny README aplikacji Next.js; nie zmienia się.
- **Tworzenie `docs/architecture/system_overview.md` ani ADR-ów** — to zakres **Planu F**.
- **Wypełnianie merytoryczne `docs/roles/*/README.md`** — to zakres **Planu E**.
- **Zmiana zawartości plików kodu** — zerowy zakres dotykający [`code/src/**`](../../code/src).

---

## 3. Wymagania funkcjonalne

- **WF1.** Plik `implemented_plans.md` MUSI zawierać:
  - Nagłówek H1 `# Implemented Plans — CaptionForge`.
  - Krótki opis (1 zdanie) czym jest ten plik.
  - Listę wszystkich planów z `docs/plans/` w formacie:
    ```
    - [x] [PLAN_nazwa.md](docs/plans/PLAN_nazwa.md) — krótki opis — status: DONE/IN_PROGRESS/PLANNED
    ```
  - Plany wdrożone (`[x]`): `PLAN_szkielet-nextjs-captionforge.md`, `PLAN_captionforge-new-features.md`, `PLAN_gemini-api-integration.md`, `PLAN_captionforge-audit-i-roadmap.md` (częściowo), `PLAN_sdd-szablon-planu.md`, `PLAN_sdd-struktura-katalogow.md`.
  - Plany zaplanowane (`[ ]`): `PLAN_sdd-rejestry-projektu.md` (ten plan), `PLAN_sdd-workflow-implement.md`, `PLAN_sdd-dokumentacja-rol.md`, `PLAN_sdd-architecture-adr.md`.
- **WF2.** Plik `implemented_features.md` MUSI zawierać:
  - Nagłówek H1 `# Implemented Features — CaptionForge`.
  - Krótki opis (1 zdanie) czym jest ten plik.
  - Sekcję dla każdej z 8 zaimplementowanych funkcjonalności w formacie:
    ```markdown
    ## [Nazwa funkcjonalności]
    - **Status:** DONE
    - **Plan:** [link do planu]
    - **Opis:** [1-2 zdania co robi]
    - **Pliki:** [lista kluczowych plików kodu]
    ```
  - 8 funkcjonalności do opisania (na bazie `code/src/**`):
    1. **Landing Page** — sekcje Hero, Features, How It Works, FAQ, CTA, Footer, Navbar.
    2. **Generator opisów** — formularz, wyniki, integracja z `/api/generate`.
    3. **Integracja Gemini API** — Route Handler, Zod walidacja, rate limit, fallback mock.
    4. **Historia generacji** — localStorage, hook `useHistory`, panel historii.
    5. **Eksport TXT** — pobieranie pliku `.txt` z wynikami.
    6. **Dark mode** — toggle, persystencja, anti-FOUC.
    7. **Progress bar** — animowane etapy generowania.
    8. **Toast notifications** — potwierdzenia kopiowania i błędy.
- **WF3.** Plik `README.md` w roocie MUSI zawierać:
  - Nagłówek H1 `# CaptionForge` z krótkim opisem produktu (1 zdanie).
  - Sekcję `## Struktura repozytorium` z drzewem katalogów i opisem każdego katalogu.
  - Sekcję `## Szybki start` z komendami `cd code && npm install && npm run dev`.
  - Sekcję `## Dokumentacja` z linkami do `docs/README.md`, `docs/plans/`, `docs/business/`, `docs/tech/`, `docs/architecture/`, `docs/roles/`.
  - Sekcję `## Reguły agenta AI` z linkami do `kilocode/rules/dev-plan-workflow.md`, `kilocode/rules/dev-coding-rules.md`, `kilocode/rules/who-am-i.md`.
  - Sekcję `## Rejestry projektu` z linkami do `implemented_plans.md` i `implemented_features.md`.
- **WF4.** Wszystkie linki w trzech nowych plikach MUSZĄ być **względne** i poprawne z perspektywy roota repozytorium.

---

## 4. Wymagania niefunkcjonalne

### 4.1. Wydajność

- Nie dotyczy. Operacje wyłącznie na plikach `*.md`.

### 4.2. Bezpieczeństwo

- Brak wpływu. Pliki rejestrowe nie zawierają sekretów ani PII.

### 4.3. UX/DX (Developer Experience)

- `README.md` roota MUSI być czytelny w widoku GitHub/GitLab (renderowanie markdown) — to pierwszy plik widziany przez nowego developera.
- `implemented_plans.md` i `implemented_features.md` MUSZĄ być aktualizowane po każdym wdrożeniu planu (workflow `implement` — Plan D).
- Struktura sekcji w `implemented_features.md` MUSI być spójna — każda funkcjonalność w tym samym formacie.

### 4.4. Audytowalność

- `implemented_plans.md` jest **kontraktem** — jeśli plan jest oznaczony `[x]`, jego kryteria akceptacji MUSZĄ być spełnione.
- `implemented_features.md` jest **inwentarzem** — każda funkcjonalność ma link do planu, który ją wprowadził.

---

## 5. Kontekst techniczny

### 5.1. Komponenty / pliki dotknięte zmianą

| Plik | Typ zmiany | Opis |
|------|------------|------|
| `implemented_plans.md` | Utworzenie | Rejestr planów SDD w roocie repo. |
| `implemented_features.md` | Utworzenie | Rejestr funkcjonalności w roocie repo. |
| `README.md` | Utworzenie | Główny README repozytorium (root). |

### 5.2. API / Dane

- Brak. Operacje wyłącznie na plikach `*.md`.

### 5.3. Zależności od innych modułów / planów

- **Wymaga ukończenia Planu A** — `implemented_plans.md` odwołuje się do `docs/plans/PLAN_*.md` (nowa lokalizacja po Planie A). ✅ Zrealizowane.
- **Otwiera drogę dla:** Plan D (workflow `implement` opisuje jak aktualizować `implemented_plans.md` i `implemented_features.md`).

### 5.4. Stos technologiczny

- Markdown (CommonMark + GitHub Flavored Markdown).
- Brak narzędzi automatycznych.

### 5.5. Aktualny stan `code/src/**` (podstawa dla `implemented_features.md`)

Na bazie struktury plików z `environment_details` (stan po Planie A):

| Funkcjonalność | Kluczowe pliki |
|---|---|
| Landing Page | [`code/src/app/page.tsx`](../../code/src/app/page.tsx), [`code/src/components/features/hero.tsx`](../../code/src/components/features/hero.tsx), `features-grid.tsx`, `how-it-works.tsx`, `faq.tsx`, `cta-bottom.tsx`, `footer.tsx`, `navbar.tsx` |
| Generator opisów | [`code/src/components/features/generator/generator-section.tsx`](../../code/src/components/features/generator/generator-section.tsx), `generator-form.tsx`, `generator-results.tsx` |
| Integracja Gemini API | [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts), [`code/src/lib/gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts), [`code/src/lib/mock-templates.ts`](../../code/src/lib/mock-templates.ts) |
| Historia generacji | [`code/src/hooks/useHistory.ts`](../../code/src/hooks/useHistory.ts), [`code/src/lib/history-storage.ts`](../../code/src/lib/history-storage.ts), [`code/src/components/features/history/history-panel.tsx`](../../code/src/components/features/history/history-panel.tsx), `history-entry.tsx` |
| Eksport TXT | [`code/src/lib/export-txt.ts`](../../code/src/lib/export-txt.ts) |
| Dark mode | [`code/src/hooks/useTheme.ts`](../../code/src/hooks/useTheme.ts), [`code/src/components/ui/theme-toggle.tsx`](../../code/src/components/ui/theme-toggle.tsx), [`code/src/app/layout.tsx`](../../code/src/app/layout.tsx) |
| Progress bar | [`code/src/components/ui/progress-bar.tsx`](../../code/src/components/ui/progress-bar.tsx) |
| Toast notifications | [`code/src/components/ui/toast.tsx`](../../code/src/components/ui/toast.tsx) |

---

## 6. Kroki implementacji

1. **Utwórz** plik `implemented_plans.md` w roocie repozytorium (write_to_file) z treścią zgodną z WF1:
   - Nagłówek H1 + opis.
   - Lista 10 planów (6 istniejących + 4 zaplanowane z roadmapy SDD) z linkami do `docs/plans/PLAN_*.md`, statusami `[x]`/`[ ]` i krótkim opisem każdego.
   - Plany wdrożone: `PLAN_szkielet-nextjs-captionforge.md` (✅ DONE), `PLAN_captionforge-audit-i-roadmap.md` (⚠️ PARTIAL), `PLAN_captionforge-new-features.md` (✅ DONE), `PLAN_gemini-api-integration.md` (✅ DONE), `PLAN_sdd-szablon-planu.md` (✅ DONE), `PLAN_sdd-struktura-katalogow.md` (✅ DONE).
   - Plany zaplanowane: `PLAN_sdd-rejestry-projektu.md` (ten plan, `[ ]`), `PLAN_sdd-workflow-implement.md` (`[ ]`), `PLAN_sdd-dokumentacja-rol.md` (`[ ]`), `PLAN_sdd-architecture-adr.md` (`[ ]`).

2. **Utwórz** plik `implemented_features.md` w roocie repozytorium (write_to_file) z treścią zgodną z WF2:
   - Nagłówek H1 + opis.
   - 8 sekcji `## [Nazwa]` z polami: Status, Plan (link), Opis, Pliki (lista linków do `code/src/**`).
   - Dane z sekcji 5.5 tego planu.

3. **Utwórz** plik `README.md` w roocie repozytorium (write_to_file) z treścią zgodną z WF3:
   - Nagłówek H1 `# CaptionForge` + 1-zdaniowy opis produktu.
   - Sekcja `## Struktura repozytorium` z drzewem ASCII i opisem 5 katalogów: `code/`, `docs/`, `kilocode/`, `vanilla web/`, + pliki rejestrowe.
   - Sekcja `## Szybki start` z 3 komendami.
   - Sekcja `## Dokumentacja` z linkami do `docs/README.md` i podkatalogów.
   - Sekcja `## Reguły agenta AI` z linkami do `kilocode/rules/`.
   - Sekcja `## Rejestry projektu` z linkami do `implemented_plans.md` i `implemented_features.md`.

4. **Weryfikacja linków** — sprawdź, że wszystkie linki w 3 nowych plikach prowadzą do istniejących plików (komenda `grep -r "\.\." implemented_plans.md implemented_features.md README.md | head -20` + wizualna weryfikacja).

---

## 7. Kryteria akceptacji

- **KA1.** Komenda `ls -la | grep -E "README|implemented"` w roocie repo pokazuje 3 pliki: `README.md`, `implemented_plans.md`, `implemented_features.md`.
- **KA2.** Plik `implemented_plans.md` zawiera dokładnie **10 wpisów** (6 istniejących + 4 zaplanowane) — sprawdzane przez `grep -c "^\- \[" implemented_plans.md`.
- **KA3.** Plik `implemented_features.md` zawiera dokładnie **8 sekcji `## `** — sprawdzane przez `grep -c "^## " implemented_features.md`.
- **KA4.** Plik `README.md` zawiera sekcje: `## Struktura repozytorium`, `## Szybki start`, `## Dokumentacja`, `## Reguły agenta AI`, `## Rejestry projektu` — sprawdzane przez `grep "^## " README.md`.
- **KA5.** Brak martwych linków w 3 nowych plikach — każdy link `[tekst](ścieżka)` prowadzi do istniejącego pliku (sprawdzane przez `find . -name "*.md" -newer implemented_plans.md` + wizualna weryfikacja kluczowych linków).
- **KA6.** Brak zmian w plikach kodu źródłowego (`code/src/**`). Komenda `cd code && npx tsc --noEmit && npm run lint` zwraca **0 błędów**.

---

## 8. Testy

### 8.1. Testy unit

- **Nie dotyczy.** Zmiana wyłącznie w `*.md`.

### 8.2. Testy integracyjne

- **Nie dotyczy.**

### 8.3. Testy manualne

- **TM1.** W terminalu: `ls -la | grep -E "README|implemented"` — oczekiwane: 3 pliki.
- **TM2.** Otwórz `README.md` w VS Code Markdown Preview (Cmd+Shift+V). Sprawdź, że renderuje się poprawnie i wszystkie linki w sekcjach `## Dokumentacja` i `## Reguły agenta AI` są klikalne.
- **TM3.** Otwórz `implemented_plans.md` — sprawdź, że każdy link `[PLAN_*.md](docs/plans/PLAN_*.md)` otwiera istniejący plik.
- **TM4.** Otwórz `implemented_features.md` — sprawdź, że każdy link do `code/src/**` otwiera istniejący plik.
- **TM5.** Sprawdź w terminalu (potwierdza KA6):
  ```bash
  cd code && npx tsc --noEmit && npm run lint
  ```
  Wynik MUSI być **bez błędów**.

### 8.4. Definition of Done (skrót)

Plan B jest ukończony, gdy: KA1 ∧ KA2 ∧ KA3 ∧ KA4 ∧ KA5 ∧ KA6 ∧ TM1–TM5 wszystkie ✅.

---

## 🚀 Następny krok

Po zakończeniu Planu B, zgodnie z roadmapą SDD, kolejnym do realizacji jest:

> **Plan D — Workflow `implement`.**
> Plik docelowy: `docs/plans/PLAN_sdd-workflow-implement.md`. Obejmuje utworzenie `kilocode/rules/dev-implement-workflow.md` — pendant do `dev-plan-workflow.md` — definiujący proces: czytaj plan → implementuj → aktualizuj `implemented_plans.md` i `implemented_features.md` → commit.

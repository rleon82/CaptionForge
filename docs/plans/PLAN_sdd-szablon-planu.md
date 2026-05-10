# PLAN: Szablon planu SDD (zastąpienie dev-plan-workflow)

> **Plan C** z roadmapy wdrożenia Spec Driven Development w CaptionForge.
> Pisany w **docelowym szablonie SDD** (eat-your-own-dogfood) — po wdrożeniu będzie służył jako wzorzec referencyjny.

---

## 1. Cel

Wprowadzić w projekcie CaptionForge sztywny, ośmiosekcyjny szablon planu zgodny z metodyką **Spec Driven Development (SDD)**, zastępując dotychczasowy szablon „atomowy z testami manualnymi” opisany w [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:32).

Cel biznesowy: każdy kolejny plan funkcjonalności (A, B, D, E, F i wszystkie przyszłe) ma być zapisywany w jednolitej, audytowalnej formie umożliwiającej delegację implementacji do agenta AI bez dwuznaczności.

---

## 2. Zakres

### 2.1. W zakresie

- Aktualizacja pliku [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) tak, aby:
  - opisywał szablon SDD z 8 obowiązkowymi sekcjami (Cel, Zakres, Wymagania funkcjonalne, Wymagania niefunkcjonalne, Kontekst techniczny, Kroki implementacji, Kryteria akceptacji, Testy),
  - zachował zasadę atomowości (max 3 pliki kodu, max 2–3 h pracy, jedna sesja AI),
  - zachował procedurę odrzucenia planu (Sekcja 5),
  - usunął dotychczasowy szablon „⚙️ Sekcja X + ✅ Test Manualny Sekcji + 🧪 Weryfikacja Końcowa” jako szablon główny,
  - przeniósł elementy weryfikacyjne (komendy `npm run lint`, `tsc --noEmit`, `npm run build`) do sekcji **8. Testy** i **7. Kryteria akceptacji** nowego szablonu.
- Aktualizacja konwencji nazewnictwa plików planów: `PLAN_<nazwa-funkcjonalnosci>.md` (zamiast `<nazwa-funkcjonalnosci>.md`).
- Aktualizacja docelowej lokalizacji planów: `docs/plans/` (zamiast `plans/`).
- Aktualizacja sekcji 11 [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:267) („Sekcje Szablonu Planu dla Next.js”) — mapowanie nazw sekcji generycznych na sekcje SDD.

### 2.2. Poza zakresem

- Migracja istniejących plików `plans/*.md` do `docs/plans/` z renamem na `PLAN_*.md` → **Plan A**.
- Utworzenie katalogów `docs/{architecture,business,tech,roles/...}` → **Plan A**.
- Utworzenie rejestrów `implemented_plans.md`, `implemented_features.md`, `README.md` w roocie → **Plan B**.
- Utworzenie workflow `implement` → **Plan D**.
- Wypełnienie dokumentacji ról → **Plan E**.
- Przepisanie istniejących planów (`captionforge-audit-i-roadmap.md`, `captionforge-new-features.md`, `gemini-api-integration.md`, `szkielet-nextjs-captionforge.md`) na nowy format → **nie wykonujemy** (plany historyczne pozostają w starej formie zgodnie z zasadą „spójność > ideał” z [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:226); Plan A je tylko przeniesie i zmieni nazwy).

---

## 3. Wymagania funkcjonalne

- **WF1.** Plik [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) po edycji MUSI zawierać sekcje w kolejności:
  1. Zasady tworzenia planu (warunek wstępny — ocena zakresu, kryteria odrzucenia, max 3 pliki kodu / 2–3 h),
  2. Obowiązkowy szablon SDD (8 sekcji wymienionych w 2.1),
  3. Zasady wypełniania szablonu (jak pisać kroki implementacji, jak pisać kryteria akceptacji, jak pisać testy),
  4. Reguła zapisu gotowego planu w `docs/plans/PLAN_<kebab-case>.md`,
  5. Procedura odrzucenia planu (zachowana z poprzedniej wersji),
  6. Instrukcja dla agentów (zaktualizowana o SDD).
- **WF2.** Szablon SDD MUSI być prezentowany jako blok markdown wewnątrz pliku reguły (gotowy do skopiowania).
- **WF3.** Szablon SDD MUSI zawierać dokładnie te 8 sekcji (numerowane 1–8) i podsekcje takie, jak w wymaganiach z konsultacji:
  - `## 1. Cel`
  - `## 2. Zakres` z `### 2.1. W zakresie` i `### 2.2. Poza zakresem`
  - `## 3. Wymagania funkcjonalne` (lista WF1, WF2, ...)
  - `## 4. Wymagania niefunkcjonalne` (z podsekcjami: wydajność, bezpieczeństwo, UX/DX)
  - `## 5. Kontekst techniczny` (komponenty, API, dane, zależności od istniejących modułów)
  - `## 6. Kroki implementacji` (numerowana lista atomowych kroków, każdy z konkretnym plikiem i miejscem)
  - `## 7. Kryteria akceptacji` (lista weryfikowalnych warunków zaliczenia, w tym komendy `tsc --noEmit`, `npm run lint`, `npm run build` jeśli dotyczy kodu)
  - `## 8. Testy` (z podsekcjami: unit, integracyjne, manualne — gdzie ma to sens)
- **WF4.** Sekcja 11 [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:267) MUSI zostać zaktualizowana, aby mapowała sekcje SDD (1–8) na konwencje Next.js zamiast mapowania starych nazw `Sekcja 1 / Sekcja 2 / Sekcja 3`.
- **WF5.** Dokumentacja MUSI jasno informować, że stary szablon (Metadata + ⚙️ Sekcje + ✅ Testy manualne + 🧪 Weryfikacja końcowa) został **wycofany** i istnieje notatka migracyjna wskazująca, że historyczne plany pozostają w `plans/` w starym formacie do czasu Planu A.

---

## 4. Wymagania niefunkcjonalne

### 4.1. Wydajność

- Nie dotyczy — zmiana wyłącznie w warstwie dokumentacji `*.md`. Brak wpływu na bundle size, runtime, build time.

### 4.2. Bezpieczeństwo

- Brak wpływu na warstwę bezpieczeństwa kodu.
- Brak ryzyka wycieku sekretów — pliki reguł nie zawierają i nie będą zawierać kluczy API ani danych wrażliwych.

### 4.3. UX/DX (Developer Experience)

- Szablon MUSI być czytelny w widoku VS Code Markdown Preview (poprawne nagłówki, listy, bloki kodu).
- Klucze sekcji (`## 1. Cel`, `## 2. Zakres`, ...) MUSZĄ być stabilne i przewidywalne — agent AI ma móc je rozpoznać po samym numerze.
- Linki względne (`../../kilocode/rules/...`) MUSZĄ być poprawne z perspektywy `docs/plans/PLAN_*.md`.

### 4.4. Audytowalność

- Każdy kolejny plan zapisany w nowym szablonie MUSI być w 100% zgodny ze strukturą — odstępstwa są podstawą do odrzucenia review.

---

## 5. Kontekst techniczny

### 5.1. Komponenty / pliki dotknięte zmianą

| Plik | Typ zmiany | Opis |
|------|------------|------|
| [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) | Nadpisanie (rewrite) | Zastąpienie dotychczasowego szablonu szablonem SDD; zachowanie zasad atomowości i procedury odrzucenia. |
| [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:267) | Modyfikacja sekcji 11 | Aktualizacja mapowania sekcji szablonu na konwencje Next.js (1–8 zamiast 1–3). |
| `docs/plans/PLAN_sdd-szablon-planu.md` | Utworzenie (ten plik) | Sam plan, służący jako pierwszy artefakt napisany w nowym szablonie. |

### 5.2. API / Dane

- Brak. Zmiana wyłącznie w plikach `.md`.

### 5.3. Zależności od innych modułów / planów

- **Brak zależności wstecz** — Plan C może być wykonany jako pierwszy.
- **Zależności w przód:** Plany A, B, D, E, F MUSZĄ być pisane w nowym szablonie ustanowionym przez ten plan.

### 5.4. Stos technologiczny

- Markdown (CommonMark + GitHub Flavored Markdown).
- Brak narzędzi automatycznych — zmiana ręczna z review przez użytkownika.

---

## 6. Kroki implementacji

Każdy krok jest atomowy i zawiera ścieżkę pliku oraz opis zmiany.

1. **Backup mentalny** — przed edycją przeczytaj cały aktualny [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) (linie 1–277), żeby zachować świadomość, które zasady **przenosimy** do nowego szablonu (atomowość, procedura odrzucenia, instrukcja dla agentów), a które **wycofujemy** (struktura ⚙️ Sekcji z testami manualnymi).
2. **Przepisz [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1)** od zera (write_to_file) zgodnie z wymaganiem WF1 — zachowaj nagłówek `# WF_Dev_Plan – Wzorzec Planowania Pracy SDD dla AI Developera` z dopiskiem `(SDD)` w tytule, dodaj 6 sekcji opisanych w WF1.
3. **W sekcji 2 nowego pliku** (Obowiązkowy szablon SDD) wstaw blok ` ```markdown ... ``` ` zawierający dokładny szablon 8 sekcji (zgodnie z WF3) gotowy do skopiowania przy pisaniu nowego planu.
4. **W sekcji 3 nowego pliku** (Zasady wypełniania szablonu) opisz oddzielnie:
   - Jak pisać `## 6. Kroki implementacji` — atomowość, konkretny plik, konkretne miejsce, precyzyjny język techniczny (przenieś przykład „dobrego kroku” i „złego kroku” z aktualnej sekcji 3.1 starego pliku, linie 197–212).
   - Jak pisać `## 7. Kryteria akceptacji` — weryfikowalność, lista warunków, komendy `tsc --noEmit` / `npm run lint` / `npm run build` jeśli dotyczy kodu.
   - Jak pisać `## 8. Testy` — kategorie unit / integracyjne / manualne, kiedy stosować każdą.
5. **W sekcji 4 nowego pliku** (Reguła zapisu) zapisz konwencję: `docs/plans/PLAN_<nazwa-kebab-case>.md`. Zaznacz, że agent zapisuje plan **bez pytania o zgodę** użytkownika.
6. **W sekcji 5 nowego pliku** zachowaj procedurę odrzucenia planu z aktualnej sekcji 5 starego pliku (linie 254–271) — bez zmian merytorycznych, tylko z zachowaniem formatu.
7. **W sekcji 6 nowego pliku** (Instrukcja dla agentów) zaktualizuj system prompt, aby odwoływał się do nowych sekcji 1–8 szablonu SDD i nowej lokalizacji `docs/plans/`.
8. **Zaktualizuj sekcję 11 [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:267)** (apply_diff) — tabela mapowania:

   | Sekcja SDD (generyczna) | Sekcja SDD dla Next.js/React |
   |---|---|
   | `## 5. Kontekst techniczny – Komponenty` | „Komponenty React (Server / Client) z lokalizacją w `src/components/`” |
   | `## 6. Kroki implementacji – Warstwa UI` | „Kroki w warstwie React Components + JSX (`*.tsx`)” |
   | `## 6. Kroki implementacji – Logika` | „Kroki w warstwie TypeScript (hooks `src/hooks/`, services `src/services/`, server actions, lib `src/lib/`)” |
   | `## 6. Kroki implementacji – API` | „Kroki w warstwie Route Handlers (`src/app/api/**/route.ts`) lub Server Actions” |
   | `## 6. Kroki implementacji – Typy` | „Kroki w warstwie typów TypeScript (`src/types/*.ts` lub kolokowane)” |
   | `## 6. Kroki implementacji – Stylowanie` | „Kroki w warstwie Tailwind CSS (klasy w JSX, `cn()` z [`src/lib/cn.ts`](../../code/src/lib/cn.ts:1))” |
   | `## 8. Testy – unit` | „Vitest / Jest dla `src/lib/*` i `src/hooks/*`” |
   | `## 8. Testy – integracyjne` | „Testy Route Handlers (`src/app/api/**/route.ts`) + ewent. Playwright/RTL dla flow UI” |

9. **Weryfikacja linków** — po zapisie sprawdź, że wszystkie linki względne w obu plikach (`../../kilocode/...`, `../../code/src/...`) renderują się poprawnie w VS Code Preview.

---

## 7. Kryteria akceptacji

- **KA1.** Plik [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) zawiera w sekcji 2 blok markdown z dokładnie 8 nagłówkami `## 1. Cel`, `## 2. Zakres`, ..., `## 8. Testy` w tej kolejności.
- **KA2.** Plik [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) **NIE zawiera** już dotychczasowego szablonu z `## ⚙️ Sekcja X` ani `### ✅ Test Manualny Sekcji` jako szablonu głównego (mogą występować wyłącznie w sekcji „migracja / historia zmian”, jeśli zdecydujesz się ją dodać).
- **KA3.** Sekcja „Procedura odrzucenia planu” jest zachowana — zawiera kryteria (>3 pliki, >2–3 h, refaktor architektury, zależności, brak DoD) oraz format odpowiedzi z propozycją podziału na plany A/B/C.
- **KA4.** Sekcja 11 [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:267) zawiera tabelę mapowania sekcji SDD (1–8) na konwencje Next.js — zgodnie z krokiem 6.8.
- **KA5.** Wszystkie linki względne w obu zmienionych plikach prowadzą do istniejących plików/linii w repozytorium (sprawdzone wizualnie w VS Code Preview).
- **KA6.** Plik [`docs/plans/PLAN_sdd-szablon-planu.md`](PLAN_sdd-szablon-planu.md:1) (ten plan) sam jest zgodny ze szablonem SDD wprowadzanym przez ten plan — **walidacja zgodności samego ze sobą** po wdrożeniu.
- **KA7.** Brak zmian w plikach kodu źródłowego (`code/src/**`) — plan jest wyłącznie dokumentacyjny. Komendy `npx tsc --noEmit`, `npm run lint`, `npm run build` w katalogu `code/` zwracają **identyczny** wynik przed i po wdrożeniu planu.

---

## 8. Testy

### 8.1. Testy unit

- **Nie dotyczy.** Zmiana wyłącznie w `*.md`, brak kodu wykonywalnego.

### 8.2. Testy integracyjne

- **Nie dotyczy.** Brak komponentów do zintegrowania.

### 8.3. Testy manualne

- **TM1.** Otwórz [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) w VS Code → Markdown Preview (Cmd+Shift+V). Zweryfikuj, że spis treści i nagłówki renderują się bez błędów oraz że blok szablonu SDD jest widoczny jako blok kodu możliwy do skopiowania.
- **TM2.** Otwórz [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:267) i przejdź do sekcji 11. Sprawdź, że tabela mapowania zawiera **8 wierszy** odpowiadających sekcjom SDD i prowadzi do plików w `code/src/**` przez linki względne.
- **TM3.** Skopiuj blok szablonu z sekcji 2 nowego `dev-plan-workflow.md` do nowego pliku testowego `docs/plans/PLAN__test_dryrun.md` (utwórz tymczasowo) i sprawdź, czy szablon nadaje się 1:1 do wypełnienia (wszystkie placeholdery są jasne). Po teście **usuń** plik `PLAN__test_dryrun.md`.
- **TM4.** Wykonaj „test self-reference”: otwórz [`docs/plans/PLAN_sdd-szablon-planu.md`](PLAN_sdd-szablon-planu.md:1) (ten plan) i sprawdź, że jego struktura jest zgodna ze szablonem zdefiniowanym w nowym `dev-plan-workflow.md` (KA6).
- **TM5.** Sprawdź w terminalu (z katalogu `code/`):
  ```bash
  cd code && npx tsc --noEmit && npm run lint && npm run build
  ```
  Wynik MUSI być **bez błędów** (zgodnie z KA7) — to potwierdza, że plan dokumentacyjny nie wpłynął na kod aplikacji.

### 8.4. Definition of Done (skrót)

Plan C jest ukończony, gdy: KA1 ∧ KA2 ∧ KA3 ∧ KA4 ∧ KA5 ∧ KA6 ∧ KA7 ∧ TM1–TM5 wszystkie ✅.

---

## 🚀 Następny krok

Po zakończeniu Planu C, zgodnie z roadmapą SDD, kolejnym do realizacji jest:

> **Plan A — Struktura katalogów SDD + migracja istniejących plików dokumentacji.**
> Plik docelowy: `docs/plans/PLAN_sdd-struktura-katalogow.md`. Obejmuje utworzenie `docs/{architecture,business,tech,roles/{product_owner,ux_ui,architect,developer,tester}}` oraz przeniesienie `plans/*.md` → `docs/plans/PLAN_*.md`, `docs/Job_To_Be_Done.md` → `docs/business/`, `docs/User_Journey_Map.md` → `docs/business/`, `docs/technical-documentation.md` → `docs/tech/`, `docs/plan.md` → `docs/business/` (lub `docs/plans/`, decyzja w Planie A).

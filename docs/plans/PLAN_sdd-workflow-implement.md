# PLAN: Workflow `implement` (dev-implement-workflow.md)

> **Plan D** z roadmapy wdrożenia Spec Driven Development w CaptionForge.
> Tworzy nowy plik reguły [`kilocode/rules/dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md) — pendant do istniejącego [`dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md) — definiujący proces implementacji planu SDD przez agenta AI.

---

## 1. Cel

Wprowadzić w projekcie CaptionForge formalny workflow **`implement`** dla agenta AI: standardowy, powtarzalny proces zamieniający plan SDD (`docs/plans/PLAN_*.md`) na działający kod (`code/src/**`) plus zaktualizowane rejestry (`implemented_plans.md`, `implemented_features.md`).

Cel biznesowy: domknięcie pętli SDD — po Planie C (jak pisać plan) i Planie B (jak rejestrować rezultaty) brakuje dokumentu „jak przejść z planu do działającego kodu". Bez Planu D każdy agent improwizuje proces implementacji, co podważa audytowalność i powtarzalność (sekcja 1 wymagań SDD: „repozytorium musi być samodokumentujące się; AI nie zastępuje myślenia — tylko egzekwuje plan").

---

## 2. Zakres

### 2.1. W zakresie

- Utworzenie nowego pliku [`kilocode/rules/dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md) zawierającego:
  - Sekcję 1 — **Warunek wstępny** (sprawdzenie, że plan jest gotowy do implementacji: ma 8 sekcji SDD, wszystkie KA są weryfikowalne, brak `[...]` placeholderów).
  - Sekcję 2 — **6-krokowy proces implementacji** (Read → Verify → Implement → Test → Update Registries → Report).
  - Sekcję 3 — **Reguły implementacji** (zakaz rozszerzania zakresu, zakaz refaktorów poza planem, obowiązkowa weryfikacja `tsc + lint + build`).
  - Sekcję 4 — **Aktualizacja rejestrów** (jak konkretnie zmienić `implemented_plans.md` z `[ ]` na `[x]` + jak dodać/zaktualizować wpis w `implemented_features.md`).
  - Sekcję 5 — **Procedura zgłoszenia ukończenia** (format raportu końcowego: co zrobiono, co pominięto, KA spełnione, komendy weryfikacyjne z exit codes).
  - Sekcję 6 — **Procedura zatrzymania implementacji** (kiedy przerwać i wrócić do użytkownika: niejednoznaczność w planie, błąd niezaplanowany, naruszenie reguł kodowania).
  - Sekcję 7 — **Instrukcja dla agentów** (system prompt zaktualizowany o workflow `implement`).
- Aktualizacja [`README.md`](../../README.md:1) (root repo) sekcji „Reguły agenta AI" — dodanie wpisu o nowym pliku `dev-implement-workflow.md`.
- Aktualizacja [`docs/roles/developer/README.md`](../roles/developer/README.md:1) — wzmianka o tym, że workflow `implement` jest oficjalnym procesem (link do nowego pliku reguły).

### 2.2. Poza zakresem

- **Implementacja nowych funkcjonalności kodu** — Plan D dotyczy wyłącznie meta-warstwy (workflow + dokumentacja).
- **Aktualizacja [`docs/roles/developer/README.md`](../roles/developer/README.md:1) o pełną treść roli** — to zakres **Planu E**.
- **Modyfikacja [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) ani [`dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:1)** — te pliki definiują „jak planować" i „jak kodować"; nowy `dev-implement-workflow.md` wypełnia lukę „jak wykonać plan".
- **Tworzenie ADR-ów** — to zakres **Planu F**.
- **Zmiana zawartości plików kodu** ([`code/src/**`](../../code/src:1)) — zerowy zakres.

---

## 3. Wymagania funkcjonalne

- **WF1.** Plik [`kilocode/rules/dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md) MUSI zawierać 7 sekcji w kolejności:
  1. `## 1. Warunek wstępny — gotowość planu do implementacji`
  2. `## 2. Proces implementacji (6 kroków)`
  3. `## 3. Reguły implementacji (dos & don'ts)`
  4. `## 4. Aktualizacja rejestrów projektu`
  5. `## 5. Procedura zgłoszenia ukończenia`
  6. `## 6. Procedura zatrzymania implementacji`
  7. `## 7. Instrukcja dla agentów (system prompt)`

- **WF2.** Sekcja 1 (Warunek wstępny) MUSI definiować checklistę 5 punktów do weryfikacji przed startem implementacji:
  - ✅ Plan istnieje w `docs/plans/PLAN_*.md`.
  - ✅ Plan ma wszystkie 8 sekcji SDD (1. Cel … 8. Testy).
  - ✅ Wszystkie placeholdery `[...]` w planie są wypełnione.
  - ✅ Sekcja 7 (Kryteria akceptacji) ma weryfikowalne kryteria (komendy lub testy manualne).
  - ✅ Sekcja 5.3 (Zależności) wskazuje, że wszystkie wymagane wcześniejsze plany są ukończone (status `[x]` w `implemented_plans.md`).

- **WF3.** Sekcja 2 (Proces implementacji) MUSI opisywać 6 kroków:
  1. **Read** — agent czyta cały plan + dokumenty referenced (np. `dev-coding-rules.md`).
  2. **Verify** — agent weryfikuje warunek wstępny z sekcji 1; jeśli nie spełniony — przerywa i zgłasza.
  3. **Implement** — agent wykonuje sekwencyjnie wszystkie kroki z sekcji `## 6. Kroki implementacji` planu, używając narzędzi `read_file`, `apply_diff`, `write_to_file`, `execute_command` itd.
  4. **Test** — agent uruchamia komendy z sekcji `## 7. Kryteria akceptacji` i `## 8. Testy` planu (`tsc --noEmit`, `lint`, `build`, `test`); jeśli któraś zwraca błąd — naprawia (jeśli mieści się w zakresie planu) lub przerywa.
  5. **Update Registries** — agent aktualizuje `implemented_plans.md` (zmiana `[ ]` → `[x]`) i `implemented_features.md` (dodanie/aktualizacja sekcji `## [Nazwa]` zgodnie z formatem z [`PLAN_sdd-rejestry-projektu.md`](PLAN_sdd-rejestry-projektu.md:55)).
  6. **Report** — agent raportuje ukończenie zgodnie z formatem z sekcji 5 tego workflow (`attempt_completion`).

- **WF4.** Sekcja 3 (Reguły) MUSI zawierać:
  - **Zakaz rozszerzania zakresu** — agent nie implementuje nic poza tym, co jest w sekcji `## 2.1. W zakresie` planu (zasada YAGNI z [`dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:235)).
  - **Zakaz refaktorów** — agent nie zmienia kodu poza ścieżkami wymienionymi w sekcji `## 5.1. Komponenty / pliki dotknięte zmianą` planu.
  - **Obowiązek weryfikacji** — przed `Update Registries` agent MUSI mieć zielony `tsc --noEmit`, `npm run lint` i `npm run build` (jeśli plan dotyczy kodu).
  - **Zasada „spójność > ideał"** — jeśli istniejący kod ma styl/konwencję odbiegającą od `dev-coding-rules.md`, agent zachowuje istniejącą konwencję.
  - **Zakaz commitów bez raportu** — agent nigdy nie wykonuje `git commit` bez ukończenia kroku 6 (Report).

- **WF5.** Sekcja 4 (Aktualizacja rejestrów) MUSI zawierać dokładne instrukcje:
  - W [`implemented_plans.md`](../../implemented_plans.md:1) — znajdź wpis `- [ ] [PLAN_xxx.md]…` i zmień na `- [x] [PLAN_xxx.md]…` + zaktualizuj suffix `**status: PLANNED**` na `**status: DONE**`.
  - W [`implemented_features.md`](../../implemented_features.md:1) — jeśli plan dodaje nową funkcjonalność, dodaj nową sekcję `## [Nazwa]` w odpowiednim miejscu (alfabetycznie lub na końcu, zgodnie z istniejącą konwencją); jeśli plan modyfikuje istniejącą — zaktualizuj odpowiednią sekcję (Status, Plan, Opis, Pliki).

- **WF6.** Sekcja 5 (Procedura zgłoszenia) MUSI definiować format raportu końcowego (`attempt_completion`) zawierający:
  - Lista zrealizowanych kroków (z sekcji 6 planu).
  - Lista pominiętych elementów (Out of Scope) — co celowo nie zostało zrobione.
  - Wyniki weryfikacji KA (każde kryterium ✅ lub ❌ z dowodem — komenda + exit code lub screenshot/log).
  - Zaktualizowane rejestry (`implemented_plans.md`, `implemented_features.md`) — link do diffa.
  - Sugestia następnego kroku (z sekcji „🚀 Następny krok" planu).

- **WF7.** Plik [`README.md`](../../README.md:1) w roocie repo MUSI zostać zaktualizowany — w sekcji „## Reguły agenta AI" dodany trzeci wiersz tabeli z nowym plikiem `dev-implement-workflow.md`.

- **WF8.** Plik [`docs/roles/developer/README.md`](../roles/developer/README.md:1) MUSI zostać zaktualizowany — sekcja „Zakres odpowiedzialności" rozszerzona o link do `kilocode/rules/dev-implement-workflow.md` (workflow obowiązujący przy implementacji każdego planu SDD).

---

## 4. Wymagania niefunkcjonalne

### 4.1. Wydajność

- Nie dotyczy. Operacje wyłącznie na plikach `*.md`.

### 4.2. Bezpieczeństwo

- Brak wpływu. Nowy plik reguły nie zawiera sekretów ani PII.
- **Pośredni efekt bezpieczeństwa:** sekcja 3 (Reguły) MUSI zawierać zakaz commitowania `.env.local` ani innych plików z sekretami — duplikuje się z [`dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:213) sekcja 9, ale ze względu na krytyczność warto powtórzyć w workflow `implement`.

### 4.3. UX/DX (Developer Experience)

- Plik MUSI być czytelny w VS Code Markdown Preview — bez nieprawidłowych zagnieżdżeń, długich linii > 200 znaków, zepsutych linków.
- Kolejność sekcji 1–7 MUSI odpowiadać kolejności wykonania workflow (czytelność narracyjna).
- Każdy z 6 kroków w sekcji 2 MUSI być zaczynać się od **czasownika rozkazującego** w bezokoliczniku (Read, Verify, Implement, Test, Update, Report) — łatwiejsze do zapamiętania i odwołania.

### 4.4. Audytowalność

- Workflow `implement` jest **kontraktem** — każde wdrożenie planu MUSI być zgodne z tym dokumentem; odstępstwa są podstawą do odrzucenia review.
- Format raportu końcowego (sekcja 5) MUSI umożliwiać **audyt post-factum** — czy agent wykonał wszystkie kroki, czy KA są spełnione, czy rejestry są aktualne.

---

## 5. Kontekst techniczny

### 5.1. Komponenty / pliki dotknięte zmianą

| Plik | Typ zmiany | Opis |
|------|------------|------|
| `kilocode/rules/dev-implement-workflow.md` | Utworzenie | Nowy plik reguły z 7 sekcjami workflow `implement`. |
| [`README.md`](../../README.md:1) (root) | Modyfikacja | Dodanie wiersza tabeli w sekcji „## Reguły agenta AI". |
| [`docs/roles/developer/README.md`](../roles/developer/README.md:1) | Modyfikacja | Rozszerzenie sekcji „Zakres odpowiedzialności" o link do nowego workflow. |

### 5.2. API / Dane

- Brak. Operacje wyłącznie na markdown.

### 5.3. Zależności od innych modułów / planów

- **Wymaga ukończenia Planu C** (szablon SDD — workflow `implement` odwołuje się do 8 sekcji SDD). ✅ Zrealizowane.
- **Wymaga ukończenia Planu A** (struktura katalogów `docs/plans/` — workflow odwołuje się do tej lokalizacji). ✅ Zrealizowane.
- **Wymaga ukończenia Planu B** (rejestry `implemented_plans.md` i `implemented_features.md` — workflow opisuje, jak je aktualizować). ✅ Zrealizowane.
- **Otwiera drogę dla:** Plan E i Plan F będą implementowane już zgodnie z formalnym workflow `implement` z tego planu.

### 5.4. Stos technologiczny

- Markdown (CommonMark + GitHub Flavored Markdown).
- Brak narzędzi automatycznych — tworzenie ręczne, zatwierdzane przez review.

---

## 6. Kroki implementacji

1. **Utwórz** plik `kilocode/rules/dev-implement-workflow.md` (write_to_file) z 7 sekcjami zgodnymi z WF1.
2. **Wypełnij sekcję 1** (Warunek wstępny) — checklista 5 punktów z WF2, prezentowana jako lista markdown z polami `- [ ]`.
3. **Wypełnij sekcję 2** (Proces implementacji) — 6 kroków z WF3, każdy z:
   - **Tytuł kroku** (czasownik rozkazujący).
   - **Opis** (co agent robi w tym kroku).
   - **Narzędzia** (które tooly z dostępnych: `read_file`, `apply_diff`, `write_to_file`, `execute_command` itd.).
   - **Warunek przejścia do następnego kroku** (jakiego stanu plików / kodu wymaga, żeby przejść dalej).
4. **Wypełnij sekcję 3** (Reguły) — 5 reguł z WF4 jako lista nazwana z krótkim opisem każdej (1–2 zdania) i linkami do odpowiednich sekcji w [`dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:1).
5. **Wypełnij sekcję 4** (Aktualizacja rejestrów) — przykłady przed/po dla `implemented_plans.md` i `implemented_features.md`:
   - Pokazuj konkretny diff: linia z `[ ] [PLAN_xxx.md]… **status: PLANNED**` → `[x] [PLAN_xxx.md]… **status: DONE**`.
   - Pokazuj szablon nowej sekcji `## [Nazwa]` z 4 polami (Status / Plan / Opis / Pliki).
6. **Wypełnij sekcję 5** (Procedura zgłoszenia) — szablon raportu końcowego jako blok ` ```markdown ... ``` ` z 5 elementami z WF6 (gotowy do skopiowania w `attempt_completion`).
7. **Wypełnij sekcję 6** (Procedura zatrzymania) — lista 4 sytuacji wymagających przerwania:
   - Niejednoznaczność w planie (brakujące szczegóły, sprzeczne wymagania).
   - Błąd niezaplanowany w środowisku (np. brak zależności w `package.json` której plan wymaga).
   - Naruszenie reguł kodowania ([`dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:1)) — jeśli wykonanie planu wymagałoby użycia `any` lub `dangerouslySetInnerHTML` bez sanityzacji.
   - Wykrycie zmian poza zakresem planu (jeśli inny agent w międzyczasie zmodyfikował plik) — nie nadpisywać bez konsultacji.
   Każda z tych sytuacji + format komunikatu zatrzymania (`ask_followup_question` z opcjami).
8. **Wypełnij sekcję 7** (Instrukcja dla agentów) — krótki system prompt (5–10 punktów) odwołujący się do sekcji 1–6 tego workflow, zgodny z konwencją z [`dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) sekcja 6.
9. **Zaktualizuj** [`README.md`](../../README.md:1) (root) — w sekcji „## Reguły agenta AI" dodaj wiersz:
   ```
   | 🛠️ [kilocode/rules/dev-implement-workflow.md](kilocode/rules/dev-implement-workflow.md) | WF_Dev_Implement (SDD) — workflow implementacji planu (6 kroków) |
   ```
   wstaw między wierszem `dev-plan-workflow.md` a `dev-coding-rules.md`.
10. **Zaktualizuj** [`docs/roles/developer/README.md`](../roles/developer/README.md:1) — w sekcji „Zakres odpowiedzialności":
    - **Z:** `Implementacja planów z [\`docs/plans/PLAN_*.md\`](../../plans) zgodnie z workflow \`implement\` (Plan D).`
    - **Na:** `Implementacja planów z [\`docs/plans/PLAN_*.md\`](../../plans) zgodnie z workflow \`implement\` opisanym w [\`kilocode/rules/dev-implement-workflow.md\`](../../../kilocode/rules/dev-implement-workflow.md).`

---

## 7. Kryteria akceptacji

- **KA1.** Plik [`kilocode/rules/dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md) istnieje i zawiera dokładnie **7 sekcji** `## ` w kolejności z WF1 — sprawdzane przez `grep "^## " kilocode/rules/dev-implement-workflow.md | head -7`.
- **KA2.** Sekcja 2 zawiera dokładnie **6 kroków** numerowanych — sprawdzane przez `grep "^### Krok\|^[0-9]\." kilocode/rules/dev-implement-workflow.md`.
- **KA3.** Sekcja 5 zawiera blok ` ```markdown ` z szablonem raportu końcowego — sprawdzane przez `grep -A 1 "^## 5\." kilocode/rules/dev-implement-workflow.md`.
- **KA4.** Plik [`README.md`](../../README.md:1) zawiera wiersz z linkiem do `kilocode/rules/dev-implement-workflow.md` w sekcji „## Reguły agenta AI" — sprawdzane przez `grep "dev-implement-workflow" README.md`.
- **KA5.** Plik [`docs/roles/developer/README.md`](../roles/developer/README.md:1) zawiera link do `kilocode/rules/dev-implement-workflow.md` — sprawdzane przez `grep "dev-implement-workflow" docs/roles/developer/README.md`.
- **KA6.** Wszystkie linki względne w [`kilocode/rules/dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md) prowadzą do istniejących plików (sprawdzane wzrokowo + przez wybiórczą walidację kluczowych ścieżek: `docs/plans/`, `implemented_plans.md`, `implemented_features.md`, `dev-coding-rules.md`).
- **KA7.** Brak zmian w plikach kodu źródłowego ([`code/src/**`](../../code/src:1)). Komendy `cd code && npx tsc --noEmit && npm run lint` zwracają **0 błędów**.
- **KA8.** Po wdrożeniu Planu D, każdy kolejny plan SDD (E, F i przyszłe) MUSI być implementowany zgodnie z procesem 6-krokowym z `dev-implement-workflow.md` — to weryfikowane na poziomie review każdego kolejnego raportu końcowego.

---

## 8. Testy

### 8.1. Testy unit

- **Nie dotyczy.** Zmiana wyłącznie w `*.md`.

### 8.2. Testy integracyjne

- **Nie dotyczy.**

### 8.3. Testy manualne

- **TM1.** Otwórz [`kilocode/rules/dev-implement-workflow.md`](../../kilocode/rules/dev-implement-workflow.md) w VS Code Markdown Preview (Cmd+Shift+V). Sprawdź renderowanie 7 sekcji, czytelność listy 6 kroków, działanie linków do `dev-plan-workflow.md`, `dev-coding-rules.md`, `docs/plans/`, `implemented_plans.md`.
- **TM2.** Otwórz [`README.md`](../../README.md:1) (root) — sekcja „## Reguły agenta AI" MUSI mieć **3 wiersze** w tabeli (`who-am-i.md`, `dev-plan-workflow.md`, `dev-implement-workflow.md`, `dev-coding-rules.md` = 4 wiersze; jeśli brakowało któregoś — to jest 3+1 = 4).
- **TM3.** **Test integracyjny workflow** — wykonaj „test dryrun" implementacji któregoś z istniejących planów (np. retrospektywnie sprawdź, czy implementacja Planu B w tej sesji byłaby zgodna z 6 krokami z nowego `dev-implement-workflow.md`):
  - Krok 1 (Read) ✅ — przeczytałem cały plan przed implementacją.
  - Krok 2 (Verify) ✅ — wszystkie zależności (Plan C, Plan A) były ukończone.
  - Krok 3 (Implement) ✅ — wykonałem sekwencyjnie 4 kroki z sekcji 6 Planu B.
  - Krok 4 (Test) ✅ — uruchomiłem `tsc --noEmit`, exit 0.
  - Krok 5 (Update Registries) ⚠️ — **NIE wykonałem** w sesji Planu B (rejestry zostały utworzone w Planie B, a nie zaktualizowane po jego wykonaniu — co jest spójne, bo Plan B sam je tworzy).
  - Krok 6 (Report) ✅ — `attempt_completion` z listą zmian.
  Wnioski z TM3 zapisz jako post-implementation note pod planem.
- **TM4.** Sprawdź w terminalu (potwierdza KA7):
  ```bash
  cd code && npx tsc --noEmit && npm run lint
  ```
  Wynik MUSI być **bez błędów**.

### 8.4. Definition of Done (skrót)

Plan D jest ukończony, gdy: KA1 ∧ KA2 ∧ KA3 ∧ KA4 ∧ KA5 ∧ KA6 ∧ KA7 ∧ TM1–TM4 wszystkie ✅.

KA8 jest **kryterium długoterminowym** — weryfikowane przy każdym kolejnym wdrożeniu planu, nie przy zamknięciu Planu D.

---

## 🚀 Następny krok

Po zakończeniu Planu D, zgodnie z roadmapą SDD, kolejnym do realizacji jest:

> **Plan E — Dokumentacja ról projektowych.**
> Plik docelowy: `docs/plans/PLAN_sdd-dokumentacja-rol.md`. Obejmuje wypełnienie merytoryczne 5 plików `docs/roles/{product_owner,ux_ui,architect,developer,tester}/README.md` — każdy z opisem zakresu odpowiedzialności, kluczowych dokumentów referencyjnych i typowych zadań w cyklu SDD.
> **Implementacja Planu E MUSI** odbyć się zgodnie z workflow `implement` z `kilocode/rules/dev-implement-workflow.md` — to pierwszy plan po Planie D, który walidacyjnie potwierdzi, że workflow działa.

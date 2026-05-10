# WF_Dev_Implement (SDD) – Wzorzec Implementacji Planu dla AI Developera

**Cel:** Ustandaryzować proces implementacji planów SDD przez agenta AI w projekcie CaptionForge. Każde wdrożenie planu z [`docs/plans/PLAN_*.md`](../../docs/plans) MUSI przebiegać zgodnie z 6-krokowym workflow opisanym w tym dokumencie. Komplementarny wobec [`dev-plan-workflow.md`](dev-plan-workflow.md:1) (jak pisać plan) i [`dev-coding-rules.md`](dev-coding-rules.md:1) (jak kodować).

> **Kontekst SDD:** Plan C wprowadził szablon planu, Plan B wprowadził rejestry, ten dokument (Plan D) zamyka pętlę: definiuje, jak przejść z planu do działającego kodu i zaktualizowanych rejestrów.

---

## 1. Warunek wstępny — gotowość planu do implementacji

PRZED rozpoczęciem implementacji, agent MUSI zweryfikować poniższą checklistę. Jeśli **którykolwiek** punkt nie jest spełniony — agent przerywa i zgłasza użytkownikowi przez `ask_followup_question` (patrz sekcja 6).

- [ ] **WW1.** Plan istnieje pod ścieżką `docs/plans/PLAN_<nazwa>.md` (lokalizacja zgodna z [`dev-plan-workflow.md`](dev-plan-workflow.md:1) sekcja 4).
- [ ] **WW2.** Plan zawiera wszystkie 8 sekcji SDD: `## 1. Cel`, `## 2. Zakres`, `## 3. Wymagania funkcjonalne`, `## 4. Wymagania niefunkcjonalne`, `## 5. Kontekst techniczny`, `## 6. Kroki implementacji`, `## 7. Kryteria akceptacji`, `## 8. Testy` (sprawdzane przez `grep "^## " docs/plans/PLAN_<nazwa>.md`).
- [ ] **WW3.** Wszystkie placeholdery `[...]` w planie są wypełnione realnymi wartościami (sprawdzane przez `grep -n "\[\.\.\.\]" docs/plans/PLAN_<nazwa>.md` — wynik MUSI być pusty).
- [ ] **WW4.** Sekcja `## 7. Kryteria akceptacji` zawiera weryfikowalne kryteria (komendy terminala, oględziny DOM, testy automatyczne) — nie mogą to być same opisowe stwierdzenia w stylu „funkcjonalność działa".
- [ ] **WW5.** Sekcja `## 5.3. Zależności od innych modułów / planów` wskazuje, że wszystkie wymagane wcześniejsze plany są ukończone (status `[x]` w [`implemented_plans.md`](../../implemented_plans.md:1)).

---

## 2. Proces implementacji (6 kroków)

Każde wdrożenie planu MUSI przebiegać sekwencyjnie przez te 6 kroków. Pominięcie kroku lub zmiana kolejności jest naruszeniem workflow.

### Krok 1 — Read

**Co robi agent:** Czyta cały plan + dokumenty referenced (np. [`dev-coding-rules.md`](dev-coding-rules.md:1), istniejący kod w plikach z sekcji 5.1 planu).

**Narzędzia:** [`read_file`](../../docs/plans/PLAN_sdd-szablon-planu.md:1) (z opcją `lineRanges` dla dużych plików), `list_files` (do zrozumienia kontekstu katalogów).

**Warunek przejścia dalej:** Agent rozumie zakres (sekcja 2), wymagania funkcjonalne (sekcja 3) i pełną listę kroków implementacji (sekcja 6).

### Krok 2 — Verify

**Co robi agent:** Weryfikuje warunek wstępny z sekcji 1 tego workflow (5 punktów WW1–WW5).

**Narzędzia:** `execute_command` (`grep`, `ls`), [`read_file`](../../implemented_plans.md:1) (sprawdzenie statusów zależności).

**Warunek przejścia dalej:** Wszystkie 5 punktów checklisty wstępnej spełnione. Jeśli nie — `ask_followup_question` z opisem braku.

### Krok 3 — Implement

**Co robi agent:** Wykonuje sekwencyjnie wszystkie kroki z sekcji `## 6. Kroki implementacji` planu. Każdy krok atomowy = jedna lub kilka skoordynowanych operacji na plikach.

**Narzędzia:** `apply_diff` (preferowane dla modyfikacji), `write_to_file` (dla nowych plików lub całkowitego rewrite), `edit_file`, `execute_command` (np. `git mv`, `mv`, `sed` — gdy ekonomicznie uzasadnione), `delete_file`.

**Warunek przejścia dalej:** Wszystkie kroki z sekcji 6 planu wykonane; każdy plik z sekcji 5.1 planu zmodyfikowany zgodnie z opisem; brak modyfikacji plików **niewymienionych** w sekcji 5.1 (z wyjątkiem rejestrów — krok 5).

### Krok 4 — Test

**Co robi agent:** Uruchamia komendy weryfikacyjne z sekcji `## 7. Kryteria akceptacji` i `## 8. Testy` planu. Dla planów dotyczących kodu obowiązkowy zestaw:

```bash
cd code && npx tsc --noEmit && npm run lint && npm run build
```

Dla planów z testami unit / integracyjnymi — dodatkowo `npm test` lub `npx vitest run`.

**Narzędzia:** `execute_command`, `browser_action` (jeśli plan wymaga testu manualnego w UI).

**Warunek przejścia dalej:** Wszystkie KA z sekcji 7 spełnione (każde kryterium ✅ z dowodem — komenda + exit code lub log). Jeśli któraś komenda zwraca błąd:
- Jeśli błąd jest **w zakresie planu** (dotyczy zmodyfikowanego pliku) — agent naprawia w ramach kroku 3 i wraca do kroku 4.
- Jeśli błąd jest **poza zakresem planu** (np. istniejący problem w niezmienionym pliku) — agent przerywa i zgłasza zgodnie z sekcją 6.

### Krok 5 — Update Registries

**Co robi agent:** Aktualizuje dwa pliki rejestrowe w roocie repozytorium:

1. **[`implemented_plans.md`](../../implemented_plans.md:1):**
   - Znajduje wpis `- [ ] [PLAN_<nazwa>.md]…` aktualnie implementowanego planu.
   - Zmienia `[ ]` na `[x]`.
   - Zmienia suffix `**status: PLANNED**` na `**status: DONE**` (lub `**status: PARTIAL**` jeśli plan wdrożono częściowo z uzasadnieniem).

2. **[`implemented_features.md`](../../implemented_features.md:1):**
   - Jeśli plan **dodaje nową funkcjonalność** — agent dodaje nową sekcję `## [Nazwa funkcjonalności]` z 4 polami (zgodnie z [`PLAN_sdd-rejestry-projektu.md`](../../docs/plans/PLAN_sdd-rejestry-projektu.md:55) WF2):
     ```markdown
     ## [Nazwa funkcjonalności]

     - **Status:** DONE
     - **Plan:** [link do planu w docs/plans/]
     - **Opis:** [1-2 zdania co robi funkcjonalność]
     - **Pliki:**
       - [`code/src/path/to/file.tsx`](code/src/path/to/file.tsx) — [krótki opis]
     ```
   - Jeśli plan **modyfikuje istniejącą funkcjonalność** — agent aktualizuje odpowiednią sekcję (Status / Plan / Opis / Pliki).
   - Jeśli plan **dotyczy wyłącznie meta-warstwy** (dokumentacja, workflow, struktura katalogów) — agent **nie modyfikuje** `implemented_features.md` (rejestr zawiera tylko funkcjonalności kodu, nie meta-zmiany).

**Narzędzia:** `apply_diff` (preferowane), `edit_file`.

**Warunek przejścia dalej:** Oba rejestry zaktualizowane; status w `implemented_plans.md` jest `[x]`; sekcja w `implemented_features.md` istnieje (jeśli dotyczy).

### Krok 6 — Report

**Co robi agent:** Raportuje ukończenie implementacji przez `attempt_completion` zgodnie z formatem z sekcji 5 tego workflow.

**Narzędzia:** `attempt_completion`.

**Warunek zakończenia workflow:** Raport zawiera wszystkie 5 elementów z sekcji 5; rejestry zaktualizowane; KA udokumentowane.

---

## 3. Reguły implementacji (dos & don'ts)

### 3.1. Zakaz rozszerzania zakresu (YAGNI)

Agent NIE implementuje niczego poza tym, co jest w sekcji `## 2.1. W zakresie` planu. Jeśli w trakcie implementacji odkryje, że potrzebna byłaby dodatkowa zmiana — zatrzymuje się i zgłasza (sekcja 6) zamiast „przy okazji" dorzucać feature.

> Zasada YAGNI z [`dev-coding-rules.md`](dev-coding-rules.md:235) sekcja 10.2.

### 3.2. Zakaz refaktorów poza planem

Agent NIE zmienia kodu poza ścieżkami wymienionymi w sekcji `## 5.1. Komponenty / pliki dotknięte zmianą` planu. Jeśli widzi dług techniczny w innych plikach — notuje jako komentarz `// TECH-DEBT:` ale **nie naprawia**.

> Zasada „nie refaktoruj poza zakresem" z [`dev-coding-rules.md`](dev-coding-rules.md:228) sekcja 10.1.

### 3.3. Obowiązek weryfikacji jakości kodu

Przed krokiem 5 (Update Registries) agent MUSI mieć **zielony** wynik dla:

```bash
cd code && npx tsc --noEmit   # 0 błędów TypeScript
cd code && npm run lint        # 0 błędów i 0 warningów ESLint
cd code && npm run build       # build kończy się sukcesem
```

Jeśli plan zawiera testy (sekcja 8.1 lub 8.2) — dodatkowo `npm test` lub `npx vitest run` z wszystkimi testami przechodzącymi.

> Sekcja 10.3 z [`dev-coding-rules.md`](dev-coding-rules.md:240).

### 3.4. Zasada „spójność > ideał"

Jeśli istniejący kod ma styl/konwencję odbiegającą od [`dev-coding-rules.md`](dev-coding-rules.md:1), agent **zachowuje istniejącą konwencję** w obrębie tego pliku — chyba że plan jawnie nakazuje refaktor.

> Sekcja 10.1 z [`dev-coding-rules.md`](dev-coding-rules.md:226).

### 3.5. Zakaz commitów bez raportu

Agent NIGDY nie wykonuje `git commit` ani `git push` automatycznie. Wszystkie zmiany pozostają w obszarze roboczym (working tree) lub staging area; commit jest **świadomą decyzją użytkownika** po przeczytaniu raportu z kroku 6. Wyjątek: agent MOŻE wykonać `git add` i `git mv` jeśli są częścią kroków implementacji planu (np. migracja plików w Planie A).

### 3.6. Zakaz ujawniania sekretów

Agent NIE commituje plików `.env*`, `secrets/`, ani plików z hardkodowanymi kluczami API. Klucze MUSZĄ trafiać wyłącznie do `.env.local` (server-only) lub `NEXT_PUBLIC_*` (jeśli świadomie publiczne).

> Sekcja 9 z [`dev-coding-rules.md`](dev-coding-rules.md:213).

---

## 4. Aktualizacja rejestrów projektu

Krok 5 workflow wymaga aktualizacji dwóch plików. Poniżej dokładne instrukcje z przykładami przed/po.

### 4.1. Aktualizacja [`implemented_plans.md`](../../implemented_plans.md:1)

**Przed (plan zaplanowany):**
```markdown
- [ ] [PLAN_sdd-workflow-implement.md](docs/plans/PLAN_sdd-workflow-implement.md) — Plan D: Workflow `implement` (`kilocode/rules/dev-implement-workflow.md`) — **status: PLANNED**
```

**Po (plan wdrożony):**
```markdown
- [x] [PLAN_sdd-workflow-implement.md](docs/plans/PLAN_sdd-workflow-implement.md) — Plan D: Workflow `implement` (`kilocode/rules/dev-implement-workflow.md`) — **status: DONE**
```

**Reguły:**
- `[ ]` → `[x]` (checkbox markdown).
- `**status: PLANNED**` → `**status: DONE**` (lub `**status: PARTIAL**` z notatką wyjaśniającą).
- Reszta wpisu (link, opis) bez zmian.

### 4.2. Aktualizacja [`implemented_features.md`](../../implemented_features.md:1)

**Szablon nowej sekcji** (gdy plan dodaje nową funkcjonalność kodu):

```markdown
## [Nazwa funkcjonalności w PascalCase lub naturalnym języku]

- **Status:** DONE
- **Plan:** [PLAN_xxx.md](docs/plans/PLAN_xxx.md)
- **Opis:** [1-2 zdania co robi funkcjonalność z perspektywy użytkownika lub systemu]
- **Pliki:**
  - [`code/src/path/to/main-file.tsx`](code/src/path/to/main-file.tsx) — [rola tego pliku, np. „główny komponent CC z logiką stanu"]
  - [`code/src/lib/helper.ts`](code/src/lib/helper.ts) — [rola]
  - [`code/src/types/typing.ts`](code/src/types/typing.ts) — [typy]
```

**Reguły:**
- Pozycjonowanie nowej sekcji: zgodnie z istniejącą konwencją (alfabetycznie LUB chronologicznie LUB tematycznie — zależnie od dotychczasowego wzorca w pliku; jeśli niejasne — alfabetycznie).
- Linki do plików: względne z perspektywy roota repo (`code/src/...`, NIE `./code/src/...` ani `/code/src/...`).
- Status zawsze `DONE` (jeśli plan ukończony pełnym sukcesem) lub `PARTIAL` (jeśli niektóre KA niespełnione z uzasadnieniem).

**Kiedy NIE aktualizować `implemented_features.md`:**
- Plan dotyczy wyłącznie meta-warstwy: dokumentacja, struktura katalogów, workflow agenta, ADR-y, reguły kodowania.
- Plan modyfikuje istniejącą funkcjonalność bez zmiany jej nazwy/zakresu (wtedy aktualizujemy istniejącą sekcję, nie dodajemy nowej).

---

## 5. Procedura zgłoszenia ukończenia

Po pomyślnym wykonaniu kroków 1–5, agent wykonuje `attempt_completion` z raportem zgodnym z poniższym szablonem (skopiuj i wypełnij):

````markdown
## ✅ Plan [X] zaimplementowany — [Krótka nazwa]

Wykonałem wszystkie kroki implementacji zgodnie z [`docs/plans/PLAN_xxx.md`](docs/plans/PLAN_xxx.md).

### Zrealizowane kroki (sekcja 6 planu)

1. ✅ [Tytuł kroku 1] — [krótki opis tego, co zrobiono]
2. ✅ [Tytuł kroku 2] — [...]
3. ✅ [...]

### Pominięte (Out of Scope — sekcja 2.2 planu)

- [Element 1, którego celowo nie wykonano] — uzasadnienie: [krótko]
- [Element 2] — [...]

### Weryfikacja kryteriów akceptacji (sekcja 7 planu)

| KA | Warunek | Dowód | Status |
|----|---------|-------|--------|
| KA1 | [tekst kryterium] | [komenda + exit code lub link do dowodu] | ✅ |
| KA2 | [...] | [...] | ✅ |
| KA[n] | [...] | [...] | ✅ |

### Zaktualizowane rejestry

- [`implemented_plans.md`](implemented_plans.md) — wpis `PLAN_xxx.md` zmieniony z `[ ]` na `[x]`, status `PLANNED` → `DONE`.
- [`implemented_features.md`](implemented_features.md) — [dodana nowa sekcja `## [Nazwa]` LUB zaktualizowana sekcja `## [Nazwa]` LUB nie dotyczy (plan meta-warstwy)].

### Komendy weryfikacyjne (kopiowalne)

```bash
cd code && npx tsc --noEmit   # exit: 0
cd code && npm run lint        # exit: 0
cd code && npm run build       # exit: 0
```

### Następny krok

Zgodnie z sekcją „🚀 Następny krok" planu: [link do następnego planu lub zalecenie].
````

---

## 6. Procedura zatrzymania implementacji

Jeśli agent napotka jedną z poniższych sytuacji, **MUSI przerwać** krok 3 (Implement) i zwrócić się do użytkownika przez `ask_followup_question`. Niedozwolone jest „przejście dalej" lub improwizacja.

### 6.1. Niejednoznaczność w planie

**Trigger:** Agent nie potrafi wykonać kroku z sekcji 6 planu, bo opis jest dwuznaczny, sprzeczny z innym krokiem, lub brakuje krytycznego szczegółu (np. „dodaj nowy komponent" bez nazwy).

**Format komunikatu:**
```
🛑 **Zatrzymuję implementację Planu [X]** — niejednoznaczność w kroku [N].

**Problem:** [Konkretny opis czego nie da się jednoznacznie zinterpretować].

**Możliwe interpretacje:**
- (a) [Wariant A]
- (b) [Wariant B]
- (c) [Wariant C]

Którą interpretację mam zastosować?
```

### 6.2. Błąd niezaplanowany w środowisku

**Trigger:** Plan zakłada istnienie zależności, pliku lub konfiguracji, której faktycznie nie ma w repo (np. plan wymaga `import { x } from "@/lib/y"` ale pliku `y.ts` nie ma).

**Format komunikatu:**
```
🛑 **Zatrzymuję implementację Planu [X]** — wymagana zależność nie istnieje.

**Brakuje:** [Konkretny plik / pakiet / zmienna środowiskowa].
**Plan zakłada:** [cytat z planu].
**Stan faktyczny:** [co znalazłem zamiast].

Czy mam: (a) utworzyć brakujący element zgodnie z założeniami planu, (b) przerwać i zaktualizować plan, (c) inne?
```

### 6.3. Naruszenie reguł kodowania

**Trigger:** Wykonanie kroku z planu wymagałoby naruszenia [`dev-coding-rules.md`](dev-coding-rules.md:1) — np. użycia `any` w TypeScript, `dangerouslySetInnerHTML` bez sanityzacji, hardkodowanego klucza API, importu z `node_modules` ścieżką.

**Format komunikatu:**
```
🛑 **Zatrzymuję implementację Planu [X]** — krok [N] narusza dev-coding-rules.md sekcja [Y].

**Naruszenie:** [Konkretna reguła, np. „użycie `any` zamiast `unknown` + type guard"].
**Lokalizacja:** [plik:linia].

Czy mam: (a) zaktualizować plan o akceptowalną alternatywę, (b) przerwać i poprosić o korektę planu, (c) zaakceptować naruszenie z komentarzem `// TODO: fix type`?
```

### 6.4. Wykrycie zmian poza zakresem planu

**Trigger:** Agent stwierdza, że plik z sekcji 5.1 planu został w międzyczasie zmodyfikowany przez kogoś innego (treść różna od oczekiwanej w kontekście kroków implementacji) — np. inny agent w międzyczasie pracował nad tym samym plikiem.

**Format komunikatu:**
```
🛑 **Zatrzymuję implementację Planu [X]** — plik [ścieżka] został zmodyfikowany poza planem.

**Oczekiwany stan (z planu):** [opis lub fragment kodu].
**Aktualny stan:** [co widzę].

Czy mam: (a) nadpisać aktualny stan zgodnie z planem, (b) zachować obie zmiany przez merge, (c) przerwać i poprosić o aktualizację planu?
```

---

## 7. Instrukcja dla agentów (system prompt)

> Kiedy użytkownik prosi o implementację planu z `docs/plans/PLAN_*.md`:
>
> 1. **Najpierw zweryfikuj warunek wstępny** z sekcji 1 tego workflow (5 punktów WW1–WW5). Jeśli którykolwiek niespełniony — przerwij i zgłoś przez `ask_followup_question`.
> 2. **Wykonaj sekwencyjnie 6 kroków** z sekcji 2: Read → Verify → Implement → Test → Update Registries → Report. Pominięcie lub zmiana kolejności = naruszenie workflow.
> 3. **Stosuj reguły** z sekcji 3 — w szczególności: zakaz rozszerzania zakresu, zakaz refaktorów poza planem, obowiązkowa zielona walidacja `tsc + lint + build` przed krokiem 5.
> 4. **Aktualizuj rejestry** zgodnie z sekcją 4 — zawsze `implemented_plans.md` (`[ ]` → `[x]`); `implemented_features.md` tylko gdy plan dodaje funkcjonalność kodu.
> 5. **Zgłoś ukończenie** przez `attempt_completion` w formacie z sekcji 5.
> 6. **Jeśli napotkasz problem** z sekcji 6 — zatrzymaj się i zgłoś przez `ask_followup_question`. Nie improwizuj.
> 7. **Stosuj reguły kodowania** z [`dev-coding-rules.md`](dev-coding-rules.md:1) — w szczególności sekcję 11 mapującą sekcje SDD na konwencje Next.js / React / TypeScript / Tailwind.
> 8. **Nigdy nie commituj** automatycznie. `git add` i `git mv` dozwolone jeśli wynikają z kroków planu; `git commit` i `git push` to zawsze decyzja użytkownika po raporcie.

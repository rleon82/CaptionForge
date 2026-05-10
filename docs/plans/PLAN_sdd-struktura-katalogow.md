# PLAN: Struktura katalogów SDD + migracja istniejących plików dokumentacji

> **Plan A** z roadmapy wdrożenia Spec Driven Development w CaptionForge.
> Tworzy obowiązkową strukturę katalogów SDD w `docs/` i migruje istniejące pliki dokumentacji oraz historyczne plany do nowych lokalizacji (zachowując treść 1:1).

---

## 1. Cel

Wprowadzić w repozytorium CaptionForge fizyczną strukturę katalogów wymaganą przez metodykę **Spec Driven Development (SDD)** — `docs/{architecture, business, tech, plans, roles/{product_owner, ux_ui, architect, developer, tester}}` — oraz przenieść istniejące pliki dokumentacji do właściwych podkatalogów. Pozwoli to kolejnym planom (B, D, E, F) działać już w docelowej strukturze i zapewni audytowalność (jeden katalog = jedna domena odpowiedzialności).

Cel biznesowy: usunięcie chaosu lokalizacji ([`docs/`](../../docs:1) z plikami luzem, [`plans/`](../../plans:1) w roocie repo), wprowadzenie jednolitej, samodokumentującej się hierarchii zgodnej z kontraktem SDD.

---

## 2. Zakres

### 2.1. W zakresie

- Utworzenie 9 nowych katalogów w `docs/`: `architecture/`, `business/`, `tech/`, `roles/product_owner/`, `roles/ux_ui/`, `roles/architect/`, `roles/developer/`, `roles/tester/` (katalog `docs/plans/` już istnieje od Planu C).
- Utworzenie placeholderów `README.md` w każdym nowym katalogu (treść minimalna — tytuł + 1-zdaniowy opis przeznaczenia katalogu; wypełnienie merytoryczne należy do Planu E i Planu F).
- Migracja (przeniesienie + usunięcie oryginału) 4 plików z [`docs/`](../../docs:1) do podkatalogów:
  - [`docs/Job_To_Be_Done.md`](../Job_To_Be_Done.md:1) → `docs/business/Job_To_Be_Done.md`
  - [`docs/User_Journey_Map.md`](../User_Journey_Map.md:1) → `docs/business/User_Journey_Map.md`
  - [`docs/technical-documentation.md`](../technical-documentation.md:1) → `docs/tech/technical-documentation.md`
  - [`docs/plan.md`](../plan.md:1) → `docs/architecture/legacy-vanilla-plan.md` (decyzja: to historyczny plan techniczny wersji Vanilla z aktualnymi sekcjami architektonicznymi — pasuje do `architecture/`, nie `business/` ani `plans/`).
- Migracja (przeniesienie + zmiana nazwy + usunięcie oryginału) 4 plików z [`plans/`](../../plans:1) do `docs/plans/` z prefiksem `PLAN_` zachowując oryginalne nazwy (zgodnie z zasadą „spójność > ideał” z [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:226) — sekcja 10.1):
  - [`plans/szkielet-nextjs-captionforge.md`](../../plans/szkielet-nextjs-captionforge.md:1) → `docs/plans/PLAN_szkielet-nextjs-captionforge.md`
  - [`plans/captionforge-audit-i-roadmap.md`](../../plans/captionforge-audit-i-roadmap.md:1) → `docs/plans/PLAN_captionforge-audit-i-roadmap.md`
  - [`plans/captionforge-new-features.md`](../../plans/captionforge-new-features.md:1) → `docs/plans/PLAN_captionforge-new-features.md`
  - [`plans/gemini-api-integration.md`](../../plans/gemini-api-integration.md:1) → `docs/plans/PLAN_gemini-api-integration.md`
- Usunięcie pustego katalogu [`plans/`](../../plans:1) z rootu repozytorium po migracji wszystkich plików.
- Aktualizacja linków w [`docs/README.md`](../README.md:1) tak, aby wskazywały na nowe lokalizacje przeniesionych plików (sekcje „Spis treści dokumentacji” i „Plany implementacyjne”).
- Aktualizacja referencji do wycofanego katalogu `plans/` w [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) — zmiana noty migracyjnej w nagłówku z „pozostają w starej formie do czasu wykonania **Planu A**” na „zostały zmigrowane do `docs/plans/PLAN_*.md` w starej formie merytorycznej (treść nie była przepisywana)”.

### 2.2. Poza zakresem

- **Przepisywanie treści historycznych planów** ([`plans/*.md`](../../plans:1)) na nowy szablon SDD — celowo nie wykonujemy. Plany pozostają w oryginalnej formie merytorycznej, zmieniamy tylko ich lokalizację i nazwę pliku (zasada „spójność > ideał”).
- **Wypełnianie treścią** placeholderów `README.md` w `docs/roles/*/` — to zakres **Planu E**.
- **Tworzenie `system_overview.md` ani ADR-ów** w `docs/architecture/` — to zakres **Planu F**.
- **Tworzenie rejestrów** `implemented_plans.md`, `implemented_features.md` ani głównego `README.md` w roocie repo — to zakres **Planu B**.
- **Aktualizacja [`code/README.md`](../../code/README.md:1)** — to wewnętrzny README aplikacji Next.js, nie dotyczy struktury SDD.
- **Zmiana zawartości plików kodu** — zerowy zakres dotykający [`code/src/**`](../../code/src:1).

---

## 3. Wymagania funkcjonalne

- **WF1.** Po wdrożeniu, struktura katalogu `docs/` MUSI wyglądać następująco (z plikami):
  ```
  docs/
  ├── README.md                                  (pozostaje + zaktualizowane linki)
  ├── architecture/
  │   ├── README.md                              (placeholder)
  │   └── legacy-vanilla-plan.md                 (z docs/plan.md)
  ├── business/
  │   ├── README.md                              (placeholder)
  │   ├── Job_To_Be_Done.md                      (z docs/Job_To_Be_Done.md)
  │   └── User_Journey_Map.md                    (z docs/User_Journey_Map.md)
  ├── tech/
  │   ├── README.md                              (placeholder)
  │   └── technical-documentation.md             (z docs/technical-documentation.md)
  ├── plans/
  │   ├── PLAN_sdd-szablon-planu.md              (już istnieje)
  │   ├── PLAN_sdd-struktura-katalogow.md        (ten plan)
  │   ├── PLAN_szkielet-nextjs-captionforge.md   (z plans/)
  │   ├── PLAN_captionforge-audit-i-roadmap.md   (z plans/)
  │   ├── PLAN_captionforge-new-features.md      (z plans/)
  │   └── PLAN_gemini-api-integration.md         (z plans/)
  └── roles/
      ├── product_owner/README.md                (placeholder)
      ├── ux_ui/README.md                        (placeholder)
      ├── architect/README.md                    (placeholder)
      ├── developer/README.md                    (placeholder)
      └── tester/README.md                       (placeholder)
  ```
- **WF2.** Katalog `plans/` w roocie repo MUSI zostać usunięty (po przeniesieniu wszystkich plików).
- **WF3.** Treść każdego przeniesionego pliku MUSI być **identyczna bajt po bajcie** z oryginałem (sprawdzane wizualnie + przez liczbę znaków w nagłówku katalogu — wcześniej znana z `environment_details`). Migracja jest **wyłącznie strukturalna**, nie merytoryczna.
- **WF4.** Każdy z 8 nowych placeholderów `README.md` MUSI zawierać minimum:
  - Nagłówek H1 z nazwą katalogu (np. `# docs/architecture`).
  - 1–3 zdania opisujące przeznaczenie katalogu zgodnie z metodyką SDD.
  - Notatkę: `> Wypełnienie merytoryczne — Plan E (role) lub Plan F (architecture).` jeśli dotyczy.
- **WF5.** Plik [`docs/README.md`](../README.md:1) MUSI mieć zaktualizowane linki w sekcjach:
  - „Spis treści dokumentacji” — linki do `architecture/legacy-vanilla-plan.md`, `business/Job_To_Be_Done.md`, `business/User_Journey_Map.md`, `tech/technical-documentation.md`.
  - „Plany implementacyjne” — linki do `plans/PLAN_*.md` (nowa lokalizacja `docs/plans/`, nie `../plans/`).
- **WF6.** Plik [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) MUSI mieć zaktualizowaną notę migracyjną w nagłówku, odzwierciedlającą zakończoną migrację.

---

## 4. Wymagania niefunkcjonalne

### 4.1. Wydajność

- Nie dotyczy. Operacje wyłącznie na plikach `*.md`, brak wpływu na bundle, runtime, build time aplikacji Next.js.

### 4.2. Bezpieczeństwo

- Brak wpływu — przenoszone pliki nie zawierają sekretów ani PII.
- Operacja `delete_file` na oryginałach jest **zamierzona i odwracalna przez git** (commit poprzedzający = backup).

### 4.3. UX/DX (Developer Experience)

- Po migracji wszystkie linki w [`docs/README.md`](../README.md:1) MUSZĄ być **klikalne i poprawne** w VS Code Markdown Preview (Cmd+Shift+V).
- Struktura `docs/` MUSI być czytelna w widoku drzewa VS Code (alfabetyczna kolejność katalogów: `architecture` → `business` → `plans` → `roles` → `tech` jest naturalna i nie wymaga interwencji).
- Konwencja nazw planów `PLAN_*.md` w `docs/plans/` MUSI być spójna — żadnych plików `*.md` bez prefiksu `PLAN_` w tym katalogu (z wyjątkiem ewentualnego `README.md`, który nie jest tworzony w tym planie).

### 4.4. Audytowalność

- Każdy ruch pliku MUSI być wykonalny jako pojedyncza operacja git (zalecane: `git mv` w finalnym commicie, ale w trakcie pracy agenta dopuszczalne `read → write_to_file → delete_file` z weryfikacją identyczności treści).
- Po wdrożeniu komenda `git status` MUSI pokazywać przeniesienia (renames) zamiast par „delete + add” — to wymaga uwagi przy commicie (`git add -A` zwykle wykrywa rename automatycznie przy >50% podobieństwa treści).

---

## 5. Kontekst techniczny

### 5.1. Komponenty / pliki dotknięte zmianą

| Plik / katalog | Typ zmiany | Opis |
|---|---|---|
| `docs/architecture/` | Utworzenie (katalog) | Nowy katalog SDD na opis architektury i ADR-y. |
| `docs/architecture/README.md` | Utworzenie | Placeholder — przeznaczenie katalogu. |
| `docs/architecture/legacy-vanilla-plan.md` | Utworzenie (kopia) | Treść z [`docs/plan.md`](../plan.md:1). |
| `docs/business/` | Utworzenie (katalog) | Nowy katalog SDD na wymagania biznesowe. |
| `docs/business/README.md` | Utworzenie | Placeholder. |
| `docs/business/Job_To_Be_Done.md` | Utworzenie (kopia) | Treść z [`docs/Job_To_Be_Done.md`](../Job_To_Be_Done.md:1). |
| `docs/business/User_Journey_Map.md` | Utworzenie (kopia) | Treść z [`docs/User_Journey_Map.md`](../User_Journey_Map.md:1). |
| `docs/tech/` | Utworzenie (katalog) | Nowy katalog SDD na opis stosu technologicznego. |
| `docs/tech/README.md` | Utworzenie | Placeholder. |
| `docs/tech/technical-documentation.md` | Utworzenie (kopia) | Treść z [`docs/technical-documentation.md`](../technical-documentation.md:1). |
| `docs/roles/product_owner/README.md` | Utworzenie | Placeholder (Plan E uzupełni). |
| `docs/roles/ux_ui/README.md` | Utworzenie | Placeholder. |
| `docs/roles/architect/README.md` | Utworzenie | Placeholder. |
| `docs/roles/developer/README.md` | Utworzenie | Placeholder. |
| `docs/roles/tester/README.md` | Utworzenie | Placeholder. |
| `docs/plans/PLAN_szkielet-nextjs-captionforge.md` | Utworzenie (kopia) | Treść z [`plans/szkielet-nextjs-captionforge.md`](../../plans/szkielet-nextjs-captionforge.md:1). |
| `docs/plans/PLAN_captionforge-audit-i-roadmap.md` | Utworzenie (kopia) | Treść z [`plans/captionforge-audit-i-roadmap.md`](../../plans/captionforge-audit-i-roadmap.md:1). |
| `docs/plans/PLAN_captionforge-new-features.md` | Utworzenie (kopia) | Treść z [`plans/captionforge-new-features.md`](../../plans/captionforge-new-features.md:1). |
| `docs/plans/PLAN_gemini-api-integration.md` | Utworzenie (kopia) | Treść z [`plans/gemini-api-integration.md`](../../plans/gemini-api-integration.md:1). |
| [`docs/plan.md`](../plan.md:1) | Usunięcie | Po skopiowaniu treści do `architecture/legacy-vanilla-plan.md`. |
| [`docs/Job_To_Be_Done.md`](../Job_To_Be_Done.md:1) | Usunięcie | Po skopiowaniu do `business/`. |
| [`docs/User_Journey_Map.md`](../User_Journey_Map.md:1) | Usunięcie | Po skopiowaniu do `business/`. |
| [`docs/technical-documentation.md`](../technical-documentation.md:1) | Usunięcie | Po skopiowaniu do `tech/`. |
| [`plans/szkielet-nextjs-captionforge.md`](../../plans/szkielet-nextjs-captionforge.md:1) | Usunięcie | Po skopiowaniu z prefiksem `PLAN_` do `docs/plans/`. |
| [`plans/captionforge-audit-i-roadmap.md`](../../plans/captionforge-audit-i-roadmap.md:1) | Usunięcie | j.w. |
| [`plans/captionforge-new-features.md`](../../plans/captionforge-new-features.md:1) | Usunięcie | j.w. |
| [`plans/gemini-api-integration.md`](../../plans/gemini-api-integration.md:1) | Usunięcie | j.w. |
| [`plans/`](../../plans:1) | Usunięcie (katalog) | Po opróżnieniu. |
| [`docs/README.md`](../README.md:1) | Modyfikacja | Aktualizacja linków w sekcjach „Spis treści” i „Plany implementacyjne”. |
| [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) | Modyfikacja (1 fragment) | Aktualizacja noty migracyjnej w nagłówku. |

### 5.2. API / Dane

- Brak. Operacje wyłącznie na systemie plików i Markdown.

### 5.3. Zależności od innych modułów / planów

- **Wymaga ukończenia Planu C** (szablon SDD musi być wprowadzony przed migracją plików — bo Plan A jest zapisany w nowym szablonie i odwołuje się do niego). ✅ Zrealizowane.
- **Otwiera drogę dla:** Plan B (rejestry korzystają z `docs/plans/PLAN_*.md`), Plan E (role wypełniają `docs/roles/*/README.md`), Plan F (`docs/architecture/system_overview.md` + ADR-y).

### 5.4. Stos technologiczny

- Brak — operacje wyłącznie na markdown i strukturze katalogów.
- Wymagane narzędzia agenta: `write_to_file` (utworzenie kopii + nowych README), `delete_file` (usunięcie oryginałów), `apply_diff` lub `edit_file` (aktualizacja [`docs/README.md`](../README.md:1) i [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1)), `read_file` (weryfikacja identyczności treści).

---

## 6. Kroki implementacji

Każdy krok jest atomowy. Kolejność jest istotna — usunięcia wykonujemy **dopiero po** weryfikacji, że kopia istnieje i ma identyczną treść.

### 6.1. Faza 1 — utworzenie szkieletu katalogów (placeholdery README)

1. **Utwórz** plik `docs/architecture/README.md` (write_to_file) z minimalną treścią: nagłówek H1 `# docs/architecture`, opis: „Wysokopoziomowy opis architektury systemu, decyzje architektoniczne (ADR — Architecture Decision Records), diagramy.”, notatka `> Wypełnienie merytoryczne — Plan F.`
2. **Utwórz** plik `docs/business/README.md` z opisem: „Wymagania biznesowe — cele produktu, user stories, JTBD, User Journey, ograniczenia biznesowe.”
3. **Utwórz** plik `docs/tech/README.md` z opisem: „Stos technologiczny, uzasadnienia wyborów, konwencje projektowe, dokumentacja techniczna komponentów.”
4. **Utwórz** plik `docs/roles/product_owner/README.md` z opisem: „Rola Product Owner — wizja produktu, backlog, priorytety, decyzje produktowe.”, notatka `> Wypełnienie merytoryczne — Plan E.`
5. **Utwórz** plik `docs/roles/ux_ui/README.md` z opisem: „Rola UX/UI — makiety, przepływy użytkownika, zasady UX, system designu.”, notatka `> Wypełnienie merytoryczne — Plan E.`
6. **Utwórz** plik `docs/roles/architect/README.md` z opisem: „Rola Architect — decyzje techniczne, modele systemu, integracje, ADR-y.”, notatka `> Wypełnienie merytoryczne — Plan E (link do `docs/architecture/`).`
7. **Utwórz** plik `docs/roles/developer/README.md` z opisem: „Rola Developer — standardy kodu, konwencje, workflow implementacji (link do `kilocode/rules/dev-coding-rules.md`).”, notatka `> Wypełnienie merytoryczne — Plan E.`
8. **Utwórz** plik `docs/roles/tester/README.md` z opisem: „Rola Tester — strategia testów, scenariusze testowe, przypadki edge-case, narzędzia (Vitest, Playwright).”, notatka `> Wypełnienie merytoryczne — Plan E.`

### 6.2. Faza 2 — migracja plików `docs/*` do podkatalogów

9. **Skopiuj** treść [`docs/Job_To_Be_Done.md`](../Job_To_Be_Done.md:1) (read_file → write_to_file) do `docs/business/Job_To_Be_Done.md` **bez zmian merytorycznych**. Zweryfikuj identyczność (read_file na nowym pliku, porównanie liczby linii).
10. **Skopiuj** treść [`docs/User_Journey_Map.md`](../User_Journey_Map.md:1) do `docs/business/User_Journey_Map.md`. Weryfikacja jw.
11. **Skopiuj** treść [`docs/technical-documentation.md`](../technical-documentation.md:1) do `docs/tech/technical-documentation.md`. Weryfikacja jw.
12. **Skopiuj** treść [`docs/plan.md`](../plan.md:1) do `docs/architecture/legacy-vanilla-plan.md`. Weryfikacja jw. **Uwaga:** zachowaj treść 1:1, łącznie z linkami względnymi w nagłówku (`../code/`, `../vanilla web/`) — po przeniesieniu te linki muszą prowadzić do tych samych miejsc, więc zwiększą się o jeden poziom: `../../code/`, `../../vanilla web/`. **Zaktualizuj** linki względne w skopiowanym pliku (znajdź każde wystąpienie `../code/`, `../vanilla web/`, `technical-documentation.md` i popraw na `../../code/`, `../../vanilla web/`, `../tech/technical-documentation.md`). To jedyny dopuszczalny edit treści w fazie 2.

### 6.3. Faza 3 — migracja planów `plans/*` do `docs/plans/`

13. **Skopiuj** zawartość [`plans/szkielet-nextjs-captionforge.md`](../../plans/szkielet-nextjs-captionforge.md:1) do `docs/plans/PLAN_szkielet-nextjs-captionforge.md` **bez zmian treści**. Weryfikacja identyczności.
14. **Skopiuj** zawartość [`plans/captionforge-audit-i-roadmap.md`](../../plans/captionforge-audit-i-roadmap.md:1) do `docs/plans/PLAN_captionforge-audit-i-roadmap.md`. Weryfikacja jw.
15. **Skopiuj** zawartość [`plans/captionforge-new-features.md`](../../plans/captionforge-new-features.md:1) do `docs/plans/PLAN_captionforge-new-features.md`. Weryfikacja jw.
16. **Skopiuj** zawartość [`plans/gemini-api-integration.md`](../../plans/gemini-api-integration.md:1) do `docs/plans/PLAN_gemini-api-integration.md`. Weryfikacja jw.

### 6.4. Faza 4 — usunięcie oryginałów

17. **Usuń** [`docs/plan.md`](../plan.md:1) (delete_file) — dopiero po potwierdzeniu, że `docs/architecture/legacy-vanilla-plan.md` istnieje i ma identyczną treść co oryginał (z poprawionymi linkami z kroku 12).
18. **Usuń** [`docs/Job_To_Be_Done.md`](../Job_To_Be_Done.md:1).
19. **Usuń** [`docs/User_Journey_Map.md`](../User_Journey_Map.md:1).
20. **Usuń** [`docs/technical-documentation.md`](../technical-documentation.md:1).
21. **Usuń** [`plans/szkielet-nextjs-captionforge.md`](../../plans/szkielet-nextjs-captionforge.md:1).
22. **Usuń** [`plans/captionforge-audit-i-roadmap.md`](../../plans/captionforge-audit-i-roadmap.md:1).
23. **Usuń** [`plans/captionforge-new-features.md`](../../plans/captionforge-new-features.md:1).
24. **Usuń** [`plans/gemini-api-integration.md`](../../plans/gemini-api-integration.md:1).
25. **Usuń** pusty katalog [`plans/`](../../plans:1) (delete_file na ścieżce katalogu — narzędzie waliduje, że jest pusty).

### 6.5. Faza 5 — aktualizacja referencji w pozostałych plikach

26. **Zaktualizuj** [`docs/README.md`](../README.md:1) (apply_diff lub edit_file) — w sekcji „Spis treści dokumentacji” tabela:
    - `[plan.md](plan.md)` → `[architecture/legacy-vanilla-plan.md](architecture/legacy-vanilla-plan.md)` (z aktualizacją opisu na „Historyczny plan wersji Vanilla zachowany jako kontekst architektoniczny”).
    - `[technical-documentation.md](technical-documentation.md)` → `[tech/technical-documentation.md](tech/technical-documentation.md)`.
    - `[Job_To_Be_Done.md](Job_To_Be_Done.md)` → `[business/Job_To_Be_Done.md](business/Job_To_Be_Done.md)`.
    - `[User_Journey_Map.md](User_Journey_Map.md)` → `[business/User_Journey_Map.md](business/User_Journey_Map.md)`.
27. **Zaktualizuj** [`docs/README.md`](../README.md:1) — w sekcji „Plany implementacyjne” zmień nagłówek `### Plany implementacyjne ([\`plans/\`](../plans))` na `### Plany implementacyjne ([\`docs/plans/\`](plans))` oraz wszystkie 4 linki do planów:
    - `[szkielet-nextjs-captionforge.md](../plans/szkielet-nextjs-captionforge.md)` → `[PLAN_szkielet-nextjs-captionforge.md](plans/PLAN_szkielet-nextjs-captionforge.md)`.
    - `[captionforge-audit-i-roadmap.md](../plans/captionforge-audit-i-roadmap.md)` → `[PLAN_captionforge-audit-i-roadmap.md](plans/PLAN_captionforge-audit-i-roadmap.md)`.
    - `[captionforge-new-features.md](../plans/captionforge-new-features.md)` → `[PLAN_captionforge-new-features.md](plans/PLAN_captionforge-new-features.md)`.
    - `[gemini-api-integration.md](../plans/gemini-api-integration.md)` → `[PLAN_gemini-api-integration.md](plans/PLAN_gemini-api-integration.md)`.
28. **Zaktualizuj** [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) — w nagłówku notę migracyjną:
    - **Z:** `> **Wycofany szablon:** Poprzedni szablon „📋 Metadata + ⚙️ Sekcja X + ✅ Test Manualny Sekcji + 🧪 Weryfikacja Końcowa” został **wycofany**. Plany historyczne w katalogu [\`plans/\`](../../plans:1) pozostają w starej formie do czasu wykonania **Planu A** (migracja do \`docs/plans/\`).`
    - **Na:** `> **Wycofany szablon:** Poprzedni szablon „📋 Metadata + ⚙️ Sekcja X + ✅ Test Manualny Sekcji + 🧪 Weryfikacja Końcowa” został **wycofany**. Plany historyczne zostały zmigrowane do [\`docs/plans/PLAN_*.md\`](../../docs/plans:1) (Plan A) i pozostają w starej formie merytorycznej — treść nie była przepisywana zgodnie z zasadą „spójność > ideał”.`

### 6.6. Faza 6 — weryfikacja końcowa

29. **Sprawdź** strukturę katalogu `docs/` (`list_files docs/ recursive=true`) — porównaj z drzewem z WF1.
30. **Sprawdź**, że katalog `plans/` w roocie repozytorium **nie istnieje** (`list_files . recursive=false`).
31. **Sprawdź** w VS Code Markdown Preview ([`docs/README.md`](../README.md:1)), że wszystkie zaktualizowane linki są klikalne i prowadzą do nowych lokalizacji.

---

## 7. Kryteria akceptacji

- **KA1.** Komenda `ls docs/` pokazuje katalogi: `architecture/`, `business/`, `plans/`, `roles/`, `tech/` oraz plik `README.md`. **Nie pokazuje** plików: `plan.md`, `Job_To_Be_Done.md`, `User_Journey_Map.md`, `technical-documentation.md` (wszystkie zostały przeniesione).
- **KA2.** Komenda `ls plans/ 2>/dev/null` zwraca pusty wynik lub błąd „No such file or directory” (katalog usunięty).
- **KA3.** Komenda `ls docs/plans/` pokazuje **6 plików `PLAN_*.md`**: `PLAN_sdd-szablon-planu.md`, `PLAN_sdd-struktura-katalogow.md`, `PLAN_szkielet-nextjs-captionforge.md`, `PLAN_captionforge-audit-i-roadmap.md`, `PLAN_captionforge-new-features.md`, `PLAN_gemini-api-integration.md`. **Brak** plików bez prefiksu `PLAN_`.
- **KA4.** Komenda `ls docs/roles/` pokazuje 5 podkatalogów: `architect/`, `developer/`, `product_owner/`, `tester/`, `ux_ui/`. Każdy zawiera dokładnie plik `README.md`.
- **KA5.** Liczba znaków w przeniesionych plikach (sprawdzana przez `wc -c`) jest **identyczna** z oryginałami z `environment_details` (z dokładnością do ±5 znaków, marginesem na różnice EOL):
  - `docs/business/Job_To_Be_Done.md` ≈ 22061
  - `docs/business/User_Journey_Map.md` ≈ 22982
  - `docs/tech/technical-documentation.md` ≈ 18852
  - `docs/architecture/legacy-vanilla-plan.md` ≈ 8421 (±~50 z powodu zaktualizowanych linków `../` → `../../`)
  - `docs/plans/PLAN_szkielet-nextjs-captionforge.md` ≈ 16959
  - `docs/plans/PLAN_captionforge-audit-i-roadmap.md` ≈ 11013
  - `docs/plans/PLAN_captionforge-new-features.md` ≈ 10873
  - `docs/plans/PLAN_gemini-api-integration.md` ≈ 11686
- **KA6.** Plik [`docs/README.md`](../README.md:1) zawiera linki do **nowych lokalizacji** (sprawdzone wzrokowo + komendą `grep -n "plans/" docs/README.md` — żadne wystąpienie nie powinno mieć już `../plans/`, tylko `plans/PLAN_*` lub `(plans)`).
- **KA7.** Plik [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) zawiera zaktualizowaną notę migracyjną (`grep "zmigrowane" kilocode/rules/dev-plan-workflow.md` zwraca 1 trafienie).
- **KA8.** Brak zmian w plikach kodu źródłowego ([`code/src/**`](../../code/src:1)). Komendy:
  ```bash
  cd code && npx tsc --noEmit && npm run lint && npm run build
  ```
  Zwracają **identyczny** wynik przed i po wdrożeniu planu (zerowy wpływ na aplikację).
- **KA9.** Wszystkie placeholdery `README.md` w nowych katalogach mają minimum nagłówek H1 + 1 zdanie opisu (sprawdzane przez `wc -l docs/{architecture,business,tech,roles/*}/README.md` — każdy plik ma ≥ 3 linii).

---

## 8. Testy

### 8.1. Testy unit

- **Nie dotyczy.** Zmiana wyłącznie strukturalna w `*.md`.

### 8.2. Testy integracyjne

- **Nie dotyczy.** Brak komponentów do zintegrowania.

### 8.3. Testy manualne

- **TM1.** W terminalu:
  ```bash
  ls -la docs/
  ls -la docs/plans/
  ls -la docs/roles/
  ls plans/ 2>&1 | head -1
  ```
  Oczekiwany wynik: zgodny z drzewem WF1; ostatnia komenda zwraca błąd „No such file or directory” lub pustkę.
- **TM2.** Otwórz [`docs/README.md`](../README.md:1) w VS Code Markdown Preview (Cmd+Shift+V). Kliknij każdy z **8 linków** w sekcjach „Spis treści dokumentacji” (4 linki) i „Plany implementacyjne” (4 linki). Każdy MUSI otwierać poprawny plik w nowej lokalizacji (`docs/business/...`, `docs/tech/...`, `docs/architecture/...`, `docs/plans/PLAN_*.md`).
- **TM3.** Otwórz [`docs/architecture/legacy-vanilla-plan.md`](../architecture/legacy-vanilla-plan.md:1) i sprawdź, że linki w nagłówku (do `code/` i `vanilla web/`) prowadzą do **rzeczywistych katalogów** w roocie repo (a nie 404).
- **TM4.** Otwórz [`kilocode/rules/dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:1) i przeczytaj nagłówek — nota migracyjna MUSI mówić o zakończonej migracji, nie o oczekującym Planie A.
- **TM5.** Sprawdź w terminalu (potwierdza KA8):
  ```bash
  cd code && npx tsc --noEmit && npm run lint && npm run build
  ```
  Wynik MUSI być **bez błędów** (potwierdzenie zerowego wpływu na kod aplikacji).
- **TM6.** Wykonaj `git status` po wszystkich zmianach. Oczekiwane: lista renames (przy `git add -A` git zwykle wykryje rename przy >50% podobieństwa treści; jeśli pokazuje delete + add — to akceptowalne, ale sugeruje zmianę commit message na „migrate docs structure to SDD layout”).

### 8.4. Definition of Done (skrót)

Plan A jest ukończony, gdy: KA1 ∧ KA2 ∧ KA3 ∧ KA4 ∧ KA5 ∧ KA6 ∧ KA7 ∧ KA8 ∧ KA9 ∧ TM1–TM6 wszystkie ✅.

---

## 🚀 Następny krok

Po zakończeniu Planu A, zgodnie z roadmapą SDD, kolejnym do realizacji jest:

> **Plan B — Rejestry projektu i README roota.**
> Plik docelowy: `docs/plans/PLAN_sdd-rejestry-projektu.md`. Obejmuje:
> - utworzenie `implemented_plans.md` w roocie repo (lista wszystkich planów z `docs/plans/` z polami statusu `[x]`/`[ ]`),
> - utworzenie `implemented_features.md` w roocie repo (opis zaimplementowanych funkcjonalności CaptionForge na bazie aktualnego stanu [`code/src/**`](../../code/src:1)),
> - utworzenie głównego `README.md` w roocie repozytorium (indeks projektu opisujący strukturę SDD i kierujący do `docs/`, `code/`, `kilocode/`, `vanilla web/`).

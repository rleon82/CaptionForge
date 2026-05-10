# WF_Dev_Plan (SDD) – Wzorzec Planowania Pracy dla AI Developera

**Cel:** Ustandaryzować proces tworzenia planów implementacyjnych dla agenta AI Developer w metodyce **Spec Driven Development (SDD)**. Każdy plan musi być atomowy (jedna mała funkcjonalność), wykonywalny w jednej sesji agenta, audytowalny i gotowy do natychmiastowego wdrożenia bez dodatkowych pytań.

> **Status szablonu:** Aktualny szablon obowiązujący od wdrożenia [`docs/plans/PLAN_sdd-szablon-planu.md`](../../docs/plans/PLAN_sdd-szablon-planu.md:1) (Plan C roadmapy SDD).
> **Wycofany szablon:** Poprzedni szablon „📋 Metadata + ⚙️ Sekcja X + ✅ Test Manualny Sekcji + 🧪 Weryfikacja Końcowa" został **wycofany**. Plany historyczne zostały zmigrowane do [`docs/plans/PLAN_*.md`](../../docs/plans) (Plan A) i pozostają w starej formie merytorycznej — treść nie była przepisywana zgodnie z zasadą „spójność > ideał".

---

## 1. Zasady Tworzenia Planu (Obligatoryjne)

### 1.1. Warunek wstępny – ocena zakresu

**PRZED** stworzeniem planu, agent MUSI ocenić, czy zadanie mieści się w jednej sesji AI.

**Kryteria przekroczenia zakresu (ODRZUĆ prośbę, jeśli spełnione):**

- Zmiana dotyczy więcej niż **3 plików kodu** jednocześnie
- Szacowany czas implementacji przekracza **2–3 godziny** pracy
- Zadanie wymaga **refaktoru całego modułu** lub zmiany architektury
- Funkcjonalność wymaga wcześniejszego ukończenia **innej niezaimplementowanej funkcjonalności**
- Brak jasno zdefiniowanego **punktu końcowego** (Definition of Done / Kryteria Akceptacji)

**Jeśli plan zostanie odrzucony, agent MUSI:**
1. Poinformować użytkownika, dlaczego plan jest zbyt duży.
2. Zaproponować podział na mniejsze, atomowe plany (max 1–2 pliki zmiany per plan).
3. Zasugerować kolejność realizacji tych planów.

### 1.2. Struktura obowiązkowa planu (8 sekcji SDD)

Każdy plan MUSI zawierać następujące sekcje w tej kolejności:

```
## 1. Cel
## 2. Zakres (2.1. W zakresie / 2.2. Poza zakresem)
## 3. Wymagania funkcjonalne
## 4. Wymagania niefunkcjonalne (4.1. Wydajność / 4.2. Bezpieczeństwo / 4.3. UX/DX)
## 5. Kontekst techniczny (komponenty, API, dane, zależności)
## 6. Kroki implementacji
## 7. Kryteria akceptacji
## 8. Testy (8.1. Unit / 8.2. Integracyjne / 8.3. Manualne)
```

---

## 2. Obowiązkowy Szablon SDD (Template do Wypełnienia)

Poniższy blok jest **wzorcem obowiązkowym**. Skopiuj go i wypełnij dla konkretnego zadania, zastępując placeholdery `[...]` realnymi informacjami.

````markdown
# PLAN: [Nazwa Funkcjonalności]

> Krótki opis (1–2 zdania) — co dodajemy/zmieniamy i dlaczego.

---

## 1. Cel

[Opis biznesowy funkcjonalności w 2–4 zdaniach. Co użytkownik / system zyska po wdrożeniu? Jaki problem rozwiązujemy?]

---

## 2. Zakres

### 2.1. W zakresie

- [Konkretny element zmiany #1 — np. „Dodanie komponentu `HistoryEntry` do `src/components/features/history/`”]
- [Konkretny element zmiany #2]
- [Konkretny element zmiany #3]

### 2.2. Poza zakresem

- [Czego NIE robimy w tym planie — np. „Synchronizacja historii z backendem (osobny plan)”]
- [Inne wykluczenie]

---

## 3. Wymagania funkcjonalne

- **WF1.** [Weryfikowalne wymaganie — np. „Po kliknięciu przycisku `Eksportuj` MUSI zostać pobrany plik `.txt` z aktualną zawartością wyników”]
- **WF2.** [Kolejne wymaganie]
- **WF3.** [...]

---

## 4. Wymagania niefunkcjonalne

### 4.1. Wydajność

- [Np. „Renderowanie listy historii z 100 wpisami nie może blokować wątku UI dłużej niż 100 ms”] lub `Nie dotyczy`.

### 4.2. Bezpieczeństwo

- [Np. „Klucz API Gemini nie może trafić do klienta — używaj zmiennej `GEMINI_API_KEY` (server-only, bez prefixu `NEXT_PUBLIC_`)”] lub `Nie dotyczy`.

### 4.3. UX / DX (Developer Experience)

- [Np. „Komponent MUSI obsługiwać tryb ciemny przez klasy `dark:` — zgodnie z konwencją Tailwind w projekcie”] lub `Nie dotyczy`.

---

## 5. Kontekst techniczny

### 5.1. Komponenty / pliki dotknięte zmianą

| Plik | Typ zmiany | Opis |
|------|------------|------|
| `[ścieżka/do/pliku.tsx]` | Utworzenie / Modyfikacja / Usunięcie | [Co konkretnie się zmienia] |

### 5.2. API / Dane

- [Np. „Wykorzystuje endpoint `POST /api/generate` z `code/src/app/api/generate/route.ts`”] lub `Brak`.

### 5.3. Zależności od innych modułów / planów

- [Np. „Wymaga ukończenia Planu X”] lub `Brak zależności`.

### 5.4. Stos technologiczny

- Next.js App Router 14+, React 18+, TypeScript strict, Tailwind CSS v3+ (zgodnie z [`kilocode/rules/dev-coding-rules.md`](../../kilocode/rules/dev-coding-rules.md:1)).

---

## 6. Kroki implementacji

Każdy krok MUSI być atomowy i zawierać konkretną ścieżkę pliku oraz miejsce zmiany.

1. **[Krótki tytuł kroku]** — w pliku `[ścieżka/pliku.tsx]`, w funkcji `[nazwaFunkcji]`, [konkretna zmiana].
2. **[Krótki tytuł kroku]** — [konkretna zmiana].
3. **[...]**

---

## 7. Kryteria akceptacji

Lista weryfikowalnych warunków, które MUSZĄ być spełnione, aby plan uznać za ukończony.

- **KA1.** [Konkretny warunek — np. „Klikając `Generuj` użytkownik widzi wyniki w czasie ≤ 5 s (mock) lub ≤ 30 s (Gemini)”]
- **KA2.** [Kolejny warunek]
- **KA3.** Komenda `cd code && npx tsc --noEmit` zwraca **0 błędów**.
- **KA4.** Komenda `cd code && npm run lint` zwraca **0 błędów i 0 warningów**.
- **KA5.** Komenda `cd code && npm run build` kończy się **sukcesem**.

---

## 8. Testy

### 8.1. Testy unit

- [Np. „Vitest dla `src/lib/export-txt.ts` — przypadki: pusta tablica, pojedynczy wpis, wpis z polskimi znakami”] lub `Nie dotyczy`.

### 8.2. Testy integracyjne

- [Np. „Test Route Handlera `POST /api/generate` z mockowanym Gemini — sprawdza walidację Zod i obsługę błędów”] lub `Nie dotyczy`.

### 8.3. Testy manualne

- **TM1.** [Co otworzyć / co kliknąć / co powinno się wydarzyć].
- **TM2.** [...]

### 8.4. Definition of Done (skrót)

Plan jest ukończony, gdy: KA1 ∧ KA2 ∧ … ∧ KAn ∧ TM1–TMn wszystkie ✅.

---

## 🚀 Następny krok (opcjonalnie)

Po zakończeniu tego planu, logicznym kolejnym krokiem jest:
> [Nazwa i krótki opis następnej funkcjonalności do zaplanowania]
````

---

## 3. Zasady Wypełniania Szablonu

### 3.1. Jak pisać sekcję `## 6. Kroki implementacji`

Każdy krok MUSI:
- Być **atomowy** — jedna konkretna czynność (nie „zaimplementuj historię”).
- Wskazywać **konkretny plik** i **konkretne miejsce** w kodzie.
- Używać **precyzyjnego języka technicznego** (nie „dodaj coś”, ale „dodaj funkcję `saveToHistory(data)` w sekcji `// HISTORY MODULE` pliku [`src/lib/history-storage.ts`](../../code/src/lib/history-storage.ts:1)”).
- Być **wykonywalny bez pytań** — agent nie powinien domyślać się szczegółów.

**Przykład dobrego kroku:**

```
3. **Zapis do historii po wygenerowaniu** — w pliku [`code/src/components/features/generator/generator-section.tsx`](../../code/src/components/features/generator/generator-section.tsx:1),
   w funkcji obsługującej sukces żądania `/api/generate`, po wywołaniu `setResults(data)`,
   wywołaj `saveToHistory(params, data)` z [`code/src/lib/history-storage.ts`](../../code/src/lib/history-storage.ts:1) przekazując
   aktualne parametry formularza i wyniki generacji.
```

**Przykład złego kroku (zbyt ogólny):**

```
3. Zapisz wyniki do historii.
```

### 3.2. Jak pisać sekcję `## 7. Kryteria akceptacji`

Każde kryterium MUSI:
- Być **weryfikowalne** — możliwe do potwierdzenia komendą terminala, oględzinami DOM lub testem.
- Być **mierzalne** tam, gdzie ma to sens (czas, liczba elementów, kod statusu HTTP).
- Zawierać **komendy walidacyjne** dla planów dotykających kodu:
  - `cd code && npx tsc --noEmit` — brak błędów typów.
  - `cd code && npm run lint` — brak błędów i warningów ESLint.
  - `cd code && npm run build` — pomyślne zbudowanie produkcyjne.
  - `cd code && npm test` — przejście testów (jeśli istnieją).

### 3.3. Jak pisać sekcję `## 8. Testy`

- **Unit (8.1):** dla pojedynczych funkcji w [`code/src/lib/`](../../code/src/lib:1) lub hooków w [`code/src/hooks/`](../../code/src/hooks:1). Stosuj Vitest lub Jest. Wymagane gdy plan dodaje czystą logikę.
- **Integracyjne (8.2):** dla Route Handlerów w [`code/src/app/api/`](../../code/src/app/api:1) lub flow UI (RTL / Playwright). Wymagane gdy plan modyfikuje API lub interakcje cross-komponentowe.
- **Manualne (8.3):** zawsze, gdy plan dotyka warstwy UI. Każdy TM opisuje: co otworzyć (przeglądarka / DevTools / terminal) → co kliknąć / wykonać → oczekiwany rezultat.

**Przykład dobrego testu manualnego:**

```
- **TM1.** Otwórz aplikację (`cd code && npm run dev`, http://localhost:3000), przejdź do sekcji Generator,
  wypełnij formularz (platforma: Instagram, ton: profesjonalny, opis: "kawa z mlekiem owsianym")
  i kliknij `Generuj opisy`. Sprawdź w DevTools → Application → Local Storage,
  że klucz `captionforge_history` zawiera nowy wpis z polami `timestamp`, `params`, `captions`.
```

### 3.4. Zakres pojedynczego planu

Jeden plan powinien:
- Dotyczyć **maks. 3 plików kodu** (zgodnie z 1.1).
- Zawierać **3–10 kroków implementacji** (sekcja 6).
- Być możliwy do implementacji w **30 min – 3 h**.

---

## 4. Reguła Zapisu Gotowego Planu

Po stworzeniu planu, agent MUSI od razu zapisać go jako plik markdown:

**Ścieżka docelowa:** `docs/plans/PLAN_<nazwa-funkcjonalnosci>.md`

**Konwencja nazewnictwa:**
- Prefix `PLAN_` (wielkie litery, podkreślenie) — obowiązkowy.
- Nazwa funkcjonalności w `kebab-case` (myślniki, nie spacje, nie podkreślenia).
- Krótka, opisowa (max 4 słowa po prefiksie): `PLAN_dark-mode-toggle.md`, `PLAN_history-export-txt.md`, `PLAN_gemini-rate-limit.md`.
- Jednolity język (po polsku lub angielsku — konsekwentnie w projekcie).

**Nie pytaj użytkownika o pozwolenie** — zapisanie planu w `docs/plans/` jest częścią workflow.

---

## 5. Procedura Odrzucenia Planu

Jeśli zadanie jest zbyt duże, odpowiedz w formacie:

```
🚫 **Odrzucam prośbę o plan** – zakres przekracza możliwości jednej sesji AI.

**Powód:** [Konkretny powód – np. "Zmiana dotyczy 7 plików i wymaga refaktoru architektury modułów"]

**Proponowany podział na atomowe plany:**

1. **Plan A: [Nazwa]** – [Co obejmuje, co zmienia]
2. **Plan B: [Nazwa]** – [Co obejmuje, co zmienia]
3. **Plan C: [Nazwa]** – [Co obejmuje, co zmienia]

**Zalecana kolejność:** A → B → C (Plan B wymaga ukończenia Planu A)

Który plan chcesz zrealizować jako pierwszy?
```

---

## 6. Instrukcja dla Agentów (System Prompt)

> Kiedy użytkownik prosi o plan implementacyjny:
>
> 1. **Zawsze najpierw oceń zakres** według kryteriów z sekcji 1.1. Jeśli zakres jest za duży — odrzuć i podziel zgodnie z procedurą z sekcji 5.
> 2. Jeśli zakres mieści się w jednej sesji — wypełnij **szablon SDD z sekcji 2** (8 sekcji: `## 1. Cel`, `## 2. Zakres`, `## 3. Wymagania funkcjonalne`, `## 4. Wymagania niefunkcjonalne`, `## 5. Kontekst techniczny`, `## 6. Kroki implementacji`, `## 7. Kryteria akceptacji`, `## 8. Testy`).
> 3. Zastąp wszystkie placeholdery `[...]` realnymi informacjami dotyczącymi projektu CaptionForge i konkretnego zadania użytkownika.
> 4. Każdy krok w sekcji `## 6.` musi być na tyle szczegółowy, żeby inny agent AI mógł go wykonać bez żadnych dodatkowych wyjaśnień.
> 5. Każde kryterium akceptacji w sekcji `## 7.` musi być weryfikowalne komendą lub oględzinami.
> 6. Po stworzeniu planu, **natychmiast zapisz go** w `docs/plans/PLAN_<nazwa-kebab-case>.md` (zgodnie z sekcją 4).
> 7. Stosuj reguły kodowania z [`kilocode/rules/dev-coding-rules.md`](dev-coding-rules.md:1) — w szczególności sekcję 11 mapującą sekcje SDD (1–8) na konwencje Next.js / React / TypeScript / Tailwind.

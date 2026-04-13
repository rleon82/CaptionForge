# WF_Dev_Plan – Wzorzec Planowania Pracy dla AI Developera

**Cel:** Ustandaryzować proces tworzenia planów implementacyjnych dla agenta AI Developer, gwarantując, że każdy plan jest atomowy (jedna mała funkcjonalność), wykonywalny w jednej sesji agenta i gotowy do natychmiastowego wdrożenia.

---

## 1. Zasady Tworzenia Planu (Obligatoryjne)

### 1.1. Warunek Wstępny – Ocena Zakresu

**PRZED** stworzeniem planu, agent MUSI ocenić, czy zadanie mieści się w jednej sesji AI.

**Kryteria przekroczenia zakresu (ODRZUĆ prośbę, jeśli spełnione):**

- Zmiana dotyczy więcej niż **3 plików kodu** jednocześnie
- Szacowany czas implementacji przekracza **2-3 godziny** pracy
- Zadanie wymaga **refaktoru całego modułu** lub zmiany architektury
- Funkcjonalność wymaga wcześniejszego ukończenia **innej niezaimplementowanej funkcjonalności**
- Brak jasno zdefiniowanego **punktu końcowego** (Definition of Done)

**Jeśli plan zostanie odrzucony, agent MUSI:**
1. Poinformować użytkownika, dlaczego plan jest zbyt duży
2. Zaproponować podział na mniejsze, atomowe plany (max 1-2 pliki zmiany per plan)
3. Zasugerować kolejność realizacji tych planów

---

### 1.2. Struktura Obowiązkowa Planu

Każdy plan MUSI zawierać następujące sekcje w tej kolejności:

```
## 📋 Nagłówek i Metadata
## 🎯 Cel i Definicja Ukończenia
## 📁 Zmieniane Pliki
## ⚙️ Sekcja X: [Nazwa] + ✅ Test Manualny Sekcji
## 🧪 Weryfikacja Końcowa (komendy)
```

---

## 2. Szablon Planu (Template do Wypełnienia)

Poniższy szablon jest **wzorcem obowiązkowym**. Agent wypełnia go dla konkretnego zadania.

---

```markdown
# [EMOJI] Plan: [Nazwa Funkcjonalności]

> **Cel:** [Jedno zdanie opisujące co ma działać po wdrożeniu]
> **Szacowany czas:** [X minut – Y godzin]
> **Sesja AI:** ✅ Mieści się w jednej sesji

---

## 📋 Metadata

| Klucz | Wartość |
|-------|---------|
| **Funkcjonalność** | [Nazwa] |
| **Priorytet** | 🔴 Krytyczny / 🟡 Ważny / 🟢 Drobny |
| **Typ zmiany** | Nowa funkcja / Naprawa buga / Refaktor UI / Integracja API |
| **Definition of Done** | [Co MUSI działać, żeby plan był ukończony] |

---

## 🎯 Cel i Zakres

**Co robimy:**
[2-3 zdania opisu funkcjonalności – co dodajemy/zmieniamy]

**Czego NIE robimy (Out of Scope):**
- [X nie jest częścią tego planu]
- [Y zostanie dopiero w kolejnym planie]

---

## 📁 Zmieniane Pliki

| Plik | Typ zmiany | Opis |
|------|-----------|------|
| `[ścieżka/do/pliku.ext]` | Dodanie / Modyfikacja / Usunięcie | [Co konkretnie się zmienia] |

---

## ⚙️ Sekcja 1: [Nazwa Sekcji – np. "Warstwa HTML"]

- [ ] 1.1. [Konkretny krok implementacji – np. "Dodaj `<div id="history">` po sekcji `#results` w `index.html`"]
- [ ] 1.2. [Konkretny krok – np. "Dodaj atrybut `data-platform` do przycisku eksportu"]
- [ ] 1.3. [Konkretny krok]

### ✅ Test Manualny Sekcji 1

Po implementacji tej sekcji, ręcznie zweryfikuj:

- [ ] T1.1. [Co sprawdzić w przeglądarce / terminalu / edytorze – np. "Otwórz `index.html`, sprawdź czy `div#history` jest obecny w DOM (DevTools > Elements)"]
- [ ] T1.2. [Co sprawdzić – np. "Kliknij [przycisk], sprawdź czy pojawia się [oczekiwany efekt]"]

---

## ⚙️ Sekcja 2: [Nazwa Sekcji – np. "Logika JavaScript"]

- [ ] 2.1. [Konkretny krok]
- [ ] 2.2. [Konkretny krok]
- [ ] 2.3. [Konkretny krok]

### ✅ Test Manualny Sekcji 2

- [ ] T2.1. [Co sprawdzić]
- [ ] T2.2. [Co sprawdzić]

---

## ⚙️ Sekcja 3: [Nazwa Sekcji – np. "Warstwa CSS / Style"]

- [ ] 3.1. [Konkretny krok]
- [ ] 3.2. [Konkretny krok]

### ✅ Test Manualny Sekcji 3

- [ ] T3.1. [Co sprawdzić]

---

## 🧪 Weryfikacja Końcowa

### Komendy do uruchomienia po zakończeniu implementacji

**Sprawdzenie składni i lintingu (jeśli projekt używa narzędzi):**
```bash
# Jeśli projekt Node.js / npm
npm run lint

# Jeśli projekt używa ESLint bezpośrednio
npx eslint [zmieniane-pliki.js]

# Jeśli projekt używa Prettier
npx prettier --check [zmieniane-pliki.js]
```

**Uruchomienie testów (jeśli istnieją):**
```bash
# Jeśli projekt ma testy jednostkowe
npm test

# Jeśli projekt używa Vitest
npx vitest run

# Jeśli projekt używa Jest
npx jest --testPathPattern=[nazwa-testu]
```

**Budowanie projektu (jeśli dotyczy):**
```bash
# Projekt Next.js / Vite / inne
npm run build

# Sprawdzenie czy build przeszedł bez błędów
echo "Build exit code: $?"
```

**Weryfikacja działania w przeglądarce:**
```bash
# Otwarcie serwera deweloperskiego (jeśli nie działa)
npm run dev
# lub dla projektów statycznych
npx serve . --port 3000
# lub Live Server (VS Code extension)
# Otwórz index.html przez Live Server i przejdź do URL
```

### ✅ Końcowa Checklista Weryfikacyjna

- [ ] V1. Wszystkie kroki sekcji implementacyjnych są odznaczone ✅
- [ ] V2. Wszystkie testy manualne sekcji zostały przeprowadzone ✅
- [ ] V3. Brak błędów w konsoli przeglądarki (DevTools > Console)
- [ ] V4. Brak błędów w terminalu (lint / build)
- [ ] V5. Funkcjonalność działa zgodnie z **Definition of Done** zdefiniowanym w Metadata
- [ ] V6. Nie zostały przypadkowo uszkodzone inne elementy strony/aplikacji
- [ ] V7. Kod jest zapisany i zmiany są widoczne w plikach

---

## 🚀 Następny Krok (opcjonalnie)

Po zakończeniu tego planu, logicznym kolejnym krokiem jest:
> [Nazwa i krótki opis następnej funkcjonalności do zaplanowania]
```

---

## 3. Zasady Wypełniania Szablonu

### 3.1. Jak pisać kroki implementacyjne

Każdy krok (`- [ ] X.Y.`) MUSI:
- Być **atomowy** – jedna konkretna czynność (nie "zaimplementuj historię")
- Wskazywać **konkretny plik** i **konkretne miejsce** w kodzie
- Używać **precyzyjnego języka technicznego** (nie "dodaj coś", ale "dodaj funkcję `saveToHistory(data)` w sekcji `// HISTORY MODULE` pliku `generator.js`")
- Być **wykonywalny bez pytań** – agent nie powinien domyślać się szczegółów

**Przykład dobrego kroku:**
```
- [ ] 2.3. W pliku `js/generator.js`, w metodzie `renderResults()`, po linii z `this.showResults()`, 
  wywołaj `HistoryManager.save(params, result)` przekazując aktualne parametry formularza i wyniki generacji.
```

**Przykład złego kroku (zbyt ogólny):**
```
- [ ] 2.3. Zapisz wyniki do historii.
```

### 3.2. Jak pisać testy manualne sekcji

Każdy test manualny MUSI opisać:
1. **Co otworzyć / uruchomić** (przeglądarka, terminal, DevTools)
2. **Co kliknąć / wykonać** (konkretna akcja)
3. **Co powinno się wydarzyć** (oczekiwany rezultat)

**Przykład dobrego testu:**
```
- [ ] T2.1. Otwórz `index.html` przez Live Server, przejdź do sekcji Generator, 
  wypełnij formularz i kliknij "Generuj opisy". Sprawdź czy w `localStorage` 
  (DevTools > Application > Local Storage) pojawił się klucz `captionforge_history` 
  z wpisem zawierającym `timestamp` i `captions`.
```

### 3.3. Zakres jednej sekcji

Jedna sekcja (`⚙️ Sekcja X`) powinna:
- Dotyczyć **jednego pliku** lub **jednej warstwy** (HTML / CSS / JS / API)
- Zawierać max **5-7 kroków**
- Być możliwa do implementacji w **30-60 minut**

---

## 4. Zasada Zapisu Gotowego Planu

Po stworzeniu planu, agent MUSI od razu zapisać go jako plik markdown:

**Ścieżka:** `plans/[nazwa-funkcjonalnosci-kebab-case].md`

**Konwencja nazewnictwa:**
- Używaj `kebab-case` (myślniki, nie spacje, nie podkreślenia)
- Nazwy po polsku lub angielsku – konsekwentnie w projekcie
- Krótkie, opisowe (max 4 słowa): `dark-mode-toggle.md`, `history-export-txt.md`

**Nie pytaj użytkownika o pozwolenie** – zapisanie planu jest częścią workflow.

---

## 5. Procedura Odrzucenia Planu

Jeśli zadanie jest zbyt duże, odpowiedz w formacie:

```
🚫 **Odrzucam prośbę o plan** – zakres przekracza możliwości jednej sesji AI.

**Powód:** [Konkretny powód – np. "Zmiana dotyczy 7 plików i wymaga refaktoru architektury modułów"]

**Proponowany podział na atomowe plany:**

1. **Plan A: [Nazwa]** – [Co obejmuje, co zmienia] → Szacowany czas: [X h]
2. **Plan B: [Nazwa]** – [Co obejmuje, co zmienia] → Szacowany czas: [X h]  
3. **Plan C: [Nazwa]** – [Co obejmuje, co zmienia] → Szacowany czas: [X h]

**Zalecana kolejność:** A → B → C (Plan B wymaga ukończenia Planu A)

Który plan chcesz zrealizować jako pierwszy?
```

---

## 6. Instrukcja dla Agentów (System Prompt)

> Kiedy użytkownik prosi o plan implementacyjny, ZAWSZE najpierw oceń zakres według kryteriów z Sekcji 1.1. Jeśli zakres jest za duży – odrzuć i podziel. Jeśli mieści się w jednej sesji – wypełnij szablon z Sekcji 2 dla konkretnego zadania użytkownika, zastępując wszystkie placeholdery `[...]` realnymi informacjami dotyczącymi projektu. Każdy krok musi być na tyle szczegółowy, żeby inny agent AI mógł go wykonać bez żadnych dodatkowych wyjaśnień. Po stworzeniu planu, natychmiast zapisz go w folderze `plans/`.

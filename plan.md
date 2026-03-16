# CaptionForge – Plan Techniczny

## 📋 Opis Projektu

**CaptionForge** to narzędzie webowe do generowania opisów i hasztagów pod posty w mediach społecznościowych. Łączy landing page (prezentacja produktu) z działającym prototypem generatora (mock z architekturą pod przyszłe API).

**Stack:** Czysty HTML5 + CSS3 + Vanilla JavaScript (zero frameworków)
**Lokalizacja:** `plans/captionforge/` w repozytorium architekt-biznesu-saas

---

## 🏗️ Architektura Plików

```
plans/captionforge/
├── index.html          # Główna strona - landing + generator
├── css/
│   └── styles.css      # Wszystkie style, responsywność
├── js/
│   ├── app.js          # Główna logika aplikacji, routing między sekcjami
│   ├── generator.js    # Logika generatora - mock + interfejs pod API
│   └── templates.js    # Szablony mockowych opisów i hasztagów
├── assets/
│   └── (ikony SVG inline w HTML)
└── README.md           # Dokumentacja projektu
```

---

## 🎨 Struktura Strony HTML

### Sekcje Landing Page:

1. **Navbar** – Logo + nawigacja + CTA button
2. **Hero** – Nagłówek, podtytuł, CTA, wizualizacja produktu
3. **Features** – 3-4 kluczowe funkcje z ikonami
4. **How It Works** – 3 kroki z numeracją
5. **Generator (Try It)** – Działający prototyp generatora
6. **Pricing** – 2 plany: Free i Pro
7. **FAQ** – Najczęstsze pytania
8. **Footer** – Linki, copyright

### Sekcja Generatora (kluczowa):

Formularz z polami:
- **Platforma** – dropdown: Instagram, TikTok, LinkedIn, X/Twitter, Facebook
- **Nisza/Branża** – text input: np. fitness, technologia, moda
- **Ton głosu** – dropdown: profesjonalny, casualowy, humorystyczny, inspirujący, edukacyjny
- **Temat posta** – textarea: krótki opis o czym jest post
- **Język** – dropdown: polski, angielski

Wynik:
- 3 warianty opisu (z możliwością kopiowania)
- Zestaw 10-15 hasztagów z oceną popularności (mock)
- Przycisk „Kopiuj do schowka" przy każdym wariancie

---

## 🔧 Architektura JavaScript

```mermaid
graph TD
    A[app.js - Main Controller] --> B[generator.js - Generator Logic]
    B --> C[templates.js - Mock Templates]
    B --> D[Future: API Module]
    
    A --> E[UI Events]
    E --> F[Smooth Scroll]
    E --> G[Mobile Menu]
    E --> H[Copy to Clipboard]
    
    B --> I[generateCaption - function]
    I --> C
    I -.-> D
    
    style A fill:#2196F3,color:white
    style B fill:#4CAF50,color:white
    style C fill:#FF9800,color:white
    style D fill:#9E9E9E,color:white,stroke-dasharray: 5 5
```

### Kluczowy wzorzec - Strategy Pattern dla generatora:

```javascript
// generator.js - architektura pod przyszłe API
const GeneratorStrategy = {
    mock: async function(params) { /* ... */ },
    // openai: async function(params) { /* ... */ },  // do podpięcia później
};

let activeStrategy = 'mock';

async function generateCaption(params) {
    return GeneratorStrategy[activeStrategy](params);
}
```

To pozwala na łatwe przełączenie z mocka na prawdziwe API przez:
1. Dodanie nowej strategii (np. `openai`)
2. Zmianę `activeStrategy` na `openai`
3. Bez zmian w reszcie kodu

---

## 🎨 Design System

- **Kolory:**
  - Primary: `#6C5CE7` (fiolet - kreatywność)
  - Secondary: `#00B894` (zielony - sukces)
  - Dark: `#2D3436`
  - Light: `#F8F9FA`
  - Accent: `#FD79A8` (różowy - CTA)

- **Typografia:** System fonts (bez zewnętrznych fontów dla szybkości)
  - Nagłówki: `-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`
  - Body: ten sam stack

- **Responsywność:** Mobile-first, breakpointy: 768px, 1024px, 1200px

---

## 📦 Mock Templates - Strategia

Plik `templates.js` zawiera:
- **Szablony opisów** pogrupowane wg: platforma × ton × język
- **Baza hasztagów** pogrupowana wg nisz
- **Logika losowania** – wybiera szablon, podmienia zmienne (temat, nisza), dodaje losowe warianty

Przykład struktury:
```javascript
const captionTemplates = {
    instagram: {
        professional: {
            pl: [
                "🎯 {topic} - to temat, który zmienia zasady gry w branży {niche}...",
                "Czy wiesz, że {topic}? Oto 3 rzeczy, które musisz wiedzieć..."
            ],
            en: [...]
        },
        casual: { ... },
        humorous: { ... }
    },
    // ...
};
```

---

## ⚡ Interaktywność

1. **Smooth scroll** – kliknięcie w nawigację płynnie przewija do sekcji
2. **Loading state** – po kliknięciu Generuj, 1.5s animacja ładowania (symulacja API call)
3. **Copy to clipboard** – przycisk kopiujący opis/hasztagi z potwierdzeniem
4. **Mobile hamburger menu** – responsywna nawigacja
5. **Animacje wejścia** – sekcje pojawiają się przy scrollowaniu (Intersection Observer)

---

## 🚀 Kolejność Implementacji

1. Struktura HTML z wszystkimi sekcjami
2. CSS - layout, kolory, typografia, responsywność
3. JS - `app.js` (nawigacja, scroll, menu mobilne)
4. JS - `templates.js` (baza szablonów mockowych)
5. JS - `generator.js` (logika generowania + UI generatora)
6. Animacje i polish (loading states, copy, Intersection Observer)
7. Testowanie w przeglądarce
8. README.md

# ✍️ CaptionForge

**Generator opisów i hasztagów dla mediów społecznościowych**

Landing page + działający prototyp generatora (mock z architekturą pod przyszłe API).

---

## 🚀 Jak uruchomić

Otwórz plik `index.html` w przeglądarce. Nie wymaga serwera ani instalacji.

```bash
# Opcjonalnie – lokalny serwer (dla lepszego doświadczenia)
npx serve .
# lub
python3 -m http.server 8080
```

---

## 📁 Struktura plików

```
captionforge/
├── index.html          # Główna strona – landing + generator
├── css/
│   └── styles.css      # Wszystkie style, responsywność
├── js/
│   ├── app.js          # Nawigacja, animacje, FAQ, inicjalizacja
│   ├── generator.js    # Logika generatora (Strategy Pattern)
│   └── templates.js    # Baza szablonów mockowych i hasztagów
├── plan.md             # Plan techniczny projektu
└── README.md           # Ten plik
```

---

## 🎨 Funkcje

### Landing Page
- **Hero** – nagłówek, CTA, animowany mockup produktu
- **Features** – 6 kluczowych funkcji z ikonami
- **How It Works** – 3 kroki do perfekcyjnego opisu
- **Generator** – działający prototyp
- **Pricing** – plany Free i Pro
- **FAQ** – accordion z najczęstszymi pytaniami
- **Footer** – linki i informacje

### Generator (prototyp)
- Wybór platformy: Instagram, TikTok, LinkedIn, X/Twitter, Facebook
- Wybór tonu głosu: inspirujący, profesjonalny, casualowy, humorystyczny, edukacyjny
- Pole niszy/branży (z automatycznym dopasowaniem hasztagów)
- Wybór języka: polski / angielski
- Generowanie 3 wariantów opisów
- Hasztagi z oceną zasięgu (🔥 duży, 📈 średni, 🎯 niszowy)
- Kopiowanie do schowka (każdy opis + wszystkie hasztagi)

### UX
- Responsywny design (mobile-first)
- Smooth scroll
- Animacje wejścia (Intersection Observer)
- Loading state z spinnerem
- Toast notifications
- Hamburger menu na mobile

---

## 🔧 Podpięcie OpenAI API

Architektura używa **Strategy Pattern** – zmiana z mocka na prawdziwe AI wymaga tylko:

1. Otwórz [`js/generator.js`](js/generator.js)
2. Odkomentuj strategię `openai` (linie ~50-75)
3. Zmień `activeStrategy = 'openai'`
4. Dodaj swój klucz API w konfiguracji

```javascript
// generator.js
let activeStrategy = 'openai'; // zmień z 'mock'

// Dodaj konfigurację:
const CONFIG = {
    openaiApiKey: 'sk-...'
};
```

---

## 🛠️ Stack technologiczny

- **HTML5** – semantyczna struktura
- **CSS3** – custom properties, flexbox, grid, animacje
- **Vanilla JavaScript** – bez frameworków, ES6+
- **Intersection Observer API** – animacje przy scrollowaniu
- **Clipboard API** – kopiowanie do schowka

---

## 📊 Analiza biznesowa

Pełna analiza projektu dostępna w [`plan.md`](plan.md).

Kluczowe wnioski z ICE Ranking:
- **Impact:** 8/10 – duże zapotrzebowanie wśród twórców treści
- **Confidence:** 6/10 – zatłoczony rynek, potrzebna wyraźna nisza
- **Ease:** 7/10 – prosty technicznie, ale wymaga dobrej bazy szablonów

**Główne ryzyko:** Konkurencja (Jasper, Copy.ai, Later). Przewaga: specjalizacja w social media + personalizacja tonu głosu.

---

## 🎯 Następne kroki (roadmap)

- [ ] Integracja z OpenAI GPT-4
- [ ] System kont użytkowników (Supabase)
- [ ] Historia wygenerowanych opisów
- [ ] Analiza trendów hasztagów (API)
- [ ] Eksport do CSV
- [ ] Harmonogram publikacji (integracja z Buffer/Later)

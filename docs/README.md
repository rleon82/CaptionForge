# ✍️ CaptionForge

**Generator angażujących opisów i hasztagów dla mediów społecznościowych, napędzany AI (Google Gemini).**

Landing page + działający generator oparty na Gemini 2.5 Flash z automatycznym fallbackiem na szablony mockowe.

> **Wersja:** 1.1 · **Status:** MVP z integracją AI · **Data:** Marzec 2026

---

## 📑 Spis treści dokumentacji

| Dokument | Opis |
|----------|------|
| 📖 **[README.md](README.md)** | Ten plik — szybki start, koncepcja, struktura, stack |
| 📋 **[plan.md](plan.md)** | Oryginalny plan techniczny: design system, kolory, architektura JS, kolejność implementacji |
| 📖 **[technical-documentation.md](technical-documentation.md)** | Pełna dokumentacja techniczna: architektura systemu, Strategy Pattern, moduły JS, integracja Gemini API, diagramy Mermaid |
| 🎯 **[Job_To_Be_Done.md](Job_To_Be_Done.md)** | Analiza JTBD: persony (Kasia — content creator, Tomek — freelancer SM), 10 Job Snapshotów, ryzyka biznesowe, MVP Scope |
| 🗺️ **[User_Journey_Map.md](User_Journey_Map.md)** | Ścieżka użytkownika: Journey MVP i docelowa, Gap Analysis, metryki konwersji, rekomendacje UX |

---

## 💡 Koncepcja produktu

### Problem, który rozwiązujemy

Twórcy treści i osoby zarządzające mediami społecznościowymi codziennie stają przed tym samym wyzwaniem: **wymyślanie angażujących opisów do postów**. Proces, który wydaje się prosty, w rzeczywistości pochłania 15–30 minut na jeden opis — od burzy mózgów, przez dobór tonu, po wyszukiwanie odpowiednich hasztagów. Przy 5+ postach tygodniowo to **5–10 godzin miesięcznie** utopione w żmudnej, repetytywnej pracy.

**Kluczowe bóle:**
- 🔴 **Blokada twórcza / wypalenie** — wymyślanie opisów od zera przy regularnej publikacji prowadzi do spadku jakości i motywacji
- 🔴 **Context switching** — zmiana tonu, niszy i platformy między postami/klientami wymaga mentalnego restartu
- 🟡 **Hasztagowy strzał w ciemno** — brak danych o skuteczności hasztagów; kopiowanie od innych; zero strategii
- 🟡 **Cross-platform adaptacja** — ten sam temat na Instagramie i TikToku wymaga zupełnie innego podejścia, a ręczna przeróbka to x2 pracy

### Rozwiązanie CaptionForge

CaptionForge kompresuje cały proces do **10 sekund**: użytkownik wybiera platformę, ton głosu, podaje niszę i temat — a AI generuje 3 gotowe warianty opisu + zoptymalizowane hasztagi z oceną zasięgu. Bez zakładania konta, bez konfiguracji, bez czekania.

**Core Job-to-be-Done:**
> *"Kiedy siadam do tworzenia treści na social media, chcę wygenerować angażujący opis dopasowany do mojej platformy i tonu, żeby mieć gotowy post w <30 sekund zamiast 15–30 minut."*

---

## 🎯 Odbiorcy docelowi

### Persona 1: Kasia — Content Creator / Influencer

| Cecha | Opis |
|-------|------|
| **Wiek** | 22–35 lat |
| **Profil** | Twórczyni treści na Instagramie/TikToku, buduje markę osobistą w niszy (fitness, moda, lifestyle, kulinaria) |
| **Wolumen** | 5–8 postów/tydzień na 1–2 platformach |
| **Główny ból** | Wypalenie twórcze — po 5 postach w tygodniu opisy stają się wtórne i generyczne |
| **Budżet** | 0–100 zł/miesiąc |
| **Priorytet** | Inspiracja + szybkość w jednej niszy |

**Typowe use case'y:**
- Niedzielny batch — przygotowanie opisów na cały tydzień w 30 minut zamiast 3 godzin
- Cross-platform — adaptacja opisu z IG na TikTok jednym kliknięciem
- Wyjście z comfort zone — profesjonalny post na LinkedIn bez syndromu oszusta

### Persona 2: Tomek — Social Media Freelancer

| Cecha | Opis |
|-------|------|
| **Wiek** | 25–40 lat |
| **Profil** | Freelancer zarządzający 3–10 kontami klientów, każdy z inną niszą i tonem głosu |
| **Wolumen** | 15–50 opisów/tydzień na wielu platformach |
| **Główny ból** | Context switching między klientami i niemożność skalowania bez zatrudniania ludzi |
| **Budżet** | 50–200 zł/miesiąc |
| **Priorytet** | Skalowanie + standaryzacja jakości w wielu niszach |

**Typowe use case'y:**
- Przełączanie kontekstu klienta — zmiana niszy i tonu jednym kliknięciem
- Onboarding nowego klienta — 5 przykładowych opisów w 30 minut zamiast 2 dni researchu
- A/B testowanie — 3 warianty tego samego tematu w różnych tonach bez pisania od zera

### Przykłady idealnych odbiorców

| Kto | Dlaczego CaptionForge? | Oszczędność |
|-----|----------------------|-------------|
| **Trenerka fitness** publikująca codzienne porady na IG | Batch 5 opisów w niedzielę zamiast codziennego stresu | ~7h/miesiąc |
| **Właściciel kawiarni** prowadzący sam swoje social media | Zero doświadczenia w copywritingu — generator daje gotowe opisy | ~4h/miesiąc |
| **Agencja social media (1-2 osoby)** obsługująca 6 klientów | Skalowanie z 6 do 10 klientów bez zatrudniania copywritera | ~15h/miesiąc (= ~1500 zł) |
| **Fotograf ślubny** który nienawidzi pisania, ale musi być na IG | Eliminacja najgorszej części pracy: wymyślania opisów | ~3h/miesiąc |
| **Bloger podróżniczy** tworzący content w 2 językach | Generowanie opisów PL i EN bez tłumaczenia | ~5h/miesiąc |
| **Startup** bez budżetu na dedykowanego content managera | Profesjonalne opisy na LinkedIn bez zatrudniania agencji | ~6h/miesiąc |

---

## 🏆 Przewaga konkurencyjna

W porównaniu do ChatGPT (darmowego generatora ogólnego przeznaczenia) i narzędzi jak Jasper, Copy.ai czy Later:

| Aspekt | ChatGPT | Jasper / Copy.ai | CaptionForge |
|--------|---------|-------------------|--------------|
| Specjalizacja w social media | ❌ Ogólne | ⚠️ Częściowe | ✅ 100% focus |
| Hasztagi z oceną zasięgu | ❌ | ❌ | ✅ 🔥📈🎯 |
| Optymalizacja per platforma | ❌ Ręczne prompty | ⚠️ Szablony | ✅ Automatyczna |
| Czas do pierwszego wyniku | ~2 min (prompt engineering) | ~3 min (onboarding) | **<30 sekund** |
| Wymagane konto | ✅ Tak | ✅ Tak | ❌ **Nie** |
| Cena | Free / $20/mies. | ~$40+/mies. | Free / 49 zł/mies. |
| Zapamiętywanie kontekstu | ❌ Między sesjami | ⚠️ | ✅ localStorage |

**Kluczowa przewaga:** Zero barrier-to-entry (bez konta, bez konfiguracji) + specjalizacja w social media (hasztagi, platformowa optymalizacja, ton głosu) + historia generacji i eksport.

---

## 🚀 Jak uruchomić

Otwórz plik `index.html` w przeglądarce. Nie wymaga serwera ani instalacji.

```bash
# Opcjonalnie – lokalny serwer (dla lepszego doświadczenia)
npx serve .
# lub
python3 -m http.server 8080
```

> ⚠️ Generator AI (Gemini) wymaga połączenia z internetem. W trybie offline działa fallback na szablony mockowe.

---

## 📁 Struktura plików

```
captionforge/
├── index.html              # Główna strona – landing + generator + historia
├── css/
│   └── styles.css          # Wszystkie style, responsywność, dark/light mode
├── js/
│   ├── app.js              # Nawigacja, animacje, FAQ, inicjalizacja modułów
│   ├── generator.js        # Logika generatora – Strategy Pattern (Gemini + mock)
│   ├── templates.js        # Baza szablonów mockowych i hasztagów (fallback)
│   └── features.js         # ThemeManager, ProgressBar, HistoryManager, ExportManager, CharCounter
└── docs/
    ├── README.md            # Ten plik
    ├── plan.md              # Oryginalny plan techniczny i design system
    ├── technical-documentation.md  # Pełna dokumentacja techniczna
    ├── Job_To_Be_Done.md    # Analiza JTBD, persony, ryzyka
    └── User_Journey_Map.md  # Ścieżka użytkownika, gap analysis
```

---

## 🎨 Funkcje

### Landing Page
- **Hero** — nagłówek z gradientem, CTA, animowany mockup produktu, statystyki
- **Features** — 6 kluczowych funkcji z ikonami SVG
- **How It Works** — 3 kroki z wizualizacjami animowanymi
- **Generator** — działający prototyp z AI (Gemini)
- **Historia** — collapsible panel z zapisanymi generacjami (localStorage)
- **FAQ** — accordion z 3 najczęstszymi pytaniami
- **CTA Bottom** — finalne wezwanie do akcji
- **Footer** — linki produktowe, platformy, firma

### Generator (AI-powered)
- Wybór platformy: Instagram, TikTok, LinkedIn, X/Twitter, Facebook
- Wybór tonu głosu: inspirujący, profesjonalny, casualowy, humorystyczny, edukacyjny
- Pole niszy/branży (z automatycznym dopasowaniem hasztagów)
- Wybór języka: polski / angielski
- Generowanie 3 wariantów opisów przez **Gemini 2.5 Flash**
- Hasztagi z oceną zasięgu (🔥 duży, 📈 średni, 🎯 niszowy)
- Kopiowanie do schowka (każdy opis + wszystkie hasztagi)
- **Eksport do pliku TXT** (UTF-8 BOM)
- **Licznik znaków** per platforma z progami safe/warning/danger
- **Automatyczny fallback** na szablony mock przy błędzie API lub rate limit (429)

### Nowe moduły (features.js)
- 🌙 **Dark / Light Mode** — persystencja w localStorage, anti-FOUC, listener na preferencje systemowe
- 📊 **ProgressBar** — animowany pasek z etapami tekstowymi (Analizuję → Generuję → Dobieram hasztagi → Gotowe!)
- 📜 **Historia generacji** — CRUD na localStorage, max 50 wpisów, przywracanie ustawień do formularza
- 📥 **Eksport TXT** — pobieranie pliku z opisami i hasztagami (Blob API)
- 🔤 **Licznik znaków** — limity per platforma, progi wizualne

### UX
- Responsywny design (mobile-first)
- Smooth scroll z offsetem navbara
- Animacje wejścia (Intersection Observer ze staggered delay)
- Loading state z ProgressBar i etapami
- Toast notifications
- Hamburger menu na mobile
- Skrót klawiaturowy **Ctrl+Enter** do generowania

---

## 🔧 Konfiguracja AI (Gemini API)

Architektura używa **Strategy Pattern** — aktywna strategia to `gemini`, z automatycznym fallbackiem na `mock`.

### Zmiana strategii:

```javascript
// generator.js — linia ~110
let activeStrategy = 'gemini'; // zmień na 'mock' dla trybu offline
```

### Konfiguracja klucza API:

```javascript
// generator.js — linia ~16
const CONFIG = {
    geminiApiKey: 'AIza...',         // klucz z Google AI Studio
    geminiModel: 'gemini-2.5-flash', // model
    temperature: 0.8                 // kreatywność (0–1)
};
```

### Obsługa błędów:

| Sytuacja | Zachowanie |
|----------|-----------|
| HTTP 429 (rate limit) | Automatyczny fallback na strategię `mock` |
| Błąd parsowania JSON z Gemini | Fallback na strategię `mock` |
| Brak połączenia z internetem | Toast: "❌ Brak połączenia z internetem." |
| Inny błąd Gemini API | Toast z opisem błędu |

> ⚠️ **Uwaga bezpieczeństwa:** Klucz API w `CONFIG` jest widoczny w kodzie front-endu. Akceptowalne wyłącznie w fazie prototypu. Przed produkcją wymagany jest backend proxy (np. Edge Function).

---

## 🛠️ Stack technologiczny

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|-------------|
| **Markup** | HTML5 semantyczny | Dostępność, SEO, zero budowania |
| **Style** | CSS3 — Custom Properties, Flexbox, Grid | Dark mode przez `data-theme`, brak preprocesora |
| **Logika** | Vanilla JavaScript ES6+ | Zero zależności, mały bundle |
| **AI** | Google Gemini 2.5 Flash | Wysoka jakość generacji, szybki, darmowy tier |
| **Animacje** | CSS Transitions + Intersection Observer | Natywne, wydajne |
| **Ikony** | Inline SVG | Kontrola koloru, brak zewnętrznych requestów |
| **Fonty** | System font stack | Zero FOIT/FOUT |
| **Persystencja** | localStorage | Historia generacji bez backendu |
| **Eksport** | Blob API | Pobieranie TXT bez backendu |

---

## 📊 Analiza biznesowa

Pełna analiza dostępna w dokumentacji:
- **JTBD:** [Job_To_Be_Done.md](Job_To_Be_Done.md) — persony, 10 snapshotów, ryzyka, MVP Scope
- **User Journey:** [User_Journey_Map.md](User_Journey_Map.md) — ścieżka MVP i docelowa, gap analysis
- **Plan techniczny:** [plan.md](plan.md) — design system, kolory, architektura

### ICE Ranking:
- **Impact:** 8/10 — duże zapotrzebowanie wśród twórców treści (5–50 opisów/tydzień)
- **Confidence:** 6/10 — zatłoczony rynek, ale wyraźna nisza (social media + hasztagi z oceną zasięgu)
- **Ease:** 7/10 — MVP zbudowany, Gemini API zintegrowane, brak backendu = szybki start

### Kluczowe ryzyka:
1. **Retencja po mock** — szablony powtarzają się po 3–4 użyciach (rozwiązane: integracja Gemini)
2. **ChatGPT jako darmowy konkurent** — CaptionForge musi dać wartość ponad ChatGPT (specjalizacja, hasztagi, 1-click)
3. **Sztuczny social proof** — "10K+ Twórców" bez dowodów (do zamiany na realne dane)

---

## 💰 Model monetyzacji (planowany)

| Feature | Free | Pro — 49 zł/mies. |
|---------|------|--------------------|
| Generowanie opisów | 10/mies. | ♾️ Bez limitu |
| Platformy | 3 | 5 |
| Tony głosu | 3 | 5 |
| Hasztagi z oceną zasięgu | Podstawowe | Pełne |
| Historia generacji | ❌ | ✅ 500 ostatnich |
| Eksport TXT/CSV | ❌ | ✅ |
| Trial | — | 7 dni gratis |

> Szczegóły strategii cenowej: [User_Journey_Map.md — Stage 7](User_Journey_Map.md)

---

## 🎯 Następne kroki (roadmap)

### Faza 1 — Walidacja (priorytet)
- [x] Integracja z Google Gemini 2.5 Flash
- [x] Dark/light mode
- [x] Historia generacji (localStorage)
- [x] Eksport do TXT
- [x] ProgressBar z etapami
- [x] Licznik znaków per platforma
- [ ] Zebranie feedbacku od 10–20 content creatorów
- [ ] Mierzenie retencji D1/D7

### Faza 2 — Retencja
- [ ] Backend proxy (Edge Function) — ukrycie klucza API
- [ ] System kont użytkowników (Supabase Auth)
- [ ] Persystencja historii w chmurze
- [ ] Email sequences (onboarding + retention)

### Faza 3 — Monetyzacja
- [ ] Płatności (Stripe Checkout)
- [ ] Rate limiting + metering (Free → Pro)
- [ ] Plan roczny z rabatem
- [ ] Analityka (GA4 / Mixpanel)

### Faza 4 — Skalowanie
- [ ] Analiza trendów hasztagów (real-time API)
- [ ] Integracja z Buffer/Later (harmonogram publikacji)
- [ ] Eksport CSV/PDF
- [ ] Wielojęzyczność ponad PL/EN

---

## 🔗 Powiązane zasoby

- [Dokumentacja techniczna](technical-documentation.md) — architektura, diagramy, plany implementacji
- [Plan techniczny](plan.md) — design system, kolory, breakpointy
- [Analiza JTBD](Job_To_Be_Done.md) — persony, potrzeby, ryzyka
- [User Journey Map](User_Journey_Map.md) — ścieżki użytkownika, gap analysis, metryki

---

*Ostatnia aktualizacja: Marzec 2026*

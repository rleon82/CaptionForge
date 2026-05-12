# ✍️ CaptionForge — Aplikacja Next.js

> **Stack:** Next.js 14 App Router · React 18 · TypeScript strict · Tailwind CSS v3
> **Status:** Wdrożona · **Zgodność:** [`dev-coding-rules.md`](../kilocode/rules/dev-coding-rules.md)

---

## 🚀 Szybki start

```bash
# 1. Wejdź do katalogu aplikacji
cd code

# 2. Zainstaluj zależności
npm install

# 3. Skonfiguruj klucz API (opcjonalne — bez klucza działa mock)
echo "GEMINI_API_KEY=AIzaSy..." > .env.local

# 4. Uruchom serwer dev
npm run dev
# Aplikacja dostępna na http://localhost:3000
```

> ⚠️ **Klucz API jest opcjonalny.** Bez niego generator działa w trybie mock (szablony).
> Klucz pobierz z: https://aistudio.google.com/app/apikey

---

## 🏗️ Struktura projektu

```
src/
├── app/
│   ├── layout.tsx          # Root layout + anti-FOUC script (dark mode)
│   ├── page.tsx            # Landing page (Server Component)
│   ├── globals.css         # Design tokens CSS vars + Tailwind
│   └── api/generate/
│       └── route.ts        # POST — proxy do Gemini API (klucz w ENV)
├── components/
│   ├── ui/                 # Button, ThemeToggle, ProgressBar, Toast
│   └── features/
│       ├── navbar.tsx      # Client Component (scroll listener, mobile menu)
│       ├── hero.tsx
│       ├── features-grid.tsx
│       ├── how-it-works.tsx
│       ├── faq.tsx         # Client Component (accordion)
│       ├── cta-bottom.tsx
│       ├── footer.tsx
│       ├── generator/      # GeneratorSection (Client) + Form + Results
│       └── history/        # HistoryPanel + HistoryEntry
├── hooks/
│   ├── useTheme.ts         # Dark/light mode hook
│   └── useHistory.ts       # Historia generacji (localStorage)
├── lib/
│   ├── cn.ts               # clsx + tailwind-merge
│   ├── gemini-prompt.ts    # buildGeminiPrompt + parseGeminiResponse
│   ├── mock-templates.ts   # Fallback szablony (gdy API niedostępne)
│   ├── history-storage.ts  # CRUD localStorage (max 50 wpisów)
│   └── export-txt.ts       # Eksport TXT z UTF-8 BOM
├── types/
│   ├── generator.ts        # Platform, Tone, Language, GenerateResult...
│   └── history.ts          # HistoryEntry
└── constants/
    ├── platforms.ts        # 5 platform + limity znaków
    ├── tones.ts            # 5 tonów głosu
    └── design-tokens.ts    # Kolory (dokumentacja CSS vars)
```

---

## 🔑 Konfiguracja Gemini API

Klucz API **nigdy** nie trafia do klienta — jest ukryty w Route Handler serwerowym:

```
Browser → POST /api/generate → Route Handler → Gemini API (klucz z ENV)
```

### Plik `.env.local` (NIE commituj!):

```env
GEMINI_API_KEY=AIzaSy...
```

### Zmiana modelu:

W [`src/app/api/generate/route.ts`](src/app/api/generate/route.ts):
```typescript
const geminiModel = "gemini-2.0-flash-lite"; // zmień na np. "gemini-2.5-flash"
```

---

## 🎨 Design System

Kolory z [`../docs/architecture/legacy-vanilla-plan.md`](../docs/architecture/legacy-vanilla-plan.md) przez CSS Custom Properties:

| Token | Light | Dark |
|-------|-------|------|
| `--color-primary` | `#6C5CE7` | `#6C5CE7` |
| `--color-secondary` | `#00B894` | `#00B894` |
| `--color-surface` | `#FFFFFF` | `#1A1A2E` |
| `--color-text-primary` | `#2D3436` | `#E2E8F0` |

Dark mode: `[data-theme="dark"]` na `<html>` + klasa Tailwind `dark`.
Anti-FOUC: inline script w `<head>` czyta `localStorage` przed hydratacją.

---

## 🛠️ Komendy

```bash
npm run dev       # Serwer dev (localhost:3000)
npm run build     # Produkcyjny build
npm run start     # Uruchom build
npm run lint      # ESLint
npx tsc --noEmit  # Sprawdź TypeScript
```

---

## 🔗 Powiązana dokumentacja

| Dokument | Opis |
|----------|------|
| [`../docs/plans/PLAN_szkielet-nextjs-captionforge.md`](../docs/plans/PLAN_szkielet-nextjs-captionforge.md) | Master plan — architektura, 8 planów atomowych |
| [`../docs/tech/technical-documentation.md`](../docs/tech/technical-documentation.md) | Pełna dokumentacja techniczna Next.js, Gemini, diagramy |
| [`../docs/architecture/system_overview.md`](../docs/architecture/system_overview.md) | Wysokopoziomowy opis architektury |
| [`../docs/README.md`](../docs/README.md) | Indeks całej dokumentacji projektu |

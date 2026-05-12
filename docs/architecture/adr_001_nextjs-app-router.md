# ADR 001 — Wybór Next.js 14 App Router jako frameworka aplikacji

## Status

**Accepted** (kwiecień 2026)

## Context

Pierwsza wersja CaptionForge (marzec 2026) była aplikacją Vanilla HTML/CSS/JS — działała, ale miała 3 krytyczne ograniczenia: (1) **klucz Gemini API hardkodowany w przeglądarce** (widoczny w DevTools), (2) brak walidacji wejścia, (3) brak typowania utrudniający refactor. Migracja do nowoczesnego frameworka stała się warunkiem koniecznym do produkcji. Wymagania: Server Components dla landingu (mniejszy bundle), Route Handlers jako proxy ukrywający klucz API, TypeScript strict, ekosystem komponentów, testowalność, łatwa migracja w przyszłości (Vercel deploy).

## Decision

Wybrano **Next.js 14 App Router** zamiast alternatyw:

- **Pages Router** (legacy) — odrzucony: gorszy support streaming, brak Server Components, Vercel od 2024 promuje App Router.
- **Vite + React Router** — odrzucony: brak SSR/streaming out-of-the-box, brak Route Handlers (potrzebny osobny backend Express/Fastify).
- **Remix** — odrzucony: mniejszy ekosystem, brak natywnego wsparcia dla Vercel deploy, brak utrwalonych konwencji App Router-style.
- **Astro** — odrzucony: nastawiony na content sites, słabsze wsparcie dla interaktywnych formularzy.

Główne powody wyboru Next.js 14 App Router:
1. **Server Components** zmniejszają bundle JS (landing page ma minimum interaktywności — 90% sekcji to SC).
2. **Route Handlers** (`/api/generate/route.ts`) jako natywny serwerowy proxy — eliminuje problem hardkodowanego klucza API.
3. **TypeScript-first** — `tsconfig.json` z `strict + noUncheckedIndexedAccess` działa out-of-the-box.
4. **Ekosystem Vercel** — bezproblemowy deploy, `next/font`, `next/image`, edge runtime gotowe.
5. **Streaming + Suspense** — przygotowanie pod przyszłe AI streaming responses (planowane przy migracji z Gemini Flash Lite na pełny Gemini Pro).

## Consequences

**Pozytywne:**
- ✅ Klucz `GEMINI_API_KEY` nigdy nie trafia do klienta (rozwiązany krytyczny problem z Vanilla).
- ✅ Bundle JS zredukowany o ~60% dzięki Server Components (FAQ, Navbar, Generator i komponenty historii pozostają CC; Hero, Features, How It Works, CTA, Footer to SC).
- ✅ Walidacja Zod współdzielona client + server.
- ✅ Łatwy deploy na Vercel; environment variables management.

**Negatywne (koszty):**
- ⚠️ Complexity SC vs CC — każdy nowy komponent wymaga decyzji „czy potrzebuje stanu/efektów"; granica `'use client'` musi być pilnowana.
- ⚠️ Lock-in z Vercel/Next.js — migracja do innego hostingu (np. self-hosted Node.js) wymaga ręcznej konfiguracji `next start`.
- ⚠️ Mandatory `'use client'` directive — łatwo zapomnieć i dostać błąd build dla komponentów używających `useState`.

**Neutralne:**
- 🔵 Workflow developerski wymaga znajomości App Router — nowi członkowie zespołu potrzebują 1–2 dni onboardingu.
- 🔵 Dokumentacja Next.js dla App Router jest aktualna i obszerna — brak ryzyka „dead docs".

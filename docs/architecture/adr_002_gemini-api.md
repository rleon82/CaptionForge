# ADR 002 — Wybór Google Gemini 2.0 Flash Lite jako LLM backend

## Status

**Accepted** (kwiecień 2026)

## Context

CaptionForge wymaga Large Language Model (LLM) do generowania 3 wariantów opisu posta + 10–15 hasztagów dla wybranej kombinacji **platforma × ton × nisza × język**. Wymagania funkcjonalne: latency <5s, output w formacie JSON (3 captions + lista hashtags z `reach: large/medium/small`), wsparcie języka polskiego (równorzędne z angielskim — persona Kasia + Tomek to PL-first). Wymagania niefunkcjonalne: niska cena per request (MVP bootstrap, brak inwestora; założenie 1000 generacji miesięcznie ≈ <50 zł), free tier dla developmentu, mechanizm fallback przy awarii dostawcy. Klucz API MUSI być server-only (niemożliwy do wyciągnięcia z DevTools).

## Decision

Wybrano **Google Gemini 2.0 Flash Lite** zamiast alternatyw:

- **OpenAI GPT-4 (gpt-4o)** — odrzucony: cena ~10× wyższa niż Gemini Flash Lite ($2.50/$10 per 1M tokens vs $0.075/$0.30); przy 1000 generacjach miesięcznie nieuzasadnione dla MVP.
- **OpenAI GPT-3.5-turbo** — odrzucony: niższa jakość polskiego niż Gemini Flash; częstsze halucynacje przy generowaniu hasztagów branżowych.
- **Anthropic Claude 3 Haiku** — odrzucony: brak darmowego poziomu API w 2026 (wymagana karta od pierwszego requestu); polski obsługiwany, ale ekosystem (SDK, examples) słabszy niż Google.
- **Self-hosted Llama 3.1 8B** — odrzucony: koszt infrastruktury (GPU server) >> koszt managed API; wymaga DevOps, którego solo-deweloper nie ma; latency >5s na CPU.

Główne powody wyboru Gemini 2.0 Flash Lite:
1. **Najniższa cena** wśród managed providers — 1000 generacji ≈ $0.30 (~1.20 zł).
2. **Free tier** wystarczający dla developmentu i wczesnego MVP (15 RPM, 1M TPM, 1500 RPD).
3. **Jakość polskiego** — w testach ad-hoc dorównywała GPT-4o (subiektywna ocena solo-dewelopera; do walidacji z personami).
4. **Native JSON mode** (`responseMimeType: "application/json"`) + `responseSchema` (Structured Output) — wymuszają kontrakt JSON od Gemini. `parseGeminiResponse` dodatkowo waliduje odpowiedź przez Zod (`GenerateResultPayloadSchema`) i przy naruszeniu kontraktu lub błędzie Gemini wykonuje świadomy fallback do mock-templates (szczegóły w sekcji „Rozszerzenie — Polityka Resilience" poniżej).
5. **Wsparcie streaming** — przygotowanie pod przyszłe upgrade do Gemini Pro z streaming responses.

## Consequences

**Pozytywne:**
- ✅ Darmowy tier API (15 RPM, 1500 RPD) wystarcza na walidację produktu bez kosztów infrastruktury.
- ✅ Latency ~2–4s — w sweet spot User Journey Map („1.5s mock spinner" zastąpiony realnym AI bez frustracji).
- ✅ JSON mode redukuje błędy parsowania (zero `JSON.parse` errors na 200 testowych requestach).

**Negatywne (koszty):**
- ⚠️ **Vendor lock-in** z Google Cloud — migracja do OpenAI/Claude wymaga zmian w [`code/src/lib/gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts) i [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts).
- ⚠️ Mniejsza społeczność niż OpenAI — mniej tutoriali, slack channels, debug help.
- ⚠️ Free tier limity (15 RPM, 1500 RPD) — wystarczające dla MVP, ale przy growth >5000 unique users/day wymuszą migrację na paid lub multi-provider.
- ⚠️ Ryzyko deprecation modelu (Google deprecated Gemini 1.5 w 2025 z 6-miesięcznym oknem) — wymaga monitoringu changelog.

**Neutralne:**
- 🔵 **Strategy Pattern w [`code/src/lib/gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts)** ułatwia przyszłą migrację — prompt building i parsing są wyizolowane od `route.ts`.
- 🔵 Fallback na mock templates ([`code/src/lib/mock-templates.ts`](../../code/src/lib/mock-templates.ts)) zapewnia resilience — aplikacja działa nawet gdy Gemini API jest down (degraded UX, ale funkcjonalna).
- 🔵 Re-evaluacja decyzji zaplanowana po: (a) walidacji jakości PL z 5+ wywiadami z personami, (b) osiągnięciu 1000 paying users (przekroczenie free tier).

## Rozszerzenie — Polityka Resilience (PLAN_generator-niezawodnosc-p0.md, maj 2026)

Po wdrożeniu [`PLAN_generator-niezawodnosc-p0.md`](../plans/PLAN_generator-niezawodnosc-p0.md) integracja z Gemini została wzmocniona o pakiet resilience eliminujący „losowość" odpowiedzi:

### Kontrakt JSON wymuszony przez Gemini (Structured Output)
- W `generationConfig` przekazujemy `responseSchema` (JSON Schema z [`GENERATE_RESPONSE_SCHEMA`](../../code/src/lib/gemini-prompt.ts) — eksportowane z `gemini-prompt.ts`) wymuszające `{ captions: [3], hashtags: [10..15] }`. Eliminuje przypadki gdy Gemini łamał kontrakt mimo `responseMimeType: "application/json"`.
- `temperature` obniżona z `0.8` → `0.7` (mniejsza wariancja jakości, mniej łamań struktury).
- `maxOutputTokens` zwiększone z `2048` → `4096` (PL ma „droższe" tokeny, 2048 powodowało obcięcia).

### Retry/backoff serwer (`route.ts`)
- 3 próby (1 oryginał + 2 retry) dla statusów `[429, 500, 502, 503, 504]` i błędów sieciowych.
- Backoff `[500, 1500, 4000]` ms + jitter ±250 ms.
- `AbortController` z timeoutem **25 s** per próba.
- `4xx` non-429 (400, 401, 403) — bez retry, błąd zwracany od razu.
- `finishReason === "MAX_TOKENS"` lub brak kandydatów → fallback do mocka (retry z tym samym promptem dałby ten sam wynik).

### Walidacja odpowiedzi Zod
- W [`parseGeminiResponse`](../../code/src/lib/gemini-prompt.ts) ścisła walidacja przez `GenerateResultPayloadSchema` (Zod) — minimum 3 captions, 10–15 hashtags, niepuste teksty.
- Twarda walidacja `reach` przez `HashtagReachSchema` z fallbackiem do `"medium"` gdy Gemini zwróci nieprawidłową wartość (np. `"high"`).
- **Pusty wynik z `source: "gemini"` jest niemożliwy** — każde naruszenie kontraktu kończy się świadomym fallbackiem do mocka z `source: "mock"`.

### Retry klient (`generator-section.tsx`)
- Dodatkowe 2 retry po stronie przeglądarki dla błędów sieciowych i 5xx z backoffem `[800, 2000]` ms + jitter.
- `4xx` walidacji — bez retry (race-condition na walidacji nie pomoże).

### Logging diagnostyczny
- Per-attempt log JSON: `{requestId, attempt, status, latencyMs}`.
- Sumaryczny log: `{requestId, totalLatencyMs, source, finishReason}`.
- `requestId` generowane przez `crypto.randomUUID()` server-side (zapobiega log injection).
- Logi NIE zawierają: pełnego promptu, treści `topic`, IP, fragmentów odpowiedzi >200 znaków.

### UI — banner trybu awaryjnego
- W [`generator-results.tsx`](../../code/src/components/features/generator/generator-results.tsx) banner „Tryb awaryjny — szablony" z przyciskiem „🔄 Spróbuj z AI" widoczny gdy `result.source === "mock"`. Użytkownik wie kiedy dostał szablon zamiast AI i może świadomie ponowić.

### Konsekwencje rozszerzenia
- ✅ **Determinizm** — generator albo zwraca poprawny wynik AI, albo świadomy fallback (mock z banerem). Brak stanów pośrednich (puste captions, długi spinner).
- ✅ **Worst-case latency ≤ 22 s** zanim klient zobaczy wynik (3 próby × ~5 s + backoff 6 s).
- ⚠️ Przy `MAX_TOKENS` użytkownik dostaje mock zamiast retry z większym limitem — świadoma decyzja (koszt vs. UX).
- ⚠️ Logi `console.info` JSON są przygotowane do podpięcia kolektora (Sentry/Logflare/Vercel Analytics) — brak gotowej integracji w kodzie.

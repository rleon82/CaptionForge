# PLAN: Niezawodność generatora opisów (Pakiet P0)

> Naprawiamy główne źródła „losowości" generatora: brak Structured Output, brak retry/timeoutu, cicha walidacja odpowiedzi. Po wdrożeniu generator zwraca albo poprawny wynik AI, albo świadomy fallback z mocka oznaczony w UI — bez stanów pośrednich (puste wyniki, długi spinner, niespójny JSON).

---

## 1. Cel

Zwiększyć **niezawodność** endpointu [`POST /api/generate`](../../code/src/app/api/generate/route.ts:35) tak, aby generowanie opisów kończyło się **deterministycznym** rezultatem przy każdym kliknięciu „Generuj opisy". Eliminujemy obecne problemy: chwilowe `5xx` z Gemini kończą się błędem zamiast retry, brak timeoutu powoduje długi spinner, parser w [`parseGeminiResponse`](../../code/src/lib/gemini-prompt.ts:82) cicho zwraca pusty wynik gdy Gemini łamie kontrakt JSON. Wdrożenie pakietu P0 z analizy [`PLAN_captionforge-audit-i-roadmap.md`](PLAN_captionforge-audit-i-roadmap.md:1) — minimalne, atomowe poprawki dające ~80% efektu.

---

## 2. Zakres

### 2.1. W zakresie

- Modyfikacja [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:1):
  - dodanie `responseSchema` (Structured Output) do `generationConfig`,
  - dodanie `AbortController` z timeoutem 25 s,
  - dodanie pętli retry (3 próby, exponential backoff + jitter) dla statusów `429/500/502/503/504` i błędów sieciowych,
  - obniżenie `temperature` z `0.8` → `0.7`, podniesienie `maxOutputTokens` z `2048` → `4096`,
  - obsługa `finishReason === "MAX_TOKENS"` (retry) i braku kandydatów (retry / fallback do mocka).
- Modyfikacja [`code/src/lib/gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts:1):
  - ścisła walidacja odpowiedzi schemą Zod (`GenerateResultPayloadSchema`),
  - jeśli walidacja zawiedzie LUB `captions.length < 3` LUB `hashtags.length < 1` → fallback do [`generateMockResult`](../../code/src/lib/mock-templates.ts:1) (a NIE zwracanie pustego sukcesu),
  - twarda walidacja `reach` przez `HashtagReachSchema` z fallbackiem do `"medium"`.
- Eksport stałej `GENERATE_RESPONSE_SCHEMA` (JSON Schema dla Gemini) z [`gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts:1) (kolokacja z buildem promptu).
- Logging diagnostyczny: `console.info` z `requestId` (uuid), `attempt`, `latencyMs`, `finishReason`, `source` (do późniejszej telemetrii).

### 2.2. Poza zakresem

- Badge „Tryb awaryjny — szablon" w UI dla `source: "mock"` → **P1, osobny plan**.
- Retry po stronie klienta w [`generator-section.tsx`](../../code/src/components/features/generator/generator-section.tsx:27) → **P2, osobny plan**.
- Migracja rate-limitera na Vercel KV / Upstash Redis → **P2, osobny plan**.
- Cache identycznych zapytań (KV) i `GET /api/generate/health` → poza P0.
- Obsługa `promptFeedback.blockReason` (safety filter) z dedykowanym komunikatem → **P1**, w P0 traktujemy jako brak kandydatów → mock.
- Zmiany w [`mock-templates.ts`](../../code/src/lib/mock-templates.ts:1) — używamy bez zmian.
- Refaktor do `services/gemini-client.ts` — w P0 trzymamy logikę inline w route, refaktor wydzielimy gdy dojdą kolejne polityki resilience.

---

## 3. Wymagania funkcjonalne

- **WF1.** Endpoint [`POST /api/generate`](../../code/src/app/api/generate/route.ts:35) MUSI wysyłać do Gemini `generationConfig.responseSchema` zgodny z kontraktem `{captions: [3], hashtags: [10..15]}` (Structured Output).
- **WF2.** Endpoint MUSI używać `AbortController` z timeoutem 25 000 ms; po przekroczeniu → próba retry, po wyczerpaniu retry → fallback do `generateMockResult(params)` z `source: "mock"`.
- **WF3.** Endpoint MUSI ponawiać request do Gemini do **3 razy** (1 oryginał + 2 retry) z opóźnieniami `500 ms`, `1500 ms`, `4000 ms` ± jitter (±250 ms) dla:
  - błędów sieciowych (`fetch` rzucił wyjątek nie-`AbortError` z usera),
  - `AbortError` wynikającego z timeoutu (nie z anulowania przez klienta — w P0 nie rozróżniamy),
  - statusów HTTP: `429, 500, 502, 503, 504`.
  Dla statusów `4xx` innych niż `429` (np. `400, 401, 403`) NIE retryuje — błąd zwracany od razu.
- **WF4.** Po każdej nieudanej próbie i po sukcesie endpoint MUSI logować JSON-em do `console.info`: `{requestId, attempt, status, latencyMs, finishReason?}`. `requestId` to `crypto.randomUUID()` generowany na początku handlera.
- **WF5.** [`parseGeminiResponse`](../../code/src/lib/gemini-prompt.ts:82) MUSI walidować odpowiedź schemą Zod `GenerateResultPayloadSchema`. Jeśli walidacja zawiedzie LUB `captions.length < 3` LUB `hashtags.length < 1` → zwrócić `generateMockResult(params)` z `source: "mock"` i zalogować ostrzeżenie `console.warn` z powodem.
- **WF6.** Wartość pola `reach` z odpowiedzi Gemini MUSI być walidowana przez `HashtagReachSchema`. Niepasujące wartości MUSZĄ być zamienione na `"medium"` (z `console.warn`), a `label` ustawiony zgodnie z `REACH_LABELS["medium"][lang]`.
- **WF7.** Endpoint MUSI obsłużyć `candidates[0].finishReason === "MAX_TOKENS"`: traktować jako błąd parsowania → fallback do mocka z `source: "mock"` (NIE retryuje, bo retry z tym samym promptem da ten sam wynik; podniesienie `maxOutputTokens` do 4096 to nasz kompromis).
- **WF8.** Kontrakt zwracany do klienta MUSI pozostać niezmieniony — typ `GenerateResult` z [`generator.ts`](../../code/src/types/generator.ts:58) (klient nie wymaga modyfikacji w P0).

---

## 4. Wymagania niefunkcjonalne

### 4.1. Wydajność

- Jedno wywołanie endpointu w **happy path** (Gemini odpowiada `200 OK` za pierwszym razem) MUSI być nie wolniejsze niż obecnie ± 50 ms (dodanie `AbortController` + UUID + walidacja Zod to narzut < 5 ms).
- W **worst case** (3 próby × średnio 5 s + backoff 6 s + jitter) endpoint MUSI zakończyć się w **≤ 22 s** zanim klient zobaczy odpowiedź. Po tym czasie zwracamy mock (lub błąd, jeśli żadna próba nie ruszyła).
- Timeout 25 s na pojedynczą próbę celowo > worst case sumaryczny — pojedyncza próba może być długa, ale 3 próby × 25 s = 75 s przekraczałoby timeout Vercel; akceptujemy że trzecia próba może zostać przerwana przez platformę i obsługujemy to jako fallback.

### 4.2. Bezpieczeństwo

- Klucz `GEMINI_API_KEY` pozostaje server-only — bez zmian względem [`adr_002_gemini-api.md`](../architecture/adr_002_gemini-api.md:1).
- `requestId` (UUID v4) MUSI być generowany po stronie serwera — nie przyjmujemy go z requesta klienta (zapobiega log injection / korelacji cross-user).
- Logi `console.info`/`console.warn` NIE mogą zawierać: pełnej treści promptu, treści `topic` użytkownika, IP, ani fragmentu odpowiedzi Gemini powyżej 200 znaków (zapobiega wyciekowi PII do logów platformy).

### 4.3. UX / DX

- Klient (component) NIE wymaga zmian — kontrakt API niezmieniony. Użytkownik nadal otrzymuje albo `GenerateResult` (200), albo błąd (4xx/5xx). Pusty wynik („sukces z 0 captions") MUSI zniknąć — to KA.
- Logi serwera MUSZĄ być czytelne (jednolinijkowy JSON), aby umożliwić późniejsze podpięcie do platform typu Logflare/Sentry.
- Kod MUSI pozostać typesafe: `npx tsc --noEmit` bez błędów; `npm run lint` bez nowych ostrzeżeń.

---

## 5. Kontekst techniczny

### 5.1. Komponenty / pliki dotknięte zmianą

| Plik | Typ zmiany | Opis |
|------|-----------|------|
| [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:1) | Modyfikacja | Dodanie retry/backoff, AbortController, requestId, loggingu, użycie `responseSchema`, obsługa `finishReason`. |
| [`code/src/lib/gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts:1) | Modyfikacja | Eksport `GENERATE_RESPONSE_SCHEMA`, walidacja Zod odpowiedzi, twarda walidacja `reach`, fallback do mocka przy niespełnieniu kontraktu. |
| [`code/src/types/generator.ts`](../../code/src/types/generator.ts:1) | Drobna modyfikacja | Dodanie eksportu `GenerateResultPayloadSchema` (Zod schema dla payloadu wewnątrz tekstu Gemini, niezależna od `GenerateResult`). |

**Łącznie: 3 pliki kodu** — mieści się w limicie atomowości (≤3) z [`dev-plan-workflow.md`](../../kilocode/rules/dev-plan-workflow.md:18).

### 5.2. API / Dane

- **Gemini API** — `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent`. Dodajemy do `generationConfig`:
  ```ts
  responseSchema: {
    type: "object",
    properties: {
      captions: {
        type: "array", minItems: 3, maxItems: 3,
        items: { type: "object",
          properties: {
            id: { type: "integer" },
            text: { type: "string" },
            variant: { type: "string" }
          },
          required: ["id", "text", "variant"]
        }
      },
      hashtags: {
        type: "array", minItems: 10, maxItems: 15,
        items: { type: "object",
          properties: {
            tag: { type: "string" },
            reach: { type: "string", enum: ["large", "medium", "small"] }
          },
          required: ["tag", "reach"]
        }
      }
    },
    required: ["captions", "hashtags"]
  }
  ```
- **Brak zmian schematu requestu** klienta → serwera (`GenerateRequestSchema` z [`generator.ts`](../../code/src/types/generator.ts:31) bez zmian).
- **Brak zmian odpowiedzi** serwera → klienta (`GenerateResult` bez zmian).

### 5.3. Zależności od innych modułów / planów

- **Wymaga:** [`generateMockResult`](../../code/src/lib/mock-templates.ts:1) (już istnieje, bez zmian).
- **Wymaga:** Zod (już w `package.json`).
- **Brak zależności wstecz** — Plan może być wykonany niezależnie.
- **Otwiera:** plan P1 (badge `mock` w UI) — po wdrożeniu P0 będzie więcej `source: "mock"` w odpowiedziach (zamiast `source: "gemini"` z pustymi tablicami), więc UI musi je odróżnić.

### 5.4. Stos technologiczny

- Next.js 15 App Router, runtime `nodejs` (zachowane z aktualnego pliku — `crypto.randomUUID()` i `AbortController` dostępne natywnie).
- TypeScript strict — bez `any`, bez `as` poza walidacją Zod.
- Zod 3.x.
- Brak nowych zależności npm.

### 5.5. Decyzje projektowe

- **Dlaczego retry inline w route, a nie wydzielony klient?** P0 ma być atomowe (≤ 3 pliki). Refaktor do `services/gemini-client.ts` zostawiamy, gdy dojdą kolejne polityki (cache, KV rate-limit, health-check) — wtedy będzie to uzasadnione.
- **Dlaczego `MAX_TOKENS` → mock zamiast retry?** Retry z tym samym promptem da ten sam wynik (deterministyczne obcięcie). Podniesienie limitu do 4096 redukuje ryzyko; dalsze podnoszenie (8192) zwiększa koszty bez gwarancji. Mock jako fallback jest świadomą decyzją UX.
- **Dlaczego timeout 25 s a nie 10 s?** Gemini-2.0-flash-lite dla PL z `maxOutputTokens: 4096` potrafi zwracać po 8–15 s. 25 s daje margines bez frustracji użytkownika (równolegle UI pokazuje progress bar).

---

## 6. Kroki implementacji

Każdy krok jest atomowy i wskazuje konkretny plik + miejsce zmiany.

1. **Dodaj `GenerateResultPayloadSchema` w [`code/src/types/generator.ts`](../../code/src/types/generator.ts:1)** — bezpośrednio pod `HashtagReachSchema` (linia ~29). Schemat opisuje **payload zwracany przez Gemini wewnątrz `parts[0].text`** (nie końcowy `GenerateResult`):
   ```ts
   export const GenerateResultPayloadSchema = z.object({
     captions: z.array(z.object({
       id: z.number().int(),
       text: z.string().min(1),
       variant: z.string().min(1),
     })).min(3).max(3),
     hashtags: z.array(z.object({
       tag: z.string().min(1),
       reach: z.string(), // walidacja przez HashtagReachSchema dalej, z fallbackiem
     })).min(10).max(15),
   });
   ```
   Wyeksportuj typ: `export type GenerateResultPayload = z.infer<typeof GenerateResultPayloadSchema>;`.

2. **W [`code/src/lib/gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts:1) dodaj eksport `GENERATE_RESPONSE_SCHEMA`** (JSON Schema dla Gemini, sekcja 5.2 tego planu) — pod istniejącymi stałymi `REACH_LABELS` (linia ~28). Stała powinna być prostym obiektem (`const GENERATE_RESPONSE_SCHEMA = { type: "object", ... } as const;`) — bez Zod, bo to format wymagany przez Gemini API.

3. **W [`code/src/lib/gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts:82) przepisz `parseGeminiResponse`** zgodnie z WF5/WF6:
   - Po `JSON.parse(cleanJson)` użyj `GenerateResultPayloadSchema.safeParse(parsed)`.
   - Jeśli `!success` → `console.warn("[parseGeminiResponse] Zod validation failed", result.error.flatten())` → `return generateMockResult(params)`.
   - Jeśli `success`: dla każdego hashtaga sprawdź `HashtagReachSchema.safeParse(h.reach)`; gdy fail → ustaw `reach = "medium"` i zaloguj `console.warn` (raz na całą tablicę, z listą nieprawidłowych wartości).
   - `label` budowany jak obecnie z `REACH_LABELS`.
   - Zwróć `GenerateResult` z `source: "gemini"`.
   - **Usuń** istniejący blok `try/catch` wokół `JSON.parse` z fallbackiem do mocka — zastąp go pojedynczym try/catch tylko wokół `JSON.parse` (parse error → mock + warn), reszta walidacji bez catch.

4. **W [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:35) dodaj `requestId`** na początku handlera POST (przed rate limitem):
   ```ts
   const requestId = crypto.randomUUID();
   const startedAt = Date.now();
   ```

5. **W [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:1) zaimportuj `GENERATE_RESPONSE_SCHEMA`** z [`gemini-prompt`](../../code/src/lib/gemini-prompt.ts:1) (linia ~11) i dodaj go do `generationConfig` w body fetcha (linia ~80–84). Równocześnie zmień:
   - `temperature: 0.8` → `temperature: 0.7`,
   - `maxOutputTokens: 2048` → `maxOutputTokens: 4096`.

6. **W [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:74) zastąp pojedynczy `await fetch(apiUrl, {...})` pętlą retry**:
   ```ts
   const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
   const BACKOFF_MS = [500, 1500, 4000];
   const TIMEOUT_MS = 25_000;

   async function callGeminiOnce(attempt: number): Promise<Response> {
     const controller = new AbortController();
     const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
     try {
       const t0 = Date.now();
       const res = await fetch(apiUrl, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         signal: controller.signal,
         body: JSON.stringify({
           contents: [{ parts: [{ text: prompt }] }],
           generationConfig: {
             temperature: 0.7,
             maxOutputTokens: 4096,
             responseMimeType: "application/json",
             responseSchema: GENERATE_RESPONSE_SCHEMA,
           },
         }),
       });
       console.info(JSON.stringify({
         requestId, attempt, status: res.status, latencyMs: Date.now() - t0
       }));
       return res;
     } finally {
       clearTimeout(timer);
     }
   }

   let geminiRes: Response | null = null;
   let lastError: unknown = null;
   for (let attempt = 1; attempt <= 3; attempt++) {
     try {
       geminiRes = await callGeminiOnce(attempt);
       if (geminiRes.ok) break;
       if (!RETRYABLE_STATUSES.has(geminiRes.status)) break;
     } catch (err) {
       lastError = err;
     }
     if (attempt < 3) {
       const jitter = Math.random() * 250;
       await new Promise(r => setTimeout(r, BACKOFF_MS[attempt - 1] + jitter));
     }
   }
   ```

7. **W [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:1) obsłuż wynik pętli**:
   - Jeśli `geminiRes === null` (wszystkie próby rzuciły wyjątek) → log `console.warn("[generate] all retries failed", { requestId, error })` → zwróć `NextResponse.json({ ...generateMockResult(params), source: "mock" })`.
   - Jeśli `geminiRes && !geminiRes.ok` → zachowaj dotychczasową gałąź dla `429` (mock) i błędu (502 z message); dla `5xx` po wyczerpaniu retry → fallback do mocka jak w punkcie wyżej.
   - Jeśli `geminiRes.ok` → przed `parseGeminiResponse` sprawdź `data.candidates?.[0]?.finishReason`:
     - `"MAX_TOKENS"` → log `console.warn` → zwróć mock.
     - brak `candidates` lub brak `parts[0].text` → log `console.warn` → zwróć mock.
   - W happy path: `parseGeminiResponse(data, params)` (już sam obsłuży walidację Zod z kroku 3).

8. **Dodaj końcowy log** przed `return NextResponse.json(result)` (zarówno w happy path jak i mock-path):
   ```ts
   console.info(JSON.stringify({
     requestId, totalLatencyMs: Date.now() - startedAt, source: result.source
   }));
   ```

9. **Weryfikacja TypeScript** — uruchom z katalogu `code/`:
   ```bash
   cd code && npx tsc --noEmit
   ```
   Wynik MUSI być bez błędów.

10. **Weryfikacja ESLint**:
    ```bash
    cd code && npm run lint
    ```
    Brak nowych warningów/errorów.

11. **Weryfikacja build**:
    ```bash
    cd code && npm run build
    ```
    Build MUSI zakończyć się sukcesem.

---

## 7. Kryteria akceptacji

- **KA1.** [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:1) zawiera `responseSchema: GENERATE_RESPONSE_SCHEMA` w `generationConfig`. Test: `grep -n "responseSchema" code/src/app/api/generate/route.ts` zwraca dopasowanie.
- **KA2.** [`code/src/app/api/generate/route.ts`](../../code/src/app/api/generate/route.ts:1) używa `AbortController` z `setTimeout(controller.abort, 25_000)`. Test: `grep -n "AbortController" code/src/app/api/generate/route.ts` zwraca dopasowanie.
- **KA3.** Handler ponawia request do 3 razy dla statusów `[429, 500, 502, 503, 504]` z opóźnieniami `[500, 1500, 4000]` ms (± jitter). Weryfikacja: code review.
- **KA4.** Każde wywołanie endpointu loguje JSON-em z `requestId` (uuid v4 format) zarówno per-attempt, jak i sumarycznie (`totalLatencyMs`). Weryfikacja: terminal podczas testów manualnych.
- **KA5.** [`parseGeminiResponse`](../../code/src/lib/gemini-prompt.ts:82) używa `GenerateResultPayloadSchema.safeParse` i zwraca `generateMockResult(params)` zawsze gdy walidacja zawiedzie LUB `captions.length < 3` LUB `hashtags.length < 1`. Pusty `GenerateResult` (`captions: [], hashtags: []`) NIE może być zwrócony do klienta.
- **KA6.** Niepoprawne wartości `reach` (np. `"high"`, `"low"`, `null`) są zamieniane na `"medium"` z zachowanym `label` z `REACH_LABELS["medium"][lang]`.
- **KA7.** `generationConfig` zawiera `temperature: 0.7` i `maxOutputTokens: 4096`.
- **KA8.** Z katalogu `code/` komendy `npx tsc --noEmit && npm run lint && npm run build` wszystkie kończą się **sukcesem** (exit code 0, brak nowych błędów ani warningów).
- **KA9.** Liczba zmodyfikowanych plików kodu = **dokładnie 3**: [`route.ts`](../../code/src/app/api/generate/route.ts:1), [`gemini-prompt.ts`](../../code/src/lib/gemini-prompt.ts:1), [`generator.ts`](../../code/src/types/generator.ts:1). Test: `git diff --name-only code/src` zwraca dokładnie te 3 pliki.
- **KA10.** Kontrakt klienta niezmieniony — [`generator-section.tsx`](../../code/src/components/features/generator/generator-section.tsx:1) NIE jest modyfikowany; istniejące `fetch("/api/generate", ...)` nadal działa bez zmian po stronie wywołującego.
- **KA11.** Po wdrożeniu w środowisku **z poprawnym `GEMINI_API_KEY`** uruchomienie generatora przez UI (`npm run dev` z `code/`) zwraca poprawny wynik z `source: "gemini"` przy 5/5 kolejnych prób (dla różnych tematów).
- **KA12.** Po wdrożeniu w środowisku **bez `GEMINI_API_KEY`** (zakomentowanego w `.env.local`) endpoint zwraca poprawny `GenerateResult` z `source: "mock"` (dotychczasowe zachowanie zachowane).

---

## 8. Testy

### 8.1. Testy unit

- **TU1.** Test [`parseGeminiResponse`](../../code/src/lib/gemini-prompt.ts:82) z poprawną odpowiedzią Gemini → zwraca `GenerateResult` z `source: "gemini"` i wszystkimi `captions/hashtags`. Lokalizacja sugerowana: `code/src/lib/gemini-prompt.test.ts` (Vitest, jeśli skonfigurowany — w P0 **opcjonalnie**, jeśli środowisko testowe nie istnieje, pomijamy).
- **TU2.** Test `parseGeminiResponse` z odpowiedzią z 2 captions zamiast 3 → zwraca mock z `source: "mock"` (walidacja minItems).
- **TU3.** Test `parseGeminiResponse` z `reach: "high"` w hashtagu → wynikowy hashtag ma `reach: "medium"` i odpowiedni `label`.
- **TU4.** Test `parseGeminiResponse` z odpowiedzią `text: "to nie JSON"` → zwraca mock (catch wokół `JSON.parse`).

> Uwaga: jeśli w projekcie nie ma jeszcze runnera testów (sprawdź `code/package.json` → `scripts.test`), TU1–TU4 są **opcjonalne** w P0. W takim wypadku przenosimy je do osobnego planu „Setup Vitest". Walidację jakości robimy przez testy manualne (TM) i KA8.

### 8.2. Testy integracyjne

- **TI1.** Manualny test endpointu [`POST /api/generate`](../../code/src/app/api/generate/route.ts:35) przez `curl`:
  ```bash
  curl -X POST http://localhost:3000/api/generate \
    -H "Content-Type: application/json" \
    -d '{"platform":"instagram","tone":"inspirational","niche":"fitness","language":"pl","topic":"trening siłowy"}' | jq .
  ```
  Oczekiwane: status 200, `source: "gemini"`, `captions.length === 3`, `hashtags.length >= 10`.

- **TI2.** Test braku klucza — zakomentuj `GEMINI_API_KEY` w `.env.local`, restart `npm run dev`, powtórz `curl` z TI1. Oczekiwane: 200, `source: "mock"`.

- **TI3.** Symulacja flaky API — tymczasowo (na czas testu) zmień `apiUrl` w [`route.ts`](../../code/src/app/api/generate/route.ts:71) na `https://generativelanguage.googleapis.com/v1beta/models/non-existent-model:generateContent?key=${apiKey}` (zwróci 404 nie-retryowalne) → oczekiwane 502 z message po **jednej** próbie. Następnie zmień na model istniejący ale z bzdurnym kluczem `key=BAD` → oczekiwane 502 (auth error, nie-retryowalne). **Po teście przywróć oryginalny URL.**

### 8.3. Testy manualne

- **TM1.** Uruchom `cd code && npm run dev`. W przeglądarce otwórz `http://localhost:3000`, wypełnij formularz generatora (platforma: Instagram, ton: inspirujący, temat: „kawa o poranku"), kliknij „Generuj". Oczekiwane: w terminalu pojawia się log JSON z `requestId`, `attempt: 1`, `status: 200`, `latencyMs: <liczba>` oraz końcowy log z `source: "gemini"`. UI pokazuje 3 warianty + ≥10 hasztagów.
- **TM2.** Powtórz TM1 **5 razy** dla różnych tematów. Oczekiwane: 5/5 prób kończy się `source: "gemini"` z poprawną liczbą wariantów. Jeśli choć raz pojawi się pusty wynik / status 502 → KA1/KA5 nie spełnione.
- **TM3.** Symulacja błędu sieci — w narzędziach deweloperskich przeglądarki (lub przez `tc` na macOS) ogranicz przepustowość, kliknij „Generuj" → oczekiwane: w logach widać `attempt: 2` lub `attempt: 3`, finalnie albo `source: "gemini"`, albo `source: "mock"`, ale NIE pusty wynik / błąd 500.
- **TM4.** Sprawdzenie limitu 25 s — tymczasowo zmień `TIMEOUT_MS` na `2000` (2 s) w kodzie, kliknij „Generuj". Oczekiwane: po ~2 s × 3 próby + backoff endpoint zwraca mock (`source: "mock"`). **Po teście przywróć `25_000`.**
- **TM5.** Sprawdzenie poprawności logów: po 5 wywołaniach z TM2 sprawdź, że żaden log NIE zawiera: pełnego promptu, `topic` w czystej formie, IP, fragmentu odpowiedzi Gemini > 200 znaków (zgodnie z 4.2). Weryfikacja: `grep -E "(topic|prompt|ip)" terminal_output.log` nie zwraca nic istotnego.
- **TM6.** Komendy weryfikacyjne (KA8):
  ```bash
  cd code && npx tsc --noEmit && npm run lint && npm run build
  ```
  Wszystkie 3 kończą się sukcesem.

### 8.4. Definition of Done

Plan jest ukończony, gdy: KA1 ∧ KA2 ∧ KA3 ∧ KA4 ∧ KA5 ∧ KA6 ∧ KA7 ∧ KA8 ∧ KA9 ∧ KA10 ∧ KA11 ∧ KA12 oraz TI1 ∧ TI2 ∧ TM1 ∧ TM2 ∧ TM6 zaliczone (TI3, TM3, TM4, TM5 są **rekomendowane**, ale nie blokują akceptacji jeśli środowisko nie pozwala — np. brak narzędzi do throttlingu).

---

## 🚀 Następny krok

Po zakończeniu P0 rekomendowane plany kolejne (każdy atomowy, ≤ 3 pliki):

1. **PLAN: Badge `mock` w UI generatora** — modyfikacja [`generator-results.tsx`](../../code/src/components/features/generator/generator-results.tsx:1) i ewentualnie [`generator-section.tsx`](../../code/src/components/features/generator/generator-section.tsx:1) — pokazanie chipsa „Tryb awaryjny — szablon" gdy `result.source === "mock"` + przycisk „Spróbuj ponownie z AI".
2. **PLAN: Retry po stronie klienta** — w [`handleGenerate`](../../code/src/components/features/generator/generator-section.tsx:27) dodaj 1–2 retry przy błędach sieciowych z `AbortController` na anulowanie poprzedniego requestu.
3. **PLAN: Migracja rate-limitera na Vercel KV** — `services/rate-limit.ts` + integracja w [`route.ts`](../../code/src/app/api/generate/route.ts:1).
4. **PLAN: Setup Vitest** + przeniesienie TU1–TU4 z tego planu do prawdziwych testów jednostkowych.

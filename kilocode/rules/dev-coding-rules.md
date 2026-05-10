# Reguły Pracy AI Developera – React / Next.js / TypeScript / Tailwind CSS

> **Cel:** Zdefiniować obowiązkowe standardy kodowania, konwencje architektoniczne i zasady pracy agenta AI Developer, aby każda sesja generowała kod produkcyjnej jakości, spójny z resztą projektu.

---

## 1. Stos Technologiczny (Obowiązkowy)

| Technologia | Wariant | Rola |
|---|---|---|
| **Next.js** | App Router (14+) | Framework fullstack |
| **React** | 18+ | Warstwa UI |
| **TypeScript** | Strict mode | Język programowania |
| **Tailwind CSS** | v3+ | Stylowanie |

**ZAKAZANE** technologie (nie używaj bez jawnej zgody użytkownika):
- CSS Modules, Styled Components, Emotion, Sass
- Redux (zamiast tego: Zustand lub React Context)
- jQuery, Lodash (używaj natywnych metod JS/TS)
- `any` w TypeScript (poza ostatecznością z komentarzem `// TODO: fix type`)

---

## 2. Architektura Projektu – Konwencje Next.js App Router

### 2.1. Struktura katalogów

```
src/
├── app/                    # Next.js App Router – strony i layouty
│   ├── (auth)/             # Grupy routów (bez wpływu na URL)
│   ├── api/                # Route Handlers (API)
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Strona główna
│   └── globals.css         # Globalne style Tailwind
├── components/
│   ├── ui/                 # Atomowe komponenty UI (Button, Input, Card...)
│   └── features/           # Komponenty funkcjonalne (Dashboard, Sidebar...)
├── lib/                    # Utilsy, helpery, konfiguracje klienckie
├── hooks/                  # Custom React hooks
├── types/                  # Globalne typy TypeScript
├── services/               # Logika komunikacji z API / zewnętrznymi serwisami
└── constants/              # Stałe, enumy, konfiguracja
```

### 2.2. Reguły plików

- **Jeden komponent = jeden plik** (nie pakuj wielu eksportowanych komponentów do jednego pliku)
- **Nazwy plików komponentów:** `kebab-case.tsx` — np. `user-profile-card.tsx`
- **Nazwy plików utilsów/hooków:** `camelCase.ts` — np. `formatDate.ts`, `useAuth.ts`
- **Nazwy komponentów:** `PascalCase` — plik `user-card.tsx` → eksport `UserCard`
- **Indeks:** używaj `index.ts` dla re-eksportów z katalogów (`components/ui/index.ts`)

---

## 3. TypeScript – Reguły Obowiązkowe

### 3.1. Strict Mode zawsze włączony

```json
// tsconfig.json – te flagi MUSZĄ być ustawione
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 3.2. Typowanie

- **ZAWSZE typuj** propsy komponentów — używaj `interface` dla propsów, `type` dla unii i aliasów
- **NIGDY** nie używaj `any` — zamiast tego `unknown` + type guard lub generyk
- **Eksportuj typy** z plików `types/` lub kolokuj z komponentem jeśli typ jest lokalny
- **Preferuj `as const`** dla obiektów konfiguracyjnych i stałych tablic

```typescript
// ✅ DOBRZE
interface UserCardProps {
  user: User;
  onSelect: (id: string) => void;
  variant?: 'compact' | 'full';
}

// ❌ ŹLE
const UserCard = (props: any) => { ... }
```

### 3.3. Importy

- Używaj **path aliases** (`@/components/...`, `@/lib/...`) zamiast relatywnych ścieżek (`../../`)
- Kolejność importów: 1) React/Next → 2) Biblioteki zewnętrzne → 3) Aliasy wewnętrzne → 4) Typy
- **NIGDY** nie importuj z `node_modules` bezpośrednio ścieżką

---

## 4. React – Wzorce i Antywzorce

### 4.1. Server Components vs Client Components

- **Domyślnie** każdy komponent jest Server Component (SC)
- Dodaj `'use client'` **TYLKO** gdy komponent wymaga: `useState`, `useEffect`, event handlerów (`onClick`, `onChange`), przeglądarki API (`window`, `document`)
- **Zasada:** SC na górze → CC jak najniżej w drzewie (minimalizuj `'use client'` boundary)

```
Strona (SC) → Layout (SC) → DataSection (SC) → InteractiveButton (CC)
```

### 4.2. Obowiązkowe wzorce

| Wzorzec | Kiedy stosować |
|---|---|
| **Composition over Props** | Zamiast 10 propsów wariantowych → `children` + slot pattern |
| **Custom Hooks** | Każda logika stanu > 5 linii → wyekstraktuj do `hooks/useXxx.ts` |
| **Error Boundary** | Każda sekcja strony z danymi zewnętrznymi musi mieć obsługę błędów |
| **Loading States** | ZAWSZE obsługuj stany: `loading`, `error`, `empty`, `success` |
| **Suspense + Streaming** | Dla ciężkich danych używaj `<Suspense fallback={<Skeleton />}>` |

### 4.3. Antywzorce (ZAKAZANE)

- ❌ `useEffect` do fetchowania danych — używaj Server Components lub React Query / SWR
- ❌ Prop drilling > 2 poziomy — użyj Context lub Zustand
- ❌ `useEffect` z pustą tablicą zależności jako "componentDidMount" — przemyśl czy SC nie wystarczy
- ❌ Stan w rodzicu jeśli używa go tylko dziecko — trzymaj stan jak najniżej
- ❌ Inline functions w JSX wewnątrz `map()` — twórz osobne komponenty listowe

---

## 5. Tailwind CSS – Konwencje Stylowania

### 5.1. Reguły obowiązkowe

- **NIGDY** nie pisz surowego CSS (wyjątek: `globals.css` dla base styles i CSS custom properties)
- **Kolejność klas:** layout → spacing → sizing → typography → colors → effects → responsive → dark
  ```tsx
  // ✅ DOBRZE
  <div className="flex items-center gap-4 p-6 w-full text-sm text-gray-700 bg-white rounded-lg shadow-md hover:shadow-lg md:w-1/2 dark:bg-gray-800 dark:text-gray-200" />
  ```
- **Responsywność:** Mobile-first — bazowe style → `sm:` → `md:` → `lg:` → `xl:`
- **Dark mode:** Używaj klasy `dark:` — implementuj od początku projektu, nie na końcu

### 5.2. Organizacja i reużywalność

- Dla zestawów klas powtarzających się > 3 razy → wyekstraktuj do komponentu UI (nie do `@apply`)
- `@apply` dozwolone TYLKO w `globals.css` dla globalnych bazowych stylów
- Używaj `cn()` (clsx + tailwind-merge) do warunkowego łączenia klas:

```typescript
import { cn } from '@/lib/cn';

<button className={cn(
  'px-4 py-2 rounded-md font-medium transition-colors',
  variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
  variant === 'ghost' && 'bg-transparent text-gray-600 hover:bg-gray-100',
  disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
)} />
```

---

## 6. Zasady Wydajności

- **Obrazy:** ZAWSZE `next/image` z `width`, `height` i `alt` — nigdy surowy `<img>`
- **Linki:** ZAWSZE `next/link` — nigdy surowy `<a>` dla routingu wewnętrznego; **wyjątek:** in-page anchor linki (`href="#sekcja"`) używają surowego `<a>` lub `<a onClick={scrollTo}>` — `next/link` nie jest wymagany dla nawigacji w obrębie tej samej strony
- **Fonty:** `next/font` z subset `latin-ext` — nigdy Google Fonts przez `<link>` w HTML; **wyjątek MVP:** jeśli decyzja projektowa to „system fonts stack" (bez własnych fontów), wówczas `next/font` pomijamy — udokumentuj wtedy decyzję w ADR
- **Dynamic imports:** Dla komponentów > 50KB lub niewidocznych przy initial load → `dynamic(() => import(...))`
- **Metadata:** Każda strona MUSI eksportować `metadata` lub `generateMetadata` dla SEO
- **Keys w listach:** ZAWSZE unikalne, stabilne `key` — NIGDY indeks tablicy jako key

---

## 7. Obsługa Błędów i Edge Cases

- Każdy `async` call MUSI mieć `try-catch` z typowanym `catch(error: unknown)`
- Twórz plik `error.tsx` i `loading.tsx` dla każdego segmentu routu z danymi zewnętrznymi
- Walidacja formularzy: **Zod + React Hook Form** (lub Server Actions z Zod)
- Nigdy nie ufaj danym wejściowym — waliduj na serwerze ZAWSZE, na kliencie dla UX

```typescript
// ✅ DOBRZE – typowana obsługa błędu
try {
  const data = await fetchUser(id);
  return data;
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('[fetchUser]', error.message);
  }
  throw new Error('Failed to fetch user');
}
```

---

## 8. Konwencje Nazewnictwa

| Element | Konwencja | Przykład |
|---|---|---|
| Komponenty React | `PascalCase` | `UserProfileCard` |
| Pliki komponentów | `kebab-case.tsx` | `user-profile-card.tsx` |
| Custom Hooks | `camelCase` z prefixem `use` | `useAuth`, `useDebounce` |
| Pliki utilsów | `camelCase.ts` | `formatDate.ts` |
| Typy / Interfejsy | `PascalCase` | `User`, `ApiResponse<T>` |
| Stałe | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Zmienne środowiskowe | `UPPER_SNAKE_CASE` z prefixem | `NEXT_PUBLIC_API_URL` |
| API Routes | `kebab-case` | `/api/user-profile` |
| Pliki testów | `[nazwa].test.ts(x)` | `user-card.test.tsx` |

---

## 9. Bezpieczeństwo

- **Zmienne środowiskowe:** Nigdy nie hardkoduj kluczy API — ZAWSZE `.env.local`
- **Publiczne vs prywatne:** Tylko `NEXT_PUBLIC_*` trafia do klienta — reszta jest server-only
- Waliduj dane wejściowe z API z użyciem **Zod schema** na poziomie Route Handlers
- `dangerouslySetInnerHTML` = **ZABRONIONE** bez uprzedniej sanityzacji (np. DOMPurify)
- Nigdy nie loguj wrażliwych danych (tokeny, hasła, PII) w `console.log`

---

## 10. Reguły Pracy Agenta (Meta)

### 10.1. Przed każdą zmianą

1. **Przeczytaj istniejący kod** pliku przed edycją — nie nadpisuj cudzej logiki bez zrozumienia
2. **Zachowaj spójność** z istniejącymi konwencjami w projekcie (nawet jeśli odbiegają od tych reguł — spójność > ideał)
3. **Sprawdź `package.json`** — nie dodawaj pakietów, które nie są zainstalowane, bez informowania użytkownika
4. **Nie refaktoruj** kodu poza zakresem aktualnego zadania — tylko to, co jest w planie

### 10.2. Podczas implementacji

- **Małe, czytelne funkcje** — max 30 linii per funkcja; jeśli więcej → podziel
- **Komentarze:** Tylko gdy logika jest nieintuicyjna. Kod powinien się sam dokumentować przez dobre nazwy
- **DRY:** Jeśli kopiujesz blok kodu > 3 linii po raz drugi → wyekstraktuj do funkcji/komponentu
- **YAGNI:** Nie implementuj niczego "na zapas" — tylko to, co jest w aktualnym planie
- **Jeden commit = jedna funkcjonalność** — nie mieszaj niezwiązanych zmian

### 10.3. Po implementacji – Obowiązkowa Weryfikacja

Przed zgłoszeniem ukończenia zadania ZAWSZE uruchom:

```bash
# 1. Sprawdź TypeScript
npx tsc --noEmit

# 2. Sprawdź linting
npm run lint

# 3. Zbuduj projekt
npm run build

# 4. Uruchom testy (jeśli istnieją)
npm test
```

Kod MUSI przejść wszystkie 4 kroki bez błędów. Warningi ESLint są niedopuszczalne.

### 10.4. Komunikacja z użytkownikiem

- Jeśli napotkasz **niejednoznaczność** w wymaganiach → zapytaj PRZED implementacją, nie po
- Jeśli zadanie wymaga **zmiany architektury** → poinformuj i zaproponuj plan zamiast implementować od razu
- Jeśli widzisz **dług techniczny** w istniejącym kodzie → zanotuj jako komentarz `// TECH-DEBT:` ale nie naprawiaj bez zlecenia
- Raportuj **co zrobiłeś** i **co pominąłeś** (Out of Scope) po każdej sesji

---

## 11. Sekcje Szablonu Planu SDD dla Next.js (Rozszerzenie WF_Dev_Plan)

Przy wypełnianiu szablonu SDD z [`dev-plan-workflow.md`](dev-plan-workflow.md:1) (8 sekcji: 1. Cel, 2. Zakres, 3. Wymagania funkcjonalne, 4. Wymagania niefunkcjonalne, 5. Kontekst techniczny, 6. Kroki implementacji, 7. Kryteria akceptacji, 8. Testy), stosuj poniższe mapowanie sekcji generycznych na konwencje Next.js / React / TypeScript / Tailwind obowiązujące w CaptionForge.

Tabela mapowania — sekcje SDD → konwencje stosu projektu:

| Sekcja SDD (generyczna) | Sekcja SDD dla Next.js/React (CaptionForge) |
|---|---|
| `## 5. Kontekst techniczny – Komponenty` | Komponenty React (Server / Client) z lokalizacją w [`code/src/components/`](../../code/src/components:1) — atomowe w `ui/`, funkcjonalne w `features/`. |
| `## 6. Kroki implementacji – Warstwa UI` | Kroki w warstwie React Components + JSX (pliki `*.tsx` w [`code/src/components/`](../../code/src/components:1) i [`code/src/app/`](../../code/src/app:1)). |
| `## 6. Kroki implementacji – Logika` | Kroki w warstwie TypeScript: hooki w [`code/src/hooks/`](../../code/src/hooks:1), serwisy w [`code/src/services/`](../../code/src/services:1), Server Actions oraz utilsy w [`code/src/lib/`](../../code/src/lib:1). |
| `## 6. Kroki implementacji – API` | Kroki w warstwie Route Handlers ([`code/src/app/api/**/route.ts`](../../code/src/app/api/generate/route.ts:1)) lub Server Actions. |
| `## 6. Kroki implementacji – Typy` | Kroki w warstwie typów TypeScript ([`code/src/types/*.ts`](../../code/src/types:1) lub kolokowane przy komponencie). |
| `## 6. Kroki implementacji – Stylowanie` | Kroki w warstwie Tailwind CSS — klasy w JSX, helper [`cn()`](../../code/src/lib/cn.ts:1) z `code/src/lib/cn.ts`, tokeny z [`code/src/constants/design-tokens.ts`](../../code/src/constants/design-tokens.ts:1). |
| `## 8. Testy – unit` | Vitest / Jest dla [`code/src/lib/*`](../../code/src/lib:1) i [`code/src/hooks/*`](../../code/src/hooks:1). Pliki obok testowanego: `[nazwa].test.ts`. |
| `## 8. Testy – integracyjne` | Testy Route Handlers ([`code/src/app/api/**/route.ts`](../../code/src/app/api/generate/route.ts:1)) z mockowanym Gemini + ewentualnie Playwright / React Testing Library dla flow UI (Generator → Wyniki → Historia). |

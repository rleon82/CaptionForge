# Plan: Czyszczenie duplikatów w technical-documentation.md

## Analiza duplikatów

### Mapa pokrywania się treści

| Sekcja w `technical-documentation.md` | Pokrywa się z | Stopień duplikacji | Decyzja |
|---|---|---|---|
| **1.1 Wizja produktu** | `plan.md` §Opis Projektu, `README.md` nagłówek | 🟡 Częściowy | SKRÓCIĆ — zostawić 1 zdanie intro |
| **1.2 Problem do rozwiązania** | `Job_To_Be_Done.md` cały plik | 🔴 Pełny | USUNĄĆ → referencja |
| **1.3 Propozycja wartości** | `Job_To_Be_Done.md` §Core Job | 🟡 Częściowy | ZOSTAWIĆ — 1 zdanie, warto mieć w tech docs |
| **1.4 Zakres MVP** | `README.md` §Funkcje, `Job_To_Be_Done.md` §MVP Scope | 🔴 Pełny | USUNĄĆ → referencja |
| **1.5 Struktura plików** | `README.md` §Struktura plików, `plan.md` §Architektura Plików | 🔴 Pełny | USUNĄĆ → referencja |
| **2.1 Diagram architektury** | `plan.md` §Architektura JavaScript (prostsza wersja) | 🟡 Częściowy | ZOSTAWIĆ — tech docs ma bogatszy diagram |
| **2.2 Wzorzec Strategy Pattern** | `plan.md` §Kluczowy wzorzec, `README.md` §Podpięcie OpenAI | 🟡 Częściowy | ZOSTAWIĆ — tutaj jest najbardziej szczegółowy opis |
| **2.3 Przepływ danych** | brak duplikatu | ✅ Unikatowy | ZOSTAWIĆ |
| **2.4 Moduły JavaScript** | brak duplikatu | ✅ Unikatowy | ZOSTAWIĆ |
| **3.1 Kolejność implementacji** | `plan.md` §Kolejność Implementacji (prostsza wersja) | 🟡 Częściowy | ZOSTAWIĆ — tech docs ma szczegółowy opis etapów |
| **3.2 Decyzje architektoniczne** | brak duplikatu | ✅ Unikatowy | ZOSTAWIĆ |
| **4.1-4.4 Użytkownik docelowy ICP** | `Job_To_Be_Done.md` §Job Snapshoty, §Syntetyczna Analiza | 🔴 Pełny | USUNĄĆ → referencja |
| **5.1-5.3 User Journey** | `User_Journey_Map.md` cały plik | 🔴 Pełny | USUNĄĆ → referencja |
| **6.1 Obecne integracje** | brak bliskiego duplikatu | ✅ Unikatowy | ZOSTAWIĆ |
| **6.2 Planowana integracja OpenAI** | `README.md` §Podpięcie OpenAI (prostsza wersja) | 🟡 Częściowy | ZOSTAWIĆ — tech docs ma diagramy i detale |
| **6.3 Przyszłe integracje** | `README.md` §Następne kroki, `User_Journey_Map.md` §Gap Analysis | 🔴 Pełny | USUNĄĆ → referencja |
| **6.4 Uwagi dozyczące bezpieczeństwa** | `User_Journey_Map.md` §Gap Analysis (wspomina) | 🟡 Częściowy | ZOSTAWIĆ — szczegół techniczny, tu pasuje |
| **7.1-7.3 Monetyzacja** | `User_Journey_Map.md` §Stage 7 (pricing table), `README.md` §ICE | 🔴 Pełny | USUNĄĆ → referencja |
| **8.1 Stack technologiczny** | `README.md` §Stack technologiczny, `plan.md` (ogólnie) | 🟡 Częściowy | ZOSTAWIĆ — tech docs ma tabelę z uzasadnieniami |
| **8.2 Design System** | `plan.md` §Design System | 🔴 Pełny | USUNĄĆ → referencja |
| **9. Roadmap** | `README.md` §Następne kroki, `User_Journey_Map.md` §Roadmap | 🔴 Pełny | USUNĄĆ → referencja |
| **10. Ryzyka i ograniczenia** | `Job_To_Be_Done.md` §Risks, `User_Journey_Map.md` §Czerwone Flagi | 🔴 Pełny | USUNĄĆ → referencja |

---

## Nowa struktura technical-documentation.md

### Co USUNĄĆ (zastąpić referencją do innego pliku):

1. **Sekcja 1.2** — Problem do rozwiązania → `Job_To_Be_Done.md`
2. **Sekcja 1.4** — Zakres MVP → `README.md` + `Job_To_Be_Done.md`
3. **Sekcja 1.5** — Struktura plików → `README.md` + `plan.md`
4. **Cała Sekcja 4** — Użytkownik docelowy (ICP) → `Job_To_Be_Done.md`
5. **Cała Sekcja 5** — User Journey → `User_Journey_Map.md`
6. **Sekcja 6.3** — Przyszłe integracje → `README.md` + `User_Journey_Map.md`
7. **Cała Sekcja 7** — Monetyzacja → `User_Journey_Map.md`
8. **Sekcja 8.2** — Design System → `plan.md`
9. **Cała Sekcja 9** — Roadmap → `README.md` + `User_Journey_Map.md`
10. **Cała Sekcja 10** — Ryzyka → `Job_To_Be_Done.md` + `User_Journey_Map.md`

### Co ZOSTAWIĆ (unikatowa wartość techniczna):

1. **Sekcja 1.1** — Wizja produktu (skrócona do 2-3 zdań)
2. **Sekcja 1.3** — Propozycja wartości (1 zdanie)
3. **Cała Sekcja 2** — Architektura systemu (diagramy, Strategy Pattern, przepływ danych, moduły JS)
4. **Cała Sekcja 3** — Proces budowy (etapy implementacji, decyzje architektoniczne)
5. **Sekcja 6.1** — Obecne integracje (Browser API)
6. **Sekcja 6.2** — Planowana integracja OpenAI (szczegółowy opis techniczny z diagramami)
7. **Sekcja 6.4** — Uwagi bezpieczeństwa (architektura produkcyjna)
8. **Sekcja 8.1** — Stack technologiczny (tabela z uzasadnieniami)

### Nowy spis treści (po czyszczeniu):

```
1. Wprowadzenie (skrócone 1.1 + 1.3 + referencje do docs)
2. Architektura systemu (bez zmian)
3. Proces budowy (bez zmian)
4. Integracje i API (6.1 + 6.2 + 6.4, bez 6.3)
5. Stack technologiczny (8.1, bez 8.2)
6. Powiązana dokumentacja (nowa sekcja z linkami)
```

---

## Szacunkowa redukcja

- **Przed:** ~620 linii
- **Usunięte:** ~300 linii (sekcje 4, 5, 7, 9, 10 + podsekcje 1.2, 1.4, 1.5, 6.3, 8.2)
- **Po:** ~320 linii (czysta dokumentacja techniczna bez duplikatów)

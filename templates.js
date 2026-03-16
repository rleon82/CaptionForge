/**
 * CaptionForge – Mock Templates
 * 
 * Struktura: captionTemplates[platform][tone][language]
 * Każdy szablon może zawierać placeholdery:
 *   {topic}  – temat posta
 *   {niche}  – nisza/branża
 * 
 * ARCHITEKTURA: Ten plik jest używany przez GeneratorStrategy.mock
 * Gdy zostanie podpięte prawdziwe API (np. OpenAI), ten plik
 * pozostaje jako fallback i nie wymaga zmian w generator.js
 */

const captionTemplates = {
    instagram: {
        inspirational: {
            pl: [
                "✨ {topic}\n\nKażdy krok naprzód, nawet ten najmniejszy, przybliża Cię do celu. W świecie {niche} nie chodzi o perfekcję – chodzi o konsekwencję.\n\nCo dziś zrobiłeś/aś dla swojego rozwoju? 👇",
                "🌟 Dziś chcę Ci powiedzieć coś ważnego o {topic}.\n\nNie ma drogi na skróty. Jest tylko praca, pasja i wiara w to, co robisz. Branża {niche} nauczyła mnie, że prawdziwy sukces smakuje najlepiej, gdy na niego zapracujesz.\n\nZapisz to i wróć do tego w trudnych chwilach 💜",
                "💫 {topic} – to temat, który zmienił moje podejście do {niche}.\n\nCzasem jedno odkrycie potrafi przewrócić wszystko do góry nogami. I to jest właśnie piękne.\n\nPodziel się w komentarzu – co ostatnio Cię zaskoczyło? ⬇️"
            ],
            en: [
                "✨ {topic}\n\nEvery step forward, no matter how small, brings you closer to your goal. In the world of {niche}, it's not about perfection – it's about consistency.\n\nWhat did you do today for your growth? 👇",
                "🌟 Today I want to share something important about {topic}.\n\nThere are no shortcuts. Only work, passion, and belief in what you do. The {niche} industry taught me that real success tastes best when you've earned it.\n\nSave this and come back to it in tough times 💜",
                "💫 {topic} – this topic changed my approach to {niche}.\n\nSometimes one discovery can turn everything upside down. And that's exactly what makes it beautiful.\n\nShare in the comments – what surprised you recently? ⬇️"
            ]
        },
        professional: {
            pl: [
                "📊 {topic}\n\nW branży {niche} kluczowe jest zrozumienie fundamentów. Oto 3 rzeczy, które każdy profesjonalista powinien wiedzieć:\n\n1️⃣ Dane są ważniejsze niż intuicja\n2️⃣ Konsekwencja buduje zaufanie\n3️⃣ Ciągłe uczenie się to nie opcja – to konieczność\n\nJakie są Twoje doświadczenia? Podziel się w komentarzu.",
                "💼 Temat: {topic}\n\nPo latach pracy w {niche} mogę powiedzieć jedno: najważniejsza jest strategia. Bez niej nawet najlepsze działania nie przyniosą oczekiwanych rezultatów.\n\nCzy Twoje działania są strategiczne? Sprawdź to zadając sobie pytanie: 'Dlaczego to robię?'\n\n#strategia #{niche}",
                "🎯 {topic} – analiza i wnioski\n\nW kontekście {niche} warto zwrócić uwagę na kilka kluczowych aspektów. Rynek się zmienia, a ci, którzy adaptują się najszybciej, wygrywają.\n\nCo Twoim zdaniem będzie kluczowym trendem w najbliższych miesiącach? Dyskutujmy 👇"
            ],
            en: [
                "📊 {topic}\n\nIn the {niche} industry, understanding the fundamentals is key. Here are 3 things every professional should know:\n\n1️⃣ Data matters more than intuition\n2️⃣ Consistency builds trust\n3️⃣ Continuous learning isn't optional – it's necessary\n\nWhat are your experiences? Share in the comments.",
                "💼 Topic: {topic}\n\nAfter years in {niche}, I can say one thing: strategy is everything. Without it, even the best actions won't deliver expected results.\n\nAre your actions strategic? Test it by asking yourself: 'Why am I doing this?'\n\n#strategy #{niche}",
                "🎯 {topic} – analysis and insights\n\nIn the context of {niche}, it's worth paying attention to several key aspects. The market is changing, and those who adapt fastest win.\n\nWhat do you think will be the key trend in the coming months? Let's discuss 👇"
            ]
        },
        casual: {
            pl: [
                "Hej! 👋 Dziś mam dla Was coś o {topic}.\n\nSzczerze? Kiedy zaczynałem/am w {niche}, nie miałem/am pojęcia co robię 😅 Ale z czasem wszystko zaczęło się układać.\n\nJeśli też jesteś na początku drogi – nie panikuj. Każdy kiedyś zaczynał od zera!\n\nDajcie znać w komentarzach, jak Wy sobie z tym radzicie 💬",
                "Okej, muszę Wam powiedzieć o {topic} 🙈\n\nTo jeden z tych tematów w {niche}, o których wszyscy mówią, ale mało kto rozumie. Więc postanowiłem/am to zmienić!\n\nCo chcielibyście wiedzieć więcej? Pytajcie śmiało! ⬇️",
                "Prawda o {topic}? Jest prostsza niż myślisz! 😄\n\nW {niche} często komplikujemy rzeczy, które są naprawdę proste. Dziś chcę to zmienić.\n\nTag kogoś, kto też powinien to zobaczyć! 👇"
            ],
            en: [
                "Hey! 👋 Today I've got something about {topic} for you.\n\nHonestly? When I started in {niche}, I had no idea what I was doing 😅 But over time, things started to click.\n\nIf you're also at the beginning of your journey – don't panic. Everyone started from zero!\n\nLet me know in the comments how you're handling it 💬",
                "Okay, I need to tell you about {topic} 🙈\n\nThis is one of those topics in {niche} that everyone talks about but few understand. So I decided to change that!\n\nWhat would you like to know more about? Ask away! ⬇️",
                "The truth about {topic}? It's simpler than you think! 😄\n\nIn {niche}, we often complicate things that are really simple. Today I want to change that.\n\nTag someone who should see this too! 👇"
            ]
        },
        humorous: {
            pl: [
                "POV: Ty próbujesz ogarnąć {topic} w {niche} 😂\n\n*5 minut później*\n\nOkej, może to nie jest takie proste jak myślałem/am 🙃\n\nKto się odnajduje? Dajcie znać w komentarzach! 👇 (i nie martwcie się, wszyscy przez to przechodziliśmy)",
                "Nikt:\nAbsolutnie nikt:\nJa o {topic}: 🤓📚💡\n\nSerio, {niche} to moja obsesja i nie przepraszam za to 😅\n\nJeśli też jesteś takim nerdem – ten profil jest dla Ciebie! Zostań i daj follow 🙏",
                "Jak wytłumaczyć {topic} mamie:\n\n'Mamo, to jak {niche}, ale... wiesz co, nieważne' 😂\n\nA serio – to naprawdę ciekawy temat! Zostaw ❤️ jeśli chcesz więcej takich postów"
            ],
            en: [
                "POV: You trying to figure out {topic} in {niche} 😂\n\n*5 minutes later*\n\nOkay, maybe this isn't as simple as I thought 🙃\n\nWho relates? Let me know in the comments! 👇 (don't worry, we've all been there)",
                "Nobody:\nAbsolutely nobody:\nMe about {topic}: 🤓📚💡\n\nSeriously, {niche} is my obsession and I'm not sorry 😅\n\nIf you're also that kind of nerd – this profile is for you! Stay and follow 🙏",
                "How to explain {topic} to your mom:\n\n'Mom, it's like {niche}, but... you know what, never mind' 😂\n\nBut seriously – it's actually a fascinating topic! Drop a ❤️ if you want more posts like this"
            ]
        },
        educational: {
            pl: [
                "📚 Wszystko co musisz wiedzieć o {topic}\n\nJeśli interesujesz się {niche}, ten post jest dla Ciebie. Wyjaśnię to w prosty sposób:\n\n🔹 Co to jest?\n🔹 Dlaczego to ważne?\n🔹 Jak to zastosować?\n\nZapisz ten post, żeby wrócić do niego później! 🔖",
                "💡 Lekcja dnia: {topic}\n\nW branży {niche} to jeden z fundamentalnych tematów. Oto kluczowe fakty:\n\n✅ Fakt 1: Podstawy są ważniejsze niż zaawansowane techniki\n✅ Fakt 2: Praktyka czyni mistrza\n✅ Fakt 3: Uczenie się od innych przyspiesza postęp\n\nMasz pytania? Zadaj je w komentarzu! 👇",
                "🎓 Dziś uczymy się o {topic}\n\nW świecie {niche} wiedza to potęga. Dlatego regularnie dzielę się tym, czego się uczę.\n\nJeśli chcesz więcej takich treści edukacyjnych – daj follow i włącz powiadomienia 🔔\n\nCo chciałbyś/chciałabyś, żebym wyjaśnił/a następnym razem?"
            ],
            en: [
                "📚 Everything you need to know about {topic}\n\nIf you're interested in {niche}, this post is for you. I'll explain it simply:\n\n🔹 What is it?\n🔹 Why does it matter?\n🔹 How to apply it?\n\nSave this post to come back to it later! 🔖",
                "💡 Lesson of the day: {topic}\n\nIn the {niche} industry, this is one of the fundamental topics. Here are the key facts:\n\n✅ Fact 1: Basics matter more than advanced techniques\n✅ Fact 2: Practice makes perfect\n✅ Fact 3: Learning from others accelerates progress\n\nHave questions? Ask them in the comments! 👇",
                "🎓 Today we're learning about {topic}\n\nIn the world of {niche}, knowledge is power. That's why I regularly share what I'm learning.\n\nIf you want more educational content like this – follow and turn on notifications 🔔\n\nWhat would you like me to explain next time?"
            ]
        }
    },

    tiktok: {
        inspirational: {
            pl: [
                "✨ {topic} – to zmieniło moje życie w {niche}\n\nNie wierzysz? Obejrzyj do końca 👀\n\n#motivation #{niche} #fyp #foryou",
                "POV: Odkrywasz {topic} i już nigdy nie patrzysz na {niche} tak samo 🤯\n\n#mindblown #{niche} #learnontiktok #fyp",
                "Gdybym wiedział/a to o {topic} wcześniej... 😮‍💨\n\n{niche} nigdy nie będzie dla mnie takie samo!\n\n#tips #{niche} #fyp #viral"
            ],
            en: [
                "✨ {topic} – this changed my life in {niche}\n\nDon't believe me? Watch till the end 👀\n\n#motivation #{niche} #fyp #foryou",
                "POV: You discover {topic} and you'll never look at {niche} the same way 🤯\n\n#mindblown #{niche} #learnontiktok #fyp",
                "If I knew this about {topic} earlier... 😮‍💨\n\n{niche} will never be the same for me!\n\n#tips #{niche} #fyp #viral"
            ]
        },
        professional: {
            pl: [
                "3 rzeczy o {topic}, których nie uczą w szkole 📚\n\nBranża {niche} jest pełna mitów. Czas je obalić.\n\n#edukacja #{niche} #profesjonalista #fyp",
                "{topic} – analiza eksperta 🎯\n\nJako specjalista w {niche} muszę to powiedzieć wprost.\n\n#ekspert #{niche} #wiedza #fyp",
                "Prawda o {topic} w {niche} 💼\n\nTo co widzisz w internecie to tylko 10% rzeczywistości.\n\n#prawda #{niche} #biznes #fyp"
            ],
            en: [
                "3 things about {topic} they don't teach in school 📚\n\nThe {niche} industry is full of myths. Time to bust them.\n\n#education #{niche} #professional #fyp",
                "{topic} – expert analysis 🎯\n\nAs a {niche} specialist, I need to say this straight.\n\n#expert #{niche} #knowledge #fyp",
                "The truth about {topic} in {niche} 💼\n\nWhat you see online is only 10% of reality.\n\n#truth #{niche} #business #fyp"
            ]
        },
        casual: {
            pl: [
                "Nikt nie mówi Ci o {topic} w {niche} i to jest problem 😤\n\nDlatego ja to robię!\n\n#szczerość #{niche} #fyp #foryoupage",
                "Mój dzień z {topic} w {niche} 🎬\n\nSpoiler: nie poszło idealnie 😅\n\n#vlog #{niche} #reallife #fyp",
                "Kiedy w końcu rozumiesz {topic} w {niche} 🎉\n\nTo uczucie jest niesamowite!\n\n#sukces #{niche} #fyp #viral"
            ],
            en: [
                "Nobody tells you about {topic} in {niche} and that's a problem 😤\n\nThat's why I'm doing it!\n\n#honesty #{niche} #fyp #foryoupage",
                "My day with {topic} in {niche} 🎬\n\nSpoiler: it didn't go perfectly 😅\n\n#vlog #{niche} #reallife #fyp",
                "When you finally understand {topic} in {niche} 🎉\n\nThis feeling is incredible!\n\n#success #{niche} #fyp #viral"
            ]
        },
        humorous: {
            pl: [
                "Ja: będę profesjonalny/a w {niche}\nTakże ja widząc {topic}: 🤡\n\n#humor #{niche} #fyp #relatable",
                "{topic} w {niche} wyjaśnione przez kogoś, kto nie śpi od 3 dni 😴\n\nJakość gwarantowana... chyba 😂\n\n#zmęczony #{niche} #fyp #funny",
                "Kiedy próbujesz wytłumaczyć {topic} znajomym spoza {niche} 😭\n\n'Nie, to nie jest to samo co...'\n\n#nikt_nie_rozumie #{niche} #fyp #relatable"
            ],
            en: [
                "Me: I'll be professional in {niche}\nAlso me seeing {topic}: 🤡\n\n#humor #{niche} #fyp #relatable",
                "{topic} in {niche} explained by someone who hasn't slept in 3 days 😴\n\nQuality guaranteed... probably 😂\n\n#tired #{niche} #fyp #funny",
                "When you try to explain {topic} to friends outside {niche} 😭\n\n'No, it's not the same as...'\n\n#nobody_understands #{niche} #fyp #relatable"
            ]
        },
        educational: {
            pl: [
                "Nauczę Cię {topic} w 60 sekund ⏱️\n\nBranża {niche} nie musi być skomplikowana!\n\n#learnontiktok #{niche} #edukacja #fyp",
                "{topic} – od zera do bohatera w {niche} 🚀\n\nCzęść 1 z 3. Zapisz żeby nie zgubić!\n\n#tutorial #{niche} #nauka #fyp",
                "Błąd, który popełnia 90% ludzi w {niche} przy {topic} ❌\n\nNie rób tego!\n\n#błędy #{niche} #tips #fyp"
            ],
            en: [
                "I'll teach you {topic} in 60 seconds ⏱️\n\nThe {niche} industry doesn't have to be complicated!\n\n#learnontiktok #{niche} #education #fyp",
                "{topic} – from zero to hero in {niche} 🚀\n\nPart 1 of 3. Save so you don't lose it!\n\n#tutorial #{niche} #learning #fyp",
                "The mistake 90% of people make in {niche} with {topic} ❌\n\nDon't do this!\n\n#mistakes #{niche} #tips #fyp"
            ]
        }
    },

    linkedin: {
        inspirational: {
            pl: [
                "Przez lata pracy w {niche} nauczyłem/am się jednej kluczowej lekcji o {topic}.\n\nNie chodzi o to, żeby być najlepszym. Chodzi o to, żeby być konsekwentnym.\n\nKażdy ekspert był kiedyś nowicjuszem. Każdy lider kiedyś się uczył. Każdy sukces zaczął się od decyzji, żeby spróbować.\n\nCo Cię powstrzymuje przed zrobieniem następnego kroku?\n\n#rozwój #kariera #{niche} #leadership",
                "Chcę podzielić się czymś osobistym o {topic}.\n\nKilka lat temu byłem/am w miejscu, gdzie {niche} wydawało mi się nieosiągalne. Dziś jest moją codziennością.\n\nCo się zmieniło? Przestałem/am czekać na idealny moment i zacząłem/am działać.\n\nJeśli Ty też czekasz – to jest Twój znak. Czas zacząć.\n\n#motywacja #kariera #{niche}",
                "Refleksja na dziś: {topic}\n\nW branży {niche} często zapominamy, że za każdym sukcesem stoi historia wytrwałości, nie tylko talentu.\n\nJaką historię wytrwałości masz do opowiedzenia?\n\n#refleksja #{niche} #sukces #networking"
            ],
            en: [
                "After years in {niche}, I learned one key lesson about {topic}.\n\nIt's not about being the best. It's about being consistent.\n\nEvery expert was once a beginner. Every leader once learned. Every success started with a decision to try.\n\nWhat's stopping you from taking the next step?\n\n#growth #career #{niche} #leadership",
                "I want to share something personal about {topic}.\n\nA few years ago, I was in a place where {niche} seemed unattainable to me. Today it's my daily reality.\n\nWhat changed? I stopped waiting for the perfect moment and started acting.\n\nIf you're also waiting – this is your sign. Time to start.\n\n#motivation #career #{niche}",
                "Today's reflection: {topic}\n\nIn the {niche} industry, we often forget that behind every success is a story of perseverance, not just talent.\n\nWhat story of perseverance do you have to tell?\n\n#reflection #{niche} #success #networking"
            ]
        },
        professional: {
            pl: [
                "{topic} – perspektywa praktyka z branży {niche}\n\nPo X latach doświadczenia mogę powiedzieć, że najważniejsze jest:\n\n→ Zrozumienie kontekstu przed działaniem\n→ Mierzenie wyników, nie tylko aktywności\n→ Budowanie relacji opartych na wartości\n\nCo dodałbyś/dodałabyś do tej listy?\n\n#profesjonalizm #{niche} #biznes #networking",
                "Trendy w {niche} na 2025 rok – moja analiza {topic}\n\nRynek się zmienia szybciej niż kiedykolwiek. Oto co obserwuję:\n\n📈 Wzrost znaczenia danych\n🤝 Powrót do relacji B2B\n🔄 Automatyzacja procesów\n\nJakie trendy Ty obserwujesz?\n\n#trendy #{niche} #analiza #2025",
                "Otwarte pytanie do społeczności {niche}:\n\nJak podchodzicie do {topic}?\n\nW mojej praktyce zawodowej widzę dwa podejścia:\n1. Reaktywne – działamy gdy problem się pojawi\n2. Proaktywne – przewidujemy i zapobiegamy\n\nKtóre jest skuteczniejsze? Dyskutujmy 👇\n\n#{niche} #strategia #zarządzanie"
            ],
            en: [
                "{topic} – a practitioner's perspective from the {niche} industry\n\nAfter X years of experience, I can say the most important things are:\n\n→ Understanding context before acting\n→ Measuring results, not just activity\n→ Building relationships based on value\n\nWhat would you add to this list?\n\n#professionalism #{niche} #business #networking",
                "{niche} trends for 2025 – my analysis of {topic}\n\nThe market is changing faster than ever. Here's what I'm observing:\n\n📈 Growing importance of data\n🤝 Return to B2B relationships\n🔄 Process automation\n\nWhat trends are you observing?\n\n#trends #{niche} #analysis #2025",
                "Open question to the {niche} community:\n\nHow do you approach {topic}?\n\nIn my professional practice, I see two approaches:\n1. Reactive – we act when a problem appears\n2. Proactive – we anticipate and prevent\n\nWhich is more effective? Let's discuss 👇\n\n#{niche} #strategy #management"
            ]
        },
        casual: {
            pl: [
                "Szczera rozmowa o {topic} w {niche} 🙋\n\nNie zawsze mam wszystkie odpowiedzi. I to jest okej.\n\nCo ważne – zawsze staram się uczyć od innych. Dlatego pytam: jakie są Wasze doświadczenia?\n\n#{niche} #szczerość #networking",
                "Dziś chcę porozmawiać o {topic} bez korporacyjnego żargonu.\n\nW {niche} często komplikujemy proste rzeczy. Czas to zmienić!\n\nJeśli masz pytania – zadaj je w komentarzu. Odpowiem na każde 💬\n\n#{niche} #prostota #networking",
                "Mała refleksja na koniec tygodnia: {topic}\n\nPraca w {niche} nauczyła mnie, że najważniejsze są relacje, nie stanowiska.\n\nKomu chciałbyś/chciałabyś podziękować za wsparcie w tym tygodniu? Oznacz ich! 👇\n\n#{niche} #wdzięczność #networking"
            ],
            en: [
                "Honest conversation about {topic} in {niche} 🙋\n\nI don't always have all the answers. And that's okay.\n\nWhat's important – I always try to learn from others. That's why I'm asking: what are your experiences?\n\n#{niche} #honesty #networking",
                "Today I want to talk about {topic} without corporate jargon.\n\nIn {niche}, we often complicate simple things. Time to change that!\n\nIf you have questions – ask them in the comments. I'll answer every one 💬\n\n#{niche} #simplicity #networking",
                "A small reflection at the end of the week: {topic}\n\nWorking in {niche} taught me that relationships matter more than titles.\n\nWho would you like to thank for their support this week? Tag them! 👇\n\n#{niche} #gratitude #networking"
            ]
        },
        humorous: {
            pl: [
                "Rzeczy, których nikt nie mówi Ci o {topic} w {niche}:\n\n1. To zajmuje 3x więcej czasu niż myślisz\n2. Będziesz to robić od nowa przynajmniej raz\n3. I tak będziesz z tego dumny/a 😄\n\nKto się odnajduje? 👇\n\n#{niche} #humor #networking #prawda",
                "Moje CV vs. rzeczywistość w {niche}:\n\nCV: 'Ekspert w {topic}'\nRzeczywistość: 'Googluje {topic} co 5 minut' 😅\n\nI wiecie co? To jest okej. Wszyscy tak robimy.\n\n#{niche} #humor #autentyczność",
                "Spotkanie o {topic} w {niche} mogło być mailem.\n\nAle hej, przynajmniej była kawa ☕\n\nKto się odnajduje? 😂\n\n#{niche} #humor #praca #meetings"
            ],
            en: [
                "Things nobody tells you about {topic} in {niche}:\n\n1. It takes 3x longer than you think\n2. You'll redo it at least once\n3. You'll still be proud of it 😄\n\nWho relates? 👇\n\n#{niche} #humor #networking #truth",
                "My CV vs. reality in {niche}:\n\nCV: 'Expert in {topic}'\nReality: 'Googling {topic} every 5 minutes' 😅\n\nAnd you know what? That's okay. We all do it.\n\n#{niche} #humor #authenticity",
                "The meeting about {topic} in {niche} could have been an email.\n\nBut hey, at least there was coffee ☕\n\nWho relates? 😂\n\n#{niche} #humor #work #meetings"
            ]
        },
        educational: {
            pl: [
                "Przewodnik po {topic} dla profesjonalistów {niche}\n\nCzęsto pytacie mnie o to zagadnienie. Oto moja odpowiedź:\n\n📌 Krok 1: Zrozum podstawy\n📌 Krok 2: Zastosuj w praktyce\n📌 Krok 3: Mierz i optymalizuj\n📌 Krok 4: Dziel się wiedzą\n\nZapisz ten post – przyda się! 🔖\n\n#{niche} #edukacja #poradnik",
                "5 błędów w {topic}, które kosztują firmy w {niche} miliony\n\nWidziałem/am to wielokrotnie. Oto jak ich unikać:\n\n❌ Błąd 1: Brak strategii\n❌ Błąd 2: Ignorowanie danych\n❌ Błąd 3: Brak komunikacji\n❌ Błąd 4: Zbyt szybkie skalowanie\n❌ Błąd 5: Zaniedbanie zespołu\n\nKtóry błąd widzisz najczęściej?\n\n#{niche} #błędy #biznes",
                "Jak zacząć z {topic} w {niche} – praktyczny przewodnik\n\nNie potrzebujesz lat doświadczenia. Potrzebujesz właściwego podejścia.\n\nOto mój sprawdzony framework:\n→ Diagnoza obecnej sytuacji\n→ Określenie celów\n→ Plan działania\n→ Wykonanie i iteracja\n\nMasz pytania? Jestem tu! 👇\n\n#{niche} #poradnik #start"
            ],
            en: [
                "A guide to {topic} for {niche} professionals\n\nYou often ask me about this topic. Here's my answer:\n\n📌 Step 1: Understand the basics\n📌 Step 2: Apply in practice\n📌 Step 3: Measure and optimize\n📌 Step 4: Share knowledge\n\nSave this post – you'll need it! 🔖\n\n#{niche} #education #guide",
                "5 mistakes in {topic} that cost {niche} companies millions\n\nI've seen this many times. Here's how to avoid them:\n\n❌ Mistake 1: No strategy\n❌ Mistake 2: Ignoring data\n❌ Mistake 3: Poor communication\n❌ Mistake 4: Scaling too fast\n❌ Mistake 5: Neglecting the team\n\nWhich mistake do you see most often?\n\n#{niche} #mistakes #business",
                "How to start with {topic} in {niche} – a practical guide\n\nYou don't need years of experience. You need the right approach.\n\nHere's my proven framework:\n→ Diagnose current situation\n→ Define goals\n→ Action plan\n→ Execute and iterate\n\nHave questions? I'm here! 👇\n\n#{niche} #guide #start"
            ]
        }
    },

    twitter: {
        inspirational: {
            pl: [
                "{topic} w {niche} nauczyło mnie jednego:\n\nNajważniejsza jest konsekwencja, nie perfekcja.\n\nMały krok każdego dnia > wielki skok raz na rok.",
                "Prawda o {niche}:\n\n{topic} to nie sprint. To maraton.\n\nCi, którzy wygrywają, to ci, którzy nie rezygnują.",
                "Dziś o {topic}:\n\nW {niche} nie ma drogi na skróty.\nAle jest droga.\nI zaczyna się od pierwszego kroku. 🚀"
            ],
            en: [
                "{topic} in {niche} taught me one thing:\n\nConsistency matters more than perfection.\n\nSmall step every day > big leap once a year.",
                "The truth about {niche}:\n\n{topic} is not a sprint. It's a marathon.\n\nThose who win are those who don't quit.",
                "Today on {topic}:\n\nIn {niche}, there are no shortcuts.\nBut there is a path.\nAnd it starts with the first step. 🚀"
            ]
        },
        professional: {
            pl: [
                "Hot take: {topic} w {niche} jest przereklamowane.\n\nCo naprawdę działa? Podstawy.\n\nThread 🧵",
                "{topic} – 3 rzeczy, które zmieniły moje podejście do {niche}:\n\n1. Dane > intuicja\n2. Relacje > transakcje\n3. Długi termin > szybkie zyski\n\nCo dodasz?",
                "Pytanie do ekspertów {niche}:\n\nJak podchodzicie do {topic}?\n\nMoje podejście: [opisz krótko]\n\nChętnie poznam Wasze metody 👇"
            ],
            en: [
                "Hot take: {topic} in {niche} is overrated.\n\nWhat actually works? The basics.\n\nThread 🧵",
                "{topic} – 3 things that changed my approach to {niche}:\n\n1. Data > intuition\n2. Relationships > transactions\n3. Long-term > quick wins\n\nWhat would you add?",
                "Question for {niche} experts:\n\nHow do you approach {topic}?\n\nMy approach: [describe briefly]\n\nLove to hear your methods 👇"
            ]
        },
        casual: {
            pl: [
                "Nikt:\nAbsolutnie nikt:\nJa o {topic} w {niche}: 🤓\n\n(i nie przepraszam za to)",
                "Dziś odkryłem/am coś o {topic} w {niche} i muszę to powiedzieć:\n\nTo prostsze niż myślałem/am.\n\nDlaczego nikt mi tego wcześniej nie powiedział? 😅",
                "{topic} w {niche} to jak...\n\nAh, nie, nie ma dobrej analogii 😂\n\nPo prostu musisz to przeżyć."
            ],
            en: [
                "Nobody:\nAbsolutely nobody:\nMe about {topic} in {niche}: 🤓\n\n(and I'm not sorry)",
                "Today I discovered something about {topic} in {niche} and I need to say it:\n\nIt's simpler than I thought.\n\nWhy didn't anyone tell me this earlier? 😅",
                "{topic} in {niche} is like...\n\nAh, no, there's no good analogy 😂\n\nYou just have to experience it."
            ]
        },
        humorous: {
            pl: [
                "Ja: będę profesjonalny/a w {niche}\nTakże ja: *pisze 47 tweetów o {topic} o 2 w nocy*",
                "{topic} w {niche} wyjaśnione przez kogoś, kto właśnie wypił 4. kawę:\n\n[coraz mniej spójny wywód]\n\nJest okej. Wszystko jest okej. ☕",
                "Spotkanie o {topic} w {niche}:\n\nMinuta 1: 'To będzie krótkie'\nMinuta 47: *nadal trwa*\n\nKlasyk 😂"
            ],
            en: [
                "Me: I'll be professional in {niche}\nAlso me: *writing 47 tweets about {topic} at 2am*",
                "{topic} in {niche} explained by someone who just had their 4th coffee:\n\n[increasingly incoherent argument]\n\nIt's fine. Everything is fine. ☕",
                "Meeting about {topic} in {niche}:\n\nMinute 1: 'This will be quick'\nMinute 47: *still going*\n\nClassic 😂"
            ]
        },
        educational: {
            pl: [
                "{topic} w {niche} – thread dla początkujących 🧵\n\n1/ Zacznijmy od podstaw...",
                "5 rzeczy o {topic} w {niche}, których żałuję, że nie wiedziałem/am wcześniej:\n\n1. [pierwsza rzecz]\n2. [druga rzecz]\n...\n\nThread 👇",
                "Pytanie: Jak nauczyć się {topic} w {niche} od zera?\n\nOdpowiedź (thread): 🧵\n\n1/ Zacznij od..."
            ],
            en: [
                "{topic} in {niche} – thread for beginners 🧵\n\n1/ Let's start with the basics...",
                "5 things about {topic} in {niche} I wish I knew earlier:\n\n1. [first thing]\n2. [second thing]\n...\n\nThread 👇",
                "Question: How to learn {topic} in {niche} from scratch?\n\nAnswer (thread): 🧵\n\n1/ Start with..."
            ]
        }
    },

    facebook: {
        inspirational: {
            pl: [
                "Dzisiaj chcę podzielić się czymś, co zmieniło moje podejście do {topic} w {niche}.\n\nCzasem wystarczy jedna rozmowa, jeden artykuł, jeden moment refleksji, żeby wszystko zobaczyć inaczej.\n\nCo ostatnio zmieniło Twoje podejście? Podziel się w komentarzu – może zainspirujemy się nawzajem! 💙",
                "Mała dawka inspiracji na dziś:\n\n{topic} w {niche} to nie tylko praca. To styl życia, pasja i ciągłe dążenie do lepszej wersji siebie.\n\nJeśli to rezonuje z Tobą – udostępnij! Może ktoś z Twoich znajomych tego potrzebuje 🙏",
                "Refleksja na dziś: {topic}\n\nW {niche} nauczyłem/am się, że najważniejsze nie jest to, gdzie jesteś, ale w którym kierunku zmierzasz.\n\nGdzie zmierzasz? 💭"
            ],
            en: [
                "Today I want to share something that changed my approach to {topic} in {niche}.\n\nSometimes all it takes is one conversation, one article, one moment of reflection to see everything differently.\n\nWhat recently changed your perspective? Share in the comments – maybe we'll inspire each other! 💙",
                "A little dose of inspiration for today:\n\n{topic} in {niche} is not just work. It's a lifestyle, a passion, and a constant pursuit of a better version of yourself.\n\nIf this resonates with you – share it! Maybe someone in your network needs this 🙏",
                "Today's reflection: {topic}\n\nIn {niche}, I learned that what matters most is not where you are, but which direction you're heading.\n\nWhere are you heading? 💭"
            ]
        },
        professional: {
            pl: [
                "Ważna informacja dla wszystkich zainteresowanych {niche}:\n\n{topic} to temat, który będzie kształtował naszą branżę w najbliższych latach.\n\nDlatego przygotowałem/am krótkie podsumowanie najważniejszych aspektów. Przeczytaj i podziel się z osobami, które mogą skorzystać!\n\n#niche #profesjonalizm",
                "Zapraszam do dyskusji na temat {topic} w kontekście {niche}.\n\nJako społeczność możemy się wiele nauczyć od siebie nawzajem. Podzielcie się swoimi doświadczeniami w komentarzach!\n\nKażda perspektywa jest cenna 🤝",
                "Aktualizacja z branży {niche}:\n\n{topic} – co warto wiedzieć w 2025 roku?\n\nPrzygotowałem/am krótki przegląd. Dajcie znać, czy chcecie więcej takich treści!"
            ],
            en: [
                "Important information for everyone interested in {niche}:\n\n{topic} is a topic that will shape our industry in the coming years.\n\nThat's why I've prepared a brief summary of the most important aspects. Read it and share with people who might benefit!\n\n#niche #professionalism",
                "I invite you to discuss {topic} in the context of {niche}.\n\nAs a community, we can learn a lot from each other. Share your experiences in the comments!\n\nEvery perspective is valuable 🤝",
                "Update from the {niche} industry:\n\n{topic} – what's worth knowing in 2025?\n\nI've prepared a brief overview. Let me know if you want more content like this!"
            ]
        },
        casual: {
            pl: [
                "Hej wszystkim! 👋\n\nDziś chcę porozmawiać o {topic} w {niche}. To temat, który ostatnio dużo myślę i chciałem/am się podzielić.\n\nCo Wy o tym myślicie? Piszcie w komentarzach! Lubię takie rozmowy 😊",
                "Małe wyznanie: {topic} w {niche} to coś, z czym długo się zmagałem/am.\n\nAle w końcu to ogarnąłem/am i chcę Wam powiedzieć jak!\n\nDajcie znać w komentarzach czy chcecie więcej takich postów 💬",
                "Dobry wieczór! 🌙\n\nDziś refleksja o {topic} w {niche}. Czasem warto się zatrzymać i pomyśleć o tym, co robimy i dlaczego.\n\nJak Wy to widzicie? Chętnie poczytam Wasze przemyślenia!"
            ],
            en: [
                "Hey everyone! 👋\n\nToday I want to talk about {topic} in {niche}. It's a topic I've been thinking about a lot lately and wanted to share.\n\nWhat do you think? Write in the comments! I love these conversations 😊",
                "Small confession: {topic} in {niche} is something I struggled with for a long time.\n\nBut I finally figured it out and want to tell you how!\n\nLet me know in the comments if you want more posts like this 💬",
                "Good evening! 🌙\n\nToday's reflection on {topic} in {niche}. Sometimes it's worth stopping and thinking about what we do and why.\n\nHow do you see it? I'd love to read your thoughts!"
            ]
        },
        humorous: {
            pl: [
                "Kiedy próbujesz wytłumaczyć {topic} w {niche} rodzinie przy obiedzie:\n\n'No wiesz, to jest jak... hmm... właściwie to trudno wytłumaczyć'\n\nKto się odnajduje? 😂 Udostępnij jeśli Twoja rodzina też nie rozumie co robisz!",
                "Prawdziwa historia:\n\nJa: 'Zajmuję się {topic} w {niche}'\nZnajomy: 'A, to jak [zupełnie inne zawód]?'\nJa: '...'\n\nKto to przeżył? 😅 Piszcie w komentarzach!",
                "Mój plan na dziś:\n✅ Ogarnąć {topic} w {niche}\n✅ Być produktywnym/ą\n✅ Nie scrollować Facebooka\n\nMój dzień w rzeczywistości:\n❌ Scrolluję Facebooka i piszę ten post 😂\n\nKto tak samo? 🙋"
            ],
            en: [
                "When you try to explain {topic} in {niche} to family at dinner:\n\n'Well, you know, it's like... hmm... actually it's hard to explain'\n\nWho relates? 😂 Share if your family also doesn't understand what you do!",
                "True story:\n\nMe: 'I work with {topic} in {niche}'\nFriend: 'Oh, so like [completely different job]?'\nMe: '...'\n\nWho's been through this? 😅 Write in the comments!",
                "My plan for today:\n✅ Figure out {topic} in {niche}\n✅ Be productive\n✅ Not scroll Facebook\n\nMy day in reality:\n❌ Scrolling Facebook and writing this post 😂\n\nWho's the same? 🙋"
            ]
        },
        educational: {
            pl: [
                "Poradnik: {topic} w {niche} dla każdego\n\nCzęsto dostaję pytania o ten temat, więc postanowiłem/am napisać kompleksowy przewodnik.\n\n📌 Podstawy\n📌 Praktyczne wskazówki\n📌 Najczęstsze błędy\n📌 Zasoby do nauki\n\nZapisz ten post i wróć do niego gdy będziesz potrzebować! Udostępnij znajomym, którym może się przydać 🙏",
                "Edukacja w {niche}: {topic}\n\nDziś chcę podzielić się wiedzą, którą zdobywałem/am przez lata.\n\nMam nadzieję, że pomoże Wam uniknąć błędów, które ja popełniłem/am!\n\nJeśli macie pytania – piszcie w komentarzach. Odpowiem na każde! 💬",
                "Seria edukacyjna: {niche} od podstaw\n\nDzisiejszy temat: {topic}\n\nJeśli dopiero zaczynasz swoją przygodę z {niche}, ten post jest dla Ciebie!\n\nUdostępnij komuś, kto też zaczyna 🤝"
            ],
            en: [
                "Guide: {topic} in {niche} for everyone\n\nI often get questions about this topic, so I decided to write a comprehensive guide.\n\n📌 Basics\n📌 Practical tips\n📌 Common mistakes\n📌 Learning resources\n\nSave this post and come back to it when you need it! Share with friends who might find it useful 🙏",
                "Education in {niche}: {topic}\n\nToday I want to share knowledge I've been gathering for years.\n\nI hope it helps you avoid the mistakes I made!\n\nIf you have questions – write in the comments. I'll answer every one! 💬",
                "Educational series: {niche} from scratch\n\nToday's topic: {topic}\n\nIf you're just starting your journey with {niche}, this post is for you!\n\nShare with someone who's also starting out 🤝"
            ]
        }
    }
};

// ============================================
// HASHTAG DATABASE
// ============================================

const hashtagDatabase = {
    general: {
        pl: {
            large: ['#polska', '#polskiinternet', '#social', '#content', '#marketing'],
            medium: ['#tworzenietresci', '#contentcreator', '#socialmedia', '#digitalmarketing', '#branding'],
            small: ['#polskitworca', '#contentpl', '#marketingpl', '#brandingpl', '#digitalpl']
        },
        en: {
            large: ['#socialmedia', '#content', '#marketing', '#digital', '#online'],
            medium: ['#contentcreator', '#digitalmarketing', '#socialmediamarketing', '#contentmarketing', '#branding'],
            small: ['#contentcreation', '#socialmediatips', '#marketingtips', '#brandingstrategy', '#digitalstrategy']
        }
    },
    niches: {
        fitness: {
            pl: ['#fitness', '#trening', '#zdrowie', '#sport', '#motywacja', '#siłownia', '#bieganie', '#dieta', '#zdrowe', '#aktywność', '#fitnessmotywacja', '#treningdomowy', '#zdrowystyl', '#fitnesspl', '#treningpl'],
            en: ['#fitness', '#workout', '#health', '#gym', '#motivation', '#training', '#exercise', '#fitlife', '#fitnessmotivation', '#healthylifestyle', '#workoutmotivation', '#gymlife', '#fitfam', '#bodybuilding', '#cardio']
        },
        technologia: {
            pl: ['#technologia', '#tech', '#programowanie', '#it', '#startup', '#innowacje', '#ai', '#software', '#coding', '#developer', '#techpl', '#programowaniepl', '#itpl', '#startuppl', '#aipl'],
            en: ['#technology', '#tech', '#programming', '#software', '#startup', '#innovation', '#ai', '#coding', '#developer', '#machinelearning', '#webdev', '#javascript', '#python', '#techstartup', '#digitaltransformation']
        },
        moda: {
            pl: ['#moda', '#fashion', '#styl', '#ootd', '#ubrania', '#trendy', '#modapl', '#stylizacja', '#outfit', '#lookoftheday', '#fashionpl', '#modapolska', '#stylistka', '#fashionblogger', '#modablogger'],
            en: ['#fashion', '#style', '#ootd', '#outfit', '#clothing', '#fashionblogger', '#fashionista', '#streetstyle', '#lookoftheday', '#fashionweek', '#styleinspo', '#fashionlover', '#outfitoftheday', '#fashionphotography', '#womensfashion']
        },
        kulinaria: {
            pl: ['#kulinaria', '#gotowanie', '#jedzenie', '#przepisy', '#food', '#kuchnia', '#smaczne', '#foodporn', '#foodblogger', '#przepis', '#kulinariapl', '#gotowaniepl', '#jedzeniepopolsku', '#foodpl', '#kuchniapolska'],
            en: ['#food', '#cooking', '#recipe', '#foodie', '#foodphotography', '#homecooking', '#foodblogger', '#instafood', '#foodlover', '#delicious', '#yummy', '#foodstagram', '#healthyfood', '#mealprep', '#foodporn']
        },
        biznes: {
            pl: ['#biznes', '#przedsiębiorczość', '#startup', '#marketing', '#sprzedaż', '#sukces', '#biznespl', '#przedsiębiorczośćpl', '#startuppl', '#marketingpl', '#sprzedażpl', '#sukcespl', '#entrepreneur', '#business', '#entrepreneurship'],
            en: ['#business', '#entrepreneur', '#startup', '#marketing', '#sales', '#success', '#entrepreneurship', '#businesstips', '#smallbusiness', '#businessowner', '#hustle', '#mindset', '#growthhacking', '#b2b', '#businessstrategy']
        },
        podróże: {
            pl: ['#podróże', '#travel', '#turystyka', '#wakacje', '#zwiedzanie', '#podróżowanie', '#podróżepl', '#travelpl', '#turystykapl', '#wakacjepl', '#zwiedzaniepl', '#travelblogger', '#travelgram', '#instatravel', '#wanderlust'],
            en: ['#travel', '#wanderlust', '#adventure', '#explore', '#travelblogger', '#travelgram', '#instatravel', '#traveling', '#travelphotography', '#vacation', '#holiday', '#backpacking', '#traveltheworld', '#traveler', '#tourism']
        },
        edukacja: {
            pl: ['#edukacja', '#nauka', '#uczenie', '#wiedza', '#szkoła', '#studia', '#edukacjapl', '#naukapl', '#uczeniesiępopolsku', '#wiedzapl', '#szkołapl', '#studiapl', '#learning', '#education', '#knowledge'],
            en: ['#education', '#learning', '#knowledge', '#study', '#school', '#university', '#elearning', '#onlinelearning', '#edtech', '#teaching', '#teacher', '#student', '#studytips', '#learneveryday', '#growthmindset']
        },
        zdrowie: {
            pl: ['#zdrowie', '#wellness', '#mindfulness', '#medytacja', '#psychologia', '#zdrowiepl', '#wellnesspl', '#mindfulnesspl', '#medytacjapl', '#psychologiapl', '#mentalhealth', '#selfcare', '#wellbeing', '#healthylife', '#mindset'],
            en: ['#health', '#wellness', '#mindfulness', '#meditation', '#mentalhealth', '#selfcare', '#wellbeing', '#healthylifestyle', '#mindset', '#positivity', '#selfimprovement', '#personaldevelopment', '#healthyliving', '#mindbodysoul', '#healing']
        }
    }
};

// ============================================
// PLATFORM HASHTAG LIMITS
// ============================================

const platformHashtagLimits = {
    instagram: { recommended: 15, max: 30 },
    tiktok: { recommended: 5, max: 10 },
    linkedin: { recommended: 5, max: 10 },
    twitter: { recommended: 2, max: 4 },
    facebook: { recommended: 3, max: 8 }
};

// ============================================
// REACH LABELS
// ============================================

const reachLabels = {
    large: { pl: 'duży zasięg', en: 'high reach' },
    medium: { pl: 'średni zasięg', en: 'medium reach' },
    small: { pl: 'niszowy', en: 'niche' }
};

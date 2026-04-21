/**
 * CaptionForge – Generator Logic
 *
 * ARCHITEKTURA: Strategy Pattern
 * Aktywna strategia: 'gemini'
 *
 * Aby przełączyć z powrotem na mock:
 * 1. Zmień activeStrategy na 'mock'
 * 2. Reszta kodu nie wymaga zmian
 */

// ============================================
// KONFIGURACJA API
// ============================================

const CONFIG = {
    geminiApiKey: 'AIzaSyCwJ1BAQiH68FhzXFJYq2VtcB7y0o-uAr8',
    geminiModel: 'gemini-2.5-flash',
    temperature: 0.8
};

// ============================================
// STRATEGY PATTERN – Generator Strategies
// ============================================

const GeneratorStrategy = {

    /**
     * MOCK STRATEGY
     * Używa predefiniowanych szablonów z templates.js
     * Symuluje opóźnienie API (1.5s)
     */
    mock: async function(params) {
        // Symulacja opóźnienia API
        await delay(1500);

        const { platform, tone, niche, language, topic } = params;

        // Pobierz szablony dla danej kombinacji
        const templates = getTemplates(platform, tone, language);

        // Wygeneruj 3 warianty opisów
        const captions = templates.map((template, index) => ({
            id: index + 1,
            text: fillTemplate(template, { topic, niche }),
            variant: `Wariant ${index + 1}`
        }));

        // Wygeneruj hasztagi
        const hashtags = generateHashtags(niche, language, platform);

        return {
            captions,
            hashtags,
            platform,
            tone,
            language
        };
    },

    /**
     * GEMINI STRATEGY
     * Używa Google Gemini API do generowania opisów przez AI
     */
    gemini: async function(params) {
        const { platform, tone, niche, language, topic } = params;

        const prompt = buildGeminiPrompt(params);

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.geminiModel}:generateContent?key=${CONFIG.geminiApiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: CONFIG.temperature,
                    maxOutputTokens: 2048
                }
            })
        });

        if (!response.ok) {
            let errorMessage = response.statusText;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error?.message || errorMessage;
            } catch (_) { /* ignoruj błąd parsowania */ }

            if (response.status === 429) {
                // Rate limit – fallback na mock
                console.warn('Gemini API rate limit (429). Używam mock jako fallback.');
                return GeneratorStrategy.mock(params);
            }

            throw new Error(`Gemini API error ${response.status}: ${errorMessage}`);
        }

        const data = await response.json();
        return parseGeminiResponse(data, params);
    }
};

// Aktywna strategia – zmień na 'mock' aby wrócić do szablonów
let activeStrategy = 'gemini';

/**
 * Główna funkcja generowania opisów
 * @param {Object} params - parametry generowania
 * @returns {Promise<Object>} - wynik z opisami i hasztagami
 */
async function generateCaption(params) {
    if (!GeneratorStrategy[activeStrategy]) {
        throw new Error(`Nieznana strategia: ${activeStrategy}`);
    }
    return GeneratorStrategy[activeStrategy](params);
}

// ============================================
// GEMINI API HELPERS
// ============================================

/**
 * Buduje prompt dla Gemini API na podstawie parametrów użytkownika
 */
function buildGeminiPrompt(params) {
    const { platform, tone, niche, language, topic } = params;

    const langName = language === 'pl' ? 'polski' : 'angielski';

    const toneDescriptions = {
        inspirational: 'inspirujący i motywujący',
        professional: 'profesjonalny i ekspercki',
        casual: 'luźny i przyjacielski',
        humorous: 'humorystyczny i zabawny',
        educational: 'edukacyjny i informacyjny'
    };

    const platformTips = {
        instagram: 'Instagram – używaj emoji, zachęcaj do interakcji, max 2200 znaków',
        tiktok: 'TikTok – krótko i dynamicznie, nawiązuj do trendów, max 300 znaków',
        linkedin: 'LinkedIn – profesjonalnie, z wartością merytoryczną, storytelling',
        twitter: 'X/Twitter – zwięźle, max 280 znaków, angażująco',
        facebook: 'Facebook – konwersacyjnie, zachęcaj do dyskusji'
    };

    return `Jesteś ekspertem od social media copywritingu.

Wygeneruj dokładnie 3 różne warianty opisu posta oraz 10-15 hasztagów.

PARAMETRY:
- Platforma: ${platformTips[platform] || platform}
- Ton głosu: ${toneDescriptions[tone] || tone}
- Nisza/branża: ${niche || 'ogólna'}
- Temat posta: ${topic}
- Język: ${langName}

WYMAGANIA DLA OPISÓW:
1. Każdy wariant musi mieć inny styl/podejście
2. Dopasuj długość do specyfiki platformy
3. Używaj emoji odpowiednio do tonu
4. Zakończ call-to-action lub pytaniem angażującym

WYMAGANIA DLA HASZTAGÓW:
1. Mix popularnych i niszowych hasztagów
2. Dopasowane do branży: ${niche || 'ogólna'}
3. Oznacz każdy hasztag zasięgiem: large, medium lub small

ODPOWIEDZ W FORMACIE JSON – TYLKO JSON, bez dodatkowego tekstu:
{
  "captions": [
    {"id": 1, "text": "treść opisu 1", "variant": "Wariant 1"},
    {"id": 2, "text": "treść opisu 2", "variant": "Wariant 2"},
    {"id": 3, "text": "treść opisu 3", "variant": "Wariant 3"}
  ],
  "hashtags": [
    {"tag": "#hashtag1", "reach": "large"},
    {"tag": "#hashtag2", "reach": "medium"},
    {"tag": "#hashtag3", "reach": "small"}
  ]
}

Wartości reach: "large" = popularny/duży zasięg, "medium" = średni zasięg, "small" = niszowy.
Pisz w języku: ${langName}.`;
}

/**
 * Parsuje odpowiedź Gemini API do formatu oczekiwanego przez UI
 * Z fallbackiem na mock jeśli parsowanie się nie uda
 */
function parseGeminiResponse(data, params) {
    const { language, platform, tone } = params;
    const lang = language || 'pl';

    try {
        // Wyciągnij tekst z odpowiedzi Gemini
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            throw new Error('Brak treści w odpowiedzi Gemini');
        }

        // Wyczyść tekst z ewentualnych markdown code blocks
        const cleanJson = rawText
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        const parsed = JSON.parse(cleanJson);

        // Mapuj hasztagi na format z etykietami zasięgu
        const hashtags = (parsed.hashtags || []).map(h => ({
            tag: h.tag,
            reach: h.reach || 'medium',
            label: reachLabels[h.reach]?.[lang] || h.reach
        }));

        return {
            captions: parsed.captions || [],
            hashtags,
            platform,
            tone,
            language
        };
    } catch (parseError) {
        console.error('Błąd parsowania odpowiedzi Gemini:', parseError);
        console.log('Raw Gemini response:', data);

        // Fallback na mock jeśli parsowanie się nie uda
        return GeneratorStrategy.mock(params);
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Pobiera szablony dla danej kombinacji platform/tone/language
 * Z fallbackiem na inne tony jeśli brak dokładnego dopasowania
 */
function getTemplates(platform, tone, language) {
    const platformTemplates = captionTemplates[platform];
    if (!platformTemplates) {
        return captionTemplates.instagram.inspirational[language] || captionTemplates.instagram.inspirational.pl;
    }

    const toneTemplates = platformTemplates[tone];
    if (!toneTemplates) {
        // Fallback na inspirational
        const fallback = platformTemplates.inspirational;
        return fallback[language] || fallback.pl;
    }

    return toneTemplates[language] || toneTemplates.pl;
}

/**
 * Wypełnia szablon danymi użytkownika
 * Podmienia {topic} i {niche} na rzeczywiste wartości
 */
function fillTemplate(template, { topic, niche }) {
    const topicFilled = topic.trim() || 'mój temat';
    const nicheFilled = niche.trim() || 'mojej branży';

    return template
        .replace(/{topic}/g, topicFilled)
        .replace(/{niche}/g, nicheFilled);
}

/**
 * Generuje zestaw hasztagów dla danej niszy i platformy
 * Mix: duże + średnie + niszowe
 */
function generateHashtags(niche, language, platform) {
    const limit = platformHashtagLimits[platform] || { recommended: 10 };
    const lang = language || 'pl';

    // Znajdź pasującą niszę w bazie
    const nicheKey = findNicheKey(niche);
    const nicheHashtags = nicheKey ? hashtagDatabase.niches[nicheKey][lang] : [];
    const generalHashtags = hashtagDatabase.general[lang];

    // Zbuduj pulę hasztagów
    const pool = [];

    // Dodaj hasztagi niszowe (priorytet)
    if (nicheHashtags.length > 0) {
        pool.push(...nicheHashtags.map(tag => ({
            tag,
            reach: categorizeHashtag(tag, nicheHashtags)
        })));
    }

    // Uzupełnij ogólnymi
    const allGeneral = [
        ...generalHashtags.large.map(tag => ({ tag, reach: 'large' })),
        ...generalHashtags.medium.map(tag => ({ tag, reach: 'medium' })),
        ...generalHashtags.small.map(tag => ({ tag, reach: 'small' }))
    ];

    // Losowo dobierz ogólne
    const shuffledGeneral = shuffleArray(allGeneral);
    pool.push(...shuffledGeneral.slice(0, 5));

    // Dodaj hasztag z niszy użytkownika jeśli nie ma w bazie
    if (niche.trim() && !nicheKey) {
        const customNiche = niche.trim().toLowerCase().replace(/\s+/g, '');
        pool.unshift({ tag: `#${customNiche}`, reach: 'medium' });
    }

    // Usuń duplikaty i ogranicz do limitu
    const unique = removeDuplicates(pool);
    const limited = unique.slice(0, limit.recommended);

    return limited.map(item => ({
        tag: item.tag,
        reach: item.reach,
        label: reachLabels[item.reach]?.[lang] || item.reach
    }));
}

/**
 * Szuka klucza niszy w bazie danych na podstawie tekstu użytkownika
 */
function findNicheKey(niche) {
    if (!niche.trim()) return null;

    const nicheLower = niche.toLowerCase();
    const nicheKeys = Object.keys(hashtagDatabase.niches);

    // Dokładne dopasowanie
    if (nicheKeys.includes(nicheLower)) return nicheLower;

    // Częściowe dopasowanie
    const keywords = {
        fitness: ['fitness', 'sport', 'trening', 'siłownia', 'gym', 'workout', 'ćwiczenia', 'bieganie'],
        technologia: ['tech', 'technologia', 'it', 'programowanie', 'software', 'coding', 'developer', 'ai', 'startup'],
        moda: ['moda', 'fashion', 'styl', 'ubrania', 'odzież', 'style', 'clothing'],
        kulinaria: ['kulinaria', 'gotowanie', 'jedzenie', 'food', 'kuchnia', 'przepisy', 'cooking', 'recipe'],
        biznes: ['biznes', 'business', 'marketing', 'sprzedaż', 'sales', 'przedsiębiorczość', 'entrepreneur'],
        podróże: ['podróże', 'travel', 'turystyka', 'wakacje', 'zwiedzanie', 'wanderlust'],
        edukacja: ['edukacja', 'education', 'nauka', 'learning', 'szkoła', 'studia', 'wiedza'],
        zdrowie: ['zdrowie', 'health', 'wellness', 'mindfulness', 'medytacja', 'psychologia', 'mental']
    };

    for (const [key, words] of Object.entries(keywords)) {
        if (words.some(word => nicheLower.includes(word))) {
            return key;
        }
    }

    return null;
}

/**
 * Kategoryzuje hasztag jako large/medium/small na podstawie pozycji w tablicy
 */
function categorizeHashtag(tag, allTags) {
    const index = allTags.indexOf(tag);
    const total = allTags.length;
    if (index < total * 0.33) return 'large';
    if (index < total * 0.66) return 'medium';
    return 'small';
}

/**
 * Usuwa duplikaty z tablicy obiektów po kluczu 'tag'
 */
function removeDuplicates(arr) {
    const seen = new Set();
    return arr.filter(item => {
        if (seen.has(item.tag)) return false;
        seen.add(item.tag);
        return true;
    });
}

/**
 * Tasuje tablicę (Fisher-Yates)
 */
function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Opóźnienie (symulacja API call)
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// UI CONTROLLER – Generator
// ============================================

const GeneratorUI = {

    init() {
        this.form = {
            platform: document.getElementById('platform'),
            tone: document.getElementById('tone'),
            niche: document.getElementById('niche'),
            language: document.getElementById('language'),
            topic: document.getElementById('topic')
        };

        this.elements = {
            generateBtn: document.getElementById('generateBtn'),
            regenerateBtn: document.getElementById('regenerateBtn'),
            exportBtn: document.getElementById('exportBtn'),
            resultsPlaceholder: document.getElementById('resultsPlaceholder'),
            resultsLoading: document.getElementById('resultsLoading'),
            resultsContent: document.getElementById('resultsContent'),
            captionsList: document.getElementById('captionsList'),
            hashtagsList: document.getElementById('hashtagsList'),
            copyHashtagsBtn: document.getElementById('copyHashtagsBtn'),
            charCount: document.getElementById('charCount')
        };

        // Stan - ostatnie parametry i wynik (dla eksportu)
        this._lastParams = null;
        this._lastResult = null;

        this.bindEvents();
    },

    bindEvents() {
        // Generuj
        this.elements.generateBtn.addEventListener('click', () => this.handleGenerate());

        // Generuj ponownie
        this.elements.regenerateBtn?.addEventListener('click', () => this.handleGenerate());

        // Eksportuj TXT
        this.elements.exportBtn?.addEventListener('click', () => {
            if (this._lastResult && this._lastParams && typeof ExportManager !== 'undefined') {
                ExportManager.export(this._lastResult, this._lastParams);
            } else {
                showToast('⚠️ Najpierw wygeneruj opisy!');
            }
        });

        // Licznik znaków
        this.form.topic.addEventListener('input', () => {
            this.elements.charCount.textContent = this.form.topic.value.length;
        });

        // Enter w polu topic
        this.form.topic.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.handleGenerate();
            }
        });

        // Kopiuj wszystkie hasztagi
        this.elements.copyHashtagsBtn?.addEventListener('click', () => this.copyAllHashtags());
    },

    async handleGenerate() {
        const params = this.getParams();

        if (!this.validate(params)) return;

        // Zapisz parametry do użycia przez eksport i historię
        this._lastParams = params;

        this.showLoading();

        try {
            const result = await generateCaption(params);
            this.renderResults(result);
        } catch (error) {
            console.error('Błąd generowania:', error);
            const msg = error.message || '';
            if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
                showToast('❌ Brak połączenia z internetem.');
            } else if (msg.includes('Gemini API error')) {
                showToast('❌ Błąd API Gemini. Sprawdź klucz API lub spróbuj ponownie.');
            } else {
                showToast('❌ Wystąpił błąd. Spróbuj ponownie.');
            }
            this.showError();
        }
    },

    getParams() {
        return {
            platform: this.form.platform.value,
            tone: this.form.tone.value,
            niche: this.form.niche.value,
            language: this.form.language.value,
            topic: this.form.topic.value
        };
    },

    validate(params) {
        if (!params.topic.trim()) {
            showToast('⚠️ Opisz temat swojego posta!');
            this.form.topic.focus();
            this.form.topic.classList.add('error');
            setTimeout(() => this.form.topic.classList.remove('error'), 2000);
            return false;
        }
        return true;
    },

    showLoading() {
        this.elements.resultsPlaceholder.style.display = 'none';
        this.elements.resultsContent.style.display = 'none';
        this.elements.resultsLoading.style.display = 'flex';

        // Uruchom animowany progress bar
        if (typeof ProgressBar !== 'undefined') {
            ProgressBar.start();
        }

        // Animuj przycisk
        this.elements.generateBtn.disabled = true;
        this.elements.generateBtn.innerHTML = `
            <div class="btn-spinner"></div>
            Generuję...
        `;
    },

    renderResults(result) {
        // Zakończ progress bar
        if (typeof ProgressBar !== 'undefined') {
            ProgressBar.complete();
        }

        // Krótkie opóźnienie – żeby user zdążył zobaczyć "Gotowe!" na progress barze
        setTimeout(() => {
            this._renderResultsContent(result);
        }, 400);
    },

    _renderResultsContent(result) {
        // Ukryj loading
        this.elements.resultsLoading.style.display = 'none';

        // Zapisz do historii
        if (typeof HistoryManager !== 'undefined' && this._lastParams) {
            HistoryManager.save(this._lastParams, result);
            if (typeof HistoryUI !== 'undefined') HistoryUI.onNewEntry();
        }

        // Zapisz wynik do późniejszego eksportu
        this._lastResult = result;

        // Renderuj opisy (z licznikiem znaków per platforma)
        const platform = this._lastParams ? this._lastParams.platform : 'instagram';
        this.elements.captionsList.innerHTML = result.captions.map(caption => {
            const charCounterHtml = (typeof buildCharCounter !== 'undefined')
                ? buildCharCounter(caption.text, platform)
                : '';
            return `
            <div class="caption-item">
                <div class="caption-item-header">
                    <span class="caption-variant">${caption.variant}</span>
                    <button class="caption-copy-btn" data-text="${escapeAttr(caption.text)}">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                        Kopiuj
                    </button>
                </div>
                <div class="caption-text">${escapeHtml(caption.text)}</div>
                ${charCounterHtml}
            </div>
            `;
        }).join('');

        // Renderuj hasztagi
        this.elements.hashtagsList.innerHTML = result.hashtags.map(h => `
            <span class="hashtag-chip" data-tag="${escapeAttr(h.tag)}" title="${h.label}">
                ${escapeHtml(h.tag)}
                <span class="hashtag-reach">${getReachIcon(h.reach)}</span>
            </span>
        `).join('');

        // Pokaż wyniki
        this.elements.resultsContent.style.display = 'flex';

        // Przywróć przycisk
        this.elements.generateBtn.disabled = false;
        this.elements.generateBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Generuj opisy
        `;

        // Binduj eventy na nowych elementach
        this.bindCopyButtons();
        this.bindHashtagClicks();

        // Scroll do wyników na mobile
        if (window.innerWidth < 768) {
            this.elements.resultsContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    bindCopyButtons() {
        document.querySelectorAll('.caption-copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.getAttribute('data-text');
                copyToClipboard(text, btn);
            });
        });
    },

    bindHashtagClicks() {
        document.querySelectorAll('.hashtag-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const tag = chip.getAttribute('data-tag');
                copyToClipboard(tag);
                showToast(`✅ Skopiowano: ${tag}`);
            });
        });
    },

    copyAllHashtags() {
        const chips = document.querySelectorAll('.hashtag-chip');
        const tags = Array.from(chips).map(c => c.getAttribute('data-tag')).join(' ');
        if (tags) {
            copyToClipboard(tags);
            showToast('✅ Skopiowano wszystkie hasztagi!');
        }
    },

    showError() {
        if (typeof ProgressBar !== 'undefined') ProgressBar.stop();
        this.elements.resultsLoading.style.display = 'none';
        this.elements.resultsPlaceholder.style.display = 'flex';
        this.elements.generateBtn.disabled = false;
        this.elements.generateBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Generuj opisy
        `;
        showToast('❌ Wystąpił błąd. Spróbuj ponownie.');
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getReachIcon(reach) {
    const icons = { large: '🔥', medium: '📈', small: '🎯' };
    return icons[reach] || '📊';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

function escapeAttr(text) {
    return text.replace(/"/g, '\u0026quot;').replace(/'/g, '\u0026#39;');
}

async function copyToClipboard(text, btn = null) {
    try {
        await navigator.clipboard.writeText(text);
        if (btn) {
            const original = btn.innerHTML;
            btn.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                Skopiowano!
            `;
            btn.classList.add('copied');
            setTimeout(() => {
                btn.innerHTML = original;
                btn.classList.remove('copied');
            }, 2000);
        }
        return true;
    } catch (err) {
        // Fallback dla starszych przeglądarek
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

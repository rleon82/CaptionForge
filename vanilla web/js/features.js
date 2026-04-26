/**
 * CaptionForge – Nowe Funkcje
 *
 * Moduły:
 *   - ThemeManager     → dark / light mode z persystencją
 *   - ProgressBar      → animowany pasek postępu z etapami
 *   - HistoryManager   → CRUD na localStorage (max 50 wpisów)
 *   - HistoryUI        → renderowanie panelu historii
 *   - ExportManager    → eksport wyników do pliku TXT
 *   - platformCharLimits + buildCharCounter → licznik znaków per platforma
 */

// ============================================
// THEME MANAGER – dark / light mode
// ============================================

const ThemeManager = {
    STORAGE_KEY: 'captionforge-theme',

    init() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (systemPrefersDark ? 'dark' : 'light');
        this.apply(theme);

        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.addEventListener('click', () => this.toggle());
        }

        // Reaguj na zmianę systemowej preferencji (gdy brak zapisanego motywu)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.apply(e.matches ? 'dark' : 'light');
            }
        });
    },

    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const btn = document.getElementById('themeToggle');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem(this.STORAGE_KEY, theme);
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        this.apply(current === 'dark' ? 'light' : 'dark');
    }
};

// ============================================
// PROGRESS BAR – animowany pasek z etapami
// ============================================

const ProgressBar = {
    stages: [
        { text: 'Analizuję Twój temat...', icon: '🔍', progress: 15 },
        { text: 'Generuję 3 warianty opisów...', icon: '✍️', progress: 55 },
        { text: 'Dobieram hasztagi dla niszy...', icon: '🏷️', progress: 85 }
    ],
    _timer: null,
    _stageIndex: 0,

    start() {
        this._stageIndex = 0;
        this._setStage(0);

        let i = 1;
        this._timer = setInterval(() => {
            if (i < this.stages.length) {
                this._setStage(i);
                i++;
            } else {
                clearInterval(this._timer);
            }
        }, 1800);
    },

    _setStage(index) {
        const stage = this.stages[index];
        const icon = document.getElementById('progressIcon');
        const text = document.getElementById('progressText');
        const bar  = document.getElementById('progressBar');

        if (icon) icon.textContent = stage.icon;

        if (text) {
            text.style.opacity = '0';
            setTimeout(() => {
                text.textContent = stage.text;
                text.style.opacity = '1';
            }, 150);
        }

        if (bar) bar.style.width = stage.progress + '%';
    },

    complete() {
        clearInterval(this._timer);
        const bar  = document.getElementById('progressBar');
        const icon = document.getElementById('progressIcon');
        const text = document.getElementById('progressText');

        if (bar) bar.style.width = '100%';
        if (icon) icon.textContent = '✅';
        if (text) {
            text.style.opacity = '0';
            setTimeout(() => {
                text.textContent = 'Gotowe!';
                text.style.opacity = '1';
            }, 150);
        }
    },

    stop() {
        clearInterval(this._timer);
        const bar = document.getElementById('progressBar');
        if (bar) bar.style.width = '0%';
    }
};

// ============================================
// HISTORY MANAGER – CRUD na localStorage
// ============================================

const HistoryManager = {
    KEY: 'captionforge-history',
    MAX: 50,

    /**
     * Zapisuje wynik generowania do historii
     * @param {Object} params  – parametry generowania (platform, tone, niche, language, topic)
     * @param {Object} result  – wynik (captions, hashtags)
     * @returns {Object}       – zapisany wpis
     */
    save(params, result) {
        const items = this.getAll();
        const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            params: { ...params },
            captions: result.captions,
            hashtags: result.hashtags
        };

        items.unshift(entry);
        if (items.length > this.MAX) items.splice(this.MAX);

        try {
            localStorage.setItem(this.KEY, JSON.stringify(items));
        } catch (e) {
            // localStorage może być pełny – usuń najstarszy wpis i spróbuj ponownie
            items.pop();
            try { localStorage.setItem(this.KEY, JSON.stringify(items)); } catch (_) {}
        }

        return entry;
    },

    getAll() {
        try {
            return JSON.parse(localStorage.getItem(this.KEY) || '[]');
        } catch {
            return [];
        }
    },

    getById(id) {
        return this.getAll().find(item => item.id === id) || null;
    },

    remove(id) {
        const items = this.getAll().filter(item => item.id !== id);
        localStorage.setItem(this.KEY, JSON.stringify(items));
    },

    clear() {
        localStorage.removeItem(this.KEY);
    },

    getCount() {
        return this.getAll().length;
    }
};

// ============================================
// HISTORY UI – renderowanie panelu historii
// ============================================

const HistoryUI = {
    _platformEmojis: {
        instagram: '📸', tiktok: '🎵', linkedin: '💼', twitter: '🐦', facebook: '👥'
    },
    _platformNames: {
        instagram: 'Instagram', tiktok: 'TikTok', linkedin: 'LinkedIn',
        twitter: 'X/Twitter', facebook: 'Facebook'
    },

    init() {
        this.renderAll();

        const toggleEl = document.getElementById('historyToggle');
        if (toggleEl) {
            toggleEl.addEventListener('click', () => this.togglePanel());
        }

        const clearBtn = document.getElementById('clearHistoryBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAll());
        }

        this._updateVisibility();
    },

    togglePanel() {
        const section = document.getElementById('historySection');
        if (!section) return;
        const isOpen = section.classList.toggle('open');
        const toggle = document.getElementById('historyToggle');
        if (toggle) toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    },

    renderAll() {
        const items    = HistoryManager.getAll();
        const list     = document.getElementById('historyList');
        const empty    = document.getElementById('historyEmpty');
        const badge    = document.getElementById('historyCountBadge');

        if (badge) badge.textContent = items.length;
        if (!list) return;

        if (items.length === 0) {
            list.innerHTML = '';
            if (empty) empty.style.display = 'block';
            return;
        }

        if (empty) empty.style.display = 'none';
        list.innerHTML = items.map(item => this._renderItem(item)).join('');
        this._bindItemEvents();
    },

    _renderItem(item) {
        const date    = new Date(item.timestamp);
        const dateStr = date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })
                      + ', ' + date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

        const emoji       = this._platformEmojis[item.params.platform] || '📱';
        const platformName = this._platformNames[item.params.platform] || item.params.platform;
        const topic       = item.params.topic || '';
        const preview     = topic.length > 65 ? topic.substring(0, 65) + '…' : (topic || 'Brak tematu');
        const niche       = item.params.niche || 'Ogólna';
        const safeId      = item.id.replace(/[^a-zA-Z0-9_-]/g, '_');

        const captionsHtml = (item.captions || []).map(c => `
            <div class="history-caption-preview">
                <div class="history-caption-label">${_escH(c.variant)}</div>
                ${_escH(c.text)}
            </div>
        `).join('');

        return `
        <div class="history-item" data-hist-id="${safeId}">
            <div class="history-item-meta">
                <span class="history-item-date">${dateStr}</span>
                <span class="history-platform-badge">${emoji} ${platformName}</span>
            </div>
            <div class="history-item-preview">
                <strong>${_escH(niche)}</strong> – ${_escH(preview)}
            </div>
            <div class="history-item-actions">
                <button class="history-action-btn" data-hist-action="preview" data-hist-id="${safeId}" title="Podgląd wygenerowanych opisów">👁 Podgląd</button>
                <button class="history-action-btn" data-hist-action="restore" data-hist-id="${safeId}" title="Wypełnij formularz tymi ustawieniami">↺ Użyj</button>
                <button class="history-action-btn danger" data-hist-action="remove" data-hist-id="${safeId}" title="Usuń z historii">✕</button>
            </div>
        </div>
        <div class="history-item-expanded" id="hist-exp-${safeId}">
            <div class="history-expanded-captions">
                ${captionsHtml}
            </div>
        </div>
        `;
    },

    _bindItemEvents() {
        document.querySelectorAll('.history-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.histAction;
                const id     = btn.dataset.histId;

                if (action === 'preview') this._togglePreview(id);
                if (action === 'restore') this._restoreToForm(id);
                if (action === 'remove')  this._removeItem(id);
            });
        });
    },

    _togglePreview(safeId) {
        const expanded = document.getElementById(`hist-exp-${safeId}`);
        if (expanded) expanded.classList.toggle('show');
    },

    _restoreToForm(safeId) {
        // Znajdź oryginalny wpis po ID (może zawierać specjalne znaki przed sanityzacją)
        const items = HistoryManager.getAll();
        const item  = items.find(i => i.id.replace(/[^a-zA-Z0-9_-]/g, '_') === safeId);
        if (!item) return;

        const { params } = item;

        const fields = {
            platform: document.getElementById('platform'),
            tone:     document.getElementById('tone'),
            niche:    document.getElementById('niche'),
            language: document.getElementById('language'),
            topic:    document.getElementById('topic')
        };

        if (fields.platform && params.platform) fields.platform.value = params.platform;
        if (fields.tone     && params.tone)     fields.tone.value     = params.tone;
        if (fields.niche)    fields.niche.value    = params.niche    || '';
        if (fields.language && params.language) fields.language.value = params.language;
        if (fields.topic)    fields.topic.value    = params.topic    || '';

        // Aktualizuj licznik znaków
        const charCount = document.getElementById('charCount');
        if (charCount && fields.topic) charCount.textContent = fields.topic.value.length;

        // Scroll do generatora
        const genSection = document.getElementById('generator');
        if (genSection) {
            const navH = document.getElementById('navbar')?.offsetHeight || 70;
            const top  = genSection.getBoundingClientRect().top + window.scrollY - navH - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        }

        showToast('✅ Ustawienia przywrócone z historii!');
    },

    _removeItem(safeId) {
        const items = HistoryManager.getAll();
        const item  = items.find(i => i.id.replace(/[^a-zA-Z0-9_-]/g, '_') === safeId);
        if (item) {
            HistoryManager.remove(item.id);
            this.renderAll();
            this._updateVisibility();
            showToast('🗑️ Wpis usunięty z historii');
        }
    },

    clearAll() {
        if (confirm('Czy na pewno chcesz wyczyścić całą historię generacji?')) {
            HistoryManager.clear();
            this.renderAll();
            this._updateVisibility();
            showToast('🗑️ Historia wyczyszczona');
        }
    },

    _updateVisibility() {
        const section = document.getElementById('historySection');
        if (!section) return;
        const count = HistoryManager.getCount();
        section.style.display = count > 0 ? 'block' : 'none';
    },

    /** Wywoływane po nowej generacji */
    onNewEntry() {
        this.renderAll();
        this._updateVisibility();
    }
};

// ============================================
// EXPORT MANAGER – eksport opisów do TXT
// ============================================

const ExportManager = {
    _platformNames: {
        instagram: 'Instagram', tiktok: 'TikTok', linkedin: 'LinkedIn',
        twitter: 'X/Twitter', facebook: 'Facebook'
    },
    _toneNames: {
        inspirational: 'Inspirujący', professional: 'Profesjonalny',
        casual: 'Casualowy', humorous: 'Humorystyczny', educational: 'Edukacyjny'
    },

    export(result, params) {
        const now     = new Date();
        const dateStr = now.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

        const platformName = this._platformNames[params.platform] || params.platform;
        const toneName     = this._toneNames[params.tone]         || params.tone;

        let txt = `CaptionForge – Wygenerowane opisy\n`;
        txt += `Data: ${dateStr}, ${timeStr}\n`;
        txt += `Platforma: ${platformName}  |  Ton: ${toneName}`;
        if (params.niche) txt += `  |  Nisza: ${params.niche}`;
        txt += `\n\n${'═'.repeat(50)}\n\n`;

        (result.captions || []).forEach((caption, idx) => {
            txt += `${(caption.variant || `Wariant ${idx + 1}`).toUpperCase()}:\n`;
            txt += `${caption.text}\n\n`;
            if (idx < result.captions.length - 1) {
                txt += `${'─'.repeat(50)}\n\n`;
            }
        });

        txt += `\n${'═'.repeat(50)}\n\nHASZTAGI:\n`;

        const grouped = { large: [], medium: [], small: [] };
        (result.hashtags || []).forEach(h => {
            (grouped[h.reach] || grouped.medium).push(h.tag);
        });

        if (grouped.large.length)  txt += `🔥 ${grouped.large.join(' ')}\n`;
        if (grouped.medium.length) txt += `📈 ${grouped.medium.join(' ')}\n`;
        if (grouped.small.length)  txt += `🎯 ${grouped.small.join(' ')}\n`;

        txt += `\n---\nWygenerowano przez CaptionForge\n`;

        const safePlatform = params.platform.replace(/[^a-z]/g, '');
        const safeDate     = dateStr.replace(/\./g, '-');
        const filename     = `captionforge-${safePlatform}-${safeDate}.txt`;

        // UTF-8 BOM + download
        const blob = new Blob(['\uFEFF' + txt], { type: 'text/plain;charset=utf-8' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('📤 Plik TXT pobrany!');
    }
};

// ============================================
// CHARACTER COUNTER – licznik znaków per platforma
// ============================================

const platformCharLimits = {
    instagram: { max: 2200, warning: 1800 },
    tiktok:    { max: 300,  warning: 250 },
    linkedin:  { max: 3000, warning: 2500 },
    twitter:   { max: 280,  warning: 240 },
    facebook:  { max: 63206, warning: 5000 }
};

/**
 * Zwraca HTML licznika znaków dla danego tekstu i platformy
 */
function buildCharCounter(text, platform) {
    const limits = platformCharLimits[platform] || { max: 2200, warning: 1800 };
    const count  = (text || '').length;

    let cls = 'safe';
    if (count >= limits.max)     cls = 'danger';
    else if (count >= limits.warning) cls = 'warning';

    const overLimit = count > limits.max ? ` ⚠️ przekroczono limit!` : '';

    return `<div class="caption-char-counter">
        <span class="char-count-indicator ${cls}">${count} / ${limits.max} znaków${overLimit}</span>
    </div>`;
}

// ============================================
// HELPER – prywatne escape (żeby nie kolidować
// z escapeHtml/escapeAttr z generator.js)
// ============================================

function _escH(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

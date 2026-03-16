/**
 * CaptionForge – Main App Controller
 * Obsługuje: nawigację, smooth scroll, animacje, FAQ, mobile menu
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // NAVBAR – scroll effect + mobile menu
    // ============================================

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Zamknij menu po kliknięciu w link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Zamknij menu po kliknięciu poza nim
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    // ============================================
    // SMOOTH SCROLL – dla wszystkich anchor linków
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // ============================================
    // REVEAL ANIMATIONS – Intersection Observer
    // ============================================

    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay dla elementów w gridzie
                const delay = getStaggerDelay(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /**
     * Oblicza opóźnienie animacji dla elementów w gridzie
     * (np. karty features animują się jedna po drugiej)
     */
    function getStaggerDelay(element) {
        const parent = element.parentElement;
        if (!parent) return 0;

        const siblings = Array.from(parent.querySelectorAll('.reveal'));
        const index = siblings.indexOf(element);

        // Stagger tylko dla elementów w gridzie
        const isInGrid = parent.classList.contains('features-grid') ||
                         parent.classList.contains('pricing-grid') ||
                         parent.classList.contains('faq-list');

        return isInGrid ? index * 100 : 0;
    }

    // ============================================
    // FAQ – Accordion
    // ============================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Zamknij wszystkie
            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-answer').classList.remove('open');
            });

            // Otwórz kliknięty (jeśli był zamknięty)
            if (!isOpen) {
                item.classList.add('open');
                answer.classList.add('open');
            }
        });
    });

    // ============================================
    // GENERATOR – inicjalizacja
    // ============================================

    GeneratorUI.init();

    // ============================================
    // ACTIVE NAV LINK – highlight przy scrollowaniu
    // ============================================

    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ============================================
    // MOCKUP COPY BUTTON – w hero sekcji
    // ============================================

    const mockupCopyBtn = document.querySelector('.mockup-copy');
    if (mockupCopyBtn) {
        mockupCopyBtn.addEventListener('click', () => {
            const captionText = document.querySelector('.mockup-caption p')?.textContent || '';
            const hashtagsText = Array.from(document.querySelectorAll('.mockup-hashtags span'))
                .map(s => s.textContent)
                .join(' ');

            copyToClipboard(captionText + '\n\n' + hashtagsText);
            showToast('✅ Skopiowano przykładowy opis!');

            mockupCopyBtn.textContent = '✅ Skopiowano!';
            setTimeout(() => {
                mockupCopyBtn.textContent = '📋 Kopiuj';
            }, 2000);
        });
    }

    // ============================================
    // CSS – dodaj styl dla active nav link i btn-spinner
    // ============================================

    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .nav-links a.active {
            color: var(--primary);
            background: var(--primary-light);
        }

        .form-control.error {
            border-color: #E17055 !important;
            box-shadow: 0 0 0 3px rgba(225, 112, 85, 0.15) !important;
            animation: shake 0.4s ease;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            75% { transform: translateX(6px); }
        }

        .btn-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.4);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
            flex-shrink: 0;
        }

        .btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none !important;
        }
    `;
    document.head.appendChild(dynamicStyles);

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================

    console.log('%c✍️ CaptionForge', 'font-size: 24px; font-weight: bold; color: #6C5CE7;');
    console.log('%cGenerator opisów dla Social Media', 'font-size: 14px; color: #718096;');
    console.log('%c\nAby podpiąć OpenAI API:\n1. Otwórz js/generator.js\n2. Odkomentuj strategię "openai"\n3. Zmień activeStrategy = "openai"\n4. Dodaj swój klucz API', 'font-size: 12px; color: #00B894;');

});

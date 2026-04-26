/**
 * Footer — Server Component
 */
export function Footer() {
  const year = new Date().getFullYear();

  const links = {
    Produkt: [
      { label: "Funkcje", href: "#features" },
      { label: "Jak działa", href: "#how-it-works" },
      { label: "Generator", href: "#generator" },
      { label: "FAQ", href: "#faq" },
    ],
    Platformy: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Facebook", href: "#" },
    ],
    Firma: [
      { label: "O nas", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Kontakt", href: "#" },
      { label: "Polityka prywatności", href: "#" },
      { label: "Regulamin", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface-secondary))]">
      <div className="section-container py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 font-black text-xl mb-4">
              <span>✍️</span>
              <span className="gradient-text">CaptionForge</span>
            </a>
            <p className="text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed">
              Generator angażujących opisów i hasztagów dla mediów
              społecznościowych, napędzany przez AI.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[rgb(var(--color-text-secondary))]">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[rgb(var(--color-border))] flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[rgb(var(--color-text-secondary))]">
            © {year} CaptionForge. Wszystkie prawa zastrzeżone.
          </p>
          <p className="text-xs text-[rgb(var(--color-text-secondary))] opacity-60">
            Napędzany przez Google Gemini 2.5 Flash
          </p>
        </div>
      </div>
    </footer>
  );
}

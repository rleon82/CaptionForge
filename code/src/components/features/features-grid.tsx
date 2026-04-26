/**
 * Sekcja Features — Server Component
 * 6 kart z funkcjami CaptionForge + inline SVG ikony
 */

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    title: "5 platform social media",
    description: "Instagram, TikTok, LinkedIn, X/Twitter, Facebook — każda platforma ma swój optymalny format i limit znaków.",
    color: "primary",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: "5 tonów głosu",
    description: "Inspirujący, profesjonalny, casualowy, humorystyczny, edukacyjny — dopasuj ton do swojej marki.",
    color: "secondary",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
    ),
    title: "AI Google Gemini 2.5 Flash",
    description: "Unikalne opisy generowane przez AI — nie szablony. Każdy wynik jest inny i dopasowany do Twojego tematu.",
    color: "primary",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
      </svg>
    ),
    title: "Hasztagi z oceną zasięgu",
    description: "Każdy hasztag oznaczony: 🔥 duży zasięg, 📈 średni, 🎯 niszowy — strategia zamiast strzału w ciemno.",
    color: "secondary",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Generowanie w 10 sekund",
    description: "3 warianty opisu + 10-15 hasztagów w mniej niż 10 sekund. Bez rejestracji, bez konfiguracji.",
    color: "primary",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: "Historia i eksport TXT",
    description: "Ostatnie 50 generacji zapisanych w przeglądarce. Eksport do pliku TXT z jednym kliknięciem.",
    color: "secondary",
  },
] as const;

export function FeaturesGrid() {
  return (
    <section id="features" className="section-padding bg-[rgb(var(--color-surface-secondary))]">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]">
            Funkcje
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Wszystko, czego potrzebujesz do{" "}
            <span className="gradient-text">perfekcyjnych opisów</span>
          </h2>
          <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
            CaptionForge łączy AI z wiedzą o specyfice każdej platformy — efekt?
            Opisy gotowe do użycia bez edycji.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="card-hover p-6"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  feature.color === "primary"
                    ? "bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]"
                    : "bg-[rgb(var(--color-secondary)/0.1)] text-[rgb(var(--color-secondary))]"
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

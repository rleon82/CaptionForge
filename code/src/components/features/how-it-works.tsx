/**
 * Sekcja How It Works — Server Component
 * 3 kroki z wizualizacjami i connector lines
 */

const STEPS = [
  {
    number: "01",
    icon: "⚙️",
    title: "Skonfiguruj generator",
    description:
      "Wybierz platformę (Instagram, TikTok, LinkedIn…), ton głosu i wpisz niszę. Podaj temat posta — jedno zdanie wystarczy.",
  },
  {
    number: "02",
    icon: "🤖",
    title: "AI generuje opisy",
    description:
      "Google Gemini 2.5 Flash analizuje Twój temat i generuje 3 unikalne warianty opisu + 10-15 hasztagów z oceną zasięgu.",
  },
  {
    number: "03",
    icon: "📋",
    title: "Kopiuj i publikuj",
    description:
      "Wybierz najlepszy wariant, skopiuj jednym kliknięciem i wklej bezpośrednio do platformy. Gotowe w 10 sekund.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-[rgb(var(--color-secondary)/0.1)] text-[rgb(var(--color-secondary))]">
            Jak działa?
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Od pomysłu do gotowego opisu{" "}
            <span className="gradient-text">w 3 krokach</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] opacity-30" />

          {STEPS.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-2xl font-black text-white mb-6 relative z-10"
                style={{
                  background: "linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)))",
                }}
              >
                {step.icon}
              </div>

              {/* Step label */}
              <div className="text-xs font-bold tracking-widest text-[rgb(var(--color-text-secondary))] mb-2 uppercase">
                Krok {step.number}
              </div>

              <h3 className="font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

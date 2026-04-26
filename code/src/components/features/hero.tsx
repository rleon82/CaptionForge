/**
 * Sekcja Hero — Server Component (statyczna)
 * Nagłówek z gradientem, CTA, mockup karty, statystyki, floating badges
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgb(108 92 231 / 0.15), transparent)",
        }}
      />

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary)/0.2)]">
              <span>🚀</span>
              <span>Napędzany przez Google Gemini 2.5 Flash</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Opisy, które{" "}
              <span className="gradient-text">angażują.</span>
              <br />
              Hasztagi, które{" "}
              <span className="gradient-text">docierają.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[rgb(var(--color-text-secondary))] mb-8 max-w-lg mx-auto lg:mx-0">
              CaptionForge generuje spersonalizowane opisy i hasztagi do Twoich
              postów w <strong>10 sekund</strong> — dopasowane do platformy,
              tonu i niszy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <a href="#generator" className="btn-primary text-lg px-8 py-4">
                ✨ Generuj za darmo
              </a>
              <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
                Jak to działa?
              </a>
            </div>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              {[
                { value: "10K+", label: "Twórców" },
                { value: "500K+", label: "Opisów" },
                { value: "5", label: "Platform" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[rgb(var(--color-text-secondary))]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mockup card */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="card p-6 shadow-2xl animate-float">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)))",
                    }}
                  >
                    ✍️
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      Instagram · Inspirujący
                    </div>
                    <div className="text-xs text-[rgb(var(--color-text-secondary))]">
                      Nisza: fitness
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[rgb(var(--color-text-primary))] mb-4 leading-relaxed">
                  ✨ Każdy poranek to nowa szansa na bycie lepszą wersją siebie.
                  Dziś wstałam o 6:00, by zadbać o siebie — i to uczucie jest
                  nieocenione 💪
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { tag: "#fitness", badge: "🔥" },
                    { tag: "#motivation", badge: "📈" },
                    { tag: "#lifestyle", badge: "🎯" },
                  ].map((h) => (
                    <span
                      key={h.tag}
                      className="text-xs px-2 py-1 rounded-full bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]"
                    >
                      {h.badge} {h.tag}
                    </span>
                  ))}
                </div>

                <button className="w-full btn-primary text-sm py-2">
                  📋 Kopiuj opis
                </button>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 card px-3 py-2 text-xs font-semibold shadow-lg">
                🎯 Ton głosu dopasowany
              </div>
              <div className="absolute -bottom-4 -right-4 card px-3 py-2 text-xs font-semibold shadow-lg text-[rgb(var(--color-secondary))]">
                +47% zasięgów 📈
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

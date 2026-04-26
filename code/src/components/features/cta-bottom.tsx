/**
 * CTA Bottom — Server Component
 * Finalne wezwanie do akcji przed stopką
 */
export function CtaBottom() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div
          className="rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)))",
          }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Zacznij generować opisy już teraz
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl mx-auto">
              Bez rejestracji. Bez karty kredytowej.{" "}
              <strong>Pierwsze opisy gotowe w 10 sekund.</strong>
            </p>
            <a
              href="#generator"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-xl bg-white text-[rgb(var(--color-primary))] hover:bg-opacity-90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl"
            >
              ✨ Wypróbuj za darmo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

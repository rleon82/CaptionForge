"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const FAQ_ITEMS = [
  {
    question: "Czy CaptionForge jest darmowy?",
    answer:
      "Tak! Możesz generować opisy bez rejestracji i bez karty kredytowej. W przyszłości wprowadzimy plan Pro z nieograniczonymi generacjami i dodatkowymi funkcjami.",
  },
  {
    question: "Jak dobre są opisy generowane przez AI?",
    answer:
      "CaptionForge używa Google Gemini 2.0 Flash Lite — jednego z najszybszych modeli AI do generowania tekstu. Opisy są dopasowane do wybranej platformy, tonu głosu i Twojej niszy. Zazwyczaj wymagają minimalnej edycji lub można je użyć bezpośrednio.",
  },
  {
    question: "Skąd pochodzą hasztagi?",
    answer:
      "Hasztagi są generowane przez AI na podstawie Twojej niszy i tematu posta. Każdy hasztag jest oznaczony poziomem zasięgu: 🔥 duży (1M+), 📈 średni (100K-1M), 🎯 niszowy (<100K) — dając Ci strategiczny mix zamiast strzału w ciemno.",
  },
  {
    question: "Czy mogę używać CaptionForge do wielu kont?",
    answer:
      "Oczywiście! Nie ma żadnych ograniczeń co do liczby kont. Każde generowanie jest niezależne — możesz przełączać platformy i tone of voice dla różnych klientów lub projektów.",
  },
] as const;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-[rgb(var(--color-surface-secondary))]">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-[rgb(var(--color-primary)/0.1)] text-[rgb(var(--color-primary))]">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Najczęstsze pytania
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    "ml-4 flex-shrink-0 transition-transform duration-300 text-[rgb(var(--color-primary))]",
                    openIndex === i && "rotate-180"
                  )}
                >
                  ▾
                </span>
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === i ? "max-h-64 pb-6" : "max-h-0"
                )}
              >
                <p className="px-6 text-sm text-[rgb(var(--color-text-secondary))] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

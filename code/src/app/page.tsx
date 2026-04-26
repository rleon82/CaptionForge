/**
 * Strona główna CaptionForge — Server Component
 * Składa wszystkie sekcje landing page + generator.
 *
 * Hierarchia Server/Client:
 * - Navbar, Hero, FeaturesGrid, HowItWorks, CtaBottom, Footer → Server Components
 * - FAQ, GeneratorSection, HistoryPanel → Client Components (importowane tutaj)
 */
import { Navbar } from "@/components/features/navbar";
import { Hero } from "@/components/features/hero";
import { FeaturesGrid } from "@/components/features/features-grid";
import { HowItWorks } from "@/components/features/how-it-works";
import { GeneratorSection } from "@/components/features/generator/generator-section";
import { FAQ } from "@/components/features/faq";
import { CtaBottom } from "@/components/features/cta-bottom";
import { Footer } from "@/components/features/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
        {/* Generator + Historia — wewnętrznie Client */}
        <GeneratorSection />
        {/* Historia pojawia się po wygenerowaniu — renderowana wewnątrz GeneratorSection */}
        <FAQ />
        <CtaBottom />
      </main>
      <Footer />
    </>
  );
}

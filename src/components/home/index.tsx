import BackgroundGrid from "@/components/ui/background-grid"
import {
  HeroSection,
  AboutSection,
  FeaturesSection,
  FAQSection,
} from "./sections"

export function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-[900px] overflow-hidden pointer-events-none">
        <BackgroundGrid />
      </div>

      {/* ── Sections ───────────────────────────────────────────────  */}
      <HeroSection />
      <AboutSection />

      <div id="features">
        <FeaturesSection />
      </div>

      {/* <FAQSection /> */}
    </div>
  )
}

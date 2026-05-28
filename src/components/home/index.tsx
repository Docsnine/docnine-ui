import BackgroundGrid from "@/components/ui/background-grid"
import { NoiseOverlay } from "@/components/ui/noise-overlay"
import {
  HeroSection,
  AboutSection,
  FeaturesSection,
  FAQSection,
} from "./sections"

export function HomePage() {
  return (
    <div className="relative">
      {/* ── Page-level structural grid ─────────────────────────────
          Spans the full hero + about area, fades out at the bottom.   */}
      <div className="absolute inset-x-0 top-0 h-[900px] overflow-hidden pointer-events-none">
        <BackgroundGrid />
      </div>

      {/* ── Sections ───────────────────────────────────────────────  */}
      <HeroSection />
      <AboutSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <FAQSection />
    </div>
  )
}

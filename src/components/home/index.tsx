import BackgroundGrid from "@/components/ui/background-grid"
import {
  HeroSection,
  AboutSection,
  FeaturesSection,
  FAQSection,
} from "./sections"

export function HomePage() {
  return (
    <div>
      {/* Subtle grid background for hero area */}
      <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden pointer-events-none">
        <BackgroundGrid />
      </div>

      {/* Soft green glow */}
      <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />

      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <div id="features">
        <FeaturesSection />
      </div>
      {/* <PricingSection /> */}
      <FAQSection />
    </div>
  )
}

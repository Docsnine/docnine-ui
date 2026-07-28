import {
  HeroSection,
  AboutSection,
  FeaturesSection,
} from "./sections"

export function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <AboutSection />
      <div id="features">
        <FeaturesSection />
      </div>
    </div>
  )
}

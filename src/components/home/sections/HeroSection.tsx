import { Button } from "@/components/ui/button"
import { ArrowRight, Play, FileText, ShieldCheck, Database, PackageOpen, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import type { LucideIcon } from "lucide-react"
import { NoiseOverlay } from "@/components/ui/noise-overlay"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(".hero-headline", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.15,
      })
      gsap.from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      })
      gsap.from(".hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.6,
      })
      gsap.from(".floating-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
        delay: 0.3,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative z-10 overflow-hidden pt-12 pb-8 px-4">
      <NoiseOverlay opacity={0.22} blendMode="overlay" />
      <NoiseOverlay opacity={0.12} blendMode="soft-light" className="[background-size:150px_150px]" />

      <div className="container mx-auto max-w-6xl relative min-h-[520px] sm:min-h-[560px] md:min-h-[600px]">

        {/* ── Hero Content ────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center text-center pt-20 pb-12 relative z-10">
          {/* Headline */}
          <h1 className="hero-headline text-[40px] leading-[1.05] sm:text-[56px] md:text-[72px] font-extrabold tracking-[-0.03em] mb-6 max-w-4xl">
            <span className="text-foreground">Generate Your </span>
            <br className="hidden sm:block" />
            <span className="text-foreground">Smart </span>
            <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent">Documentation</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text text-transparent">Partners </span>
            <span className="text-foreground">From Today</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
            Empower your dev team with AI-driven tools to scan, generate, and maintain top-tier documentation effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center gap-4">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-13 text-base font-semibold transition-all"
            >
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white dark:bg-card border-border text-foreground hover:bg-muted rounded-full px-8 h-13 text-base font-semibold"
            >
              <a href="https://github.com/Docsnine" target="_blank" rel="noreferrer">
                <Play className="mr-2 h-4 w-4 fill-current" /> Watch Demo
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

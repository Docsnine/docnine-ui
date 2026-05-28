import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { NoiseOverlay } from "@/components/ui/noise-overlay"

const HERO_IMAGE = "https://images.unsplash.com/photo-1668181736908-0d86519cc01a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

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
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative z-10 overflow-hidden pt-12 pb-8 px-4">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${HERO_IMAGE}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <NoiseOverlay opacity={1} blendMode="overlay" />
      <NoiseOverlay opacity={1} blendMode="soft-light" className="[background-size:150px_150px]" />

      <div className="container mx-auto max-w-6xl relative z-10 min-h-[500px] sm:min-h-[540px] md:min-h-[580px]">
        <div className="flex flex-col items-center justify-center text-center pt-20 pb-12">

          {/* Headline — white over the dark image */}
          <h1 className="hero-headline text-[38px] leading-[1.05] sm:text-[54px] md:text-[70px] font-extrabold tracking-[-0.03em] mb-6 max-w-4xl text-background">
            Generate Your{" "}
            <br className="hidden sm:block" />
            Smart{" "}
            <span className="bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
              Documentation
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
              Partners{" "}
            </span>
            From Today
          </h1>

          {/* Subheadline */}
          <p className="hero-sub max-w-2xl text-base md:text-lg text-white/65 leading-relaxed mb-10">
            Empower your dev team with AI-driven tools to scan, generate, and maintain
            top-tier documentation effortlessly.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center gap-4">
            <Button
              asChild
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-12 text-base font-semibold shadow-[0_0_32px_rgba(13,148,136,0.45)] transition-all"
            >
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full px-8 h-12 text-base font-semibold transition-all"
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

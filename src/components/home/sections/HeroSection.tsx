import { Button } from "@/components/ui/button"
import { ArrowRight, Play, FileText, ShieldCheck, Database, PackageOpen, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import type { LucideIcon } from "lucide-react"

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      y: -12,
      duration: 2.5 + delay * 0.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay,
    })
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

function FeatureCard({ Icon, title, subtitle, badge, className }: { Icon: LucideIcon; title: string; subtitle: string; badge?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 bg-white dark:bg-card rounded-3xl border border-border px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)] ${className || ""}`}>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4.5 h-4.5 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        {badge && <span className="inline-block mt-1 text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">{badge}</span>}
      </div>
    </div>
  )
}

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
      <div className="container mx-auto max-w-6xl relative min-h-[520px] sm:min-h-[560px] md:min-h-[600px]">
        {/* ── Floating User Cards ────────────────────────────── */}
        {/* Top-left: API Docs */}
        <FloatingCard className="floating-card hidden lg:block absolute -left-0 top-6 z-20" delay={0}>
          <FeatureCard Icon={FileText} title="API Documentation" subtitle="Auto-generated from code" badge="Instant" />
        </FloatingCard>

        {/* Bottom-left: Security */}
        <FloatingCard className="floating-card hidden lg:block absolute -left-0 bottom-36 z-20" delay={0.8}>
          <FeatureCard Icon={ShieldCheck} title="Security Audit" subtitle="Vulnerability scanning" badge="AI-Powered" />
        </FloatingCard>

        {/* Top-right: Schema */}
        <FloatingCard className="floating-card hidden lg:block absolute -right-0 top-10 z-20" delay={0.4}>
          <FeatureCard Icon={Database} title="Schema Analysis" subtitle="Database & model docs" />
        </FloatingCard>

        {/* Bottom-right: Export */}
        <FloatingCard className="floating-card hidden lg:block absolute -right-0 bottom-40 z-20" delay={1.0}>
          <FeatureCard Icon={PackageOpen} title="Smart Exports" subtitle="Markdown, Postman & more" />
        </FloatingCard>

        {/* ── Center Floating App Card (like template) ───── */}
        <FloatingCard className="floating-card hidden lg:block absolute -right-40 top-40 -translate-x-1/2 z-30" delay={0.5}>
          <div className="bg-white dark:bg-card rounded-3xl border border-border px-5 py-4 w-[220px] shadow-[0_2px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">docnine/scan</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center"><Zap className="w-4 h-4 text-primary" /></div>
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">Repo Scanned</p>
                <p className="text-xs text-muted-foreground leading-tight">12 endpoints found</p>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-foreground">98%</span>
              <span className="text-[10px] text-muted-foreground">coverage</span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-primary/20">
              <div className="h-full w-[98%] rounded-full bg-primary" />
            </div>
          </div>
        </FloatingCard>

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

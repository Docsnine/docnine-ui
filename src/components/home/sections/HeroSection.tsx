import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { PremiumGreenBackdrop } from "@/components/ui/premium-green-backdrop"
import { HeroProductMockup } from "./HeroProductMockup"
import { API_BASE } from "@/lib/api"

function startGoogleOAuth() {
  window.location.href = `${API_BASE}/auth/google/start`
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.08,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative z-10 overflow-hidden min-h-[min(100dvh-3.5rem,920px)] sm:min-h-[min(100dvh-4rem,920px)]"
    >
      <PremiumGreenBackdrop grain="subtle" />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full text-primary/25 dark:text-teal-300/25"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path d="M420 40C620 160 760 280 880 460C1000 640 1180 760 1440 900" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
        <path d="M280 120C520 220 700 360 820 540C940 720 1160 820 1440 900" stroke="currentColor" strokeWidth="1.75" opacity="1" />
        <path d="M520 0C700 140 820 280 920 480C1040 700 1240 800 1440 900" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
        <path d="M180 220C460 300 660 440 780 620C880 760 1100 840 1380 900" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
        <path d="M600 60C780 180 900 320 1000 520C1100 700 1280 820 1440 900" stroke="currentColor" strokeWidth="1.25" opacity="0.4" />
        <path d="M80 340C360 400 580 520 720 680C840 800 1080 860 1320 900" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
        <path d="M340 0C560 100 720 240 840 440C960 640 1180 780 1440 900" stroke="currentColor" strokeWidth="1.35" opacity="0.5" />
      </svg>

      <div className="relative z-10 mx-auto grid min-h-[inherit] w-full max-w-6xl grid-cols-1 px-4 sm:px-6 lg:grid-cols-2 lg:items-stretch lg:gap-8 lg:px-6 xl:gap-10">
        <div className="relative z-20 flex flex-col justify-center py-12 sm:py-14 lg:justify-start lg:pb-16 lg:pt-20 xl:pt-24 2xl:pt-28">
          <div className="w-full max-w-xl text-left lg:max-w-md xl:max-w-xl">
            <div className="hero-reveal mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-3 py-1.5 text-[11px] backdrop-blur-sm sm:mb-6 sm:text-[12px] dark:border-white/12 dark:bg-white/[0.04]">
              <span className="text-muted-foreground">Seablings Technology</span>
            </div>

            <h1 className="hero-reveal text-hero mb-4 text-foreground sm:mb-5">
              Docs that stay in sync with your Infrastructure
            </h1>

            <p className="hero-reveal mb-7 max-w-md text-[14px] leading-relaxed text-muted-foreground sm:mb-9 sm:text-[15px] md:text-base">
              Connect a repo, generate clear documentation, and keep every page up to date as your
              team ships , without rewriting everything by hand.
            </p>

            <div className="hero-reveal flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                asChild
                className="h-11 w-full rounded-lg bg-foreground px-5 text-[14px] font-semibold text-background hover:bg-foreground/90 sm:w-auto"
              >
                <Link to="/signup">
                  Get started <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={startGoogleOAuth}
                className="h-11 w-full rounded-lg border-border bg-background/40 px-5 text-[14px] font-medium text-foreground hover:bg-muted sm:w-auto dark:border-white/15 dark:bg-transparent dark:hover:bg-white/8"
              >
                <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4 shrink-0" aria-hidden>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign up with Google
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="hero-reveal relative h-[240px] w-full overflow-hidden sm:h-[300px] md:h-[360px] lg:hidden">
          <div className="absolute inset-0 overflow-hidden">
            <HeroProductMockup flush />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--hero-surface)] to-transparent"
          />
        </div>

        {/* Desktop: clipped to the right column , bleeds right only, never into copy */}
        <div className="hero-reveal pointer-events-none relative hidden min-h-full lg:block">
          <div className="absolute bottom-0 left-0 top-20 overflow-hidden xl:top-24 2xl:top-28 right-[calc(-1*(1.5rem+max(0px,(100vw-72rem)/2)))]">
            <HeroProductMockup flush />
          </div>
        </div>
      </div>
    </section>
  )
}

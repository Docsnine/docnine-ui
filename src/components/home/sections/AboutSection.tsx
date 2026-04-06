import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target: number, suffix: string = "") {
    const ref = useRef<HTMLSpanElement>(null)
    const triggered = useRef(false)

    useEffect(() => {
        if (!ref.current) return
        const el = ref.current

        ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            onEnter: () => {
                if (triggered.current) return
                triggered.current = true
                gsap.fromTo(
                    { val: 0 },
                    { val: target },
                    {
                        duration: 2,
                        ease: "power2.out",
                        onUpdate() {
                            const current = Math.round(gsap.getProperty(this.targets()[0], "val") as number)
                            el.textContent = current.toLocaleString() + suffix
                        },
                    }
                )
            },
        })
    }, [target, suffix])

    return ref
}

export function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const usersRef = useCountUp(3, "k")
    const companiesRef = useCountUp(20, "+")

    useEffect(() => {
        if (!sectionRef.current) return
        const ctx = gsap.context(() => {
            gsap.from(".about-text", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.15,
            })
            gsap.from(".stat-card", {
                scrollTrigger: {
                    trigger: ".stat-card",
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: "power4.out",
                stagger: 0.2,
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="relative z-10 py-24 px-4 bg-secondary">
            <div className="container mx-auto max-w-6xl">
                {/* Section Tag */}
                <p className="about-text font-mono text-sm text-primary mb-6">// About Our Platform //</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Text Content */}
                    <div>
                        <h2 className="about-text text-[36px] leading-[1.1] sm:text-[44px] font-extrabold tracking-[-0.02em] text-foreground mb-6">
                            Transform Your Documentation Process With{" "}
                            <span className="text-muted-foreground">Smarter, Faster, AI-Driven Technology</span>
                        </h2>
                        <p className="about-text text-lg text-muted-foreground leading-relaxed mb-8">
                            From scanning to generation, our platform streamlines every step. Ship confidently with docs that stay accurate and up to date.
                        </p>
                        <Button
                            asChild
                            className="about-text bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 h-11 text-sm font-semibold"
                        >
                            <a href="https://github.com/Docsnine" target="_blank" rel="noreferrer">
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>

                    {/* Right: Stats Cards */}
                    <div className="space-y-6">
                        <div className="stat-card bg-white dark:bg-card rounded-3xl border border-border p-8">
                            <h3 className="text-[36px] sm:text-[48px] leading-none font-extrabold tracking-[-0.02em] text-foreground mb-2">
                                <span ref={usersRef}>0</span> <span className="text-muted-foreground text-[24px] sm:text-[36px]">Users</span>
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Developers and tech writers trust our tools to simplify documentation and reduce time-to-ship.
                            </p>
                        </div>
                        <div className="stat-card bg-white dark:bg-card rounded-3xl border border-border p-8">
                            <h3 className="text-[36px] sm:text-[48px] leading-none font-extrabold tracking-[-0.02em] text-foreground mb-2">
                                <span ref={companiesRef}>0</span> <span className="text-muted-foreground text-[24px] sm:text-[36px]">Companies</span>
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Join forward-thinking companies building better docs through structured, AI-driven documentation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

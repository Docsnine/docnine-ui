import React, { useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, Rocket, Bot, RefreshCw, FileText, ShieldCheck, Layers } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return
        const ctx = gsap.context(() => {
            gsap.from(".cta-content", {
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power4.out",
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative z-10 py-24 px-4 bg-secondary">
            <div className="container mx-auto max-w-6xl">
                <div className="cta-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side */}
                    <div>
                        <h2 className="text-[32px] leading-[1.1] sm:text-[44px] font-extrabold tracking-[-0.02em] text-foreground mb-6">
                            Simplify Your Documentation<br />
                            And <span className="text-muted-foreground">Maximize Results</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            Streamline your entire documentation process with intelligent AI tools designed to help you make better decisions.
                        </p>
                        <Button
                            asChild
                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-12 text-sm font-semibold shadow-[0_4px_24px_rgba(7,74,81,0.3)]"
                        >
                            <Link to="/signup">
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Right Side - Feature Cards (staggered wave) */}
                    <div className="grid grid-cols-2 gap-3">
                        {([
                            { Icon: Rocket, title: "One-Click Generation", desc: "Docs ready in seconds", rotate: "" },
                            { Icon: Bot, title: "AI-Powered Insights", desc: "Smart analysis & suggestions", rotate: "" },
                            { Icon: RefreshCw, title: "Always In Sync", desc: "Auto-updates with your code", rotate: "rotate-[5deg]" },
                            { Icon: FileText, title: "API Documentation", desc: "Auto-generated from code", rotate: "-rotate-[5deg]" },
                            { Icon: ShieldCheck, title: "Security Audits", desc: "Vulnerability scanning built-in", rotate: "" },
                            { Icon: Layers, title: "Multi-Format Export", desc: "Markdown, Postman & more", rotate: "" },
                        ] as { Icon: LucideIcon; title: string; desc: string; rotate: string }[]).map((item) => {
                            const accent = item.rotate !== ""
                            return (
                            <div
                                key={item.title}
                                className={`flex items-center gap-3 ${accent ? "bg-primary dark:bg-primary border-primary/60" : "bg-white dark:bg-card border-border"} rounded-2xl border px-4 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.2)] ${item.rotate}`}
                            >
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${accent ? "bg-white/20" : "bg-gradient-to-br from-primary/30 to-primary/10"}`}>
                                    <item.Icon className={`w-4 h-4 ${accent ? "text-white" : "text-primary"}`} />
                                </div>
                                <div>
                                    <p className={`text-sm font-semibold ${accent ? "text-white" : "text-foreground"}`}>{item.title}</p>
                                    <p className={`text-xs ${accent ? "text-white/70" : "text-muted-foreground"}`}>{item.desc}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

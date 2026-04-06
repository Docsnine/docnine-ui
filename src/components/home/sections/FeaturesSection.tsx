import { useEffect, useRef } from "react"
import { FileText, Users, MessageSquare } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
    {
        icon: FileText,
        title: "Easy To Scan Repos",
        description: "Scan and generate doc structures in minutes. Docnine automatically extracts APIs, schemas, and components.",
        accent: true,
        mockup: "scan" as const,
    },
    {
        icon: Users,
        title: "Manage & Export Docs",
        description: "View, edit, and share your generated docs. Export to PDF, Markdown, Postman, Notion, and more.",
        accent: false,
        mockup: "pipeline" as const,
    },
    {
        icon: MessageSquare,
        title: "Chat With Codebase",
        description: "Ask questions directly to your code. Get accurate, context-aware answers in real-time.",
        accent: false,
        mockup: "chat" as const,
    },
]

/* ── Mockup for Card 1 (accent): Scan result card ─────────────── */
function ScanMockup() {
    return (
        <div className="mt-8 rounded-2xl bg-white/10 h-56 flex items-end justify-center overflow-hidden">
            <div className="w-[90%] h-48 rounded-t-xl border-t border-x border-white/20 bg-white/5 p-4 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-white">D9</div>
                    <div>
                        <p className="text-sm font-semibold text-white leading-tight">API Endpoint Scan</p>
                        <p className="text-[11px] text-white/50">docnine/scanner</p>
                    </div>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-lg font-extrabold text-white">42</span>
                    <span className="text-xs text-white/60">endpoints found</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 mb-1">
                    <div className="h-full w-full rounded-full bg-primary" />
                </div>
                <p className="text-[10px] text-primary font-semibold">Scan complete</p>
                <div className="mt-auto flex flex-col gap-1.5">
                    <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                    <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                </div>
            </div>
        </div>
    )
}

/* ── Mockup for Card 2: Doc tabs with export ──────────────────── */
function PipelineMockup() {
    return (
        <div className="mt-8 rounded-2xl bg-secondary h-56 flex items-end justify-center overflow-hidden">
            <div className="w-[90%] h-48 rounded-t-xl border-t border-x border-border bg-white dark:bg-card p-4 flex flex-col gap-2">
                {/* Tab bar */}
                <div className="flex gap-1 mb-2">
                    <span className="text-[9px] font-semibold text-primary bg-primary/10 rounded-md px-2 py-0.5">README</span>
                    <span className="text-[9px] font-medium text-muted-foreground bg-secondary dark:bg-muted rounded-md px-2 py-0.5">API</span>
                    <span className="text-[9px] font-medium text-muted-foreground bg-secondary dark:bg-muted rounded-md px-2 py-0.5">Schema</span>
                    <span className="text-[9px] font-medium text-muted-foreground bg-secondary dark:bg-muted rounded-md px-2 py-0.5">Security</span>
                </div>
                {/* Doc preview area */}
                <div className="flex-1 flex flex-col gap-1.5">
                    <div className="h-1.5 w-3/4 rounded-full bg-muted-foreground/20" />
                    <div className="h-1.5 w-full rounded-full bg-muted-foreground/20" />
                    <div className="h-1.5 w-2/3 rounded-full bg-muted-foreground/20" />
                    <div className="h-1.5 w-5/6 rounded-full bg-muted-foreground/20" />
                </div>
                {/* Export bar */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-border">
                    <span className="text-[8px] text-muted-foreground font-medium">Export:</span>
                    <span className="text-[8px] bg-secondary dark:bg-muted rounded px-1.5 py-0.5 text-muted-foreground">PDF</span>
                    <span className="text-[8px] bg-secondary dark:bg-muted rounded px-1.5 py-0.5 text-muted-foreground">MD</span>
                    <span className="text-[8px] bg-secondary dark:bg-muted rounded px-1.5 py-0.5 text-muted-foreground">Postman</span>
                    <span className="text-[8px] bg-secondary dark:bg-muted rounded px-1.5 py-0.5 text-muted-foreground">Notion</span>
                </div>
            </div>
        </div>
    )
}

/* ── Mockup for Card 3: Chat / AI response ─────────────────────── */
function ChatMockup() {
    return (
        <div className="mt-8 rounded-2xl bg-secondary h-56 flex items-end justify-center overflow-hidden">
            <div className="w-[90%] h-48 rounded-t-xl border-t border-x border-border bg-white dark:bg-card p-4 flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <div className="self-end rounded-xl rounded-br-sm bg-primary px-3 py-1.5 max-w-[80%]">
                        <p className="text-[10px] text-primary-foreground">How does the auth middleware work?</p>
                    </div>
                    <div className="self-start rounded-xl rounded-bl-sm bg-secondary dark:bg-muted px-3 py-1.5 max-w-[85%]">
                        <p className="text-[10px] text-foreground leading-relaxed">The auth middleware validates JWT tokens and attaches the user object to the request…</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                    <div className="flex-1 h-6 rounded-full bg-secondary dark:bg-muted px-3 flex items-center">
                        <span className="text-[9px] text-muted-foreground">Ask about your codebase…</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-[10px] text-primary-foreground font-bold">→</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function FeaturesSection() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const ctx = gsap.context(() => {
            gsap.from(".features-heading", {
                scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
            })
        }, ref)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={ref} className="relative z-10 py-24 px-4 bg-background">
            <div className="container mx-auto max-w-6xl text-center">
                {/* Section Tag */}
                <div className="features-heading">
                    <p className="font-mono text-sm text-primary mb-4">// Our Features //</p>

                    <h2 className="text-[36px] leading-[1.1] sm:text-[48px] font-extrabold tracking-[-0.02em] text-foreground mb-4 max-w-3xl mx-auto">
                        Streamline Your Documentation Workflow{" "}
                        <span className="text-muted-foreground">From Start To Finish</span>
                    </h2>
                </div>

                {/* Feature Cards Grid */}
                <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={i}
                                className={`feature-card group relative rounded-3xl border border-border p-8 text-left transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 ${feature.accent
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-white dark:bg-card"
                                    }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.accent
                                        ? "bg-white/20"
                                        : "bg-secondary"
                                        }`}
                                >
                                    <Icon className={`w-6 h-6 ${feature.accent ? "text-white" : "text-primary"}`} />
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${feature.accent ? "text-white" : "text-foreground"}`}>
                                    {feature.title}
                                </h3>
                                <p className={`leading-relaxed text-sm ${feature.accent ? "text-white" : "text-muted-foreground"}`}>
                                    {feature.description}
                                </p>

                                {/* Detailed mockup area */}
                                {feature.mockup === "scan" && <ScanMockup />}
                                {feature.mockup === "pipeline" && <PipelineMockup />}
                                {feature.mockup === "chat" && <ChatMockup />}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

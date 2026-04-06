import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { billingApi } from "@/lib/api"
import { BillingPlan } from "@/types/BillingTypes"

gsap.registerPlugin(ScrollTrigger)

/* Fallback plans shown when the API is unreachable — must match server/config/plans.js */
const FALLBACK_PLANS: BillingPlan[] = [
    {
        id: "free",
        name: "Free",
        tagline: "Solo devs exploring the platform.",
        prices: { monthly: 0, annual: 0, annualTotal: null, savingsPercent: 0 },
        limits: { projects: 2, seats: 1, extraSeatPriceMonthly: null, attachmentsPerProject: 3, maxFileSizeMb: 5, aiChatsPerMonth: 0, portals: 0, versionHistoryDays: 0, exportFormats: [] },
        features: { shareViewOnly: false, shareEdit: false, maxShares: 0, archiveRestore: false, customDomain: false, docApproval: false, progressTracker: false, openApiImporter: false, apiWebhookAccess: false, githubSync: false },
    },
    {
        id: "starter",
        name: "Starter",
        tagline: "Freelancers & solo developers who need unlimited projects and exports.",
        prices: { monthly: 10.89, annual: 8.82, annualTotal: 105.84, savingsPercent: 19 },
        limits: { projects: null, seats: 1, extraSeatPriceMonthly: null, attachmentsPerProject: null, maxFileSizeMb: 20, aiChatsPerMonth: 0, portals: 1, versionHistoryDays: 30, exportFormats: ["pdf"] },
        features: { shareViewOnly: true, shareEdit: false, maxShares: 5, archiveRestore: true, customDomain: false, docApproval: false, progressTracker: true, openApiImporter: false, apiWebhookAccess: false, githubSync: false },
    },
]

export function PricingSection() {
    const ref = useRef<HTMLDivElement>(null)
    const [plans, setPlans] = useState<BillingPlan[]>([])
    const [loading, setLoading] = useState(true)

    /* ── Fetch plans from the API ──────────────────────────────────────── */
    useEffect(() => {
        billingApi
            .getPlans()
            .then((res) => setPlans(res.plans))
            .catch(() => setPlans(FALLBACK_PLANS))
            .finally(() => setLoading(false))
    }, [])

    /* ── GSAP entrance animation ───────────────────────────────────────── */
    useEffect(() => {
        if (!ref.current || loading) return
        const ctx = gsap.context(() => {
            gsap.from(".pricing-heading", {
                scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
            })
        }, ref)
        return () => ctx.revert()
    }, [loading])

    /* Pick the two plans to display: first non-highlighted + first highlighted.
       If the API returns plan IDs like "free", "starter", "pro", "team",
       we show the first two that make sense, always highlighting the second. */
    const displayPlans = plans.length >= 2
        ? [plans[0], plans.find((p) => p.id === "pro" || p.id === "starter") ?? plans[1]]
        : plans

    /* Determine which plan gets the accent (enterprise/highlighted) card */
    const accentId = displayPlans.length >= 2 ? displayPlans[1].id : null

    /* Build a flat feature list from the plan's limits & features */
    function buildFeatures(plan: BillingPlan): string[] {
        const list: string[] = []
        if (plan.limits.projects === null) list.push("Unlimited projects")
        else list.push(`${plan.limits.projects} projects`)

        if (plan.limits.aiChatsPerMonth === null) list.push("Unlimited AI chats")
        else if (plan.limits.aiChatsPerMonth > 0) list.push(`${plan.limits.aiChatsPerMonth} AI chats/month`)

        if (plan.features.githubSync) list.push("GitHub sync")
        if (plan.features.openApiImporter) list.push("OpenAPI importer")
        if (plan.features.customDomain) list.push("Custom domain")
        if (plan.features.docApproval) list.push("Doc approval workflow")
        if (plan.features.apiWebhookAccess) list.push("API & webhook access")
        if (plan.limits.portals !== null && plan.limits.portals > 0) list.push(`${plan.limits.portals} portals`)
        else if (plan.limits.portals === null) list.push("Unlimited portals")

        return list.slice(0, 6)
    }

    return (
        <section ref={ref} className="relative z-10 py-24 px-4 bg-background">
            <div className="container mx-auto max-w-5xl text-center">
                {/* Section Tag */}
                <div className="pricing-heading">
                <p className="font-mono text-sm text-primary mb-4">// Our Pricing //</p>

                <h2 className="text-[32px] leading-[1.1] sm:text-[44px] font-extrabold tracking-[-0.02em] text-foreground mb-4">
                    Flexible Plans That Scale<br />
                    With <span className="text-muted-foreground">Your Documentation Goals</span>
                </h2>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
                    </div>
                )}

                {/* Pricing Cards */}
                {!loading && displayPlans.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
                        {displayPlans.map((plan) => {
                            const isAccent = plan.id === accentId
                            const price = plan.prices.monthly
                            const features = buildFeatures(plan)

                            return (
                                <div
                                    key={plan.id}
                                    className={`pricing-card rounded-3xl border p-8 text-left transition-all ${isAccent
                                            ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_40px_rgba(7,74,81,0.15)]"
                                            : "border-border bg-white dark:bg-card"
                                        }`}
                                >
                                    {/* Plan badge */}
                                    <div
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4 ${isAccent
                                                ? "bg-white/20 text-white"
                                                : "bg-secondary text-muted-foreground"
                                            }`}
                                    >
                                        ● {plan.name}
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1 mb-3">
                                        <span className="text-[40px] font-extrabold">
                                            {price === 0 ? "Free" : `$${price}`}
                                        </span>
                                        {price > 0 && (
                                            <span className={`text-lg ${isAccent ? "text-white/70" : "text-muted-foreground"}`}>
                                                USD /Month
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm mb-6 ${isAccent ? "text-white/70" : "text-muted-foreground"}`}>
                                        {plan.tagline}
                                    </p>

                                    {/* CTA */}
                                    <Button
                                        asChild
                                        className={`w-full rounded-full h-11 font-semibold mb-8 ${isAccent
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                : "bg-foreground text-background hover:bg-foreground/90"
                                            }`}
                                    >
                                        <Link to="/signup">Signup Now</Link>
                                    </Button>

                                    {/* Feature list */}
                                    <ul className="space-y-3">
                                        {features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <Check
                                                    className={`w-4 h-4 flex-shrink-0 ${isAccent ? "text-primary" : "text-primary"
                                                        }`}
                                                />
                                                <span className={`text-sm ${isAccent ? "text-white/80" : "text-muted-foreground"}`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}

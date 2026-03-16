import { differenceInDays } from "date-fns"
import { Zap, Users, Star, AlertTriangle, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSubscriptionStore, PLAN_LEVEL } from "@/store/subscription"
import { PlanBadgeProps } from "@/types/BillingTypes"
import { PLAN_COLOURS, PLAN_ICONS } from "@/configs/BillingConfig"

export function PlanBadge({ className, showStatus = true }: PlanBadgeProps) {
    const subscription = useSubscriptionStore((s) => s.subscription)

    if (!subscription) return null

    const { plan, planName, status, trialEndsAt } = subscription
    const Icon = PLAN_ICONS[plan] ?? Star
    const colourClass = PLAN_COLOURS[plan] ?? PLAN_COLOURS.free

    // Build optional status indicator
    let statusBadge: React.ReactNode = null
    if (showStatus) {
        if (status === "trialing" && trialEndsAt) {
            const daysLeft = differenceInDays(new Date(trialEndsAt), new Date())
            statusBadge = (
                <span className="ml-1.5 flex items-center gap-0.5 text-primary text-[10px] font-medium">
                    <Clock className="h-2.5 w-2.5" />
                    {daysLeft > 0 ? `${daysLeft}d` : "ends today"}
                </span>
            )
        } else if (status === "past_due") {
            statusBadge = (
                <span className="ml-1.5 flex items-center gap-0.5 text-red-400 text-[10px] font-medium">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    past due
                </span>
            )
        } else if (status === "paused") {
            statusBadge = (
                <span className="ml-1.5 text-muted-foreground text-[10px] font-medium">
                    paused
                </span>
            )
        }
    }

    return (
        <Badge
            variant="outline"
            className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                colourClass,
                className,
            )}
        >
            <Icon className="h-3 w-3" />
            {planName}
            {statusBadge}
        </Badge>
    )
}

/**
 * Headless helper — returns true if the current user's plan meets the minimum.
 * Useful for conditional rendering without the badge UI.
*/
export function usePlanCheck(minPlan: string): boolean {
    const subscription = useSubscriptionStore((s) => s.subscription)
    if (!subscription) return false
    return (PLAN_LEVEL[subscription.plan] ?? 0) >= (PLAN_LEVEL[minPlan] ?? 0)
}

import { useState, useEffect, useCallback, useRef } from "react"
import { formatDistanceToNow, format, isToday, isYesterday, isSameWeek } from "date-fns"
import { activityLogsApi } from "@/lib/api"
import { ActivityLog } from "@/types/activity-log"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  Terminal,
  Shield,
  Globe,
  Download,
  Users,
  CreditCard,
  FileText,
  Cpu,
  FileCode,
  Paperclip,
  Plug,
  FolderGit2,
  User as UserIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import TopBar from "@/components/projects/top-bar"

// ── Category icon map ────────────────────────────────────────────────────────
const CATEGORY_ICON: Record<string, React.ReactNode> = {
  auth: <UserIcon className="h-3.5 w-3.5" />,
  project: <FolderGit2 className="h-3.5 w-3.5" />,
  pipeline: <Cpu className="h-3.5 w-3.5" />,
  doc: <FileText className="h-3.5 w-3.5" />,
  security: <Shield className="h-3.5 w-3.5" />,
  apispec: <FileCode className="h-3.5 w-3.5" />,
  attachment: <Paperclip className="h-3.5 w-3.5" />,
  sharing: <Users className="h-3.5 w-3.5" />,
  portal: <Globe className="h-3.5 w-3.5" />,
  export: <Download className="h-3.5 w-3.5" />,
  integration: <Plug className="h-3.5 w-3.5" />,
  subscription: <CreditCard className="h-3.5 w-3.5" />,
  system: <AlertTriangle className="h-3.5 w-3.5" />,
}

const CATEGORY_COLOR: Record<string, string> = {
  auth: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  project: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  pipeline: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  doc: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  security: "bg-red-500/10 text-red-600 dark:text-red-400",
  apispec: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  attachment: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  sharing: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  portal: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  export: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  integration: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  subscription: "bg-green-500/10 text-green-600 dark:text-green-400",
  system: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
}

// ── Severity badge helpers ───────────────────────────────────────────────────
const SEVERITY_BADGE: Record<string, { label: string; cls: string } | undefined> = {
  warning: { label: "Warning", cls: "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20" },
  error: { label: "Error", cls: "bg-red-500/10 text-red-600 border border-red-500/20" },
  critical: { label: "Critical", cls: "bg-rose-700/10 text-rose-700 border border-rose-700/20" },
}

const SEVERITY_ROW: Record<string, string> = {
  warning: "border-l-2 border-yellow-500/40",
  error: "border-l-2 border-red-500/40",
  critical: "border-l-2 border-rose-700/60 bg-rose-500/5",
}

// ── Human-readable action labels ─────────────────────────────────────────────
function actionLabel(log: ActivityLog): string {
  const actor = log.actorName || "Someone"
  const project = log.projectName ? ` on ${log.projectName}` : ""
  const meta = (log.metadata ?? {}) as Record<string, string>

  switch (log.action) {
    // Auth
    case "AUTH_SIGNUP": return `${actor} signed up`
    case "AUTH_LOGIN": return `${actor} signed in`
    case "AUTH_LOGOUT": return `${actor} signed out`
    case "AUTH_PASSWORD_CHANGED": return `${actor} changed their password`
    case "AUTH_PASSWORD_RESET_REQUESTED": return `${actor} requested a password reset`
    case "AUTH_PASSWORD_RESET": return `${actor} reset their password`
    case "AUTH_EMAIL_VERIFIED": return `${actor} verified their email`
    // Project
    case "PROJECT_CREATED": return `${actor} created project${project}`
    case "PROJECT_DELETED": return `${actor} deleted project${project}`
    case "PROJECT_ARCHIVED": return `${actor} archived project${project}`
    case "PROJECT_RENAMED": return `${actor} renamed project${project}`
    // Pipeline
    case "PIPELINE_STARTED": return `Pipeline started${project}`
    case "PIPELINE_COMPLETED": return `Pipeline completed${project}`
    case "PIPELINE_FAILED": return `Pipeline failed${project}`
    case "PIPELINE_TIMEOUT": return `Pipeline timed out${project}`
    // Agents
    case "AGENT_STARTED": return `Agent started${project}`
    case "AGENT_COMPLETED": return `Agent completed${project}`
    case "AGENT_FAILED": return `Agent failed${project}`
    // Docs
    case "DOC_SECTION_EDITED": return `${actor} edited ${meta.section ?? "a section"}${project}`
    case "DOC_SECTION_RESET": return `${actor} reset a doc section${project}`
    case "DOC_VERSION_SNAPSHOT": return `Doc snapshot taken${project}`
    case "DOC_VERSION_RESTORED": return `Doc version restored${project}`
    // Security
    case "SECURITY_SCAN_STARTED": return `Security scan started${project}`
    case "SECURITY_SCAN_COMPLETED": return `Security scan completed${project}`
    case "SECURITY_FINDING_HIGH": return `High-severity security finding${project}`
    case "SECURITY_FINDING_CRITICAL": return `Critical security finding${project}`
    // API Spec
    case "APISPEC_UPLOADED": return `${actor} uploaded an API spec${project}`
    case "APISPEC_REANALYZED": return `API spec reanalyzed${project}`
    // Attachments
    case "ATTACHMENT_UPLOADED": return `${actor} uploaded an attachment${project}`
    case "ATTACHMENT_DELETED": return `${actor} deleted an attachment${project}`
    // Sharing
    case "SHARE_INVITE_SENT": return `${actor} invited ${meta.inviteeEmail ?? "a user"}${project}`
    case "SHARE_INVITE_ACCEPTED": return `${meta.inviteeEmail ?? "A user"} accepted an invite${project}`
    case "SHARE_MEMBER_REMOVED": return `${actor} removed ${meta.inviteeEmail ?? "a user"}${project}`
    case "SHARE_ROLE_CHANGED": return `${actor} changed ${meta.inviteeEmail ?? "a user"}'s role to ${meta.newRole ?? "a new role"}${project}`
    // Portal
    case "PORTAL_PUBLISHED": return `${actor} published portal${project}`
    case "PORTAL_UNPUBLISHED": return `${actor} unpublished portal${project}`
    case "PORTAL_SETTINGS_UPDATED": return `${actor} updated portal settings${project}`
    // Exports
    case "EXPORT_PDF": return `${actor} exported PDF${project}`
    case "EXPORT_YAML": return `${actor} exported YAML${project}`
    case "EXPORT_NOTION": return `${actor} exported to Notion${project}`
    case "EXPORT_GOOGLE_DOCS": return `${actor} exported to Google Docs${project}`
    // Integrations
    case "INTEGRATION_GITHUB_CONNECTED": return `${actor} connected GitHub`
    case "INTEGRATION_GITHUB_DISCONNECTED": return `${actor} disconnected GitHub`
    case "INTEGRATION_GITLAB_CONNECTED": return `${actor} connected GitLab`
    case "INTEGRATION_GITLAB_DISCONNECTED": return `${actor} disconnected GitLab`
    case "INTEGRATION_BITBUCKET_CONNECTED": return `${actor} connected Bitbucket`
    case "INTEGRATION_BITBUCKET_DISCONNECTED": return `${actor} disconnected Bitbucket`
    case "INTEGRATION_AZURE_CONNECTED": return `${actor} connected Azure DevOps`
    case "INTEGRATION_AZURE_DISCONNECTED": return `${actor} disconnected Azure DevOps`
    case "INTEGRATION_NOTION_CONFIGURED": return `${actor} configured Notion`
    case "INTEGRATION_NOTION_DISCONNECTED": return `${actor} disconnected Notion`
    case "INTEGRATION_SLACK_CONFIGURED": return `${actor} configured Slack`
    case "INTEGRATION_SLACK_DISCONNECTED": return `${actor} disconnected Slack`
    case "INTEGRATION_GOOGLE_CONNECTED": return `${actor} connected Google`
    case "INTEGRATION_GOOGLE_DISCONNECTED": return `${actor} disconnected Google`
    // Subscription
    case "SUBSCRIPTION_UPGRADED": return `${actor} upgraded subscription`
    case "SUBSCRIPTION_DOWNGRADED": return `${actor} downgraded subscription`
    case "SUBSCRIPTION_CANCELLED": return `${actor} cancelled subscription`
    case "SUBSCRIPTION_RENEWED": return `Subscription renewed`
    case "SUBSCRIPTION_PAYMENT_FAILED": return `Subscription payment failed`
    case "SUBSCRIPTION_TRIAL_STARTED": return `${actor} started a trial`
    case "SUBSCRIPTION_TRIAL_ENDED": return `Trial ended`
    // API Tokens
    case "API_TOKEN_CREATED": return `${actor} created an API token`
    case "API_TOKEN_REVOKED": return `${actor} revoked an API token`
    // System
    case "SYSTEM_ERROR": return `System error`
    default: return log.action.replace(/_/g, " ").toLowerCase()
  }
}

// ── Initials avatar ──────────────────────────────────────────────────────────
function Initials({ name }: { name: string }) {
  const parts = (name || "?").trim().split(/\s+/)
  const text = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : (parts[0][0] ?? "?")
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold shrink-0 select-none uppercase">
      {text}
    </span>
  )
}

// ── Date group helpers ───────────────────────────────────────────────────────
function dateGroup(d: Date): string {
  if (isToday(d)) return "Today"
  if (isYesterday(d)) return "Yesterday"
  if (isSameWeek(d, new Date(), { weekStartsOn: 1 })) return "This Week"
  return "Earlier"
}

const GROUP_ORDER = ["Today", "Yesterday", "This Week", "Earlier"]

// ── Expandable metadata panel ────────────────────────────────────────────────
function MetadataPanel({ metadata }: { metadata: Record<string, unknown> }) {
  const entries = Object.entries(metadata).filter(([, v]) => v !== undefined && v !== null)
  if (entries.length === 0) return null
  return (
    <div className="mt-2 rounded-md bg-muted/60 border border-border/50 p-3 text-xs font-mono space-y-1">
      {entries.map(([k, v]) => (
        <div key={k} className="flex gap-2 min-w-0">
          <span className="text-muted-foreground shrink-0">{k}:</span>
          <span className="text-foreground/80 break-all">{String(v)}</span>
        </div>
      ))}
    </div>
  )
}

// ── Single log entry row ─────────────────────────────────────────────────────
function LogEntry({ log }: { log: ActivityLog }) {
  const [expanded, setExpanded] = useState(false)
  const ts = new Date(log.createdAt)
  const relTime = formatDistanceToNow(ts, { addSuffix: true })
  const absTime = format(ts, "MMM d, yyyy 'at' HH:mm:ss")
  const sevBadge = SEVERITY_BADGE[log.severity]
  const rowHighlight = SEVERITY_ROW[log.severity] ?? ""
  const catColor = CATEGORY_COLOR[log.category] ?? "bg-muted text-muted-foreground"
  const catIcon = CATEGORY_ICON[log.category] ?? <Info className="h-3.5 w-3.5" />
  const hasMeta = log.metadata && Object.keys(log.metadata).length > 0

  return (
    <div className={cn("group px-4 py-3 flex items-start gap-3 hover:bg-muted/30 transition-colors", rowHighlight)}>
      {/* Category icon */}
      <span className={cn("mt-0.5 rounded-md p-1.5 shrink-0", catColor)}>
        {catIcon}
      </span>

      {/* Avatar + message */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <Initials name={log.actorName} />
          <span className="text-sm text-foreground/90 leading-6 min-w-0 wrap-break-word">
            {actionLabel(log)}
          </span>
          {sevBadge && (
            <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0", sevBadge.cls)}>
              {sevBadge.label}
            </span>
          )}
        </div>

        {/* Meta expand */}
        {hasMeta && (
          <button
            className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded
              ? <ChevronDown className="h-3 w-3" />
              : <ChevronRight className="h-3 w-3" />
            }
            {expanded ? "Hide details" : "Show details"}
          </button>
        )}
        {expanded && hasMeta && (
          <MetadataPanel metadata={log.metadata as Record<string, unknown>} />
        )}
      </div>

      {/* Timestamp */}
      <time
        dateTime={log.createdAt}
        title={absTime}
        className="text-xs text-muted-foreground shrink-0 whitespace-nowrap mt-1 cursor-default hidden sm:block"
      >
        {relTime}
      </time>
    </div>
  )
}

// ── Filter bar ───────────────────────────────────────────────────────────────
const CATEGORIES = ["auth", "project", "pipeline", "doc", "security", "apispec", "attachment", "sharing", "portal", "export", "integration", "subscription", "system"] as const
const SEVERITIES = ["info", "success", "warning", "error", "critical"] as const

// ── Main page ────────────────────────────────────────────────────────────────
export function LogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [category, setCategory] = useState("")
  const [severity, setSeverity] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const load = useCallback(async (reset = true) => {
    const targetPage = reset ? 1 : page + 1
    reset ? setLoading(true) : setLoadingMore(true)
    setError(null)
    try {
      const data = await activityLogsApi.list({
        ...(category && { category }),
        ...(severity && { severity }),
        ...(from && { from }),
        ...(to && { to }),
        page: targetPage,
        limit: 30,
      })
      setLogs((prev) => reset ? data.logs : [...prev, ...data.logs])
      setTotal(data.total)
      setPage(data.page)
      setHasMore(data.hasMore)
    } catch (err: any) {
      setError(err?.message ?? "Failed to load activity log.")
    } finally {
      reset ? setLoading(false) : setLoadingMore(false)
    }
  }, [category, severity, from, to, page])

  // Initial load + polling every 30 s
  useEffect(() => {
    load(true)
    pollingRef.current = setInterval(() => load(true), 30_000)
    return () => { if (pollingRef.current) clearInterval(pollingRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, severity, from, to])

  // Group logs by date bucket
  const grouped = logs.reduce<Record<string, ActivityLog[]>>((acc, log) => {
    const g = dateGroup(new Date(log.createdAt))
      ; (acc[g] ??= []).push(log)
    return acc
  }, {})

  return (
    <div>
      <TopBar title="Activity Log" description="Full audit trail for your workspace — auth, pipelines, exports, and more.">
        <Button
          variant="outline"
          size="sm"
          onClick={() => load(true)}
          disabled={loading}
          className="gap-2 shrink-0 rounded-2xl"
        >
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          Refresh
        </Button>
      </TopBar>

      <div className="space-y-5">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1 min-w-35">
            <Label className="text-xs text-muted-foreground">Category</Label>
            <Select
              className="h-8 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="capitalize">{c}</option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1 min-w-32.5">
            <Label className="text-xs text-muted-foreground">Severity</Label>
            <Select
              className="h-8 text-sm"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="">All severities</option>
              {SEVERITIES.map((s) => (
                <option key={s} value={s} className="capitalize">{s}</option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs text-muted-foreground">From</Label>
            <Input
              type="date"
              className="h-8 text-sm"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs text-muted-foreground">To</Label>
            <Input
              type="date"
              className="h-8 text-sm"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          {(category || severity || from || to) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-muted-foreground"
              onClick={() => { setCategory(""); setSeverity(""); setFrom(""); setTo("") }}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Summary line */}
        {!loading && total > 0 && (
          <p className="text-xs text-muted-foreground">
            Showing {logs.length} of {total} events
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-0 border border-border rounded-xl overflow-hidden divide-y divide-border/50">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-md shrink-0" />
                <Skeleton className="h-7 w-7 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-56" />
                </div>
                <Skeleton className="h-3 w-20 shrink-0" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && logs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-full bg-muted p-5 mb-5">
              <Terminal className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No activity yet</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {category || severity || from || to
                ? "No events match your current filters."
                : "Activity will appear here as you and your team use Docnine."}
            </p>
          </div>
        )}

        {/* Timeline */}
        {!loading && logs.length > 0 && (
          <div className="space-y-6">
            {GROUP_ORDER.filter((g) => grouped[g]?.length).map((group) => (
              <div key={group}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">
                  {group}
                </h3>
                <div className="border border-border rounded-xl overflow-hidden divide-y divide-border/50 bg-card">
                  {grouped[group].map((log) => (
                    <LogEntry key={log._id} log={log} />
                  ))}
                </div>
              </div>
            ))}

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => load(false)}
                  disabled={loadingMore}
                  className="rounded-2xl gap-2"
                >
                  {loadingMore && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                  Load more
                </Button>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center pb-2">
          Events are retained for 90 days.
        </p>
      </div>
    </div>
  )
}


import { useState, useRef, useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import {
  Github,
  Search,
  User,
  Settings,
  LogOut,
  TerminalIcon,
  Menu,
  ShieldAlert,
  FolderCodeIcon,
  FilesIcon,
  Bell,
  ChevronRight,
  HomeIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/store/auth"
import { useSubscriptionStore } from "@/store/subscription"
import { authApi } from "@/lib/api"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { ApplicationLogo } from "../components/common/application-logo"
import { PlanBadge } from "@/components/billing/PlanBadge"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { useNotificationStore } from "@/store/useNotificationStore"
import { NotificationPanel } from "@/components/notifications/NotificationPanel"

// ── Breadcrumb ────────────────────────────────────────────────────────────────

const ROUTE_LABELS: Record<string, string> = {
  projects: "Projects",
  documentations: "Documentations",
  logs: "Logs",
  settings: "Settings",
  profile: "Profile",
  admin: "Administration",
  billing: "Billing",
}

function useBreadcrumbs() {
  const location = useLocation()
  const segments = location.pathname.split("/").filter(Boolean)
  return segments.map((seg, i) => ({
    label: ROUTE_LABELS[seg] ?? seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }))
}

// ── Nav config ────────────────────────────────────────────────────────────────

const PRIMARY_NAV = [
  { name: "Home", href: "/home", icon: HomeIcon },
  { name: "Projects", href: "/projects", icon: FolderCodeIcon },
  { name: "Doc Sites", href: "/documentations", icon: FilesIcon },
  { name: "Logs", href: "/logs", icon: TerminalIcon },
]

const ACCOUNT_NAV = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

// ── Sidebar nav item ──────────────────────────────────────────────────────────

function NavItem({
  href,
  icon: Icon,
  label,
  isActive,
  onClick,
}: {
  href: string
  icon: React.ElementType
  label: string
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-md px-2 py-[7px] text-[14px] font-medium transition-colors",
        isActive
          ? "text-sidebar-active bg-sidebar-active-bg"
          : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-hover",
      )}
    >
      <Icon
        className={cn(
          "h-[15px] w-[15px] shrink-0 transition-colors",
          isActive
            ? "text-sidebar-active"
            : "text-sidebar-muted group-hover:text-sidebar-foreground",
        )}
      />
      {label}
    </Link>
  )
}

// ── Sidebar content ───────────────────────────────────────────────────────────

function SidebarContent({
  user,
  initials,
  location,
  onLogout,
  onClose,
}: {
  user: { name: string; email: string; role: string } | null
  initials: string
  location: ReturnType<typeof useLocation>
  onLogout: () => void
  onClose?: () => void
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Zone 1 — Workspace identity */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <ApplicationLogo link="/projects" className="!h-7" />
      </div>

      <div className="px-4 pb-3 border-b border-sidebar-border shrink-0">
        {user && (
          <div className="mt-3 flex items-center gap-2 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold select-none">
              {initials}
            </div>
            <p className="flex-1 text-[13px] font-medium text-sidebar-foreground truncate">
              {user.name}
            </p>
            <PlanBadge />
          </div>
        )}
      </div>

      <nav className="px-3 pt-4 pb-2 shrink-0">
        <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted/70 select-none">
          Workspace
        </p>
        <div className="space-y-px">
          {PRIMARY_NAV.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.name}
              isActive={location.pathname.startsWith(link.href)}
              onClick={onClose}
            />
          ))}
        </div>
      </nav>

      <div className="flex-1" />

      <div className="px-3 pt-2 pb-3 border-t border-sidebar-border shrink-0">
        <p className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted/70 select-none">
          Account
        </p>
        <div className="space-y-px">
          {ACCOUNT_NAV.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.name}
              isActive={location.pathname.startsWith(link.href)}
              onClick={onClose}
            />
          ))}

          {user?.role === "super-admin" && (
            <NavItem
              href="/admin"
              icon={ShieldAlert}
              label="Administration"
              isActive={location.pathname.startsWith("/admin")}
              onClick={onClose}
            />
          )}
        </div>

      </div>

      <div className="border-t border-sidebar-border" />

      <div className="px-3 pt-2 pb-3 border-t border-sidebar-border shrink-0">
        {/* Bottom utility row */}
        <div className="mt-2 flex items-center justify-between px-2">
          <ThemeToggle />
        </div>

        <button
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-md px-2 py-[7px] text-[14px] font-medium text-sidebar-muted hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-[15px] w-[15px] shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  )
}

// ── Layout ────────────────────────────────────────────────────────────────────

export function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user, clearAuth } = useAuthStore()
  const { load: loadSubscription, reset: resetSubscription } = useSubscriptionStore()

  useEffect(() => {
    loadSubscription()
  }, [loadSubscription])

  const searchValue = searchParams.get("q") ?? ""

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!location.pathname.startsWith("/projects")) {
      navigate(`/projects?q=${encodeURIComponent(val)}`)
      return
    }
    setSearchParams(
      (prev) => {
        if (val) prev.set("q", val)
        else prev.delete("q")
        return prev
      },
      { replace: true },
    )
  }

  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)

  const { unreadCount, fetchUnreadCount } = useNotificationStore()
  const breadcrumbs = useBreadcrumbs()

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setNotificationOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    fetchUnreadCount()
    const interval = setInterval(fetchUnreadCount, 30_000)
    return () => clearInterval(interval)
  }, [fetchUnreadCount])

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
    : "?"

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore
    } finally {
      clearAuth()
      resetSubscription()
      navigate("/login", { replace: true })
    }
  }

  const sidebarProps = {
    user: user as { name: string; email: string; role: string } | null,
    initials,
    location,
    onLogout: handleLogout,
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen overflow-hidden bg-page">

        {/* ── Desktop sidebar (always visible ≥ md) ─────────────── */}
        <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-[260px] flex-col bg-page">
          <SidebarContent {...sidebarProps} />
        </aside>

        {/* ── Mobile sidebar overlay ─────────────────────────────── */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col bg-sidebar border-r border-sidebar-border transition-transform duration-200 md:hidden",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <SidebarContent {...sidebarProps} onClose={() => setMobileSidebarOpen(false)} />
        </aside>

        {/* ── Main workspace ─────────────────────────────────────── */}

        <div className="flex flex-1 flex-col md:ml-[260px] overflow-hidden bg-workspace rounded-3xl m-2 border border-workspace-border">

          {/* Top bar */}
          <header className="flex h-12 shrink-0 items-center justify-between border-b border-workspace-border px-4 sm:px-6">

            {/* Left: hamburger (mobile) + breadcrumb */}
            <div className="flex items-center gap-2 min-w-0">
              <button
                className="md:hidden flex items-center justify-center h-7 w-7 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                onClick={() => setMobileSidebarOpen((o) => !o)}
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>

              <nav className="flex items-center gap-1 text-[13px] min-w-0" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, i) => (
                  <span key={crumb.href} className="flex items-center gap-1 min-w-0">
                    {i > 0 && (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                    )}
                    {crumb.isLast ? (
                      <span className="text-foreground font-medium truncate">{crumb.label}</span>
                    ) : (
                      <Link
                        to={crumb.href}
                        className="text-muted-foreground hover:text-foreground transition-colors truncate"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </span>
                ))}
              </nav>
            </div>

            {/* Right: search + bell + avatar */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-[9px] h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-44 lg:w-56 h-8 bg-muted/50 pl-8 text-sm border-border/60 focus-visible:ring-1 rounded-lg"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Notification bell */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setNotificationOpen((p) => !p)}
                  className="relative flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
                {notificationOpen && (
                  <NotificationPanel onClose={() => setNotificationOpen(false)} />
                )}
              </div>

              {/* Avatar + dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold ring-2 ring-transparent hover:ring-primary/30 transition-all focus:outline-none select-none"
                  title={user?.email ?? "Account"}
                >
                  {initials}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-lg border border-border bg-card shadow-xl z-50 py-1">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      <div className="mt-1.5">
                        <PlanBadge showStatus />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 py-1.5 text-sm text-muted-foreground border-b border-border">
                      <span>Theme</span>
                      <ThemeToggle />
                    </div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        handleLogout()
                      }}
                      className="flex w-full items-center justify-between gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <span>Sign out</span>
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-5 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  )
}

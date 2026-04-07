import { useState, useRef, useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { BookOpen, Github, Search, FolderKanban, User, Settings, LogOut, BookDown, TerminalIcon, Menu, X, ShieldAlert, FolderCodeIcon, FilesIcon, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/store/auth"
import { useSubscriptionStore } from "@/store/subscription"
import { authApi } from "@/lib/api"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { useTheme } from "../providers/theme-provider"
import { ApplicationLogo } from "../components/common/application-logo"
import { PlanBadge } from "@/components/billing/PlanBadge"
import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { useNotificationStore } from "@/store/useNotificationStore"
import { NotificationPanel } from "@/components/notifications/NotificationPanel"

export function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user, clearAuth } = useAuthStore()
  const { load: loadSubscription, reset: resetSubscription } = useSubscriptionStore()

  // Load subscription once when the layout mounts (user is authenticated)
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
  const { theme } = useTheme()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notificationPanelRef = useRef<HTMLDivElement>(null)

  const { unreadCount, fetchUnreadCount } = useNotificationStore()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
      if (notificationPanelRef.current && !notificationPanelRef.current.contains(e.target as Node)) {
        setNotificationPanelOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    fetchUnreadCount()
    const interval = setInterval(fetchUnreadCount, 30_000)
    return () => clearInterval(interval)
  }, [fetchUnreadCount])

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  const navLinks = [
    { name: "Projects", href: "/projects", icon: FolderCodeIcon },
    { name: "Documentations", href: "/documentations", icon: FilesIcon },
    { name: "Logs", href: "/logs", icon: TerminalIcon }
  ]

  const rightSideLinks = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch {

    } finally {
      clearAuth()
      resetSubscription()
      navigate("/login", { replace: true })
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-muted/30">
        {/* Top Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
          <div className="relative flex h-14 items-center justify-between container mx-auto max-w-7xl px-4 sm:px-6">

            {/* Left: logo + github (desktop) */}
            <div className="flex items-center gap-4">
              {/* Mobile hamburger */}
              <button
                className="md:hidden flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <ApplicationLogo link="/projects" className="!h-7" />

              <div className="h-4 w-px bg-border hidden md:block" />

              <a
                href="https://github.com/Docsnine"
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
              </a>
            </div>

            {/* Center: search (desktop) */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:block w-96">
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-full bg-muted/50 pl-9 border-border focus:ring-0 focus-visible:ring-1 rounded-3xl"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Right: bell + avatar */}
            <div className="flex items-center gap-3">

              {/* Notification bell */}
              <div className="relative" ref={notificationPanelRef}>
                <button
                  onClick={() => setNotificationPanelOpen((p) => !p)}
                  className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
                {notificationPanelOpen && (
                  <NotificationPanel onClose={() => setNotificationPanelOpen(false)} />
                )}
              </div>

              {/* Avatar dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold ring-2 ring-transparent hover:ring-primary/40 transition-all focus:outline-none"
                  title={user?.email ?? "Account"}
                >
                  {initials}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-lg border border-border bg-background shadow-lg z-50 py-1">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      <div className="mt-1.5">
                        <PlanBadge showStatus />
                      </div>
                    </div>
                    <div className="flex items-center justify-between px-4 text-sm text-muted-foreground">
                      <span>Theme</span>
                      <ThemeToggle />
                    </div>
                    {user?.role === 'super-admin' && (
                      <>
                        <div className="border-t border-border my-1" />
                        <Link
                          to="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex w-full items-center justify-between gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-destructive/10 transition-colors"
                        >
                          <span>Administration</span>
                          <ShieldAlert className="h-4 w-4" />
                        </Link>
                      </>
                    )}
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={() => { setDropdownOpen(false); handleLogout() }}
                      className="flex w-full items-center justify-between gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <span>Signout</span>
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop sub-nav */}
          <div className="hidden md:flex h-12 items-center justify-between border-t border-border/90 bg-background/50 backdrop-blur-sm container mx-auto max-w-7xl px-6">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary border-b-2 border-primary py-3"
                        : "text-muted-foreground hover:text-foreground py-3 border-b-2 border-transparent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                )
              })}
            </nav>
            <nav className="flex items-center gap-6">
              {rightSideLinks.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-primary border-b-2 border-primary py-3"
                        : "text-muted-foreground hover:text-foreground py-3 border-b-2 border-transparent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Mobile slide-down menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background px-4 pb-4">
              {/* Mobile search */}
              <div className="relative mt-3 mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  className="w-full bg-muted/50 pl-9 border-border"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Primary nav */}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Navigation</p>
              <nav className="flex flex-col gap-1 mb-4">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = location.pathname.startsWith(link.href)
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  )
                })}
              </nav>

              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Account</p>

              <nav className="flex flex-col gap-1">
                {rightSideLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = location.pathname.startsWith(link.href)
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  )
                })}
                <a
                  href="https://github.com/Docsnine"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </a>
              </nav>
            </div>
          )}
        </header>

        <main className="container mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
          <Outlet />
        </main>

        <footer className="relative z-10 border-t border-border">
          <div className="container mx-auto max-w-6xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Docnine. All Rights Reserved.</p>
              <div className="flex items-center gap-6 mt-2 md:mt-0">
                <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="/cookies" className="hover:text-foreground transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

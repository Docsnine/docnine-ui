import { ErrorBoundary } from "@/components/common/ErrorBoundary"
import { Footer, Navbar } from "@/components/landing"
import { useScrollReveal } from "@/hooks/landing/useScrollReveal"
import { cn } from "@/lib/utils"
import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

/** Guest marketing pages stay dark for now; restore app theme on leave. */
function useGuestDarkLock() {
  useEffect(() => {
    const root = document.documentElement
    const previous = Array.from(root.classList).filter((c) => c === "light" || c === "dark")

    root.setAttribute("data-guest-theme-lock", "true")
    root.classList.remove("light", "dark")
    root.classList.add("dark")

    return () => {
      root.removeAttribute("data-guest-theme-lock")
      root.classList.remove("light", "dark")

      if (previous.length > 0) {
        previous.forEach((c) => root.classList.add(c))
        return
      }

      const stored = localStorage.getItem("docnine-theme")
      if (stored === "dark" || stored === "light") {
        root.classList.add(stored)
        return
      }

      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      root.classList.add(systemDark ? "dark" : "light")
    }
  }, [])
}

export function GuestLayout() {
  useScrollReveal()
  useGuestDarkLock()
  const { pathname } = useLocation()
  const isDocs = pathname === "/docs"

  useEffect(() => {
    document.documentElement.classList.add("js")
  }, [])

  return (
    <ErrorBoundary>
      <div className={cn("guest-landing bg-background text-foreground", isDocs ? "h-svh overflow-hidden" : "min-h-screen")}>
        <Navbar />
        <main className={cn("relative overflow-x-hidden", isDocs ? "h-full" : "min-h-screen")}>
          <Outlet />
        </main>
        {!isDocs && <Footer />}
      </div>
    </ErrorBoundary>
  )
}

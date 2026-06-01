import { cn } from "@/lib/utils"
import { ApplicationLogo } from "./application-logo"
import { NoiseOverlay } from "../ui/noise-overlay"
import { Link } from "react-router-dom"

interface AuthShellProps {
  children: React.ReactNode
  className?: string
}

const FEATURES = [
  "AI-powered documentation generation",
  "Multi-platform repository integrations",
  "Real-time collaboration for teams",
  "Developer-first workflows",
]

const HERO_IMAGE = "https://images.unsplash.com/photo-1668181736908-0d86519cc01a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export function AuthShell({ children, className }: AuthShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Left panel — brand identity ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-page p-10 relative overflow-hidden border-r border-sidebar-border">
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${HERO_IMAGE}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        <NoiseOverlay opacity={1} blendMode="overlay" />
        <NoiseOverlay opacity={1} blendMode="soft-light" className="[background-size:150px_150px]" />

        {/* Top: logo */}
        <div className="relative z-10">
          <Link to={"/"}>
            <img
              src={"/logo-light.png"}
              alt="Docnine Logo"
              className={`h-8 w-auto`}
            />
          </Link>
        </div>

        {/* Center: headline + features */}
        <div className="relative z-10 space-y-8">

        </div>

        {/* Bottom: copyright */}
        <p className="relative z-10 text-[12px] text-primary-foreground select-none">
          © {new Date().getFullYear()} Docnine, Seablings Technology. All rights reserved.
        </p>
      </div>

      {/* ── Right panel — form area ──────────────────────────────── */}
      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center bg-background overflow-y-auto px-6 sm:px-10 py-12",
          className,
        )}
      >
        {/* Mobile-only logo */}
        <div className="mb-10 lg:hidden">
          <ApplicationLogo link="/" className="!h-7" />
        </div>

        <div className="w-full max-w-[400px]">
          {children}
        </div>

        <p className="mt-10 text-[12px] text-muted-foreground/50 lg:hidden select-none">
          © {new Date().getFullYear()} Docnine
        </p>
      </div>
    </div>
  )
}

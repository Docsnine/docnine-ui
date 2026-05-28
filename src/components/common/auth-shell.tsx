import { cn } from "@/lib/utils"
import { ApplicationLogo } from "./application-logo"
import { NoiseOverlay } from "../ui/noise-overlay"

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

export function AuthShell({ children, className }: AuthShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Left panel — brand identity ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-page p-10 relative overflow-hidden border-r border-sidebar-border">
        <NoiseOverlay opacity={0.22} blendMode="overlay" />
        <NoiseOverlay opacity={0.12} blendMode="soft-light" className="[background-size:150px_150px]" />

        {/* Ambient radial glows */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full bg-primary/[0.07] blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[280px] h-[280px] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        {/* Abstract grid accent — very subtle */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top: logo */}
        <div className="relative z-10">
          <ApplicationLogo link="/" className="!h-7" />
        </div>

        {/* Center: headline + features */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-3">
            <h1 className="text-[28px] font-semibold text-foreground leading-snug tracking-tight">
              Turn your projects into<br />intelligent documentation.
            </h1>
            <p className="text-[14px] text-muted-foreground leading-relaxed max-w-[300px]">
              The documentation workspace built for modern development teams.
            </p>
          </div>

          <div className="space-y-3">
            {FEATURES.map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-[13px] text-muted-foreground">
                <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-primary opacity-80" />
                {feat}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: copyright */}
        <p className="relative z-10 text-[12px] text-muted-foreground/50 select-none">
          © {new Date().getFullYear()} Docnine. All rights reserved.
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

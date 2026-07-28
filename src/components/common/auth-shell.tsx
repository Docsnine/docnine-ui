import { cn } from "@/lib/utils"
import { ApplicationLogo } from "./application-logo"
import { PremiumGreenBackdrop } from "@/components/ui/premium-green-backdrop"

interface AuthShellProps {
  children: React.ReactNode
  className?: string
  headline?: string
  subcopy?: string
}

export function AuthShell({
  children,
  className,
  headline = "Docs that keep up with your code",
  subcopy = "Generate clear documentation from your repositories and keep it current , without slowing your team down.",
}: AuthShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative hidden overflow-hidden border-r border-white/5 lg:flex lg:w-[45%] flex-col p-10">
        <PremiumGreenBackdrop grain="subtle" forceDark />

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full text-teal-300/25"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <path d="M420 40C620 160 760 280 880 460C1000 640 1180 760 1440 900" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
          <path d="M280 120C520 220 700 360 820 540C940 720 1160 820 1440 900" stroke="currentColor" strokeWidth="1.75" opacity="1" />
          <path d="M520 0C700 140 820 280 920 480C1040 700 1240 800 1440 900" stroke="currentColor" strokeWidth="1.25" opacity="0.45" />
          <path d="M180 220C460 300 660 440 780 620C880 760 1100 840 1380 900" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
          <path d="M600 60C780 180 900 320 1000 520C1100 700 1280 820 1440 900" stroke="currentColor" strokeWidth="1.25" opacity="0.4" />
          <path d="M80 340C360 400 580 520 720 680C840 800 1080 860 1320 900" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
          <path d="M340 0C560 100 720 240 840 440C960 640 1180 780 1440 900" stroke="currentColor" strokeWidth="1.35" opacity="0.5" />
        </svg>

        <div className="relative z-10 flex h-full flex-col">
          <ApplicationLogo link="/" forceTheme="dark" />

          <div className="flex flex-1 flex-col justify-center py-12">
            <div className="max-w-md space-y-4">
              <h2 className="font-display text-[clamp(1.6rem,1.3rem+1vw,2.1rem)] leading-[1.2] tracking-[0.02em] text-[#f2f7f5]">
                {headline}
              </h2>
              <p className="text-[15px] leading-relaxed text-[#a8c7c1]">{subcopy}</p>
            </div>
          </div>

          <p className="relative z-10 shrink-0 select-none text-[12px] text-[#7fa8a1]">
            © {new Date().getFullYear()} Docnine, Seablings Technology. All rights reserved.
          </p>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col items-center justify-center overflow-y-auto bg-background px-6 py-12 sm:px-10",
          className,
        )}
      >
        <div className="mb-10 lg:hidden">
          <ApplicationLogo link="/" className="!h-7" />
        </div>

        <div className="w-full max-w-[400px]">{children}</div>

        <p className="mt-10 select-none text-[12px] text-muted-foreground/50 lg:hidden">
          © {new Date().getFullYear()} Docnine
        </p>
      </div>
    </div>
  )
}

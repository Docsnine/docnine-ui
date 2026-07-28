export function HeroProductMockup({ flush = false }: { flush?: boolean }) {
  return (
    <div
      className={
        flush
          ? "absolute bottom-0 left-0 h-full w-full max-w-none"
          : "relative h-full min-h-[280px] w-[120%] max-w-none sm:min-h-[360px] sm:w-[135%] lg:min-h-[520px] lg:w-[150%]"
      }
    >
      <div
        className={
          flush
            ? "absolute bottom-0 left-0 h-full w-[640px] max-w-none overflow-hidden rounded-tl-2xl border-2 border-b-0 border-r-0 border-border font-sans sm:rounded-tl-3xl xl:w-[760px] 2xl:w-[820px]"
            : "absolute left-0 top-4 w-[min(640px,90vw)] max-w-none overflow-hidden rounded-2xl rounded-br-none border-2 border-border border-r-0 font-sans sm:top-0 sm:w-[720px] sm:rounded-3xl lg:w-[780px]"
        }
        style={{ backgroundColor: "var(--hero-mockup)" }}
      >
        <div className="grid h-full grid-cols-[112px_1fr] sm:grid-cols-[148px_1fr] md:grid-cols-[172px_1fr]">
          <aside
            className="min-h-full border-r border-border p-2.5 sm:p-3 md:p-4"
            style={{ backgroundColor: "var(--hero-mockup-sidebar)" }}
          >
            <div className="mb-3 flex items-center gap-2 px-1 sm:mb-4">
              <span className="h-2 w-2 rounded-sm bg-primary" />
              <span className="text-[10px] font-medium tracking-tight text-foreground/80 sm:text-[11px]">
                docnine
              </span>
            </div>
            <nav className="space-y-0.5 text-[10px] sm:space-y-1 sm:text-[11px]">
              <div className="rounded-md px-2 py-1.5 text-muted-foreground">Ask Assistant</div>
              <div className="rounded-md bg-primary/15 px-2 py-1.5 font-medium text-primary">
                Quickstart
              </div>
              <div className="rounded-md px-2 py-1.5 text-muted-foreground">API Reference</div>
              <div className="hidden rounded-md px-2 py-1.5 text-muted-foreground sm:block">Schemas</div>
              <div className="hidden rounded-md px-2 py-1.5 text-muted-foreground sm:block">Guides</div>
              <div className="mt-2 px-2 pt-2 text-[9px] uppercase tracking-[0.14em] text-muted-foreground/50 sm:mt-3 sm:text-[10px]">
                Workspace
              </div>
              <div className="rounded-md px-2 py-1.5 text-muted-foreground">Integrations</div>
              <div className="hidden rounded-md px-2 py-1.5 text-muted-foreground sm:block">Members</div>
              <div className="rounded-md px-2 py-1.5 text-muted-foreground">Settings</div>
            </nav>
          </aside>

          <div className="min-w-0 p-3 sm:p-4 md:p-5" style={{ backgroundColor: "var(--hero-mockup)" }}>
            <div className="mb-3 flex items-center justify-between gap-2 border-b border-border pb-2.5 sm:mb-4 sm:gap-3 sm:pb-3">
              <div className="flex min-w-0 items-center gap-2 overflow-hidden text-[10px] sm:gap-4 sm:text-[11px]">
                <span className="shrink-0 border-b border-primary pb-2 font-medium text-foreground">
                  API Reference
                </span>
                <span className="hidden pb-2 text-muted-foreground sm:inline">Libraries</span>
                <span className="hidden pb-2 text-muted-foreground md:inline">Changelog</span>
              </div>
              <div className="hidden h-7 min-w-[100px] items-center rounded-md border border-border bg-muted/50 px-2.5 text-[10px] text-muted-foreground sm:flex md:min-w-[140px]">
                Search or ask
              </div>
            </div>

            <div
              className="rounded-lg border border-border p-3.5 sm:p-5"
              style={{
                backgroundImage:
                  "linear-gradient(color-mix(in srgb, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--foreground) 5%, transparent) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              <p className="mb-1 text-[9px] uppercase tracking-[0.16em] text-primary/70 sm:text-[10px]">
                Guides
              </p>
              <h3 className="font-sans text-[16px] font-semibold tracking-tight text-foreground sm:text-[20px]">
                Quickstart Guide
              </h3>
              <p className="mt-1.5 max-w-md text-[11px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-[12px]">
                Connect a repository, scan your stack, and publish docs your team can trust.
              </p>

              <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
                {[
                  { step: "01", label: "Connect GitHub or GitLab" },
                  { step: "02", label: "Scan endpoints and schemas" },
                  { step: "03", label: "Review and publish" },
                  { step: "04", label: "Invite your team", hideOnMobile: true },
                  { step: "05", label: "Stay in sync on every merge", hideOnMobile: true },
                ].map((row) => (
                  <div
                    key={row.step}
                    className={
                      row.hideOnMobile
                        ? "hidden items-center gap-3 rounded-md border border-border bg-muted/40 px-3 py-2 sm:flex sm:py-2.5"
                        : "flex items-center gap-3 rounded-md border border-border bg-muted/40 px-3 py-2 sm:py-2.5"
                    }
                  >
                    <span className="font-mono text-[10px] text-primary/80">{row.step}</span>
                    <span className="text-[11px] text-foreground/80 sm:text-[12px]">{row.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 hidden grid-cols-2 gap-3 opacity-70 sm:mt-6 sm:grid">
                <div className="h-20 rounded-md border border-border bg-muted/30 p-3 sm:h-24">
                  <div className="h-2 w-16 rounded bg-foreground/15" />
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-full rounded bg-foreground/10" />
                    <div className="h-1.5 w-4/5 rounded bg-foreground/10" />
                    <div className="h-1.5 w-3/5 rounded bg-foreground/10" />
                  </div>
                </div>
                <div className="h-20 rounded-md border border-border bg-muted/30 p-3 sm:h-24">
                  <div className="h-2 w-20 rounded bg-foreground/15" />
                  <div className="mt-3 space-y-1.5">
                    <div className="h-1.5 w-full rounded bg-foreground/10" />
                    <div className="h-1.5 w-2/3 rounded bg-foreground/10" />
                    <div className="h-1.5 w-4/5 rounded bg-foreground/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

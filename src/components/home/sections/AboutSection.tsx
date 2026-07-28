import { Link } from "react-router-dom"
import { ArrowRight } from "@/components/icons"
import { PlatformCapabilityCards } from "./PlatformCapabilityCards"

const INTEGRATIONS = ["GitHub", "GitLab", "Bitbucket", "Azure DevOps", "OpenAPI", "Markdown"]

export function AboutSection() {
  return (
    <section className="relative z-10 border-t border-border/60 bg-background px-4 py-20 sm:px-6 sm:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-section text-foreground">
            Built for teams who treat docs like part of the product
          </h2>
          <p className="mt-4 text-[15px] text-muted-foreground">
            Plug into the tools you already use, and keep documentation in the same flow as delivery ,
            not a side project that drifts out of date.
          </p>
          <Link
            to="/docs"
            className="mt-5 inline-flex items-center text-[14px] font-medium text-foreground hover:text-primary"
          >
            Read the docs <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-border/70 py-8">
          {INTEGRATIONS.map((name) => (
            <span
              key={name}
              className="text-[13px] font-semibold tracking-wide text-muted-foreground/80 sm:text-[15px]"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-section text-foreground">
              Everything you need in one place
            </h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              From the first scan to day-to-day updates, Docnine helps you create docs people can
              actually trust.
            </p>
          </div>

          <PlatformCapabilityCards />
        </div>
      </div>
    </section>
  )
}

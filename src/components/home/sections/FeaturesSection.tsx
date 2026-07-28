import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const HIGHLIGHTS = [
  {
    title: "Scan once, reuse everywhere",
    body: "Turn a repository into clear API and product docs , no blank page, no starting from scratch.",
  },
  {
    title: "Export in the formats you already use",
    body: "Send docs out as Markdown, Postman collections, or Notion-ready content so they land where your team works.",
  },
  {
    title: "Answers grounded in your code",
    body: "Ask questions about the project and get responses tied to what’s actually in the repo.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative z-10 border-t border-border/60 bg-secondary/40 px-4 py-20 sm:px-6 sm:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="text-section text-foreground">
              Docs that still help after launch day
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Docnine covers the full loop , from the first scan to ongoing updates , so engineering
              and product can share one clear source of truth.
            </p>
          </div>
          <div className="flex lg:justify-end">
            <Button asChild className="h-11 rounded-lg px-5 text-[14px] font-semibold">
              <Link to="/signup">
                Get started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-border/70 pt-12 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title}>
              <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { UserPlus, GitBranch, FileText, Send } from "lucide-react"

const STEPS = [
  {
    number: 1,
    icon: UserPlus,
    title: "Create an account",
    description: "You’re in within about 30 seconds , no lengthy setup.",
  },
  {
    number: 2,
    icon: GitBranch,
    title: "Connect GitHub",
    description: "Link your GitHub account and choose a repo to document.",
  },
  {
    number: 3,
    icon: FileText,
    title: "Generate docs",
    description: "We scan the project and draft clear, structured documentation.",
  },
  {
    number: 4,
    icon: Send,
    title: "Ask and collaborate",
    description: "Get answers from your code, and work on docs with your team.",
  },
]

export function StepsSection() {
  return (
    <section className="relative z-10 py-24 px-4 bg-background">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-[28px] leading-tight sm:text-[38px] lg:text-[48px] font-bold tracking-tight text-foreground mb-4 sm:mb-6">
          Up and running in four steps
        </h2>
        <p className="text-base sm:text-xl text-muted-foreground mb-10 sm:mb-16">
          No heavy config. No sales call required. Most teams have usable docs within minutes.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-border z-0" />

          {/* Steps */}
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative z-10 flex flex-col items-center">
                <div className="relative w-24 h-24 rounded-3xl bg-secondary border border-border flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-muted-foreground" />
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center border-4 border-background">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-[250px]">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

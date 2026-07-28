import { ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { NoiseOverlay } from "@/components/ui/noise-overlay"

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    question: "How does Docnine work?",
    answer: "Docnine scans your codebase for APIs, components, and schemas, then uses AI to draft clear, structured documentation you can review and publish."
  },
  {
    question: "Can I use my own OpenAI or Anthropic API key?",
    answer: "Yes. You can bring your own key for OpenAI, Anthropic, or Google Gemini to power generation."
  },
  {
    question: "Which languages and file types are supported?",
    answer: "Most common languages are covered , including JavaScript, TypeScript, Python, Go, Rust, and more."
  },
  {
    question: "Is Docnine free to try?",
    answer: "Yes. The free plan lets you scan up to two projects and generate docs at no cost. Paid plans unlock exports, sharing, portals, and more."
  },
]

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="faq" className="relative z-10 overflow-hidden py-24 px-4 bg-background">
      <NoiseOverlay opacity={0.16} />
      <div className="container mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="font-mono text-sm text-primary mb-4">// FAQ //</p>
          <h2 className="text-[32px] leading-[1.1] sm:text-[44px] font-extrabold tracking-[-0.02em] text-foreground mb-4">
            Questions people ask us
          </h2>
          <p className="text-lg text-muted-foreground">
            Short answers to the basics. Need more detail? Reach out anytime.
          </p>
        </div>

        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="faq-item border-b border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex items-center justify-between cursor-pointer hover:bg-muted/10 transition-colors text-left"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-40 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

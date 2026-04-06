import { ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const FAQS = [
  {
    question: "How does Docnine documentation work?",
    answer: "Docnine scans your codebase, extracts APIs, components, and schemas, then uses AI to generate structured, readable documentation automatically."
  },
  {
    question: "Can I use my own OpenAI or Anthropic API key?",
    answer: "Yes! You can bring your own API key for OpenAI, Anthropic, or Google Gemini to power your documentation generation."
  },
  {
    question: "What file types and languages does Docnine support?",
    answer: "Docnine supports all major programming languages including JavaScript, TypeScript, Python, Go, Rust, and many more."
  },
  {
    question: "Is Docnine really free to use?",
    answer: "Yes! The free plan lets you scan up to 2 projects and generate documentation at no cost. Upgrade to a paid plan to unlock exports, sharing, portals, and more."
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
    <section ref={ref} id="faq" className="relative z-10 py-24 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="font-mono text-sm text-primary mb-4">// FAQ //</p>
          <h2 className="text-[32px] leading-[1.1] sm:text-[44px] font-extrabold tracking-[-0.02em] text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Docnine.
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

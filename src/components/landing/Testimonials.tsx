import { Link } from "react-router-dom"

import { ArrowRight } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const items = [
  {
    quote:
      "Docnine finally closed the gap between our code and our docs,sync just works.",
    author: "Amy Chase",
    role: "PM",
    company: "Mercury Finance",
    image: "/landing/testimonials/amy-chase.webp",
  },
  {
    quote:
      "We generate API docs from the repo and stop rewriting the same pages every sprint.",
    author: "Jonas Kotara",
    role: "Lead Engineer",
    company: "Mercury Finance",
    image: "/landing/testimonials/jonas-kotara.webp",
  },
  {
    quote:
      "Portals our customers actually read. Docs stay current without a docs-only hire.",
    author: "Kevin Yam",
    role: "Founder",
    company: "Mercury Finance",
    image: "/landing/testimonials/kevin-yam.webp",
  },
  {
    quote:
      "Bring-your-own keys, GitHub sync, and clear drafts,Docnine fits our stack.",
    author: "Kundo Marta",
    role: "Founder",
    company: "Mercury Finance",
    image: "/landing/testimonials/kundo-marta.webp",
  },
  {
    quote:
      "Docnine finally closed the gap between our code and our docs,sync just works.",
    author: "Amy Chase",
    role: "PM",
    company: "Mercury Finance",
    image: "/landing/testimonials/amy-chase.webp",
  },
  {
    quote:
      "We generate API docs from the repo and stop rewriting the same pages every sprint.",
    author: "Jonas Kotara",
    role: "Lead Engineer",
    company: "Mercury Finance",
    image: "/landing/testimonials/jonas-kotara.webp",
  },
]

export function Testimonials({ className }: { className?: string }) {
  return (
      <section
        className={cn("overflow-hidden py-[calc(48px+8vh)]", className)}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-xl space-y-4">
            <h2
              data-animate
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Trusted by teams who document as they ship
            </h2>
            <p
              data-animate
              data-delay="1"
              className="leading-relaxed text-muted-foreground"
            >
              Docnine is built for engineering teams who want living docs ,
              generated from code, kept in sync, and shared through portals
              people actually open.
            </p>
            <div data-animate data-delay="2">
              <Button
                variant="outline"
                className="rounded-full px-5 py-2 text-sm font-medium shadow-none"
                asChild
              >
                <Link to="/contact">
                  Talk to us <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mt-10 -mr-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] md:mt-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {items.map((testimonial, index) => (
                  <CarouselItem
                    key={`${testimonial.author}-${index}`}
                    className="basis-4/5 grow sm:basis-3/5 md:basis-2/5 lg:basis-[32%]"
                    data-animate
                    data-delay={String((index % 4) + 1)}
                  >
                    <Card className="bg-muted h-full overflow-hidden rounded-2xl border-none">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="relative h-56 md:h-64">
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="absolute inset-0 size-full object-cover object-top"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                          <blockquote className="text-base font-medium leading-snug tracking-tight md:text-lg">
                            {testimonial.quote}
                          </blockquote>
                          <div className="space-y-0.5">
                            <div className="text-sm font-semibold">
                              {testimonial.author}, {testimonial.role}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-11 translate-x-0 translate-y-0 rounded-full transition-colors [&>svg]:size-5" />
                <CarouselNext className="bg-muted hover:bg-muted/80 static size-11 translate-x-0 translate-y-0 rounded-full transition-colors [&>svg]:size-5" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
  )
}

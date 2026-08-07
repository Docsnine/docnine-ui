import Marquee from "react-fast-marquee"

import { cn } from "@/lib/utils"

type Company = {
  name: string
  logo: string
  width: number
  height: number
  href: string
}

export function Logos() {
  const topRowCompanies: Company[] = [
    {
      name: "Mercury",
      logo: "/landing/logos/mercury.svg",
      width: 120,
      height: 22,
      href: "https://mercury.com",
    },
    {
      name: "Watershed",
      logo: "/landing/logos/watershed.svg",
      width: 128,
      height: 26,
      href: "https://watershed.com",
    },
    {
      name: "Retool",
      logo: "/landing/logos/retool.svg",
      width: 96,
      height: 18,
      href: "https://retool.com",
    },
    {
      name: "Descript",
      logo: "/landing/logos/descript.svg",
      width: 96,
      height: 22,
      href: "https://descript.com",
    },
  ]

  const bottomRowCompanies: Company[] = [
  ]

  return (
    <section className="overflow-hidden py-[calc(24px+4vh)]">
      <div className="mx-auto max-w-5xl space-y-10 px-6">
        <div className="text-center" data-animate>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Trusted by teams who ship.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            From startups to established engineering orgs.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-8">
          <LogoRow companies={topRowCompanies} gridClassName="grid-cols-4" />
          <LogoRow
            companies={bottomRowCompanies}
            gridClassName="grid-cols-5"
            direction="right"
          />
        </div>
      </div>
    </section>
  )
}

type LogoRowProps = {
  companies: Company[]
  gridClassName: string
  direction?: "left" | "right"
}

function LogoRow({ companies, gridClassName, direction }: LogoRowProps) {
  return (
    <>
      <div className="hidden md:block w-full">
        <div
          className={cn(
            "grid items-center justify-items-center gap-x-12 lg:gap-x-16",
            gridClassName,
          )}
        >
          {companies.map((company) => (
            <a
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              key={company.name}
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className="h-6 w-auto object-contain opacity-50 transition-opacity hover:opacity-70 dark:invert dark:opacity-60 dark:hover:opacity-90"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="md:hidden w-full">
        <Marquee direction={direction} pauseOnHover>
          {companies.map((company) => (
            <a
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              key={company.name}
              className="mx-8 inline-block transition-opacity hover:opacity-70"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                width={company.width}
                height={company.height}
                className="h-6 w-auto object-contain opacity-50 dark:invert dark:opacity-60"
              />
            </a>
          ))}
        </Marquee>
      </div>
    </>
  )
}

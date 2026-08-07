import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import { ChevronRight, Github } from "@/components/icons"
import { ApplicationLogo } from "@/components/common/application-logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useNavbarShrink } from "@/hooks/landing/useNavbarShrink"
import { cn } from "@/lib/utils"

const ITEMS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { pathname } = useLocation()
  const shrunk = useNavbarShrink(20)
  const overAurora = pathname === "/" && !shrunk

  return (
    <section
      className={cn(
        "fixed left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-4xl shadow-none backdrop-blur-md transition-all duration-300",
        overAurora
          ? "border border-white/15 bg-background/40 dark:bg-background/50"
          : "border border-border/80 bg-background/80",
        shrunk ? "top-3 lg:top-4" : "top-5 lg:top-12",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 transition-[padding] duration-300",
          shrunk ? "py-2" : "py-3",
        )}
      >
        <ApplicationLogo className="h-[18px] w-auto" />

        {/* Desktop Navigation */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {ITEMS.map((link) =>
              <NavigationMenuItem key={link.label}>
                <Link
                  to={link.href}
                  className={cn(
                    "relative bg-transparent px-1.5 text-sm font-medium transition-opacity hover:opacity-75",
                    pathname === link.href && "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2.5">
          <Link to="/login" className="max-lg:hidden">
            <Button variant="outline">
              <span className="relative z-10">Sign in</span>
            </Button>
          </Link>
          <Link to="/signup" className="max-lg:hidden">
            <Button>
              <span className="relative z-10">Get started</span>
            </Button>
          </Link>
          <a
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            type="button"
            className="text-muted-foreground relative flex size-8 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Navigation */}
      <div
        className={cn(
          "bg-background/95 fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border border-border/80 p-6 shadow-none backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="divide-border flex flex-1 flex-col divide-y">
          {ITEMS.map((link) =>
            <Link
              key={link.label}
              to={link.href}
              className={cn(
                "text-primary hover:text-primary/80 py-4 text-base font-medium transition-colors first:pt-0 last:pb-0",
                pathname === link.href && "text-muted-foreground",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          )}
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="outline" asChild>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Sign in
              </Link>
            </Button>
            <Button asChild>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                Get started
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </section>
  )
}

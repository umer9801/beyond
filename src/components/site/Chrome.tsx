import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BRAND } from "./brand";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-lg">
      <span className="relative inline-block h-2.5 w-6 rounded-full bg-primary" />
      {BRAND.name}
    </Link>
  );
}

export function QuoteButton({ className, children = "Contact" }: { className?: string; children?: React.ReactNode }) {
  return (
    <Link
      to="/get-a-quote"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-all hover:bg-foreground/90 hover:shadow-lg hover:scale-105",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-xl shadow-sm" : "bg-transparent",
      )}
    >
      <div className={cn("container-x flex items-center justify-between transition-all", scrolled ? "h-20" : "h-24")}>
        <Logo />
        
        {/* Pill Navigation */}
        <nav className="hidden md:flex items-center gap-2 rounded-full bg-card backdrop-blur-sm px-3 py-2 border border-border shadow-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative px-6 py-2.5 text-sm font-semibold text-foreground/70 rounded-full transition-all hover:text-foreground hover:bg-muted data-[status=active]:text-background data-[status=active]:bg-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:block"><QuoteButton /></div>
        <button aria-label="Open menu" className="md:hidden p-2" onClick={() => setOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className={cn("fixed inset-0 z-50 md:hidden transition-opacity", open ? "opacity-100" : "pointer-events-none opacity-0")}>
        <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={cn("absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-background p-6 shadow-lift transition-transform duration-500", open ? "translate-x-0" : "translate-x-full")}>
          <div className="flex items-center justify-between">
            <Logo />
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2"><X className="h-6 w-6" /></button>
          </div>
          <nav className="mt-12 flex flex-col">
            {[...NAV, { to: "/get-a-quote", label: "Get a Quote" } as const].map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                className="flex items-center justify-between border-b border-border py-5 text-2xl font-bold tracking-tight data-[status=active]:text-primary"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {n.label}
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto text-sm text-muted-foreground">
            <p>{BRAND.phone}</p>
            <p>{BRAND.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="h-0.5 w-24 bg-primary" />
      <div className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm text-muted-foreground leading-relaxed">
            Professional cleaning and property care for vehicles, homes and businesses. Detail-led, reliable, done properly.
          </p>
          <QuoteButton className="mt-8" />
        </div>
        <FooterCol title="Navigate" items={[["/", "Home"], ["/about", "About"], ["/services", "Services"], ["/contact", "Contact"], ["/get-a-quote", "Get a Quote"]]} />
        <FooterCol title="Services" items={[["/services/auto", "Auto"], ["/services/home", "Home"], ["/services/business", "Business"]]} />
        <div className="md:col-span-3">
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>{BRAND.phone}</li>
            <li>{BRAND.email}</li>
            <li className="text-muted-foreground">{BRAND.area}</li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {BRAND.full}. All rights reserved.</p>
        <div className="flex gap-6"><span>Privacy Policy</span><span>Terms & Conditions</span></div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="md:col-span-2">
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map(([to, l]) => (
          <li key={to}>
            <Link to={to as "/"} className="transition-colors hover:text-primary">{l}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="container-x pt-40 pb-16 md:pt-48 md:pb-24">
      <p className="eyebrow animate-fade-up">{eyebrow}</p>
      <h1 className="display mt-6 text-5xl md:text-7xl lg:text-8xl animate-fade-up" style={{ animationDelay: "80ms" }}>{title}</h1>
      {intro && (
        <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "160ms" }}>{intro}</p>
      )}
      {children}
    </section>
  );
}

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

export function QuoteButton({ className, children = "Get a Quote" }: { className?: string; children?: React.ReactNode }) {
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
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);
  
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-background border-b",
        scrolled ? "shadow-lg border-border" : "border-transparent",
      )}
    >
      <div className={cn("container-x flex items-center justify-between transition-all", scrolled ? "h-16" : "h-20")}>
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-surface/50 backdrop-blur-sm px-2 py-2 border border-border/50 shadow-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative px-5 py-2 text-sm font-semibold text-foreground/70 rounded-full transition-all hover:text-foreground hover:bg-background/80 data-[status=active]:text-primary-foreground data-[status=active]:bg-primary data-[status=active]:shadow-md"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:block"><QuoteButton /></div>
        
        {/* Mobile Menu Button */}
        <button 
          aria-label="Open menu" 
          className="md:hidden p-2.5 rounded-full hover:bg-surface transition-colors" 
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setOpen(false)} 
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-surface/30">
              <Logo />
              <button 
                aria-label="Close menu" 
                onClick={() => setOpen(false)} 
                className="p-2 rounded-full hover:bg-background transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-2">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: n.to === "/" }}
                    className="flex items-center justify-between px-5 py-4 rounded-xl text-lg font-bold transition-all hover:bg-surface data-[status=active]:bg-primary data-[status=active]:text-primary-foreground group"
                  >
                    <span>{n.label}</span>
                    <ArrowUpRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>
              
              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  to="/get-a-quote"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-foreground text-background font-bold shadow-xl"
                >
                  Get a Quote
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            {/* Footer Contact */}
            <div className="p-6 border-t border-border bg-surface/50">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Contact
              </p>
              <div className="space-y-2">
                <p className="text-sm font-bold text-foreground">{BRAND.phone}</p>
                <p className="text-sm text-muted-foreground">{BRAND.email}</p>
                <p className="text-xs text-muted-foreground mt-3">{BRAND.area}</p>
              </div>
            </div>
          </div>
        </div>
      )}
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

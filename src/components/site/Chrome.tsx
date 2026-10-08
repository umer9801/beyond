import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { BRAND } from "./brand";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Wavy curve separator - diagonal from top-left to bottom-right */}
      <div className="absolute inset-0" 
        style={{
          background: 'linear-gradient(135deg, rgba(168,205,184,0.25) 0%, rgba(111,155,130,0.25) 100%)',
          clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 100%)'
        }}
      />
      
      <div className="relative" 
        style={{
          background: 'linear-gradient(135deg, rgba(168,205,184,0.2) 0%, rgba(111,155,130,0.2) 100%)',
          clipPath: 'polygon(0 0, 100% 12%, 100% 100%, 0 100%)'
        }}
      >

      {/* Subtle sage gradient overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(111,155,130,0.25) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(168,205,184,0.25) 0%, transparent 50%)`
        }}
      />

      {/* Links grid */}
      <div className="relative container-x py-16 pt-24 md:pt-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-foreground text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Pages
            </h3>
            <ul className="space-y-3">
              {[["/" , "Home"], ["/about", "About"], ["/services", "Services"], ["/contact", "Contact"], ["/get-a-quote", "Get a Quote"]].map(([to, label]) => (
                <li key={to}>
                  <Link 
                    to={to as "/"} 
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-foreground text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {[["Auto Detailing", "/services/auto"], ["Home Cleaning", "/services/home"], ["Commercial", "/services/business"]].map(([label, to]) => (
                <li key={to}>
                  <Link 
                    to={to as "/"} 
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-foreground text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`tel:${BRAND.phone}`} 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${BRAND.email}`} 
                  className="text-muted-foreground text-sm hover:text-primary transition-colors duration-200"
                >
                  {BRAND.email}
                </a>
              </li>
              <li className="text-muted-foreground/70 text-sm">{BRAND.area}</li>
            </ul>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-foreground text-xs font-bold uppercase tracking-[0.2em] mb-5">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "Facebook", href: "#" },
                { label: "Twitter", href: "#" },
              ].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                  aria-label={label}
                >
                  <span className="text-xs font-bold">
                    {label[0]}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-border bg-card/50">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} {BRAND.full}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button className="hover:text-foreground cursor-pointer transition-colors">
              Privacy Policy
            </button>
            <span className="h-4 w-px bg-border" />
            <button className="hover:text-foreground cursor-pointer transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      </div>

    </footer>
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

import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Car, Home, Building2, Users, Award, CheckCircle2, Clock, Shield, Sparkles, Zap } from "lucide-react";
import about from "@/assets/about.jpg";
import { PageHero, QuoteButton } from "@/components/site/Chrome";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/components/site/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About — Beyond1", "More than clean. Our approach to detail, reliability and quality for vehicles, homes and businesses."),
  component: About,
});

const STEPS = [
  ["Understand", "Understand the customer's needs."],
  ["Prepare", "Choose the right process and equipment."],
  ["Clean", "Perform detailed professional cleaning."],
  ["Restore", "Leave the space visibly improved."],
  ["Deliver", "Ensure the customer is satisfied."],
];
const VALUES = [
  ["Detail", "We notice what others overlook."],
  ["Reliability", "We respect schedules and commitments."],
  ["Quality", "We focus on long-lasting results."],
  ["Care", "We treat every vehicle, home and business with respect."],
];

const STATS = [
  { number: "5000+", label: "Vehicles Detailed", icon: Car },
  { number: "1200+", label: "Homes Serviced", icon: Home },
  { number: "150+", label: "Business Clients", icon: Building2 },
  { number: "98%", label: "Satisfaction Rate", icon: Award },
];

const SERVICES_OVERVIEW = [
  { 
    icon: Car, 
    title: "Automotive Excellence", 
    desc: "From full car detailing to alloy wheel cleaning, engine bay degreasing, stain and odour removal — we restore your vehicle to showroom condition.",
    services: ["Car Detailing", "Alloy Wheel Cleaning", "Engine Bay Cleaning", "Stain & Odour Removal"]
  },
  { 
    icon: Home, 
    title: "Home Maintenance", 
    desc: "Power washing, carpet cleaning, gutter maintenance, and even pot lights and window blinds installation — complete home care solutions.",
    services: ["Powerwashing", "Carpet Cleaning", "Gutter Cleaning", "Lighting & Blinds Installation"]
  },
  { 
    icon: Building2, 
    title: "Commercial Solutions", 
    desc: "Weekly office cleaning, flexible scheduling, and customized bundle packages designed for businesses of all sizes.",
    services: ["Weekly Cleaning", "After-Hours Service", "Bundle Packages", "Rapid Response"]
  },
];

const WHY_CHOOSE = [
  { icon: CheckCircle2, title: "Proven Track Record", desc: "Over 5,000 vehicles detailed and 1,200+ homes serviced with consistently excellent results." },
  { icon: Clock, title: "Reliable Scheduling", desc: "We show up on time, every time. Your schedule is respected and honored." },
  { icon: Shield, title: "Fully Insured", desc: "Complete coverage and bonding for your peace of mind on every project." },
  { icon: Sparkles, title: "Premium Products", desc: "We use only professional-grade, eco-friendly cleaning solutions." },
  { icon: Users, title: "Expert Team", desc: "Trained professionals who take pride in delivering exceptional service." },
  { icon: Zap, title: "Fast Response", desc: "Same-day and emergency services available when you need them most." },
];

function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the steps container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  // Smooth spring animation for the line
  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 100, damping: 30 }
  );
  
  return (
    <>
      <PageHero eyebrow="About us" title={<>More than clean.<br /><span className="text-muted-foreground">We care about<br />the result.</span></>} />
      
      <div className="container-x">
        <Reveal variant="clip-reveal" className="overflow-hidden rounded-3xl">
          <img src={about} alt="Detailer polishing a red car" width={1600} height={912} className="aspect-[16/8] w-full object-cover" />
        </Reveal>
        
        <div className="grid gap-px border-y border-border md:grid-cols-3 mt-16">
          {["Professional Service", "Residential + Commercial", "Attention to Detail"].map((s, i) => (
            <Reveal key={s} delay={i * 100} className="py-8 md:px-8 first:md:pl-0">
              <Reveal variant="red-line" className="w-8" />
              <p className="mt-4 text-xl font-extrabold tracking-tight">{s}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <section className="container-x py-20 md:py-28">
        <Reveal className="text-center mb-16">
          <p className="eyebrow">Trusted by thousands</p>
          <h2 className="display mt-6 text-4xl md:text-6xl">Numbers that speak<br />for themselves.</h2>
        </Reveal>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center h-full">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4"
                  >
                    <stat.icon className="h-7 w-7" />
                  </motion.div>
                  <div className="display text-4xl md:text-5xl text-primary mb-2">{stat.number}</div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-x">
          <Reveal className="text-center mb-16">
            <p className="eyebrow">What we offer</p>
            <h2 className="display mt-6 text-4xl md:text-6xl">Complete cleaning<br />solutions.</h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Three specialized service categories covering every cleaning need for your vehicles, home, and business.
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {SERVICES_OVERVIEW.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 h-full">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    >
                      <service.icon className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-bold group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{service.desc}</p>
                    
                    <ul className="mt-6 space-y-2">
                      {service.services.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-x py-20 md:py-28">
        <Reveal className="text-center mb-16">
          <p className="eyebrow">Why choose us</p>
          <h2 className="display mt-6 text-4xl md:text-6xl">Built on trust.<br />Backed by results.</h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 h-full">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  >
                    <item.icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="mt-6 text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-16 py-28 md:grid-cols-12 md:py-40">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:col-span-4 md:sticky md:top-32 self-start"
        >
          <p className="eyebrow">Our approach</p>
          <h2 className="display mt-6 text-4xl md:text-6xl">Five steps.<br />No shortcuts.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">Every job — a car, a driveway, an office floor — runs through the same disciplined process.</p>
        </motion.div>
        
        <div ref={containerRef} className="md:col-span-7 md:col-start-6 relative">
          {/* Static Background Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border" />
          
          {/* Animated Progress Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent origin-top"
          />
          
          <ol className="relative">
            {STEPS.map(([t, d], i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative pl-10 pb-16 last:pb-0"
              >
                {/* Animated Dot */}
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                  className="absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
                >
                  {/* Pulsing ring effect */}
                  <motion.span
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                </motion.span>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.4 }}
                  className="text-sm font-bold text-primary tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.p>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5 }}
                  className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight"
                >
                  {t}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.6 }}
                  className="mt-3 text-muted-foreground"
                >
                  {d}
                </motion.p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface py-28 md:py-36">
        <div className="container-x">
          <p className="eyebrow">Values</p>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {VALUES.map(([t, d]) => (
              <Reveal key={t} className="group grid items-baseline gap-4 py-10 md:grid-cols-12">
                <h3 className="display md:col-span-6 text-5xl md:text-7xl transition-colors group-hover:text-primary">{t}</h3>
                <p className="md:col-span-5 md:col-start-8 text-lg text-muted-foreground">{d}</p>
              </Reveal>
            ))}
          </div>
          <QuoteButton className="mt-14 px-7 py-4 text-base" />
        </div>
      </section>
    </>
  );
}

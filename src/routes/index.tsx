import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Shield, Clock, Star, CheckCircle2, Calendar, Phone, MessageSquare, Droplets, Zap, Award, ChevronDown, Users, Instagram, Twitter, Mail } from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import home from "@/assets/home.jpg";
import cleanCarImg from "@/assets/clean.png";
import dirtyCarImg from "@/assets/dirty.png";
import { CATEGORIES } from "@/components/site/categories";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { QuoteButton } from "@/components/site/Chrome";
import { CleanBrush } from "@/components/site/CleanBrush";
import { Reveal } from "@/components/site/Reveal";
import { Loader } from "@/components/site/Loader";
import { seo } from "@/components/site/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Beyond1 — A Cleaner Space Starts Here", "Professional automotive, residential and commercial cleaning. Detailing, power washing, office cleaning and more."),
  component: Index,
});

const TRUST = ["Professional Service", "Attention to Detail", "Residential & Commercial", "Reliable Scheduling", "Quality Results"];

const FEATURES = [
  {
    icon: Sparkles,
    title: "Premium Products",
    desc: "We use only eco-friendly, professional-grade cleaning solutions that deliver exceptional results without harmful chemicals.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    desc: "Complete coverage and bonded service for your peace of mind. Your property is protected at every step.",
  },
  {
    icon: Clock,
    title: "On-Time Every Time",
    desc: "We respect your schedule. Arrive when promised, finish on time, and never leave you waiting.",
  },
  {
    icon: Award,
    title: "5-Star Rated",
    desc: "Consistently top-rated by our customers. Quality work that speaks for itself through hundreds of reviews.",
  },
];

const STATS = [
  { number: "5000+", label: "Vehicles Detailed" },
  { number: "1200+", label: "Homes Cleaned" },
  { number: "98%", label: "Customer Satisfaction" },
  { number: "24/7", label: "Support Available" },
];

const PROCESS_STEPS = [
  {
    icon: Phone,
    title: "Get in Touch",
    desc: "Call, text, or use our quote form. Tell us what needs cleaning.",
  },
  {
    icon: Calendar,
    title: "Schedule Service",
    desc: "Pick a time that works for you. We'll confirm and send a reminder.",
  },
  {
    icon: Droplets,
    title: "We Clean",
    desc: "Our team arrives on time with everything needed to get the job done right.",
  },
  {
    icon: CheckCircle2,
    title: "Inspect & Enjoy",
    desc: "Walk through the results with us. Only pay when you're completely satisfied.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    content: "The team transformed our driveway and garage. It looks brand new! Professional, punctual, and the results exceeded our expectations.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Car Enthusiast",
    content: "Best detailing service I've ever used. They treated my car like it was their own. Every inch was spotless. Worth every penny.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Office Manager",
    content: "We've been using them for our office cleaning for 6 months. Consistent quality, reliable schedule, and great communication.",
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    question: "How far in advance should I book?",
    answer: "For residential and automotive services, we can often accommodate same-day or next-day bookings. Commercial contracts are scheduled weekly or monthly based on your needs.",
  },
  {
    question: "Do you bring your own supplies and equipment?",
    answer: "Yes! We arrive fully equipped with professional-grade cleaning solutions, tools, and equipment. You don't need to provide anything.",
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "Your satisfaction is our priority. If anything doesn't meet your expectations, let us know immediately and we'll make it right at no extra charge.",
  },
  {
    question: "Are your cleaning products safe for pets and children?",
    answer: "Absolutely. We use eco-friendly, non-toxic cleaning solutions that are safe for your family and pets while still delivering professional results.",
  },
  {
    question: "Do you offer recurring service discounts?",
    answer: "Yes! We offer discounted rates for weekly, bi-weekly, and monthly service plans. Contact us for a custom quote based on your needs.",
  },
];

// Framer Motion Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

function FAQItem({ question, answer, delay = 0 }: { question: string; answer: string; delay?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Reveal delay={delay}>
      <div className="border-b border-border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex w-full items-center justify-between py-6 text-left transition-colors hover:text-primary"
        >
          <h3 className="text-lg font-bold pr-8">{question}</h3>
          <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <p className="text-muted-foreground leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}



function Index() {
  const { scrollY } = useScroll();
  const carY = useTransform(scrollY, [0, 500], [0, -50]);
  const carOpacity = useTransform(scrollY, [0, 300], [1, 0.85]);
  
  return (
    <>
      {/* PREMIUM LOADER */}
      <Loader />
      
      {/* HERO - Car Centered with Text Around */}
      <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-background via-surface/30 to-background">
        <div className="container-x relative min-h-[100svh] flex flex-col items-center justify-center py-12 gap-4">
          
          {/* Top Text - Above Car - Just Quote */}
          <div className="relative z-20 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-semibold text-primary uppercase tracking-wider"
            >
              Never stop playing in mud
            </motion.p>
          </div>

          {/* Center - Car with Hood Text */}
          <motion.div 
            style={{ y: carY, opacity: carOpacity }}
            className="relative z-10 w-full max-w-[90vw] px-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative pointer-events-auto cursor-crosshair"
            >
              {/* Text on Car Hood */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
              >
                <p className="text-xs md:text-sm font-bold text-foreground/60 tracking-widest uppercase">
                  Shine Like New
                </p>
              </motion.div>
              
              {/* Glow Effect */}
              <motion.div 
                animate={{ 
                  opacity: [0.15, 0.3, 0.15],
                  scale: [1, 1.08, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-12 bg-gradient-radial from-primary/15 via-transparent to-transparent blur-3xl"
              />
              
              {/* Shadow */}
              <motion.div 
                animate={{ 
                  opacity: [0.2, 0.35, 0.2],
                  scaleX: [0.85, 1, 0.85]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 left-[10%] right-[10%] h-20 bg-foreground/10 blur-3xl rounded-full"
              />
              
              <CleanBrush 
                cleanSrc={cleanCarImg} 
                dirtySrc={dirtyCarImg} 
                alt="Car detailing service" 
                width={1600} 
                height={894} 
              />
            </motion.div>
          </motion.div>

          {/* Bottom Text - Below Car - All Content */}
          <div className="relative z-20 text-center">
            {/* Main Headings */}
            <div className="overflow-hidden mb-1">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground/80 leading-tight"
              >
                Cleaning & Detailing
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-4">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground/80 leading-tight"
              >
                Services
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4"
            >
              Automotive • Residential • Commercial Cleaning — Professional services for vehicles, homes, and businesses
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <QuoteButton className="px-8 py-4 text-base shadow-xl">
                  Get Free Quote
                </QuoteButton>
              </motion.div>
              
              <Link to="/services">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-foreground rounded-full border-2 border-border hover:border-foreground transition-all"
                >
                  View All Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Top Right - Service Stats Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute top-32 right-8 z-30"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-sm p-6 shadow-xl"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Happy Clients
                    </p>
                    <motion.p 
                      className="text-3xl font-bold text-foreground"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      5000+
                    </motion.p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                  <span className="text-muted-foreground">Serving GTA since 2020</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Social Icons */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30"
          >
            {[Instagram, Twitter, Phone, Mail].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + i * 0.1 }}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 5,
                  backgroundColor: "var(--color-foreground)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
                className="h-12 w-12 rounded-full bg-card border border-border hover:border-foreground flex items-center justify-center shadow-sm transition-colors group"
              >
                <Icon className="h-5 w-5 text-foreground/70 group-hover:text-background transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Bottom Right - Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
            className="absolute bottom-8 right-8 z-30"
          >
            <motion.button
              animate={{ y: [0, -12, 0] }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
            >
              <ArrowRight className="h-5 w-5 rotate-90" />
            </motion.button>
          </motion.div>

          {/* Decorative Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute left-16 top-1/3 w-24 h-24 rounded-full bg-primary/5 blur-2xl"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              x: [0, -10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute right-24 bottom-1/4 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
          />

        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-surface overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex items-center gap-x-10 py-8 whitespace-nowrap"
        >
          {[...TRUST, ...TRUST, ...TRUST].map((t, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />{t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="container-x py-28 md:py-40">
        <Reveal className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">What we do</p>
            <h2 className="display mt-6 text-4xl md:text-6xl lg:text-7xl">One company.<br />Three ways to keep<br />your world clean.</h2>
          </div>
          <p className="md:col-span-4 self-end text-muted-foreground leading-relaxed">
            From a mud-caked car to an office floor at closing time — one team, one standard, applied to everything we touch.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={i === 1 ? "md:mt-16" : ""}
            >
              <Link to={c.to} className="group block">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[3/4] overflow-hidden rounded-3xl"
                >
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.2 }}
                    src={c.img} 
                    alt={`${c.key} cleaning`} 
                    loading="lazy" 
                    width={1280} 
                    height={960} 
                    className="h-full w-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-background">
                    <motion.span 
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.5, duration: 0.6 }}
                      className="block h-0.5 bg-primary"
                    />
                    <motion.div 
                      className="mt-4 flex items-end justify-between"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="display text-4xl">{c.key}</h3>
                      <motion.span 
                        whileHover={{ rotate: 45, backgroundColor: "var(--color-primary)" }}
                        transition={{ duration: 0.3 }}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.span>
                    </motion.div>
                    <motion.p 
                      initial={{ maxHeight: 0, opacity: 0 }}
                      whileHover={{ maxHeight: 80, opacity: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="mt-2 overflow-hidden text-sm"
                    >
                      {c.desc}
                    </motion.p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECOND BEFORE/AFTER */}
      <section className="bg-surface py-28 md:py-36">
        <div className="container-x grid items-center gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Home exterior</p>
            <h2 className="display mt-6 text-4xl md:text-5xl">Years of grime.<br />One afternoon.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">Power washing that lifts built-up dirt from driveways, garages and pathways — drag to see the difference.</p>
            <Link to="/services/home" className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary">
              Home services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <Reveal className="md:col-span-8" variant="clip-reveal">
            <BeforeAfter beforeSrc={home} alt="Driveway" initial={45} className="aspect-[16/10] rounded-3xl" width={1280} height={960} />
          </Reveal>
        </div>
      </section>

      {/* FEATURES CARDS */}
      <section className="container-x py-28 md:py-40">
        <Reveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">Why choose us</p>
          <h2 className="display mt-6 text-4xl md:text-6xl">Built on trust.<br />Backed by results.</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We don't just clean — we build relationships through consistent quality and reliable service.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 100}>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 h-20 w-20 bg-primary/10 rounded-full blur-2xl" />
                </div>
                <div className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                  >
                    <feature.icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="mt-6 text-xl font-bold transition-colors group-hover:text-primary">{feature.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative overflow-hidden bg-foreground py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />
        
        {/* Animated Background Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        
        <div className="container-x relative">
          <div className="grid gap-12 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  className="display text-5xl md:text-6xl text-primary"
                >
                  <motion.span
                    whileInView={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{
                      backgroundSize: "200% 200%",
                      backgroundImage: "linear-gradient(90deg, currentColor 0%, #ff6b6b 50%, currentColor 100%)"
                    }}
                    className="inline-block bg-clip-text"
                  >
                    {stat.number}
                  </motion.span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className="mt-3 text-sm font-semibold tracking-wide text-background/80 uppercase"
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="container-x py-28 md:py-40">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <p className="eyebrow">How it works</p>
          <h2 className="display mt-6 text-4xl md:text-6xl">Simple process.<br />Powerful results.</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            From first contact to final walkthrough — we've streamlined every step to make professional cleaning effortless.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="relative"
            >
              {/* Connecting Line (desktop only) */}
              {i < PROCESS_STEPS.length - 1 && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5, duration: 0.8 }}
                  className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent origin-left"
                />
              )}
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl border border-border bg-card p-8 hover:shadow-xl hover:border-primary/30 transition-all"
              >
                {/* Step Number Badge */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                  className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg"
                >
                  {i + 1}
                </motion.div>
                
                {/* Icon */}
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                >
                  <step.icon className="h-8 w-8" />
                </motion.div>
                
                {/* Content */}
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-surface py-28 md:py-40">
        <div className="container-x">
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="eyebrow">Testimonials</p>
            <h2 className="display mt-6 text-4xl md:text-6xl">Loved by our<br />customers.</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Don't take our word for it — hear from the people who trust us with their spaces.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={i * 100}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:shadow-xl hover:border-primary/30 transition-all"
                >
                  <motion.div 
                    className="flex gap-1 mb-6"
                  >
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15 + idx * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <Star className="h-5 w-5 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="text-foreground leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <div className="absolute top-6 right-6 text-6xl text-primary/5 font-serif">"</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container-x py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">FAQ</p>
            <h2 className="display mt-6 text-4xl md:text-5xl lg:text-6xl">Questions?<br />We've got<br />answers.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Can't find what you're looking for? Our team is ready to help.
            </p>
            <Link to="/contact" className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary">
              Contact us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="md:col-span-7">
            {FAQ_ITEMS.map((faq, i) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="container-x pb-28 md:pb-40">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-deep to-foreground p-12 md:p-16 lg:p-20">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                <Users className="h-4 w-4" />
                Limited Time Offer
              </div>
              <h2 className="display mt-6 text-4xl md:text-5xl lg:text-6xl text-white">
                First-Time Customer?<br />Get <span className="text-yellow-300">20% Off</span>
              </h2>
              <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                Experience our professional service at a special introductory rate. Valid for all automotive, residential, and commercial cleaning services.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <QuoteButton className="px-8 py-5 text-base bg-white text-foreground hover:bg-white/90" />
                <Link to="/services" className="group inline-flex items-center gap-2 px-8 py-5 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-colors">
                  View Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <p className="mt-6 text-sm text-white/70">*Offer valid for new customers only. Some restrictions apply.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-x py-28 md:py-40">
        <Reveal className="grid gap-10 md:grid-cols-12 md:items-end">
          <h2 className="display md:col-span-8 text-5xl md:text-7xl lg:text-8xl">The clean<br />you can <span className="text-primary">see.</span></h2>
          <div className="md:col-span-4">
            <p className="text-muted-foreground leading-relaxed">Tell us what needs cleaning. We'll recommend the right service and get back to you with a quote.</p>
            <QuoteButton className="mt-8 px-7 py-4 text-base" />
          </div>
        </Reveal>
      </section>
    </>
  );
}

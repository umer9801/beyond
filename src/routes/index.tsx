import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles, Shield, Clock, Star, CheckCircle2, Calendar, Phone, MessageSquare, Droplets, Zap, Award, ChevronDown, Users, Instagram, Twitter, Mail } from "lucide-react";
import { useState, useRef } from "react";
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
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
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
      
      {/* HERO - Luxury Automotive Feel */}
      <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-background via-surface/50 to-background">
        {/* Premium Background Animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          
          {/* Diagonal Animated Lines - Dark Grey */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`diagonal-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
              style={{
                width: '150%',
                top: `${i * 10}%`,
                left: '-25%',
                transform: 'rotate(-20deg)',
              }}
              animate={{
                x: ['-10%', '10%'],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Vertical Scanning Lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`vertical-${i}`}
              className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-foreground/25 to-transparent"
              style={{
                left: `${15 + i * 15}%`,
              }}
              animate={{
                opacity: [0.25, 0.5, 0.25],
                scaleY: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Grid Pattern - Subtle */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(23, 26, 24, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(23, 26, 24, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
            animate={{
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Large Sweeping Lines */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`sweep-${i}`}
              className="absolute h-1 bg-gradient-to-r from-transparent via-foreground/35 to-transparent"
              style={{
                width: '120%',
                left: '-10%',
                top: `${25 + i * 25}%`,
              }}
              animate={{
                x: ['-20%', '20%'],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 18 + i * 4,
                repeat: Infinity,
                delay: i * 3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Floating Rectangles - Dark */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`rect-${i}`}
              className="absolute border-2 border-foreground/25 bg-foreground/5"
              style={{
                width: `${120 + i * 40}px`,
                height: `${80 + i * 30}px`,
                left: `${10 + i * 22}%`,
                top: `${15 + i * 18}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 5, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Radial Pulse Circles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute rounded-full border-2 border-foreground/30"
              style={{
                width: `${200 + i * 150}px`,
                height: `${200 + i * 150}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 12 + i * 4,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Dot Matrix Pattern */}
          <div className="absolute inset-0 opacity-80">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-2 h-2 rounded-full bg-foreground/30"
                style={{
                  left: `${(i % 5) * 20 + 10}%`,
                  top: `${Math.floor(i / 5) * 20 + 10}%`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay for Depth */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-foreground/12 via-transparent to-foreground/12"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

        </div>

        <div className="container-x relative min-h-[100svh] flex flex-col items-center justify-center py-20 gap-8 z-10">
          
          {/* Headings */}
          <div className="relative z-20 text-center w-full">
            <div className="overflow-hidden mb-2">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-tight"
              >
                Cleaning & Detailing
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-tight"
              >
                Services
              </motion.h1>
            </div>
          </div>

          {/* Car */}
          <motion.div 
            style={{ y: carY, opacity: carOpacity }}
            className="relative z-10 w-full max-w-6xl px-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative pointer-events-auto cursor-crosshair"
            >
              {/* Text on Car Hood */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
              >
                <motion.p 
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-xs md:text-sm font-bold text-primary tracking-widest uppercase"
                >
                  Swipe to Clean
                </motion.p>
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

          {/* Description & Buttons */}
          <div className="relative z-20 text-center w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6"
            >
              Automotive • Residential • Commercial Cleaning — Professional services for vehicles, homes, and businesses
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-6"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <QuoteButton className="px-8 py-4 text-base shadow-xl bg-primary hover:bg-primary-deep">
                  Book a Cleaning
                </QuoteButton>
              </motion.div>
              
              <Link to="/services">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-foreground rounded-full border-2 border-foreground/20 hover:border-foreground bg-background/50 backdrop-blur-sm transition-all"
                >
                  View Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Service Stats Badge - Moved Below Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card backdrop-blur-sm p-6 shadow-lg"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
                
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center"
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
                    <div className="flex items-center gap-2 text-xs ml-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-2 w-2 rounded-full bg-primary"
                      />
                      <span className="text-muted-foreground whitespace-nowrap">Since 2020</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Social Icons (Hidden on Mobile) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-30"
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
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-10 md:grid-cols-12"
        >
          <motion.div variants={staggerItem} className="md:col-span-8">
            <motion.p 
              variants={staggerItem}
              className="eyebrow"
            >
              What we do
            </motion.p>
            <motion.h2 
              variants={staggerItem}
              className="display mt-6 text-4xl md:text-6xl lg:text-7xl"
            >
              One company.<br />Three ways to keep<br />your world clean.
            </motion.h2>
          </motion.div>
          <motion.p 
            variants={staggerItem}
            className="md:col-span-4 self-end text-muted-foreground leading-relaxed"
          >
            From a mud-caked car to an office floor at closing time — one team, one standard, applied to everything we touch.
          </motion.p>
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ 
                opacity: 0, 
                x: i === 0 ? -120 : i === 1 ? 0 : 120,
                y: i === 1 ? 80 : 40,
                rotateY: i === 0 ? -20 : i === 1 ? 0 : 20
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: i * 0.18, 
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={i === 1 ? "md:mt-16" : ""}
            >
              <Link to={c.to} className="group block">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl"
                >
                  <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    src={c.img} 
                    alt={`${c.key} cleaning`} 
                    loading="lazy" 
                    width={1280} 
                    height={960} 
                    className="h-full w-full object-cover" 
                  />
                  <motion.div 
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" 
                  />
                  <div className="absolute inset-x-6 bottom-6 text-background">
                    <motion.span 
                      initial={{ width: 0 }}
                      whileInView={{ width: "60px" }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.5, duration: 0.6 }}
                      className="block h-1 bg-background/80 mb-4 rounded-full"
                    />
                    <motion.h3 
                      className="text-3xl font-bold mb-2"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {c.label}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-background/80"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {c.desc}
                    </motion.p>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-6 right-6 h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <ArrowUpRight className="h-5 w-5 text-background" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECOND BEFORE/AFTER */}
      <section className="bg-surface py-28 md:py-36">
        <div className="container-x grid items-center gap-12 md:grid-cols-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="md:col-span-4"
          >
            <p className="eyebrow">Home exterior</p>
            <h2 className="display mt-6 text-4xl md:text-5xl">Years of grime.<br />One afternoon.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">Power washing that lifts built-up dirt from driveways, garages and pathways — drag to see the difference.</p>
            <Link to="/services/home" className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary">
              Home services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
            className="md:col-span-8"
          >
            <BeforeAfter beforeSrc={home} alt="Driveway" initial={45} className="aspect-[16/10] rounded-3xl shadow-2xl" width={1280} height={960} />
          </motion.div>
        </div>
      </section>

      {/* FEATURES CARDS */}
      <section className="container-x py-28 md:py-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.p variants={staggerItem} className="eyebrow">Why choose us</motion.p>
          <motion.h2 variants={staggerItem} className="display mt-6 text-4xl md:text-6xl">Built on trust.<br />Backed by results.</motion.h2>
          <motion.p variants={staggerItem} className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We don't just clean — we build relationships through consistent quality and reliable service.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ 
                opacity: 0, 
                x: i % 2 === 0 ? -100 : 100,
                y: 50,
                rotateY: i % 2 === 0 ? -20 : 20
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0,
                rotateY: 0
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: (i % 4) * 0.12, 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                z: 50,
                transition: { 
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                } 
              }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* Animated Background Gradient */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent"
              />
              
              {/* Glow Effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div 
                  animate={{ 
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 h-32 w-32 bg-primary/20 rounded-full blur-3xl" 
                />
                <motion.div 
                  animate={{ 
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 h-32 w-32 bg-accent/20 rounded-full blur-3xl" 
                />
              </div>

              <div className="relative" style={{ transform: "translateZ(30px)" }}>
                {/* Icon with Animation */}
                <motion.div 
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6"
                >
                  <feature.icon className="h-7 w-7" />
                </motion.div>

                <motion.h3 
                  className="text-xl font-bold mb-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {feature.desc}
                </motion.p>

                {/* Hover Arrow Indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 flex items-center gap-2 text-primary text-sm font-semibold"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </div>

              {/* Shine Effect on Hover */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "200%", opacity: [0, 0.5, 0] }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </motion.div>
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
                initial={{ 
                  opacity: 0, 
                  x: i % 2 === 0 ? -80 : 80,
                  y: 50,
                  rotateY: i % 2 === 0 ? -25 : 25
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  y: 0,
                  rotateY: 0
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: (i % 4) * 0.12, 
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.1,
                  y: -10,
                  rotateY: i % 2 === 0 ? 5 : -5,
                  transition: { duration: 0.3 }
                }}
                className="text-center"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: i * 0.12 + 0.3, 
                    type: "spring", 
                    stiffness: 200,
                    damping: 10
                  }}
                  className="display text-5xl md:text-6xl text-primary"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{
                      backgroundSize: "200% 200%",
                      backgroundImage: "linear-gradient(90deg, currentColor 0%, #A8CDB8 50%, currentColor 100%)"
                    }}
                    className="inline-block bg-clip-text"
                  >
                    {stat.number}
                  </motion.span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.5 }}
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p variants={staggerItem} className="eyebrow">How it works</motion.p>
          <motion.h2 variants={staggerItem} className="display mt-6 text-4xl md:text-6xl">Simple process.<br />Powerful results.</motion.h2>
          <motion.p variants={staggerItem} className="mt-6 text-lg text-muted-foreground leading-relaxed">
            From first contact to final walkthrough — we've streamlined every step to make professional cleaning effortless.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ 
                opacity: 0,
                x: i % 2 === 0 ? -100 : 100,
                y: 60,
                rotateY: i % 2 === 0 ? -30 : 30,
              }}
              whileInView={{ 
                opacity: 1,
                x: 0,
                y: 0,
                rotateY: 0,
              }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                delay: (i % 4) * 0.15,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.05,
                y: -12,
                rotateY: i % 2 === 0 ? 8 : -8,
                transition: { duration: 0.4 }
              }}
              className="relative group"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1200px"
              }}
            >
              <motion.div className="relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500">
                {/* Animated Step Number */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15 + 0.3,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {i + 1}
                </motion.div>

                {/* Background Gradient on Hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"
                />

                <div className="relative" style={{ transform: "translateZ(20px)" }}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -12, 12, -12, 0],
                      transition: { duration: 0.6 }
                    }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6"
                  >
                    <step.icon className="h-8 w-8" />
                  </motion.div>

                  <motion.h3
                    className="text-xl font-bold mb-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {step.desc}
                  </motion.p>
                </div>

                {/* Connecting Arrow (except last one) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.3 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.6 }}
                    className="hidden lg:block absolute top-1/2 -right-4 translate-x-full"
                  >
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </motion.div>
                )}

                {/* Shine Effect */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "200%", opacity: [0, 0.3, 0] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-surface py-28 md:py-40">
        <div className="container-x">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.p variants={staggerItem} className="eyebrow">Testimonials</motion.p>
            <motion.h2 variants={staggerItem} className="display mt-6 text-4xl md:text-6xl">Loved by our<br />customers.</motion.h2>
            <motion.p variants={staggerItem} className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Don't take our word for it — hear from the people who trust us with their spaces.
            </motion.p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div 
                key={testimonial.name}
                initial={{ 
                  opacity: 0, 
                  x: i % 2 === 0 ? -100 : 100,
                  y: 60,
                  rotateY: i % 2 === 0 ? -25 : 25
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  y: 0,
                  rotateY: 0
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: (i % 3) * 0.15, 
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  rotateY: i % 2 === 0 ? 5 : -5,
                  transition: { duration: 0.4 } 
                }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Background Glow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
                />

                <div className="relative" style={{ transform: "translateZ(20px)" }}>
                  {/* Star Rating */}
                  <motion.div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: i * 0.15 + idx * 0.08, 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      >
                        <Star className="h-5 w-5 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p 
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-foreground leading-relaxed italic mb-6"
                  >
                    "{testimonial.content}"
                  </motion.p>

                  <div className="pt-6 border-t border-border">
                    <motion.p 
                      className="font-bold"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {testimonial.name}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                {/* Quote Icon Background */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                  whileInView={{ opacity: 0.05, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                  className="absolute top-6 right-6 text-6xl text-primary font-serif pointer-events-none"
                >
                  "
                </motion.div>

                {/* Shine Effect */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "200%", opacity: [0, 0.3, 0] }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container-x py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="md:col-span-5"
          >
            <motion.p variants={staggerItem} className="eyebrow">FAQ</motion.p>
            <motion.h2 variants={staggerItem} className="display mt-6 text-4xl md:text-5xl lg:text-6xl">Questions?<br />We've got<br />answers.</motion.h2>
            <motion.p variants={staggerItem} className="mt-6 text-muted-foreground leading-relaxed">
              Can't find what you're looking for? Our team is ready to help.
            </motion.p>
            <motion.div variants={staggerItem}>
              <Link to="/contact" className="group mt-8 inline-flex items-center gap-2 font-semibold text-primary">
                Contact us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="md:col-span-7"
          >
            {FAQ_ITEMS.map((faq, i) => (
              <motion.div
                key={faq.question}
                variants={staggerItem}
              >
                <FAQItem question={faq.question} answer={faq.answer} delay={i * 80} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="container-x pb-28 md:pb-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-deep to-foreground p-12 md:p-16 lg:p-20 shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/5" />
            
            {/* Animated Background Blobs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -50, -100],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
                className="absolute"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: '20%',
                }}
              >
                <Sparkles className="h-6 w-6 text-yellow-300" />
              </motion.div>
            ))}
            
            <div className="relative text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="h-4 w-4" />
                </motion.div>
                Limited Time Offer
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="display mt-6 text-4xl md:text-5xl lg:text-6xl text-white"
              >
                First-Time Customer?<br />
                Get{" "}
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(253, 224, 71, 0.5)",
                      "0 0 40px rgba(253, 224, 71, 0.8)",
                      "0 0 20px rgba(253, 224, 71, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-yellow-300"
                >
                  20% Off
                </motion.span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
              >
                Experience our professional service at a special introductory rate. Valid for all automotive, residential, and commercial cleaning services.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <QuoteButton className="px-8 py-5 text-base bg-white text-foreground hover:bg-white/90 shadow-xl" />
                </motion.div>
                
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-2 px-8 py-5 rounded-xl font-semibold text-white border-2 border-white/30 transition-colors"
                  >
                    View Services
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-sm text-white/70"
              >
                *Offer valid for new customers only. Some restrictions apply.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container-x py-28 md:py-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-10 md:grid-cols-12 md:items-end"
        >
          <motion.h2 variants={staggerItem} className="display md:col-span-8 text-5xl md:text-7xl lg:text-8xl">
            The clean<br />you can <span className="text-primary">see.</span>
          </motion.h2>
          <motion.div variants={staggerItem} className="md:col-span-4">
            <p className="text-muted-foreground leading-relaxed">Tell us what needs cleaning. We'll recommend the right service and get back to you with a quote.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <QuoteButton className="mt-8 px-7 py-4 text-base shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

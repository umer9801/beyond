import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { 
  Car, Sparkles, Wind, Droplets, Shield, Wrench,
  Home, Power, Fence, Lightbulb, Package, Blinds,
  Building2, Briefcase, CalendarCheck, Zap
} from "lucide-react";
import { PageHero } from "@/components/site/Chrome";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/components/site/seo";

export const Route = createFileRoute("/services")({
  head: () => seo("Our Services — Premium Cleaning for Auto, Home & Business", "Complete cleaning solutions: Car detailing, power washing, commercial cleaning and more."),
  component: Services,
});

const AUTO_SERVICES = [
  { icon: Car, title: "Car Detailing", desc: "Complete interior and exterior detailing to restore your vehicle's showroom shine." },
  { icon: Sparkles, title: "Alloy Wheel Cleaning", desc: "Deep cleaning and polishing to remove brake dust and restore wheel brilliance." },
  { icon: Wrench, title: "Engine Bay Cleaning", desc: "Professional degreasing and detailing for a pristine engine compartment." },
  { icon: Shield, title: "Stain Removal", desc: "Advanced techniques to eliminate tough stains from upholstery and carpets." },
  { icon: Wind, title: "Odour Removal", desc: "Complete odour elimination using professional-grade treatments and sanitization." },
];

const HOME_SERVICES = [
  { icon: Power, title: "Powerwashing", desc: "High-pressure cleaning for driveways, patios, and exterior surfaces." },
  { icon: Fence, title: "Driveway / Garage Cleaning", desc: "Remove years of buildup, oil stains, and dirt from concrete surfaces." },
  { icon: Droplets, title: "Carpet Cleaning", desc: "Deep steam cleaning to refresh and sanitize your carpets." },
  { icon: Home, title: "Deep Cleaning", desc: "Thorough top-to-bottom cleaning for every room in your home." },
  { icon: Wrench, title: "Gutter Cleaning", desc: "Clear blockages and ensure proper water drainage from your gutters." },
  { icon: Lightbulb, title: "Groove Lights Installation", desc: "Professional installation of decorative groove lighting systems." },
  { icon: Package, title: "Pot Lights Replacement", desc: "Expert replacement and upgrade of recessed lighting fixtures." },
  { icon: Blinds, title: "Window Blinds Installation", desc: "Precise measurement and installation of custom window blinds." },
];

const BUSINESS_SERVICES = [
  { icon: Building2, title: "Weekly Commercial Cleaning", desc: "Regular scheduled cleaning to maintain professional office spaces." },
  { icon: Briefcase, title: "Bundle Packages Available", desc: "Customized service bundles tailored to your business needs and budget." },
  { icon: CalendarCheck, title: "Flexible Scheduling", desc: "After-hours and weekend services to avoid disrupting your business." },
  { icon: Zap, title: "Rapid Response", desc: "Emergency cleaning services available for urgent situations." },
];

function ServiceCard({ service, index }: { service: typeof AUTO_SERVICES[0]; index: number }) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: index % 2 === 0 ? -100 : 100,
        y: 50,
        rotateY: index % 2 === 0 ? -20 : 20
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: (index % 3) * 0.15, 
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3 } }}
      className="group relative"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <motion.div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 h-full">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Glow effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
        </div>

        <div className="relative">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
          >
            <service.icon className="h-8 w-8" />
          </motion.div>

          {/* Content */}
          <h3 className="mt-6 text-xl font-bold transition-colors group-hover:text-primary">
            {service.title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {service.desc}
          </p>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            className="mt-6 h-0.5 bg-primary origin-left"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceSection({ 
  title, 
  icon: Icon, 
  services, 
  description,
  delay = 0 
}: { 
  title: string; 
  icon: any; 
  services: typeof AUTO_SERVICES; 
  description: string;
  delay?: number;
}) {
  return (
    <section className="py-20">
      <Reveal delay={delay}>
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
          >
            <Icon className="h-7 w-7" />
          </motion.div>
          <div>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl text-foreground">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground mt-2">{description}</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        eyebrow="Services at a glance"
        title={
          <>
            Complete cleaning solutions<br />
            for every need.
          </>
        }
        intro="From automotive detailing to home maintenance and commercial cleaning — we bring professional results to every project."
      />

      {/* Services Grid */}
      <section className="container-x pb-28">
        
        {/* AUTO SERVICES */}
        <ServiceSection
          title="AUTO"
          icon={Car}
          services={AUTO_SERVICES}
          description="Professional car care and detailing services"
          delay={0}
        />

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-20 origin-center"
        />

        {/* HOME SERVICES */}
        <ServiceSection
          title="HOME"
          icon={Home}
          services={HOME_SERVICES}
          description="Residential cleaning and home improvement"
          delay={100}
        />

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-20 origin-center"
        />

        {/* BUSINESS SERVICES */}
        <ServiceSection
          title="BUSINESS"
          icon={Building2}
          services={BUSINESS_SERVICES}
          description="Commercial cleaning and maintenance solutions"
          delay={200}
        />
      </section>

      {/* CTA Section */}
      <section className="bg-foreground py-20 md:py-28">
        <div className="container-x text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Clean Spaces. Better Vibes.
            </p>
            <h2 className="display text-4xl md:text-6xl text-background mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-background/80 max-w-2xl mx-auto mb-8">
              Contact us today for a free quote. Professional service, transparent pricing, guaranteed results.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <motion.a
                href="tel:6476468756"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold shadow-xl hover:shadow-2xl transition-shadow"
              >
                Call: 647 646 8756
              </motion.a>
              
              <motion.a
                href="mailto:sarpreet7171sandhu@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-background text-foreground font-bold border-2 border-background hover:bg-background/90 transition-colors"
              >
                Email Us
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/Chrome";
import { Reveal } from "@/components/site/Reveal";
import { CATEGORIES } from "@/components/site/categories";
import { seo } from "@/components/site/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => seo("Services — Redline Clean", "Auto detailing, home exterior care and commercial cleaning. Explore every service we offer."),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title={<>Cleaning<br />without<br /><span className="text-primary">compromise.</span></>} intro="Three disciplines, one standard. Choose a category to see exactly what we do." />
      <div className="container-x pb-32">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.key}>
            <Link to={c.to} className="group grid items-center gap-8 border-t border-border py-14 md:grid-cols-12 md:gap-12">
              <div className={cn("md:col-span-7 overflow-hidden rounded-3xl aspect-[16/10]", i % 2 && "md:order-2")}>
                <img src={c.img} alt={c.key} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              </div>
              <div className="md:col-span-5">
                <p className="text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")} — {c.count} services</p>
                <h2 className="display mt-4 text-6xl md:text-8xl transition-transform duration-500 group-hover:translate-x-2">{c.key}</h2>
                <p className="mt-6 max-w-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                <span className="mt-8 inline-flex items-center gap-3 font-semibold">
                  View Services
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

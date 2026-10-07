import { Reveal } from "./Reveal";
import { BeforeAfter } from "./BeforeAfter";
import { QuoteButton, PageHero } from "./Chrome";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ServiceItem = {
  title: string;
  body: string;
  items: string[];
  image: string;
  compare?: boolean;
};

export function ServiceDetail({ eyebrow, title, intro, services, cta = "Get a Quote", children }: {
  eyebrow: string; title: string; intro: string; services: ServiceItem[]; cta?: string; children?: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <div className="container-x space-y-28 pb-28 md:space-y-40">
        {services.map((s, i) => (
          <article key={s.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
            <Reveal className={cn("md:col-span-7", i % 2 && "md:order-2")} variant="clip-reveal">
              {s.compare ? (
                <BeforeAfter beforeSrc={s.image} alt={s.title} initial={40} className="aspect-[4/3] rounded-3xl" width={1280} height={960} />
              ) : (
                <div className="group aspect-[4/3] overflow-hidden rounded-3xl">
                  <img src={s.image} alt={s.title} loading="lazy" width={1280} height={960} className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                </div>
              )}
            </Reveal>
            <Reveal className="md:col-span-5" delay={150}>
              <p className="text-sm font-bold text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <Reveal variant="red-line" className="mt-3 w-12" />
              <h2 className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{s.title}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{s.body}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{it}
                  </li>
                ))}
              </ul>
            </Reveal>
          </article>
        ))}
        {children}
        <Reveal className="flex flex-col items-start justify-between gap-8 border-t border-border pt-16 md:flex-row md:items-end">
          <h3 className="display text-4xl md:text-6xl">Ready when<br />you are.</h3>
          <QuoteButton className="px-7 py-4 text-base">{cta}</QuoteButton>
        </Reveal>
      </div>
    </>
  );
}

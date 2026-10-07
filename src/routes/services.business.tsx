import { createFileRoute } from "@tanstack/react-router";
import business from "@/assets/business.jpg";
import home from "@/assets/home.jpg";
import { ServiceDetail } from "@/components/site/ServiceDetail";
import { Reveal } from "@/components/site/Reveal";
import { QuoteButton } from "@/components/site/Chrome";
import { seo } from "@/components/site/seo";

const PLANS = [
  { name: "Weekly", note: "For busy, high-traffic spaces." },
  { name: "Bi-weekly", note: "Consistent standards, balanced cost." },
  { name: "Monthly", note: "Regular deep-clean maintenance." },
  { name: "Custom", note: "Built around your hours." },
];

export const Route = createFileRoute("/services/business")({
  head: () => seo("Business Care — Commercial Cleaning | Redline Clean", "Office, retail, floor, glass and deep commercial cleaning, plus scheduled cleaning plans."),
  component: () => (
    <ServiceDetail
      eyebrow="Business Services"
      title="Business care"
      cta="Request a Commercial Quote"
      intro="Reliable cleaning and maintenance solutions designed for commercial environments, workplaces and customer-facing spaces."
      services={[
        { title: "Commercial Office Cleaning", body: "For offices, workspaces, meeting rooms, reception and common areas.", image: business, items: ["Surface cleaning", "Floor cleaning", "Workstation cleaning", "Dust removal", "Sanitization"] },
        { title: "Retail & Commercial Space Cleaning", body: "Keeping stores, showrooms and customer-facing spaces clean and presentable.", image: business, compare: true, items: ["Retail stores", "Showrooms", "Customer-facing spaces", "Commercial properties"] },
        { title: "Floor & Surface Care", body: "Cleaning and maintenance for commercial flooring and surfaces.", image: home, items: ["Deep floor cleaning", "Stain removal", "Surface maintenance", "High-traffic areas"] },
        { title: "Window & Glass Cleaning", body: "Streak-free results on every pane, inside and out.", image: business, compare: true, items: ["Commercial windows", "Glass doors", "Storefront glass", "Internal glass"] },
        { title: "Deep Commercial Cleaning", body: "Detailed cleaning beyond normal maintenance.", image: business, items: ["Deep cleaning", "Hard-to-reach areas", "High-touch surfaces", "Detailed sanitation", "Post-maintenance cleaning"] },
      ]}
    >
      <Reveal>
        <p className="text-sm font-bold text-primary">06</p>
        <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">Scheduled cleaning plans</h2>
        <div className="mt-10 grid border-y border-border md:grid-cols-4">
          {PLANS.map((p) => (
            <div key={p.name} className="group border-b border-border p-8 transition-colors hover:bg-primary-soft md:border-b-0 md:border-r last:border-r-0">
              <h3 className="text-2xl font-extrabold transition-colors group-hover:text-primary">{p.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>
        <QuoteButton className="mt-10 px-7 py-4 text-base">Request a Commercial Quote</QuoteButton>
      </Reveal>
    </ServiceDetail>
  ),
});

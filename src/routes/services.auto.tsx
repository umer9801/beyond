import { createFileRoute } from "@tanstack/react-router";
import clean from "@/assets/car-clean.png.asset.json";
import auto from "@/assets/auto.jpg";
import about from "@/assets/about.jpg";
import { ServiceDetail } from "@/components/site/ServiceDetail";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Reveal } from "@/components/site/Reveal";
import { seo } from "@/components/site/seo";

export const Route = createFileRoute("/services/auto")({
  head: () => seo("Auto Care — Car Detailing & Odour Removal | Redline Clean", "Car detailing, alloy wheel cleaning, engine bay cleaning, stain and odour removal."),
  component: () => (
    <ServiceDetail
      eyebrow="Auto Services"
      title="Auto care"
      intro="Professional vehicle cleaning and detailing designed to restore appearance, comfort and freshness."
      services={[
        { title: "Car Detailing & Alloy Wheel Cleaning", body: "Deep vehicle detailing focused on restoring the appearance of the interior and exterior.", image: about, items: ["Exterior detailing", "Interior detailing", "Alloy wheel cleaning", "Wheel and rim detailing", "Surface cleaning", "Finishing touches"] },
        { title: "Engine Bay Cleaning & Stain Removal", body: "Professional cleaning of engine bay areas and stubborn stains.", image: auto, compare: true, items: ["Engine bay cleaning", "Grease removal", "Stain treatment", "Deep surface cleaning", "Careful detailing"] },
        { title: "Odour Removal", body: "Target unwanted smells and refresh the interior environment.", image: auto, items: ["Odour treatment", "Interior refresh", "Deep cleaning", "Targeted smell removal"] },
      ]}
    >
      <Reveal className="rounded-[2rem] bg-surface p-6 md:p-12">
        <p className="eyebrow">The transformation</p>
        <BeforeAfter beforeSrc={dirty.url} afterSrc={clean.url} alt="Red car" initial={50} width={1600} height={894} className="mt-6" imgClassName="object-contain mix-blend-multiply" labels={["Dirty", "Clean"]} />
      </Reveal>
    </ServiceDetail>
  ),
});

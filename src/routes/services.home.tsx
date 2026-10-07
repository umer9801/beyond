import { createFileRoute } from "@tanstack/react-router";
import home from "@/assets/home.jpg";
import business from "@/assets/business.jpg";
import { ServiceDetail } from "@/components/site/ServiceDetail";
import { seo } from "@/components/site/seo";

export const Route = createFileRoute("/services/home")({
  head: () => seo("Home Care — Power Washing, Carpets & Gutters | Redline Clean", "Power washing, driveway and garage cleaning, carpet cleaning, gutter cleaning, groove lights and blind installation."),
  component: () => (
    <ServiceDetail
      eyebrow="Home Services"
      title="Home care"
      intro="Professional cleaning and exterior care designed to keep your home looking fresh, maintained and welcoming."
      services={[
        { title: "Power Washing + Driveway & Garage Cleaning", body: "Deep exterior cleaning that lifts built-up dirt and stains from hard surfaces.", image: home, compare: true, items: ["Driveways", "Garages", "Pathways", "Exterior surfaces", "Built-up dirt", "Stains"] },
        { title: "Carpet Cleaning + Deep Cleaning", body: "Professional carpet and deep-cleaning solutions for every room.", image: business, compare: true, items: ["Carpet cleaning", "Stain treatment", "Deep cleaning", "High-traffic areas", "Refresh and maintenance"] },
        { title: "Gutter Cleaning + Groove Light Installation", body: "Gutter cleaning combined with groove and exterior lighting installation.", image: home, items: ["Gutter cleaning", "Debris removal", "Gutter maintenance", "Groove light installation", "Exterior enhancement"] },
        { title: "Window Blind Installation", body: "Precise, tidy installation of window blinds throughout your home.", image: business, items: ["Blind installation", "Measurement assistance", "Fitting", "Finishing", "Clean installation"] },
      ]}
    />
  ),
});

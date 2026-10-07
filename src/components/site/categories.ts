import auto from "@/assets/auto.jpg";
import home from "@/assets/home.jpg";
import business from "@/assets/business.jpg";

export const CATEGORIES = [
  { key: "Auto", to: "/services/auto", img: auto, desc: "Vehicle cleaning and detailing — inside, outside and under the bonnet.", count: 3 },
  { key: "Home", to: "/services/home", img: home, desc: "Residential cleaning and exterior property care.", count: 4 },
  { key: "Business", to: "/services/business", img: business, desc: "Professional commercial cleaning and maintenance.", count: 6 },
] as const;

// Brand information for Beyond1
export const BRAND = {
  name: "Beyond1",
  full: "Beyond1 - Beyond Expectations",
  phone: "647 646 8756",
  email: "sarpreet7171sandhu@gmail.com",
  area: "Greater Toronto Area",
  hours: "Mon – Sat, 8:00 – 18:00",
};

export const SERVICE_OPTIONS = {
  Auto: ["Car Detailing", "Alloy Wheel Cleaning", "Engine Bay Cleaning", "Stain Removal", "Odour Removal"],
  Home: ["Power Washing", "Driveway Cleaning", "Garage Cleaning", "Carpet Cleaning", "Deep Cleaning", "Gutter Cleaning", "Groove Light Installation", "Window Blind Installation"],
  Business: ["Office Cleaning", "Retail Cleaning", "Floor & Surface Care", "Window & Glass Cleaning", "Deep Commercial Cleaning", "Scheduled Cleaning"],
} as const;
export type Category = keyof typeof SERVICE_OPTIONS;

export type PortfolioProject = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl: string;
  image: string;
  imageAlt: string;
  index: string;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: "chai-and-chaat",
    name: "Chai & Chaat",
    category: "Café / Restaurant Concept",
    description:
      "A warm, editorial concept for a café and street-food counter, built so the menu, hours and location are impossible to miss on a phone — the details a hungry customer actually needs, in the first five seconds.",
    tags: ["Concept Build", "Hospitality", "Menu & Location", "Mobile-First"],
    liveUrl: "https://cafe-sample-sigma.vercel.app/",
    image: "/images/portfolio-cafe.webp",
    imageAlt:
      "Chai & Chaat concept website showing a dark, editorial hero with masala chai being poured.",
    index: "01",
  },
  {
    slug: "uploft-boutique",
    name: "Uploft Boutique",
    category: "Luxury Retail / Commerce Concept",
    description:
      "A quieter, more considered retail concept — exploring how pacing, imagery and restraint can make even a small catalogue feel like a curated collection worth browsing slowly.",
    tags: ["Concept Build", "Retail", "Product Presentation", "Commerce Concept"],
    liveUrl: "https://boutique-sample-sigma.vercel.app/",
    image: "/images/portfolio-boutique.png",
    imageAlt:
      "Uploft Boutique concept website showing a premium retail interior hero image.",
    index: "02",
  },
];

export const LIFT_WORDS = ["PERCEPTION", "CLARITY", "EXPERIENCE", "ACTION"];

export const CAPABILITIES = [
  "BUSINESS WEBSITES",
  "CONSIDERED MOTION",
  "DESIGNED FOR MOBILE",
  "EASY CONTENT UPDATES",
  "ONLINE STORES",
  "CLEAR DIGITAL EXPERIENCES",
  "LAUNCH & HANDOVER",
];

export type ServiceItem = {
  name: string;
  summary: string;
  liftLine: string;
};

export const SERVICES: ServiceItem[] = [
  {
    name: "One-Page Launch Sites",
    summary:
      "A focused single page that gives a new business its first real presence online — the essentials, presented with intention, built to be found and trusted immediately.",
    liftLine: "First impressions, handled properly.",
  },
  {
    name: "Business Websites",
    summary:
      "A structured, multi-page site for businesses with more to say — services, trust signals, a gallery or menu, and a clear route to get in touch.",
    liftLine: "Room to explain what makes you different, without losing clarity.",
  },
  {
    name: "Editable / CMS Websites",
    summary:
      "A site the business can actually keep current — new offers, new stock, a growing story — through a proper content system and a real enquiry path.",
    liftLine: "A presence that keeps up with the business, not the other way round.",
  },
  {
    name: "Online Stores",
    summary:
      "A working store on a platform built for commerce — products, categories, shipping and checkout configured properly and tested end to end.",
    liftLine: "A shopfront that carries the same care as what's sold in it.",
  },
  {
    name: "Custom Digital Experiences",
    summary:
      "For larger, more design-led or integration-heavy work — scoped properly after a real conversation about what the business actually needs.",
    liftLine: "Built around the business, not stretched from a template.",
  },
];

export const WHAT_WE_LIFT = [
  {
    label: "Perception",
    description: "The business looks as credible online as it already is in person.",
  },
  {
    label: "Clarity",
    description: "The offer is understood in seconds, not paragraphs.",
  },
  {
    label: "Experience",
    description: "Every interaction feels considered, not accidental.",
  },
  {
    label: "Action",
    description: "The next step — call, message, visit, buy — is always obvious.",
  },
];

export type ProcessStep = {
  index: string;
  name: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    name: "Discover",
    description:
      "We start with a conversation: what the business does, who it's for, and what a visitor should do next.",
  },
  {
    index: "02",
    name: "Scope",
    description:
      "A written scope — pages, features, required inputs, timeline and what's included — agreed before any design work begins.",
  },
  {
    index: "03",
    name: "Design & Build",
    description:
      "Founder-led design and development, reviewed screen by screen. Every detail built with intention, not assembled from a template.",
  },
  {
    index: "04",
    name: "Test",
    description:
      "Checked across real phones and desktops — links, forms, spacing, performance and accessibility basics, end to end.",
  },
  {
    index: "05",
    name: "Launch & Handover",
    description:
      "Deployed to accounts the client owns, with a walkthrough and 14 days of defect correction against the agreed scope.",
  },
];

export type Principle = {
  name: string;
  description: string;
};

export const PRINCIPLES: Principle[] = [
  {
    name: "Brand perception matters",
    description:
      "How a business looks online shapes how it's trusted before a word is exchanged.",
  },
  {
    name: "Mobile-first by default",
    description:
      "Most customers arrive on a phone. The phone experience is designed first, not squeezed in last.",
  },
  {
    name: "Design with an action in mind",
    description:
      "Every page is built around what a visitor should do next — call, message, browse, buy.",
  },
  {
    name: "Clear scope before build",
    description:
      "What's included, what isn't, and what it takes to change it — agreed in writing, upfront.",
  },
  {
    name: "Client-owned accounts",
    description:
      "Domains, hosting and platforms stay in the client's name and under their control, always.",
  },
  {
    name: "Founder-reviewed delivery",
    description:
      "Every line and every screen reviewed by hand before it ships — judgment and execution, not a toolchain.",
  },
];

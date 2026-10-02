export const SITE = {
  name: "Uploft Digital",
  legalName: "Uploft Digital",
  tagline: "Digital brand elevation studio",
  // No confirmed production domain yet — don't add one here.
  location: "Coimbatore, India",
  email: "uploftdigital@gmail.com",
  instagramHandle: "@uploftdigital",
  instagramUrl: "https://instagram.com/uploftdigital",
} as const;

export const MAILTO = {
  startProject: `mailto:${SITE.email}?subject=${encodeURIComponent(
    "Starting a project with Uploft Digital"
  )}`,
  general: `mailto:${SITE.email}`,
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export const CURRENT_YEAR = new Date().getFullYear();

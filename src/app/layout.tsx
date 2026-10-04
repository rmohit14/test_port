import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Sans } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/layout/SkipLink";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { SITE } from "@/lib/constants";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  // No confirmed production domain is configured anywhere in this project
  // (no env var, no existing reference) — set it from one if it ever is,
  // falling back to localhost for development rather than inventing one.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${SITE.name} — Digital Brand Elevation Studio in Coimbatore`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Uploft Digital is a founder-led web studio in Coimbatore building premium, mobile-first websites that raise how a business looks, feels and is understood online.",
  keywords: [
    "Uploft Digital",
    "web design Coimbatore",
    "website design agency Coimbatore",
    "business website design India",
    "Next.js web studio",
  ],
  authors: [{ name: SITE.name }],
  icons: {
    icon: "/images/favicon-32.png",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: `${SITE.name} — Digital Brand Elevation Studio`,
    description:
      "Premium, mobile-first websites that raise how a business looks, feels and is understood online. Founder-led. Based in Coimbatore, India.",
    siteName: SITE.name,
    locale: "en_IN",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Uploft Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Digital Brand Elevation Studio`,
    description:
      "Premium, mobile-first websites that raise how a business looks, feels and is understood online.",
    images: ["/images/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmSans.variable}`}>
      <body id="top" data-lenis="false">
        <SkipLink />
        <SmoothScroll />
        <ScrollProgress />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

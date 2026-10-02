import { CURRENT_YEAR, NAV_LINKS, SITE, MAILTO } from "@/lib/constants";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="flex flex-col gap-12 py-14 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-serif text-[1.75rem] leading-none">{SITE.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
              A digital brand elevation studio — helping businesses in{" "}
              {SITE.location} and beyond raise how they&rsquo;re perceived
              and experienced online.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-paper/70 underline-offset-4 transition-colors hover:text-paper hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-sm text-paper/70">
            <a
              href={MAILTO.general}
              className="underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              {SITE.instagramHandle}
            </a>
            <span className="text-paper/65">{SITE.location}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/10 pt-8 text-xs text-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {CURRENT_YEAR} {SITE.legalName}. All rights reserved.
          </p>
          <p>Designed &amp; built by Uploft Digital.</p>
        </div>
      </Container>
    </footer>
  );
}

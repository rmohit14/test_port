import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import LiftRule from "@/components/motion/LiftRule";
import { SERVICES } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="relative overflow-clip py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="What We Build"
          lines={["Every build is a tool for", "how your brand is seen."]}
          description="Five ways to get a business online — each one chosen to fit what a business actually needs, not stretched to fit what's cheapest to build. Every project begins with a short conversation so the scope fits what the business actually needs."
        />

        <ul className="mt-16 border-t border-ink/10 sm:mt-20">
          {SERVICES.map((service, i) => (
            <Reveal key={service.name} as="li" delay={(i % 3) * 0.05}>
              <div
                tabIndex={0}
                className="group relative isolate grid grid-cols-1 gap-4 overflow-hidden py-8 outline-none sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 top-1/2 -z-10 -translate-y-1/2 select-none font-serif text-[6rem] leading-none text-ink/[0.035] transition-all duration-500 ease-out group-hover:text-ink/[0.07] group-hover:-translate-y-[45%] group-focus:text-ink/[0.07] sm:text-[8.5rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  aria-hidden="true"
                  className="font-serif text-2xl text-ink/35 sm:col-span-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-serif text-[1.65rem] leading-tight text-ink transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-focus:translate-x-1.5 sm:col-span-3">
                  {service.name}
                </h3>

                <p className="text-[1.02rem] leading-relaxed text-ink/70 sm:col-span-5">
                  {service.summary}
                </p>

                <p className="font-serif text-lg italic leading-snug text-accent-deep sm:col-span-3 sm:text-right">
                  {service.liftLine}
                </p>
              </div>
              <LiftRule className="w-full" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

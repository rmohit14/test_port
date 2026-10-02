import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { PRINCIPLES } from "@/lib/content";

export default function Principles() {
  return (
    <section id="studio" className="bg-paper-dim py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Studio"
          lines={["Founder-led.", "Built with intent."]}
          description="Uploft Digital is built around a simple idea: a business's website should carry the same care as the business itself — every project scoped, designed and reviewed by the person who signs off on it."
        />

        <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:mt-20 sm:grid-cols-2">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.name} as="li" delay={(i % 2) * 0.08}>
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <div>
                  <h3 className="text-[1.15rem] font-semibold leading-snug text-ink">
                    {principle.name}
                  </h3>
                  <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/65">
                    {principle.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

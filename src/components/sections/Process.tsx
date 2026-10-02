"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { prefersReducedMotion } from "@/lib/motion";
import { PROCESS_STEPS } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useGSAP(
    () => {
      if (!railRef.current || !fillRef.current || prefersReducedMotion()) return;
      let lastIndex = -1;

      const st = ScrollTrigger.create({
        trigger: railRef.current,
        start: "top 78%",
        end: "bottom 60%",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(fillRef.current, { scaleX: self.progress, scaleY: self.progress });
          const idx = Math.min(
            PROCESS_STEPS.length - 1,
            Math.floor(self.progress * PROCESS_STEPS.length)
          );
          if (idx !== lastIndex) {
            lastIndex = idx;
            setActiveIndex(idx);
          }
        },
      });

      return () => st.kill();
    },
    { scope: railRef }
  );

  return (
    <section id="process" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Process"
          lines={["A written scope,", "then a steady build."]}
          description="Five stages, from first conversation to a live site the client fully owns. Nothing gets built before it's agreed in writing."
        />

        <div ref={railRef} className="relative mt-16 sm:mt-24">
          <div className="absolute left-[7px] top-1 h-[calc(100%-0.5rem)] w-px bg-ink/10 sm:left-0 sm:top-[7px] sm:h-px sm:w-full" />
          <div
            ref={fillRef}
            className="absolute left-[7px] top-1 h-[calc(100%-0.5rem)] w-px origin-top scale-y-0 bg-accent sm:left-0 sm:top-[7px] sm:h-px sm:w-full sm:origin-left sm:scale-x-0"
          />

          <ol className="relative flex flex-col gap-10 sm:grid sm:grid-cols-5 sm:gap-x-6 sm:gap-y-0">
            {PROCESS_STEPS.map((step, i) => {
              const dominant = i <= activeIndex;
              return (
                <Reveal
                  key={step.index}
                  as="li"
                  delay={(i % 5) * 0.06}
                  className="relative pl-9 sm:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1 size-[13px] rounded-full border-2 transition-colors duration-300 sm:top-0.5 ${
                      dominant ? "border-accent bg-accent" : "border-ink/25 bg-paper"
                    }`}
                  />
                  <span className="font-serif text-sm text-ink/45 sm:mt-7 sm:block">
                    {step.index}
                  </span>
                  <h3
                    className={`mt-1 font-serif text-2xl leading-tight transition-colors duration-300 sm:mt-2 ${
                      dominant ? "text-ink" : "text-ink/55"
                    }`}
                  >
                    {step.name}
                  </h3>
                  <p className="mt-2.5 max-w-xs text-[0.95rem] leading-relaxed text-ink/65">
                    {step.description}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

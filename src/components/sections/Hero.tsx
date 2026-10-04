"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import OpticalArt from "@/components/motion/OpticalArt";
import { MAILTO, SITE } from "@/lib/constants";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-clip pb-12 pt-24 sm:pb-16 sm:pt-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent-soft blur-3xl"
      />

      <Container className="relative">
        {/* `minmax(0, …)fr` tracks, not raw percentages — a plain `52% 48%`
            plus the gap overflows the container by the gap's own width. */}
        <div className="md:grid md:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] md:items-center md:gap-8 lg:gap-12">
          <div>
            <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Tag className="text-ink/70">
                {SITE.tagline} &middot; {SITE.location}
              </Tag>
            </Reveal>

            <LineReveal
              as="h1"
              lines={[
                "Raise how your",
                <>
                  brand is{" "}
                  <span className="relative inline-block font-serif italic text-accent-deep">
                    seen.
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 160 14"
                      className="pointer-events-none absolute -bottom-1 left-0 h-[0.3em] w-full text-accent/50"
                    >
                      <path
                        d="M2 9 C 40 2, 120 2, 158 9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </>,
              ]}
              className="mt-5 max-w-4xl font-serif text-[clamp(2.35rem,11vw,6.75rem)] leading-[1.04] text-ink sm:mt-8 sm:leading-[0.98]"
            />

            <Reveal delay={0.15} className="mt-6 max-w-xl sm:mt-10">
              <p className="text-[1.05rem] leading-relaxed text-ink/70 sm:text-xl">
                High-craft websites and digital experiences that elevate how
                your business looks, feels and communicates online.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-8 flex flex-wrap items-center gap-4 sm:mt-12">
              <Button href={MAILTO.startProject}>Start a Project</Button>
              <Button href="#work" variant="secondary" showArrow={false}>
                View Work
              </Button>
            </Reveal>
          </div>

          {/* Mobile: the complete artwork in normal flow below the copy, at
              a meaningful size. Desktop: a real grid column that dominates
              the right side — the same instance just reflows via the grid,
              so there is only ever one copy of it on the page. */}
          <div className="relative mx-auto mt-10 aspect-square w-full max-w-[420px] md:mx-0 md:mt-0 md:max-w-[560px]">
            <OpticalArt heroSectionRef={sectionRef} className="size-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}

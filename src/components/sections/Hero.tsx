"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import LiftCycler from "@/components/motion/LiftCycler";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import ElevationField from "@/components/motion/ElevationField";
import { MAILTO, SITE } from "@/lib/constants";
import { LIFT_WORDS } from "@/lib/content";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-clip pb-12 pt-24 sm:pb-16 sm:pt-32"
    >
      {/* Mobile-only supporting detail — small, corner-fixed, never
          overlapping the headline/body/CTAs. Same SVG system as desktop,
          just recomposed and without pointer tilt. */}
      <ElevationField
        heroSectionRef={sectionRef}
        compact
        className="pointer-events-none absolute right-4 top-4 h-32 w-28 opacity-70 md:hidden"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent-soft blur-3xl"
      />

      <Container className="relative">
        <div className="md:grid md:grid-cols-[60%_40%] md:items-center md:gap-8 lg:gap-12">
          <div>
            <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Tag className="text-ink/70">
                {SITE.tagline} &middot; {SITE.location}
              </Tag>
              <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink/45">
                We lift
                <LiftCycler
                  words={LIFT_WORDS}
                  className="font-semibold text-accent-deep"
                />
              </span>
            </Reveal>

            <LineReveal
              as="h1"
              lines={[
                "Raise how your",
                <>
                  brand is <span className="text-accent-deep">seen</span>.
                </>,
              ]}
              className="mt-5 max-w-4xl font-serif text-[clamp(2.35rem,11vw,6.75rem)] leading-[1.04] text-ink sm:mt-8 sm:leading-[0.98]"
            />

            <Reveal delay={0.15} className="mt-6 max-w-xl sm:mt-10">
              <p className="text-[1.05rem] leading-relaxed text-ink/70 sm:text-xl">
                Uploft Digital creates high-craft digital experiences and
                websites that elevate how a business looks, feels and
                communicates online.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-8 flex flex-wrap items-center gap-4 sm:mt-12">
              <Button href={MAILTO.startProject}>
                Start a Project
              </Button>
              <Button href="#work" variant="secondary" showArrow={false}>
                View Work
              </Button>
            </Reveal>
          </div>

          {/* Bounded visual stage — a real grid column, not an
              absolutely-positioned overlay, so it can never crop against
              the viewport edge or hang below the fold. */}
          <div className="hidden md:flex md:items-center md:justify-center">
            <ElevationField
              heroSectionRef={sectionRef}
              className="aspect-[5/6] w-full max-w-[420px] lg:max-w-[480px]"
            />
          </div>
        </div>
      </Container>

      <Reveal
        delay={0.4}
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-2 text-ink/70">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em]">
            Scroll
          </span>
          <span className="h-10 w-px bg-current" />
        </div>
      </Reveal>
    </section>
  );
}

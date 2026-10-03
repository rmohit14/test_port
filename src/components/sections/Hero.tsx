"use client";

import { useRef } from "react";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import FocusRevealStage from "@/components/three-lift/FocusRevealStage";
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
        <div className="md:grid md:grid-cols-[52%_48%] md:items-center md:gap-8 lg:gap-12">
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

            {/* Mobile optical stage — in normal flow beneath the copy, a
                meaningful size rather than a corner decoration. */}
            <div className="mt-10 h-[300px] w-full md:hidden">
              <FocusRevealStage
                posterSrc="/images/lift/hero-poster.png"
                heroSectionRef={sectionRef}
                mediaQuery="(max-width: 767px)"
                className="size-full"
              />
            </div>
          </div>

          {/* Desktop optical stage — a real grid column, substantial, never
              a small icon in a padded card. */}
          <div className="hidden md:flex md:items-center md:justify-center">
            <FocusRevealStage
              posterSrc="/images/lift/hero-poster.png"
              heroSectionRef={sectionRef}
              mediaQuery="(min-width: 768px)"
              className="aspect-square w-full max-w-[560px]"
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

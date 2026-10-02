"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/motion/Reveal";
import LineReveal from "@/components/motion/LineReveal";
import LiftVisual, { LiftStateIcon } from "@/components/motion/LiftVisual";
import { prefersReducedMotion } from "@/lib/motion";
import { WHAT_WE_LIFT } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const STEPS = WHAT_WE_LIFT.length;
const LABELS = ["perception", "clarity", "experience", "action"];

// One timeline unit per state; each transition takes MOVE units and lands
// exactly on its label, leaving the rest of the unit as a settled hold —
// the "intentional resting point" fast wheel-scrolling should still hit.
const UNIT = 1;
const MOVE = 0.35;

export default function WhatWeLift() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wordTrackRef = useRef<HTMLDivElement>(null);
  const captionTrackRef = useRef<HTMLDivElement>(null);
  const counterTrackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const liftVisualRef = useRef<HTMLDivElement>(null);

  // One master timeline, one ScrollTrigger, one pin — word, caption,
  // counter, right-visual crossfade and the progress line are all just
  // tweens on it, addressed by the same four labels. Nothing here is
  // synced via React state re-renders.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!sectionRef.current || !pinRef.current) return;

        const panels =
          liftVisualRef.current?.querySelectorAll<HTMLElement>("[data-lift-visual-panel]") ?? [];

        const num = (el: Element | null | undefined, attr: string, fallback = 0) => {
          const raw = el?.getAttribute(attr);
          return raw ? Number(raw) : fallback;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${STEPS * 62}%`,
            pin: pinRef.current,
            scrub: 0.5,
          },
        });

        tl.addLabel(LABELS[0], 0);

        // Perception settles once, right as the pin engages — a bounded
        // "many impressions becoming coherent" moment, not a forever-loop.
        const perceptionEls =
          panels[0]?.querySelectorAll<SVGElement>("[data-lift-settle]") ?? [];
        const perceptionFocal = panels[0]?.querySelector<SVGElement>("[data-lift-focal]");
        if (perceptionEls.length) {
          tl.fromTo(
            perceptionEls,
            {
              x: (i: number) => num(perceptionEls[i], "data-noise-x"),
              y: (i: number) => num(perceptionEls[i], "data-noise-y"),
              rotation: (i: number) =>
                num(perceptionEls[i], "data-rest-rot") + num(perceptionEls[i], "data-noise-rot"),
              transformOrigin: "center",
            },
            {
              x: 0,
              y: 0,
              rotation: (i: number) => num(perceptionEls[i], "data-rest-rot"),
              duration: 0.5,
              ease: "power2.out",
            },
            0
          );
        }
        if (perceptionFocal) {
          tl.fromTo(
            perceptionFocal,
            { scale: 0, opacity: 0, transformOrigin: "center" },
            { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
            0
          );
        }

        for (let i = 1; i < STEPS; i++) {
          const at = i * UNIT - MOVE;
          const yPercent = (-i * 100) / STEPS;

          tl.to(wordTrackRef.current, { yPercent, duration: MOVE, ease: "power2.inOut" }, at);
          tl.to(captionTrackRef.current, { yPercent, duration: MOVE, ease: "power2.inOut" }, at);
          tl.to(counterTrackRef.current, { yPercent, duration: MOVE, ease: "power2.inOut" }, at);

          const outPanel = panels[i - 1];
          const inPanel = panels[i];
          if (outPanel) tl.to(outPanel, { opacity: 0, duration: MOVE, ease: "power2.inOut" }, at);
          if (inPanel) tl.to(inPanel, { opacity: 1, duration: MOVE, ease: "power2.inOut" }, at);

          // Clarity: noisy lines settle toward the vertical, most fading to
          // a whisper; the strong cobalt axis resolves alongside them.
          if (LABELS[i] === "clarity" && inPanel) {
            const clarityEls = inPanel.querySelectorAll<SVGElement>("[data-lift-settle]");
            const clarityAxis = inPanel.querySelector<SVGElement>("[data-lift-axis]");
            if (clarityEls.length) {
              // Only rotation is GSAP-animated here — the resting faintness
              // per line already lives in its static stroke-opacity, so the
              // settle motion is purely "noisy angle snaps toward vertical."
              tl.fromTo(
                clarityEls,
                {
                  rotation: (idx: number) =>
                    num(clarityEls[idx], "data-rest-rot") + num(clarityEls[idx], "data-noise-rot"),
                  transformOrigin: "center",
                },
                {
                  rotation: (idx: number) => num(clarityEls[idx], "data-rest-rot"),
                  duration: MOVE,
                  ease: "power2.out",
                },
                at
              );
            }
            if (clarityAxis) {
              tl.fromTo(
                clarityAxis,
                { opacity: 0, scaleY: 0.9, transformOrigin: "center" },
                { opacity: 1, scaleY: 1, duration: MOVE, ease: "power2.out" },
                at
              );
            }
          }

          // Action: the focal node (reused from Perception) rises toward
          // the top boundary as the trajectory completes.
          if (LABELS[i] === "action" && inPanel) {
            const actionFocal = inPanel.querySelector<SVGElement>("[data-lift-focal]");
            if (actionFocal) {
              tl.fromTo(
                actionFocal,
                { attr: { cy: 300 }, opacity: 0 },
                { attr: { cy: 50 }, opacity: 1, duration: MOVE, ease: "power2.out" },
                at
              );
            }
          }

          tl.addLabel(LABELS[i], i * UNIT);
        }

        tl.fromTo(
          progressFillRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: STEPS * UNIT, ease: "none" },
          0
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="lift"
      className="relative bg-ink text-paper"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center overflow-clip px-5 py-20 sm:px-8 lg:min-h-screen lg:py-0"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
        />

        <Container className="relative flex flex-1 flex-col justify-center lg:flex-none">
          <Reveal className="flex items-center justify-between">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-paper/60">
              What We Lift
            </span>
            <span className="h-[1.3em] overflow-clip font-serif text-sm text-paper/50">
              <span ref={counterTrackRef} className="block will-change-transform">
                {WHAT_WE_LIFT.map((item, i) => (
                  <span key={item.label} className="flex h-[1.3em] items-center">
                    <span className="text-paper">{String(i + 1).padStart(2, "0")}</span>
                    {" / "}
                    {String(STEPS).padStart(2, "0")}
                  </span>
                ))}
              </span>
            </span>
          </Reveal>

          {/* Desktop: one master-timeline-driven word reel (left) plus a
              large editorial visual field (right), pinned by matchMedia
              above 1024px. No extra ScrollTrigger, no extra scroll
              distance, no second pin. */}
          <div data-lift-desktop className="hidden lg:grid lg:grid-cols-[56%_44%] lg:items-center lg:gap-12">
            <div>
              <div className="mt-10 h-[24vh] overflow-clip">
                <div ref={wordTrackRef} className="will-change-transform">
                  {WHAT_WE_LIFT.map((item) => (
                    <h2
                      key={item.label}
                      className="flex h-[24vh] items-center font-serif text-[clamp(3.5rem,9vw,8.5rem)] leading-none text-paper"
                    >
                      {item.label}
                    </h2>
                  ))}
                </div>
              </div>

              <div className="mt-4 h-[3.5rem] max-w-xl overflow-clip">
                <div ref={captionTrackRef} className="will-change-transform">
                  {WHAT_WE_LIFT.map((item) => (
                    <p
                      key={item.label}
                      className="flex h-[3.5rem] items-center text-lg leading-snug text-paper/65"
                    >
                      {item.description}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-10 h-px w-full max-w-md bg-paper/15">
                <div
                  ref={progressFillRef}
                  className="h-full w-full origin-left scale-x-0 bg-accent"
                />
              </div>
            </div>

            <LiftVisual
              ref={liftVisualRef}
              className="mx-auto aspect-square w-[clamp(400px,32vw,560px)]"
            />
          </div>

          {/* Mobile / tablet: stacked stepped chapters, no pinning, a
              lightweight SVG illustration per chapter. */}
          <ol data-lift-mobile className="mt-10 flex flex-col gap-14 lg:hidden">
            {WHAT_WE_LIFT.map((item, i) => (
              <li key={item.label} className="border-t border-paper/15 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif text-sm text-paper/45">
                    {String(i + 1).padStart(2, "0")} / {String(STEPS).padStart(2, "0")}
                  </span>
                  <LiftStateIcon index={i} className="h-24 w-24 shrink-0 opacity-90 sm:h-32 sm:w-32" />
                </div>
                <LineReveal
                  as="h2"
                  lines={[item.label]}
                  className="mt-3 font-serif text-[clamp(2.5rem,14vw,4rem)] leading-none text-paper"
                />
                <Reveal delay={0.1} className="mt-4 max-w-sm">
                  <p className="text-base leading-relaxed text-paper/65">
                    {item.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}

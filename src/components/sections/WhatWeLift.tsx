"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import KineticWord from "@/components/motion/KineticWord";
import { prefersReducedMotion } from "@/lib/motion";
import { WHAT_WE_LIFT } from "@/lib/content";
import { clamp01, ease, fitWord, mix, pathData, timelineState, type WordGeometry } from "@/lib/kineticType";

gsap.registerPlugin(ScrollTrigger);

const STEPS = WHAT_WE_LIFT.length;

// Per-chapter curve amplitude as a function of the absolute scrubbed time —
// ported from the approved motion reference. Perception resolves from a
// slightly stronger curve into the gentle resting pose; Clarity settles
// toward a clean baseline as it crosses in; Experience carries one slow
// wave for the whole of its hold, driven by scroll progress, not a clock;
// Action stays confident and nearly still.
function curvesAt(t: number): number[] {
  return [
    mix(0.38, 0.24, ease(t / 0.3)),
    mix(0.3, 0.065, ease((t - 0.65) / 0.35)),
    0.26 * Math.cos(clamp01((t - 2) / 0.65) * Math.PI * 2),
    0.13,
  ];
}

export default function WhatWeLift() {
  const uid = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const svgRefs = useRef<Array<SVGSVGElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const captionRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  // One deterministic pass from the absolute scrubbed position — no
  // directional callbacks, so forward, reverse, fast-scroll and mid-section
  // restoration all land in the same state a plain scroll to that position
  // would produce.
  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const band = bandRef.current;
      if (!section || !pin || !band) return;

      let st: ScrollTrigger | null = null;
      let geometries: (WordGeometry | null)[] = [];
      let activeIndex = -1;

      function updateChapters(t: number) {
        const snapshot = timelineState(t, STEPS);
        const curves = curvesAt(t);
        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          panel.style.opacity = String(snapshot.states[i].opacity);
          panel.style.transform = `translateY(${snapshot.states[i].y}px)`;
          const geom = geometries[i];
          if (geom) geom.path.setAttribute("d", pathData(geom, curves[i]));
        });
        if (snapshot.chapter !== activeIndex) {
          activeIndex = snapshot.chapter;
          if (counterRef.current) {
            counterRef.current.textContent = String(activeIndex + 1).padStart(2, "0");
          }
          captionRefs.current.forEach((el, i) => {
            if (el) el.style.opacity = i === activeIndex ? "1" : "0";
          });
          labelRefs.current.forEach((el, i) => {
            if (el) el.dataset.active = String(i === activeIndex);
          });
        }
      }

      function layout() {
        if (prefersReducedMotion() || window.matchMedia("(max-height: 480px)").matches) {
          st?.kill();
          st = null;
          section!.dataset.kineticReady = "false";
          return;
        }

        // Optimistically show the stage and measure synchronously, before
        // the browser paints — if this throws, the catch below hides it
        // again in the same tick, so there is nothing to flash either way.
        section!.dataset.kineticReady = "true";
        try {
          const width = band!.clientWidth;
          const height = band!.clientHeight;
          if (!width || !height) throw new Error("word band unavailable");

          const nextGeometries = svgRefs.current.map((svg) => {
            if (!svg) throw new Error("missing chapter panel");
            return fitWord(svg, width, height);
          });

          if (pin!.offsetHeight > window.innerHeight * 1.05) {
            throw new Error("stage exceeds the available viewport height");
          }

          geometries = nextGeometries;
          st?.kill();
          const isDesktop = window.innerWidth >= 1024;
          const scrollDistance = pin!.offsetHeight * (isDesktop ? 3.2 : 2.8);
          st = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin,
            scrub: true,
            onUpdate: (self) => updateChapters(self.progress * STEPS),
          });
          activeIndex = -1;
          updateChapters(0);
        } catch {
          st?.kill();
          st = null;
          section!.dataset.kineticReady = "false";
        }
      }

      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(layout, 150);
      };

      const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const shortQuery = window.matchMedia("(max-height: 480px)");
      reducedQuery.addEventListener("change", layout);
      shortQuery.addEventListener("change", layout);
      window.addEventListener("resize", onResize);
      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(band);

      document.fonts.ready.then(layout).catch(layout);

      return () => {
        window.clearTimeout(resizeTimer);
        reducedQuery.removeEventListener("change", layout);
        shortQuery.removeEventListener("change", layout);
        window.removeEventListener("resize", onResize);
        resizeObserver.disconnect();
        st?.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="lift" className="relative bg-ink text-paper">
      {/* Primary experience: one pinned stage, changed entirely by
          scrolling. Hidden until live-measured and ready; falls back to the
          plain stacked version below under reduced motion, a genuinely
          short viewport, or if measurement itself fails. */}
      <div
        ref={pinRef}
        data-lift-stage
        className="relative flex min-h-[100svh] flex-col justify-center overflow-clip px-5 py-16 sm:px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
        />

        <Container className="relative w-full">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              What We Lift
            </span>
            <span aria-live="polite" className="font-serif text-sm text-paper/70">
              <span ref={counterRef} className="text-accent">
                01
              </span>{" "}
              / {String(STEPS).padStart(2, "0")}
            </span>
          </div>

          <div
            ref={bandRef}
            className="relative mt-6 h-[clamp(170px,30svh,270px)] sm:h-[clamp(170px,34svh,390px)]"
          >
            {WHAT_WE_LIFT.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <h2 className="sr-only">{item.label}</h2>
                <KineticWord
                  ref={(el) => {
                    svgRefs.current[i] = el;
                  }}
                  word={item.label}
                  pathId={`${uid}-path-${i}`}
                />
              </div>
            ))}
          </div>

          <div className="relative mt-4 min-h-[82px] sm:mt-6 sm:min-h-[76px]">
            {WHAT_WE_LIFT.map((item, i) => (
              <p
                key={item.label}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="absolute inset-x-0 top-0 max-w-lg text-base leading-relaxed text-paper/65 sm:text-lg"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {item.description}
              </p>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] select-none sm:mt-8 sm:gap-x-10"
          >
            {WHAT_WE_LIFT.map((item, i) => (
              <span
                key={item.label}
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                data-chapter-label
                data-active={i === 0}
              >
                {item.label}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* Fallback: reduced motion, a genuinely short viewport, failed
          measurement, and the no-JS baseline all get the same readable,
          normal-flow content. */}
      <div data-lift-fallback>
        <Container className="flex flex-col gap-16 py-20 sm:gap-20 sm:py-28">
          <span className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            What We Lift
          </span>
          {WHAT_WE_LIFT.map((item, i) => (
            <div key={item.label}>
              <span className="font-serif text-sm text-paper/45">
                {String(i + 1).padStart(2, "0")} / {String(STEPS).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-serif text-[clamp(2.5rem,12vw,5.5rem)] leading-[0.98] text-paper">
                {item.label}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/65 sm:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}

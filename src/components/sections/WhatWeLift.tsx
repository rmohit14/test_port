"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/ui/Container";
import KineticWord from "@/components/motion/KineticWord";
import { prefersReducedMotion } from "@/lib/motion";
import { WHAT_WE_LIFT } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const STEPS = WHAT_WE_LIFT.length;

// The exact four-unit schedule from the brief: each chapter holds for 0.65
// units (Action holds for a full unit, the longest, before release), with
// 0.35-unit transitions between them.
const HOLD = 0.65;
const TRANSITION = 0.35;
const UNIT = 1;
const TOTAL = STEPS * UNIT;

function labelStart(i: number) {
  return i * UNIT;
}

function applyWave(panel: HTMLElement | null, amp: number, phase: number) {
  if (!panel) return;
  const chars = panel.querySelectorAll<HTMLElement>("[data-kinetic-char]");
  chars.forEach((el, i) => {
    const offset = amp * Math.sin(phase + i * 0.55);
    el.style.transform = `translateY(${offset}em)`;
  });
}

// The chapter boundary (in timeline time) past which chapter `i` counts as
// active — the midpoint of its entrance crossfade.
function switchPointFor(i: number) {
  return labelStart(i) - TRANSITION + TRANSITION / 2;
}

// Derived purely from the current timeline time, not from which direction we
// arrived from — this is what keeps the counter/active-label in sync with
// the visible chapter on reverse and fast/skipped scrolling alike. A pair of
// bidirectional tl.call()s at fixed positions can't do this: the same
// callback fires crossing the boundary in either direction, so it can only
// ever encode one direction's meaning correctly.
function activeIndexForTime(time: number) {
  let idx = 0;
  for (let i = 1; i < STEPS; i++) {
    if (time >= switchPointFor(i)) idx = i;
  }
  return idx;
}

export default function WhatWeLift() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // One master timeline — kinetic word deformation, captions, the counter,
  // the active-label treatment and the progress line are all driven from
  // this same scrubbed playhead. The bottom labels are plain, inert text;
  // nothing here listens for clicks or keyboard focus on them.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (window.matchMedia("(max-height: 480px)").matches) return;
      if (!sectionRef.current || !pinRef.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        { isDesktop: "(min-width: 1024px)", isCompact: "(max-width: 1023px)" },
        (context) => {
          const conditions = context.conditions as { isDesktop: boolean } | undefined;
          const endPercent = conditions?.isDesktop ? 280 : 220;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${endPercent}%`,
              pin: pinRef.current,
              scrub: 0.5,
            },
          });

          const waveStates = WHAT_WE_LIFT.map(() => ({ amp: 0, phase: 0 }));

          // Perception: a dispersed wave resolves into a confident, readable
          // word — settles well before its hold ends.
          waveStates[0] = { amp: 0.3, phase: 0 };
          tl.to(
            waveStates[0],
            {
              amp: 0.012,
              duration: 0.3,
              ease: "power2.out",
              onUpdate: () => applyWave(panelRefs.current[0], waveStates[0].amp, waveStates[0].phase),
            },
            0
          );

          for (let i = 1; i < STEPS; i++) {
            const exitAt = labelStart(i) - TRANSITION;
            const holdAt = labelStart(i);
            const outPanel = panelRefs.current[i - 1];
            const inPanel = panelRefs.current[i];

            if (outPanel) {
              tl.to(outPanel, { opacity: 0, y: -14, duration: TRANSITION, ease: "power2.inOut" }, exitAt);
            }
            if (inPanel) {
              const entranceY = i === STEPS - 1 ? 22 : 12;
              tl.fromTo(
                inPanel,
                { opacity: 0, y: entranceY },
                { opacity: 1, y: 0, duration: TRANSITION + (i === STEPS - 1 ? 0.1 : 0), ease: "power2.out" },
                exitAt
              );
            }

            if (i === 1) {
              // Clarity: offsets settle toward a clean baseline.
              waveStates[1] = { amp: 0.14, phase: 0.8 };
              tl.fromTo(
                waveStates[1],
                { amp: 0.14 },
                {
                  amp: 0.008,
                  duration: 0.3,
                  ease: "power2.out",
                  onUpdate: () => applyWave(panelRefs.current[1], waveStates[1].amp, waveStates[1].phase),
                },
                exitAt
              );
            }

            if (i === 2) {
              // Experience: a gentle flowing wave moves through the word
              // for the whole hold, tied directly to scroll progress.
              waveStates[2] = { amp: 0.05, phase: 0 };
              tl.set(waveStates[2], { amp: 0.05, phase: 0 }, exitAt);
              tl.to(
                waveStates[2],
                {
                  phase: Math.PI * 2,
                  duration: HOLD,
                  ease: "none",
                  onUpdate: () => applyWave(panelRefs.current[2], waveStates[2].amp, waveStates[2].phase),
                },
                holdAt
              );
            }

            if (i === 3) {
              // Action: a restrained upward movement resolves firmly — the
              // panel's own entrance (above) already carries this; keep the
              // word itself nearly still.
              tl.call(() => applyWave(panelRefs.current[3], 0, 0), [], exitAt);
            }
          }

          // Counter + active-label treatment: recomputed from the absolute
          // playhead position on every tick, so it can't desync from the
          // visible panel regardless of scroll direction or speed.
          let lastActiveIndex = -1;
          const syncIndicators = () => {
            const idx = activeIndexForTime(tl.time());
            if (idx === lastActiveIndex) return;
            lastActiveIndex = idx;
            if (counterRef.current) {
              counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(STEPS).padStart(2, "0")}`;
            }
            labelRefs.current.forEach((el, li) => {
              if (!el) return;
              el.style.opacity = li === idx ? "1" : "0.4";
            });
          };
          tl.eventCallback("onUpdate", syncIndicators);

          tl.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: TOTAL, ease: "none" }, 0);

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="lift" className="relative bg-ink text-paper">
      {/* Primary experience: one pinned stage, changed entirely by
          scrolling. Hidden under reduced motion / extreme short viewports /
          no-JS in favor of the plain fallback below. */}
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
            <span
              ref={counterRef}
              aria-live="polite"
              className="font-serif text-sm text-paper/60"
            >
              01 / {String(STEPS).padStart(2, "0")}
            </span>
          </div>

          <div className="relative mt-6 h-[34vh] min-h-[220px] sm:h-[38vh] lg:h-[42vh]">
            {WHAT_WE_LIFT.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <h2 className="sr-only">{item.label}</h2>
                <KineticWord
                  word={item.label}
                  className="font-serif text-[clamp(2.75rem,10vw,8.5rem)] leading-[0.95] tracking-tight"
                />
                <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/65 sm:mt-6 sm:text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10">
            <div
              aria-hidden="true"
              className="flex flex-wrap gap-x-6 gap-y-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-paper/40 select-none sm:gap-x-10"
            >
              {WHAT_WE_LIFT.map((item, i) => (
                <span
                  key={item.label}
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  style={{ opacity: i === 0 ? 1 : 0.4 }}
                >
                  {item.label}
                </span>
              ))}
            </div>
            <div className="relative mt-3 h-px w-full bg-paper/15">
              <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
            </div>
          </div>
        </Container>
      </div>

      {/* Fallback: reduced motion, extreme short viewports, and the
          no-JS baseline all get the same readable, normal-flow content. */}
      <div data-lift-fallback className="hidden">
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

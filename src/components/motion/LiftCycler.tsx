"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

type LiftCyclerProps = {
  words: string[];
  className?: string;
  interval?: number;
};

// Small word-swap: each word masks upward out and the next rises in behind
// it — the hero's miniature preview of the "lift" motion language. A short
// sequence that settles on the final word, not a perpetual rotation — each
// step is a self-contained fromTo with nothing stale to inherit.
export default function LiftCycler({ words, className = "", interval = 2200 }: LiftCyclerProps) {
  const trackRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    const timeouts: number[] = [];
    for (let step = 1; step < words.length; step += 1) {
      timeouts.push(window.setTimeout(() => setIndex(step), interval * step));
    }
    return () => timeouts.forEach((id) => window.clearTimeout(id));
  }, [words.length, interval]);

  useGSAP(
    () => {
      if (!trackRef.current || prefersReducedMotion()) return;
      const prev = prevIndexRef.current;
      prevIndexRef.current = index;
      if (prev === index) return;

      const items = trackRef.current.querySelectorAll<HTMLElement>("[data-lift-word]");
      const outEl = items[prev];
      const inEl = items[index];
      if (!outEl || !inEl) return;

      gsap.fromTo(
        outEl,
        { yPercent: 0, opacity: 1 },
        { yPercent: -100, opacity: 0, duration: 0.55, ease: "power3.inOut" }
      );
      gsap.fromTo(
        inEl,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.inOut" }
      );
    },
    { scope: trackRef, dependencies: [index] }
  );

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid">
      <span aria-hidden="true" className="invisible">
        {longest}
      </span>
      <span
        ref={trackRef}
        className={`absolute inset-0 grid overflow-clip ${className}`}
      >
        {words.map((word, i) => (
          <span
            key={word}
            data-lift-word
            aria-hidden={i === 0 ? undefined : true}
            className="col-start-1 row-start-1 block whitespace-nowrap"
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}

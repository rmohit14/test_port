"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Slim fixed top bar that fills as the visitor scrolls the whole page — the
// "lift" progress language, applied once at the site level.
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!fillRef.current || prefersReducedMotion()) return;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      onUpdate: (self) => {
        gsap.set(fillRef.current, { scaleX: self.progress });
      },
    });

    return () => st.kill();
  }, { scope: fillRef });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-ink/5"
    >
      <div ref={fillRef} className="h-full origin-left scale-x-0 bg-accent" />
    </div>
  );
}

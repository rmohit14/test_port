"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion, isInViewport } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type LiftRuleProps = {
  className?: string;
  delay?: number;
};

// A hairline rule that draws itself left-to-right in accent blue when it
// scrolls into view — the site's signature "lift" progress/fill behaviour.
export default function LiftRule({ className = "", delay = 0 }: LiftRuleProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      const fromVars: gsap.TweenVars = { scaleX: 0 };
      const toVars: gsap.TweenVars = {
        scaleX: 1,
        duration: 0.9,
        ease: "power3.out",
        delay,
      };

      if (isInViewport(ref.current)) {
        gsap.fromTo(ref.current, fromVars, toVars);
      } else {
        gsap.fromTo(ref.current, fromVars, {
          ...toVars,
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        });
      }
    },
    { scope: ref, dependencies: [delay] }
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`block h-px origin-left bg-accent ${className}`}
    />
  );
}

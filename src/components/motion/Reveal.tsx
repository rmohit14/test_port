"use client";

import { useRef, type PropsWithChildren, type Ref } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion, isInViewport } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
  as?: "div" | "li";
}>;

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  start = "top 88%",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      const fromVars = { y, "--reveal-opacity": 0 } as gsap.TweenVars;
      const toVars = {
        y: 0,
        "--reveal-opacity": 1,
        duration: 0.9,
        ease: "power3.out",
        delay,
      } as gsap.TweenVars;

      if (isInViewport(ref.current)) {
        gsap.fromTo(ref.current, fromVars, toVars);
      } else {
        gsap.fromTo(ref.current, fromVars, {
          ...toVars,
          scrollTrigger: { trigger: ref.current, start, once: true },
        } as gsap.TweenVars);
      }
    },
    { scope: ref, dependencies: [delay, y, start] }
  );

  const Tag = as;

  // TypeScript can't express "the ref type tracks whichever tag `as`
  // resolves to" for a union of intrinsic elements — this is a generic
  // polymorphic-ref limitation, independent of any library. `ref.current`
  // is only ever used as a plain Element (getBoundingClientRect, as a
  // ScrollTrigger/gsap target), so the cast is safe.
  return (
    <Tag ref={ref as Ref<HTMLDivElement> & Ref<HTMLLIElement>} data-reveal className={className}>
      {children}
    </Tag>
  );
}

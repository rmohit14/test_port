"use client";

import { useRef, type Ref, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion, isInViewport } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type LineRevealProps = {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
  start?: string;
};

export default function LineReveal({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  start = "top 85%",
}: LineRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;

      const targets = ref.current.querySelectorAll<HTMLElement>("[data-line-inner]");
      const fromVars: gsap.TweenVars = { yPercent: 115 };
      const toVars: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.09,
        delay,
      };

      // Already on screen at mount (the hero heading): play immediately
      // rather than going through ScrollTrigger, which can race React's
      // double-invoked dev-mode effects for content that's already in view.
      if (isInViewport(ref.current)) {
        gsap.fromTo(targets, fromVars, toVars);
      } else {
        gsap.fromTo(targets, fromVars, {
          ...toVars,
          scrollTrigger: { trigger: ref.current, start, once: true },
        });
      }
    },
    { scope: ref, dependencies: [delay, start] }
  );

  const Tag = as;

  // TypeScript can't express "the ref type tracks whichever tag `as`
  // resolves to" for a union of intrinsic elements — this is a generic
  // polymorphic-ref limitation, independent of any library. `ref.current`
  // is only ever used as a plain Element (querySelectorAll, as a
  // ScrollTrigger/gsap target), so the cast is safe.
  return (
    <Tag
      ref={ref as Ref<HTMLHeadingElement> & Ref<HTMLParagraphElement>}
      className={className}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-clip py-[0.05em]">
          <span
            data-line-inner
            className={`block will-change-transform ${lineClassName ?? ""}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

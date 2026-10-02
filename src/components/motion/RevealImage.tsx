"use client";

import { useRef, type PropsWithChildren } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion, isInViewport } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealImageProps = PropsWithChildren<{
  className?: string;
  parallax?: boolean;
}>;

export default function RevealImage({
  children,
  className,
  parallax = true,
}: RevealImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const inner = innerRef.current;
      if (!wrapper || !inner || prefersReducedMotion()) return;

      const coarse = window.matchMedia("(pointer: coarse)").matches;

      const tl = gsap.timeline(
        isInViewport(wrapper)
          ? {}
          : {
              scrollTrigger: {
                trigger: wrapper,
                start: "top 82%",
                once: true,
              },
            }
      );

      tl.fromTo(
        wrapper,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.out" }
      ).fromTo(
        inner,
        { scale: 1.18 },
        { scale: 1, duration: 1.3, ease: "power4.out" },
        "<"
      );

      if (parallax && !coarse) {
        gsap.fromTo(
          inner,
          { y: -24 },
          {
            y: 24,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: wrapperRef, dependencies: [parallax] }
  );

  return (
    <div ref={wrapperRef} data-reveal-image className={className}>
      <div ref={innerRef} className="relative size-full">
        {children}
      </div>
    </div>
  );
}

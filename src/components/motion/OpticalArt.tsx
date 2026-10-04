"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  className?: string;
  heroSectionRef: RefObject<HTMLElement | null>;
};

// The hero art is one finished, transparent PNG — the glass, lighting and
// reflections are baked in. Movement here is restrained 2.5D presentation
// across three separate wrappers (scroll drift, pointer tilt, one-time
// entrance) so they never write competing transforms on the same element.
export default function OpticalArt({ className = "", heroSectionRef }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = heroSectionRef.current;
      if (!section || !entranceRef.current) return;
      const reduced = prefersReducedMotion();

      // One-time entrance — useful on its first rendered frame either way.
      if (reduced) {
        gsap.set(entranceRef.current, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          entranceRef.current,
          { opacity: 0.7, y: 14 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }
        );
      }

      if (reduced) return;

      // Small scroll drift as the hero leaves the viewport.
      const scrollTween = gsap.to(scrollRef.current, {
        y: -18,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });

      // Fine-pointer tilt, confined to the hero section and capped at 8px / 1.2deg.
      let visible = true;
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      observer.observe(section);

      const quickX = gsap.quickTo(pointerRef.current, "x", { duration: 0.5, ease: "power3.out" });
      const quickY = gsap.quickTo(pointerRef.current, "y", { duration: 0.5, ease: "power3.out" });
      const quickRot = gsap.quickTo(pointerRef.current, "rotate", { duration: 0.5, ease: "power3.out" });

      function onMove(e: PointerEvent) {
        if (!visible || e.pointerType !== "mouse") return;
        const rect = section!.getBoundingClientRect();
        const relX = Math.min(1, Math.max(-1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        const relY = Math.min(1, Math.max(-1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
        quickX(relX * 8);
        quickY(relY * 8);
        quickRot(relX * 1.2);
      }
      function onLeave() {
        quickX(0);
        quickY(0);
        quickRot(0);
      }

      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);

      return () => {
        observer.disconnect();
        scrollTween.kill();
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: heroSectionRef as RefObject<HTMLElement>, dependencies: [] }
  );

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div ref={scrollRef} className="size-full">
        <div ref={pointerRef} className="size-full">
          <div ref={entranceRef} className="relative size-full">
            <Image
              src="/images/uploft-focus-art.png"
              alt=""
              fill
              sizes="(min-width: 768px) 560px, 90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, type PropsWithChildren } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Nudges its content toward the pointer on fine-pointer desktop devices only.
export default function MagneticWrap({
  children,
  className,
  strength = 0.35,
}: PropsWithChildren<{ className?: string; strength?: number }>) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
    >
      {children}
    </div>
  );
}

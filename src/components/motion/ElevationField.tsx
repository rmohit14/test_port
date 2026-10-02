"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const INK = "#14222a";
const ACCENT = "#2e6beb";
const CX = 260;
const CY = 310;
const SPINE_X = 300;
const SPINE_TOP = 70;
const SPINE_BOTTOM = 560;
const NODE_REST_Y = 300;
const NODE_START_Y = 460;

type FrameSpec = {
  w: number;
  h: number;
  ox: number;
  oy: number;
  rot: number;
  opacity: number;
  fillOpacity: number;
};

// Eight architectural contour frames, front (large, closer) to back (small,
// fainter), their centers converging toward the focal point as they recede.
const FRAMES: FrameSpec[] = [
  { w: 360, h: 440, ox: -95, oy: -55, rot: -4, opacity: 0.32, fillOpacity: 0.03 },
  { w: 320, h: 395, ox: 80, oy: 30, rot: 5, opacity: 0.28, fillOpacity: 0.025 },
  { w: 280, h: 350, ox: -60, oy: 55, rot: -7, opacity: 0.25, fillOpacity: 0.02 },
  { w: 245, h: 305, ox: 50, oy: -60, rot: 6, opacity: 0.21, fillOpacity: 0 },
  { w: 210, h: 265, ox: -38, oy: 28, rot: -3, opacity: 0.18, fillOpacity: 0 },
  { w: 178, h: 225, ox: 26, oy: 38, rot: 8, opacity: 0.15, fillOpacity: 0 },
  { w: 148, h: 188, ox: -16, oy: -16, rot: -5, opacity: 0.13, fillOpacity: 0 },
  { w: 118, h: 150, ox: 10, oy: 12, rot: 4, opacity: 0.11, fillOpacity: 0 },
];

type ElevationFieldProps = {
  className?: string;
  compact?: boolean;
  heroSectionRef: RefObject<HTMLElement | null>;
};

export default function ElevationField({
  className = "",
  compact = false,
  heroSectionRef,
}: ElevationFieldProps) {
  const perspectiveRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Array<SVGRectElement | null>>([]);
  const spineRef = useRef<SVGRectElement>(null);
  const nodeRef = useRef<SVGCircleElement>(null);

  const frames = compact ? FRAMES.slice(0, 5) : FRAMES;

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const frameEls = frameRefs.current.slice(0, frames.length).filter(Boolean) as SVGRectElement[];

      // Static per-frame tilt lives in GSAP's transform cache from the start
      // so later x/y/scale tweens never clobber it.
      gsap.set(frameEls, {
        rotation: (i: number) => frames[i]?.rot ?? 0,
        transformOrigin: "center",
        opacity: 1,
      });

      if (prefersReducedMotion()) {
        gsap.set(frameEls, { y: 0, scale: 1 });
        if (spineRef.current) {
          gsap.set(spineRef.current, { scaleY: 1, transformOrigin: "bottom", opacity: 1 });
        }
        if (nodeRef.current) {
          gsap.set(nodeRef.current, { attr: { cy: NODE_REST_Y }, opacity: 1 });
        }
        return;
      }

      // --- Entrance: frames rise/settle, spine reveals upward, the focal
      // node rises into its resting position on the spine. ---
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        frameEls,
        { opacity: 0, y: 30, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out", stagger: 0.055 },
        0
      );
      if (spineRef.current) {
        tl.fromTo(
          spineRef.current,
          { scaleY: 0, opacity: 0, transformOrigin: "bottom" },
          { scaleY: 1, opacity: 1, duration: 1, ease: "power3.out" },
          0.1
        );
      }
      if (nodeRef.current) {
        tl.fromTo(
          nodeRef.current,
          { attr: { cy: NODE_START_Y }, opacity: 0 },
          { attr: { cy: NODE_REST_Y }, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.2
        );
      }

      const section = heroSectionRef.current;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      let onMove: ((e: PointerEvent) => void) | undefined;
      let onLeave: (() => void) | undefined;

      // --- Pointer tilt: restrained perspective rotation plus a few
      // pixels of per-frame parallax, scaled by depth. Fine-pointer,
      // non-compact only — nearly subconscious, never a free orbit. ---
      if (!coarse && !compact && section) {
        const quickRotateY = gsap.quickTo(wrapper, "rotationY", { duration: 0.6, ease: "power3.out" });
        const quickRotateX = gsap.quickTo(wrapper, "rotationX", { duration: 0.6, ease: "power3.out" });
        const frameQuicks = frameEls.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
        }));

        onMove = (e: PointerEvent) => {
          const rect = section.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          quickRotateY(relX * 5);
          quickRotateX(-relY * 3);
          frameQuicks.forEach((q, i) => {
            const depth = (i + 1) / frameEls.length;
            q.x(relX * depth * 6);
            q.y(relY * depth * 4);
          });
        };
        onLeave = () => {
          quickRotateY(0);
          quickRotateX(0);
          frameQuicks.forEach((q) => {
            q.x(0);
            q.y(0);
          });
        };

        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);
      }

      // --- Scroll-linked exit: one restrained, non-pinned ScrollTrigger
      // tied to the hero's natural scroll-out. No extra scroll height. ---
      if (section) {
        frameEls.forEach((el, i) => {
          const rise = 4 + (25 - 4) * (i / Math.max(1, frameEls.length - 1));
          gsap.to(el, {
            y: -rise,
            x: i % 2 === 0 ? 3 : -3,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
          });
        });
        if (spineRef.current) {
          gsap.to(spineRef.current, {
            scaleY: 1.08,
            y: -14,
            transformOrigin: "bottom",
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
          });
        }
        if (nodeRef.current) {
          gsap.to(nodeRef.current, {
            attr: { cy: NODE_REST_Y - 70 },
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
          });
        }
        gsap.to(wrapper, {
          opacity: 0.8,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
        });
      }

      return () => {
        if (section && onMove && onLeave) {
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", onLeave);
        }
      };
    },
    { scope: wrapperRef, dependencies: [compact, frames.length] }
  );

  return (
    <div ref={perspectiveRef} className={className} style={{ perspective: "1000px" }}>
      <div
        ref={wrapperRef}
        aria-hidden="true"
        className="relative size-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl" />
        <svg viewBox="0 0 520 620" fill="none" className="relative size-full">
          {frames.map((f, i) => {
            // One frame — mid-depth, nearest the focal point — reads as the
            // "stronger cobalt contour" the composition resolves toward.
            const isAccentFrame = i === Math.min(2, frames.length - 1);
            return (
              <rect
                key={i}
                ref={(el) => {
                  frameRefs.current[i] = el;
                }}
                data-elevation-frame
                x={CX + f.ox - f.w / 2}
                y={CY + f.oy - f.h / 2}
                width={f.w}
                height={f.h}
                rx={Math.min(28, f.w * 0.09)}
                stroke={isAccentFrame ? ACCENT : INK}
                strokeOpacity={isAccentFrame ? 0.55 : f.opacity}
                strokeWidth={isAccentFrame ? 1.5 : 1.25}
                fill={isAccentFrame ? ACCENT : INK}
                fillOpacity={isAccentFrame ? 0.02 : f.fillOpacity}
              />
            );
          })}

          {/* soft flat glow echo behind the spine — cheaper than a blur filter */}
          <rect
            x={SPINE_X - 5}
            y={SPINE_TOP}
            width={10}
            height={SPINE_BOTTOM - SPINE_TOP}
            rx={5}
            fill={ACCENT}
            opacity={0.08}
          />
          <rect
            ref={spineRef}
            data-elevation-spine
            x={SPINE_X - 1.5}
            y={SPINE_TOP}
            width={3}
            height={SPINE_BOTTOM - SPINE_TOP}
            rx={1.5}
            fill={ACCENT}
          />

          <circle r={16} cx={SPINE_X} cy={NODE_REST_Y} fill={ACCENT} opacity={0.14} />
          <circle ref={nodeRef} data-elevation-node r={6} cx={SPINE_X} cy={NODE_REST_Y} fill={ACCENT} />
        </svg>
      </div>
    </div>
  );
}

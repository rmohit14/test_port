"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { invalidate } from "@react-three/fiber";
import { prefersReducedMotion } from "@/lib/motion";
import { hasWebGL, getSceneTier, type SceneTier } from "@/lib/webgl";
import type { LensSceneObjects } from "./LensScene";

const LensCanvas = dynamic(() => import("./LensScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

type Props = {
  className?: string;
  posterSrc: string;
  heroSectionRef: React.RefObject<HTMLElement | null>;
  mediaQuery: string;
};

// Focus Reveal hero stage: a static poster is shown first (and stays the
// permanent view for reduced motion / no WebGL); the live lens scene
// mounts behind it and swaps in once ready, then plays one short settle.
export default function FocusRevealStage({ className = "", posterSrc, heroSectionRef, mediaQuery }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<LensSceneObjects | null>(null);
  const [mountCanvas, setMountCanvas] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [posterVisible, setPosterVisible] = useState(true);
  const [tier, setTier] = useState<SceneTier>("desktop");
  const tickerFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !hasWebGL()) return;
    const mql = window.matchMedia(mediaQuery);
    const apply = () => {
      setMountCanvas(mql.matches);
      if (mql.matches) {
        setTier(getSceneTier());
      } else {
        setSceneReady(false);
        setPosterVisible(true);
        objectsRef.current = null;
      }
    };
    const raf = requestAnimationFrame(apply);
    mql.addEventListener("change", apply);
    return () => {
      cancelAnimationFrame(raf);
      mql.removeEventListener("change", apply);
    };
  }, [mediaQuery]);

  // Pause/detach when scrolled well away — the only live renderer on the
  // page stops requesting frames the moment it isn't needed.
  useEffect(() => {
    if (!mountCanvas || !heroSectionRef.current) return;
    const el = heroSectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setSceneReady(false);
          objectsRef.current = null;
        }
      },
      { rootMargin: "60% 0px 60% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mountCanvas, heroSectionRef]);

  const startTicker = useCallback(() => {
    if (tickerFnRef.current) return;
    const fn = () => invalidate();
    tickerFnRef.current = fn;
    gsap.ticker.add(fn);
  }, []);

  const stopTicker = useCallback(() => {
    if (!tickerFnRef.current) return;
    gsap.ticker.remove(tickerFnRef.current);
    tickerFnRef.current = null;
  }, []);

  const playSettle = useCallback(() => {
    const o = objectsRef.current;
    const lens = o?.lens.current;
    const rim = o?.rim.current;
    const highlight = o?.highlight.current;
    const sharpIcon = o?.sharpIcon.current;
    const blurredIcon = o?.blurredIcon.current;
    if (!lens || !rim || !highlight || !sharpIcon || !blurredIcon) return;
    startTicker();

    gsap.set(lens.scale, { x: 0.92, y: 0.92, z: 0.92 });
    gsap.set(rim.scale, { x: 0.92, y: 0.92, z: 0.92 });
    gsap.set([lens.material, rim.material], { opacity: 0 });
    gsap.set(lens.material, { transparent: true });
    gsap.set(sharpIcon.material, { opacity: 0 });
    gsap.set(blurredIcon.material, { opacity: 0 });
    gsap.set(highlight.material, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.1, onComplete: stopTicker });

    // 0.0-0.6s: the lens and the de-focused icon behind it resolve into view.
    tl.to(blurredIcon.material, { opacity: 0.8, duration: 0.5, ease: "power2.out" }, 0);
    tl.to([lens.scale, rim.scale], { x: 1, y: 1, z: 1, duration: 0.7, ease: "power3.out" }, 0);
    // The lens glass is deliberately translucent (opacity 0.22 in LensScene's
    // material) so the icon reads through it — animating this all the way to
    // 1 would fully opacify the glass and erase that translucency.
    tl.to(lens.material, { opacity: 0.22, duration: 0.6, ease: "power2.out" }, 0.05);
    tl.to(rim.material, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0.05);

    // 0.5-1.0s: the icon through the lens becomes crisp.
    tl.to(sharpIcon.material, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.5);

    // 0.8-1.2s: a highlight settles on the glass.
    tl.to(highlight.material, { opacity: 0.22, duration: 0.4, ease: "power1.out" }, 0.8);

    setSceneReady(true);
    setPosterVisible(false);
  }, [startTicker, stopTicker]);

  const handleReady = useCallback(
    (objects: LensSceneObjects) => {
      objectsRef.current = objects;
      requestAnimationFrame(() => playSettle());
    },
    [playSettle]
  );

  // Restrained fine-pointer tilt on the lens group only — never on the
  // de-focused background icon or the floor glow.
  useEffect(() => {
    if (!sceneReady) return;
    const section = heroSectionRef.current;
    const stage = objectsRef.current?.stage.current;
    if (!section || !stage) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const quickX = gsap.quickTo(stage.position, "x", { duration: 0.6, ease: "power3.out" });
    const quickY = gsap.quickTo(stage.position, "y", { duration: 0.6, ease: "power3.out" });
    const quickRotX = gsap.quickTo(stage.rotation, "x", { duration: 0.6, ease: "power3.out" });
    const quickRotY = gsap.quickTo(stage.rotation, "y", { duration: 0.6, ease: "power3.out" });
    let hovering = false;

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      if (!hovering) {
        hovering = true;
        startTicker();
      }
      const rect = section!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      quickX(relX * 0.1);
      quickY(-relY * 0.07);
      quickRotY(relX * 0.06);
      quickRotX(-relY * 0.045);
    }
    function onLeave() {
      quickX(0);
      quickY(0);
      quickRotX(0);
      quickRotY(0);
      window.setTimeout(() => {
        hovering = false;
        stopTicker();
      }, 700);
    }

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [sceneReady, heroSectionRef, startTicker, stopTicker]);

  // Small upward drift + light reduction as the hero scrolls away.
  useEffect(() => {
    if (!sceneReady) return;
    const section = heroSectionRef.current;
    const stage = objectsRef.current?.stage.current;
    const blurred = objectsRef.current?.blurredIcon.current;
    if (!section || !stage) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: () => invalidate(),
    });
    const tween = gsap.to(stage.position, {
      y: "+=0.18",
      ease: "none",
      scrollTrigger: st,
    });
    const fade = blurred
      ? gsap.to(blurred.material, { opacity: 0.3, ease: "none", scrollTrigger: st })
      : null;

    return () => {
      tween.kill();
      fade?.kill();
      st.kill();
    };
  }, [sceneReady, heroSectionRef]);

  return (
    <div ref={stageRef} className={`relative ${className}`}>
      <Image
        src={posterSrc}
        alt=""
        aria-hidden="true"
        fill
        sizes="(min-width: 768px) 560px, 90vw"
        priority
        className={`object-contain transition-opacity duration-500 ${posterVisible ? "opacity-100" : "opacity-0"}`}
      />
      {mountCanvas && (
        <div className="pointer-events-none absolute inset-0">
          <LensCanvas tier={tier} onReady={handleReady} />
        </div>
      )}
    </div>
  );
}

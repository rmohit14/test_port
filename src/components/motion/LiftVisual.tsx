"use client";

import { forwardRef } from "react";

type IconProps = { className?: string };

const NEUTRAL_1 = "rgba(250,247,241,0.28)";
const NEUTRAL_2 = "rgba(250,247,241,0.18)";
const NEUTRAL_3 = "rgba(250,247,241,0.42)";
const ACCENT = "#2e6beb";
const CX = 240;
const CY = 240;

// --- State 01 — PERCEPTION -------------------------------------------
// 6 large contour frames, initially scattered/rotated (data-noise-*),
// settling toward one coherent, clearly-focused composition once this
// becomes the active state. A bounded, one-time settle — not a loop.
type PerceptionFrame = {
  w: number;
  h: number;
  ox: number;
  oy: number;
  restRot: number;
  noiseRot: number;
  noiseX: number;
  noiseY: number;
  opacity: number;
};

const PERCEPTION_FRAMES: PerceptionFrame[] = [
  { w: 150, h: 120, ox: -80, oy: -60, restRot: -3, noiseRot: 14, noiseX: -22, noiseY: -14, opacity: 0.3 },
  { w: 130, h: 160, ox: 90, oy: -40, restRot: 4, noiseRot: -16, noiseX: 26, noiseY: 10, opacity: 0.26 },
  { w: 170, h: 130, ox: 60, oy: 70, restRot: -5, noiseRot: 12, noiseX: 16, noiseY: 24, opacity: 0.24 },
  { w: 120, h: 150, ox: -70, oy: 65, restRot: 6, noiseRot: -13, noiseX: -20, noiseY: 18, opacity: 0.28 },
  { w: 100, h: 100, ox: 20, oy: -90, restRot: -4, noiseRot: 18, noiseX: 10, noiseY: -20, opacity: 0.2 },
  { w: 90, h: 115, ox: -15, oy: 15, restRot: 2, noiseRot: -10, noiseX: -8, noiseY: 8, opacity: 0.4 },
];

function PerceptionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" aria-hidden="true" className={className}>
      {PERCEPTION_FRAMES.map((f, i) => (
        <rect
          key={i}
          data-lift-settle
          data-rest-rot={f.restRot}
          data-noise-rot={f.noiseRot}
          data-noise-x={f.noiseX}
          data-noise-y={f.noiseY}
          x={CX + f.ox - f.w / 2}
          y={CY + f.oy - f.h / 2}
          width={f.w}
          height={f.h}
          rx={16}
          stroke={i === PERCEPTION_FRAMES.length - 1 ? ACCENT : NEUTRAL_1}
          strokeOpacity={f.opacity}
          strokeWidth={1.5}
          fill="none"
        />
      ))}
      <circle data-lift-focal cx={CX} cy={CY} r="6" fill={ACCENT} />
    </svg>
  );
}

// --- State 02 — CLARITY ------------------------------------------------
// 10 restrained lines, noisy angles settling toward near-vertical; most
// fade to a whisper at rest while one strong cobalt axis resolves.
type ClarityLine = { x: number; restRot: number; noiseRot: number; restOpacity: number };

const CLARITY_LINES: ClarityLine[] = [
  { x: 60, restRot: -2, noiseRot: 22, restOpacity: 0.06 },
  { x: 95, restRot: 1.5, noiseRot: -18, restOpacity: 0.09 },
  { x: 130, restRot: -1, noiseRot: 16, restOpacity: 0.07 },
  { x: 165, restRot: 2, noiseRot: -24, restOpacity: 0.12 },
  { x: 200, restRot: -1.5, noiseRot: 20, restOpacity: 0.08 },
  { x: 280, restRot: 1, noiseRot: -16, restOpacity: 0.08 },
  { x: 315, restRot: -2, noiseRot: 18, restOpacity: 0.12 },
  { x: 350, restRot: 1.5, noiseRot: -22, restOpacity: 0.07 },
  { x: 385, restRot: -1, noiseRot: 24, restOpacity: 0.09 },
  { x: 420, restRot: 2, noiseRot: -20, restOpacity: 0.06 },
];

function ClarityIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" aria-hidden="true" className={className}>
      {CLARITY_LINES.map((l, i) => (
        <line
          key={i}
          data-lift-settle
          data-rest-rot={l.restRot}
          data-noise-rot={l.noiseRot}
          data-rest-opacity={l.restOpacity}
          x1={l.x}
          y1="40"
          x2={l.x}
          y2="440"
          stroke={NEUTRAL_2}
          strokeOpacity={l.restOpacity}
          strokeWidth="1.5"
        />
      ))}
      <line data-lift-axis x1={CX} y1="26" x2={CX} y2="454" stroke={ACCENT} strokeWidth="3" />
    </svg>
  );
}

// --- State 03 — EXPERIENCE ----------------------------------------------
// A large bezier route through four waypoints, drawn via dash-offset, with
// a cobalt pulse travelling it.
function ExperienceIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" aria-hidden="true" className={className}>
      <path
        d="M62 378 C 140 378, 130 198, 222 198 S 342 320, 420 88"
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeLinecap="round"
        className="lift-visual-flow"
      />
      <circle cx="62" cy="378" r="6.5" fill={NEUTRAL_3} />
      <circle cx="222" cy="198" r="6.5" fill={NEUTRAL_3} />
      <circle cx="342" cy="320" r="6.5" fill={NEUTRAL_3} />
      <circle cx="420" cy="88" r="6.5" fill={ACCENT} />
      <circle cx="0" cy="0" r="7" fill={ACCENT} className="lift-visual-pulse" />
    </svg>
  );
}

// --- State 04 — ACTION ---------------------------------------------------
// Contour frames reused from Perception's vocabulary, compressed and
// aligned into 4 ascending bars around the central axis, plus the focal
// node (reused from Perception) rising toward the top boundary.
const ACTION_BARS = [
  { x: 150, w: 36, h: 70, y: 330 },
  { x: 206, w: 36, h: 140, y: 260 },
  { x: 262, w: 36, h: 230, y: 170 },
  { x: 318, w: 36, h: 330, y: 70 },
];

function ActionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 480 480" fill="none" aria-hidden="true" className={className}>
      {ACTION_BARS.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={10}
          stroke={i === ACTION_BARS.length - 1 ? ACCENT : NEUTRAL_1}
          strokeOpacity={i === ACTION_BARS.length - 1 ? 0.9 : 0.3}
          strokeWidth={1.5}
          fill={i === ACTION_BARS.length - 1 ? ACCENT : NEUTRAL_2}
          fillOpacity={i === ACTION_BARS.length - 1 ? 0.14 : 0.08}
          className={i === ACTION_BARS.length - 1 ? "lift-visual-rise" : undefined}
        />
      ))}
      <line x1="336" y1="70" x2="336" y2="30" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
      <circle data-lift-focal cx="336" cy="50" r="6" fill={ACCENT} />
    </svg>
  );
}

const ICONS = [PerceptionIcon, ClarityIcon, ExperienceIcon, ActionIcon];

export function LiftStateIcon({ index, className }: { index: number; className?: string }) {
  const Icon = ICONS[index] ?? ICONS[0];
  return <Icon className={className} />;
}

// Persistent shared visual field — concentric guides, faint contour
// frames, a vertical alignment axis and an ambient glow behind every
// state, so the diagram reads as one evolving system rather than four
// unrelated icons.
function LiftVisualField() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <svg viewBox="0 0 480 480" fill="none" className="absolute inset-0 size-full">
        <rect x="70" y="40" width="340" height="400" rx="24" stroke="rgba(250,247,241,0.045)" />
        <rect x="120" y="90" width="240" height="300" rx="18" stroke="rgba(250,247,241,0.035)" />
        <circle cx="240" cy="240" r="200" stroke="rgba(250,247,241,0.08)" />
        <circle cx="240" cy="240" r="140" stroke="rgba(250,247,241,0.06)" />
        <line x1="240" y1="40" x2="240" y2="440" stroke="rgba(250,247,241,0.07)" />
        <line x1="50" y1="240" x2="430" y2="240" stroke="rgba(250,247,241,0.04)" />
      </svg>
    </div>
  );
}

type LiftVisualProps = {
  className?: string;
};

// Desktop-only large editorial diagram. Purely presentational — the parent
// (WhatWeLift) owns the single master GSAP timeline and drives panel
// crossfade plus the per-state settle transforms directly via refs, so
// there is no internal animation state here.
const LiftVisual = forwardRef<HTMLDivElement, LiftVisualProps>(function LiftVisual(
  { className = "" },
  ref
) {
  return (
    <div ref={ref} className={`relative ${className}`}>
      <LiftVisualField />
      {ICONS.map((Icon, i) => (
        <div
          key={i}
          data-lift-visual-panel
          data-index={i}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          <Icon className="size-full" />
        </div>
      ))}
    </div>
  );
});

export default LiftVisual;

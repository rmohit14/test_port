// Pure helpers for the "What We Lift" chapter typography: fitting live SVG
// text to its available band, and deriving chapter state from an absolute
// scrubbed timeline position. Nothing here touches React or GSAP — it's
// plain DOM measurement and math, ported from the approved motion
// reference (`uploft-reference-kit/motion-reference.html`) so the proven
// fitting/timeline logic isn't re-derived from scratch.

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const ease = (p: number) => {
  const q = clamp01(p);
  return q * q * (3 - 2 * q);
};

export type WordGeometry = {
  width: number;
  height: number;
  base: number;
  path: SVGPathElement;
};

// A single gentle S-curve the word's baseline follows; `amplitude` is a
// fraction of the available band height.
export function pathData(g: Pick<WordGeometry, "width" | "height" | "base">, amplitude: number) {
  const a = amplitude * g.height;
  return `M8 ${g.base} C${g.width * 0.3} ${g.base - a} ${g.width * 0.7} ${g.base + a} ${g.width - 8} ${g.base}`;
}

// Binary-searches the largest font-size whose measured glyph bounds — across
// the full range of curve amplitudes this word will ever animate through —
// stay within the available band. No character can disappear off the path
// or clip the band at any point in the chapter's motion, because the fit is
// checked against the curve's extremes, not just its resting state.
export function fitWord(svg: SVGSVGElement, width: number, height: number): WordGeometry {
  const path = svg.querySelector<SVGPathElement>("path");
  const fill = svg.querySelector<SVGTextElement>(".kinetic-word-fill");
  const echo = svg.querySelector<SVGTextElement>(".kinetic-word-echo");
  if (!path || !fill || !echo) throw new Error("KineticWord markup missing");

  const g: WordGeometry = { width, height, base: height * 0.72, path };
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const boundsAt = (size: number) => {
    fill.setAttribute("font-size", String(size));
    echo.setAttribute("font-size", String(size));
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const amp of [-0.4, 0, 0.4]) {
      path.setAttribute("d", pathData(g, amp));
      const box = fill.getBBox();
      minX = Math.min(minX, box.x);
      minY = Math.min(minY, box.y);
      maxX = Math.max(maxX, box.x + box.width);
      maxY = Math.max(maxY, box.y + box.height);
    }
    return { minX, minY, maxX, maxY, advance: fill.getComputedTextLength() };
  };

  let low = 4;
  let high = Math.max(width, height) * 2;
  for (let n = 0; n < 16; n++) {
    const candidate = (low + high) / 2;
    const b = boundsAt(candidate);
    const fits =
      b.advance > 0 &&
      b.advance <= (width - 16) * 0.95 &&
      b.maxX - b.minX <= width * 0.93 &&
      b.minX >= width * 0.02 &&
      b.maxX <= width * 0.98 &&
      b.maxY - b.minY <= height - 52;
    if (fits) low = candidate;
    else high = candidate;
  }

  const b = boundsAt(low);
  if (!Number.isFinite(b.minY) || b.maxX <= b.minX) {
    throw new Error("SVG glyph measurement unavailable");
  }
  g.base += (height - (b.maxY - b.minY)) / 2 - b.minY;
  path.setAttribute("d", pathData(g, 0));
  return g;
}

export type ChapterSnapshot = {
  chapter: number;
  states: { opacity: number; y: number }[];
};

// Pure function of absolute scrubbed time (0-4) — reverse scrolling,
// fast-forwarding, resize and mid-section restoration all just call this
// again with the current time. Nothing here depends on which direction
// time last moved, so there is no directional-callback desync to have.
export function timelineState(time: number, steps = 4): ChapterSnapshot {
  const t = Math.min(4, Math.max(0, time));
  let chapter = 0;
  for (const boundary of [0.825, 1.825, 2.825]) if (t >= boundary) chapter++;

  const states: ChapterSnapshot["states"] = Array.from({ length: steps }, () => ({ opacity: 0, y: 0 }));
  for (let i = 0; i < steps - 1; i++) {
    if (t < i + 0.65) {
      states[i].opacity = 1;
      break;
    }
    if (t < i + 1) {
      const p = ease((t - i - 0.65) / 0.35);
      states[i] = { opacity: 1 - p, y: -16 * p };
      states[i + 1] = { opacity: p, y: 16 * (1 - p) };
      break;
    }
  }
  if (t >= steps - 1) states[steps - 1].opacity = 1;
  return { chapter, states };
}

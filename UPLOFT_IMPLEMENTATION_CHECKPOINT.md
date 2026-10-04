# Uploft Implementation Checkpoint

## Current pass: image-led hero + live SVG chapters (supersedes the Three.js lens pass below)
Authoritative brief: `uploft-reference-kit/MASTER_PROMPT.md`, with `uploft-reference-kit/references/*.png` as the visual target and `uploft-reference-kit/motion-reference.html` as the behavior reference. Replaces the live Three.js glass-lens hero entirely with one finished, transparent production PNG (`assets/uploft-focus-art.png`) presented with restrained 2.5D CSS/GSAP motion, and replaces the per-character `KineticWord` wave with live SVG text on a curved path. This explicitly supersedes the prior "Focus Reveal" Three.js pass.

## Files (new)
- `src/components/motion/OpticalArt.tsx` — the hero art: one `next/image` of the supplied PNG inside three nested wrappers (scroll drift, pointer tilt, one-time entrance) so they never write competing transforms. No WebGL.
- `src/lib/kineticType.ts` — pure, framework-free helpers ported from `motion-reference.html`: `fitWord()` (binary-searches the largest font-size whose *measured* SVG glyph bounds, checked across the full range of curve amplitudes, fit the available band) and `timelineState()` (derives chapter index + crossfade state from an absolute scrubbed time, with no directional callbacks).
- `public/images/uploft-focus-art.png` — the supplied finished optical artwork (1254×1254, alpha preserved).

## Files (changed)
- `src/components/sections/Hero.tsx` — grid fixed to `minmax(0,1.04fr) minmax(0,1fr)` (the previous `52% 48%` plus gap overflowed the container); now renders `OpticalArt` instead of the old `FocusRevealStage`/lens canvas. One shared instance reflows from the right column (desktop) to below the copy (mobile) via the grid collapsing to one column — not two separately-mounted copies.
- `src/components/motion/KineticWord.tsx` — rewritten from per-character wave spans to one `<path>` shared by the ivory fill `<text>` and the cobalt echo `<text>`, both via `<textPath>`, so they can never desync (the old version applied wave phase by the combined index of outline+fill spans, which could mismatch letter positions — this removes that class of bug by construction).
- `src/components/sections/WhatWeLift.tsx` — rewritten around `kineticType.ts`: `document.fonts.ready` → measure the band → `fitWord()` each panel → `ScrollTrigger.create({pin, scrub:true, onUpdate: self => updateChapters(self.progress*4)})`. `updateChapters` is a pure function of absolute time (ported `timelineState` + the brief's exact per-chapter curve-amplitude formulas), so forward/reverse/fast-scroll/resize/mid-section restoration all resolve identically. Pin distance 3.2 stage heights desktop / 2.8 mobile. Re-measures on `ResizeObserver`/resize/font-ready/reduced-motion-or-short-viewport media changes.
- `src/app/globals.css` — `[data-lift-stage]` now defaults to `display:none` until JS sets `[data-kinetic-ready="true"]` on the section (set only once `fitWord` + the pin actually succeed — set optimistically, measured synchronously, reverted in the same tick on failure, so there's nothing to visibly flash either way); reduced-motion/short-viewport keep their `!important` overrides as a safety net. Added `[data-chapter-label]` styling: a single fixed muted color for inactive labels (not a second opacity multiplier stacked on an already-dim color, which the brief explicitly flagged) and a cobalt underline + full paper color when active.
- `src/app/layout.tsx` — `metadataBase` now reads `process.env.NEXT_PUBLIC_SITE_URL`, falling back to `http://localhost:3000` in development. No production domain is configured anywhere in this project (no `.env`, nothing in `src/lib/constants.ts`) — **this needs to be set via that env var once a real production origin exists; none was invented.**
- `src/components/ui/Container.tsx` — the `as any` cast on the polymorphic tag is gone; it existed only to work around `@react-three/fiber`'s global JSX typing augmentation, which no longer exists in the program now that `three`/`@react-three/fiber` are uninstalled.
- `package.json` — `three`, `@react-three/fiber`, `@types/three` uninstalled (no other consumer existed anywhere in `src/`, confirmed via search before removing).

## Files deleted
- `src/components/three-lift/` (`LensScene.tsx`, `FocusRevealStage.tsx`, `iconTexture.ts`, `lensGeometry.ts`, `colors.ts`) and `src/lib/webgl.ts` — the entire live Three.js lens path, per the brief's explicit instruction to remove it from the active hero. Confirmed no other file imported any of them before deleting.
- `public/images/lift/hero-poster.png` and its parent directory — the old lens scene's static poster fallback, no longer needed (the new hero has no WebGL path to fall back from).

## Real correctness issue found and fixed this pass
Initial layout used an *overall* timeline progress bar (full-width, spanning the whole label row) in addition to each label's own small active underline. The six reference PNGs only show the per-label underline — no second wide bar beneath the row. Confirmed by direct screenshot comparison against `references/03-chapter-clarity.png`; removed the extra element and its `scaleX` tween entirely rather than leaving unused dead code.

## Actual checks run
- `npm run lint` — clean. `npm run build` — clean, **and the pre-existing `metadataBase` warning is gone** now that it's set.
- Zero `THREE.Clock` (or any other) console warnings anywhere on the page — expected, since `three` is no longer a dependency at all; nothing to attribute it to.
- Playwright screenshots at 1440×900, 390×844, 320×700, and 844×390 (short landscape): zero horizontal overflow (`scrollWidth > clientWidth`) at any of the four.
- Hero: full, uncropped lens silhouette with the blurred background mark and floor caustic, matching `references/01-hero-desktop.png`; verified again on mobile (390px) and narrow (320px) with no clipping.
- Chapters swept both directions and via large jumps at 1440×900 (desktop, 3.2× pin distance) and 390×844 (mobile, 2.8× pin distance): counter text, the visible word panel, and the active bottom label were read back from the live DOM after every scroll and matched on every check — forward, reverse, and two large forward/backward jumps.
- Chapter labels confirmed non-interactive via DOM inspection: `tabIndex=-1`, no `role`, `cursor:auto` (not `pointer`).
- Pin release after Action verified via screenshot: the Process section follows immediately with no jump or empty gap.
- Reduced motion (`reducedMotion:"reduce"`): hero shows the static artwork with no entrance/pointer/scroll motion; `#lift`'s `data-kinetic-ready` stays `"false"`, confirming the stacked fallback is what's actually shown (not just styled to look like it).
- Short landscape viewport (844×390): same fallback confirmed the same way — `data-kinetic-ready` stays `"false"`, screenshot shows the readable stacked version, not a cramped pinned stage.
- No-JS baseline (`javaScriptEnabled: false`): hero headline/body/CTAs/artwork and all four readable chapters confirmed present via screenshot — this is Next's server-rendered HTML, not a JS-dependent enhancement.
- Existing destinations unchanged, read back from the live DOM: header nav → `#work`/`#services`/`#studio`/`#contact`; both hero CTAs → the real `mailto:` link and `#work`. Mobile header dialog opens and closes correctly.
- Full-page scroll with console/page-error listeners attached throughout: zero errors.

## Outstanding / not verified from here
- No deployed/public preview URL exists for this repo. Local-only: `npm run build && npm run start`, served at `http://localhost:4300` in this session (port 3000 is the default if run unmodified).
- No Lighthouse/CrUX/real-user performance tooling available in this environment — LCP/INP/CLS not measured, not claimed.
- `metadataBase` is correctly wired to an env var but that var is unset — social preview images will resolve against `localhost` until `NEXT_PUBLIC_SITE_URL` is set for a real deployment. Flagged here rather than guessed at.
- Pointer-tilt's 8px/1.2° cap and the entrance timing were implemented to the brief's exact numbers (ported from `motion-reference.html`) but not pixel-measured against a live mouse move in this environment.
- `npm audit` reports 5 pre-existing high-severity advisories in the dependency tree, unrelated to and unchanged by this pass — not investigated, out of this task's scope.

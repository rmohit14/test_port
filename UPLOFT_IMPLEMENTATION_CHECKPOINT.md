# Uploft Implementation Checkpoint

## Locked design/constraints
Brand: Uploft Digital, founder-led studio, Coimbatore. Colors: paper #faf7f1, ink #14222a, accent #2e6beb, accent-deep #1f4fbd, paper-dim #f1ebdf. Instrument Serif (headings) / DM Sans (body). Stack verified: Next 16.3.6, React 19.3, TS5, Tailwind v4, GSAP 3.13 + @gsap/react 2.1, Lenis 1.3. No new deps. No prices/testimonials/fabricated metrics. metadataBase intentionally unset (no confirmed domain) — correct, leave as-is.

## Audit findings (verified, not assumed)
- Hero already uses `ElevationField.tsx` (SVG contour frames, not the old rejected 3D pillars) — 8 frames, cobalt spine+node, but **no single stronger-cobalt contour frame** yet, and headline has no blue emphasis on "seen".
- `LiftCycler.tsx` runs a perpetual `setInterval` forever — brief wants a short settling sequence, not infinite rotation.
- Contrast audit (computed WCAG ratios): accent-deep on paper = **6.745:1** (exceeds brief's own 5.640 target); plain `text-accent` has **zero** usages on small text anywhere in `src/components` (grep-verified) — contrast already compliant, no token change needed.
- Marquee (`Marquee.tsx`) capability list is dev-facing (NEXT.JS FRONT END, VERCEL-READY etc.) — needs the public-facing list from the brief. No pause/resume control exists yet.
- Portfolio copy already says "Luxury Retail / Commerce Concept"; tag array has "Commerce-Ready" which overclaims — soften to "Commerce Concept". Boutique/Café source repos are NOT in this workspace (confirmed via search) — screenshot recapture must go through the live Vercel URLs via Playwright if reachable.
- FinalCTA has no Copy-Email fallback button.
- SmoothScroll.tsx: single RAF driver (gsap.ticker → lenis.raf), Lenis scroll → ScrollTrigger.update — already correct, no dual-driver bug.
- Header: native `<dialog>` via showModal/close — Escape/focus handled natively, already correct.
- WhatWeLift: single master GSAP timeline (built in a prior pass) already addresses the "clipped title" bug class structurally — verify via screenshots, not rewrite blind.

## Plan (implementing now)
1. ElevationField: one frame stroked cobalt; add blue emphasis span around "seen".
2. LiftCycler: replace infinite interval with a one-time settle sequence.
3. Marquee: swap capability list; add accessible pause/resume button.
4. Portfolio: "Commerce-Ready" → "Commerce Concept"; attempt live-URL verification + truthful boutique screenshot recapture via Playwright.
5. FinalCTA: add Copy Email button w/ accessible success/error feedback.
6. QA: lint, build, screenshots at 390×844/430×932/768×1024/1440×900/1920×1080, reduced motion, fast/reverse scroll, keyboard nav.

## Completed work (all 6 plan items done)
1. `ElevationField.tsx`: mid-depth frame (index 2) now strokes cobalt (`#2e6beb`, 0.55 opacity) distinct from the ink frames and the spine. `LineReveal.tsx` prop widened `string[]`→`ReactNode[]`; `Hero.tsx` headline wraps "seen" in `<span className="text-accent-deep">`.
2. `LiftCycler.tsx`: `setInterval` replaced with staggered one-time `setTimeout`s (index 0→1→2→3), settles on the last word, no perpetual loop.
3. `content.ts` CAPABILITIES replaced with the specified public list. `Marquee.tsx` rewritten client component: `data-paused` attribute + `.marquee-track[data-paused]{animation-play-state:paused}` in globals.css, visible "Pause"/"Play" button with `aria-pressed`, keyboard-focusable, outside the `aria-hidden` track. Verified via Playwright click: toggles label, `aria-pressed`, and actual computed `animationPlayState`.
4. `content.ts`: boutique tag "Commerce-Ready"→"Commerce Concept". Verified both live demo URLs return 200 (Playwright). Boutique demo still shows "500+/10K+/100%" — confirmed it's a separate live Vercel deployment, not in this workspace, so the claims can't be edited at the source; recorded as pending below. Recaptured `public/images/portfolio-boutique.png` (replacing the old `.webp`) as a truthful crop of the live page that excludes the stats row entirely; added `object-left-top` for this image specifically in `SelectedWork.tsx` (keyed off `project.slug`) so the full headline/CTAs stay in frame at all breakpoints instead of center-cropping.
5. `FinalCTA.tsx`: added "Copy email" button + `role="status" aria-live="polite"` feedback. Verified via Playwright: click copies `uploftdigital@gmail.com` to clipboard and shows "Copied to clipboard."
6. QA done — see Check results below.

## Check results (actual, not assumed)
- `npm run lint`: clean. `npm run build`: clean (only the expected, pre-existing `metadataBase` warning).
- Screenshots at 390×844, 430×932, 768×1024, 1440×900, 1920×1080: zero horizontal overflow, zero console errors/warnings at every size.
- Hero: full Elevation Field visible with margin at all 5 sizes, no cropping, cobalt contour + emphasis visible; mobile keeps headline/body/CTA in first view with a compact corner motif.
- What We Lift: swept panel opacity to confirm all 4 states (01/04–04/04) show exactly one fully-opaque panel with matching word/description/counter. Stress-tested fast-forward jump, instant reverse jump, rapid scrub, and direct `#lift` anchor nav — every case landed on exactly one clean state, no stale/mismatched/double-visible panels.
- Reduced motion (`reducedMotion:"reduce"`): hero renders the complete static composition immediately (no entrance play); What We Lift falls back to the stacked non-pinned list at desktop width per the existing CSS rule — all 4 ideas readable, no pin.
- Keyboard: mobile menu opens via click, closes via Escape (native `<dialog>`), focus returns to the trigger button — verified live.
- Contrast: accent-deep on paper = 6.745:1 (WCAG AA pass, exceeds brief's 5.640 target); no plain `text-accent` usage found anywhere for text.
- Links: all 3 "Start a Project" instances point to the same mailto+subject; "View Work" → `#work`; Instagram link correct.

## Outstanding / cannot verify from here
- **Boutique live demo** (`boutique-sample-sigma.vercel.app`) still publicly shows "500+ Products / 10K+ Happy Customers / 100% Authentic" — unsupported metrics. That demo is a separate deployment outside this repo; cannot be edited here. This site's own portfolio preview has been made truthful (recaptured, stats excluded), but the live demo link itself still shows the claims if a visitor clicks through.
- **Performance (LCP/INP/CLS)**: no Lighthouse/CrUX tooling available in this environment; not measured. Bundle is static-only (no client data fetching), largest JS chunk ~224KB, but this is not a substitute for real lab/field metrics.
- **metadataBase/canonical**: correctly left unset — no production domain has been confirmed; do not set one without the actual deployment origin.
- Email delivery itself (receiving end) was not tested — no safe way to send a real enquiry from this environment.

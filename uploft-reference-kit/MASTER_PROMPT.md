# Uploft Digital — image-led implementation prompt

Implement the approved Uploft design in the existing website. This is a coding task: make visible changes, verify them, and finish the implementation. A plan or checkpoint file alone does not complete this task.

The reference kit is in `uploft-reference-kit/`. Read its README, inspect every reference PNG and the production artwork, and read `motion-reference.html` before editing. These files supersede older instructions that asked for a live Three.js lens, Sculptural Fold, or newspaper-style chapters. Do not explore another concept.

## 1. Inspect only what you need

Read the repository's AGENTS.md and applicable instructions, including relevant installed Next.js documentation under `node_modules/next/dist/docs/`. Check the working tree and preserve unrelated changes. Inspect the active Hero, WhatWeLift, KineticWord, Header, root layout, global styles, font setup, content/constants, and existing Lenis/GSAP integration. Confirm which components actually render on `/`.

Use the existing Next.js, React, TypeScript, Tailwind, GSAP and Lenis stack. Do not install a new animation framework, redesign unrelated sections, invent business claims, or replace the project with a new template. Keep the current navigation destinations, contact/dialog behavior, work section and Concept Builds labels.

## 2. Treat the files correctly

- `references/01-hero-desktop.png`: target hero composition, spacing, hierarchy and optical finish.
- `references/02` through `05`: four states of ONE chapter stage, in order. They are not four cards or four independent full-screen sections.
- `references/06-mobile-layout.png`: two separate phone views displayed beside one another for comparison. The actual mobile website is one column.
- `assets/uploft-focus-art.png`: transparent, finished production artwork. This file is meant to be used in the hero.
- The other two assets are the official Uploft logo and icon. Preserve their geometry.
- `motion-reference.html`: a runnable behavior reference. It uses native sticky scrolling for portability. Adapt the behavior to the app's existing GSAP integration; do not stack native sticky and GSAP pin controllers on the same element.

Build real HTML navigation, text and CTAs. Build live SVG chapter typography. Never use a reference screenshot as the website, as a chapter heading, or as a background containing baked text. Generated type is a visual guide; use the actual project fonts and measured glyph bounds.

## 3. Hero — implement this composition

Use paper `#faf7f1`, ink/navy `#14222a`, and cobalt `#2e6beb`, aligned with the existing theme tokens. Use Instrument Serif for display type and DM Sans for UI/body. Preserve the existing font-loading setup.

Keep the official wordmark and functional header. Give the hero two substantial desktop columns: editorial copy left, optical artwork right. Use fraction tracks with `minmax(0, ...)`, accounting for the gap. The current `52% 48%` tracks plus a gap overflow their container and must be corrected.

Headline, as real text:

> Raise how your  
> brand is seen.

Make “seen.” cobalt and true italic, with a fine curved underline. Keep the headline large and confident, close to the desktop reference. Body copy:

> High-craft websites and digital experiences that elevate how your business looks, feels and communicates online.

Keep Start a Project and View Work, using their existing real destinations. Maintain generous spacing, readable body text and visible focus states.

Copy the supplied optical PNG into the appropriate public image directory. Render it responsively with Next Image, correct intrinsic dimensions, descriptive sizing and `object-fit: contain`. Preserve alpha. Show the entire glass disc, cobalt rim, sharp icon, blurred background mark and bottom caustic. Give it enough space to dominate the right column. Keep the complete silhouette inside the layout at every viewport and at the largest animated transform. Do not crop it into a blue hoop or add a rectangular card, backdrop plane, extra logo, glow blob or placeholder geometry.

Remove the old FocusRevealStage/LensCanvas path from the active hero. Keep unrelated Three.js consumers and files intact. Do not recreate the artwork with primitive meshes. The optical appearance is baked into the supplied asset; movement is restrained 2.5D presentation, not real-time refraction.

Allow a small one-time entrance, then fine-pointer movement capped around 8px and 1.2 degrees, and a small scroll drift as the hero leaves. Use separate nested wrappers for entrance, pointer movement and scroll movement so they never write competing transforms. Keep the artwork useful on its first rendered frame. Stop pointer updates when offscreen; reset gently on pointer leave. No perpetual spinning, cursor-following lens, dramatic zoom, motion over the copy or animation that delays the CTAs. Disable presentation motion for reduced motion.

On mobile, keep copy and CTAs first, with the complete artwork below in normal flow. Preserve the lens at a meaningful size. Do not force the whole hero into one viewport or squeeze the art into a corner. The desktop grid becomes one column.

## 4. Chapters — one place, controlled by document scrolling

Retain the existing WhatWeLift section and content source. The normal experience on desktop AND ordinary mobile is one pinned navy stage. Document scrolling changes its word, caption, counter and passive active label in place. Release the pin after Action. Reverse scrolling must reverse every state correctly.

Use exactly these states:

| Word | Counter | Caption |
|---|---|---|
| Perception | 01 / 04 | Show up as confidently online as you do in person. |
| Clarity | 02 / 04 | The offer is understood in seconds, not paragraphs. |
| Experience | 03 / 04 | Every interaction feels considered, not accidental. |
| Action | 04 / 04 | The next step — call, message, visit, buy — is always obvious. |

Follow the chapter PNGs: small What We Lift eyebrow, counter opposite, enormous ivory serif word across the usable width, fine cobalt outline echo, caption below, and four plain chapter labels with a small cobalt active underline. Keep the stage navy and uncluttered. The bottom labels are inert status text: no buttons, links, tab roles, click handlers, focus stops, pills or carousel controls.

Use SVG text on a gently curved Bézier path. Each complete word stays a properly kerned string. Its ivory fill and thin cobalt outline share the exact text, font size and path; apply only a small deliberate echo offset. Scope path IDs per component instance. Preserve the word and caption as readable semantic content independently of the decorative SVG.

After the actual fonts load, fit each word using measured SVG glyph bounds to roughly 90–94% of the available word-band width, constrained by its available height. Check the full text advance against the available path length so no characters disappear off the path. Include ascenders, descenders, stroke and maximum curve displacement. Refit on relevant size/font changes. Do not keep the old 8.5rem cap or estimate sizing from character count. Reserve separate space for the caption and indicators so Clarity's descender and the animated word cannot overlap them. Do not stretch the letters horizontally to fake the fit.

Create one four-unit scrubbed timeline:

- Perception holds 0–0.65; transition to Clarity 0.65–1.
- Clarity holds 1–1.65; transition to Experience 1.65–2.
- Experience holds 2–2.65; transition to Action 2.65–3.
- Action holds 3–4, then the stage releases.

Perception resolves from a slightly stronger curve into the gentle reference pose. Clarity settles toward a cleaner baseline. Experience carries one slow wave driven by scroll progress. Action settles with a small upward entrance and stays confident. Crossfade with a small vertical handoff; avoid two fully readable words colliding. No autonomous wave loop or letter scrambling.

Start with a pin distance of about 3.2 stage heights on desktop and 2.8 on mobile. Derive the counter/active label from the absolute scrubbed timeline time, with transition midpoints at 0.825, 1.825 and 2.825. Do not use directional callbacks to decide which chapter is active. Every state must be deterministic after fast scrolling, reverse scrolling, resize and restoration mid-section.

Use the existing Lenis instance and ticker wiring. Animate children of the pinned stage, not the pin container. Use useGSAP/context and matchMedia cleanup so Strict Mode, route changes and resizing cannot create duplicate pins or listeners. Refresh measurements after fonts and relevant layout assets are ready. Avoid React state updates every animation frame.

For no JS, reduced motion, genuinely unreadable short viewports or failed enhancement, show all four words and captions in readable normal flow. Keep this baseline available until enhancement succeeds. A normal portrait mobile viewport still gets the pinned sequence. Inactive labels must remain readable; do not multiply a dim text color by another 0.4 opacity. Keep information accessible without scroll animation or hover.

## 5. Correct the concrete failures and finish

The supplied failing build showed a cropped lens and undersized chapter typography. The new artwork and measured SVG layout must visibly resolve both. The former KineticWord wave applied phase by the combined index of outline and fill spans, causing mismatched letter positions; the shared path approach removes that bug.

The successful GET / 200 logs do not verify the design. Set metadataBase from the project's configured absolute production origin, with a localhost fallback for development. If the production origin is unknown, report the required setting; do not invent a domain. Any remaining THREE.Clock warning needs attribution to an actual consumer/dependency. Do not mask console warnings or globally replace Clock with Timer to silence it.

Use one focused implementation pass, then run the existing lint/build checks and repair relevant failures. Check the actual rendered page at 1440×900 and 390×844, plus narrow 320px and short landscape layouts. Verify a full lens silhouette, large words, correct font loading, no horizontal overflow or collisions, synchronized counters/captions/labels, forward/reverse scrolling, release after Action, reduced motion, existing links and dialog behavior. If browser tools are available, inspect screenshots and correct obvious differences before finishing. Do not claim visual verification if you could not render the site.

Conserve context: do not re-research concepts, dump the entire repo, add speculative features or write a long planning document. If interrupted, record the modified files and exact next step briefly. Final response: files changed, visible result, checks performed, and any genuine remaining limitation. Implement the design now.

# Uploft Digital — Focus Reveal Hero + Scroll Chapters

Implement the final approved design in the existing Uploft Digital repository. This is an implementation task: change the actual rendered website, complete the motion, and verify the result. A checkpoint or design document alone is not completion.

## 1. Locked direction and scope

Use the attached approved sample: ivory hero, editorial headline on the left, thick blue-edged optical-glass lens revealing the Uploft icon on the right, followed by a navy section with enormous kinetic serif typography.

The hero is **Focus Reveal**, the current selected design. The chapters are **Perception → Clarity → Experience → Action**, changing in the same pinned position as the visitor scrolls. Chapter selection must come from document scrolling. The bottom labels in the reference are passive progress indicators, not buttons or clickable tabs. Do not use a carousel, arrows, autoplay, or a nested scrolling panel.

Replace the current hero artwork and the chapter section's right-side diagrams. The chapter word itself becomes the full-width artwork. Excluded directions: Prism Mark, folded webpages, newspapers, café illustrations, ribbons, devices, and additional chapter sculptures. Preserve the rest of the site's content, portfolio, working links, contact flow, and established layout unless a small integration adjustment is necessary.

This brief supersedes conflicting visual choices in older Uploft prompts and checkpoints. Follow applicable repository instructions and preserve unrelated user changes. Proceed with routine implementation decisions without asking me to choose another design.

## 2. One focused inspection

Check git status, package.json, the active homepage composition, relevant styles, actual logo assets, and the existing hero/chapter/scroll components. Confirm which components the homepage currently renders before editing.

The uploaded starting build used Next.js App Router, TypeScript, Tailwind, GSAP, @gsap/react, and Lenis. Likely targets:
- src/components/sections/Hero.tsx
- src/components/sections/WhatWeLift.tsx
- src/components/motion/ElevationField.tsx and LiftVisual.tsx
- src/components/motion/SmoothScroll.tsx
- src/app/globals.css, src/app/page.tsx, src/app/layout.tsx
- src/lib/content.ts, constants.ts, motion.ts
- public/images/uploft-icon-mark.png and uploft-logo-main-clean.png

Treat these as discovery hints; the current repository may have evolved. Reuse its actual package manager, versions, design tokens, fonts, buttons, and shared scroll integration. Trace only direct dependencies needed for this change. Do not switch frameworks or upgrade the whole stack. Inspect existing code once, give a short implementation update, then edit.

## 3. Visual system and hero layout

Use the established palette: paper #faf7f1, navy/ink #14222a, cobalt #2e6beb. Use Instrument Serif for display typography, including its real italic, and DM Sans for body/UI. Reuse existing font loading.

Desktop: a balanced two-column composition, approximately 52% copy and 48% artwork, with generous but purposeful spacing. Keep the official header logo and working navigation. The optical artwork should feel as substantial as the headline, rather than a small icon in a padded card. Match the reference's composition and material character, not only its colors.

Hero content:
- Eyebrow: DIGITAL BRAND ELEVATION STUDIO
- H1 on desktop: “Raise how your” / “brand is seen.”
- Render “seen.” in cobalt italic; the rest is navy. Use a fine curved underline if it matches the sample cleanly.
- Body: “High-craft websites and digital experiences that elevate how your business looks, feels and communicates online.”
- CTAs: Start a Project and View Work. Preserve their real destinations. Use the sample's dark filled primary and outlined secondary treatment.

Keep the H1 as real, accessible HTML. Fit its line breaks responsively; don't shrink the display text merely to preserve a desktop layout on a phone. Keep copy and CTAs visible immediately, without waiting for artwork or a cinematic intro.

On mobile, place the optical stage beneath the copy at a meaningful size, usually around 260–340px tall, fitted to the available width. Do not hide it or replace it with the old tiny corner decoration. Desktop should feel composed within an ordinary first viewport; allow natural height on smaller or shorter screens. Protect text, buttons, and header from overlap.

## 4. Build the actual Focus Reveal artwork

Use the real icon asset, retaining its two outer uprights, curved cobalt lower parts, central upward arrow, proportions, and spacing. Use the standalone icon in the artwork and the official wordmark in the header.

Create one coherent optical scene:
1. An oversized, softly blurred, lower-contrast Uploft icon sits behind the lens.
2. A thick, upright, gently convex glass disc sits in front, angled slightly so its depth is visible. It has a clear center, beveled cobalt/navy edges, restrained white reflections, and convincing thickness. It must not read as a hollow hoop, flat blue circle, opaque badge, or generic floating sphere.
3. Through the lens, the same icon becomes crisp and slightly magnified. Register the sharp and blurred versions so they read as one continuous symbol being brought into focus. The rim can bend the image gently; the central arrow must stay recognizable.
4. Add a soft grounding shadow and a restrained cobalt light/caustic impression on the ivory floor. Keep reflections controlled and the background quiet.

Implement this as an isolated client-side optical component. Reuse an existing capable renderer if present; otherwise use a small Three.js implementation, adding only three and required TypeScript types through the existing package manager. Avoid introducing an entire scene framework for this one object.

Use a beveled, convex disc mesh, such as a carefully oriented lathed profile, with transmissive glass, studio-style environment lighting, and a restrained blue edge treatment. Create required simple geometry and lighting in code; do not depend on a missing model, remote HDR, external image-generation service, or manual Blender task.

The focus effect needs explicit compositing: merely refracting a blurred texture will not make it sharp. Sample the clean source within the lens footprint and the blurred source outside, with matched coordinates and mild edge displacement. Keep the focus mask, lens, reflected highlights, and shadow aligned when the lens moves. Favor convincing art direction over expensive physical simulation. Use a low-cost authored light texture/plane for the floor effect rather than live caustic ray tracing.

Use the attached screenshot as a visual reference, not a raster replacement for the webpage. Keep headline, body, buttons, and chapters in the DOM. If an existing isolated render is useful, it may support the artwork or fallback; do not display a composite website screenshot as the hero.

Provide a locally available static fallback from the same composition, with the real icon, glass edge, and shadow. It must remain visible until the live scene has rendered successfully and cover WebGL failure or reduced motion. Report material differences from the reference honestly rather than substituting a cheap symbol and declaring a match.

## 5. Hero motion

The resting first frame must already look impressive. Use a short optical settle, approximately 0.8–1.2 seconds: the lens resolves, the icon becomes clear, and a highlight settles. Avoid long loaders or hiding the entire hero.

For a fine pointer, add damped lens movement confined to the artwork, roughly 6–12px translation and at most 3–4 degrees of tilt. The logo remains legible; glass, focus mask, and light respond coherently. Touch users receive the complete resting composition without needing hover.

As the hero leaves the viewport, give the artwork a small upward drift and light reduction so the transition into navy feels considered. Do not pin the hero, send the lens across the page, or run a full rotation. No continuous animation is necessary when the visitor is idle.

## 6. Chapters: one stage, changed by scrolling

Preserve the original site's useful behavior: one section, one pinned stage, one scroll-driven master timeline. Replace its split text/diagram layout with the reference's full-width typographic composition.

Inside the stage:
- Top left: small cobalt “WHAT WE LIFT” plus a thin line.
- Top right: synchronized 01 / 04 through 04 / 04.
- Main artwork: one enormous ivory Instrument Serif chapter word, occupying most of the usable width, with a gently curved/waved baseline and one thin cobalt outline echo behind it.
- Supporting sentence below the word.
- Bottom: plain Perception / Clarity / Experience / Action labels and a fine active underline/progress treatment that follows scrolling.

The labels must have no click handlers, button/tab roles, pointer cursor, hover-selection treatment, or keyboard tab stops. They are a status display. Keep real CTAs and navigation interactive.

Use these captions:
- Perception: “Show up as confidently online as you do in person.”
- Clarity: “The offer is understood in seconds, not paragraphs.”
- Experience: “Every interaction feels considered, not accidental.”
- Action: “The next step — call, message, visit, buy — is always obvious.”

Keep the stage and its content anchors stationary while pinned. Words transition inside the same word region; captions, counter, and indicators update together. Scrolling backward reverses the sequence correctly. After Action has had a readable hold, release the pin into the next existing section without a jump or unexplained empty space.

Fit each complete word after the display font loads. “Experience” and “Perception” must remain legible within the available width. Use fluid sizing/measurement, deliberate kerning, and generous glyph bounds. Do not crop ascenders/descenders, stretch the font awkwardly, or return to a small left-side title.

## 7. Kinetic typography and timeline

Use a small reusable visual word component, with the fill and cobalt echo sharing the same metrics. Keep full semantic headings/captions available to assistive technology; mark decorative split letters and duplicate outlines aria-hidden. Don't announce every letter or animation frame.

The motion should be a controlled deformation of the word's baseline, not bouncing disconnected letters. Starting amplitude can be around 0.04–0.07em on desktop and smaller on mobile. Keep characters nearly upright and use one outline echo offset by only a few pixels.

Give each chapter its own emphasis within the same visual language:
- Perception: a slight dispersed/waved arrangement resolves into a confident readable word.
- Clarity: letter offsets settle toward a clean baseline.
- Experience: a gentle flowing wave moves through the word with scroll progress.
- Action: a restrained upward movement resolves into a firm final position.

Use short reversible masked/staggered exits and entrances between words, with only one dominant readable title at a time. Each chapter needs more reading time than transition time. Do not attach independently timed entrance animations that fight the scrubbed timeline.

A practical starting schedule is a four-unit timeline: Perception holds from 0–0.65, transition to Clarity from 0.65–1; Clarity holds 1–1.65, transition to Experience 1.65–2; Experience holds 2–2.65, transition to Action 2.65–3; Action holds 3–4. Drive deformation, captions, counter, and progress from this same playhead. Tune the timing after viewing it.

Use GSAP ScrollTrigger pin + scrub, starting around scrub 0.4–0.6 and about 250–300vh of additional desktop scroll travel. Pin relative to the actual fixed-header offset and available viewport height. Animate children, not the pinned element. Use correct pin spacing; don't combine a second artificial spacer with the same ScrollTrigger spacing.

On normal mobile/tablet screens, retain the same-place scroll sequence with native touch scrolling and a shorter distance, roughly 200–240vh of additional travel to start. Recompose the title and captions to fit. Do not silently replace the requested experience with four cards on every screen below 1024px. When extreme viewport height/zoom makes the stage unreadable, use a readable linear fallback.

Keep scrolling native and reversible. No wheel/touch interception, scroll lock, mandatory snap, or timer-based chapter cycling. Sync indicators to the animation playhead, including scrub catch-up; avoid React state updates on every frame.

## 8. Integration and resilience

Reuse the existing shared Lenis instance and its GSAP ticker/ScrollTrigger bridge. Do not initialize another smoother or a second Lenis RAF loop inside either section. Preserve native touch behavior, anchor navigation, and focus handling.

Scope GSAP animations with useGSAP/gsap.context, use responsive matchMedia setups, and revert the matchMedia instance during cleanup. Clean up timelines, observers, pointer listeners, RAF callbacks, geometries, materials, textures, and renderer resources. Handle Strict Mode and resize without duplicate pins. Refresh measurements after fonts/assets settle and breakpoint changes, not every animation frame.

Keep hero text server-rendered and load the optional renderer behind a stable, reserved artwork area. Cap rendering resolution reasonably, around DPR 1.5 on desktop and 1 on mobile as starting values. Avoid unnecessary postprocessing. Pause live rendering outside view or when the document is hidden; do not invent measured FPS or performance scores.

Reduced motion: show the completed static hero, disable tilt/deformation/smoothing, and expose the four readable chapter headings and captions in normal document flow without a long pin. The no-JavaScript baseline must also expose meaningful hero and chapter content. Only activate overlapping panels after animation initialization succeeds.

Keep keyboard navigation, skip link, header/menu, Work anchor, contact CTA, and the next page sections working. Scope decorative clipping to the artwork/word viewport rather than hiding body overflow and masking layout bugs. Add no fictional clients, results, testimonials, or business services.

## 9. Implementation and verification

Work in this order within this task: implement the resting hero composition; finish optical motion; implement the full-width chapter stage and scroll timeline; verify responsive behavior and integration; then record the result.

Be economical with context: no repeated whole-repository reads, research detours, duplicate design proposals, or large log dumps. Work sequentially without spawning agents unless applicable repository instructions require them. Add only useful code comments. Do not stop after writing a plan/checkpoint.

Run the existing lint/type/build checks appropriate to the repository and fix failures caused by this change. Then run the site and inspect it in a browser when tooling permits. Verify at 1440×900, a shorter laptop viewport, and 390×844 mobile:
- The actual homepage renders the new lens scene and no old right-side artwork.
- Headline, logo, optical focus, material finish, and typography match the approved direction.
- Scrolling down changes all four chapters in the same place; scrolling back restores them.
- Title, caption, counter, and active indicator remain synchronized, including fast scrolling.
- Chapter labels cannot be clicked/tabbed as controls.
- The longest words, caption text, CTAs, pin release, header, Work anchor, and following sections have no clipping, overlap, or horizontal overflow.
- Reduced motion and renderer failure remain readable and complete.

Capture the hero and each settled chapter, plus the mobile composition, if browser tooling is available. Inspect the images and fix obvious mismatches before finishing. If browser access is unavailable, still complete code and static checks, clearly label visual/scroll verification as pending, and never claim screenshots or checks you did not perform.

Finally give a concise completion report: actual files changed, exact commands and results, screenshot locations or preview URL when available, the command/working directory needed to view the changes, and any remaining visual limitation. Update UPLOFT_IMPLEMENTATION_CHECKPOINT.md only after real implementation, distinguishing completed work from pending verification. The result I expect is the working Focus Reveal hero plus full-width kinetic chapters controlled by scrolling.

Official implementation references, only if an API/version detail needs checking:
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/resources/React/
- https://github.com/darkroomengineering/lenis
- https://threejs.org/docs/pages/MeshPhysicalMaterial.html
- https://threejs.org/docs/pages/LatheGeometry.html

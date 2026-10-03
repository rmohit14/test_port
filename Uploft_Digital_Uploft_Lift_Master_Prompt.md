# Uploft Digital — The Uploft Lift: Claude Implementation Master Prompt

You are the creative frontend engineer and technical artist working in my existing Uploft Digital repository. Implement this brief now, through actual component and asset changes. A plan, audit, checkpoint, or slight restyling is not the deliverable.

## 1. Authoritative replacement scope

I reject the current right-side hero artwork and the right-side artwork in the dark navy/blue “What We Lift” section. Remove both from the rendered website and build their replacements from scratch.

This supersedes previous DESIGN instructions to preserve or refine ElevationField, its contour frames/tunnel, and LiftVisual's existing icon system. General repository instructions still apply. Old checkpoints are progress records, not approval of those designs.

Do not reuse the rejected rounded rectangles, architectural contour field, pillars, central blue bar, small abstract icons, ascending bars, or growth-chart imagery in the new scenes. Do not merely recolour, enlarge, add a glow, or wrap them in a new component.

The selected concept comes from Uploft_Digital_Hero_Concept_Research.md: **The Uploft Lift**. If that file is present, read its recommendation and detailed scene/motion sections. This prompt includes the complete implementation direction, so its absence does not block work.

## 2. One chosen creative direction

Create a crafted, three-dimensional **cobalt U-shaped ribbon that lifts a miniature local business into an impressive website and phone experience**.

The scene must communicate a concrete idea immediately: a real business gains a stronger digital presence. Use ONE beautifully finished café concept for this release, related to the existing Chai & Chaat concept work. Do not build café/salon/store selectors or multiple business models.

Adapt the research's material-focused protagonist, physical-to-digital storytelling, and separate phone composition to our existing editorial website. Noomo informs material/lighting and narrative continuity; Igloo informs putting recognizable work inside the visual. Create original Uploft assets; do not copy their characters, scenes, code or proprietary media.

## 3. Preserve the established brand and working website

- Paper #faf7f1; ink/navy #14222a; electric blue #2e6beb; secondary paper #f1ebdf. Retain the existing accessible deep-blue token for small text. Do not import the research's proposed vermilion palette.
- Instrument Serif for editorial headings; DM Sans for body/UI. Preserve official PNG logos. The sculptural U is a storytelling object, not a replacement or extrusion of the official logo.
- Keep the hero headline: “Raise how your / brand is seen.”
- Keep its supporting copy: “Uploft Digital creates high-craft digital experiences and websites that elevate how a business looks, feels and communicates online.”
- Keep DIGITAL BRAND ELEVATION STUDIO · COIMBATORE, INDIA, Start a Project, View Work, and their existing destinations. Use a static “We lift PERCEPTION” micro-label rather than the current lengthy word cycle.
- Preserve header/menu behaviour, alternating portfolio rows, service rows, process, Studio principles, final CTA copy, contact details and footer. Preserve the completed marquee, portfolio and Copy email improvements.
- No public prices, invented results, clients, testimonials, awards, contact details or production domain. Keep concept work identified honestly.

## 4. Art-direct and construct the hero scene

Build a real Three.js scene with geometric depth, coherent perspective and lighting. The still composition must look finished before adding animation.

**Ribbon:** one continuous open-topped U, broad and sculptural, with a curved bottom, believable thickness, bevelled edges and a subtly asymmetric upward gesture. Use cobalt glazed enamel/satin resin: clear front/side separation, soft highlights and controlled reflections. It must remain recognizable at phone size. Do not approximate it with three disconnected boxes or a chunky tube.

**Business:** a restrained ivory architectural café maquette supported near the lower curve of the U. Include a considered frontage, warm inset window, door/frame, shallow striped awning and small sign. Give it refined proportions and material differences; it must read as a café rather than an anonymous cube or toy village.

**Digital outcome:** one slim landscape browser panel above and slightly behind the business, plus one smaller portrait phone offset lower-right. Use actual modelled frame thickness and modest three-quarter angles. The browser shows an excellent café composition: clear identity, warm chai imagery, editorial heading and a visible menu/enquiry action. The phone shows a separately composed mobile layout of the same concept. It must not be a squashed desktop screenshot.

Use repository imagery where suitable. Author screen textures locally with real typography, imagery, spacing and hierarchy—no empty rectangles, skeleton UI or illegible generated text. Do not carry unsupported claims such as “Mumbai's finest since 2018” or customer/product counts into the new concept screens. Label the art in HTML: “Independent café website concept.” Mock screen controls are display artwork; real visitor actions remain accessible HTML links/buttons outside the canvas.

Create the core models procedurally in the project: a shaped/bevelled extrusion or authored ribbon mesh, a small set of considered café meshes, and browser/phone geometry. Do not ask me for Blender files or buy/download a model. You may generate a local GLB if useful, but the deliverable must be self-contained.

Use soft studio key/fill lighting, a neutral reflection environment and a restrained shadow. On paper, keep warmth and clear silhouettes. In the navy section, use soft rim lighting so cobalt and ivory remain distinct. Use opaque materials by default; reserve physical clearcoat for the ribbon. Do not attempt an expensive refractive-glass world, physics simulation, particle cloud, bloom stack or sound system.

Desktop starting composition: approximately 45% message / 55% scene, adjusted to fit our actual grid. Give the artwork a substantial 500–620px visual stage where space allows. The U, business and browser must all read within the first screen without colliding with text or the viewport. Change hero-local proportions/width as needed; do not alter the global Container.

## 5. Signature animation and interaction

Start with a complete, attractive composition and an immediately available poster. Headline, body and CTAs stay visible independently of scene loading. Bypass the hero's generic pre-hidden reveal treatment locally; do not change unrelated reveals.

Once the live scene is ready, play ONE approximately 1.8-second flourish:

1. 0.00–0.35s: the ribbon turns slightly through its highlight and the business lifts gently.
2. 0.35–0.95s: a branded awning/sign strip peels upward, rotates and flattens into the browser's header treatment. Preserve its identity/colour so the physical-to-digital connection is evident.
3. 0.95–1.45s: a window/image detail travels into the website composition; the phone joins the arrangement.
4. 1.45–1.80s: everything settles into the carefully composed final tableau.

Use matching geometry/layers and transform interpolation for the transformation; cloth physics or a complex topology morph is unnecessary. The result must show a relationship between storefront and screen, rather than all objects bobbing upward together. Keep the rest of the website display recognizable throughout.

Afterward, rest. No endless float, auto-rotation or repeated introduction. Fine-pointer movement can reveal a few degrees of depth through a separate interaction group; keep copy fixed. No drag-to-orbit, scroll capture or camera travel across the whole page.

Provide a small HTML “Replay lift” button. Restart deterministically from defined poses; repeated clicks must not accumulate transforms or timelines. Pause offscreen/hidden-tab work. Reduced motion uses the finished still and no automatic flourish. Do not make visitors interact before seeing the outcome.

## 6. Replace the blue section with the same story in four poses

The target is src/components/sections/WhatWeLift.tsx, id="lift", currently using the dark navy background. Keep that chapter's established background, copy and editorial character. Replace its right-side diagrams entirely.

Reuse the SAME ribbon, café, browser, phone and material system in one substantial 3D stage, with four explicitly authored poses:

| Chapter | What the scene demonstrates |
| --- | --- |
| Perception | The complete business-to-digital tableau: confident proportions, coherent identity, beautiful presentation. |
| Clarity | The browser turns nearer to front; secondary objects recede and the page's heading, hierarchy and main offer become the focus. |
| Experience | The phone comes forward and the browser shifts back slightly, demonstrating the same considered design across screens. |
| Action | The composition directs attention to the concept's clear menu/enquiry action; a short ribbon accent/detail arrives at that destination. No rising bars or invented conversion results. |

Define shared named poses and interpolate position, rotation, scale and emphasis. Keep scene continuity; do not swap four unrelated models or icons.

Preserve ONE existing desktop pin and the existing end distance, STEPS * 62%. One master chapter progress/timeline must drive the 3D pose, text, counter and progress. Bridge it explicitly to scene rendering. Avoid independent timers, extra pins or React state updates every animation frame.

Replace the clipped vertical heading/caption reel with complete chapter panels. Use a short outgoing fade followed by an incoming fade and small movement. Keep each heading, sentence and counter together. No readable double titles, cropped letter fragments or stale state during fast/reverse scrolling. Check intermediate progress, not just the four resting labels.

## 7. Phone composition and fallbacks

At 390×844, keep navigation, headline, useful supporting copy and primary actions easy to reach. Use a portrait hero stage around 240–300px high as a starting point. Position the browser nearer to front, tighten the U/business/phone spread and remove unnecessary fragments. Allow natural flow below the fold rather than cramming everything into an unreadable first screen.

Create mobile camera/layout poses deliberately. Do not just scale the desktop camera down. Touch must retain normal page scrolling; Replay is a visible HTML control.

Mobile/tablet What We Lift remains four normal-flow chapters, each with a meaningful static render of its corresponding scene pose. Reduced motion follows the same stacked treatment. Do not mount four mobile canvases.

Produce optimized posters from the ACTUAL final scene: the hero and four navy chapter poses. Keep these as real project assets and show them for initial loading, reduced motion, unavailable WebGL and context loss. Preserve aspect ratio/layout space. A loading spinner, blank stage, broken image or old artwork is not a fallback.

## 8. Integration and performance

Keep the installed Next.js/React/TypeScript/Tailwind/GSAP/Lenis versions. Read AGENTS.md and relevant bundled Next.js guidance before changing APIs. Inspect existing packages first.

The genuine 3D direction explicitly authorizes adding three, a stable React-19-compatible @react-three/fiber release, and @types/three if absent. Current official guidance pairs Fiber 9 with React 19; do not install alpha Fiber 10 or upgrade React/Next to make this work. Add Drei only for a necessary feature; prefer a simple local studio environment such as RoomEnvironment/PMREM over remotely hosted HDR assets.

Isolate WebGL in a client-only, lazy-loaded scene wrapper; keep essential HTML/poster content available without it. Use the current Next.js client-boundary pattern for ssr:false imports.

Share geometry/material/pose code across hero and chapter. Keep scene controllers separate from HTML content. Use demand rendering and invalidate on GSAP/pose/pointer updates—mutating a mesh alone does not refresh a demand canvas. Schedule the initial frame correctly. Render while motion requires it and rest afterward.

Use sensible capped DPR, lower-cost mobile quality, modest geometry counts and appropriately sized screen textures. Only one scene should actively render at a time. Lazy-load the chapter near its viewport. Pause hidden/offscreen animation; clean up timelines, observers, listeners and owned GPU resources. Preserve the existing single Lenis/GSAP scroll driver.

Fix local percentage-column-plus-gap sizing using fractional tracks. Keep motion bounds inside the stage. Avoid hydration errors, unsafe type suppression and unrelated dependency cleanup. Do not invent an FPS, Lighthouse or Core Web Vitals result.

## 9. Efficient execution and proof of completion

Use one agent. This direction is selected: no fresh inspiration hunt or alternative design presentations. Inspect only project rules, package information and relevant files. Check the existing diff and preserve unrelated work.

Primary existing files: src/components/sections/Hero.tsx, src/components/motion/ElevationField.tsx, src/components/motion/LiftVisual.tsx, src/components/sections/WhatWeLift.tsx, src/app/globals.css, src/app/page.tsx and relevant motion helpers. Introduce a small dedicated 3D component folder if useful. Disconnect the old artwork imports first; remove obsolete artwork/CSS only after confirming no other usage. Ensure new scenes are actually mounted by the homepage.

Confirm the served checkout and exact preview URL. Capture before views if browser tooling is available, then build the still scene, the flourish, the chapter poses and the fallbacks. Inspect the rendered scene and refine camera, lighting, material and screen layout before declaring it finished.

Run the existing lint and production build. Inspect 390×844, 430×932, 768×1024, 1440×900 and 1920×1080. Verify first paint, settled hero, replay interruption, all four chapters, intermediate transitions, fast/reverse scroll, resize, touch, reduced motion, WebGL fallback, keyboard controls, anchors, clipping, overflow and console errors. Verify that rest/offscreen states stop ongoing rendering.

Capture hero screenshots on desktop/mobile and all four desktop chapter states; include a short motion capture if available. Compare before/after at matching positions. The new result must show the sculptural U, recognizable business, excellent browser and phone design, and physical-to-digital motion. Old contour artwork, generic primitive placeholders, unfinished textures or a screenshot-only substitute for the requested live desktop scene do not satisfy this brief. Shipped posters remain the intentional fallback.

If a tool or dependency is genuinely blocked, finish independent implementation and report the exact limitation. Do not claim unavailable screenshots, visual checks, posters or performance measurements. Do not silently substitute the old design.

Maintain one compact checkpoint with completed files, pending work and actual checks. Do not stop after writing it. Continue through implementation and verification without routine confirmation requests. No commits, pushes, deployment, reset or stash.

Finish with a concise handover: changed files/assets, actual checks, exact preview URL, screenshots/motion paths and any remaining concrete blocker.

## Technical references — consult only for a specific API question

- React Three Fiber compatibility: https://r3f.docs.pmnd.rs/getting-started/introduction
- Demand rendering and invalidation: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- Bevelled geometry: https://threejs.org/docs/pages/ExtrudeGeometry.html
- Local studio environment: https://threejs.org/docs/pages/RoomEnvironment.html
- Physical material: https://threejs.org/docs/pages/MeshPhysicalMaterial.html
- Next.js client-only lazy loading: https://nextjs.org/docs/app/guides/lazy-loading

Implement now. Completion means the replacement is visible and usable in the running website.

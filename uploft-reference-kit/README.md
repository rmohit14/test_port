# Uploft Digital — Claude visual kit

This kit fixes the design direction in images and demonstrates how the chapters change in one place as you scroll. The hero uses a finished optical asset with restrained presentation motion. The chapter words remain live typography.

## Use with Claude Code

1. Extract the ZIP into your project so the folder is `C:\UPLOFT\portfolio\uploft-reference-kit`.
2. Open `motion-reference.html` in a browser to see the hero and scroll through all four chapters. The prototype uses Google Fonts when online and a serif fallback when offline.
3. Start Claude Code in the project and paste:

```text
Read uploft-reference-kit/MASTER_PROMPT.md and implement it in this project.
Inspect the reference images and production artwork before coding, and read
motion-reference.html for the scroll behavior. Use the supplied optical asset
for the hero and live SVG text for the chapters. Complete the code changes and
available checks; a checkpoint or plan alone is not the result.
```

If Claude is continuing the failed attempt, this new master prompt supersedes conflicting earlier instructions about live Three.js glass, Sculptural Fold or newspaper chapters. There is no need to paste the earlier prompts again.

## File roles

| File | What Claude should do with it |
|---|---|
| `references/01-hero-desktop.png` | Match the hero's composition, scale, color and hierarchy. |
| `references/02-chapter-perception.png` | Match the first held chapter state. |
| `references/03-chapter-clarity.png` | Match the second held chapter state. |
| `references/04-chapter-experience.png` | Match the third held chapter state. |
| `references/05-chapter-action.png` | Match the final held chapter state. |
| `references/06-mobile-layout.png` | Follow its mobile hierarchy; the two panels are separate views, not a two-column phone layout. |
| `assets/uploft-focus-art.png` | Use as the production hero image, preserving transparency and the full silhouette. |
| `assets/uploft-logo-main-clean.png` | Use the official header wordmark. |
| `assets/uploft-icon-mark-clean.png` | Preserve the official icon geometry if needed elsewhere. |
| `motion-reference.html` | Open/read as a working scroll and typography reference. |
| `MASTER_PROMPT.md` | Follow as the implementation instructions. |

The six reference images are visual targets, not webpage content. Build actual navigation, headline, body text, buttons and chapter typography in code. Only the isolated optical artwork is intended to be embedded as a hero asset.

## What the prototype demonstrates

Scroll normally. Perception, Clarity, Experience and Action occupy the same sticky stage, in that order. The counter, caption and underline follow the current word. Scrolling upward reverses them. The bottom labels have no click behavior. Action holds before the document continues.

The prototype contains only the hero and chapter sequence. Its Start a Project link uses the studio email; its View Work position links to the demonstration's end because this kit has no project gallery. Claude must keep the existing website's real destinations and functional navigation. The prototype is a design/behavior reference, not a replacement Next.js application.

Normal portrait mobile keeps the same-place scroll sequence. Reduced motion and short viewports show readable chapters in normal flow. Essential content also remains present if the JavaScript or font enhancement fails.

## Locked visual direction

- Paper `#faf7f1`, navy `#14222a`, cobalt `#2e6beb`.
- Instrument Serif display typography; DM Sans UI and body.
- Ivory hero with large copy left and a complete blue optical lens right; mobile stacks the artwork below the copy.
- Full clear lens and exact Uploft icon, with a blurred larger mark behind and restrained floor caustic.
- Navy chapters where enormous ivory type, a thin cobalt echo and a gentle curve are the artwork.
- One scroll-driven stage, with passive progress labels.

The hero asset contains rendered glass and lighting. Moving the image provides a 2.5D effect; it does not provide live refraction or a lens that focuses new background content. This deliberate implementation choice preserves the supplied finish and avoids another primitive-mesh approximation.

## Reference provenance

The optical art and six mockups were generated for this kit using the approved Uploft direction and the supplied official brand assets. The chapter variants preserve a common stage and change only the word, pose, counter, caption and active label. The mobile board was generated from the desktop hero, chapter and isolated optical artwork. Generated typography is approximate; production must use the real font files and responsive glyph measurements.

The working prototype is an independently authored HTML/SVG example. It has not modified the uploaded Next.js source. Its asset references, JavaScript syntax and playhead behavior were checked. Browser rendering was unavailable here, so its rendered layout and the final Next.js page need the browser checks specified in the master prompt.

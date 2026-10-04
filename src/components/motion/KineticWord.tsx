import { forwardRef } from "react";

type Props = {
  word: string;
  pathId: string;
};

// Live SVG typography: one curved path shared by the ivory fill and the
// cobalt echo, so both read the exact same text, font size and baseline —
// the echo is a pure positional offset, not a second independently-laid-out
// copy. (The previous version duplicated the word as per-character spans
// and applied wave phase by the combined index of outline+fill spans,
// which could desync the two; sharing one <textPath> removes that class of
// bug entirely.) Purely decorative — the real semantic word lives in a
// visually-hidden heading the parent renders alongside this.
const KineticWord = forwardRef<SVGSVGElement, Props>(function KineticWord({ word, pathId }, ref) {
  return (
    <svg ref={ref} aria-hidden="true" className="block size-full overflow-visible font-serif">
      <defs>
        <path id={pathId} />
      </defs>
      <text
        className="kinetic-word-echo fill-none stroke-accent/85"
        strokeWidth={1}
        textAnchor="middle"
        transform="translate(3,-3)"
      >
        <textPath href={`#${pathId}`} startOffset="50%">
          {word}
        </textPath>
      </text>
      <text className="kinetic-word-fill fill-paper" textAnchor="middle">
        <textPath href={`#${pathId}`} startOffset="50%">
          {word}
        </textPath>
      </text>
    </svg>
  );
});

export default KineticWord;

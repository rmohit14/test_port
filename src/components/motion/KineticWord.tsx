// A reusable kinetic word: an ivory fill and a cobalt outline echo, built
// from the same characters so they share identical metrics. The wave
// deformation (per-character translateY) is applied externally, directly
// to `[data-kinetic-char]` spans via GSAP — this component only renders
// the shared structure. Purely decorative: the real semantic word lives in
// a separate visually-hidden heading, so this whole thing is aria-hidden.
export default function KineticWord({ word, className = "" }: { word: string; className?: string }) {
  const chars = Array.from(word);

  return (
    <span aria-hidden="true" className={`relative inline-block ${className}`}>
      <span
        data-kinetic-echo
        className="pointer-events-none absolute inset-0 translate-x-[3px] translate-y-[3px] text-transparent [-webkit-text-stroke:1.5px_var(--color-accent)] opacity-60"
      >
        {chars.map((c, i) => (
          <span key={i} data-kinetic-char data-kinetic-group="echo" className="inline-block">
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
      <span data-kinetic-fill className="relative text-paper">
        {chars.map((c, i) => (
          <span key={i} data-kinetic-char data-kinetic-group="fill" className="inline-block">
            {c === " " ? " " : c}
          </span>
        ))}
      </span>
    </span>
  );
}

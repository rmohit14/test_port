"use client";

import { useState } from "react";
import { CAPABILITIES } from "@/lib/content";

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {CAPABILITIES.map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="whitespace-nowrap font-serif text-[clamp(1.4rem,3.4vw,2.25rem)] italic text-ink/80">
            {item}
          </span>
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const label = CAPABILITIES.join(" — ");
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label={`Capabilities: ${label}`}
      className="relative overflow-hidden border-y border-ink/10 bg-paper py-6 sm:py-7"
    >
      <div
        className="marquee-track flex w-max"
        data-paused={paused || undefined}
        aria-hidden="true"
      >
        <Track />
        <Track />
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ink/20 bg-paper px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-ink/70 shadow-sm transition-colors hover:border-ink/40 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-6"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </section>
  );
}

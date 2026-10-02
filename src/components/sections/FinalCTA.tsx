"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import { MAILTO, SITE } from "@/lib/constants";

export default function FinalCTA() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 2500);
  }

  return (
    <section id="contact" className="relative overflow-clip pb-0 pt-28 sm:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft blur-3xl"
      />

      <Container className="flex flex-col items-center pb-14 text-center sm:pb-16">
        <Reveal>
          <Tag className="text-ink/70">Start a Project</Tag>
        </Reveal>

        <LineReveal
          as="h2"
          lines={["Let's raise how your", "brand shows up online."]}
          className="mt-6 font-serif text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[1.01] text-ink"
        />

        <Reveal delay={0.15} className="mt-6 max-w-lg">
          <p className="text-[1.05rem] leading-relaxed text-ink/70 sm:text-lg">
            Tell us what the business does and what you want visitors to do
            next. We&rsquo;ll reply with what a proper scope looks like.
          </p>
        </Reveal>

        <Reveal delay={0.22} className="mt-10">
          <a
            href={MAILTO.startProject}
            className="inline-block break-all font-serif text-[clamp(1.5rem,5.5vw,3rem)] text-ink underline decoration-accent/40 decoration-2 underline-offset-8 transition-colors duration-300 hover:text-accent-deep hover:decoration-accent"
          >
            {SITE.email}
          </a>
        </Reveal>

        <Reveal delay={0.26} className="mt-3 flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={copyEmail}
            className="text-sm font-medium text-ink/55 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-accent-deep hover:decoration-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Copy email
          </button>
          <span role="status" aria-live="polite" className="text-sm text-ink/55">
            {copyState === "copied" && "Copied to clipboard."}
            {copyState === "error" && "Couldn't copy — the email address is above."}
          </span>
        </Reveal>

        <Reveal delay={0.3} className="mt-9">
          <Button href={SITE.instagramUrl} variant="secondary">
            Follow on Instagram
          </Button>
        </Reveal>

        <Reveal delay={0.35} className="mt-16 sm:mt-20">
          <Image
            src="/images/uploft-logo-footer-clean.png"
            alt={SITE.name}
            width={685}
            height={485}
            className="h-auto w-[140px] opacity-90 sm:w-[160px] lg:w-[200px]"
          />
        </Reveal>
      </Container>

      {/* Confident, direct transition into the footer — a single hairline,
          not a large fade. */}
      <div aria-hidden="true" className="h-px w-full bg-ink/10" />
    </section>
  );
}

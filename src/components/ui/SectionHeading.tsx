import Tag from "@/components/ui/Tag";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  lines: string[];
  description?: string;
  tone?: "light" | "dark";
  className?: string;
  headingClassName?: string;
};

export default function SectionHeading({
  eyebrow,
  lines,
  description,
  tone = "light",
  className = "",
  headingClassName = "",
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-paper/65" : "text-ink/65";
  const eyebrowColor = tone === "dark" ? "text-paper/70" : "text-ink/70";

  return (
    <div className={className}>
      <Reveal>
        <Tag className={eyebrowColor}>{eyebrow}</Tag>
      </Reveal>
      <LineReveal
        as="h2"
        lines={lines}
        className={`mt-5 max-w-3xl font-serif text-[clamp(2.25rem,5.4vw,4rem)] leading-[1.03] ${
          tone === "dark" ? "text-paper" : "text-ink"
        } ${headingClassName}`}
      />
      {description && (
        <Reveal delay={0.1} className="mt-6 max-w-xl">
          <p className={`text-[1.05rem] leading-relaxed sm:text-lg ${muted}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

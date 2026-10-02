import Image from "next/image";
import Container from "@/components/ui/Container";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import LiftRule from "@/components/motion/LiftRule";
import LineReveal from "@/components/motion/LineReveal";
import Reveal from "@/components/motion/Reveal";
import RevealImage from "@/components/motion/RevealImage";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/lib/content";

function ProjectRow({ project, reverse }: { project: PortfolioProject; reverse: boolean }) {
  return (
    <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <RevealImage className="relative aspect-[4/3] w-full overflow-clip rounded-[1.25rem] bg-paper-dim sm:aspect-[16/10]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className={`object-cover ${
              project.slug === "uploft-boutique" ? "object-left-top" : "object-top"
            }`}
          />
        </RevealImage>
      </div>

      <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <Reveal className="flex flex-wrap items-center gap-3">
          <span aria-hidden="true" className="font-serif text-3xl leading-none text-ink/25">
            {project.index}
          </span>
          <Tag className="border-accent/40 bg-accent-soft text-accent-deep">
            Concept Build
          </Tag>
          <span className="text-sm font-medium uppercase tracking-[0.08em] text-ink/55">
            {project.category}
          </span>
        </Reveal>

        <LineReveal
          as="h3"
          lines={[project.name]}
          className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink"
        />

        <LiftRule className="mt-5 max-w-[5rem]" />

        <Reveal delay={0.1} className="mt-6">
          <p className="max-w-md text-[1.05rem] leading-relaxed text-ink/70">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} className="text-ink/70">
              {tag}
            </Tag>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-7">
          <Button href={project.liveUrl} variant="secondary">
            View Live Site
          </Button>
        </Reveal>
      </div>
    </article>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          lines={["Two concept builds,", "one shared standard."]}
          description="Independent concept work exploring how thoughtful digital design changes the way a business is perceived."
        />

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24 lg:gap-32">
          {PORTFOLIO_PROJECTS.map((project, i) => (
            <ProjectRow key={project.slug} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

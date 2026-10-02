import type { ReactNode } from "react";
import MagneticWrap from "./MagneticWrap";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  magnetic?: boolean;
  showArrow?: boolean;
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-ink text-paper hover:bg-accent-deep hover:text-paper border border-ink hover:border-accent-deep",
  secondary:
    "bg-transparent text-ink border border-ink/25 hover:border-ink hover:bg-ink hover:text-paper",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  magnetic = true,
  showArrow = true,
}: ButtonProps) {
  const isExternal = href.startsWith("http");
  const isMailto = href.startsWith("mailto:");

  const content = (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300 ease-out min-h-12 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          className="size-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path
            d="M4 12L12 4M12 4H5.5M12 4V10.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {isMailto && <span className="sr-only">(opens your email app)</span>}
    </a>
  );

  if (!magnetic) return content;

  return <MagneticWrap className="inline-block">{content}</MagneticWrap>;
}

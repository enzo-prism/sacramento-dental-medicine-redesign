import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

type SectionLabelProps = {
  eyebrow: string;
  accent?: "teal" | "coral" | "gold" | "sage" | "ink";
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  delay?: number;
};

const accentMap: Record<NonNullable<SectionLabelProps["accent"]>, string> = {
  teal: "accent-teal",
  coral: "accent-coral",
  gold: "accent-gold",
  sage: "accent-sage",
  ink: "text-ink",
};

export function SectionLabel({
  eyebrow,
  accent = "teal",
  title,
  intro,
  align = "left",
  className = "",
  delay = 0,
}: SectionLabelProps) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start";

  return (
    <ScrollReveal
      className={`flex max-w-3xl flex-col ${alignment} gap-5 ${className}`}
      delay={delay}
      variant="fade"
    >
      <span className={`eyebrow ${accentMap[accent]}`}>{eyebrow}</span>
      <h2 className="font-display text-balance text-[2rem] font-medium leading-[1.04] tracking-[-0.02em] text-ink sm:text-4xl md:text-[2.9rem]">
        {title}
      </h2>
      {intro ? (
        <p className="max-w-2xl text-pretty text-base leading-7 text-ink-soft md:text-lg md:leading-8">
          {intro}
        </p>
      ) : null}
    </ScrollReveal>
  );
}

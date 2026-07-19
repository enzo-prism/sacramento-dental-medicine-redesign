import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

type SectionLabelProps = {
  eyebrow: string;
  accent?: "brand" | "slate" | "ember" | "ink";
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  delay?: number;
};

const accentMap: Record<NonNullable<SectionLabelProps["accent"]>, string> = {
  brand: "accent-brand",
  slate: "accent-slate",
  ember: "accent-ember",
  ink: "accent-ink",
};

export function SectionLabel({
  eyebrow,
  accent = "brand",
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
      <h2 className="font-display text-balance text-[clamp(2rem,4.2vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-ink">
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

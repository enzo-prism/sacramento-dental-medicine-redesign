import { Dot } from "lucide-react";

type MarqueeProps = {
  items: string[];
  className?: string;
  tone?: "light" | "dark";
};

export function Marquee({ items, className = "", tone = "dark" }: MarqueeProps) {
  const sequence = [...items, ...items];
  const palette =
    tone === "dark"
      ? "text-white/70 [&_span]:text-white/30"
      : "text-ink-soft [&_span]:text-ink-faint/40";

  return (
    <div className={`marquee ${palette} ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {sequence.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-4 whitespace-nowrap px-6 text-sm font-medium tracking-wide uppercase"
          >
            {item}
            <Dot className="size-4 opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

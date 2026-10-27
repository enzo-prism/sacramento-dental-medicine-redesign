import Link from "next/link";

export type FaqLink = {
  href: string;
  label: string;
};

export function FaqAnswer({
  answer,
  links,
}: {
  answer: string;
  links?: FaqLink[];
}) {
  if (!links?.length) {
    return <p className="mt-3 text-sm leading-7 text-ink-soft">{answer}</p>;
  }

  const hrefByLabel = new Map(links.map((link) => [link.label, link.href]));
  const pattern = new RegExp(
    `(${links.map((link) => link.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  );
  const parts = answer.split(pattern);

  return (
    <p className="mt-3 text-sm leading-7 text-ink-soft">
      {parts.map((part, index) => {
        const href = hrefByLabel.get(part);
        if (!href) {
          return <span key={`${part}-${index}`}>{part}</span>;
        }
        return (
          <Link key={`${href}-${index}`} href={href} className="underline underline-offset-4">
            {part}
          </Link>
        );
      })}
    </p>
  );
}

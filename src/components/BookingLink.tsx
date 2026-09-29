import type { AnchorHTMLAttributes } from "react";
import { contact } from "@/data/site";

type BookingLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
>;

/** Practice Jarvis scheduler. Opens in a new tab; Jarvis blocks iframe embedding. */
export function BookingLink({ children, ...props }: BookingLinkProps) {
  return (
    <a
      href={contact.bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

export function isExternalHref(href: string) {
  return href.startsWith("https://") || href.startsWith("http://");
}

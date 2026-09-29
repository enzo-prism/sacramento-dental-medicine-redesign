"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { contact } from "@/data/site";
import {
  type BookOnlineLocation,
  trackBookOnlineClick,
} from "@/lib/booking-analytics";

type BookingLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
> & {
  location: BookOnlineLocation;
};

/** Practice Jarvis scheduler. Opens in a new tab; Jarvis blocks iframe embedding. */
export function BookingLink({
  children,
  location,
  onClick,
  ...props
}: BookingLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackBookOnlineClick(location);
    onClick?.(event);
  }

  return (
    <a
      {...props}
      href={contact.bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

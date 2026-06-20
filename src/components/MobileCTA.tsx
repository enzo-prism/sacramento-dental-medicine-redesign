import { CalendarDays, Phone } from "lucide-react";
import { contact } from "@/data/site";

export function MobileCTA() {
  return (
    <div className="mobile-cta lg:hidden">
      <a href={contact.phoneHref} className="mobile-cta-secondary">
        <Phone className="size-4" />
        Call
      </a>
      <a href={contact.bookingHref} className="mobile-cta-primary">
        <CalendarDays className="size-4" />
        Book online
      </a>
    </div>
  );
}

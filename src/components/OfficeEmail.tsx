import { contact } from "@/data/site";

/**
 * The office address is one long unbreakable word, so narrow columns clip it.
 * Prefer wrapping right after the "@", and only break mid-word as a last resort.
 */
export function OfficeEmail() {
  const [local, domain] = contact.email.split("@");
  return (
    <span className="min-w-0 break-words">
      {local}@<wbr />
      {domain}
    </span>
  );
}

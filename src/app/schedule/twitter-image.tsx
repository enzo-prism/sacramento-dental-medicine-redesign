import { createScheduleSocialImage, socialImageSize } from "@/lib/social-image";

export const alt =
  "Schedule a visit with Sacramento Dental Medicine in Antelope, California.";
export const size = socialImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return createScheduleSocialImage();
}

import {
  createHomeSocialImage,
  socialImageSize,
} from "@/lib/social-image";
import { seo } from "@/data/site";

export const alt = seo.ogImageAlt;
export const size = socialImageSize;
export const contentType = "image/png";

export default function Image() {
  return createHomeSocialImage();
}

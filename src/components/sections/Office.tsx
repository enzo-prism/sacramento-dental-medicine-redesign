import Image from "next/image";
import { MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/SectionLabel";
import { contact, officePhotos } from "@/data/site";

export function Office() {
  const featured = officePhotos.slice(0, 2);
  const rest = officePhotos.slice(2);

  return (
    <section id="office" className="section bg-canvas" aria-label="The office">
      <div className="container-x">
        <SectionLabel
          eyebrow="The office"
          title={
            <>
              This is the office{" "}
              <span className="text-brand-deep">on Elverta Road.</span>
            </>
          }
          intro={`Reception, waiting, and treatment rooms at ${contact.addressLine1} in Antelope.`}
        />

        <div className="mt-12 grid gap-3 md:grid-cols-2 md:gap-4">
          {featured.map((photo, index) => (
            <ScrollReveal
              key={photo.src}
              delay={index * 60}
              variant="fade"
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 md:mt-4 md:grid-cols-3 md:gap-4">
          {rest.map((photo, index) => (
            <ScrollReveal
              key={photo.src}
              delay={Math.min(index * 50, 200)}
              variant="fade"
              className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 28vw, 50vw"
                className="object-cover"
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={80} className="mt-8">
          <a href={contact.mapsHref} className="btn-text">
            <MapPin className="size-4" aria-hidden="true" />
            Get directions
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { contact, structuredData } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

export const practiceId = structuredData["@id"];
const websiteId = `${siteUrl}/#website`;

// Every route refers to one practice. Its image is the actual office exterior.
export const practiceGraph = {
  "@context": "https://schema.org",
  "@graph": [
    structuredData,
    {
      "@type": "WebSite", "@id": websiteId, url: siteUrl,
      name: contact.practiceName, inLanguage: "en-US",
      publisher: { "@id": practiceId },
    },
  ],
};

export function pageGraph(
  path: string,
  name: string,
  entities: object[] = [],
  type = "WebPage",
  mainEntityId?: string,
) {
  const url = path === "/" ? siteUrl : `${siteUrl}${path}`;
  const isService = entities.some((entity) => "@type" in entity && entity["@type"] === "Service");
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    ...(isService ? [{ "@type": "ListItem", position: 2, name: "Dental services", item: `${siteUrl}/our-services` }] : []),
    ...(path !== "/" ? [{ "@type": "ListItem", position: isService ? 3 : 2, name, item: url }] : []),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type, "@id": `${url}#webpage`, url, name, inLanguage: "en-US",
        isPartOf: { "@id": websiteId }, about: { "@id": practiceId },
        ...(path !== "/" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
        ...(mainEntityId || isService ? { mainEntity: { "@id": mainEntityId ?? `${url}#service` } } : {}),
      },
      ...(path !== "/" ? [{ "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: crumbs }] : []),
      ...entities,
    ],
  };
}

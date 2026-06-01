import type { Metadata } from "next";

const siteName = "AEM Simplified";
const siteDescription = "Learn Adobe Experience Manager the practical way — explanations from real enterprise projects, not official documentation.";

export function createMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    openGraph: {
      title: siteName,
      description: siteDescription,
      type: "website",
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
    ...overrides,
  };
}

export const topicMetadata: Record<string, Metadata> = {
  components: {
    title: "Components",
    description: "Understand AEM Components — the building blocks of every AEM page. Learn about component structure, creation, inheritance, and real-world usage patterns.",
  },
  templates: {
    title: "Templates",
    description: "AEM Templates explained simply. Understand static vs editable templates, template structure, and when to use each in real AEM projects.",
  },
  "editable-templates": {
    title: "Editable Templates",
    description: "Master AEM Editable Templates — the modern way to build pages. Learn template types, policies, and how they work in enterprise projects.",
  },
  "sling-models": {
    title: "Sling Models",
    description: "Learn Sling Models in AEM — how to map JCR resources to Java objects, use annotations, and write clean backend code.",
  },
  osgi: {
    title: "OSGi",
    description: "OSGi in AEM explained simply. Understand bundles, services, components, and how OSGi powers the AEM module system.",
  },
  htl: {
    title: "HTL (Sightly)",
    description: "Learn HTL (HTML Template Language, formerly Sightly) — AEM's templating language. Understand syntax, expressions, blocks, and best practices.",
  },
  dispatcher: {
    title: "Dispatcher",
    description: "AEM Dispatcher explained practically. Understand caching, flushing, security filtering, and dispatcher configuration for production AEM projects.",
  },
  "content-fragments": {
    title: "Content Fragments",
    description: "Content Fragments in AEM — structured content that can be reused across channels. Learn creation, modeling, and headless delivery.",
  },
  "experience-fragments": {
    title: "Experience Fragments",
    description: "Experience Fragments in AEM — reusable page sections that can be shared across sites and channels. Learn creation, variations, and real-world use cases.",
  },
  "aem-cloud-service": {
    title: "AEM Cloud Service",
    description: "AEM as a Cloud Service (AEMaaCS) explained. Understand cloud-native architecture, deployment pipelines, differences from on-premise, and migration.",
  },
};

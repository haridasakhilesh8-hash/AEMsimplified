import type { TopicMeta, TopicCategory } from "@/types";

export const categories: TopicCategory[] = [
  {
    id: "fundamentals",
    title: "AEM Fundamentals",
    topics: [
      { slug: "osgi", title: "OSGi", description: "Understanding OSGi in AEM", category: { id: "fundamentals", title: "AEM Fundamentals", topics: [] }, order: 1, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["osgi", "fundamentals"] },
      { slug: "sling-models", title: "Sling Models", description: "Sling Models in AEM", category: { id: "fundamentals", title: "AEM Fundamentals", topics: [] }, order: 2, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["sling", "models"] },
    ],
  },
  {
    id: "development",
    title: "Development",
    topics: [
      { slug: "components", title: "Components", description: "AEM Components explained", category: { id: "development", title: "Development", topics: [] }, order: 1, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["components", "aem"] },
      { slug: "templates", title: "Templates", description: "AEM Templates", category: { id: "development", title: "Development", topics: [] }, order: 2, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["templates", "aem"] },
      { slug: "editable-templates", title: "Editable Templates", description: "Editable Templates in AEM", category: { id: "development", title: "Development", topics: [] }, order: 3, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["templates", "editable"] },
      { slug: "htl", title: "HTL", description: "HTL (Sightly) templating", category: { id: "development", title: "Development", topics: [] }, order: 4, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["htl", "sightly"] },
    ],
  },
  {
    id: "content-management",
    title: "Content Management",
    topics: [
      { slug: "content-fragments", title: "Content Fragments", description: "Structured content management", category: { id: "content-management", title: "Content Management", topics: [] }, order: 1, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["content", "fragments"] },
      { slug: "experience-fragments", title: "Experience Fragments", description: "Reusable page sections", category: { id: "content-management", title: "Content Management", topics: [] }, order: 2, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["experience", "fragments"] },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    topics: [
      { slug: "dispatcher", title: "Dispatcher", description: "Caching and security layer", category: { id: "advanced", title: "Advanced", topics: [] }, order: 1, version: "AEM 6.5+", lastReviewed: "2026-06-01", tags: ["dispatcher", "caching"] },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    topics: [
      { slug: "aem-cloud-service", title: "AEM Cloud Service", description: "Cloud-native AEM", category: { id: "cloud", title: "Cloud", topics: [] }, order: 1, version: "AEM CS", lastReviewed: "2026-06-01", tags: ["cloud", "aemaacs"] },
    ],
  },
];

export function getAllTopics(): TopicMeta[] {
  return categories.flatMap((cat) => cat.topics);
}

export function getTopicMeta(slug: string): TopicMeta | undefined {
  for (const cat of categories) {
    const topic = cat.topics.find((t) => t.slug === slug);
    if (topic) {
      return {
        ...topic,
        category: { id: cat.id, title: cat.title, topics: cat.topics },
      };
    }
  }
  return undefined;
}

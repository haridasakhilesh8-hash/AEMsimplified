import type { MetadataRoute } from "next";
import { categories } from "@/lib/topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aem-simplified.vercel.app";

  const topicEntries = categories.flatMap((cat) =>
    cat.topics.map((topic) => ({
      url: `${baseUrl}/topics/${topic.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...topicEntries,
  ];
}

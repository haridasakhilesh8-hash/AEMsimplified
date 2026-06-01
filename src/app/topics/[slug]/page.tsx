import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { TopicContent } from "@/components/TopicContent";
import { categories } from "@/lib/topics";
import { topicMetadata } from "@/lib/metadata";
import type { TopicMeta } from "@/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  for (const cat of categories) {
    for (const topic of cat.topics) {
      slugs.push({ slug: topic.slug });
    }
  }
  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return topicMetadata[slug] || {};
}

function readContentFile(slug: string): string | null {
  try {
    const filePath = path.join(process.cwd(), "src", "content", `${slug}.md`);
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function findTopicMeta(slug: string): (TopicMeta & { categoryTitle: string }) | null {
  for (const cat of categories) {
    for (const topic of cat.topics) {
      if (topic.slug === slug) {
        return {
          ...topic,
          categoryTitle: cat.title,
        };
      }
    }
  }
  return null;
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = findTopicMeta(slug);
  if (!meta) notFound();

  const raw = readContentFile(slug);
  if (!raw) notFound();

  const { content } = matter(raw);

  return (
    <TopicContent
      topic={{
        meta: {
          slug: meta.slug,
          title: meta.title,
          description: meta.description,
          category: { id: slug, title: meta.categoryTitle, topics: [] },
          order: meta.order,
          version: meta.version,
          lastReviewed: meta.lastReviewed,
          tags: meta.tags,
        },
        content,
      }}
    />
  );
}

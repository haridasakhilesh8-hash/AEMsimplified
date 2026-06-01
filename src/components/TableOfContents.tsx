"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/types";

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse sections from markdown headings
    const lines = content.split("\n");
    const parsed: Section[] = [];
    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const title = match[2];
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        parsed.push({ id, title, level });
      }
    }
    setSections(parsed);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <aside className="w-56 flex-shrink-0 hidden xl:block">
      <div className="sticky top-20">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] mb-3">
          On This Page
        </div>
        <nav className="space-y-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`block text-sm py-1 transition-colors duration-150 ${
                section.level === 3 ? "pl-4" : ""
              } ${
                activeId === section.id
                  ? "text-[var(--color-primary)] font-medium"
                  : "text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-dark)]"
              }`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

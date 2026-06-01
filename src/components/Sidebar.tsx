"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/topics";

export function Sidebar() {
  const pathname = usePathname();
  const [expandedCats, setExpandedCats] = useState<Set<string>>(() => {
    // Auto-expand the category of the current topic
    for (const cat of categories) {
      for (const topic of cat.topics) {
        if (pathname === `/topics/${topic.slug}`) {
          return new Set([cat.id]);
        }
      }
    }
    return new Set(["fundamentals", "development"]); // default expand first two
  });

  const toggleCat = (id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <nav className="w-64 flex-shrink-0 hidden lg:block h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] dark:border-[var(--color-border-dark)]">
      <div className="py-4 px-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] mb-3 px-3">
          Topics
        </div>
        {categories.map((cat) => (
          <div key={cat.id} className="mb-1">
            <button
              onClick={() => toggleCat(cat.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)] rounded-lg hover:bg-[var(--color-surface-alt)] dark:hover:bg-[var(--color-surface-dark-alt)] transition-colors cursor-pointer"
            >
              <span>{cat.title}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedCats.has(cat.id) ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {expandedCats.has(cat.id) && (
              <div className="ml-2 mt-0.5 space-y-0.5 animate-fade-in">
                {cat.topics.map((topic) => {
                  const isActive = pathname === `/topics/${topic.slug}`;
                  return (
                    <Link
                      key={topic.slug}
                      href={`/topics/${topic.slug}`}
                      className={`sidebar-link block px-3 py-1.5 text-sm rounded-lg ${
                        isActive
                          ? "active"
                          : "text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)]"
                      }`}
                    >
                      {topic.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

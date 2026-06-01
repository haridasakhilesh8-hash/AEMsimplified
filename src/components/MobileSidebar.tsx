"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories } from "@/lib/topics";

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(["fundamentals", "development"]));

  useEffect(() => {
    const handler = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar-mobile", handler);
    return () => window.removeEventListener("toggle-sidebar-mobile", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleCat = (id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setOpen(false)}
      />
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border-r border-[var(--color-border)] dark:border-[var(--color-border-dark)] overflow-y-auto animate-fade-in lg:hidden">
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            AEM Simplified
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--color-surface-alt)] dark:hover:bg-[var(--color-surface-dark-alt)] cursor-pointer"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-3">
          {categories.map((cat) => (
            <div key={cat.id} className="mb-1">
              <button
                onClick={() => toggleCat(cat.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-[var(--color-surface-alt)] dark:hover:bg-[var(--color-surface-dark-alt)] transition-colors cursor-pointer"
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
                <div className="ml-2 mt-0.5 space-y-0.5">
                  {cat.topics.map((topic) => {
                    const isActive = pathname === `/topics/${topic.slug}`;
                    return (
                      <Link
                        key={topic.slug}
                        href={`/topics/${topic.slug}`}
                        className={`block px-3 py-1.5 text-sm rounded-lg ${
                          isActive
                            ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
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
      </div>
    </>
  );
}

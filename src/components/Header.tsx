"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";

export function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setSidebarOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm dark:bg-[var(--color-surface-dark)]/95 dark:border-[var(--color-border-dark)]">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const event = new CustomEvent("toggle-sidebar-mobile");
              window.dispatchEvent(event);
            }}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors dark:border-[var(--color-border-dark)] dark:hover:bg-[var(--color-surface-dark-alt)] cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="text-lg font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)] hidden sm:block">
              AEM Simplified
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

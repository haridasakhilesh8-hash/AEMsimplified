"use client";

import Link from "next/link";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { FAQAccordion } from "./FAQAccordion";
import { TableOfContents } from "./TableOfContents";
import { parseFAQ } from "@/lib/faq";
import type { TopicContent as TopicContentType } from "@/types";

interface TopicContentProps {
  topic: TopicContentType;
}

export function TopicContent({ topic }: TopicContentProps) {
  const { meta, content } = topic;
  const { beforeFaq, faqItems, afterFaq } = parseFAQ(content);

  return (
    <div className="flex gap-8">
      <article className="flex-1 min-w-0 max-w-3xl py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] mb-4">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)]">
            {meta.title}
          </span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)] mb-3 tracking-tight">
          {meta.title}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] mb-6">
          {meta.description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-alt)] dark:bg-[var(--color-surface-dark-alt)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {meta.version}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-alt)] dark:bg-[var(--color-surface-dark-alt)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 018 0z" />
            </svg>
            Last reviewed: {meta.lastReviewed}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-alt)] dark:bg-[var(--color-surface-dark-alt)] text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
            {meta.category.title}
          </span>
        </div>

        {/* Main content before FAQ */}
        <MarkdownRenderer content={beforeFaq} />

        {/* FAQ Accordion */}
        {faqItems.length > 0 && (
          <section className="mt-12 mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)] mb-6 pb-2 border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={faqItems} />
          </section>
        )}

        {/* Content after FAQ */}
        {afterFaq && <MarkdownRenderer content={afterFaq} />}

        {/* Navigation footer */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all topics
          </Link>
        </div>
      </article>

      {/* Right sidebar - Table of Contents */}
      <TableOfContents content={content} />
    </div>
  );
}

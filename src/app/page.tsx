import Link from "next/link";
import { categories } from "@/lib/topics";

export default function HomePage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Hero */}
      <section className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)] tracking-tight mb-4">
          AEM Simplified
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] max-w-2xl leading-relaxed">
          Learn Adobe Experience Manager the practical way. Real explanations
          from enterprise projects — not official documentation rewritten.
        </p>
      </section>

      {/* Categories */}
      <div className="space-y-8">
        {categories.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)] mb-4">
              {cat.title}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {cat.topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group block p-5 rounded-xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition-colors mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] line-clamp-2">
                    {topic.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <footer className="mt-16 pt-8 border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
        <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] text-center">
          Built for developers who want to understand AEM deeply. No fluff. Just practical knowledge.
        </p>
      </footer>
    </div>
  );
}

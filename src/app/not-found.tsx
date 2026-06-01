import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-alt)] dark:bg-[var(--color-surface-dark-alt)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] flex items-center justify-center mb-6">
        <span className="text-3xl font-bold text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)]">
          404
        </span>
      </div>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-dark)] mb-2">
        Page not found
      </h1>
      <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-dark-secondary)] mb-8 text-center max-w-md">
        The topic or page you&apos;re looking for doesn&apos;t exist. It might
        have been moved or the URL might be incorrect.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to home
      </Link>
    </div>
  );
}

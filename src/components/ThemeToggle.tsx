import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: 'var(--color-bg-sidebar)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)',
        borderRadius: '8px',
        padding: '6px 10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.8rem',
        fontWeight: 500,
        transition: 'all 0.2s',
      }}
    >
      {theme === 'dark' ? (
        <>
          <Sun size={15} />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon size={15} />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}

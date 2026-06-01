import { Menu, X, BookOpen } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

interface HeaderProps {
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export default function Header({ theme, onThemeToggle, sidebarOpen, onSidebarToggle }: HeaderProps) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        background: 'var(--color-bg-primary)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '0.75rem',
        zIndex: 50,
      }}
    >
      {/* Mobile menu toggle */}
      <button
        onClick={onSidebarToggle}
        aria-label="Toggle navigation"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '6px',
        }}
        className="mobile-menu-btn"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          flex: 1,
        }}
      >
        <div
          style={{
            width: '30px',
            height: '30px',
            background: 'linear-gradient(135deg, #e8520a, #ff8c55)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BookOpen size={16} color="white" />
        </div>
        <div>
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            AEM{' '}
            <span style={{ color: 'var(--color-accent)' }}>Simplified</span>
          </span>
        </div>
      </a>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div className="header-search">
          <SearchBar />
        </div>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .header-search { display: none; }
        }
      `}</style>
    </header>
  );
}

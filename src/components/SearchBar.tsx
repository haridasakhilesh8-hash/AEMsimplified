import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { navigation } from '../lib/navigation';

interface SearchResult {
  slug: string;
  title: string;
  category: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const found: SearchResult[] = [];
    for (const cat of navigation) {
      for (const item of cat.items) {
        if (item.title.toLowerCase().includes(q) || item.slug.includes(q)) {
          found.push({ slug: item.slug, title: item.title, category: cat.title });
        }
      }
    }
    setResults(found.slice(0, 6));
  }, [query]);

  const handleSelect = (slug: string) => {
    navigate(`/topic/${slug}`);
    setQuery('');
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '6px 10px',
          cursor: 'text',
        }}
        onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}
      >
        <Search size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search topics..."
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--color-text-primary)',
            fontSize: '0.82rem',
            width: '160px',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0 }}
          >
            <X size={13} />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            width: '280px',
            background: 'var(--color-bg-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {results.map((r) => (
            <button
              key={r.slug}
              onMouseDown={() => handleSelect(r.slug)}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '10px 14px',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--color-border)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{r.title}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{r.category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { navigation } from '../lib/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSlug = location.pathname.replace('/topic/', '').replace('/', '');

  // Track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    // Find which category contains the current topic and expand it
    const initial = new Set<string>();
    for (const cat of navigation) {
      if (cat.items.some((item) => item.slug === currentSlug)) {
        initial.add(cat.id);
      }
    }
    // Expand first category by default if none active
    if (initial.size === 0) initial.add('fundamentals');
    return initial;
  });

  // Update expanded categories when route changes
  useEffect(() => {
    for (const cat of navigation) {
      if (cat.items.some((item) => item.slug === currentSlug)) {
        setExpandedCategories((prev) => new Set([...prev, cat.id]));
      }
    }
  }, [currentSlug]);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleTopicClick = (slug: string) => {
    navigate(`/topic/${slug}`);
    onClose();
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          style={{ display: 'none' }}
          id="sidebar-overlay"
        />
      )}

      <aside
        id="sidebar"
        style={{
          width: '260px',
          minWidth: '260px',
          background: 'var(--color-bg-sidebar)',
          borderRight: '1px solid var(--color-border)',
          height: 'calc(100vh - 56px)',
          position: 'sticky',
          top: '56px',
          overflowY: 'auto',
          padding: '1rem 0',
          flexShrink: 0,
        }}
      >
        {/* Search hint */}
        <div style={{ padding: '0 0.75rem 0.75rem' }}>
          <div
            style={{
              background: 'var(--color-bg-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>🔍</span>
            <span>Browse topics below</span>
          </div>
        </div>

        {/* Navigation categories */}
        {navigation.map((category) => {
          const isExpanded = expandedCategories.has(category.id);
          return (
            <div key={category.id} style={{ marginBottom: '0.25rem' }}>
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                }}
              >
                <span>{category.icon}</span>
                <span style={{ flex: 1 }}>{category.title}</span>
                {isExpanded ? (
                  <ChevronDown size={14} style={{ color: 'var(--color-text-muted)' }} />
                ) : (
                  <ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} />
                )}
              </button>

              {/* Category items */}
              {isExpanded && (
                <div style={{ paddingBottom: '0.5rem' }}>
                  {category.items.map((item) => {
                    const isActive = item.slug === currentSlug;
                    return (
                      <button
                        key={item.slug}
                        onClick={() => handleTopicClick(item.slug)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 12px 6px 28px',
                          background: isActive ? 'var(--color-accent-light)' : 'none',
                          border: 'none',
                          borderLeft: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                          cursor: 'pointer',
                          color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 500 : 400,
                          textAlign: 'left',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-primary)';
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-bg-primary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
                            (e.currentTarget as HTMLButtonElement).style.background = 'none';
                          }
                        }}
                      >
                        {item.title}
                        {item.badge && (
                          <span
                            style={{
                              fontSize: '0.65rem',
                              background: 'var(--color-tag-bg)',
                              color: 'var(--color-tag-text)',
                              padding: '1px 5px',
                              borderRadius: '4px',
                              fontWeight: 600,
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div
          style={{
            margin: '1rem 0.75rem 0',
            padding: '0.75rem',
            background: 'var(--color-bg-primary)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          <p style={{ margin: 0 }}>
            📚 Learn AEM the way senior developers explain it — practical, clear, and project-focused.
          </p>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          #sidebar {
            position: fixed !important;
            top: 56px !important;
            left: 0 !important;
            z-index: 45;
            transform: translateX(${isOpen ? '0' : '-100%'});
            transition: transform 0.25s ease;
            height: calc(100vh - 56px) !important;
            box-shadow: 4px 0 20px rgba(0,0,0,0.15);
          }
          #sidebar-overlay {
            display: ${isOpen ? 'block' : 'none'} !important;
          }
        }
      `}</style>
    </>
  );
}

import { useNavigate } from 'react-router-dom';
import { navigation } from '../lib/navigation';
import { ArrowRight, Zap, BookOpen, Code, Cloud } from 'lucide-react';

const featuredTopics = [
  { slug: 'components', icon: '🧩', color: '#3b82f6', desc: 'The building blocks of every AEM page' },
  { slug: 'sling-models', icon: '☕', color: '#f59e0b', desc: 'Java models that power component logic' },
  { slug: 'htl', icon: '📄', color: '#22c55e', desc: 'AEM\'s secure, logic-free templating language' },
  { slug: 'dispatcher', icon: '🛡️', color: '#e8520a', desc: 'Caching and security layer for AEM Publish' },
  { slug: 'content-fragments', icon: '📦', color: '#8b5cf6', desc: 'Structured content for headless delivery' },
  { slug: 'aem-cloud-service', icon: '☁️', color: '#06b6d4', desc: 'Adobe\'s fully managed cloud AEM platform' },
];

export default function HomePage() {
  const navigate = useNavigate();

  const goToTopic = (slug: string) => {
    navigate(`/topic/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ padding: '2rem 0 4rem', maxWidth: '860px' }} className="fade-in">
      {/* Hero */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              background: 'var(--color-tag-bg)',
              color: 'var(--color-tag-text)',
              padding: '3px 10px',
              borderRadius: '20px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Free Learning Resource
          </span>
        </div>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}
        >
          Learn AEM the way a{' '}
          <span style={{ color: 'var(--color-accent)' }}>senior developer</span>
          {' '}explains it.
        </h1>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            maxWidth: '600px',
            marginBottom: '1.5rem',
          }}
        >
          No documentation-style writing. No unnecessary jargon. Just practical, real-world explanations
          of every AEM concept — the way you'd hear it during a project onboarding.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => goToTopic('components')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--color-accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-accent)')}
          >
            Start Learning <ArrowRight size={15} />
          </button>
          <button
            onClick={() => goToTopic('aem-cloud-service')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            AEM Cloud Service <Cloud size={15} />
          </button>
        </div>
      </div>

      {/* Who is this for */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '3rem',
        }}
      >
        {[
          { icon: '🌱', label: 'Beginners', desc: 'Just starting with AEM' },
          { icon: '⚙️', label: 'Developers', desc: 'Building AEM components' },
          { icon: '🏗️', label: 'Architects', desc: 'Designing AEM solutions' },
          { icon: '🎯', label: 'Interview Prep', desc: 'Nailing AEM interviews' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{item.icon}</div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: '0 0 3px' }}>{item.label}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Featured Topics */}
      <div style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <span style={{ marginRight: '8px' }}>⚡</span> Start Here
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
          {featuredTopics.map((topic) => (
            <button
              key={topic.slug}
              onClick={() => goToTopic(topic.slug)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = topic.color;
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 12px ${topic.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'none';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
              }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: topic.color + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}
              >
                {topic.icon}
              </span>
              <div>
                <p style={{ margin: '0 0 3px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {topic.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                    .replace('Aem', 'AEM').replace('Htl', 'HTL').replace('Osgi', 'OSGi')}
                </p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                  {topic.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Topics */}
      <div>
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <span style={{ marginRight: '8px' }}>📚</span> All Topics
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {navigation.map((category) => (
            <div key={category.id}>
              <h3
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-muted)',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {category.icon} {category.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {category.items.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => goToTopic(item.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.85rem',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
                    }}
                  >
                    {item.title}
                    {item.badge && (
                      <span style={{ fontSize: '0.65rem', background: 'var(--color-tag-bg)', color: 'var(--color-tag-text)', padding: '1px 5px', borderRadius: '4px', fontWeight: 600 }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What makes it different */}
      <div
        style={{
          marginTop: '3rem',
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '1.5rem',
        }}
      >
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Why AEM Simplified?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { icon: <Zap size={16} />, title: 'Project-focused', desc: 'Every explanation includes what actually happens in enterprise projects' },
            { icon: <BookOpen size={16} />, title: 'Beginner-friendly', desc: 'Complex concepts explained in plain language, no prerequisites assumed' },
            { icon: <Code size={16} />, title: 'Real code examples', desc: 'Working code snippets from real AEM implementations, not toy examples' },
            { icon: <Cloud size={16} />, title: 'Cloud-ready', desc: 'Covers both AEM 6.5 and AEM as a Cloud Service differences' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
              <div>
                <p style={{ margin: '0 0 3px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.title}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

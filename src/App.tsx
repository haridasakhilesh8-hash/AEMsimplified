import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';
import { getInitialTheme, applyTheme } from './lib/theme';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
        }}
      >
        <Header
          theme={theme}
          onThemeToggle={toggleTheme}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={toggleSidebar}
        />

        <div
          style={{
            display: 'flex',
            marginTop: '56px',
            minHeight: 'calc(100vh - 56px)',
          }}
        >
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

          <main
            style={{
              flex: 1,
              minWidth: 0,
              padding: '0 1.5rem',
              maxWidth: '100%',
            }}
          >
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/topic/:slug" element={<TopicPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

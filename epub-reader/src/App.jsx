import { useState } from 'react';
import Titlebar from './components/Titlebar';
import Sidebar from './components/Sidebar';
import Reader from './components/Reader';
import Welcome from './components/Welcome';
import './App.css';

export default function App() {
  const [book, setBook] = useState(null);
  const [toc, setToc] = useState([]);
  const [currentHref, setCurrentHref] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settings, setSettings] = useState({ fontSize: 18, theme: 'dark' });

  async function openBook() {
    const result = await window.electronAPI?.openEpubDialog();
    if (!result) return;
    setBook(result);
    setToc([]);
    setCurrentHref(null);
  }

  return (
    <div className="app-shell" data-theme={settings.theme}>
      <Titlebar
        bookName={book?.name}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
        onOpenBook={openBook}
        settings={settings}
        onSettingsChange={setSettings}
      />
      <div className="app-body">
        {book && sidebarOpen && (
          <Sidebar
            toc={toc}
            currentHref={currentHref}
            onNavigate={setCurrentHref}
          />
        )}
        <main className="reader-area">
          {book ? (
            <Reader
              book={book}
              currentHref={currentHref}
              onTocLoaded={setToc}
              onLocationChange={setCurrentHref}
              settings={settings}
            />
          ) : (
            <Welcome onOpenBook={openBook} />
          )}
        </main>
      </div>
    </div>
  );
}

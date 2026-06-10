import { useState } from 'react';
import './Titlebar.css';

export default function Titlebar({ bookName, sidebarOpen, onToggleSidebar, onOpenBook, settings, onSettingsChange }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="titlebar">
      <div className="titlebar-left">
        <button className="tb-btn" onClick={onToggleSidebar} title="Toggle Sidebar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="3" width="14" height="1.5" rx="0.75"/>
            <rect x="1" y="7.25" width="14" height="1.5" rx="0.75"/>
            <rect x="1" y="11.5" width="14" height="1.5" rx="0.75"/>
          </svg>
        </button>
        <span className="app-name">📖 EPUB Reader</span>
      </div>

      <div className="titlebar-center">
        {bookName && <span className="book-title">{bookName}</span>}
      </div>

      <div className="titlebar-right">
        <button className="tb-btn" onClick={onOpenBook} title="Open Book">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 3.5A1.5 1.5 0 012.5 2h3.382a1 1 0 01.894.553L7.382 4H13.5A1.5 1.5 0 0115 5.5v7A1.5 1.5 0 0113.5 14h-11A1.5 1.5 0 011 12.5v-9zm2.5-.5a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5H7.118a1 1 0 01-.894-.553L5.618 3H3.5z"/>
          </svg>
          Open Book
        </button>

        <div className="settings-wrap">
          <button className="tb-btn icon-only" onClick={() => setShowSettings(s => !s)} title="Settings">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zm0 5.325a2.079 2.079 0 110-4.158 2.079 2.079 0 010 4.158z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319z"/>
            </svg>
          </button>

          {showSettings && (
            <div className="settings-panel">
              <h4>Display Settings</h4>

              <label>
                Font Size: <strong>{settings.fontSize}px</strong>
                <input
                  type="range" min="12" max="28" step="1"
                  value={settings.fontSize}
                  onChange={e => onSettingsChange({ ...settings, fontSize: +e.target.value })}
                />
              </label>

              <label>Theme</label>
              <div className="theme-buttons">
                {['dark', 'light', 'sepia'].map(t => (
                  <button
                    key={t}
                    className={`theme-btn theme-${t} ${settings.theme === t ? 'active' : ''}`}
                    onClick={() => onSettingsChange({ ...settings, theme: t })}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

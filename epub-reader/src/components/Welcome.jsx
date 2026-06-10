import './Welcome.css';

export default function Welcome({ onOpenBook }) {
  return (
    <div className="welcome">
      <div className="welcome-content">
        <div className="welcome-icon">📚</div>
        <h1 className="welcome-title">EPUB Reader</h1>
        <p className="welcome-subtitle">
          Your personal reading space — open any EPUB file and dive in.
        </p>
        <button className="welcome-btn" onClick={onOpenBook}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 3.5A1.5 1.5 0 012.5 2h3.382a1 1 0 01.894.553L7.382 4H13.5A1.5 1.5 0 0115 5.5v7A1.5 1.5 0 0113.5 14h-11A1.5 1.5 0 011 12.5v-9z"/>
          </svg>
          Open a Book
        </button>
        <p className="welcome-hint">Supports EPUB 2 & EPUB 3 files</p>
      </div>
    </div>
  );
}

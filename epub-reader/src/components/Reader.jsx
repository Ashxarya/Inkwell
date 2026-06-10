import { useEffect, useRef, useCallback } from 'react';
import Epub from 'epubjs';
import './Reader.css';

export default function Reader({ book, currentHref, onTocLoaded, onLocationChange, settings }) {
  const containerRef = useRef(null);
  const renditionRef = useRef(null);
  const bookRef = useRef(null);

  // Initialize book
  useEffect(() => {
    if (!book || !containerRef.current) return;

    // Clean up previous
    if (renditionRef.current) {
      renditionRef.current.destroy();
      renditionRef.current = null;
    }
    if (bookRef.current) {
      bookRef.current.destroy();
      bookRef.current = null;
    }

    const epubBook = Epub();
    bookRef.current = epubBook;

    // Load from base64
    const binaryStr = atob(book.data);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
    epubBook.open(bytes.buffer);

    // Load TOC
    epubBook.loaded.navigation.then(nav => {
      onTocLoaded(nav.toc || []);
    });

    // Create rendition
    const rendition = epubBook.renderTo(containerRef.current, {
      width: '100%',
      height: '100%',
      spread: 'none',
      flow: 'paginated',
    });
    renditionRef.current = rendition;

    // Apply theme
    applyTheme(rendition, settings.theme, settings.fontSize);

    rendition.display();

    rendition.on('locationChanged', loc => {
      if (loc?.start?.href) onLocationChange(loc.start.href);
    });

    rendition.on('keyup', e => {
      if (e.key === 'ArrowRight') rendition.next();
      if (e.key === 'ArrowLeft') rendition.prev();
    });

    return () => {
      rendition.destroy();
      epubBook.destroy();
    };
  }, [book]);

  // Navigate to TOC href
  useEffect(() => {
    if (renditionRef.current && currentHref) {
      renditionRef.current.display(currentHref).catch(() => {});
    }
  }, [currentHref]);

  // Apply settings changes
  useEffect(() => {
    if (renditionRef.current) {
      applyTheme(renditionRef.current, settings.theme, settings.fontSize);
    }
  }, [settings]);

  const handlePrev = useCallback(() => renditionRef.current?.prev(), []);
  const handleNext = useCallback(() => renditionRef.current?.next(), []);

  return (
    <div className="reader-shell">
      <button className="page-btn prev" onClick={handlePrev} title="Previous page">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"/>
        </svg>
      </button>

      <div ref={containerRef} className="epub-container" />

      <button className="page-btn next" onClick={handleNext} title="Next page">
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.646 1.646a.5.5 0 000 .708L10.293 8 4.646 13.646a.5.5 0 00.708.708l6-6a.5.5 0 000-.708l-6-6a.5.5 0 00-.708 0z"/>
        </svg>
      </button>
    </div>
  );
}

function applyTheme(rendition, theme, fontSize) {
  const themes = {
    dark: {
      body: { background: '#0f0f1a !important', color: '#e8e8f0 !important' },
      'a:link': { color: '#ff6b81 !important' },
      'p, div, span, li, td, th': { color: '#e8e8f0 !important' },
    },
    light: {
      body: { background: '#f5f0e8 !important', color: '#2c2c3a !important' },
      'a:link': { color: '#e94560 !important' },
      'p, div, span, li, td, th': { color: '#2c2c3a !important' },
    },
    sepia: {
      body: { background: '#f4ead2 !important', color: '#3b2f1e !important' },
      'a:link': { color: '#8b5e3c !important' },
      'p, div, span, li, td, th': { color: '#3b2f1e !important' },
    },
  };

  rendition.themes.register('current', themes[theme] || themes.dark);
  rendition.themes.select('current');
  rendition.themes.fontSize(`${fontSize}px`);
}

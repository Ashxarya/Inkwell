import './Sidebar.css';

export default function Sidebar({ toc, currentHref, onNavigate }) {
  if (toc.length === 0) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">Contents</div>
        <div className="toc-empty">No chapters found</div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Contents</div>
      <nav className="toc-list">
        {toc.map((item, i) => (
          <TocItem
            key={i}
            item={item}
            currentHref={currentHref}
            onNavigate={onNavigate}
            depth={0}
          />
        ))}
      </nav>
    </aside>
  );
}

function TocItem({ item, currentHref, onNavigate, depth }) {
  const isActive = currentHref && item.href && currentHref.includes(item.href.split('#')[0]);

  return (
    <>
      <button
        className={`toc-item ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${16 + depth * 14}px` }}
        onClick={() => onNavigate(item.href)}
      >
        {item.label}
      </button>
      {item.subitems?.map((sub, i) => (
        <TocItem
          key={i}
          item={sub}
          currentHref={currentHref}
          onNavigate={onNavigate}
          depth={depth + 1}
        />
      ))}
    </>
  );
}

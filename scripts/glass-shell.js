/* Liquid Glass — shared shell: theme toggle + topbar + pagepills + badge SVGs.
   Usage: include AFTER <body> opens.
   <script src="scripts/glass-shell.js" data-active="feed"></script>
   It mounts the topbar/pagepills at the very top of <main class="app"> if
   one exists, otherwise at the start of <body>. Pages can also call
   GlassShell.mount() manually. */
(function () {
  const PAGES = [
    { id: 'feed',       label: 'Feed',                href: 'Feed Home.html' },
    { id: 'dashboard',  label: 'Dashboard',           href: 'User Dashboard.html' },
    { id: 'pro',        label: 'Professional',        href: 'Professional Profile.html' },
    { id: 'customer',   label: 'Customer',            href: 'Customer Profile.html' },
    { id: 'business',   label: 'Business',            href: 'Business Profile.html' },
    { id: 'group',      label: 'Group',               href: 'Business Group.html' },
  ];

  // Real photo placeholders (Unsplash CDN — TODO: replace with real user photos)
  const PHOTOS = {
    maria:   'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces',
    jordan:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    devin:   'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces',
    miguel:  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    sarah:   'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces',
    raul:    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces',
    paul:    'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=400&fit=crop&crop=faces',
    nina:    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
    chen:    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
    ben:     'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=faces',
  };
  window.GlassPhotos = PHOTOS;

  function el(tag, attrs = {}, html = '') {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (html) e.innerHTML = html;
    return e;
  }

  function buildTopbar(activeId) {
    const tb = el('header', { class: 'topbar' });
    tb.innerHTML = `
      <div class="brand">
        <a href="Feed Home.html" style="text-decoration:none;display:flex;align-items:center;gap:10px;" title="Automate America">
          <img src="assets/logo-white.png" alt="Automate America" style="height:26px;width:auto;display:block;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5));" class="brand-logo-img" />
        </a>
      </div>
      <nav class="nav">
        <a href="Feed Home.html" data-nav="feed">Feed</a>
        <a href="Business Profile.html" data-nav="contracts">Contracts</a>
        <a href="Business Group.html" data-nav="network">Network</a>
        <a href="#" data-nav="messages">Messages</a>
        <a href="Professional Profile.html" data-nav="profile">Profile</a>
      </nav>
      <div class="search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span>Search engineers, contracts, customers…</span>
        <span class="kbd">⌘K</span>
      </div>
      <div class="theme-toggle" role="group" aria-label="Theme">
        <button id="theme-dark" class="active" aria-label="Dark theme" title="Dark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button id="theme-light" aria-label="Light theme" title="Light">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        </button>
      </div>
      <a href="Professional Profile.html" class="avatar-circle" style="background-image: url('${PHOTOS.maria}'); text-decoration: none;" title="Maria Lopez"></a>
    `;
    // mark active nav
    const navMap = { feed: 'feed', dashboard: 'feed', pro: 'profile', customer: 'contracts', business: 'contracts', group: 'network' };
    const navKey = navMap[activeId] || 'feed';
    tb.querySelectorAll('.nav a').forEach(a => {
      if (a.dataset.nav === navKey) a.classList.add('active');
    });
    return tb;
  }

  function buildPills(activeId) {
    const p = el('div', { class: 'pagepills' });
    p.innerHTML = '<span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;color:var(--glass-text-tertiary);text-transform:uppercase;letter-spacing:.10em;padding:5px 8px;">Mockup pages</span>' +
      PAGES.map(p => `<a href="${p.href}" data-pid="${p.id}"${p.id === activeId ? ' class="active"' : ''}>${p.label}</a>`).join('');
    return p;
  }

  function wireTheme() {
    const root = document.documentElement;
    const btnDark = document.getElementById('theme-dark');
    const btnLight = document.getElementById('theme-light');
    if (!btnDark || !btnLight) return;

    function set(theme) {
      root.setAttribute('data-theme', theme);
      btnDark.classList.toggle('active', theme === 'dark');
      btnLight.classList.toggle('active', theme === 'light');
      try { localStorage.setItem('aa-feed-theme', theme); } catch (e) {}
    }
    btnDark.addEventListener('click', () => set('dark'));
    btnLight.addEventListener('click', () => set('light'));
    try {
      const saved = localStorage.getItem('aa-feed-theme');
      if (saved === 'light' || saved === 'dark') set(saved);
    } catch (e) {}
  }

  function mount(activeId) {
    activeId = activeId || (document.currentScript && document.currentScript.dataset.active) || 'feed';
    const host = document.querySelector('main.app') || document.body;
    const ref = host.firstChild;
    host.insertBefore(buildPills(activeId), ref);
    host.insertBefore(buildTopbar(activeId), host.firstChild);
    // ensure wallpaper layers exist
    if (!document.querySelector('.wp.dark')) {
      const wpD = el('div', { class: 'wp dark' });
      const wpL = el('div', { class: 'wp light' });
      document.body.insertBefore(wpL, document.body.firstChild);
      document.body.insertBefore(wpD, document.body.firstChild);
    }
    wireTheme();
  }

  // Auto-mount when script loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => mount());
  } else {
    mount();
  }

  window.GlassShell = { mount, PAGES, PHOTOS };
})();

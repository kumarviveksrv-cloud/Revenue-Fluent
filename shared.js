// ═══════════════════════════════════════════
// REVENUE FLUENT — Shared Design System
// Used across all pages
// ═══════════════════════════════════════════

const RF = {

  // ── NAVIGATION STATE ──
  nav: {
    pillars: [
      {
        id: 'p1', num: 'L1', label: 'People-Revenue Connect',
        locked: false,
        modules: [
          { id: 'p1-a', label: 'The Philosophy', file: 'p1-module-a.html' },
          { id: 'p1-b', label: 'The Framework', file: 'p1-module-b.html' },
          { id: 'p1-c', label: 'The Instruments', file: 'p1-module-c.html' },
          { id: 'p1-d', label: 'The Simulation', file: 'p1-module-d.html' },
        ]
      },
      {
        id: 'p2', num: 'L2', label: 'People Alpha',
        locked: true,
        modules: [
          { id: 'p2-a', label: 'The Philosophy', file: 'p2-module-a.html' },
          { id: 'p2-b', label: 'The Framework', file: 'p2-module-b.html' },
          { id: 'p2-c', label: 'The Instruments', file: 'p2-module-c.html' },
          { id: 'p2-d', label: 'The Simulation', file: 'p2-module-d.html' },
        ]
      },
      {
        id: 'p3', num: 'L3', label: 'Team Revenue Architecture',
        locked: true,
        modules: [
          { id: 'p3-a', label: 'The Philosophy', file: 'p3-module-a.html' },
          { id: 'p3-b', label: 'The Framework', file: 'p3-module-b.html' },
          { id: 'p3-c', label: 'The Instruments', file: 'p3-module-c.html' },
          { id: 'p3-d', label: 'The Simulation', file: 'p3-module-d.html' },
        ]
      },
      {
        id: 'p4', num: 'L4', label: 'Human Balance Sheet',
        locked: true,
        modules: [
          { id: 'p4-a', label: 'The Philosophy', file: 'p4-module-a.html' },
          { id: 'p4-b', label: 'The Framework', file: 'p4-module-b.html' },
          { id: 'p4-c', label: 'The Instruments', file: 'p4-module-c.html' },
          { id: 'p4-d', label: 'The Simulation', file: 'p4-module-d.html' },
          { id: 'p4-e', label: 'HUMANCE Statement', file: 'p4-module-e.html' },
        ]
      },
      {
        id: 'p5', num: 'L5', label: 'People P&L',
        locked: true,
        modules: [
          { id: 'p5-a', label: 'The Philosophy', file: 'p5-module-a.html' },
          { id: 'p5-b', label: 'The Framework', file: 'p5-module-b.html' },
          { id: 'p5-c', label: 'The Instruments', file: 'p5-module-c.html' },
          { id: 'p5-d', label: 'The Simulation', file: 'p5-module-d.html' },
          { id: 'p5-e', label: 'Certification', file: 'p5-module-e.html' },
        ]
      },
    ]
  },

  // ── PROGRESS ──
  progress: {
    get() { return JSON.parse(localStorage.getItem('rf-progress') || '{}'); },
    set(id) { const p = this.get(); p[id] = true; localStorage.setItem('rf-progress', JSON.stringify(p)); },
    isComplete(id) { return !!this.get()[id]; },
    totalComplete() { return Object.keys(this.get()).length; },
  },

  // ── MATRIX RAIN ──
  startMatrix(canvasId, opacity = 0.15) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = ['₹','$','£','€','%','+','→','HUMANCE','ALPHA','P&L','ESR','TDF','BEE','OEI','IRD','PVI','14%','466%','₹4.2Cr','74%','+22%','₹2.3Cr','153%','0','1','2','3','4','5','6','7','8','9','HR','ROI','FTE','CHRO'];
    let cols, drops;

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const fs = 13;
      cols = Math.floor(canvas.width / (fs * 2.2));
      drops = Array(cols).fill(1).map(() => Math.random() * -100);
    }

    function draw() {
      ctx.fillStyle = 'rgba(2, 4, 8, 0.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 13 * 2.2;
        ctx.fillStyle = '#00F0C2';
        ctx.font = `500 13px 'DM Mono', monospace`;
        ctx.fillText(char, x, y * 13);
        ctx.fillStyle = 'rgba(0,212,170,0.3)';
        ctx.font = `400 11px 'DM Mono', monospace`;
        if (y > 3) ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y-3) * 13);
        if (Math.random() > 0.97) { ctx.fillStyle = 'rgba(245,166,35,0.7)'; ctx.fillText(char, x, y * 13); }
        if (drops[i] * 13 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      });
    }

    canvas.style.opacity = opacity;
    init();
    window.addEventListener('resize', init);
    setInterval(draw, 55);
  },

  // ── TICKER ──
  startTicker(containerId) {
    const items = [
      { label: 'People Alpha', val: '+14%', cls: 'up' },
      { label: 'HUMANCE Generated', val: '₹4.2Cr', cls: 'up' },
      { label: 'Net People ROI', val: '466%', cls: 'up' },
      { label: 'Attrition Cost', val: '₹595K', cls: 'down' },
      { label: 'ESR Score', val: '60.5%', cls: 'down' },
      { label: 'Revenue Protected', val: '₹2.3Cr', cls: 'up' },
      { label: 'Hiring Alpha', val: '+22%', cls: 'up' },
      { label: 'TDF Index', val: '3.3x', cls: 'down' },
      { label: 'Promotion Alpha', val: '-8%', cls: 'down' },
      { label: 'Retention Alpha', val: '+18%', cls: 'up' },
      { label: 'Culture Yield', val: '₹94L', cls: 'up' },
      { label: 'Belonging Premium', val: '+34%', cls: 'up' },
      { label: 'L&D Alpha', val: '+62%', cls: 'up' },
    ];
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = [...items, ...items].map(item => `
      <div class="ticker-item">
        <span class="t-label">${item.label}</span>
        <span class="t-val ${item.cls}">${item.val}</span>
        <span class="t-sep">|</span>
      </div>
    `).join('');
  },

  // ── SIDEBAR HTML ──
  renderSidebar(activeModuleId) {
    const progress = this.progress.get();
    return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-brand" onclick="window.location='dashboard.html'">
          <div class="sb-dot"></div>
          <span>Revenue<strong>Fluent</strong></span>
        </div>
        <nav class="sidebar-nav">
          ${this.nav.pillars.map(pillar => `
            <div class="sb-pillar ${pillar.locked ? 'locked' : ''}">
              <div class="sb-pillar-header" onclick="${pillar.locked ? '' : `togglePillar('${pillar.id}')`}">
                <span class="sb-pillar-num">${pillar.num}</span>
                <span class="sb-pillar-label">${pillar.label}</span>
                ${pillar.locked ? '<span class="sb-lock">🔒</span>' : '<span class="sb-chevron" id="chev-'+pillar.id+'">▾</span>'}
              </div>
              ${!pillar.locked ? `
                <div class="sb-modules" id="mods-${pillar.id}">
                  ${pillar.modules.map(mod => `
                    <a href="${mod.file}" class="sb-module ${mod.id === activeModuleId ? 'active' : ''} ${progress[mod.id] ? 'done' : ''}">
                      <span class="sb-mod-dot"></span>
                      <span class="sb-mod-label">${mod.label}</span>
                      ${progress[mod.id] ? '<span class="sb-check">✓</span>' : ''}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </nav>
        <div class="sidebar-footer">
          <a href="index.html" class="sb-footer-link">← Back to home</a>
        </div>
      </aside>
    `;
  },

  // ── SHARED CSS ──
  css: `
    @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');

    :root {
      --bg:        #020408;
      --bg2:       #0A0F14;
      --bg3:       #111820;
      --bg4:       #161E28;
      --teal:      #00D4AA;
      --teal-dim:  rgba(0,212,170,0.10);
      --teal-glow: rgba(0,212,170,0.28);
      --amber:     #F5A623;
      --amber-dim: rgba(245,166,35,0.12);
      --red:       #FF4757;
      --red-dim:   rgba(255,71,87,0.12);
      --text:      #E8F4F0;
      --text-dim:  rgba(232,244,240,0.55);
      --text-mute: rgba(232,244,240,0.25);
      --border:    rgba(0,212,170,0.08);
      --border-hi: rgba(0,212,170,0.28);
      --sidebar-w: 260px;
      --topbar-h:  56px;
      --font-head: 'Clash Display', sans-serif;
      --font-body: 'Satoshi', sans-serif;
      --font-mono: 'DM Mono', monospace;
      --radius:    10px;
      --radius-sm: 6px;
      --radius-lg: 16px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); font-weight: 400; line-height: 1.7; min-height: 100vh; overflow-x: hidden; }

    /* MATRIX */
    #matrix-canvas { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
    body::after { content: ''; position: fixed; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px); pointer-events: none; z-index: 1; }
    body::before { content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse at center, transparent 30%, rgba(2,4,8,0.9) 100%); pointer-events: none; z-index: 2; }

    /* TICKER */
    .ticker-wrap { position: fixed; top: 0; left: 0; right: 0; z-index: 200; overflow: hidden; border-bottom: 1px solid var(--border); padding: 5px 0; background: rgba(2,4,8,0.92); backdrop-filter: blur(20px); }
    .ticker-track { display: flex; gap: 2.5rem; width: max-content; animation: ticker 30s linear infinite; }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .ticker-item { display: flex; align-items: center; gap: 8px; white-space: nowrap; font-family: var(--font-mono); font-size: 0.62rem; }
    .t-label { color: var(--text-mute); }
    .t-val.up { color: var(--teal); }
    .t-val.down { color: var(--red); }
    .t-sep { color: var(--border-hi); margin: 0 2px; }

    /* SIDEBAR */
    .sidebar { position: fixed; top: 28px; left: 0; bottom: 0; width: var(--sidebar-w); background: rgba(2,4,8,0.95); backdrop-filter: blur(20px); border-right: 1px solid var(--border); z-index: 100; display: flex; flex-direction: column; overflow-y: auto; }
    .sidebar-brand { display: flex; align-items: center; gap: 10px; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); cursor: pointer; text-decoration: none; color: var(--text); font-family: var(--font-head); font-size: 0.95rem; }
    .sidebar-brand strong { color: var(--teal); }
    .sb-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 8px var(--teal); animation: pulse 2s ease-in-out infinite; flex-shrink: 0; }
    @keyframes pulse { 0%,100% { opacity: 1; box-shadow: 0 0 8px var(--teal); } 50% { opacity: 0.5; box-shadow: 0 0 3px var(--teal); } }
    .sidebar-nav { flex: 1; padding: 0.75rem 0; }
    .sb-pillar { border-bottom: 1px solid var(--border); }
    .sb-pillar-header { display: flex; align-items: center; gap: 8px; padding: 0.75rem 1.25rem; cursor: pointer; transition: background 0.15s; user-select: none; }
    .sb-pillar-header:hover { background: var(--bg2); }
    .sb-pillar.locked .sb-pillar-header { cursor: default; opacity: 0.4; }
    .sb-pillar-num { font-family: var(--font-mono); font-size: 0.58rem; color: var(--teal); background: var(--teal-dim); border: 1px solid var(--teal-glow); padding: 2px 6px; border-radius: 3px; flex-shrink: 0; }
    .sb-pillar.locked .sb-pillar-num { color: var(--text-mute); background: transparent; border-color: var(--border); }
    .sb-pillar-label { font-family: var(--font-body); font-size: 0.78rem; font-weight: 500; color: var(--text); flex: 1; line-height: 1.3; }
    .sb-lock { font-size: 0.65rem; opacity: 0.4; }
    .sb-chevron { font-size: 0.7rem; color: var(--text-mute); transition: transform 0.2s; }
    .sb-pillar.collapsed .sb-chevron { transform: rotate(-90deg); }
    .sb-modules { padding: 0.25rem 0 0.5rem; }
    .sb-pillar.collapsed .sb-modules { display: none; }
    .sb-module { display: flex; align-items: center; gap: 10px; padding: 7px 1.25rem 7px 2.25rem; text-decoration: none; transition: background 0.15s; cursor: pointer; }
    .sb-module:hover { background: var(--bg2); }
    .sb-module.active { background: var(--teal-dim); border-left: 2px solid var(--teal); }
    .sb-mod-dot { width: 6px; height: 6px; border-radius: 50%; border: 1.5px solid var(--text-mute); flex-shrink: 0; transition: all 0.2s; }
    .sb-module.active .sb-mod-dot { background: var(--teal); border-color: var(--teal); box-shadow: 0 0 6px var(--teal); }
    .sb-module.done .sb-mod-dot { background: var(--amber); border-color: var(--amber); }
    .sb-mod-label { font-size: 0.78rem; color: var(--text-dim); flex: 1; }
    .sb-module.active .sb-mod-label { color: var(--text); }
    .sb-check { font-size: 0.65rem; color: var(--amber); }
    .sidebar-footer { padding: 1rem 1.25rem; border-top: 1px solid var(--border); }
    .sb-footer-link { font-family: var(--font-mono); font-size: 0.62rem; color: var(--text-mute); text-decoration: none; letter-spacing: 0.05em; }
    .sb-footer-link:hover { color: var(--teal); }

    /* TOPBAR (inside app pages) */
    .topbar { position: fixed; top: 28px; left: var(--sidebar-w); right: 0; height: var(--topbar-h); background: rgba(2,4,8,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); z-index: 99; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; }
    .topbar-breadcrumb { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-mute); }
    .topbar-breadcrumb .sep { color: var(--border-hi); }
    .topbar-breadcrumb .current { color: var(--teal); }
    .topbar-right { display: flex; align-items: center; gap: 1rem; }
    .topbar-progress { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-mute); }
    .prog-dots { display: flex; gap: 4px; }
    .prog-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border); }
    .prog-dot.done { background: var(--amber); }
    .prog-dot.active { background: var(--teal); box-shadow: 0 0 5px var(--teal); }
    .by-badge { font-family: var(--font-mono); font-size: 0.58rem; padding: 3px 10px; border-radius: 4px; background: var(--teal-dim); border: 1px solid var(--teal-glow); color: var(--teal); text-transform: uppercase; letter-spacing: 0.08em; }

    /* MAIN CONTENT AREA */
    .app-body { margin-left: var(--sidebar-w); padding-top: calc(28px + var(--topbar-h)); min-height: 100vh; position: relative; z-index: 3; }
    .page-content { padding: 3rem 3.5rem; max-width: 860px; }

    /* BUTTONS */
    .btn-primary { font-family: var(--font-head); font-weight: 700; font-size: 0.9rem; padding: 13px 28px; border-radius: var(--radius-sm); background: var(--teal); color: #020408; border: none; cursor: pointer; letter-spacing: 0.01em; transition: all 0.2s; text-decoration: none; display: inline-block; position: relative; overflow: hidden; }
    .btn-primary:hover { background: #00F0C2; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,212,170,0.25); }
    .btn-secondary { font-family: var(--font-head); font-weight: 600; font-size: 0.9rem; padding: 12px 28px; border-radius: var(--radius-sm); background: transparent; color: var(--text); border: 1px solid var(--border-hi); cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
    .btn-secondary:hover { background: var(--teal-dim); color: var(--teal); border-color: var(--teal); }
    .btn-ghost { font-family: var(--font-mono); font-size: 0.72rem; padding: 8px 16px; border-radius: var(--radius-sm); background: transparent; color: var(--text-dim); border: 1px solid var(--border); cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; letter-spacing: 0.05em; }
    .btn-ghost:hover { border-color: var(--border-hi); color: var(--text); }

    /* CARDS */
    .card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; }
    .card-hi { background: var(--bg2); border: 1px solid var(--border-hi); border-radius: var(--radius); padding: 1.5rem; }

    /* TAGS */
    .tag { display: inline-block; font-family: var(--font-mono); font-size: 0.58rem; padding: 3px 8px; border-radius: 4px; background: var(--teal-dim); border: 1px solid var(--teal-glow); color: var(--teal); text-transform: uppercase; letter-spacing: 0.08em; }
    .tag-amber { background: var(--amber-dim); border-color: rgba(245,166,35,0.3); color: var(--amber); }
    .tag-red { background: var(--red-dim); border-color: rgba(255,71,87,0.2); color: var(--red); }

    /* TYPOGRAPHY */
    .page-tag { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal); margin-bottom: 12px; }
    .page-title { font-family: var(--font-head); font-weight: 700; font-size: 2.2rem; letter-spacing: -0.025em; line-height: 1.15; color: var(--text); margin-bottom: 0.75rem; }
    .page-desc { font-size: 1rem; color: var(--text-dim); line-height: 1.8; max-width: 580px; font-weight: 300; margin-bottom: 2rem; }
    .section-title { font-family: var(--font-head); font-weight: 700; font-size: 1.4rem; letter-spacing: -0.02em; color: var(--text); margin-bottom: 0.5rem; }
    .label { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-mute); margin-bottom: 6px; }
    .value { font-family: var(--font-head); font-weight: 700; font-size: 1.8rem; color: var(--teal); line-height: 1; }
    .value-amber { color: var(--amber); }
    .value-red { color: var(--red); }

    /* DIVIDER */
    .divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }

    /* PAGE NAV */
    .page-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); }
    .page-nav-info { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-mute); letter-spacing: 0.08em; }

    /* SCROLLBAR */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 2px; }

    /* PAGE ENTER ANIMATION */
    .page-content { animation: pageIn 0.35s cubic-bezier(0.22,1,0.36,1); }
    @keyframes pageIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  `
};

// ── SIDEBAR TOGGLE ──
function togglePillar(id) {
  const pillar = document.querySelector(`.sb-pillar[data-id="${id}"]`);
  if (pillar) pillar.classList.toggle('collapsed');
}

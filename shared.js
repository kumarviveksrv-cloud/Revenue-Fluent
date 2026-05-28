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
        locked: false,
        modules: [
          { id: 'p2-a', label: 'The Philosophy', file: 'p2-module-a.html' },
          { id: 'p2-b', label: 'The Alpha Methodology', file: 'p2-module-b.html' },
          { id: 'p2-c', label: 'The Instruments', file: 'p2-module-c.html' },
          { id: 'p2-d', label: 'The Simulation', file: 'p2-module-d.html' },
        ]
      },
      {
        id: 'p3', num: 'L3', label: 'Team Revenue Architecture',
        locked: false,
        modules: [
          { id: 'p3-a', label: 'The Philosophy', file: 'p3-module-a.html' },
          { id: 'p3-b', label: 'The Framework', file: 'p3-module-b.html' },
          { id: 'p3-c', label: 'The Instruments', file: 'p3-module-c.html' },
          { id: 'p3-d', label: 'The Simulation', file: 'p3-module-d.html' },
        ]
      },
      {
        id: 'p4', num: 'L4', label: 'Human Balance Sheet',
        locked: false,
        modules: [
          { id: 'p4-a', label: 'The Philosophy', file: 'p4-module-a.html' },
          { id: 'p4-b', label: 'The HUMANCE Framework', file: 'p4-module-b.html' },
          { id: 'p4-c', label: 'The Instruments', file: 'p4-module-c.html' },
          { id: 'p4-d', label: 'The HUMANCE Statement', file: 'p4-module-d.html' },
          { id: 'p4-e', label: 'The Simulation', file: 'p4-module-e.html' },
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
  startMatrix(canvasId, opacity = 0.45) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = ['₹','$','%','→','HUMANCE','ALPHA','P&L','ESR','TDF','BEE','18%','+12%','₹2Cr','466%','0','1','2','HR','ROI','FTE','CHRO','PVI','OEI'];
    let cols, drops;

    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const fs = 12;
      cols = Math.floor(canvas.width / (fs * 2.4));
      drops = Array(cols).fill(1).map(() => Math.random() * -100);
    }

    function draw() {
      ctx.fillStyle = 'rgba(15,23,42,0.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fs * 2.4;
        ctx.fillStyle = 'rgba(56,189,248,0.35)';
        ctx.font = `400 ${fs}px 'DM Mono', monospace`;
        ctx.fillText(char, x, y * fs);
        if (y > 4) {
          ctx.fillStyle = 'rgba(56,189,248,0.12)';
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y-4) * fs);
        }
        if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.35;
      });
    }

    canvas.style.opacity = opacity;
    init();
    window.addEventListener('resize', init);
    setInterval(draw, 65);
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
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

    :root {
      --bg:         #F8FAFC;
      --bg2:        #FFFFFF;
      --bg3:        #F0F9FF;
      --bg4:        #E0F2FE;
      --sidebar:    #0F172A;
      --sidebar2:   #1E293B;
      --accent:     #0284C7;
      --accent-dim: rgba(2,132,199,0.08);
      --accent-glow:rgba(2,132,199,0.20);
      --accent-light:#BAE6FD;
      --amber:      #D97706;
      --amber-dim:  rgba(217,119,6,0.08);
      --red:        #DC2626;
      --red-dim:    rgba(220,38,38,0.08);
      --green:      #16A34A;
      --green-dim:  rgba(22,163,74,0.08);
      --text:       #0F172A;
      --text-dim:   #475569;
      --text-mute:  #94A3B8;
      --border:     #E2E8F0;
      --border-hi:  #BAE6FD;
      --sidebar-w:  260px;
      --topbar-h:   56px;
      --font-head:  'Sora', sans-serif;
      --font-body:  'Sora', sans-serif;
      --font-mono:  'DM Mono', monospace;
      --radius:     10px;
      --radius-sm:  6px;
      --radius-lg:  16px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; scroll-behavior: smooth; }
    body { background: var(--bg); color: var(--text); font-family: var(--font-body); font-weight: 400; line-height: 1.75; min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }

    /* No matrix on app pages - only landing */
    #matrix-canvas { display: none; }
    body::after { display: none; }
    body::before { display: none; }

    /* TICKER */
    .ticker-wrap { position: fixed; top: 0; left: 0; right: 0; z-index: 200; overflow: hidden; border-bottom: 1px solid var(--border); padding: 5px 0; background: var(--sidebar); }
    .ticker-track { display: flex; gap: 2.5rem; width: max-content; animation: ticker 32s linear infinite; }
    @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .ticker-item { display: flex; align-items: center; gap: 8px; white-space: nowrap; font-family: var(--font-mono); font-size: 0.6rem; }
    .t-label { color: rgba(255,255,255,0.35); }
    .t-val.up { color: #7DD3FC; }
    .t-val.down { color: #FCA5A5; }
    .t-sep { color: rgba(255,255,255,0.15); margin: 0 2px; }

    /* SIDEBAR */
    .sidebar { position: fixed; top: 28px; left: 0; bottom: 0; width: var(--sidebar-w); background: var(--sidebar); border-right: none; z-index: 100; display: flex; flex-direction: column; overflow-y: auto; }
    .sidebar-brand { display: flex; align-items: center; gap: 10px; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); cursor: pointer; text-decoration: none; color: #fff; font-family: var(--font-head); font-size: 0.95rem; font-weight: 800; letter-spacing: -0.02em; }
    .sidebar-brand strong { color: #38BDF8; font-weight: 300; font-style: italic; }
    .sb-dot { width: 7px; height: 7px; border-radius: 50%; background: #38BDF8; animation: pulse 2.5s ease-in-out infinite; flex-shrink: 0; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    .sidebar-nav { flex: 1; padding: 0.75rem 0; }
    .sb-pillar { border-bottom: 1px solid rgba(255,255,255,0.05); }
    .sb-pillar-header { display: flex; align-items: center; gap: 8px; padding: 0.7rem 1.25rem; cursor: pointer; transition: background 0.15s; user-select: none; }
    .sb-pillar-header:hover { background: rgba(255,255,255,0.05); }
    .sb-pillar.locked .sb-pillar-header { cursor: default; opacity: 0.3; }
    .sb-pillar-num { font-family: var(--font-mono); font-size: 0.55rem; color: #7DD3FC; background: rgba(125,211,252,0.1); border: 1px solid rgba(125,211,252,0.2); padding: 2px 6px; border-radius: 3px; flex-shrink: 0; }
    .sb-pillar.locked .sb-pillar-num { color: rgba(255,255,255,0.25); background: transparent; border-color: rgba(255,255,255,0.1); }
    .sb-pillar-label { font-family: var(--font-body); font-size: 0.76rem; font-weight: 500; color: rgba(255,255,255,0.75); flex: 1; line-height: 1.3; }
    .sb-lock { font-size: 0.6rem; opacity: 0.3; }
    .sb-chevron { font-size: 0.7rem; color: rgba(255,255,255,0.3); transition: transform 0.2s; }
    .sb-pillar.collapsed .sb-chevron { transform: rotate(-90deg); }
    .sb-modules { padding: 0.25rem 0 0.5rem; }
    .sb-pillar.collapsed .sb-modules { display: none; }
    .sb-module { display: flex; align-items: center; gap: 10px; padding: 6px 1.25rem 6px 2.25rem; text-decoration: none; transition: background 0.15s; cursor: pointer; }
    .sb-module:hover { background: rgba(255,255,255,0.05); }
    .sb-module.active { background: rgba(56,189,248,0.1); border-left: 2px solid #38BDF8; }
    .sb-mod-dot { width: 5px; height: 5px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.25); flex-shrink: 0; transition: all 0.2s; }
    .sb-module.active .sb-mod-dot { background: #38BDF8; border-color: #38BDF8; }
    .sb-module.done .sb-mod-dot { background: #FCD34D; border-color: #FCD34D; }
    .sb-mod-label { font-size: 0.75rem; color: rgba(255,255,255,0.45); flex: 1; }
    .sb-module.active .sb-mod-label { color: #BAE6FD; }
    .sb-check { font-size: 0.6rem; color: #FCD34D; }
    .sidebar-footer { padding: 1rem 1.25rem; border-top: 1px solid rgba(255,255,255,0.06); }
    .sb-footer-link { font-family: var(--font-mono); font-size: 0.6rem; color: rgba(255,255,255,0.3); text-decoration: none; letter-spacing: 0.05em; }
    .sb-footer-link:hover { color: #7DD3FC; }

    /* TOPBAR */
    .topbar { position: fixed; top: 28px; left: var(--sidebar-w); right: 0; height: var(--topbar-h); background: var(--bg2); border-bottom: 1px solid var(--border); z-index: 99; display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; }
    .topbar-breadcrumb { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-mute); }
    .topbar-breadcrumb .sep { color: var(--border); }
    .topbar-breadcrumb .current { color: var(--accent); font-weight: 500; }
    .topbar-right { display: flex; align-items: center; gap: 1rem; }
    .topbar-progress { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.62rem; color: var(--text-mute); }
    .prog-dots { display: flex; gap: 4px; }
    .prog-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border); }
    .prog-dot.done { background: var(--amber); }
    .prog-dot.active { background: var(--accent); }
    .by-badge { font-family: var(--font-mono); font-size: 0.56rem; padding: 3px 10px; border-radius: 4px; background: var(--accent-dim); border: 1px solid var(--border-hi); color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; }

    /* MAIN CONTENT */
    .app-body { margin-left: var(--sidebar-w); padding-top: calc(28px + var(--topbar-h)); min-height: 100vh; background: var(--bg); position: relative; z-index: 3; }
    .page-content { padding: 2.5rem 3rem; max-width: 860px; }

    /* BUTTONS */
    .btn-primary { font-family: var(--font-head); font-weight: 700; font-size: 0.88rem; padding: 11px 24px; border-radius: var(--radius-sm); background: var(--accent); color: #fff; border: none; cursor: pointer; letter-spacing: 0.01em; transition: all 0.2s; text-decoration: none; display: inline-block; }
    .btn-primary:hover { background: #0369A1; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(2,132,199,0.25); }
    .btn-secondary { font-family: var(--font-head); font-weight: 600; font-size: 0.88rem; padding: 10px 24px; border-radius: var(--radius-sm); background: transparent; color: var(--text-dim); border: 1px solid var(--border); cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
    .btn-secondary:hover { background: var(--bg3); color: var(--accent); border-color: var(--border-hi); }
    .btn-ghost { font-family: var(--font-mono); font-size: 0.7rem; padding: 7px 14px; border-radius: var(--radius-sm); background: transparent; color: var(--text-mute); border: 1px solid var(--border); cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; letter-spacing: 0.05em; }
    .btn-ghost:hover { border-color: var(--accent-glow); color: var(--accent); }

    /* CARDS */
    .card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; }
    .card-hi { background: var(--bg2); border: 1px solid var(--border-hi); border-radius: var(--radius); padding: 1.5rem; }

    /* TAGS */
    .tag { display: inline-block; font-family: var(--font-mono); font-size: 0.58rem; padding: 3px 8px; border-radius: 4px; background: var(--accent-dim); border: 1px solid var(--border-hi); color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; }
    .tag-amber { background: var(--amber-dim); border-color: rgba(217,119,6,0.2); color: var(--amber); }
    .tag-red { background: var(--red-dim); border-color: rgba(220,38,38,0.15); color: var(--red); }
    .tag-green { background: var(--green-dim); border-color: rgba(22,163,74,0.15); color: var(--green); }

    /* TYPOGRAPHY */
    .page-tag { font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-mute); margin-bottom: 10px; }
    .page-title { font-family: var(--font-head); font-weight: 800; font-size: 1.9rem; letter-spacing: -0.025em; line-height: 1.2; color: var(--text); margin-bottom: 0.75rem; }
    .page-title em { font-weight: 300; font-style: italic; color: var(--accent); }
    .page-desc { font-size: 0.95rem; color: var(--text-dim); line-height: 1.85; max-width: 580px; font-weight: 400; margin-bottom: 2rem; }
    .section-title { font-family: var(--font-head); font-weight: 700; font-size: 1.2rem; letter-spacing: -0.02em; color: var(--text); margin-bottom: 0.5rem; }
    .label { font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-mute); margin-bottom: 6px; }
    .value { font-family: var(--font-head); font-weight: 800; font-size: 1.8rem; color: var(--accent); line-height: 1; }
    .value-amber { color: var(--amber); }
    .value-red { color: var(--red); }

    /* DIVIDER */
    .divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }

    /* PAGE NAV */
    .page-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); }
    .page-nav-info { font-family: var(--font-mono); font-size: 0.62rem; color: var(--text-mute); letter-spacing: 0.08em; }

    /* SCROLLBAR */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

    /* PAGE ENTER */
    .page-content { animation: pageIn 0.3s cubic-bezier(0.22,1,0.36,1); }
    @keyframes pageIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  `
};

// ── SIDEBAR TOGGLE ──
function togglePillar(id) {
  const pillar = document.querySelector(`.sb-pillar[data-id="${id}"]`);
  if (pillar) pillar.classList.toggle('collapsed');
}

// Revenue Fluent — Shared Design System v3.0
// "Democratized B2C Keka" — dark cosmic, tool-first, ultra-premium

const RF = {

  injectFavicon() {
    if (!document.querySelector('link[rel="icon"]')) {
      const link = document.createElement('link');
      link.rel = 'icon'; link.type = 'image/x-icon';
      link.href = '/Revenue-Fluent/favicon.ico';
      document.head.appendChild(link);
    }
  },

  css: `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

    :root {
      --bg:         #0B0D14;
      --bg2:        #111420;
      --bg3:        #181C2E;
      --bg4:        #1E2338;
      --card:       #141828;
      --sidebar:    #0D0F1A;
      --accent:     #6366F1;
      --accent2:    #818CF8;
      --accent-dim: rgba(99,102,241,0.12);
      --accent-glow:rgba(99,102,241,0.25);
      --teal:       #2DD4BF;
      --teal-dim:   rgba(45,212,191,0.10);
      --amber:      #F59E0B;
      --amber-dim:  rgba(245,158,11,0.10);
      --red:        #EF4444;
      --red-dim:    rgba(239,68,68,0.10);
      --green:      #10B981;
      --green-dim:  rgba(16,185,129,0.10);
      --purple:     #A855F7;
      --purple-dim: rgba(168,85,247,0.10);
      --text:       rgba(236,238,255,0.92);
      --text-dim:   rgba(236,238,255,0.50);
      --text-mute:  rgba(236,238,255,0.25);
      --border:     rgba(255,255,255,0.06);
      --border-hi:  rgba(255,255,255,0.12);
      --border-accent: rgba(99,102,241,0.30);
      --sidebar-w:  240px;
      --topbar-h:   52px;
      --font-head:  'Sora', sans-serif;
      --font-body:  'Sora', sans-serif;
      --font-mono:  'DM Mono', monospace;
      --radius:     12px;
      --radius-sm:  8px;
      --radius-lg:  16px;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      font-weight: 400;
      line-height: 1.7;
      min-height: 100vh;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* STAR FIELD BACKGROUND */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.07) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 20%, rgba(45,212,191,0.05) 0%, transparent 50%),
        radial-gradient(ellipse at 60% 80%, rgba(168,85,247,0.04) 0%, transparent 50%);
      pointer-events: none;
      z-index: 0;
    }

    /* TICKER */
    .ticker-wrap {
      position: fixed; top: 0; left: 0; right: 0; z-index: 300;
      overflow: hidden; border-bottom: 1px solid var(--border);
      padding: 5px 0; background: rgba(11,13,20,0.98);
      backdrop-filter: blur(20px);
    }
    .ticker-track {
      display: flex; gap: 2rem; width: max-content;
      animation: ticker 36s linear infinite;
    }
    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .ticker-item {
      display: flex; align-items: center; gap: 6px;
      white-space: nowrap; font-family: var(--font-mono); font-size: 0.58rem;
    }
    .t-label { color: var(--text-mute); }
    .t-val { font-weight: 500; }
    .t-val.up { color: var(--teal); }
    .t-val.down { color: var(--red); }
    .t-val.accent { color: var(--accent2); }
    .t-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--border-hi); }

    /* SIDEBAR */
    .sidebar {
      position: fixed; top: 29px; left: 0; bottom: 0;
      width: var(--sidebar-w);
      background: var(--sidebar);
      border-right: 1px solid var(--border);
      z-index: 200; display: flex; flex-direction: column;
      overflow-y: auto;
    }
    .sidebar::-webkit-scrollbar { width: 0; }

    .sb-brand {
      display: flex; align-items: center; gap: 10px;
      padding: 1.1rem 1.25rem;
      border-bottom: 1px solid var(--border);
      text-decoration: none;
    }
    .sb-logo {
      width: 28px; height: 28px; border-radius: 7px;
      background: var(--accent-dim); border: 1px solid var(--border-accent);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .sb-logo-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent2);
      animation: logoPulse 2.5s ease-in-out infinite;
    }
    @keyframes logoPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
    .sb-brand-text {
      font-family: var(--font-head); font-weight: 800;
      font-size: 0.9rem; color: var(--text); letter-spacing: -0.02em;
    }
    .sb-brand-text em { font-weight: 300; font-style: italic; color: var(--accent2); }

    .sb-section {
      font-family: var(--font-mono); font-size: 0.55rem;
      color: var(--text-mute); text-transform: uppercase;
      letter-spacing: 0.14em; padding: 1rem 1.25rem 0.4rem;
    }

    .sb-item {
      display: flex; align-items: center; gap: 10px;
      padding: 0.6rem 1.25rem; cursor: pointer;
      transition: all 0.15s; text-decoration: none;
      border-left: 2px solid transparent;
      position: relative;
    }
    .sb-item:hover { background: rgba(255,255,255,0.04); }
    .sb-item.active {
      background: var(--accent-dim);
      border-left-color: var(--accent);
    }
    .sb-item-icon {
      width: 18px; height: 18px; border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; font-size: 0.7rem;
      background: rgba(255,255,255,0.05);
      color: var(--text-mute);
    }
    .sb-item.active .sb-item-icon { background: var(--accent-dim); color: var(--accent2); }
    .sb-item-label {
      font-size: 0.78rem; font-weight: 400; color: var(--text-dim); flex: 1;
    }
    .sb-item.active .sb-item-label { color: var(--text); font-weight: 500; }
    .sb-badge {
      font-family: var(--font-mono); font-size: 0.52rem;
      padding: 1px 6px; border-radius: 3px;
      background: var(--accent-dim); color: var(--accent2);
      border: 1px solid var(--border-accent);
    }
    .sb-badge.done { background: var(--green-dim); color: var(--green); border-color: rgba(16,185,129,0.25); }
    .sb-badge.locked { background: transparent; color: var(--text-mute); border-color: var(--border); }

    .sb-divider { height: 1px; background: var(--border); margin: 0.5rem 0; }

    .sb-footer {
      margin-top: auto; padding: 1rem 1.25rem;
      border-top: 1px solid var(--border);
    }
    .sb-progress-label {
      font-family: var(--font-mono); font-size: 0.58rem;
      color: var(--text-mute); text-transform: uppercase;
      letter-spacing: 0.1em; margin-bottom: 6px;
    }
    .sb-progress-bar {
      height: 3px; background: var(--border);
      border-radius: 2px; overflow: hidden;
    }
    .sb-progress-fill {
      height: 100%; background: linear-gradient(90deg, var(--accent), var(--teal));
      border-radius: 2px; transition: width 0.6s ease;
    }
    .sb-progress-pct {
      font-family: var(--font-head); font-weight: 700;
      font-size: 1.1rem; color: var(--accent2); margin-top: 4px;
    }

    /* TOPBAR */
    .topbar {
      position: fixed; top: 29px; left: var(--sidebar-w); right: 0;
      height: var(--topbar-h);
      background: rgba(11,13,20,0.92); backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      z-index: 199; display: flex; align-items: center;
      justify-content: space-between; padding: 0 1.75rem;
    }
    .topbar-left { display: flex; align-items: center; gap: 8px; }
    .topbar-crumb {
      font-family: var(--font-mono); font-size: 0.62rem;
      color: var(--text-mute); display: flex; align-items: center; gap: 6px;
    }
    .topbar-crumb .sep { color: var(--border-hi); }
    .topbar-crumb .current { color: var(--accent2); font-weight: 500; }
    .topbar-right { display: flex; align-items: center; gap: 10px; }
    .tb-pill {
      font-family: var(--font-mono); font-size: 0.58rem;
      padding: 3px 10px; border-radius: 20px;
      background: var(--accent-dim); border: 1px solid var(--border-accent);
      color: var(--accent2); letter-spacing: 0.06em; text-transform: uppercase;
    }
    .tb-pill.green { background: var(--green-dim); border-color: rgba(16,185,129,0.25); color: var(--green); }
    .tb-pill.amber { background: var(--amber-dim); border-color: rgba(245,158,11,0.25); color: var(--amber); }
    .tb-scenario {
      display: flex; align-items: center; gap: 6px;
      font-family: var(--font-mono); font-size: 0.6rem; color: var(--text-dim);
    }
    .tb-scenario-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); animation: logoPulse 2s ease-in-out infinite; }

    /* APP BODY */
    .app-body {
      margin-left: var(--sidebar-w);
      padding-top: calc(29px + var(--topbar-h));
      min-height: 100vh; position: relative; z-index: 1;
    }
    .page-wrap { padding: 2rem 2.5rem; max-width: 1100px; }

    /* BUTTONS */
    .btn {
      font-family: var(--font-head); font-weight: 600; font-size: 0.85rem;
      padding: 10px 22px; border-radius: var(--radius-sm);
      border: none; cursor: pointer; transition: all 0.2s;
      display: inline-flex; align-items: center; gap: 8px;
      text-decoration: none; letter-spacing: 0.01em;
    }
    .btn-primary { background: var(--accent); color: #fff; }
    .btn-primary:hover { background: #5558E3; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(99,102,241,0.35); }
    .btn-teal { background: var(--teal); color: #0B0D14; }
    .btn-teal:hover { background: #25BDA8; transform: translateY(-1px); }
    .btn-ghost { background: transparent; color: var(--text-dim); border: 1px solid var(--border-hi); }
    .btn-ghost:hover { background: rgba(255,255,255,0.05); color: var(--text); border-color: var(--border-accent); }
    .btn-sm { font-size: 0.78rem; padding: 7px 16px; }

    /* CARDS */
    .card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 1.25rem;
      position: relative; overflow: hidden;
    }
    .card-accent {
      background: var(--card); border: 1px solid var(--border-accent);
      border-radius: var(--radius); padding: 1.25rem;
    }
    .card-glow::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
    }
    .card-teal { border-color: rgba(45,212,191,0.2); }
    .card-teal::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--teal), transparent);
    }

    /* STAT CARDS */
    .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
    .stat-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 1.1rem 1.25rem;
      position: relative; overflow: hidden;
    }
    .stat-card::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    }
    .stat-card.teal::after { background: var(--teal); }
    .stat-card.accent::after { background: var(--accent); }
    .stat-card.amber::after { background: var(--amber); }
    .stat-card.red::after { background: var(--red); }
    .stat-label {
      font-family: var(--font-mono); font-size: 0.58rem;
      color: var(--text-mute); text-transform: uppercase;
      letter-spacing: 0.12em; margin-bottom: 6px;
    }
    .stat-val {
      font-family: var(--font-head); font-weight: 800;
      font-size: 1.8rem; line-height: 1; letter-spacing: -0.02em;
    }
    .stat-val.teal { color: var(--teal); }
    .stat-val.accent { color: var(--accent2); }
    .stat-val.amber { color: var(--amber); }
    .stat-val.red { color: var(--red); }
    .stat-val.green { color: var(--green); }
    .stat-change {
      font-family: var(--font-mono); font-size: 0.65rem;
      margin-top: 4px; display: flex; align-items: center; gap: 4px;
    }
    .stat-change.up { color: var(--green); }
    .stat-change.down { color: var(--red); }
    .stat-change.neutral { color: var(--text-mute); }

    /* SPLIT PANEL */
    .split-panel {
      display: grid; grid-template-columns: 1fr 1fr;
      border: 1px solid var(--border); border-radius: var(--radius);
      overflow: hidden;
    }
    .split-left { padding: 1.5rem; background: var(--bg2); border-right: 1px solid var(--border); }
    .split-right { padding: 1.5rem; background: var(--bg); }
    .split-label {
      font-family: var(--font-mono); font-size: 0.6rem;
      color: var(--text-mute); text-transform: uppercase;
      letter-spacing: 0.12em; margin-bottom: 1rem;
      padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);
    }

    /* SLIDER ROWS */
    .slider-row { margin-bottom: 1.1rem; }
    .slider-header {
      display: flex; justify-content: space-between;
      font-size: 0.82rem; color: var(--text-dim); margin-bottom: 6px;
    }
    .slider-val {
      font-family: var(--font-mono); font-weight: 500;
      font-size: 0.82rem; color: var(--text);
    }
    input[type=range] {
      width: 100%; -webkit-appearance: none; height: 4px;
      background: var(--bg4); border-radius: 2px; outline: none; cursor: pointer;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none; width: 16px; height: 16px;
      border-radius: 50%; background: var(--accent);
      border: 2px solid var(--bg); cursor: pointer;
      transition: transform 0.15s;
    }
    input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.2); }
    input[type=range].teal::-webkit-slider-thumb { background: var(--teal); }
    input[type=range].amber::-webkit-slider-thumb { background: var(--amber); }

    /* METRIC OUTPUT */
    .metric-output {
      background: var(--bg3); border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 1rem;
      margin-bottom: 10px;
    }
    .metric-output-label {
      font-family: var(--font-mono); font-size: 0.58rem;
      color: var(--text-mute); text-transform: uppercase;
      letter-spacing: 0.1em; margin-bottom: 4px;
    }
    .metric-output-val {
      font-family: var(--font-head); font-weight: 800;
      font-size: 2rem; line-height: 1; color: var(--teal);
    }
    .metric-output-val.red { color: var(--red); }
    .metric-output-val.amber { color: var(--amber); }
    .metric-output-val.green { color: var(--green); }
    .metric-output-val.accent { color: var(--accent2); }
    .metric-output-sub {
      font-family: var(--font-mono); font-size: 0.65rem;
      color: var(--text-mute); margin-top: 3px;
    }
    .metric-output-bar {
      height: 3px; background: var(--bg4); border-radius: 2px;
      margin-top: 8px; overflow: hidden;
    }
    .metric-output-fill {
      height: 100%; border-radius: 2px;
      transition: width 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }
    .metric-output-fill.teal { background: var(--teal); }
    .metric-output-fill.red { background: var(--red); }
    .metric-output-fill.amber { background: var(--amber); }
    .metric-output-fill.accent { background: var(--accent); }

    /* TAGS */
    .tag {
      display: inline-flex; align-items: center; gap: 4px;
      font-family: var(--font-mono); font-size: 0.58rem;
      padding: 3px 9px; border-radius: 4px; text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .tag-accent { background: var(--accent-dim); border: 1px solid var(--border-accent); color: var(--accent2); }
    .tag-teal { background: var(--teal-dim); border: 1px solid rgba(45,212,191,0.2); color: var(--teal); }
    .tag-amber { background: var(--amber-dim); border: 1px solid rgba(245,158,11,0.2); color: var(--amber); }
    .tag-red { background: var(--red-dim); border: 1px solid rgba(239,68,68,0.2); color: var(--red); }
    .tag-green { background: var(--green-dim); border: 1px solid rgba(16,185,129,0.2); color: var(--green); }
    .tag-purple { background: var(--purple-dim); border: 1px solid rgba(168,85,247,0.2); color: var(--purple); }
    .tag-muted { background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--text-mute); }

    /* TYPOGRAPHY */
    .page-eyebrow {
      font-family: var(--font-mono); font-size: 0.6rem;
      color: var(--accent2); text-transform: uppercase;
      letter-spacing: 0.15em; margin-bottom: 8px;
      display: flex; align-items: center; gap: 8px;
    }
    .page-eyebrow::before {
      content: ''; width: 20px; height: 1px; background: var(--accent);
    }
    .page-title {
      font-family: var(--font-head); font-weight: 800;
      font-size: clamp(1.6rem,3vw,2.2rem);
      letter-spacing: -0.03em; line-height: 1.2;
      color: var(--text); margin-bottom: 0.75rem;
    }
    .page-title em { font-weight: 300; font-style: italic; color: var(--accent2); }
    .page-title .teal { color: var(--teal); }
    .page-title .amber { color: var(--amber); }
    .page-desc {
      font-size: 0.92rem; color: var(--text-dim);
      line-height: 1.8; max-width: 560px; font-weight: 300;
    }
    .section-title {
      font-family: var(--font-head); font-weight: 700;
      font-size: 1.1rem; letter-spacing: -0.02em;
      color: var(--text); margin-bottom: 4px;
    }
    .mono-label {
      font-family: var(--font-mono); font-size: 0.6rem;
      color: var(--text-mute); text-transform: uppercase;
      letter-spacing: 0.12em;
    }

    /* DIVIDER */
    .divider { height: 1px; background: var(--border); margin: 1.5rem 0; }

    /* PAGE NAV */
    .page-nav {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border);
    }
    .page-nav-info { font-family: var(--font-mono); font-size: 0.6rem; color: var(--text-mute); }

    /* PROGRESS DOTS */
    .prog-wrap { display: flex; align-items: center; gap: 6px; }
    .prog-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border-hi); transition: all 0.3s; }
    .prog-dot.done { background: var(--green); }
    .prog-dot.active { background: var(--accent); width: 18px; border-radius: 3px; }

    /* CHART BARS */
    .chart-container {
      display: flex; align-items: flex-end; gap: 6px;
      height: 80px; padding: 0 4px;
    }
    .chart-bar-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
    .chart-bar-fill {
      width: 100%; border-radius: 4px 4px 0 0;
      transition: height 0.6s cubic-bezier(0.34,1.56,0.64,1);
      min-height: 4px;
    }
    .chart-bar-label { font-family: var(--font-mono); font-size: 0.52rem; color: var(--text-mute); text-align: center; }

    /* SCENARIO CARDS */
    .scenario-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
    .scenario-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius); overflow: hidden; cursor: pointer;
      transition: all 0.25s; position: relative;
    }
    .scenario-card:hover { border-color: var(--border-accent); transform: translateY(-3px); box-shadow: 0 8px 32px rgba(99,102,241,0.15); }
    .scenario-card.selected { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-dim); }
    .sc-visual { height: 80px; position: relative; overflow: hidden; }
    .sc-body { padding: 1rem; }
    .sc-industry { font-family: var(--font-mono); font-size: 0.55rem; color: var(--text-mute); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
    .sc-name { font-family: var(--font-head); font-weight: 700; font-size: 0.92rem; color: var(--text); margin-bottom: 6px; }
    .sc-desc { font-size: 0.78rem; color: var(--text-dim); line-height: 1.5; margin-bottom: 8px; }
    .sc-chips { display: flex; gap: 5px; flex-wrap: wrap; }
    .sc-chip { font-family: var(--font-mono); font-size: 0.55rem; padding: 2px 7px; border-radius: 3px; background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--text-mute); }

    /* SCORECARD TABLE */
    .scorecard { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
    .scorecard-header { background: var(--bg3); padding: 0.875rem 1.25rem; border-bottom: 1px solid var(--border); }
    .scorecard-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1.25rem; border-bottom: 1px solid var(--border); }
    .scorecard-row:last-child { border-bottom: none; }
    .scorecard-label { font-size: 0.85rem; color: var(--text-dim); }
    .scorecard-val { font-family: var(--font-mono); font-weight: 500; font-size: 0.85rem; }
    .scorecard-badge { font-family: var(--font-mono); font-size: 0.58rem; padding: 2px 8px; border-radius: 4px; }
    .scorecard-badge.critical { background: var(--red-dim); color: var(--red); border: 1px solid rgba(239,68,68,0.2); }
    .scorecard-badge.watch { background: var(--amber-dim); color: var(--amber); border: 1px solid rgba(245,158,11,0.2); }
    .scorecard-badge.healthy { background: var(--green-dim); color: var(--green); border: 1px solid rgba(16,185,129,0.2); }

    /* ANIMATIONS */
    @keyframes pageIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes countUp { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0.3)} 50%{box-shadow:0 0 20px 4px rgba(99,102,241,0.15)} }
    .anim-page { animation: pageIn 0.4s cubic-bezier(0.22,1,0.36,1); }
    .anim-slide { opacity:0; animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
    .anim-delay-1 { animation-delay: 0.1s; }
    .anim-delay-2 { animation-delay: 0.2s; }
    .anim-delay-3 { animation-delay: 0.3s; }
    .anim-delay-4 { animation-delay: 0.4s; }

    /* SCROLLBAR */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 2px; }

    /* HIGHLIGHT LINE */
    .hl-line {
      font-family: var(--font-head); font-weight: 800;
      font-size: clamp(1.3rem,2.5vw,1.8rem);
      letter-spacing: -0.025em; line-height: 1.3;
      color: var(--text); margin-bottom: 0.6rem;
    }
    .hl-line.teal { color: var(--teal); }
    .hl-line.accent { color: var(--accent2); }
    .hl-line.amber { color: var(--amber); }
    .hl-line.dim { font-weight: 300; font-size: clamp(1rem,1.8vw,1.2rem); color: var(--text-dim); }
  `,

  ticker_data: [
    { label: 'People Alpha', val: '+22%', cls: 'up' },
    { label: 'TDF Index', val: '3.3x', cls: 'accent' },
    { label: 'Promotion Alpha', val: '-8%', cls: 'down' },
    { label: 'Retention Alpha', val: '+18%', cls: 'up' },
    { label: 'Culture Yield', val: '₹94L', cls: 'up' },
    { label: 'Belonging Premium', val: '+34%', cls: 'up' },
    { label: 'L&D Alpha', val: '+62%', cls: 'up' },
    { label: 'HUMANCE Generated', val: '₹4.2Cr', cls: 'accent' },
    { label: 'Net People ROI', val: '466%', cls: 'up' },
    { label: 'Attrition Cost', val: '₹595K', cls: 'down' },
    { label: 'Hiring Alpha', val: '+14%', cls: 'up' },
    { label: 'OEI Score', val: '74%', cls: 'accent' },
    { label: 'IRD', val: '18%', cls: 'down' },
    { label: 'Signal Intelligence', val: '₹3.7Cr', cls: 'up' },
    { label: 'Trust Capital', val: '₹2.8Cr', cls: 'up' },
    { label: 'PCoB', val: '42%', cls: 'accent' },
  ],

  startTicker(id) {
    this.injectFavicon();
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/Revenue-Fluent/sw.js', { scope: '/Revenue-Fluent/' })
        .then(reg => console.log('[RF] SW registered:', reg.scope))
        .catch(err => console.log('[RF] SW failed:', err));
    }
    const el = document.getElementById(id);
    if (!el) return;
    const items = [...this.ticker_data, ...this.ticker_data];
    el.innerHTML = items.map(d =>
      `<div class="ticker-item">
        <span class="t-label">${d.label}</span>
        <span class="t-val ${d.cls}">${d.val}</span>
        <span class="t-dot"></span>
      </div>`
    ).join('');
  },

  nav: {
    items: [
      { id: 'home', icon: '⌂', label: 'Home', file: 'index.html' },
      { id: 'dashboard', icon: '▦', label: 'Command Centre', file: 'dashboard.html' },
      { id: 'divider' },
      { id: 'p1', icon: '⟳', label: 'Revenue Connect', file: 'p1-tool.html', badge: 'L1', pillar: true },
      { id: 'p2', icon: '◈', label: 'People Alpha', file: 'p2-tool.html', badge: 'L2', pillar: true },
      { id: 'p3', icon: '⬡', label: 'Team Architecture', file: 'p3-tool.html', badge: 'L3', pillar: true },
      { id: 'p4', icon: '◎', label: 'HUMANCE', file: 'p4-tool.html', badge: 'L4', pillar: true },
      { id: 'p5', icon: '◑', label: 'People P&L', file: 'p5-tool.html', badge: 'L5', pillar: true },
      { id: 'divider' },
      { id: 'learn', icon: '✸', label: 'Learning Hub', file: 'learn.html' },
      { id: 'cases', icon: '⌕', label: 'Case Studies', file: 'cases.html' },
      { id: 'simulate', icon: '▶', label: 'Simulation', file: 'simulate.html' },
      { id: 'game', icon: '◆', label: 'Challenge', file: 'game.html' },
      { id: 'divider' },
      { id: 'scenarios', icon: '▤', label: 'Scenario Library', file: 'scenarios.html' },
      { id: 'cert', icon: '✦', label: 'Certification', file: 'certification.html' },
      { id: 'divider' },
      { id: 'pricing', icon: '◎', label: 'Pricing', file: 'pricing.html' },
    ]
  },

  progress: {
    get() {
      try { return JSON.parse(localStorage.getItem('rf_progress') || '{}'); } catch { return {}; }
    },
    set(key) {
      const p = this.get(); p[key] = true;
      try { localStorage.setItem('rf_progress', JSON.stringify(p)); } catch {}
    },
    getPercent() {
      const p = this.get();
      const keys = ['p1','p2','p3','p4','p5'];
      return Math.round((keys.filter(k => p[k]).length / keys.length) * 100);
    }
  },

  renderSidebar(activeId) {
    const prog = this.progress.getPercent();
    let html = `
      <div class="sidebar">
        <a href="landing.html" class="sb-brand">
          <div class="sb-logo"><div class="sb-logo-dot"></div></div>
          <div class="sb-brand-text">Revenue<em>Fluent</em></div>
        </a>
        <div style="flex:1;overflow-y:auto;padding:0.5rem 0">`;

    for (const item of this.nav.items) {
      if (item.id === 'divider') {
        html += `<div class="sb-divider"></div>`;
        continue;
      }
      const active = item.id === activeId || activeId?.startsWith(item.id) ? 'active' : '';
      const progress = this.progress.get();
      const isDone = progress[item.id];
      const badgeClass = isDone ? 'done' : (item.pillar ? 'accent' : 'muted');
      const badge = item.badge ? `<span class="sb-badge ${badgeClass}">${isDone ? '✓' : item.badge}</span>` : '';
      html += `
        <a href="${item.file || '#'}" class="sb-item ${active}">
          <div class="sb-item-icon">${item.icon}</div>
          <span class="sb-item-label">${item.label}</span>
          ${badge}
        </a>`;
    }

    html += `</div>
        <div class="sb-footer">
          <div class="sb-progress-label">CRFP Progress</div>
          <div class="sb-progress-bar">
            <div class="sb-progress-fill" style="width:${prog}%"></div>
          </div>
          <div class="sb-progress-pct">${prog}%</div>
        </div>
      </div>`;
    return html;
  },

  renderTopbar(crumbs, pillEl) {
    const crumbHtml = crumbs.map((c, i) =>
      i < crumbs.length-1
        ? `<span>${c}</span><span class="sep">/</span>`
        : `<span class="current">${c}</span>`
    ).join('');
    return `
      <div class="topbar">
        <div class="topbar-left">
          <div class="topbar-crumb">${crumbHtml}</div>
        </div>
        <div class="topbar-right">
          ${pillEl || '<span class="tb-pill">CRFP Track</span>'}
        </div>
      </div>`;
  },

  // Animated counter
  animCount(el, target, suffix = '', duration = 1200) {
    const start = 0;
    const step = (target / duration) * 16;
    let current = start;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  },

  // Draw radar chart on canvas
  drawRadar(canvas, data, color = '#6366F1') {
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const r = Math.min(cx, cy) - 20;
    const n = data.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid
    for (let level = 1; level <= 4; level++) {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + (r * level / 4) * Math.cos(angle);
        const y = cy + (r * level / 4) * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axes
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Resolve color to hex (handle var() and named)
    const hexColor = (color && color.startsWith('#')) ? color : '#6366F1';
    const fillRgba = (hex) => {
      const h = hex.replace('#','');
      const r2 = parseInt(h.substring(0,2),16);
      const g2 = parseInt(h.substring(2,4),16);
      const b2 = parseInt(h.substring(4,6),16);
      return `rgba(${r2},${g2},${b2},0.15)`;
    };

    // Data polygon
    ctx.beginPath();
    data.forEach((d, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + r * (d.val / 100) * Math.cos(angle);
      const y = cy + r * (d.val / 100) * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fillRgba(hexColor);
    ctx.fill();
    ctx.strokeStyle = hexColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dots + labels
    data.forEach((d, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + r * (d.val / 100) * Math.cos(angle);
      const y = cy + r * (d.val / 100) * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = hexColor;
      ctx.fill();

      // Labels
      const lx = cx + (r + 16) * Math.cos(angle);
      const ly = cy + (r + 16) * Math.sin(angle);
      ctx.font = '10px DM Mono, monospace';
      ctx.fillStyle = 'rgba(236,238,255,0.4)';
      ctx.textAlign = Math.cos(angle) > 0.1 ? 'left' : Math.cos(angle) < -0.1 ? 'right' : 'center';
      ctx.fillText(d.label, lx, ly + 4);
    });
  },

};

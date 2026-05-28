// ══════════════════════════════════════════════════════
// REVENUE FLUENT — app.js
// Router · State Manager · Beat Engine
// ══════════════════════════════════════════════════════

const APP = {
  currentModule: null,
  currentBeatIndex: 0,
  progress: JSON.parse(localStorage.getItem('rf-progress') || '{}'),
};

// ── NAVIGATION ──────────────────────────────────────

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showHome() {
  showView('view-home');
  document.getElementById('nav-progress').style.display = 'none';
}

function showPillars() {
  document.querySelector('.pillars-row').scrollIntoView({ behavior: 'smooth' });
}

function startProgram() {
  APP.currentModule = P1_MODULE_A;
  APP.currentBeatIndex = 0;
  showView('view-module');
  document.getElementById('nav-progress').style.display = 'flex';
  renderProgressDots();
  renderBeat(0);
  updateSidebar(0);
}

function goToBeat(moduleIndex, beatIndex) {
  // For MVP: only Module A (index 0) is live
  if (moduleIndex === 0) {
    APP.currentBeatIndex = beatIndex;
    renderBeat(beatIndex);
    updateSidebar(moduleIndex);
  }
}

// ── BEAT ENGINE ─────────────────────────────────────

function renderBeat(index) {
  const module = APP.currentModule;
  if (!module || index >= module.beats.length) return;

  const beat = module.beats[index];
  const content = document.getElementById('module-content');

  content.innerHTML = beat.render();

  // Run onMount after render
  if (beat.onMount) {
    setTimeout(() => beat.onMount(), 50);
  }

  // Scroll to top of content
  content.scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextBeat() {
  const module = APP.currentModule;
  if (!module) return;

  const next = APP.currentBeatIndex + 1;
  if (next < module.beats.length) {
    APP.currentBeatIndex = next;
    renderBeat(next);
    renderProgressDots();
  }
}

function completeBeat() {
  // Save badge to localStorage
  const badge = APP.currentModule.badge;
  if (badge) {
    APP.progress[badge.id] = true;
    localStorage.setItem('rf-progress', JSON.stringify(APP.progress));
  }
  nextBeat();
}

// ── SIDEBAR ─────────────────────────────────────────

function updateSidebar(activeModuleIndex) {
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('sm-' + i);
    if (!el) continue;
    el.classList.remove('active');
    if (i === activeModuleIndex) el.classList.add('active');
  }
}

// ── PROGRESS DOTS ────────────────────────────────────

function renderProgressDots() {
  const module = APP.currentModule;
  if (!module) return;

  const container = document.getElementById('progress-dots');
  if (!container) return;

  container.innerHTML = module.beats.map((_, i) => `
    <div class="progress-dot ${
      i < APP.currentBeatIndex ? 'complete' :
      i === APP.currentBeatIndex ? 'active' : ''
    }"></div>
  `).join('');
}

// ── INIT ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Check for saved progress and restore if needed
  const savedBeat = parseInt(localStorage.getItem('rf-current-beat') || '0');
  // For now: always start fresh from home
  showHome();
});

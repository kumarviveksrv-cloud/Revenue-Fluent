// REVENUE FLUENT — PRACTITIONER PROFILE ENGINE
// Reads localStorage profile and applies personalisation across all pages

(function(global){

var PROFILE_KEY = 'rf_practitioner_profile';
var SKIP_KEY = 'rf_profile_skipped';

// ── GET PROFILE ───────────────────────────────────────────────────────────
function getProfile() {
  try {
    var raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function hasProfile() {
  return !!getProfile();
}

function clearProfile() {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(SKIP_KEY);
}

// ── REDIRECT TO PROFILE PAGE IF FIRST VISIT ──────────────────────────────
// Call this on home.html to redirect first-timers
function checkOnboarding() {
  var profile = getProfile();
  var skipped = localStorage.getItem(SKIP_KEY);
  if(!profile && !skipped) {
    window.location.href = 'profile.html';
  }
}

// ── EXPLANATION DEPTH ─────────────────────────────────────────────────────
// 0 = numbers only (CFO Level), 1 = brief, 2 = standard, 3 = full guidance
function getDepth() {
  var p = getProfile();
  return p ? p.explanationDepth : 2;
}

// ── ROLE LABEL ────────────────────────────────────────────────────────────
function getRoleShort() {
  var p = getProfile();
  if(!p) return null;
  var map = {'CHRO':'CHRO','HR Head':'HR HEAD','HRBP':'HRBP','Consultant':'ADVISOR'};
  return map[p.role] || p.role.toUpperCase();
}

// ── SIDEBAR BADGE ─────────────────────────────────────────────────────────
function injectSidebarBadge() {
  var p = getProfile();
  if(!p) return;
  var bottom = document.querySelector('.sb-bottom');
  if(!bottom) return;
  if(document.getElementById('profileBadge')) return;

  var roleShort = getRoleShort();
  var badge = document.createElement('div');
  badge.id = 'profileBadge';
  badge.style.cssText = 'padding:8px 18px 4px;display:flex;align-items:center;gap:8px;cursor:pointer;';
  badge.innerHTML =
    '<div style="width:7px;height:7px;border-radius:50%;background:#C0409A;flex-shrink:0"></div>'
    + '<div style="flex:1">'
    +   '<div style="font-family:var(--mono);font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:#D060B0">'+ roleShort +'</div>'
    +   '<div style="font-family:var(--mono);font-size:.58rem;color:#C8A8C0;margin-top:1px">'+ (p.context || '') +'</div>'
    + '</div>'
    + '<div id="profileEditBtn" title="Edit profile" style="font-size:.6rem;color:rgba(192,64,154,.35);transition:color .15s;padding:2px 4px;border-radius:3px">&#9998;</div>';
  badge.addEventListener('mouseenter', function(){
    var btn = document.getElementById('profileEditBtn');
    if(btn) btn.style.color = 'rgba(192,64,154,.7)';
  });
  badge.addEventListener('mouseleave', function(){
    var btn = document.getElementById('profileEditBtn');
    if(btn) btn.style.color = 'rgba(192,64,154,.35)';
  });
  badge.addEventListener('click', function(){
    window.location.href = 'profile.html?reset=1';
  });
  bottom.insertBefore(badge, bottom.firstChild);
}

// ── HOME PAGE PERSONALISATION ─────────────────────────────────────────────
function personaliseHome() {
  var p = getProfile();
  var container = document.getElementById('profileGreeting');
  if(!container) return;

  if(!p) {
    container.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">'
      + '<div style="font-size:.88rem;color:#C8A8C0">No profile set. <a href="profile.html" style="color:#D060B0;text-decoration:none;font-weight:500">Set up your practitioner profile &rarr;</a></div>'
      + '</div>';
    return;
  }

  // Recommended pillar
  var rec = p.recommendedPillar;

  // Role-specific welcome line
  var welcomeMap = {
    'CHRO': 'Welcome back, CHRO. Here is where your attention belongs today.',
    'HR Head': 'Welcome back. Your recommended starting point based on your challenge.',
    'HRBP': 'Welcome back. Here is the best place to start based on your priorities.',
    'Consultant': 'Welcome back. Your recommended entry point for your current engagement.',
  };
  var welcome = welcomeMap[p.role] || 'Welcome back.';

  // Challenge-specific line
  var challengeLines = {
    'Attrition': 'Attrition is costing more than most boards realise. The Value Ledger makes it visible.',
    'Talent Quality': 'The Talent Premium answers the question your CEO is actually asking: are we getting our money\'s worth?',
    'Board Credibility': 'The Human P&L is the document that changes the conversation permanently.',
    'Culture': 'Org Vitals names what you are already seeing. That is where to start.',
    'Growth Readiness': 'The Human Balance Sheet shows whether the org can actually carry its next stage of growth.',
  };
  var challengeLine = challengeLines[p.challenge] || '';

  container.innerHTML =
    '<div style="background:rgba(192,64,154,.05);border:1px solid rgba(192,64,154,.15);border-radius:14px;padding:20px 24px;">'
    + '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">'
    +   '<div style="flex:1">'
    +     '<div style="font-family:var(--mono);font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:#D060B0;margin-bottom:6px">Your Practitioner Profile</div>'
    +     '<div style="font-size:.95rem;font-weight:600;color:#EED8E8;margin-bottom:6px">'+welcome+'</div>'
    +     '<div style="font-size:.82rem;color:#C8A8C0;line-height:1.6;margin-bottom:14px">'+challengeLine+'</div>'
    +     '<a href="'+rec.file+'?scenario='+encodeURIComponent(p.recommendedScenario)+'" '
    +       'style="display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;'
    +       'padding:9px 18px;border-radius:8px;background:rgba(192,64,154,.15);color:#D060B0;border:1px solid rgba(192,64,154,.25);text-decoration:none;transition:all .2s">'
    +       '<span>'+rec.pillar+' &mdash; '+rec.name+'</span>'
    +       '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'
    +     '</a>'
    +   '</div>'
    +   '<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;flex-shrink:0">'
    +     '<div style="font-family:var(--mono);font-size:.62rem;background:rgba(192,64,154,.12);color:#D060B0;padding:4px 10px;border-radius:5px;border:1px solid rgba(192,64,154,.2)">'+getRoleShort()+'</div>'
    +     '<div style="font-family:var(--mono);font-size:.58rem;color:#C8A8C0">'+p.context+'</div>'
    +     '<button onclick="window.location.href=\'profile.html?reset=1\'" style="font-family:var(--mono);font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(192,64,154,.4);background:none;border:none;cursor:pointer;padding:4px 0;transition:color .15s" onmouseover="this.style.color=\'rgba(192,64,154,.7)\'" onmouseout="this.style.color=\'rgba(192,64,154,.4)\'">Edit profile</button>'
    +   '</div>'
    + '</div>'
    + '</div>';
}

// ── TOOL PAGE PERSONALISATION ─────────────────────────────────────────────
// Adjusts intelligence statement depth and framing based on profile
function personaliseToolPage(pillarId) {
  var p = getProfile();
  var container = document.getElementById('profileContext');
  if(!container) return;
  if(!p) { container.style.display = 'none'; return; }

  var depth = p.explanationDepth;
  var role = p.role;

  // Only show context strip for HRBP and Building confidence — others don't need it
  if(depth < 2) { container.style.display = 'none'; return; }

  // Pillar-specific context by challenge
  var contextMap = {
    'p1': {
      'Attrition': 'The Value Ledger is your primary tool. Every retention save, every exit cost — in currency.',
      'Board Credibility': 'This is your opening argument. The ledger puts a number on HR activity most boards have never seen.',
      'default': 'Every HR action has a financial entry. The Ledger is the audit your organisation has never run.',
    },
    'p2': {
      'Talent Quality': 'This is exactly what you need. The Talent Premium answers: are we getting our money\'s worth from our people decisions?',
      'Board Credibility': 'The TQP is the number that surprises CFOs most. It turns talent quality into a currency value.',
      'default': 'The Talent Premium quantifies the financial value of better-than-average people at the same cost.',
    },
    'p3': {
      'Culture': 'This is your starting point. Org Vitals names what you are already observing and puts structure around it.',
      'default': 'Five vital signs. Binary signals. Your organisation\'s DNA type — named for the first time.',
    },
    'p4': {
      'Board Credibility': 'This is the document you bring to the CEO meeting. Formatted exactly like what the CFO reads every month.',
      'Attrition': 'The Human P&L captures attrition cost as a P&L line. Flight Risk Liability sits below the operating line.',
      'default': 'HR has always had a P&L. This is the first time it has been formatted as one.',
    },
    'p5': {
      'Growth Readiness': 'The Growth Readiness Gap is a liability line on this balance sheet. This is your starting point.',
      'Board Credibility': 'Net Human Worth is the number the board has never seen. This is the capstone of the entire platform.',
      'default': 'Your organisation has always had a Human Balance Sheet. Nobody ever filed it. Here it is.',
    },
  };

  var map = contextMap[pillarId] || {};
  var text = map[p.challenge] || map['default'] || '';
  if(!text) { container.style.display = 'none'; return; }

  container.innerHTML =
    '<div style="background:rgba(192,64,154,.05);border-left:3px solid rgba(192,64,154,.4);border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:16px;display:flex;align-items:flex-start;gap:10px">'
    + '<div style="font-family:var(--mono);font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:#D060B0;white-space:nowrap;padding-top:2px">'+getRoleShort()+'</div>'
    + '<div style="font-size:.8rem;color:#C8A8C0;line-height:1.6">'+text+'</div>'
    + '</div>';
  container.style.display = 'block';
}

// Auto-gate PRO features by element pattern — runs on every tool page
function gateToolPage() {
  if(isPro()) {
    injectProBadge();
    return;
  }

  // Gate Show Workings triggers — lock style
  document.querySelectorAll('.sw-trigger').forEach(function(el) {
    el.style.opacity = '0.4';
    el.style.pointerEvents = 'none';
    el.title = 'PRO feature';
    // Add PRO badge next to button
    var badge = document.createElement('a');
    badge.href = 'pricing.html';
    badge.style.cssText = 'font-family:var(--mono,monospace);font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:#C0409A;background:rgba(192,64,154,.1);border:1px solid rgba(192,64,154,.25);padding:2px 7px;border-radius:4px;text-decoration:none;margin-left:6px;vertical-align:middle';
    badge.textContent = 'PRO';
    el.parentNode.insertBefore(badge, el.nextSibling);
  });

  // Gate HCI widget — blur + overlay
  var hciWidget = document.querySelector('.hci-widget');
  if(hciWidget) {
    var hciWrap = document.createElement('div');
    hciWrap.style.cssText = 'position:relative;';
    hciWidget.parentNode.insertBefore(hciWrap, hciWidget);
    hciWrap.appendChild(hciWidget);
    hciWidget.style.cssText += ';filter:blur(3px);pointer-events:none;user-select:none';
    var hciOverlay = document.createElement('div');
    hciOverlay.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,6,8,.8);border-radius:12px;z-index:10;gap:10px;cursor:pointer';
    hciOverlay.innerHTML = '<div style="font-family:var(--mono,monospace);font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:#C0409A;background:rgba(192,64,154,.12);border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px">PRO Feature</div>'
      + '<div style="font-family:var(--mono,monospace);font-size:.72rem;color:#C8A8C0;text-align:center;padding:0 24px">The Human Confidence Index adjusts outputs based on your professional judgement.</div>'
      + '<a href="pricing.html" style="font-family:var(--mono,monospace);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;text-decoration:none;border:1px solid rgba(192,64,154,.3);padding:5px 14px;border-radius:6px;margin-top:4px">Upgrade to PRO</a>';
    hciWrap.appendChild(hciOverlay);
  }

  // Gate profile context strip — replace style
  var profileCtx = document.getElementById('profileContext');
  if(profileCtx) {
    profileCtx.innerHTML = '<div style="background:rgba(192,64,154,.04);border-left:3px solid rgba(192,64,154,.3);border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:12px">'
      + '<div style="font-family:var(--mono,monospace);font-size:.75rem;color:#9070A0">Upgrade to PRO to personalise your experience based on your role and challenge.</div>'
      + '<a href="pricing.html" style="font-family:var(--mono,monospace);font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;text-decoration:none;white-space:nowrap;border:1px solid rgba(192,64,154,.25);padding:3px 10px;border-radius:4px;flex-shrink:0">Upgrade &rarr;</a>'
      + '</div>';
    profileCtx.style.display = 'block';
  }

  injectProBadge();
}

// ── MOBILE BOTTOM NAV ────────────────────────────────────────────────────
function injectMobileNav() {
  if(window.innerWidth > 760) return;
  if(document.getElementById('rf-mobile-nav')) return;

  var page = location.pathname.split('/').pop() || 'index.html';

  function isActive(pages) {
    return pages.indexOf(page) >= 0 ? 'rf-mn-active' : '';
  }

  var morePages = ['pricing.html','downloads.html','learn.html','humacity.html'];
  var moreActive = isActive(morePages);

  var nav = document.createElement('div');
  nav.id = 'rf-mobile-nav';
  nav.innerHTML =
    '<style>'
    +'#rf-mobile-nav{'
      +'position:fixed;bottom:0;left:0;right:0;z-index:1000;'
      +'background:rgba(10,6,8,.97);backdrop-filter:blur(20px);'
      +'border-top:1px solid rgba(192,64,154,.2);'
      +'display:flex;align-items:stretch;height:60px;'
      +'padding:0 4px;padding-bottom:env(safe-area-inset-bottom,0px);'
    +'}'
    +'.rf-mn-item{'
      +'flex:1;display:flex;flex-direction:column;align-items:center;'
      +'justify-content:center;gap:3px;text-decoration:none;'
      +'color:rgba(200,168,192,.45);transition:color .15s;'
      +'border:none;background:none;cursor:pointer;padding:0;'
      +'font-family:"Sora",sans-serif;'
    +'}'
    +'.rf-mn-item:hover,.rf-mn-item.rf-mn-active{color:#C0409A}'
    +'.rf-mn-icon{width:20px;height:20px;flex-shrink:0}'
    +'.rf-mn-label{font-size:.44rem;letter-spacing:.06em;text-transform:uppercase;font-family:"DM Mono",monospace;line-height:1}'
    +'#rf-more-drawer{'
      +'position:fixed;bottom:60px;left:0;right:0;z-index:999;'
      +'background:rgba(10,6,8,.98);backdrop-filter:blur(20px);'
      +'border-top:1px solid rgba(192,64,154,.25);'
      +'transform:translateY(100%);transition:transform .22s ease;'
      +'padding:8px 0 4px;'
    +'}'
    +'#rf-more-drawer.open{transform:translateY(0)}'
    +'.rf-drawer-item{'
      +'display:flex;align-items:center;gap:14px;'
      +'padding:14px 28px;text-decoration:none;'
      +'color:rgba(200,168,192,.7);transition:all .15s;'
      +'font-family:"Sora",sans-serif;font-size:.82rem;'
      +'border-bottom:1px solid rgba(192,64,154,.08);'
    +'}'
    +'.rf-drawer-item:last-child{border-bottom:none}'
    +'.rf-drawer-item:hover{color:#EED8E8;background:rgba(192,64,154,.06)}'
    +'.rf-drawer-item.active{color:#C0409A}'
    +'.rf-drawer-item svg{width:17px;height:17px;flex-shrink:0;opacity:.7}'
    +'#rf-drawer-backdrop{'
      +'display:none;position:fixed;inset:0;z-index:998;'
      +'background:rgba(0,0,0,.4);'
    +'}'
    +'</style>'
    // Backdrop
    +'<div id="rf-drawer-backdrop" onclick="rfCloseDrawer()"></div>'
    // Drawer
    +'<div id="rf-more-drawer">'
      +'<a href="downloads.html" class="rf-drawer-item'+(page==='downloads.html'?' active':'')+'">'
        +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>'
        +'Downloads'
      +'</a>'
      +'<a href="learn.html" class="rf-drawer-item'+(page==='learn.html'?' active':'')+'">'
        +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>'
        +'Learning Hub'
      +'</a>'
      +'<a href="humacity.html" class="rf-drawer-item'+(page==='humacity.html'?' active':'')+'">'
        +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>'
        +'Humacity'
      +'</a>'
      +'<a href="pricing.html" class="rf-drawer-item'+(page==='pricing.html'?' active':'')+'">'
        +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
        +'Pricing'
      +'</a>'
    +'</div>'
    // Nav bar
    +'<a href="home.html" class="rf-mn-item '+isActive(['home.html','index.html'])+'">'
      +'<svg class="rf-mn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>'
      +'<span class="rf-mn-label">Home</span>'
    +'</a>'
    +'<a href="scenario-library.html" class="rf-mn-item '+isActive(['scenario-library.html'])+'">'
      +'<svg class="rf-mn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>'
      +'<span class="rf-mn-label">Scenarios</span>'
    +'</a>'
    +'<a href="p1-tool.html" class="rf-mn-item '+isActive(['p1-tool.html','p2-tool.html','p3-tool.html','p4-tool.html','p5-tool.html'])+'">'
      +'<svg class="rf-mn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>'
      +'<span class="rf-mn-label">Tools</span>'
    +'</a>'
    +'<a href="profile.html" class="rf-mn-item '+isActive(['profile.html'])+'">'
      +'<svg class="rf-mn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>'
      +'<span class="rf-mn-label">Profile</span>'
    +'</a>'
    +'<button class="rf-mn-item '+moreActive+'" onclick="rfToggleDrawer()" id="rf-more-btn">'
      +'<svg class="rf-mn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>'
      +'<span class="rf-mn-label">More</span>'
    +'</button>';

  document.body.appendChild(nav);

  // Drawer toggle functions on window scope
  window.rfToggleDrawer = function() {
    var drawer = document.getElementById('rf-more-drawer');
    var backdrop = document.getElementById('rf-drawer-backdrop');
    var btn = document.getElementById('rf-more-btn');
    var isOpen = drawer.classList.contains('open');
    if(isOpen) {
      drawer.classList.remove('open');
      backdrop.style.display = 'none';
      btn.style.color = '';
    } else {
      drawer.classList.add('open');
      backdrop.style.display = 'block';
      btn.style.color = '#C0409A';
    }
  };
  window.rfCloseDrawer = function() {
    var drawer = document.getElementById('rf-more-drawer');
    var backdrop = document.getElementById('rf-drawer-backdrop');
    var btn = document.getElementById('rf-more-btn');
    drawer.classList.remove('open');
    backdrop.style.display = 'none';
    if(btn) btn.style.color = '';
  };

  var wrap = document.querySelector('.wrap');
  if(wrap) wrap.style.paddingBottom = 'calc(60px + env(safe-area-inset-bottom, 0px) + 16px)';
}

// ── INITIALISE ON PAGE LOAD ───────────────────────────────────────────────
function init() {
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      injectSidebarBadge();
      injectMobileNav();
    });
  } else {
    injectSidebarBadge();
    injectMobileNav();
  }
}

init();

// Export

// ── GLOBAL HCI STATE ──────────────────────────────────────────────────────
var HCI_KEY = 'rf_hci_global';

function getHCI() {
  try {
    var raw = localStorage.getItem(HCI_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { return null; }
}

function saveHCI(factors) {
  try {
    localStorage.setItem(HCI_KEY, JSON.stringify({
      factors: factors,
      updatedAt: new Date().toISOString()
    }));
  } catch(e) {}
}

function clearHCI() {
  localStorage.removeItem(HCI_KEY);
}

// Apply global HCI to a tool's HCI widget on page load
function applyGlobalHCI(toolId) {
  var hci = getHCI();
  if(!hci || !hci.factors) return;
  // Wait for HCI widget to be initialised
  var attempts = 0;
  var interval = setInterval(function() {
    attempts++;
    if(attempts > 20) { clearInterval(interval); return; }
    if(typeof _hci !== 'undefined' && _hci[toolId]) {
      clearInterval(interval);
      hci.factors.forEach(function(val, i) {
        if(val !== _hci[toolId].f[i]) {
          _hci[toolId].f[i] = val;
        }
      });
      if(typeof _hciR === 'function') _hciR(toolId);
    }
  }, 100);
}

// Save HCI from a tool back to global
function syncHCIToGlobal(toolId) {
  if(typeof _hci === 'undefined' || !_hci[toolId]) return;
  saveHCI(_hci[toolId].f.slice());
}

// ── PRO STATUS ENGINE ─────────────────────────────────────────────────────
var PRO_KEY = 'rf_pro_status';
var PRO_CODES = {
  'RFPRO-IN-2026': 'india',
  'RFPRO-GL-2026': 'global'
};

function isPro() {
  try {
    var raw = localStorage.getItem(PRO_KEY);
    if(!raw) return false;
    var data = JSON.parse(raw);
    return data && data.active === true;
  } catch(e) { return false; }
}

function getProTier() {
  try {
    var raw = localStorage.getItem(PRO_KEY);
    if(!raw) return null;
    var data = JSON.parse(raw);
    return data && data.active ? data.tier : null;
  } catch(e) { return null; }
}

function activateProCode(code) {
  var tier = PRO_CODES[code.toUpperCase().trim()];
  if(!tier) return false;
  try {
    localStorage.setItem(PRO_KEY, JSON.stringify({
      active: true,
      tier: tier,
      code: code.toUpperCase().trim(),
      activatedAt: new Date().toISOString()
    }));
    return true;
  } catch(e) { return false; }
}

function deactivatePro() {
  localStorage.removeItem(PRO_KEY);
}

// Apply PRO gate to an element — blurs it and adds upgrade overlay
function applyProGate(el, style, label) {
  if(isPro()) return; // already PRO, no gate needed
  style = style || 'blur'; // 'blur', 'lock', 'replace'
  label = label || 'PRO feature';

  if(style === 'blur') {
    el.style.cssText += ';filter:blur(4px);pointer-events:none;user-select:none;position:relative';
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,6,8,.75);border-radius:inherit;cursor:pointer;z-index:10;gap:8px';
    overlay.innerHTML = '<div style="font-family:var(--mono,monospace);font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:#C0409A;background:rgba(192,64,154,.12);border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px">PRO</div>'
      + '<div style="font-family:var(--mono,monospace);font-size:.65rem;color:#C8A8C0;text-align:center;padding:0 16px">'+label+'</div>'
      + '<a href="pricing.html" style="font-family:var(--mono,monospace);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;text-decoration:none;border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px;margin-top:4px">Upgrade to PRO</a>';
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;display:contents';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    wrapper.appendChild(overlay);
    wrapper.style.display = 'block';
    wrapper.style.position = 'relative';
  }

  if(style === 'lock') {
    el.style.cssText += ';opacity:.4;pointer-events:none;position:relative';
    var lockBadge = document.createElement('span');
    lockBadge.style.cssText = 'display:inline-flex;align-items:center;gap:4px;font-family:var(--mono,monospace);font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:#C0409A;background:rgba(192,64,154,.12);border:1px solid rgba(192,64,154,.25);padding:2px 8px;border-radius:4px;margin-left:8px;cursor:pointer;vertical-align:middle';
    lockBadge.innerHTML = '&#128274; PRO';
    lockBadge.onclick = function(){ window.location.href='pricing.html'; };
    el.parentNode.insertBefore(lockBadge, el.nextSibling);
  }

  if(style === 'replace') {
    el.innerHTML = '<div style="background:rgba(192,64,154,.06);border:1px solid rgba(192,64,154,.18);border-left:3px solid rgba(192,64,154,.5);border-radius:0 8px 8px 0;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:12px">'
      + '<div style="font-family:var(--mono,monospace);font-size:.78rem;color:#C8A8C0">'+label+'</div>'
      + '<a href="pricing.html" style="font-family:var(--mono,monospace);font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;text-decoration:none;white-space:nowrap;border:1px solid rgba(192,64,154,.3);padding:3px 10px;border-radius:4px;flex-shrink:0">Upgrade &rarr;</a>'
      + '</div>';
    el.style.display = 'block';
  }
}

// Gate all PRO elements on a page — call once after DOM ready
function applyAllProGates() {
  if(isPro()) return;
  // data-pro-gate="blur|lock|replace" data-pro-label="..."
  document.querySelectorAll('[data-pro-gate]').forEach(function(el) {
    var style = el.getAttribute('data-pro-gate') || 'lock';
    var label = el.getAttribute('data-pro-label') || 'Upgrade to PRO to access this feature';
    applyProGate(el, style, label);
  });
}

// Inject PRO badge into sidebar if active
function injectProBadge() {
  if(!isPro()) return;
  var bottom = document.querySelector('.sb-bottom');
  if(!bottom || document.getElementById('proBadge')) return;
  var tier = getProTier();
  var badge = document.createElement('div');
  badge.id = 'proBadge';
  badge.style.cssText = 'padding:6px 18px 8px;display:flex;align-items:center;gap:8px';
  badge.innerHTML = '<div style="width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#E0B830,#C48000);flex-shrink:0"></div>'
    + '<div style="font-family:var(--mono);font-size:.56rem;letter-spacing:.14em;text-transform:uppercase;background:linear-gradient(135deg,#E0B830,#C48000);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">PRO '+(tier==='india'?'India':'Global')+'</div>';
  bottom.insertBefore(badge, bottom.firstChild);
}

global.RFProfile = {
  getProfile: getProfile,
  hasProfile: hasProfile,
  clearProfile: clearProfile,
  checkOnboarding: checkOnboarding,
  getDepth: getDepth,
  getRoleShort: getRoleShort,
  personaliseHome: personaliseHome,
  personaliseToolPage: personaliseToolPage,
  injectSidebarBadge: injectSidebarBadge,
  getHCI: getHCI,
  saveHCI: saveHCI,
  clearHCI: clearHCI,
  applyGlobalHCI: applyGlobalHCI,
  syncHCIToGlobal: syncHCIToGlobal,
  isPro: isPro,
  getProTier: getProTier,
  activateProCode: activateProCode,
  deactivatePro: deactivatePro,
  applyProGate: applyProGate,
  applyAllProGates: applyAllProGates,
  injectProBadge: injectProBadge,
  gateToolPage: gateToolPage,
  injectMobileNav: injectMobileNav,
};

})(window);

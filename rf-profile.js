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
  function isActive(pages){ return pages.indexOf(page)>=0?'rf-mn-active':''; }

  var morePages=['pricing.html','downloads.html','learn.html','humacity.html'];
  var moreActive=isActive(morePages);

  // Inject styles into head
  var style=document.createElement('style');
  style.textContent=
    '#rf-mobile-nav{position:fixed;bottom:0;left:0;right:0;z-index:9000;'
    +'background:rgba(10,6,8,.97);backdrop-filter:blur(20px);'
    +'border-top:1px solid rgba(192,64,154,.25);'
    +'display:flex;align-items:stretch;height:60px;'
    +'padding-bottom:env(safe-area-inset-bottom,0px);}'
    +'.rf-mn-item{flex:1;display:flex;flex-direction:column;align-items:center;'
    +'justify-content:center;gap:3px;text-decoration:none;'
    +'color:rgba(200,168,192,.45);transition:color .15s;'
    +'border:none;background:none;cursor:pointer;padding:6px 2px 0;}'
    +'.rf-mn-item:active,.rf-mn-item.rf-mn-active{color:#C0409A}'
    +'.rf-mn-icon{width:20px;height:20px;display:block;}'
    +'.rf-mn-label{font-size:9px;letter-spacing:.05em;text-transform:uppercase;'
    +'font-family:"DM Mono",monospace;line-height:1;margin-top:2px;display:block;}'
    +'#rf-more-drawer{position:fixed;bottom:60px;left:0;right:0;z-index:8999;'
    +'background:rgba(10,6,8,.98);backdrop-filter:blur(20px);'
    +'border-top:1px solid rgba(192,64,154,.25);'
    +'transform:translateY(110%);transition:transform .22s ease;}'
    +'#rf-more-drawer.rf-open{transform:translateY(0);}'
    +'.rf-di{display:flex;align-items:center;gap:14px;padding:15px 28px;'
    +'text-decoration:none;color:rgba(200,168,192,.7);'
    +'border-bottom:1px solid rgba(192,64,154,.08);'
    +'font-family:"Sora",sans-serif;font-size:14px;}'
    +'.rf-di:last-child{border-bottom:none}'
    +'.rf-di.rf-da{color:#C0409A}'
    +'.rf-di svg{width:18px;height:18px;opacity:.7;flex-shrink:0;}'
    +'#rf-backdrop{display:none;position:fixed;inset:0;z-index:8998;'
    +'background:rgba(0,0,0,.45);}';
  document.head.appendChild(style);

  // Backdrop
  var backdrop=document.createElement('div');
  backdrop.id='rf-backdrop';
  backdrop.onclick=function(){rfCloseDrawer();};
  document.body.appendChild(backdrop);

  // Drawer
  var drawer=document.createElement('div');
  drawer.id='rf-more-drawer';
  drawer.innerHTML=
    '<a href="downloads.html" class="rf-di'+(page==='downloads.html'?' rf-da':'')+'">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/></svg>Downloads</a>'
    +'<a href="learn.html" class="rf-di'+(page==='learn.html'?' rf-da':'')+'">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 6v13M12 6C10.8 5.5 9.2 5 7.5 5S4.2 5.5 3 6v13c1.2-.5 2.8-1 4.5-1s3.3.5 4.5 1m0-13c1.2-.5 2.8-1 4.5-1s3.3.5 4.5 1v13c-1.2-.5-2.8-1-4.5-1s-3.3.5-4.5 1"/></svg>Learning Hub</a>'
    +'<a href="humacity.html" class="rf-di'+(page==='humacity.html'?' rf-da':'')+'">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>Humacity</a>'
    +'<a href="pricing.html" class="rf-di'+(page==='pricing.html'?' rf-da':'')+'">'
      +'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v4m0 4h.01"/></svg>Pricing</a>';
  document.body.appendChild(drawer);

  // Nav bar
  var nav=document.createElement('div');
  nav.id='rf-mobile-nav';

  function navItem(href, label, iconPath, activePages, isBtn) {
    var active=isActive(activePages)?'rf-mn-active':'';
    var tag=isBtn?'button':'a';
    var attrs=isBtn?'onclick="rfToggleDrawer()" id="rf-more-btn"':'href="'+href+'"';
    return '<'+tag+' class="rf-mn-item '+active+'" '+attrs+'>'
      +'<svg class="rf-mn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">'+iconPath+'</svg>'
      +'<span class="rf-mn-label">'+label+'</span>'
      +'</'+tag+'>';
  }

  nav.innerHTML=
    navItem('home.html','Home','<path d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>',['home.html','index.html'],false)
    +navItem('scenario-library.html','Scenarios','<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',['scenario-library.html'],false)
    +navItem('p1-tool.html','Tools','<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',['p1-tool.html','p2-tool.html','p3-tool.html','p4-tool.html','p5-tool.html'],false)
    +navItem('profile.html','Profile','<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',['profile.html'],false)
    +navItem('','More','<circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/>',morePages,true);

  document.body.appendChild(nav);

  window.rfToggleDrawer=function(){
    var d=document.getElementById('rf-more-drawer');
    var b=document.getElementById('rf-backdrop');
    var btn=document.getElementById('rf-more-btn');
    if(d.classList.contains('rf-open')){
      d.classList.remove('rf-open');b.style.display='none';
      if(btn)btn.style.color='';
    } else {
      d.classList.add('rf-open');b.style.display='block';
      if(btn)btn.style.color='#C0409A';
    }
  };
  window.rfCloseDrawer=function(){
    var d=document.getElementById('rf-more-drawer');
    var b=document.getElementById('rf-backdrop');
    var btn=document.getElementById('rf-more-btn');
    if(d)d.classList.remove('rf-open');
    if(b)b.style.display='none';
    if(btn)btn.style.color='';
  };

  var wrap=document.querySelector('.wrap');
  if(wrap) wrap.style.paddingBottom='76px';
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
  gateScenarioLibrary: gateScenarioLibrary,
  gateLearnPage: gateLearnPage,
  gateMyOrgPage: gateMyOrgPage,
  injectMobileNav: injectMobileNav,
};

})(window);

// ── FREE SCENARIO RESTRICTION ──────────────────────────────────────────────
// Free users get 3 scenarios only. PRO gets all 15.
var FREE_SCENARIOS = [
  'High-Growth Tech Startup',
  'Professional Services Firm',
  'Family Business'
];

function gateScenarioLibrary() {
  if(isPro()) return;
  // Add PRO lock overlay to non-free scenario cards
  // Called after renderGrid() has run
  var observer = new MutationObserver(function() {
    document.querySelectorAll('.card').forEach(function(card) {
      var name = card.getAttribute('data-name') || '';
      var isFree = FREE_SCENARIOS.some(function(f){ return name.indexOf(f) === 0 || name === f; });
      if(!isFree && !card.getAttribute('data-gated')) {
        card.setAttribute('data-gated','1');
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        // Dim the card
        card.querySelectorAll('.card-metrics,.card-hook').forEach(function(el){
          el.style.filter = 'blur(2px)';
          el.style.pointerEvents = 'none';
        });
        // PRO overlay
        var ov = document.createElement('div');
        ov.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,6,8,.82);gap:8px;cursor:pointer;z-index:5;border-radius:inherit;';
        ov.innerHTML = '<div style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:#C0409A;background:rgba(192,64,154,.12);border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px">PRO Scenario</div>'
          + '<div style="font-size:.75rem;color:#C8A8C0;text-align:center;padding:0 20px;font-family:var(--mono,\'DM Mono\',monospace)">'+name+'</div>'
          + '<a href="pricing.html" style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;text-decoration:none;border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px;margin-top:2px">Unlock with PRO</a>';
        ov.addEventListener('click', function(e){ e.stopPropagation(); window.location.href='pricing.html'; });
        card.appendChild(ov);
        // Block card click
        card.addEventListener('click', function(e){
          if(!isPro()){ e.stopPropagation(); window.location.href='pricing.html'; }
        }, true);
      }
    });
  });
  var grid = document.getElementById('grid');
  if(grid) observer.observe(grid, {childList:true, subtree:false});

  // Also inject a "3 of 15 free" notice above the grid
  setTimeout(function(){
    var gridEl = document.getElementById('grid');
    if(!gridEl || document.getElementById('scenFreeNotice')) return;
    var notice = document.createElement('div');
    notice.id = 'scenFreeNotice';
    notice.style.cssText = 'background:rgba(192,64,154,.07);border:1px solid rgba(192,64,154,.2);border-radius:8px;padding:10px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;';
    notice.innerHTML = '<div style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.68rem;color:#C8A8C0"><b style="color:#C0409A">3 of 15 scenarios</b> available on Free. PRO unlocks all 15.</div>'
      + '<a href="pricing.html" style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;text-decoration:none;border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px;white-space:nowrap">Upgrade to PRO</a>';
    gridEl.parentNode.insertBefore(notice, gridEl);
  }, 300);
}

// ── LEARNING HUB GATE ─────────────────────────────────────────────────────
// Free users see 3 articles. Articles 4+ are PRO.
var FREE_ARTICLE_IDS = ['a1','a2','a3'];

function gateLearnPage() {
  if(isPro()) return;
  setTimeout(function(){
    // Gate all non-free article cards
    document.querySelectorAll('.ac-card, .article-card, [data-id]').forEach(function(card){
      var id = card.getAttribute('data-id') || '';
      if(FREE_ARTICLE_IDS.indexOf(id) >= 0) return; // free article
      if(card.getAttribute('data-gated')) return;
      card.setAttribute('data-gated','1');
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.style.cursor = 'pointer';
      // Blur content
      card.querySelectorAll('h2,h3,p,.ac-body,.article-body,.hook,.subtitle').forEach(function(el){
        el.style.filter = 'blur(3px)';
        el.style.pointerEvents = 'none';
        el.style.userSelect = 'none';
      });
      var ov = document.createElement('div');
      ov.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(10,6,8,.8);gap:8px;border-radius:inherit;z-index:5;';
      ov.innerHTML = '<div style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.55rem;letter-spacing:.16em;text-transform:uppercase;color:#C0409A;background:rgba(192,64,154,.12);border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px">PRO Article</div>'
        + '<a href="pricing.html" style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;text-decoration:none;border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px">Unlock with PRO</a>';
      card.appendChild(ov);
      card.addEventListener('click', function(e){ if(!isPro()) window.location.href='pricing.html'; });
    });

    // Inject free notice
    var grid = document.querySelector('.articles-grid,.learn-grid,#articleGrid,.rest-grid');
    if(grid && !document.getElementById('learnFreeNotice')){
      var notice = document.createElement('div');
      notice.id = 'learnFreeNotice';
      notice.style.cssText = 'background:rgba(192,64,154,.07);border:1px solid rgba(192,64,154,.2);border-radius:8px;padding:10px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;gap:12px;';
      notice.innerHTML = '<div style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.68rem;color:#C8A8C0"><b style="color:#C0409A">3 of 20 articles</b> available on Free. PRO unlocks all 20 including white papers and case studies.</div>'
        + '<a href="pricing.html" style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;text-decoration:none;border:1px solid rgba(192,64,154,.3);padding:4px 12px;border-radius:4px;white-space:nowrap">Upgrade to PRO</a>';
      grid.parentNode.insertBefore(notice, grid);
    }
  }, 400);
}

// ── MY ORG PAGE GATE ──────────────────────────────────────────────────────
// My Org is a PRO feature — free users see a gate overlay
function gateMyOrgPage() {
  if(isPro()) return;
  var main = document.querySelector('.main');
  if(!main) return;
  // Hide all form content and show upgrade message
  var cards = main.querySelectorAll('.section-card, .flow-section, .btn-row');
  cards.forEach(function(el){ el.style.display = 'none'; });
  var saveBanner = document.getElementById('saveBanner');
  if(saveBanner) saveBanner.style.display = 'none';

  var gate = document.createElement('div');
  gate.style.cssText = 'background:var(--bg2,#100810);border:1px solid rgba(192,64,154,.25);border-radius:16px;padding:48px 40px;text-align:center;max-width:520px;margin:0 auto;';
  gate.innerHTML = '<div style="font-family:var(--mono,\'DM Mono\',monospace);font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:#C0409A;margin-bottom:16px">PRO Feature</div>'
    + '<h2 style="font-size:1.4rem;font-weight:700;color:#E8E6E0;margin-bottom:12px">My Org</h2>'
    + '<p style="font-size:.88rem;color:#B8C8E8;line-height:1.7;margin-bottom:12px">Enter your organisation\'s financial data once. Every tool reads from it. L1 outputs flow into L4. L4 net profit flows into L5.</p>'
    + '<p style="font-size:.82rem;color:#9AB8D8;line-height:1.7;margin-bottom:24px">My Org is the shared assumptions layer that makes the five pillars a connected financial suite rather than five standalone tools.</p>'
    + '<a href="pricing.html" style="display:inline-block;background:#C0409A;color:#fff;font-family:var(--mono,\'DM Mono\',monospace);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;padding:12px 28px;border-radius:8px;">Upgrade to PRO</a>'
    + '<div style="margin-top:14px;font-size:.75rem;color:rgba(192,64,154,.5);font-family:var(--mono,\'DM Mono\',monospace)">Cancel any time</div>';
  main.appendChild(gate);
}

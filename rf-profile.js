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

// ── INITIALISE ON PAGE LOAD ───────────────────────────────────────────────
function init() {
  // Always inject sidebar badge if profile exists
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      injectSidebarBadge();
    });
  } else {
    injectSidebarBadge();
  }
}

init();

// Export
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
};

})(window);

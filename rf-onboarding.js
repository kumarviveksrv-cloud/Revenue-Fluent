/* rf-onboarding.js — Revenue Fluent self-onboarding system v1.0
   Layer A: Persistent "How to use this tool" panel (open by default, collapsible, remembers state)
   Layer B: Contextual "?" hint tooltips on every non-obvious element
   Injected into all tool pages via single <script> tag. Zero changes to tool HTML required.
*/

(function(){
'use strict';

// ── STORAGE KEYS ────────────────────────────────────────────────────────────
var OB_PREFIX = 'rf_ob_';
function panelKey(tool){ return OB_PREFIX + tool + '_panel'; }
function hintKey(id){ return OB_PREFIX + 'hint_' + id; }

// ── TOOL DEFINITIONS ────────────────────────────────────────────────────────
var TOOLS = {
  'p1-tool': {
    name: 'The Value Ledger',
    code: 'L1',
    tagline: 'Every HR decision has a financial entry. Most organisations just never wrote it down.',
    steps: [
      { title: 'Pick your scenario first', body: 'The scenario selector at the top sets the world you are working in — 750 employees, real data, real currency. Every calculation runs from this choice. Start here before touching anything else.' },
      { title: 'Read the headline number', body: 'The central output is the HR Return Ratio: for every unit of currency spent on HR, this organisation returns X. That is the number you bring to the board. Everything else supports it.' },
      { title: 'Explore the four entry categories', body: 'Revenue-Generating, Cost-Saving, Development, and Culture. Each category breaks down what HR actually returned in that area. The ledger speaks in currency, not scores.' },
      { title: 'Adjust with the HCI', body: 'The Human Confidence Index lets you apply your professional judgement to the base calculation. Data reflects the past. Your HCI reflects right now. Answer four Yes/No questions — the coefficient adjusts automatically.' },
      { title: 'Download and take it in', body: 'The Excel model is pre-formatted with all formulas. Replace the sample data with your organisation\'s numbers and you have a board-ready Value Ledger in under an hour.' }
    ],
    connects_to: 'L4 Human P&L — the Value Ledger feeds your revenue and cost entries directly into the Human P&L statement.'
  },
  'p2-tool': {
    name: 'The Talent Premium',
    code: 'L2',
    tagline: 'Every organisation pays for people. Almost none know what they are actually getting back.',
    steps: [
      { title: 'Pick your scenario first', body: 'Select the scenario that most closely matches your organisation — industry, size, geography. Every verdict is computed from real employee data in that scenario.' },
      { title: 'Read the Talent Quality Premium', body: 'The headline number is the financial value of having better-than-average people at the same cost. If you hired 50 average performers at the same salary bill, you would get less. The TQP is the difference.' },
      { title: 'Read the five verdict areas', body: 'Promotion Accuracy, Manager Quality, Hiring Quality, Selective Retention, HiPo Identification. Each scores 0–100 with a Strong / Watch / Weak signal and a market benchmark. These are the five decisions with the most financially serious consequences.' },
      { title: 'Check the benchmark strip', body: 'Your Talent Quality Premium compared against the market average across all same-currency scenarios. Honest, transparent, and computed from real data — not a made-up industry average.' },
      { title: 'Use the forward projection', body: 'Select the levers you plan to act on. The model shows projected TQP uplift under Conservative, Your Assessment, and Optimistic scenarios. This is a scenario, not a forecast — and that distinction matters when you present it.' }
    ],
    connects_to: 'L4 Human P&L — the Talent Premium flows into the Performance Uplift line of the Human P&L as the quality adjustment on your people investment.'
  },
  'p3-tool': {
    name: 'Org Vitals',
    code: 'L3',
    tagline: 'You have been calling it culture. It is actually five vital signs — and some of yours are critical.',
    steps: [
      { title: 'Pick your scenario first', body: 'Select the scenario that matches your org context. The vital signs are computed from observable patterns in the real employee data — not from a questionnaire you fill in.' },
      { title: 'Read the five vital signs', body: 'Leadership Pulse, Fear Index, Middle Layer Health, Execution Fidelity, HR Mirror. Each reads as Healthy, Warning, or Critical. These are not engagement scores — they are binary observable signals.' },
      { title: 'Look at the diagnosis', body: 'Every Warning or Critical signal gets a causal chain: what you are seeing (the symptom) and what is causing it (the root). Two lines maximum. The connection that changes how you see your org.' },
      { title: 'Find your org character type', body: 'The five vital sign readings combine to produce one of eight organisational DNA types. Named, described in plain language. What your org is good at, what it is vulnerable to, and what breaks first under pressure.' },
      { title: 'Run the simulation', body: 'Select which interventions to implement. The tool shows combined financial impact, what your org character type shifts to after 6 months, and the cost of doing nothing.' }
    ],
    connects_to: 'L4 Human P&L — Org Vitals feeds the operational health adjustments into your Human P&L. A Critical vital sign shows up as a liability on the Human Balance Sheet.'
  },
  'p4-tool': {
    name: 'The Human P&L',
    code: 'L4',
    tagline: 'HR has always had a P&L. Nobody taught them to read it.',
    steps: [
      { title: 'Pick your scenario first', body: 'The Human P&L is a full financial statement computed from real scenario data — 50 employees, real salaries, real performance ratings. Select the scenario that matches your context.' },
      { title: 'Read it like a P&L', body: 'Human Revenue at the top. Human COGS below. Gross Margin in the middle. OpEx, Operating Profit, Adjustments, Net at the bottom. The moment it looks like what a CFO reads every month, it stops being an HR document.' },
      { title: 'Understand the Adjustments section', body: 'Flight Risk Liability, Skill Debt Provision, Growth Readiness Gap. These are below-the-line items that make this statement different from any financial P&L. The honest reckoning that builds CFO trust.' },
      { title: 'Look at The Ratio', body: 'For every unit of currency invested in HR, this organisation returns X. This is the number that changes the boardroom conversation permanently. It auto-calculates from every line above it.' },
      { title: 'Apply the HCI and download', body: 'Adjust for current org conditions with the HCI, then download the board-ready PDF or the pre-formatted Excel model to populate with your organisation\'s real numbers.' }
    ],
    connects_to: 'L5 Human Balance Sheet — the Human P&L feeds into the Balance Sheet as retained human earnings. L1, L2, and L3 all feed line items into this statement.'
  },
  'p5-tool': {
    name: 'The Human Balance Sheet',
    code: 'L5',
    tagline: 'Your organisation has always had a Human Balance Sheet. Nobody ever filed it. Here it is.',
    steps: [
      { title: 'Pick your scenario first', body: 'The Human Balance Sheet is the capstone of the entire platform. Every other pillar feeds into it. Select your scenario — the balance sheet computes from all five pillars simultaneously.' },
      { title: 'Read the two columns', body: 'Human Assets on the left. Human Liabilities on the right. This is a literal balance sheet — the same format a CFO files every quarter, applied to human capital for the first time. The form is the argument.' },
      { title: 'Understand the assets', body: 'Talent Equity, Institutional Knowledge, Organisational Learning Velocity, Relationship Capital, Culture Asset. Each has a computed value in currency — not a score, not a rating.' },
      { title: 'Understand the liabilities', body: 'Talent Concentration Risk, Skill Debt, Growth Readiness Gap, Culture Liability, Workforce Obsolescence Risk. These are the human liabilities your organisation carries that have never appeared on any financial statement.' },
      { title: 'Read Net Human Worth', body: 'Total Human Assets minus Total Human Liabilities. This is the number the CEO and CFO have never seen but always needed. It belongs at the bottom of the statement — and in your next board presentation.' }
    ],
    connects_to: 'This is the capstone. It receives from L1 (Value Ledger), L2 (Talent Premium), L3 (Org Vitals), and L4 (Human P&L). There is no further pillar — this is the complete picture.'
  }
};

// ── HINT DEFINITIONS ────────────────────────────────────────────────────────
var HINTS = {
  'hci': {
    title: 'Human Confidence Index',
    body: 'A named coefficient (0.70–1.30) that adjusts the base calculation for current org conditions. Data reflects the past. Your HCI reflects right now. Answer four Yes/No questions — each YES adds 0.15 to the base of 0.70.'
  },
  'scenario': {
    title: 'Scenario selector',
    body: 'Selects which of the 15 modelled organisations powers the calculations. 750 employees total, 50 per scenario, across 10 industries and 7 currencies. Pick the one closest to your org context.'
  },
  'benchmark': {
    title: 'Benchmark strip',
    body: 'Compares your result against the market average across all same-currency scenarios in the Revenue Fluent dataset. Transparent, computed, and auditable — not a made-up industry figure.'
  },
  'show-workings': {
    title: 'Show workings',
    body: 'Reveals the exact formula, data inputs, and assumptions behind every number. The answer to the CFO who asks "how did you calculate that?" within 7 seconds of seeing any figure.'
  },
  'verdict': {
    title: 'Verdict area score',
    body: 'Scored 0–100. Strong = 70+, Watch = 50–69, Weak = below 50. Each score is computed from real employee data — not self-assessment. The market average for each area is shown for comparison.'
  },
  'forward-projection': {
    title: 'Forward projection',
    body: 'A scenario model, not a forecast. Select the levers you plan to act on. Conservative = 85% of uplift, Your Assessment = full uplift, Optimistic = 115%. Change Y/N to include or exclude levers.'
  },
  'tqp': {
    title: 'Talent Quality Premium',
    body: 'The financial value of having better-than-average people at the same cost. If you hired 50 average performers at the same salary bill, you would get baseline output. The TQP is what you get above that baseline.'
  },
  'vital-sign': {
    title: 'Vital sign reading',
    body: 'Binary observable signals only — Healthy, Warning, or Critical. YES always means healthy. These are not engagement scores or survey averages. They are specific, nameable forces acting on your organisation right now.'
  },
  'the-ratio': {
    title: 'The HR Return Ratio',
    body: 'For every unit of currency invested in HR, this organisation returns X. This is the central output of Revenue Fluent. The number that reframes HR from cost centre to investment with a return.'
  },
  'net-human-worth': {
    title: 'Net Human Worth',
    body: 'Total Human Assets minus Total Human Liabilities. The human capital equivalent of net worth on a financial balance sheet. Computed from real data. Never appeared on any financial statement before.'
  },
  'hci-scenarios': {
    title: 'HCI scenario table',
    body: 'Three automatic views: Conservative (HCI −0.15), Your Assessment (your HCI), Optimistic (HCI +0.15). CFOs already know how to read three-column scenario tables — this is how investment banks present DCF models.'
  },
  'placement': {
    title: 'Employee placement',
    body: 'Star, High Performer, High Potential, Core Performer, or Inconsistent Performer. Derived from performance and potential scores in the scenario data. Powers every calculation across all five pillars.'
  }
};

// ── DETECT CURRENT TOOL ─────────────────────────────────────────────────────
function detectTool(){
  var path = window.location.pathname;
  var match = path.match(/(p[1-5]-tool)/);
  return match ? match[1] : null;
}

// ── CSS ─────────────────────────────────────────────────────────────────────
function injectCSS(){
  if(document.getElementById('rf-ob-css')) return;
  var style = document.createElement('style');
  style.id = 'rf-ob-css';
  style.textContent = [
    /* PANEL */
    '.rf-ob-panel{margin-bottom:28px;border-radius:14px;overflow:hidden;border:1px solid rgba(192,64,154,.2);background:rgba(16,8,16,.95)}',
    '.rf-ob-panel-header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;cursor:pointer;transition:background .15s;border-bottom:1px solid rgba(192,64,154,.1)}',
    '.rf-ob-panel-header:hover{background:rgba(192,64,154,.06)}',
    '.rf-ob-panel-left{display:flex;align-items:center;gap:10px}',
    '.rf-ob-panel-icon{width:28px;height:28px;border-radius:6px;background:rgba(192,64,154,.15);border:1px solid rgba(192,64,154,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#D060B0;font-size:14px;font-weight:700;font-family:monospace}',
    '.rf-ob-panel-title{font-family:\'DM Mono\',monospace;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:#D060B0;font-weight:500}',
    '.rf-ob-panel-sub{font-size:.74rem;color:#C8A8C0;margin-top:2px}',
    '.rf-ob-toggle{font-family:\'DM Mono\',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(192,64,154,.5);display:flex;align-items:center;gap:6px;transition:color .15s}',
    '.rf-ob-toggle:hover{color:rgba(192,64,154,.8)}',
    '.rf-ob-toggle svg{transition:transform .2s}',
    '.rf-ob-toggle.open svg{transform:rotate(180deg)}',
    '.rf-ob-panel-body{display:none;padding:20px 24px 24px}',
    '.rf-ob-panel-body.open{display:block}',
    /* STEPS */
    '.rf-ob-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:20px}',
    '.rf-ob-step{background:rgba(40,8,28,.6);border:1px solid rgba(192,64,154,.1);border-radius:10px;padding:14px 16px;position:relative}',
    '.rf-ob-step-num{font-family:\'DM Mono\',monospace;font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(192,64,154,.4);margin-bottom:6px}',
    '.rf-ob-step-title{font-size:.82rem;font-weight:600;color:#EED8E8;margin-bottom:6px;line-height:1.3}',
    '.rf-ob-step-body{font-size:.76rem;color:#C8A8C0;line-height:1.6}',
    /* TAGLINE + CONNECTS */
    '.rf-ob-tagline{font-style:italic;font-size:.88rem;color:#D8B8D0;line-height:1.6;padding:12px 16px;background:rgba(192,64,154,.05);border-left:2px solid rgba(192,64,154,.3);border-radius:0 8px 8px 0;margin-bottom:14px}',
    '.rf-ob-connects{font-family:\'DM Mono\',monospace;font-size:.6rem;letter-spacing:.08em;color:rgba(184,115,51,.7);padding:8px 14px;background:rgba(184,115,51,.06);border:1px solid rgba(184,115,51,.12);border-radius:6px;line-height:1.5}',
    '.rf-ob-connects b{color:#E8C87A}',
    /* HINTS */
    '.rf-ob-hint-btn{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:rgba(192,64,154,.12);border:1px solid rgba(192,64,154,.25);color:#D060B0;font-size:10px;font-weight:700;font-family:monospace;cursor:pointer;vertical-align:middle;margin-left:5px;flex-shrink:0;transition:all .15s;line-height:1;user-select:none}',
    '.rf-ob-hint-btn:hover{background:rgba(192,64,154,.25);border-color:rgba(192,64,154,.5)}',
    '.rf-ob-tooltip{position:fixed;z-index:9999;max-width:280px;background:#1A0818;border:1px solid rgba(192,64,154,.35);border-radius:10px;padding:12px 14px;box-shadow:0 8px 32px rgba(0,0,0,.6);pointer-events:none;opacity:0;transition:opacity .15s}',
    '.rf-ob-tooltip.visible{opacity:1}',
    '.rf-ob-tooltip-title{font-family:\'DM Mono\',monospace;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:#D060B0;margin-bottom:6px}',
    '.rf-ob-tooltip-body{font-size:.78rem;color:#D8B8D0;line-height:1.6}',
    /* FLOATING HELP BUTTON */
    '.rf-ob-fab{position:fixed;bottom:24px;right:24px;z-index:500;display:flex;align-items:center;gap:8px;padding:9px 16px;background:rgba(192,64,154,.15);border:1px solid rgba(192,64,154,.3);border-radius:40px;cursor:pointer;transition:all .2s;font-family:\'DM Mono\',monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;backdrop-filter:blur(10px)}',
    '.rf-ob-fab:hover{background:rgba(192,64,154,.25);border-color:rgba(192,64,154,.5)}',
    '.rf-ob-fab svg{width:14px;height:14px;flex-shrink:0}',
    '@media(max-width:760px){.rf-ob-steps{grid-template-columns:1fr}.rf-ob-fab{bottom:16px;right:16px}}'
  ].join('');
  document.head.appendChild(style);
}

// ── BUILD PANEL ──────────────────────────────────────────────────────────────
function buildPanel(toolId, def){
  var key = panelKey(toolId);
  var closed = false;
  try{ closed = localStorage.getItem(key) === 'closed'; }catch(e){}

  var stepsHtml = def.steps.map(function(s, i){
    return '<div class="rf-ob-step">'
      + '<div class="rf-ob-step-num">Step ' + (i+1) + ' of ' + def.steps.length + '</div>'
      + '<div class="rf-ob-step-title">' + s.title + '</div>'
      + '<div class="rf-ob-step-body">' + s.body + '</div>'
      + '</div>';
  }).join('');

  var panel = document.createElement('div');
  panel.className = 'rf-ob-panel';
  panel.id = 'rfObPanel';
  panel.innerHTML =
    '<div class="rf-ob-panel-header" id="rfObHeader">'
      + '<div class="rf-ob-panel-left">'
        + '<div class="rf-ob-panel-icon">?</div>'
        + '<div>'
          + '<div class="rf-ob-panel-title">How to use ' + def.name + '</div>'
          + '<div class="rf-ob-panel-sub">' + def.code + ' &middot; ' + def.steps.length + '-step guide &middot; Always available</div>'
        + '</div>'
      + '</div>'
      + '<div class="rf-ob-toggle' + (closed ? '' : ' open') + '" id="rfObToggle">'
        + (closed ? 'Show guide' : 'Hide guide')
        + '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M4 6l4 4 4-4"/></svg>'
      + '</div>'
    + '</div>'
    + '<div class="rf-ob-panel-body' + (closed ? '' : ' open') + '" id="rfObBody">'
      + '<div class="rf-ob-tagline">' + def.tagline + '</div>'
      + '<div class="rf-ob-steps">' + stepsHtml + '</div>'
      + '<div class="rf-ob-connects"><b>Connects to:</b> ' + def.connects_to + '</div>'
    + '</div>';

  // Toggle behaviour
  panel.querySelector('#rfObHeader').addEventListener('click', function(){
    var body = document.getElementById('rfObBody');
    var toggle = document.getElementById('rfObToggle');
    var isOpen = body.classList.contains('open');
    body.classList.toggle('open', !isOpen);
    toggle.classList.toggle('open', !isOpen);
    toggle.textContent = isOpen ? 'Show guide' : 'Hide guide';
    // Re-append the chevron svg (textContent wipes it)
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 16 16');
    svg.setAttribute('fill','none');
    svg.setAttribute('stroke','currentColor');
    svg.setAttribute('stroke-width','1.5');
    svg.setAttribute('width','12');
    svg.setAttribute('height','12');
    var path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d','M4 6l4 4 4-4');
    svg.appendChild(path);
    toggle.appendChild(svg);
    try{ localStorage.setItem(key, isOpen ? 'closed' : 'open'); }catch(e){}
  });

  return panel;
}

// ── INJECT PANEL ─────────────────────────────────────────────────────────────
function injectPanel(toolId){
  var def = TOOLS[toolId];
  if(!def) return;

  function tryInject(){
    // Inject after the scenario switch row, before HCI wrap
    var wrap = document.querySelector('.wrap');
    var hciWrap = document.querySelector('.hci-wrap');
    var uploadNudge = document.getElementById('uploadNudge');
    if(!wrap) return false;

    var panel = buildPanel(toolId, def);
    var insertBefore = hciWrap || uploadNudge;
    if(insertBefore && insertBefore.parentNode === wrap){
      wrap.insertBefore(panel, insertBefore);
    } else {
      // fallback: insert after switch row
      var switchEl = wrap.querySelector('.switch');
      if(switchEl && switchEl.nextSibling){
        wrap.insertBefore(panel, switchEl.nextSibling);
      } else {
        wrap.appendChild(panel);
      }
    }
    return true;
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', tryInject);
  } else {
    if(!tryInject()){
      setTimeout(tryInject, 300);
    }
  }
}

// ── FLOATING HELP BUTTON ─────────────────────────────────────────────────────
function injectFAB(toolId){
  var def = TOOLS[toolId];
  if(!def) return;

  function tryFAB(){
    if(document.getElementById('rfObFab')) return;
    var fab = document.createElement('div');
    fab.className = 'rf-ob-fab';
    fab.id = 'rfObFab';
    fab.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v4M8 11v1"/></svg> How to use this tool';
    fab.addEventListener('click', function(){
      var panel = document.getElementById('rfObPanel');
      var body = document.getElementById('rfObBody');
      var toggle = document.getElementById('rfObToggle');
      if(!panel || !body) return;
      // Open the panel and scroll to it
      body.classList.add('open');
      if(toggle){ toggle.className = 'rf-ob-toggle open'; }
      panel.scrollIntoView({behavior:'smooth', block:'start'});
      try{ localStorage.setItem(panelKey(toolId), 'open'); }catch(e){}
    });
    document.body.appendChild(fab);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', tryFAB);
  } else {
    tryFAB();
  }
}

// ── TOOLTIP ENGINE ───────────────────────────────────────────────────────────
var _tooltip = null;
var _tooltipTimeout = null;

function getTooltip(){
  if(_tooltip) return _tooltip;
  _tooltip = document.createElement('div');
  _tooltip.className = 'rf-ob-tooltip';
  _tooltip.id = 'rfObTooltip';
  _tooltip.innerHTML = '<div class="rf-ob-tooltip-title" id="rfObTTTitle"></div><div class="rf-ob-tooltip-body" id="rfObTTBody"></div>';
  document.body.appendChild(_tooltip);
  return _tooltip;
}

function showTooltip(btn, hintId){
  var hint = HINTS[hintId];
  if(!hint) return;
  var tt = getTooltip();
  document.getElementById('rfObTTTitle').textContent = hint.title;
  document.getElementById('rfObTTBody').textContent = hint.body;

  var rect = btn.getBoundingClientRect();
  var ttW = 280;
  var left = rect.left + rect.width/2 - ttW/2;
  if(left < 8) left = 8;
  if(left + ttW > window.innerWidth - 8) left = window.innerWidth - ttW - 8;
  var top = rect.top - 8;
  // If too close to top, show below
  if(top < 100) top = rect.bottom + 8;
  else top = rect.top - 120;

  tt.style.left = left + 'px';
  tt.style.top = top + 'px';
  tt.style.maxWidth = ttW + 'px';
  tt.classList.add('visible');
}

function hideTooltip(){
  if(_tooltip) _tooltip.classList.remove('visible');
}

function makeHintBtn(hintId){
  var btn = document.createElement('span');
  btn.className = 'rf-ob-hint-btn';
  btn.textContent = '?';
  btn.setAttribute('aria-label', 'Help: ' + (HINTS[hintId] ? HINTS[hintId].title : hintId));
  btn.addEventListener('mouseenter', function(){ showTooltip(btn, hintId); });
  btn.addEventListener('mouseleave', function(){ hideTooltip(); });
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    var tt = getTooltip();
    if(tt.classList.contains('visible')){ hideTooltip(); }
    else { showTooltip(btn, hintId); }
  });
  return btn;
}

// ── INJECT HINT BUTTONS ──────────────────────────────────────────────────────
function injectHints(){
  function tryHints(){
    // HCI title
    var hciTitle = document.querySelector('.hci-title');
    if(hciTitle && !hciTitle.querySelector('.rf-ob-hint-btn')){
      hciTitle.appendChild(makeHintBtn('hci'));
    }

    // Scenario label
    var switchLabel = document.querySelector('.switch label');
    if(switchLabel && !switchLabel.querySelector('.rf-ob-hint-btn')){
      switchLabel.appendChild(makeHintBtn('scenario'));
    }

    // Show workings triggers (added dynamically, so use MutationObserver below)
    // For now, also do a delayed pass
    addHintsToApp();
  }

  function addHintsToApp(){
    // Section heads with step numbers — identify by context
    document.querySelectorAll('.sec-head h2').forEach(function(el){
      if(el.querySelector('.rf-ob-hint-btn')) return;
      var text = el.textContent.toLowerCase();
      if(text.indexOf('benchmark') > -1) el.appendChild(makeHintBtn('benchmark'));
      else if(text.indexOf('verdict') > -1) el.appendChild(makeHintBtn('verdict'));
      else if(text.indexOf('projection') > -1) el.appendChild(makeHintBtn('forward-projection'));
    });

    // TQP label
    document.querySelectorAll('.tqp-lbl').forEach(function(el){
      if(!el.querySelector('.rf-ob-hint-btn')) el.appendChild(makeHintBtn('tqp'));
    });

    // HCI scenario table header
    document.querySelectorAll('.hci-scenarios th.yours').forEach(function(el){
      if(!el.querySelector('.rf-ob-hint-btn')) el.appendChild(makeHintBtn('hci-scenarios'));
    });

    // Benchmark section
    document.querySelectorAll('.bm-title').forEach(function(el){
      if(!el.querySelector('.rf-ob-hint-btn')) el.appendChild(makeHintBtn('benchmark'));
    });

    // Verdict cards
    document.querySelectorAll('.vc-vs-market').forEach(function(el){
      if(!el.querySelector('.rf-ob-hint-btn')) el.appendChild(makeHintBtn('verdict'));
    });

    // Forward projection title
    document.querySelectorAll('.proj-title').forEach(function(el){
      if(!el.querySelector('.rf-ob-hint-btn')) el.appendChild(makeHintBtn('forward-projection'));
    });

    // The Ratio
    document.querySelectorAll('.ratio-lbl, .tqp-ratio').forEach(function(el){
      if(!el.querySelector('.rf-ob-hint-btn')) el.appendChild(makeHintBtn('the-ratio'));
    });

    // Vital sign headings
    document.querySelectorAll('.vs-label, .vital-label').forEach(function(el){
      if(!el.querySelector('.rf-ob-hint-btn')) el.appendChild(makeHintBtn('vital-sign'));
    });

    // Net human worth
    document.querySelectorAll('.nhw-label, .net-worth-label').forEach(function(el){
      if(!el.querySelector('.rf-ob-hint-btn')) el.appendChild(makeHintBtn('net-human-worth'));
    });
  }

  // Run on DOMContentLoaded + after app renders (tools render async)
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      tryHints();
      // Also run after a delay for async-rendered content
      setTimeout(addHintsToApp, 800);
      setTimeout(addHintsToApp, 2000);
    });
  } else {
    tryHints();
    setTimeout(addHintsToApp, 800);
    setTimeout(addHintsToApp, 2000);
  }

  // MutationObserver for dynamically rendered app content
  var observer = new MutationObserver(function(mutations){
    var relevant = mutations.some(function(m){
      return m.target.id === 'app' || (m.target.closest && m.target.closest('#app'));
    });
    if(relevant) setTimeout(addHintsToApp, 100);
  });

  function startObserver(){
    var app = document.getElementById('app');
    if(app){
      observer.observe(app, {childList:true, subtree:true});
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }

  // Close tooltip on scroll/click elsewhere
  document.addEventListener('click', function(e){
    if(!e.target.classList.contains('rf-ob-hint-btn')) hideTooltip();
  });
  document.addEventListener('scroll', hideTooltip, true);
}

// ── INIT ─────────────────────────────────────────────────────────────────────
function init(){
  var toolId = detectTool();
  if(!toolId) return; // Not a tool page — do nothing

  injectCSS();
  injectPanel(toolId);
  injectFAB(toolId);
  injectHints();
}

// Run immediately if possible, otherwise wait for DOM
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})();

// ── PAGE DEFINITIONS (non-tool pages) ───────────────────────────────────────
;(function(){
'use strict';

var PAGE_DEFS = {
  'home': {
    name: 'Revenue Fluent Home',
    icon: '⌂',
    tagline: 'Your command centre. Start here every session.',
    steps: [
      { title: 'Start with a scenario', body: 'The scenario selector determines which of the 15 modelled organisations powers every calculation. Pick the one closest to your context — industry, size, geography. You can change it at any time.' },
      { title: 'The five pillars are your tools', body: 'Each card in the strip below is a complete intelligence tool. L1 Value Ledger through L5 Human Balance Sheet. Together they form HR\'s complete financial statement suite. You do not need to use all five in one session.' },
      { title: 'Recommended starting sequence', body: 'First time: start with L1 Value Ledger to understand the return ratio, then L2 Talent Premium to see what your people quality is actually worth. L3, L4, L5 build on those foundations.' },
      { title: 'Free vs PRO scenarios', body: 'Free access includes three scenarios: High-Growth Tech Startup, Professional Services Firm, and Family Business. PRO unlocks all 15 scenarios, Show Workings, HCI, Excel downloads, and PDF reports.' },
      { title: 'Your data, your numbers', body: 'The platform runs on a modelled dataset by default. Upload your own CSV via Upload Your Data, or enter your org details in My Org, and every calculation runs on your actual numbers.' }
    ],
    connects_to: 'Home connects to everything. It is the hub — not a tool itself, but the entry point for all five pillars.'
  },
  'scenario-library': {
    name: 'Scenario Library',
    icon: '▤',
    tagline: 'Fifteen organisations. Pick the world that matches yours.',
    steps: [
      { title: 'What is a scenario?', body: 'Each scenario is a fully modelled organisation — 50 employees, real salary data, real performance ratings, a complete reporting chain, one currency, one city. The calculations across all five pillars run from this data.' },
      { title: 'How to pick yours', body: 'Pick the scenario closest to your org — by industry first, then size, then geography. You do not need an exact match. The Professional Services Firm works for most consulting or advisory businesses. The Family Business works for owner-led mid-sized companies.' },
      { title: 'Free vs PRO scenarios', body: 'Three scenarios are free: High-Growth Tech Startup (USD, San Francisco), Professional Services Firm (GBP, London), and Family Business (INR, Mumbai). The remaining 12 are PRO. Locked cards show a PRO badge.' },
      { title: 'Scenario carries across tools', body: 'When you select a scenario here, it follows you across all five pillars. The URL carries a ?scenario= parameter — every tool reads it automatically. You do not need to reselect.' },
      { title: 'Run multiple scenarios', body: 'Open different scenarios in different browser tabs to compare. A CHRO presenting to a board can show the same analysis across three different org contexts in the same session.' }
    ],
    connects_to: 'Every scenario card links directly into the five tool pages. The scenario you pick here becomes the data foundation for every calculation you run.'
  },
  'upload': {
    name: 'Upload Your Data',
    icon: '↑',
    tagline: 'Stop modelling someone else\'s org. Run it on yours.',
    steps: [
      { title: 'What this does', body: 'Upload a CSV of your own employee data and every calculation across all five pillars runs on your actual numbers — your salaries, your performance ratings, your org structure. The platform\'s 750-person dataset is replaced by yours.' },
      { title: 'Required CSV format', body: 'Your CSV must include: employee ID, name, department, role, grade, performance rating (1-5), potential rating (1-5), tenure (years), salary, currency, location, manager name, hire date. Column headers must match exactly.' },
      { title: 'Performance and potential ratings', body: 'Rate performance 1–5 and potential 1–5. The platform derives placement (Star, High Performer, High Potential, Core Performer, Inconsistent Performer) from these two scores automatically. You do not assign placements directly.' },
      { title: 'File requirements', body: 'Accepts .csv files only. Maximum 10MB. Up to 10,000 employees. One currency per upload — if your org spans multiple currencies, upload the primary entity first.' },
      { title: 'Data privacy', body: 'Your uploaded data is stored in your browser session only. It is never sent to any server, never stored externally, and disappears when you close the tab. The platform is designed for confidential org data.' }
    ],
    connects_to: 'Once uploaded, your data powers all five pillars simultaneously. Every metric, every ratio, every verdict area runs from your actual employee population.'
  },
  'profile': {
    name: 'My Profile',
    icon: '◉',
    tagline: 'Five questions that change everything you see.',
    steps: [
      { title: 'Why this exists', body: 'Revenue Fluent gives genuinely different experiences based on who you are — not just different numbers, but different depth, framing, and recommended journey. A CHRO and an HRBP should not get the same experience from the same platform.' },
      { title: 'Your role shapes depth', body: 'A CHRO gets a direct, numbers-first experience. An HRBP gets more guided context at each step. The calculations never change — what changes is how much the platform explains them and in what order.' },
      { title: 'Your primary challenge shapes emphasis', body: 'If your primary challenge is board credibility, the platform emphasises the board-ready outputs and the financial language. If it is attrition, L1 Value Ledger and Selective Retention in L2 get priority framing.' },
      { title: 'Financial confidence shapes explanation depth', body: 'Set to Building and the platform explains every financial concept in plain language. Set to Present to CFO regularly and the platform skips the explainers and goes straight to the numbers.' },
      { title: 'Complete it once, remembered always', body: 'Your profile is stored in your browser. It persists across sessions. Update it any time your role or context changes — the platform adapts immediately.' }
    ],
    connects_to: 'Your profile shapes the recommended starting pillar, the depth of explanation across all five tools, and the framing of every intelligence statement.'
  },
  'myorg': {
    name: 'My Org',
    icon: '▦',
    tagline: 'Your organisation\'s context. Applied to every calculation.',
    steps: [
      { title: 'What My Org does', body: 'Enter your organisation\'s actual context — size, industry, currency, HCI settings — and the platform applies this context to every calculation. The numbers on the tools reflect your world, not a generic scenario.' },
      { title: 'Organisation size matters', body: 'Org size affects which of the 15 scenarios gets pre-selected as your closest match, and adjusts the benchmark comparisons in L2 Talent Premium to compare you against similarly-sized organisations.' },
      { title: 'Currency setting', body: 'Set your primary currency and every output displays in that currency automatically — ratio numbers, premium values, balance sheet figures. You do not need to convert manually.' },
      { title: 'HCI global setting', body: 'Set your Human Confidence Index here and it applies across all five tools simultaneously. You can still override it tool-by-tool, but the global setting is your starting point every session.' },
      { title: 'Save and it persists', body: 'My Org data is stored in your browser. Once saved, it applies automatically on every visit without re-entry. Update it when your org context changes — headcount, restructure, leadership change.' }
    ],
    connects_to: 'My Org context flows into all five pillars. It is the organisational layer that sits above the scenario data and personalises every output to your specific context.'
  }
};

// ── PAGE DETECTION ───────────────────────────────────────────────────────────
function detectPage(){
  var path = window.location.pathname;
  var file = path.split('/').pop().replace('.html','');
  return PAGE_DEFS[file] ? file : null;
}

// ── STORAGE KEY ──────────────────────────────────────────────────────────────
var OB_PREFIX = 'rf_ob_';
function panelKey(page){ return OB_PREFIX + page + '_panel'; }

// ── BUILD PAGE PANEL ─────────────────────────────────────────────────────────
function buildPagePanel(pageId, def){
  var key = panelKey(pageId);
  var closed = false;
  try{ closed = localStorage.getItem(key) === 'closed'; }catch(e){}

  var stepsHtml = def.steps.map(function(s, i){
    return '<div class="rf-ob-step">'
      + '<div class="rf-ob-step-num">Step ' + (i+1) + ' of ' + def.steps.length + '</div>'
      + '<div class="rf-ob-step-title">' + s.title + '</div>'
      + '<div class="rf-ob-step-body">' + s.body + '</div>'
      + '</div>';
  }).join('');

  var panel = document.createElement('div');
  panel.className = 'rf-ob-panel';
  panel.id = 'rfObPanel';
  panel.style.cssText = 'margin:0 0 28px;';
  panel.innerHTML =
    '<div class="rf-ob-panel-header" id="rfObHeader">'
      + '<div class="rf-ob-panel-left">'
        + '<div class="rf-ob-panel-icon">?</div>'
        + '<div>'
          + '<div class="rf-ob-panel-title">How to use ' + def.name + '</div>'
          + '<div class="rf-ob-panel-sub">' + def.steps.length + '-step guide &middot; Always available</div>'
        + '</div>'
      + '</div>'
      + '<div class="rf-ob-toggle' + (closed ? '' : ' open') + '" id="rfObToggle">'
        + (closed ? 'Show guide' : 'Hide guide')
        + '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="12" height="12"><path d="M4 6l4 4 4-4"/></svg>'
      + '</div>'
    + '</div>'
    + '<div class="rf-ob-panel-body' + (closed ? '' : ' open') + '" id="rfObBody">'
      + '<div class="rf-ob-tagline">' + def.tagline + '</div>'
      + '<div class="rf-ob-steps">' + stepsHtml + '</div>'
      + '<div class="rf-ob-connects"><b>Note:</b> ' + def.connects_to + '</div>'
    + '</div>';

  // Toggle
  panel.querySelector('#rfObHeader').addEventListener('click', function(){
    var body = document.getElementById('rfObBody');
    var toggle = document.getElementById('rfObToggle');
    var isOpen = body.classList.contains('open');
    body.classList.toggle('open', !isOpen);
    toggle.classList.toggle('open', !isOpen);
    toggle.textContent = isOpen ? 'Show guide' : 'Hide guide';
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 16 16');svg.setAttribute('fill','none');
    svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.5');
    svg.setAttribute('width','12');svg.setAttribute('height','12');
    var path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d','M4 6l4 4 4-4');svg.appendChild(path);toggle.appendChild(svg);
    try{ localStorage.setItem(key, isOpen ? 'closed' : 'open'); }catch(e){}
  });

  return panel;
}

// ── INJECT INTO PAGE ─────────────────────────────────────────────────────────
function injectPagePanel(pageId){
  var def = PAGE_DEFS[pageId];
  if(!def) return;

  function tryInject(){
    if(document.getElementById('rfObPanel')) return true;

    var panel = buildPagePanel(pageId, def);

    // Different injection strategies per page
    if(pageId === 'home'){
      // Inject inside <main> before the hero section
      var main = document.querySelector('main.main') || document.querySelector('.main');
      var hero = document.querySelector('.hero');
      if(main && hero){
        main.insertBefore(panel, hero);
        return true;
      }
    }

    if(pageId === 'scenario-library' || pageId === 'upload' || pageId === 'profile'){
      // Inject inside .wrap after the page title h1
      var wrap = document.querySelector('.wrap');
      var h1 = wrap ? wrap.querySelector('h1') : null;
      if(wrap && h1 && h1.nextSibling){
        wrap.insertBefore(panel, h1.nextSibling);
        return true;
      } else if(wrap){
        wrap.insertBefore(panel, wrap.firstChild);
        return true;
      }
    }

    if(pageId === 'myorg'){
      // Inject inside .main before the first section-card
      var main = document.querySelector('.main') || document.querySelector('main');
      var firstCard = main ? main.querySelector('.section-card') : null;
      if(main && firstCard){
        main.insertBefore(panel, firstCard);
        return true;
      } else if(main){
        var h1 = main.querySelector('h1');
        if(h1 && h1.nextSibling) main.insertBefore(panel, h1.nextSibling);
        else if(h1) h1.parentNode.insertBefore(panel, h1.nextSibling);
        return true;
      }
    }

    return false;
  }

  // FAB button
  function injectPageFAB(){
    if(document.getElementById('rfObFab')) return;
    var fab = document.createElement('div');
    fab.className = 'rf-ob-fab';
    fab.id = 'rfObFab';
    fab.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><circle cx="8" cy="8" r="6"/><path d="M8 5v4M8 11v1"/></svg> How to use this page';
    fab.addEventListener('click', function(){
      var panel = document.getElementById('rfObPanel');
      var body = document.getElementById('rfObBody');
      if(!panel || !body) return;
      body.classList.add('open');
      var toggle = document.getElementById('rfObToggle');
      if(toggle){ toggle.className = 'rf-ob-toggle open'; }
      panel.scrollIntoView({behavior:'smooth', block:'start'});
      try{ localStorage.setItem(panelKey(pageId), 'open'); }catch(e){}
    });
    document.body.appendChild(fab);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){
      if(!tryInject()) setTimeout(tryInject, 400);
      injectPageFAB();
    });
  } else {
    if(!tryInject()) setTimeout(tryInject, 400);
    injectPageFAB();
  }
}

// ── INIT PAGE ONBOARDING ─────────────────────────────────────────────────────
var pageId = detectPage();
if(pageId){
  // CSS already injected by tool onboarding if on same page,
  // but these are separate pages so inject it here too
  if(!document.getElementById('rf-ob-css')){
    var style = document.createElement('style');
    style.id = 'rf-ob-css';
    style.textContent = [
      '.rf-ob-panel{margin-bottom:28px;border-radius:14px;overflow:hidden;border:1px solid rgba(192,64,154,.2);background:rgba(16,8,16,.95)}',
      '.rf-ob-panel-header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;cursor:pointer;transition:background .15s;border-bottom:1px solid rgba(192,64,154,.1)}',
      '.rf-ob-panel-header:hover{background:rgba(192,64,154,.06)}',
      '.rf-ob-panel-left{display:flex;align-items:center;gap:10px}',
      '.rf-ob-panel-icon{width:28px;height:28px;border-radius:6px;background:rgba(192,64,154,.15);border:1px solid rgba(192,64,154,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#D060B0;font-size:14px;font-weight:700;font-family:monospace}',
      '.rf-ob-panel-title{font-family:\'DM Mono\',monospace;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:#D060B0;font-weight:500}',
      '.rf-ob-panel-sub{font-size:.74rem;color:#C8A8C0;margin-top:2px}',
      '.rf-ob-toggle{font-family:\'DM Mono\',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(192,64,154,.5);display:flex;align-items:center;gap:6px;transition:color .15s}',
      '.rf-ob-toggle:hover{color:rgba(192,64,154,.8)}',
      '.rf-ob-toggle svg{transition:transform .2s}',
      '.rf-ob-toggle.open svg{transform:rotate(180deg)}',
      '.rf-ob-panel-body{display:none;padding:20px 24px 24px}',
      '.rf-ob-panel-body.open{display:block}',
      '.rf-ob-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:20px}',
      '.rf-ob-step{background:rgba(40,8,28,.6);border:1px solid rgba(192,64,154,.1);border-radius:10px;padding:14px 16px}',
      '.rf-ob-step-num{font-family:\'DM Mono\',monospace;font-size:.56rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(192,64,154,.4);margin-bottom:6px}',
      '.rf-ob-step-title{font-size:.82rem;font-weight:600;color:#EED8E8;margin-bottom:6px;line-height:1.3}',
      '.rf-ob-step-body{font-size:.76rem;color:#C8A8C0;line-height:1.6}',
      '.rf-ob-tagline{font-style:italic;font-size:.88rem;color:#D8B8D0;line-height:1.6;padding:12px 16px;background:rgba(192,64,154,.05);border-left:2px solid rgba(192,64,154,.3);border-radius:0 8px 8px 0;margin-bottom:14px}',
      '.rf-ob-connects{font-family:\'DM Mono\',monospace;font-size:.6rem;letter-spacing:.08em;color:rgba(184,115,51,.7);padding:8px 14px;background:rgba(184,115,51,.06);border:1px solid rgba(184,115,51,.12);border-radius:6px;line-height:1.5}',
      '.rf-ob-connects b{color:#E8C87A}',
      '.rf-ob-fab{position:fixed;bottom:24px;right:24px;z-index:500;display:flex;align-items:center;gap:8px;padding:9px 16px;background:rgba(192,64,154,.15);border:1px solid rgba(192,64,154,.3);border-radius:40px;cursor:pointer;transition:all .2s;font-family:\'DM Mono\',monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:#D060B0;backdrop-filter:blur(10px)}',
      '.rf-ob-fab:hover{background:rgba(192,64,154,.25);border-color:rgba(192,64,154,.5)}',
      '.rf-ob-fab svg{width:14px;height:14px;flex-shrink:0}',
      '@media(max-width:760px){.rf-ob-steps{grid-template-columns:1fr}.rf-ob-fab{bottom:16px;right:16px}}'
    ].join('');
    document.head.appendChild(style);
  }
  injectPagePanel(pageId);
}

})();

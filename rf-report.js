// REVENUE FLUENT — BOARD REPORT GENERATOR
// Generates a printable HTML report for each pillar

(function(global){

function fmt(sym, n) {
  var abs = Math.abs(n), sign = n < 0 ? '-' : '';
  if (sym === '₹') {
    if (abs >= 10000000) return sign + sym + (abs/10000000).toFixed(2) + 'Cr';
    if (abs >= 100000)   return sign + sym + (abs/100000).toFixed(1) + 'L';
    if (abs >= 1000)     return sign + sym + Math.round(abs/1000) + 'K';
    return sign + sym + Math.round(abs);
  }
  if (abs >= 1000000000) return sign + sym + (abs/1000000000).toFixed(2) + 'B';
  if (abs >= 1000000)    return sign + sym + (abs/1000000).toFixed(2) + 'M';
  if (abs >= 1000)       return sign + sym + Math.round(abs/1000) + 'K';
  return sign + sym + Math.round(abs);
}

function fmtSigned(sym, n) {
  return (n >= 0 ? '+' : '') + fmt(sym, n);
}

function today() {
  var d = new Date();
  return d.toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});
}

function header(pillar, scenario, detail) {
  return '<div class="rpt-header">'
    + '<div class="rpt-brand">'
    +   '<div class="rpt-brand-dot"></div>'
    +   '<div><div class="rpt-brand-name">Revenue Fluent</div>'
    +   '<div class="rpt-brand-tag">Built on Humacity &mdash; Confidential</div></div>'
    + '</div>'
    + '<div class="rpt-meta">'
    +   '<div class="rpt-meta-pillar">' + pillar + '</div>'
    +   '<div class="rpt-meta-scenario">' + scenario + '</div>'
    +   '<div class="rpt-meta-detail">' + detail + '</div>'
    + '</div>'
    + '</div>';
}

function footer(pillar) {
  return '<div class="rpt-footer">'
    + '<div class="rpt-footer-left">Revenue Fluent &mdash; by Kumar Vivek &mdash; ' + today() + '</div>'
    + '<div class="rpt-footer-right">' + pillar + ' &mdash; Not for distribution without authorisation</div>'
    + '</div>';
}

function statRow(stats) {
  return '<div class="rpt-stats">' + stats.map(function(s){
    return '<div class="rpt-stat"><div class="rpt-stat-val">' + s.val + '</div><div class="rpt-stat-lbl">' + s.lbl + '</div></div>';
  }).join('') + '</div>';
}

var _RF_REPORT_CSS = `/* REVENUE FLUENT — BOARD REPORT PRINT STYLESHEET */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=Bebas+Neue&display=swap');

:root{
  --bg:#0A0608;--bg2:#180C14;--bg3:#220E1A;
  --magenta:#C0409A;--gold:#E0B830;--copper:#B87333;--copper-lt:#E8C87A;
  --teal:#38C490;--red:#E05C3A;
  --text:#EED8E8;--text-mid:#D8B8D0;--text-dim:#C8A8C0;
  --border:rgba(192,64,154,.2);
  --font:'Sora',sans-serif;--mono:'DM Mono',monospace;--hero:'Bebas Neue',sans-serif;
}

*{box-sizing:border-box;margin:0;padding:0}

body{
  background:#fff;color:#1A0818;
  font-family:'Sora',sans-serif;font-size:10pt;line-height:1.5;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;
}

/* PAGE LAYOUT */
.report-page{
  width:210mm;min-height:297mm;margin:0 auto;
  padding:12mm 14mm;background:#fff;
  position:relative;
}

@media print{
  body{margin:0;padding:0}
  .report-page{width:100%;min-height:100vh;padding:10mm 12mm;margin:0}
  .no-print{display:none!important}
  .page-break{page-break-before:always}
}

@media screen{
  body{background:#f0e8ec;padding:20px}
  .report-page{box-shadow:0 4px 40px rgba(192,64,154,.15);margin:0 auto 40px}
}

/* HEADER */
.rpt-header{
  display:flex;align-items:flex-start;justify-content:space-between;
  padding-bottom:8mm;border-bottom:2px solid #C0409A;margin-bottom:7mm;
}
.rpt-brand{display:flex;align-items:center;gap:8px}
.rpt-brand-dot{width:10px;height:10px;border-radius:50%;background:#B87333;flex-shrink:0}
.rpt-brand-name{font-family:'DM Mono',monospace;font-size:9pt;letter-spacing:.14em;text-transform:uppercase;color:#1A0818;font-weight:500}
.rpt-brand-tag{font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;color:#C0409A;margin-top:3px}
.rpt-meta{text-align:right}
.rpt-meta-pillar{font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:#C0409A;margin-bottom:3px}
.rpt-meta-scenario{font-size:9pt;font-weight:600;color:#1A0818;margin-bottom:2px}
.rpt-meta-detail{font-family:'DM Mono',monospace;font-size:7pt;color:#6A3858;letter-spacing:.06em}

/* HERO NUMBER */
.rpt-hero{
  background:linear-gradient(135deg,#1A0818,#0A0608);
  border-radius:8px;padding:7mm 10mm;margin-bottom:6mm;
  border-left:4px solid #C0409A;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;
}
.rpt-hero-label{font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:.18em;text-transform:uppercase;color:#C0409A;margin-bottom:3mm}
.rpt-hero-num{font-family:'Bebas Neue',sans-serif;font-size:36pt;line-height:1;color:#E0B830;letter-spacing:.02em;margin-bottom:2mm}
.rpt-hero-sub{font-size:9pt;color:#D8B8D0;line-height:1.4}
.rpt-hero-sub b{color:#EED8E8}

/* SECTION HEADING */
.rpt-section{margin-bottom:5mm}
.rpt-section-title{
  font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:.18em;text-transform:uppercase;
  color:#C0409A;padding-bottom:2mm;border-bottom:1px solid rgba(192,64,154,.2);margin-bottom:3mm;
}

/* TABLE */
.rpt-table{width:100%;border-collapse:collapse;font-size:8.5pt;margin-bottom:4mm}
.rpt-table th{
  font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;
  background:#1A0818;color:#C0409A;padding:3mm 3mm;text-align:left;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;
}
.rpt-table th.right{text-align:right}
.rpt-table td{padding:2.5mm 3mm;border-bottom:1px solid rgba(192,64,154,.08);color:#1A0818;vertical-align:top}
.rpt-table td.right{text-align:right;font-family:'DM Mono',monospace;font-size:8pt}
.rpt-table td.label{font-weight:500;color:#1A0818}
.rpt-table td.pos{color:#1A7A5A;font-family:'DM Mono',monospace;font-weight:600}
.rpt-table td.neg{color:#B03020;font-family:'DM Mono',monospace;font-weight:600}
.rpt-table td.gold{color:#8A6010;font-family:'DM Mono',monospace;font-weight:600}
.rpt-table td.muted{color:#6A3858;font-size:8pt}
.rpt-table tr.total td{background:#F8EEF4;font-weight:700;border-bottom:2px solid rgba(192,64,154,.3);-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.rpt-table tr.section-head td{background:#F0E0EC;font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;color:#8A2070;padding:2mm 3mm;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.rpt-table tr.net td{background:#1A0818;color:#E0B830;font-family:'DM Mono',monospace;font-size:10pt;font-weight:700;border:none;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.rpt-table tr.net td.right{color:#E0B830}
.rpt-tag{display:inline-block;font-family:'DM Mono',monospace;font-size:6.5pt;letter-spacing:.06em;text-transform:uppercase;padding:1px 5px;border-radius:3px;border:1px solid}

/* INTELLIGENCE STATEMENT */
.rpt-statement{
  background:#F8EEF4;border-left:3px solid #C0409A;border-radius:4px;
  padding:4mm 5mm;margin-bottom:5mm;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;
}
.rpt-statement-label{font-family:'DM Mono',monospace;font-size:6.5pt;letter-spacing:.16em;text-transform:uppercase;color:#C0409A;margin-bottom:2mm}
.rpt-statement-text{font-size:9pt;color:#1A0818;line-height:1.6}
.rpt-statement-text b{color:#8A2070}

/* TWO COLUMN BALANCE SHEET */
.rpt-bs-cols{display:grid;grid-template-columns:1fr 1fr;gap:4mm;margin-bottom:4mm}
.rpt-bs-col-head{font-family:'DM Mono',monospace;font-size:7pt;letter-spacing:.14em;text-transform:uppercase;padding:2mm 3mm;margin-bottom:2mm;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.rpt-bs-col-head.assets{background:#0A2018;color:#38C490}
.rpt-bs-col-head.liabs{background:#200808;color:#E05C3A}
.rpt-bs-row{display:flex;justify-content:space-between;align-items:flex-start;padding:2mm 3mm;border-bottom:1px solid rgba(192,64,154,.08);gap:8px}
.rpt-bs-row-label{font-size:8.5pt;color:#1A0818;font-weight:500}
.rpt-bs-row-desc{font-size:7pt;color:#6A3858;line-height:1.3;margin-top:1px}
.rpt-bs-row-val{font-family:'DM Mono',monospace;font-size:8.5pt;font-weight:600;white-space:nowrap}
.rpt-bs-row-val.pos{color:#1A7A5A}
.rpt-bs-row-val.neg{color:#B03020}

/* STAT ROW */
.rpt-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm;margin-bottom:5mm}
.rpt-stat{background:#F8EEF4;border-radius:4px;padding:3mm;text-align:center;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
.rpt-stat-val{font-family:'DM Mono',monospace;font-size:14pt;font-weight:600;color:#8A2070;line-height:1}
.rpt-stat-lbl{font-family:'DM Mono',monospace;font-size:6.5pt;letter-spacing:.1em;text-transform:uppercase;color:#6A3858;margin-top:1mm}

/* FOOTER */
.rpt-footer{
  position:absolute;bottom:8mm;left:14mm;right:14mm;
  display:flex;justify-content:space-between;align-items:center;
  padding-top:3mm;border-top:1px solid rgba(192,64,154,.2);
}
.rpt-footer-left{font-family:'DM Mono',monospace;font-size:6.5pt;color:#6A3858;letter-spacing:.06em}
.rpt-footer-right{font-family:'DM Mono',monospace;font-size:6.5pt;color:#6A3858}

/* PRINT BUTTON */
.print-btn{
  position:fixed;bottom:24px;right:24px;
  background:#C0409A;color:#fff;border:none;cursor:pointer;
  font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;
  padding:12px 24px;border-radius:9px;font-weight:500;
  box-shadow:0 4px 20px rgba(192,64,154,.4);transition:all .2s;z-index:1000;
}
.print-btn:hover{background:#D050A8;transform:translateY(-2px)}
.close-btn{
  position:fixed;bottom:24px;right:180px;
  background:rgba(192,64,154,.1);color:#C0409A;border:1px solid rgba(192,64,154,.3);cursor:pointer;
  font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;
  padding:12px 20px;border-radius:9px;transition:all .2s;z-index:1000;
}
.close-btn:hover{background:rgba(192,64,154,.2)}
`;

function openReport(title, body) {
  var html = '<!DOCTYPE html><html><head>'
    + '<meta charset="utf-8">'
    + '<title>' + title + ' &mdash; Revenue Fluent</title>'
    + '<style>' + _RF_REPORT_CSS + '</style>'
    + '</head><body>'
    + '<div class="report-page">'
    + body
    + '</div>'
    + '<button class="print-btn no-print" onclick="window.print()">&#x2193; Save as PDF</button>'
    + '<button class="close-btn no-print" onclick="window.close()">Close</button>'
    + '</body></html>';

  var w = window.open('', '_blank');
  w.document.write(html);
  w.document.close();
}

// ── P1: VALUE LEDGER ─────────────────────────────────────────────────────────
function reportP1(scenarioName, entries, sym, totalReturn, hrInvestment, ratio) {
  var s = RF.scenario(scenarioName), sum = RF.summary(scenarioName);
  var detail = s.employeeCount + ' people &middot; ' + sum.geo + ' &middot; comp base ' + fmt(sym, s.employees.reduce(function(a,e){return a+e.salary;},0));

  var rows = entries.map(function(e){
    var net = e.ret - e.cost;
    var tagColour = {
      'Revenue-Generating':'#1A7A5A','Cost-Saving':'#5A9020',
      'Development':'#2070A0','Culture & Engagement':'#8A2070','Risk & Compliance':'#8A3010'
    }[e.category] || '#6A3858';
    return '<tr>'
      + '<td class="muted">' + e.date + '</td>'
      + '<td class="label">' + e.action + '<br><span style="font-size:7pt;color:#6A3858">' + e.note + '</span></td>'
      + '<td style="text-align:center"><span class="rpt-tag" style="color:' + tagColour + ';border-color:' + tagColour + '">' + e.category + '</span></td>'
      + '<td class="right">' + fmt(sym, e.cost) + '</td>'
      + '<td class="right pos">' + fmt(sym, e.ret) + '</td>'
      + '<td class="right ' + (net >= 0 ? 'pos' : 'neg') + '">' + fmtSigned(sym, net) + '</td>'
      + '</tr>';
  }).join('');

  var body = header('L1 &mdash; The Value Ledger', scenarioName, detail)
    + '<div class="rpt-hero">'
    +   '<div class="rpt-hero-label">Return on HR Investment &mdash; Q1 2026</div>'
    +   '<div class="rpt-hero-num">' + ratio.toFixed(2) + 'x</div>'
    +   '<div class="rpt-hero-sub">For every <b>' + sym + '1</b> invested in HR, this organisation returns <b>' + fmt(sym, ratio) + '</b></div>'
    + '</div>'
    + statRow([
        {val: fmt(sym, totalReturn), lbl: 'Total HR Return'},
        {val: fmt(sym, hrInvestment), lbl: 'HR Investment'},
        {val: fmtSigned(sym, totalReturn - hrInvestment), lbl: 'Net Ledger Value'},
        {val: entries.length, lbl: 'Entries Recorded'},
      ])
    + '<div class="rpt-section">'
    +   '<div class="rpt-section-title">The Value Ledger &mdash; Q1 2026</div>'
    +   '<table class="rpt-table">'
    +     '<thead><tr>'
    +       '<th style="width:12%">Period</th><th>Action</th><th style="width:16%">Category</th>'
    +       '<th class="right" style="width:11%">HR Cost</th>'
    +       '<th class="right" style="width:11%">Return</th>'
    +       '<th class="right" style="width:11%">Net</th>'
    +     '</tr></thead>'
    +     '<tbody>' + rows + '</tbody>'
    +     '<tfoot><tr class="total">'
    +       '<td colspan="3">TOTAL</td>'
    +       '<td class="right">' + fmt(sym, hrInvestment) + '</td>'
    +       '<td class="right pos">' + fmt(sym, totalReturn) + '</td>'
    +       '<td class="right ' + (totalReturn - hrInvestment >= 0 ? 'pos' : 'neg') + '">' + fmtSigned(sym, totalReturn - hrInvestment) + '</td>'
    +     '</tr></tfoot>'
    +   '</table>'
    + '</div>'
    + '<div class="rpt-statement">'
    +   '<div class="rpt-statement-label">Intelligence Statement</div>'
    +   '<div class="rpt-statement-text">This organisation returned <b>' + fmt(sym, totalReturn) + '</b> on a total HR investment of <b>' + fmt(sym, hrInvestment) + '</b> &mdash; a ratio of <b>' + ratio.toFixed(2) + 'x</b>. Every entry above represents a documented HR contribution in financial language. This ledger belongs in the board presentation.</div>'
    + '</div>'
    + footer('L1 &mdash; The Value Ledger');

  openReport('Value Ledger', body);
}

// ── P2: TALENT PREMIUM ───────────────────────────────────────────────────────
function reportP2(scenarioName, d) {
  var s = RF.scenario(scenarioName), sum = RF.summary(scenarioName);
  var sym = d.sym;
  var detail = s.employeeCount + ' people &middot; ' + sum.geo + ' &middot; comp base ' + fmt(sym, d.totalComp);

  var body = header('L2 &mdash; The Talent Premium', scenarioName, detail)
    + '<div class="rpt-hero">'
    +   '<div class="rpt-hero-label">Talent Quality Premium &mdash; Total</div>'
    +   '<div class="rpt-hero-num">' + fmt(sym, d.tqp) + '</div>'
    +   '<div class="rpt-hero-sub">The financial value of having <b>better-than-average people</b> at the same cost. TQP as % of comp base: <b>' + (d.tqpRatio * 100).toFixed(1) + '%</b></div>'
    + '</div>'
    + statRow([
        {val: fmt(sym, d.perfPremium), lbl: 'Performance Premium'},
        {val: fmt(sym, d.retPremium), lbl: 'Retention Premium'},
        {val: fmt(sym, d.hiringPremium), lbl: 'Hiring Premium'},
        {val: (d.tqpRatio * 100).toFixed(1) + '%', lbl: 'TQP / Comp Base'},
      ])
    + '<div class="rpt-section">'
    +   '<div class="rpt-section-title">Three Components of the Talent Premium</div>'
    +   '<table class="rpt-table">'
    +     '<thead><tr><th>Component</th><th>What It Measures</th><th class="right">Value</th><th class="right">% of TQP</th></tr></thead>'
    +     '<tbody>'
    +       '<tr><td class="label">Performance Premium</td><td class="muted">Salary-weighted performance surplus above grade benchmark</td><td class="right ' + (d.perfPremium>=0?'pos':'neg') + '">' + fmt(sym,d.perfPremium) + '</td><td class="right muted">' + (d.tqp?((d.perfPremium/d.tqp)*100).toFixed(1):'0') + '%</td></tr>'
    +       '<tr><td class="label">Retention Quality Premium</td><td class="muted">Financial value of Stars and HiPos retained</td><td class="right ' + (d.retPremium>=0?'pos':'neg') + '">' + fmt(sym,d.retPremium) + '</td><td class="right muted">' + (d.tqp?((d.retPremium/d.tqp)*100).toFixed(1):'0') + '%</td></tr>'
    +       '<tr><td class="label">Hiring Quality Premium</td><td class="muted">Recent hire performance above grade benchmark</td><td class="right ' + (d.hiringPremium>=0?'pos':'neg') + '">' + fmt(sym,d.hiringPremium) + '</td><td class="right muted">' + (d.tqp?((d.hiringPremium/d.tqp)*100).toFixed(1):'0') + '%</td></tr>'
    +     '</tbody>'
    +     '<tfoot><tr class="total"><td colspan="2">TOTAL TALENT QUALITY PREMIUM</td><td class="right ' + (d.tqp>=0?'pos':'neg') + '">' + fmt(sym,d.tqp) + '</td><td class="right">' + (d.tqpRatio*100).toFixed(1) + '%</td></tr></tfoot>'
    +   '</table>'
    + '</div>'
    + '<div class="rpt-statement">'
    +   '<div class="rpt-statement-label">Intelligence Statement</div>'
    +   '<div class="rpt-statement-text">This organisation is generating a Talent Quality Premium of <b>' + fmt(sym,d.tqp) + '</b> &mdash; the financial value of having better-than-average people at the same cost. This premium represents <b>' + (d.tqpRatio*100).toFixed(1) + '%</b> of the total compensation base. It belongs in the board presentation as the return on talent quality.</div>'
    + '</div>'
    + footer('L2 &mdash; The Talent Premium');

  openReport('Talent Premium', body);
}

// ── P3: ORG VITALS ───────────────────────────────────────────────────────────
function reportP3(scenarioName, vitals, dnaType) {
  var s = RF.scenario(scenarioName), sum = RF.summary(scenarioName);
  var detail = s.employeeCount + ' people &middot; ' + sum.geo;

  var verdictColor = {'HEALTHY':'#1A7A5A','WARNING':'#8A6010','CRITICAL':'#B03020'};
  var rows = vitals.map(function(v){
    var col = verdictColor[v.verdict] || '#6A3858';
    return '<tr>'
      + '<td class="label">' + v.name + '</td>'
      + '<td class="muted" style="font-size:8pt">' + v.sub + '</td>'
      + '<td style="text-align:center"><span class="rpt-tag" style="color:' + col + ';border-color:' + col + '">' + v.verdict + '</span></td>'
      + '<td class="right muted">' + v.score + '/4 yes</td>'
      + '</tr>';
  }).join('');

  var healthyCount = vitals.filter(function(v){return v.verdict==='HEALTHY';}).length;
  var warnCount = vitals.filter(function(v){return v.verdict==='WARNING';}).length;
  var critCount = vitals.filter(function(v){return v.verdict==='CRITICAL';}).length;

  var body = header('L3 &mdash; Org Vitals', scenarioName, detail)
    + '<div class="rpt-hero">'
    +   '<div class="rpt-hero-label">Organisation DNA Type</div>'
    +   '<div class="rpt-hero-num" style="font-size:28pt">' + (dnaType || 'Run the diagnostic') + '</div>'
    +   '<div class="rpt-hero-sub">Based on five vital sign readings across Leadership, Fear, Middle Layer, Execution and HR Mirror</div>'
    + '</div>'
    + statRow([
        {val: healthyCount, lbl: 'Healthy Signals'},
        {val: warnCount, lbl: 'Warning Signals'},
        {val: critCount, lbl: 'Critical Signals'},
        {val: vitals.length, lbl: 'Vital Signs Read'},
      ])
    + '<div class="rpt-section">'
    +   '<div class="rpt-section-title">Five Vital Sign Readings</div>'
    +   '<table class="rpt-table">'
    +     '<thead><tr><th>Vital Sign</th><th>What It Detects</th><th style="width:12%">Verdict</th><th class="right" style="width:10%">Score</th></tr></thead>'
    +     '<tbody>' + rows + '</tbody>'
    +   '</table>'
    + '</div>'
    + '<div class="rpt-statement">'
    +   '<div class="rpt-statement-label">Intelligence Statement</div>'
    +   '<div class="rpt-statement-text">This organisation has <b>' + healthyCount + ' healthy</b>, <b>' + warnCount + ' warning</b>, and <b>' + critCount + ' critical</b> vital signs. '
    +     (critCount > 0 ? 'Critical signals require immediate attention — the cost of inaction compounds monthly. ' : '')
    +     (dnaType ? 'Organisation DNA type: <b>' + dnaType + '</b>. ' : '')
    +     'The diagnosis above names what is visible. The simulation models what addressing it is worth.</div>'
    + '</div>'
    + footer('L3 &mdash; Org Vitals');

  openReport('Org Vitals', body);
}

// ── P4: HUMAN P&L ────────────────────────────────────────────────────────────
function reportP4(scenarioName, d) {
  var s = RF.scenario(scenarioName), sum = RF.summary(scenarioName);
  var sym = d.sym;
  var detail = s.employeeCount + ' people &middot; ' + sum.geo + ' &middot; comp base ' + fmt(sym, d.totalComp);

  function plRow(label, val, cls) {
    return '<tr><td class="label">' + label + '</td><td class="right ' + (cls||'') + '">' + fmt(sym,val) + '</td></tr>';
  }
  function plTotal(label, val) {
    return '<tr class="total"><td>' + label + '</td><td class="right ' + (val>=0?'pos':'neg') + '">' + fmt(sym,val) + '</td></tr>';
  }
  function plSection(label) {
    return '<tr class="section-head"><td colspan="2">' + label + '</td></tr>';
  }
  function plNet(label, val) {
    return '<tr class="net"><td>' + label + '</td><td class="right">' + fmt(sym,val) + '</td></tr>';
  }

  var body = header('L4 &mdash; The Human P&L', scenarioName, detail)
    + '<div class="rpt-hero">'
    +   '<div class="rpt-hero-label">Human Net Profit &mdash; Q1 2026</div>'
    +   '<div class="rpt-hero-num">' + fmt(sym, d.netProfit) + '</div>'
    +   '<div class="rpt-hero-sub">The Ratio: for every <b>' + sym + '1</b> invested in HR, this organisation returns <b>' + (d.totalComp > 0 ? (d.totalRev/d.totalComp).toFixed(2) : '—') + 'x</b></div>'
    + '</div>'
    + statRow([
        {val: fmt(sym,d.totalRev), lbl: 'Human Revenue'},
        {val: fmt(sym,d.totalComp), lbl: 'Total Comp Cost'},
        {val: (d.totalRev>0?((d.grossMargin/d.totalRev)*100).toFixed(1):'0')+'%', lbl: 'Gross Margin %'},
        {val: fmt(sym,d.netProfit), lbl: 'Net Profit'},
      ])
    + '<div class="rpt-section">'
    +   '<div class="rpt-section-title">Human P&L Statement &mdash; Q1 2026</div>'
    +   '<table class="rpt-table" style="font-size:8.5pt">'
    +     '<thead><tr><th>Line Item</th><th class="right" style="width:22%">Value</th></tr></thead>'
    +     '<tbody>'
    +       plSection('HUMAN REVENUE')
    +       plRow('Talent Acquisition Value', d.talentAcqVal)
    +       plRow('Retention Savings', d.retSavings)
    +       plRow('Performance Uplift', d.perfUplift)
    +       plRow('Culture Premium', d.cultPrem)
    +       plTotal('= TOTAL HUMAN REVENUE', d.totalRev)
    +       plSection('HUMAN COST OF GOODS (COGS)')
    +       plRow('Total Compensation Cost', d.totalComp, 'neg')
    +       plRow('Acquisition Cost', d.acqCost, 'neg')
    +       plRow('Development Investment', d.devInvest, 'neg')
    +       plTotal('= TOTAL HUMAN COGS', d.totalCOGS)
    +       plNet('HUMAN GROSS MARGIN', d.grossMargin)
    +       plSection('HUMAN OPERATING EXPENSES (OpEx)')
    +       plRow('HR Function Cost', d.hrFuncCost, 'neg')
    +       plRow('Compliance & Administration', d.compliance, 'neg')
    +       plRow('Culture & Engagement Spend', d.engagementSpend, 'neg')
    +       plTotal('= TOTAL HUMAN OPEX', d.totalOpEx)
    +       plNet('HUMAN OPERATING PROFIT', d.opProfit)
    +       plSection('HUMAN ADJUSTMENTS (below the line)')
    +       plRow('Flight Risk Liability', d.flightRisk, 'neg')
    +       plRow('Skill Debt Provision', d.skillDebt, 'neg')
    +       plRow('Growth Readiness Gap', d.growthGap, 'neg')
    +       plTotal('= TOTAL ADJUSTMENTS', d.totalAdj)
    +       plNet('HUMAN NET PROFIT / LOSS', d.netProfit)
    +     '</tbody>'
    +   '</table>'
    + '</div>'
    + '<div class="rpt-statement">'
    +   '<div class="rpt-statement-label">The Ratio</div>'
    +   '<div class="rpt-statement-text">For every <b>' + sym + '1</b> invested in HR, this organisation returns <b>' + (d.totalComp>0?(d.totalRev/d.totalComp).toFixed(2):'—') + 'x</b>. Human Net Profit stands at <b>' + fmt(sym,d.netProfit) + '</b>. This statement belongs in the CEO meeting &mdash; it is the first complete financial account of what people investment returns.</div>'
    + '</div>'
    + footer('L4 &mdash; The Human P&L');

  openReport('Human P&L', body);
}

// ── P5: HUMAN BALANCE SHEET ──────────────────────────────────────────────────
function reportP5(scenarioName, d) {
  var s = RF.scenario(scenarioName), sum = RF.summary(scenarioName);
  var sym = d.sym;
  var detail = s.employeeCount + ' people &middot; ' + sum.geo + ' &middot; as at Q1 2026';

  function bsRow(label, desc, val, isAsset) {
    return '<div class="rpt-bs-row">'
      + '<div><div class="rpt-bs-row-label">' + label + '</div><div class="rpt-bs-row-desc">' + desc + '</div></div>'
      + '<div class="rpt-bs-row-val ' + (isAsset?'pos':'neg') + '">' + fmt(sym,val) + '</div>'
      + '</div>';
  }

  var body = header('L5 &mdash; The Human Balance Sheet', scenarioName, detail)
    + '<div class="rpt-hero">'
    +   '<div class="rpt-hero-label">Net Human Worth</div>'
    +   '<div class="rpt-hero-num">' + fmt(sym, d.netHumanWorth) + '</div>'
    +   '<div class="rpt-hero-sub">Total Human Assets minus Total Human Liabilities plus Retained Human Earnings from the Human P&L</div>'
    + '</div>'
    + statRow([
        {val: fmt(sym,d.totalAssets), lbl: 'Total Human Assets'},
        {val: fmt(sym,d.totalLiabilities), lbl: 'Total Human Liabilities'},
        {val: fmt(sym,d.retainedEarnings), lbl: 'Retained Earnings'},
        {val: fmt(sym,d.netHumanWorth), lbl: 'Net Human Worth'},
      ])
    + '<div class="rpt-section">'
    +   '<div class="rpt-section-title">Human Balance Sheet &mdash; as at Q1 2026</div>'
    +   '<div class="rpt-bs-cols">'
    +     '<div>'
    +       '<div class="rpt-bs-col-head assets">Human Assets</div>'
    +       bsRow('Talent Equity', 'Performance surplus of Stars above grade benchmark', d.talentEquity, true)
    +       bsRow('Institutional Knowledge', 'Senior tenure &times; accumulated knowledge value', d.instKnowledge, true)
    +       bsRow('Org Learning Velocity', 'Emerging talent pipeline value', d.orgLearning, true)
    +       bsRow('Relationship Capital', 'Revenue-dept client relationship value', d.relCapital, true)
    +       bsRow('Culture Asset', 'Long-tenure engagement premium', d.cultureAsset, true)
    +       '<div class="rpt-bs-row" style="background:#F0E0EC;font-weight:700;margin-top:2mm">'
    +         '<div class="rpt-bs-row-label">= TOTAL HUMAN ASSETS</div>'
    +         '<div class="rpt-bs-row-val pos">' + fmt(sym,d.totalAssets) + '</div>'
    +       '</div>'
    +     '</div>'
    +     '<div>'
    +       '<div class="rpt-bs-col-head liabs">Human Liabilities</div>'
    +       bsRow('Talent Concentration Risk', 'At-risk + HiPo departure probability', d.talentConc, false)
    +       bsRow('Skill Debt', 'Cost of skills gap if unaddressed', d.skillDebt, false)
    +       bsRow('Growth Readiness Gap', 'Cost of unpreparedness for next stage', d.growthGap, false)
    +       bsRow('Culture Liability', 'Financial cost of known dysfunction', d.cultureLiab, false)
    +       bsRow('Workforce Obsolescence Risk', 'Tenured staff below grade benchmark', d.workforceObs, false)
    +       '<div class="rpt-bs-row" style="background:#F0E0EC;font-weight:700;margin-top:2mm">'
    +         '<div class="rpt-bs-row-label">= TOTAL HUMAN LIABILITIES</div>'
    +         '<div class="rpt-bs-row-val neg">' + fmt(sym,d.totalLiabilities) + '</div>'
    +       '</div>'
    +     '</div>'
    +   '</div>'
    +   '<div style="background:#1A0818;color:#E8C87A;font-family:\'DM Mono\',monospace;font-size:8pt;padding:3mm 4mm;border-radius:4px;display:flex;justify-content:space-between;margin-top:2mm">'
    +     '<span>Retained Human Earnings (from Human P&L, L4)</span><span>' + fmt(sym,d.retainedEarnings) + '</span>'
    +   '</div>'
    +   '<div style="background:#0A0608;color:#E0B830;font-family:\'DM Mono\',monospace;font-size:11pt;font-weight:700;padding:4mm 5mm;border-radius:4px;display:flex;justify-content:space-between;margin-top:2mm">'
    +     '<span>NET HUMAN WORTH</span><span>' + fmt(sym,d.netHumanWorth) + '</span>'
    +   '</div>'
    + '</div>'
    + '<div class="rpt-statement">'
    +   '<div class="rpt-statement-label">Intelligence Statement</div>'
    +   '<div class="rpt-statement-text">Net Human Worth stands at <b>' + fmt(sym,d.netHumanWorth) + '</b>. '
    +     (d.netHumanWorth > 0 ? 'Assets outweigh liabilities by a healthy margin. This is the statement that answers the question every board asks and no HR function has ever answered: <b>what are our people actually worth?</b>' : 'Human liabilities exceed human assets. This organisation is drawing on human capital faster than it is building it. Immediate intervention is warranted.')
    +   '</div>'
    + '</div>'
    + footer('L5 &mdash; The Human Balance Sheet');

  openReport('Human Balance Sheet', body);
}

// Export
global.RFReport = { reportP1:reportP1, reportP2:reportP2, reportP3:reportP3, reportP4:reportP4, reportP5:reportP5, fmt:fmt };

})(window);

// Revenue Fluent — Export Engine
// PDF generation (jsPDF) + CSV upload (PapaParse)
// Loaded by all tool pages

// ── PDF EXPORT ────────────────────────────────────────────
const RF_PDF = {

  // Brand colors (hex for jsPDF)
  colors: {
    bg:       [11, 13, 20],
    bg2:      [17, 20, 32],
    bg3:      [24, 28, 46],
    accent:   [99, 102, 241],
    accent2:  [129, 140, 248],
    teal:     [45, 212, 191],
    amber:    [245, 158, 11],
    red:      [239, 68, 68],
    green:    [16, 185, 129],
    purple:   [168, 85, 247],
    text:     [236, 238, 255],
    textDim:  [130, 135, 160],
    textMute: [80, 85, 105],
    border:   [30, 35, 55],
  },

  // Load jsPDF dynamically
  async loadJsPDF() {
    if (window.jspdf) return window.jspdf.jsPDF;
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.onload = () => resolve(window.jspdf.jsPDF);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  },

  // Create a new branded PDF document
  newDoc() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, H = 297;
    const c = this.colors;

    // Dark background
    doc.setFillColor(...c.bg);
    doc.rect(0, 0, W, H, 'F');

    return { doc, W, H, c, y: 0 };
  },

  // Draw page header
  header(ctx, pillarName, reportTitle) {
    const { doc, W, c } = ctx;

    // Header bar
    doc.setFillColor(...c.bg2);
    doc.rect(0, 0, W, 28, 'F');

    // Accent top line
    doc.setFillColor(...c.accent);
    doc.rect(0, 0, W, 1.5, 'F');

    // Brand logo area
    doc.setFillColor(...c.accent);
    doc.rect(14, 9, 10, 10, 'F');
    doc.setFillColor(255, 255, 255);
    doc.circle(19, 14, 2.5, 'F');

    // Brand name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...c.text);
    doc.text('Revenue', 27, 15);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...c.accent2);
    doc.text('Fluent', 45, 15);

    // Pillar badge
    doc.setFillColor(...c.accent);
    doc.rect(W - 60, 9, 46, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(pillarName.toUpperCase(), W - 37, 15.5, { align: 'center' });

    // Report title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...c.text);
    doc.text(reportTitle, 14, 46);

    // Subtitle line
    doc.setFillColor(...c.accent);
    doc.rect(14, 50, 30, 0.8, 'F');

    // Date + scenario
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...c.textMute);
    const d = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });
    doc.text(`Generated: ${d}  ·  Revenue Fluent Intelligence Report  ·  CRFP Track`, 14, 57);

    ctx.y = 65;
  },

  // Draw a section label
  sectionLabel(ctx, label) {
    const { doc, W, c } = ctx;
    ctx.y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...c.accent2);
    doc.text(label.toUpperCase(), 14, ctx.y);
    doc.setFillColor(...c.border);
    doc.rect(14, ctx.y + 1.5, W - 28, 0.3, 'F');
    ctx.y += 6;
  },

  // Draw a metric card (2-up grid)
  metricCard(ctx, metrics) {
    const { doc, c } = ctx;
    const cardW = 85, cardH = 24;
    const cols = [14, 111];
    metrics.forEach((m, i) => {
      const x = cols[i % 2];
      if (i > 0 && i % 2 === 0) ctx.y += cardH + 3;
      const y = ctx.y;

      // Card background
      doc.setFillColor(...c.bg2);
      doc.rect(x, y, cardW, cardH, 'F');

      // Accent top border
      const lineColor = m.color || c.accent;
      doc.setFillColor(...lineColor);
      doc.rect(x, y, cardW, 1.2, 'F');

      // Label
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...c.textMute);
      doc.text(m.label.toUpperCase(), x + 4, y + 7);

      // Value
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...(m.color || c.teal));
      doc.text(m.value, x + 4, y + 18);

      // Sub
      if (m.sub) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(...c.textMute);
        doc.text(m.sub, x + 4, y + 22.5);
      }
    });
    // Advance y past the last row of cards
    const rows = Math.ceil(metrics.length / 2);
    ctx.y += rows * (cardH + 3) + 2;
  },

  // Draw a data table row
  tableRow(ctx, label, value, valueColor, isLast) {
    const { doc, W, c } = ctx;
    const rowH = 8;

    doc.setFillColor(...c.bg2);
    doc.rect(14, ctx.y, W - 28, rowH, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...c.textDim);
    doc.text(label, 18, ctx.y + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...(valueColor || c.teal));
    doc.text(value, W - 18, ctx.y + 5.5, { align: 'right' });

    if (!isLast) {
      doc.setFillColor(...c.border);
      doc.rect(14, ctx.y + rowH, W - 28, 0.3, 'F');
    }
    ctx.y += rowH + 0.3;
  },

  // Draw attribution bar
  attributionBar(ctx, label, value, amount, color) {
    const { doc, W, c } = ctx;
    const barMaxW = W - 80;
    const fillW = Math.min(barMaxW, (value / 100) * barMaxW);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...c.textDim);
    doc.text(label, 14, ctx.y + 3.5);

    doc.setFillColor(...c.bg3);
    doc.rect(14, ctx.y + 5, barMaxW, 3, 'F');
    doc.setFillColor(...(color || c.accent));
    doc.rect(14, ctx.y + 5, fillW, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...(color || c.teal));
    doc.text(amount, W - 18, ctx.y + 7.5, { align: 'right' });

    ctx.y += 12;
  },

  // Narrative/callout box
  callout(ctx, text) {
    const { doc, W, c } = ctx;
    ctx.y += 4;
    const lines = doc.splitTextToSize(text, W - 36);
    const boxH = lines.length * 5 + 10;

    doc.setFillColor(20, 22, 45);
    doc.rect(14, ctx.y, W - 28, boxH, 'F');
    doc.setFillColor(...c.accent);
    doc.rect(14, ctx.y, 2, boxH, 'F');

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...c.textDim);
    lines.forEach((line, i) => {
      doc.text(line, 20, ctx.y + 7 + i * 5);
    });
    ctx.y += boxH + 6;
  },

  // Page footer
  footer(ctx, pageNum) {
    const { doc, W, H, c } = ctx;
    doc.setFillColor(...c.bg2);
    doc.rect(0, H - 14, W, 14, 'F');
    doc.setFillColor(...c.accent);
    doc.rect(0, H - 14, W, 0.5, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...c.textMute);
    doc.text('Revenue Fluent · People Revenue Intelligence', 14, H - 5);
    doc.text(`Page ${pageNum}  ·  CRFP Track  ·  revenuefluent.com`, W - 14, H - 5, { align: 'right' });
  },

  // ── REPORT GENERATORS ─────────────────────────────────

  async generateP1(data) {
    const JsPDF = await this.loadJsPDF();
    const ctx = this.newDoc();
    this.header(ctx, 'Pillar 1 — Revenue Connect', 'Revenue Attribution Report');

    this.sectionLabel(ctx, 'Core Metrics');
    this.metricCard(ctx, [
      { label: 'Attrition Cost % (ATC%)', value: data.atc, color: data.atcColor, sub: 'Benchmark: <80%' },
      { label: 'Talent Drag Factor (TDF)', value: data.tdf, color: data.tdfColor, sub: 'Benchmark: >0.5' },
      { label: 'Employee-Sales Ratio (ESR)', value: data.esr, color: data.esrColor, sub: 'Benchmark: 80%+' },
      { label: 'Revenue at Risk', value: data.revRisk, color: ctx.c.accent2, sub: data.confidence + ' confidence' },
    ]);

    this.sectionLabel(ctx, 'Attribution Confidence');
    this.attributionBar(ctx, 'Attribution confidence score', parseFloat(data.confidence), data.confidence, ctx.c.teal);

    this.sectionLabel(ctx, 'Cost Attribution Breakdown');
    this.tableRow(ctx, 'Direct exit replacement cost', data.ab1, ctx.c.red);
    this.tableRow(ctx, 'Revenue capacity lost', data.ab2, ctx.c.amber);
    this.tableRow(ctx, 'Productivity drag (transition)', data.ab3, ctx.c.purple);
    this.tableRow(ctx, 'Institutional knowledge loss', data.ab4, ctx.c.teal, true);

    this.sectionLabel(ctx, 'Intelligence Statement');
    this.callout(ctx, data.narrative || 'Revenue Connect analysis for ' + (data.scenario || 'your organisation') + '. Generated via Revenue Fluent intelligence platform.');

    this.footer(ctx, 1);
    ctx.doc.save('Revenue-Fluent-P1-Attribution-Report.pdf');
  },

  async generateP2(data) {
    const JsPDF = await this.loadJsPDF();
    const ctx = this.newDoc();
    this.header(ctx, 'Pillar 2 — People Alpha', 'People Alpha Report');

    this.sectionLabel(ctx, 'Alpha Performance vs Market');
    this.metricCard(ctx, [
      { label: 'Hiring Alpha', value: data.ha, color: data.haPositive ? ctx.c.teal : ctx.c.red, sub: 'vs market benchmark' },
      { label: 'Retention Alpha', value: data.ra, color: data.raPositive ? ctx.c.teal : ctx.c.red, sub: 'vs market benchmark' },
      { label: 'L&D Alpha', value: data.la, color: data.laPositive ? ctx.c.accent2 : ctx.c.red, sub: 'vs market benchmark' },
      { label: 'Promotion Alpha', value: data.pa, color: data.paPositive ? ctx.c.teal : ctx.c.red, sub: 'Threshold: 70% readiness' },
    ]);

    this.sectionLabel(ctx, 'Blended People Alpha');
    this.tableRow(ctx, 'Total blended People Alpha', data.total, data.totalPositive ? ctx.c.teal : ctx.c.red, true);

    this.sectionLabel(ctx, 'Intelligence Statement');
    this.callout(ctx, data.narrative || 'People Alpha analysis for ' + (data.scenario || 'your organisation') + '.');

    this.footer(ctx, 1);
    ctx.doc.save('Revenue-Fluent-P2-People-Alpha-Report.pdf');
  },

  async generateP3(data) {
    const JsPDF = await this.loadJsPDF();
    const ctx = this.newDoc();
    this.header(ctx, 'Pillar 3 — Team Architecture', 'Revenue DNA Report');

    this.sectionLabel(ctx, 'Configuration & Structure');
    this.metricCard(ctx, [
      { label: 'Org Configuration', value: 'Config ' + data.config, color: data.configColor, sub: data.configName },
      { label: 'Revenue Premium/Drag', value: data.delta, color: data.configColor, sub: 'vs benchmark' },
      { label: 'OEI Score', value: data.oei, color: ctx.c.teal, sub: 'Org Enablement Index' },
      { label: 'PCoB', value: data.pcob, color: ctx.c.amber, sub: 'Payroll Cost of Burn' },
    ]);

    this.sectionLabel(ctx, 'Stability Metrics');
    this.tableRow(ctx, 'Org Stability Index (OSI)', data.osi, ctx.c.teal);
    this.tableRow(ctx, 'Management ratio', data.mgmtRatio, ctx.c.textDim, true);

    this.sectionLabel(ctx, 'Intelligence Statement');
    this.callout(ctx, data.narrative || 'Team Revenue Architecture analysis.');

    this.footer(ctx, 1);
    ctx.doc.save('Revenue-Fluent-P3-Architecture-Report.pdf');
  },

  async generateP4(data) {
    const JsPDF = await this.loadJsPDF();
    const ctx = this.newDoc();
    this.header(ctx, 'Pillar 4 — HUMANCE', 'Human Balance Sheet');

    this.sectionLabel(ctx, 'HUMANCE Asset Classes');
    this.metricCard(ctx, [
      { label: 'Trust Capital', value: data.tc, color: ctx.c.accent2, sub: 'IRD + RBC driven' },
      { label: 'Culture Yield', value: data.cy, color: ctx.c.teal, sub: 'ESR-based proxy' },
      { label: 'Signal Intelligence', value: data.si, color: ctx.c.amber, sub: 'Prevention value' },
      { label: 'Belonging Premium', value: data.bp, color: ctx.c.purple, sub: 'Discretionary effort' },
    ]);

    this.sectionLabel(ctx, 'Total HUMANCE');
    this.tableRow(ctx, 'Total HUMANCE Asset Base', data.total, ctx.c.purple, true);

    this.sectionLabel(ctx, 'Risk Indicators');
    this.tableRow(ctx, 'IRD Score (knowledge concentration)', data.ird + '%', data.ird < 40 ? ctx.c.red : ctx.c.teal);
    this.tableRow(ctx, 'RBC Score (succession readiness)', data.rbc + '%', data.rbc < 40 ? ctx.c.red : ctx.c.teal, true);

    this.sectionLabel(ctx, 'Intelligence Statement');
    this.callout(ctx, data.narrative || 'HUMANCE Human Balance Sheet analysis.');

    this.footer(ctx, 1);
    ctx.doc.save('Revenue-Fluent-P4-HUMANCE-Balance-Sheet.pdf');
  },

  async generateP5(data) {
    const JsPDF = await this.loadJsPDF();
    const ctx = this.newDoc();
    this.header(ctx, 'Pillar 5 — People P&L', 'People P&L Statement');

    this.sectionLabel(ctx, 'People Revenue');
    this.tableRow(ctx, 'P1 — Revenue Protected', data.p1, ctx.c.teal);
    this.tableRow(ctx, 'P2 — People Alpha', data.p2, ctx.c.teal);
    this.tableRow(ctx, 'P3 — Architecture Value', data.p3, ctx.c.teal);
    this.tableRow(ctx, 'P4 — HUMANCE Base', data.p4, ctx.c.teal);
    this.tableRow(ctx, 'Total People Revenue', data.totRev, ctx.c.accent2, true);

    ctx.y += 4;
    this.sectionLabel(ctx, 'People Cost');
    this.tableRow(ctx, 'Total Payroll (PCoB)', '-' + data.payroll, ctx.c.red);
    this.tableRow(ctx, 'Attrition Leakage', '-' + data.atl, ctx.c.red, true);

    ctx.y += 4;
    this.sectionLabel(ctx, 'Net People ROI');
    this.metricCard(ctx, [
      { label: 'Net People ROI', value: data.net, color: data.netPositive ? ctx.c.teal : ctx.c.red, sub: 'People Revenue − People Cost' },
      { label: 'People ROI Ratio', value: data.ratio, color: parseFloat(data.ratio) >= 2 ? ctx.c.teal : ctx.c.amber, sub: '1x = breakeven · 2x+ = strong' },
    ]);

    this.sectionLabel(ctx, 'Intelligence Statement');
    this.callout(ctx, data.narrative || 'People P&L Statement. Generated via Revenue Fluent intelligence platform.');

    this.footer(ctx, 1);
    ctx.doc.save('Revenue-Fluent-P5-People-PL-Statement.pdf');
  },
};

// ── CSV UPLOAD ────────────────────────────────────────────
const RF_CSV = {

  // Sample CSV template columns
  COLUMNS: [
    'employee_id',
    'employee_name',
    'role_type',        // revenue_generating | support | management
    'department',
    'annual_salary_inr',
    'tenure_months',
    'exit_date',        // blank if still employed (YYYY-MM-DD)
    'exit_type',        // voluntary | involuntary | blank
    'performance_rating', // 1-5
  ],

  // Generate and download sample CSV
  downloadTemplate() {
    const rows = [
      this.COLUMNS,
      ['E001', 'Priya Sharma', 'revenue_generating', 'Sales', '1400000', '24', '', '', '4'],
      ['E002', 'Rahul Mehta', 'revenue_generating', 'Sales', '1600000', '18', '2024-03-15', 'voluntary', '4'],
      ['E003', 'Ananya Iyer', 'management', 'Sales', '2800000', '36', '', '', '5'],
      ['E004', 'Vikram Singh', 'revenue_generating', 'Sales', '1200000', '12', '2024-01-10', 'involuntary', '2'],
      ['E005', 'Deepika Rao', 'support', 'HR', '900000', '48', '', '', '3'],
      ['E006', 'Arjun Nair', 'revenue_generating', 'Marketing', '1500000', '6', '', '', '4'],
      ['E007', 'Meera Joshi', 'management', 'Engineering', '3200000', '60', '', '', '5'],
      ['E008', 'Suresh Kumar', 'revenue_generating', 'Sales', '1100000', '8', '2024-06-01', 'voluntary', '3'],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Revenue-Fluent-Sample-Template.csv';
    a.click(); URL.revokeObjectURL(url);
  },

  // Parse uploaded CSV and compute metrics
  async parseAndCompute(file) {
    return new Promise((resolve, reject) => {
      // Load PapaParse if not already loaded
      const load = window.Papa
        ? Promise.resolve()
        : new Promise((res, rej) => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js';
            s.onload = res; s.onerror = rej;
            document.head.appendChild(s);
          });

      load.then(() => {
        window.Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            try {
              const data = results.data;
              const metrics = this.computeMetrics(data);
              resolve({ raw: data, metrics });
            } catch(e) { reject(e); }
          },
          error: reject,
        });
      });
    });
  },

  computeMetrics(rows) {
    const total = rows.length;
    const exits = rows.filter(r => r.exit_date);
    const involuntary = exits.filter(r => r.exit_type === 'involuntary');
    const revGenRoles = rows.filter(r => r.role_type === 'revenue_generating');
    const mgmtRoles = rows.filter(r => r.role_type === 'management');

    const avgSalary = rows.reduce((s,r) => s + (r.annual_salary_inr||0), 0) / total;
    const totalPayroll = rows.reduce((s,r) => s + (r.annual_salary_inr||0), 0);
    const avgTenureAtExit = exits.length
      ? exits.reduce((s,r) => s + (r.tenure_months||0), 0) / exits.length
      : 0;

    // ATC% calculation
    const replacementCost = exits.reduce((s,r) => s + (r.annual_salary_inr||0) * 1.5, 0);
    // Assume revenue = salary × 6 as proxy if no revenue data
    const estRevenue = totalPayroll * 6;
    const atcPct = Math.round((replacementCost / estRevenue) * 100);

    // OEI
    const oei = Math.round((revGenRoles.length / total) * 100);

    // Avg performance
    const avgPerf = rows.filter(r=>r.performance_rating)
      .reduce((s,r)=>s+(r.performance_rating||0),0) /
      rows.filter(r=>r.performance_rating).length;

    // Exit rate
    const exitRate = Math.round((exits.length / total) * 100);

    return {
      // Raw counts
      totalHeadcount: total,
      totalExits: exits.length,
      involuntaryExits: involuntary.length,
      revGenRoles: revGenRoles.length,
      mgmtRoles: mgmtRoles.length,
      // Financial
      avgSalaryL: Math.round(avgSalary / 100000),
      totalPayrollCr: (totalPayroll / 10000000).toFixed(1),
      // Computed metrics
      atcPct,
      oei,
      exitRate,
      avgTenureAtExitMonths: Math.round(avgTenureAtExit),
      avgPerformanceRating: avgPerf.toFixed(1),
      involuntaryRatioPct: exits.length
        ? Math.round((involuntary.length / exits.length) * 100)
        : 0,
      // Suggested slider values for each pillar
      sliders: {
        p1: {
          exits: exits.length,
          salary: Math.round(avgSalary / 100000),
          revRoles: oei,
          tenure: Math.round(avgTenureAtExit),
          involuntary: exits.length ? Math.round((involuntary.length/exits.length)*100) : 50,
        },
        p3: {
          hc: total,
          layers: mgmtRoles.length > total * 0.2 ? 4 : 2,
          span: mgmtRoles.length > 0 ? Math.round(revGenRoles.length / mgmtRoles.length) : 8,
        },
      },
    };
  },

  // Render the upload panel HTML (injected into tool pages)
  renderPanel(pillarId) {
    return `
      <div class="csv-panel" id="csv-panel-${pillarId}" style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;margin-top:1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.875rem">
          <div class="mono-label">Import Your Org Data</div>
          <button onclick="RF_CSV.downloadTemplate()" class="btn btn-ghost btn-sm" style="font-size:0.72rem;padding:5px 12px">
            ↓ Sample CSV
          </button>
        </div>
        <div id="csv-dropzone-${pillarId}"
          style="border:1.5px dashed var(--border-hi);border-radius:var(--radius-sm);padding:1.25rem;text-align:center;cursor:pointer;transition:all 0.2s"
          onmouseenter="this.style.borderColor='var(--accent)'"
          onmouseleave="this.style.borderColor='var(--border-hi)'"
          onclick="document.getElementById('csv-input-${pillarId}').click()"
          ondragover="event.preventDefault();this.style.borderColor='var(--accent)'"
          ondrop="RF_CSV.handleDrop(event,'${pillarId}')">
          <div style="font-size:1.5rem;margin-bottom:6px">📂</div>
          <div style="font-size:0.82rem;color:var(--text-dim)">Click to upload or drag your CSV</div>
          <div style="font-family:var(--font-mono);font-size:0.58rem;color:var(--text-mute);margin-top:4px">
            employee_id · role_type · salary · exit_date · tenure
          </div>
        </div>
        <input type="file" id="csv-input-${pillarId}" accept=".csv" style="display:none"
          onchange="RF_CSV.handleFileInput(this,'${pillarId}')">
        <div id="csv-result-${pillarId}" style="display:none;margin-top:0.875rem"></div>
      </div>
    `;
  },

  handleDrop(e, pillarId) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) this.processFile(file, pillarId);
  },

  handleFileInput(input, pillarId) {
    const file = input.files[0];
    if (file) this.processFile(file, pillarId);
  },

  async processFile(file, pillarId) {
    const resultEl = document.getElementById(`csv-result-${pillarId}`);
    const dropEl = document.getElementById(`csv-dropzone-${pillarId}`);
    dropEl.innerHTML = '<div style="font-size:1rem;color:var(--accent2);padding:1rem">⟳ Processing...</div>';

    try {
      const { raw, metrics } = await this.parseAndCompute(file);

      // Show summary
      resultEl.style.display = 'block';
      resultEl.innerHTML = `
        <div style="background:var(--bg3);border:1px solid var(--border-accent);border-radius:var(--radius-sm);padding:1rem">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem">
            <div class="mono-label" style="color:var(--teal)">✓ ${raw.length} employees imported</div>
            <button onclick="RF_CSV.applyToTool('${pillarId}')" class="btn btn-primary btn-sm" style="font-size:0.72rem">Apply to tool →</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
            <div style="text-align:center"><div style="font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--teal)">${metrics.totalExits}</div><div style="font-family:var(--font-mono);font-size:0.5rem;color:var(--text-mute);text-transform:uppercase">Exits</div></div>
            <div style="text-align:center"><div style="font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--amber)">${metrics.atcPct}%</div><div style="font-family:var(--font-mono);font-size:0.5rem;color:var(--text-mute);text-transform:uppercase">ATC%</div></div>
            <div style="text-align:center"><div style="font-family:var(--font-mono);font-size:1rem;font-weight:700;color:var(--accent2)">${metrics.oei}%</div><div style="font-family:var(--font-mono);font-size:0.5rem;color:var(--text-mute);text-transform:uppercase">OEI</div></div>
          </div>
        </div>
      `;
      window._csvMetrics = metrics;

      dropEl.innerHTML = `
        <div style="font-size:1rem;margin-bottom:4px">✓</div>
        <div style="font-size:0.8rem;color:var(--teal)">${file.name} loaded</div>
        <div style="font-family:var(--font-mono);font-size:0.58rem;color:var(--text-mute);margin-top:2px">${raw.length} employees · click to change</div>
      `;
      dropEl.onclick = () => document.getElementById(`csv-input-${pillarId}`).click();

    } catch(e) {
      resultEl.style.display = 'block';
      resultEl.innerHTML = `<div style="color:var(--red);font-size:0.82rem;padding:0.5rem">Error reading CSV. Please check the format matches the sample template.</div>`;
      dropEl.innerHTML = '<div style="font-size:0.82rem;color:var(--text-dim);padding:1rem">Click to try again</div>';
    }
  },

  applyToTool(pillarId) {
    const m = window._csvMetrics;
    if (!m) return;
    const s = m.sliders;

    // P1 sliders
    if (pillarId === 'p1') {
      const set = (id, val) => { const el=document.getElementById(id); if(el){el.value=val;} };
      set('sl-exits', s.p1.exits);
      set('sl-salary', s.p1.salary);
      set('sl-hc', m.totalHeadcount);
      set('sl-rev-roles', s.p1.revRoles);
      set('sl-tenure', s.p1.tenure);
      set('sl-involuntary', s.p1.involuntary);
      if (typeof update === 'function') update();
      this._showApplied(pillarId);
    }
    // P3 sliders
    if (pillarId === 'p3') {
      const set = (id, val) => { const el=document.getElementById(id); if(el){el.value=val;} };
      set('sl-hc', s.p3.hc);
      set('sl-layers', s.p3.layers);
      set('sl-span', s.p3.span);
      if (typeof update === 'function') update();
      this._showApplied(pillarId);
    }
  },

  _showApplied(pillarId) {
    const el = document.getElementById(`csv-result-${pillarId}`);
    if (!el) return;
    const existing = el.querySelector('.applied-msg');
    if (existing) return;
    const msg = document.createElement('div');
    msg.className = 'applied-msg';
    msg.style.cssText = 'margin-top:6px;font-family:var(--font-mono);font-size:0.65rem;color:var(--teal);text-align:center';
    msg.textContent = '✓ Sliders updated with your org data';
    el.appendChild(msg);
  },
};

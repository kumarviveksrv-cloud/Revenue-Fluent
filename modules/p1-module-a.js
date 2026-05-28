// ══════════════════════════════════════════════════════
// REVENUE FLUENT — Pillar 1, Module A: The Philosophy
// "People-Revenue Connect — Why HR has never owned
//  revenue, and why that ends today"
// ══════════════════════════════════════════════════════

const P1_MODULE_A = {
  id: 'p1-a',
  pillar: 1,
  module: 'A',
  title: 'The Philosophy',
  tag: 'Module A — Pillar 1',
  badge: { id: 'the-shift', label: 'The Shift', icon: '⚡' },

  beats: [

    // ── BEAT 0: PROVOCATION SCREEN ──────────────────────
    {
      id: 'beat-provocation',
      type: 'provocation',
      render() {
        return `
          <div class="provocation-screen" id="prov-screen">
            <div class="provocation-line" id="pl-0">
              Every rupee of revenue your company ever made —
            </div>
            <div class="provocation-line teal" id="pl-1">
              was made by a person.
            </div>
            <div class="provocation-line dim" id="pl-2">
              HR hired that person. Developed them.<br>Retained them. Designed the team around them.
            </div>
            <div class="provocation-line amber" id="pl-3">
              So why does Finance get the credit?
            </div>
            <div class="provocation-cta" id="prov-cta">
              <button class="btn-primary" onclick="nextBeat()">Let's find out →</button>
              <p style="margin-top:1rem;font-size:0.75rem;color:var(--text-mute);font-family:var(--font-mono)">Module A · 5 interactive beats · ~15 mins</p>
            </div>
          </div>
        `;
      },
      onMount() {
        const delays = [0, 800, 1600, 2600];
        delays.forEach((d, i) => {
          setTimeout(() => {
            const el = document.getElementById('pl-' + i);
            if (el) el.classList.add('visible');
          }, d + 400);
        });
        setTimeout(() => {
          const cta = document.getElementById('prov-cta');
          if (cta) cta.classList.add('visible');
        }, 4200);
      }
    },

    // ── BEAT 1: INTERACTIVE TIMELINE / DRAG ─────────────
    {
      id: 'beat-drag',
      type: 'drag',
      render() {
        return `
          <div class="beat-header">
            <div class="beat-tag">Beat 2 of 5 — The Revenue Mystery</div>
            <h2 class="beat-title">What killed TechVelocity's Q3?</h2>
            <p class="beat-desc">TechVelocity hit ₹3.2Cr target every quarter for 6 quarters. Then Q3 came: ₹2.1Cr. A 34% miss. Before we show you the data — what do you think caused the crash?</p>
          </div>

          <div class="data-card">
            <div class="data-card-header">
              <span class="data-card-title">TechVelocity — Revenue by Quarter</span>
              <span class="data-card-badge">Real scenario data</span>
            </div>
            <div id="chart-bars" style="display:flex;align-items:flex-end;gap:8px;height:100px;margin-bottom:8px">
              ${[88,92,95,100,97,66].map((h,i) => `
                <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
                  <div style="width:100%;border-radius:4px 4px 0 0;background:${i===5?'var(--red)':'var(--teal)'};height:${h}px;opacity:${i===5?1:0.6};transition:height 0.8s ease ${i*100}ms"></div>
                  <span style="font-family:var(--font-mono);font-size:0.6rem;color:var(--text-mute)">Q${i+1}</span>
                </div>
              `).join('')}
            </div>
            <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-mute);text-align:right">Revenue index · Q7 target = 100</div>
          </div>

          <p style="font-size:0.9rem;color:var(--text-dim);margin:1.5rem 0 1rem;font-weight:500">Drag your top suspect into the blame zone:</p>

          <div class="drag-container">
            <div>
              <div class="drag-pool-title">Suspects</div>
              <div class="drag-pool" id="drag-pool">
                ${['Market downturn','Product failure','Wrong hire','Key attrition event','Team restructure','Competitor pricing'].map(s => `
                  <div class="drag-item" draggable="true" data-suspect="${s}"
                    ondragstart="dragStart(event)"
                    ondragend="dragEnd(event)">
                    ${s}
                  </div>
                `).join('')}
              </div>
            </div>
            <div>
              <div class="drag-pool-title">Your verdict</div>
              <div class="drop-zone" id="drop-zone"
                ondragover="dragOver(event)"
                ondragleave="dragLeave(event)"
                ondrop="drop(event)">
                <div style="font-size:0.8rem;color:var(--text-mute);text-align:center;margin:auto" id="drop-hint">Drop your suspect here</div>
              </div>
            </div>
          </div>

          <div id="drag-reveal" style="display:none;margin-top:1.5rem">
            <div class="data-card" style="border-color:var(--teal-glow)">
              <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--teal);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.1em">The reveal</div>
              <p style="font-size:0.95rem;color:var(--text);line-height:1.7;margin-bottom:1rem">
                Interesting choice. Most people pick <strong id="reveal-guess" style="color:var(--amber)"></strong> — because that's the answer the board accepted. But here's what the HR data said 9 months earlier.
              </p>
              <p style="font-size:0.95rem;color:var(--teal);font-weight:500;line-height:1.7">
                It was a people decision. The $240K hire who lasted 11 months, triggered two senior exits, and left the team at 60% productive capacity going into Q3.
              </p>
              <p style="font-size:0.85rem;color:var(--text-mute);margin-top:0.75rem">HR saw the signals. Nobody looked at the data.</p>
            </div>
            <div class="beat-nav">
              <span class="beat-counter">Beat 2 of 5</span>
              <button class="btn-primary" onclick="nextBeat()">That's alarming. Next →</button>
            </div>
          </div>
        `;
      },
      onMount() {
        window.dragStart = (e) => {
          e.target.classList.add('dragging');
          e.dataTransfer.setData('text/plain', e.target.dataset.suspect);
        };
        window.dragEnd = (e) => e.target.classList.remove('dragging');
        window.dragOver = (e) => {
          e.preventDefault();
          document.getElementById('drop-zone').classList.add('drag-over');
        };
        window.dragLeave = (e) => {
          document.getElementById('drop-zone').classList.remove('drag-over');
        };
        window.drop = (e) => {
          e.preventDefault();
          const suspect = e.dataTransfer.getData('text/plain');
          const zone = document.getElementById('drop-zone');
          zone.classList.remove('drag-over');
          zone.innerHTML = `
            <div class="drag-item" style="border-color:var(--amber);color:var(--amber);background:var(--amber-dim);cursor:default">
              ${suspect}
            </div>
            <p style="font-size:0.75rem;color:var(--text-mute);margin-top:8px;font-family:var(--font-mono)">Logged. Revealing the truth...</p>
          `;
          document.getElementById('reveal-guess').textContent = suspect;
          setTimeout(() => {
            document.getElementById('drag-reveal').style.display = 'block';
            document.getElementById('drag-reveal').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 800);
        };
      }
    },

    // ── BEAT 2: CONFESSION WALL ──────────────────────────
    {
      id: 'beat-confession',
      type: 'confession',
      confessions: [
        { org: 'FMCG · 2,400 employees', text: 'Our CEO blamed supply chain for 3 quarters straight. It was one toxic VP destroying two high-performing teams. I had the exit interview data. Nobody asked.' },
        { org: 'SaaS startup · 180 employees', text: '₹8Cr revenue miss. Everyone blamed the economy. I knew it was the reorg — we split a team that had generated 60% of ARR. Within weeks the numbers showed it.' },
        { org: 'Investment bank · 850 employees', text: 'Lost our biggest institutional client. Sales blamed product. Product blamed sales. HR had flagged the relationship manager\'s attrition intent 4 months earlier. We did nothing.' },
        { org: 'IT services · 3,200 employees', text: 'Three quarters of missed targets. The board brought in a consultant. The consultant\'s finding was exactly what HR had reported in the annual engagement survey — leadership quality.' },
        { org: 'Family business · 220 employees', text: 'My father built this company over 30 years. When he stepped back, we lost 40% of our senior team in 18 months. Nobody traced it to the succession decision. I did.' },
        { org: 'Pharma · 1,100 employees', text: 'A ₹12Cr product launch failed. We blamed positioning. The real reason: the product team had 73% new joiners — all still ramping. HR knew. HR wasn\'t in the room.' },
      ],
      render() {
        return `
          <div class="beat-header">
            <div class="beat-tag">Beat 3 of 5 — The Confession Wall</div>
            <h2 class="beat-title">Have you ever seen this happen?</h2>
            <p class="beat-desc">A business problem blamed on the market, the product, or the competition — when you suspected it was actually a people decision?</p>
          </div>

          <div class="confession-vote">
            <button class="vote-btn yes" onclick="castVote('yes', this)">Yes — I've lived this</button>
            <button class="vote-btn no" onclick="castVote('no', this)">No — hasn't happened to me</button>
          </div>

          <div class="vote-result" id="vote-result">
            <div class="vote-bar-wrap">
              <div class="vote-bar-label">Revenue Fluent learners who said YES</div>
              <div class="vote-bar"><div class="vote-bar-fill" id="vote-fill"></div></div>
              <div class="vote-pct" id="vote-pct">0%</div>
              <div class="vote-pct-label">of HR professionals have watched a people decision destroy revenue — while everyone else looked the wrong way.</div>
            </div>

            <p style="font-size:0.85rem;color:var(--text-dim);margin-bottom:1rem;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:0.08em;font-size:0.65rem">From the Revenue Fluent community:</p>

            <div class="confession-wall" id="confession-wall"></div>

            <div class="beat-nav" style="margin-top:2rem">
              <span class="beat-counter">Beat 3 of 5</span>
              <button class="btn-primary" onclick="nextBeat()">I'm not alone. Keep going →</button>
            </div>
          </div>
        `;
      },
      onMount() {
        window.castVote = (vote, btn) => {
          document.querySelectorAll('.vote-btn').forEach(b => b.disabled = true);
          btn.classList.add('selected');
          const result = document.getElementById('vote-result');
          result.classList.add('visible');
          setTimeout(() => {
            const fill = document.getElementById('vote-fill');
            const pct = document.getElementById('vote-pct');
            fill.style.width = '94%';
            let count = 0;
            const timer = setInterval(() => {
              count += 2;
              if (count >= 94) { count = 94; clearInterval(timer); }
              pct.textContent = count + '%';
            }, 20);
          }, 300);
          const wall = document.getElementById('confession-wall');
          P1_MODULE_A.beats[2].confessions.forEach((c, i) => {
            setTimeout(() => {
              const card = document.createElement('div');
              card.className = 'confession-card';
              card.innerHTML = `<div class="confession-org">${c.org}</div>${c.text}`;
              wall.appendChild(card);
            }, i * 400);
          });
        };
      }
    },

    // ── BEAT 3: PROGRESSIVE REVEAL — THE STRUCTURAL LIE ──
    {
      id: 'beat-reveal',
      type: 'reveal',
      lines: [
        { text: 'The HR profession accepted a structural lie.', cls: '' },
        { text: 'That it must "prove" its value to the business.', cls: '' },
        { text: '"Prove" is the problem.', cls: 'punch' },
        { text: 'It positions HR as a defendant in a courtroom.', cls: 'sub' },
        { text: 'Even when HR wins — it wins permission to keep existing.', cls: 'sub' },
        { text: 'Revenue Fluent inverts this completely.', cls: '' },
        { text: 'HR doesn\'t prove its value.', cls: '' },
        { text: 'HR OWNS the value.', cls: 'impact' },
        { text: 'And here\'s how.', cls: 'sub' },
      ],
      render() {
        return `
          <div class="beat-header">
            <div class="beat-tag">Beat 4 of 5 — The Structural Lie</div>
            <h2 class="beat-title">The problem isn't the data.<br>It's the framing.</h2>
          </div>
          <div class="reveal-screen">
            ${P1_MODULE_A.beats[3].lines.map((l, i) => `
              <div class="reveal-line ${l.cls}" id="rl-${i}">${l.text}</div>
            `).join('')}
            <div class="beat-nav" id="reveal-nav" style="opacity:0;transition:opacity 0.5s ease">
              <span class="beat-counter">Beat 4 of 5</span>
              <button class="btn-primary" onclick="nextBeat()">Show me how to own it →</button>
            </div>
          </div>
        `;
      },
      onMount() {
        const lines = P1_MODULE_A.beats[3].lines;
        lines.forEach((_, i) => {
          setTimeout(() => {
            const el = document.getElementById('rl-' + i);
            if (el) el.classList.add('visible');
          }, i * 600);
        });
        setTimeout(() => {
          const nav = document.getElementById('reveal-nav');
          if (nav) nav.style.opacity = '1';
        }, lines.length * 600 + 400);
      }
    },

    // ── BEAT 4: REFRAME CHALLENGE ────────────────────────
    {
      id: 'beat-reframe',
      type: 'reframe',
      pairs: [
        { old: '"HR reduced attrition by 12%"', new: '"HR protected ₹2.3Cr in revenue this quarter"' },
        { old: '"We filled 43 roles this quarter"', new: '"We activated ₹8.2Cr in revenue capacity"' },
        { old: '"Engagement scores improved to 74%"', new: '"Team velocity is up 18% — here\'s what that\'s worth in revenue"' },
        { old: '"L&D trained 200 employees"', new: '"L&D generated ₹1.1Cr in capability ROI"' },
        { old: '"We retained 3 key performers"', new: '"We protected ₹4.7Cr in institutional revenue knowledge"' },
      ],
      render() {
        return `
          <div class="beat-header">
            <div class="beat-tag">Beat 5 of 5 — The Reframe Challenge</div>
            <h2 class="beat-title">Stop proving.<br>Start owning.</h2>
            <p class="beat-desc">These are 5 things HR pros say every day. Click each one to see how a Revenue Fluent professional says the same thing — in Revenue language.</p>
          </div>

          <div class="reframe-grid" id="reframe-grid">
            ${P1_MODULE_A.beats[4].pairs.map((p, i) => `
              <div class="reframe-row" id="rr-${i}" onclick="revealReframe(${i})" style="cursor:pointer">
                <div class="reframe-old" title="Click to reveal">${p.old}</div>
                <div class="reframe-arrow">→</div>
                <div class="reframe-new">${p.new}</div>
              </div>
            `).join('')}
          </div>

          <div id="reframe-complete" style="display:none;margin-top:2rem">
            <div class="data-card" style="border-color:var(--teal-glow);text-align:center;padding:2rem">
              <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--teal);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1rem">Paradigm shift complete</div>
              <p style="font-size:1.1rem;color:var(--text);font-family:var(--font-head);font-weight:700;margin-bottom:0.5rem">You just made the shift most HR pros never make.</p>
              <p style="font-size:0.9rem;color:var(--text-dim)">You stopped proving. You started owning.</p>
            </div>
            <div class="beat-nav" style="margin-top:1.5rem">
              <span class="beat-counter">Beat 5 of 5</span>
              <button class="btn-primary" onclick="completeBeat()">Claim my badge →</button>
            </div>
          </div>
        `;
      },
      onMount() {
        let revealed = 0;
        window.revealReframe = (i) => {
          const row = document.getElementById('rr-' + i);
          if (row.classList.contains('revealed')) return;
          row.classList.add('revealed');
          revealed++;
          if (revealed === P1_MODULE_A.beats[4].pairs.length) {
            setTimeout(() => {
              document.getElementById('reframe-complete').style.display = 'block';
              document.getElementById('reframe-complete').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 400);
          }
        };
      }
    },

    // ── BEAT 5: BADGE UNLOCK ─────────────────────────────
    {
      id: 'beat-badge',
      type: 'badge',
      render() {
        return `
          <div class="badge-unlock">
            <div class="badge-icon">⚡</div>
            <div class="badge-title">Badge Unlocked: The Shift</div>
            <div class="badge-sub">Module A · Pillar 1 · People-Revenue Connect</div>

            <div class="metric-row" style="max-width:480px;margin:0 auto 2rem">
              <div class="metric-cell">
                <div class="metric-cell-label">Beats completed</div>
                <div class="metric-cell-val teal">5/5</div>
              </div>
              <div class="metric-cell">
                <div class="metric-cell-label">Paradigm shifts</div>
                <div class="metric-cell-val amber">5</div>
              </div>
              <div class="metric-cell">
                <div class="metric-cell-label">Module</div>
                <div class="metric-cell-val teal">A ✓</div>
              </div>
            </div>

            <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;max-width:480px;margin:0 auto 2rem;text-align:left">
              <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--teal);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Coming next — Module B</div>
              <div style="font-family:var(--font-head);font-weight:700;font-size:1rem;color:var(--text);margin-bottom:6px">The Attribution Methodology</div>
              <div style="font-size:0.85rem;color:var(--text-dim)">How to trace any people decision to a revenue outcome — with a confidence score. The intellectual framework that makes everything else possible.</div>
            </div>

            <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
              <button class="btn-primary" onclick="goToNextModule()">Continue to Module B →</button>
              <button class="btn-secondary" onclick="shareOnLinkedIn()">Share on LinkedIn</button>
            </div>
          </div>
        `;
      },
      onMount() {
        window.shareOnLinkedIn = () => {
          const text = encodeURIComponent('Just completed Module A of Revenue Fluent — the HR Intelligence Program by Kumar Vivek.\n\nThe paradigm shift: HR doesn\'t prove its value. HR OWNS the value.\n\nLevel 1: People-Revenue Connect 🎯\n\n#RevenueHR #RevenueFluentPractitioner #HUMANCE');
          window.open('https://www.linkedin.com/sharing/share-offsite/?url=https://revenuefluent.com&summary=' + text, '_blank');
        };
        window.goToNextModule = () => {
          const sm = document.getElementById('sm-0');
          if (sm) sm.classList.add('complete');
          const sm1 = document.getElementById('sm-1');
          if (sm1) { sm1.classList.add('active'); sm1.classList.remove('locked'); }
          alert('Module B — The Framework is coming soon! Stay tuned.');
        };
      }
    }

  ]
};

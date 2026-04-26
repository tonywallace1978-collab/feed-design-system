/* render-professional.js — paints every Maria Lopez section from PROFESSIONAL_DATA.
   Reads role from <html data-role="visitor|owner|admin"> (default visitor).
   No frameworks. Vanilla DOM. */
(function () {
  const D = window.PROFESSIONAL_DATA;
  if (!D) { console.error('PROFESSIONAL_DATA missing'); return; }

  const $ = (sel, root) => (root || document).querySelector(sel);
  const fmtMoney = (n) => '$' + Number(n).toLocaleString('en-US');
  const fmtDate = (s) => {
    if (!s) return '—';
    const d = new Date(s);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  const fmtMonthYr = (s) => {
    if (!s) return 'Present';
    const d = new Date(s);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const escapeHtml = (s) => String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  // ── HERO ─────────────────────────────────────────────────────
  function renderHero() {
    const h = D.header;
    const p = D.photo;
    const s = D.quick_stats;
    const r = D.rates;
    const a = D.availability;
    const occ = [h.primary_occupation, ...h.additional_occupations.map(o=>o.name)].slice(0,3).join(' · ');
    const verifiedDot = D.is_id_verified ? '<span title="ID verified" style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#0EA5E9;border-radius:999px;color:#fff;margin-left:8px;vertical-align:middle;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 2px 6px rgba(14,165,233,.5);"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></span>' : '';

    $('#hero-photo').style.backgroundImage = `url('${p.main_url}')`;
    $('#hero-name').innerHTML = escapeHtml(h.display_name) + verifiedDot;
    $('#hero-pronouns').textContent = h.preferred_pronouns;
    $('#hero-occupation').textContent = h.primary_occupation;
    $('#hero-occupations-2').innerHTML = h.additional_occupations.map(o => `<span class="chip">${escapeHtml(o.name)}</span>`).join('');
    $('#hero-tier').textContent = h.occupation_tier_label;
    $('#hero-tagline').textContent = h.tagline;
    $('#hero-location').innerHTML = `<img src="${D.location.country_flag_svg}" alt="" width="16" height="11" style="vertical-align:middle;border-radius:2px;margin-right:6px;border:1px solid rgba(255,255,255,.15)" />${escapeHtml(D.location.city)}, ${escapeHtml(D.location.state)} · ${escapeHtml(D.location.country)}`;
    $('#hero-id').textContent = `ID #${D.user_id} · @${D.username}`;

    // social
    const socialIcons = {
      linkedin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M8.339 18.337v-8.49h-2.822v8.49h2.822zM6.93 8.624a1.636 1.636 0 1 0 0-3.272 1.636 1.636 0 0 0 0 3.272zm11.412 9.713v-4.65c0-2.45-1.317-3.59-3.073-3.59-1.418 0-2.05.78-2.404 1.328v-1.139H10.04c.034.797 0 8.49 0 8.49h2.825v-4.741c0-.254.018-.508.093-.69.204-.508.67-1.034 1.45-1.034 1.025 0 1.434.78 1.434 1.925v4.541h2.5z"/></svg>',
      github: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
      youtube: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
      website: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>'
    };
    $('#hero-social').innerHTML = D.social_links.map(l =>
      `<a href="${l.url}" class="social-icon" title="${l.platform}" target="_blank" rel="noopener">${socialIcons[l.platform]||l.icon}</a>`
    ).join('');

    // quick stats row
    const stats = [
      { l: 'Yrs exp',     v: s.years_experience },
      { l: 'Rating',      v: s.rating_avg.toFixed(2) },
      { l: 'Contracts',   v: s.completed_contracts },
      { l: 'Endorsements',v: s.endorsements_count },
      { l: 'Connections', v: s.connections_count },
    ];
    $('#hero-stats').innerHTML = stats.map(s =>
      `<div class="stat-tile"><div class="kpi-val">${s.v}</div><div class="kpi-label">${s.l}</div></div>`
    ).join('');

    $('#hero-strength-bar').style.width = s.profile_strength_pct + '%';
    $('#hero-strength-pct').textContent = s.profile_strength_pct + '%';
    $('#hero-tagline').textContent = h.tagline;

    // CTAs
    function ctaHtml(c, role) {
      const map = {
        primary: 'gbtn',
        secondary: 'gbtn gbtn-secondary',
        tertiary: 'gbtn gbtn-secondary',
        boost: 'gbtn gbtn-boost'
      };
      const conn = c.kind === 'primary' && c.id === 'connect' ? 'gbtn gbtn-connect' : map[c.kind];
      const credits = c.credits ? ` <span class="badge-mini">${c.credits} credit${c.credits>1?'s':''}</span>` : '';
      return `<button class="${conn}">${escapeHtml(c.label)}${credits}</button>`;
    }
    $('#hero-cta-visitor').innerHTML = D.ctas_visitor.map(c=>ctaHtml(c,'visitor')).join('');
    $('#hero-cta-owner').innerHTML = D.ctas_owner.map(c=>ctaHtml(c,'owner')).join('');
  }

  // ── AVAILABILITY ─────────────────────────────────────────────
  function renderAvailability() {
    const a = D.availability;
    $('#avail-status').innerHTML = `<span class="live-dot"></span>${escapeHtml(a.status)}`;
    $('#avail-next').textContent = fmtDate(a.next_available_date);
    $('#avail-cap').textContent = a.weekly_capacity_hours + ' hrs / wk';
    const flags = [];
    if (a.willing_overtime) flags.push('OT OK');
    if (a.willing_weekends) flags.push('Weekends OK');
    if (!a.willing_nightshift) flags.push('No nights');
    $('#avail-flags').innerHTML = flags.map(f=>`<span class="chip">${f}</span>`).join('');
  }

  // ── RATES ────────────────────────────────────────────────────
  function renderRates() {
    const r = D.rates;
    const tiles = [
      { l: 'Default', v: '$' + r.hourly_default.toFixed(2), u: '/ hr' },
      { l: 'Emergency', v: '$' + r.hourly_emergency.toFixed(2), u: '/ hr' },
      { l: 'Remote', v: '$' + r.hourly_remote.toFixed(2), u: '/ hr' },
      { l: 'WG premium', v: '+' + r.white_glove_premium_pct + '%', u: 'on top' },
    ];
    $('#rate-tiles').innerHTML = tiles.map(t =>
      `<div class="rate-tile"><div class="kpi-label">${t.l}</div><div class="rate-val">${t.v}</div><div class="rate-u">${t.u}</div></div>`
    ).join('');
    $('#rate-band').textContent = `Salary band: ${fmtMoney(r.salary_band_min)} – ${fmtMoney(r.salary_band_max)} / yr`;
    $('#rate-eng').textContent = r.preferred_engagement;
  }

  // ── CONNECTIONS ──────────────────────────────────────────────
  function renderConnections() {
    const c = D.quick_stats;
    $('#conn-total').textContent = c.connections_count.toLocaleString();
    $('#conn-month').textContent = '+' + 14;
    $('#conn-quarter').textContent = '+' + 41;
  }

  // ── BUSINESS AFFILIATION ─────────────────────────────────────
  function renderAffiliation() {
    const b = D.business_affiliation;
    $('#aff-logo').innerHTML = `<img src="${b.company_logo}" alt="${escapeHtml(b.company_name)}" />`;
    $('#aff-name').textContent = b.company_name;
    $('#aff-role').textContent = b.company_role;
    $('#aff-class').textContent = b.company_classification;
    $('#aff-joined').textContent = `Joined ${fmtMonthYr(b.joined_at)}`;
    $('#aff-rate').textContent = `${b.weekly_committed_hours} hrs / wk · ${fmtMoney(b.rate_through_company)}/hr through co. · ${fmtMoney(b.rate_independent)}/hr direct`;
  }

  // ── BUSINESS GROUPS ──────────────────────────────────────────
  function renderGroups() {
    $('#groups-list').innerHTML = D.business_groups.map(g => `
      <div class="bg-row">
        <div class="bg-mark" style="background:${g.logo_color}">${escapeHtml(g.name.split(' ').map(w=>w[0]).slice(0,2).join(''))}</div>
        <div class="bg-meta">
          <div class="bg-name">${escapeHtml(g.name)}</div>
          <div class="bg-sub">${escapeHtml(g.role)} · ${g.members_count} members · ${g.available_now} available now</div>
        </div>
        <button class="gbtn gbtn-secondary sm">View</button>
      </div>
    `).join('');
    $('#groups-count').textContent = D.business_groups.length + ' groups';
  }

  // ── SECURE FILES (OWNER) ─────────────────────────────────────
  function renderSecureFiles() {
    const items = D.secure_files.files;
    const statusMap = {
      uploaded: 'ok',
      missing:  'warn',
      pending:  'warn',
      expired:  'warn'
    };
    $('#files-list').innerHTML = items.map(f => {
      const exp = f.expires_at ? `expires ${fmtDate(f.expires_at)}` : 'no expiry';
      return `<div class="file-row">
        <div class="file-icon" data-type="${f.type}">${{tax:'§',coi:'⛨',id:'#',cert:'✓',background:'⌖',payment:'$'}[f.type] || '·'}</div>
        <div class="file-meta">
          <div class="file-name">${escapeHtml(f.name)}</div>
          <div class="file-sub">${exp} · ${f.size_kb}KB</div>
        </div>
        <span class="chip ${statusMap[f.status]||''}">${f.status.toUpperCase()}</span>
      </div>`;
    }).join('');
    $('#files-count').textContent = `${items.length} files · ${items.filter(f=>f.status==='uploaded').length} uploaded`;
  }

  // ── PRIVATE INFO (OWNER) ─────────────────────────────────────
  function renderPrivate() {
    $('#private-list').innerHTML = D.private_info.fields.map(f => `
      <div class="kv-row">
        <div class="kv-key">${escapeHtml(f.label)}</div>
        <div class="kv-val${f.masked?' masked':''}">${escapeHtml(f.value)}${f.masked?' <button class="kv-eye" title="Reveal">👁</button>':''}</div>
      </div>
    `).join('');
  }

  // ── ACTIVE APPLICATION (OWNER) ───────────────────────────────
  function renderActiveApp() {
    $('#active-app').innerHTML = `
      <!-- Active application — canonical, per specs/COPY-BLOCKS.md § 1 "Active application card body".
           Contract = Acme Robotics / Ford Rouge palletizer (Standard tier, NOT White Glove).
           Stage = Shortlisted, final-round interview April 28 3 PM. Do NOT ad-lib. -->
      <div class="card-tag live"><span class="dot"></span>APPLICATION OPEN</div>
      <div class="card-title">Acme Robotics · Ford Rouge palletizer</div>
      <div class="card-sub">Standard hourly · Dearborn, MI</div>
      <p class="card-sub" style="margin-top:8px;">Applied <span class="mono-700">April 23</span>. Shortlisted within <span class="mono-700">36 hours</span>. Final-round interview scheduled Tuesday <span class="mono-700">April 28 at 3:00 PM EST</span>. Match score <span class="mono-700">97%</span>.</p>
      <div class="cta-row" style="margin-top:13px">
        <button class="gbtn sm">View contract</button>
        <button class="gbtn gbtn-secondary sm">Withdraw</button>
      </div>
    `;
  }

  // ── WATCHERS (OWNER) ─────────────────────────────────────────
  // Driven by D.watchers.recent per specs/SECTIONS.md § 1 left-rail item 10.
  // Owner-only. Data already in professional.json (count + recent[8] with {name, type, since}).
  function renderWatchers() {
    const watcherLogo = (name) => {
      const slug = String(name||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      // Name → logo-file mapping for the few cases where slugified name doesn't match the asset filename.
      const map = {
        'ford-motor-company':   'ford-motor-company',
        'bmw-manufacturing':    'bmw',
        'acme-robotics':        'automate-america',
        'general-motors':       'general-motors',
        'stellantis':           'stellantis',
        'toyota-manufacturing': 'toyota',
        'honda-manufacturing':  'honda',
        'magna-international':  'magna-international'
      };
      return 'assets/logos/' + (map[slug] || slug) + '.png';
    };
    const watcherRel = (iso) => {
      const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
      if (days < 1) return 'today';
      if (days < 7) return days + ' day' + (days === 1 ? '' : 's') + ' ago';
      if (days < 14) return '1 wk ago';
      if (days < 30) return Math.floor(days / 7) + ' wks ago';
      return Math.floor(days / 30) + ' mo ago';
    };
    // Derived rows from canonical D.watchers.recent. Variable name kept as `fakeWatchers`
    // for minimal-diff against the legacy block; the data is no longer fake.
    const fakeWatchers = ((D.watchers && D.watchers.recent) || []).map(item => ({
      name: item.name,
      logo: watcherLogo(item.name),
      when: watcherRel(item.since)
    }));
    $('#watchers-list').innerHTML = fakeWatchers.map(w => `
      <div class="watcher-row">
        <div class="watcher-logo"><img src="${w.logo}" alt="" /></div>
        <div class="watcher-meta">
          <div class="watcher-name">${escapeHtml(w.name)}</div>
          <div class="watcher-when">added watch · ${w.when}</div>
        </div>
      </div>
    `).join('');
  }

  // ── BADGES SHOWCASE ──────────────────────────────────────────
  function renderBadges() {
    const earned = D.badges_earned.slice().sort((a,b) => {
      const tierOrder = { Diamond: 0, Platinum: 1, Gold: 2, Silver: 3, Bronze: 4 };
      return (tierOrder[a.tier]??99) - (tierOrder[b.tier]??99);
    });
    // Locked placeholders (showcase)
    const locked = [
      { name: 'Reach Engineer',    category: 'Reach' },
      { name: 'Decade Veteran',    category: 'Tenure' },
      { name: 'Diamond Endorser',  category: 'Endorser' },
    ];
    $('#badges-list').innerHTML =
      earned.map(b => `
        <div class="badge-stack" title="${escapeHtml(b.criterion)}">
          <img src="${b.asset}" alt="${escapeHtml(b.name)}" class="badge-img" />
          <div class="badge-label">${escapeHtml(b.name)}</div>
          <div class="badge-tier">${b.tier.toUpperCase()}</div>
        </div>
      `).join('') +
      locked.map(b => `
        <div class="badge-stack locked" title="Not yet earned">
          <div class="badge-img badge-locked-shape">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>
          </div>
          <div class="badge-label">${escapeHtml(b.name)}</div>
          <div class="badge-tier locked">LOCKED</div>
        </div>
      `).join('');
    $('#badges-count').textContent = `${earned.length} earned · ${locked.length} locked`;
  }

  // ── SKILLS ───────────────────────────────────────────────────
  function renderSkills() {
    $('#skills-list').innerHTML = D.skills_certified.map(s => `
      <div class="skill-row${s.primary?' primary':''}">
        <div class="skill-logo"><img src="${s.logo}" alt="${escapeHtml(s.manufacturer)}" /></div>
        <div class="skill-meta">
          <div class="skill-name">${escapeHtml(s.manufacturer)} ${s.primary?'<span class="chip accent" style="font-size:9px">PRIMARY</span>':''}</div>
          <div class="skill-models">${escapeHtml(s.models)}</div>
          ${s.certifications.length ? `<div class="skill-certs">${s.certifications.map(c=>`<span class="chip">${escapeHtml(c)}</span>`).join('')}</div>` : ''}
        </div>
        <div class="skill-stats">
          <div class="skill-yrs"><span class="mono-700">${s.years}</span><span class="kpi-label">yrs</span></div>
          <div class="skill-rating"><span class="stars">★</span><span class="mono-700">${s.rating.toFixed(2)}</span></div>
          <div class="skill-end"><span class="mono-700">${s.endorsements}</span><span class="kpi-label">endorse</span></div>
        </div>
      </div>
    `).join('');
  }

  // ── ABOUT ────────────────────────────────────────────────────
  function renderAbout() {
    $('#about-tagline').textContent = D.header.tagline;
    $('#about-bio').innerHTML = `
      <p>Senior Controls Engineer in Detroit. Nine years on the floor — Wayne State BSEE (Magna Cum Laude, '15), Henry Ford College AAS ('13), Magna International '15-'18, then 1099 with Acme Robotics from '18 forward. Specialty: body-in-white retrofits and high-mix vision-guided assembly for the Detroit-3 OEMs.</p>
      <p>I write Studio 5000 and TIA Portal code that the next person can read. I ship documentation with every commissioning, not after. I retire legacy code instead of layering on it. When a cell is down at 11 PM, I'm on-site by 6 AM with a fix; I learned that habit at Magna and it's never failed me. I've trained three junior controls engineers to independent commissioning capability and authored the Acme Studio 5000 style guide.</p>
      <p>I take engagements that respect the work — clear scope, real safety, and a customer who lets me retire bad code rather than wallpaper over it. I bid white-glove engagements through Acme; I take direct hourly work where the fit is clear. Open to 4-6 week onsite engagements within 250 miles of Detroit, plus emergency support 24/7 in SE Michigan.</p>
    `;
  }

  // ── REVIEWS CAROUSEL ─────────────────────────────────────────
  function renderReviews() {
    const reviews = D.reviews_received.slice(0, 5);
    $('#reviews-list').innerHTML = reviews.map(r => {
      const stars = '★★★★★☆☆'.slice(5 - r.rating, 10 - r.rating);
      const wg = r.white_glove;
      const logo = wg ? '<div class="rev-logo wg">◇</div>' :
        (r.company_logo ? `<div class="rev-logo"><img src="${r.company_logo}" alt="${escapeHtml(r.company)}" /></div>` :
         `<div class="rev-logo placeholder">${escapeHtml(r.company.slice(0,2).toUpperCase())}</div>`);
      return `<div class="rev-card glass-card${wg?' wg':''}">
        <div class="rev-head">
          ${logo}
          <div class="rev-meta">
            <div class="rev-company">${escapeHtml(r.company)}</div>
            <div class="rev-name">${escapeHtml(r.reviewer_name)} · <span style="color:var(--glass-text-tertiary)">${escapeHtml(r.reviewer_role)}</span></div>
          </div>
          <div class="rev-stars stars">${stars}</div>
        </div>
        <div class="rev-text">${escapeHtml(r.text)}</div>
        <div class="rev-foot">
          <span class="row-meta">${escapeHtml(r.contract_title)}</span>
          <span class="row-meta">${fmtDate(r.date)}</span>
        </div>
      </div>`;
    }).join('');
    $('#reviews-count').textContent = `${D.quick_stats.rating_avg.toFixed(2)} ★ · ${D.reviews_received.length} reviews`;
  }

  // ── EXPERIENCE ───────────────────────────────────────────────
  function renderExperience() {
    $('#exp-list').innerHTML = D.experience.map(e => `
      <div class="exp-card glass-card">
        <div class="exp-head">
          ${e.company_logo
            ? `<div class="exp-logo"><img src="${e.company_logo}" alt="${escapeHtml(e.company)}" /></div>`
            : `<div class="exp-logo placeholder">${escapeHtml(e.company.split(' ').map(w=>w[0]).slice(0,2).join(''))}</div>`}
          <div class="exp-meta">
            <div class="exp-role">${escapeHtml(e.role)}</div>
            <div class="exp-company">${escapeHtml(e.company)} · ${escapeHtml(e.city)}</div>
            <div class="exp-dates mono">${fmtMonthYr(e.start)} → ${e.current ? '<span style="color:#34D399">Present</span>' : fmtMonthYr(e.end)} · ${Math.floor(e.duration_months/12)}y ${e.duration_months%12}mo</div>
          </div>
        </div>
        <p class="exp-desc">${escapeHtml(e.description)}</p>
        <ul class="exp-highlights">${e.highlights.map(h=>`<li>${escapeHtml(h)}</li>`).join('')}</ul>
      </div>
    `).join('');
  }

  // ── CERTIFICATIONS ───────────────────────────────────────────
  function renderCertifications() {
    $('#certs-list').innerHTML = D.certifications.map(c => `
      <div class="cert-row${c.renewal_due_soon?' warn':''}">
        <div class="cert-mark">${escapeHtml(c.issuer.slice(0,3).toUpperCase())}</div>
        <div class="cert-meta">
          <div class="cert-name">${escapeHtml(c.name)}</div>
          <div class="cert-sub">Issued ${fmtMonthYr(c.issued)} · ${c.expires ? `Expires ${fmtMonthYr(c.expires)}` : 'No expiry'}${c.credential_id ? ` · #${escapeHtml(c.credential_id)}` : ''}</div>
        </div>
        ${c.verify_url ? `<a class="gbtn gbtn-secondary sm" href="${c.verify_url}" target="_blank">Verify</a>` : '<span class="chip">FILED</span>'}
      </div>
    `).join('');
    $('#certs-count').textContent = `${D.certifications.length} certifications · ${D.certifications.filter(c=>c.renewal_due_soon).length} renewal due`;
  }

  // ── EDUCATION ────────────────────────────────────────────────
  function renderEducation() {
    $('#edu-list').innerHTML = D.education.map(e => `
      <div class="edu-row">
        <div class="edu-mark">⌒</div>
        <div class="edu-meta">
          <div class="edu-degree">${escapeHtml(e.degree)}${e.concentration?` · ${escapeHtml(e.concentration)}`:''}</div>
          <div class="edu-school">${escapeHtml(e.school)} · ${escapeHtml(e.city)}</div>
          <div class="edu-sub mono">${e.graduated_year}${e.gpa?` · GPA ${e.gpa}`:''}${e.honors?` · ${escapeHtml(e.honors)}`:''}</div>
        </div>
      </div>
    `).join('');
  }

  // ── LANGUAGES ────────────────────────────────────────────────
  function renderLanguages() {
    $('#lang-list').innerHTML = D.languages.map(l => `
      <div class="lang-tile">
        <div class="lang-name">${escapeHtml(l.name)}</div>
        <div class="lang-prof"><span class="chip ${l.proficiency==='Native'?'ok':''}">${escapeHtml(l.proficiency)}</span></div>
      </div>
    `).join('');
  }

  // ── EQUIPMENT ────────────────────────────────────────────────
  function renderEquipment() {
    $('#eq-list').innerHTML = D.equipment_owned.map(g => `
      <div class="eq-cat">
        <div class="eq-cat-name">${escapeHtml(g.category)}</div>
        <ul class="eq-items">
          ${g.items.map(i=>`<li>${escapeHtml(i)}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // ── SERVICE RADIUS ───────────────────────────────────────────
  function renderRadius() {
    const L = D.location;
    $('#radius-meta').innerHTML = `
      <div class="kpi-label">HOME BASE</div>
      <div class="card-title">${escapeHtml(L.city)}, ${escapeHtml(L.state)}</div>
      <div class="row-meta" style="margin-top:8px">${L.postal_code} · ${L.lat.toFixed(2)}°N, ${Math.abs(L.lng).toFixed(2)}°W</div>
      <div class="divider"></div>
      <div class="kpi-label">TRAVEL RADIUS</div>
      <div class="kpi-val" style="font-size:32px">${L.service_radius_miles}<span style="font-size:14px;color:var(--glass-text-tertiary);font-weight:500;margin-left:4px">mi</span></div>
      <div class="row-meta" style="margin-top:8px;text-wrap:pretty">${escapeHtml(L.travel_notes)}</div>
    `;
    // Schematic radius "map" (concentric circles, no Mapbox)
    $('#radius-map').innerHTML = `
      <svg viewBox="0 0 280 220" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="rad-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(99,102,241,0.30)"/>
            <stop offset="60%" stop-color="rgba(99,102,241,0.10)"/>
            <stop offset="100%" stop-color="rgba(99,102,241,0)"/>
          </radialGradient>
        </defs>
        <rect width="280" height="220" fill="rgba(255,255,255,0.02)"/>
        <!-- grid -->
        ${[40,80,120,160,200,240].map(x=>`<line x1="${x}" y1="0" x2="${x}" y2="220" stroke="rgba(255,255,255,0.04)"/>`).join('')}
        ${[30,60,90,120,150,180,210].map(y=>`<line x1="0" y1="${y}" x2="280" y2="${y}" stroke="rgba(255,255,255,0.04)"/>`).join('')}
        <!-- radius circles (250mi → ~95px) -->
        <circle cx="140" cy="110" r="95" fill="url(#rad-g)" stroke="rgba(99,102,241,0.40)" stroke-dasharray="3 4"/>
        <circle cx="140" cy="110" r="60" fill="none" stroke="rgba(99,102,241,0.30)" stroke-dasharray="2 4"/>
        <circle cx="140" cy="110" r="30" fill="none" stroke="rgba(99,102,241,0.25)" stroke-dasharray="2 4"/>
        <!-- nearby cities -->
        <g font-family="JetBrains Mono" font-size="9" fill="rgba(255,255,255,0.55)">
          <circle cx="98"  cy="92"  r="2" fill="#A5B4FC"/><text x="103" y="91">Ann Arbor</text>
          <circle cx="170" cy="135" r="2" fill="#A5B4FC"/><text x="175" y="138">Toledo</text>
          <circle cx="58"  cy="152" r="2" fill="#A5B4FC"/><text x="63"  y="155">Lansing</text>
          <circle cx="200" cy="65"  r="2" fill="#A5B4FC"/><text x="205" y="68">Saginaw</text>
          <circle cx="220" cy="170" r="2" fill="#A5B4FC"/><text x="180" y="178">Cleveland</text>
        </g>
        <!-- home pin -->
        <g>
          <circle cx="140" cy="110" r="6" fill="#34D399"/>
          <circle cx="140" cy="110" r="11" fill="none" stroke="#34D399" stroke-opacity="0.6"/>
          <text x="148" y="113" font-family="Outfit" font-size="11" font-weight="600" fill="#fff">Detroit</text>
        </g>
      </svg>
    `;
  }

  // ── ENDORSEMENTS ─────────────────────────────────────────────
  function renderEndorsements() {
    const all = D.endorsements;
    const top = all.slice(0, 12);
    // group by skill
    const bySkill = {};
    all.forEach(e => { (bySkill[e.skill] ||= []).push(e); });
    $('#end-list').innerHTML = top.map(e => `
      <div class="end-row">
        <div class="end-avatar" style="background-image:url('${e.from_avatar}')"></div>
        <div class="end-meta">
          <div class="end-name">${escapeHtml(e.from_name)}</div>
          <div class="end-role">${escapeHtml(e.from_role)}</div>
        </div>
        <div class="end-skill"><span class="chip accent">${escapeHtml(e.skill)}</span></div>
        <div class="end-date mono">${fmtDate(e.date)}</div>
      </div>
    `).join('');
    $('#end-skills').innerHTML = Object.entries(bySkill).map(([s,es]) =>
      `<span class="chip">${escapeHtml(s)} · <span style="color:var(--glass-text-primary);font-weight:700">${es.length}</span></span>`
    ).join('');
    $('#end-count').textContent = `${all.length} endorsements across ${Object.keys(bySkill).length} skills`;
  }

  // ── PORTFOLIO ────────────────────────────────────────────────
  // Driven by D.portfolio_links (7 entries) per specs/SECTIONS.md § 1 right-col Portfolio.
  // kind → icon (video ▶ · code ⌘ · talk ◎ · doc §). Source label = URL hostname.
  function renderPortfolio() {
    const iconFor = { video: '▶', code: '⌘', talk: '◎', doc: '§' };
    const hostFor = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return u; } };
    const items = (D.portfolio_links || []).map(p => ({
      kind:  p.kind,
      title: p.title,
      url:   p.url,
      src:   hostFor(p.url),
      icon:  iconFor[p.kind] || '·'
    }));
    $('#port-list').innerHTML = items.map(p => `
      <a class="port-card" href="${escapeHtml(p.url)}" target="_blank" rel="noopener">
        <div class="port-icon">${p.icon}</div>
        <div class="port-meta">
          <div class="port-title">${escapeHtml(p.title)}</div>
          <div class="port-src">${escapeHtml(p.src)}</div>
        </div>
        <span class="port-kind">${p.kind.toUpperCase()}</span>
      </a>
    `).join('');
  }

  // ── ADMIN NOTES ──────────────────────────────────────────────
  function renderAdmin() {
    $('#admin-meta').innerHTML = `
      <!-- Tiles + note driven by D.admin_notes per specs/ROLE-OVERRIDES.md "admin role".
           Free-text note is verbatim from professional.json; fake signature dropped (no canonical signer in data). -->
      <div class="admin-grid">
        <div class="admin-tile"><div class="kpi-label">TRUST SCORE</div><div class="kpi-val" style="color:#34D399">${(D.admin_notes||{}).trust_score ?? '—'}</div></div>
        <div class="admin-tile"><div class="kpi-label">KYC STATUS</div><div class="kpi-val" style="font-size:18px;color:#34D399">${(D.admin_notes||{}).background_check_status === 'PASSED' ? 'VERIFIED' : 'PENDING'}</div></div>
        <div class="admin-tile"><div class="kpi-label">DISPUTES</div><div class="kpi-val">${(D.admin_notes||{}).contract_disputes_lifetime ?? 0}</div></div>
        <div class="admin-tile"><div class="kpi-label">FLAGS</div><div class="kpi-val">${(((D.admin_notes||{}).warnings)||[]).length}</div></div>
        <div class="admin-tile"><div class="kpi-label">2FA</div><div class="kpi-val" style="font-size:18px;color:#34D399">${D.two_factor_enabled ? 'ON' : 'OFF'}</div></div>
        <div class="admin-tile"><div class="kpi-label">TIER OVERRIDE</div><div class="kpi-val" style="font-size:18px">${escapeHtml((D.admin_notes||{}).tier_override || '—')}</div></div>
      </div>
      <div class="admin-note">
        <div class="kpi-label">ADMIN NOTE</div>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:var(--glass-text-secondary)">
          ${escapeHtml((D.admin_notes||{}).free_text_admin_note || '')}
        </p>
      </div>
      <div class="cta-row" style="margin-top:13px">
        <button class="gbtn gbtn-secondary sm">Open audit log</button>
        <button class="gbtn gbtn-secondary sm">View KYC bundle</button>
        <button class="gbtn gbtn-boost sm">⚡ Boost profile</button>
        <button class="gbtn gbtn-secondary sm">Override tier</button>
      </div>
    `;
  }

  // ── ROLE TOGGLE ──────────────────────────────────────────────
  function wireRoleToggle() {
    const root = document.documentElement;
    const buttons = document.querySelectorAll('[data-role-btn]');
    function set(role) {
      root.setAttribute('data-role', role);
      buttons.forEach(b => b.classList.toggle('active', b.dataset.roleBtn === role));
      try { localStorage.setItem('aa-role', role); } catch (e) {}
    }
    buttons.forEach(b => b.addEventListener('click', () => set(b.dataset.roleBtn)));
    let saved = 'visitor';
    try { saved = localStorage.getItem('aa-role') || 'visitor'; } catch (e) {}
    set(saved);
  }

  // ── boot ─────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    try { renderHero(); } catch (e) { console.error('hero', e); }
    try { renderAvailability(); } catch (e) { console.error('avail', e); }
    try { renderRates(); } catch (e) { console.error('rates', e); }
    try { renderConnections(); } catch (e) { console.error('conn', e); }
    try { renderAffiliation(); } catch (e) { console.error('aff', e); }
    try { renderGroups(); } catch (e) { console.error('groups', e); }
    try { renderSecureFiles(); } catch (e) { console.error('files', e); }
    try { renderPrivate(); } catch (e) { console.error('private', e); }
    try { renderActiveApp(); } catch (e) { console.error('app', e); }
    try { renderWatchers(); } catch (e) { console.error('watchers', e); }
    try { renderBadges(); } catch (e) { console.error('badges', e); }
    try { renderSkills(); } catch (e) { console.error('skills', e); }
    try { renderAbout(); } catch (e) { console.error('about', e); }
    try { renderReviews(); } catch (e) { console.error('reviews', e); }
    try { renderExperience(); } catch (e) { console.error('exp', e); }
    try { renderCertifications(); } catch (e) { console.error('certs', e); }
    try { renderEducation(); } catch (e) { console.error('edu', e); }
    try { renderLanguages(); } catch (e) { console.error('lang', e); }
    try { renderEquipment(); } catch (e) { console.error('eq', e); }
    try { renderRadius(); } catch (e) { console.error('radius', e); }
    try { renderEndorsements(); } catch (e) { console.error('end', e); }
    try { renderPortfolio(); } catch (e) { console.error('port', e); }
    try { renderAdmin(); } catch (e) { console.error('admin', e); }
    wireRoleToggle();
  });
})();

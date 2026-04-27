/* render-company.js — Acme Robotics business profile */
(function () {
  const D = window.COMPANY_DATA;
  if (!D) return console.error('COMPANY_DATA missing');
  const $ = (s, r) => (r||document).querySelector(s);
  const fmtMoney = n => n == null ? '—' : '$' + Number(n).toLocaleString('en-US');
  const fmtMoneyShort = n => {
    if (n == null) return '—';
    if (n >= 1e6) return '$' + (n/1e6).toFixed(2) + 'M';
    if (n >= 1e3) return '$' + (n/1e3).toFixed(0) + 'K';
    return '$' + n;
  };
  const fmtDate = s => s ? new Date(s).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) : '—';
  const esc = s => String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  const h = D.header, st = D.stats, br = D.company_brief;

  // HERO
  $('#hero-name').innerHTML = esc(h.name) + ' <span title="CSIA-certified · KYC verified" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:linear-gradient(135deg,#A855F7,#7C3AED);border-radius:999px;color:#fff;margin-left:10px;vertical-align:middle;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 2px 8px rgba(168,85,247,.5);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></span>';
  $('#hero-tagline').textContent = h.tagline;
  $('#hero-class').innerHTML = `<span class="ind-tag">${esc(h.classification)}</span><span class="ind-tag">Founded ${h.founded}</span><span class="ind-tag">${esc(h.size_label)}</span>`;
  $('#hero-loc').textContent = `HQ: ${h.head_office_city}, ${h.head_office_state}`;
  $('#hero-id').textContent = `ID #${D.company_id} · @${D.slug}`;

  // Logo placeholder (initials, since real Acme logo not licensed)
  const initials = h.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
  $('#hero-logo').innerHTML = `<div class="logo-mark"><span>${initials}</span></div>`;

  // Stats strip
  const stats = [
    { l: 'ACTIVE', v: st.active_contracts },
    { l: 'COMPLETED', v: st.completed_contracts },
    { l: 'BILLINGS', v: fmtMoneyShort(st.lifetime_billings_usd) },
    { l: 'RATING', v: st.avg_rating_received.toFixed(2) + ' ★' },
    { l: 'TEAM', v: st.active_team_size_on_platform },
    { l: 'OPEN ROLES', v: st.open_positions },
    { l: 'REHIRE %', v: st.rehire_rate_pct + '%' },
    { l: 'TENURE', v: st.tenure_years + 'y' },
  ];
  $('#hero-stats').innerHTML = stats.map(s => `<div class="stat-tile"><div class="kpi-val">${s.v}</div><div class="kpi-label">${s.l}</div></div>`).join('');
  $('#hero-strength-bar').style.width = st.profile_strength_pct + '%';
  $('#hero-strength-pct').textContent = st.profile_strength_pct + '%';

  // CTAs
  function ctaHtml(c) {
    const cls = { primary:'gbtn', secondary:'gbtn gbtn-secondary', tertiary:'gbtn gbtn-secondary', boost:'gbtn gbtn-boost' }[c.kind] || 'gbtn';
    return `<button class="${cls}">${esc(c.label)}</button>`;
  }
  $('#hero-cta-visitor').innerHTML = D.ctas_visitor.map(ctaHtml).join('');
  $('#hero-cta-owner').innerHTML = D.ctas_owner.map(ctaHtml).join('');

  // INDUSTRIES + SERVICE RADIUS in side bar
  $('#industries-list').innerHTML = br.industries_served.map(i => `<span class="ind-tag big">${esc(i)}</span>`).join('');
  $('#radius-info').innerHTML = `
    <div style="text-align:center;padding:21px 13px;">
      <div class="kpi-label">SERVICE RADIUS</div>
      <div class="kpi-val" style="font-size:38px !important;line-height:1;margin-top:6px;background:linear-gradient(135deg,#0EA5E9,#34D399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${br.service_radius_miles}</div>
      <div style="font-family:'JetBrains Mono';font-size:11px;color:var(--glass-text-secondary);font-weight:700;margin-top:2px;">MILES FROM DETROIT</div>
      <div style="margin-top:11px;font-size:12px;color:var(--glass-text-secondary);font-weight:500;">3 branches: Detroit, Spartanburg, Louisville</div>
      <div style="margin-top:6px;font-family:'JetBrains Mono';font-size:10px;color:${br.willing_to_travel_intl?'#34D399':'var(--glass-text-tertiary)'};font-weight:700;letter-spacing:0.06em;">${br.willing_to_travel_intl?'✓':'✗'} INTERNATIONAL</div>
    </div>`;

  // ADDRESSES (3 branches)
  $('#addresses-list').innerHTML = D.addresses.map(a => `
    <div class="addr-row">
      <div class="addr-pin" style="background:${a.kind==='head_office'?'linear-gradient(135deg,#A855F7,#7C3AED)':'rgba(255,255,255,0.06)'};${a.kind!=='head_office'?'border:1px solid rgba(255,255,255,0.10)':''}">${a.kind==='head_office'?'★':'·'}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-family:'Outfit';font-weight:700;font-size:13px;color:var(--glass-text-primary)">${esc(a.city)}, ${esc(a.state)}${a.kind==='head_office'?' <span class="chip accent" style="font-size:9px;margin-left:4px">HQ</span>':''}</div>
        <div style="font-size:11px;color:var(--glass-text-tertiary);font-weight:500;margin-top:1px;">${esc(a.address)}</div>
        <div style="font-family:'JetBrains Mono';font-size:11px;color:var(--glass-text-secondary);font-weight:600;margin-top:2px">${esc(a.phone)}</div>
      </div>
    </div>`).join('');

  // RATES
  const r = D.rates;
  $('#rates-list').innerHTML = `
    <div class="rate-grid">
      <div class="rate-tile"><div class="kpi-label">DEFAULT</div><div class="kpi-val">$${r.hourly_default}</div><div class="rate-sub">/hr</div></div>
      <div class="rate-tile alert"><div class="kpi-label">EMERGENCY</div><div class="kpi-val" style="color:#FB923C">$${r.hourly_emergency}</div><div class="rate-sub">/hr · 24/7</div></div>
      <div class="rate-tile"><div class="kpi-label">FIXED MIN</div><div class="kpi-val">${fmtMoneyShort(r.fixed_bid_minimum_usd)}</div><div class="rate-sub">project</div></div>
      <div class="rate-tile wg"><div class="kpi-label">WHITE GLOVE</div><div class="kpi-val" style="color:#E9D5FF">+${r.white_glove_premium_pct}%</div><div class="rate-sub">premium</div></div>
    </div>
    <div style="margin-top:11px;font-size:12px;color:var(--glass-text-secondary);font-weight:500;text-align:center;">
      ${r.rate_negotiable ? '⊕ Rates negotiable for 6+ week engagements' : 'Rates fixed'}
    </div>`;

  // FILES (owner)
  $('#files-list').innerHTML = D.secure_files.files.map(f => `
    <div class="file-row">
      <div class="file-icon">${({coi:'⛨',tax:'#',cert:'✓',legal:'§',policy:'📋',compliance:'⚙'}[f.type])||'·'}</div>
      <div class="file-meta">
        <div class="file-name">${esc(f.name)}</div>
        <div class="file-sub">uploaded ${fmtDate(f.uploaded_at)} · ${f.expires_at?'expires '+fmtDate(f.expires_at):'no expiry'} · ${f.size_kb}KB</div>
      </div>
      <span class="chip ok" style="font-size:9px;">UPLOADED</span>
    </div>`).join('');
  $('#files-count').textContent = `${D.secure_files.files.length} files · all current`;

  // ABOUT
  $('#about-text').textContent = br.about;

  // SERVICES OFFERED
  $('#services-list').innerHTML = D.services_offered.map(s => `
    <div class="service-card${s.id==='svc-5'?' wg':''}">
      <div class="service-head">
        <span class="service-icon">${({robot:'⊕',bolt:'⚡',eye:'◉',wrench:'⚒',diamond:'◇'}[s.icon])||'·'}</span>
        <div style="flex:1;min-width:0;">
          <div class="service-name">${esc(s.name)}</div>
          <div class="service-rate">${s.rate?'$'+s.rate+'/'+s.rate_unit:'<span style="color:#E9D5FF">'+esc(s.rate_unit)+'</span>'}</div>
        </div>
      </div>
      <div class="service-desc">${esc(s.desc)}</div>
    </div>`).join('');

  // SKILLS CERTIFIED (manufacturer logos)
  $('#skills-list').innerHTML = D.skills_certified.map(s => `
    <div class="skill-card${s.primary?' primary':''}">
      <div class="skill-logo"><img src="${s.logo}" alt="${esc(s.manufacturer)}" /></div>
      <div style="flex:1;min-width:0;">
        <div class="skill-name">${esc(s.manufacturer)}${s.primary?' <span class="chip accent" style="font-size:9px;margin-left:4px">PRIMARY</span>':''}</div>
        <div class="skill-models">${esc(s.models)}</div>
        <div class="skill-meta">
          <span class="mono-700">${s.team_size}</span> engineers ·
          <span class="mono-700">${s.years}y</span> certified
        </div>
      </div>
    </div>`).join('');

  // TEAM MEMBERS (8)
  $('#team-list').innerHTML = D.team_members.map(m => `
    <div class="pro-card${m.available?' avail':''}${m.is_primary_contact?' primary':''}">
      <div class="pro-avatar" style="background-image:url('${m.avatar}')">${m.available ? '<span class="avail-dot"></span>' : ''}</div>
      <div class="pro-meta">
        <div class="pro-name">${esc(m.name)}${m.is_primary_contact?' <span class="chip accent" style="font-size:9px">CONTACT</span>':''}</div>
        <div class="pro-occ">${esc(m.role)}</div>
        <div class="pro-loc">${esc(m.city)} · ★${m.rating} · ${m.tenure_years_with_company}y</div>
      </div>
    </div>`).join('');
  $('#team-count').textContent = `${D.team_members.length} on platform · ${D.team_members.filter(m=>m.available).length} available now`;

  // WORK HISTORY (BY TEAM)
  $('#wh-by-list').innerHTML = D.work_history_by_team.map(w => `
    <div class="wh-row${w.white_glove?' wg':''}${w.ongoing?' ongoing':''}">
      <div class="wh-logo">${w.customer_logo ? `<img src="${w.customer_logo}" alt="${esc(w.customer)}" />` : `<div class="wh-anon">${w.white_glove?'◇':'·'}</div>`}</div>
      <div style="flex:1;min-width:0;">
        <div class="wh-title">${w.white_glove?'<span class="chip-wg" style="margin-right:6px;font-size:9px">◇ WG</span>':''}${esc(w.title)}</div>
        <div class="wh-sub">${esc(w.customer)} · ${esc(w.city)} · ${w.duration_weeks}wk · ${w.ongoing?'<span style="color:#34D399">● ongoing</span>':fmtDate(w.completed_at)}</div>
      </div>
      <div class="wh-val mono">${fmtMoneyShort(w.value_usd)}</div>
      <div class="wh-rate">${w.rating>0?'<span class="stars">'+'★'.repeat(w.rating)+'☆'.repeat(5-w.rating)+'</span>':'<span style="color:#34D399;font-family:JetBrains Mono;font-weight:700;font-size:10px">IN PROG</span>'}</div>
    </div>`).join('');
  $('#wh-by-count').textContent = `${D.stats.completed_contracts} completed lifetime · last ${D.work_history_by_team.length} shown`;

  // WORK HISTORY (FOR TEAM)
  $('#wh-for-list').innerHTML = D.work_history_for_team.map(f => `
    <div class="wh-row">
      <div class="wh-logo"><div class="wh-anon" style="background:linear-gradient(135deg,#6366F1,#A855F7)">→</div></div>
      <div style="flex:1;min-width:0;">
        <div class="wh-title">${esc(f.title)}</div>
        <div class="wh-sub">${esc(f.vendor)} · ${f.duration_weeks}wk · ${fmtDate(f.completed_at)}</div>
      </div>
      <div class="wh-val mono">${fmtMoneyShort(f.value_usd)}</div>
      <div class="wh-rate"><span class="stars">${'★'.repeat(f.rating_given)}${'☆'.repeat(5-f.rating_given)}</span></div>
    </div>`).join('');

  // OPEN POSITIONS
  $('#positions-list').innerHTML = D.open_positions.map(p => {
    const w2 = p.type.includes('Direct');
    const rate = p.rate ? '$'+p.rate+'/hr' : (p.salary_band ? '$'+p.salary_band+'/yr' : '—');
    return `<div class="contract-row${p.white_glove?' wg':''}${w2?' w2':''}">
      <div>${p.white_glove ? '<span class="chip-wg">◇ WG</span>' : w2 ? '<span class="chip" style="background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.30);color:#A5B4FC">DIRECT W-2</span>' : '<span class="chip">HOURLY</span>'}</div>
      <div>
        <div class="contract-title">${esc(p.title)}</div>
        <div class="contract-sub">${esc(p.type)} · ${rate} · ${esc(p.city)}</div>
      </div>
      <div style="text-align:center"><div class="kpi-val" style="font-size:22px !important">${p.applicants}</div><div class="kpi-label" style="font-size:9px !important">applicants</div></div>
      <button class="gbtn gbtn-secondary sm">Open</button>
    </div>`;
  }).join('');

  // CUSTOMER REVIEWS
  $('#reviews-list').innerHTML = D.customer_reviews.slice(0,8).map(r => `
    <div class="rev-card glass-card">
      <div class="rev-head">
        <div class="rev-stars stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
        <div style="display:flex;align-items:center;gap:7px;margin-left:auto">
          ${r.customer_logo ? `<img src="${r.customer_logo}" alt="" style="height:18px;max-width:60px;object-fit:contain;filter:brightness(1.1)" />` : ''}
          <div class="rev-pro">${esc(r.customer)}</div>
        </div>
      </div>
      <div class="rev-text">${esc(r.text)}</div>
      <div class="rev-foot row-meta">— ${esc(r.reviewer)}, ${esc(r.role)} · ${fmtDate(r.date)}</div>
    </div>`).join('');
  $('#reviews-count').textContent = `${D.stats.rating_count_received} reviews · ${D.stats.avg_rating_received.toFixed(2)} ★ avg`;

  // CERTIFICATIONS
  $('#certs-list').innerHTML = D.certifications.map(c => `
    <div class="cert-card${c.renewal_due_soon?' alert':''}">
      <div class="cert-head">
        <div class="cert-icon">${c.id==='csia'?'CSIA':c.id==='iso-9001'?'ISO':'⚙'}</div>
        <div style="flex:1;min-width:0;">
          <div class="cert-name">${esc(c.name)}</div>
          <div class="cert-issuer">${esc(c.issuer)}</div>
        </div>
      </div>
      <div class="cert-meta">
        <span>Issued ${fmtDate(c.issued)}</span>
        ${c.expires ? `<span style="color:${c.renewal_due_soon?'#FB923C':'var(--glass-text-tertiary)'}">${c.renewal_due_soon?'⚠ Renewal due ':'Expires '}${fmtDate(c.expires)}</span>` : '<span style="color:#34D399">No expiry</span>'}
      </div>
      <div class="cert-id mono">${esc(c.credential_id)}</div>
    </div>`).join('');

  // BADGES
  $('#badges-list').innerHTML = D.badges_earned.map(b => `
    <div class="badge-stack" title="${esc(b.criterion)}">
      <img src="${b.asset}" alt="${esc(b.name)}" class="badge-img" />
      <div class="badge-label">${esc(b.name)}</div>
      <div class="badge-tier">${b.tier.toUpperCase()}</div>
    </div>`).join('');
  $('#badges-count').textContent = `${D.badges_earned.length} earned`;

  // KEY CONTACTS
  $('#contacts-list').innerHTML = D.key_contacts.map(k => `
    <div class="contact-card${k.primary?' primary':''}">
      ${k.avatar ? `<div class="contact-avatar" style="background-image:url('${k.avatar}')"></div>` : `<div class="contact-avatar" style="background:linear-gradient(135deg,#6366F1,#A855F7);display:grid;place-items:center;color:#fff;font-weight:800;font-family:Outfit;font-size:18px">${k.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</div>`}
      <div>
        <div class="contact-name">${esc(k.name)}${k.primary?' <span class="chip accent" style="font-size:9px;margin-left:4px">PRIMARY</span>':''}</div>
        <div class="contact-role">${esc(k.role)}</div>
        <div class="contact-tel mono">${esc(k.phone)}</div>
      </div>
    </div>`).join('');

  // MEDIA / PHOTOS
  $('#media-list').innerHTML = D.media.map(m => {
    if (m.kind === 'video') {
      return `<div class="media-card video">
        <div class="media-thumb" style="background:linear-gradient(135deg,#A855F7,#6366F1)"><span class="play">▶</span></div>
        <div class="media-cap">${esc(m.caption)}</div>
      </div>`;
    }
    return `<div class="media-card">
      <div class="media-thumb" style="background-image:url('${m.url}')"></div>
      <div class="media-cap">${esc(m.caption)}</div>
    </div>`;
  }).join('');

  // ADMIN
  const adm = D.admin_notes;
  $('#admin-meta').innerHTML = `
    <div class="admin-grid">
      <div class="admin-tile"><div class="kpi-label">TRUST SCORE</div><div class="kpi-val" style="color:#34D399">${adm.trust_score}</div></div>
      <div class="admin-tile"><div class="kpi-label">KYC PASSED</div><div class="kpi-val" style="font-size:13px">${fmtDate(adm.kyc_passed_at)}</div></div>
      <div class="admin-tile"><div class="kpi-label">CSIA VERIFIED</div><div class="kpi-val" style="font-size:13px">${fmtDate(adm.csia_verified_at)}</div></div>
      <div class="admin-tile"><div class="kpi-label">WARNINGS</div><div class="kpi-val">${adm.warnings.length}</div></div>
    </div>
    <div class="admin-note">
      <div class="kpi-label">ADMIN NOTE</div>
      <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:var(--glass-text-secondary)">${esc(adm.free_text_admin_note)}</p>
    </div>`;

  // Role wiring
  function wire() {
    const root = document.documentElement;
    const btns = document.querySelectorAll('[data-role-btn]');
    function set(r) {
      root.setAttribute('data-role', r);
      btns.forEach(b => b.classList.toggle('active', b.dataset.roleBtn === r));
      try { localStorage.setItem('aa-role', r); } catch(e){}
    }
    btns.forEach(b => b.addEventListener('click', () => set(b.dataset.roleBtn)));
    let s = 'visitor';
    try { s = localStorage.getItem('aa-role') || 'visitor'; } catch(e){}
    set(s);
  }
  wire();
})();

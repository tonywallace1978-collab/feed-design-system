/* render-customer.js — Rebecca Chen / Ford Rouge profile */
(function () {
  const D = window.CUSTOMER_DATA;
  if (!D) return console.error('CUSTOMER_DATA missing');
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

  // HERO
  const h = D.header, ph = D.photo, c = D.company, qs = D.quick_stats;
  $('#hero-photo').style.backgroundImage = `url('${ph.main_url}')`;
  $('#hero-name').innerHTML = esc(h.display_name) + ' <span title="ID verified" style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#0EA5E9;border-radius:999px;color:#fff;margin-left:8px;vertical-align:middle;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 2px 6px rgba(14,165,233,.5);"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></span>';
  $('#hero-pronouns').textContent = h.preferred_pronouns;
  $('#hero-title').textContent = h.title;
  $('#hero-dept').textContent = h.department;
  $('#hero-tier').textContent = c.tier.toUpperCase();
  $('#hero-tagline').textContent = `Hiring controls + automation talent for ${c.name}'s body, paint, and final assembly lines. ${qs.lifetime_contracts_hired} contractors hired across ${qs.tenure_years_on_platform} years on platform.`;
  $('#hero-id').textContent = `ID #${D.user_id} · @${D.username}`;
  $('#hero-loc').innerHTML = `<img src="${D.location.country_flag_svg}" alt="" width="16" height="11" style="vertical-align:middle;border-radius:2px;margin-right:6px;border:1px solid rgba(255,255,255,.15)" />${esc(D.location.city)}, ${esc(D.location.state)} · ${esc(c.address)}`;

  // Company tile
  $('#hero-company').innerHTML = `
    <div class="hero-co-logo"><img src="${c.logo}" alt="${esc(c.name)}" /></div>
    <div style="flex:1;min-width:0;">
      <div style="font-family:Outfit;font-weight:800;font-size:18px;color:var(--glass-text-primary);">${esc(c.name)}</div>
      <div style="font-size:12px;color:var(--glass-text-secondary);font-weight:600;margin-top:2px;">${c.employee_count.toLocaleString()} employees · NAICS ${c.naics} · est. ${c.year_founded}</div>
      <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px;">${c.departments_hiring.slice(0,4).map(d=>`<span class="chip">${esc(d)}</span>`).join('')}</div>
    </div>`;

  // social
  $('#hero-social').innerHTML = D.social_links.map(l => {
    const ic = l.platform === 'linkedin'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M8.339 18.337v-8.49h-2.822v8.49h2.822zM6.93 8.624a1.636 1.636 0 1 0 0-3.272 1.636 1.636 0 0 0 0 3.272zm11.412 9.713v-4.65c0-2.45-1.317-3.59-3.073-3.59-1.418 0-2.05.78-2.404 1.328v-1.139H10.04c.034.797 0 8.49 0 8.49h2.825v-4.741c0-.254.018-.508.093-.69.204-.508.67-1.034 1.45-1.034 1.025 0 1.434.78 1.434 1.925v4.541h2.5z"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>';
    return `<a href="${l.url}" class="social-icon" target="_blank" rel="noopener" title="${l.platform}">${ic}</a>`;
  }).join('');

  // quick stats
  const stats = [
    { l:'OPEN JOBS', v: qs.active_contracts_posted },
    { l:'LIFETIME HIRES', v: qs.lifetime_contracts_hired },
    { l:'AVG RATE', v: '$' + qs.avg_rate_paid },
    { l:'LIFETIME', v: fmtMoneyShort(qs.lifetime_spend_usd) },
    { l:'REHIRE %', v: qs.rehire_rate_pct + '%' },
  ];
  $('#hero-stats').innerHTML = stats.map(s => `<div class="stat-tile"><div class="kpi-val">${s.v}</div><div class="kpi-label">${s.l}</div></div>`).join('');
  $('#hero-strength-bar').style.width = qs.profile_strength_pct + '%';
  $('#hero-strength-pct').textContent = qs.profile_strength_pct + '%';

  // CTAs
  function ctaHtml(c) {
    const cls = { primary:'gbtn', secondary:'gbtn gbtn-secondary', tertiary:'gbtn gbtn-secondary' }[c.kind] || 'gbtn';
    return `<button class="${cls}">${esc(c.label)}</button>`;
  }
  $('#hero-cta-visitor').innerHTML = D.ctas_visitor.map(ctaHtml).join('');
  $('#hero-cta-owner').innerHTML = D.ctas_owner.map(ctaHtml).join('');

  // OPEN CONTRACTS — the marquee table
  $('#contracts-list').innerHTML = D.open_contracts.map(j => {
    const wg = j.white_glove;
    const w2 = j.type.includes('Direct');
    return `
      <div class="contract-row${wg?' wg':''}${w2?' w2':''}">
        <div class="contract-tag">
          ${wg ? '<span class="chip-wg">◇ WHITE GLOVE</span>' :
                 w2 ? '<span class="chip" style="background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.30);color:#A5B4FC">DIRECT W-2</span>' :
                      '<span class="chip">HOURLY</span>'}
        </div>
        <div>
          <div class="contract-title">${esc(j.title)}</div>
          <div class="contract-sub">${esc(j.type)}</div>
        </div>
        <div class="contract-applicants">
          <div class="kpi-val" style="font-size:24px !important;">${j.applicants}</div>
          <div class="kpi-label" style="font-size:9px !important">applicants</div>
        </div>
        <button class="gbtn gbtn-secondary sm">Open</button>
      </div>`;
  }).join('');
  $('#contracts-count').textContent = `${D.open_contracts.length} live · ${D.open_contracts.filter(c=>c.white_glove).length} WG · ${D.open_contracts.filter(c=>c.type.includes('Direct')).length} W-2`;

  // HIRE HISTORY
  $('#history-list').innerHTML = D.hire_history.map(h => {
    const wg = h.white_glove;
    return `<tr class="hist-row${wg?' wg':''}">
      <td>${fmtDate(h.completed_at)}</td>
      <td>
        <div class="hist-title">${wg?'<span class="chip-wg" style="margin-right:8px;font-size:9px;">◇ WG</span>':''}${esc(h.title)}</div>
      </td>
      <td><span class="hist-pro${wg?' anon':''}">${esc(h.contractor)}</span></td>
      <td>${h.rehired ? '<span class="chip ok" style="font-size:9px;">REHIRED</span>' : ''}</td>
    </tr>`;
  }).join('');

  // WATCHED PROS
  const proPhotos = {
    38291: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=faces',
    39102: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
    40117: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    41208: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces',
    41502: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces',
    41334: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    41822: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces',
    41709: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=200&h=200&fit=crop&crop=faces',
    42118: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=faces',
    42301: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces',
  };
  const watchedTop = D.watched_pros.slice(0, 4);
  const watchedOverflow = D.watched_pros.length - watchedTop.length;
  $('#watched-list').innerHTML = watchedTop.map(p => `
    <div class="pro-card${p.available?' avail':''}">
      <div class="pro-avatar" style="background-image:url('${proPhotos[p.id]||''}')">
        ${p.available ? '<span class="avail-dot" title="Available"></span>' : ''}
      </div>
      <div class="pro-meta">
        <div class="pro-name">${esc(p.name)}</div>
        <div class="pro-occ">${esc(p.occupation)}</div>
        <div class="pro-loc">${esc(p.city)} · <span class="stars">★</span><span class="mono-700" style="font-size:11px">${p.rating.toFixed(2)}</span></div>
      </div>
      <div class="pro-stat">
        <div class="kpi-val" style="font-size:18px !important">${p.times_hired}</div>
        <div class="kpi-label" style="font-size:8px !important">HIRED</div>
      </div>
    </div>`).join('') + (watchedOverflow > 0 ? `<button class="watched-more">+ ${watchedOverflow} more</button>` : '');
  $('#watched-count').textContent = `${D.watched_pros.length} watched · ${D.watched_pros.filter(p=>p.available).length} available now`;

  // PREFERRED GROUPS
  $('#groups-list').innerHTML = D.preferred_business_groups.map(g => `
    <div class="bg-row">
      <div class="bg-mark" style="background:linear-gradient(135deg,#6366F1,#A855F7)">${esc(g.name.split(' ').map(w=>w[0]).slice(0,2).join(''))}</div>
      <div class="bg-meta">
        <div class="bg-name">${esc(g.name)}</div>
        <div class="bg-sub">${esc(g.company)} · ${g.members} members · ★${g.rating}</div>
      </div>
      <button class="gbtn gbtn-secondary sm">View</button>
    </div>`).join('');

  // SPENDING (OWNER)
  const sp = D.spending_breakdown;
  $('#spend-yrs').innerHTML = `
    <div class="spend-yr"><div class="kpi-label">YTD 2026</div><div class="kpi-val" style="color:#34D399">${fmtMoneyShort(sp.ytd_2026_usd)}</div></div>
    <div class="spend-yr"><div class="kpi-label">FY 2025</div><div class="kpi-val">${fmtMoneyShort(sp.fy_2025_usd)}</div></div>
    <div class="spend-yr"><div class="kpi-label">FY 2024</div><div class="kpi-val">${fmtMoneyShort(sp.fy_2024_usd)}</div></div>
    <div class="spend-yr"><div class="kpi-label">FY 2023</div><div class="kpi-val">${fmtMoneyShort(sp.fy_2023_usd)}</div></div>`;
  $('#spend-trade').innerHTML = sp.by_trade.map(t => `
    <div class="spend-bar-row">
      <div class="spend-bar-label">${esc(t.trade)}</div>
      <div class="spend-bar"><div class="spend-fill" style="width:${t.pct*2.5}%"></div></div>
      <div class="spend-bar-amt">${fmtMoneyShort(t.ytd)} <span style="opacity:0.6">${t.pct}%</span></div>
    </div>`).join('');
  $('#spend-tier').innerHTML = sp.by_tier.map(t => `
    <div class="spend-tier-tile">
      <div class="kpi-label">${esc(t.tier).toUpperCase()}</div>
      <div class="kpi-val" style="font-size:22px !important">${fmtMoneyShort(t.ytd)}</div>
      <div style="font-size:11px;color:var(--glass-text-tertiary);font-weight:600;margin-top:2px;font-family:'JetBrains Mono'">${t.pct}%</div>
    </div>`).join('');

  // SECURE FILES (OWNER)
  $('#files-list').innerHTML = D.secure_files.files.map(f => `
    <div class="file-row">
      <div class="file-icon">${({policy:'⚙',legal:'§',payment:'$',tax:'#',compliance:'⛨'}[f.type])||'·'}</div>
      <div class="file-meta">
        <div class="file-name">${esc(f.name)}</div>
        <div class="file-sub">uploaded ${fmtDate(f.uploaded_at)} · ${f.expires_at?'expires '+fmtDate(f.expires_at):'no expiry'} · ${f.size_kb}KB</div>
      </div>
      <span class="chip ok" style="font-size:9px;">UPLOADED</span>
    </div>`).join('');
  $('#files-count').textContent = `${D.secure_files.files.length} files`;

  // PRIVATE INFO
  $('#private-list').innerHTML = D.private_info.fields.map(f => `
    <div class="kv-row">
      <div class="kv-key">${esc(f.label)}</div>
      <div class="kv-val">${esc(f.value)}</div>
    </div>`).join('');

  // KEY CONTACTS
  $('#contacts-list').innerHTML = D.key_contacts.map(k => `
    <div class="contact-card${k.primary?' primary':''}">
      <div class="contact-avatar" style="background-image:url('${k.avatar}')"></div>
      <div class="contact-meta">
        <div class="contact-name">${esc(k.name)}${k.primary?' <span class="chip accent" style="font-size:9px;margin-left:4px">PRIMARY</span>':''}</div>
        <div class="contact-role">${esc(k.role)}</div>
        <div class="contact-tel mono">${esc(k.email)}</div>
      </div>
    </div>`).join('');

  // BADGES
  $('#badges-list').innerHTML = D.badges_earned.map(b => `
    <div class="badge-stack" title="${esc(b.criterion)}">
      <img src="${b.asset}" alt="${esc(b.name)}" class="badge-img" />
      <div class="badge-label">${esc(b.name)}</div>
      <div class="badge-tier">${b.tier.toUpperCase()}</div>
    </div>`).join('');
  $('#badges-count').textContent = `${D.badges_earned.length} earned`;

  // REVIEWS LEFT
  $('#reviews-list').innerHTML = D.reviews_left_for_contractors.slice(0,8).map(r => `
    <div class="rev-card glass-card">
      <div class="rev-head">
        <div class="rev-stars stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
        <div class="rev-pro">→ ${esc(r.contractor_name)}</div>
        <div class="rev-date mono">${fmtDate(r.date)}</div>
      </div>
      <div class="rev-text">${esc(r.text)}</div>
      <div class="rev-foot row-meta">${esc(r.contract_title)}</div>
    </div>`).join('');
  $('#reviews-count').textContent = `${D.reviews_left_for_contractors.length} reviews left · avg ${qs.avg_rating_given.toFixed(1)} ★`;

  // COMPANY BRIEF
  const cb = D.company_brief;
  $('#brief-text').textContent = cb.about;
  $('#brief-photos').innerHTML = cb.facility_photos.map(p => `<div class="facility-photo" style="background-image:url('${p}')"></div>`).join('');

  // ADMIN
  const adm = D.admin_notes;
  $('#admin-meta').innerHTML = `
    <div class="admin-grid">
      <div class="admin-tile"><div class="kpi-label">TRUST SCORE</div><div class="kpi-val" style="color:#34D399">${adm.trust_score}</div></div>
      <div class="admin-tile"><div class="kpi-label">KYC PASSED</div><div class="kpi-val" style="font-size:14px">${fmtDate(adm.kyc_passed_at)}</div></div>
      <div class="admin-tile"><div class="kpi-label">TIER</div><div class="kpi-val" style="font-size:13px;color:#34D399">${esc(adm.compliance_status)}</div></div>
      <div class="admin-tile"><div class="kpi-label">WARNINGS</div><div class="kpi-val">${adm.warnings.length}</div></div>
    </div>
    <div class="admin-note">
      <div class="kpi-label">ADMIN NOTE</div>
      <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:var(--glass-text-secondary)">${esc(adm.free_text_admin_note)}</p>
    </div>
    <div class="cta-row" style="margin-top:13px">
      <button class="gbtn gbtn-secondary sm">Audit log</button>
      <button class="gbtn gbtn-secondary sm">KYC bundle</button>
      <button class="gbtn gbtn-boost sm">⚡ Boost</button>
    </div>`;

  // Role toggle
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

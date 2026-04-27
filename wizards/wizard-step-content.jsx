/* eslint-disable */
/**
 * Wizard step content renderer
 *
 * Single source of truth for what each step LOOKS LIKE inside the content area.
 * All three variants (Stepper, Long-form, Conversational) consume this module
 * to render fields — only the chrome around the steps differs.
 *
 * Exports to window: StepContent, AssistButton
 */

const { useState: useStateSC, useEffect: useEffectSC } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Claude AI assist button — uses window.claude.complete for open-ended fields
// ─────────────────────────────────────────────────────────────────────────────

function AssistButton({ prompt, onResult, label = 'Assist with AI' }) {
  const [busy, setBusy] = useStateSC(false);
  const [err, setErr] = useStateSC(null);
  const click = async () => {
    if (busy) return;
    setBusy(true); setErr(null);
    try {
      if (!window.claude || !window.claude.complete) {
        await new Promise(r => setTimeout(r, 600));
        onResult('[demo] Claude AI assist would draft this field for you here. Working in offline preview.');
      } else {
        const text = await window.claude.complete(prompt);
        onResult((text || '').trim());
      }
    } catch (e) {
      setErr('AI assist unavailable');
    } finally { setBusy(false); }
  };
  return (
    <button type="button" className={'wiz-assist' + (busy ? ' busy' : '')} onClick={click}>
      <span className="wiz-assist-glyph">{busy ? '◉' : '✶'}</span>
      <span>{busy ? 'Drafting…' : label}</span>
      {err && <span className="wiz-assist-err">{err}</span>}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StepContent — dispatches to per-step bodies based on stepId
// ─────────────────────────────────────────────────────────────────────────────

function StepContent({ stepId, form, setField, setSection, errors }) {
  switch (stepId) {
    case 'account':    return <AccountStep    d={form.account}    err={errors} setField={(f,v)=>setField('account',f,v)} />;
    case 'identity':   return <IdentityStep   d={form.identity}   err={errors} setField={(f,v)=>setField('identity',f,v)} />;
    case 'photo':      return <PhotoStep      d={form.photo}      err={errors} setSection={(v)=>setSection('photo',v)} />;
    case 'headline':   return <HeadlineStep   d={form.headline}   err={errors} setField={(f,v)=>setField('headline',f,v)} form={form} />;
    case 'location':   return <LocationStep   d={form.location}   err={errors} setField={(f,v)=>setField('location',f,v)} />;
    case 'rates_pub':  return <RatesPubStep   d={form.rates_pub}  err={errors} setField={(f,v)=>setField('rates_pub',f,v)} />;
    case 'rates_priv': return <RatesPrivStep  d={form.rates_priv} err={errors} setField={(f,v)=>setField('rates_priv',f,v)} />;
    case 'avail':      return <AvailStep      d={form.avail}      err={errors} setField={(f,v)=>setField('avail',f,v)} />;
    case 'years':      return <YearsStep      d={form.years}      err={errors} setField={(f,v)=>setField('years',f,v)} />;
    case 'skills':     return <SkillsStep     items={form.skills} err={errors} setSection={(v)=>setSection('skills',v)} form={form} />;
    case 'certs':      return <CertsStep      items={form.certs}  err={errors} setSection={(v)=>setSection('certs',v)} />;
    case 'edu':        return <EduStep        items={form.edu}    err={errors} setSection={(v)=>setSection('edu',v)} />;
    case 'lang':       return <LangStep       items={form.lang}   err={errors} setSection={(v)=>setSection('lang',v)} />;
    case 'equip':      return <EquipStep      items={form.equip}  err={errors} setSection={(v)=>setSection('equip',v)} />;
    case 'exp':        return <ExpStep        items={form.exp}    err={errors} setSection={(v)=>setSection('exp',v)} />;
    case 'portfolio':  return <PortfolioStep  items={form.portfolio} err={errors} setSection={(v)=>setSection('portfolio',v)} />;
    case 'social':     return <SocialStep     d={form.social}     err={errors} setField={(f,v)=>setField('social',f,v)} />;
    case 'affil':      return <AffilStep      d={form.affil}      err={errors} setField={(f,v)=>setField('affil',f,v)} />;
    case 'private':    return <PrivateStep    d={form.private}    err={errors} setField={(f,v)=>setField('private',f,v)} />;
    case 'review':     return <ReviewStep     form={form} />;
    default: return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Step bodies
// ─────────────────────────────────────────────────────────────────────────────

function AccountStep({ d, err, setField }) {
  return (
    <div className="wiz-grid">
      <WizField label="Username" error={err.username} hint="Lowercase, no spaces. Visible in your profile URL.">
        <WizInput id="username" value={d.username} onChange={v => setField('username', v.toLowerCase().replace(/\s/g,''))} placeholder="maria.lopez" mono />
      </WizField>
      <WizField label="Work email" error={err.email} hint="We'll send a verification link.">
        <WizInput id="email" type="email" value={d.email} onChange={v => setField('email', v)} placeholder="you@example.com" />
      </WizField>
      <WizField label="Mobile phone" error={err.phone} hint="For SMS verification + emergency contact.">
        <WizInput id="phone" type="tel" value={d.phone} onChange={v => setField('phone', v)} placeholder="+1 (555) 555-5555" />
      </WizField>
      <div className="wiz-field">
        <WizToggle value={d.two_factor} onChange={v => setField('two_factor', v)} label="Enable two-factor auth" hint="Recommended. Required for White Glove eligibility." />
      </div>
    </div>
  );
}

function IdentityStep({ d, err, setField }) {
  return (
    <>
      <div className="wiz-grid wiz-grid-3">
        <WizField label="First name" error={err.first_name}>
          <WizInput id="fn" value={d.first_name} onChange={v => setField('first_name', v)} placeholder="Maria" autoFocus />
        </WizField>
        <WizField label="Middle initial" hint="Optional">
          <WizInput value={d.middle_initial} onChange={v => setField('middle_initial', v.slice(0,1).toUpperCase())} placeholder="E" />
        </WizField>
        <WizField label="Last name" error={err.last_name}>
          <WizInput value={d.last_name} onChange={v => setField('last_name', v)} placeholder="Lopez" />
        </WizField>
      </div>
      <WizField label="Pronouns" hint="Optional">
        <WizSelect value={d.preferred_pronouns} onChange={v => setField('preferred_pronouns', v)} options={PRONOUNS.map(p => ({ value: p, label: p || '— none —' }))} />
      </WizField>
      <WizField label="Display name override" hint={`Default: ${composeDisplayName(d) || '—'}`}>
        <WizInput value={d.display_name_override} onChange={v => setField('display_name_override', v)} placeholder="Override how your name appears" />
      </WizField>
    </>
  );
}

function PhotoStep({ d, err, setSection }) {
  return (
    <div className="wiz-photo-row">
      <WizPhotoCropper value={d} onChange={setSection} />
      <div className="wiz-photo-tips">
        <h4 className="wiz-tips-title">A good profile photo</h4>
        <ul className="wiz-tips-list">
          <li>Square crop, your face fills 60–70% of the frame</li>
          <li>Clean background, even lighting</li>
          <li>Looking at the camera, friendly but professional</li>
          <li>No logos, no text, no group shots</li>
          <li>If you're White Glove eligible, dress as your customers expect</li>
        </ul>
        <div className="wiz-tips-foot mono">144 × 144 px · JPG or PNG · 5MB max</div>
        {err.main_url && <div className="wiz-error-block">{err.main_url}</div>}
      </div>
    </div>
  );
}

function HeadlineStep({ d, err, setField, form }) {
  return (
    <>
      <WizField label="Primary occupation" error={err.primary_occupation} hint="Pick the role customers should hire you for first.">
        <WizSelect value={d.primary_occupation} onChange={v => setField('primary_occupation', v)} options={OCCUPATIONS} placeholder="Choose primary occupation" />
      </WizField>
      <WizField label="Additional occupations" hint={`Up to 4. Selected: ${d.additional_occupations.length}/4`}>
        <WizMulti value={d.additional_occupations} onChange={v => setField('additional_occupations', v)} options={OCCUPATIONS.filter(o => o !== d.primary_occupation)} max={4} />
      </WizField>
      <WizField label="Tagline" hint="One sentence. Speak in your voice.">
        <WizTextarea value={d.tagline} onChange={v => setField('tagline', v)} placeholder="The one thing you want a hiring customer to know about you." rows={2} max={200} />
        <div className="wiz-assist-row">
          <AssistButton
            label="Draft tagline with AI"
            prompt={`Write a one-sentence professional tagline (under 200 chars) for a ${d.primary_occupation || 'controls engineer'} with ${form.years.years_experience || '9'} years of experience based in ${form.location.city || 'Detroit'}. Speak in first person. Confident but not boastful. Mention one specific area of strength.`}
            onResult={(t) => setField('tagline', t)}
          />
        </div>
      </WizField>
      <WizField label="Headline override" hint={`Default: ${composeHeadline(form) || '—'}`}>
        <WizInput value={d.headline_override} onChange={v => setField('headline_override', v)} placeholder="Auto-composed from occupation, years, and location" />
      </WizField>
    </>
  );
}

function LocationStep({ d, err, setField }) {
  return (
    <>
      <div className="wiz-grid wiz-grid-3">
        <WizField label="City" error={err.city}>
          <WizInput value={d.city} onChange={v => setField('city', v)} placeholder="Detroit" />
        </WizField>
        <WizField label="State" error={err.state}>
          <WizSelect value={d.state} onChange={v => setField('state', v)} options={['', ...STATES]} placeholder="—" />
        </WizField>
        <WizField label="Postal code" error={err.postal_code}>
          <WizInput value={d.postal_code} onChange={v => setField('postal_code', v)} placeholder="48226" mono />
        </WizField>
      </div>
      <WizField label="Country" error={err.country}>
        <WizSelect value={d.country} onChange={v => setField('country', v)} options={['United States','Canada','Mexico']} />
      </WizField>
      <WizField label="Service radius" hint={`How far you'll travel for a contract — ${d.service_radius_miles} mi`}>
        <WizSlider value={d.service_radius_miles} onChange={v => setField('service_radius_miles', v)} min={0} max={500} step={10} suffix=" mi" />
      </WizField>
      <div className="wiz-field">
        <WizToggle value={d.willing_to_travel} onChange={v => setField('willing_to_travel', v)} label="Willing to travel beyond radius" hint="For Tier-1 OEMs or White Glove engagements." />
      </div>
      <WizField label="Travel notes" hint="Optional, ~140 char">
        <WizTextarea value={d.travel_notes} onChange={v => setField('travel_notes', v)} placeholder="Prefer 4-6 wk onsite blocks. Will fly anywhere in NA for Tier-1 OEM work." rows={2} max={140} />
      </WizField>
    </>
  );
}

function RatesPubStep({ d, err, setField }) {
  return (
    <>
      <div className="wiz-grid wiz-grid-2">
        <WizField label="Default hourly rate" error={err.hourly_default} hint="Most contracts start here.">
          <WizInput value={d.hourly_default} onChange={v => setField('hourly_default', v)} placeholder="148.50" prefix="$" suffix="/ hr" mono />
        </WizField>
        <WizField label="Emergency rate" hint="When customers need you in 24 hrs.">
          <WizInput value={d.hourly_emergency} onChange={v => setField('hourly_emergency', v)} placeholder="195.00" prefix="$" suffix="/ hr" mono />
        </WizField>
        <WizField label="Remote rate" hint="If you do remote work — typically lower.">
          <WizInput value={d.hourly_remote} onChange={v => setField('hourly_remote', v)} placeholder="125.00" prefix="$" suffix="/ hr" mono />
        </WizField>
        <WizField label="Currency">
          <WizSelect value={d.currency} onChange={v => setField('currency', v)} options={['USD','CAD','EUR','GBP']} />
        </WizField>
      </div>
      <div className="wiz-field">
        <WizToggle value={d.wg_eligible} onChange={v => setField('wg_eligible', v)} label="Opt into White Glove eligibility" hint="Tier-1 OEM anonymous contracts. Premium pay, NDA required." />
      </div>
      {d.wg_eligible && (
        <WizField label="White Glove premium" hint={`On top of default — +${d.white_glove_premium_pct}%`}>
          <WizSlider value={d.white_glove_premium_pct} onChange={v => setField('white_glove_premium_pct', v)} min={0} max={100} step={5} suffix="%" />
        </WizField>
      )}
    </>
  );
}

function RatesPrivStep({ d, err, setField }) {
  return (
    <>
      <div className="wiz-disclaimer">
        These fields shape negotiations behind the scenes. They never appear on your public profile.
        Customers and casual visitors can't see them. You and Automate America admins can.
      </div>
      <WizPosturePanel title="FTE / salary band">
        <div className="wiz-grid wiz-grid-2">
          <WizField label="Salary band — minimum" hint="If converted to FTE, what's your floor?">
            <WizInput value={d.salary_band_min} onChange={v => setField('salary_band_min', v)} placeholder="168000" prefix="$" suffix="/ yr" mono />
          </WizField>
          <WizField label="Salary band — maximum" hint="And your ceiling?">
            <WizInput value={d.salary_band_max} onChange={v => setField('salary_band_max', v)} placeholder="215000" prefix="$" suffix="/ yr" mono />
          </WizField>
        </div>
      </WizPosturePanel>
      <WizPosturePanel title="Engagement preferences">
        <div className="wiz-field">
          <WizToggle value={d.rate_negotiable} onChange={v => setField('rate_negotiable', v)} label="Rates are negotiable" hint="Signal flexibility on published rates." />
        </div>
        <WizField label="Minimum engagement hours" hint="Per booking — your floor.">
          <WizSlider value={d.minimum_engagement_hours} onChange={v => setField('minimum_engagement_hours', v)} min={1} max={40} step={1} suffix=" hr" />
        </WizField>
        <WizField label="Preferred engagement shape">
          <WizSelect value={d.preferred_engagement} onChange={v => setField('preferred_engagement', v)} options={ENGAGEMENT_PATTERNS} placeholder="Choose preferred shape" />
        </WizField>
      </WizPosturePanel>
    </>
  );
}

function AvailStep({ d, err, setField }) {
  return (
    <>
      <WizField label="Current status" error={err.status}>
        <div className="wiz-radio-row">
          {AVAIL_STATUS.map(s => (
            <button key={s} type="button" className={'wiz-radio' + (d.status === s ? ' on' : '')} onClick={() => setField('status', s)}>
              <span className={'wiz-radio-dot ' + (s === 'Available Now' ? 'go' : s === 'Limited' ? 'warn' : s === 'Booked' ? 'busy' : 'pause')}></span>
              <span>{s}</span>
            </button>
          ))}
        </div>
      </WizField>
      {d.status !== 'Available Now' && (
        <WizField label="Next available date" hint="When you'll free up.">
          <WizDate value={d.next_available_date} onChange={v => setField('next_available_date', v)} />
        </WizField>
      )}
      <WizField label="Weekly capacity" hint={`${d.weekly_capacity_hours} hours / week`}>
        <WizSlider value={d.weekly_capacity_hours} onChange={v => setField('weekly_capacity_hours', v)} min={0} max={60} step={5} suffix=" hr" />
      </WizField>
      <div className="wiz-toggle-stack">
        <WizToggle value={d.willing_overtime}  onChange={v => setField('willing_overtime', v)}  label="Willing to work overtime" />
        <WizToggle value={d.willing_weekends}  onChange={v => setField('willing_weekends', v)}  label="Willing to work weekends" />
        <WizToggle value={d.willing_nightshift} onChange={v => setField('willing_nightshift', v)} label="Willing to work nights" />
      </div>
      <WizField label="External calendar URL" hint="cal.com, Calendly, etc. Optional.">
        <WizInput value={d.calendar_url} onChange={v => setField('calendar_url', v)} placeholder="https://cal.com/your-name" />
      </WizField>
    </>
  );
}

function YearsStep({ d, err, setField }) {
  return (
    <WizField label="Years of professional experience" error={err.years_experience} hint="Self-reported, since your first relevant role. Independent of platform tenure.">
      <WizInput value={d.years_experience} onChange={v => setField('years_experience', v.replace(/\D/g,''))} placeholder="9" suffix="years" mono autoFocus />
    </WizField>
  );
}

function SkillsStep({ items, err, setSection, form }) {
  return (
    <WizRepeater
      items={items}
      onChange={setSection}
      max={10}
      addLabel="Add another skill"
      makeNew={(i) => ({ id: 'sk' + (Date.now() + i), manufacturer: '', models: '', years: '', primary: false, certifications: '' })}
      removable={items.length > 1}
      renderItem={(s, update, i) => (
        <>
          <div className="wiz-grid wiz-grid-2">
            <WizField label="Manufacturer" error={err['s'+i+'_mfr']}>
              <WizSelect value={s.manufacturer} onChange={v => update({ manufacturer: v })} options={MANUFACTURERS} placeholder="Pick a manufacturer" />
            </WizField>
            <WizField label="Years with this brand" error={err['s'+i+'_yrs']}>
              <WizInput value={s.years} onChange={v => update({ years: v.replace(/\D/g,'') })} placeholder="8" suffix="years" mono />
            </WizField>
          </div>
          <WizField label="Models / platforms" hint="Comma-separated. Be specific.">
            <WizInput value={s.models} onChange={v => update({ models: v })} placeholder="S7-1200, S7-1500, TIA Portal V18" />
          </WizField>
          <WizField label="Certifications for this brand" hint="OEM-issued. One per line.">
            <WizTextarea value={s.certifications} onChange={v => update({ certifications: v })} placeholder="Siemens TIA Portal Specialist 2024" rows={2} />
          </WizField>
          <div className="wiz-field">
            <WizToggle value={s.primary} onChange={v => update({ primary: v })} label="Mark as primary skill" hint="Up to 3 primaries surface in your hero card." />
          </div>
        </>
      )}
    />
  );
}

function CertsStep({ items, err, setSection }) {
  return (
    <WizRepeater
      items={items}
      onChange={setSection}
      max={20}
      addLabel="Add a certification"
      emptyLabel="No certifications yet — add OSHA, ISA, or vendor certs above."
      makeNew={(i) => ({ id: 'c' + (Date.now() + i), name: '', issuer: '', issued: '', expires: '', credential_id: '', verify_url: '' })}
      renderItem={(c, update) => (
        <>
          <div className="wiz-grid wiz-grid-2">
            <WizField label="Name">
              <WizInput value={c.name} onChange={v => update({ name: v })} placeholder="OSHA 30-Hour General Industry" />
            </WizField>
            <WizField label="Issuer">
              <WizInput value={c.issuer} onChange={v => update({ issuer: v })} placeholder="OSHA" />
            </WizField>
          </div>
          <div className="wiz-grid wiz-grid-2">
            <WizField label="Issued">
              <WizDate value={c.issued} onChange={v => update({ issued: v })} />
            </WizField>
            <WizField label="Expires" hint="Leave blank for no expiry.">
              <WizDate value={c.expires} onChange={v => update({ expires: v })} />
            </WizField>
          </div>
          <div className="wiz-grid wiz-grid-2">
            <WizField label="Credential ID" hint="Optional">
              <WizInput value={c.credential_id} onChange={v => update({ credential_id: v })} placeholder="88-7102345" mono />
            </WizField>
            <WizField label="Verify URL" hint="Optional. Public verification link.">
              <WizInput value={c.verify_url} onChange={v => update({ verify_url: v })} placeholder="https://verify.example.com/123" />
            </WizField>
          </div>
        </>
      )}
    />
  );
}

function EduStep({ items, err, setSection }) {
  return (
    <>
      <div className="wiz-disclaimer">
        Graduation year, GPA, and honors are owner-only on your rendered profile.
        Visitors see only your degrees and schools.
      </div>
      <WizRepeater
        items={items}
        onChange={setSection}
        max={5}
        addLabel="Add education"
        emptyLabel="No education added — optional but recommended."
        makeNew={(i) => ({ id: 'ed' + (Date.now() + i), school: '', degree: '', concentration: '', graduated_year: '', gpa: '', honors: '', city: '' })}
        renderItem={(e, update) => (
          <>
            <div className="wiz-grid wiz-grid-2">
              <WizField label="School">
                <WizInput value={e.school} onChange={v => update({ school: v })} placeholder="Wayne State University" />
              </WizField>
              <WizField label="Degree">
                <WizInput value={e.degree} onChange={v => update({ degree: v })} placeholder="B.S. Electrical Engineering" />
              </WizField>
            </div>
            <div className="wiz-grid wiz-grid-2">
              <WizField label="Concentration" hint="Optional">
                <WizInput value={e.concentration} onChange={v => update({ concentration: v })} placeholder="Industrial Controls" />
              </WizField>
              <WizField label="City" hint="Optional">
                <WizInput value={e.city} onChange={v => update({ city: v })} placeholder="Detroit, MI" />
              </WizField>
            </div>
            <div className="wiz-grid wiz-grid-3">
              <WizField label={<span>Graduated year <WizPrivacyChip kind="private" /></span>}>
                <WizInput value={e.graduated_year} onChange={v => update({ graduated_year: v.replace(/\D/g,'') })} placeholder="2015" mono />
              </WizField>
              <WizField label={<span>GPA <WizPrivacyChip kind="private" /></span>}>
                <WizInput value={e.gpa} onChange={v => update({ gpa: v })} placeholder="3.74" mono />
              </WizField>
              <WizField label={<span>Honors <WizPrivacyChip kind="private" /></span>}>
                <WizInput value={e.honors} onChange={v => update({ honors: v })} placeholder="Magna Cum Laude" />
              </WizField>
            </div>
          </>
        )}
      />
    </>
  );
}

function LangStep({ items, err, setSection }) {
  return (
    <WizRepeater
      items={items}
      onChange={setSection}
      max={10}
      addLabel="Add a language"
      makeNew={(i) => ({ id: 'l' + (Date.now() + i), name: '', proficiency: 'Conversational' })}
      removable={items.length > 1}
      renderItem={(l, update) => (
        <div className="wiz-grid wiz-grid-2">
          <WizField label="Language">
            <WizSelect value={l.name} onChange={v => update({ name: v })} options={LANGUAGES} placeholder="—" />
          </WizField>
          <WizField label="Proficiency">
            <WizSelect value={l.proficiency} onChange={v => update({ proficiency: v })} options={PROFICIENCIES} />
          </WizField>
        </div>
      )}
    />
  );
}

function EquipStep({ items, err, setSection }) {
  return (
    <WizRepeater
      items={items}
      onChange={setSection}
      max={8}
      addLabel="Add a category"
      emptyLabel="No equipment added — optional."
      makeNew={(i) => ({ id: 'eq' + (Date.now() + i), category: 'Laptop', items: [] })}
      renderItem={(eq, update) => (
        <>
          <WizField label="Category">
            <WizSelect value={eq.category} onChange={v => update({ category: v })} options={EQUIP_CATEGORIES} />
          </WizField>
          <WizField label="Items" hint="One per line.">
            <WizTextarea
              value={(eq.items || []).join('\n')}
              onChange={v => update({ items: v.split('\n').filter(Boolean) })}
              placeholder="Dell Precision 5570 (32GB)&#10;Surface Pro 9 (field)"
              rows={3}
            />
          </WizField>
        </>
      )}
    />
  );
}

function ExpStep({ items, err, setSection }) {
  return (
    <WizRepeater
      items={items}
      onChange={setSection}
      max={10}
      addLabel="Add a role"
      makeNew={(i) => ({ id: 'ex' + (Date.now() + i), company: '', role: '', start: '', end: '', current: false, city: '', description: '', highlights: [] })}
      removable={items.length > 1}
      renderItem={(e, update, i) => (
        <>
          <div className="wiz-grid wiz-grid-2">
            <WizField label="Company" error={err['e'+i+'_co']}>
              <WizInput value={e.company} onChange={v => update({ company: v })} placeholder="Acme Robotics" />
            </WizField>
            <WizField label="Role" error={err['e'+i+'_ro']}>
              <WizInput value={e.role} onChange={v => update({ role: v })} placeholder="Senior Controls Engineer" />
            </WizField>
          </div>
          <div className="wiz-grid wiz-grid-3">
            <WizField label="Start"><WizDate value={e.start} onChange={v => update({ start: v })} /></WizField>
            <WizField label="End" hint={e.current ? 'Disabled — current role' : ''}>
              <WizDate value={e.end} onChange={v => update({ end: v })} />
            </WizField>
            <WizField label="City"><WizInput value={e.city} onChange={v => update({ city: v })} placeholder="Detroit, MI" /></WizField>
          </div>
          <div className="wiz-field">
            <WizToggle value={e.current} onChange={v => update({ current: v, end: v ? '' : e.end })} label="I currently work here" />
          </div>
          <WizField label="Description">
            <WizTextarea value={e.description} onChange={v => update({ description: v })} placeholder="What you did, in one sentence." rows={2} max={300} />
          </WizField>
          <WizField label="Highlights" hint="One per line. Max 5.">
            <WizTextarea
              value={(e.highlights || []).join('\n')}
              onChange={v => update({ highlights: v.split('\n').filter(Boolean).slice(0, 5) })}
              placeholder="Led 14 commissioning projects&#10;Mentored 4 juniors&#10;3-time MVP"
              rows={3}
            />
          </WizField>
        </>
      )}
    />
  );
}

function PortfolioStep({ items, err, setSection }) {
  return (
    <WizRepeater
      items={items}
      onChange={setSection}
      max={10}
      addLabel="Add a portfolio link"
      emptyLabel="No portfolio links — optional but powerful."
      makeNew={(i) => ({ id: 'p' + (Date.now() + i), title: '', url: '', kind: 'video' })}
      renderItem={(p, update) => (
        <>
          <WizField label="Title">
            <WizInput value={p.title} onChange={v => update({ title: v })} placeholder="FANUC R-30iB cell programming walkthrough" />
          </WizField>
          <div className="wiz-grid wiz-grid-2">
            <WizField label="URL">
              <WizInput value={p.url} onChange={v => update({ url: v })} placeholder="https://youtube.com/watch?v=..." />
            </WizField>
            <WizField label="Kind">
              <WizSelect value={p.kind} onChange={v => update({ kind: v })} options={PORTFOLIO_KINDS} />
            </WizField>
          </div>
        </>
      )}
    />
  );
}

function SocialStep({ d, err, setField }) {
  const slots = [
    { k: 'linkedin', label: 'LinkedIn',  ph: 'https://linkedin.com/in/...' },
    { k: 'github',   label: 'GitHub',    ph: 'https://github.com/...' },
    { k: 'youtube',  label: 'YouTube',   ph: 'https://youtube.com/@...' },
    { k: 'x',        label: 'X (Twitter)', ph: 'https://x.com/...' },
    { k: 'website',  label: 'Personal website', ph: 'https://...' },
  ];
  return (
    <>
      {slots.map(s => (
        <WizField key={s.k} label={s.label} hint="Optional">
          <WizInput value={d[s.k]} onChange={v => setField(s.k, v)} placeholder={s.ph} />
        </WizField>
      ))}
    </>
  );
}

function AffilStep({ d, err, setField }) {
  return (
    <>
      <div className="wiz-field">
        <WizToggle value={d.has_affiliation} onChange={v => setField('has_affiliation', v)} label="I'm affiliated with a company or system integrator" hint="If yes, the company appears on your profile." />
      </div>
      {d.has_affiliation && (
        <>
          <div className="wiz-grid wiz-grid-2">
            <WizField label="Type">
              <WizSelect value={d.type} onChange={v => setField('type', v)} options={['employer','subcontractor','partner']} placeholder="Choose type" />
            </WizField>
            <WizField label="Company name">
              <WizInput value={d.company_name} onChange={v => setField('company_name', v)} placeholder="Acme Robotics" />
            </WizField>
          </div>
          <div className="wiz-grid wiz-grid-2">
            <WizField label="Your role at this company">
              <WizInput value={d.company_role} onChange={v => setField('company_role', v)} placeholder="Senior Controls Engineer" />
            </WizField>
            <WizField label="Joined date">
              <WizDate value={d.joined_at} onChange={v => setField('joined_at', v)} />
            </WizField>
          </div>
          <div className="wiz-grid wiz-grid-3">
            <WizField label="Weekly committed hours">
              <WizInput value={d.weekly_committed_hours} onChange={v => setField('weekly_committed_hours', v.replace(/\D/g,''))} suffix="hr" mono />
            </WizField>
            <WizField label="Rate through company">
              <WizInput value={d.rate_through_company} onChange={v => setField('rate_through_company', v)} prefix="$" suffix="/hr" mono />
            </WizField>
            <WizField label={<span>Direct rate <WizPrivacyChip kind="private" /></span>} hint="If you went around the company.">
              <WizInput value={d.rate_independent} onChange={v => setField('rate_independent', v)} prefix="$" suffix="/hr" mono />
            </WizField>
          </div>
        </>
      )}
    </>
  );
}

function PrivateStep({ d, err, setField }) {
  return (
    <>
      <div className="wiz-disclaimer wiz-disclaimer-strong">
        <WizPrivacyChip kind="demo" /> This is sample collection. Real platform encrypts these and shows them masked.
        Visitors see <span className="mono">•••• 4471</span>; you and admins see the full value behind a re-auth challenge.
      </div>
      <WizPosturePanel title="Contact information">
        <div className="wiz-grid wiz-grid-2">
          <WizField label="Phone (verified)" error={err.phone}>
            <WizInput value={d.phone} onChange={v => setField('phone', v)} placeholder="+1 (313) 555-0142" mono />
          </WizField>
          <WizField label="Personal email" error={err.personal_email}>
            <WizInput value={d.personal_email} onChange={v => setField('personal_email', v)} placeholder="you@personal-example.com" />
          </WizField>
        </div>
        <WizField label="Mailing address" error={err.address}>
          <WizInput value={d.address} onChange={v => setField('address', v)} placeholder="Street, City, State, Postal" />
        </WizField>
      </WizPosturePanel>
      <WizPosturePanel title="Identity & tax">
        <div className="wiz-grid wiz-grid-3">
          <WizField label="DOB" error={err.dob}>
            <WizInput value={d.dob} onChange={v => setField('dob', v)} placeholder="MM/DD/YYYY" mono />
          </WizField>
          <WizField label="SSN — last 4" error={err.ssn_last_4}>
            <WizInput value={d.ssn_last_4} onChange={v => setField('ssn_last_4', v.replace(/\D/g,'').slice(0,4))} placeholder="4471" mono />
          </WizField>
          <WizField label="Tax classification">
            <WizSelect value={d.tax_classification} onChange={v => setField('tax_classification', v)} options={TAX_CLASS} />
          </WizField>
        </div>
      </WizPosturePanel>
      <WizPosturePanel title="Emergency contacts">
        <WizField label="Emergency contact" error={err.emergency_contact} hint="Required for onsite work eligibility.">
          <WizInput value={d.emergency_contact} onChange={v => setField('emergency_contact', v)} placeholder="Lopez, R. · +1 (313) 555-0188" />
        </WizField>
        <WizField label="Backup contact" hint="Optional">
          <WizInput value={d.backup_contact} onChange={v => setField('backup_contact', v)} placeholder="Lopez, J. · +1 (313) 555-0144" />
        </WizField>
      </WizPosturePanel>
    </>
  );
}

function ReviewStep({ form }) {
  const sections = [
    { id: 'identity',  label: 'Identity & basics', items: [
      ['Username', form.account.username],
      ['Email', form.account.email],
      ['Phone', form.account.phone],
      ['Two-factor', form.account.two_factor ? 'Enabled' : 'Off'],
      ['Name', composeDisplayName(form.identity)],
      ['Pronouns', form.identity.preferred_pronouns || '—'],
      ['Photo', form.photo.main_url ? '✓ Uploaded' : '✗ Missing'],
      ['Primary occupation', form.headline.primary_occupation],
      ['Additional occupations', form.headline.additional_occupations.join(', ') || '—'],
      ['Tagline', form.headline.tagline || '—'],
      ['Headline', composeHeadline(form) || '—'],
      ['Location', [form.location.city, form.location.state, form.location.postal_code].filter(Boolean).join(', ')],
      ['Service radius', form.location.service_radius_miles + ' mi'],
    ]},
    { id: 'commercial', label: 'Commercial', items: [
      ['Default rate', '$' + (form.rates_pub.hourly_default || '—') + '/hr'],
      ['Emergency rate', '$' + (form.rates_pub.hourly_emergency || '—') + '/hr'],
      ['Remote rate', '$' + (form.rates_pub.hourly_remote || '—') + '/hr'],
      ['White Glove eligible', form.rates_pub.wg_eligible ? `Yes (+${form.rates_pub.white_glove_premium_pct}%)` : 'No'],
      ['Salary band (private)', form.rates_priv.salary_band_min ? `$${form.rates_priv.salary_band_min} – $${form.rates_priv.salary_band_max}` : '—'],
      ['Negotiable', form.rates_priv.rate_negotiable ? 'Yes' : 'No'],
      ['Min engagement', form.rates_priv.minimum_engagement_hours + ' hr'],
      ['Engagement preference', form.rates_priv.preferred_engagement || '—'],
      ['Status', form.avail.status],
      ['Capacity', form.avail.weekly_capacity_hours + ' hr/week'],
      ['Years experience', form.years.years_experience || '—'],
    ]},
    { id: 'expertise', label: 'Expertise', items: [
      ['Skills', form.skills.length + ' (' + form.skills.map(s => s.manufacturer).filter(Boolean).join(', ') + ')'],
      ['Certifications', form.certs.length],
      ['Education', form.edu.length],
      ['Languages', form.lang.map(l => `${l.name} (${l.proficiency})`).join(', ')],
      ['Equipment categories', form.equip.length],
      ['Work history', form.exp.length + ' role' + (form.exp.length === 1 ? '' : 's')],
    ]},
    { id: 'links', label: 'Links & affiliation', items: [
      ['Portfolio', form.portfolio.length + ' link' + (form.portfolio.length === 1 ? '' : 's')],
      ['LinkedIn', form.social.linkedin || '—'],
      ['GitHub', form.social.github || '—'],
      ['Website', form.social.website || '—'],
      ['Affiliated', form.affil.has_affiliation ? `${form.affil.company_name} · ${form.affil.company_role}` : 'Independent'],
    ]},
    { id: 'private', label: 'Private (owner-only)', items: [
      ['Phone', form.private.phone || '—'],
      ['Personal email', form.private.personal_email || '—'],
      ['Address', form.private.address || '—'],
      ['DOB', form.private.dob || '—'],
      ['SSN last 4', form.private.ssn_last_4 ? '•••• ' + form.private.ssn_last_4 : '—'],
      ['Tax class', form.private.tax_classification],
      ['Emergency', form.private.emergency_contact || '—'],
    ]},
  ];
  return (
    <div className="wiz-review">
      <div className="wiz-review-banner">
        <div className="wiz-review-glyph">✓</div>
        <div>
          <div className="wiz-review-h">Almost there</div>
          <div className="wiz-review-sub">Review your answers below. Click any section to edit. When you're satisfied, submit to publish your profile.</div>
        </div>
      </div>
      {sections.map(s => (
        <div key={s.id} className="wiz-review-section">
          <div className="wiz-review-section-h">{s.label}</div>
          <dl className="wiz-review-dl">
            {s.items.map(([k, v]) => (
              <div key={k} className="wiz-review-row">
                <dt>{k}</dt>
                <dd>{v ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { StepContent, AssistButton });

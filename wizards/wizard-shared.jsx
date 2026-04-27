/* eslint-disable */
/**
 * Wizard shared infrastructure
 *
 * Exports to window:
 *  - WIZARD_STEPS : 20-step blueprint per professional-profile-field-categorization.md
 *  - useWizardState : hook (formData, setField, errors, validate, dirty)
 *  - WizField, WizLabel, WizInput, WizTextarea, WizSelect, WizMulti, WizSlider, WizToggle, WizDate, WizUrl, WizPosturePanel, WizPrivacyChip, WizRepeater, WizPhotoCropper
 *  - composeHeadline, composeDisplayName, validators
 */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ─────────────────────────────────────────────────────────────────────────────
// Step blueprint — drives all three variants identically
// ─────────────────────────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  { id: 'account',     n: 1,  title: 'Account basics',         eyebrow: 'Step 1 of 20', sub: 'How you sign in.',                                section: 'identity' },
  { id: 'identity',    n: 2,  title: 'Your name',              eyebrow: 'Step 2 of 20', sub: 'How you’re addressed on the platform.',           section: 'identity' },
  { id: 'photo',       n: 3,  title: 'Profile photo',          eyebrow: 'Step 3 of 20', sub: 'Square crop, 144 × 144. Your face, well-lit.',     section: 'identity' },
  { id: 'headline',    n: 4,  title: 'Occupation & headline',  eyebrow: 'Step 4 of 20', sub: 'What you do. One primary, up to four supporting.', section: 'identity' },
  { id: 'location',    n: 5,  title: 'Where you work',         eyebrow: 'Step 5 of 20', sub: 'Home base + travel radius.',                       section: 'identity' },
  { id: 'rates_pub',   n: 6,  title: 'Rates — public',         eyebrow: 'Step 6 of 20', sub: 'What visitors and customers see.',                 section: 'commercial' },
  { id: 'rates_priv',  n: 7,  title: 'Rates — private',        eyebrow: 'Step 7 of 20', sub: 'Negotiating posture. Owner & admins only.',        section: 'commercial', posture: true },
  { id: 'avail',       n: 8,  title: 'Availability',           eyebrow: 'Step 8 of 20', sub: 'Status, hours, when you’re free.',                 section: 'commercial' },
  { id: 'years',       n: 9,  title: 'Years of experience',    eyebrow: 'Step 9 of 20', sub: 'Career length, self-reported.',                    section: 'commercial' },
  { id: 'skills',      n: 10, title: 'Skills',                 eyebrow: 'Step 10 of 20', sub: 'Manufacturers, models, certs. Min 1, max 10.',    section: 'expertise' },
  { id: 'certs',       n: 11, title: 'Certifications',         eyebrow: 'Step 11 of 20', sub: 'OSHA, ISA, OEM platforms. Optional.',             section: 'expertise' },
  { id: 'edu',         n: 12, title: 'Education',              eyebrow: 'Step 12 of 20', sub: 'Degrees + schools.',                              section: 'expertise', posture: true },
  { id: 'lang',        n: 13, title: 'Languages',              eyebrow: 'Step 13 of 20', sub: 'At least one. Proficiency level.',                section: 'expertise' },
  { id: 'equip',       n: 14, title: 'Equipment owned',        eyebrow: 'Step 14 of 20', sub: 'What you bring to a site.',                        section: 'expertise' },
  { id: 'exp',         n: 15, title: 'Work experience',        eyebrow: 'Step 15 of 20', sub: 'Roles. Min 1, max 10.',                           section: 'expertise' },
  { id: 'portfolio',   n: 16, title: 'Portfolio links',        eyebrow: 'Step 16 of 20', sub: 'Videos, code, talks, docs.',                       section: 'links' },
  { id: 'social',      n: 17, title: 'Social links',           eyebrow: 'Step 17 of 20', sub: 'LinkedIn, GitHub, YouTube, X, website.',           section: 'links' },
  { id: 'affil',       n: 18, title: 'Business affiliation',   eyebrow: 'Step 18 of 20', sub: 'Are you with a company or system integrator?',     section: 'links', posture: true },
  { id: 'private',     n: 19, title: 'Private information',    eyebrow: 'Step 19 of 20', sub: 'Required for 1099, payments, onsite work.',         section: 'private', posture: true },
  { id: 'review',      n: 20, title: 'Review & submit',        eyebrow: 'Step 20 of 20', sub: 'Last chance to edit. Then you’re live.',           section: 'submit' },
];

const SECTIONS = [
  { id: 'identity',   label: 'Identity',     glyph: '◐' },
  { id: 'commercial', label: 'Commercial',   glyph: '$' },
  { id: 'expertise',  label: 'Expertise',    glyph: '⚙' },
  { id: 'links',      label: 'Links',        glyph: '↗' },
  { id: 'private',    label: 'Private',      glyph: '◇' },
  { id: 'submit',     label: 'Review',       glyph: '✓' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Default form state
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_FORM = {
  account:    { username: '', email: '', phone: '', two_factor: false },
  identity:   { first_name: '', middle_initial: '', last_name: '', preferred_pronouns: '', display_name_override: '' },
  photo:      { main_url: null, file_name: null },
  headline:   { primary_occupation: '', additional_occupations: [], tagline: '', headline_override: '' },
  location:   { city: '', state: '', postal_code: '', country: 'United States', service_radius_miles: 250, willing_to_travel: true, travel_notes: '' },
  rates_pub:  { hourly_default: '', hourly_emergency: '', hourly_remote: '', white_glove_premium_pct: 35, currency: 'USD', wg_eligible: false },
  rates_priv: { salary_band_min: '', salary_band_max: '', rate_negotiable: false, minimum_engagement_hours: 8, preferred_engagement: '' },
  avail:      { status: 'Available Now', next_available_date: '', weekly_capacity_hours: 40, willing_overtime: false, willing_weekends: false, willing_nightshift: false, calendar_url: '' },
  years:      { years_experience: '' },
  skills:     [{ id: 'sk1', manufacturer: '', models: '', years: '', primary: false, certifications: '' }],
  certs:      [],
  edu:        [],
  lang:       [{ id: 'l1', name: 'English', proficiency: 'Native' }],
  equip:      [],
  exp:        [{ id: 'e1', company: '', role: '', start: '', end: '', current: false, city: '', description: '', highlights: [] }],
  portfolio:  [],
  social:     { linkedin: '', github: '', youtube: '', x: '', website: '' },
  affil:      { has_affiliation: false, type: '', company_name: '', company_role: '', joined_at: '', active: true, weekly_committed_hours: '', rate_through_company: '', rate_independent: '' },
  private:    { phone: '', personal_email: '', address: '', dob: '', ssn_last_4: '', tax_classification: '1099 Independent Contractor', emergency_contact: '', backup_contact: '' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Validators
// ─────────────────────────────────────────────────────────────────────────────

const v = {
  required: (val) => (val == null || val === '' || (Array.isArray(val) && val.length === 0)) ? 'Required' : null,
  email: (val) => /\S+@\S+\.\S+/.test(val || '') ? null : 'Invalid email',
  url: (val) => !val ? null : /^https?:\/\/\S+/.test(val) ? null : 'Must start with http:// or https://',
  phone: (val) => !val ? 'Required' : /^\+?[\d\s().-]{7,}$/.test(val) ? null : 'Invalid phone',
  number: (val, { min, max } = {}) => {
    if (val === '' || val == null) return 'Required';
    const n = Number(val); if (isNaN(n)) return 'Must be a number';
    if (min != null && n < min) return `Min ${min}`;
    if (max != null && n > max) return `Max ${max}`;
    return null;
  },
  ssn4: (val) => /^\d{4}$/.test(val || '') ? null : 'Last 4 digits',
  any: () => null,
};

function validateStep(stepId, data) {
  const errors = {};
  switch (stepId) {
    case 'account':
      ['username','email','phone'].forEach(k => { const e = (k==='email' ? v.email(data[k]) : k==='phone' ? v.phone(data[k]) : v.required(data[k])); if (e) errors[k] = e; });
      break;
    case 'identity':
      ['first_name','last_name'].forEach(k => { const e = v.required(data[k]); if (e) errors[k] = e; });
      break;
    case 'photo':
      if (!data.main_url) errors.main_url = 'Photo required';
      break;
    case 'headline':
      if (!data.primary_occupation) errors.primary_occupation = 'Required';
      break;
    case 'location':
      ['city','state','postal_code','country'].forEach(k => { const e = v.required(data[k]); if (e) errors[k] = e; });
      break;
    case 'rates_pub': {
      const e = v.number(data.hourly_default, { min: 0, max: 1000 }); if (e) errors.hourly_default = e;
      break;
    }
    case 'avail':
      if (!data.status) errors.status = 'Required';
      break;
    case 'years': {
      const e = v.number(data.years_experience, { min: 0, max: 60 }); if (e) errors.years_experience = e;
      break;
    }
    case 'skills':
      if (!data || data.length === 0) errors._root = 'Add at least one skill';
      else data.forEach((s, i) => { if (!s.manufacturer) errors['s'+i+'_mfr'] = 'Required'; if (!s.years) errors['s'+i+'_yrs'] = 'Required'; });
      break;
    case 'lang':
      if (!data || data.length === 0) errors._root = 'Add at least one language';
      break;
    case 'exp':
      if (!data || data.length === 0) errors._root = 'Add at least one role';
      else data.forEach((e, i) => { if (!e.company) errors['e'+i+'_co'] = 'Required'; if (!e.role) errors['e'+i+'_ro'] = 'Required'; });
      break;
    case 'private':
      ['phone','personal_email','address','dob','ssn_last_4','emergency_contact'].forEach(k => {
        const e = k === 'personal_email' ? v.email(data[k]) : k === 'ssn_last_4' ? v.ssn4(data[k]) : v.required(data[k]);
        if (e) errors[k] = e;
      });
      break;
  }
  return errors;
}

// ─────────────────────────────────────────────────────────────────────────────
// State hook with localStorage persistence (per-variant key)
// ─────────────────────────────────────────────────────────────────────────────

function useWizardState(storageKey = 'wizard.demo.v1') {
  const [data, setData] = useState(() => {
    try { const raw = localStorage.getItem(storageKey); return raw ? { ...DEFAULT_FORM, ...JSON.parse(raw) } : DEFAULT_FORM; }
    catch (e) { return DEFAULT_FORM; }
  });
  const [touched, setTouched] = useState({});

  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch (e) {} }, [data, storageKey]);

  const setField = useCallback((stepId, field, value) => {
    setData(prev => ({ ...prev, [stepId]: { ...prev[stepId], [field]: value } }));
    setTouched(t => ({ ...t, [stepId+'.'+field]: true }));
  }, []);

  const setSection = useCallback((stepId, value) => {
    setData(prev => ({ ...prev, [stepId]: value }));
    setTouched(t => ({ ...t, [stepId]: true }));
  }, []);

  const stepErrors = useCallback((stepId) => validateStep(stepId, data[stepId]), [data]);

  const allErrors = useMemo(() => {
    const out = {};
    WIZARD_STEPS.forEach(s => { const e = validateStep(s.id, data[s.id]); if (Object.keys(e).length) out[s.id] = e; });
    return out;
  }, [data]);

  const isStepValid = useCallback((stepId) => Object.keys(validateStep(stepId, data[stepId])).length === 0, [data]);

  const completion = useMemo(() => {
    const total = WIZARD_STEPS.length - 1; // exclude review step
    let done = 0;
    WIZARD_STEPS.forEach(s => { if (s.id !== 'review' && isStepValid(s.id)) done++; });
    return { done, total, pct: Math.round((done / total) * 100) };
  }, [isStepValid]);

  const reset = useCallback(() => { setData(DEFAULT_FORM); setTouched({}); try { localStorage.removeItem(storageKey); } catch (e) {} }, [storageKey]);

  return { data, setData, setField, setSection, touched, stepErrors, allErrors, isStepValid, completion, reset };
}

// ─────────────────────────────────────────────────────────────────────────────
// Composers (auto-fill helpers)
// ─────────────────────────────────────────────────────────────────────────────

function composeDisplayName(d) {
  const parts = [d.first_name, d.middle_initial && d.middle_initial + '.', d.last_name].filter(Boolean);
  return parts.join(' ');
}
function composeHeadline(form) {
  const occ = form.headline.primary_occupation;
  const yrs = form.years.years_experience;
  const city = form.location.city;
  const state = form.location.state;
  const parts = [];
  if (occ) parts.push(occ);
  if (yrs) parts.push(yrs + ' yrs');
  if (city && state) parts.push(city + ', ' + state);
  return parts.join(' · ');
}

// ─────────────────────────────────────────────────────────────────────────────
// Atomic controls
// ─────────────────────────────────────────────────────────────────────────────

function WizLabel({ children, error, hint, htmlFor }) {
  return (
    <div className="wiz-label-row">
      <label className="wiz-label" htmlFor={htmlFor}>{children}</label>
      {error && <span className="wiz-error">{error}</span>}
      {!error && hint && <span className="wiz-hint">{hint}</span>}
    </div>
  );
}

function WizField({ label, error, hint, children, htmlFor }) {
  return (
    <div className={'wiz-field' + (error ? ' has-error' : '')}>
      {label && <WizLabel htmlFor={htmlFor} error={error} hint={hint}>{label}</WizLabel>}
      {children}
    </div>
  );
}

function WizInput({ id, value, onChange, placeholder, type = 'text', mono = false, prefix, suffix, autoFocus, error }) {
  return (
    <div className={'wiz-input-shell' + (mono ? ' mono' : '') + (error ? ' has-error' : '')}>
      {prefix && <span className="wiz-input-prefix">{prefix}</span>}
      <input
        id={id}
        type={type}
        className={'wiz-input' + (mono ? ' mono' : '')}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {suffix && <span className="wiz-input-suffix">{suffix}</span>}
    </div>
  );
}

function WizTextarea({ id, value, onChange, placeholder, rows = 3, max, error }) {
  return (
    <div className={'wiz-textarea-shell' + (error ? ' has-error' : '')}>
      <textarea
        id={id}
        className="wiz-textarea"
        value={value ?? ''}
        onChange={e => onChange(e.target.value.slice(0, max || 999))}
        placeholder={placeholder}
        rows={rows}
      />
      {max && <span className="wiz-counter">{(value || '').length}/{max}</span>}
    </div>
  );
}

function WizSelect({ id, value, onChange, options, placeholder, error }) {
  return (
    <div className={'wiz-select-shell' + (error ? ' has-error' : '')}>
      <select id={id} className="wiz-select" value={value || ''} onChange={e => onChange(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => typeof o === 'string'
          ? <option key={o} value={o}>{o}</option>
          : <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <svg className="wiz-select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  );
}

function WizMulti({ value = [], onChange, options, max = 4 }) {
  const toggle = (opt) => {
    const has = value.includes(opt);
    if (has) onChange(value.filter(v => v !== opt));
    else if (value.length < max) onChange([...value, opt]);
  };
  return (
    <div className="wiz-multi">
      {options.map(o => (
        <button key={o} type="button" className={'wiz-chip' + (value.includes(o) ? ' on' : '')} onClick={() => toggle(o)}>{o}</button>
      ))}
    </div>
  );
}

function WizSlider({ id, value, onChange, min = 0, max = 100, step = 1, suffix }) {
  return (
    <div className="wiz-slider-shell">
      <input id={id} type="range" min={min} max={max} step={step} value={value ?? min} onChange={e => onChange(Number(e.target.value))} className="wiz-slider" />
      <div className="wiz-slider-val mono">{value}{suffix && <span className="wiz-slider-suffix">{suffix}</span>}</div>
    </div>
  );
}

function WizToggle({ value, onChange, label, hint }) {
  return (
    <button type="button" className={'wiz-toggle' + (value ? ' on' : '')} onClick={() => onChange(!value)}>
      <span className="wiz-toggle-track"><span className="wiz-toggle-thumb"></span></span>
      <span className="wiz-toggle-content">
        <span className="wiz-toggle-label">{label}</span>
        {hint && <span className="wiz-toggle-hint">{hint}</span>}
      </span>
    </button>
  );
}

function WizDate({ id, value, onChange, error }) {
  return (
    <div className={'wiz-input-shell mono' + (error ? ' has-error' : '')}>
      <input id={id} type="date" className="wiz-input mono" value={value ?? ''} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

function WizPosturePanel({ children, title = 'Private — owner & admins only' }) {
  return (
    <div className="wiz-posture">
      <div className="wiz-posture-head">
        <span className="wiz-posture-glyph">◇</span>
        <span className="wiz-posture-title">{title}</span>
      </div>
      <div className="wiz-posture-body">{children}</div>
      <div className="wiz-posture-foot">Visitors never see these fields.</div>
    </div>
  );
}

function WizPrivacyChip({ kind = 'private' }) {
  const labels = { private: 'Private', admin: 'Admin only', demo: '[demo]' };
  return <span className={'wiz-privacy-chip ' + kind}>{labels[kind]}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Photo cropper (visual stub — no actual image processing)
// ─────────────────────────────────────────────────────────────────────────────

function WizPhotoCropper({ value, onChange }) {
  const fileRef = useRef(null);
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ main_url: reader.result, file_name: f.name });
    reader.readAsDataURL(f);
  };
  return (
    <div className="wiz-cropper">
      <div className="wiz-cropper-frame">
        {value && value.main_url
          ? <img src={value.main_url} alt="Profile" className="wiz-cropper-img" />
          : <div className="wiz-cropper-empty">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 7l3-3h10l3 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/></svg>
              <span>144 × 144</span>
            </div>}
        <div className="wiz-cropper-ring"></div>
      </div>
      <div className="wiz-cropper-actions">
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} hidden />
        <button type="button" className="wiz-btn" onClick={() => fileRef.current && fileRef.current.click()}>
          {value && value.main_url ? 'Replace photo' : 'Upload photo'}
        </button>
        {value && value.main_url && <button type="button" className="wiz-btn ghost" onClick={() => onChange({ main_url: null, file_name: null })}>Remove</button>}
      </div>
      {value && value.file_name && <div className="wiz-cropper-meta mono">{value.file_name}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Repeater for arrays of objects (skills, certs, edu, exp, portfolio, equip, lang)
// ─────────────────────────────────────────────────────────────────────────────

function WizRepeater({ items, onChange, renderItem, addLabel = 'Add another', emptyLabel, max, makeNew, removable = true }) {
  const add = () => {
    if (max != null && items.length >= max) return;
    onChange([...items, makeNew(items.length)]);
  };
  const update = (i, patch) => onChange(items.map((it, j) => j === i ? { ...it, ...patch } : it));
  const remove = (i) => onChange(items.filter((_, j) => j !== i));
  return (
    <div className="wiz-repeater">
      {items.length === 0 && emptyLabel && <div className="wiz-repeater-empty">{emptyLabel}</div>}
      {items.map((it, i) => (
        <div key={it.id || i} className="wiz-repeater-item">
          <div className="wiz-repeater-head">
            <span className="wiz-repeater-num mono">{String(i+1).padStart(2,'0')}</span>
            {removable && items.length > 0 && (
              <button type="button" className="wiz-repeater-remove" onClick={() => remove(i)} aria-label="Remove">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6l-12 12"/></svg>
              </button>
            )}
          </div>
          <div className="wiz-repeater-body">
            {renderItem(it, (patch) => update(i, patch), i)}
          </div>
        </div>
      ))}
      {(max == null || items.length < max) && (
        <button type="button" className="wiz-repeater-add" onClick={add}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          {addLabel}
        </button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Taxonomies
// ─────────────────────────────────────────────────────────────────────────────

const OCCUPATIONS = [
  'Senior Controls Engineer','Controls Engineer','PLC Programmer','Robotics Engineer','Automation Engineer',
  'SCADA Engineer','HMI Developer','Process Engineer','Mechatronics Engineer','Field Service Engineer',
  'Commissioning Engineer','Validation Engineer','Industrial Network Engineer','Electrical Engineer','Project Engineer',
];
const MANUFACTURERS = [
  'Siemens','Rockwell Automation','FANUC','ABB','KUKA','Mitsubishi Electric','Cognex','Keyence','Beckhoff','Omron',
  'Yaskawa','Schneider Electric','Bosch Rexroth','Universal Robots','Banner Engineering','SICK','Pilz','Phoenix Contact',
];
const LANGUAGES = ['English','Spanish','French','German','Mandarin','Cantonese','Japanese','Korean','Portuguese','Italian','Arabic','Russian','Hindi','Vietnamese','Polish'];
const PROFICIENCIES = ['Native','Fluent','Conversational','Basic'];
const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
const PRONOUNS = ['','she/her','he/him','they/them','prefer not to say'];
const TAX_CLASS = ['1099 Independent Contractor','W-2','Corp-to-Corp'];
const AVAIL_STATUS = ['Available Now','Limited','Booked','On Vacation'];
const PORTFOLIO_KINDS = ['video','code','talk','doc'];
const EQUIP_CATEGORIES = ['Laptop','PLC-HMI','Test gear','Software','Vehicle','PPE','Tools','Other'];
const ENGAGEMENT_PATTERNS = ['short-burst (<2 wks)','4-6 weeks onsite','ongoing','project-based','retainer','open to all'];

// ─────────────────────────────────────────────────────────────────────────────
// Maria pre-fill (so reviewers can see a populated profile in seconds)
// ─────────────────────────────────────────────────────────────────────────────

const MARIA_PREFILL = {
  account:    { username: 'maria.lopez', email: 'maria.lopez@example.com', phone: '+1 (313) 555-0142', two_factor: true },
  identity:   { first_name: 'Maria', middle_initial: 'E', last_name: 'Lopez', preferred_pronouns: 'she/her', display_name_override: '' },
  photo:      { main_url: null, file_name: null },
  headline:   { primary_occupation: 'Senior Controls Engineer', additional_occupations: ['Robotics Engineer','Commissioning Engineer'], tagline: 'I make body-shop FANUC cells run on time and stay running. Detroit-3 White Glove preferred.', headline_override: '' },
  location:   { city: 'Detroit', state: 'MI', postal_code: '48226', country: 'United States', service_radius_miles: 250, willing_to_travel: true, travel_notes: 'Prefer 4–6 wk onsite blocks. Will fly anywhere in NA for Tier-1 OEM work.' },
  rates_pub:  { hourly_default: '148.50', hourly_emergency: '195.00', hourly_remote: '125.00', white_glove_premium_pct: 35, currency: 'USD', wg_eligible: true },
  rates_priv: { salary_band_min: '168000', salary_band_max: '215000', rate_negotiable: true, minimum_engagement_hours: 8, preferred_engagement: '4-6 weeks onsite' },
  avail:      { status: 'Available Now', next_available_date: '', weekly_capacity_hours: 50, willing_overtime: true, willing_weekends: true, willing_nightshift: false, calendar_url: 'https://cal.com/maria-lopez' },
  years:      { years_experience: '9' },
  skills:     [
    { id: 'sk1', manufacturer: 'Siemens', models: 'S7-1200, S7-1500, TIA Portal V18', years: '8', primary: true,  certifications: 'Siemens TIA Portal Specialist 2024' },
    { id: 'sk2', manufacturer: 'Rockwell Automation', models: 'CompactLogix, ControlLogix, Studio 5000 v34', years: '9', primary: true, certifications: 'Rockwell L2 Certified Engineer' },
    { id: 'sk3', manufacturer: 'FANUC', models: 'R-30iB Plus, R-2000iC, M-710iC', years: '7', primary: true, certifications: 'FANUC Vision iRVision · FANUC DCS' },
  ],
  certs:      [
    { id: 'c1', name: 'OSHA 30-Hour General Industry', issuer: 'OSHA', issued: '2017-06-15', expires: '', credential_id: '88-7102345', verify_url: '' },
    { id: 'c2', name: 'ISA-S88 Batch Control', issuer: 'ISA', issued: '2019-09-01', expires: '', credential_id: '', verify_url: '' },
    { id: 'c3', name: 'TÜV Functional Safety Engineer', issuer: 'TÜV Rheinland', issued: '2021-02-14', expires: '2026-08-14', credential_id: 'FS-2021-19443', verify_url: 'https://verify.tuv.com/FS-2021-19443' },
  ],
  edu:        [
    { id: 'ed1', school: 'Wayne State University', degree: 'B.S. Electrical Engineering', concentration: 'Industrial Controls', graduated_year: '2015', gpa: '3.74', honors: 'Magna Cum Laude', city: 'Detroit, MI' },
    { id: 'ed2', school: 'Henry Ford College', degree: 'A.A.S. Electronics Technology', concentration: '', graduated_year: '2013', gpa: '', honors: '', city: 'Dearborn, MI' },
  ],
  lang:       [{ id: 'l1', name: 'English', proficiency: 'Native' }, { id: 'l2', name: 'Spanish', proficiency: 'Fluent' }],
  equip:      [
    { id: 'eq1', category: 'Laptop', items: ['Dell Precision 5570 (Intel i7, 32GB)', 'Surface Pro 9 (field)'] },
    { id: 'eq2', category: 'Test gear', items: ['Fluke 87V multimeter', 'Fluke 1587 insulation tester', 'Hilscher netANALYZER'] },
    { id: 'eq3', category: 'Software', items: ['Studio 5000 v34', 'TIA Portal V18', 'Wireshark', 'FactoryTalk View ME/SE'] },
  ],
  exp:        [
    { id: 'ex1', company: 'Acme Robotics', role: 'Senior Controls Engineer', start: '2018-04', end: '', current: true, city: 'Detroit, MI', description: 'System integrator focused on body-shop automation for Detroit-3 OEMs.', highlights: ['Led 14 commissioning projects across Ford and Stellantis plants','Mentored 4 junior engineers','3-time MVP'] },
    { id: 'ex2', company: 'GM Powertrain', role: 'Controls Engineer II', start: '2015-08', end: '2018-03', current: false, city: 'Pontiac, MI', description: 'PLC programming and HMI development for engine assembly lines.', highlights: ['10MHz Profinet conversion','Reduced cycle time 12%'] },
  ],
  portfolio:  [
    { id: 'p1', title: 'FANUC R-30iB cell programming walkthrough', url: 'https://youtube.com/watch?v=demo-1', kind: 'video' },
    { id: 'p2', title: 'Studio 5000 style guide (Acme team standard)', url: 'https://github.com/maria-l/s5k-styleguide', kind: 'code' },
    { id: 'p3', title: 'Automation Fair 2024 — Body-shop retrofit lessons', url: 'https://example.com/talks/af24', kind: 'talk' },
  ],
  social:     { linkedin: 'https://linkedin.com/in/maria-lopez-controls', github: 'https://github.com/maria-l', youtube: '', x: '', website: 'https://marialopezcontrols.com' },
  affil:      { has_affiliation: true, type: 'employer', company_name: 'Acme Robotics', company_role: 'Senior Controls Engineer', joined_at: '2018-04-01', active: true, weekly_committed_hours: '40', rate_through_company: '148.50', rate_independent: '165.00' },
  private:    { phone: '+1 (313) 555-0142', personal_email: 'maria@personal-example.com', address: '••••• St, Detroit MI', dob: '••/••/1991', ssn_last_4: '4471', tax_classification: '1099 Independent Contractor', emergency_contact: 'Lopez, R. · +1 (313) 555-0188', backup_contact: 'Lopez, J. · +1 (313) 555-0144' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Export to window
// ─────────────────────────────────────────────────────────────────────────────

Object.assign(window, {
  WIZARD_STEPS, SECTIONS, DEFAULT_FORM, MARIA_PREFILL,
  useWizardState, validateStep, composeDisplayName, composeHeadline, validators: v,
  WizField, WizLabel, WizInput, WizTextarea, WizSelect, WizMulti, WizSlider, WizToggle, WizDate,
  WizPosturePanel, WizPrivacyChip, WizPhotoCropper, WizRepeater,
  OCCUPATIONS, MANUFACTURERS, LANGUAGES, PROFICIENCIES, STATES, PRONOUNS, TAX_CLASS, AVAIL_STATUS, PORTFOLIO_KINDS, EQUIP_CATEGORIES, ENGAGEMENT_PATTERNS,
});

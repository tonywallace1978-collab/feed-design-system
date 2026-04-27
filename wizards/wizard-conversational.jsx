/* eslint-disable */
/**
 * Variant C — Conversational hybrid
 * Left rail: chat-style thread of completed answers, click to revisit.
 * Right pane: active step with conversational prompt, one focus area at a time.
 * AI assist surfaces inline for open-ended fields.
 */

const { useState: useStateC, useEffect: useEffectC } = React;

const PROMPTS = {
  account:    "Let's start with how you sign in. Username, work email, mobile.",
  identity:   "What's your name, and how should we address you?",
  photo:      "Now your face. Square crop. Customers decide in 3 seconds whether to click.",
  headline:   "What do you do? One primary occupation, plus the supporting work.",
  location:   "Where do you live, and how far will you travel?",
  rates_pub:  "Your public rates. What customers see at the top of your profile.",
  rates_priv: "Now your private posture. Owner & admins only — visitors never see these.",
  avail:      "Are you available right now? Booked? Limited?",
  years:      "How many years have you been doing this work?",
  skills:     "Which manufacturers do you work with — and how deep?",
  certs:      "OSHA, ISA, OEM platform certs. Add the ones that matter.",
  edu:        "Schools and degrees. Year + GPA stay private.",
  lang:       "What languages do you work in?",
  equip:      "What do you bring to a site — laptop, test gear, software?",
  exp:        "Walk me through your work history. Most recent first.",
  portfolio:  "Have any public work — videos, code, talks? Link them here.",
  social:     "LinkedIn, GitHub, anywhere customers can verify you're real.",
  affil:      "Are you working with a system integrator or company right now?",
  private:    "Last private chunk: contact info, tax classification, emergency contacts.",
  review:     "Everything looks good. Ready to publish?",
};

function answerSummary(stepId, form) {
  const d = form[stepId];
  switch (stepId) {
    case 'account':    return d.username ? `${d.username} · ${d.email}` : '';
    case 'identity':   return composeDisplayName(d);
    case 'photo':      return d.main_url ? '✓ Photo uploaded' : '';
    case 'headline':   return d.primary_occupation;
    case 'location':   return [d.city, d.state, d.postal_code].filter(Boolean).join(', ');
    case 'rates_pub':  return d.hourly_default ? `$${d.hourly_default}/hr default` : '';
    case 'rates_priv': return d.preferred_engagement || (d.salary_band_min ? `$${d.salary_band_min}–$${d.salary_band_max}` : '');
    case 'avail':      return d.status;
    case 'years':      return d.years_experience ? `${d.years_experience} yrs` : '';
    case 'skills':     return d.length ? d.map(s => s.manufacturer).filter(Boolean).join(', ') : '';
    case 'certs':      return d.length ? `${d.length} cert${d.length===1?'':'s'}` : '';
    case 'edu':        return d.length ? `${d.length} school${d.length===1?'':'s'}` : '';
    case 'lang':       return d.length ? d.map(l => l.name).join(', ') : '';
    case 'equip':      return d.length ? `${d.length} categor${d.length===1?'y':'ies'}` : '';
    case 'exp':        return d.length ? `${d.length} role${d.length===1?'':'s'}` : '';
    case 'portfolio':  return d.length ? `${d.length} link${d.length===1?'':'s'}` : '';
    case 'social':     return Object.values(d).filter(Boolean).length ? `${Object.values(d).filter(Boolean).length} link${Object.values(d).filter(Boolean).length===1?'':'s'}` : '';
    case 'affil':      return d.has_affiliation ? `${d.company_name || '(unnamed)'} · ${d.company_role || ''}` : 'Independent';
    case 'private':    return d.phone ? '✓ Submitted' : '';
    case 'review':     return '';
    default: return '';
  }
}

function ConversationalWizard() {
  const wiz = useWizardState('wiz.convo.v1');
  const [activeIdx, setActiveIdx] = useStateC(0);
  const step = WIZARD_STEPS[activeIdx];
  const errors = wiz.stepErrors(step.id);
  const stepValid = Object.keys(errors).length === 0;

  useEffectC(() => {
    document.querySelectorAll('.cv-frame .wiz-slider').forEach(el => {
      const min = +el.min || 0, max = +el.max || 100, val = +el.value || 0;
      el.style.setProperty('--p', ((val - min) / (max - min)) * 100 + '%');
    });
  });

  const next = () => { if (activeIdx < WIZARD_STEPS.length - 1) setActiveIdx(activeIdx + 1); };
  const prev = () => { if (activeIdx > 0) setActiveIdx(activeIdx - 1); };

  return (
    <div className="cv-frame">
      <div className="cv-rail">
        <div className="cv-rail-top">
          <div className="cv-rail-h">Profile setup</div>
          <div className="cv-rail-sub">Tap any answer to revise it.</div>
          <div className="cv-rail-bar"><div className="cv-rail-bar-fill" style={{width: wiz.completion.pct + '%'}}></div></div>
          <div className="cv-rail-pct">
            <span>{wiz.completion.done} / {wiz.completion.total} answered</span>
            <span>{wiz.completion.pct}%</span>
          </div>
          <div style={{marginTop:12, display:'flex', gap:8}}>
            <button className="wiz-btn ghost" style={{padding:'6px 10px',fontSize:11}} onClick={() => wiz.setData(MARIA_PREFILL)}>Prefill</button>
            <button className="wiz-btn ghost" style={{padding:'6px 10px',fontSize:11}} onClick={() => { wiz.reset(); setActiveIdx(0); }}>Reset</button>
          </div>
        </div>

        <div className="cv-thread">
          {WIZARD_STEPS.map((s, i) => {
            const summary = answerSummary(s.id, wiz.data);
            const valid = wiz.isStepValid(s.id);
            const isActive = i === activeIdx;
            const status = isActive ? 'now' : valid ? 'ok' : 'skip';
            return (
              <div key={s.id} className={'cv-msg' + (isActive ? ' active' : '')} onClick={() => setActiveIdx(i)}>
                <div className="cv-msg-q">Q{String(s.n).padStart(2,'0')} · {s.title}</div>
                <div className={'cv-msg-a' + (!summary ? ' empty' : '')}>{summary || '— not yet answered —'}</div>
                <div className="cv-msg-meta">
                  <span className={'cv-msg-pill ' + status}>{isActive ? 'Now' : valid ? 'Saved' : 'Skip'}</span>
                  {s.posture && <WizPrivacyChip kind="private" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="cv-stage">
        <div className="cv-stage-top">
          <div>
            <div className="cv-stage-eyebrow">{step.eyebrow}</div>
            <div className="cv-stage-title">{step.title}</div>
          </div>
          <div className="cv-stage-action">
            <button className="wiz-btn ghost" onClick={prev} disabled={activeIdx === 0}>← Back</button>
            {step.id === 'review'
              ? <button className="wiz-btn primary" onClick={() => alert('[demo] Profile would publish here.')}>Publish</button>
              : <button className="wiz-btn primary" onClick={next} disabled={!stepValid}>Continue →</button>
            }
          </div>
        </div>

        <div className="cv-stage-body" key={step.id}>
          <div className="cv-stage-form">
            <div className="cv-stage-prompt">
              <div className="cv-stage-prompt-glyph">A</div>
              <div>{PROMPTS[step.id]}</div>
            </div>
            <StepContent stepId={step.id} form={wiz.data} setField={wiz.setField} setSection={wiz.setSection} errors={errors} />
          </div>
        </div>

        <div className="cv-stage-foot">
          <div className="stp-foot-status saved"><span className="dot"></span>Saved</div>
          <div className="stp-foot-actions">
            <span style={{fontFamily:'JetBrains Mono', fontSize:11, color:'var(--glass-text-tertiary)'}}>
              Q{step.n} of {WIZARD_STEPS.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ConversationalWizard = ConversationalWizard;

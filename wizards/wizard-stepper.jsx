/* eslint-disable */
/**
 * Variant A — Stepper (Apple Setup-style)
 * One step per screen. Big focused content area. Soft progress bar + side rail.
 * Tactile prev/next. Prefill button to load Maria.
 */

const { useState: useStateA, useMemo: useMemoA, useEffect: useEffectA } = React;

function StepperWizard() {
  const wiz = useWizardState('wiz.stepper.v1');
  const [activeIdx, setActiveIdx] = useStateA(0);
  const step = WIZARD_STEPS[activeIdx];
  const errors = wiz.stepErrors(step.id);
  const stepValid = Object.keys(errors).length === 0;

  // Progress bar fill = % of completed steps
  const fillPct = (wiz.completion.done / wiz.completion.total) * 100;

  const next = () => { if (activeIdx < WIZARD_STEPS.length - 1) setActiveIdx(activeIdx + 1); };
  const prev = () => { if (activeIdx > 0) setActiveIdx(activeIdx - 1); };

  // Slider gradient track fix (CSS var --p)
  useEffectA(() => {
    document.querySelectorAll('.stp-frame .wiz-slider').forEach(el => {
      const min = +el.min || 0, max = +el.max || 100, val = +el.value || 0;
      const p = ((val - min) / (max - min)) * 100;
      el.style.setProperty('--p', p + '%');
    });
  });

  const groupedSteps = useMemoA(() => {
    const groups = {};
    WIZARD_STEPS.forEach((s, i) => { (groups[s.section] = groups[s.section] || []).push({ ...s, i }); });
    return groups;
  }, []);

  return (
    <div className="stp-frame">
      {/* Top */}
      <div className="stp-top">
        <div className="stp-brand">
          <div className="stp-brand-mark">A</div>
          <div className="stp-brand-text">Automate America <span className="dim">· Profile setup</span></div>
        </div>
        <div className="stp-progress">
          <div className="stp-progress-bar"><div className="stp-progress-fill" style={{ width: fillPct + '%' }}></div></div>
          <div className="stp-progress-text">{wiz.completion.done} / {wiz.completion.total} complete</div>
        </div>
        <div className="stp-meta">
          <a href="#" onClick={e => { e.preventDefault(); wiz.setData(MARIA_PREFILL); }}>Prefill demo</a>
          <a href="#" onClick={e => { e.preventDefault(); wiz.reset(); setActiveIdx(0); }}>Reset</a>
        </div>
      </div>

      {/* Body */}
      <div className="stp-body">
        <div className="stp-rail">
          {SECTIONS.map(sec => (
            <React.Fragment key={sec.id}>
              <div className="stp-rail-section">{sec.glyph} &nbsp; {sec.label}</div>
              {(groupedSteps[sec.id] || []).map(s => {
                const done = wiz.isStepValid(s.id) && s.id !== 'review';
                const active = s.i === activeIdx;
                return (
                  <button key={s.id} type="button"
                    className={'stp-rail-step' + (active ? ' active' : '') + (done ? ' done' : '')}
                    onClick={() => setActiveIdx(s.i)}>
                    <span className="stp-rail-num">{done ? '✓' : s.n}</span>
                    <span className="stp-rail-label">{s.title}</span>
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div className="stp-content" key={step.id}>
          <div className="stp-eyebrow">{step.eyebrow}{step.posture && <span style={{marginLeft:10}}><WizPrivacyChip kind="private" /></span>}</div>
          <h1 className="stp-title">{step.title}</h1>
          <p className="stp-sub">{step.sub}</p>
          <div className="stp-form">
            <StepContent stepId={step.id} form={wiz.data} setField={wiz.setField} setSection={wiz.setSection} errors={errors} />
          </div>
        </div>
      </div>

      {/* Foot */}
      <div className="stp-foot">
        <div className={'stp-foot-status saved'}>
          <span className="dot"></span>
          Saved automatically · {step.eyebrow}
        </div>
        <div className="stp-foot-actions">
          <button className="wiz-btn ghost" onClick={prev} disabled={activeIdx === 0}>Back</button>
          {step.id === 'review'
            ? <button className="wiz-btn primary" onClick={() => alert('[demo] Profile would publish here.')}>Publish profile</button>
            : <button className="wiz-btn primary" onClick={next} disabled={!stepValid}>
                Continue
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
          }
        </div>
      </div>
    </div>
  );
}

window.StepperWizard = StepperWizard;

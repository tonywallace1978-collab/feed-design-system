/* eslint-disable */
/**
 * Variant B — Long-form (Notion-settings density)
 * All steps as sections on one scroll. Sticky TOC + footer save bar.
 */

const { useState: useStateB, useEffect: useEffectB, useRef: useRefB } = React;

function LongFormWizard() {
  const wiz = useWizardState('wiz.longform.v1');
  const [activeId, setActiveId] = useStateB('account');
  const containerRef = useRefB(null);
  const sectionRefs = useRefB({});

  // IntersectionObserver for active TOC
  useEffectB(() => {
    const root = containerRef.current; if (!root) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.dataset.stepId); });
    }, { root, rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffectB(() => {
    document.querySelectorAll('.lf-frame .wiz-slider').forEach(el => {
      const min = +el.min || 0, max = +el.max || 100, val = +el.value || 0;
      el.style.setProperty('--p', ((val - min) / (max - min)) * 100 + '%');
    });
  });

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el && containerRef.current) {
      containerRef.current.scrollTo({ top: el.offsetTop - 24, behavior: 'smooth' });
    }
  };

  const renderableSteps = WIZARD_STEPS.filter(s => s.id !== 'review');
  const requiredCount = wiz.completion.total;
  const doneCount = wiz.completion.done;

  return (
    <div className="lf-frame">
      <div className="lf-top">
        <div className="lf-top-l">
          <div className="stp-brand">
            <div className="stp-brand-mark">A</div>
            <div className="stp-brand-text">Automate America</div>
          </div>
          <div className="lf-top-title">Professional profile setup</div>
          <span className="lf-top-tag">Single page</span>
        </div>
        <div className="lf-top-r">
          <div className="lf-top-pct">
            <span>{doneCount}/{requiredCount}</span>
            <div className="lf-top-pct-bar"><div className="lf-top-pct-fill" style={{ width: (doneCount/requiredCount*100) + '%' }}></div></div>
            <span>{Math.round(doneCount/requiredCount*100)}%</span>
          </div>
          <button className="wiz-btn ghost" onClick={() => wiz.setData(MARIA_PREFILL)}>Prefill demo</button>
        </div>
      </div>

      <div className="lf-body">
        <div className="lf-toc">
          <div className="lf-toc-h">On this page</div>
          {renderableSteps.map(s => {
            const done = wiz.isStepValid(s.id);
            return (
              <button key={s.id} className={'lf-toc-link' + (activeId === s.id ? ' active' : '') + (done ? ' done' : '')} onClick={() => scrollTo(s.id)}>
                <span>{s.title}</span>
                <span className={'lf-toc-tick ' + (done ? 'done' : 'todo')}>{done ? '✓' : ''}</span>
              </button>
            );
          })}
        </div>

        <div className="lf-scroll" ref={containerRef}>
          <h1 className="lf-scroll-h">Set up your professional profile</h1>
          <p className="lf-scroll-sub">Everything in one place. Scroll, fill, save. The platform auto-saves as you go — close any time and pick up where you left off.</p>

          {renderableSteps.map(s => {
            const done = wiz.isStepValid(s.id);
            return (
              <section key={s.id} className="lf-section" data-step-id={s.id} ref={el => sectionRefs.current[s.id] = el}>
                <div className="lf-section-h">
                  <div>
                    <span className="lf-section-num">{String(s.n).padStart(2,'0')}</span>
                    <span className="lf-section-title">{s.title}</span>
                    {s.posture && <span style={{marginLeft:10}}><WizPrivacyChip kind="private" /></span>}
                  </div>
                  <span className="lf-section-meta">{done ? '✓ Complete' : 'Incomplete'}</span>
                </div>
                <div className="lf-section-sub">{s.sub}</div>
                <div className="lf-section-body">
                  <StepContent stepId={s.id} form={wiz.data} setField={wiz.setField} setSection={wiz.setSection} errors={wiz.stepErrors(s.id)} />
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <div className="lf-foot">
        <div className="stp-foot-status saved"><span className="dot"></span>All changes saved</div>
        <div className="stp-foot-actions">
          <button className="wiz-btn ghost" onClick={() => wiz.reset()}>Reset</button>
          <button className="wiz-btn primary" disabled={doneCount < requiredCount} onClick={() => alert('[demo] Profile would publish here.')}>
            Publish profile
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

window.LongFormWizard = LongFormWizard;

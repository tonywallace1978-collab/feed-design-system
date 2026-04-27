# Session Memory — Maria Lopez Professional Profile Audit

**Last updated:** End of session after Pro Profile Wizard ship (3 variants + field categorization).
**Resume protocol:** On next prompt, read this file FIRST, then `HANDOFF.md` from the repo, then re-import `scripts/render-professional.js` to verify state. Do not start #25 (renderExperience audit) until Tony confirms direction (audit vs. wizard polish vs. other-surface wizards).

---

## ⚡ THIS SESSION (post-#24) — Pro Profile Wizard work

**Pivot:** After #24, Tony pivoted from spec-compliance audit to designing the Pro Profile setup wizard (the onboarding flow that produces the data Maria's profile reads). #25 (`renderExperience` audit) is paused, not killed.

**Shipped (all on disk in this project, NOT yet committed to repo):**

1. **`wizards/professional-profile-field-categorization.md`** — 18,645 chars, 424 lines. Enumerates every field on the Pro Profile by spec authority (canonical / posture-leak / derived / fabricated) and groups them into 20 wizard steps. Anchors the wizard's information architecture in the audit findings #20–#24.

2. **`wizards/wizard-shared.jsx`** — 28,997 chars, 500 lines. Shared infrastructure: `WIZARD_STEPS` blueprint (20 steps), `useWizardState` hook, all `Wiz*` field primitives (Field, Label, Input, Textarea, Select, Multi, Slider, Toggle, Date, Url, PosturePanel, PrivacyChip, Repeater, PhotoCropper), `composeHeadline`/`composeDisplayName` derivers, validators. All three wizard variants consume this.

3. **`wizards/wizard-step-content.jsx`** — 37,075 chars, 737 lines. Per-step content (forms for all 20 steps). Maria-prefilled.

4. **`wizards/wizard-stepper.jsx`** — 4,568 chars, 110 lines. **Variant A — Apple Setup-style stepper.** One step per screen, big focus, sidebar shows progress.

5. **`wizards/wizard-longform.jsx`** — 5,099 chars, 119 lines. **Variant B — Notion-density long form.** All 20 steps stacked on one scroll, section headers, inline progress.

6. **`wizards/wizard-conversational.jsx`** — 7,873 chars, 154 lines. **Variant C — Chat thread with active pane.** Q&A thread on left, currently-active form on right, completed steps collapse into chat bubbles.

7. **`wizards/wizard-styles.css`** — 32,298 chars, 812 lines. Wizard-specific styling layered on `glass.css` + `glass-design-tokens.css`. Slider gradient, posture-panel chrome, privacy chips, photo cropper, repeater rows.

8. **`wizards/design-canvas.jsx`** — 29,846 chars, 623 lines. Local copy of the design_canvas starter (modified: pan/zoom + drag-reorder + fullscreen focus per artboard).

9. **`Pro Profile Wizard.html`** — 90 lines. Host file. Loads React 18 + Babel pinned, wires up `<DesignCanvas>` with three `<DCArtboard>` cards (1280×800, 1280×1100, 1280×800) — one per variant.

**Wizard step blueprint (canonical, do not change without product call):**
```
1  account     · Account basics (sign-in)
2  identity    · Your name
3  photo       · Profile photo (144×144)
4  headline    · Occupation & headline (1 primary + ≤4 supporting)
5  location    · Where you work (home base + radius)
6  rates_pub   · Rates — public
7  rates_priv  · Rates — private (POSTURE)
8  avail       · Availability
9  years       · Years of experience
10 skills      · Skills (manufacturers/models/certs · 1–10)
11 certs       · Certifications
12 edu         · Education (POSTURE — strip city/year/gpa/honors)
13 lang        · Languages
14 equip       · Equipment owned
15 exp         · Work experience (1–10 roles)
16 portfolio   · Portfolio links
17 social      · Social links
18 affil       · Business affiliation (POSTURE — `rate_independent` private)
19 private     · Private info (POSTURE — 1099/payments/onsite)
20 review      · Review & submit
```

Posture steps (4 of 20: rates_priv, edu, affil, private) are marked `posture: true` in the blueprint and render with WizPosturePanel chrome — the visual treatment that signals "this surfaces only to the right audience" derived directly from the rule-9 lens that drove #20–#24.

**Pending Tony decisions on the wizard:**
- Eyeball all 3 variants. Pick a winner OR ask for a hybrid.
- If A wins → polish phase (transitions, error states, mobile breakpoints).
- If B → density review, section-anchor nav.
- If C → chat-thread copy pass + completed-step bubble design.
- Build wizards for the other 3 surfaces (Customer Profile, Business Profile, Business Group)? Same pattern, ~3 weeks of work each.

**Repo commit status of wizard files:** UNCOMMITTED. Files are on disk in this project but have not been pushed to `feed-design-system`. **Next session must commit them under `wizards/` + `Pro Profile Wizard.html` at root before any other work, OR Tony zips this project and Claude Code commits from local.**

---

---

## Repos & Protocol

- **feed-design-system** (active): https://github.com/tonywallace1978-collab/feed-design-system
- **automate-america-design-system** (parent, both mirrored locally)
- Both repos public. My GitHub connector here is read-only — Tony forwards my reports to Claude Code, Claude Code commits + pushes, Tony pastes commit SHA back, I re-import.
- `HANDOFF.md` at each repo root is source of truth. Commit prefixes: `[checkpoint]` / `[wip]` / `[needs-review]`.

## Operating Rules (locked)

1. **No freelancing.** I produce gap reports only — Claude Code writes code. Every report names file + line, spec violated (verbatim quote), surgical diff, and total LOC change.
2. **Bundle is frozen.** I flag bundle inconsistencies but never auto-fix them. Tony product calls only.
3. **No multi-choice questions to Tony.** Pick one recommended path; offer alternatives only if genuinely needed.
4. **Check spec intent.** When stripping fabrication, ask whether the spec wants something there at all (vs nothing) — don't replace fake data with empty state if spec authorizes neither.
5. **Check constraining CSS rule before proposing inline attr fix.** Lesson from #15: inline style overrides may be blocked by `!important` or specificity.
6. **WHITE-GLOVE-VISUAL.md locked:** WG = amber `#F59E0B` ◇ glyph. Never violet/indigo.
7. **Bundle world-clock:** 2026-04-26.
8. **Output format:** Minimal, no preamble. Just the report.
9. **Rule 9 framing (the audit's central lens):** When spec restricts what a card surfaces, ask why. Three categories of leak to scan for:
   - Surface clutter (visual density)
   - Visibility scope (right audience seeing right field)
   - **Pre-negotiation posture leak** (data the contractor would normally control disclosure of)

## Bundle Path

`reference/claude-design-bundles/professional-maria-lopez/` in `feed-design-system` repo.
- 9 specs (TIERS, ROLE-OVERRIDES, EMPTY-STATES, BADGE-THRESHOLDS, WHITE-GLOVE-VISUAL, SECTIONS, POPOUTS, COPY-BLOCKS, ADMIN-DASHBOARD-SPEC)
- 10 JSONs (key one: `professional.json` — mirrored to `data/professional-data.js`)
- 56 assets (39 badge PNGs + 17 logos)

## Active Surface

`Maria Lopez · Professional.html` driven by:
- `data/professional-data.js` (mirrors `professional.json`)
- `scripts/render-professional.js` (24 renderer functions)
- `tokens/glass-design-tokens.css`
- `styles/glass.css`

## Audit Status — All 24 Renderers

| # | Renderer | Status | Deviation # |
|---|---|---|---|
| 1 | renderHero | audited | #21 (1.6:1 banner → 144px portrait + grid layout) |
| 2 | renderAvailability | audited | #23 (5th unauthorized chip row stripped) |
| 3 | renderRates | audited | **#24** (band + negotiable + engagement stripped) |
| 4 | renderConnections | audited | early (delta sourcing — clean) |
| 5 | renderAffiliation | audited | #20 (rate_independent leak stripped) |
| 6 | renderGroups | audited | #21-prior (slice 4→3 + "+ N more") |
| 7 | renderSecureFiles | audited | #19 (effectiveStatus derivation) |
| 8 | renderPrivate | audited | #20-popout (eye/pencil affordances) |
| 9 | renderActiveApp | audited | #5 (data-faithful Acme contract) |
| 10 | renderWatchers | audited | #4 (fakeWatchers → data-driven) |
| 11 | renderBadges | audited | #8 (locked badges stripped) |
| 12 | renderSkills | audited | #15 (A shipped, B deferred as #15b, C via CSS not attr) |
| 13 | renderAbout | audited | #15 also covered |
| 14 | renderReviews | audited | #16 (`r.white_glove` derivation from `[Anonymous]`) |
| 15 | renderExperience | **UNAUDITED** | NEXT — #25 candidate |
| 16 | renderCertifications | audited | #17 (slice 14→7) |
| 17 | renderEducation | audited | #22 (gpa + grad-year + city + honors stripped) |
| 18 | renderLanguages | audited | confirmed clean during #22 |
| 19 | renderEquipment | audited | clean |
| 20 | renderRadius | audited | #20-Mapbox (schematic → spec calls for Mapbox; deferred) |
| 21 | renderEndorsements | audited | #13 (slice 12→7) |
| 22 | renderPortfolio | audited | #6 (6 hardcoded → 7 data-driven) |
| 23 | renderAdmin | audited | #7 (fabricated tiles + fake-signed note) |

**Only `renderExperience` is truly unaudited.**

## Last Commit State

- #24 shipped as commit `ffb4025`
- HANDOFF.md at `b0ca4d3`
- All 24 deviations from this audit pass committed to `main`

## Pattern Flag (for #25)

**Four consecutive posture-leak deviations on left-rail `[ALL]` cards:**
- #20 Affiliation: `rate_independent` field stripped
- #22 Education: `gpa` + `graduated_year` + `honors` + `city` stripped
- #23 Availability: `willing_overtime` + `willing_weekends` + `willing_nightshift` chip row stripped (with inverted-negation bonus catch)
- #24 Rates: salary band + `rate_negotiable` "negotiable" suffix + engagement preferences stripped

The spec author was systematically pruning posture-leakage data from left-rail `[ALL]` cards; the renderer kept adding it back. Self-correcting note: my own #10 (Watchers area) surfaced some of this as data-fidelity wins before the rule-9 lens existed at #20+.

## Next Action: #25

**Target:** `renderExperience` (lines 340–360 of `scripts/render-professional.js`).

**Hypothesis to test:** Posture-leak archetype likely present. Candidate fields to scan in `D.experience[*]`:
- `salary_at_role` / `compensation` (FTE comp disclosure → strong posture leak)
- `reason_for_leaving` (negotiation-poisoning data)
- `would_return: true/false` (loyalty signal)
- `references_available` (control-disclosure data)
- `gross_billings` per role (rate inference)
- Specific dollar amounts on past contracts

**Do not start #25 until next session and Tony confirms.**

**Resume sequence next session:**
1. Read this file
2. Read repo `HANDOFF.md` to verify state at `ffb4025` / `b0ca4d3`
3. Re-import `scripts/render-professional.js` from `main`
4. Re-import or re-grep `data/professional-data.js` for `experience` block to inventory fields
5. Cross-reference SECTIONS.md right-column item for Experience (verbatim quote)
6. Write #25 report in established format

## Open #b items (deferred product calls)

- **#15b:** Skills variation B (open product call deferred)
- **#20-Mapbox:** Service Radius schematic still ships — Mapbox path requires Tony token decision (Option A: GL JS + public token, recommended)
- **#21b:** Business Groups "+ N more" click handler — pending META modal/popout primitive
- **Cross-cutting:** SECTIONS.md:285 "JetBrains Mono on every number" — partially applied per-deviation, needs sweep
- Various tidy-ups logged inside individual reports (duplicate `textContent` assignments, unused `const occ`, etc.)

## Bundle Inconsistencies Logged (not auto-fixed)

- `D.business_groups[2].logo_color = "#F59E0B"` collides with WG amber (Body-in-White Specialists is non-WG)
- `D.certifications[2]` (`tuv-functional`) `expires: "2026-02-14"` is past world-clock 2026-04-26 with `renewal_due_soon: true` (semantically expired, not "due soon")

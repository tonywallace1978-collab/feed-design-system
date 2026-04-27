# HANDOFF — Two-Account Design Workflow

This repo is shared between two Claude accounts (Claude.ai web + Claude Code on Tony's laptop). Both auth as `tonywallace1978-collab` on GitHub. **The repo is the memory.** When one account hits its token limit, the other account pulls and continues from the last commit.

Sister repo: `automate-america-design-system` (parent design system / brand tokens). This repo applies it to Feed-specific surfaces.

---

## CURRENT STATE — UPDATE THIS BEFORE EVERY PUSH

**Last session:** Claude Code · 2026-04-26 (commit `30c1d27`)
**Status:** Maria Lopez Professional Profile — **25 deviations cleared. Audit COMPLETE on Professional Profile** (every left-rail [ALL] renderer scanned). Posture-leak streak ended at 4 (#20/#22/#23/#24); #25 was surface-density scope-creep, not posture-leak. Renderer's posture-leak surface area on this profile is now exhausted. Per Claude Design recommendation, remaining deviations on other surfaces (Customer / Business / Business Group / User Dashboard) warrant fresh first-principles scans, not assumption of recurrence. Next surface per bundle README sequencing: **Customer Profile (Rebecca Chen / Ford Rouge)**. Tony eyeball-checkpoint on Maria Pro pending before pivot.

**Re-import drift resolved (2026-04-26 post-#12):** Claude Design re-synced after Claude Code's hard re-sync prompt — quoted all 6 verbatim post-#11 lines successfully, snapshot now at 363280e+. Claude Design's #13 was correctly numbered + grounded in SECTIONS.md verbatim. The hard re-sync prompt template (force `github_get_tree` first + quote N specific post-update lines + acknowledge the renumbering) is the working pattern when Claude Design's re-imports aren't taking — keep it on file.
**Active surface:** `Maria Lopez · Professional.html` (driven by `scripts/render-professional.js` + `data/professional-data.js`).

**Canonical bundle:** `reference/claude-design-bundles/professional-maria-lopez/` (78 files: 1 README + 10 JSONs in `/data/` + 9 spec MDs in `/specs/` + 58 assets). Imported in commit `a4caa0f`.

**Bootstrap prompt for new Claude Design sessions:** `CLAUDE-DESIGN-PROMPT.md` at repo root. Tony pastes that block into any new Claude Design session in either account; it self-onboards.

**Deviations fixed this session (do not re-flag — re-import files first):**

| # | Commit | What changed |
|---|---|---|
| 1 | `05b8930` | `.rev-card.wg` violet → spec-compliant neutral chrome; `.rev-logo.wg` violet/indigo gradient → neutral + amber `◇` glyph; `font-weight:800` → 700 |
| 2 | `465cfda` | `renderAbout()` 3 hardcoded ad-libbed paragraphs → verbatim Professor-voice prose from `COPY-BLOCKS.md § 1` |
| 3 | `3199f58` | `renderActiveApp()` Body-Shop-FANUC-WG-Spartanburg fabrication → canonical Acme Robotics / Ford Rouge palletizer (Standard tier) per `COPY-BLOCKS.md § 1` |
| 4 | `55878a8` | `renderWatchers()` hardcoded 4-entry `fakeWatchers` array → derived from `D.watchers.recent` (8 canonical entries) with name-→-logo lookup + relative-time formatter |
| 5 | (= #3 — duplicate flag from stale snapshot) | n/a |
| 6 | `782b8d0` | `renderPortfolio()` 6 fabricated items → derived from `D.portfolio_links` (7 entries with real URLs); `href="#"` → real URL with `target="_blank"` |
| 7 | `782b8d0` | `renderAdmin()` hardcoded tile values + fake `tony.wallace 2026-04-22` signature + invented free-text → all derived from `D.admin_notes` + `D.two_factor_enabled`; signature dropped (no canonical signer in data) |
| 8 | `c7bfb67` | `renderConnections()` literal `+14`/`+41` deltas → derived from new `quick_stats.connections_growth_30d` / `_quarter` (Path A — added fields to bundle JSON + runtime data with values matching prior visual) |
| 9 | `99898d7` | `renderHero()` quick-stats strip dropped 3 of 11 canonical fields → 6-tile layout surfacing `lifetime_billings_usd` ($1.68M, the credibility metric named verbatim in admin note), `rating_count` (47 reviews sub-label on Rating tile), `active_contracts` (1 active sub-label on Contracts tile); `.hero-stats` grid `repeat(5,1fr)` → `repeat(6,1fr)` |
| 10 | `79df735` | `renderRates()` dropped `minimum_engagement_hours` (8) + `rate_negotiable` (true) and hardcoded `salary_band_currency` via shared `fmtMoney`; added local `fmtBandMoney` (currency-aware), `#rate-eng` now textContent `"<preferred_engagement> · 8 hr minimum · negotiable"` |
| 11 | `e6da38f` | `renderAvailability()` dropped `calendar_url` (the cal.com booking CTA — biggest behavioral fidelity gap) + `status_color` (live-dot was hardcoded green); added `<a id="avail-cta">` (statically in HTML, hidden by default, JS reveals via setAttribute + display); `.live-dot.live-dot-success/-warning/-neutral` CSS variants + `pulse-warn` keyframes; classList.add('live-dot-' + status_color) to apply variant. No new innerHTML lines (security hook avoided) |
| 12 | `6002701` | `renderBadges()` fabricated 3 hardcoded "locked" badges (`Reach Engineer/Reach`, `Decade Veteran/Tenure`, `Diamond Endorser/Endorser`) — "Reach" not in `BADGE-THRESHOLDS.md`, "Decade Veteran" not in Tenure ladder. Stripped strictly-subtractively (Option A): deleted locked array, deleted `+ locked.map(...).join('')` chain, footer textContent now `"${earned.length} earned"` (was "X earned · 3 locked"). Net -18 lines, no bundle/HTML/CSS change. (Claude Design called this #8 from a stale snapshot.) |
| 13 | `5af54ba` | `renderEndorsements()` top-cut `slice(0, 12)` → `slice(0, 7)` to match `SECTIONS.md` § 1 item 21 verbatim ("7 endorsers + skills"). Selection rule unchanged (D.endorsements is sorted newest-first, so 7 most recent). Skill chip strip + footer count still surface all 28 entries. Diff -1/+1 line. |
| 14a | `2943a22` | `renderRadius()` stripped 5 fabricated city labels in the schematic SVG (`Ann Arbor`, `Toledo`, `Lansing`, `Saginaw`, `Cleveland` — none in `D.location`); changed hardcoded `Detroit` home-pin label to `${escapeHtml(L.city)}` (data-faithful — zero visual change for Maria, correct for any future record). Schematic itself stays — bundle README §159 explicitly authorizes the "city + radius text only" fallback when no Mapbox token is provisioned. Diff -8/+1 line. |
| 15 | `6a1a688` | `renderSkills()` stripped fabricated `PRIMARY` chip + `.primary` row className (SECTIONS.md item 12 lists 5 fields: logo / models / years / ratings / endorsements — PRIMARY not among them). Bumped `.skill-logo` 56px → 80px in HTML `<style>` block (line 211 grid-template-columns + line 214 .skill-logo width/height) to match spec verbatim. Note: img `width="80"` attr alone wouldn't have worked because `.skill-logo img { width:100%; height:100%; }` wins — fix had to be CSS-side. Diff -2/+2 renderer, -2/+2 HTML. |
| 16 | `ff52406` | `renderReviews()` `wg` flag read non-existent `r.white_glove` field → always undefined → WG visual path was dead code → anonymous reviews fell through to placeholder branch and rendered as `[A` tile + literal `[Anonymous]` text. Fixed by deriving `wg = r.company === '[Anonymous]'` (the actual signal — 3 entries in the slice). Activates the canonical WG ◇ + amber treatment that #1's neutral-chrome fix already prepared. Diff -1/+1 line. Inverse drift class to #1 (which fixed styling in code that never executed). |
| 17 | `0bb98a5` | `renderCertifications()` mapped all 14 `D.certifications` entries; spec says 7. Added `const top = D.certifications.slice(0, 7);` and changed `D.certifications.map` → `top.map` (mirrors #13 pattern). Bundle's first 7 are a strong list — OSHA + ISA + TÜV + 4 OEM platform certs, importantly includes tuv-functional which carries the renewal_due_soon flag so the spec's "expiry warnings" affordance still has a live example to render. Footer count unchanged (continues to read full count). Diff -1/+2 line. |
| 18a | `926c539` | Experience section header was static `"9+ yrs · 4 companies"` at HTML:544 — wrong by 1 on companies (data has 3) + undercounting years (151 months / 12 = 12.6yr). Made data-driven: HTML now `<span class="meta" id="exp-header-meta"></span>`, renderer computes `${yrs}+ yrs · ${len} ${len===1?'company':'companies'}` from sum(duration_months) + array length. Renders "12+ yrs · 3 companies" for Maria. Diff -1/+1 HTML, +2 renderer. |
| 19 | `9ad94b2` | **Trust-surface defect — highest-impact fix so far.** `renderSecureFiles()` mapped 13 entries (spec: 10) AND never derived expired state from `expires_at` vs today. 9008 TÜV Functional Safety Certificate (renewal-due) had `status: "uploaded"` + `expires_at: "2026-02-14"` (71 days past frozen clock 2026-04-26) — chipped UPLOADED green-ok. Fixed: added `today = new Date('2026-04-26')` + `effectiveStatus(f)` (overlays `expired` when `expires_at < today`) + `priorityOf(f)` (sorts missing→expired→pending→uploaded so issues bubble to top — naive slice(0,10) on bundle order would have dropped the only `missing` row, the most-actionable one). Chip + footer count both flow through derived status. Diff -2/+7 line. |
| 20 | `8b674db` | `renderAffiliation()` surfaced 6 fields; SECTIONS.md item 5 lists 4 (logo, name, role, joined-date). Stripped `company_classification` chip + rate-row (`weekly_committed_hours · rate_through_company · rate_independent`). Two issues stacked: (1) surface scope creep — same drift class as #15's PRIMARY chip; (2) visibility leak — `rate_independent` ($165/hr direct, the "if you went around Acme" rate) on a visitor-visible [ALL] surface, not authorized by spec. Rate disclosure belongs on the Rates card (item 3). Removed the 2 textContent assignments + the 2 `<div>` elements (#aff-class + #aff-rate). CSS rules at HTML:138-141 left as harmless dead code. Diff -2/-2 lines. |
| 21 | `382bfcb` | `renderGroups()` mapped all 4 `D.business_groups` entries; SECTIONS.md item 6 says "3 groups visible + '+ N more'". First deviation to mandate a specific overflow UI element. Sliced to top 3 + appended `<button class="bg-more">+ 1 more</button>` chip when overflow > 0. Footer count continues reading full length (mirrors #13/#17). Added `.bg-more` CSS rule (dashed border, transparent fill, light-theme variant). Click handler intentionally absent (POPOUTS.md has no row for this — graceful degradation). Diff -1/+3 renderer, +3 HTML CSS. |
| 22 | `23cc17c` | `renderEducation()` surfaced 6 fields per row; SECTIONS.md item 17 lists 2 (degrees + schools). Stripped city + graduated_year + gpa + honors. Same drift archetype as #20 — surface scope-creep with privacy/posture leak as urgency lift: graduated_year is age-discrimination proxy, gpa is academic-ranking hiring leak, honors adjacent. Kept degree + concentration (concentration is degree-with-qualifier, same precedent as keeping company_role under business_affiliation in #20) + school. Diff -2/+1 lines renderer. .edu-sub CSS rule at HTML:288 left as harmless dead code. |
| 23 | `f836b44` | `renderAvailability()` surfaced 5 fields; SECTIONS.md item 2 lists 4 (status pill, next-available, capacity, calendar link). Stripped preference-flag chip row (OT OK / Weekends OK / No nights). Same drift archetype as #20/#22 — pre-negotiation posture leak. BONUS catch: asymmetric negation bug — `if (!a.willing_nightshift)` rendered "No nights" when ABSENT, while `willing_overtime` and `willing_weekends` rendered when PRESENT. Default favored disclosure of restrictions on a hiring surface. Removed 5 lines renderer + 1 line HTML markup (#avail-flags element). #avail-flags CSS rule at HTML:114 left as harmless dead code. Diff -5 renderer, -1 HTML. |
| 24 | `ffb4025` | `renderRates()` surfaced 8 fields across 3 surfaces; SECTIONS.md item 3 says "2×2 grid (default/emergency/remote/WG-premium)" — 4 tiles, period. Stripped #rate-band line ("Salary band: $168K-$215K/yr") + #rate-eng line ("4-6 weeks onsite · 8 hr minimum · negotiable") + the cur/fmtBandMoney helpers that fed them. Same drift archetype as #20/#22/#23 — fourth consecutive posture-leak on a left-rail [ALL] card. Most concentrated leak in the audit: salary band anchors negotiation downward + reveals openness to FTE conversion; "negotiable" suffix is a literal one-word "we can go lower" on every quoted rate. **REVERSES MUCH OF #10** (commit `79df735`) — at #10's time the rule-9 archetype hadn't been recognized; lens shifted with #20+. Diff -8 renderer, -2 HTML. #rate-band/#rate-eng CSS rules at HTML:123-124 left as harmless dead code. |
| 25 | `30c1d27` | `renderExperience()` rendered `<p class="exp-desc">${e.description}</p>` paragraph beyond spec; SECTIONS.md item 15 authorizes "3 roles, carousel" — sparse phrasing matching adjacent items 16/17, no description-paragraph license. Per-card text density was ~75-180 words (description + 5-bullet highlights); highlights already cover the same achievement ground in scannable form. Stripped the description line; head + highlights remain. Three-fold rationale: (1) carousel intent (#18b deferred) needs scannable cards — 180-word cards too tall; (2) description redundant with highlights; (3) middle paragraph block breaks the head→bullets visual rhythm. Posture-leak streak ENDED at 4 — #25 is surface-density scope-creep, NOT posture-leak (every field rendered exists in data; city is canonical employment-history context, not benign-school-location like #22). Pattern note: renderExperience first non-rule-9 deviation since #19; renderer's posture-leak surface area on Maria Pro now exhausted. Diff -1 line renderer. .exp-desc CSS at HTML left as harmless dead code (#20/#22/#23/#24 precedent). description field stays in bundle (useful for admin/dossier/search surfaces). |

**Open product calls (not deviations — Tony decisions):**
- **🏗️ META — Build the modal/popout primitive ONCE, then 3+ open product calls close together.** POPOUTS.md describes a full popout system (centered modals, side-panels, fullscreen overlays) that does NOT exist in the codebase. Verified: no `<dialog>`, no `.glass-modal` class, no `openModal`/`showModal` helpers, no modal infrastructure of any kind. Multiple Open Product Calls below all depend on this missing primitive: #15b (cert side-panel popout), #20b (re-auth modal + edit modal for Private Info), and the eventual badge popout (POPOUTS.md line 31 — "Click any earned badge | Centered | Badge art + name + tier + criterion + share"). Recommendation: build a small glass-modal primitive (~80 lines: `<dialog>`-based with backdrop blur, focus trap, ESC-to-close, role="dialog" + aria-labelledby, transitions matching the page's existing 200ms cubic-bezier) and a side-panel variant (~60 lines: slide-in from right with backdrop, same accessibility). Build once, all popout-dependent deviations unblock simultaneously. Lift on the primitive itself: ~140 lines + ~30 CSS. Then each individual popout (cert, badge, private re-auth, private edit) is ~30-50 lines on top of the primitive instead of ~80-100 lines each from scratch.
- **#21b — Wire "+ N more" Business Groups overflow chip → centered popout listing all groups.** `renderGroups()` post-#21 emits a `<button class="bg-more">+ N more</button>` chip when `D.business_groups.length > 3`. Currently click-inert — POPOUTS.md has no spec'd behavior for this surface, so chip ships as graceful-degradation visual only. When META modal primitive lands, natural fit is centered popout listing all groups (logo + name + role + members + available_now + on_contract + joined_at, with View buttons). Same META dependency as #15b/#20b/badge popout. Lift on top of META: ~30 lines.
- **#20b — Re-auth → reveal + edit popout for Private Info.** POPOUTS.md line 30 verbatim: "Click any Private Info masked row (owner) | Centered | Re-auth challenge → reveal raw value + edit form". Currently `renderPrivate()` line 203 emits `<button class="kv-eye" title="Reveal">👁</button>` for masked rows but NO event listener exists anywhere — clicking does nothing. Inert affordance is worse than absent affordance (button announces "Reveal" then teaches the user the surface is broken). Same dead-code drift class as #16's `r.white_glove` (renderer prepared a code path that never fires) — except #16 was visual, this is behavioral on a security surface. Pencil/edit affordance is also missing entirely. Three parts when modal primitive exists: (A) replace 👁 emoji with SVG eye glyph + add SVG pencil per row + bind both to click handler — ~30 lines renderer; (B) re-auth modal stub (password input → "Verify" → reveal placeholder real-value for 8 sec → re-mask) + edit modal stub (form pre-filled with current value, Save/Cancel) — ~50 lines on top of the META primitive; (C) `.kv-action` CSS for both buttons matching glass-button visual language — ~12 lines. Architectural reality (same shape as #14b Mapbox): bundle's masked values ARE the storage truth from renderer's perspective (e.g. "•••• 4471"; the real digits aren't in JSON), so a real reveal requires backend round-trip. For design-system-fidelity, popouts ship as demo-stubs that show the flow, not real cryptographic reveal. Tony decision on whether modal title bar shows a small "[demo]" chip to make the design contract visually unambiguous — Claude Design recommends yes; Claude Code defers to Tony's call. Tony green-light needed because (1) builds on the META modal primitive, (2) "[demo]" chip is a real design call, (3) emoji-vs-SVG glyph swap matches the broader on-brand pattern but is gated on building the rest.
- **#14b — Mapbox token + tile rendering for service-radius map.** Bundle README §159 says service-radius cards "use Mapbox static API" with the schematic-fallback authorized for tokenless mode. No Mapbox token exists in feed-design-system or in Feed-Project's `reference/API-CREDENTIALS.md` (Feed uses Google Maps for address autocomplete, not Mapbox). The renderer's own comment at `render-professional.js:430` self-confesses: `// Schematic radius "map" (concentric circles, no Mapbox)`. POPOUTS.md confirms fullscreen behavior is "Mapbox map with editable radius slider" — currently unbuildable on the schematic. Three implementation paths (Tony picks; Claude Design re-flagged as "deviation #20" 2026-04-26 — folded back here, this is one decision, not two):
  - **Option A (recommended) — Mapbox GL JS, ~25 lines + script tag.** Real interactive map. Add `<script>`+`<link>` for `mapbox-gl@3.x` to HTML head, replace schematic SVG with `new mapboxgl.Map({ container: 'radius-map', style: 'mapbox://styles/mapbox/dark-v11', center: [L.lng, L.lat], zoom: 6, interactive: false })` + GeoJSON radius polygon (hand-rolled great-circle ring, ~15 lines, no `@turf/turf` dep needed) + green Marker at `[L.lng, L.lat]`. Theme-toggle: wire to `data-theme` so dark-v11 / light-v11 swap with the page. Chrome minimization: hide default zoom controls (visitor mode), keep `.mapboxgl-ctrl-attrib` at 9px / 0.6 opacity. Radius polygon: indigo `#6366F1` at 0.18 fill / 0.55 stroke dashed — matches schematic's visual language so the style feels continuous. Apple-pattern.
  - **Option B — Mapbox Static API, ~5 lines, no JS dep.** `<img src="https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-s+34D399(${L.lng},${L.lat})/${L.lng},${L.lat},6,0/560x440@2x?access_token=${TOKEN}" />`. Cheapest. No interactivity, radius circle hard to overlay (would need absolutely-positioned SVG which is partway back to the schematic problem). Not recommended unless lightweight is the priority.
  - **Option C — Defer Mapbox indefinitely.** Spec-deviant but bundle-authorized. Current state. Update the renderer comment to acknowledge it's a product call not a TODO; scale the schematic's radius circle to actually reflect `L.service_radius_miles` (currently hardcoded `r=95` regardless of data). ~12 lines. Stopgap.
  - Token: Mapbox public-scope tokens are designed for client-side embedding (URL-restricted by referrer). Free tier is 50K map loads/month for GL JS — this design-system surface is well within free indefinitely.
  - Same upgrade applies to Business Group geographic map (`business-group.json:138` `$kind: "mapbox_static_or_schematic"`) — one token, multiple surfaces.
  - **Tony decision needed:** (a) Mapbox now (Option A or B + paste public token) or (b) defer (Option C polish to scale-to-data). Until decided, schematic-with-data-driven-labels (post-#14a) stands as the spec-authorized fallback per bundle README §159 — NOT a deviation, do not re-flag.
- **#19b — Three-tier chip states for Secure Files (renewal_due as middle state).** Spec mentions "expiry warnings" implicitly (item 16 certs). Apple's pattern for "valid but expiring soon" is yellow (renewal coming up), distinct from amber/red (fully expired). Recommend a third chip class: `renewal_due` for files where `today < expires_at < today+90d`. Add `.chip.warn-soon` (yellow, lighter weight) to glass.css and extend `effectiveStatus` to distinguish: `expires_at < today` → expired (warn-amber), `today < expires_at < today+90d` → renewal_due (warn-soon-yellow), else uploaded (ok-green). Matches the bundle's tuv-functional cert authoring intent (`renewal_due_soon: true` with future-dated expires) and gives the chip set real semantic load. Lift: ~6 lines + 1 CSS rule. Tony green-light needed because (a) adds new visual class to the system, (b) propagates same pattern to certs (item 16 expiry warnings).
- **#18b — Real carousel primitive for Experience (and reusable for Reviews + Customer/BG profiles).** SECTIONS.md item 15 says "3 roles, carousel"; current `#exp-list` is `display:flex; flex-direction:column;` (vertical stack). Same drift on item 14 Reviews ("5 reviews" rendered as stack). Build one primitive, use it across both. Claude Design's design recommendation (per Apple liquid-glass north star): scroll-snap track with edge-revealed peek (~18-24px adjacent card bleed), no discrete prev/next buttons (rely on swipe + scroll + native scroll-snap), 3-dot indicator with active dot as 16×6px rounded pill, peeking neighbors at opacity 0.55 with CSS gradient mask for premium fade-edge feel. ~25 lines CSS + ~20 lines JS for scroll-position → dot state, no library. Reusable across Experience, Reviews, Hire history (Customer item 10), and any future show-3-of-N section. Tony green-light needed because (a) ~45 lines net-additive code vs the strict-subtractive deviations we've been shipping, (b) real design call (edge-peek vs traditional buttons), (c) primitive shape locks in for multiple surfaces.
- **#15b — Strip inline cert chips from Skills card when popout ships.** `POPOUTS.md:33` says certifications belong in the side-panel popout ("Click any skill tile | Side-panel | Manufacturer logo + full models + certs (verify links) + linked endorsements + sample work"). Currently rendered inline in the skills list (`<div class="skill-certs">` at `render-professional.js:289`). Stripping now would lose cert info from the Profile entirely until the popout exists. Action: when the side-panel popout work begins, strip the inline render in the same commit that adds the popout. Until then, inline cert chips stand as a known spec deviation.
- **#12-followup — Re-introduce locked badges per SECTIONS.md item 11.** Spec verbatim: "Achievement Badges showcase `[ALL]` — earned at full opacity, locked at 30%, sort Diamond→Bronze". Implies locked badges SHOULD be rendered, just dimmed. Our #12 stripped them entirely as the safest call (no `D.badges_locked` field; the existing locked array was 3 fabricated entries with off-spec category names). Two paths: (a) add `badges_locked` to the bundle (Path A — list real next-tier-up per category from `BADGE-THRESHOLDS.md`, e.g. Maria has Platinum Tenure → Diamond Tenure as next), or (b) renderer derives locked from `BADGE-THRESHOLDS.md` spec + earned set. Either path requires reading the threshold spec end-to-end and a Tony product call on which approach. Until decided, badges showcase shows earned only (currently spec-deviant per item 11 wording).

**Earlier drift cleared (do not re-introduce):**
- The @automateamerica.com Claude account had built `Feed Home — Variations.html` + 5 supporting JSX files in its sandbox that did NOT exist in yesterday's Gmail-account project. Per CEO directive, those were freelance content and have been discarded.

**Open questions for Tony:**
- Eyeball `Maria Lopez · Professional.html` in browser, both `data-role="visitor"` and `data-role="owner"` and `data-role="admin"`, both light + dark themes. Confirm: WG review card chrome neutral, amber `◇` glyph visible; bio reads first-person Professor voice; active-application card says Acme Robotics / Ford Rouge palletizer; watchers list shows 8 entries; portfolio shows 7 entries with hostnames as source labels; admin-only section shows the canonical free-text note (no fake signature).
- If all good → mark `[checkpoint]` and proceed to Customer Profile (Rebecca Chen) next per bundle README sequencing.

**Bundle internal inconsistencies (flagged, NOT auto-fixed — Tony to resolve):**
- `COPY-BLOCKS.md § 1` says interview is Tuesday April 28 at 3:00 PM EST. `professional.json:413` says `interview_scheduled: 2026-04-26T15:00:00-04:00`. Active-app card uses COPY-BLOCKS prose (per fix #3) — JSON value contradicts but isn't read by that surface.
- `COPY-BLOCKS.md § 1` admin-note prose is longer (adds "Zero disputes lifetime. Charter member of Body-in-White Specialists group; lead engineer in Detroit Plant business group.") than `professional.json:442` `free_text_admin_note`. Renderer reads the shorter JSON version.
- `professional.json` `rates` block has BOTH `currency: "USD"` and `salary_band_currency: "USD"` — duplicate fields. One should be canonical, the other dropped. Renderer (post #10) prefers `salary_band_currency`, falls back to `currency`.
- `completed_contracts` entries have explicit `"white_glove": true/false` flag; `reviews_received` entries DON'T — they signal WG via `company: "[Anonymous]"` only. Two different conventions for the same concept. Renderer (post #16) reads the implicit signal in reviews; would be cleaner to normalize to the explicit flag everywhere. Tony decision.
- `D.certifications[2]` (tuv-functional) has `expires: "2026-02-14"` AND `renewal_due_soon: true`. Bundle's frozen world-clock is 2026-04-26 (per relative-time helpers in #5/#11/#16). 2026-02-14 is 71 days in the past — the cert is already expired, not "renewal due soon." Three resolutions: (a) future-date `expires` (e.g. 2026-08-14), (b) flip the flag to false + add `expired: true`, (c) renderer derives both states from `expires` vs today rather than reading boolean flags. Tony decision.
- `D.secure_files.files[7]` (9008 TÜV Functional Safety Certificate) has `status: "uploaded"` + `expires_at: "2026-02-14"` (same 71-day-past situation as the cert). Renderer post-#19 derives truth from the date, but bundle authoring intent should be reconciled (future-date the expires OR set status: "expired"). Same class as the `D.certifications[2]` note above — both are the same TÜV credential surfaced in two sections.
- `D.business_affiliation.company_logo` is `"assets/logos/automate-america.png"` but `company_name` is `"Acme Robotics"` and `company_classification` is `"System Integrator · CSIA-certified"`. The logo asset references the platform (Automate America), not the company (Acme Robotics). Renderer reads faithfully — drift is in the bundle. Two reconciliation paths: (a) add an Acme Robotics logo to `assets/logos/` and update `company_logo`, or (b) rewrite the affiliation as Maria → Automate America (update `company_name` + `company_classification`). Tony product call.
- `D.business_groups[2].logo_color = "#F59E0B"` (Body-in-White Specialists) — that is literally the locked WG amber per `WHITE-GLOVE-VISUAL.md`. Body-in-White Specialists is non-WG context; using WG-reserved amber here weakens WG color distinctiveness on every surface that shows both side-by-side (e.g. when a WG ◇ chip and the BWS group dot appear together). Tony product call: swap to `#F97316` orange-red, `#EAB308` yellow, or `#84CC16` lime.

**Next session should:**
1. **CLAUDE CODE (this account):** `git pull origin main`. Re-read this CURRENT STATE block. Wait for Tony's next directive.
2. **CLAUDE DESIGN (either Claude.ai account):** if it's a fresh chat, paste `CLAUDE-DESIGN-PROMPT.md` block (Tony has it). If continuing: `github_get_tree` on `feed-design-system` main, compare latest SHA to your last-known SHA, and `github_import_files` for any path that changed since.
3. If Tony approves the Maria Pro checkpoint, the next surface is Customer Profile · Rebecca Chen / Ford Rouge per bundle `README.md` sequencing. Read `data/customer.json` + `Customer Profile.html` + `Rebecca Chen · Customer.html` and diff against the same spec set.
4. Always update this `CURRENT STATE` block before pushing.

---

## SESSION PROTOCOL

**On session start (every time):**
1. `git pull origin main` (Claude Code) or "Pull latest" via the GitHub connector (Claude.ai)
2. Read this file — the **CURRENT STATE** block tells you exactly where the other account stopped
3. Open the file(s) the previous session named in `Active surface`

**During work:**
- Edit on `main` directly. NO per-account branches — that re-creates the cross-account divergence this whole repo exists to fix.
- Save/commit at logical checkpoints (every ~30 min OR before any structural change OR before token-limit risk).

**Before pushing (every commit):**
1. Update the **CURRENT STATE** block above with what you just did + what's next
2. Commit with the message convention below
3. `git push origin main`

---

## COMMIT MESSAGE CONVENTION

```
<surface>: <change> — <state-tag>

<one paragraph: what shipped, what's pending, where to resume>
```

**State tags** (pick one):
- `[checkpoint]` — clean stopping point, safe to start any new direction next
- `[wip]` — mid-work; the next session must continue this thread before pivoting
- `[needs-review]` — visual change, Tony should eyeball before next session continues

**Example:**
```
feed-home: 3 hero variants — [needs-review]

Built variant-A (centered), variant-B (left-aligned), variant-C (split).
Variant-C uses the new accent-bar token from the parent design system.
Tony to pick winner before next session continues. See Feed Home.html
lines 142-298.
```

---

## CONFLICT HANDLING

If two sessions accidentally overlap (rare — Tony only uses one Claude at a time):
- Pull. If git complains, the LATEST `main` wins for unrelated files.
- For overlapping edits, the SECOND committer rebases their work on top — never force-push over the other account's commits.
- If a real conflict happens, leave both versions in the file and tag the commit `[conflict-needs-tony]`.

---

## FILE INVENTORY (post-zip-import)

Top-level mockups (8 HTML pages — the canonical Feed surfaces):
- `Feed Home.html` · `Professional Profile.html` · `Customer Profile.html` · `Business Profile.html` · `Business Group.html` · `User Dashboard.html`
- Hi-fi character pages: `Maria Lopez · Professional.html` · `Rebecca Chen · Customer.html`

Supporting:
- `tokens/glass-design-tokens.css` (byte-identical to sister repo)
- `styles/glass.css` · `scripts/render-*.js` · `data/*.js`
- `bundle/` — full bundle copy with `bundle/specs/*.md` (POPOUTS, SECTIONS, TIERS, ADMIN-DASHBOARD)
- `bundle/data/*.json` — sample data per surface
- `assets/badges/` (44 PNG badges) · `assets/logos/` · `assets/wallpaper-*`
- `fonts/` — JetBrains Mono + Outfit
- `uploads/profile-advanced.html` — the canonical CEO profile design

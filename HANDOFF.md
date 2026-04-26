# HANDOFF — Two-Account Design Workflow

This repo is shared between two Claude accounts (Claude.ai web + Claude Code on Tony's laptop). Both auth as `tonywallace1978-collab` on GitHub. **The repo is the memory.** When one account hits its token limit, the other account pulls and continues from the last commit.

Sister repo: `automate-america-design-system` (parent design system / brand tokens). This repo applies it to Feed-specific surfaces.

---

## CURRENT STATE — UPDATE THIS BEFORE EVERY PUSH

**Last session:** Claude Code · 2026-04-26 (commit `926c539`)
**Status:** Maria Lopez Professional Profile — 18 deviations cleared (#18 ships as #18a — header data-driven; #18b carousel primitive deferred to Tony green-light, see Open Product Calls). Experience section header was static "9+ yrs · 4 companies" — wrong by 1 on company count, undercounting on years. Now derives "12+ yrs · 3 companies" from `D.experience` sum(duration_months)/12 + length. Spec-compliance pass for Maria Pro continues — Tony to eyeball before moving to next surface.

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

**Open product calls (not deviations — Tony decisions):**
- **#14b — Mapbox token for service-radius map.** Bundle README §159 says service-radius cards "use Mapbox static API" with the schematic-fallback authorized for tokenless mode. No Mapbox token exists in feed-design-system or in Feed-Project's `reference/API-CREDENTIALS.md` (Feed uses Google Maps for address autocomplete, not Mapbox). To upgrade from schematic to real Mapbox tile: provision a public-scope Mapbox token (free tier, restricted by referrer to feed-design-system origin), add it to a config file (`tokens/config.js` or similar), then renderer swap is ~6 lines (replace schematic SVG with `<img src="api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l+34D399(${L.lng},${L.lat})/${L.lng},${L.lat},6/560x360@2x?access_token=${MAPBOX_TOKEN}" />` + a radius-circle overlay). Same upgrade applies to Business Group geographic map (`business-group.json:138` `$kind: "mapbox_static_or_schematic"`).
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

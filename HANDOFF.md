# HANDOFF — Two-Account Design Workflow

This repo is shared between two Claude accounts (Claude.ai web + Claude Code on Tony's laptop). Both auth as `tonywallace1978-collab` on GitHub. **The repo is the memory.** When one account hits its token limit, the other account pulls and continues from the last commit.

Sister repo: `automate-america-design-system` (parent design system / brand tokens). This repo applies it to Feed-specific surfaces.

---

## CURRENT STATE — UPDATE THIS BEFORE EVERY PUSH

**Last session:** Claude Code · 2026-04-26 (commit `782b8d0`)
**Status:** Maria Lopez Professional Profile — 7 deviations vs canonical bundle cleared in this session. Spec-compliance pass for Maria Pro is at a stopping point — Tony to eyeball before moving to next surface.
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

**Earlier drift cleared (do not re-introduce):**
- The @automateamerica.com Claude account had built `Feed Home — Variations.html` + 5 supporting JSX files in its sandbox that did NOT exist in yesterday's Gmail-account project. Per CEO directive, those were freelance content and have been discarded.

**Open questions for Tony:**
- Eyeball `Maria Lopez · Professional.html` in browser, both `data-role="visitor"` and `data-role="owner"` and `data-role="admin"`, both light + dark themes. Confirm: WG review card chrome neutral, amber `◇` glyph visible; bio reads first-person Professor voice; active-application card says Acme Robotics / Ford Rouge palletizer; watchers list shows 8 entries; portfolio shows 7 entries with hostnames as source labels; admin-only section shows the canonical free-text note (no fake signature).
- If all good → mark `[checkpoint]` and proceed to Customer Profile (Rebecca Chen) next per bundle README sequencing.

**Bundle internal inconsistencies (flagged, NOT auto-fixed — Tony to resolve):**
- `COPY-BLOCKS.md § 1` says interview is Tuesday April 28 at 3:00 PM EST. `professional.json:413` says `interview_scheduled: 2026-04-26T15:00:00-04:00`. Active-app card uses COPY-BLOCKS prose (per fix #3) — JSON value contradicts but isn't read by that surface.
- `COPY-BLOCKS.md § 1` admin-note prose is longer (adds "Zero disputes lifetime. Charter member of Body-in-White Specialists group; lead engineer in Detroit Plant business group.") than `professional.json:442` `free_text_admin_note`. Renderer reads the shorter JSON version.

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

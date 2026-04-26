# HANDOFF — Two-Account Design Workflow

This repo is shared between two Claude accounts (Claude.ai web + Claude Code on Tony's laptop). Both auth as `tonywallace1978-collab` on GitHub. **The repo is the memory.** When one account hits its token limit, the other account pulls and continues from the last commit.

Sister repo: `automate-america-design-system` (parent design system / brand tokens). This repo applies it to Feed-specific surfaces.

---

## CURRENT STATE — UPDATE THIS BEFORE EVERY PUSH

**Last session:** Claude Code · 2026-04-26 (commit `05b8930`)
**Status:** Maria Lopez Professional Profile — White Glove visual treatment fixed. Spec-compliance pass continuing.
**Active surface:** `Maria Lopez · Professional.html` (621 lines, already mostly built by yesterday's Gmail-Claude against the canonical bundle).

**Canonical bundle:** `reference/claude-design-bundles/professional-maria-lopez/` (78 files: 1 README + 10 JSONs in `/data/` + 9 spec MDs in `/specs/` + 58 assets). Pushed in commit `a4caa0f`.

**What just shipped (commit `05b8930`):**
- `.rev-card.wg` violet override removed → WG reviews now inherit normal `.rev-card` chrome per `specs/WHITE-GLOVE-VISUAL.md` ("WG reviews ... sit alongside non-WG reviews with normal chrome")
- `.rev-logo.wg` violet→indigo gradient replaced with neutral glass + amber `◇` glyph (`--wg-primary` `#F59E0B` dark / `#D97706` light)
- `.rev-logo.wg` `font-weight:800` reduced to `700` (README validation: Outfit Black not licensed)
- Renderer `scripts/render-professional.js:287` already emits the `◇` glyph; no markup change needed

**Earlier drift cleared (do not re-introduce):**
- Claude.ai (this account's sister) had built `Feed Home — Variations.html` + 5 supporting JSX files in its sandbox that did NOT exist in yesterday's Gmail-Claude project. Per CEO directive, those were freelance content and have been discarded — DO NOT recreate them from descriptions.

**Open questions for Tony:**
- Eyeball the WG review card (Maria's `Body Shop Cell 14` and `[White Glove Contract]` rows in `professional.json:304-312`) in dark + light mode after pulling. If amber-on-neutral reads correctly, mark `[checkpoint]` and we move to the next gap.

**Next session should:**
1. Pull latest (`git pull origin main`).
2. If continuing the spec-compliance pass for Maria Pro: read the remaining 3 unread specs (`SECTIONS.md`, `POPOUTS.md`, `COPY-BLOCKS.md`) and diff against `Maria Lopez · Professional.html` for additional deviations. Make targeted edits like the WG fix above — surgical, not full rerenders.
3. If pivoting to other surfaces per bundle README sequence: Customer Profile (Rebecca Chen) is next, then Business / Acme Robotics, etc.
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

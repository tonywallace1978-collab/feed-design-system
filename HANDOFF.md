# HANDOFF — Two-Account Design Workflow

This repo is shared between two Claude accounts (Claude.ai web + Claude Code on Tony's laptop). Both auth as `tonywallace1978-collab` on GitHub. **The repo is the memory.** When one account hits its token limit, the other account pulls and continues from the last commit.

Sister repo: `automate-america-design-system` (parent design system / brand tokens). This repo applies it to Feed-specific surfaces.

---

## CURRENT STATE — UPDATE THIS BEFORE EVERY PUSH

**Last session:** Claude Code · 2026-04-26 (updating state on behalf of Claude.ai's WIP)
**Status:** Active design work in progress on Feed Home — Variations.
**Active surface:** `Feed Home — Variations.html` (3 directions: A dense/scannable · B editorial/hero-led · C rail+spotlight+radar) + supporting `variations/shared.jsx`, `variations/variation-a.jsx`, `variations/variation-b.jsx`, `variations/variation-c.jsx`, `design-canvas.jsx`.

⚠️ **WIP NOT YET IN REPO.** Claude.ai built these files locally in its sandbox but reports its GitHub connector is read-only and could not push. They MUST be pushed before any session (this account or the other) can review or extend the work. Two paths to push:
  1. **Preferred:** Claude.ai retries via its `mcp__github__create_or_update_file` / `push_files` tools — most Claude.ai connectors can write, the read-only assumption is likely wrong. Try one file first to confirm.
  2. **Fallback:** Claude.ai dumps each file's contents inline in chat → Tony pastes into Claude Code → Claude Code commits + pushes.

Already-applied fix in WIP: Variation A's header `.row-meta` had a wrap collision with the H1; resolved via flex-column + `white-space: nowrap` on the meta line.

**Open questions for Tony:**
- Which of A/B/C is the direction to pursue (or do we need additional variations)?

**Next session should:** if WIP is now in the repo (check for `Feed Home — Variations.html` at root), open it in a browser, review all three directions side-by-side, and wait for Tony's pick. If WIP is STILL not in the repo, push it via path #1 or #2 above before doing anything else.

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

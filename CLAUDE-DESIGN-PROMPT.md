# CLAUDE-DESIGN-PROMPT.md — paste this to start any Claude Design session

> Copy everything between the `---` lines below. Paste it as your first message in a new Claude Design session (either Claude.ai account). It bootstraps the session into the shared project, pulls the latest state from GitHub, and locks in the work rules so you don't have to re-explain anything.

---

You're a Claude Design instance working on Tony Wallace's Automate America design system. There are TWO Claude Design accounts (Gmail + automateamerica.com) that share a project via two public GitHub repos. A third Claude (Claude Code, on Tony's laptop) is the only account that can WRITE to GitHub. Both Claude Design accounts have read-only GitHub connectors (`github_list_repos`, `github_get_tree`, `github_read_file`, `github_import_files` — no push tools).

**STARTUP — do this before ANY other action, even before clarifying questions:**

1. `github_get_tree` on `tonywallace1978-collab/feed-design-system` at branch `main`. Note the latest commit SHA.
2. `github_read_file` on `feed-design-system/HANDOFF.md`. Read the **CURRENT STATE** block at the top — that is "where we left off." Follow its instructions (typically: re-import the active-surface files using `github_import_files`).
3. `github_read_file` on `automate-america-design-system/HANDOFF.md` for parent-design-system context.
4. Read the canonical bundle at `feed-design-system/reference/claude-design-bundles/professional-maria-lopez/`. Files you MUST read:
   - `data/professional.json` (55KB — full Maria Lopez record; contains `header`, `quick_stats`, `rates`, `availability`, `business_groups`, `secure_files`, `private_info`, `badges_earned`, `skills_certified`, `certifications`, `education`, `languages`, `equipment_owned`, `experience`, `completed_contracts`, `reviews_received`, `endorsements`, `portfolio_links`, `active_application`, `watchers`, `admin_notes`, `two_factor_enabled`)
   - `specs/SECTIONS.md` — section order + visibility per role per page
   - `specs/COPY-BLOCKS.md` — verbatim prose for every text-heavy section
   - `specs/POPOUTS.md` — modal/popout interactions
   - `specs/WHITE-GLOVE-VISUAL.md` — WG visual treatment (amber #F59E0B + ◇)
   - `specs/ROLE-OVERRIDES.md` — visitor / owner / admin diffs
   - `specs/EMPTY-STATES.md` — missing-data behavior
   - `specs/BADGE-THRESHOLDS.md` — badge categories + criteria
   - `specs/TIERS.md` — White Glove vs Standard chrome
   - `README.md` — bundle index + page sequencing
5. Read the active rendering files at `feed-design-system` root:
   - `Maria Lopez · Professional.html` (the rendered Pro Profile target)
   - `scripts/render-professional.js` (the renderer driving the above HTML from `D = window.PROFESSIONAL_DATA`)
   - `data/professional-data.js` (runtime mirror of bundle's `professional.json`)
   - `tokens/glass-design-tokens.css` + `styles/glass.css` (style system)

You are now caught up. Wait for Tony's instruction.

**RULES — non-negotiable:**

1. **NEVER invent files, data, or prose.** Everything comes from the bundle. If you can't find something, GREP first. The bundle has 78 files; confirm a field is absent with `github_get_tree` + `github_read_file` BEFORE claiming it's missing. (Lesson from the past: deviation #4 was wrongly flagged as "watchers field absent" when it actually existed at `professional.json:416`.)
2. **NEVER ad-lib bio / tagline / admin-note text.** Every text-heavy block has a verbatim version in `specs/COPY-BLOCKS.md`. Use it exactly. The CEO directive locked canonical Professor voice; ad-libbing is the exact failure that caused this whole repo to exist.
3. **White Glove = amber `#F59E0B` + `◇` (U+25C7) glyph.** NEVER violet/indigo/purple. NEVER gold-edge treatment on review cards — gold goes only on the WG entity (the contract page) itself. See `WHITE-GLOVE-VISUAL.md`.
4. **No `font-weight: 800`.** Outfit Black is not licensed. Max weight is 700.
5. **Surgical edits only.** Don't rewrite whole files when one section deviates. The rendering files were already mostly built by yesterday's Gmail-account Claude — find SPECIFIC deviations against the spec and patch them.
6. **No multi-choice questions to Tony.** Pick the most spec-compliant option and proceed. Multi-choice is the friction that wastes his time.
7. **Re-import after every Claude Code commit.** Your snapshot of a file is FROZEN at the moment you imported it. When Claude Code pushes a change, you must `github_import_files` that path again before flagging more deviations there. (Lesson: deviation #5 was wrongly flagged as a new issue when it was already fixed in commit `3199f58` — stale snapshot.)

**OUTPUT FLOW — you can't push, so route changes through Tony to Claude Code:**

For each deviation you find, output exactly ONE message in this format:

```
Deviation #N: <short title>
File: <path>:<line range>
Spec violated: <spec file> § <section>
What's there now: <quote or paraphrase the existing render>
What the spec says: <verbatim quote from the spec>
Fix: <exact surgical change — describe the patch, NOT a re-render plan>
```

Stop after each. Tony forwards to Claude Code. Claude Code applies the fix and commits. You re-import the changed file before flagging the next deviation.

For changes that need a whole new file (rare — if it happens, double-check you're not freelancing): write the file to your project sandbox, tell Tony "download `<filename>` from this project." Tony drops it in `C:\Users\Admin\Downloads\`, tells Claude Code, and Claude Code commits verbatim.

**KNOWN BUNDLE INCONSISTENCIES (don't try to "fix" these without asking Tony):**

- `COPY-BLOCKS.md § 1` says Maria's interview is "Tuesday April 28 at 3:00 PM EST." `professional.json:413` says `"interview_scheduled": "2026-04-26T15:00:00-04:00"`. These contradict. **For prose, COPY-BLOCKS wins** (it's labeled "exact prose"). For structured data fields (rates, applicant counts), JSON wins. Active-application card uses COPY-BLOCKS prose verbatim per fix #3.
- `COPY-BLOCKS.md § 1` admin-note prose is longer than `professional.json:442` `free_text_admin_note`. The renderer reads the JSON version. If you want the longer COPY-BLOCKS version rendered, that's a Tony decision.

**That's the whole protocol. Now do the startup steps and wait.**

---

## How to use this file

- Tony pastes the block above into a fresh Claude Design session (either account). The session bootstraps itself.
- This file lives in git so future updates to the protocol are version-controlled — Tony pulls the latest, copies the new block.
- If the protocol changes (new spec, new repo, new rule), edit this file in Claude Code, commit, push. Tony's next paste uses the new version automatically.

# FEED-SPEC — Automate America Universal Feed

**Status:** v0 draft 2026-04-27 by Claude Code (Account A, repo commit-mirror) per Tony directive after killing the Feed Home v1 9-card container grid as "100% garbage." Claude Design is to read this spec end-to-end, build Pass A against it, and **extend this spec as you go** — push diffs back via Tony zip-paste → Claude Code commits verbatim. The spec is the contract. The repo is the memory.

---

## 1. WHAT THE FEED IS — TONY VERBATIM

> "The feed is a social media style feed that will literally have thousands of pages, every fucking professional profile, every school, work request, every affiliate, every open contract, every user post, every admin post, every product ever listed will be its own page in the feed, every service ever listed by a company will be in the feed forever. This is not the feed at all. The feed will be never ending, driven by extremely complicated algorithm that should already be 100% complete. The feed depends on the users profile, their actions and the feed is very different for every users."

The Feed is the **platform**, not a dashboard. Every entity in the system surfaces as a card. Card click → fullscreen popout / link to entity's full page. Endless infinite scroll. Per-user algorithmic ranking. Promotional cards (Post Work Now, Boost Your Profile, etc.) repeat throughout — that's revenue, not a bug.

**The Feed is NOT:**
- A 9-card container grid of "things to do today"
- A dashboard / digest / briefing
- A static set of curated content
- A finite list

---

## 2. ALGORITHMIC PERSONALIZATION

The ranking algorithm is **server-side and "100% complete" per Tony**. Frontend renders the algorithm's ranked output. Design mockup renders a deterministic plausible mock; algorithm-binding (real API integration) is a separate workstream not part of design.

Algorithm inputs (informational — for design-side card-prioritization logic, not for re-implementing the algo):
- Viewing user's profile (skills, manufacturers, location, role, tier eligibility, certifications)
- Recent user actions (clicks, applications, watches, connects, dismissals, saves, shares)
- Network signals (connection activity, watched-pro updates, group membership)
- Geographic relevance (radius from user's location, regional contracts)
- Promotional slotting (paid Boost, Sponsored, Featured Business)
- Diversity injection (don't show 8 contracts in a row; vary card types)
- Cold-start fallback (new users get curated mix anchored by location + selected role)

**Two users with the same skill set but different recent actions see materially different feeds.** Design must reflect this in Pass B's 5-role mockup.

---

## 3. CARD TYPE INVENTORY — v0 DRAFT (Tony confirms / extends)

Tony floor: "at least 30 different types." Below = 40 buckets. Claude Design extends as needed.

### 3.1 Entity-Content Cards (one card per real DB entity)

| # | Card | Source | Visibility | Repeat-eligible? |
|---|---|---|---|---|
| 1 | **Professional Profile** | `users` (role=pro) | All roles | No (unique) |
| 2 | **Customer Profile** | `users` (role=customer) | All roles | No (unique) |
| 3 | **Company Profile** | `companies` | All roles | No (unique) |
| 4 | **Business Group** | `business_groups` | All roles | No (unique) |
| 5 | **School / Training Program** | `affiliates` (subtype=school) | All roles | No (unique) |
| 6 | **Open Contract — Hourly Standard** | `contracts` (tier=standard) | All roles | No (unique per contract) |
| 7 | **Open Contract — Hourly White Glove** | `contracts` (tier=wg) | All roles | No (unique) |
| 8 | **Open Contract — Direct W-2** | `direct_jobs` | All roles | No (unique) |
| 9 | **Affiliate Listing** (non-school) | `affiliates` | All roles | No (unique) |
| 10 | **Product Listing** | `products` | All roles | No (unique) |
| 11 | **Service Listing** | `services` | All roles | No (unique) |
| 12 | **User Post** (Pro/Customer-authored) | `posts` (author=user) | Visibility per author scope | No (unique) |
| 13 | **Admin Post** | `posts` (author=admin) | All roles | No (unique) |

### 3.2 Activity Cards (derived from real entity events)

| # | Card | Trigger | Visibility | Repeat-eligible? |
|---|---|---|---|---|
| 14 | **Hire Announcement** | `hires.created_at` | All roles (if both parties opt-in) | No |
| 15 | **Endorsement Activity** | `endorsements.created_at` | Connection+ of either party | No |
| 16 | **Review Posted** | `reviews.created_at` | Per anonymity rules | No |
| 17 | **Badge Earned** | `badges_earned.created_at` | Connection+ of recipient | No |
| 18 | **Connection Activity** | Aggregated connection action | Owner only (your network) | No |
| 19 | **Watch-List Update** | Watched-pro action | Owner only | No |
| 20 | **Group Activity** | Group event | Group members | No |
| 21 | **Application Status Update** | `applications.status_changed_at` | Owner only | No |
| 22 | **Milestone** | Anniversary / N contracts / tier upgrade | Owner + Connection+ | No |

### 3.3 Promotional Cards (REPEAT throughout the feed — Tony explicitly called these out)

| # | Card | Audience | Repeat cadence (default) | Visibility |
|---|---|---|---|---|
| 23 | **Post Work Now** | Customers + Companies | every ~7 cards | Logged-in Customer/Company/Admin |
| 24 | **Boost Your Profile** | Pros (paid) | every ~7 cards | Logged-in Pro/Owner |
| 25 | **Connect Suggestions** | All logged-in | every ~12 cards | Logged-in |
| 26 | **Refer-a-Pro / Refer-a-Customer** | All logged-in | every ~15 cards | Logged-in |
| 27 | **Featured Business Spotlight** | Paid placement | every ~20 cards | All roles |
| 28 | **Sponsored Contract** | Paid placement | every ~20 cards | All roles |
| 29 | **Sponsored Service / Product** | Paid placement | every ~20 cards | All roles |
| 30 | **Welcome / Onboarding Tip** | New users (cold-start) | first 10 cards only, dismissible | Logged-in (new) |

### 3.4 Discovery / Utility Cards

| # | Card | Trigger | Visibility | Repeat-eligible? |
|---|---|---|---|---|
| 31 | **Skill Suggestion** | Algorithm | Owner | Yes (rotating skills) |
| 32 | **Certification Renewal Reminder** | `certifications.expires_at < +90d` | Owner only | No (per cert) |
| 33 | **Compliance / Legal Update** | Admin-pushed | All roles | No |
| 34 | **Industry News / Manufacturer Update** | Admin / OEM feed | All roles | No |
| 35 | **Event / Conference** | Calendar | Geo-relevant | No |
| 36 | **Geographic Suggestion** ("Pros near you" / "Contracts near you") | Algorithm | All roles | Yes |
| 37 | **Trending Topic / Hashtag** | Algorithm | All roles | Yes |
| 38 | **Industry Survey / Poll** | Admin-pushed | All roles | No |
| 39 | **Payment / Financial** (invoice, payout, receivable) | `transactions` | Owner only | No |
| 40 | **Job Match Alert** | Algorithm match (user skills × open contract) | Owner + Pro role | Yes (per match) |

**Total: 40 card types in v0 draft.** Tony confirms / strikes / extends.

---

## 4. REPEAT / REDUNDANCY RULES

Tony directive: *"each one will appear several times through the feed, many things are redundant, like the post work now, boost your profile now!"*

**Default cadences (Pass B wires these — Tony confirms / overrides):**

| Slot type | Cadence | Notes |
|---|---|---|
| Promotional CTA (Post Work / Boost / etc.) | every 7 cards | Rotating card per slot — never bit-identical within 30-card window |
| Admin post | every 12 cards | If admin queue empty, slot dropped (no filler) |
| Connect Suggestion / Refer-a-Pro | every 15 cards | Alternating |
| Sponsored entity (Featured Business / Sponsored Contract / Sponsored Service) | every 20 cards | Paid-placement only |
| Welcome / Onboarding Tip | first 10 cards only | New users; dismissible; suppressed lifetime once dismissed |

**Visual differentiation between repeats:** rotating copy variants per slot type to avoid déjà-vu fatigue. Bundle ships at minimum 5 copy variants per repeating slot (Tony approves canonical copy in `bundle/specs/COPY-BLOCKS-FEED.md` — to be created).

**Dismissal behavior:** dismissed cards suppressed for that user for **7 days** (default; Tony overrides per card type). Welcome/Onboarding cards: lifetime dismissal.

**No bit-identical repeats within a 30-card window.** Hard rule.

---

## 5. FIVE-ROLE VISIBILITY MATRIX

Same 5-role pattern as Maria/Rebecca profile pages — toggle bar at top of mockup.

| Role | Algorithm? | Card visibility | Promotional skew |
|---|---|---|---|
| **Logged-out visitor (public)** | No (curated public-feed slice) | Open contracts, public profiles, admin posts, training programs. **NO** application-status / watch-list / connection / payment / private-info cards. | "Sign up to see more" promotional cards skewed heavily |
| **Logged-in visitor (no relation to subject entities)** | Yes (full personalization) | Standard feed; all entity cards; activity cards from network only. | Boost (if Pro role) / Post Work (if Customer role) / Connect / Refer |
| **Connection of subject entity** | Yes | Connection-gated content unlocked (private posts, network-only milestones, watch-list updates of mutual connections). | Same as logged-in visitor + Connection-Activity cards prioritized |
| **Owner (the user themselves)** | Yes (full firehose) | Full firehose + owner-only utility cards (renewal reminders, payment, application-status, milestones). | Boost Your Profile (Pro) / Post Work (Customer/Company) / Connect / Refer |
| **Admin (Tony / staff)** | Yes (admin firehose) | Full firehose + admin-only cards (moderation queue, abuse reports, KPI snapshots, admin posting tool, user-management quick actions). | Suppressed (admins don't see user-facing promo) |

---

## 6. DESIGN MOCKUP SCOPE — PASS A then PASS B

### Pass A — Visual Catalog (FIRST, sign-off gate)

**Goal:** Tony eyeballs every card type once, signs off on visuals before personalization wiring.

- Render ONE of every card type listed in § 3 (40 cards)
- Signed-in as **Maria Lopez (Pro)** — single viewer, single role, deterministic order
- Plausible feed order (entity / activity / promo / utility mixed naturally)
- Approximate length: **~50 cards** (40 unique + 10 promotional repeats to demonstrate cadence)
- Infinite-scroll lazy-load wired (IntersectionObserver, batches of 10 at 80% scroll depth) so the scroll behavior is real
- Card-tap → fullscreen popout reusing Maria Pro v2 popout pattern
- Per-card affordances visible: **Save / Share / Dismiss / View Full** (clicks no-op on first ship; graceful degradation per `Pass B`)

**Sign-off gate:** Tony reviews the visual catalog. Pass B does NOT start until Pass A is approved.

### Pass B — Algo-Driven 5-Role Feed (after Pass A sign-off)

- Add 5-role toggle bar (mirror Maria/Rebecca profile toggle)
- For each role, render a representative ~50-card feed reflecting that role's algorithmic slice (per § 5 visibility matrix)
- Wire repeat cadences per § 4
- Wire dismiss → 7-day suppression (in-memory for mockup)
- Wire save / share affordances (open share-sheet stub / save to local-storage stub)
- Cold-start fallback for "new logged-in visitor" (no actions yet)

---

## 7. EXISTING FIXTURE DATA + GAPS

### What we have
- `data/professional-data.js` — Maria Lopez (Pro) — full
- `data/customer.json` — Rebecca Chen (Customer) — full
- `data/company.json` — Acme Robotics (Company) — full
- `data/business-group.json` — Great Lakes group — full
- `data/direct-job.json` + `data/hourly-wg.json` + `data/hourly-std.json` — 3-tier contract examples

### Gaps (needed for the mockup — flag, do NOT fabricate)

| # | Card type needing fixture | What's needed |
|---|---|---|
| 5 | School / Training Program | 3-5 schools (community college / OEM training / cert-prep / online platform) |
| 9 | Affiliate (non-school) | 3-5 affiliates (manufacturer rep / distributor / service partner) |
| 10 | Product Listing | 5-10 products (PLCs / robots / sensors / safety devices / spare parts) |
| 11 | Service Listing | 5-10 services (commissioning / preventive maint / programming / training / safety audit) |
| 12 | User Post | 5-10 plausible Pro/Customer posts (mix: announcement / question / project showcase / hire-celebration / industry take) |
| 13 | Admin Post | 3-5 Tony-voice posts (platform announcement / community update / policy notice / feature launch / industry commentary) |
| 14-22 | Activity cards | Can derive from existing JSON; Claude Design proposes derivation rules in extended FEED-SPEC entries |
| 30 | Welcome / Onboarding | Copy block per onboarding step (welcome / fill-profile / first-connect / first-watch / first-application) |
| 33-34 | Compliance + Industry News | 2-3 each (real-sounding but fixture only) |
| 38 | Industry Survey/Poll | 2-3 polls (active + closed) |

**When fixture data is missing:** render `[FIXTURE NEEDED — <description>]` placeholder + add a row to bottom-of-file checklist Tony fills. **Do NOT fabricate.** Same rule as Maria audit deviations #2/#3/#4/#6/#7 — strict-subtractive against renderer fabrication.

---

## 8. VISUAL VOCABULARY (binding)

- All cards inherit `tokens/glass-design-tokens.css` + `styles/glass.css`
- Apply V1 spectral edge + V2 specular crown to **every** feed card (no exceptions)
- Card-tap → **fullscreen popout** per Tony 2026-04-27 directive: *"EVERY SECTION pops out to a full screen with larger texts when clicked. Every. Section."* — this is universal
- Per-card affordances (always visible bottom-right OR hover-revealed on desktop):
  - **Save** — bookmark to "Saved Items" list (owner-scoped)
  - **Share** — native share sheet (Web Share API where supported)
  - **Dismiss** — suppress for 7 days
  - **View Full** — link to entity's full page
- Density classes:
  - **Hero** — admin posts, top-of-feed sponsored, milestones (full-bleed, larger image, bigger type)
  - **Standard** — entity cards, activity cards (default)
  - **Compact** — promotional repeats, utility cards (denser, less vertical space — to keep promo from dominating)
- Infinite scroll: IntersectionObserver triggers next batch at 80% scroll depth, batches of 10 cards. No "Load more" button. No pagination.

---

## 9. NON-GOALS (do NOT build into the design mockup)

- Real backend wiring — algorithm is server-side, mockup renders deterministic mock data
- Real auth — toggle bar substitutes for login state
- Real comments / likes / replies — render the affordances, click is no-op (graceful degradation per Maria popout precedent)
- Real share — open native share-sheet stub or copy-to-clipboard, no real publishing
- Real save persistence beyond local-storage — server save is wiring, not design
- Real algorithm — algorithm is shipped backend; do NOT design or re-implement ranking logic

---

## 10. OPEN QUESTIONS FOR TONY (before Pass B starts)

1. Confirm the 40 card types in § 3. Strike any that don't exist in the real platform; add anything missing. Tony floor was "at least 30."
2. Confirm repeat cadences in § 4. Override per slot if needed.
3. Approve fixture-data gap list in § 7 — Tony provides canonical fixtures, OR designates Claude Design's draft fixture authoring as sanctioned scope (single-shot for the mockup, not real platform data).
4. Confirm Pass A → Pass B sequencing. Single-shot is faster but riskier; Pass A first is safer.
5. Card-tap → fullscreen popout — is this for **every** card type, or some only? Tony 2026-04-27 says "every section" on profiles; confirm this scales to every feed card.
6. Welcome/Onboarding cards (#30) — is this the right cold-start treatment, or does the platform already have a separate onboarding flow that bypasses the feed?
7. Connect Suggestions / Refer-a-Pro (#25/#26) — what's the canonical copy + visual? Or is this "Claude Design proposes, Tony approves" scope?

---

## 11. DOCUMENT-AS-YOU-GO — CLAUDE DESIGN EXTENDS THIS SPEC

Per Tony directive 2026-04-27: *"explain what the fuck we are building here and make sure that she documents it."*

This v0 spec is the floor. Claude Design extends it as Pass A is built:
- New card type discovered? Add a row to § 3.
- Cadence needs tightening? Update § 4 with rationale.
- Fixture-data gap filled by Tony? Strike from § 7.
- Visual rule emerged from Pass A? Add to § 8.
- Pass A surfaced a question? Add to § 10.

When you push v1 of the Feed Home file via Tony zip-paste, push the FEED-SPEC.md diff with it. Claude Code commits both verbatim. **The spec is the contract. The repo is the memory.**

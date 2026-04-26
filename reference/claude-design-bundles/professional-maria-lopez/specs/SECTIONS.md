# Sections — All 9 Page Types

This bundle contains 9 page types. Each gets its own canonical section list with visibility rules per viewer role.

The Professional Profile is the **deepest example** because the field set is widest. The other 8 follow the same pattern (header / body / lists / modals / role-toggled visibility) — see each section below.

## Visibility model (applies to every page)

| Tag | Role | Notes |
|---|---|---|
| `[ALL]` | Visitor / Owner / Admin | Public |
| `[V]` | Visitor only | Hidden from owner + admin |
| `[O]` | Owner only | Hidden from visitor; admin sees |
| `[A]` | Admin only | Hidden from everyone except admin |
| `[T3]` | Tier-3 collapse | Collapsed by default for visitor; expanded for owner/admin |

---

## 1. Professional Profile (`data/professional.json`)

**Subject:** Maria Lopez · Senior Controls Engineer · Detroit, MI
**Source HTML:** `reference/CEO-Profile-Design/profile-advanced.html`

### Layout — desktop 1440
2-column grid: 380px left rail (identity card stack) + flex right column (substance).

### Left rail (top→bottom)
1. Hero card `[ALL]` — photo (144), name, ID, location+flag, occupations, social links, quick stats, profile-strength bar, CTA stack
2. Availability card `[ALL]` — status pill, next-available, capacity, calendar link
3. Rates card `[ALL]` — 2×2 grid (default/emergency/remote/WG-premium)
4. Connections card `[ALL]` — total/this-month/this-quarter
5. Business affiliation card `[ALL]` — employer logo, name, role, joined-date
6. Business Groups card `[ALL]` `[T3]` — 3 groups visible + "+ N more"
7. Secure Files card `[O]` — 10 file rows, status badges, download/delete
8. Private Info card `[O]` — phone/address/DOB/SSN/tax/bank/emergency contact
9. Active Application card `[O]` — currently-applied contract status
10. Watchers card `[O]` — companies/customers watching Maria

### Right column (top→bottom)
11. Achievement Badges showcase `[ALL]` — earned at full opacity, locked at 30%, sort Diamond→Bronze
12. Skills card `[ALL]` — manufacturer logos (80px), models, years, ratings, endorsements
13. About / bio `[ALL]` — tagline + 3-5 sentence bio
14. Reviews carousel `[ALL]` — 5 reviews, white-glove rendered anonymous
15. Experience timeline `[ALL]` — 3 roles, carousel
16. Certifications card `[ALL]` `[T3]` — 7 certs with verify-link, expiry warnings
17. Education `[ALL]` `[T3]` — degrees + schools
18. Languages `[ALL]` `[T3]` — name + proficiency tags
19. Equipment Owned `[ALL]` `[T3]` — grouped by category
20. Service Radius `[ALL]` `[T3]` — Mapbox tile, miles, travel notes
21. Endorsements `[ALL]` `[T3]` — 7 endorsers + skills
22. Portfolio links `[ALL]` `[T3]` — videos / code / talks / docs
23. Admin notes `[A]` — trust score, KYC, disputes, free-text note

### Mobile 375
Stacks left rail above right column. Carousels become horizontal-swipe. Tier-3 sections collapse with chevron.

⚠️ **CEO directive 2026-04-25:** badges apply to Business / Business Group / Customer profiles too — not Pro-only. See `assets/badges/AVAILABLE-BADGE-CATEGORIES.md`.

---

## 2. Customer Profile (`data/customer.json`)

**Subject:** Rebecca Chen · Plant Engineering Manager · Ford Rouge Complex
**Source HTML:** `reference/CEO-Profile-Design/customer-personal-profile-max.html`

### Sections (left rail · right column)
**Left rail:**
1. Hero card `[ALL]` — Rebecca's photo, name, title, company tag, location
2. Company card `[ALL]` — Ford logo (144), Tier 1 OEM badge, address, employees, NAICS
3. Quick stats `[ALL]` — active contracts (47), lifetime hires (218), avg rate paid, lifetime spend
4. Spending breakdown `[O]` — YTD/FY by year + by trade pie
5. Secure Files `[O]` — vendor manual, MSA, COI requirements, ACH, W-9
6. Private Info `[O]` — direct phone, plant address, AP contact, PO terms, tax ID
7. Key Contacts card `[ALL]` — Rebecca + 3 colleagues (PM / AP / Director)

**Right column:**
8. Achievement Badges `[ALL]` — `Cust-*` set (Diamond Spender, Platinum Hirer, Verified Buyer, etc.)
9. Open contracts table `[ALL]` — 5 live contracts with applicants/shortlisted counts
10. Hire history `[ALL]` `[T3]` — 5 most-recent hires + "+ N more"
11. Watched professionals `[O]` `[T3]` — 4 pros Rebecca's watching
12. Preferred Business Groups `[O]` `[T3]` — 2 BGs Rebecca prefers
13. Reviews left for contractors `[ALL]` `[T3]` — 3 sample
14. Company brief / facility photos `[ALL]` — about + 4 photos
15. Admin notes `[A]` — trust score, compliance status, free-text note

---

## 3. Business / Company Profile (`data/company.json`)

**Subject:** Acme Robotics · System Integrator · Detroit, MI
**Source HTML:** `reference/CEO-Profile-Design/main-company-profile-max.html`

### Sections (left rail · right column)
**Left rail:**
1. Hero card `[ALL]` — logo (144), name, tagline, classification, founded, size, head office
2. Addresses card `[ALL]` — head office + 2 branches (Detroit / Spartanburg / Louisville)
3. Quick stats `[ALL]` — active contracts (12), completed (218), lifetime billings ($18.2M), avg ratings, team size, open positions
4. Rates card `[ALL]` — hourly default/emergency, fixed-bid minimum, WG premium
5. Secure Files `[O]` — COI, W-9, OSHA roster, MSA, employee handbook
6. Key Contacts card `[ALL]` — owner + 3 regional managers

**Right column:**
7. Achievement Badges `[ALL]` — `Company-*` + `Sp-*` set (Top Employer Diamond, Hired Platinum, Spend Diamond, Sp-Contracts Diamond, etc.)
8. Team members card `[ALL]` — 8 team members with avail status, ratings, primary-contact flag
9. Services offered carousel `[ALL]` — Robot Programming / PLC / Vision / Emergency / White Glove
10. Skills certified `[ALL]` `[T3]` — manufacturer matrix (5 vendors with team sizes)
11. Work history — by our team `[ALL]` — 6 contracts (5 completed + 1 ongoing, 1 white-glove anonymized)
12. Work history — for our team `[ALL]` `[T3]` — 2 vendors hired
13. Open positions `[ALL]` — 4 open contracts with applicant counts
14. Customer reviews `[ALL]` — 4 reviews from BMW / Stellantis / GM / ADM
15. Certifications `[ALL]` `[T3]` — CSIA, Rockwell RSI, FANUC ASI, ISO 9001
16. Media (images + video) `[ALL]` `[T3]` — 4 facility shots + walkthrough video
17. Admin notes `[A]` — trust score, CSIA verified, tier override, free-text note

---

## 4. Business Group Profile

**Subject:** Great Lakes Automation Network OR Wallace Automation — Detroit Plant
**Source HTML:** `reference/CEO-Profile-Design/business-group-profile-max.html`
**Data:** for v1 we render Business Group cards inline within `professional.json` (Maria's `business_groups[]`) and `company.json` (Acme's `team_members[]`). A standalone BG profile is structurally similar to the company profile.

### Sections (lift directly from company profile, with these deltas)
- Hero shows BG logo at 144 + role of viewer (Member / Charter Member / Group Admin)
- Member list section replaces "Team members" — shows 138 members with availability filter (Available Now / On Contract / Unavailable)
- "Apply All Available Professionals" group action button (owner-only)
- Group admin section at top (1 row showing the admin's avatar + role + Connect/Watch CTAs)
- `Bg-*` badges (Active-Group, Established, Contracts, Hours, Large-Team) replace `Company-*` set
- No Services Offered section (BGs don't sell services directly)
- Group certifications + group geographic coverage map (regional spread)

---

## 5. Direct Job — W-2 posting (`data/direct-job.json`)

**Subject:** Senior Controls Engineer · Final Assembly · Ford Rouge
**Source HTML:** `reference/CEO-Profile-Design/direct-job-profile-max.html`

### Layout — desktop 1440
Wide single-column with right-aligned company sidebar (320px).

### Sections
1. Header `[ALL]` — title, company logo + name, location, shift, salary band as headline
2. CTA row `[ALL]` — Apply / Save / Share / View company / Ask question
3. Compensation `[ALL]` — salary band, bonus target, sign-on, relocation
4. Benefits grid `[ALL]` — 11 benefits in 5 categories (Health / Retirement / Time off / Education / Other)
5. Responsibilities `[ALL]` — bulleted list of 7
6. Requirements — must-have `[ALL]` — bulleted list of 7
7. Requirements — nice-to-have `[ALL]` `[T3]` — bulleted list of 6
8. Interview process `[ALL]` — 6-step timeline
9. Sample interview questions `[ALL]` `[T3]` — 5 questions
10. Eligibility `[ALL]` — auth, background check, drug screen, export-controlled
11. What to bring `[ALL]` `[T3]` — 3 prep items
12. Team summary `[ALL]` — manager + 3 peer avatars
13. Company brief sidebar `[ALL]` — Ford logo, name, city, industry, size, tagline, rating
14. Stats `[ALL]` — applicants, shortlisted, views, saves, match score
15. Applicant panel `[O]` — table of 4 applicants with status + interview-at
16. Similar jobs `[ALL]` — 3 similar postings
17. Questions log `[ALL]` `[T3]` — anonymized Q&A from past applicants

---

## 6. Hourly Contract — White Glove (`data/hourly-wg.json`)

**Subject:** Body Shop FANUC Retrofit Cell 14 (anonymous Tier-1 OEM, revealed = Ford Rouge)
**Source HTML:** `reference/CEO-Profile-Design/hourly-contract-profile-max.html`

### Sections (deltas from Direct Job)
1. Header `[ALL]` — title + ⚡ boost icon + ◇ diamond icon (white-glove tell), gold-edge glass
2. Company name = `[White Glove · Tier-1 OEM]` until shortlist+NDA
3. CTA primary = "Apply (signs NDA)" with diamond icon
4. Compensation `[ALL]` — hourly rate as headline, 4-hour minimum invoice, expense reimbursement, billing cycle
5. Scope summary `[ALL]` — 5 bullets
6. Deliverables `[ALL]` — 6 bullets
7. Requirements (must / nice) `[ALL]`
8. Interview process `[ALL]` — 5-step (NDA at step 1)
9. **White Glove features panel `[ALL]`** — 6 differentiators (anonymity, NDA, concierge, boost, anonymous reviews, escrow guarantee)
10. Company brief — anonymous (pre-NDA) `[V]` — industry / size / city-metro / rating, no logo, no name
11. Company brief — revealed (post-NDA or shortlist) `[shortlisted_visitor]` — full Ford info
12. Stats `[ALL]` — applicants, NDA-signed count, shortlisted, views, saves, match score
13. Compliance required `[ALL]` — 6 items (NDA, OSHA, COI, background, drug, orientation)
14. Applicant panel `[O]` — 3 applicants with NDA-signed-at + rate-proposed
15. Similar contracts `[ALL]` — 3 similar (Standard + WG mix)

⚠️ Render with **gold edge highlight** + amber glow + diamond icon — see `TIERS.md` § White Glove tier.

---

## 7. Hourly Contract — Standard (`data/hourly-std.json`)

**Subject:** PLC programmer · Robotic palletizer · Acme Robotics
**Source HTML:** `reference/CEO-Profile-Design/hourly-contract-profile-max.html`

### Sections (deltas from White Glove)
1. Header `[ALL]` — title + Acme logo + "Hourly · 4 wk" chip — **NO** boost icon, **NO** diamond
2. Company name visible from the start
3. CTA primary = "Apply" (no NDA)
4. Compensation `[ALL]` — hourly rate, 4-hour minimum, no WG premium
5. Scope summary `[ALL]` — 5 bullets (less aggressive than WG)
6. Deliverables `[ALL]` — 5 bullets
7. Requirements (must / nice) `[ALL]`
8. Interview process `[ALL]` — 4-step (no NDA step)
9. Company brief `[ALL]` — Acme logo + name + classification + tagline + rating
10. End customer brief — post-shortlist `[shortlisted_visitor]` — Ford reveal (Acme staffs through)
11. Stats `[ALL]` — applicants, shortlisted, views, saves, match score
12. Compliance required `[ALL]` — 4 items (no NDA)
13. Applicant panel `[O]` — 3 applicants with rate-proposed
14. Similar contracts `[ALL]` — 3 similar (mix of tiers)
15. Questions log `[ALL]` `[T3]` — 2 Q&As

⚠️ Render with **default chrome** — no gold edge, no diamond. See `TIERS.md` § Standard tier.

---

## 8. Pro Dashboard (`data/dashboard-pro.json`)

**Subject:** Maria Lopez signed-in home page

### Layout — desktop 1440
Greeting top-left, role toggle top-right, quick-actions row, then 3-column grid of cards.

### Sections
1. Greeting + KPI strip `[O-self]` — 5 KPI tiles (rate / rating / active apps / endorsements / strength)
2. Today's recommended contracts `[O-self]` — 3 personalized matches with match score
3. Applications status `[O-self]` — table with summary chip row + 4 application rows
4. Upcoming calendar week `[O-self]` — 6 events (work / interview / task / deadline)
5. Messages preview `[O-self]` — 3 latest with unread chip
6. Earnings this month `[O-self]` — total / billed hours / sparkline / YTD / trend
7. Profile completeness `[O-self]` — 96% score with missing items + recently completed
8. Watchers recent `[O-self]` — 3 most-recent + "+ N more"
9. Quick actions row `[O-self]` — 6 buttons (Apply / Update / Add cert / Connect / Boost / Timesheet)
10. Notifications panel `[O-self]` — 4 latest with read/unread state
11. Active contract summary `[O-self]` — current engagement detail (hours billed, milestone, blockers)

⚠️ Entire page is owner-only by design — only Maria sees her dashboard. No visitor view exists.

---

## 9. Customer Dashboard (`data/dashboard-cust.json`)

**Subject:** Rebecca Chen signed-in home page

### Sections
1. Greeting + KPI strip `[O-self]` — 5 KPI tiles (active contracts / spend / fill time / applicants / rehire rate)
2. Open contracts table `[O-self]` — summary chip row + 5 contract rows with applicant/shortlist counts
3. Applicants today `[O-self]` — 3 newest applicants with match score
4. Spending trend quarterly `[O-self]` — 4-quarter bar + by-trade pie for current quarter
5. Interviews this week `[O-self]` — 4 scheduled with kind chips
6. Messages preview `[O-self]` — 3 latest
7. Shortlist carousel `[O-self]` — 4 candidates currently shortlisted across all open contracts
8. Compliance status `[O-self]` — COI, W-9, MSA, ACH state
9. Quick actions row `[O-self]` — 6 buttons (Post / Review / Message / Watchlist / Boost / Reports)
10. Notifications panel `[O-self]` — 4 latest

---

## 10. Admin Dashboard (`data/admin.json`)

**Subject:** Tony Wallace (or any admin)
**Source HTML:** none — see `specs/ADMIN-DASHBOARD-SPEC.md` for the canonical brief

### Sections — see ADMIN-DASHBOARD-SPEC.md for behavior detail
1. Platform KPI strip `[A]` — 7 tiles (users / contracts / GMV / bugs / mod / disputes / payments)
2. Moderation queue `[A]` — 5 filters + 5 rows + bulk actions
3. Payments queue `[A]` — 4 filters + 4 rows + bulk actions
4. Disputes open `[A]` — 3 rows
5. Platform health `[A]` — 6 services
6. Agent activity 24h `[A]` — 5 agents
7. Fraud signals `[A]` — 3 risk signals
8. Feature flags `[A]` — 6 flags
9. Recent admin actions `[A]` — 4-entry audit log
10. Search command palette (⌘K) `[A]` — global navigation overlay

⚠️ Sub-roles: Super Admin (Tony) / Operations Admin / Trust & Safety — toggle visibility per role.

---

## Cross-page consistency rules

These apply to every page above:

- **Wallpaper bleed-through** through every glass surface (Law 1)
- **No solid CTAs** — every button is tinted glass with 4-layer 3D effect (Law 2)
- **Fibonacci spacing** (5/8/13/21/34/55/89) (Law 3)
- **JetBrains Mono on every number** — rates, counts, dates, percentages (Law 5)
- **144 / 72 / 80 px** image hierarchy — main / secondary / badge (Laws 6/7/8)
- **Light + dark mode** both render correctly (CEO directive 2026-04-25)
- **The Professor voice** on every label, button, empty state, error
- **Inset top highlight** on every glass surface (`inset 0 1px 0 rgba(255,255,255,0.15)` dark / 0.60 light)
- **Animated wallpaper** with `prefers-reduced-motion: reduce` fallback
- **Progressive transparency** — deep 0.50 → mid 0.32 → top 0.18 — wallpaper visible through every layer

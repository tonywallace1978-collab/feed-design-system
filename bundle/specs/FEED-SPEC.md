# FEED-SPEC — Automate America Universal Feed

**Status: v1 2026-04-27 LATE.** v0 was killed because Claude Design shipped Feed Home v2 (commit `d4c45f7`) as a **3-column dashboard grid with 6 cards** ("Today on the floor" headline + Network-performance KPI panel) — same fundamental concept failure as v1's 9-card grid Tony killed earlier today. **The Feed is NOT a dashboard, NOT a grid, NOT a "today's update" briefing.** This v1 is the rewrite. Read § 1 + § 2 + § 4 + § 6 before touching a single pixel of v3.

---

## ⛔⛔⛔ § 0. WHAT WAS WRONG WITH v1 AND v2 (so v3 doesn't repeat)

| Failure | v1 (killed earlier) | v2 (`d4c45f7` killed now) |
|---|---|---|
| Layout | 9-card container grid | 3-column 6-card grid (`feed-grid: 490px 490px 490px`) |
| Scroll | None — fixed page | Scroll height **1967px** = **two viewports total** |
| Card count | 9 | 42 elements / 10 articles |
| Card-type diversity | A few entity icons | **Only 4 of 40 spec'd card types** present (Pro / Company / BG / School). MISSING: contracts (hourly std + WG + direct W-2), products, services, user posts, admin posts, hire announcements, endorsements, reviews, badge-earned, promotional cards (Post Work / Boost / Connect Suggestion / Refer / Sponsored / Welcome), utility cards (skill suggestion / cert renewal / industry news / geo suggestion / job match) — **36 of 40 missing.** |
| Headline | "Things to do today" framing | "Today on the floor · 3 new contracts since 06:00 EST" — **dashboard briefing language** |
| First-card slot | Promo grid tile | "Network performance" KPI panel — **a dashboard widget**, not in the 40-card catalog at all |
| Mental model | Daily digest | Daily digest with prettier glass |

**Both shipped a daily-digest dashboard wearing feed clothing.** That is the exact concept Tony killed twice. v3 must be a **single-column infinite-scroll social feed** with **40+ distinct card types** and a **path to thousands of cards** (lazy-loaded in batches of 10).

---

## ⛔⛔⛔ § 1. WHAT THE FEED IS — TONY VERBATIM (read this 5 times)

> **"The feed is a social media style feed that will literally have thousands of pages, every fucking professional profile, every school, work request, every affiliate, every open contract, every user post, every admin post, every product ever listed will be its own page in the feed, every service ever listed by a company will be in the feed forever. This is not the feed at all. The feed will be never ending, driven by extremely complicated algorithm that should already be 100% complete. The feed depends on the users profile, their actions and the feed is very different for every users."**

> **"every single profile ever that has been approved will show in the feed"** (Tony 2026-04-27 evening — verbatim, sent immediately after killing v2)

**Translation:**

1. **Single column.** Not 2 columns, not 3 columns, not a grid. **Single column.** Like Instagram / Twitter / LinkedIn / TikTok feeds. Cards stack vertically, one after the other, top to bottom.
2. **Infinite scroll.** No "Load more" button. No pagination. IntersectionObserver loads next batch of 10 cards when the user reaches 80% scroll depth. Mockup ships with at least **50 cards rendered + lazy loader scaffolding for the next 50** so scroll feels real and endless.
3. **Every approved entity is a card.** Every approved professional profile in the database = one card in the feed. Every approved customer profile = one card. Every approved company = one card. Every approved business group = one card. Every approved school = one card. Every open contract (Hourly Standard + Hourly White Glove + Direct W-2) = one card. Every approved product / service / affiliate / user post / admin post = one card. **There are tens of thousands of cards in the live feed.** The mockup demonstrates this with 50 sample cards + cadence + lazy-load proof.
4. **Algorithm-ranked.** Server-side algorithm (already 100% complete per Tony) decides per-user order. Mockup renders one plausible deterministic order for one signed-in viewer (default: Maria Lopez Pro). The 5-role toggle bar swaps the deterministic order to demonstrate the algorithm produces materially different feeds per role.
5. **Per-card fullscreen popout.** Tap any card → fullscreen popout reusing the Maria Pro v2 popout pattern. Same rule as profile sections (Tony 2026-04-27 #7).
6. **No daily-briefing framing.** No "Today on the floor." No "Things to do today." No "Network performance" KPI panel at top. The feed has no chrome above the first card other than the global header (logo + nav + search + avatar). First-render: global header → first feed card → infinite scroll.

**The Feed is the platform.** It is not a dashboard. It is not a digest. It is not a curated daily set. It is the entirety of what the user can see in the platform, ranked by algorithm, scrolled forever.

---

## § 2. THE COMPLETE PLATFORM — EVERY PAGE THAT EXISTS

The Automate America Next.js app routes through a single root path `/` with `?section=X` query strings (CEO Rule 14). Below is the **complete inventory of 124 routing behaviors** as of 2026-04-07 audit by David. Every one of these is a page that exists. Most of them produce cards in the feed.

**Source:** `tonywallace1978-collab/Feed-Project` repo, file `reference/FEED-PAGES-COMPLETE-MAP.md`, Section 1 Master Section Routing Table.

### § 2.1 Profile / Account pages (10)

| # | `?section=` | Component | Lines | Auth | Status |
|---|---|---|---|---|---|
| 1 | `profile` | `ProfileViewSection.tsx` | 5,346 | No | PARTIAL |
| 17 | `professional` | `ProfileViewSection.tsx` | 5,346 | No | BUILT |
| 77 | `company` | `CompanyProfileSection.tsx` | 222 | No | BUILT |
| 79 | `customer` | `CustomerProfileSection.tsx` | 596 | No | BUILT |
| 109 | `business-group` | `BusinessGroupProfileSection.tsx` | 200 | No | BUILT |
| 89 | `edit-profile` | `EditProfileSection.tsx` | 2,990 | Yes | BUILT |
| 81 | `company-editor` | `CompanyEditorSection.tsx` | 1,182 | Yes | BUILT |
| 121-123 | `?type=customer/company/business-group` (profile dispatch) | per-type wrappers | — | No | BUILT |

### § 2.2 Dashboard + Work-View pages (6)

| # | `?section=` | Component | Lines | Auth | Status |
|---|---|---|---|---|---|
| 2 | `dashboard` | `DashboardSection.tsx` | 6,433 | Yes | BUILT |
| 3 | `my-dashboard` | `DashboardSection.tsx` | — | Yes | BUILT (alias) |
| 4 | `work-by-me` | `DashboardSection.tsx` (initialView) | — | Yes | BUILT |
| 5 | `work-for-me` | `DashboardSection.tsx` (initialView) | — | Yes | BUILT |
| 82 | `company-dashboard` | `CompanyDashboardSection.tsx` | 1,208 | Yes | PARTIAL (legacy) |

### § 2.3 Work / Contract / Job / RFQ pages (17)

| # | `?section=` | Component | Lines | Auth | Status |
|---|---|---|---|---|---|
| 10 | `contracts` | `ContractsSection.tsx` | 1,936 | Yes | BUILT |
| 11 | `contract` | `ContractDetailSection.tsx` | 2,381 | No (view) | BUILT |
| 13 | `rfq` | `RFQDetailSection.tsx` | 112 | No | BUILT |
| 15 | `direct-job` | `DirectJobDetailSection.tsx` | 111 | No | BUILT |
| 28 | `post-job` | `PostJobSection.tsx` | 1,595 | Yes | PARTIAL |
| 91 | `work-requests` | `WorkRequestsSection.tsx` | 828 | Yes | BUILT |
| 93 | `applications` | `ApplicationsSection.tsx` | 745 | Yes | BUILT |
| 94 | `my-applications` | `MyApplicationsSection.tsx` | 500 | Yes | BUILT |
| 95 | `received-applications` | `ReceivedApplicationsSection.tsx` | 985 | Yes | BUILT |
| 99 | `post-rfq` | `PostRFQSection.tsx` | 1,720 | Yes | BUILT |
| 100 | `job-detail` | `JobDetailSection.tsx` | 502 | No | BUILT |
| 101 | `work-request-detail` | `WorkRequestDetailSection.tsx` | 542 | No | BUILT |
| 102-106 | `work-wizard` / `create-work` / `post-work` / `create-contract` / `post-work-request` | `UnifiedWorkWizardSection.tsx` | 4,354 | Yes | BUILT |

### § 2.4 User Services pages (21)

| # | `?section=` | Component | Auth | Status |
|---|---|---|---|---|
| 6 | `messages` | `MessagesSection.tsx` (1,244) | Yes | PARTIAL |
| 7 | `settings` | `SettingsSection.tsx` (2,771) | Yes | BUILT |
| 8 | `boost` | `BoostSection.tsx` (721) | Yes | BUILT |
| 9 | `create-ad` | `CreateAdSection.tsx` (695) | Yes | BUILT |
| 18 | `notifications` | `NotificationsSection.tsx` (1,081) | Yes | BUILT |
| 19 | `connections` | `ConnectionsSection.tsx` (1,814) | Yes | BUILT |
| 20 | `credits` / 21 `connection-credits` | `ConnectionCreditsPage.tsx` (561) | Yes | BUILT |
| 22-23 | `billing` / `subscription` | `BillingSection.tsx` (453) | Yes | BUILT |
| 24 | `timesheets` | `TimesheetSection.tsx` (1,801) | Yes | BUILT |
| 25 | `expenses` | `ExpenseSection.tsx` (1,025) | Yes | BUILT |
| 26 | `onboarding` | `OnboardingSection.tsx` (2,487) | Yes | BUILT |
| 34-35 | `my-team` / `team-management` | `MyTeamSection.tsx` (679) | Yes | BUILT |
| 48 | `payment-methods` | `PaymentMethodsSection.tsx` (802) | Yes | BUILT |
| 53 | `w9` | `W9FormSection.tsx` (1,409) | Yes | BUILT |
| 56 | `portfolio` | `PortfolioSection.tsx` (549) | No | BUILT |
| 57 | `invoices` | `InvoiceSection.tsx` (812) | Yes | BUILT |
| 58 | `earnings` | `EarningsSection.tsx` (482) | Yes | BUILT |
| 59 | `privacy` | `PrivacyCenterSection.tsx` (828) | Yes | BUILT |
| 60-61 | `notification-settings` / `notification-preferences` | (1,270) | Yes | BUILT |
| 63 | `watchlist` | `WatchlistSection.tsx` (580) | Yes | BUILT |
| 90 | `following` | `FollowingSection.tsx` (333) | Yes | BUILT |
| 92 | `upgrade` | `UpgradeSection.tsx` (844) | Yes | BUILT |
| 98 | `saved-searches` | `SavedSearchesSection.tsx` (465) | Yes | BUILT |
| 112 | `interviews` | `InterviewsSection.tsx` (1,270) | Yes | BUILT |
| 113 | `calendar` | `CalendarSection.tsx` (719) | Yes | BUILT |
| 114 | `support` | `SupportSection.tsx` (818) | Yes | BUILT |
| 115 | `request-interview` | `RequestInterviewSection.tsx` (551) | Yes | BUILT |

### § 2.5 Discovery + Search + Map pages (5)

| # | `?section=` | Component | Auth | Status |
|---|---|---|---|---|
| 27 | `professionals` | `ProfessionalsSection.tsx` (761) | No | BUILT |
| 54-55 | `map` / `map-search` | `MapSearchSection.tsx` (1,450) | No | BUILT |
| 76 | `search` (also implicit `?q=X`) | `SearchResultsSection.tsx` (2,223) | No | BUILT |
| 116-119 | `training` / `education` / `schools` / `school` | `TrainingSection.tsx` (510) | No | BUILT |

### § 2.6 Content / Marketing / Legal pages (22)

| # | `?section=` | Component | Auth | Status |
|---|---|---|---|---|
| 29 | `help` | `HelpCenterSection.tsx` (1,400) | No | BUILT |
| 30-31 | `about` / `about-us` | `AboutSection.tsx` (877) | No | BUILT |
| 32 | `mission` | `MissionSection.tsx` (396) | No | BUILT |
| 33 | `team` | `TeamSection.tsx` (424) | No | BUILT |
| 36 | `how-it-works` | `HowItWorksSection.tsx` (402) | No | BUILT |
| 37 | `for-professionals` | `ForProfessionalsSection.tsx` (475) | No | BUILT |
| 38 | `for-companies` | `ForCompaniesSection.tsx` (493) | No | BUILT |
| 39 | `contact` | `ContactSection.tsx` (416) | No | BUILT |
| 40 | `partners` | `PartnersSection.tsx` (512) | No | BUILT |
| 41 | `press` | `PressSection.tsx` (539) | No | BUILT |
| 42 | `investors` | `InvestorsSection.tsx` (502) | No | BUILT |
| 43-47 | `legal` / `terms` / `terms-of-service` / `privacy-policy` / `cookie-policy` | `LegalSection.tsx` (450) | No | BUILT/PARTIAL |
| 49 | `pricing` | `PricingSection.tsx` (1,152) | No | BUILT |
| 50 | `blog` | `BlogSection.tsx` (1,101) | No | BUILT |
| 51 | `posts` | `PostsSection.tsx` (146) | Yes | PARTIAL |
| 52 | `occupation` | `OccupationLandingSection.tsx` (462) | No | BUILT |
| 75 | `accessibility-statement` | `AccessibilityStatementSection.tsx` (263) | No | BUILT |
| 85 | `faq` | `FAQSection.tsx` (472) | No | BUILT |
| 86 | `data-processing-agreement` | `DPASection.tsx` (366) | Yes (company) | BUILT |
| 88 | `careers` | `CareersSection.tsx` (316) | No | BUILT |

### § 2.7 Admin / Analytics / Moderation pages (16)

| # | `?section=` | Component | Auth | Status |
|---|---|---|---|---|
| 62 | `feed-analytics` | `FeedAnalyticsSection.tsx` (642) | Admin | BUILT |
| 64 | `admin-monitoring` | `AdminMonitoringSection.tsx` (572) | Admin | BUILT |
| 65 | `admin-moderation` | `ModerationSection.tsx` (577) | Admin | BUILT |
| 66 | `admin-revenue` | `AdminRevenueDashboardSection.tsx` (432) | Admin | BUILT |
| 67 | `admin-user-growth` | `AdminUserGrowthSection.tsx` (391) | Admin | BUILT |
| 68 | `admin-geographic` | `AdminGeographicSection.tsx` (242) | Admin | BUILT |
| 69 | `admin-conversion` | `AdminConversionFunnelSection.tsx` (316) | Admin | BUILT |
| 70 | `social-media-roi` | `SocialMediaROISection.tsx` (503) | Admin | BUILT |
| 71 | `profile-analytics` | `ProfileAnalyticsSection.tsx` (377) | Yes | BUILT |
| 72 | `company-analytics` | `CustomerHiringAnalyticsSection.tsx` (479) | Yes | BUILT |
| 73 | `background-wallpapers` | `BackgroundWallpapersSection.tsx` (445) | Admin | BUILT |
| 74 | `admin-image-gaps` | `AdminImageGapsSection.tsx` (385) | Admin | BUILT |
| 83 | `my-analytics` | `ProfessionalAnalyticsSection.tsx` (294) | Yes | BUILT |
| 84 | `experiment-dashboard` | `ExperimentDashboardSection.tsx` (436) | Admin | BUILT |
| 87 | `compliance-checklist` | `ComplianceChecklistSection.tsx` (373) | Admin | BUILT |

**Total: 124 distinct routes / 119 explicit `case 'X':` entries + 5 query-string dispatches.**

Plus standalone (non-`?section=` URL) routes: `/auth/*` (login, register, forgot-password, verify-phone, verify-email, oauth-callback), `/admin/*` (admin sidebar with ~20 sub-pages — see `reference/ADMIN-SITEMAP-SoT-P689.md`), `/api/*` backends (not user-facing).

**The point:** the platform has **tens of pages**, and **every single one of them is reachable from the feed** — either because the entity it represents has a card in the feed (Professional / Customer / Company / BG / School / Contract / Job / RFQ / Post / Service / Product / Affiliate), or because a feed CTA card links to it (Post Work → wizard, Boost → boost section, Connect → connections, etc.).

---

## § 3. CARD TYPE INVENTORY — 40 BUCKETS (v0 unchanged in v1)

The 40 card types are still right. Pass A must render at least one of EVERY type below. v2's failure was rendering only 4 of them.

### § 3.1 Entity-Content Cards (one card per real DB entity)

| # | Card | Source DB | Visibility | Repeat? |
|---|---|---|---|---|
| 1 | **Professional Profile** | `users` (role=pro, status=approved) | All roles | No (unique per pro) |
| 2 | **Customer Profile** | `users` (role=customer, status=approved) | All roles | No |
| 3 | **Company Profile** | `companies` (status=approved) | All roles | No |
| 4 | **Business Group** | `business_groups` (status=approved) | All roles | No |
| 5 | **School / Training Program** | `affiliates` (subtype=school) | All roles | No |
| 6 | **Open Contract — Hourly Standard** | `contracts` (tier=standard, status=open) | All roles | No |
| 7 | **Open Contract — Hourly White Glove** | `contracts` (tier=wg) | All roles | No |
| 8 | **Open Contract — Direct W-2 Job** | `direct_jobs` (status=open) | All roles | No |
| 9 | **Affiliate Listing** (non-school) | `affiliates` | All roles | No |
| 10 | **Product Listing** | `products` | All roles | No |
| 11 | **Service Listing** | `services` | All roles | No |
| 12 | **User Post** (Pro/Customer-authored) | `posts` (author=user) | Per author scope | No |
| 13 | **Admin Post** (Tony / staff voice) | `posts` (author=admin) | All roles | No |

### § 3.2 Activity Cards (derived from entity events)

| # | Card | Trigger | Visibility | Repeat? |
|---|---|---|---|---|
| 14 | **Hire Announcement** | `hires.created_at` (both opt-in) | All roles | No |
| 15 | **Endorsement Activity** | `endorsements.created_at` | Connection+ of either party | No |
| 16 | **Review Posted** | `reviews.created_at` | Per anonymity rules | No |
| 17 | **Badge Earned** | `badges_earned.created_at` | Connection+ of recipient | No |
| 18 | **Connection Activity** | Aggregated network action | Owner only | No |
| 19 | **Watch-List Update** | Watched-pro action | Owner only | No |
| 20 | **Group Activity** | Group event | Group members | No |
| 21 | **Application Status Update** | `applications.status_changed_at` | Owner only | No |
| 22 | **Milestone** | Anniversary / N contracts / tier upgrade | Owner + Connection+ | No |

### § 3.3 Promotional Cards (REPEAT — that's revenue, not a bug)

| # | Card | Audience | Cadence | Visibility |
|---|---|---|---|---|
| 23 | **Post Work Now** | Customers + Companies | every ~7 cards | Logged-in Customer/Company/Admin |
| 24 | **Boost Your Profile** | Pros (paid) | every ~7 cards | Logged-in Pro/Owner |
| 25 | **Connect Suggestions** | All logged-in | every ~12 cards | Logged-in |
| 26 | **Refer-a-Pro / Refer-a-Customer** | All logged-in | every ~15 cards | Logged-in |
| 27 | **Featured Business Spotlight** | Paid placement | every ~20 cards | All roles |
| 28 | **Sponsored Contract** | Paid placement | every ~20 cards | All roles |
| 29 | **Sponsored Service / Product** | Paid placement | every ~20 cards | All roles |
| 30 | **Welcome / Onboarding Tip** | New users (cold-start) | first 10 cards only, dismissible | New logged-in |

### § 3.4 Discovery / Utility Cards

| # | Card | Trigger | Visibility | Repeat? |
|---|---|---|---|---|
| 31 | **Skill Suggestion** | Algorithm | Owner | Yes (rotating) |
| 32 | **Certification Renewal Reminder** | `certifications.expires_at < +90d` | Owner | No (per cert) |
| 33 | **Compliance / Legal Update** | Admin-pushed | All roles | No |
| 34 | **Industry News / Manufacturer Update** | Admin / OEM feed | All roles | No |
| 35 | **Event / Conference** | Calendar | Geo-relevant | No |
| 36 | **Geographic Suggestion** ("Pros near you", "Contracts near you") | Algorithm | All roles | Yes |
| 37 | **Trending Topic / Hashtag** | Algorithm | All roles | Yes |
| 38 | **Industry Survey / Poll** | Admin-pushed | All roles | No |
| 39 | **Payment / Financial** (invoice, payout, receivable) | `transactions` | Owner only | No |
| 40 | **Job Match Alert** | Algorithm match (user skills × open contract) | Owner + Pro role | Yes (per match) |

---

## § 4. WORKED EXAMPLE — MARIA'S FIRST 30 CARDS (Pass A target)

This is **the deterministic feed Maria Lopez (Pro) sees on Pass A first-render**. Card-by-card, top to bottom, single column, ~700px–900px tall per card. Build this exact sequence.

| Slot | Card type | Concrete content (use existing fixture data) | Notes |
|------|-----------|--------|-------|
| 1 | **Welcome / Onboarding Tip (#30)** | "Add 2 more skills to unlock 14 more matched contracts" | New-user nudge; dismissible; rendered only first 10 cards |
| 2 | **Open Contract — Hourly White Glove (#7)** | "Body Shop Cell 14 — FANUC retrofit · BMW Manufacturing · Spartanburg, SC · $149/hr" | From `data/hourly-wg.json` |
| 3 | **Hire Announcement (#14)** | "Cedar Rapids Mill modernization · ADM hired Maria Lopez · 14-week project" | Algorithmic backfill from Maria's contract history |
| 4 | **Open Contract — Hourly Standard (#6)** | "Sterling Heights paint shop PLC migration · Stellantis · Sterling Heights, MI · $155/hr" | From `data/hourly-std.json` |
| 5 | **Promo: Boost Your Profile (#24)** | "Boost your profile to top of customer searches · 7 days $49" | Pro-only promo |
| 6 | **Customer Profile (#2)** | "Rebecca Chen · Acme Robotics · Detroit, MI" | From `data/customer.json` |
| 7 | **Open Contract — Direct W-2 Job (#8)** | "Senior Controls Engineer · Ford Motor Company · Dearborn, MI · $145K base" | From `data/direct-job.json` |
| 8 | **Endorsement Activity (#15)** | "John Park endorsed Maria Lopez for FANUC Programming" | From Maria's `endorsements_received` |
| 9 | **Promo: Connect Suggestions (#25)** | "3 controls engineers in Detroit you may know" | 3-avatar grid |
| 10 | **Company Profile (#3)** | "Acme Robotics · Tier 1 Automotive · Dearborn, MI · 47 active contracts" | From `data/company.json` |
| 11 | **Promo: Post Work Now (#23)** | Skip for Maria (she's Pro, not Customer/Company). Replaced with **Skill Suggestion (#31)** "Add 'OPC UA' — used in 312 open contracts" | Role-aware promo swap |
| 12 | **Open Contract — Hourly Standard (#6)** | "Assembly line 4 — AB CompactLogix migration · General Motors · Lake Orion, MI · $145/hr" | |
| 13 | **Review Posted (#16)** | "★★★★★ from BMW Manufacturing on Maria Lopez · 'Calm under deadline, blunt on root cause'" | From `reviews_received` |
| 14 | **Business Group (#4)** | "Great Lakes Automation Network · 138 members · 12 open contracts · Detroit/Cleveland/Chicago/Milwaukee" | From `data/business-group.json` |
| 15 | **Job Match Alert (#40)** | "92% match: Robot palletizer commissioning · Acme Robotics · 4 hours left to apply" | Algorithm match |
| 16 | **School / Training Program (#5)** | "FANUC R-30iB Operator Training · Macomb Community College · 5-day cert · $2,400" | Fixture: NEEDED |
| 17 | **Promo: Boost Your Profile (#24)** (cadence repeat) | "Featured in Pro searches · Top 1% rate boost" | Different copy variant from slot 5 |
| 18 | **Hire Announcement (#14)** | "Robot palletizer commissioning · Whirlpool hired Maria Lopez · Clyde, OH" | |
| 19 | **Admin Post (#13)** | "Tony Wallace: We're rolling out new Direct Hire flows next week — here's what changes." | Tony voice, fixture NEEDED |
| 20 | **Product Listing (#10)** | "FANUC R-30iB Plus Mate Controller · $24,500 · Authorized FANUC distributor" | Fixture NEEDED |
| 21 | **Open Contract — Hourly White Glove (#7)** | "Robot palletizer commissioning · Acme Robotics · Detroit, MI · $148.50/hr" | |
| 22 | **Connection Activity (#18)** | "Sarah Kim (in your network) connected with Bosch Rexroth Detroit" | |
| 23 | **Promo: Refer-a-Pro (#26)** | "Refer a controls engineer · Earn 1 month free Pro Plus when they post their first contract" | |
| 24 | **Service Listing (#11)** | "Production-line commissioning · 14-week typical · Acme Robotics · From $25K" | Fixture NEEDED |
| 25 | **Sponsored Contract (#28)** | "[SPONSORED] Sterling Heights paint shop PLC migration · Stellantis" | Same contract as slot 4 but paid-promoted |
| 26 | **User Post (#12)** | "Posted by John Park, Controls Engineer · 'Anyone seen the new Allen-Bradley CompactLogix L8 firmware update break HMI tags?'" | Fixture NEEDED |
| 27 | **Badge Earned (#17)** | "Maria Lopez earned Top 1% Rate · Diamond" | From Maria's badges |
| 28 | **Industry News / Manufacturer Update (#34)** | "ABB releases new IRB 1100 collaborative robot — 720mm reach, 4kg payload" | Fixture NEEDED |
| 29 | **Geographic Suggestion (#36)** | "12 contracts within 50 miles of Detroit, MI" | Algorithm |
| 30 | **Featured Business Spotlight (#27)** | "[FEATURED] Acme Robotics — 47 active contracts, 138 group members, hiring 12 roles now" | Acme Robotics paid feature |

**Beyond slot 30:** infinite-scroll lazy-loads next batch of 10. Cards continue cycling through entity types + promo cadence + activity feed + utility cards. **Mockup ships scroll affordance proven through at least 50 cards rendered**, with IntersectionObserver scaffolding to prove the next batch lazy-loads (even if the next batch is a duplicate of slots 1-10 with rotated copy — that demonstrates infinite scroll pattern works).

**Fixture-data gaps to fill before/during Pass A** (do NOT fabricate — flag in card body as `[FIXTURE NEEDED — Tony confirms]`):
- 3-5 schools (slot 16 example)
- 5-10 products (slot 20 example)
- 5-10 services (slot 24 example)
- 5-10 plausible Pro/Customer user posts (slot 26 example)
- 3-5 Tony-voice admin posts (slot 19 example)
- 2-3 industry news items (slot 28 example)
- 2-3 surveys / polls
- 2-3 compliance / legal updates

---

## § 5. FIVE-ROLE VISIBILITY MATRIX

Same toggle bar as Maria/Rebecca profile pages. Pass B implements all 5 feeds; Pass A is single-role (Maria Pro signed-in).

| Role | Algorithm? | What's in feed | Promotional skew |
|---|---|---|---|
| **Logged-out visitor** | Curated public slice (no personalization) | Open contracts, public profiles, admin posts, schools. **NO** application-status / watch-list / connection / payment / private cards. | "Sign up to see more" promo skewed heavily |
| **Logged-in visitor** (no relation) | Yes (full personalization) | All entity cards; activity cards from network only | Boost (Pro) / Post Work (Customer/Company) / Connect / Refer |
| **Connection** of subject entity | Yes | Connection-gated content unlocked (private posts, network milestones, watch-list of mutual connections) | Same as logged-in + Connection-Activity prioritized |
| **Owner** (the user themselves) | Yes (firehose) | Full firehose + owner-only utility cards (renewal, payment, application-status, milestones) | Boost (Pro) / Post Work (Customer/Company) / Connect / Refer |
| **Admin** (Tony / staff) | Yes (admin firehose) | Full firehose + admin-only cards (moderation queue, abuse reports, KPI snapshots, admin posting tool) | Suppressed (admins don't see user-facing promo) |

---

## § 6. VISUAL VOCABULARY (binding)

- **Single column.** `display: flex; flex-direction: column; gap: 16px;` on the feed container. **NOT GRID.**
- **Card width:** centered, max-width ~720px on desktop (mobile-style narrow column). Do NOT span full viewport. Wallpaper visible to either side.
- **Card height:** variable per type. Hero (admin posts, milestones, sponsored top): ~900px. Standard (entity, activity): ~650-750px. Compact (promo repeats, utility): ~280-380px (denser to keep promo from dominating).
- **Glass:** all cards inherit `tokens/glass-design-tokens.css` + `styles/glass.css` + V1 spectral edge + V2 specular crown.
- **Card-tap → fullscreen popout** per Tony 2026-04-27 #7 (universal — every card type, no exceptions). Reuse Maria Pro v2 popout pattern.
- **Per-card affordances** (always visible bottom-right OR hover-revealed on desktop):
  - **Save** — bookmark to "Saved Items" (owner-scoped)
  - **Share** — native share sheet
  - **Dismiss** — suppress for 7 days (welcome cards: lifetime)
  - **View Full** — link to entity's full page (`?section=X&id=N`)
- **Infinite scroll:** IntersectionObserver fires next batch at 80% scroll depth, batches of 10. **NO "Load more" button. NO pagination.**
- **No daily-briefing chrome above first card.** First-render order: global header → first feed card. That's it. No "Today on the floor" headline. No "3 new contracts since 06:00 EST" ticker. No KPI panel. The user lands directly into the algorithmic feed.

---

## § 7. NON-GOALS (do NOT build into the design mockup)

- Real backend wiring — algorithm is server-side, mockup renders deterministic mock data
- Real auth — toggle bar substitutes for login state
- Real comments / likes / replies — render the affordances, click is no-op (graceful degradation per Maria popout precedent)
- Real share — open native share-sheet stub or copy-to-clipboard, no real publishing
- Real save persistence beyond local-storage — server save is wiring, not design
- Real algorithm — algorithm is shipped backend; do NOT design or re-implement ranking logic
- **A 9-card grid. A 3-column grid. ANY grid. ANY dashboard framing.**

---

## § 8. PASS A ACCEPTANCE CRITERIA (Tony reviews v3 against this list)

Pass A v3 is accepted only when ALL of the following are true:

1. **Single-column scroll layout** — no `display: grid` on the feed container. Verify: `getComputedStyle(feedContainer).display === 'flex'` AND `flexDirection === 'column'`.
2. **At least 50 cards rendered** at first paint (so scroll feels real).
3. **At least one of every card type 1-40** appears within those 50 cards. Use the Worked Example (§ 4) as the floor.
4. **Page scroll height ≥ 8x viewport height** (~7,200px on a 900px-tall viewport) — proves it's a feed, not a dashboard.
5. **No "Today on the floor" or equivalent dashboard headline.** First card is the first feed card; no chrome above it but the global header.
6. **No KPI panels in the feed body** ("Network performance", "$2.4M paid out", etc. are dashboard widgets, not feed cards).
7. **IntersectionObserver wired for lazy load** (even if it just appends a placeholder batch — proves the pattern).
8. **Card-tap fullscreen popout** works on at least one card per category (entity, activity, promo, utility) — reuse Maria Pro v2 popout pattern.
9. **Per-card affordances** (Save / Share / Dismiss / View Full) visible on every card.
10. **No fabricated entity data.** Where fixture data is missing (schools, products, services, user posts, admin posts, industry news, surveys), render `[FIXTURE NEEDED — Tony confirms]` placeholder and add to bottom-of-file checklist.

---

## § 9. PROCESS — HOW v3 SHIPS BACK

Same workflow as Maria Pro v2:

1. Claude Design builds Feed Home v3 on canvas, against this spec.
2. Claude Design pushes ZIP to Tony.
3. Tony drops ZIP into `C:\Users\Admin\Downloads\`.
4. Claude Code extracts → commits verbatim → pushes → Playwright-walks v3 against § 8 acceptance criteria → reports verified PASS to Tony before any review URL is sent.
5. If § 8 criteria FAIL, Claude Code does NOT send Tony a review URL. Reports the FAILs back via HANDOFF.md → Claude Design picks up next session.

**Tony does not review v3 until Claude Code Playwright-confirms ALL § 8 criteria PASS.** New rule (Tony 2026-04-27 evening, verbatim): *"do not tell me to fucking test old versions you fuck and do nto tell me to reveiw anything that you have not viewed with playwright and reviewed and it passed all of the fucking test requirements... then and only then do you ever fucking ask me to test."*

---

## § 10. DOCUMENT-AS-YOU-GO

Per Tony directive 2026-04-27: extend this spec as you build.

- New card type discovered? Add a row to § 3.
- Cadence needs tightening? Update with rationale.
- Fixture-data gap filled? Strike from § 4 fill list.
- Visual rule emerged from Pass A? Add to § 6.
- Pass A surfaced a question? Add to § 10 (this section, formerly Open Questions).

When you push v3 of the Feed Home file via Tony zip-paste, push the FEED-SPEC.md diff with it. Claude Code commits both verbatim. **The spec is the contract. The repo is the memory.**

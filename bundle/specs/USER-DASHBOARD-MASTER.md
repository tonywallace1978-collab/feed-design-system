# USER-DASHBOARD-MASTER — Every Section / Every Sub-Section / Every Field / Every CTA

**Authority:** Tony source doc `bundle/specs/source/USER-DASHBOARD-SOURCE.txt` (verbatim preserved). This master synthesizes that source + Tony 2026-04-27 directives. **Don't remove sections.** Things may have changed since the source — flag drift in commits, never silently strip.

**Tony's structural rule (verbatim, source line 6):**

> "we have a row that is divided into two sections, Work Being Done By Me or My Employees and another section called Work Being Done For Me."

**One dashboard skeleton.** Pro user's dashboard surfaces "Work being done BY me / for my customers" prominently. Customer user's dashboard surfaces "Work being done FOR me / by my contractors" prominently. Both halves render for both user types — content varies based on what the user does.

---

## 1. THE TWO ROLES THAT MATTER FOR DASHBOARD

The dashboard is **owner-and-admin only**. Visitors / connections never see someone else's dashboard. So the role matrix is simpler than the profile:

| Role | Code | Sees the dashboard? |
|---|---|---|
| Logged-out visitor | `public` | ✗ — redirected to log in |
| Logged-in visitor | `visitor` | ✗ — they have their own dashboard, not someone else's |
| Connection | `connection` | ✗ — same as visitor |
| **Owner** | `owner` | ✓ — full dashboard, edit + manage everything |
| **Admin** | `admin` | ✓ — full dashboard + admin overlays (impersonation banner, audit log, support actions) |

Visitor / connection / public render of the user's dashboard = redirect to user's profile (the public surface). Profile and dashboard are different surfaces.

---

## 2. PAGE HEADER

**Source line 2:** *"At the top, we need to Display the words User Dashboard so that they understand what page they are on."*

| Element | owner | admin |
|---|---|---|
| Page title: **"User Dashboard"** | ✓ | ✓ + admin chip ("Viewing as Tony") |
| Floating Chat With Admin bubble (small, right side, every page — source line 368) | ✓ | ✗ (admin IS admin) |

---

## 3. FIRST ROW — TOP CTA CARDS

**Source line 3:** *"First Row CTA Cards, Time Sheets, Expense Reports, Invoices, Purchase Orders."*

These are the 4 highest-priority surfaces — they aggregate across ALL the user's contracts (both Work Being Done By Me + Work Being Done For Me).

| Card | Purpose | Owner CTA | Admin CTA |
|---|---|---|---|
| **Time Sheets** | Aggregate timesheet inbox across all WG contracts (own + customer-side) | Click → list view | Click → list view |
| **Expense Reports** | Aggregate expense report inbox across all WG contracts | Click → list view | Click → list view |
| **Invoices** | Aggregate invoice list (both directions: owed-to-me + owed-by-me) | Click → list view + pay options | Click → list view + admin override |
| **Purchase Orders** | Aggregate PO list (customer-side, WG only) | Click → list view | Click → list view |

**Visual treatment:** 4-card row with count badge per card (e.g. "3 due", "12 pending approval", "1 past due"). Past-due indicators flash red per source line 59/229.

---

## 4. SECOND ROW — UTILITY CTAs

**Source line 4:** *"Second Row CTA's, View as Business, Search Work, Search Customers, Edit Profile"*

| CTA | Purpose | Owner | Admin |
|---|---|---|---|
| **View as Business** | Toggle to business-group dashboard view | ✓ | ✓ |
| **Search Work** | Discover open contracts / direct jobs | ✓ | ✓ |
| **Search Customers** | Discover companies hiring | ✓ | ✓ |
| **Edit Profile** | Jump to profile-edit surface | ✓ | ✓ |

---

## 5. THIRD ROW — PROFILE SUMMARY CARD

**Source line 5:** dashboard's identity card with the Boost CTA + share + availability switch.

**Fields:**
- Profile Image
- # of Connections
- Primary Occupation
- State and Country
- Email
- Phone Number
- **Boost My Profile CTA** (owner + admin only — Tony 17-item #11)
- **Share** (arrow icon, options below)
- **I am Available** switch (Green = Available / Red = Not Available)

**Share options:** Copy link · Send to Text · Send to Email · Share on Facebook · Share on LinkedIn · Share on WhatsApp.

**Availability switch behavior:** identical to profile § 3.1 — Yes/No, 7-day auto-expire, renewal notification 1 day before expiry.

---

## 6. CONTRACT-WORK TOGGLE (the heart of the dashboard)

**Source line 6:** the dashboard pivots between two halves.

| Toggle State | Description |
|---|---|
| **"Work Being Done By Me or My Employees"** (default for Pros) | I am the contractor; I'm doing the work; the customer pays me |
| **"Work Being Done For Me"** (default for Customers) | I am the customer; contractors are doing work for me; I pay them |

**Both halves render for every user.** Most users will have content in one half and empty-state in the other. Mockup shows both halves populated for Maria (Pro who also occasionally hires others).

---

## 7. WORK BEING DONE BY ME OR MY EMPLOYEES — full structure

**Source lines 7-103.**

### 7.1 Contracts Section

#### 7.1.1 Ongoing Contracts (source lines 11-25)

**Contract Header fields:**
- Primary Occupation
- Start Date
- End Date
- Type of Contract: **White Glove Hourly** OR **Standard Hourly**
- Onsite OR Remote

**Contract-level CTAs:** Copy · End Contract

**Sub-sections (only visible for White Glove Hourly contracts — source line 15):**

##### Timesheets (WG only)
- Current Timesheet (no number)
- Due Timesheets (current + past-due, urgent)
- Pending Customer Approval (submitted, awaiting customer)
- Approved Timesheets

##### Expense Reports (WG only)
- Current Expense Report (no number)
- Due Expense Reports (urgent)
- Pending Customer Approval
- Approved Expense Reports

##### Invoices (WG only — invoices FROM contractor TO Automate America)

**Source line 26-30:** Automate America auto-generates invoice when timesheets approved.

- Due Invoices: not yet paid
- Past Due Invoices: should never exist; flash red if any
- Paid Invoices

#### 7.1.2 Pending Applications (source lines 31-32)

Lists Hourly Contracts the user (or one of their employees) applied to. Hasn't been actioned yet.

- View summary card · View full contract · **Withdraw Application** CTA

#### 7.1.3 Shortlisted Applications (source lines 33-34)

Customer has shortlisted the contractor or employee. Not yet hired.

- View summary card · View full contract · **Withdraw Application** CTA

#### 7.1.4 Offers Pending (source lines 35-36)

Customer has sent an offer. Contractor must accept or reject.

- View summary card · View full contract · **Accept Offer** · **Reject Offer**

#### 7.1.5 Applications Rejected (source lines 37-38)

Customer hired someone else. Read-only.

- View summary card · View full contract (no actions)

#### 7.1.6 Rejected Offers (source lines 39-40)

Contractor rejected the offer. Read-only.

- View summary card · View full contract (no actions)

#### 7.1.7 Completed / Closed Contracts (source lines 41-69)

**Contract Header fields:** Primary Occupation · Start Date · End Date · Type · Onsite/Remote.
**CTA:** Copy.
**Contract Summary fields:**
- Location of Contract (State + City if Onsite)
- Completed Date (when closed)
- About Contract (character-limited)
- Top Skill
- Second Skill (if entered)
- Pay Rates: Base · Overtime · Sun/Holidays

**Contract Record sub-sections (WG only):**
- Invoices (Due / Past Due / Paid)
- Purchase Orders (In Progress / <20% Remaining / Completed)
- Timesheets (Due / Pending Customer Approval / Approved)
- Expense Reports (Due / Pending Customer Approval / Approved)
- Contractors Hired (links to professional summary cards)

### 7.2 Request From Customers Section (source lines 70-75)

**Source verbatim line 71:** *"Direct Request is that it is a private contract between the customer and contractor. It is not open for others to apply to. The customer will be given the option at the end of the Direct Request Process to Make the request an Open Contract..."*

A direct request → professional accepts → automatically becomes a contract in Ongoing Contracts.

#### 7.2.1 Open Requests
Customer requested me or my employee. Awaiting accept/reject.
- View summary · View full contract · **Accept Request** (auto-converts to Ongoing Contract for both parties) · **Reject Request** (with reason prompt)

#### 7.2.2 Rejected Requests
I (or someone in my business group) rejected the customer's direct request.
- View summary · View full contract (no actions)

### 7.3 Direct In-House Jobs Section (source lines 76-103)

**Source rule line 77:** *"a user will never apply their employees to a direct in-house job, only to hourly contracts."*

Direct In-House Jobs = W-2 employment offers (the user themselves only — not their employees).

#### 7.3.1 Ongoing Direct In-House Job (max one per user)

**Job Header fields:** Primary Occupation · Start Date.
**CTAs:** Copy · **Close Job** (I am no longer employed by this company).

#### 7.3.2 Job Offers Pending
Customer hired me / sent offer.
- View summary · View full posting · **Accept Offer** · **Reject Offer**

#### 7.3.3 My Applications to Jobs
Direct Jobs I applied to.
- View summary · View full posting · **Withdraw Application**

#### 7.3.4 Shortlisted Job Applications
Customer shortlisted me, not hired yet.
- View summary · View full posting · **Withdraw Application**

#### 7.3.5 Job Offers I Rejected
I rejected the offer. Read-only. Cannot re-apply.
- View posting (no actions)

#### 7.3.6 Completed / Closed Direct In-House Jobs

**Job Header fields:** Primary Occupation · Start Date · Onsite/Remote.
**CTA:** Copy.
**Job Summary fields:**
- Location (State + City if Onsite)
- Completed Date
- About Job (character-limited)
- Top Skill
- Second Skill (if entered)
- Pay Rates: Base · Overtime · Sun/Holidays

---

## 8. WORK BEING DONE FOR ME — full structure

**Source lines 104-352.**

### 8.1 Contracts Section

#### 8.1.1 Ongoing Contracts (source lines 106-136)

**Contract Header fields:** Primary Occupation · Start Date · End Date · Type (WG / Standard) · Onsite/Remote.
**Contract-level CTAs:** Copy · End Contract.

**Professional Details panel (the contractors hired):**
- **Left Side:** Full Name · Primary Occupation · State + City · # of Reviews · Rating
- **Right Side:** Top Skill · Second Skill · Work Experience · Member Since
- **CTAs:** View Profile

**Sub-sections (WG only):**

##### Timesheets (WG only — customer-side approval flow)
- Current Timesheet
- Due Timesheets (urgent)
- **Pending My Approval** (timesheets submitted by contractor, customer needs to approve)
- Approved Timesheets

##### Expense Reports (WG only — customer-side)
- Current Expense Report
- Due Expense Reports
- **Pending My Approval**
- Approved Expense Reports

##### Invoices (WG only — invoices TO the customer FROM Automate America)
- **Due Invoices:** not late yet · **Pay Now** CTA (Credit Card / Direct Deposit / Transfer)
- **Past Due Invoices:** flash red · **Pay Now** CTA
- **Paid Invoices**

##### Purchase Orders (WG only — customer-created)
- In Progress (plenty of hours remaining)
- Less than XX% Remaining (configurable threshold; default 20%)
- Completed (fully used, paid out)

**Application Management sub-section (BOTH WG + Standard):**
- **Applications Received:** view profiles · Shortlist · Reject · **Hire / Send Offer**
- **Shortlisted Applicants:** view profiles · Reject · **Hire / Send Offer**
- **Offers Pending:** view profiles · Retract Offer · Reject Applicant
- **Offers Accepted:** view profiles (these are the active hired contractors shown above)
- **Offers Rejected:** view profiles (no actions — applicant rejected our offer)
- **Rejected Applicants:** view profiles · Revert to Applications Received · Shortlist · **Hire / Send Offer**

#### 8.1.2 Draft Contracts (source lines 150-165)

Contracts the user (or their business group member) started but hasn't submitted.

**Contract Header:** Primary Occupation · Start Date · End Date · Type · Onsite/Remote.
**CTAs:** Copy · Delete Draft.
**Contract Summary:** Location (if Onsite) · Initiated Date · About Contract · Top Skill · Second Skill · Pay Rates (Base / OT / Sun-Hol).
**Bottom CTAs:** **Edit Contract** · **Submit for Approval**.

#### 8.1.3 Contracts Pending Admin Approval (source lines 166-181)

Submitted to Automate America Admin, awaiting approval.

**Contract Header:** same as Draft.
**CTAs:** Copy · Delete.
**Contract Summary:** Location · **Sent For Approval Date** · About · Top Skill · Second Skill · Pay Rates.
**Bottom CTAs:** **Boost This Contract** ($ paid promotion).

#### 8.1.4 Open Contracts (source lines 182-207)

Live, accepting applications.

**Contract Header:** same.
**CTAs:** Copy · **Unpublish** (returns to Draft) · **Delete** (with warning: *"If you delete this contract it will be unavailable to you and Automate America admin, are you sure you want to permanently delete this contract? Unpublishing will take it back to draft."*).
**Contract Summary:** same as Pending Admin Approval.

**Application Management:** same as § 8.1.1 (Applications Received / Shortlisted / Pending Offers / Rejected).
**Bottom CTAs:** **Boost This Contract**.

#### 8.1.5 Completed / Closed Contracts (source lines 209-245)

**Contract Header / Summary:** same shape as § 7.1.7 but customer-side.

**Contract Record sub-sections (WG only):**
- Invoices (Due / Past Due / Paid) — same direction as § 8.1.1 (TO customer)
- Purchase Orders (In Progress / <XX% / Completed)
- Timesheets (Due / Pending My Approval / Approved)
- Expense Reports (Due / Pending My Approval / Approved)
- **Contractors Hired** (BOTH WG + Standard) — view full profile · **Request This Contractor Again**

### 8.2 Professionals Requested Section (source lines 247-253)

Mirror of § 7.2 but customer-side.

#### 8.2.1 Open Requests
Professionals I requested directly. Awaiting their accept/reject.
- View summary card · View full profile · (no other actions; waiting on professional)

#### 8.2.2 Rejected Requests
Professionals I requested who declined.
- View summary card · View full profile · **View rejection comment** (per source line 252: professionals must give brief explanation when rejecting a request)

**Bottom Footer CTA (source line 253):** **Search and Request Available Professionals Now**.

### 8.3 Direct In-House Jobs Section (source lines 255-352) — customer-side W-2 hiring

#### 8.3.1 Ongoing Direct In-House Jobs

**Job Header fields:** Primary Occupation · Start Date.
**CTAs:** Copy · Close Job.
**Professional Details panel:** same shape as § 8.1.1 (Left/Right + View Profile).

**Application Management sub-section:** Applications Received / Shortlisted Applicants / Offers Pending / Offers Accepted / Offers Rejected / Rejected Applicants — same shape as § 8.1.1 with one diff: Offers Accepted are the hired W-2 employees, NOT temp contractors.

#### 8.3.2 Draft Direct In-House Jobs (source lines 277-291)

**Job Header:** Primary Occupation · Start Date · End Date · Type (WG Hourly / Standard Hourly) · Onsite/Remote.

> NOTE — the source uses "WG / Standard" terminology for Direct In-House Jobs at line 279, but that's likely a copy-paste error from the contracts section. Direct In-House Jobs are typically W-2 with no WG/Standard distinction. **Flag to Tony for clarification.**

**CTAs:** Copy · Delete Draft.
**Job Summary:** Location (if Onsite) · Initiated Date · About Job · Top Skill · Second Skill · Pay Rates.
**Bottom CTAs:** **Edit Job** · **Submit for Approval**.

#### 8.3.3 Direct In-House Jobs Pending Admin Approval (source lines 293-307)

**Job Header / Summary:** Sent For Approval Date.
**Bottom CTAs:** **Boost This Job**.

#### 8.3.4 Open Direct In-House Jobs (source lines 309-334)

**CTAs:** Copy · Unpublish · Delete (with warning).
**Application Management:** same as § 8.1.4.
**Bottom CTAs:** **Boost This Job**.

#### 8.3.5 Completed / Closed Direct In-House Jobs (source lines 336-351)

**Job Header / Summary:** Completed Date · About Job · Top Skill · Second Skill · Pay Rates.
**Employees Hired (BOTH WG + Standard):** view full profile · **Request This Employee Again**.

---

## 9. ADD PROFESSIONALS TO MY TEAM (source line 354)

**CTA:** "Add Professional to My Team" (top-level surface).

**My Professionals Section (source line 355):** the user manages employees they've added to their team. Manage employee profiles. Timesheet/Expense/Invoice tracking happens via § 7 Work Being Done By Me.

| Field | Owner | Admin |
|---|---|---|
| Employee profile cards | ✓ | ✓ |
| Employee management actions | ✓ | ✓ |
| Bulk import / export | ✓ | ✓ |

---

## 10. MY CALENDAR SECTION (source line 356)

Aggregate calendar view of:
- All ongoing contracts (start/end dates, milestones)
- All upcoming timesheet/expense due dates
- All scheduled requests / applications / offers needing action
- Availability blocks (matches profile availability switch)
- Direct in-house job key dates

| Field | Owner | Admin |
|---|---|---|
| Calendar grid (month / week / day) | ✓ | ✓ |
| Filters (contract type / urgency / role) | ✓ | ✓ |
| Add custom event | ✓ | ✓ |

---

## 11. PROFESSIONALS THAT I HAVE HIRED IN THE PAST (source line 357-358)

Customer-side memory of all contractors ever hired.

| Element | Owner | Admin |
|---|---|---|
| Summary cards of past contractors | ✓ | ✓ |
| **View Full Profile** CTA | ✓ | ✓ |
| **Request This Professional Now** CTA | ✓ | ✓ |

---

## 12. CUSTOMERS THAT HAVE HIRED ME IN THE PAST (source line 360-361)

Pro-side memory of all customers ever worked for.

| Element | Owner | Admin |
|---|---|---|
| Summary cards of past customers | ✓ | ✓ |
| **View Full Profile** CTA | ✓ | ✓ |
| **See Open Work** CTA (if customer has open contracts) | ✓ | ✓ |

---

## 13. PROFILE SECTION (END OF DASHBOARD — source line 363-364)

**Source verbatim:** *"The professional's profile comes at the end of the User's Dashboard. All users have a profile and we are always trying to collect more information on the users so that we can serve them better."*

The user's full profile (per `USER-PROFILE-MASTER.md`) renders inline at the bottom of the dashboard. Lets the user (a) see what others see + (b) jump to edit any section.

| Element | Owner | Admin |
|---|---|---|
| Full profile inline | ✓ (with edit chips per section) | ✓ |
| **Edit Profile** CTA per section | ✓ | ✓ |
| Profile completion meter | ✓ | ✓ |

---

## 14. SEAMLESS FEED TRANSITION (source line 369)

**Source verbatim:** *"At the end of the user dashboard, the user will seamlessly flow into the Feed section of the website."*

After the inline profile, the page continues into the user's Feed (per `FEED-SPEC.md`). Same scroll surface. No hard page break. The Dashboard → Profile → Feed sequence is one continuous scroll experience.

---

## 15. RELATED NOTIFICATIONS (preserve from source line 370)

**Source verbatim:** *"Include any Notifications related to each feature and section. Detail who the notification is to and the wording of the notification."*

Notifications surface in the floating notification bell (top-right) + push notifications (where user opted in). Per-section notifications:

| Section | Trigger | Recipient | Suggested message |
|---|---|---|---|
| Ongoing Contracts | Timesheet due | Contractor | "Your timesheet for [Contract] is due in 24 hours." |
| Ongoing Contracts | Customer approved timesheet | Contractor | "Your timesheet for [Contract] was approved." |
| Ongoing Contracts | Past-due invoice | Customer | "Invoice #[N] is past due." |
| Pending Applications | Customer shortlisted | Contractor | "[Customer] shortlisted you for [Contract]." |
| Pending Applications | Offer received | Contractor | "[Customer] sent you an offer for [Contract]." |
| Open Requests | Direct request received | Contractor | "[Customer] requested you directly for [Contract]." |
| Open Requests | Customer hired me directly | Contractor | "Your direct request from [Customer] is now an active contract." |
| Direct In-House Jobs | Offer received | Job applicant | "[Company] sent you a direct in-house job offer." |
| Draft Contracts (admin reject) | Admin rejects → returns to Draft + note | Customer | "Your contract draft was rejected. Note: [admin note]." |
| Boost This Contract | Boost confirmation | Customer | "Your contract has been boosted for one week." |

**Source line 367 — Admin reject flow:** *"When a contract is rejected by admin, it must go back into the user's Draft Contracts section and they must be given a note."* This is a hard rule for the Draft Contracts section.

---

## 16. CHAT WITH ADMIN (floating, source line 368)

**Source verbatim:** *"The Chat With Admin Comment Bubble is small and floating on the right side of every page."*

| Element | Owner | Admin |
|---|---|---|
| Floating chat bubble (small, right side) | ✓ | ✗ (admin IS admin — no need to chat with self) |
| Open chat panel on click | ✓ | ✗ |

---

## 17. WHAT THE FULL DASHBOARD MOCKUP MUST SHOW

**Tony directive 2026-04-27:** *"two designs, one full profile and one full user dashboard, with every section filled in."*

**Required:** ONE Maria-Lopez dashboard mockup with **every section in §§ 2-16 fully populated**, plus:
- Page header (User Dashboard) + Chat With Admin floating bubble
- First Row: Time Sheets / Expense Reports / Invoices / Purchase Orders cards with count badges
- Second Row: View as Business / Search Work / Search Customers / Edit Profile
- Third Row: Profile summary card with Boost / Share / Availability switch
- Toggle: Work Being Done By Me / Work Being Done For Me — **render BOTH halves populated** (not just default)
- All Contracts sub-sections per § 7 + § 8 (Ongoing / Pending / Shortlisted / Offers Pending / Rejected / Completed) with at least one fixture per sub-section
- Direct In-House Jobs sub-sections (§ 7.3 + § 8.3) populated
- Add Professionals to Team + My Professionals + My Calendar + Past Hires + Past Customers
- Inline Profile section at bottom (cross-references USER-PROFILE-MASTER.md)
- Seamless Feed transition (renders first 3-5 feed cards as preview)

**Fixture data:** populate from existing JSONs (Maria as professional + Acme/Rebecca as customers in Maria's history). For sub-sections without fixture data, render `[FIXTURE NEEDED — <sub-section>]` placeholder + bottom-of-file checklist for Tony to fill. **Do NOT fabricate.**

---

## 18. OPEN QUESTIONS FOR TONY

1. Confirm Direct In-House Job has WG/Standard distinction (§ 8.3.2 source line 279) — or is that a copy-paste error from contracts? Direct W-2 jobs typically have no tier split.
2. Confirm "Less than XX% Remaining" PO threshold (§ 8.1.1) — source uses "XX" placeholder. Default 20%? Configurable per customer?
3. Confirm dashboard renders full inline profile at bottom (§ 13) vs link-to-profile. Source says inline; visual scroll length will be very long.
4. Confirm Feed transition (§ 14) — does the user's personalized feed render right after the dashboard, or just a preview slice with "Open Full Feed" CTA?
5. Confirm "View as Business" toggle (§ 4) — does it switch the entire dashboard view to business-group context (group's work instead of user's work)?
6. "Search Work" + "Search Customers" CTAs — do these open dedicated search pages or in-feed filters?
7. Notifications list (§ 15) — confirm wording per row, or designate Claude Design's drafts as canonical for the mockup with Tony approval pass.

---

## 19. DOCUMENT-AS-YOU-GO

Same rule as `FEED-SPEC.md § 11` and `USER-PROFILE-MASTER.md § 11`. Claude Design extends this spec when sub-sections / fields / CTAs surface during build. Push spec diff alongside dashboard mockup zip. Claude Code commits both verbatim.

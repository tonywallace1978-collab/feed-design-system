# USER-PROFILE-MASTER — Every Section / Every Field / Every CTA / 5-Role Visibility

**Authority:** Tony source doc `bundle/specs/source/USER-PROFILE-FIELDS-SOURCE.txt` (verbatim preserved). This master synthesizes that source + Tony 2026-04-27 directive overrides + the Maria-Pro audit precedent. **Don't remove fields from this list.** Things may have changed since the source — flag drift in commits, never silently strip.

**Tony's structural rule (2026-04-27, verbatim):**

> "Every user profile is exactly the same from professional to customer, it just depends on what information that they have entered."

**One profile skeleton. Role conditional rendering: Pro fills skills + rates + portfolio; Customer fills company + posted contracts + AP contacts; same JSON shape, different fields populated. The mockup must show every section populated as if Maria filled them all.**

---

## 1. THE FIVE ROLES

Same 5-role matrix as `FEED-SPEC.md § 5`. Every section below names per-role visibility + per-role CTAs.

| Role | Code | Defined as |
|---|---|---|
| **Logged-out visitor** | `public` | No account, browsing publicly (e.g. arrived from search engine) |
| **Logged-in visitor** | `visitor` | Authenticated, but no relationship to subject (not connected, not hired, not in same group) |
| **Connection** | `connection` | Authenticated + linked via Connect request accepted |
| **Owner** | `owner` | The user themselves viewing their own profile |
| **Admin** | `admin` | Tony / staff — sees everything + admin tooling |

**Every section table below uses a checkmark grid:** ✓ visible / ✗ hidden / `[masked]` partial. Same convention for CTAs.

---

## 2. PROFILE-WIDE CTA HEADER (top of profile, "spiral center" per Tony 17-item #10)

These CTAs anchor the visual focal zone. Per Tony 2026-04-27 directive #10 *"the most important information stays near the center of the golden ratio"*. Money CTAs go here, NOT buried in left rail.

| CTA | public | visitor | connection | owner | admin | Notes |
|---|---|---|---|---|---|---|
| **Request This Professional** | ✓ (sign-up gate) | ✓ | ✓ | ✗ | ✓ | **HIGHEST PRIORITY MONEY CTA — Tony 17-item #12** |
| **Add to Watch List** | ✓ (sign-up gate) | ✓ | ✓ | ✗ | ✓ | Tony 17-item #13 |
| **Connect** | ✓ (sign-up gate) | ✓ | ✗ (already connected → "Connected ✓" state) | ✗ | ✓ | |
| **Message** | ✗ | ✓ | ✓ | ✗ | ✓ | Connection-gated full message; visitor → request-to-message |
| **Endorse** | ✗ | ✗ | ✓ | ✗ | ✓ | Connection-only |
| **Share** | ✓ | ✓ | ✓ | ✓ | ✓ | Copy link / Text / Email / FB / LI / WhatsApp |
| **Edit Profile** | ✗ | ✗ | ✗ | ✓ | ✓ | Owner-self / Admin-impersonate |
| **Boost My Profile** ($50/wk) | ✗ | ✗ | ✗ | ✓ | ✓ | Tony 17-item #11 — never public |
| **Toggle Availability (Yes/No)** | ✗ | ✗ | ✗ | ✓ | ✓ | Owner switch — green/red, 7-day auto-expire |
| **Admin Actions** | ✗ | ✗ | ✗ | ✗ | ✓ | Suspend / Verify / Note / Impersonate |

**Visual treatment:** Request + Watch + Connect = primary glass buttons (green/amber/indigo gradients per V2 specular crown). Message = secondary. Boost = owner-only secondary. Admin = utility tray, not styled prominently.

---

## 3. SECTIONS (in suggested top-to-bottom order — Tony confirms)

Tony 17-item directives baked in: Availability + Money CTAs near top (#9, #10, #15, #16), Reviews bigger + bolder (#4), Social Media admin+self only (#3), Boost public-hidden (#11), every section pops to fullscreen (#7), badge labels reordered (#8).

### 3.1 Hero / Identity Block (top of profile)

**Source fields** — `Personal Information` § lines 2-28 of `USER-PROFILE-FIELDS-SOURCE.txt`.

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Profile Picture | ✓ | ✓ | ✓ | ✓ | ✓ |
| First Name | ✓ | ✓ | ✓ | ✓ | ✓ |
| Last Name | [initial only] | ✓ | ✓ | ✓ | ✓ |
| Primary Occupation | ✓ | ✓ | ✓ | ✓ | ✓ |
| Email | ✗ | ✗ | [masked, Message CTA instead] | ✓ | ✓ |
| Phone | ✗ | ✗ | ✗ | ✓ | ✓ |
| Citizenship | ✗ | ✗ | ✗ | ✓ | ✓ |
| Short Bio (About Me) | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Availability Status** | ✓ | ✓ | ✓ | ✓ | ✓ | **Tony #9 — prominent, near top, green/red dot + label** |
| Member Since (joined date) | ✓ | ✓ | ✓ | ✓ | ✓ |
| State + Country | ✓ | ✓ | ✓ | ✓ | ✓ |
| City | ✗ | ✓ | ✓ | ✓ | ✓ |

**Popout (click → fullscreen):** large profile picture + full bio prose + member-since timeline + availability calendar widget (next 4 weeks + renew).

**Removed per Tony 17-item #1:** pronouns. No "she/her" or "they/them" labels anywhere. Source doc didn't have a pronouns field; do NOT add one.

### 3.2 Money CTA Card (spiral-center anchor — Tony #10/#15/#16)

This is a **dedicated card** placed visually inside the golden-ratio focal zone. Cluster the highest-revenue CTAs + their context.

| Element | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| **Available Now** banner (if availability=Yes) | ✓ (large) | ✓ (large) | ✓ (large) | ✓ | ✓ |
| **Request This Professional** (primary CTA) | ✓ (sign-up gate) | ✓ | ✓ | ✗ | ✓ |
| **Add to Watch List** (secondary CTA) | ✓ (sign-up gate) | ✓ | ✓ | ✗ | ✓ |
| Pay Rate summary tile | ✓ (Base + WG-premium % only) | ✓ (full Base + OT + Sun/Hol) | ✓ (full) | ✓ | ✓ |
| **Boost My Profile** | ✗ | ✗ | ✗ | ✓ | ✓ |

**Tony directive #15:** *"If the professional is available, that needs to be much more prominent."* The Available Now banner is the largest visual element on the profile when status=Yes. When status=No, banner replaced with smaller "Next available: [date]" line.

### 3.3 Customer Reviews (Tony #4 — bigger + bolder + more visible)

**Source:** `Card View → Customer Reviews popout` lines 399-401.

Source fields preserved: Company Logo · Company Name · Star Rating · Review verbiage. Add: Review date · WG ◇ glyph (when company="[Anonymous]" per anonymity rule, see Maria #16/#20 audit precedent).

| Element | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Average rating tile (large) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Total review count | ✓ | ✓ | ✓ | ✓ | ✓ |
| Latest 3-5 reviews inline | ✓ | ✓ | ✓ | ✓ | ✓ |
| Full review history (popout) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Reviewer company name (non-WG) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Reviewer company name (WG = Anonymous) | [Anonymous] | [Anonymous] | [Anonymous] | [Anonymous] | ✓ (admin sees real) |

**Visual:** large hero treatment per Tony #4. NOT buried below other right-column sections. **Top-third of profile, prominent.**

**Popout (click logo or "View All"):** fullscreen list of every review with company logo + name + star rating + full verbiage + date.

### 3.4 Skills + Manufacturers Section

**Source:** `Professional Information § Top Skill / Second Skill / Other Skills` lines 42-80.

**Field per skill:**
- Skill Name (required for skill entry)
- About Skill (blurb)
- Self Rating (5-circle, half-circle increments)
- Manufacturer (optional)
- Model / Version / Controller (optional)
- Manufacturer Image (auto from manufacturer table OR user upload, admin-approved)

**Slots:** Top Skill (1) · Second Skill (1) · Other Skills (up to 10).

**Popout per skill (click manufacturer logo or skill tile — Tony #7 every-section-fullscreen):** Manufacturer Name · Model/Controller/Version · Years of Experience · Self Rating · Skill Details (full About blurb at large text).

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| All skill fields | ✓ | ✓ | ✓ | ✓ | ✓ |
| Manufacturer Image | ✓ | ✓ | ✓ | ✓ | ✓ |

**Visibility:** all roles. Skills are public credibility signal.

### 3.5 Endorsements

**Source:** `Endorsements` line 118-119. Auto-populated from connections who endorsed for occupations / industries / applications / skills.

**Anonymity rule (source line 426-427):** *"It will show what the user said about them. No names shown."*

| Element | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Endorsement count tile | ✓ | ✓ | ✓ | ✓ | ✓ |
| Endorsers' avatars (mosaic, no names) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Skill tags endorsed | ✓ | ✓ | ✓ | ✓ | ✓ |
| Endorser names | ✗ | ✗ | ✗ | ✓ (own profile) | ✓ |

**Popout:** scrollable list of all endorsers, click avatar → endorser's profile. Per source: *"You will be able to scroll through them and click any of the profile photos to go to that user's profile. It will show what the user said about them. No names shown."*

### 3.6 Work Experience

**Source:** `Professional Experience § Work Experience` lines 82-95 + Card View popout spec lines 402-407.

**Fields per entry:**
- Job Title
- Company Name
- Start Date
- End Date (or "Present")
- Responsibilities
- Company Image / Icon

**Slots:** unlimited entries.

**Popout (click any entry):** Company Logo · Company Name · Primary Occupation · From and To Dates or Current · Responsibilities and Accomplishments Blurb (full text, large).

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| All work history fields | ✓ | ✓ | ✓ | ✓ | ✓ |

### 3.7 Education / Training / Certifications

**Source:** `Professional Experience § Education / Certifications` lines 96-117 + popout spec lines 410-416.

**Education fields per entry:**
- Degree
- Institution
- Graduation Year (per Maria #22 audit precedent: **owner+admin only** — graduation year is age-discrimination proxy on public profile)
- Institution Image / Icon

**Certification fields per entry:**
- Certification Name
- Issuing Organization
- Issue Date
- Expiry Date (optional)
- Certification Image / Icon

**Popout (click any entry):** School/Org Icon · Name · Degree or Certificate Name · Year of Completion · Specialization · Comments.

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Degree / Cert Name | ✓ | ✓ | ✓ | ✓ | ✓ |
| Institution / Issuing Org | ✓ | ✓ | ✓ | ✓ | ✓ |
| Graduation Year | ✗ | ✗ | ✗ | ✓ | ✓ |
| Issue Date / Expiry Date | ✓ | ✓ | ✓ | ✓ | ✓ |
| Cert renewal warnings (chip) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Logo / Icon | ✓ | ✓ | ✓ | ✓ | ✓ |

**Note:** Maria audit deviation #22 stripped graduation year + GPA + honors from public view. This rule formalizes that.

### 3.8 Industries Served

**Source:** `Industries Served` line 230 + popout spec lines 417-421.

**Fields per industry:**
- Industry Name
- Industry Logo (use standard icons until industry logos exist)
- Self Rating (5-circle, half increments)
- Blurb: experience, abilities, accomplishments in this industry

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| All industry fields | ✓ | ✓ | ✓ | ✓ | ✓ |

**Popout:** Industry Logo · Industry Name · Self Rating · Full Blurb at large text.

### 3.9 Languages Spoken

**Source:** lines 27-28.

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Languages list | ✓ | ✓ | ✓ | ✓ | ✓ |

**Popout (Tony 2026-04-27 #7 OVERRIDES source's "No Pop Out"):** fullscreen list of languages + proficiency level (if entered) at large text.

### 3.10 Pictures / Videos / Media Gallery

**Source:** popout spec lines 423-424.

**Fields per item:**
- Image OR video link (videos = hyperlinks to video, optional thumbnail)
- Description blurb

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Media gallery (all entries) | ✓ | ✓ | ✓ | ✓ | ✓ |

**Popout:** fullscreen gallery, lightbox per item with description blurb at large text.

### 3.11 Facilities Worked At

**Source:** popout spec lines 428-433.

**Fields per facility:**
- Company Logo
- Company Name
- Location
- From and To dates (or Current)
- Comments

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| All facility fields | ✓ | ✓ | ✓ | ✓ | ✓ |

**Popout:** Company Logo · Name · Location · Dates · Comments at fullscreen.

### 3.12 References

**Source:** `References` lines 141-153.

**Fields per reference:**
- Reference Name
- Relationship
- Phone Number
- Email
- Reference Letter (uploadable)

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Reference name | ✗ | ✗ | ✗ | ✓ | ✓ |
| Relationship | ✗ | ✗ | ✗ | ✓ | ✓ |
| Phone / Email | ✗ | ✗ | ✗ | ✓ | ✓ |
| Reference Letter (download) | ✗ | ✗ | ✗ | ✓ | ✓ |

**Visibility rule:** references = pre-engagement vetting material. NOT public — same posture-leak class as Maria audit #29 (Key Contacts doxxing). Owner sees own; admin sees all.

### 3.13 Interview Questions (8 Yes/No — source lines 318-333)

**Source has 8 questions verbatim:**

1. Willing to work more than 60 miles from home (Yes/No)
2. I am willing to take emergency contracts (Yes/No)
3. I have a work VISA that allows me to work legally in the US (Yes/No)
4. I require VISA sponsorship from a US Company (Yes/No)
5. I have a Valid Passport (Yes/No)
6. I am willing to work nights and afternoon shifts (Yes/No)
7. I am willing to work Saturdays (Yes/No)
8. I am willing to work Sundays (Yes/No)

| Element | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Q&A list (when entered) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Q&A empty state | "Interview questions not yet on file." | (same) | (same) | "Add your interview answers" CTA | (same + admin-edit) |

**Tony 2026-04-27 #7 OVERRIDES source's "No Pop Out Needed":** Q&A pops to fullscreen on tap. Larger text.

**Tony 17-item #17:** every section must be populated in the example mockup. Maria's interview answers must be filled in `professional-data.js` as canonical fixture data — flag to Tony if missing.

### 3.14 Pay Rate Card

**Source:** `Financial Information § Pay Rate` lines 121-130.

**Fields:**
- Base Rate (0-40 hrs)
- Overtime Rate (41+ hrs)
- Sunday and Holiday Rate
- Flat Rate (all-inclusive, no overtime)

Plus from Maria audit #10/#24 lessons: WG premium % (separate from hourly), Emergency rate, Remote rate.

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Base Rate | ✓ ("from $X" with starting rate only) | ✓ (full) | ✓ (full) | ✓ | ✓ |
| Overtime Rate | ✗ (dashed) | ✓ | ✓ | ✓ | ✓ |
| Sun / Holiday Rate | ✗ | ✓ | ✓ | ✓ | ✓ |
| Flat Rate | ✗ | ✓ | ✓ | ✓ | ✓ |
| WG Premium % | ✓ | ✓ | ✓ | ✓ | ✓ |
| Emergency / Remote | ✗ | ✓ | ✓ | ✓ | ✓ |
| Salary Band (annual range) | ✗ | ✗ | ✗ | ✓ | ✓ | **Maria #24: salary band is posture-leak on public surface** |

**Tony directive override:** Pay Rate card sits in spiral-center cluster alongside Request CTA + Availability (per Tony #10/#16). NOT buried elsewhere.

### 3.15 Secure Personal Files (owner + admin)

**Source:** `Secure Personal Files` lines 154-171.

**Files:**
- Resume (upload/download)
- Background Check (upload/download)
- Drug Test (upload/download)
- Photo ID (upload/download)
- W9 / W-8BEN / W-8BEN-E forms
- Certificate of Insurance (with validity dates + renewal notifications)

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| File presence indicators (✓/missing) | ✗ | ✗ | ✗ | ✓ | ✓ |
| File download | ✗ | ✗ | ✗ | ✓ | ✓ |
| Renewal warnings (chip) | ✗ | ✗ | ✗ | ✓ | ✓ |

Per Maria audit #19 (highest-impact deviation): expired-cert / missing-file states must derive from `expires_at` vs today + sort missing→expired→pending→uploaded so issues bubble to top.

### 3.16 Banking Info (admin only)

**Source:** `Banking Information` lines 131-140.

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Bank Name | ✗ | ✗ | ✗ | ✗ | ✓ |
| Routing # | ✗ | ✗ | ✗ | ✗ | [masked except last 4] |
| Account # | ✗ | ✗ | ✗ | ✗ | [masked except last 4] |
| Account Name | ✗ | ✗ | ✗ | ✗ | ✓ |

**Source verbatim:** *"Admin Only, Optional Until Engagement in White Glove Contract"* — even owner doesn't see banking inline; reveal via re-auth (Maria popout #20b pattern).

### 3.17 Social Media Links (admin + owner only — Tony #3)

**Source:** `Professional Social Media Information` lines 172-182. Source says *"Admin Only, Optional"*.

**Tony 2026-04-27 #3 OVERRIDE:** *"Remove the fucking social media from the public view, admin and the user themselves only."* — owner sees own + admin sees all, NOT public, NOT visitor, NOT connection.

| Platform | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| LinkedIn / YouTube / Facebook / Instagram / Twitter | ✗ | ✗ | ✗ | ✓ | ✓ |

### 3.18 Personal Info Card (owner + admin) — Citizenship / Emergency Contact

**Source:** lines 17-26.

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Citizenship | ✗ | ✗ | ✗ | ✓ | ✓ |
| Emergency Contact Name | ✗ | ✗ | ✗ | ✓ | ✓ |
| Emergency Contact Phone | ✗ | ✗ | ✗ | ✓ | ✓ |
| Emergency Contact Relationship | ✗ | ✗ | ✗ | ✓ | ✓ |

Per source: Emergency Contact = *"Optional Until Engagement in White Glove Contract"*.

### 3.19 Company Information (only renders if user has company affiliation — same skeleton applies to Customer/Company users)

**Source:** `Company Information` lines 183-247.

**Fields:**
- Company Name (NOT shown to public until engaged in work together — source line 184)
- Company Address
- Company Phone
- Company Email
- Business Classification (Independent Contractor / Service Company / Systems Integrator / Part Supplier / OEM / Staffing Company / Recruiter / Other)
- Company Website
- Company Social Media (LinkedIn / YouTube / Facebook / Instagram / Twitter — admin-only export)
- Industries Served (multi)
- Other Business Locations (admin-only, multi: Facility Name / Country / Street / City / Contact Name / Email / Phone)

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Company Name | ✗ (until engaged) | [masked / "Confidential Company"] | ✓ (if engaged) | ✓ | ✓ |
| Company Address | ✗ | ✗ | ✓ (if engaged) | ✓ | ✓ |
| Company Phone / Email | ✗ | ✗ | ✓ (if engaged) | ✓ | ✓ |
| Business Classification | ✓ | ✓ | ✓ | ✓ | ✓ |
| Company Website | ✓ | ✓ | ✓ | ✓ | ✓ |
| Company Social Media | ✗ | ✗ | ✗ | ✓ | ✓ |
| Industries Served | ✓ | ✓ | ✓ | ✓ | ✓ |
| Other Business Locations | ✗ | ✗ | ✗ | ✗ | ✓ |

### 3.20 Products Offered

**Source:** `Products Offered` lines 208-219. Admin needs sort/filter/export.

**Fields per product:**
- Product Name
- Product Description
- Price
- SKU (optional)
- Image (optional)

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| All product fields | ✓ | ✓ | ✓ | ✓ | ✓ |

**CTA per product:** "Turn Into Paid Ad" (owner + admin only — sets budget + duration; source lines 335-339).

### 3.21 Services Offered

**Source:** `Services Offered` lines 220-229.

**Fields per service:**
- Service Name
- Service Description
- Hourly Rate
- Image (optional)

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| All service fields | ✓ | ✓ | ✓ | ✓ | ✓ |

**CTA per service:** "Turn Into Paid Ad" (owner + admin only).

### 3.22 Business Group Affiliation

**Source:** `Business Group (Shared)` lines 248-262.

**Fields:**
- Group Name (admin only on user profile — group is its own entity with own page)
- Group Members (admin only — multi: Member Name / Role / Email)
- Shared Data scope (Contracts / Job Postings / Timesheets / Expense Reports / Employee Profiles)
- Permissions (View Only / Edit / Admin)

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Group Name | ✓ (link to group page) | ✓ | ✓ | ✓ | ✓ |
| Group Members list | ✗ | ✗ | ✓ (if same group) | ✗ | ✓ |
| Shared Data scope | ✗ | ✗ | ✗ | ✓ (own membership) | ✓ |
| Permissions | ✗ | ✗ | ✗ | ✓ (own) | ✓ |

### 3.23 Company Accounting Contacts (admin only)

**Source:** `Company Accounting Contacts` lines 263-295.

**Fields per contact (4 contact roles):**
- Accounts Payable (mandatory if Company Name exists): Name / Email / Phone
- Accounts Receivable (optional): Name / Email / Phone
- Marketing (optional): Name / Email / Phone
- Human Resources (optional): Name / Email / Phone

| Field | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| All accounting contact fields | ✗ | ✗ | ✗ | ✗ | ✓ |

Per source: *"Admin Only"*. Per Maria audit #29 doxxing precedent: even owner doesn't see direct emails/phones of internal team inline; admin only.

### 3.24 Boost / Promote Section (owner + admin)

**Source:** `Boosting Profiles` lines 340-343 + `Turning Products/Services into Paid Ads` lines 335-339.

| CTA | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| Boost My Profile ($50/wk) | ✗ | ✗ | ✗ | ✓ | ✓ |
| Turn Product/Service into Paid Ad | ✗ | ✗ | ✗ | ✓ | ✓ |
| Boost analytics (impressions, etc.) | ✗ | ✗ | ✗ | ✓ | ✓ |

Per Tony #11: **NEVER public**. Visitors don't pay to boost someone else's profile.

---

## 4. CARD VIEW (the profile-as-card surface in the Feed)

**Source:** `Card View` lines 370-386.

**Fields shown in card:**
- Profile Picture
- First Name + Last Name (last name initial only for public)
- Primary Occupation
- Top Skill
- Second Skill
- About Me Blurb (truncated)
- Availability Status

**Card-level CTAs (Tony 17-item additions: Add to Watch List + Request first):**

| CTA | public | visitor | connection | owner | admin |
|---|---|---|---|---|---|
| **Request This Professional** | ✓ (sign-up gate) | ✓ | ✓ | ✗ | ✓ |
| **Add to Watch List** | ✓ (sign-up gate) | ✓ | ✓ | ✗ | ✓ |
| Connect | ✓ (sign-up gate) | ✓ | [Connected ✓] | ✗ | ✓ |
| Message | ✗ | ✓ | ✓ | ✗ | ✓ |
| Endorse | ✗ | ✗ | ✓ | ✗ | ✓ |
| View Profile | ✓ | ✓ | ✓ | ✓ | ✓ |
| Share | ✓ | ✓ | ✓ | ✓ | ✓ |

**Card tap → fullscreen popout** (Tony #7) showing the FULL profile sections all at once.

---

## 5. UNIVERSAL POPOUT BEHAVIOR (Tony 2026-04-27 #7 — OVERRIDES source-doc per-section popout notes)

Source has per-section popout specs (some marked "No Pop Out Needed"). Tony 2026-04-27 verbatim:

> "Nothing pops out to a full screen, yet everything will pop out to a full screen, everything, every section. Full Screen. EVERY SECTION pops out to a full screen with larger texts when clicked."

**Universal rule:** every section card on the profile is tappable → fullscreen overlay with larger text + every field for that section. Source-doc "No Pop Out" notes for Interview Questions / Languages are **overridden by Tony 2026-04-27** — those sections also pop out.

**Reuse:** Maria Pro v2 popout pattern. Common fullscreen chrome: ESC closes, click-outside closes, swipe-down closes (mobile), animation 200ms cubic-bezier glass.

---

## 6. RELATED NOTIFICATIONS (preserve from source — design surface for these)

Source lines 347-362:

| Notification | Recipient | Frequency | Message |
|---|---|---|---|
| Profile Completion Reminder | User | Weekly until complete | "Complete your profile to increase your chances of getting hired!" |
| Availability Expiry Reminder | User | 1 day before expiry | "Your availability status is about to expire. Renew it to stay visible to potential clients." |
| Ad Creation Confirmation | User | Immediate | "Your product/service ad has been created and is now live." |
| Profile Boost Confirmation | User | Immediate | "Your profile has been boosted for one week and will receive increased exposure." |

---

## 7. PROFILE FLOWS (preserve from source lines 297-316 — design surface for these)

- **Creating a Profile:** registration → 2FA via SMS → complete profile (personal/professional/financial) → upload secure files
- **Editing a Profile:** profile settings → edit field → save (sensitive changes require 2FA)
- **Profile Completion:** prompt incomplete fields when posting jobs / applying contracts; weekly notification when incomplete
- **Availability Management:** mark Yes/No → 7-day auto-expire → renewal notification 1 day before expiry
- **Deleting a Profile:** multiple confirmations + warning *"Are you sure you want to permanently delete your profile? This action cannot be undone."*

---

## 8. SUGGESTED ENHANCEMENTS (source lines 363-369 — design these into the mockup)

1. **Profile Analytics** (owner + admin) — view counts per section + visibility-improvement tips
2. **Endorsements** (already in § 3.5) — covered
3. **Profile Badges** — for completing sections / receiving feedback / milestones — see Tony #8 (badge labeling: subject line 1, tier word line 2)

---

## 9. WHAT THE FULL PROFILE MOCKUP MUST SHOW

**Tony directive 2026-04-27:** *"I want two designs, one full profile and one full user dashboard, with every section filled in from claude design."*

**Required:** ONE Maria-Lopez profile mockup with **every section in § 3 fully populated**, plus:
- 5-role toggle bar at top (mirrors Maria/Rebecca v1+v2 pattern)
- Tap → fullscreen popout for every section (Tony #7)
- Money CTAs in spiral-center cluster (Tony #10/#15/#16)
- Reviews bigger + bolder + top-third (Tony #4)
- Boost owner-only (Tony #11)
- Social media owner+admin only (Tony #3)
- Availability prominent near top (Tony #9)
- Badge labels: subject line 1 / tier line 2 (Tony #8)
- No pronouns (Tony #1)
- No left-column overrun (Tony #6)
- No column-scroll asymmetry (Tony #5)

**Fixture data:** all populated from `data/professional-data.js` (Maria) — flag any field with no data as `[FIXTURE NEEDED — <section>]` per FEED-SPEC.md § 7 rule. Do NOT fabricate.

---

## 10. OPEN QUESTIONS FOR TONY

1. Confirm 5-role visibility matrix per § 3 (each table). Override per cell as needed.
2. Confirm spiral-center cluster contains: Available Now banner + Request CTA + Watch CTA + Pay Rate card + (owner) Boost. Strike/add per visual.
3. Confirm top-to-bottom section order in § 3 (Hero / Money / Reviews / Skills / Endorsements / Work Exp / Edu / Industries / Languages / Media / Facilities / References / Interview Q / Pay Rate / Secure Files / Banking / Social Media / Personal / Company / Products / Services / BG / Accounting / Boost). Reorder per visual hierarchy.
4. Card View CTAs: 7 total per role (Request / Watch / Connect / Message / Endorse / View / Share). Confirm or trim.
5. Anonymity rules: WG reviewer = "[Anonymous]" verbatim, endorser names hidden in popout. Confirm extends.
6. Graduation Year visibility (§ 3.7): owner+admin only per Maria audit #22. Confirm or restore public.
7. Salary Band visibility (§ 3.14): owner+admin only per Maria audit #24. Confirm.

---

## 11. DOCUMENT-AS-YOU-GO

Same rule as `FEED-SPEC.md § 11`. Claude Design extends this spec when:
- New field surfaces during build → add row to relevant § 3.x table
- Visibility rule clarifies → update the cell
- New popout behavior emerges → add to § 5
- Tony answers an open question → strike from § 10

Push the spec diff alongside the profile mockup zip. Claude Code commits both verbatim.

# Professional Profile — Wizard Field Categorization

**Source bundle:** `reference/claude-design-bundles/professional-maria-lopez/data/professional.json`
**Schema version:** `2.0 — exhaustive arrays`
**Purpose:** Map every key in the canonical professional fixture into one of four buckets so the Pro Profile wizard collects only **creation-time** fields. Computed/post-creation/admin fields render on the profile but are never wizard inputs.

**Rule 9 reminder:** if a field exposes posture, contractual leverage, or non-public identity data, it must be wizard-collected privately (owner-only or admin-only on render) — not visitor-visible. Posture leaks flagged inline.

---

## Bucket legend

| Bucket | Definition | Wizard role |
|---|---|---|
| **CT** Creation-time | User must enter at signup or first profile completion | **Wizard collects.** Required or optional, but always user-input. |
| **CP** Computed | Platform derives from other data; user cannot set | **Wizard never shows.** Auto-populated on submit/render. |
| **PC** Post-creation | Accrues through platform usage (contracts, reviews, endorsements, badges) | **Wizard never shows.** Empty/zero on first creation. |
| **AD** Admin-only | Trust/safety/compliance, set by admin or KYC pipeline | **Wizard never shows.** Separate admin/onboarding pipeline. |
| **SY** System | UUID, timestamps, internal IDs | **Wizard never shows.** Auto-generated on submit. |

---

## Top-level identity

| Key | Bucket | Notes |
|---|---|---|
| `$schema` / `$source` / `$rendered_for` / `$version` / `$last_updated` | SY | Bundle metadata, not user data |
| `user_id` | SY | Auto-assigned |
| `user_uuid` | SY | Auto-generated ULID |
| `username` | **CT** | User chooses. Validate uniqueness. |
| `user_type` | SY | Always `"Contractor"` for this wizard. Set by entry point. |
| `approval_status` | AD | Starts `"Pending"` → admin promotes to `"Approved"` |
| `is_enabled` | AD | Defaults `1`, admin can disable |
| `is_email_verified` | CP | Computed from email-verification flow (separate microflow inside wizard or post-submit) |
| `is_phone_verified` | CP | Computed from SMS-verification flow |
| `is_id_verified` | AD | KYC pipeline (separate wizard, queued post-scope) |
| `is_w9_on_file` | CP | True when W-9 uploaded via Secure Files (post-creation) |
| `is_coi_on_file` | CP | True when COI uploaded via Secure Files (post-creation) |
| `two_factor_enabled` | **CT** | Optional setup step; default off, user can enable in wizard |
| `created_at` | SY | `Date.now()` on submit |
| `last_active_at` | SY | Updated on every login |
| `tenure_years` | CP | Derived from `created_at` |
| `membership_tier` | AD | Starts `"Standard"` → admin/system promotes (`"Plus"`, `"White Glove"`) |

---

## `header` block

| Key | Bucket | Notes |
|---|---|---|
| `first_name` | **CT** | Required |
| `middle_initial` | **CT** | Optional |
| `last_name` | **CT** | Required |
| `display_name` | CP | Auto-compose `first_name + " " + last_name`; user can override in wizard step |
| `preferred_pronouns` | **CT** | Optional dropdown (she/her, he/him, they/them, custom, none) |
| `headline` | CP | Auto-compose from `primary_occupation + " · " + tenure + " · " + city` (Maria's reads "Senior Controls Engineer · 9 yrs · Detroit, MI"). User can override. |
| `primary_occupation` | **CT** | Required. Picker from platform occupation taxonomy. |
| `primary_occupation_id` | CP | Resolved from `primary_occupation` selection |
| `additional_occupations` | **CT** | Optional. Multi-select from same taxonomy, max 4. |
| `occupation_tier_label` | CP | Computed from skills + ratings + percentile ("Top 1% — Industrial Automation"). **Empty on first creation.** |
| `tagline` | **CT** | Optional textarea, ~200 char. The personality field. |

---

## `photo` block

| Key | Bucket | Notes |
|---|---|---|
| `main_url` | **CT** | Required upload step. Wizard provides cropper to 144px square. |
| `main_url_TODO` | SY | Internal note, drop on real submit |
| `main_size_px` | SY | Always 144 per spec (#21 deviation locked this) |
| `verified_check` | AD | KYC sets to true post-ID-verification |
| `tier_glow_color` | CP | Derived from `tier` |
| `tier` | CP | Derived from highest badge tier in `badges_earned` (Maria has Diamond) |

---

## `location` block

| Key | Bucket | Notes |
|---|---|---|
| `city` | **CT** | Required |
| `state` | **CT** | Required (US state picker) |
| `state_full` | CP | Resolved from `state` |
| `country` | **CT** | Required dropdown, default "United States" |
| `country_iso` | CP | Resolved from `country` |
| `country_flag_svg` | CP | Resolved from `country_iso` (flagcdn.com URL) |
| `postal_code` | **CT** | Required |
| `lat` | CP | Geocoded from `city + state + postal_code` (Mapbox geocoding API per #20) |
| `lng` | CP | Geocoded |
| `service_radius_miles` | **CT** | Slider, 0–500 default 250. Optional. |
| `willing_to_travel` | **CT** | Boolean, default true |
| `travel_notes` | **CT** | Optional, ~140 char |

---

## `social_links` array

**Bucket: CT (all)** — Optional. Wizard step shows 5 platform slots (linkedin / github / youtube / x / website) with URL inputs. `icon` field is CP, resolved from `platform`.

---

## `quick_stats` block

**Bucket: PC (entire block)** — All zeros on creation. Populated as the user accumulates contracts, reviews, endorsements, connections, billings.

| Key | Initial value |
|---|---|
| `years_experience` | **CT** override allowed (Maria: 9 — based on first job, not platform tenure) |
| `rating_avg` | `0` (no reviews yet) |
| `rating_count` | `0` |
| `completed_contracts` | `0` |
| `active_contracts` | `0` |
| `endorsements_count` | `0` |
| `connections_count` | `0` |
| `connections_growth_30d` | `0` |
| `connections_growth_quarter` | `0` |
| `lifetime_billings_usd` | `0` |
| `profile_strength_pct` | CP — computed from wizard completion % at submit |

**Posture note:** `years_experience` is the one CT field in this otherwise PC block — it's a self-reported career length, not platform tenure. Wizard collects as a number input.

---

## `rates` block

| Key | Bucket | Notes |
|---|---|---|
| `hourly_default` | **CT** | Required. Number input, USD/hr. |
| `hourly_emergency` | **CT** | Optional. If blank, default to `hourly_default × 1.3` (Maria's is 1.31×). |
| `hourly_remote` | **CT** | Optional. Default to `hourly_default × 0.85` (Maria's is 0.84×). |
| `white_glove_premium_pct` | **CT** | Optional. Number input, default 35. Only shown if user opts into White Glove eligibility. |
| `salary_band_min` / `salary_band_max` / `salary_band_currency` | **CT** | **⚠ Posture-leak per #24.** Wizard collects but renders **owner-only** on profile. Render-side scope was stripped in #24; wizard still captures for FTE-conversion conversations. |
| `rate_negotiable` | **CT** | **⚠ Posture-leak per #24.** Wizard collects, owner-only render. |
| `minimum_engagement_hours` | **CT** | **⚠ Posture-leak per #24.** Wizard collects, owner-only render. |
| `preferred_engagement` | **CT** | **⚠ Posture-leak per #24.** Wizard collects, owner-only render. Free-text or dropdown ("4-6 weeks onsite", "ongoing", "short-burst"). |
| `currency` | **CT** | Dropdown, default USD |

**Wizard treatment for posture-leak fields:** Single rates step splits into two visual sections — "**Public rates**" (4 tile values) and "**Private negotiating posture**" (band, negotiable, engagement) with explicit copy: *"Only you and admins see these. Visitors never do."* Same disclosure pattern as Private Info on the rendered profile.

---

## `availability` block

| Key | Bucket | Notes |
|---|---|---|
| `status` | **CT** | Dropdown ("Available Now" / "Booked" / "Limited" / "On Vacation") |
| `status_color` | CP | Resolved from `status` |
| `next_available_date` | **CT** | Date picker, optional |
| `weekly_capacity_hours` | **CT** | Slider 0–60, default 40 |
| `willing_overtime` | **CT** | Boolean |
| `willing_weekends` | **CT** | Boolean |
| `willing_nightshift` | **CT** | Boolean |
| `calendar_url` | **CT** | Optional URL (cal.com, Calendly) |

---

## `ctas_visitor` / `ctas_owner` arrays

**Bucket: CP (entire blocks)** — Templated by user_type. All Contractors get the same CTA set; admin can override per-user but wizard never collects.

---

## `business_affiliation` block

**Bucket: CT (entire block)** — Optional. Wizard step asks "Are you affiliated with a company / system integrator?" If yes, picker from platform's company directory + role + rate-through-company + rate-independent.

| Key | Bucket | Notes |
|---|---|---|
| `type` | **CT** | "employer" / "subcontractor" / "partner" |
| `company_id` | CP | Resolved from picker |
| `company_name` | CP | Resolved |
| `company_role` | **CT** | Free-text role title |
| `company_logo` / `company_address` / `company_phone` / `company_email` / `company_classification` | CP | Resolved from company directory record |
| `joined_at` | **CT** | Date picker |
| `active` | **CT** | Boolean |
| `weekly_committed_hours` | **CT** | Number |
| `rate_through_company` | **CT** | Number |
| `rate_independent` | **CT** | **⚠ Posture-leak per #20.** Wizard collects, owner-only render. |

---

## `business_groups` array

**Bucket: PC (entire array)** — Empty on creation. User joins groups post-signup via separate Group join flow. Wizard does not collect.

---

## `secure_files` block

**Bucket: PC (entire block, owner-only visibility)** — Empty on creation. Files uploaded via separate Secure Files popout (audited as #19) post-signup. **Optional inline upload step in wizard** — wizard *can* prompt for W-9 / COI / DL during creation as a convenience, but those uploads flow through the same secure-files pipeline.

Recommend: wizard skips file uploads in v1 scope, defers to post-signup secure-files popout. Tony product call.

---

## `private_info` block (owner-only)

**Bucket: CT (entire block, but owner-only visibility on render)** — Wizard collects all 10 fields:

| Key | Bucket | Notes |
|---|---|---|
| `Phone` | **CT** | Required (also drives `is_phone_verified` flow) |
| `Personal email` | **CT** | Required (also drives `is_email_verified` flow) |
| `Address` | **CT** | Required, masked on render |
| `DOB` | **CT** | Required, masked on render |
| `SSN (last 4)` | **CT** | Required for 1099, masked on render |
| `Tax classification` | **CT** | Dropdown ("1099 Independent Contractor" / "W-2" / "Corp-to-Corp") |
| `Bank routing` | **CT** | Optional in wizard, can defer to first-payment flow |
| `Bank account` | **CT** | Optional in wizard, can defer to first-payment flow |
| `Emergency contact` | **CT** | Required for onsite work eligibility |
| `Backup contact` | **CT** | Optional |

**Wizard treatment:** Dedicated step with explicit privacy disclosure. Same `[demo]` chip from popout precedent — wizard demonstrates collection, doesn't actually persist sensitive fields in v1.

---

## `badges_earned` array

**Bucket: PC (entire array)** — Empty on creation. Badges earned through accumulated platform activity (per BADGE-THRESHOLDS.md). Wizard does not collect.

---

## `skills_certified` array

**Bucket: CT (per-skill)** — Wizard collects skill manufacturers, models, years, certifications. **Posture-leak fields:**

| Key | Bucket | Notes |
|---|---|---|
| `id` | CP | Slug from `manufacturer` |
| `manufacturer` | **CT** | Picker from platform manufacturer taxonomy (Siemens, Rockwell, FANUC, ABB, Cognex, KUKA, Keyence, etc.) |
| `logo` | CP | Resolved from manufacturer |
| `models` | **CT** | Free-text (Maria's: "S7-1200, S7-1500, TIA Portal V18, …") |
| `years` | **CT** | Number input |
| `rating` | PC | Computed from reviews mentioning this skill. **Empty on first creation.** |
| `endorsements` | PC | Computed from `endorsements` array filtered by skill. **Empty on first creation.** |
| `certifications` | **CT** | Multi-line text, list of certs for this manufacturer |
| `primary` | **CT** | Boolean — is this a primary skill? Max 3 primary. |

**Wizard step:** Dynamic add-skills repeater. Min 1, max 10.

---

## `certifications` array

**Bucket: CT (per-cert)** — Wizard collects.

| Key | Bucket | Notes |
|---|---|---|
| `id` | CP | Slug from `name` |
| `name` | **CT** | Required free-text |
| `issuer` | **CT** | Required, free-text or picker |
| `issued` | **CT** | Date picker |
| `expires` | **CT** | Date picker, nullable |
| `credential_id` | **CT** | Optional free-text |
| `verify_url` | **CT** | Optional URL |
| `renewal_due_soon` | CP | Computed from `expires` vs today (per #17 bundle inconsistency log — should be derived, not stored) |

**Wizard step:** Dynamic add-certs repeater. Optional, min 0, max 20.

---

## `education` array

**Bucket: CT (per-entry)** — Wizard collects.

| Key | Bucket | Notes |
|---|---|---|
| `school` | **CT** | Required |
| `school_logo` | CP | Resolved from school directory if available, else null |
| `degree` | **CT** | Required |
| `concentration` | **CT** | Optional |
| `graduated_year` | **CT** | **⚠ Posture-leak per #22.** Wizard collects, owner-only render (or admin-only — Tony product call). |
| `gpa` | **CT** | **⚠ Posture-leak per #22.** Wizard collects, owner-only render. |
| `honors` | **CT** | **⚠ Posture-leak per #22.** Wizard collects, owner-only render. |
| `city` | **CT** | Optional, render-stripped per #22 |

**Wizard step:** Dynamic add-education repeater. Min 0, max 5.

---

## `languages` array

**Bucket: CT (entire array)** — Wizard collects.

| Key | Bucket | Notes |
|---|---|---|
| `name` | **CT** | Picker from ISO 639 language list |
| `proficiency` | **CT** | Dropdown (Native / Fluent / Conversational / Basic) |

---

## `equipment_owned` array

**Bucket: CT (entire array)** — Wizard collects.

| Key | Bucket | Notes |
|---|---|---|
| `category` | **CT** | Dropdown (Laptop / PLC-HMI / Test gear / Software / Vehicle / PPE / Tools / Other) |
| `items` | **CT** | Free-text array, one per line |

**Wizard step:** Dynamic category-with-items repeater. Optional.

---

## `experience` array

**Bucket: CT (per-entry)** — Wizard collects.

| Key | Bucket | Notes |
|---|---|---|
| `id` | CP | Auto-generated |
| `company` | **CT** | Required |
| `company_logo` | CP | Resolved from company directory if available |
| `role` | **CT** | Required |
| `start` | **CT** | Date picker |
| `end` | **CT** | Date picker, null if current |
| `current` | **CT** | Boolean |
| `duration_months` | CP | Computed from `start` and `end` |
| `city` | **CT** | Optional |
| `description` | **CT** | Required textarea |
| `highlights` | **CT** | Optional bullet list, max 5 |

**Wizard step:** Dynamic add-experience repeater. Min 1, max 10.

---

## `completed_contracts` array

**Bucket: PC (entire array)** — Empty on creation. Populated as user completes contracts on platform. Wizard does not collect.

---

## `reviews_received` array

**Bucket: PC (entire array)** — Empty on creation. Wizard does not collect.

---

## `endorsements` array

**Bucket: PC (entire array)** — Empty on creation. Earned through peer endorsement post-signup. Wizard does not collect.

---

## `portfolio_links` array

**Bucket: CT (entire array)** — Wizard collects.

| Key | Bucket | Notes |
|---|---|---|
| `title` | **CT** | Required |
| `url` | **CT** | Required URL |
| `kind` | **CT** | Dropdown (video / code / talk / doc) |

**Wizard step:** Dynamic add-portfolio repeater. Optional, min 0, max 10.

---

## `active_application` block (owner-only)

**Bucket: PC (entire block)** — Empty on creation. Populated when user applies to a contract. Wizard does not collect.

---

## `watchers` block (owner-only)

**Bucket: PC (entire block)** — Empty on creation. Populated as customers/companies watch the profile. Wizard does not collect.

---

## `admin_notes` block (admin-only)

**Bucket: AD (entire block)** — Admin sets post-signup. Wizard does not collect.

---

# Wizard scope summary

**Steps the wizard must collect (CT fields):**

| # | Step | Required | Optional |
|---|---|---|---|
| 1 | Account basics | username, email, phone | 2FA setup |
| 2 | Identity | first_name, middle_initial, last_name, preferred_pronouns | display_name override |
| 3 | Photo | main_url upload + 144px crop | — |
| 4 | Headline | primary_occupation, additional_occupations | tagline, headline override |
| 5 | Location | city, state, postal_code, country | service_radius_miles, willing_to_travel, travel_notes |
| 6 | Rates (public) | hourly_default | hourly_emergency, hourly_remote, white_glove_premium_pct, currency |
| 7 | Rates (private posture) | — | salary_band_min/max, rate_negotiable, minimum_engagement_hours, preferred_engagement |
| 8 | Availability | status | next_available_date, weekly_capacity_hours, willing_overtime/weekends/nightshift, calendar_url |
| 9 | Years experience | years_experience | — |
| 10 | Skills | min 1 skill (manufacturer, models, years, primary?) | certifications-per-skill, more skills up to 10 |
| 11 | Certifications | — | name, issuer, dates, credential_id, verify_url (max 20) |
| 12 | Education | — | school, degree, concentration, dates, gpa, honors (max 5) |
| 13 | Languages | min 1 language | proficiency, more languages |
| 14 | Equipment | — | category-with-items repeater |
| 15 | Experience | min 1 experience entry | role, dates, description, highlights (max 10) |
| 16 | Portfolio | — | title, url, kind (max 10) |
| 17 | Social links | — | linkedin, github, youtube, x, website |
| 18 | Business affiliation | — | company picker, role, rates |
| 19 | Private info | phone, email, address, DOB, SSN-last-4, tax classification, emergency contact | bank routing/account, backup contact |
| 20 | Review & submit | preview rendered profile | edit any prior step |

**Total: 20 steps.** Required-only fast-path: ~10 steps (skip optional sections).

**Posture-leak fields needing explicit privacy disclosure:**
- Step 7 (private rates posture) — `salary_band`, `rate_negotiable`, `minimum_engagement_hours`, `preferred_engagement`
- Step 12 (education) — `graduated_year`, `gpa`, `honors`
- Step 18 (business affiliation) — `rate_independent`
- Step 19 (private info) — entire step

**Out of scope for v1 wizard:**
- Email/phone verification microflows (defer to post-submit)
- KYC / ID verification (separate AD-pipeline wizard, queued)
- Bank routing/account (defer to first-payment flow)
- Secure file uploads — W-9, COI, DL (defer to post-submit Secure Files popout)
- Business Groups join (defer to post-signup)
- Skills/cert taxonomy picker UI (v1 uses free-text manufacturer name; v2 adds taxonomy)

---

**Status:** Field categorization complete. Ready for scope doc → 2–3 wizard variant builds.

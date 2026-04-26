# Tier Definitions — White Glove vs Standard, Direct vs Hourly

Two orthogonal classifications govern every contract on Automate America. Claude Design must render the right chrome (badges, lock icons, anonymity, premium glass treatment) for whichever combination applies.

## Axis 1 — Engagement type

| Type | Definition | Source spec |
|---|---|---|
| **Direct W-2** | Full-time direct employment by the customer. Salary band, benefits, eligibility, take-home tasks. | `reference/DIRECT-JOB-SPEC.md` + `data/direct-job.json` |
| **Hourly contract** | 1099 / W-9 contractor engagement, billed hourly, weekly invoicing. | `docs/HOURLY-CONTRACTS-SPEC.md` + `data/hourly-std.json` / `data/hourly-wg.json` |
| **Fixed-bid** | Lump-sum project at company level (system-integrator company bids and staffs the work). | `data/company.json` services_offered |

## Axis 2 — Tier (applies to Hourly + Direct)

| Tier | Visibility | Premium | Concierge | NDA | Boost | Customer pays |
|---|---|---|---|---|---|---|
| **Standard** | Customer name + plant location visible to all | none | self-serve | not required | optional ($) | base fee |
| **White Glove** | Anonymous-bid · customer hidden until applicant shortlisted + NDA signed | +30% premium | AA WG Concierge owns scheduling, payment, dispute escalation | mandatory mutual 2-yr NDA on application | always boosted top of feed for 7 days | base fee + 30% WG premium |

## Visual differentiation Claude Design must render

### Standard tier
- Glass surfaces standard (0.25 dark / 0.25 light)
- Default indigo CTA glass
- Customer logo + name fully visible
- "Apply" CTA primary
- No NDA modal at application
- No concierge badge

### White Glove tier
- Glass surfaces same opacity but **gold edge highlight** (`inset 0 1px 0 rgba(255,215,0,0.20)` on top edge instead of white)
- Subtle amber glow on the card (`box-shadow: 0 0 24px rgba(245,158,11,0.08)` outside the standard shadow stack)
- Customer name renders as `[White Glove · Tier-1 OEM]` until shortlist+NDA
- Customer logo replaced with a **glass diamond icon** (◇) in `--brand-amber`
- "Apply (signs NDA)" CTA — distinct primary, with a small diamond icon left of label
- **NDA modal** intercepts application click — must be signed before submission
- Concierge badge on the card: small glass pill with "AA Concierge" label + amber dot
- Boost indicator: a small ⚡ icon top-right of the card (always boosted)
- Section "What you'll see after shortlist" replaces sections that would normally show customer details

### Direct W-2 (orthogonal to tier)
- Salary band shown as headline rate (`$180k–$235k / yr`) instead of hourly rate
- Benefits section renders as a 2-column glass-chip grid (Health / Retirement / Time off / Education / Other)
- "Authorized to work" eligibility chip in header
- Interview process is multi-step (5–6 steps standard) vs. hourly (3–4)
- "Direct W-2" small text under the title

### Hourly (orthogonal to tier)
- Hourly rate as headline (`$148.50 / hr · 4-hour minimum invoice`)
- Duration as `4-week onsite engagement` rather than salary band
- Interview process is shorter (3–4 steps)
- "Hourly · Nw" chip near rate

## Combination matrix

| Direct + Standard | Direct + White Glove | Hourly + Standard | Hourly + White Glove |
|---|---|---|---|
| Salary band visible · customer visible · 5-step interview | (rare) — full-time hires through anonymous channel — concierge owns whole flow | Hourly rate visible · customer visible · 4-step interview | Hourly rate visible · customer hidden · NDA at apply · concierge · boost · gold edge |

## Implementation hooks for Claude Design

- Read `tier` and `white_glove` fields in any contract JSON.
- If `white_glove === true`: apply gold-edge treatment, anonymous brief, NDA-on-apply, concierge badge, ⚡ boost icon.
- If `tier === "Direct W-2"`: render benefits + salary band + multi-step interview.
- If `tier === "Standard"` AND `white_glove === false`: default chrome.
- If both `tier === "Direct W-2"` AND `white_glove === true`: combine rules — anonymous + benefits-rendered + NDA + concierge.

## Tier-3 collapse rules

Sections marked `[T3]` in `SECTIONS.md` collapse by default for visitors and expand when clicked. Tier-3 is independent of White Glove vs Standard — it's a UX-density decision, not a business-tier decision.

## Why the differentiation matters (CEO P678B)

White Glove customers pay a 30% premium because:
- Anonymity protects competitive intelligence (an OEM doesn't want competitors knowing they're retrofitting Cell 14 with FANUC R-30iD).
- Concierge service reduces customer's admin overhead.
- Boost guarantees top-of-feed placement for 7 days = faster fill.

Contractors who bid white-glove are effectively earning the same hourly rate as standard — the premium goes to AA, not to the contractor — but they get:
- Higher-trust customer (only verified Tier-1 OEMs and major manufacturers can post WG).
- Guaranteed payment (1-week escrow up front).
- Anonymous reviews (their public reviews don't disclose customer name, protecting both sides).

Render this tier system as **prestige + protection**, not "fancy."

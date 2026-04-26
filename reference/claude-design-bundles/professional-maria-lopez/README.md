# Claude Design Bundle — Full Multi-Page Reference

**Built by:** Marcus (PM), 2026-04-25
**For:** Claude Design — pixel-perfect, max-data prototypes for the Automate America platform
**Status:** ✅ COMPLETE — all 9 JSONs + asset pack + 4 specs shipped

This bundle is everything Claude Design asked for in its spec list. The path stays as `professional-maria-lopez/` because that's the path already cited in earlier prompts — but the bundle now covers **9 page types**, not just the Professional Profile.

## What's in this bundle

```
professional-maria-lopez/
├── README.md                              ← you are here
├── data/
│   ├── professional.json                  ← Maria Lopez full record
│   ├── customer.json                      ← Rebecca Chen at Ford Rouge
│   ├── company.json                       ← Acme Robotics (system integrator)
│   ├── dashboard-pro.json                 ← Maria signed-in dashboard
│   ├── dashboard-cust.json                ← Rebecca signed-in dashboard
│   ├── direct-job.json                    ← Ford Senior Controls Engineer (W-2)
│   ├── hourly-wg.json                     ← Body Shop FANUC retrofit (White Glove tier)
│   ├── hourly-std.json                    ← PLC palletizer (Standard tier)
│   └── admin.json                         ← Platform admin dashboard
├── assets/
│   ├── people/
│   │   └── README.md                      ← Unsplash headshot URL placeholder
│   ├── logos/  (19 PNGs)                  ← Siemens · Rockwell/AB · FANUC · ABB · Ford · GM ·
│   │                                          Stellantis · Magna · BMW · Cognex · Tesla · 3M ·
│   │                                          Amazon Robotics · Caterpillar · John Deere ·
│   │                                          Honda · Toyota · Boeing · AA
│   └── badges/ (37 PNGs across 5 entity types)
│       └── AVAILABLE-BADGE-CATEGORIES.md  ← Pro/Company/Sp/Bg/Cust full library reference
└── specs/
    ├── SECTIONS.md                        ← canonical section order + visibility for all 9 pages
    ├── POPOUTS.md                         ← every clickable item → modal pattern, all 9 pages
    ├── TIERS.md                           ← White Glove vs Standard, Direct W-2 vs Hourly
    └── ADMIN-DASHBOARD-SPEC.md            ← admin-only dashboard brief (no source HTML)
```

**Total file count:** 9 JSON + 56 asset PNGs + 6 markdown files = 71 files, ~1.2 MB

## Sequencing — render Maria first

Build all 9 prototypes in a single Claude Design canvas, but render them in this order so the reference patterns lock in early:

1. **Professional Profile · Maria Lopez** — the canonical reference; deepest section list
2. **Customer Profile · Rebecca Chen / Ford Rouge** — proves visitor-vs-owner-vs-admin toggling
3. **Business · Acme Robotics** — proves multi-entity badges (Company-* + Sp-*)
4. **Business Group · Wallace Detroit Plant** — proves group-level chrome
5. **Hourly Contract · Standard (Acme palletizer)** — baseline contract shell
6. **Hourly Contract · White Glove (anonymous body shop)** — proves tier-3 chrome (gold edge, NDA, concierge)
7. **Direct Job · Ford W-2** — proves benefits + salary band rendering
8. **Pro Dashboard · Maria signed-in** — proves owner-only home page
9. **Customer Dashboard · Rebecca signed-in** — same pattern, customer side
10. **Admin Dashboard · Tony signed-in** — proves admin chrome (queues, KPIs, ⌘K)

## How to feed this to Claude Design

In your Claude Design canvas (`Feed Home — Liquid Glass mockup` project), paste this prompt verbatim:

```
Render all 10 pages described in
reference/claude-design-bundles/professional-maria-lopez/

INPUTS:
- data/*.json — 9 fully-populated record fixtures (every field is real
  composite data — no Lorem Ipsum, no stubs)
- assets/logos/ — 19 manufacturer + customer logos in PNG
- assets/badges/ — 37 achievement badges across Pro/Company/Sp/Bg/Cust
  categories (see AVAILABLE-BADGE-CATEGORIES.md for the full library
  reference — badges apply to Business and Business Group profiles too,
  per CEO directive 2026-04-25)
- assets/people/README.md — headshot Unsplash URL placeholder
- specs/SECTIONS.md — canonical section order + visibility per role
  ([V] visitor / [O] owner / [A] admin / [T3] tier-3 collapse)
- specs/POPOUTS.md — every clickable trigger → modal pattern
  (side-panel / centered / fullscreen)
- specs/TIERS.md — White Glove vs Standard chrome differences,
  Direct W-2 vs Hourly differences
- specs/ADMIN-DASHBOARD-SPEC.md — admin-only dashboard brief

CONSTRAINTS (already locked into the design system):
- Apple Liquid Glass aesthetic — animated wallpaper, layered
  transparency (deep 0.50 → mid 0.32 → top 0.18), 3D glass CTAs
  (4-layer effect: tinted-bg + inset-top-highlight + inset-bottom-
  shadow + drop-shadow + backdrop-blur), wallpaper bleeds through
  every glass surface.
- Eleven Hard Design Laws apply (see project knowledge).
- The Professor voice on every label, button, empty state, error.
- Light + dark modes, both rendered.
- Desktop 1440 + mobile 375 breakpoints, both rendered.
- Three viewer toggles top-right (Visitor / Owner / Admin) on
  pages where multiple roles apply — show/hide sections per
  SECTIONS.md visibility tags.
- Wallpaper:  dark mode → industrial-2.png · light mode → robotics-4.png

DELIVERABLES (10 pages on the same canvas):
1. Professional Profile · Maria Lopez (Visitor + Owner + Admin views)
2. Customer Profile · Rebecca Chen at Ford Rouge (Visitor + Owner + Admin)
3. Business / Company Profile · Acme Robotics (Visitor + Owner + Admin)
4. Business Group Profile · Wallace Detroit Plant (Visitor + Owner)
5. Hourly Contract · Standard (Visitor + Owner)
6. Hourly Contract · White Glove (Visitor [pre-NDA] + Visitor [post-shortlist] + Owner)
7. Direct Job · Ford W-2 (Visitor + Owner)
8. Pro Dashboard · Maria signed-in (Owner only — no visitor exists)
9. Customer Dashboard · Rebecca signed-in (Owner only)
10. Admin Dashboard · Tony signed-in (Super-Admin + Operations + Trust&Safety toggles)

Each page renders desktop 1440 + mobile 375. Each uses the same animated
wallpaper. Each obeys the eleven Hard Design Laws.

White Glove chrome is non-negotiable: gold edge highlight, ◇ diamond
icon, ⚡ boost icon top-right, anonymous brief pre-NDA, "Apply (signs
NDA)" primary CTA, AA Concierge badge. See TIERS.md for exact CSS
values.

If a section's data is missing from the JSON, mark it
"[no data — owner can add this]" rather than fabricate. If you need
icons, pull from lucide-react. If you need a map tile, embed a
Mapbox static-API placeholder centered on the city in the JSON.

Real photos > Unsplash placeholders > generic shapes. Mark every
placeholder `<!-- TODO: replace with licensed asset -->`.

Render order: Professional → Customer → Business → BG → Hourly Std
→ Hourly WG → Direct Job → Pro Dashboard → Cust Dashboard → Admin.
This sequencing locks in patterns from the deepest spec first
(Professional) before extending to lighter ones.
```

## Validation checklist for Claude Design's renders

When each page lands, check:

- [ ] All 11 Hard Design Laws honored
- [ ] All sections from SECTIONS.md present (or marked "no data")
- [ ] Visitor / Owner / Admin views toggle correctly per page
- [ ] Light + dark modes both render
- [ ] Desktop 1440 + mobile 375 both render
- [ ] All clickable items have correct modal shape per POPOUTS.md
- [ ] Wallpaper visible through every glass surface
- [ ] Profile photo at 144 px, badges at 80 px, secondary logos at 72 px (Laws 6/7/8)
- [ ] No emoji in product UI (Caveats rule)
- [ ] Voice/copy reads as the Professor
- [ ] No `font-weight: 800` (Outfit Black not licensed)
- [ ] No JetBrains Mono `font-weight: 600` (only 400/500/700 ship)
- [ ] White Glove pages have gold edge + diamond icon + ⚡ boost + NDA modal
- [ ] Standard pages have default chrome (no gold edge, no diamond)
- [ ] Direct W-2 pages show benefits grid + salary band as headline
- [ ] Hourly pages show hourly rate + 4-hour minimum + duration label
- [ ] Admin dashboard is admin-only (no visitor route exists)

If any item fails: feedback to Claude Design, iterate, re-render. Don't ship to David / David2 / David3 until 100% pass on the priority pages (Pro Profile + Pro Dashboard + Hourly WG + Customer Profile).

## What's intentionally simplified for v1

- **Wallace Automation, Acme Robotics, BMW, Cognex specific logos** — JSON references generic placeholders. The 19 logos shipped cover the major brands. Acme/Wallace use `automate-america.png` as the placeholder.
- **Real licensed Maria Lopez headshot** — Unsplash placeholder URL provided. Real photo replacement TODO.
- **Mapbox style key** — service-radius cards use Mapbox static API; Claude Design can use the public token or render a glass card with city + radius text only.
- **Out-of-scope panels** (1:1 messages thread, full timesheet drawer, connection request inbox, notification center, full audit log) — render as lightweight glass cards with title + 3 dummy rows + "Open detail page →" link. Not load-bearing for the design proof.

## After all 10 pages render

The output bundle (Claude Design's "Handoff to Claude Code" zip) goes to:
```
reference/claude-design-bundles/handoff-bundles/<feature-slug>/
```

Then Marcus wraps it in a David / David2 / David3 assignment with Rule Zero, Rule 91 cite, validation checklist, and ships it through a real cycle.

That closes the loop: **vision → design → spec → code → deploy.**

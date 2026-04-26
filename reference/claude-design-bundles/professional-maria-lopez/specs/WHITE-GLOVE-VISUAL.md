# White Glove — Visual Treatment Specification

Confirms every CSS value, color token, glyph, and surface scope for the White Glove tier. Claude Design used violet in v1; this spec replaces violet with the canonical token set.

## Tier definition (recap)

White Glove = anonymous-bid, premium-tier engagements posted by verified Tier-1 OEMs and major manufacturers. Customer name + plant location hidden until applicant is shortlisted and signs a 2-year mutual NDA. Customer pays a 30% premium that funds AA WG Concierge, escrow, and 7-day boost.

Per CEO P678B (2026-04-22): the platform's most premium offering. Visual treatment must signal **prestige + protection**, not "fancy."

## Color tokens

### Primary White Glove color
The defining color is **amber** (`#F59E0B` / `--brand-amber`), NOT violet. Reasoning: amber pairs with the existing brand palette (matches the marketing CTA color) and reads as "premium-warm" rather than "luxe-disconnected."

```css
--wg-primary:        #F59E0B;  /* base amber */
--wg-primary-light:  #FBBF24;  /* amber-300 — highlights, hover */
--wg-primary-dark:   #D97706;  /* amber-700 — pressed, dark mode */
--wg-glow:           rgba(245, 158, 11, 0.20);  /* card outer glow */
--wg-edge:           rgba(255, 215, 0, 0.20);   /* gold inset top edge — slightly more yellow */
--wg-tint:           rgba(245, 158, 11, 0.08);  /* card background tint */
--wg-border:         rgba(245, 158, 11, 0.25);  /* card border accent */
```

Add these to `tokens/automate-tokens.css` under a new `:root` block. They should NOT replace existing brand-amber; they are SCOPED tokens that reference brand-amber under the hood.

## Glyph

The canonical White Glove glyph is **◇ (white diamond)** — Unicode U+25C7. Renders cleanly at every size from 13px to 80px.

CSS:
```css
.wg-glyph {
  display: inline-flex;
  width: 1em;
  height: 1em;
  color: var(--wg-primary);
  font-style: normal;
  /* prefer SVG for crispness at large sizes — see icon registry below */
}

.wg-glyph::before {
  content: '◇';
}
```

For sizes ≥34px, swap to a hand-drawn SVG diamond (sharper, more controllable than Unicode):
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
  <path d="M12 2 L22 12 L12 22 L2 12 Z" />
</svg>
```

Saved at `assets/icons/wg-diamond.svg` (TODO: ship in next bundle pass; for now, ◇ Unicode is acceptable).

## Surface scope — what changes when WG-eligible

Two scopes apply, depending on context:

### Scope A — single page is a WG contract
The CONTRACT page itself flips to WG visual treatment. Owner-facing parts (the customer's view of their own posting) stay non-WG-tinted; visitor-facing parts get full WG treatment.

Changes vs Standard:
- **Card-level edge highlight** flips from `inset 0 1px 0 rgba(255,255,255,0.15)` to `inset 0 1px 0 var(--wg-edge)` (gold instead of white)
- **Card outer glow** adds `box-shadow: 0 0 24px var(--wg-glow)` to the existing shadow stack
- **Card border** flips from `rgba(255,255,255,0.12)` to `var(--wg-border)`
- **Card background tint** picks up an 8% amber wash: layer `var(--wg-tint)` over the standard glass-bg
- **Title row** prepends a 24px ◇ glyph in `--wg-primary`
- **Boost icon (⚡)** appears top-right in `--wg-primary` (always boosted)
- **Primary CTA** label changes from "Apply" to "Apply (signs NDA)" with a small ◇ inline before the label
- **Concierge badge** appears below the CTA: small glass pill with "AA Concierge" label + amber dot animated 2s ease-in-out

Changes that do NOT apply (stay standard):
- Backdrop blur radius (still 24px / 16px on mobile)
- Glass surface opacity ladder (still 0.50 / 0.32 / 0.18 progressive)
- Image hierarchy (144 / 80 / 72 px)
- Type scale + Fibonacci spacing
- The Professor voice (NEVER changes — WG isn't fancier copy, it's the same copy with extra protection)

### Scope B — user is WG-eligible
This is more subtle. A professional, customer, or company that's earned the **White Glove Eligible** badge gets a small persistent indicator across the platform:

- Profile hero: a small `◇ White Glove Eligible` chip in `--wg-primary` next to the verified-check
- Feed listings: their cards get a 1px gold edge highlight instead of the standard white inset
- Search results: their result rows get a thin 2px gold left-border
- Card hover: the gold glow appears (not the full WG glow — just a 12% version)

This signals "this user can transact in the WG pool" without making every page they touch look WG.

## What does NOT flip visually

To preserve clarity:
- Reviews from WG contracts render with the title `[White Glove Contract]` and the body `[Visible only to the parties on this contract.]` — but they DON'T get gold-edge treatment on the review card itself. They sit alongside non-WG reviews with normal chrome.
- WG contractors' completed contracts list shows `[White Glove Contract]` rows in italics + warning color (matches existing pattern in `profile-advanced.html`) — NOT in gold.
- Dashboard KPIs that count WG separately (e.g. customer's `by_tier` spending breakdown) use standard chrome with a small `◇` next to the WG row.

The principle: **gold treatment goes on the WG entity itself, not on every artifact that mentions WG.**

## Light vs dark mode

| Token | Dark mode | Light mode |
|---|---|---|
| `--wg-primary` | `#F59E0B` | `#F59E0B` (same — amber works on both) |
| `--wg-primary-light` | `#FBBF24` | `#D97706` (darker on light bg for contrast) |
| `--wg-glow` | `rgba(245, 158, 11, 0.20)` | `rgba(245, 158, 11, 0.30)` (slightly stronger on light) |
| `--wg-edge` | `rgba(255, 215, 0, 0.20)` | `rgba(217, 119, 6, 0.40)` (use brand-amber-dark on light) |
| `--wg-tint` | `rgba(245, 158, 11, 0.08)` | `rgba(245, 158, 11, 0.06)` (slightly weaker — light bg shows it more) |
| `--wg-border` | `rgba(245, 158, 11, 0.25)` | `rgba(217, 119, 6, 0.30)` (darker on light) |

## Component-level CSS reference

Glass card base (existing pattern):
```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255,255,255,0.15);
}
```

White Glove variant:
```css
.glass-card.wg {
  background: linear-gradient(0deg, var(--wg-tint), var(--wg-tint)), var(--glass-bg);
  border: 1px solid var(--wg-border);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 0 24px var(--wg-glow),
    inset 0 1px 0 var(--wg-edge);
}

.glass-card.wg::before {
  /* existing top-shimmer line gets gold version */
  background: linear-gradient(90deg, transparent, var(--wg-edge) 30%, var(--wg-edge) 70%, transparent);
}
```

White Glove CTA button:
```css
.cta-primary.wg {
  /* base: 4-layer 3D glass (matches standard CTA pattern) */
  background: rgba(245, 158, 11, 0.18);
  border: 1px solid var(--wg-border);
  backdrop-filter: blur(12px) saturate(180%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    inset 0 -1px 0 rgba(0, 0, 0, 0.20),
    0 4px 16px rgba(245, 158, 11, 0.30),
    0 1px 3px rgba(0, 0, 0, 0.20);
  color: var(--text-primary);
  font-weight: 600;
}

.cta-primary.wg::before {
  content: '◇ ';
  color: var(--wg-primary);
  margin-right: 0.5em;
}

.cta-primary.wg:hover {
  background: rgba(245, 158, 11, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.40),
    inset 0 -1px 0 rgba(0, 0, 0, 0.20),
    0 8px 24px rgba(245, 158, 11, 0.40),
    0 2px 6px rgba(0, 0, 0, 0.25);
  transform: translateY(-1px);
}
```

Concierge pill:
```css
.wg-concierge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid var(--wg-border);
  border-radius: 100px;
  font-size: 13px;
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--wg-primary-light);
  letter-spacing: 0.4px;
}

.wg-concierge-pill::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--wg-primary);
  animation: pulse-wg 2s ease-in-out infinite;
}

@keyframes pulse-wg {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.6); }
  50%      { box-shadow: 0 0 0 4px rgba(245, 158, 11, 0); }
}
```

## Anti-patterns (do NOT do)

- ❌ Use violet / purple. Violet was Claude Design's v1 guess and doesn't match our brand palette.
- ❌ Make the WG glow strong enough to look "neon." Glow is subtle — 20% alpha max.
- ❌ Apply WG treatment to white-glove REVIEWS (they stay neutral chrome with anonymous text).
- ❌ Use solid amber background. WG cards stay glass — amber is a tint + edge + glow, NOT a fill.
- ❌ Forget mobile reduces blur to 16px. WG glow stays the same magnitude on mobile.
- ❌ Animate the gold edge. The edge is static; only the concierge-pill dot animates.
- ❌ Tag random sections WG just because they reference a WG contract. The treatment goes on the WG entity itself, not on every artifact.

## Testing checklist (post-implementation)

- [ ] WG card on a Standard customer's `Open Contracts` table: gold edge + ⚡ + ◇ on the title
- [ ] Standard card adjacent to a WG card on the same row: visibly different edge, otherwise same chrome
- [ ] Light mode: gold edge readable, glow not lost in white surface
- [ ] Mobile: WG visual still distinguishable at 375px width
- [ ] Reduced motion: concierge pill dot stops animating but stays visible
- [ ] Print: WG treatment falls back to a 2px solid amber border (no glass, no glow, no animation)

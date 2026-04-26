# Badge Thresholds — tier criteria + auto/admin-grant + progress-vs-binary

Every badge category × 5 tiers. Defines what earns each tier, whether it's progress-tracked, and whether the platform auto-awards or an admin grants.

## Tier ladder (universal)

```
Bronze   →   Silver   →   Gold   →   Platinum   →   Diamond
```

Tier visual:
- **Bronze**: copper gradient · 1× outline glow
- **Silver**: neutral metallic · 1× outline glow
- **Gold**: warm metallic · 2× outline glow
- **Platinum**: cool metallic · 2× outline glow + subtle white shimmer
- **Diamond**: cyan/iridescent · 3× outline glow + animated highlight sweep on hover

## Display rules

- Earned badges render at 100% opacity in chronological order (Diamond first, then Platinum, etc.)
- Locked badges render at 30% opacity with `assets/badges/locked.svg` overlay (already in repo)
- Click any badge → opens centered modal with criterion + earned-at date OR "How to earn" + progress meter
- Hover: 1.05× scale + drop-shadow lift
- Progress-tracked badges (most are) show a thin glass progress bar under the badge name on hover

---

## Professional badges (`Pro-*`)

### Pro-Tenure (auto-awarded, progress-tracked)
| Tier | Criterion | Asset |
|---|---|---|
| Bronze | 1+ year on platform | `Pro-Tenure-Bronze.png` |
| Silver | 3+ years on platform | `Pro-Tenure-Silver.png` |
| Gold | 5+ years on platform | `Pro-Tenure-Gold.png` |
| Platinum | 8+ years on platform | `Pro-Tenure-Platinum.png` |
| Diamond | 10+ years on platform | `Pro-Tenure-Diamond.png` |

### Pro-Contracts (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 1+ completed | Silver | 5+ | Gold | 15+ | Platinum | 30+ | Diamond | 50+ |

### Pro-Earnings (auto, progress, dollar-amount)
| Tier | Criterion |
|---|---|
| Bronze | $25K+ lifetime billings |
| Silver | $100K+ lifetime billings |
| Gold | $500K+ lifetime billings |
| Platinum | $1M+ lifetime billings |
| Diamond | $1.5M+ lifetime billings |

### Pro-Hours (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 500+ hours billed |
| Silver | 2,500+ hours billed |
| Gold | 10,000+ hours billed |
| Platinum | 25,000+ hours billed |
| Diamond | 50,000+ hours billed |

### Pro-Profile (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 60% profile completeness |
| Silver | 80% completeness |
| Gold | 95% completeness |
| Platinum | 100% completeness for 6+ months |
| Diamond | 100% completeness for 12+ months |

### Pro-Ratings (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 4.0+ rating across 3+ reviews |
| Silver | 4.5+ rating across 10+ reviews |
| Gold | 4.8+ rating across 25+ reviews |
| Platinum | 4.95+ rating across 50+ reviews |
| Diamond | 4.95+ rating across 25+ reviews **AND** 0 disputes lifetime |

### Pro-Endorsed (auto, progress) — endorsements RECEIVED
| Tier | Criterion |
|---|---|
| Bronze | 1+ endorsements received |
| Silver | 5+ |
| Gold | 15+ |
| Platinum | 25+ |
| Diamond | 50+ |

### Pro-Endorser (auto, progress) — endorsements GIVEN
| Tier | Criterion |
|---|---|
| Bronze | 1+ given |
| Silver | 5+ given |
| Gold | 15+ given |
| Platinum | 25+ given |
| Diamond | 50+ given |

### Pro-Endorse (combined, auto)
| Tier | Criterion |
|---|---|
| Bronze | both Endorsed Bronze + Endorser Bronze |
| Silver | both at Silver+ |
| Gold | both at Gold+ |
| Platinum | both at Platinum+ |
| Diamond | both at Diamond |

### Pro-Skills (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 1 certified skill family |
| Silver | 2 certified skill families |
| Gold | 3 certified skill families with 5+ years each |
| Platinum | 5+ certified skill families |
| Diamond | 8+ certified skill families with 5+ years each |

### Pro-Repeat (auto, progress) — repeat customers
| Tier | Criterion |
|---|---|
| Bronze | 1 repeat hire from same client |
| Silver | 3+ |
| Gold | 5+ |
| Platinum | 10+ |
| Diamond | 25+ |

### Pro-Reviewer (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 1+ review left |
| Silver | 5+ |
| Gold | 15+ |
| Platinum | 25+ |
| Diamond | 50+ |

---

## Customer badges (`Cust-*`)

### Cust-Spend (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | $10K+ lifetime platform spend |
| Silver | $100K+ |
| Gold | $500K+ |
| Platinum | $2M+ |
| Diamond | $10M+ |

### Cust-Hired (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 1+ contractor hired |
| Silver | 5+ | Gold | 25+ | Platinum | 100+ | Diamond | 250+ |

### Cust-Tenure (auto, progress) — same ladder as Pro-Tenure

### Cust-Payment (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | First payment cleared on time |
| Silver | 100% on-time payments, 6+ months |
| Gold | 100% on-time, 12+ months |
| Platinum | 100% on-time, 24+ months |
| Diamond | 100% on-time, 24+ months **AND** Net-15 or shorter |

### Cust-Rehire (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 5%+ rehire rate |
| Silver | 15%+ rehire rate |
| Gold | 30%+ rehire rate |
| Platinum | 45%+ rehire rate |
| Diamond | 60%+ rehire rate |

### Cust-Reviews (auto, progress) — reviews LEFT
Same ladder as Pro-Reviewer: 1 → 5 → 15 → 50 → 100.

### Cust-Jobs (auto, progress) — contracts posted
| Tier | Criterion |
|---|---|
| Bronze | 1 contract in 12 months |
| Silver | 5 in 12 months |
| Gold | 15 in 12 months |
| Platinum | 50 in 12 months |
| Diamond | 100+ in 12 months |

### Cust-Approval (admin-grant — verified buyer status)
| Tier | Criterion |
|---|---|
| Bronze | KYC + W-9 on file |
| Silver | + COI on file |
| Gold | + AP-onboarded + tax-verified |
| Platinum | + 12+ months perfect compliance |
| Diamond | + Tier-1 enterprise + manual approval |

### Cust-Applicants, Cust-Contract, Cust-Contracts, Cust-Group, Cust-Hours, Cust-Expense, Cust-Rehire, Cust-RFQ — auto-progress with reasonable monotonic ladders (1/5/15/50/100 unless dollar-denominated).

---

## Business / Company badges (`Company-*`)

### Company-Top-Employer (auto, comparative)
| Tier | Criterion |
|---|---|
| Bronze | Top 50% by avg rating from contractors hired |
| Silver | Top 25% |
| Gold | Top 10% |
| Platinum | Top 5% |
| Diamond | Top 1% |

### Company-Hired (auto, progress) — contractors hired through platform
Same ladder as Cust-Hired but at company scale.

### Company-Spend (auto, progress) — same ladder as Cust-Spend
### Company-Tenure (auto) — same ladder as Pro-Tenure
### Company-Active-Hirer (auto) — same ladder as Cust-Jobs
### Company-Applicants (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 50+ applicants attracted in 12 months |
| Silver | 200+ |
| Gold | 1,000+ |
| Platinum | 2,500+ |
| Diamond | 5,000+ |

### Company-Verified-Buyer (admin-grant)
Same ladder as Cust-Approval but at company scale.

---

## Service Provider badges (`Sp-*`) — for companies that bid as service providers

### Sp-Contracts (auto, progress) — completed contracts as company
Same ladder as Pro-Contracts: 1 / 5 / 15 / 30 / 50 — but at company scale (5 / 25 / 75 / 200 / 500).

### Sp-Customers (auto, progress) — distinct paying customers
| Tier | Criterion |
|---|---|
| Bronze | 1 distinct paying customer |
| Silver | 5+ | Gold | 15+ | Platinum | 50+ | Diamond | 100+ |

### Sp-Earnings (auto, progress) — company billings
| Tier | Criterion |
|---|---|
| Bronze | $100K+ company billings |
| Silver | $1M+ |
| Gold | $5M+ |
| Platinum | $15M+ |
| Diamond | $50M+ |

### Sp-Growth (auto, progress) — YoY billings growth
| Tier | Criterion |
|---|---|
| Bronze | 10%+ YoY growth |
| Silver | 25%+ YoY |
| Gold | 50%+ YoY |
| Platinum | 100%+ YoY |
| Diamond | 100%+ YoY for 3+ consecutive years |

### Sp-Hours, Sp-Rating, Sp-Tenure, Sp-Team, Sp-Util — auto-progress with reasonable ladders.

---

## Business Group badges (`Bg-*`)

### Bg-Active-Group (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 10+ posts/month for 3+ months |
| Silver | 25+ posts/month for 3+ months |
| Gold | 50+ posts/month for 6+ months |
| Platinum | 100+ posts/month for 12+ months |
| Diamond | 100+ posts/month for 24+ months |

### Bg-Established (auto, progress) — group tenure
Same ladder as Pro-Tenure.

### Bg-Contracts (auto, progress) — contracts routed through group
| Tier | Criterion |
|---|---|
| Bronze | 5+ contracts routed |
| Silver | 25+ |
| Gold | 100+ |
| Platinum | 250+ |
| Diamond | 500+ |

### Bg-Hours (auto, progress)
| Tier | Criterion |
|---|---|
| Bronze | 1K+ group member hours billed |
| Silver | 10K+ |
| Gold | 50K+ |
| Platinum | 100K+ |
| Diamond | 250K+ |

### Bg-Large-Team (auto, progress) — distinct member count
| Tier | Criterion |
|---|---|
| Bronze | 5+ active members |
| Silver | 20+ |
| Gold | 50+ |
| Platinum | 100+ |
| Diamond | 250+ |

---

## Special / admin-only badges (no `*-Bronze..Diamond` ladder — binary)

These don't follow the 5-tier ladder. They're awarded once and do not progress.

| Badge | Award rule | Visual |
|---|---|---|
| **White Glove Eligible** (admin-grant) | Verified eligible to bid white-glove engagements (Pro side) OR post white-glove engagements (Customer/Company side) | Diamond-tier metallic + ◇ glyph |
| **Charter Member** (auto on group join during first 30 days) | Joined a business group within first 30 days of its creation | Crown glyph on member card |
| **Founder** (admin-grant) | Founded a business group on platform | Anchor glyph |
| **Verified Identity** (auto, on KYC pass) | Phone + email + ID verified | Check-mark inside circle (already shown on profile photo) |
| **Top Reviewer of the Month** (admin-grant, monthly) | Most thoughtful reviews left this month — community-curated | Calendar glyph with "Apr 2026" inline |
| **Conference Speaker** (admin-grant) | Presented at a recognized industry conference (ISA, Automation Fair, etc) | Microphone glyph |

---

## Display logic — which badges to show

Each profile renders the **top 6–10 earned badges** by tier (Diamond first, then Platinum, etc.).

If user has 6+ Diamond badges, show all Diamonds first then truncate. If fewer, fill with Platinum, then Gold, etc.

Locked badges (next-tier-up for badges where the user has lower tiers) render at 30% opacity below the earned set, with progress meter on hover. Cap visible locked at 4 badges to avoid the badge wall becoming a "stuff I haven't done" list.

## Auto-grant trigger model

- **Real-time**: every contract close, every payment cleared, every endorsement given/received triggers a badge eligibility check via background job
- **Daily 04:00 EST**: full reconciliation pass — catches anything the real-time check missed (especially time-based tenure progressions)
- **Manual override**: admin can manually grant any badge via Admin Dashboard → user record → Award Badge with reason field (audit-logged)
- **Manual revoke**: admin can revoke any badge with reason field (audit-logged + notification to user)

## Implementation notes for Claude Design

When rendering Maria's profile, show 10–12 earned badges as already specified in `data/professional.json` → `badges_earned[]`. The rest of her categories (Pro-Endorser, Pro-Endorse, Pro-Tenure-Diamond, Pro-Earnings-Diamond) — show those as locked / next-tier with progress meter:

- Pro-Tenure-Diamond: 9/10 years — 1 year to go
- Pro-Earnings-Diamond: $1.68M / $1.5M — already crossed (badge should be earned actually — gap in data, fix in next iteration)
- Pro-Endorser-Platinum: 22/25 endorsements given — 3 to go for Platinum
- Pro-Endorse-Diamond: needs both Endorsed-Diamond + Endorser-Diamond — currently at Gold/Gold

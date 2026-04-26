# Achievement Badge Library — All Entity Types

**CEO directive (Tony Wallace, 2026-04-25):** *"many of those achievement badges would also apply to business and business groups as well. They need to be rewarded as much as the professionals."*

Badges are NOT Pro-only. Every entity type on the platform earns achievements.

The 12 Pro badges shipped in `assets/badges/` are the **representative sample for the Maria Lopez prototype**. The full library lives at `feed-nextjs/public/images/badges/achievements/` in the repo and contains badges for every entity type, each in 5 tiers (Bronze · Silver · Gold · Platinum · Diamond).

## Categories by entity type

### Professional (`Pro-*`) — 12 categories
For Maria Lopez and every signed-in contractor.
- `Pro-Contracts` — career milestone (5/15/30/50/100+ completed)
- `Pro-Earnings` — lifetime billings ($100K / $500K / $1M / $5M / $10M+)
- `Pro-Endorsed` — endorsements received (5/15/25/50/100+)
- `Pro-Endorser` — endorsements given (5/15/25/50/100+)
- `Pro-Endorse` — combined endorsement velocity
- `Pro-Hours` — hours billed (1K / 5K / 10K / 25K / 50K+)
- `Pro-Profile` — profile completeness (60% / 80% / 100% / 100% for 12mo / 100% for 36mo)
- `Pro-Ratings` — average rating (4.0+ / 4.5+ / 4.8+ / 4.95+ / 5.0 across 25+ reviews)
- `Pro-Repeat` — repeat hires from same client (3/5/10/25/50+)
- `Pro-Reviewer` — reviews left for clients (5/15/25/50/100+)
- `Pro-Skills` — certified skill families (1/2/3/5/8+ manufacturers)
- `Pro-Tenure` — years on platform (1 / 3 / 5 / 8 / 10+)

### Business / Company (`Company-*`, `Sp-*`) — 16 categories
For System Integrators, OEM partners, manufacturers — anyone with a company profile.

`Company-*` (hire-side achievements):
- `Company-Active-Hirer` — contracts posted (3/10/25/50/100+)
- `Company-Applicants` — total applicants attracted (50/200/500/2K/5K+)
- `Company-Hired` — contractors hired (5/25/50/100/250+)
- `Company-Spend` — total platform spend ($25K / $100K / $500K / $1M / $5M+)
- `Company-Tenure` — years on platform
- `Company-Top-Employer` — top 10% / top 5% / top 1% employer rating
- `Company-Verified-Buyer` — verified buyer with COI + tax docs

`Sp-*` (service-provider / vendor-side achievements — for companies that also bid as contractors):
- `Sp-Contracts` — completed by company crews
- `Sp-Customers` — distinct paying customers
- `Sp-Earnings` — company billings
- `Sp-Growth` — YoY billings growth
- `Sp-Hours` — company hours billed
- `Sp-Rating` — company avg rating
- `Sp-Team` — team size on platform
- `Sp-Tenure` — years on platform
- `Sp-Util` — crew utilization rate

### Business Group (`Bg-*`) — 5 categories
For named groups of professionals/companies operating together.
- `Bg-Active-Group` — group activity / posts
- `Bg-Contracts` — group-routed contracts
- `Bg-Established` — group tenure
- `Bg-Hours` — total group hours billed
- `Bg-Large-Team` — distinct member count

### Customer (`Cust-*`) — 15 categories
For customers (manufacturers, OEMs, plants) hiring through the platform.
- `Cust-Applicants` · `Cust-Approval` · `Cust-Contract` · `Cust-Contracts` · `Cust-Expense`
- `Cust-Group` · `Cust-Hired` · `Cust-Hours` · `Cust-Jobs` · `Cust-Payment`
- `Cust-Rehire` · `Cust-Reviews` · `Cust-RFQ` · `Cust-Spend` · `Cust-Tenure`

## Tier visual hierarchy

Every category × 5 tiers (in ascending value order):
1. **Bronze** — entry tier, copper gradient
2. **Silver** — established, neutral metallic
3. **Gold** — strong performance, warm gradient
4. **Platinum** — elite, cool metallic
5. **Diamond** — top-of-platform, cyan/iridescent

Display rules:
- Show top 6–10 earned badges by tier (Diamond first, then Platinum, etc.)
- Locked / not-yet-earned badges render at 30% opacity using `locked.svg` overlay
- Hover: 1.05× scale + drop-shadow, reveals criterion popup ("Earn by completing 30+ contracts")

## Where Claude Design can pull more

If the canvas needs Customer / Business Group / Company prototypes, the full library is at:
```
feed-nextjs/public/images/badges/achievements/{Pro,Company,Sp,Bg,Cust}-{Category}-{Tier}.png
```

GitHub-linked, so Claude Design can resolve any badge by path.

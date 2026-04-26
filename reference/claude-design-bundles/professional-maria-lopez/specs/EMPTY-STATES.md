# Empty States — what each section shows when it's empty

Right now every fixture is fully populated. Real users won't be. This file gives the canonical empty-state copy + visual treatment for every section across all 10 page types.

## Universal rules

- **Professor voice** — no exclamation marks, no "Let's get started!", no rocket emoji
- **Specific over abstract** — "No work requests yet" beats "Nothing here"
- **Action-oriented** — every empty state ends with a CTA that fixes the empty
- **Owner empty ≠ Visitor empty** — owner sees an "Add yours" CTA; visitor sees "This member hasn't added X yet" (no CTA)
- **Visual treatment** — glass card with a soft-tinted icon (40% opacity), 1-line headline (Outfit 600 18px), 1-line body (System 400 14px secondary), CTA glass button (owner only)

## Per-section empty-state matrix

### Professional Profile

| Section | Owner empty | Visitor empty |
|---|---|---|
| Hero photo | "Add a profile photo. Photos triple your visibility in customer searches." → [Upload photo] | (no empty — fallback to gradient avatar with initials) |
| Hero tagline | "Add a one-line tagline. The Professor would say something specific." → [Edit] | (no tagline shown) |
| Skills | "List the manufacturers you work in. Customers search by these first." → [+ Add Skill] | "This professional hasn't listed skills yet." |
| Certifications | "Add your first certification. OSHA, ISA, TÜV — whatever you hold." → [+ Add Cert] | "No certifications listed." |
| Education | "Add your degree, trade school, or apprenticeship. It signals trust." → [+ Add Education] | "No education listed." |
| Languages | "Add the languages you work in. Important for multilingual plant floors." → [+ Add Language] | "No languages listed." |
| Equipment Owned | "List the gear you bring on-site. Customers care that you arrive ready." → [+ Add Item] | "No equipment listed." |
| Experience | "Add your first role. Even side gigs and apprenticeships count." → [+ Add Role] | "No experience listed." |
| Reviews received | "Reviews appear here once you've completed your first contract." | "No reviews yet — this professional is new to the platform." |
| Endorsements | "Endorsements show up here when peers vouch for a specific skill. Ask three people you've worked with." → [Request endorsements] | "No endorsements yet." |
| Portfolio | "Drop links to videos, GitHub repos, or whitepapers. Show the work, don't just describe it." → [+ Add Link] | "No portfolio links yet." |
| Service radius | "Set your radius. Customers filter by it — no radius, no matches." → [Set radius] | (radius card hidden if not set) |
| Active Application | "You haven't applied to any contracts yet." → [Browse contracts] | (hidden — owner-only) |
| Watchers | "No one's watching your profile yet. Profiles with photos + 4+ skills get watched 5× more." | (hidden — owner-only) |
| Completed Contracts | "Once you complete your first contract, it'll show up here." → [Browse contracts] | "No completed contracts yet." |
| Achievement Badges | "Badges unlock as you complete contracts, get endorsed, and stay active. Your first badge is closer than you think." → [See criteria] | "No badges yet." |

### Customer Profile

| Section | Owner empty | Visitor empty |
|---|---|---|
| Open contracts | "You haven't posted any contracts yet. Take 90 seconds to post your first." → [Post a contract] | "No open contracts at the moment." |
| Hire history | "Your first hire shows up here once you close a contract." | "No hire history yet — this customer is new to the platform." |
| Watched professionals | "Star a professional you'd like to hire later. They'll appear here." → [Browse professionals] | (hidden — owner-only) |
| Spending breakdown | "Spending data appears once you've paid your first invoice." | (hidden — owner-only) |
| Reviews left | "After every contract closes, leave a review. It builds the network's trust signal." | "No reviews left yet." |
| Key contacts | "Add your AP, Project Managers, and onsite leads so contractors know who to call." → [+ Add Contact] | (hidden — owner-only) |
| Achievement Badges | (same pattern as Pro) | (same pattern as Pro) |
| Facility photos | "Photos help contractors prep. A control panel close-up, a long shot of the floor." → [+ Upload Photos] | "No facility photos yet." |

### Business / Company Profile

| Section | Owner empty | Visitor empty |
|---|---|---|
| Team members | "Add team members from the platform. Customers see who'd actually do their work." → [Invite Team] | "No team members listed." |
| Services offered | "List what you actually sell. Vague service lists get skipped." → [+ Add Service] | "No services listed." |
| Skills certified | "Add manufacturer certifications and team-coverage. Customers filter on these." → [+ Add Skill] | "No certified skills listed." |
| Work history (by team) | "Once you complete contracts as a company, they appear here." | "No completed work yet." |
| Open positions | "You're not hiring right now. Post a position when you are." → [+ Post Job] | "No open positions." |
| Customer reviews | "Customer reviews appear once your team closes contracts." | "No reviews yet." |
| Certifications | "Add CSIA, ISO 9001, OEM partner badges, anything that signals trust." → [+ Add Cert] | "No certifications listed." |
| Media | "Upload photos and videos of your shop floor. The work speaks louder than the brochure." → [+ Upload] | "No media yet." |

### Business Group Profile

| Section | Owner empty | Visitor empty |
|---|---|---|
| Members grid | "Invite your first members. Groups need 5+ to attract group-routed contracts." → [Invite Members] | "This group is still recruiting." |
| Active group contracts | "Once members start posting through the group, contracts show up here." | "No active group contracts." |
| Discussion threads | "Start the first thread. Tech-talk threads attract members faster than recruiting posts." → [Start Discussion] | "No discussions yet." |
| Upcoming events | "Schedule your first meetup. In-person, virtual, or hybrid." → [+ Add Event] | "No events scheduled." |
| Group skills heatmap | "Heatmap fills in as members add their skills." | (hidden — empty heatmap looks broken) |
| Member testimonials | "Ask 2-3 active members to share why they joined. Best new-member-attractor we have." → [Request Testimonial] | "No testimonials yet." |

### Direct Job + Hourly Contract (both tiers)

| Section | Owner empty | Visitor empty |
|---|---|---|
| Applicants | "No applicants yet. Boosting reaches 5× more eyes." → [Boost contract] | (hidden — owner-only) |
| Questions log | "No questions yet from applicants." | "No questions asked yet." |
| Similar contracts | (auto-rendered — never empty in production) | "No similar contracts right now." |
| Compliance required | (always populated — never empty) | (always populated) |
| Applicant panel | (same as Applicants) | (hidden) |

### Pro Dashboard

| Section | Empty state |
|---|---|
| Today's recommended contracts | "No new matches today. Try widening your radius or adding a skill." → [Edit profile] |
| Applications status | "No active applications. Find your next contract." → [Browse contracts] |
| Upcoming calendar | "Nothing scheduled this week." |
| Messages preview | "No new messages." |
| Earnings this month | "No earnings yet this month." (sparkline shows flat line at $0) |
| Profile completeness | (always populated with score + missing items) |
| Watchers | "No one's watching yet. Add a photo and 4+ skills to get watched." → [Edit profile] |
| Active contract summary | "No active contract. Apply to start your next." → [Browse contracts] |

### Customer Dashboard

| Section | Empty state |
|---|---|
| Open contracts table | "You haven't posted any contracts. Post your first." → [Post a contract] |
| Applicants today | "No new applicants today." |
| Spending trend | "Spending data appears after your first invoice clears." |
| Interviews this week | "Nothing scheduled this week." |
| Messages preview | "No new messages." |
| Shortlist carousel | "No candidates shortlisted yet. Star applicants you're considering." |
| Compliance status | (always populated) |
| Notifications | "Nothing new." |

### Admin Dashboard

| Section | Empty state |
|---|---|
| Moderation queue | "Nothing in queue. Platform is quiet." |
| Payments queue | "No payments need review right now." |
| Disputes open | "No open disputes." |
| Platform health | (always populated — health is never empty) |
| Agent activity | "No agent activity in the last 24 hours." |
| Fraud signals | "No anomalies detected in the last 24 hours." |
| Feature flags | (always populated) |
| Recent admin actions | "No admin actions in the last 24 hours." |

## Visual treatment per empty state

```
┌─ Glass card (default 0.25 opacity) ──────────────────┐
│                                                      │
│  ┌─────┐                                             │
│  │ 🎯  │  No reviews yet                             │  ← icon @ 40% opacity, headline Outfit 600 18px
│  └─────┘                                             │
│                                                      │
│  Reviews show up after you complete your first       │  ← body Outfit 400 14px secondary
│  contract on Automate America.                        │
│                                                      │
│  [ Browse contracts → ]                              │  ← glass CTA, indigo-tinted, 4-layer 3D
│                                                      │
└──────────────────────────────────────────────────────┘
```

Icon registry (lucide-react preferred):
- Reviews → `star`
- Endorsements → `thumb-up`
- Skills → `tool`
- Certifications → `shield`
- Education → `graduation-cap`
- Equipment → `wrench`
- Experience → `briefcase`
- Portfolio → `link`
- Photos → `image`
- Calendar / events → `calendar`
- Messages → `message-circle`
- Earnings / spending → `dollar-sign`
- Members / team → `users`
- Discussions → `message-square`
- Service radius → `map-pin`
- Watchers / shortlists → `eye`

## Tier-3 collapsed empty states

Sections marked `[T3]` in SECTIONS.md collapse by default for visitors. When collapsed AND empty:
- Visitor: section title is hidden (no chevron, no header line — empty section disappears entirely)
- Owner: section header still shows with "Add Yours →" CTA inline; click expands the empty state above

## Loading states (separate from empty)

Every list section that's loading data should render a glass-shimmer pattern, NOT a spinner. Three skeleton rows at the section's expected row-height with `linear-gradient(90deg, var(--glass-bg) 0%, var(--glass-bg-hover) 50%, var(--glass-bg) 100%)` animating left-to-right at 1.5s linear infinite.

Loading state never shows error text. If load fails after 5 seconds, swap to error state ("We couldn't load that. Try again." with retry button).

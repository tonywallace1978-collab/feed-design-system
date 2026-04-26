# Role Overrides — per-section CTA copy + edit affordances + admin moderation tools

Three roles see every page differently. SECTIONS.md established WHICH sections show; this file establishes HOW each section behaves per role.

## Master role-override matrix (applies to every page)

| Affordance | Visitor | Owner | Admin |
|---|---|---|---|
| Edit pencil icon (top-right of each editable section) | hidden | visible | visible |
| "+ Add" buttons (in lists like Skills, Certs, Equipment) | hidden | visible | visible |
| Inline edit-on-click | disabled | enabled (highlights on hover) | enabled |
| Drag-to-reorder list items | disabled | enabled | enabled |
| "Hide this section from my profile" toggle | hidden | visible (top of section) | visible |
| Inline moderation tools (flag / hide / delete) | hidden | hidden | visible |
| Trust score / KYC / background-check badges | hidden | visible (top of identity card) | visible |
| Free-text admin note field | hidden | hidden | visible (bottom of every section) |
| "View as visitor" preview toggle | n/a | top-right corner | top-right corner |
| Tier override controls | hidden | hidden | visible (admin-only card) |
| Audit-log "what changed" hover | hidden | hidden | visible (every editable field) |

## Per-page CTA overrides

### Professional Profile

**Hero CTA stack:**
| Visitor | Owner | Admin |
|---|---|---|
| Connect (primary) | Edit profile (primary) | Edit profile (primary) |
| Message | Preview as visitor | Preview as visitor |
| Endorse (if worked together) | Share QR | Switch to admin tools (admin-only) |
| (Boost — only if network admin) | Request endorsements | Force tier change |

**Each section toolbar (owner+admin):**
| Section | Owner toolbar | Admin extra |
|---|---|---|
| About / bio | "✎ Edit About" | + "Hide section from public" |
| Skills | "+ Add Skill" · "✎ Edit list" · "↑↓ Reorder" | + "Flag claim · Verify" |
| Certifications | "+ Upload" · "✎ Edit" · "🔄 Renew" | + "Force-verify" |
| Education | "+ Add" · "✎ Edit" | + "Verify with school registrar" |
| Experience | "+ Add Role" · "✎ Edit" · "↑↓ Reorder" | + "Verify employment" |
| Reviews received | (read-only — owner can't edit reviews) | "Hide review" / "Force-anonymize" |
| Endorsements | "Request more" | "Remove endorsement" |
| Portfolio | "+ Add Link" · "✎ Edit" | + "Hide link from public" |
| Equipment | "+ Add Item" · "✎ Edit by category" | (no admin override) |
| Languages | "+ Add" · "✎ Edit proficiency" | (no admin override) |
| Service radius | "✎ Adjust radius" · "✎ Travel notes" | (no admin override) |
| Secure Files | "+ Upload" · "🗑 Remove" · "🔄 Replace" | "Force-verify" / "Re-request" |
| Private Info | "✎ Edit" (re-auth required to reveal) | "Reveal" (admin re-auth required) |
| Active Application | "Withdraw" · "Message employer" | (read-only) |
| Watchers | (read-only — list only) | (read-only) |
| Admin Notes | (hidden) | "+ Add note" · "✎ Edit existing" |

### Customer Profile

**Hero CTA stack:**
| Visitor | Owner (Rebecca) | Admin |
|---|---|---|
| Apply to open contracts (primary) | Post new contract (primary) | Edit profile |
| Follow company | View applicants (red dot if N≥1) | View as visitor |
| Message | Edit profile | Switch to admin tools |
| View open jobs (47) | Preview as visitor | Force tier change |

**Section toolbars:** same pattern as Pro Profile. Special case for `Open contracts` — owner can click any row to open its applicant panel; visitor click navigates to public job page.

### Business Profile (Company)

**Hero CTA stack:**
| Visitor | Owner (Chris Wallace) | Admin |
|---|---|---|
| Request a quote (primary) | Post RFQ / contract (primary) | Edit profile |
| Follow company | Manage team (with red dot if pending member) | View as visitor |
| Message | Boost listing | Force CSIA re-verify |
| View open jobs (4) | Edit profile | Force tier change |

### Business Group Profile

**Hero CTA stack:**
| Visitor | Member | Owner / Admin (group admin) | Platform admin |
|---|---|---|---|
| Request to join (primary) | Start a discussion (primary) | Post group contract (primary) | Edit group |
| Follow group | Upcoming events (3) | Manage members | Force tier change |
| View members | Leave group | Approve pending (4) | Override leadership |
| View open jobs | (no boost) | Edit group | Audit moderation log |

### Hourly Contract (Standard + WG)

**Hero CTA stack:**
| Visitor | Owner (poster) | Admin | Applicant (post-apply) |
|---|---|---|---|
| Apply (or "Apply (signs NDA)" for WG) (primary) | View applicants (primary, with red dot) | Edit posting | Withdraw application |
| Save | Boost contract (if not WG, which is auto-boosted) | Force-close | Message poster |
| Share | Edit posting | Override tier (admin only) | (no boost) |
| Ask a question | Close posting early | Audit applicant log | (no boost) |

### Direct Job

**Hero CTA stack:** same shape as Hourly Standard, with "Apply now" replacing "Apply" and a longer multi-step apply flow.

### Pro Dashboard (owner-only)

**Quick-actions row:** all 6 actions (Apply / Update / Add Cert / Connect / Boost / Timesheet) are owner-only — there's no visitor view. Admin sees the same dashboard PLUS a "Switch to admin" toggle that flips the page to the admin dashboard.

### Customer Dashboard (owner-only)

**Quick-actions row:** all 6 actions (Post / Review / Message / Watchlist / Boost / Reports) are owner-only. Admin gets the "Switch to admin" toggle.

### Admin Dashboard (admin-only)

The whole page is admin-only. Three sub-roles toggle visible content:
- **Super Admin** (Tony): everything
- **Operations Admin**: moderation + payments + agent activity (read-only on flags + actions)
- **Trust & Safety**: moderation + fraud signals + disputes (read-only on payments + flags + actions)

## Edit-affordance visual treatment

When `view-self` is active (owner mode), every editable section gets these treatments:

- **Pencil icon** at top-right of the section card, visible on hover
- **Hover state** on individual rows: subtle background tint (`rgba(99,102,241,0.04)`) + cursor changes to text-edit
- **"+ Add" button** at the bottom of every list section, full-width dashed-border glass card
- **Drag handle** (⋮⋮) on the left of each list-row, visible on hover, enables drag-to-reorder
- **Save / Cancel** buttons appear inline when a row is in edit-state (centered modal for complex edits)

## Admin-inline moderation pattern

When `view-admin` is active, every section gets a small admin strip below its title:

```
[Trust score: 98]  [KYC: ✓ 2017-03-14]  [Disputes: 0]  [Audit log →]
```

Plus three action buttons on hover for any individual row:
- 🚩 **Flag** — opens centered modal: reason select + free-text + escalation-to-Tony toggle
- 🚫 **Hide** — confirmation modal: hide-from-public toggle, hide-duration select, audit-log entry
- 🗑 **Delete** — hard-delete confirmation modal: requires reason + super-admin re-auth for protected fields

## Audit-log hover (admin-only)

Hover any editable field with `view-admin` active and a small glass tooltip appears:

> Last edited 2026-04-22 14:08 by Maria Lopez (owner) — was: "Senior Controls Engineer, Detroit MI" — now: "Senior Controls Engineer · 9 yrs · Detroit, MI"

Click to expand the full audit log for that field.

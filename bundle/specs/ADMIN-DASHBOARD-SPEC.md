# Admin Dashboard — Section + Behavior Specification

**No source HTML exists for this page.** This spec is the canonical brief.

**Subject:** Tony Wallace (or any platform admin)
**JSON:** `../data/admin.json`
**Visibility:** entirely admin-only — no visitor / owner views.

## Layout — desktop 1440

3-column grid, top-aligned glass panels over the same animated wallpaper as the Feed:

```
[ KPI Strip — full width, 7 tiles ]

[ Moderation queue        ] [ Payments queue          ] [ Disputes open       ]
[ filters + 5 rows         ] [ filters + 4 rows         ] [ 3 rows              ]

[ Platform health (6 services) ] [ Agent activity     ] [ Fraud signals       ]
[ status pills + p99 + uptime  ] [ 5 agents · status   ] [ 3 risk signals      ]

[ Feature flags                ] [ Recent admin actions (4 entries)             ]
[ 6 flags · ramp · owner       ] [ audit log style                              ]
```

## Layout — mobile 375

Single column, KPI strip horizontal-scrolling, each section becomes a full-width card.

## Section-by-section

### 1. KPI Strip (full width, top)
**Purpose:** at-a-glance platform health.

7 glass tiles, each with: icon · label · value · trend chip (color-coded).
- Total users · Active contracts · GMV YTD · P0/P1 bugs open · Pending moderation · Disputes open · Payments pending review.

**Render:** glass surface (0.32 opacity), JetBrains Mono 700 for the value, JetBrains Mono 500 for the trend, Outfit 500 for the label.
**Click any tile:** navigates to that domain's full page.

---

### 2. Moderation queue
**Purpose:** approve / reject items that auto-systems can't decide on alone.

**Filters (chip row):** User signups (7) · Company signups (3) · Content reports (2) · Review disputes (1) · Profile edit reviews (1).
**Columns:** Subject · Kind · Reason · Submitted · Priority chip · 3-action button row.
**Row click → Side-panel:** full record (KYC docs, ID images, profile preview) + action history + free-text note field.
**Bulk actions (checkbox column):** Approve selected · Reject selected · Assign to admin.
**Sort:** by priority desc, then submitted_at desc.

---

### 3. Payments queue
**Purpose:** review high-value or flagged payments before release.

**Filters:** ≥$5K (3) · First payment (2) · International (0) · Flagged (3).
**Columns:** Contract ID · From · To · Amount (JBM 700) · Kind · Flagged reason · Status pill · Submitted.
**Row click → Centered modal:** invoice PDF preview + timesheet + customer attestation + admin notes + Approve/Hold/Investigate buttons.
**Bulk actions:** Approve selected · Hold for review · Send to AP for follow-up.

---

### 4. Disputes open
**Purpose:** track active disputes, escalate to legal/Andrew when needed.

**Columns:** Parties · Amount · Kind · Opened · Owner · Status · Priority.
**Row click → Side-panel:** full dispute thread + evidence files + payment hold status + scheduled mediation slot + escalation buttons (legal, AA WG Concierge, Andrew).
**Sort:** by priority desc.

---

### 5. Platform health
**Purpose:** real-time service status.

6 rows, one per service (feed_api, ws, db, s3, sendgrid, twilio).
**Per row:** icon · service name · status pill (healthy / warning / down) · p99 latency (JBM) · error rate · uptime 30d.
**Warning rows show inline warning text** (e.g., "Link Branding cert renewal due 2026-05-12").
**Click row → Side-panel:** Grafana embed for that service + recent incidents log + on-call contact.

---

### 6. Agent activity (24h)
**Purpose:** see what each Marcus/agent is doing.

**Rows:** agent name · role · last active timestamp · current task.
**Click row → Side-panel:** agent's `AGENT-TRACKER.md` excerpt + last 3 reports + current assignment.

---

### 7. Fraud / risk signals
**Purpose:** surface anomalies that auto-systems flagged.

**Per row:** kind chip (duplicate account, bounced payment, credential stuffing) · subject · risk score (0–100, JBM 700, color-coded) · first seen · action recommended.
**Click row → Centered modal:** evidence pack + recommended action + 1-click "Apply recommendation" button + manual override.

---

### 8. Feature flags
**Purpose:** flip platform-wide flags without a deploy.

**Per row:** flag name (JBM) · scope (production / staging / dev) · current value (on / off) · ramp percentage · owner · last changed.
**Click row → Centered modal:** value toggle + ramp slider (0–100%) + scope select + audit log of past changes + Save (locks until reason supplied).

---

### 9. Recent admin actions
**Purpose:** audit log.

Reverse-chronological list (last 50 actions). Per row: actor · action · subject · timestamp.
**Click row → Centered modal:** full action detail + diff (before/after) + revert button (where applicable).

---

### 10. Search command palette (always-on, ⌘K)
**Purpose:** jump to anything fast.

**Triggers:**
- `u <user>` — open user record
- `c <contract>` — open contract
- `/<keyword>` — full-text search platform
- `feature <name>` — toggle / inspect flag
- `agent <name>` — open agent assignment
- `deploy` — trigger Napoleon assignment

**Render:** centered glass modal at top of viewport, 50% width, with autocomplete dropdown showing top 5 matches as you type. ESC closes. Each result row has a kbd hint showing the action.

## Behaviors common to all queues

- **Stale data badge:** if data is older than 60 seconds, a small pulse-dot indicator appears top-right of the card with tooltip "Last refreshed Nm ago. Click to refresh."
- **Empty states:** glass card with "Nothing here right now." (Professor voice — no "🎉 You're all caught up!")
- **Loading states:** glass card with shimmer (no spinners).
- **Error states:** glass card with `--status-danger` border + "We couldn't load that. Try again." (matches Professor failure mode).

## Voice / copy

Every label, button, and status uses the Professor voice:
- "Approve" · "Reject" · "Hold" · "Investigate" — never "Yikes!" "Oops!" "Let's go!"
- Numbers in JetBrains Mono 700.
- Date format: `Apr 25, 2026 · 08:42 EST` (never `4/25/26`).
- Currency: `$2,400,000` or `$2.4M` (JBM, color-coded).

## Permissions

Three admin sub-roles can be toggled top-right (only super-admin sees all three):

| Role | Sees |
|---|---|
| **Super Admin** (Tony) | Everything + can flip flags + can override KYC/payments/disputes |
| **Operations Admin** | Moderation queue + Payments queue + Agent activity (read-only on flags + actions) |
| **Trust & Safety** | Moderation + Fraud signals + Disputes (read-only on payments + flags + actions) |

Render the role toggle as a glass pill with 3 segments, top-right of the page (next to light/dark toggle and admin avatar).

## What this admin dashboard explicitly does NOT include

(Out of scope for v1 — separate pages):
- Full user record (open in side-panel from moderation queue instead)
- Full contract record (open in side-panel from disputes/payments queue)
- Full audit log search (`/audit-log` page)
- Billing / Stripe integration (`/admin/billing` page)
- Agent assignment composer (`/admin/agents` page)
- Bug tracker (lives in GitHub Project #1, not in admin dashboard)

If Claude Design wants visual completeness, render placeholder glass cards with section title + "Open detail page →" link for any of these.

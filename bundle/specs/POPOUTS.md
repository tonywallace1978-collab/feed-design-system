# Pop-out Specifications — All 9 Page Types

Three modal patterns are used across every page. Pick the right one per trigger.

| Pattern | When to use | Behavior |
|---|---|---|
| **Side-panel** | List rows, sequential browsing | 480 px slide-in from right, glass surface, ESC closes, click backdrop closes, ←→ keys navigate adjacent rows |
| **Centered modal** | Single-item detail, edit forms | 640 px max-width centered card, glass scrim behind, focus-trapped, ESC closes |
| **Fullscreen takeover** | Photo lightbox, video player, document viewer | Full viewport, glass scrim, X close button top-right, ESC closes |

All modals: 24 px backdrop-blur, 0.50 glass-bg-elevated surface, 1px white-12 border, 0 16px 48px black-30 shadow, slide-in 250 ms ease-out.

---

## 1. Professional Profile

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click profile photo | Fullscreen | Photo at native resolution, optional bio caption |
| Click "47 reviews" stat | Side-panel | Full reviews list, sortable; row click → centered modal with full review |
| Click "412 connections" | Side-panel | Connection list; search bar; mutual count |
| Click "34 contracts" | Side-panel | Completed contract list; row click → contract detail centered modal |
| Click profile-strength bar | Centered | Checklist of completeness items, each "Fix this" CTA scrolls to section |
| Click "Edit availability" (owner) | Centered | Calendar grid + capacity slider + OT/weekend/nightshift checkboxes |
| Click "Edit rates" (owner) | Centered | 4 rate fields + currency + min-hours + negotiable toggle |
| Click employer business card | navigate | Routes to `/company/[id]` |
| Click any Business Group row | navigate | Routes to `/business-groups/[id]` |
| Click any Secure File row (owner) | Fullscreen | PDF/image viewer with download/replace/delete actions |
| Click "Upload" file (owner) | Centered | Drag-drop zone + type select + expires-at picker |
| Click any Private Info masked row (owner) | Centered | Re-auth challenge → reveal raw value + edit form |
| Click any earned badge | Centered | Badge art (200 px) + name + tier + criterion + earned-at + share-to-LinkedIn |
| Click any locked badge | Centered | Same shape + "How to earn" + progress meter |
| Click any skill tile | Side-panel | Manufacturer logo + full models + certs (verify links) + linked endorsements + sample work |
| Click "Add skill" (owner) | Centered | Manufacturer typeahead + models multi-select + years + cert upload |
| Click any review card | Centered | Full text + reviewer + role + company + contract + 5-star detail + reply (owner) |
| Click any experience card | Centered | Full description + highlights + dates + manager + linked endorsements |
| Click any cert row | Centered | Cert detail + verify-link + uploaded credential file + renewal-reminder toggle |
| Click any education row | Centered | Edit form: school typeahead, degree, concentration, year, GPA, honors |
| Click any language row | Centered | Edit form: language typeahead + proficiency dropdown |
| Click any equipment category | Centered | Edit list: add/remove items, drag to reorder |
| Click service-radius map | Fullscreen | Mapbox map with editable radius slider (owner) or radius circle (visitor) |
| Click any endorser row | navigate | Routes to endorser's profile |
| Click "Request endorsement" (owner) | Centered | Connection picker + skill select + optional message |
| Click active application card | Side-panel | Full application detail + withdraw + message-employer + interview details |
| Click trust score (admin) | Centered | Score breakdown (KYC/payment/dispute/activity factors) + audit log |
| Click "Add admin note" | Centered | Free-text textarea + visibility toggle + save |

---

## 2. Customer Profile

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click company logo | Fullscreen | Logo at native res + facility-photos carousel |
| Click any open-contract row | navigate | Routes to `/contracts/[id]` |
| Click "Post a contract" (owner) | Fullscreen | Full multi-step contract wizard (out of scope to render in detail; show 1st step only) |
| Click any hire-history row | Centered | Contract detail + rating given + linked invoice + rebid CTA |
| Click any watched-pro row | navigate | Routes to professional profile |
| Click "+ Watch" (owner) | Centered | Search professionals + filter chips + add to watchlist |
| Click any preferred-BG row | navigate | Routes to BG profile |
| Click any review-left row | Centered | Full review text + edit (owner) |
| Click facility photo | Fullscreen | Photo lightbox + carousel arrows |
| Click any key-contact row | Centered | Contact detail + edit (owner) + send-message CTA |
| Click spending breakdown trade slice | Side-panel | Trade-specific contract list + spend rollup |
| Click any earned badge | Centered | (same as Pro) |

---

## 3. Business / Company Profile

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click company logo | Fullscreen | Logo at native res + facility-photos carousel |
| Click "Request a quote" (visitor) | Centered | Quote-request form: scope summary + budget range + timeline + contact preference |
| Click any team-member card | navigate | Routes to professional profile |
| Click "Manage team" (owner) | Side-panel | Roster with role / availability / primary-contact toggles + add-member CTA |
| Click any service-offered card | Centered | Service detail + sample work + rate breakdown + book-this CTA |
| Click any work-history-by-team row | Centered | Project detail + customer + outcome + linked review |
| Click any work-history-for-team row | Centered | Vendor detail + linked review-left |
| Click any open-position row | navigate | Routes to job posting |
| Click any customer review | Centered | Full review + reply (owner) |
| Click any cert row | Centered | (same as Pro) |
| Click any media item | Fullscreen | Image/video player |
| Click "Boost listing" (owner) | Centered | Boost duration select (3/7/14 days) + cost preview + payment confirmation |

---

## 4. Business Group Profile

(Pattern lifted from Company Profile, with these additions:)

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click any member-row | navigate | Routes to professional profile |
| Click "Apply All Available Professionals" (owner) | Centered | Confirmation: "Apply 5 available members to which contract?" + contract picker + per-member rate override |
| Click "+ Create Group" | Centered | Group form: name, type, description, public/private toggle, member-invite list |
| Click member availability filter chip | (in-page filter, no modal) | Filters member list to Available Now / On Contract / Unavailable |
| Click group geographic map | Fullscreen | Mapbox with regional coverage overlay |

---

## 5. Direct Job (W-2 posting)

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click "Apply now" (visitor) | Fullscreen | Multi-step application: cover note + relevant experience + availability + references |
| Click "Save" (visitor) | (toast — no modal) | Saved confirmation chip + "View saved jobs" link |
| Click "Share" | Centered | Share menu: copy link, email, LinkedIn, X, WhatsApp |
| Click "Ask a question" | Centered | Question form: anonymous toggle + 200-char text |
| Click company brief sidebar | navigate | Routes to company profile |
| Click any benefit chip | Centered | Benefit detail + plan documents (PDF) link |
| Click any interview-process step | Centered | Step detail + what to expect + who you'll meet (where applicable) |
| Click any sample interview question | Centered | Question detail + tips for answering (Professor voice — concise) |
| Click any team-summary avatar | navigate | Routes to professional profile |
| Click any applicant row (owner) | Side-panel | Applicant detail + score breakdown + status change actions |
| Click similar-jobs card | navigate | Routes to that job |

---

## 6 + 7. Hourly Contract (White Glove + Standard)

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click "Apply (signs NDA)" — White Glove (visitor) | Centered | NDA modal: 2-yr mutual NDA text + check "I have read" + sign-with-typed-name + Apply CTA |
| Click "Apply" — Standard (visitor) | Fullscreen | Application: cover note + rate proposed + availability + references |
| Click any compliance-required item | Centered | Item detail + how to provide / what's verified / who verifies |
| Click "Anonymous brief" (pre-NDA, WG only) | (no modal — read-only) | — |
| Click "Reveal customer" (post-NDA, WG only) | (in-page reveal — no modal) | Brief flips from anonymous → revealed |
| Click any white-glove-feature card | Centered | Feature detail + how it works + which side benefits |
| Click any applicant row (owner) | Side-panel | Applicant detail + NDA-signed-at + rate proposed + status actions |
| Click similar-contracts card | navigate | Routes to that contract |
| Click any question-log row | Centered | Q&A thread + ability to add follow-up question (visitor) |

---

## 8. Pro Dashboard

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click any KPI tile | Side-panel | KPI breakdown: history sparkline + drilldown rows |
| Click any recommended-contract card | navigate | Routes to contract |
| Click "Apply" on recommended-contract | Fullscreen | (same as standard apply flow) |
| Click any application-status row | Side-panel | Application detail + interview prep links + withdraw |
| Click any calendar event | Centered | Event detail + reschedule (where applicable) |
| Click any message preview | navigate | Routes to message thread |
| Click earnings sparkline | Side-panel | Full earnings ledger + invoice list + tax-doc downloads |
| Click profile-completeness "Fix this" | (in-page scroll) | Scrolls to relevant profile section |
| Click any watcher row | navigate | Routes to watcher profile |
| Click "Boost profile" quick-action | Centered | Boost duration select + cost preview |
| Click any notification | (varies) | Routes / opens detail per notification kind |

---

## 9. Customer Dashboard

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click any KPI tile | Side-panel | KPI breakdown |
| Click any open-contracts-table row | navigate | Routes to contract |
| Click any "Review" link in contract row | Side-panel | Applicant grid for that contract |
| Click any applicants-today row | Centered | Applicant card + accept/reject/shortlist actions |
| Click spending-trend bar | Side-panel | Quarter detail + by-trade pie + by-contractor list |
| Click any interview row | Centered | Interview detail + reschedule + cancel + post-interview score form |
| Click any message preview | navigate | Routes to thread |
| Click any shortlist carousel card | Centered | Candidate detail + assigned-to-contract + move actions |
| Click "Post a contract" quick-action | Fullscreen | Multi-step contract wizard |
| Click compliance-status warning | Centered | Warning detail + how to resolve |

---

## 10. Admin Dashboard

| Trigger | Pop-out shape | Content |
|---|---|---|
| Click any KPI tile | navigate | Routes to that domain's full page |
| Click any moderation row | Side-panel | Full record + KYC docs + ID images + free-text note + action history |
| Click any payments row | Centered | Invoice PDF + timesheet + customer attestation + admin note + Approve/Hold/Investigate |
| Click any dispute row | Side-panel | Full thread + evidence + payment hold + scheduled mediation + escalation buttons |
| Click any platform-health row | Side-panel | Grafana embed + recent incidents + on-call contact |
| Click any agent-activity row | Side-panel | AGENT-TRACKER excerpt + last 3 reports + current assignment |
| Click any fraud-signal row | Centered | Evidence pack + recommended action + 1-click apply + manual override |
| Click any feature-flag row | Centered | Toggle + ramp slider + scope + audit log + Save (with reason) |
| Click any admin-actions row | Centered | Full action detail + diff (before/after) + revert (where applicable) |
| ⌘K (always-on) | Centered (top of viewport, 50% width) | Search palette with autocomplete + kbd hints |

---

## Modal interaction rules common to every page

- **ESC** closes the modal
- **Click backdrop** closes the modal (centered + fullscreen only — side-panel requires X or ESC)
- **Focus trap** active while modal is open — Tab cycles within
- **Slide-in 250 ms** ease-out · slide-out 200 ms ease-in
- **Backdrop scrim** is glass: `rgba(0,0,0,0.50)` + `backdrop-filter: blur(8px)` so the underlying page reads as out-of-focus glass
- **Body scroll locked** while modal is open
- **URL hash updates** to `#modal=<kind>:<id>` so deep links work and back-button closes modal
- **Side-panel ←→ keys** navigate to adjacent rows in the source list
- **Modals never stack** — opening a new modal closes the prior one (use side-panels with drilldown for sequential browsing)

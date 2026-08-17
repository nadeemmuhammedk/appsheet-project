# PRD Skill Examples

This file contains examples of how to use the PRD skill effectively, including complete PRD examples and common scenarios.

---

## Example 1: Complete PRD for Order Management System

This is a complete example of a well-written PRD for an order management application.

# Product Requirements Document (PRD)

**Project Name:** [Company Name] Order Management System
**Version:** 1.0.0
**Date:** 2026-01-20
**Owner:** Operations Manager
**Status:** Approved

---

## 1. Purpose & Problem Statement

**What problem are we solving?**
The business currently manages customer orders, order status updates, and payment tracking using manual spreadsheets and paper order forms across a single sales office. This leads to:
- Data inconsistencies and errors
- Time-consuming manual data entry
- Difficulty tracking order status in real time
- Delayed payment and invoice reconciliation
- No real-time visibility for managers

**Why is this important?**
Streamlining order data management will:
- Reduce administrative overhead by 60%
- Improve data accuracy and consistency
- Enable real-time reporting for decision-making
- Enhance customer communication
- Support accurate revenue reporting

**Who is this for?**
Primary users: Sales reps, order fulfillment staff, and the sales manager at the business.

---

## 2. Target Audience & User Personas

**Primary Users:**
- **Sales Reps** - Front-line staff who take and manage customer orders
  - Pain Points: Manual data entry, difficulty finding customer records, tracking payment status
  - Goals: Quick order entry, easy status updates, streamlined payment tracking

- **Fulfillment Staff** - Warehouse/shipping staff
  - Pain Points: Paper-based status tracking, no visibility into order backlog
  - Goals: Quick status updates, view order queues, track shipment progress

- **Sales Manager** - Business management
  - Pain Points: Lack of real-time reporting, manual report generation
  - Goals: Monitor order pipeline, track revenue, make data-driven decisions

**Secondary Users:**
- Customers (view-only access to their own order status)
- Business Owner (future: receive revenue and cancellation notifications)

---

## 3. Features & Functionality

### Must-Have Features (MVP)
1. **Order Intake** - Register new orders with customer details, ordered items, and initial status
2. **Order Status Tracking** - Update each order's status through the pipeline (Pending, Processing, Shipped, Delivered, Cancelled)
3. **Payment & Invoice Management** - Record payments, track outstanding balances, generate invoices
4. **Rep Assignment** - Assign orders to sales reps and manage rep workload
5. **Basic Reporting** - View order status summaries, revenue reports, customer order history

### Should-Have Features
1. **SMS/Email Notifications** - Auto-notify customers on status changes or payment reminders
2. **Automated Rep Notification** - Automatically notify the assigned rep when one of their orders is cancelled
3. **Order History Tracking** - Record order revisions and fulfillment timeline per order

### Could-Have Features (Future)
1. **Customer Portal** - Web access for customers to view their own order status
2. **Mobile App** - Native mobile app for reps to manage orders on the go
3. **Advanced Analytics** - Predictive analytics for reorder likelihood, customer churn risk

### Won't-Have (Out of Scope)
- Online payment gateway integration (manual payment entry only)
- Full CRM feature set (lead scoring, marketing automation)
- Inventory/warehouse management integration
- Multi-warehouse support (single location deployment only)

---

## 4. Success Metrics & KPIs

**How will we measure success?**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Data Entry Time Reduction | 60% reduction vs. manual | Time study (before/after) |
| Daily Order Status Updates Completion | 100% by end of business day | AppSheet timestamp logs |
| Payment/Invoice Accuracy | 99.5% accuracy | Monthly audit comparison |
| User Adoption Rate | 95% of staff using daily | AppSheet usage analytics |
| Report Generation Time | < 2 minutes per report | User surveys |

**Release Criteria:**
- [ ] All Must-Have features implemented and tested
- [ ] Performance supports 500+ order records with < 2 sec load time
- [ ] 3 sales reps trained and able to use independently
- [ ] Data migration from existing spreadsheets complete with 100% accuracy
- [ ] Backup and recovery procedures documented

---

## 5. User Flow (High-Level)

**Primary User Journey (Rep creating a new order):**
1. Rep opens "Orders" view in AppSheet
2. Rep clicks "Add New Order" button
3. Rep enters order details (customer, items, quantity, initial status)
4. System auto-generates unique Order ID
5. Rep saves record
6. Result: Order is created and appears in the rep's order queue

**Fulfillment staff updating order status:**
1. Fulfillment staff opens "Orders Deck" view
2. Selects an order
3. Updates status (e.g., runs "Mark Shipped" action to move status to Shipped)
4. Saves the updated record
5. Result: Status change is recorded and visible in reports; customer notification is triggered if configured

---

## 6. Technical & System Requirements

**Platform:**
AppSheet (no-code mobile app platform)

**Data Storage:**
Google Sheets (cloud-based spreadsheet)

**Integrations:**
- Google Sheets - Primary data storage
- Gmail - Email notifications (future)
- SMS Gateway - SMS notifications (future, via Apps Script)

**Performance Requirements:**
- Response time: < 2 seconds for data entry forms
- Concurrent users: Support 10 simultaneous users
- Uptime: 99% availability (dependent on Google infrastructure)
- Data capacity: Support 500+ orders, 200+ customers, 10 reps

**Access Requirements:**
- Mobile access (Android/iOS via AppSheet mobile app)
- Offline mode for order status updates (sync when online)
- Role-based access control (Manager, Rep, View-Only)

---

## 7. Assumptions & Constraints

**Assumptions:**
- All users have smartphones with internet access
- Google Workspace account is available for the business
- Staff are familiar with basic mobile app usage
- Existing order data can be cleaned and migrated

**Constraints:**
- No budget for custom development (must use AppSheet no-code platform)
- Must work offline (limited internet connectivity in the warehouse)
- Must integrate with existing Google Sheets workflows
- No dedicated IT support (system must be maintainable by office staff)

---

## 8. Risks & Dependencies

**Risks:**
| Risk | Impact | Probability | Mitigation |
|------|--------|------------|------------|
| Low user adoption due to technology resistance | High | Medium | Comprehensive training, phased rollout, ongoing support |
| Data migration errors from legacy spreadsheets | High | Medium | Pilot with 50 orders first, thorough validation checks |
| AppSheet platform limitations or cost increases | Medium | Low | Document workarounds, maintain Google Sheets backup |
| Internet connectivity issues affecting usage | Medium | Medium | Enable offline mode, train users on sync procedures |

**Dependencies:**
- Google Workspace account approval and setup
- Existing order data cleanup (estimated 2 weeks)
- Sales rep availability for training (3 days minimum)
- Management approval for process changes

---

## 9. Timeline & Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| PRD Approval | 2026-01-20 | Complete |
| AppSheet App Prototype | 2026-02-01 | In Progress |
| Data Migration Complete | 2026-02-15 | Planned |
| User Training Complete | 2026-02-20 | Planned |
| Pilot Launch (50 orders) | 2026-02-25 | Planned |
| Full Launch (All orders) | 2026-03-10 | Planned |

---

## 10. Stakeholder Sign-Off

| Stakeholder | Role | Approval Date | Signature/Status |
|-------------|------|---------------|------------------|
| Sarah Martinez | Sales Manager | 2026-01-20 | ✓ Approved |
| Alex Johnson | Ops Lead | 2026-01-20 | ✓ Approved |
| Michael Chen | Technical Consultant | 2026-01-20 | ✓ Approved |

---

## 11. Open Questions & Decisions Needed

- [x] Which SMS gateway to use for notifications? (Decision: Deferred to Phase 2)
- [ ] Should customers have app access or web-only? (Decision needed by 2026-02-05)
- [ ] How to handle order reassignment between reps? (Needs input from Ops Lead)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-20 | [Author Name] | Initial PRD |

---

## Notes

- This is a **high-level** document focused on **what** to build, not **how** to build it
- For detailed technical specifications, see `docs/formulas/` folder
- This document should be reviewed and updated as requirements evolve
- Keep it concise and focused on strategic alignment

---

## Example 2: Good vs Bad PRD Sections

### ❌ BAD: Vague Problem Statement

## 1. Purpose & Problem Statement

**What problem are we solving?**
We need to improve order management and make things more efficient.

**Why is this important?**
Because it will help the business.

**Problems:**
- No specific pain points identified
- No measurable impact stated
- Doesn't explain WHO has the problem

### ✅ GOOD: Specific Problem Statement

## 1. Purpose & Problem Statement

**What problem are we solving?**
The business currently manages 300+ orders/month using manual spreadsheets, causing:
- 5+ hours/week spent on manual status compilation
- 15% error rate in payment/invoice tracking
- 2-3 day delay in generating order status reports

**Why is this important?**
Automating order data management will:
- Reduce administrative overhead by 60% (save 20 hours/week)
- Eliminate payment tracking errors, preventing $50,000+ annual revenue leakage
- Enable real-time reporting for accurate revenue forecasting

**Why it's good:**
- Specific, measurable problems
- Quantified impact
- Clear stakeholder value

---

## Example 3: Handling Feature Requests

**Scenario:** During implementation, a stakeholder requests a new feature: "Can we add a customer-facing order tracking portal?"

**Decision Process:**

1. **Evaluate against PRD scope**
   - Is it Must-Have for MVP? NO
   - Does it align with user personas? PARTIALLY (customers are secondary users)
   - Does it impact timeline/budget? YES (significant)

2. **Document in PRD**
   - Add to "Could-Have Features (Future)" if valuable
   - OR add to "Won't-Have (Out of Scope)" if not aligned

3. **Update PRD if approved**

   ## Document History
   | Version | Date | Author | Changes |
   |---------|------|--------|---------|
   | 1.0.0 | 2026-01-20 | [Author Name] | Initial PRD |
   | 1.1.0 | 2026-02-10 | [Author Name] | Added customer portal to Could-Have (deferred to Phase 2) |

---

## Example 4: Integration with Technical Documentation

**PRD says WHAT:**

### Must-Have Features (MVP)
1. **Order Status Tracking** - Update each order's status through the pipeline (Pending, Processing, Shipped, Delivered, Cancelled)

**Technical docs say HOW:**

In `docs/formulas/appsheet_formulas.md`:

#### Orders Table

**Column: Status**
```appsheet
Column Name: Status
Type: Enum
VALID_IF: LIST("Pending", "Processing", "Shipped", "Delivered", "Cancelled")
EDITABLE: TRUE
SHOW IF: TRUE
REQUIRE: YES
Description: "Current fulfillment status of the order"
```

**Key Principle:** PRD defines business requirements, technical docs define implementation.

---

## Example 5: Using MoSCoW Prioritization Effectively

### ❌ BAD: Everything is Must-Have

### Must-Have Features (MVP)
1. Order intake
2. Order status tracking
3. Payment management
4. SMS notifications
5. Email notifications
6. Automated rep notifications
7. Customer portal
8. Mobile app for reps
9. Advanced analytics
10. Revenue tracking

**Problem:** No real prioritization, scope creep, unrealistic MVP

### ✅ GOOD: Clear Prioritization

### Must-Have Features (MVP)
1. **Order Intake** - Core functionality, can't track orders without it
2. **Order Status Tracking** - Primary use case, needed for fulfillment
3. **Payment & Invoice Management** - Critical for revenue tracking

### Should-Have Features
1. **SMS Notifications** - High value but can be manual initially
2. **Automated Rep Notification** - Important but lower frequency (only on cancellations)

### Could-Have Features (Future)
1. **Customer Portal** - Nice to have, not critical for staff workflows
2. **Advanced Analytics** - Valuable for insights, not core operations

### Won't-Have (Out of Scope)
- Multi-warehouse support (single location only for MVP)
- Online payment gateway (manual entry sufficient)

**Why it's good:**
- Clear separation of critical vs nice-to-have
- Rationale provided for prioritization
- Explicit scope boundaries (Won't-Have)

---

## Common Scenarios

### Scenario 1: Starting a New Project

**User says:** "I want to build an order tracking app"

**Claude should:**
1. Invoke `/prd-skill` automatically
2. Ask clarifying questions:
   - What's the primary problem you're solving?
   - Who are the users?
   - What features are absolutely critical?
   - Are there any constraints (budget, timeline, platform)?
3. Create initial PRD draft with placeholders
4. Guide user to fill in missing sections

### Scenario 2: Updating Existing PRD

**User says:** "Add online payment gateway to the PRD"

**Claude should:**
1. Read existing PRD first
2. Determine which section to update (Features & Functionality)
3. Ask: "Should this be Must-Have, Should-Have, or Could-Have?"
4. Generate updated PRD content showing the changes
5. Increment version number (e.g., 1.0.0 → 1.1.0)
6. Update Document History table
7. Return the updated content for user approval

### Scenario 3: Scope Creep Management

**User says:** "Can we also add full CRM features?"

**Claude should:**
1. Read PRD to check current scope
2. Evaluate if aligned with purpose & problem statement
3. If NOT aligned: Suggest adding to "Won't-Have (Out of Scope)" with rationale
4. If ALIGNED but large: Suggest adding to "Could-Have (Future)" and consider Phase 2
5. Update PRD and version history

---

## Checklist: Is My PRD Complete?

Use this checklist before finalizing a PRD:

**Structure:**
- [ ] All 11 sections present (Purpose through Document History)
- [ ] Version number at top (format: X.Y.Z)
- [ ] Date and owner specified
- [ ] Status is set (Draft/In Review/Approved)

**Content Quality:**
- [ ] Problem statement is specific and measurable
- [ ] User personas include pain points and goals
- [ ] Features use MoSCoW prioritization (Must/Should/Could/Won't)
- [ ] Success metrics are measurable with targets
- [ ] Technical requirements specify platform and integrations
- [ ] Risks include mitigation strategies
- [ ] Timeline has realistic milestones

**Completeness:**
- [ ] Won't-Have section explicitly defines scope boundaries
- [ ] All placeholders `[...]` are replaced with actual content
- [ ] Stakeholders are identified with roles
- [ ] Open questions are documented
- [ ] Document history table is up to date

**Alignment:**
- [ ] Features align with problem statement
- [ ] Success metrics tie to business objectives
- [ ] Technical requirements support features
- [ ] Timeline is realistic given constraints

---

## Anti-Patterns: What NOT to Do

### ❌ Including Application Version Numbers

**WRONG:**

## 3. Features & Functionality

### V1 Features (MVP)
1. Order intake
2. Order status tracking

### V2 Features (Phase 2)
1. SMS notifications
2. Automated rep notifications

### V3 Features (Future)
1. Customer portal

**Why it's wrong:** PRD version ≠ Application version. Use MoSCoW prioritization instead.

**CORRECT:**

## 3. Features & Functionality

### Must-Have Features (MVP)
1. Order intake
2. Order status tracking

### Should-Have Features
1. SMS notifications
2. Automated rep notifications

### Could-Have Features (Future)
1. Customer portal

### ❌ Too Much Technical Detail

**WRONG:**

### Must-Have Features (MVP)
1. **Order Intake** - Create an "Orders" table in Google Sheets with columns:
   - OrderID (UNIQUEID() formula)
   - CustomerID (Type: Ref to Customers, REQUIRE: TRUE)
   - Status (Type: Enum, VALID_IF: LIST("Pending", "Processing", "Shipped", "Delivered", "Cancelled"))
   - RepID (Type: Ref to Reps, VALID_IF: SELECT(Reps[RepID], [Active]=TRUE))

**Why it's wrong:** This is implementation detail, belongs in technical docs.

**CORRECT:**

### Must-Have Features (MVP)
1. **Order Intake** - Register new orders with customer details, ordered items, and rep assignment. System should auto-generate unique order IDs and validate rep availability.

---

**Version:** 1.0
**Last Updated:** 2026-01-20
**Changes:** Initial examples and usage scenarios

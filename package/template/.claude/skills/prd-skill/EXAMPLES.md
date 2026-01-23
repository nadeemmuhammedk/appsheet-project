# PRD Skill Examples

This file contains examples of how to use the PRD skill effectively, including complete PRD examples and common scenarios.

---

## Example 1: Complete PRD for Student Management System

This is a complete example of a well-written PRD for a student management application.

```markdown
# Product Requirements Document (PRD)

**Project Name:** Digital Marketing Institute Student Data App - Tirur
**Version:** 1.0.0
**Date:** 2026-01-20
**Owner:** Institute Administrator
**Status:** Approved

---

## 1. Purpose & Problem Statement

**What problem are we solving?**
The Tirur branch currently manages student data, attendance, and fee payments using manual spreadsheets and paper records. This leads to:
- Data inconsistencies and errors
- Time-consuming manual data entry
- Difficulty tracking student attendance patterns
- Delayed fee payment processing
- No real-time visibility for administrators

**Why is this important?**
Streamlining student data management will:
- Reduce administrative overhead by 60%
- Improve data accuracy and consistency
- Enable real-time reporting for decision-making
- Enhance parent/student communication
- Support regulatory compliance for attendance tracking

**Who is this for?**
Primary users: Institute administrators, instructors, and front desk staff at the Tirur branch of Digital Marketing Institute.

---

## 2. Target Audience & User Personas

**Primary Users:**
- **Admin Staff** - Front desk and administrative personnel
  - Pain Points: Manual data entry, difficulty finding student records, tracking fee payments
  - Goals: Quick student enrollment, easy attendance marking, streamlined fee collection

- **Instructors** - Teaching staff
  - Pain Points: Paper-based attendance, no visibility into student progress
  - Goals: Quick attendance marking, view class rosters, track student participation

- **Branch Manager** - Institute management
  - Pain Points: Lack of real-time reporting, manual report generation
  - Goals: Monitor attendance trends, track revenue, make data-driven decisions

**Secondary Users:**
- Students (view-only access to their records)
- Parents (future: receive attendance notifications)

---

## 3. Features & Functionality

### Must-Have Features (MVP)
1. **Student Enrollment** - Register new students with personal details, course enrollment, and batch assignment
2. **Attendance Tracking** - Mark daily attendance for each batch with Present/Absent/Leave status
3. **Fee Payment Management** - Record fee payments, track outstanding balances, generate receipts
4. **Batch Management** - Create and manage batches (course, schedule, instructor assignment)
5. **Basic Reporting** - View attendance summaries, fee collection reports, student lists

### Should-Have Features
1. **SMS/Email Notifications** - Auto-notify parents for absences or fee reminders
2. **Certificate Generation** - Generate course completion certificates
3. **Student Progress Tracking** - Record test scores and assignment completion

### Could-Have Features (Future)
1. **Parent Portal** - Web access for parents to view student records
2. **Mobile App** - Native mobile app for instructors to mark attendance
3. **Advanced Analytics** - Predictive analytics for dropout risk, performance trends

### Won't-Have (Out of Scope)
- Online payment gateway integration (manual payment entry only)
- Learning management system (LMS) features
- Video conferencing integration
- Multi-branch support (Tirur branch only)

---

## 4. Success Metrics & KPIs

**How will we measure success?**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Data Entry Time Reduction | 60% reduction vs. manual | Time study (before/after) |
| Daily Attendance Completion | 100% by 10 AM | AppSheet timestamp logs |
| Fee Collection Accuracy | 99.5% accuracy | Monthly audit comparison |
| User Adoption Rate | 95% of staff using daily | AppSheet usage analytics |
| Report Generation Time | < 2 minutes per report | User surveys |

**Release Criteria:**
- [ ] All Must-Have features implemented and tested
- [ ] Performance supports 500+ student records with < 2 sec load time
- [ ] 3 admin staff trained and able to use independently
- [ ] Data migration from existing spreadsheets complete with 100% accuracy
- [ ] Backup and recovery procedures documented

---

## 5. User Flow (High-Level)

**Primary User Journey (Admin enrolling a new student):**
1. Admin opens "Students" view in AppSheet
2. Admin clicks "Add New Student" button
3. Admin enters student details (name, contact, course, batch)
4. System auto-generates unique Student ID
5. Admin saves record
6. Result: Student is enrolled and appears in batch roster

**Instructor marking attendance:**
1. Instructor opens "Attendance" view
2. Selects batch and date
3. Marks each student as Present/Absent/Leave
4. Saves attendance record
5. Result: Attendance is recorded and visible in reports

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
- Data capacity: Support 500+ students, 50+ batches, 10,000+ attendance records

**Access Requirements:**
- Mobile access (Android/iOS via AppSheet mobile app)
- Offline mode for attendance marking (sync when online)
- Role-based access control (Admin, Instructor, View-Only)

---

## 7. Assumptions & Constraints

**Assumptions:**
- All users have smartphones with internet access
- Google Workspace account is available for the institute
- Staff are familiar with basic mobile app usage
- Existing student data can be cleaned and migrated

**Constraints:**
- No budget for custom development (must use AppSheet no-code platform)
- Must work offline (limited internet connectivity in classrooms)
- Must integrate with existing Google Sheets workflows
- No dedicated IT support (system must be maintainable by admin staff)

---

## 8. Risks & Dependencies

**Risks:**
| Risk | Impact | Probability | Mitigation |
|------|--------|------------|------------|
| Low user adoption due to technology resistance | High | Medium | Comprehensive training, phased rollout, ongoing support |
| Data migration errors from legacy spreadsheets | High | Medium | Pilot with 50 students first, thorough validation checks |
| AppSheet platform limitations or cost increases | Medium | Low | Document workarounds, maintain Google Sheets backup |
| Internet connectivity issues affecting usage | Medium | Medium | Enable offline mode, train users on sync procedures |

**Dependencies:**
- Google Workspace account approval and setup
- Existing student data cleanup (estimated 2 weeks)
- Admin staff availability for training (3 days minimum)
- Management approval for process changes

---

## 9. Timeline & Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| PRD Approval | 2026-01-20 | Complete |
| AppSheet App Prototype | 2026-02-01 | In Progress |
| Data Migration Complete | 2026-02-15 | Planned |
| User Training Complete | 2026-02-20 | Planned |
| Pilot Launch (50 students) | 2026-02-25 | Planned |
| Full Launch (All students) | 2026-03-10 | Planned |

---

## 10. Stakeholder Sign-Off

| Stakeholder | Role | Approval Date | Signature/Status |
|-------------|------|---------------|------------------|
| Rasheed Khan | Branch Manager | 2026-01-20 | ✓ Approved |
| Fatima Ahmed | Admin Lead | 2026-01-20 | ✓ Approved |
| Arun Kumar | Technical Consultant | 2026-01-20 | ✓ Approved |

---

## 11. Open Questions & Decisions Needed

- [x] Which SMS gateway to use for notifications? (Decision: Deferred to Phase 2)
- [ ] Should parents have app access or web-only? (Decision needed by 2026-02-05)
- [ ] How to handle student transfers between batches? (Needs input from Admin Lead)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-20 | Arun Kumar | Initial PRD |

---

## Notes

- This is a **high-level** document focused on **what** to build, not **how** to build it
- For detailed technical specifications, see `docs/formulas/` folder
- This document should be reviewed and updated as requirements evolve
- Keep it concise and focused on strategic alignment
```

---

## Example 2: Good vs Bad PRD Sections

### ❌ BAD: Vague Problem Statement
```markdown
## 1. Purpose & Problem Statement

**What problem are we solving?**
We need to improve student management and make things more efficient.

**Why is this important?**
Because it will help the institute.
```

**Problems:**
- No specific pain points identified
- No measurable impact stated
- Doesn't explain WHO has the problem

### ✅ GOOD: Specific Problem Statement
```markdown
## 1. Purpose & Problem Statement

**What problem are we solving?**
The Tirur branch currently manages 300+ students using manual spreadsheets, causing:
- 5+ hours/week spent on manual attendance compilation
- 15% error rate in fee payment tracking
- 2-3 day delay in generating attendance reports

**Why is this important?**
Automating student data management will:
- Reduce administrative overhead by 60% (save 20 hours/week)
- Eliminate fee tracking errors, preventing ₹50,000+ annual revenue leakage
- Enable real-time reporting for regulatory compliance
```

**Why it's good:**
- Specific, measurable problems
- Quantified impact
- Clear stakeholder value

---

## Example 3: Handling Feature Requests

**Scenario:** During implementation, a stakeholder requests a new feature: "Can we add a parent mobile app?"

**Decision Process:**

1. **Evaluate against PRD scope**
   - Is it Must-Have for MVP? NO
   - Does it align with user personas? PARTIALLY (parents are secondary users)
   - Does it impact timeline/budget? YES (significant)

2. **Document in PRD**
   - Add to "Could-Have Features (Future)" if valuable
   - OR add to "Won't-Have (Out of Scope)" if not aligned

3. **Update PRD if approved**
   ```markdown
   ## Document History
   | Version | Date | Author | Changes |
   |---------|------|--------|---------|
   | 1.0.0 | 2026-01-20 | Arun Kumar | Initial PRD |
   | 1.1.0 | 2026-02-10 | Arun Kumar | Added parent mobile app to Could-Have (deferred to Phase 2) |
   ```

---

## Example 4: Integration with Technical Documentation

**PRD says WHAT:**
```markdown
### Must-Have Features (MVP)
1. **Attendance Tracking** - Mark daily attendance for each batch with Present/Absent/Leave status
```

**Technical docs say HOW:**

In `docs/formulas/appsheet_formulas.md`:
```markdown
#### Attendance Table

**Column: Status**
```appsheet
Column Name: Status
Type: Enum
VALID_IF: LIST("Present", "Absent", "Leave")
EDITABLE: TRUE
SHOW IF: TRUE
REQUIRE: YES
Description: "Student attendance status for the day"
```
```

**Key Principle:** PRD defines business requirements, technical docs define implementation.

---

## Example 5: Using MoSCoW Prioritization Effectively

### ❌ BAD: Everything is Must-Have
```markdown
### Must-Have Features (MVP)
1. Student enrollment
2. Attendance tracking
3. Fee payments
4. SMS notifications
5. Email notifications
6. Certificate generation
7. Parent portal
8. Mobile app for instructors
9. Advanced analytics
10. Performance tracking
```

**Problem:** No real prioritization, scope creep, unrealistic MVP

### ✅ GOOD: Clear Prioritization
```markdown
### Must-Have Features (MVP)
1. **Student Enrollment** - Core functionality, can't track students without it
2. **Attendance Tracking** - Primary use case, regulatory requirement
3. **Fee Payment Management** - Critical for revenue tracking

### Should-Have Features
1. **SMS Notifications** - High value but can be manual initially
2. **Certificate Generation** - Important but lower frequency

### Could-Have Features (Future)
1. **Parent Portal** - Nice to have, not critical for staff workflows
2. **Advanced Analytics** - Valuable for insights, not core operations

### Won't-Have (Out of Scope)
- Multi-branch support (Tirur only for MVP)
- Online payment gateway (manual entry sufficient)
```

**Why it's good:**
- Clear separation of critical vs nice-to-have
- Rationale provided for prioritization
- Explicit scope boundaries (Won't-Have)

---

## Common Scenarios

### Scenario 1: Starting a New Project

**User says:** "I want to build a student attendance app"

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

**User says:** "Can we also add learning management system features?"

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
```markdown
## 3. Features & Functionality

### V1 Features (MVP)
1. Student enrollment
2. Attendance tracking

### V2 Features (Phase 2)
1. SMS notifications
2. Certificate generation

### V3 Features (Future)
1. Parent portal
```

**Why it's wrong:** PRD version ≠ Application version. Use MoSCoW prioritization instead.

**CORRECT:**
```markdown
## 3. Features & Functionality

### Must-Have Features (MVP)
1. Student enrollment
2. Attendance tracking

### Should-Have Features
1. SMS notifications
2. Certificate generation

### Could-Have Features (Future)
1. Parent portal
```

### ❌ Too Much Technical Detail

**WRONG:**
```markdown
### Must-Have Features (MVP)
1. **Student Enrollment** - Create a "Students" table in Google Sheets with columns:
   - StudentID (UNIQUEID() formula)
   - Name (Type: Text, REQUIRE: TRUE)
   - Enrollment Date (Type: Date, Initial Value: TODAY())
   - Batch (Type: Ref to Batches, VALID_IF: SELECT(Batches[BatchID], [Active]=TRUE))
```

**Why it's wrong:** This is implementation detail, belongs in technical docs.

**CORRECT:**
```markdown
### Must-Have Features (MVP)
1. **Student Enrollment** - Register new students with personal details, course enrollment, and batch assignment. System should auto-generate unique student IDs and validate batch capacity.
```

---

**Version:** 1.0
**Last Updated:** 2026-01-20
**Changes:** Initial examples and usage scenarios

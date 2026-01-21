# PRD Template

This is the standardized Product Requirements Document (PRD) template. Use this template when creating or updating PRD files.

**File Location:** `docs/project/PRD.md`

---

# Product Requirements Document (PRD)

**Project Name:** [Your Project Name]
**Version:** 1.0.0
**Date:** [YYYY-MM-DD]
**Owner:** [Product Manager/Team Lead]
**Status:** [Draft / In Review / Approved]

---

## 1. Purpose & Problem Statement

**What problem are we solving?**
[Describe the user pain point or business need this product addresses]

**Why is this important?**
[Explain the strategic value and business objectives]

**Who is this for?**
[Identify the primary users and stakeholders]

---

## 2. Target Audience & User Personas

**Primary Users:**
- **[Persona 1 Name]** - [Role/Description]
  - Pain Points: [Key challenges they face]
  - Goals: [What they want to achieve]

- **[Persona 2 Name]** - [Role/Description]
  - Pain Points: [Key challenges]
  - Goals: [What they want to achieve]

**Secondary Users:**
- [List any secondary user groups]

---

## 3. Features & Functionality

### Must-Have Features (MVP)
1. **[Feature Name]** - [Brief description of what it does and why it's critical]
2. **[Feature Name]** - [Brief description]
3. **[Feature Name]** - [Brief description]

### Should-Have Features
1. **[Feature Name]** - [Brief description]
2. **[Feature Name]** - [Brief description]

### Could-Have Features (Future)
1. **[Feature Name]** - [Brief description]
2. **[Feature Name]** - [Brief description]

### Won't-Have (Out of Scope)
- [Feature or capability explicitly excluded from this release]
- [Another excluded item]

---

## 4. Success Metrics & KPIs

**How will we measure success?**

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| [Metric 1] | [Target value] | [How you'll measure it] |
| [Metric 2] | [Target value] | [How you'll measure it] |
| [Metric 3] | [Target value] | [How you'll measure it] |

**Release Criteria:**
- [ ] All Must-Have features implemented and tested
- [ ] Performance meets [specific benchmark]
- [ ] [Other critical criteria]

---

## 5. User Flow (High-Level)

**Primary User Journey:**
1. User [action]
2. System [response]
3. User [next action]
4. Result: [outcome]

[Optional: Include simple diagram or flowchart]

---

## 6. Technical & System Requirements

**Platform:**
[AppSheet / Web App / Mobile App / Desktop]

**Data Storage:**
[Google Sheets / Database / Cloud Storage]

**Integrations:**
- [System 1] - [Purpose]
- [System 2] - [Purpose]

**Performance Requirements:**
- Response time: [< X seconds]
- Concurrent users: [Number]
- Uptime: [99.X%]

---

## 7. Assumptions & Constraints

**Assumptions:**
- [Assumption about user behavior, technology, or resources]
- [Another assumption]

**Constraints:**
- [Technical limitation or dependency]
- [Budget, timeline, or resource constraint]
- [Compliance or regulatory requirement]

---

## 8. Risks & Dependencies

**Risks:**
| Risk | Impact | Probability | Mitigation |
|------|--------|------------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [How to address it] |
| [Risk 2] | High/Med/Low | High/Med/Low | [How to address it] |

**Dependencies:**
- [External team, system, or decision this project depends on]
- [Another dependency]

---

## 9. Timeline & Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| [PRD Approval] | [Date] | [In Progress / Complete] |
| [Design Complete] | [Date] | [Planned / In Progress / Complete] |
| [Development Complete] | [Date] | [Planned / In Progress / Complete] |
| [Testing Complete] | [Date] | [Planned / In Progress / Complete] |
| [Launch] | [Date] | [Planned / In Progress / Complete] |

---

## 10. Stakeholder Sign-Off

| Stakeholder | Role | Approval Date | Signature/Status |
|-------------|------|---------------|------------------|
| [Name] | [Product Owner] | [Date] | ☐ Pending / ✓ Approved |
| [Name] | [Technical Lead] | [Date] | ☐ Pending / ✓ Approved |
| [Name] | [Business Sponsor] | [Date] | ☐ Pending / ✓ Approved |

---

## 11. Open Questions & Decisions Needed

- [ ] [Question or decision that needs to be resolved]
- [ ] [Another open question]

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | [Date] | [Name] | Initial PRD |
| [1.1.0] | [Date] | [Name] | [Description of changes] |

---

## Notes

- This is a **high-level** document focused on **what** to build, not **how** to build it
- For detailed technical specifications, see `docs/formulas/` folder
- This document should be reviewed and updated as requirements evolve
- Keep it concise and focused on strategic alignment

---

## Template Usage Guidelines

**When filling out this template:**

1. **Remove placeholder brackets** - Replace `[Your Project Name]` with actual values
2. **Be specific** - Avoid vague statements like "improve user experience"
3. **Use MoSCoW prioritization** - Clearly categorize features as Must/Should/Could/Won't
4. **Define measurable success criteria** - Avoid "increase engagement", use "achieve 80% daily active users"
5. **Keep it concise** - PRD should be readable in 15-20 minutes
6. **Update version history** - Increment version and add entry when making changes

**Version Numbering:**
- Start at `1.0.0` for initial PRD
- Increment MAJOR (1.0.0 → 2.0.0) for major scope changes
- Increment MINOR (1.0.0 → 1.1.0) for feature additions
- Increment PATCH (1.0.0 → 1.0.1) for minor corrections

**Important:** The version number tracks the **PRD document version**, not the application version. The PRD can evolve independently of the system being built.

**Status Values:**
- **Draft** - Work in progress, not ready for review
- **In Review** - Under stakeholder review
- **Approved** - Signed off by stakeholders, ready for implementation

**File Location:** Always save PRD to `docs/project/PRD.md`

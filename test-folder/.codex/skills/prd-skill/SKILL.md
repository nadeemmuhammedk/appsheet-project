---
name: prd-skill
description: Create or update Product Requirements Documents (PRD) following the standardized PRD template. Use at project start, when planning new features, or when user explicitly requests PRD updates. Helps define product scope, user personas, success metrics, and technical requirements.
allowed-tools:
  - Read
  - Write
  - Edit
---

# PRD Skill

Create and maintain Product Requirements Documents (PRD) following a standardized template that focuses on strategic alignment and high-level product definition.

## When to Use This Skill

**Automatic triggers** (no user request needed):
- Project initialization or setup
- User is creating a new project
- User mentions: "PRD", "product requirements", "requirements document"
- Planning phase for new features or major changes

**Explicit triggers**:
- "Create a PRD" or "write a PRD"
- "Update the PRD" or "modify the PRD"
- "Document requirements" or "define requirements"
- User asks to document product scope, features, or success metrics

**Example triggers**:
- "Let's start a new project for student attendance tracking" → Create initial PRD
- "Update the PRD with new features" → Update existing PRD
- "What should be in our requirements document?" → Guide user through PRD creation
- User starts describing product goals and features → Suggest creating PRD

## What is a PRD?

A Product Requirements Document (PRD) is a **high-level** strategic document that defines:
- **WHAT** to build (not HOW to build it)
- **WHY** it's being built (problem statement, business value)
- **WHO** it's for (target users, personas)
- **SUCCESS CRITERIA** (metrics, KPIs, release criteria)
- **SCOPE** (must-have vs nice-to-have features)

**Key Principles:**
- Focus on strategic alignment, not technical implementation
- Keep it concise and focused
- Should be readable by non-technical stakeholders
- Serves as the "source of truth" for product decisions
- Technical details belong in `docs/formulas/` files

## PRD Template Structure

The PRD follows this standard structure (see [TEMPLATE.md](TEMPLATE.md) for complete template):

1. **Purpose & Problem Statement** - What problem are we solving and why?
2. **Target Audience & User Personas** - Who is this for?
3. **Features & Functionality** - Must-have, should-have, could-have, won't-have (MoSCoW)
4. **Success Metrics & KPIs** - How will we measure success?
5. **User Flow** - High-level user journey
6. **Technical & System Requirements** - Platform, integrations, performance
7. **Assumptions & Constraints** - What we're assuming, what limits us
8. **Risks & Dependencies** - What could go wrong, what do we depend on
9. **Timeline & Milestones** - Key dates and phases
10. **Stakeholder Sign-Off** - Approval tracking
11. **Open Questions** - Unresolved decisions
12. **Document History** - Version tracking

## How to Use This Skill

### Step 1: Check if PRD Exists

Before creating a new PRD:
1. Check if `docs/project/PRD.md` already exists
2. If it exists, ask user if they want to UPDATE or CREATE NEW
3. If updating, read current PRD first

### Step 2: Gather Information

Ask user for key information (use AskUserQuestion if needed):
- **Project Name** - What is the project called?
- **Problem Statement** - What problem does this solve?
- **Target Users** - Who will use this?
- **Must-Have Features** - What's critical for MVP?
- **Success Metrics** - How will we measure success?
- **Timeline** - Any key dates or milestones?

### Step 3: Generate PRD from Template

1. Read the complete template from [TEMPLATE.md](TEMPLATE.md)
2. Fill in sections based on user input
3. Use placeholders `[...]` for sections that need user input
4. Include helpful prompts in placeholders to guide users

### Step 4: Write PRD to File

1. Write to `docs/project/PRD.md`
2. Use proper markdown formatting
3. Include version number at top (start with 1.0.0)
4. Set initial status as "Draft"

### Step 5: Guide User on Next Steps

After creating PRD, inform user:
- PRD is a living document - update it as requirements evolve
- Technical details go in `docs/formulas/` files
- PRD should be reviewed and approved by stakeholders
- Keep it concise and focused on strategic alignment

## Version Management

**PRD Version Format:** `MAJOR.MINOR.PATCH`
- **MAJOR** - Significant scope changes, major feature additions
- **MINOR** - Feature additions, requirement clarifications
- **PATCH** - Minor corrections, typo fixes, clarifications

**Initial Version:** Always start at `1.0.0`

**Version History Table:** Update the "Document History" section when making changes:
```markdown
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-20 | [Name] | Initial PRD |
| 1.1.0 | 2026-01-25 | [Name] | Added payment gateway feature |
| 1.1.1 | 2026-01-26 | [Name] | Clarified authentication requirements |
```

**IMPORTANT:** The version in the PRD refers to the **PRD document version**, NOT the application/system version. The PRD can evolve independently of the system being built.

## Important Notes

**DO NOT include application version numbers** - The PRD version tracks the document itself, not the application being built. Don't reference "V1", "V2", "V3" of the system/application in the PRD.

**Keep it high-level** - PRD is about WHAT and WHY, not HOW. Technical implementation details belong in:
- `docs/formulas/appsheet_formulas.md` - AppSheet configurations
- `docs/formulas/googlesheet_formulas.md` - Sheet formulas
- `docs/formulas/appscript_code.md` - Apps Script code
- `APPSHEET_SYSTEM_BLUEPRINT.md` - Technical architecture

**Use MoSCoW prioritization** for features:
- **Must-Have** - Critical for MVP, without these the product doesn't work
- **Should-Have** - Important but not critical, can be delayed if needed
- **Could-Have** - Nice to have, adds value but not essential
- **Won't-Have** - Explicitly out of scope for this release

**Stakeholder alignment** - PRD should be reviewed and approved by:
- Product Owner/Manager
- Technical Lead
- Business Sponsor/Stakeholder
- End Users (optional but recommended)

## Common Mistakes to Avoid

❌ WRONG:
- Including technical implementation details (formulas, code)
- Making PRD too long and detailed (should be concise)
- Skipping success metrics or KPIs
- Not defining "won't-have" (scope creep risk)
- Writing for technical audience only
- Including application version numbers (V1, V2, etc.)

✅ CORRECT:
- Focus on business value and user needs
- Keep it readable for non-technical stakeholders
- Define clear success criteria
- Explicitly state what's out of scope
- Update PRD as requirements evolve
- Use PRD document version numbers only (1.0.0, 1.1.0, etc.)

## When to Update PRD

Update the PRD when:
- Requirements change significantly
- New features are added to scope
- Success metrics need adjustment
- User personas change
- Technical constraints are discovered
- Stakeholder priorities shift

**Version bump guidelines:**
- Major scope change → Increment MAJOR (1.0.0 → 2.0.0)
- Add/remove features → Increment MINOR (1.0.0 → 1.1.0)
- Minor clarifications → Increment PATCH (1.0.0 → 1.0.1)

## Examples

See [EXAMPLES.md](EXAMPLES.md) for:
- Complete PRD example (student management system)
- Before/after examples of good vs bad PRDs
- How to handle common scenarios (feature requests, scope changes, etc.)
- Integration with other documentation (APPSHEET_SYSTEM_BLUEPRINT.md, formulas files)

---

**Version:** 1.0
**Last Updated:** 2026-01-20
**Changes:** Initial PRD skill creation with standardized template and guidance

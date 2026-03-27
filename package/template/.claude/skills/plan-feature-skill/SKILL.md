---
name: plan-feature-skill
description: Generate a structured feature implementation plan file at the project root. Produces a progress checklist, phase-by-phase sections (Google Sheets, AppSheet, Apps Script Docs, Apply Code, Testing), clear manual-vs-docs separation, and a Files to Modify table. Use when planning any new feature before starting implementation.
allowed-tools:
  - Read
  - AskUserQuestion
---

# Plan Feature Skill

Generate a structured feature plan file at the project root following the established plan format.

## When to Use This Skill

**Explicit invocation only:**
- User types `/plan-feature-skill`
- User says "plan this feature", "create a feature plan", "write a plan for X"

**Do NOT auto-invoke** for general questions, architecture discussions, or when the user is already mid-implementation.

## What This Skill Produces

A Markdown plan file at the **project root** named `[FEATURE_NAME]_PLAN.md`.

The plan contains:
1. **Context** — why the feature is needed and what it achieves
2. **Progress Checklist** — `[ ]` items grouped by phase, checked off as work proceeds
3. **Phase sections** — detailed instructions per phase
4. **Files to Modify table** — every file, who changes it (You/Claude), and what changes

The skill generates the plan content and outputs it — the main Claude instance writes it to the file.

> ⚠️ **STOP after writing the plan file.** Do not begin implementation. Wait for the user to explicitly ask to start implementing before taking any further action.

---

## How to Use

### Step 1: Gather Information

Ask the user (use AskUserQuestion if needed):
- **Feature name** — used for the file name and plan title
- **What it does** — one-paragraph description for the Context section
- **Which components are touched** — ask: "Does this feature require changes to: Google Sheets? AppSheet? Apps Script?"

### Step 2: Determine Phases

Build the phase list using only the blocks the feature needs, in this order:

| Block | Phase name | Who drives it |
|-------|-----------|---------------|
| Google Sheets schema/data changes | "Google Sheets" | You (manual) |
| AppSheet config changes | "AppSheet + Docs" | You (manual) + Claude (docs) |
| Apps Script code changes — document | "Apps Script Docs" | Claude |
| Apps Script code changes — apply | "Apply Code in Apps Script Editor" | You (manual) |
| Verification | "Testing" | You (manual) |

**Rules:**
- Include only blocks the feature actually needs — no empty phases
- Phases are numbered 1, 2, 3… with no gaps
- **Testing is always the final phase**
- **Google Sheets is not always Phase 1** — if the feature only touches AppSheet + Apps Script, AppSheet is Phase 1
- Apps Script Docs and "Apply Code in Apps Script Editor" are always a **pair** — never one without the other
- If Google Sheets and AppSheet changes are for the same schema addition (e.g. adding a column), ask the user whether to bundle them into one phase or keep separate

### Step 3: Build the Progress Checklist

At the top of the plan (after Context), write one `### Phase N: Name` block per phase. Each item uses `- [ ]`.

Label each item to make responsibility clear:
- `Google Sheets:` prefix → user's manual sheet edit
- `AppSheet:` prefix → user's manual AppSheet config
- `Docs:` prefix → Claude's documentation update
- No prefix → implied manual step (user does it in an external tool)

**Ordering rule for AppSheet + Docs phase:** Always list `Docs:` items before `AppSheet:` items. Claude updates the documentation first, then the user applies the changes in AppSheet.

Example:
```markdown
### Phase 1: Google Sheets
- [ ] Google Sheets: Add `IsActive` checkbox column at Col N in `records` tab

### Phase 2: AppSheet + Docs
- [ ] Docs: Update `docs/formulas/appsheet_formulas.md` — add `IsActive` to `records` table
- [ ] AppSheet: Add `IsActive` column (Type: Yes/No, Initial value: FALSE)

### Phase 3: Apps Script Docs
- [ ] Docs: Update `docs/formulas/appscript_code.md` — add `REC_IS_ACTIVE_COL = 14` constant
- [ ] Docs: Update `docs/formulas/appscript_code.md` — update `processRecords` to skip inactive rows

### Phase 4: Apply Code in Apps Script Editor
- [ ] Apps Script: Apply all Phase 3 code changes in the Apps Script editor

### Phase 5: Testing
- [ ] Test 1 — Active record: IsActive = TRUE → record processed normally
- [ ] Test 2 — Inactive record: IsActive = FALSE → record skipped
```

### Step 4: Write Phase Detail Sections

After the checklist, write a detailed section per phase:

```markdown
## Phase N: Phase Name

**Scope:** [One sentence describing what this phase covers and who does it]

[Detailed instructions, sub-steps, code snippets, table layouts, AppSheet config fields, etc.]

---
```

**Per phase:**
- **Google Sheets phase:** List each sheet tab change (add column, header name, column type/format, column position)
- **AppSheet + Docs phase:** List Docs items first (Claude updates documentation), then AppSheet items (user applies changes). Full AppSheet config (Name, Type, SHOW IF, REQUIRE, etc.) goes in the phase detail section.
- **Apps Script Docs phase:** Show the exact code additions/changes (constants, function edits, new functions) as code blocks — these go into `appscript_code.md`
- **Apply Code phase:** Just the scope line + "Apply in this order:" list of what to copy
- **Testing phase:** Numbered test cases with input conditions and expected output

### Step 5: Write Files to Modify Table

End the plan with:

```markdown
## Files to Modify

| Phase | File | Who | Change |
|-------|------|-----|--------|
| 1 | Google Sheets `records` tab | You | Add Col N `IsActive` checkbox |
| 2 | AppSheet `records` table | You | Add `IsActive` Yes/No column |
| 2 | `docs/formulas/appsheet_formulas.md` | Claude | Add `IsActive` column to records table |
| 3 | `docs/formulas/appscript_code.md` | Claude | New constant + processRecords update |
| 4 | Apps Script editor | You | Apply Phase 3 code changes |
```

**Who column values:**
- `You` — manual step done by the user in Google Sheets, AppSheet, or the Apps Script editor
- `Claude` — documentation update written by Claude to a `docs/formulas/` file

---

## Output File Naming

`[FEATURE_NAME]_PLAN.md` — uppercase, underscores, `PLAN` suffix, at the project root.

Examples: `USER_PREFERENCES_PLAN.md`, `BULK_IMPORT_PLAN.md`, `STATUS_SYNC_PLAN.md`

---

## Phase Section Template (Quick Reference)

```markdown
## Phase N: Name

**Scope:** [What this phase covers and who owns it]

### [Sub-section heading if needed]

[Instructions, tables, code blocks]

---
```

## Completeness Requirements

A complete plan MUST include:
- ✅ Context section explaining the why
- ✅ Progress Checklist with all phases and `[ ]` items
- ✅ Detailed section for every phase in the checklist
- ✅ Code snippets for any Apps Script changes (in Docs phase)
- ✅ AppSheet config fields (Name, Type, SHOW IF, REQUIRE, etc.) for any AppSheet changes
- ✅ Numbered test cases in the Testing phase
- ✅ Files to Modify table with Who column

---

## Detailed Templates and Examples

- [TEMPLATES.md](TEMPLATES.md) — complete phase templates
- [EXAMPLES.md](EXAMPLES.md) — full example plans (generic, not project-specific)

---

**Version:** 1.1
**Last Updated:** 2026-03-27
**Source:** plan-feature-skill/SKILL.md

---
name: googlesheet-blueprint-skill
description: Generate complete Google Sheets formula documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for ARRAYFORMULA, VLOOKUP, QUERY, and calculated formulas. Use when documenting Google Sheets formulas, writing to docs/formulas/googlesheet_formulas.md, or when user mentions document formulas, ARRAYFORMULA, VLOOKUP, QUERY, or spreadsheet formulas.
allowed-tools:
  - Read
---

# Google Sheets Blueprint Skill

Generate complete documentation templates for Google Sheets formulas used in AppSheet projects.

## When to Use This Skill

**Automatic triggers** (no user request needed):
- User is documenting Google Sheets formulas
- User is writing to `docs/formulas/googlesheet_formulas.md`
- User mentions: "document formulas", "ARRAYFORMULA", "VLOOKUP", "QUERY", "spreadsheet formula"
- User describes spreadsheet calculations or data transformations
- User is promoting experimental formulas to stable

**Manual invocation:**
- `/googlesheet-blueprint-skill`

**Example triggers:**
- "Add documentation for this ARRAYFORMULA" → Auto-use formula template
- "Document the VLOOKUP in column F" → Auto-use formula template
- User writes to `googlesheet_formulas.md` → Auto-apply blueprint format

## Template Overview

This skill provides complete documentation templates from `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.2:

**Available Templates:**
- **Column Formula Documentation** - Formula Type, Cell Location, Range, Purpose, Dependencies, Behavior
- **Common Formula Patterns** - ARRAYFORMULA, VLOOKUP, QUERY with error handling
- **Formula Dependencies** - Cross-column and cross-sheet relationships

For complete templates with all fields, see [TEMPLATES.md](TEMPLATES.md).

## How to Use

### Step 1: Identify Formula Type

Determine what needs documentation:
- **ARRAYFORMULA?** → Use auto-fill template
- **VLOOKUP?** → Use lookup template
- **Calculated field?** → Use calculation template
- **QUERY/IMPORTRANGE?** → Use data import template

### Step 2: Read Blueprint Template

Access the appropriate template from:
- [TEMPLATES.md](TEMPLATES.md) - All complete templates
- APPSHEET_SYSTEM_BLUEPRINT.md Section 4.2 - Source templates

### Step 3: Generate Complete Documentation

Include ALL required fields:
- **Formula Type:** ARRAYFORMULA / VLOOKUP / IF / QUERY / IMPORTRANGE
- **Cell Location:** Starting cell (e.g., A2)
- **Range Applied:** Entire column or specific range
- **Formula:** Complete formula with proper indentation
- **Purpose:** What this formula does
- **Dependencies:** Other columns/sheets it references
- **Behavior:** How it updates, edge cases, performance notes
- **Example Output:** Input → Output examples

### Step 4: Verify Completeness

Check against requirements:
- All formulas documented with complete configuration
- Dependencies clearly listed
- Behavior and notes included
- Example outputs provided

## Quick Template Preview

### ARRAYFORMULA Documentation (Minimal Example)
```markdown
### Column E: Second Installment Date

**Purpose:** Auto-calculate second installment due date (1 month after start date)

**Formula Location:** Batch Data!E:E
**Type:** ARRAYFORMULA
**Trigger:** Populates when Batch Starting Date (Column C) is filled

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(C:C)=1,
        "Second Installment Date",
        IF(
            ISBLANK(C:C),
            "",
            EDATE(C:C, 1)
        )
    )
)
```

**How It Works:**
1. Header Row: If row number is 1, displays "Second Installment Date"
2. Blank Check: If Batch Starting Date (Column C) is blank, returns empty string
3. Date Calculation: Uses EDATE to add 1 month to Batch Starting Date

**Example Output:**
- Batch Starting Date: 2024-06-15
- Second Installment Date: 2024-07-15

**Dependencies:**
- Requires: Column C (Batch Starting Date)
- Updates: Automatically when Batch Starting Date changes
```

### VLOOKUP Documentation (Minimal Example)
```markdown
### Column F: Batch Starting Date

**Purpose:** Inherit Batch Starting Date from Batch Data table

**Formula Location:** Student Data!F:F
**Type:** ARRAYFORMULA with VLOOKUP
**Trigger:** Populates when Batch (Column B) is selected

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(B:B)=1,
        "Batch Starting Date",
        IF(
            ISBLANK(B:B),
            "",
            VLOOKUP(B:B, 'Batch Data'!B:C, 2, FALSE)
        )
    )
)
```

**Dependencies:**
- Requires: Column B (Batch) to be filled
- Requires: Batch Data table with matching batch names
- Updates: Automatically when Batch Data is updated
```

See [TEMPLATES.md](TEMPLATES.md) for complete templates with all fields.

## Common Formula Patterns

### Pattern 1: ARRAYFORMULA for Auto-Fill
```excel
=ARRAYFORMULA(IF(B2:B="","",FORMULA_HERE))
```
**Use Case:** Apply formula to entire column, skip blank rows

### Pattern 2: VLOOKUP with Error Handling
```excel
=IFERROR(VLOOKUP(A2, 'OtherSheet'!A:B, 2, FALSE), "Not Found")
```
**Use Case:** Safe lookup with fallback value

### Pattern 3: Conditional Calculation
```excel
=ARRAYFORMULA(IF(ROW(A:A)=1,"Header",IF(ISBLANK(A:A),"",CALCULATION)))
```
**Use Case:** Auto-fill with header row and blank handling

## Completeness Requirements

**Formula documentation MUST include:**
- ✅ Formula Type (ARRAYFORMULA, VLOOKUP, etc.)
- ✅ Cell Location and Range Applied
- ✅ Complete Formula with proper indentation
- ✅ Purpose (what it does)
- ✅ Dependencies (other columns/sheets)
- ✅ Behavior (how it updates, edge cases)
- ✅ Example Output (input → output)
- ✅ Notes (special considerations)

## Version Management

**For the complete Experimental→Stable promotion workflow, use `/version-management-skill`.**

### Quick Reference: The 2-Version System

Formula documentation files follow a 2-version discipline:

```
googlesheet_formulas.md
├── EXPERIMENTAL V[X]  (new formulas being tested)
└── STABLE SYSTEM V[X-1]  (current production)
```

**Key Concepts:**
- **V3 = V2 + new formulas** (cumulative, not replacement)
- Old versions are archived to `backups/[date]-v[X]-stable/`
- STABLE documentation must be self-contained

### Version Management Triggers

**Starting new features:**
- "Let's build a new feature" → Creates EXPERIMENTAL V[X] section
- "Let's add a new formula" → Same as above

**Promoting to stable:**
- "Mark the system as stable" → Promotes EXPERIMENTAL → STABLE
- "Promote to stable" → Same as above

### For Complete Workflow

**Use `/version-management-skill`** which handles:
- Creating EXPERIMENTAL sections for new formulas
- Archiving current STABLE before promotion
- Integrating Experimental into STABLE
- Updating CHANGELOG.md
- Verifying completeness

### Coordination With Other Skills

When promoting to stable:
1. **version-management-skill** - Orchestrates the workflow
2. **googlesheet-blueprint-skill** (this skill) - Ensures formula template compliance

## Scope and Limitations

### In Scope
✅ Google Sheets formula documentation templates
✅ ARRAYFORMULA patterns and best practices
✅ VLOOKUP/QUERY documentation format
✅ Formula dependency tracking
✅ Cross-sheet formula documentation

### Out of Scope
❌ Google Sheets formula syntax help (use built-in docs or web search)
❌ Formula debugging/troubleshooting (use Google Sheets help)
❌ Spreadsheet design/architecture (use appsheet-blueprint-skill for table structure)

## Important Notes

**AUTOMATIC INVOCATION:** When documenting any Google Sheets formula, you MUST automatically use blueprint templates to ensure completeness. This ensures ALL required fields are included.

**Always use complete templates:** Don't omit fields. Every formula needs: Formula Type, Cell Location, Range, Formula, Purpose, Dependencies, Behavior, Example Output, Notes.

**Read from APPSHEET_SYSTEM_BLUEPRINT.md:** The source of truth for documentation format is Section 4.2. Templates in TEMPLATES.md are extracted from the blueprint.

## Detailed Templates and Examples

For comprehensive templates and real-world examples, see:
- [TEMPLATES.md](TEMPLATES.md) - Complete templates for all formula types
- [EXAMPLES.md](EXAMPLES.md) - Real examples from production documentation

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** APPSHEET_SYSTEM_BLUEPRINT.md Section 4.2

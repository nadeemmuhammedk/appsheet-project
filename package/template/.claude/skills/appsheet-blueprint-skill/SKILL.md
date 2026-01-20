---
name: appsheet-blueprint-skill
description: Generate complete AppSheet documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for tables (columns, VALID_IF, EDITABLE, SHOW IF, security), views (deck, table, form, display settings), actions (behavior, Referenced Rows, SHOW IF), and security rules. Use when documenting tables, views, actions, writing to docs/formulas files, marking system as stable/promoting to stable, building/implementing features, or when user mentions document, create documentation, or describes AppSheet components.
allowed-tools:
  - Read
---

# AppSheet Blueprint Skill

Generate complete documentation templates and ensure completeness when documenting AppSheet components.

## When to Use This Skill

**Automatic triggers** (no user request needed):
- User is documenting any table, view, action, or security rule
- User is writing to docs/formulas/appsheet_formulas.md
- User is creating feature documentation
- User mentions: "document", "create documentation", "add to formulas file"
- User describes creating AppSheet components without explicitly saying "document"

**Promotion triggers** (marking system as stable):
- "mark the system as stable" or "promote to stable"
- "the system is stable" or "make this stable"
- "make stable" or "system is ready"
- User is merging Experimental into Stable

**Feature work triggers** (building/improving features):
- "let's build a new feature" or "let's improve a feature"
- "let's add [feature name]" or "let's implement [feature name]"
- "build a feature" or "improve a feature"
- User describes new functionality to implement

**Note**: When user says "let's build/improve a feature", BOTH skills should be invoked:
1. **appsheet-blueprint-skill** - For proper documentation structure
2. **appsheet-reference-skill** - To look up formulas, patterns, and AppSheet capabilities

**Example triggers**:
- "Create a Students table" → Auto-use table template
- "Document the attendance view" → Auto-use view template
- "Add an action to mark present" → Auto-use action template
- User writes to docs/formulas/ → Auto-apply blueprint format
- "Mark the system as stable" → Auto-use promotion workflow
- "Let's build a new attendance feature" → Invoke BOTH blueprint-skill AND reference-skill

## Template Overview

This skill provides complete documentation templates from `APPSHEET_SYSTEM_BLUEPRINT.md`:

**Available Templates:**
- **Table Schema** - All AppSheet configuration fields (Type, Key, Initial Value, VALID_IF, EDITABLE, SHOW, REQUIRE)
- **Action Documentation** - Behavior, Referenced Rows, Column values, SHOW IF, icons
- **View Configuration** - Display settings, grouping, sorting, security, SHOW IF
- **Security Rules** - Table-level (UPDATES, ADDS, DELETES) + row-level filtering
- **Enum Documentation** - Values and usage

For complete templates with all fields, see [TEMPLATES.md](TEMPLATES.md).

## How to Use

### Step 1: Identify Component Type

Determine what needs documentation:
- **Table?** → Use table schema template
- **View?** → Use view configuration template
- **Action?** → Use action documentation template
- **Security?** → Use security rules template

### Step 2: Read Blueprint Template

Access the appropriate template from:
- [TEMPLATES.md](TEMPLATES.md) - All complete templates
- APPSHEET_SYSTEM_BLUEPRINT.md Section 4.1 - Source templates

### Step 3: Generate Complete Documentation

Include ALL required fields:
- **Tables:** Column name, Type, Key, Initial Value, App Formula, VALID_IF, EDITABLE, EDITABLE IF, SHOW, SHOW IF, REQUIRE, Description
- **Views:** Name, Type, For this data, Display settings, Group by, Sort by, Actions, SHOW IF, Security
- **Actions:** Name, For a record, Do this, Referenced Rows, Column values, SHOW IF, Icon, Description
- **Security:** Table-level rules + row-level filtering formula

### Step 4: Verify Completeness

Check against requirements:
- All columns documented (no omissions)
- All configuration fields present
- Descriptions provided
- Security rules defined

## Quick Template Preview

### Table Documentation (Minimal Example)
```markdown
#### 1. Students Table

**Google Sheets:** "Students" tab
**AppSheet Table Name:** Students
**Primary Key:** StudentID

**Table-Level Settings:**
```appsheet
Table: Students
Security:
  UPDATES: ALL_CHANGES
  ADDS: TRUE
  DELETES: FALSE
```

**Columns:**
**Column A: StudentID**
```appsheet
Column Name: StudentID
Type: Text
Key: Yes
Initial Value: UNIQUEID()
EDITABLE: FALSE
SHOW: TRUE
REQUIRE: YES
Description: "Unique identifier for student"
```
```

See [TEMPLATES.md](TEMPLATES.md) for complete templates with all fields.

### Action Documentation (Minimal Example)
```markdown
**Action: Mark Present**
```appsheet
Action Name: Mark Present
For a record of this table: Students
Do this: Data: set the values of some columns in this row
Column values to set:
  Status: "Present"
  LastUpdated: NOW()
SHOW IF: [Status] = "Absent"
Icon: check_circle
```
```

See [TEMPLATES.md](TEMPLATES.md) for complete action template.

## Completeness Requirements

**STABLE section MUST include:**
- ✅ ALL tables with complete schemas (including table-level security settings)
- ✅ ALL columns with ALL configuration fields
- ✅ ALL views with complete settings
- ✅ ALL actions with complete documentation
- ✅ ALL security rules documented within table schemas (table-level + row-level)
- ✅ ALL enums and reference data

**NO partial documentation** - If a table is documented, ALL its columns, actions, views, and security must be included.

## Experimental → Stable Promotion Workflow

Understanding the version lifecycle is critical for proper documentation.

### Phases

**EXPERIMENTAL VX** - Testing Phase
- New features being developed and tested
- Documented with: "What's New", "Changes from V[X-1]", "Execution Plan", "Testing Checklist"
- Status: ⚠ EXPERIMENTAL - TESTING IN PROGRESS

**STABLE SYSTEM V[X-1]** - Production Phase
- Current working system
- Complete cumulative documentation (ALL features from ALL versions)
- Status: ✓ PRODUCTION - STABLE

**ARCHIVED VERSIONS** - Point-in-Time Backups
- Previous stable versions in `backups/[date]-v[X]-stable/`
- For rollback purposes only

### Key Concept: Cumulative Documentation

**V3 = V2 + new features** (additive, NOT replacement)

When promoting Experimental V3 → Stable V3:
- Keep ALL V2 features (don't remove anything)
- Add V3 new features
- Organize by feature/table type (not chronologically)
- Tag new items with "Added: V3"

### The 2-Version Discipline

Active file contains ONLY:
1. EXPERIMENTAL V[X] (if testing)
2. STABLE SYSTEM V[X-1] (current production)

Old versions go to `backups/`

### Integration Process

1. **Create backup** of current Stable to `backups/[date]-v[X-1]-stable/`
2. **Reorganize** by feature/table type (Data Tables → Views → Actions → Security)
3. **Integrate** new features into existing sections
4. **Add tags** "Added: VX" or "Modified: VX" only to changed items
5. **Remove** Experimental section from active file
6. **Update** CHANGELOG.md and backups/README.md

### Common Mistakes to Avoid During Promotion

❌ WRONG:
- Using "(UNCHANGED IN VX)" markers
- Saying "see previous version for other tables"
- Documenting only what changed
- Organizing chronologically by version

✅ CORRECT:
- Document EVERYTHING (tables, views, actions, columns)
- Organize by feature/table type
- Add subtle tags only on changed items
- Self-contained (no archive references needed)

## When Promoting Experimental → Stable

Follow this step-by-step process when marking the system as stable.

### Step 1: Create Point-in-Time Backup

Before any integration:
1. Create backup directory: `backups/[YYYY-MM-DD]-v[X-1]-stable/`
2. Copy current Stable documentation to backup
3. Add Quick Rollback section to archived file
4. Update `backups/README.md` with new archive entry

### Step 2: Read Current Documentation

Read both:
- Current Stable section (for existing structure)
- Experimental section (for new features to integrate)

### Step 3: Reorganize by Feature/Table Type

**NOT chronological organization** - Don't organize by "V2 tables, V3 tables"

Instead organize by type:
```
1. System Overview
2. Data Tables
   - Core Tables (Students, Batches, Courses...)
   - Transaction Tables (Attendance, Fees...)
   - Reference Tables (Enums, Settings...)
3. Views (organized by table)
4. Actions (organized by table)
5. Security & Automation
6. Rollback Procedures
```

### Step 4: Integrate New Features

For each new feature from Experimental:
1. Place it in the appropriate section by type (not at the end)
2. Add subtle tag: "Added: VX" or "Modified: VX"
3. Document fully (no shortcuts)

### Step 5: Remove Experimental Markers

Clean up the documentation:
1. Remove any "(UNCHANGED IN VX)" markers if they exist
2. Remove "see previous version" references
3. Remove Experimental section header and content
4. Update version header from V[X-1] to V[X]

### Step 6: Verify Completeness

Use the promotion checklist:
- ✅ No "(UNCHANGED IN VX)" markers anywhere
- ✅ No "see previous version" or "unchanged from V1" shortcuts
- ✅ Every table documented in full with ALL columns
- ✅ Every view documented in full
- ✅ Every action documented in full
- ✅ Every security rule documented in full
- ✅ Reader can understand entire system without opening archives
- ✅ New items tagged with "Added: VX" or "Modified: VX"

### Step 7: Update Supporting Files

1. Update `CHANGELOG.md` with version summary
2. Update `backups/README.md` with new archive entry
3. Update version history in main documentation

## Important Notes

**AUTOMATIC INVOCATION**: When documenting any AppSheet component, you MUST automatically use blueprint templates to ensure completeness. This ensures ALL required fields are included and nothing is missing.

**Always use complete templates**: Don't omit fields. Every column needs: Column Name, Type, Key, Initial Value, App Formula, VALID_IF, EDITABLE, EDITABLE IF, SHOW, SHOW IF, REQUIRE, Description.

**Read from APPSHEET_SYSTEM_BLUEPRINT.md**: The source of truth for documentation format is Section 4.1. Templates in TEMPLATES.md are extracted from the blueprint.

**Always include Table of Contents**: Documentation files MUST have a TOC after the version header linking to all major sections (system overview, tables, views, actions, bot automation, rollback, version history). Security rules are documented within table schemas, not as a separate section. See TEMPLATES.md for standard TOC format and anchor link rules.

## Critical Documentation Rules - What NOT to Do

**⚠️ These mistakes were made during V1→V2 promotion and must be avoided:**

1. **NEVER use "(UNCHANGED IN VX)" markers** in section headers
   - ❌ `#### 3. Student Attendance Table (UNCHANGED IN V2)`
   - ✅ `#### 3. Student Attendance Table`

2. **NEVER use "unchanged from V1" shortcuts**
   - ❌ `**Column A: Date**` - Unchanged from V1, see V1 documentation
   - ✅ Full documentation for every column

3. **NEVER skip documenting columns**
   - ❌ `**Columns B through Z:** All unchanged from V1`
   - ✅ Document every column in full

4. **NEVER reference previous versions**
   - ❌ `For views and actions, see V1 documentation in backups/...`
   - ✅ Complete documentation in current file

**STABLE documentation must be SELF-CONTAINED** - A reader should understand the entire current system without opening archived files.

**For detailed anti-patterns with examples, see:**
- APPSHEET_SYSTEM_BLUEPRINT.md Section 4.2.5 - "Documentation Anti-Patterns - What NOT to Do"

**Common fields that get missed**:
- EDITABLE IF (when conditional)
- SHOW IF (when conditional)
- Table-level security rules
- Row-level filtering formulas
- Action SHOW IF conditions

## Detailed Templates and Examples

For comprehensive templates and real-world examples, see:
- [TEMPLATES.md](TEMPLATES.md) - Complete templates for tables, actions, views, security, enums
- [EXAMPLES.md](EXAMPLES.md) - Real examples, documentation best practices, completeness checklist

---

**Version:** 3.0
**Last Updated:** 2026-01-19
**Changes:** Added Experimental→Stable Promotion Workflow section with step-by-step integration guide, new promotion triggers ("mark the system as stable", "promote to stable"), and feature work triggers ("let's build a new feature", "let's improve a feature")

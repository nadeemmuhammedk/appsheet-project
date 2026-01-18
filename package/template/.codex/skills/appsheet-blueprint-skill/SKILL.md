---
name: appsheet-blueprint-skill
description: Generate complete AppSheet documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for tables (columns, VALID_IF, EDITABLE, SHOW IF, security), views (deck, table, form, display settings), actions (behavior, Referenced Rows, SHOW IF), and security rules. Use when documenting tables, views, actions, writing to docs/formulas files, or when user mentions document, create documentation, or describes AppSheet components.
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

**Example triggers**:
- "Create a Students table" → Auto-use table template
- "Document the attendance view" → Auto-use view template
- "Add an action to mark present" → Auto-use action template
- User writes to docs/formulas/ → Auto-apply blueprint format

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

## Important Notes

**AUTOMATIC INVOCATION**: When documenting any AppSheet component, you MUST automatically use blueprint templates to ensure completeness. This ensures ALL required fields are included and nothing is missing.

**Always use complete templates**: Don't omit fields. Every column needs: Column Name, Type, Key, Initial Value, App Formula, VALID_IF, EDITABLE, EDITABLE IF, SHOW, SHOW IF, REQUIRE, Description.

**Read from APPSHEET_SYSTEM_BLUEPRINT.md**: The source of truth for documentation format is Section 4.1. Templates in TEMPLATES.md are extracted from the blueprint.

**Always include Table of Contents**: Documentation files MUST have a TOC after the version header linking to all major sections (system overview, tables, views, actions, bot automation, rollback, version history). Security rules are documented within table schemas, not as a separate section. See TEMPLATES.md for standard TOC format and anchor link rules.

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

**Version:** 2.0
**Last Updated:** 2026-01-14
**Changes:** Refactored using progressive disclosure pattern - essential info in SKILL.md, complete templates in TEMPLATES.md

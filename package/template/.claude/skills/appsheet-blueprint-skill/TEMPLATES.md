# AppSheet Blueprint Templates

## File Header Template

### When Starting New Feature (Experimental Phase)

```
# AppSheet Formulas

**Project:** [Project Name]
**Last Updated:** [YYYY-MM-DD]

---

## ⚠️ EXPERIMENTAL - TESTING IN PROGRESS

**Feature:** [Feature Name]
**Status:** ⚠ EXPERIMENTAL - NOT YET DEPLOYED
**Started:** [YYYY-MM-DD]
**Purpose:** [Brief description of what this feature does]

### What's New

[... experimental content ...]

### Changes Summary

[... changes ...]

### Implementation Steps

[... steps ...]

### Testing Checklist

[... checklist ...]

### Rollback Instructions

[... rollback instructions ...]

---

## ✅ STABLE SYSTEM

**Version:** V[X]
**Last Updated:** [YYYY-MM-DD]

---
```

### Production-Only (No Experimental Features)

```
# AppSheet Formulas

**Project:** [Project Name]
**Last Updated:** [YYYY-MM-DD]

---

## ✅ STABLE SYSTEM

**Version:** V[X]
**Last Updated:** [YYYY-MM-DD]

---
```

**Rules:**
- H1 title is the doc type only — do NOT include the project name
- `**Project:**` goes on its own metadata line under the H1
- **EXPERIMENTAL header:** NO version number (version only assigned when promoted to stable)
- **STABLE header:** MUST include version number (`**Version:** V[X]`) and last updated date
- Clear separator `---` between EXPERIMENTAL and STABLE sections
- `**Last Updated:**` in both sections shows when each was last modified
- EXPERIMENTAL section goes at TOP of file (before STABLE section)
- Use ⚠️ emoji for EXPERIMENTAL, ✅ emoji for STABLE SYSTEM

---

## Table of Contents Requirement

**All formula documentation files must include a table of contents after the version header and before the main content.**

**Purpose:**
- Improve navigation in long documentation files (1,500+ lines)
- Enable quick jumping to specific tables, views, actions, or functions
- Maintain consistent structure across all formula files
- Reduce cognitive load when searching for specific components

**Standard TOC Structure:**

## 📋 TABLE OF CONTENTS

1. [System Overview](#-system-overview)
2. [All Table Schemas](#-all-table-schemas)
   - [Table 1](#1-table-name)
   - [Table 2](#2-another-table)
3. [All Views](#-all-views)
   - [View 1](#view-1-view-name)
   - [View 2](#view-2-view-name)
4. [All Actions](#-all-actions)
   - [Action 1](#action-1-action-name)
   - [Action 2](#action-2-action-name)
5. [Bot Automation](#-bot-automation) (if applicable)

---

**When generating documentation:**
- Include TOC after version header, before main content
- Link to all major sections (system overview, tables, views, actions, bot automation)
- Include subsections for tables/views/actions if 3 or more exist
- Use markdown anchor format: lowercase, hyphens, no special chars (except keep emoji codes)
- Test all links work correctly
- **Note:** Security rules are documented within each table schema (Table-Level Settings section), not as a separate section

**Anchor Link Format Rules:**
- Lowercase only
- Replace spaces with hyphens
- Remove special characters except hyphens
- Keep emoji codes as-is (e.g., `#-system-overview` for "### 📋 SYSTEM OVERVIEW")
- Numbers preserved (e.g., `#1-student-data-table` for "#### 1. Student Data Table")

---

### System Overview Template

```
### 📋 SYSTEM OVERVIEW

**Key Features:**
- [Feature 1: brief description]
- [Feature 2: brief description]
- [Feature 3: brief description]
```

**Rules:**
- List each major table, view, action, or automation as a bullet point
- Keep each item to one line — name + brief description
- Ordered roughly by importance (core tables first, then views, then automation)

---

### Table Documentation Template


#### [N]. [Table Name] Table

**Google Sheets:** "[Tab Name]" tab
**AppSheet Table Name:** [Table Name]
**Primary Key:** [Column Name]

**Table-Level Settings:**

```appsheet
Table: [Table Name]
  # Table-Level Operations
  Updates Enabled: Yes/No
  Adds Enabled: Yes/No
  Deletes Enabled: Yes/No

  # OR expression-based operations control
  Are updates allowed?: IF([condition], "ALL_CHANGES", "READ_ONLY")

  # Row-Level Security Filter
  Security Filter (row-level): [Formula]

Notes:
  - [Role]: [What they can do]
```

**Note: UPDATES/ADDS/DELETES formulas (TRUE/FALSE in Security section) are only needed when different operations have different permissions. Most tables should use Table-Level Operations + Security Filter only.**

**Columns:**

---

**Column [A]: [Column Name]**

```appsheet
Google Sheets: Column A, Type: Text
AppSheet Configuration:
  Column Name: [Name]
  Type: Text
  Key: Yes/No
  Initial Value: [formula or blank]
  App Formula: [formula or N/A]
  VALID_IF: [formula or N/A]
  EDITABLE: TRUE/FALSE
  EDITABLE IF: [formula if conditional]
  SHOW: TRUE/FALSE
  SHOW IF: [formula if conditional]
  REQUIRE: YES/NO
  Description: "[Purpose and behavior]"
```

---

**Column [Name] (Virtual)**

```appsheet
Google Sheets: N/A (Virtual column)
AppSheet Configuration:
  Column Name: [Name]
  Type: [Type]
  Formula Type: App Formula
  App Formula: [formula]
  EDITABLE: FALSE
  SHOW: TRUE
  SHOW IF: [formula if conditional]
  REQUIRE: NO
  Description: "[Purpose]"
```

---

**Column "[CAPTION TEXT]" (Virtual — Section Header)**

Use to visually group related fields into labeled sections within a Detail or Form view. Holds no data — it's a display-only divider. Column Name is written as the literal caption text (matching how it renders in the app), not PascalCase.

```appsheet
Google Sheets: N/A (Virtual column — Show type, no data)
AppSheet Configuration:
  Column Name: [CAPTION TEXT]
  Type: Show
  Type Details:
    Category: Section_Header
    Content: ="[CAPTION TEXT]"
  SHOW: TRUE
  SHOW IF: [formula if conditional, or N/A]
  Description: "Visual section header grouping [columns] in [view]_Detail and/or [view]_Form. Display-only — holds no data, not editable."
```

### Action Documentation Template


**Action: [Name]**

```appsheet
Action Name: [Name]
For a record of this table: [Table Name]
Do this:
  - Data: add a new row to another table using values from this row
  OR
  - Data: set the values of some columns in this row
  OR
  - App: go to another view within this app

Referenced Rows:
  Table: [Target Table]
  Referenced Action: [Action to trigger or "Add"]

Column values to set:
  [Column 1]: [Value or formula]
  [Column 2]: [Value or formula]

SHOW IF: [Formula determining when action appears]
Display prominently: Yes/No
Icon: [Icon name]
Description: "[User-facing description]"
```

### View Documentation Template

**View: [Name]**

```appsheet
View Name: [Name]
For this data: [Table Name]
View Type: deck/table/form/detail/dashboard/calendar/gallery/chart/map/card
Position: first/next/middle/later/last/menu/ref

View Options:
  Sort by: [Column + Ascending/Descending, or N/A]
  Group by: [Column + Ascending/Descending, or N/A]
  Group aggregate: [COUNT/SUM/AVG/etc., or N/A]
  Main image: [Column name, or auto]
  Image shape: [Square Image/Round Image/Full Image, or N/A]
  Primary header: [Column or None]
  Secondary header: [Column or None]
  Summary column: [Column or None]
  Nested table column: [Column, or N/A]
  Show action bar: Yes/No
  Actions: Automatic/Manual — [if Manual, list which actions: Edit, Delete, custom actions, etc.]

Display:
  Icon: [icon name, or N/A — no icon set]
  Display name: [text or formula, or N/A — falls back to View Name]
  Show if: [Formula or TRUE]

Behavior:
  Event Actions:
    Row Selected: [action name, or auto]
    Row Swiped Left (beta): [action name, or auto]
    Row Swiped Right (beta): [action name, or auto]

Documentation:
  Descriptive comment: [optional note for collaborators, or N/A]

Security:
  [Role]: [Can see/cannot see]
```

### Detail / Form / Inline Sub-View Documentation Templates

`Detail`, `Form`, and `Inline` are not independent top-level views — they're sub-views tied to a table's main list-style view, sharing its `For this data` table. Document them as nested sub-blocks under the main view's `#### View N: [Name]` heading, not as their own `#### View N:` entries. Each sub-block skips the `View Name / For this data / View Type / Position` header and starts directly at `View Options:`.

**Detail sub-view** (shown when a row is selected from the main view; conventionally named `<table>_Detail`):

```appsheet
**[table]_Detail**

View Options:
  Use Card Layout: Yes/No
  Main image: [Column name, or auto]
  Header columns: [Columns highlighted at top of slide, or N/A]
  Quick edit columns: [Columns editable directly in the slide, or N/A]
  Sort by: [Column + Ascending/Descending, or N/A]
  Column order: Automatic/Manual — [if Manual, list columns and "Related [table]" entries in display order]
  Display mode: Automatic/Normal/Centered/No Headings/Side-by-side
  Image style: Fill/Fit/Background
  Nested row display: [max rows shown before "more", e.g. 5]
  Slideshow mode: Yes/No
  Desktop layout: Split view/Full screen
  Desktop multicolumn layout: Yes/No

Display:
  Display name: [text or formula, or N/A — falls back to View Name]

Behavior:
  Event Actions: [action name, or auto]

App link: LINKTOVIEW("[table]_Detail")

Documentation:
  Descriptive comment: [optional note for collaborators, or N/A]
```

**Form sub-view** (shown when creating/editing a row; conventionally named `<table>_Form`):

```appsheet
**[table]_Form**

View Options:
  Page style: Automatic/Simple/Page Count/Tabs
  Form style: Automatic/Default/Side-by-side
  Column order: Automatic/Manual — [if Manual, list columns in display order]
  Save/cancel position: Bottom/Top
  Max nested rows: [max rows shown for related reference lists, e.g. 5]
  Auto save: Yes/No
  Auto re-open: Yes/No
  Finish view: [view name, or Automatic]

Display:
  Display name: [text or formula, or N/A — falls back to View Name]

Behavior:
  Event Actions:
    Form Saved: [action name, or auto]

App link: LINKTOVIEW("[table]_Form")

Documentation:
  Descriptive comment: [optional note for collaborators, or N/A]
```

**Inline sub-view** (embedded within a Detail view wherever a `REF_ROWS(...)` virtual column produces a "Related [table]" list; conventionally named `<ReferencedTable>_Inline`):

```appsheet
**[ReferencedTable]_Inline** (embedded in [table]_Detail via "Related [ReferencedTable]")

View Options:
  View type: deck/table/gallery/map/chart/card
  Sort by: [Column + Ascending/Descending, or N/A]
  Group by: [Column + Ascending/Descending, or N/A]
  Group aggregate: [COUNT/SUM/AVG/etc., or NONE]
  Column order: Automatic/Manual — [if Manual, list columns in display order]
  Column width: Default/Narrow/Wide
  Enable QuickEdit (beta): Yes/No

Display:
  Display name: [text or formula, or N/A — falls back to View Name]

Behavior:
  Event Actions:
    Row Selected: [action name, or auto]

App link: LINKTOVIEW("[ReferencedTable]_Inline")

Documentation:
  Descriptive comment: [optional note for collaborators, or N/A]
```

Security for all three sub-views is inherited from the parent view / table — do not repeat a separate `Security:` block per sub-view unless it genuinely differs.

### Security Documentation Template


**Table-Level Settings:**

```appsheet
Table: [Table Name]
  # Table-Level Operations
  Updates Enabled: Yes/No
  Adds Enabled: Yes/No
  Deletes Enabled: Yes/No

  # OR expression-based operations control
  Are updates allowed?: IF([condition], "ALL_CHANGES", "READ_ONLY")

  # Row-Level Security Filter
  Security Filter (row-level): [Formula]

# OR when different operations need different permissions (rare):
  Updates Enabled: Yes
  Adds Enabled: Yes
  Deletes Enabled: Yes

  UPDATES: [formula for who can update]
  ADDS: [formula for who can add]
  DELETES: [formula for who can delete]

  Security Filter (row-level): [Formula]
```

### Enum Documentation Template

**Enum: [Name]**

```appsheet
Enum Name: [Name]
Values:
  - [Value 1]
  - [Value 2]
  - [Value 3]

Used in:
  - [Table].[Column]
  - [Table].[Column]

Description: "[Purpose and usage]"
```

## How to Use This Skill

### When to Invoke

**User-initiated invocation (explicit questions):**
- "Show me the table documentation template"
- "What fields are required for documenting a table?"
- "How do I document an action?"
- "What's the format for view documentation?"

**Automatic invocation (context-aware - NO USER REQUEST NEEDED):**
- User is documenting any table (need complete schema template)
- User is documenting any view (need complete view template)
- User is documenting any action (need complete action template)
- User is adding security rules (need table-level + row-level template)
- User is writing to docs/formulas/appsheet_formulas.md
- User is creating feature documentation
- User is promoting experimental to stable (need to ensure completeness)
- User mentions: "document", "create documentation", "add to formulas file"
- User describes creating AppSheet components even without saying "document"

**IMPORTANT:** When documenting any AppSheet component, you MUST automatically use blueprint templates to ensure completeness. This ensures all required fields are included and nothing is missing.

### Response Pattern

When responding to a documentation request:

1. **Identify the component type** (table, view, action, security, enum)
2. **Extract the appropriate template from TEMPLATES.md** in this skill:
   - Table: Complete schema with ALL columns
   - View: Complete view configuration
   - Action: Complete action documentation
   - Security: Table-level + row-level rules
4. **Generate complete documentation:**
   - Include ALL required fields
   - Use exact field names from blueprint
   - Provide placeholder values or formulas
   - Add descriptions and purpose
5. **Verify completeness** against blueprint requirements

### Example Interactions

#### Example 1: Manual Invocation

**User:** "Show me how to document a table"

**Response:**
1. Use templates from TEMPLATES.md in this skill
2. Extract table documentation template
3. Provide template with all fields:
   ```
   Table documentation requires:

   1. Header: Table name, Google Sheets tab, primary key
   2. Table-Level Settings: Updates, Adds, Deletes, Security
   3. Columns: For EACH column:
      - Column Name, Type, Key
      - Initial Value, App Formula
      - VALID_IF, EDITABLE, EDITABLE IF
      - SHOW, SHOW IF, REQUIRE
      - Description
   4. Actions: All actions with complete configuration
   5. Views: All views with complete settings

   [Show complete template]
   ```

#### Example 2: Automatic Invocation (NO USER REQUEST)

**User:** "Create a Students table with Name, Email, and BatchID columns"

**Claude thinks:** Need to document this table with complete schema

**Claude automatically:**
1. Uses templates from TEMPLATES.md in this skill
2. Generates complete table documentation with ALL fields:
   - Table-level settings (Updates, Adds, Deletes, Security)
   - Column A: Name (Type, Key, Initial Value, VALID_IF, EDITABLE, SHOW, REQUIRE, Description)
   - Column B: Email (Type, Key, Initial Value, VALID_IF, EDITABLE, SHOW, REQUIRE, Description)
   - Column C: BatchID (Type, Key, Initial Value, VALID_IF, EDITABLE, SHOW, REQUIRE, Description)
3. Writes to `docs/formulas/appsheet_formulas.md` following blueprint format

**User sees:** Complete, properly formatted table documentation with ALL required fields

#### Example 3: Automatic Invocation for Views

**User:** "Add documentation for the Students Deck view"

**Claude thinks:** Need complete view documentation template

**Claude automatically:**
1. Uses templates from TEMPLATES.md in this skill view template
2. Generates complete view documentation:
   - View Name, View Type, For this data, Position
   - Display settings (Image, Primary header, Secondary header, Summary)
   - Group by, Sort by
   - Actions list
   - SHOW IF formula
   - Security (who can see)

**User sees:** Complete view documentation with all settings

#### Example 4: Automatic Invocation for Actions

**User:** "Document the Mark Present action"

**Claude thinks:** Need complete action documentation template

**Claude automatically:**
1. Uses templates from TEMPLATES.md in this skill action template
2. Generates complete action documentation:
   - Action Name, For a record of this table
   - Do this (behavior type)
   - Referenced Rows (if applicable)
   - Column values to set
   - SHOW IF formula
   - Display prominently, Icon, Description

**User sees:** Complete action documentation with all fields

## Scope and Limitations

### In Scope
✅ Table schema documentation templates (all AppSheet config fields)
✅ View documentation templates (all settings and security)
✅ Action documentation templates (behavior, conditions, icons)
✅ Security documentation templates (table-level + row-level)
✅ Enum documentation templates
✅ Documentation completeness verification
✅ STABLE system organization (by feature, not chronologically)

### Out of Scope
❌ AppSheet formula syntax (use appsheet-reference-skill skill)
❌ View configuration options (use appsheet-reference-skill skill)
❌ Action behavior patterns (use appsheet-reference-skill skill)
❌ Security filter formulas (use appsheet-reference-skill skill)
❌ Version promotion automation (manual workflow per blueprint)


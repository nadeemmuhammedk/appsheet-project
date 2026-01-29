# AppSheet Blueprint Templates

## Table of Contents Requirement

**All formula documentation files must include a table of contents after the version header and before the main content.**

**Purpose:**
- Improve navigation in long documentation files (1,500+ lines)
- Enable quick jumping to specific tables, views, actions, or functions
- Maintain consistent structure across all formula files
- Reduce cognitive load when searching for specific components

**Standard TOC Structure:**
```markdown
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
6. [Rollback Instructions](#-rollback-instructions)
7. [Version History](#-version-history)

---
```

**When generating documentation:**
- Include TOC after version header, before main content
- Link to all major sections (tables, views, actions, bot automation, rollback, version history)
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

### Table Documentation Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.1:

```markdown
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
```

### Action Documentation Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.1:

```markdown
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
```

### View Documentation Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.1:

```markdown
**View: [Name]**
```appsheet
View Name: [Name]
View Type: deck/table/form/detail/dashboard
For this data: [Table Name]
Position: [menu position]

Display settings:
  Image: [Column name for image]
  Primary header: [Column]
  Secondary header: [Column]
  Summary column: [Column]

Group by: [Column or N/A]
Sort by: [Column and order]

Actions:
  - [Action 1]
  - [Action 2]

SHOW IF: [Formula or TRUE]

Security:
  [Role]: [Can see/cannot see]
```
```

### Security Documentation Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.1:

```markdown
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
```

### Enum Documentation Template

```markdown
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
2. **Read APPSHEET_SYSTEM_BLUEPRINT.md** Section 4.1 for templates
3. **Extract the appropriate template:**
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
1. Read `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.1
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
1. Reads `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.1
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
1. Reads `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.1 view template
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
1. Reads `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.1 action template
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


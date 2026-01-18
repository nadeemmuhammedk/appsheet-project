# AppSheet Documentation System Blueprint

**Version:** 1.0
**Last Updated:** October 28, 2025
**Purpose:** Reusable documentation system template for AppSheet + Google Sheets projects
**Compatible With:** AppSheet, Google Sheets, Apps Script, Looker Studio

---

## 🎯 What This File Does

This blueprint defines a **standardized documentation system** for AppSheet projects. It serves three purposes:

1. **For AI Assistants (Claude, Gemini, etc.):**
   - Read this file to understand project structure
   - Auto-detect if initialization is needed
   - Maintain version discipline
   - Follow documentation format standards

2. **For Developers:**
   - Quick reference for folder structure
   - Documentation format templates
   - Version management rules
   - Copy to new projects

3. **For Project Setup:**
   - Fresh project initialization
   - Existing project migration
   - Consistent structure across all AppSheet projects

---

## 📝 Project Configuration

**⚠️ EDIT THIS SECTION FOR EACH PROJECT**

```yaml
Project Name: Food Tracker
Platform Stack: AppSheet + Google Sheets (Apps Script & Looker Studio ready)
Main Tables:
  - Food Data (Date)
  - Data (reference table for food/alcohol classification)
User Roles:
  - Single user (personal tracking app)
  - Future: Multi-user with row-level security
Primary Key Patterns:
  - Date-based: Date (primary key for Food Data)
  - Text-based: Food name, Alcohol name (in Data table)
Google Sheet ID: [User's spreadsheet ID]
AppSheet App ID: [User's app ID]
Current Features:
  - Fasting period tracking (V2 - DateTime approach)
  - Food type classification (V2 - lookup-based)
  - Alcohol type classification (V2 - wine support)
  - Food type management (AppSheet interface)
```

---

## 📂 Required Directory Structure

```
[Project Name]/
├── README.md                          # Project entry point with quick links
├── CLAUDE.md                          # AI assistant instructions (or GEMINI.md, AI_INSTRUCTIONS.md)
├── CHANGELOG.md                       # Version history and feature comparison
├── APPSHEET_SYSTEM_BLUEPRINT.md      # This file (documentation system template)
│
├── docs/                              # All documentation
│   ├── project/
│   │   └── PRD.md       # Complete system overview, data schema, user roles
│   │
│   ├── formulas/                     # Current state formulas (Experimental + Stable only)
│   │   ├── appsheet_formulas.md      # AppSheet table configs, columns, formulas
│   │   ├── googlesheet_formulas.md   # Google Sheets ARRAYFORMULA, VLOOKUP, etc.
│   │   ├── appscript_code.md         # Server-side Google Apps Script code
│   │   └── lookerstudio_formulas.md  # Looker Studio calculated fields, queries
│   │
│   ├── templates/
│   │   └── STABLE_SYSTEM_TEMPLATE.md # Documentation structure template
│   │
│   └── proposals/                    # Experimental feature designs
│       └── [feature_name_idea.md]    # Proposals not yet in Experimental phase
│
├── sample_data/                       # CSV exports from Google Sheets
│   └── [Sheet Name - Tab Name.csv]
│
├── utils/                             # Helper scripts for data analysis
│   └── [analysis_scripts.py/.js]
│
└── backups/                           # Historical version archives
    ├── README.md                      # Index of all archived versions
    └── [YYYY-MM-DD-vX-stable]/       # Archived stable versions
        └── appsheet_formulas.md       # Complete archived system with rollback guide
```

### Directory Explanations

| Directory/File | Purpose | When to Update |
|----------------|---------|----------------|
| **README.md** | Project entry point | When project structure changes |
| **CLAUDE.md** | AI assistant instructions | When documentation procedures change |
| **CHANGELOG.md** | Version history summary | When promoting Experimental → Stable |
| **docs/project/** | System overview docs | When architecture or roles change |
| **docs/formulas/** | Active formulas (2 versions) | Continuously (Experimental work) |
| **docs/templates/** | Documentation templates | Rarely (only if format changes) |
| **docs/proposals/** | Pre-experimental designs | Before adding to Experimental |
| **sample_data/** | Data exports for analysis | As needed for testing/analysis |
| **utils/** | Helper scripts | As needed for automation |
| **backups/** | Archived versions | When promoting new Stable version |

---

## 📋 Documentation Format Templates

### 4.1 AppSheet Formulas Format

**File:** `docs/formulas/appsheet_formulas.md`

**Structure:**
```markdown
# AppSheet Formulas - [Project Name]

## EXPERIMENTAL V[X] - [Feature Name]

**VERSION:** [Month Year]
**STATUS:** ⚠ EXPERIMENTAL - TESTING IN PROGRESS

### What's New
- Feature 1: Description
- Feature 2: Description

### Changes from V[X-1]
- Changed Column X in Table Y
- Added new table Z

### Execution Plan
[Step-by-step implementation instructions]

### Testing Checklist
- [ ] Test case 1
- [ ] Test case 2

---

## STABLE SYSTEM V[X-1] - [Feature Name]

**VERSION:** [Month Year]
**STATUS:** ✓ TESTED AND WORKING
**DEPLOYED:** [Date]

### 📋 CHANGES FROM V[X-2]
[What changed from previous version]

### 📊 ALL TABLE SCHEMAS
[All tables documented below - security rules are documented within each table schema]

### 📱 ALL VIEWS
[View configurations]

### 🔧 ALL ACTIONS
[Action buttons and behaviors]

### 🤖 BOT AUTOMATION
[Bot configurations if applicable]

### 🔄 ROLLBACK INSTRUCTIONS
[Step-by-step rollback procedures]

### 📚 VERSION HISTORY
[Version information and deployment dates]

---

## 📚 Archived Versions

See backups/README.md for index
```

---

#### Table of Contents Requirement

**All formula documentation files MUST include a table of contents after the version header and before the main content.**

**Purpose:**
- Improve navigation in long documentation files (1,500+ lines)
- Enable quick jumping to specific tables, views, actions, or functions
- Maintain consistent structure across all formula files
- Reduce cognitive load when searching for specific components

**Format:**
```markdown
## 📋 TABLE OF CONTENTS

1. [Section Name](#section-anchor)
2. [Another Section](#another-section)
   - [Subsection](#subsection-anchor)
3. [Third Section](#third-section)

---
```

**Standard TOC Structure for AppSheet Formulas:**
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

**Note:** Security rules are documented within each table schema's "Table-Level Settings" section, not as a separate section.

**When to Include TOC:**
- **ALWAYS** in appsheet_formulas.md (typically 1,500-2,000+ lines)
- **ALWAYS** in googlesheet_formulas.md (if 500+ lines or 5+ formulas)
- **ALWAYS** in appscript_code.md (if 500+ lines or 3+ functions)
- **OPTIONAL** in lookerstudio_formulas.md (based on size)

**Anchor Link Format:**
- Lowercase only
- Replace spaces with hyphens
- Remove special characters except hyphens
- Keep emoji codes as-is (e.g., `#-system-overview` for "### 📋 SYSTEM OVERVIEW")
- Numbers preserved (e.g., `#1-student-data-table` for "#### 1. Student Data Table")

**Examples:**
- "### 📋 SYSTEM OVERVIEW" → `#-system-overview`
- "#### 1. Student Data Table" → `#1-student-data-table`
- "#### Action 1: Create_Attendance" → `#action-1-create_attendance`
- "### 🔄 ROLLBACK INSTRUCTIONS" → `#-rollback-instructions`

---

**Table Documentation Template:**
```markdown
#### [N]. [Table Name] Table

**Google Sheets:** "[Tab Name]" tab
**AppSheet Table Name:** [Table Name]
**Primary Key:** [Column Name]

**Table-Level Settings:**
```appsheet
Table: [Table Name]
Updates Enabled: Yes/No (conditional)
Adds Enabled: Yes/No (conditional)
Deletes Enabled: Yes/No (conditional)

Security:
  UPDATES: [formula or ALL_CHANGES/READ_ONLY]
  ADDS: [formula or TRUE/FALSE]
  DELETES: [formula or TRUE/FALSE]

Row-level filtering (if applicable):
  [Formula that filters which rows user can see]

Notes:
  - Handlers: [What they can do]
  - Managers: [What they can do]
```

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

**Column [B]: [Column Name]**
```appsheet
Google Sheets: Column B, Type: Date
AppSheet Configuration:
  Column Name: [Name]
  Type: Date
  Key: No
  Initial Value: TODAY()
  App Formula: N/A
  VALID_IF: N/A
  EDITABLE: TRUE
  SHOW: TRUE
  REQUIRE: YES
  Description: "[Purpose]"
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

**Actions:**

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

---

**Views:**

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
  Handlers: [Can see/cannot see]
  Managers: [Can see/cannot see]
```
```

---

### 4.2 Google Sheets Formulas Format

**File:** `docs/formulas/googlesheet_formulas.md`

**Template:**
```markdown
# Google Sheets Formulas - [Project Name]

## Sheet: [Tab Name]

### Column [Letter]: [Column Name]
**Formula Type:** ARRAYFORMULA / VLOOKUP / IF / IMPORTRANGE / QUERY / etc.
**Cell Location:** [Starting cell, e.g., A2]
**Range Applied:** [e.g., A2:A (entire column)]

**Formula:**
```sheets
=[Complete formula here with proper indentation]
```

**Purpose:** [What this formula does]
**Dependencies:** [Other columns/sheets it references]
**Behavior:**
- How it updates (on edit, automatically, etc.)
- Edge cases (blank rows, errors)
- Performance notes

**Notes:** [Special considerations, limitations, or warnings]

**Example Output:**
```
Input: [example input]
Output: [example output]
```

---

### Column [Letter]: [Column Name]
**Formula Type:** [Type]
**Cell Location:** [Cell]
**Range Applied:** [Range]

**Formula:**
```sheets
=[Formula]
```

**Purpose:** [Description]

---

## Sheet: [Another Tab Name]

[Continue with more formulas...]

---

## Common Formula Patterns

### Pattern 1: ARRAYFORMULA for Auto-Fill
```sheets
=ARRAYFORMULA(IF(B2:B="","",FORMULA_HERE))
```
**Use Case:** Apply formula to entire column, skip blank rows

### Pattern 2: VLOOKUP with Error Handling
```sheets
=IFERROR(VLOOKUP(A2, 'OtherSheet'!A:B, 2, FALSE), "Not Found")
```
**Use Case:** Safe lookup with fallback value

### Pattern 3: Conditional Formatting Formula
```sheets
=AND($A2<>"", $B2="Active")
```
**Use Case:** Highlight rows meeting criteria
```

---

### 4.3 Apps Script Code Format

**File:** `docs/formulas/appscript_code.md`

**Template:**
```markdown
# Google Apps Script Code - [Project Name]

This file maintains versioned Google Apps Script code for the [Project Name] AppSheet application.

**Purpose:** Server-side automation scripts that run in Google Sheets (Extensions → Apps Script).

---

## Current Scripts

### Script: [Function Name]

**Purpose:** [Brief description of what this script does]
**Trigger Type:** Manual / Time-driven / Event-driven / On Edit / On Open / Custom
**File Location:** Extensions → Apps Script → [File Name.gs]
**Authorization Required:** [Scopes needed on first run, e.g., "Access to Google Sheets, Gmail"]
**Created:** [Date]
**Last Modified:** [Date]

**Code:**
```javascript
/**
 * [Detailed function description]
 *
 * @param {string} paramName - Description of parameter
 * @return {boolean} Description of return value
 *
 * @example
 * functionName("example");
 * // Returns true
 */
function functionName(paramName) {
  // Get active spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SheetName');

  // Implementation
  try {
    // Main logic here
    Logger.log('Success: ' + paramName);
    return true;
  } catch (error) {
    Logger.log('Error: ' + error.message);
    return false;
  }
}
```

**Installation Steps:**
1. Open Google Sheet → Extensions → Apps Script
2. Create new file (or open existing): [File Name.gs]
3. Paste code above
4. Save project (Ctrl+S or Cmd+S)
5. Run function once manually to authorize
6. Accept permissions in popup dialog
7. [Additional setup steps if needed, e.g., set triggers]

**Setting Up Triggers (if applicable):**
1. In Apps Script editor: Triggers (clock icon) → Add Trigger
2. Choose function: [functionName]
3. Event source: [Time-driven / From spreadsheet / etc.]
4. Event type: [On open / On edit / etc.]
5. Failure notification: [Email frequency]
6. Save

**Testing Checklist:**
- [ ] Run function manually, check Execution Log (View → Logs)
- [ ] Verify expected changes in spreadsheet
- [ ] Test edge cases (empty data, invalid input)
- [ ] Check error handling works
- [ ] Verify trigger fires correctly (if applicable)
- [ ] Confirm no #REF! errors introduced

**Rollback:**
If this script causes issues:
1. Open Apps Script editor
2. File → Manage versions
3. Revert to previous version, or
4. Delete function and restore from backup

**Troubleshooting:**
- **Error: "Cannot read property..."** → Check if sheet/range exists
- **Error: "Authorization required"** → Re-run and accept permissions
- **Script timeout** → Optimize or break into smaller functions

---

### Script: [Another Function Name]

[Continue with more scripts...]

---

## Migration Scripts

### Script: Migrate V2 to V3 (Posts to Post Platforms)

**Purpose:** One-time migration script to transform single-platform posts into multi-platform structure
**Status:** ⚠ Not yet created (V3 experimental)
**Trigger Type:** Manual (run once during V2→V3 migration)

**Planned Implementation:**
```javascript
function migrateV2toV3() {
  // 1. Read all Posts rows
  // 2. For each post, create Post Platforms child record
  // 3. Move Platform, URL, Image, Metrics to child table
  // 4. Update Posts row to reference new child
  // 5. Verify data integrity
  // 6. Create backup before running
}
```

**Testing Plan:**
- [ ] Test on copy of spreadsheet first
- [ ] Create backup tab before running
- [ ] Verify row counts match
- [ ] Check no data loss
- [ ] Verify AppSheet sees new structure

---

## Utility Scripts

### Script: exportBackup

**Purpose:** Create timestamped backup of all data
**Code:**
```javascript
function exportBackup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const timestamp = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd_HHmmss');
  const backupName = ss.getName() + ' - Backup ' + timestamp;
  const backup = ss.copy(backupName);
  Logger.log('Backup created: ' + backupName);
  return backup.getUrl();
}
```

---

## Notes

- All scripts use Google Apps Script JavaScript (ES5 compatible, some ES6 features)
- Scripts run under user's Google account with their permissions
- Use `Logger.log()` for debugging (View → Logs in Apps Script editor)
- SpreadsheetApp API docs: https://developers.google.com/apps-script/reference/spreadsheet
- Test on backup copies before running on production data
- Consider execution time limits (6 minutes for consumer accounts)
```

---

### 4.4 Looker Studio Formulas Format

**File:** `docs/formulas/lookerstudio_formulas.md`

**Template:**
```markdown
# Looker Studio Formulas & Queries Documentation

**Last Updated:** [Date]
**Status:** [⚠ EXPERIMENTAL / ✓ STABLE]
**Version:** V[X]

---

## Data Source Configuration

### Data Source 1: [Source Name]

**Connection:**
- Type: Google Sheets Connector
- Spreadsheet: [Spreadsheet Name]
- Sheet/Tab: [Tab Name or Range]
- Refresh: Manual / Automatic (on view)

**Schema:**
```
Field Name         | Type      | Aggregation | Description
-------------------|-----------|-------------|---------------------------
[Field 1]          | Text      | None        | [Description]
[Field 2]          | Number    | Sum         | [Description]
[Field 3]          | Date      | None        | [Description]
[Field 4]          | Boolean   | None        | [Description]
```

**Data Freshness:** [How often data updates]
**Row Count:** ~[Approximate number of rows]

---

### Data Source 2: [Another Source Name]

[Repeat structure above]

---

## Calculated Fields

### Calculated Field: [Field Name]

**Type:** Metric / Dimension
**Data Type:** Number / Text / Date / Boolean
**Aggregation:** Sum / Count / Average / Max / Min / None (if metric)
**Category:** [e.g., Engagement / Performance / Time-based]

**Formula:**
```looker
[Complete Looker Studio formula]
```

**Purpose:** [What this field calculates and why it's useful]
**Used In:** [Which reports/charts use this field]
**Dependencies:** [Other fields this references]

**Example Calculation:**
```
Input: Field1=10, Field2=5
Output: [Example result]
```

**Notes:** [Edge cases, limitations, or special considerations]

---

### Calculated Field: Total Engagement

**Type:** Metric
**Data Type:** Number
**Aggregation:** Sum

**Formula:**
```looker
SUM(Likes) + SUM(Comments) + SUM(Shares)
```

**Purpose:** Aggregate all engagement metrics into single KPI
**Used In:** Engagement Overview dashboard, Monthly Reports
**Dependencies:** Likes, Comments, Shares fields

---

### Calculated Field: Engagement Rate

**Type:** Metric
**Data Type:** Number (Percent)
**Aggregation:** Average

**Formula:**
```looker
(SUM(Likes) + SUM(Comments)) / SUM(Reach) * 100
```

**Purpose:** Calculate engagement as percentage of reach
**Used In:** Performance Scorecard, Client Reports
**Dependencies:** Likes, Comments, Reach fields

**Notes:** Returns 0 if Reach is 0 (avoids division by zero)

---

### Calculated Field: Month Year

**Type:** Dimension
**Data Type:** Text
**Aggregation:** None

**Formula:**
```looker
CONCAT(CAST(YEAR(Date) AS TEXT), " ", CAST(MONTH(Date) AS TEXT), " ", FORMAT_DATETIME("%B", Date))
```

**Purpose:** Group data by month with readable format
**Used In:** Time-series reports, Monthly breakdowns
**Dependencies:** Date field

**Example Output:** "2025 10 October"

---

## Blended Data Sources

### Blended Data: [Blend Name]

**Purpose:** [Why this blend is needed]
**Join Type:** Left Outer / Inner / Full Outer / Cross Join
**Join Configuration:**
- Left source: [Source 1]
- Right source: [Source 2]
- Join key: [Field Name] = [Field Name]

**Fields Included:**
- From [Source 1]: [Field1, Field2, Field3]
- From [Source 2]: [Field4, Field5]

**Use Case:** [When to use this blended data]

---

## Report Configurations

### Report: [Report Name]

**Report Type:** Scorecard / Table / Time Series / Bar Chart / Pie Chart / Geo Chart
**Data Source:** [Source name or Blended data name]
**Purpose:** [What insights this report provides]

**Configuration:**
- **Date Range:** Last 30 days / Last month / Custom / etc.
- **Dimensions:** [Dimension 1, Dimension 2]
- **Metrics:** [Metric 1, Metric 2, Metric 3]
- **Filters Applied:**
  - Filter 1: [Field] [Operator] [Value]
  - Filter 2: [Field] [Operator] [Value]
- **Sorting:** [Field name] Descending/Ascending
- **Row Limit:** [Number or All]

**Interactions:**
- **Drill-down:** Click [dimension] to filter by [other dimension]
- **Cross-filtering:** Enabled/Disabled

**Styling:**
- **Theme:** [Theme name]
- **Color palette:** [Description]
- **Conditional formatting:** [Rules if applicable]

**Refresh Schedule:** [Automatic / Manual]

---

### Report: Engagement Overview (Scorecard)

**Report Type:** Scorecard
**Data Source:** Posts Table
**Purpose:** Show total engagement metrics at a glance

**Configuration:**
- **Date Range:** Last 30 days
- **Metrics:**
  - Total Reach (SUM)
  - Total Likes (SUM)
  - Total Comments (SUM)
  - Engagement Rate (calculated field)
- **Comparison:** Previous period (30 days prior)
- **Conditional formatting:**
  - Green if > previous period
  - Red if < previous period

---

### Report: Posts Performance (Table)

**Report Type:** Table
**Data Source:** Posts Table
**Purpose:** Detailed breakdown of individual post performance

**Configuration:**
- **Dimensions:**
  - Date
  - Client
  - Post Description (truncated to 50 chars)
  - Platform
- **Metrics:**
  - Reach
  - Likes
  - Comments
  - Engagement Rate
- **Sorting:** Date Descending
- **Row Limit:** 50
- **Filters:**
  - Status = "Posted"
  - Date >= 30 days ago

---

## Dashboard Layouts

### Dashboard: [Dashboard Name]

**Purpose:** [What this dashboard shows]
**Audience:** [Who uses this - Handlers/Managers/Clients]
**Update Frequency:** [How often data refreshes]

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Title: [Dashboard Name]                    │
│  Date Range Selector: [Last 30 days]        │
├─────────────────────────────────────────────┤
│  Scorecard 1  │  Scorecard 2  │ Scorecard 3 │
│  [Total Posts]│  [Total Reach]│ [Engagement]│
├─────────────────────────────────────────────┤
│  Time Series Chart: Posts Over Time         │
│  (Line chart with date on X-axis)           │
├─────────────────────────────────────────────┤
│  Table: Top 10 Posts by Engagement          │
└─────────────────────────────────────────────┘
```

**Filters:**
- Date range (dashboard-level)
- Client (optional, dropdown)
- Platform (optional, multi-select)

**Interactivity:**
- Click client name → filter entire dashboard
- Hover over chart → show tooltip with details

---

## Access Control

**Viewer Access:**
- Handlers: Can view their own clients' reports only (row-level security)
- Managers: Can view all data

**Editor Access:**
- Only [specific emails] can edit reports
- All others are viewers

**Sharing Settings:**
- Link sharing: Restricted (specific people only)
- Embedding: Disabled

---

## Performance Optimization

**Best Practices:**
- Use date range filters to limit data fetched
- Avoid complex calculated fields in large tables
- Use blended data sparingly (performance impact)
- Cache data sources when possible
- Limit row counts in tables (paginate if needed)

**Current Performance:**
- Dashboard load time: ~2-3 seconds
- Data refresh time: ~1-2 seconds
- No timeout issues reported

---

## Troubleshooting

**Issue: "Data source configuration error"**
- Solution: Check if Google Sheet is accessible, refresh data source

**Issue: "Calculated field returns #ERROR"**
- Solution: Check for division by zero, null values, or type mismatches

**Issue: "Dashboard loads slowly"**
- Solution: Reduce date range, limit rows, simplify calculated fields

**Issue: "Blend returns no data"**
- Solution: Verify join keys match exactly, check data types

---

## Notes

- Looker Studio formula syntax differs from Google Sheets (no "=" prefix)
- Use CASE WHEN for conditional logic (no IF function)
- Aggregation functions: SUM(), AVG(), COUNT(), MIN(), MAX()
- Date functions: YEAR(), MONTH(), QUARTER(), FORMAT_DATETIME()
- Text functions: CONCAT(), UPPER(), LOWER(), SUBSTR()
- Docs: https://support.google.com/looker-studio/table/6379764
```

---

## 🔄 Version Management System

### Active File Structure (Cumulative Documentation)

**In `docs/formulas/appsheet_formulas.md`:**

The active file maintains a **complete, cumulative view of the current application state**. Versions are additive - V3 = V2 + new features, not a replacement of V2.

**Organization:** By feature/table (Data Tables, Views, Actions, etc.), NOT chronologically by version

**Version Tags:** Features marked with "Added: VX" to show when introduced

1. **EXPERIMENTAL V[X]** (Optional - if testing new features)
   - **Includes:**
     - What's New (features being added)
     - Changes from previous stable version
     - Execution Plan (step-by-step implementation)
     - Testing Checklist
   - **Purpose:** Document how to implement new features being tested
   - **Status:** ⚠ EXPERIMENTAL - TESTING IN PROGRESS

2. **STABLE SYSTEM V[X-1]** - Complete current application state
   - **Includes:**
     - 📊 COMPLETE TABLE SCHEMAS (ALL tables with version tags)
     - 🔧 ALL ACTIONS (from all versions)
     - 📱 ALL VIEWS (from all versions)
     - 🔒 ALL SECURITY RULES
     - 📋 DATA TABLE ENUM VALUES
     - ✅ TESTING RESULTS
     - 📚 VERSION HISTORY (summary at bottom)
   - **Purpose:** Single source of truth showing complete cumulative state
   - **Organization:** Grouped by feature/table type, tagged with version added
   - **Status:** ✓ TESTED AND WORKING

3. **📚 ARCHIVED VERSIONS** - Pointer to backups
   - **Content:** Links to `backups/` directory
   - **Purpose:** Point-in-time snapshots before major additions (for rollback)

### File Size Target
- **Active files:** 1500-2000 lines (fast to read, manageable)
- **Archived files:** Complete documentation (any size needed)

---

### Promotion Process (Experimental → Stable)

**When user confirms "mark as stable", follow these steps:**

**KEY CONCEPT:** Experimental changes get **integrated** into the complete cumulative documentation, while taking a point-in-time backup of the state before the addition.

#### Step 1: Create Point-in-Time Backup (Before Adding New Features)
1. Create directory: `backups/YYYY-MM-DD-v[X-1]-stable/`
2. Extract the complete current Stable V[X-1] from active file (the state BEFORE experimental changes)
3. Add "🔄 QUICK ROLLBACK FROM V[X] TO V[X-1]" section at top:
   ```markdown
   ## 🔄 QUICK ROLLBACK FROM V[X] TO V[X-1]

   **Use this if V[X] additions cause issues and you need to remove them.**

   ### Rollback Steps (estimated time: [X] minutes)
   1. AppSheet changes: [list what to delete/revert]
   2. Google Sheets changes: [list what to delete/revert]
   3. Apps Script changes: [list what to delete/revert]
   4. Verification: [test cases to confirm V[X-1] features still work]

   ### Note on Data
   [Explain if any data needs to be migrated/removed during rollback]
   ```
4. Save as: `backups/YYYY-MM-DD-v[X-1]-stable/appsheet_formulas.md`
5. Update `backups/README.md` index:
   - Add row to Archived Versions table with "Extended By" column showing V[X]
   - Explain what V[X] added (not replaced)
6. Update `CHANGELOG.md` in root:
   - Mark V[X-1] as ARCHIVED (point-in-time backup)
   - Add V[X] as STABLE (current production with cumulative features)
   - Update version comparison table showing additive features

#### Step 2: Integrate Experimental Changes into Stable
1. Change header: `EXPERIMENTAL V[X]` → mark as promoted
2. **Reorganize active file by feature/table** (NOT chronologically):
   - Integrate new tables/features into existing sections
   - Add "Added: V[X]" tags to new features
   - Keep existing features with their "Added: V[X-1]" tags
   - Organize by: Data Tables → Actions → Views → Security (functional grouping)
3. Update header at top:
   - **CURRENT VERSION:** V[X]
   - **STATUS:** ✅ PRODUCTION - STABLE
4. Add complete documentation for new features:
   - Full table schemas for new tables (if any)
   - All new actions with formulas
   - All new views with configurations
   - Updated security rules
   - Updated enum values
5. Add Version History section at bottom:
   ```markdown
   ## 📚 VERSION HISTORY

   ### Current Version: V[X] (Month Year)
   **What's New in V[X]:**
   - Feature 1: Description
   - Feature 2: Description

   ### Previous Version: V[X-1] (Month Year)
   **Backup Location:** `backups/YYYY-MM-DD-v[X-1]-stable/`
   **What V[X-1] Had:** [Summary of features before V[X] additions]
   ```

#### Step 3: Clean Up Active File
1. Remove Experimental V[X] section (content now integrated)
2. Ensure active file shows:
   - Complete current state (all features from all versions)
   - Organized by feature/table type
   - Version tags showing when each feature was added
   - Version history at bottom
3. Add pointer to archived versions:
   ```markdown
   ## 📚 Archived Versions

   **Point-in-time backups before major additions:**

   **See:**
   - V[X-1] (before V[X] additions): `backups/YYYY-MM-DD-v[X-1]-stable/appsheet_formulas.md`
   - Complete index: `backups/README.md`
   - Version history: `CHANGELOG.md`
   ```

#### Step 4: Verify & Notify
1. Check file size is reasonable (reorganization may reduce size)
2. Verify no broken links
3. Verify complete state is visible (all tables, views, actions present)
4. Test rollback instructions in archived file
5. Output summary:
   ```
   ✅ V[X] promoted to Stable!
   ✅ V[X-1] archived to backups/YYYY-MM-DD-v[X-1]-stable/ (point-in-time backup)
   ✅ Experimental changes integrated into complete documentation
   ✅ File reorganized by feature/table (not chronologically)
   ✅ CHANGELOG.md updated
   ✅ backups/README.md updated

   Active file now contains:
   - Complete cumulative state (V2 features + V3 features)
   - Organized by: Data Tables → Views → Actions → Security
   - Version tags showing when each feature was added

   Total lines: [number] (target: 1500-2000)
   ```

---

### Archive Retention Policy

**Keep all archived versions indefinitely.**

**Rationale:**
- Disk space is cheap
- Historical reference valuable
- Rollback capability important
- Compliance may require records

**Future Consideration:**
- If disk space becomes issue, move versions >2 years old to cold storage
- Always keep at least last 3 stable versions

---

## 🤖 AI Assistant Instructions - PROACTIVE VALIDATION REQUIRED

### ⚠️ CRITICAL FOR AI ASSISTANTS

**When working with AppSheet projects, you MUST:**

1. **READ** blueprint thoroughly
2. **DETECT** project state (Scenario A/B/C)
3. **PERFORM** setup or migration
4. **VALIDATE** completeness (Section 6.5)
5. **FIX** any gaps PROACTIVELY (don't wait for user to ask)

**Example - WRONG approach:**
❌ "I'll migrate what's there and wait for user to request complete docs"
❌ "CLAUDE.md looks okay, I'll leave it as-is"
❌ "I'll offer partial documentation as 'quick option'"

**Example - CORRECT approach:**
✅ "Migration done. Validating... CLAUDE.md version management outdated. Updating now."
✅ "Migration done. Validating... appsheet_formulas.md missing complete table schemas. Gathering from user now."
✅ "Setup complete. Running validation checklist (Section 6.5) to ensure blueprint compliance."

**Why This Matters:**
- Blueprint sets a STANDARD (complete documentation)
- User expects blueprint compliance without having to ask
- Incomplete docs defeat the purpose of the blueprint
- Validation catches gaps before they become issues

---

### When You First Read This File

**1. Detect Project State:**

Run these checks:
```
Check 1: Does docs/ folder exist?
Check 2: Does docs/formulas/ folder exist?
Check 3: Do formula files exist (appsheet_formulas.md, etc.)?
Check 4: Does CLAUDE.md exist?
Check 5: Does CHANGELOG.md exist?
Check 6: Does backups/ folder exist?
Check 7: Does README.md exist?
```

**2. Determine Scenario:**

**SCENARIO A: Fresh Project (no docs/ folder)**
```
IF Check 1 = FALSE:
  → This is a fresh project
  → Proceed to Fresh Project Initialization
```

**SCENARIO B: Existing Messy Project (has docs but incomplete)**
```
IF Check 1 = TRUE AND (Check 2 = FALSE OR Check 3 = FALSE):
  → This is an existing project with incomplete structure
  → Proceed to Existing Project Migration
```

**SCENARIO C: System Already Set Up**
```
IF all checks = TRUE:
  → System already initialized
  → Read Project Configuration section
  → Ready to work on project
  → No initialization needed
```

---

### Fresh Project Initialization (Scenario A)

**Step 1: Ask User for Confirmation**

```
OUTPUT TO USER:
"I detect this is a fresh AppSheet project with no documentation structure.

Should I initialize the AppSheet documentation system? This will create:
✓ docs/ folder structure (project/, formulas/, templates/, proposals/)
✓ Empty formula files with format templates
✓ README.md with quick links
✓ CHANGELOG.md for version history
✓ backups/ folder with README.md
✓ CLAUDE.md with AI assistant instructions (or update existing)

The system is based on APPSHEET_SYSTEM_BLUEPRINT.md.

Type 'yes' to initialize, or 'no' to skip."
```

**Step 2: If User Says YES, Execute Initialization**

**2.1 Create Directory Structure:**
```bash
mkdir -p docs/project
mkdir -p docs/formulas
mkdir -p docs/templates
mkdir -p docs/proposals
mkdir -p sample_data
mkdir -p utils
mkdir -p backups
```

**2.2 Create Formula Files:**

Create `docs/formulas/appsheet_formulas.md`:
```markdown
# AppSheet Formulas - [Project Name from config]

**Last Updated:** [Current Date]

---

## EXPERIMENTAL V1 - Initial System Setup

**VERSION:** [Current Date]
**STATUS:** ⚠ EXPERIMENTAL - INITIAL SETUP

### What's New
- Initial table structure
- Basic formulas
- Security rules

### Tables

[Add table documentation here using template from Section 4.1]

**Example:**
#### 1. [Your First Table] Table

**Google Sheets:** "[Tab Name]" tab
**AppSheet Table Name:** [Table Name]
**Primary Key:** [Key Column]

**Table-Level Settings:**
```appsheet
Table: [Table Name]
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: Yes
Security: [Configure as needed]
```

**Columns:**

**Column A: [Column Name]**
```appsheet
Google Sheets: Column A, Type: Text
AppSheet Configuration:
  Column Name: [Name]
  Type: Text
  Key: Yes
  Initial Value: [formula or blank]
  EDITABLE: TRUE
  SHOW: TRUE
  REQUIRE: YES
  Description: "[Purpose]"
```

[Add more columns...]

---

## STABLE SYSTEM V0 - Placeholder

**STATUS:** No stable version yet. V1 will be promoted after testing.

---

## 📚 Archived Versions

No archived versions yet.
```

Create `docs/formulas/googlesheet_formulas.md`:
```markdown
# Google Sheets Formulas - [Project Name]

**Last Updated:** [Current Date]

---

## Sheet: [Tab Name]

### Column [Letter]: [Column Name]
**Formula Type:** [Type]
**Cell Location:** [Cell]
**Range Applied:** [Range]

**Formula:**
```sheets
=[Your formula here]
```

**Purpose:** [Description]
**Dependencies:** [Other columns]

---

[Add more formulas using template from Section 4.2]
```

Create `docs/formulas/appscript_code.md`:
```markdown
# Google Apps Script Code - [Project Name]

**Last Updated:** [Current Date]

---

## Current Scripts

### Script: [Function Name]

**Purpose:** [Description]
**Trigger Type:** Manual
**File Location:** Extensions → Apps Script → [File Name.gs]

**Code:**
```javascript
function exampleFunction() {
  // Your code here
}
```

**Installation Steps:**
1. Open Google Sheet → Extensions → Apps Script
2. Create new file: [File Name.gs]
3. Paste code above
4. Save and authorize

---

[Add more scripts using template from Section 4.3]
```

Create `docs/formulas/lookerstudio_formulas.md`:
```markdown
# Looker Studio Formulas & Queries - [Project Name]

**Last Updated:** [Current Date]

---

## Data Source: [Source Name]

**Connection:**
- Type: Google Sheets Connector
- Spreadsheet: [Your spreadsheet]
- Sheet: [Tab name]

---

[Add data sources and calculated fields using template from Section 4.4]
```

**2.3 Create Supporting Files:**

Create `README.md`:
```markdown
# [Project Name from config]

AppSheet-based system for [purpose - ask user or leave placeholder].

---

## 📋 Quick Links

### Documentation
- [Project Overview](docs/project/PRD.md)
- [AppSheet Formulas](docs/formulas/appsheet_formulas.md)
- [Google Sheets Formulas](docs/formulas/googlesheet_formulas.md)
- [Apps Script Code](docs/formulas/appscript_code.md)
- [Looker Studio Formulas](docs/formulas/lookerstudio_formulas.md)

### Version History
- [CHANGELOG.md](CHANGELOG.md) - Version history and feature comparison
- [Archived Versions](backups/README.md) - Historical versions

---

## 🏗️ Architecture

[Add architecture diagram or description]

---

## 👥 User Roles

[Add user roles from Project Configuration]

---

## 🚀 Current System Status

**Active Version:** EXPERIMENTAL V1 - Initial Setup
**Status:** ⚠️ In Development

---

## 🔧 For Developers & AI Assistants

See [CLAUDE.md](CLAUDE.md) for AI assistant instructions and documentation procedures.

See [APPSHEET_SYSTEM_BLUEPRINT.md](APPSHEET_SYSTEM_BLUEPRINT.md) for complete system template.
```

Create `CHANGELOG.md`:
```markdown
# [Project Name] - Version Changelog

**Purpose:** Track version history and feature evolution.

---

## Version History

### V1 - Initial System (In Progress)
**Status:** ⚠️ EXPERIMENTAL - In Development
**Started:** [Current Date]
**Location:** docs/formulas/appsheet_formulas.md (Experimental section)

**Features:**
- [List initial tables]
- [List initial features]
- [List user roles]

**Testing Status:** Not yet tested

---

## Version Comparison

| Feature | V1 (Experimental) |
|---------|-------------------|
| Tables | [List] |
| User Roles | [List] |
| Security | [Description] |

---

## Archived Versions Index

| Version | Archived Date | Location |
|---------|---------------|----------|
| (none yet) | - | - |
```

Create `backups/README.md`:
```markdown
# Archived Versions - [Project Name]

---

## 📋 Archived Versions Index

| Version | Archived Date | Status | Location | Extended By |
|---------|---------------|--------|----------|-------------|
| (none yet) | - | - | - | - |

---

## 🔄 Archive Process

When a new Stable version is promoted, the previous Stable version is archived here.

See root CHANGELOG.md for version history summary.

---

## 📖 How to Use Archived Versions

### For Rollback:
1. Find version in table above
2. Open `[date]-v[X]-stable/appsheet_formulas.md`
3. Look for "🔄 QUICK ROLLBACK" section at top
4. Follow rollback steps

### For Historical Reference:
- Compare formulas across versions
- Understand evolution of system
- Reference old implementations
```

Create `docs/templates/STABLE_SYSTEM_TEMPLATE.md`:
```markdown
# STABLE SYSTEM TEMPLATE

This template shows the exact structure for documenting each Stable System in `appsheet_formulas.md`.

---

## STABLE SYSTEM V[X] - [Feature Name]

**VERSION:** [Month Year]
**STATUS:** ✓ TESTED AND WORKING
**DEPLOYED:** [Date]

---

### 📋 CHANGES FROM V[X-1]

**What's New in V[X]:**
- Feature 1: Description
- Feature 2: Description

**What Changed:**
- Table X: Modified Column Y
- View X: Updated display settings

**Note:** This version is cumulative - V[X] includes all V[X-1] features plus the additions above

---

### 📊 COMPLETE TABLE SCHEMAS

[Document ALL tables using template from Section 4.1]

---

### 🔧 ALL ACTIONS

[Document ALL actions]

---

### 📱 ALL VIEWS

[Document ALL views]

---

### 🔒 ALL SECURITY RULES

[Document ALL security rules]

---

### 📋 DATA TABLE - ALL ENUM VALUES

[List all enum values]

---

### ✅ TESTING RESULTS

**Test Date:** [Date]
**Tested By:** [Name]
**Environment:** [Production/Test]

**Test Cases:**
- [x] Test 1: Description - PASSED
- [x] Test 2: Description - PASSED

**Known Issues:** None / [List if any]

---

### 🔄 ROLLBACK INSTRUCTIONS

[Step-by-step rollback procedure to previous version]
```

**2.4 Create/Update CLAUDE.md:**

If CLAUDE.md doesn't exist, create it:
```markdown
# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Context

[Copy from APPSHEET_SYSTEM_BLUEPRINT.md Project Configuration]

## Architecture Overview

[Copy architecture description]

## Working with This Repository

### Documentation System

This project uses the AppSheet Documentation System Blueprint.

**Structure:** See APPSHEET_SYSTEM_BLUEPRINT.md for complete system definition.

**Formula Files:**
- `docs/formulas/appsheet_formulas.md` - AppSheet configs (Experimental + Stable only)
- `docs/formulas/googlesheet_formulas.md` - Sheet formulas
- `docs/formulas/appscript_code.md` - Apps Script code
- `docs/formulas/lookerstudio_formulas.md` - Looker Studio queries

**Version Management:**
- Active file: 2 versions (Experimental + Stable)
- Archive: Previous versions in `backups/[date]-v[X]-stable/`
- History: See `CHANGELOG.md` for quick reference

### Formula Documentation Format

Follow templates in APPSHEET_SYSTEM_BLUEPRINT.md Section 4.

### Version Promotion Workflow

See APPSHEET_SYSTEM_BLUEPRINT.md Section 5 (Version Management System).

## Reference Documentation

- **[APPSHEET_SYSTEM_BLUEPRINT.md](APPSHEET_SYSTEM_BLUEPRINT.md)** - Complete system template
- **[docs/project/PRD.md](docs/project/PRD.md)** - System overview
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[backups/README.md](backups/README.md)** - Archived versions index
```

If CLAUDE.md already exists, append the documentation system section.

**2.5 Create PRD.md placeholder:**

Create `docs/project/PRD.md`:
```markdown
# [Project Name] - Project Overview

## Project Purpose

[Brief description of what this system does]

---

## User Roles

[Copy from Project Configuration in APPSHEET_SYSTEM_BLUEPRINT.md]

---

## Data Structure

### Tables

[List tables from Project Configuration]

### Relationships

[Describe how tables relate to each other]

---

## Access Control Model

[Describe security model]

---

[Add more sections as needed]
```

**2.6 Notify User:**

```
OUTPUT TO USER:
"✅ AppSheet documentation system initialized!

Created:
✓ docs/project/PRD.md (placeholder)
✓ docs/formulas/appsheet_formulas.md (with template)
✓ docs/formulas/googlesheet_formulas.md (with template)
✓ docs/formulas/appscript_code.md (with template)
✓ docs/formulas/lookerstudio_formulas.md (with template)
✓ docs/templates/STABLE_SYSTEM_TEMPLATE.md
✓ README.md (project entry point)
✓ CHANGELOG.md (version history)
✓ backups/README.md (archive index)
✓ CLAUDE.md (AI instructions) [created/updated]

Next steps:
1. Fill in Project Configuration section in APPSHEET_SYSTEM_BLUEPRINT.md
2. Document your tables in docs/formulas/appsheet_formulas.md
3. Add project overview to docs/project/PRD.md
4. Update README.md with project-specific information

Ready to start documenting your AppSheet system!"
```

**Step 3: Validate Initialization**

After completing initialization, run **Post-Setup Validation (Section 6.5)** to ensure:
- ✅ All files created successfully
- ✅ CLAUDE.md contains blueprint version management instructions
- ✅ Formula files have proper templates ready for documentation
- ✅ Directory structure is complete and correct

**If validation fails:** Fix issues before proceeding to documentation.

---

### Existing Project Migration (Scenario B)

**Step 1: Detect Current State**

Scan for existing files:
```
Check locations:
- Root directory (*.md files)
- Any existing docs/ structure
- Loose formula files
- Backup folders
```

**Step 2: Ask User for Approach**

```
OUTPUT TO USER:
"I found existing documentation files in this project:

Detected files:
- [list files with paths and sizes]

The current structure doesn't match the AppSheet System Blueprint.

How should I proceed?

**Option 1: Migrate existing content** (recommended)
- Preserves all current documentation
- Reorganizes into blueprint structure
- Backs up originals to legacy/[date]/ folder
- Attempts to extract versions if present

**Option 2: Create clean structure**
- Creates new template structure
- Moves existing files to legacy/[date]/ folder unchanged
- You manually migrate content later
- Safer if existing structure is very different

Which option do you prefer? (Type '1' for migrate, '2' for clean start)"
```

**Step 3a: If User Chooses Option 1 (Migrate)**

**3a.1 Backup Originals:**
```bash
mkdir -p legacy/[YYYY-MM-DD]
cp [all existing files] legacy/[YYYY-MM-DD]/
```

**3a.2 Create New Structure:**
(Same as Fresh Project Initialization Step 2.1)

**3a.3 Migrate Content:**

For each existing file:

**If `appsheet_formulas.md` exists:**
- Read file
- Detect if versions are present (look for "V1", "V2", "EXPERIMENTAL", "STABLE")
- If versions found:
  - Extract Experimental version → place in new file Experimental section
  - Extract latest Stable version → place in new file Stable section
  - Extract older versions → create `backups/[date]-v[X]-stable/` for each
- If no versions:
  - Place entire content in Experimental V1 section
  - Note: "Migrated from unversioned system"

**If other formula files exist:**
- Read content
- Place in corresponding new file location
- Preserve all formulas, comments, structure

**If README.md exists:**
- Merge with new README.md template
- Preserve project-specific content
- Add blueprint structure links

**If CHANGELOG.md exists:**
- Merge with new CHANGELOG.md template
- Preserve existing version history

**3a.4 Update References:**
- Fix any broken links in migrated files
- Update paths to new structure

**3a.5 Notify User:**
```
OUTPUT TO USER:
"✅ Documentation migrated to AppSheet System Blueprint structure!

Migration summary:
✓ Original files backed up to: legacy/[date]/
✓ [N] versions extracted and archived
✓ Current content placed in new structure
✓ All formulas preserved

Created:
✓ docs/ folder structure
✓ Formula files (migrated content)
✓ README.md (merged with existing)
✓ CHANGELOG.md (merged with existing)
✓ backups/ with archived versions

Next steps:
1. Review migrated content in docs/formulas/
2. Verify all formulas transferred correctly
3. Update Project Configuration in APPSHEET_SYSTEM_BLUEPRINT.md
4. Check README.md and update if needed

Original files available in: legacy/[date]/"
```

**Step 3b: If User Chooses Option 2 (Clean Start)**

**3b.1 Move Existing Files:**
```bash
mkdir -p legacy/[YYYY-MM-DD]
mv [existing files] legacy/[YYYY-MM-DD]/
```

**3b.2 Create New Structure:**
(Same as Fresh Project Initialization full process)

**3b.3 Notify User:**
```
OUTPUT TO USER:
"✅ Clean AppSheet System Blueprint structure created!

Original files moved to: legacy/[date]/
New structure created with empty templates.

Next steps:
1. Review original files in legacy/[date]/
2. Manually copy relevant content to new structure
3. Follow format templates in APPSHEET_SYSTEM_BLUEPRINT.md
4. Update Project Configuration

Ready to start fresh!"
```

**Step 4: Validate Migration**

After completing migration, run **Post-Setup Validation (Section 6.5)** to ensure blueprint compliance:

**CRITICAL CHECKS:**
1. **CLAUDE.md Version Management:**
   - READ current CLAUDE.md content
   - COMPARE to blueprint template (Section 6, lines 1489-1500)
   - IF version management section is MISSING or OUTDATED → UPDATE immediately
   - Ensure it describes: 2-version discipline, archive process, promotion workflow

2. **Formula File Completeness:**
   - CHECK if appsheet_formulas.md has STABLE SYSTEM section
   - IF YES: Verify it contains COMPLETE documentation:
     - 📊 ALL table schemas (every column with full AppSheet configuration)
     - 🔧 ALL actions
     - 📱 ALL views
     - 🔒 ALL security rules
     - 📋 ALL enum values
     - ✅ Testing results
     - 🔄 Rollback instructions
   - IF INCOMPLETE → IMMEDIATELY gather missing information from user
   - **Do NOT offer "partial documentation" option** - blueprint requires complete

3. **Archive Structure:**
   - IF migrated file had multiple versions inline → Extract and archive to backups/
   - Ensure active file follows 2-version discipline

**Decision Rule:**
```
IF (documentation is incomplete):
  → Say: "Blueprint requires complete documentation. Gathering details now..."
  → Start asking for table schemas, views, actions, etc.
  → Don't wait for user to request this

IF (CLAUDE.md outdated):
  → Say: "CLAUDE.md version management outdated. Updating to match blueprint..."
  → Update immediately
```

**If validation fails:** Fix all issues before considering migration complete.

---

### Post-Setup Validation (Section 6.5)

**Purpose:** Ensure blueprint compliance after initialization or migration.

**When to Run:**
- After Fresh Project Initialization (Section 6.3)
- After Existing Project Migration (Section 6.4)
- When encountering a project for the first time
- Before considering setup "complete"

---

#### Validation Checklist

**1. Validate CLAUDE.md Content**

```
READ: CLAUDE.md file
FIND: "Version Management Structure" section

COMPARE to blueprint template (lines 1489-1500):
  Expected content:
  - "Active file: 2 versions (Experimental + Stable)"
  - "Archive: Previous versions in backups/[date]-v[X]-stable/"
  - "History: See CHANGELOG.md for quick reference"
  - Promotion workflow description
  - 2-version discipline explanation

IF (section MISSING or OUTDATED):
  → UPDATE immediately with blueprint version
  → Don't ask user - this is blueprint requirement
  → Output: "Updating CLAUDE.md to match blueprint version management..."
```

**Example - What to Check:**
```markdown
❌ OLD/INCORRECT in CLAUDE.md:
```
EXPERIMENTAL (Latest ideas being tested)
    ↓
STABLE SYSTEM (Latest working version)
    ↓
ARCHIVED - STABLE SYSTEM (Previous versions)  ← WRONG: inline archives
```

✅ CORRECT in CLAUDE.md:
```
EXPERIMENTAL V[X] (if testing new features)
    ↓
STABLE SYSTEM V[X-1] (current production)
    ↓
📚 Archived Versions (pointer to backups/)  ← RIGHT: references backups/
```
- Archive: Previous versions in `backups/[date]-v[X]-stable/`
```

---

**2. Validate Formula File Completeness**

```
READ: docs/formulas/appsheet_formulas.md
FIND: "STABLE SYSTEM V[X]" section

CHECK for these required sections:
  □ 📋 CHANGES FROM V[X-1]
  □ 📊 COMPLETE TABLE SCHEMAS
  □ 🔧 ALL ACTIONS
  □ 📱 ALL VIEWS
  □ 🔒 ALL SECURITY RULES
  □ 📋 DATA TABLE - ALL ENUM VALUES
  □ ✅ TESTING RESULTS
  □ 🔄 ROLLBACK INSTRUCTIONS

IF (any section MISSING):
  → Say: "Blueprint requires complete documentation. I need to gather:"
  → List missing sections
  → Start asking for information immediately
  → Don't offer "partial documentation" as option

IF (COMPLETE TABLE SCHEMAS exists but incomplete):
  → CHECK: Does it list ALL columns?
  → CHECK: Does each column have full AppSheet configuration?
    - Column Name, Type, Key, Initial Value
    - App Formula, VALID_IF
    - EDITABLE, SHOW, REQUIRE
    - Description
  → IF incomplete: Gather missing details
```

**Example - What Counts as "Complete":**
```markdown
❌ INCOMPLETE Table Schema:
```
### Food Data Table
Columns:
- Date (Date)
- Food Intake (Text)
- Eating Start (DateTime)
```
Missing: Column letters, Type details, EDITABLE, SHOW, REQUIRE, etc.

✅ COMPLETE Table Schema:
```
### Food Data Table
**Column A: Date**
```appsheet
Google Sheets: Column A, Type: Date
AppSheet Configuration:
  Column Name: Date
  Type: Date
  Key: No
  Initial Value: TODAY()
  App Formula: N/A
  VALID_IF: N/A
  EDITABLE: TRUE
  SHOW: TRUE
  REQUIRE: YES
  Description: "Date of food intake entry"
```
(Full configuration for EVERY column)
```

---

**3. Validate 2-Version Discipline**

```
READ: docs/formulas/appsheet_formulas.md
COUNT: Number of version sections

Expected structure:
  - EXPERIMENTAL V[X] (optional, if testing)
  - STABLE SYSTEM V[X-1] (required)
  - 📚 Archived Versions (pointer only)

IF (more than 2 active versions found):
  → Archive old versions to backups/[date]-v[X]-stable/
  → Update active file to keep only 2 versions
  → Update backups/README.md with archive entry
  → Update CHANGELOG.md

CHECK: File size
  → Target: < 2000 lines
  → IF > 2000: Consider archiving more content
```

---

**4. Validate Supporting Files**

```
CHECK file existence:
  □ backups/README.md
  □ CHANGELOG.md
  □ README.md
  □ docs/project/PRD.md
  □ docs/templates/STABLE_SYSTEM_TEMPLATE.md

IF (any file MISSING):
  → Create from blueprint template
  → Don't ask user - these are required files

CHECK backups/README.md content:
  → Has "Archived Versions Index" table
  → Lists all archived versions with dates and locations

CHECK CHANGELOG.md content:
  → Has version history
  → Has archived versions index
```

---

#### AI Decision Tree

```
START Migration/Initialization
  ↓
Complete setup tasks
  ↓
RUN Section 6.5 Validation
  ↓
┌─────────────────────────────────┐
│ Check 1: CLAUDE.md              │
├─────────────────────────────────┤
│ Read version management section │
│ Compare to blueprint template   │
└─────────┬───────────────────────┘
          │
    ┌─────┴──────┐
    │ Matches?   │
    └─────┬──────┘
          │
    ┌─────┴────────────┬───────────────┐
    │ YES              │ NO             │
    │ ✓ Pass           │ ✗ Fix Now      │
    └──────────────────┴────────────────┘
          │                    │
          │         UPDATE CLAUDE.md immediately
          │         Output: "Updating CLAUDE.md..."
          │                    │
          └────────┬───────────┘
                   ↓
┌─────────────────────────────────┐
│ Check 2: Formula Completeness   │
├─────────────────────────────────┤
│ Look for STABLE SYSTEM section  │
│ Check for complete schemas      │
└─────────┬───────────────────────┘
          │
    ┌─────┴──────┐
    │ Complete?  │
    └─────┬──────┘
          │
    ┌─────┴────────────┬───────────────────────┐
    │ YES              │ NO / PARTIAL          │
    │ ✓ Pass           │ ✗ Gather Info Now     │
    └──────────────────┴───────────────────────┘
          │                         │
          │              Say: "Blueprint requires complete docs"
          │              Ask for: Tables, Columns, Views, Actions
          │              Do NOT offer "partial" option
          │                         │
          └─────────────┬───────────┘
                        ↓
┌─────────────────────────────────┐
│ Check 3: 2-Version Discipline   │
├─────────────────────────────────┤
│ Count versions in active file   │
│ Check file size                 │
└─────────┬───────────────────────┘
          │
    ┌─────┴──────┐
    │ ≤ 2 vers?  │
    └─────┬──────┘
          │
    ┌─────┴────────────┬───────────────┐
    │ YES              │ NO             │
    │ ✓ Pass           │ ✗ Archive Now  │
    └──────────────────┴────────────────┘
          │                    │
          │         Archive old versions
          │         Update backups/README.md
          │                    │
          └────────┬───────────┘
                   ↓
┌─────────────────────────────────┐
│ Check 4: Supporting Files       │
├─────────────────────────────────┤
│ Verify all required files exist │
└─────────┬───────────────────────┘
          │
    ┌─────┴──────┐
    │ All exist? │
    └─────┬──────┘
          │
    ┌─────┴────────────┬───────────────┐
    │ YES              │ NO             │
    │ ✓ Pass           │ ✗ Create Now   │
    └──────────────────┴────────────────┘
          │                    │
          │         Create missing files
          │                    │
          └────────┬───────────┘
                   ↓
          ✅ VALIDATION COMPLETE
          Output summary to user
          Project is blueprint-compliant
```

---

#### Rationale: Why Proactive Validation Matters

**Problem This Solves:**
- User migrates project expecting blueprint compliance
- AI performs migration but doesn't validate completeness
- User discovers later that CLAUDE.md is outdated, docs are incomplete
- User has to explicitly request what blueprint already requires

**Example from Real Experience:**
```
Migration happened → Files moved to docs/
BUT:
- CLAUDE.md still had inline archive structure (not blueprint format)
- appsheet_formulas.md had partial docs (missing column details, views)
- User had to ASK for: "Update CLAUDE.md" and "Complete table schemas"

With validation:
- AI automatically detects CLAUDE.md doesn't match template
- AI immediately updates (no user request needed)
- AI detects incomplete table schemas
- AI immediately starts gathering (no "partial option")
```

**Benefit:**
- User gets blueprint compliance WITHOUT having to ask
- Catches gaps early before they become issues
- Blueprint standard is enforced, not optional
- Better user experience - "it just works"

---

### Ongoing Maintenance Instructions

**When User Works on Project:**

**Scenario: User adds new table**
1. Ask: "Should I add this table to appsheet_formulas.md?"
2. If yes: Add table documentation using template from Section 4.1
3. Update Project Configuration in APPSHEET_SYSTEM_BLUEPRINT.md (table list)
4. Update PRD.md if it exists

**Scenario: User asks to promote Experimental to Stable**
1. Confirm: "Ready to promote Experimental V[X] to Stable?"
2. If yes: Follow "Promotion Process" from Section 5
3. Update CHANGELOG.md
4. Update backups/README.md
5. Notify user of completion

**Scenario: User asks "What's the current production system?"**
1. Read STABLE SYSTEM section in `docs/formulas/appsheet_formulas.md`
2. That section is the single source of truth
3. Provide relevant information from that section

**Scenario: User asks "How do I rollback to previous version?"**
1. Check `backups/README.md` for archived versions index
2. Point user to specific archived file
3. Show Quick Rollback section in that file

**Scenario: User asks about version history**
1. Read `CHANGELOG.md` for quick summary
2. Provide version comparison table
3. Link to archived versions if user wants details

---

## 📚 Real-World Examples

These examples are from the SM Total Overdose project (the original project this blueprint was extracted from).

### Example 1: Handler Auto-Assignment Formula

**Use Case:** Automatically assign logged-in user to new records based on their email

**AppSheet Formula:**
```appsheet
Column: Handler
Type: Ref (references Handlers table)
Initial Value: ANY(SELECT(Client Data[Handler], [Handler Email] = USEREMAIL()))

Security Settings:
  SHOW: IN(USEREMAIL(), Managers[Email Address])
  EDITABLE: IN(USEREMAIL(), Managers[Email Address])
  REQUIRE: NO
```

**Explanation:**
- `USEREMAIL()` returns logged-in user's email (e.g., "sreekutty@loonyheads.com")
- `SELECT(Client Data[Handler], [Handler Email] = USEREMAIL())` finds all handlers in Client Data where email matches
- `ANY()` selects first match (assumes user is assigned to at least one client)
- Security: Only managers can see/edit this field (handlers see auto-assigned value)

**Why this works:**
- Handler doesn't need to select themselves manually
- Row-level security enforced (handlers only see their clients)
- Managers can override if needed

---

### Example 2: Platform-Based Client Filtering

**Use Case:** Show only clients matching the selected platform (e.g., if user selects "Instagram", only show clients with Instagram in their Platforms list)

**AppSheet Formula:**
```appsheet
Column: Client
Type: Ref (references Client Data table)

VALID_IF:
IF(
  IN(USEREMAIL(), Managers[Email Address]),
  SELECT(Client Data[Client], [Status] = "Active"),
  SELECT(
    Client Data[Client],
    AND(
      [Handler Email] = USEREMAIL(),
      [Status] = "Active",
      CONTAINS([Platforms], [_THISROW].[Platform])
    )
  )
)
```

**Explanation:**
- **Managers:** See all active clients (no filtering)
- **Handlers:** See only clients where:
  1. Handler email matches their email (row-level security)
  2. Client status is "Active"
  3. Client's Platforms (EnumList) contains the selected Platform (Enum)
- `CONTAINS([Platforms], [_THISROW].[Platform])` checks if EnumList contains the Enum value
- `[_THISROW].[Platform]` refers to the Platform column in the current row being edited

**Why this works:**
- Platform must be selected BEFORE Client dropdown populates
- Prevents handlers from creating posts for clients not assigned to that platform
- Managers have full flexibility

---

### Example 3: Virtual Column for Aggregation

**Use Case:** Calculate total engagement across multiple platform posts (for multi-platform system)

**AppSheet Formula:**
```appsheet
Column: Total Engagement (Virtual)
Type: Number
App Formula:
  SUM(
    SELECT(Post Platforms[Engagement], [PostID] = [_THISROW].[PostID])
  )

Where Post Platforms[Engagement] is calculated as:
  [Likes] + [Comments]
```

**Explanation:**
- **Virtual column:** Doesn't exist in Google Sheets, calculated on-the-fly
- `SELECT(Post Platforms[Engagement], [PostID] = [_THISROW].[PostID])` finds all child records
- `SUM()` adds them up
- Updates automatically when child records change
- Used in parent-child table structure (Posts → Post Platforms)

**Why this works:**
- One post can have multiple platform records
- Each platform has its own engagement metrics
- Total Engagement aggregates across all platforms
- No manual calculation needed

---

### Example 4: Month Year Formatting (Virtual Column)

**Use Case:** Create formatted month/year string for grouping in Looker Studio (e.g., "2025 10 October")

**AppSheet Formula:**
```appsheet
Column: Month Year (Virtual)
Type: Text
App Formula: YEAR([Date]) & " " & MONTH([Date]) & " " & TEXT([Date], "MMMM")

Example Output:
  Date: 2025-10-24
  Month Year: "2025 10 October"
```

**Explanation:**
- `YEAR([Date])` extracts year as number (2025)
- `MONTH([Date])` extracts month as number (10)
- `TEXT([Date], "MMMM")` formats month as full name ("October")
- `&` concatenates strings with spaces

**Why this format:**
- Sorts chronologically (year first, then month number)
- Human-readable (includes month name)
- Works in Looker Studio for grouping/filtering

---

### Example 5: Conditional Security (SHOW IF)

**Use Case:** Hide certain fields from handlers, show only to managers

**AppSheet Formula:**
```appsheet
Column: Handler
Security Settings:
  SHOW: TRUE
  SHOW IF: IN(USEREMAIL(), Managers[Email Address])
```

**Explanation:**
- `SHOW: TRUE` means field is visible by default
- `SHOW IF:` adds conditional logic
- `IN(USEREMAIL(), Managers[Email Address])` checks if current user is a manager
- Result:
  - **Managers:** See the field (can view/edit)
  - **Handlers:** Field is hidden entirely

**Alternative Pattern (EDITABLE but visible):**
```appsheet
Column: Handler
Security Settings:
  SHOW: TRUE
  EDITABLE: FALSE
  EDITABLE IF: IN(USEREMAIL(), Managers[Email Address])
```
- **Managers:** See and can edit
- **Handlers:** See but cannot edit (read-only)

---

### Example 6: Google Sheets ARRAYFORMULA

**Use Case:** Auto-fill Month Year column for entire sheet based on Date column

**Google Sheets Formula:**
```sheets
Cell A2:
=ARRAYFORMULA(IF(B2:B="","",YEAR(B2:B) & " " & MONTH(B2:B) & " " & TEXT(B2:B,"MMMM")))
```

**Explanation:**
- `ARRAYFORMULA()` applies formula to entire range (not just one cell)
- `B2:B` refers to Date column (entire column from row 2 onwards)
- `IF(B2:B="","",...)` checks if Date is blank, returns blank if true
- Otherwise: Concatenates year, month number, and month name
- Updates automatically when Date changes

**Why use ARRAYFORMULA:**
- No need to copy formula down
- New rows automatically get formula applied
- Consistent formatting across all rows

---

### Example 7: Thumbnail Generation (Image Proxy)

**Use Case:** Generate thumbnail from Instagram post image URL for faster loading

**AppSheet Formula:**
```appsheet
Column: Thumbnail (Virtual)
Type: Image
App Formula: "https://images.weserv.nl/?url=" & SUBSTITUTE([Post Image], "https://", "")

Example:
  Post Image: "https://instagram.com/image.jpg"
  Thumbnail: "https://images.weserv.nl/?url=instagram.com/image.jpg"
```

**Explanation:**
- Uses weserv.nl image proxy service
- `SUBSTITUTE([Post Image], "https://", "")` removes "https://" prefix
- Concatenates with proxy URL
- Result: Proxy service loads and caches image

**Why this works:**
- Faster loading (proxy optimizes images)
- Reduces bandwidth
- Works with Instagram URLs (which may have CORS restrictions)

---

### Example 8: Status-Based Action Visibility

**Use Case:** Show "Mark as Posted" action only for scheduled posts

**AppSheet Formula:**
```appsheet
Action: Mark as Posted
SHOW IF: [Status] = "Scheduled"

Action behavior:
  Data: set the values of some columns in this row
  Status: "Posted"
  Date: TODAY()
```

**Explanation:**
- `SHOW IF: [Status] = "Scheduled"` makes action visible only when Status is "Scheduled"
- When clicked:
  - Updates Status to "Posted"
  - Updates Date to today's date
- Action disappears after execution (since Status changes)

**Why this pattern:**
- Prevents accidental status changes
- Enforces workflow (can't mark as posted if already posted)
- Keeps UI clean (only relevant actions shown)

---

### Example 9: Looker Studio Calculated Field (Engagement Rate)

**Use Case:** Calculate engagement as percentage of reach

**Looker Studio Formula:**
```looker
(SUM(Likes) + SUM(Comments)) / NULLIF(SUM(Reach), 0) * 100
```

**Explanation:**
- `SUM(Likes) + SUM(Comments)` = total engagement
- `NULLIF(SUM(Reach), 0)` = reach, but returns NULL if 0 (prevents division by zero)
- Result = engagement rate as percentage
- If Reach is 0, formula returns NULL (shown as "-" in reports)

**Why NULLIF:**
- Avoids division by zero error
- Cleaner than IF statement
- Standard Looker Studio pattern

---

### Example 10: Multi-Platform Post Action

**Use Case:** Action button to add platform link after post is published

**AppSheet Formula:**
```appsheet
Action: Add Instagram Link
SHOW IF: CONTAINS([Platforms], "Instagram") AND ISBLANK([Instagram URL])

Action behavior:
  Data: add a new row to another table using values from this row
  Table: Post Platforms
  Referenced Action: Add

Column values to set:
  PostID: [_THISROW].[PostID]
  Platform: "Instagram"
  Handler: [_THISROW].[Handler]
  Status: "Posted"
  Post URL: [Prompt user to enter]
```

**Explanation:**
- Shows only if:
  1. Instagram is in Platforms EnumList
  2. Instagram URL not yet added
- Creates child record in Post Platforms table
- Pre-fills PostID, Platform, Handler, Status
- Prompts user to enter Post URL
- Action disappears after URL is added

**Why this works:**
- Guides handler through workflow
- Prevents duplicate platform entries
- Maintains data integrity (proper PostID linkage)

---

## 📋 Metadata

**Blueprint Version:** 1.0
**Created:** October 28, 2025
**Last Updated:** October 28, 2025
**Compatible With:**
- AppSheet (all versions)
- Google Sheets (all versions)
- Google Apps Script (V8 runtime)
- Looker Studio (all versions)

**Maintained By:** Loonyheads AppSheet Team

**Changelog:**
- **v1.0** (2025-10-28): Initial blueprint creation based on SM Total Overdose project

---

## 🔗 Related Resources

### Official Documentation
- [AppSheet Documentation](https://help.appsheet.com/)
- [AppSheet Expression Reference](https://help.appsheet.com/en/articles/961700-expressions)
- [Google Sheets Function List](https://support.google.com/docs/table/25273)
- [Apps Script Reference](https://developers.google.com/apps-script/reference)
- [Looker Studio Help](https://support.google.com/looker-studio)
- [Looker Studio Formula Reference](https://support.google.com/looker-studio/table/6379764)

### Community Resources
- [AppSheet Community Forum](https://community.appsheet.com/)
- [AppSheet YouTube Channel](https://www.youtube.com/c/AppSheet)

### Tools
- [AppSheet Editor](https://www.appsheet.com/start/myApps)
- [Apps Script Editor](https://script.google.com/)
- [Looker Studio](https://lookerstudio.google.com/)

---

## 💡 Tips for AI Assistants

1. **Always read Project Configuration first** - Understand project context before making changes
2. **Maintain 2-version discipline** - Keep active file small (Experimental + Stable only)
3. **Follow format templates exactly** - Consistency is critical across projects
4. **Archive with Quick Rollback** - Always add rollback instructions to archived versions
5. **Update CHANGELOG.md** - Keep version history up-to-date
6. **Ask before initializing** - User confirmation required for fresh/migration
7. **Preserve user content** - When migrating, back up originals first
8. **Test formulas in examples** - Use real-world examples to verify understanding
9. **Link related docs** - Cross-reference between formula files, CHANGELOG, backups
10. **Size matters** - Keep active files under 2000 lines for performance

---

*This file is designed to be read by AI assistants (Claude, Gemini, ChatGPT, etc.) to automatically set up and maintain AppSheet project documentation. It can be copied to any AppSheet project and customized via the Project Configuration section.*

**END OF BLUEPRINT**

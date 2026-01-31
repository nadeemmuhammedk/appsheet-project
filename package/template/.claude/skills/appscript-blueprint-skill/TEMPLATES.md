# Apps Script Blueprint Templates

## Table of Contents Requirement

**All Apps Script documentation files should include a table of contents after the version header.**

**Standard TOC Structure:**

### 📋 TABLE OF CONTENTS

1. [Script Overview](#script-overview)
2. [Functions](#functions)
3. [Installation Guide](#installation-guide)
4. [Testing & Monitoring](#testing--monitoring)
5. [Troubleshooting](#troubleshooting)

---

## Function Documentation Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.3:

### Function: [Function Name]

**Purpose:** [Brief description of what this function does]

**Trigger Type:** Manual / Time-driven / Event-driven / On Edit / On Open / Custom

**File Location:** Extensions → Apps Script → [File Name.gs]

**Authorization Required:** [Scopes needed on first run]

**Created:** [Date]
**Last Modified:** [Date]

**Parameters:**
- `paramName` (Type): [Description of parameter]

**Returns:**
- Type: [Description of return value]

**Code:**

```javascript
/**
 * [Detailed function description]
 *
 * @param {type} paramName - Description of parameter
 * @return {type} Description of return value
 *
 * @example
 * functionName("example");
 * // Returns: result
 */
function functionName(paramName) {
  // Get active spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('SheetName');

  // Implementation
  try {
    // Main logic here
    Logger.log('Success: ' + paramName);
    return result;
  } catch (error) {
    Logger.log('Error: ' + error.message);
    return null;
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

## Script Overview Template

**Use for:** Introducing the overall automation purpose

## Script Overview

**Project Name:** [Name]
**Purpose:** [What this automation accomplishes]

**Problem Being Solved:**
- [Problem 1]
- [Problem 2]

**Solution:**
- [Approach 1]
- [Approach 2]

**Current Configuration:**
- Sheets affected: [List of sheets]
- Trigger schedule: [Frequency and time]
- Status: [Active/Inactive]

---

## Time-Driven Trigger Template

**Use for:** Functions that run on a schedule

### Function: [Function Name]

**Trigger Type:** Time-driven
**Schedule:** [Daily at 2 AM / Every hour / etc.]

**Setting Up Triggers:**
1. In Apps Script editor: Triggers (clock icon) → Add Trigger
2. Choose function: [functionName]
3. Event source: Time-driven
4. Type of time based trigger: [Day timer / Hour timer / Week timer]
5. Time of day: [HH:MM format]
6. Save

**Trigger Configuration Code (Alternative):**

```javascript
/**
 * Create time-driven trigger for scheduled execution
 */
function setupTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === "functionName") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new trigger
  ScriptApp.newTrigger("functionName")
    .timeBased()
    .everyDays(1)
    .atHour(2)
    .create();

  Logger.log("Trigger created for functionName at 2 AM daily");
}
```

**Testing:**
- [ ] Manually run setupTrigger() to create trigger
- [ ] Verify trigger appears in Triggers list
- [ ] Wait for scheduled run or test with immediate trigger
- [ ] Check Logs after execution

---

## Event-Driven Trigger Template

**Use for:** Functions that respond to spreadsheet events

### Function: [Function Name]

**Trigger Type:** Event-driven
**Event Source:** From spreadsheet
**Event Type:** [On edit / On form submit / On open]

**Setting Up Triggers:**
1. In Apps Script editor: Triggers → Add Trigger
2. Choose function: [functionName]
3. Event source: From spreadsheet
4. Event type: [On edit / On form submit / On open]
5. Save

**Trigger Code for On Edit:**

```javascript
/**
 * Runs when spreadsheet is edited
 * @param {Object} e - Edit event object
 */
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  const value = range.getValue();

  // Only process specific sheet
  if (sheet.getName() !== "TargetSheet") return;

  // Process the edit
  // Your logic here
}
```

**Trigger Code for On Open:**

```javascript
/**
 * Runs when spreadsheet is opened
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Run Function', 'functionName')
    .addItem('Another Function', 'anotherFunction')
    .addToUi();
}
```

**Testing:**
- [ ] Make edit in sheet (for On Edit)
- [ ] Reopen sheet (for On Open)
- [ ] Verify function executes
- [ ] Check Logs for errors

---

## Utility Function Template

**Use for:** Helper functions called by other functions

### Function: [Utility Function Name]

**Purpose:** [Brief description of utility function]

**Called By:** [List of functions that use this]

**Parameters:**
- `paramName` (Type): [Description]

**Returns:** Type: [Description]

**Code:**

```javascript
/**
 * Utility function description
 * @param {type} paramName - Description
 * @return {type} Description
 */
function utilityFunction(paramName) {
  // Implementation

  return result;
}
```

---

## Migration Script Template

**Use for:** One-time data transformation scripts

### Script: Migrate [Old Format] to [New Format]

**Purpose:** One-time migration script to transform data structure

**Status:** ⚠ Not yet created / ✅ Completed

**Trigger Type:** Manual (run once during migration)

**Planned Implementation:**

```javascript
function migrateData() {
  // 1. Read all data from source
  // 2. Transform structure
  // 3. Write to new location
  // 4. Verify data integrity
  // 5. Create backup before running
}
```

**Testing Plan:**
- [ ] Test on copy of spreadsheet first
- [ ] Create backup tab before running
- [ ] Verify row counts match
- [ ] Check no data loss
- [ ] Verify dependent formulas still work

**Rollback:**
- [ ] Restore from backup tab
- [ ] Or revert to spreadsheet version history

---

## Common Apps Script Patterns

### Pattern 1: Batch Data Processing

```javascript
// Get all data at once (faster than row-by-row)
const data = sheet.getDataRange().getValues();

// Process all data
for (let i = 0; i < data.length; i++) {
  // Process row
}

// Write all results at once
sheet.getRange(2, 1, results.length, results[0].length).setValues(results);
```

### Pattern 2: Delete Rows from Bottom

```javascript
// Always delete from bottom to top to avoid index shifting
const rowsToDelete = [5, 3, 7]; // Example row numbers
rowsToDelete.sort((a, b) => b - a); // Sort descending
rowsToDelete.forEach(row => sheet.deleteRow(row));
```

### Pattern 3: Error Handling with Try-Catch

```javascript
try {
  // Main logic
  const result = processSomething();
  return {success: true, data: result};
} catch (error) {
  Logger.log('Error: ' + error.toString());
  return {success: false, error: error.message};
}
```

### Pattern 4: Check Sheet Exists

```javascript
function getSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log('Sheet not found: ' + sheetName);
    return null;
  }

  return sheet;
}
```

### Pattern 5: Send Email Notification

```javascript
function sendNotification(subject, body) {
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: subject,
    body: body
  });
}
```

---

## How to Use This Skill

### When to Invoke

**User-initiated invocation:**
- "Show me the Apps Script template"
- "How do I document a function?"
- "What fields are required for script documentation?"

**Automatic invocation (context-aware):**
- User is documenting any Apps Script function
- User is writing to `docs/formulas/appscript_code.md`
- User mentions: "Apps Script", "function", "trigger"

### Response Pattern

1. **Identify the script type** (Function, Trigger, Utility, Migration)
2. **Read APPSHEET_SYSTEM_BLUEPRINT.md** Section 4.3 for templates
3. **Extract the appropriate template** from this file
4. **Generate complete documentation** with all fields
5. **Verify completeness** against blueprint requirements

---

## Scope and Limitations

### In Scope
✅ Apps Script function documentation templates
✅ Trigger setup and configuration
✅ Installation and authorization steps
✅ Testing checklists
✅ Troubleshooting common errors
✅ Rollback procedures

### Out of Scope
❌ Apps Script API reference (use Google's official documentation)
❌ JavaScript language help (use MDN or JavaScript resources)
❌ Debugging complex code logic (use Apps Script editor debugger)
❌ Google Workspace API specifics (use Google's API documentation)

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** APPSHEET_SYSTEM_BLUEPRINT.md Section 4.3

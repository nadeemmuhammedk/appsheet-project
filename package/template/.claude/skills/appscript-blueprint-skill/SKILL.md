---
name: appscript-blueprint-skill
description: Generate complete Google Apps Script documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for functions, triggers, installation steps, testing checklists, and troubleshooting. Use when documenting Apps Script code, writing to docs/formulas/appscript_code.md, or when user mentions Apps Script, functions, triggers, or automation.
allowed-tools:
  - Read
---

# Apps Script Blueprint Skill

Generate complete documentation templates for Google Apps Script automation code.

## When to Use This Skill

**Automatic triggers** (no user request needed):
- User is documenting Google Apps Script functions
- User is writing to `docs/formulas/appscript_code.md`
- User mentions: "Apps Script", "AppScript", "function", "trigger", "automation", "script"
- User describes server-side Google Sheets automation
- User is creating or modifying Apps Script code

**Manual invocation:**
- `/appscript-blueprint-skill`

**Example triggers:**
- "Document this Apps Script function" → Auto-use function template
- "Add the trigger setup documentation" → Auto-use trigger template
- User writes to `appscript_code.md` → Auto-apply blueprint format

## Template Overview

This skill provides complete documentation templates from `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.3:

**Available Templates:**
- **Function Documentation** - Purpose, trigger type, code, parameters, return values
- **Installation Steps** - Setup instructions, authorization, trigger configuration
- **Testing Checklist** - Verification steps, edge cases
- **Troubleshooting** - Common errors and solutions
- **Rollback Procedures** - Recovery steps if issues occur

For complete templates with all fields, see [TEMPLATES.md](TEMPLATES.md).

## How to Use

### Step 1: Identify Function Type

Determine what needs documentation:
- **Main Function?** → Use function documentation template
- **Trigger Setup?** → Use trigger configuration template
- **Testing/Verification?** → Use testing checklist template
- **Troubleshooting?** → Include common issues and solutions

### Step 2: Read Blueprint Template

Access the appropriate template from:
- [TEMPLATES.md](TEMPLATES.md) - All complete templates
- APPSHEET_SYSTEM_BLUEPRINT.md Section 4.3 - Source templates

### Step 3: Generate Complete Documentation

Include ALL required fields:
- **Purpose:** What the function does
- **Trigger Type:** Manual, Time-driven, Event-driven, On Edit, On Open
- **Code:** Complete JavaScript with JSDoc comments
- **Parameters:** Parameter types and descriptions
- **Return Values:** What the function returns
- **Installation Steps:** Setup instructions
- **Testing Checklist:** Verification steps
- **Troubleshooting:** Common errors and solutions

### Step 4: Verify Completeness

Check against requirements:
- Complete code with JSDoc comments
- Installation and trigger setup steps
- Testing checklist with verification steps
- Troubleshooting section with common issues
- Rollback procedures

## Quick Template Preview

### Function Documentation (Minimal Example)
### Function: processData

**Purpose:** Clean and validate data from a source sheet

**Trigger Type:** Manual (run from Apps Script editor)

**Parameters:**
- `sourceSheet` (String): Name of sheet to process
- `targetSheet` (String): Name of sheet for results

**Returns:** Object with `{success: Boolean, processedCount: Number}`

**Code:**
```javascript
/**
 * Process data from source sheet and write to target sheet
 * @param {string} sourceSheet - Source sheet name
 * @param {string} targetSheet - Target sheet name
 * @return {Object} Result object with success status and count
 */
function processData(sourceSheet, targetSheet) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const source = ss.getSheetByName(sourceSheet);
  const target = ss.getSheetByName(targetSheet);

  // Implementation here

  return {success: true, processedCount: 100};
}

**Installation:**
1. Open Apps Script editor (Extensions → Apps Script)
2. Create new file: `DataProcessor.gs`
3. Paste code above
4. Save and run once to authorize

**Testing:**
- [ ] Run with test data
- [ ] Verify output in target sheet
- [ ] Check error handling
```

See [TEMPLATES.md](TEMPLATES.md) for complete templates with all fields.

## Common Apps Script Patterns

### Pattern 1: Get Sheet Data
```javascript
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getSheetByName("SheetName");
const data = sheet.getDataRange().getValues();
```

### Pattern 2: Write Data to Sheet
```javascript
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getSheetByName("SheetName");
sheet.getRange(row, col, numRows, numCols).setValues(data);
```

### Pattern 3: Batch Delete Rows
```javascript
// Delete from bottom to top to avoid index shifting
for (let i = rowsToDelete.length - 1; i >= 0; i--) {
  sheet.deleteRow(rowsToDelete[i]);
}
```

### Pattern 4: Time-Driven Trigger
```javascript
ScriptApp.newTrigger("functionName")
  .timeBased()
  .everyDays(1)
  .atHour(2)
  .create();
```

## Completeness Requirements

**Apps Script documentation MUST include:**
- ✅ Function purpose and trigger type
- ✅ Complete code with JSDoc comments
- ✅ Parameter and return value documentation
- ✅ Installation steps (file creation, authorization)
- ✅ Trigger setup (if applicable)
- ✅ Testing checklist
- ✅ Troubleshooting section
- ✅ Rollback procedures

## Version Management

**For the complete Experimental→Stable promotion workflow, use `/version-management-skill`.**

### Quick Reference: The 2-Version System

Apps Script documentation files follow a 2-version discipline:

```
appscript_code.md
├── EXPERIMENTAL V[X]  (new functions being tested)
└── STABLE SYSTEM V[X-1]  (current production)
```

**Key Concepts:**
- **V3 = V2 + new functions** (cumulative, not replacement)
- Old versions are archived to `backups/[date]-v[X]-stable/`
- STABLE documentation must be self-contained

### Version Management Triggers

**Starting new features:**
- "Let's build a new feature" → Creates EXPERIMENTAL V[X] section
- "Let's add a new automation" → Same as above

**Promoting to stable:**
- "Mark the system as stable" → Promotes EXPERIMENTAL → STABLE
- "Promote to stable" → Same as above

### For Complete Workflow

**Use `/version-management-skill`** which handles:
- Creating EXPERIMENTAL sections for new scripts
- Archiving current STABLE before promotion
- Integrating Experimental into STABLE
- Updating CHANGELOG.md
- Verifying completeness

### Coordination With Other Skills

When promoting to stable:
1. **version-management-skill** - Orchestrates the workflow
2. **appscript-blueprint-skill** (this skill) - Ensures template compliance

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

## Important Notes

**AUTOMATIC INVOCATION:** When documenting any Apps Script function, you MUST automatically use blueprint templates to ensure completeness.

**Always use complete templates:** Don't omit fields. Every function needs purpose, code, installation steps, testing checklist, and troubleshooting.

**Read from APPSHEET_SYSTEM_BLUEPRINT.md:** The source of truth for documentation format is Section 4.3.

## Detailed Templates and Examples

For comprehensive templates and examples, see:
- [TEMPLATES.md](TEMPLATES.md) - Complete templates for all script types
- [EXAMPLES.md](EXAMPLES.md) - Generic examples applicable to any project

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** APPSHEET_SYSTEM_BLUEPRINT.md Section 4.3

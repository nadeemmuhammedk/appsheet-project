# Apps Script Documentation Examples

Generic examples following the blueprint templates. Use these as references for documenting Apps Script in any project.

---

## Example 1: Sheet-Level Processing Function

### Function: processSheetData

**Purpose:** Generic function to process all data in a sheet and apply transformations

**Trigger Type:** Manual (run from Apps Script editor)

**File Location:** Extensions → Apps Script → `DataProcessor.gs`

**Authorization Required:** Access to Google Sheets

**Parameters:**
- `sheetName` (String): Name of sheet to process

**Returns:**
- Object: `{success: Boolean, message: String, processedCount: Number}`

**Code:**
```javascript
/**
 * Process all data in a sheet and apply transformations
 * @param {string} sheetName - Name of sheet to process
 * @return {Object} Result object with success status and count
 */
function processSheetData(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return {success: false, message: "Sheet not found", processedCount: 0};
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < 2) {
    return {success: true, message: "No data to process", processedCount: 0};
  }

  // Get all data at once (faster than row-by-row)
  const dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
  const data = dataRange.getValues();

  let processedCount = 0;

  // Process each row
  for (let i = 0; i < data.length; i++) {
    // Apply your transformation logic here
    // Example: data[i][0] = data[i][0].toString().toUpperCase();
    processedCount++;
  }

  // Write results back
  dataRange.setValues(data);

  Logger.log(`Processed ${processedCount} rows in ${sheetName}`);

  return {
    success: true,
    message: "Processing complete",
    processedCount: processedCount
  };
}
```

**Installation Steps:**
1. Open Google Sheet → Extensions → Apps Script
2. Create new file: `DataProcessor.gs`
3. Paste code above
4. Save project (Ctrl+S)
5. Run function once to authorize

**Testing Checklist:**
- [ ] Run with test data, check Execution Log
- [ ] Verify transformations applied correctly
- [ ] Test with empty sheet
- [ ] Test with sheet that doesn't exist
- [ ] Confirm no #REF! errors

**Troubleshooting:**
- **"Sheet not found"** → Check sheet name matches exactly (case-sensitive)
- **"Authorization required"** → Re-run and accept permissions
- **No changes visible** → Check if data range is correct

---

## Example 2: Row Cleanup Function

### Function: deleteEmptyRows

**Purpose:** Delete all empty rows from a specified sheet

**Trigger Type:** Manual or Time-driven (via `setupDailyTrigger`)

**File Location:** Extensions → Apps Script → `RowCleanup.gs`

**Authorization Required:** Access to Google Sheets (edit permissions)

**Parameters:**
- `sheetName` (String): Name of sheet to clean

**Returns:**
- Object: `{success: Boolean, message: String, deletedCount: Number}`

**Code:**
```javascript
/**
 * Delete all empty rows from a sheet
 * @param {string} sheetName - Name of sheet to clean
 * @return {Object} Result with deleted count
 */
function deleteEmptyRows(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log("Sheet not found: " + sheetName);
    return {success: false, message: "Sheet not found", deletedCount: 0};
  }

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow < 2) {
    return {success: true, message: "No data rows", deletedCount: 0};
  }

  // Get all data at once (much faster)
  const dataRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
  const data = dataRange.getValues();

  const rowsToDelete = [];

  // Identify empty rows
  for (let i = 0; i < data.length; i++) {
    let isEmpty = true;
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] !== "" && data[i][j] !== null) {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty) {
      rowsToDelete.push(i + 2); // +2 because we started from row 2
    }
  }

  if (rowsToDelete.length === 0) {
    Logger.log("No empty rows found in " + sheetName);
    return {success: true, message: "Sheet is clean", deletedCount: 0};
  }

  // Delete from bottom to top (prevents index shifting)
  for (let i = rowsToDelete.length - 1; i >= 0; i--) {
    sheet.deleteRow(rowsToDelete[i]);
  }

  Logger.log(`Deleted ${rowsToDelete.length} empty rows from ${sheetName}`);

  return {
    success: true,
    message: "Cleanup complete",
    deletedCount: rowsToDelete.length
  };
}
```

**Installation Steps:**
1. Open Apps Script editor
2. Create new file: `RowCleanup.gs`
3. Paste code above
4. Save and run once to authorize

**Testing Checklist:**
- [ ] Run on test sheet with known empty rows
- [ ] Verify only empty rows deleted
- [ ] Test with sheet that has no empty rows
- [ ] Test with completely empty sheet
- [ ] Check Execution Log for results

**Troubleshooting:**
- **"Cannot read property..."** → Sheet name is incorrect
- **Wrong rows deleted** → Check empty row detection logic
- **Script timeout** → Too many rows, process in batches

---

## Example 3: Time-Driven Trigger Setup

### Function: setupDailyCleanupTrigger

**Purpose:** Create a daily trigger that runs cleanup function at 2 AM

**Trigger Type:** Manual (run once to set up trigger)

**File Location:** Extensions → Apps Script → `RowCleanup.gs`

**Authorization Required:** Triggers permission

**Parameters:** None

**Returns:** None (logs confirmation)

**Code:**
```javascript
/**
 * Create a daily trigger for row cleanup at 2 AM
 * Run this function once to set up the automated trigger
 */
function setupDailyCleanupTrigger() {
  // Delete existing triggers for this function
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === "runDailyCleanup") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new daily trigger at 2 AM
  ScriptApp.newTrigger("runDailyCleanup")
    .timeBased()
    .everyDays(1)
    .atHour(2)
    .create();

  Logger.log("Daily cleanup trigger created for 2 AM");
}

/**
 * Function called by trigger - runs cleanup on multiple sheets
 */
function runDailyCleanup() {
  Logger.log("Starting daily cleanup: " + new Date());

  const sheetsToClean = ["Sheet1", "Sheet2", "Sheet3"];
  let totalDeleted = 0;

  sheetsToClean.forEach(sheetName => {
    const result = deleteEmptyRows(sheetName);
    totalDeleted += result.deletedCount;
  });

  Logger.log("Daily cleanup complete. Total rows deleted: " + totalDeleted);
}
```

**Setting Up Triggers:**
1. Run `setupDailyCleanupTrigger()` once manually
2. Verify trigger appears in Triggers list (clock icon)
3. Check next run time shown

**Testing Checklist:**
- [ ] Run setup function, verify trigger created
- [ ] Manually run `runDailyCleanup()` to test
- [ ] Check Execution Log after trigger fires
- [ ] Verify cleanup works on all configured sheets
- [ ] Confirm trigger runs at correct time

**Troubleshooting:**
- **Trigger not firing** → Check trigger is active in Triggers list
- **Wrong time** → Check time zone in script project settings
- **"Authorization required"** → Re-run setup function

---

## Example 4: Data Sync Function

### Function: syncDataToTarget

**Purpose:** Copy data from source sheet to target sheet, appending new rows only

**Trigger Type:** Manual or Time-driven

**File Location:** Extensions → Apps Script → `DataSync.gs`

**Authorization Required:** Access to Google Sheets

**Parameters:**
- `sourceSheet` (String): Source sheet name
- `targetSheet` (String): Target sheet name
- `keyColumn` (Number): Column number to check for duplicates (1 = A, 2 = B, etc.)

**Returns:**
- Object: `{success: Boolean, addedCount: Number}`

**Code:**
```javascript
/**
 * Sync new rows from source to target sheet
 * @param {string} sourceSheet - Source sheet name
 * @param {string} targetSheet - Target sheet name
 * @param {number} keyColumn - Column to check for duplicates
 * @return {Object} Result with count of added rows
 */
function syncDataToTarget(sourceSheet, targetSheet, keyColumn) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const source = ss.getSheetByName(sourceSheet);
  const target = ss.getSheetByName(targetSheet);

  if (!source || !target) {
    return {success: false, addedCount: 0};
  }

  // Get source data
  const sourceData = source.getDataRange().getValues();
  const sourceKeys = sourceData.map(row => row[keyColumn - 1]).slice(1); // Skip header

  // Get existing target data
  const targetData = target.getDataRange().getValues();
  const targetKeys = targetData.map(row => row[keyColumn - 1]).slice(1);

  // Find new rows (keys in source but not in target)
  const newKeys = sourceKeys.filter(key => !targetKeys.includes(key));

  if (newKeys.length === 0) {
    Logger.log("No new rows to sync");
    return {success: true, addedCount: 0};
  }

  // Get new rows from source
  const newRows = sourceData.filter(row => newKeys.includes(row[keyColumn - 1]));

  // Append to target
  if (target.getLastRow() === 1 && target.getLastColumn() === 1) {
    // Target is empty (only header or completely empty)
    target.getRange(2, 1, newRows.length, newRows[0].length).setValues(newRows);
  } else {
    target.getRange(target.getLastRow() + 1, 1, newRows.length, newRows[0].length).setValues(newRows);
  }

  Logger.log(`Synced ${newRows.length} new rows to ${targetSheet}`);

  return {success: true, addedCount: newRows.length};
}
```

**Installation Steps:**
1. Create `DataSync.gs` in Apps Script editor
2. Paste code above
3. Save and run once to authorize

**Testing Checklist:**
- [ ] Test with empty target sheet
- [ ] Test with existing data (should only add new)
- [ ] Verify key column correctly identifies duplicates
- [ ] Check data integrity after sync
- [ ] Test with different key columns

**Troubleshooting:**
- **Duplicates created** → Check key column parameter is correct
- **No rows added** → Check if data actually differs between sheets
- **"Cannot read property..."** → Sheet name incorrect or sheet doesn't exist

---

## Example 5: On Edit Trigger

### Function: onEdit

**Purpose:** Automatically timestamp rows when specific column is edited

**Trigger Type:** Event-driven (On Edit)

**File Location:** Extensions → Apps Script → `EditHandlers.gs`

**Authorization Required:** None (simple triggers run as user)

**Parameters:**
- `e` (Object): Edit event object with range, value, oldValue properties

**Returns:** None

**Code:**
```javascript
/**
 * Automatically add timestamp when status column is edited
 * @param {Object} e - Edit event object
 */
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  const row = range.getRow();
  const col = range.getColumn();

  // Only process specific sheet
  if (sheet.getName() !== "Data") return;

  // Only process edits in specific column (e.g., column 5 = Status)
  if (col !== 5) return;

  // Add timestamp in adjacent column (column 6)
  const timestampCell = sheet.getRange(row, 6);
  timestampCell.setValue(new Date());

  // Optional: Add log
  Logger.log(`Timestamp added for row ${row}`);
}
```

**Setting Up Triggers:**
1. In Apps Script editor: Triggers → Add Trigger
2. Choose function: `onEdit`
3. Event source: From spreadsheet
4. Event type: On edit
5. Save

**Testing Checklist:**
- [ ] Edit status column, verify timestamp appears
- [ ] Edit other columns, verify no timestamp added
- [ ] Edit in different sheets, verify only "Data" sheet affected
- [ ] Check timestamp format is correct

**Troubleshooting:**
- **No timestamp added** → Check column numbers are correct
- **Timestamp added everywhere** → Check sheet name filter
- **Wrong column timestamped** → Check col === number matches

---

## Example 6: On Open Menu

### Function: onOpen

**Purpose:** Create custom menu when spreadsheet opens

**Trigger Type:** Event-driven (On Open)

**File Location:** Extensions → Apps Script → `Menu.gs`

**Authorization Required:** None (simple triggers)

**Parameters:** None

**Returns:** None

**Code:**
```javascript
/**
 * Create custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('⚙ Custom Tools')
    .addItem('🔄 Process Data', 'processSheetData')
    .addSeparator()
    .addItem('🧹 Clean Empty Rows', 'runCleanup')
    .addItem('📊 Sync Data', 'syncData')
    .addSeparator()
    .addItem('⚙ Settings', 'showSettings')
    .addToUi();
}

/**
 * Example function called by menu
 */
function showSettings() {
  const ui = SpreadsheetApp.getUi();
  const html = HtmlService.createHtmlOutput('<p>Settings panel here</p>')
    .setWidth(300)
    .setHeight(200);
  ui.showModalDialog(html, 'Settings');
}
```

**Testing Checklist:**
- [ ] Reopen spreadsheet, verify menu appears
- [ ] Click each menu item, verify functions run
- [ ] Check menu items work correctly
- [ ] Verify menu appears for all users (if needed)

**Troubleshooting:**
- **Menu not appearing** → Check function name is exactly `onOpen`
- **"Authorization required"** → First click may need authorization
- **Menu items don't work** → Verify function names match

---

## Example 7: Multi-Code-File Project Structure

**Use for:** Projects with more than one Apps Script file. Each code file gets its own self-contained block under a shared project header. Adding or updating a script means editing only its block — nothing else moves.

### Why This Structure

When a project has a single script, flat sections work fine. Once you add a second script, shared section names like "Installation Guide" or "Testing" become ambiguous. Grouping everything under the code file name solves this.

### File-Level Layout

```markdown
# Apps Script Code

**Project:** [Project Name]       ← set once at the top
**Last Updated:** [Date]

---

## PopulateFromTemplate           ← Code File 1 (self-contained block)
  - Script Overview
  - Functions
  - Installation Guide
  - Testing & Monitoring
  - Troubleshooting
  - Rollback

---

## ArchiveExpiredRecords          ← Code File 2 (same structure)
  - Script Overview
  - Functions
  - Installation Guide
  - Testing & Monitoring
  - Troubleshooting
  - Rollback
```

---

### Code File 1 — Full Example: PopulateFromTemplate

---

## PopulateFromTemplate

### Script Overview

**Code File Name:** PopulateFromTemplate
**Purpose:** Polls a source sheet every 10 minutes for records with Status = "Active" and auto-populates a details sheet from a row template. A duplicate guard prevents re-processing.

**Problem Being Solved:**
- When a record becomes "Active" in the source sheet, detail rows need to be created manually in a separate sheet
- Manual creation is slow and error-prone

**Solution:**
- A time-driven trigger checks the source sheet every 10 minutes
- Any "Active" record not already in the details sheet gets populated from a template sheet
- A duplicate guard skips records that already exist

**Spreadsheet Connections:**

| Spreadsheet | Sheet | Role |
|---|---|---|
| Source App | Records | READ — source of record status |
| Target App | row_template | READ — template rows |
| Target App | record_details | WRITE — populated rows |

**Current Configuration:**
- Sheets affected: Records (Source App), row_template, record_details (Target App)
- Trigger schedule: Every 10 minutes (time-driven)
- Status: Experimental

---

### Functions

#### Function: populateDetails

**Purpose:** Main scheduled function. Reads all records with Status = "Active" from the source sheet, checks for duplicates in record_details, reads matching rows from row_template, and writes new rows.

**Trigger Type:** Time-driven (Every 10 minutes)

**File Location:** Extensions → Apps Script → `PopulateFromTemplate.gs`

**Authorization Required:** Access to both Source App and Target App spreadsheets; Gmail (for error notification emails)

**Created:** [Date]
**Last Modified:** [Date]

**Parameters:** None (triggered by schedule)

**Returns:** None (writes directly to record_details; logs results via console)

**Code:**

```javascript
// ─── CONFIGURATION ──────────────────────────────────────────
const SOURCE_SPREADSHEET_ID = "YOUR_SOURCE_SPREADSHEET_ID";

const RECORDS_SHEET   = "Records";
const TEMPLATE_SHEET  = "row_template";
const DETAILS_SHEET   = "record_details";

const REC_NAME_IDX    = 0;   // Column A — Record name
const REC_TYPE_IDX    = 1;   // Column B — Record type
const REC_STATUS_IDX  = 3;   // Column D — Status

const DET_NAME_IDX    = 1;   // Column B — Record name (duplicate check)

const NOTIFY_EMAIL = "YOUR_EMAIL_ADDRESS";

// ─────────────────────────────────────────────────────────────
/**
 * Polls source for Active records and populates record_details from template.
 * Duplicate guard: skips any record already present in record_details.
 *
 * @return {void} Writes directly to record_details sheet
 */
function populateDetails() {
  try {
    const sourceSS      = SpreadsheetApp.openById(SOURCE_SPREADSHEET_ID);
    const recordsSheet  = sourceSS.getSheetByName(RECORDS_SHEET);
    const records       = recordsSheet.getDataRange().getValues();

    const activeRecords = records.slice(1).filter(row => row[REC_STATUS_IDX] === "Active");

    if (activeRecords.length === 0) {
      console.log("No Active records. Nothing to do.");
      return;
    }

    const thisSS        = SpreadsheetApp.getActiveSpreadsheet();
    const detailsSheet  = thisSS.getSheetByName(DETAILS_SHEET);
    const templateSheet = thisSS.getSheetByName(TEMPLATE_SHEET);

    const existingData    = detailsSheet.getDataRange().getValues();
    const existingNames   = new Set(existingData.slice(1).map(row => row[DET_NAME_IDX]));

    const templateData = templateSheet.getDataRange().getValues();

    for (const record of activeRecords) {
      const recordName = record[REC_NAME_IDX];
      const recordType = record[REC_TYPE_IDX];

      if (existingNames.has(recordName)) {
        console.log("Record '" + recordName + "' already exists. Skipping.");
        continue;
      }

      const matching = templateData.slice(1).filter(row => row[1] === recordType);

      if (matching.length === 0) {
        console.log("No template rows for type '" + recordType + "'. Skipping.");
        continue;
      }

      const now = new Date();
      const newRows = matching.map(t => [
        generateDetailId(),  // A — DetailID
        recordName,          // B — Record name
        t[1],                // C — Type
        t[2],                // D — Category
        t[3],                // E — Description
        "",                  // F — Status
        "",                  // G — Completed Date
        now                  // H — Created Date
      ]);

      const lastRow = detailsSheet.getLastRow();
      detailsSheet.getRange(lastRow + 1, 1, newRows.length, 8).setValues(newRows);
      existingNames.add(recordName);

      console.log("Added " + newRows.length + " rows for '" + recordName + "'.");
    }

  } catch (err) {
    console.error("ERROR in populateDetails: " + err.message);
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "[App] Populate Error",
        body: "populateDetails failed.\n\nError: " + err.message + "\n\nTime: " + new Date().toString()
      });
    } catch (mailErr) {
      console.error("Failed to send error email: " + mailErr.message);
    }
  }
}
```

---

#### Function: generateDetailId

**Purpose:** Utility — generates an 8-character random alphanumeric ID used as the unique suffix in DetailID values.

**Called By:** `populateDetails` (once per new row written to record_details)

**Parameters:** None

**Returns:**
- `String` — 8-character random string using uppercase A–Z and digits 0–9

**Code:**

```javascript
/**
 * Generates an 8-character random alphanumeric ID.
 * @return {string} 8-character random ID
 *
 * @example
 * generateDetailId(); // Returns something like "A3K9X1PQ"
 */
function generateDetailId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
```

---

### Installation Guide

#### Prerequisites

1. **Source App Spreadsheet ID** — the long string between `/d/` and `/edit` in the source Google Sheet URL

2. Confirm these tab names exist (case-sensitive):

| Spreadsheet | Required Tab |
|---|---|
| Source App | `Records` |
| Target App | `row_template` |
| Target App | `record_details` |

3. Confirm column positions match the script constants before running

#### Setup Steps

1. Open the **Target App** Google Sheet
2. Go to **Extensions → Apps Script**
3. Paste both `populateDetails` and `generateDetailId` functions (including configuration constants)
4. Replace `YOUR_SOURCE_SPREADSHEET_ID` with the actual source spreadsheet ID
5. Replace `YOUR_EMAIL_ADDRESS` in `NOTIFY_EMAIL`
6. Click **Save**
7. Click ▶ **Run** next to `populateDetails` to authorize
8. Click **Allow** when prompted

#### Trigger Setup

1. Click the **Triggers** icon (clock) in the left sidebar
2. Click **Add Trigger**
3. Function to run: `populateDetails`
4. Event source: `Time driven`
5. Type of time trigger: `Every 10 minutes`
6. Click **Save**

---

### Testing & Monitoring

#### Manual Test

1. Confirm at least one record in the source sheet has Status = `Active`
2. Confirm `record_details` does **not** already have rows for that record
3. Run `populateDetails` manually from the Apps Script editor
4. Open `record_details` — new rows should appear

#### Verification Checklist

- [ ] DetailID is present and unique
- [ ] Record name matches the source
- [ ] Type and Category match the template rows for that record type
- [ ] Row count matches the number of template rows for that type
- [ ] Status and Completed Date are empty
- [ ] Created Date has a timestamp

#### Duplicate Guard Test

1. Run the script again
2. Confirm **no new rows** appear in `record_details`
3. Check logs — should show: `Record '[name]' already exists. Skipping.`

#### Edge Case Tests

- [ ] Record with Status ≠ "Active" — no rows created
- [ ] Record type with no matching template rows — log shows skip message
- [ ] Empty source sheet (header only) — log shows "Nothing to do"
- [ ] Invalid spreadsheet ID — error email sent to `NOTIFY_EMAIL`

---

### Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| No rows appear | Spreadsheet ID is wrong | Re-copy from URL — no spaces, no `/edit` |
| No rows appear | Tab name mismatch | Check exact name — case-sensitive |
| No rows appear | No records have Status = "Active" | Verify source data |
| Wrong row count | Record type mismatch | Source type must match template exactly |
| Permission error | Not authorized | Run manually once → click Allow |
| `Cannot read property of null` | Sheet name doesn't exist | Double-check tab name |
| Duplicates appearing | Record name inconsistency | Check source data format |

---

### Rollback

1. **Disable the trigger:** Apps Script → Triggers → delete the `populateDetails` trigger
2. **Remove written rows:** Delete rows in `record_details` created by the script (identified by DetailID)
3. **Revert the script:** File → Manage versions → restore previous version

---

### Code File 2 — Structure Outline: ArchiveExpiredRecords

The second code file follows the exact same pattern. Only the content changes.

---

## ArchiveExpiredRecords

### Script Overview

**Code File Name:** ArchiveExpiredRecords
**Purpose:** Runs daily at 2 AM and moves records older than 90 days from the active sheet to an archive sheet.

**Problem Being Solved:**
- The active data sheet grows over time, slowing down queries and views
- Old records need to be preserved but removed from active use

**Solution:**
- A daily trigger checks each record's date
- Records older than 90 days are copied to the archive sheet and deleted from active

**Spreadsheet Connections:**

| Spreadsheet | Sheet | Role |
|---|---|---|
| Target App | active_records | READ/DELETE — current records |
| Target App | archived_records | WRITE — destination for old records |

**Current Configuration:**
- Sheets affected: active_records, archived_records
- Trigger schedule: Daily at 2 AM (time-driven)
- Status: Experimental

---

### Functions

#### Function: archiveExpiredRecords

**Purpose:** Main scheduled function. Identifies records older than 90 days, copies them to archived_records, then deletes from active_records (bottom to top to avoid index shifting).

**Trigger Type:** Time-driven (Daily at 2 AM)

**File Location:** Extensions → Apps Script → `ArchiveExpiredRecords.gs`

**Authorization Required:** Access to Target App spreadsheet

**Created:** [Date]
**Last Modified:** [Date]

**Parameters:** None

**Returns:** None (moves rows between sheets; logs count)

**Code:**

```javascript
const ACTIVE_SHEET   = "active_records";
const ARCHIVE_SHEET  = "archived_records";
const DATE_COL_IDX   = 4;   // 0-based index of the date column
const MAX_AGE_DAYS   = 90;

/**
 * Moves records older than MAX_AGE_DAYS from active to archive sheet.
 * Deletes from bottom to top to prevent index shifting.
 *
 * @return {void}
 */
function archiveExpiredRecords() {
  const ss            = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet   = ss.getSheetByName(ACTIVE_SHEET);
  const archiveSheet  = ss.getSheetByName(ARCHIVE_SHEET);

  const data     = activeSheet.getDataRange().getValues();
  const cutoff   = new Date();
  cutoff.setDate(cutoff.getDate() - MAX_AGE_DAYS);

  const toArchive = [];
  const rowsToDelete = [];

  for (let i = 1; i < data.length; i++) {
    if (new Date(data[i][DATE_COL_IDX]) < cutoff) {
      toArchive.push(data[i]);
      rowsToDelete.push(i + 1);  // 1-based row number
    }
  }

  if (toArchive.length === 0) {
    console.log("No expired records.");
    return;
  }

  // Write to archive
  const lastRow = archiveSheet.getLastRow();
  archiveSheet.getRange(lastRow + 1, 1, toArchive.length, toArchive[0].length)
    .setValues(toArchive);

  // Delete from active (bottom to top)
  for (let i = rowsToDelete.length - 1; i >= 0; i--) {
    activeSheet.deleteRow(rowsToDelete[i]);
  }

  console.log("Archived " + toArchive.length + " records.");
}
```

---

### Installation Guide

1. Open the Target App Google Sheet → Extensions → Apps Script
2. Create file: `ArchiveExpiredRecords.gs`
3. Paste the function and constants
4. Save and run once to authorize
5. Set up a daily trigger at 2 AM for `archiveExpiredRecords`

---

### Testing & Monitoring

- [ ] Run manually with test data that includes records older than 90 days
- [ ] Verify those rows moved to `archived_records`
- [ ] Verify they are removed from `active_records`
- [ ] Run again — confirm no movement if all records are recent
- [ ] Confirm row order in archive matches source

---

### Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Nothing moves | All records are within 90 days | Add a test record with an old date |
| Wrong rows moved | Date column index is off | Verify `DATE_COL_IDX` matches actual column |
| Rows deleted but not archived | Script errored mid-run | Check logs; restore from Sheets version history |

---

### Rollback

1. **Disable trigger:** Delete the `archiveExpiredRecords` trigger
2. **Restore rows:** Copy moved rows back from `archived_records` to `active_records`
3. **Revert script:** File → Manage versions → restore previous version

---

## Example 8: Spreadsheet Backup Function

### Function: exportBackup

**Purpose:** Create a timestamped copy of the active spreadsheet as a backup

**Trigger Type:** Manual

**File Location:** Extensions → Apps Script → `Utilities.gs`

**Authorization Required:** Access to Google Drive

**Parameters:** None

**Returns:**
- String: URL of the newly created backup spreadsheet

**Code:**
```javascript
/**
 * Creates a timestamped backup copy of the active spreadsheet.
 * @return {string} URL of the backup spreadsheet
 */
function exportBackup() {
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	const timestamp = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd_HHmmss');
	const backupName = ss.getName() + ' - Backup ' + timestamp;
	const backup = ss.copy(backupName);
	Logger.log('Backup created: ' + backupName);
	return backup.getUrl();
}
```

**Testing Checklist:**
- [ ] Run function, check Execution Log for backup URL
- [ ] Open the URL, verify spreadsheet is a complete copy
- [ ] Verify timestamp in backup name is correct

---

## Common Apps Script Patterns

| Pattern | Code Snippet | Use Case |
|---------|--------------|----------|
| **Get sheet** | `ss.getSheetByName("Name")` | Access specific sheet |
| **Get all data** | `sheet.getDataRange().getValues()` | Read entire sheet |
| **Write data** | `sheet.getRange(row, col, rows, cols).setValues(data)` | Batch write |
| **Delete rows** | `sheet.deleteRow(rowNumber)` | Remove single row |
| **Get last row** | `sheet.getLastRow()` | Find data extent |
| **Create menu** | `ui.createMenu("Name").addItem(...).addToUi()` | Custom UI |
| **Send email** | `MailApp.sendEmail(to, subject, body)` | Notifications |
| **Log message** | `Logger.log("Message")` | Debug output |

---

## Documentation Best Practices

### What Makes Good Apps Script Documentation

1. **Complete JSDoc Comments:** @param and @return tags for all functions
2. **Clear Purpose:** What the function does and why it exists
3. **Trigger Information:** How and when the function runs
4. **Installation Steps:** Exact setup instructions
5. **Testing Checklist:** Verification steps to confirm it works
6. **Troubleshooting:** Common errors and solutions
7. **Code Examples:** Show actual usage patterns

### Script Type Quick Reference

| Script Type | Key Documentation Elements |
|-------------|---------------------------|
| **Function** | Purpose, parameters, returns, code, testing |
| **Trigger Setup** | Schedule, event type, configuration code |
| **Event Handler** | Event source, filter conditions, side effects |
| **Utility** | Called by, parameters, returns, usage |
| **Migration** | Status, testing plan, rollback steps |

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** Generic examples applicable to any project

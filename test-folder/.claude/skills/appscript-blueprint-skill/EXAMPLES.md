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

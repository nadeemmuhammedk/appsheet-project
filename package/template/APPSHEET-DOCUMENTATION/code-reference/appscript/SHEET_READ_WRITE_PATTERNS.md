# Apps Script — Sheet Read/Write Patterns

**Purpose:** Common patterns for reading from and writing to Google Sheets rows in Apps Script functions that process AppSheet-backed data.

---

## 1. Get a Sheet by Name

```javascript
const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getSheetByName(SHEET_NAME); // use a named constant, not a hardcoded string
```

---

## 2. Read All Data (Header Map Pattern)

Read the entire sheet once, then build a header-name → column-index map. This avoids repeated `getRange` calls and makes the code resilient to column reordering.

```javascript
const data = sheet.getDataRange().getValues();
const headers = data[0]; // row 0 = header row

// Build map: header name → 0-based column index
const col = {};
headers.forEach((h, i) => { col[h] = i; });

// Access a value in data row i (1-based sheet row = i+1)
const value = data[i][col['ColumnName']];
```

---

## 3. Write a Single Cell

```javascript
// sheet row is 1-based; col index is 0-based → add 1 for getRange
sheet.getRange(sheetRowNumber, col['ColumnName'] + 1).setValue(newValue);
```

---

## 4. Write Multiple Cells in One Row

```javascript
// Batch write — fewer calls to Sheets API = faster execution
const rowRange = sheet.getRange(sheetRowNumber, 1, 1, headers.length);
const rowValues = rowRange.getValues()[0]; // read current row values

rowValues[col['Column1']] = value1;
rowValues[col['Column2']] = value2;
rowValues[col['Column3']] = value3;

rowRange.setValues([rowValues]); // write back in one call
```

---

## 5. Find Rows Matching a Condition

```javascript
// Iterate data rows (skip header at index 0)
const flaggedRows = [];
for (let i = 1; i < data.length; i++) {
	if (data[i][col['_FlagColumn']] === true) {
		flaggedRows.push({ rowIndex: i, sheetRow: i + 1, data: data[i] });
	}
}
```

---

## 6. Clear a Flag Column

```javascript
// Clear a boolean flag after successful processing
sheet.getRange(sheetRow, col['_FlagColumn'] + 1).setValue(false);
```

---

## 7. Write an Error Message

```javascript
// Write error text to an error column; leave flag TRUE for retry
sheet.getRange(sheetRow, col['_ErrorColumn'] + 1).setValue(errorMessage);
```

---

## 8. Append a New Row

```javascript
sheet.appendRow([value1, value2, value3, /* ... */]);
```

---

## 9. Named Constants Pattern

Define sheet/column names as constants at the top of the file — never hardcode strings inline.

```javascript
// constants.gs (or top of your main file)
const SHEETS = {
	LEADS: 'leads',
	INTERACTIONS: 'lead_interactions',
	USERS: 'users',
};

const FLAGS = {
	LEAD_STATUS_SYNC: '_LeadStatusSyncFlag',
	LEAD_STATUS_ERROR: '_LeadStatusSyncError',
};
```

---

## 10. Notes

- **`getDataRange().getValues()`** reads all data in one API call — prefer over multiple `getRange` calls
- **Row index math:** `data[i]` corresponds to sheet row `i + 1` (data array is 0-based; sheet rows are 1-based)
- **Column index math:** `col['Name']` is 0-based; `getRange(row, col + 1)` needs `+1` for 1-based Sheets API
- **Batch writes** with `setValues([rowValues])` are faster than multiple `setValue` calls on the same row
- **`appendRow`** always adds to the end of the sheet — do not use for updating existing rows

---

**Related Documentation:**
- [Overview](APPSCRIPT_OVERVIEW.md) — conventions and file index
- [Relay Flag Processor](RELAY_FLAG_PROCESSOR.md) — full example using these patterns
- [Time-Driven Triggers](TIME_DRIVEN_TRIGGERS.md) — scheduling the functions that use these patterns

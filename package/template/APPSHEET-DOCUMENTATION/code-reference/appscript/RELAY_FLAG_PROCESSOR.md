# Apps Script — Relay Flag Processor Pattern

**Purpose:** Process rows that AppSheet has flagged for background work. AppSheet sets a boolean flag column synchronously during a save event; this script reads flagged rows, applies business logic, and clears the flag.

---

## 1. Overview

```
AppSheet bot (on save event)
  └─► Sets _[ProcessName]Flag = TRUE on the row

Apps Script (time-driven, every N minutes)
  └─► Finds rows where _[ProcessName]Flag = TRUE
      └─► Processes each row
          ├─► Success: clears flag (_[ProcessName]Flag = FALSE)
          └─► Failure: writes error to _[ProcessName]Error, leaves flag TRUE (auto-retry)
```

---

## 2. AppSheet Side — Flag Column Setup

```appsheet
# Hidden flag column on the table
Column Name: _[ProcessName]Flag
Type: Yes/No
EDITABLE: FALSE
SHOW: FALSE
Initial Value: FALSE

# Optional error column (Apps Script writes here on failure)
Column Name: _[ProcessName]Error
Type: LongText
EDITABLE: FALSE
SHOW: FALSE

# Bot sets the flag when condition is met
Bot Name: Mark [Record] for [ProcessName]
Trigger:
  Event: Adds Only
  Table: [TableName]
  Condition: [BusinessLogicCondition]
Process:
  Step: Run a data action → Set row values
    _[ProcessName]Flag = TRUE
```

---

## 3. Apps Script Side — Processor Function

```javascript
/**
 * Process all rows flagged by the AppSheet bot.
 * Called by a time-driven trigger every N minutes.
 */
function processProcessNameFlags() {
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	const sheet = ss.getSheetByName(SHEET_NAME); // use a named constant

	const data = sheet.getDataRange().getValues();
	const headers = data[0];

	// Build a header → column index map (0-based)
	const col = {};
	headers.forEach((h, i) => { col[h] = i; });

	// Identify the flag and error columns
	const flagCol = col['_ProcessNameFlag'];   // replace with actual column name
	const errorCol = col['_ProcessNameError']; // replace with actual column name

	for (let i = 1; i < data.length; i++) {
		const row = data[i];

		if (row[flagCol] !== true) continue; // skip unflagged rows

		try {
			// --- Apply your business logic here ---
			// e.g., read values, update another sheet, call an external API

			// Clear the flag on success
			sheet.getRange(i + 1, flagCol + 1).setValue(false);

			// Optionally clear any previous error
			if (errorCol !== undefined) {
				sheet.getRange(i + 1, errorCol + 1).setValue('');
			}

		} catch (e) {
			// Write error message; leave flag TRUE for retry on next run
			if (errorCol !== undefined) {
				sheet.getRange(i + 1, errorCol + 1).setValue(e.message);
			}
			console.error(`Row ${i + 1}: ${e.message}`);
		}
	}
}
```

---

## 4. Key Behaviours

| Behaviour | Detail |
|---|---|
| **Success** | Flag cleared (`FALSE`); error column cleared if present |
| **Failure** | Flag left `TRUE`; error message written to error column |
| **Auto-retry** | Next scheduled run picks up any rows still flagged `TRUE` |
| **Idempotency** | Business logic should be safe to run twice on the same row in case of partial failure |

---

## 5. Notes

- Use named constants for sheet/tab names — never hardcode strings inline
- `getDataRange().getValues()` reads the whole sheet once per run — efficient for moderate row counts
- For large sheets (thousands of rows), consider filtering with `createTextFinder` before reading
- Always wrap business logic in `try/catch` so one bad row doesn't abort the entire batch
- Leave the flag `TRUE` on error so the row is automatically retried on the next scheduled run

---

**Related Documentation:**
- [Overview](APPSCRIPT_OVERVIEW.md) — conventions and file index
- [Time-Driven Triggers](TIME_DRIVEN_TRIGGERS.md) — how to schedule this function
- [Sheet Read/Write Patterns](SHEET_READ_WRITE_PATTERNS.md) — reading and writing rows
- [Automation (AppSheet side)](../../rules-and-logic/automation/AUTOMATION.md) — bot and flag column setup

# Apps Script — Time-Driven Triggers

**Purpose:** Set up recurring time-driven triggers so that background processing functions (e.g., relay flag processors) run on a schedule without manual intervention.

---

## 1. How to Add a Trigger via the Apps Script Editor

Apps Script has a built-in Triggers UI — no code required for setup.

1. Open the Apps Script project (Extensions → Apps Script from the Google Sheet)
2. Click the **clock icon** in the left sidebar (Triggers), or go to **Edit → Current project's triggers**
3. Click **+ Add Trigger** (bottom right)
4. Configure:
   - **Function to run:** select the processor function (e.g., `processLeadStatusFlags`)
   - **Deployment:** Head
   - **Event source:** Time-driven
   - **Type of time-based trigger:** Minutes timer / Hour timer / Day timer / etc.
   - **Interval:** e.g., Every 10 minutes
5. Click **Save**

The trigger persists until manually deleted and survives script edits.

---

## 2. Common Interval Choices

| Use case | Suggested interval |
|---|---|
| Relay flag processor (near-real-time sync) | Every 5–10 minutes |
| Daily summary / report generation | Day timer — specific hour |
| Weekly cleanup | Week timer — specific day + hour |

---

## 3. Managing Existing Triggers

- View all active triggers in the **Triggers** panel (clock icon in the left sidebar)
- Delete a trigger by clicking the three-dot menu → **Delete trigger**
- Only one trigger per function is needed — avoid adding duplicates

---

## 4. Notes

- Triggers run as the Google account that created them — ensure that account has edit access to the sheet
- Minimum interval is **1 minute**; for relay flags 5–10 minutes is typical
- Apps Script has a **daily execution quota** — keep processor functions fast and exit early if there are no flagged rows
- Timezone for "day timer" / "week timer" triggers is set in **Project Settings** (gear icon in the left sidebar)

---

**Related Documentation:**
- [Overview](APPSCRIPT_OVERVIEW.md) — conventions and file index
- [Relay Flag Processor](RELAY_FLAG_PROCESSOR.md) — the function these triggers call
- [Sheet Read/Write Patterns](SHEET_READ_WRITE_PATTERNS.md) — reading and writing rows inside triggered functions

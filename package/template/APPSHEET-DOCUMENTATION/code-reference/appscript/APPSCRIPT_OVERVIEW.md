# Apps Script Code Reference — Overview

**Purpose:** Document all Apps Script functions that interact with AppSheet-backed Google Sheets. This folder covers the server-side (Apps Script) half of integrations where AppSheet handles the UI/event side and Apps Script handles background processing.

---

## 1. When to Use Apps Script

AppSheet bots handle real-time, record-level logic triggered by data changes. Apps Script handles tasks that are:
- Too heavy for a synchronous AppSheet bot (e.g., cross-sheet updates, external API calls)
- Scheduled (time-driven, not event-driven)
- Multi-row batch operations

The standard bridge is the **relay flag pattern**: AppSheet sets a boolean flag column on a row; Apps Script polls for flagged rows, processes them, and clears the flag.

---

## 2. Naming Conventions

- **Function names:** `camelCase`, verb-first — e.g., `processLeadStatusFlags`, `syncInteractionCounts`
- **Flag columns:** Prefixed with `_` to signal internal/system use — e.g., `_LeadStatusSyncFlag`
- **Error columns:** Same prefix, `Error` suffix — e.g., `_LeadStatusSyncError`
- **Sheet tab references:** Use named constants at the top of each file, never hardcode sheet names inline

---

## 3. Trigger Setup

All recurring jobs use **time-driven triggers** set programmatically (not manually via the UI). See [TIME_DRIVEN_TRIGGERS.md](TIME_DRIVEN_TRIGGERS.md) for setup patterns.

---

## 4. File Index

| File | Contents |
|---|---|
| [RELAY_FLAG_PROCESSOR.md](RELAY_FLAG_PROCESSOR.md) | Reading flag columns, processing rows, clearing flags, error handling |
| [TIME_DRIVEN_TRIGGERS.md](TIME_DRIVEN_TRIGGERS.md) | Creating and managing time-driven triggers programmatically |
| [SHEET_READ_WRITE_PATTERNS.md](SHEET_READ_WRITE_PATTERNS.md) | Reading and writing Google Sheets rows from Apps Script |

---

## 5. Common Patterns Quick Reference

| Task | Pattern | File |
|---|---|---|
| Process rows flagged by AppSheet bot | Relay flag processor | RELAY_FLAG_PROCESSOR.md |
| Run a job every N minutes | Time-driven trigger | TIME_DRIVEN_TRIGGERS.md |
| Read all rows from a sheet tab | `getDataRange().getValues()` | SHEET_READ_WRITE_PATTERNS.md |
| Write a single cell value | `getRange(row, col).setValue(val)` | SHEET_READ_WRITE_PATTERNS.md |
| Find column index by header name | Header map pattern | SHEET_READ_WRITE_PATTERNS.md |

---

**Related Documentation:**
- [Automation (AppSheet side)](../../rules-and-logic/automation/AUTOMATION.md) — bot configuration, flag columns, trigger patterns
- [Table Settings Overview](../../tables-data-schema/table-settings/TABLE_SETTINGS_OVERVIEW.md) — Google Sheets tab registration in AppSheet

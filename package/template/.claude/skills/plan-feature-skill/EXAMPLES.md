# Plan Feature Skill — Examples

Two generic examples showing the plan format for different feature scopes.

---

## Example 1: Full-Phase Feature (All Blocks)

**Feature:** Add an `IsArchived` flag to the `records` table so archived records are hidden from the main view but preserved in a separate archive view.

**Components touched:** Google Sheets + AppSheet + Apps Script

---

```markdown
# Plan: Add IsArchived Flag to Records

## Context

Records that are no longer active clutter the main view and slow down the app. An `IsArchived` Yes/No flag lets users mark records as archived. Archived records are hidden from the default view but accessible in a dedicated Archive view. Apps Script skips archived records when processing.

---

## Progress Checklist

### Phase 1: Google Sheets
- [ ] Google Sheets: Add `IsArchived` checkbox column at Col N in `records` tab (header: `IsArchived`)

### Phase 2: AppSheet + Docs
- [ ] AppSheet: Add `IsArchived` column to `records` table (Type: Yes/No, Initial value: FALSE)
- [ ] AppSheet: Add "Archive" action to `records` table
- [ ] AppSheet: Add Archive view (filtered slice — IsArchived = TRUE)
- [ ] AppSheet: Update Main view slice to exclude archived records
- [ ] Docs: Update `docs/formulas/appsheet_formulas.md` — IsArchived column, Archive action, Archive view, Main view slice

### Phase 3: Apps Script Docs
- [ ] Docs: Update `docs/formulas/appscript_code.md` — add `REC_IS_ARCHIVED_COL = 14` constant
- [ ] Docs: Update `docs/formulas/appscript_code.md` — update `processRecords`: skip rows where IsArchived = TRUE
- [ ] Docs: Update `docs/formulas/appscript_code.md` — System Overview: note IsArchived skip logic

### Phase 4: Apply Code in Apps Script Editor
- [ ] Apps Script: Apply all Phase 3 code changes in the Apps Script editor

### Phase 5: Testing
- [ ] Test 1 — Archive action: click Archive on an active record → IsArchived = TRUE, record disappears from Main view
- [ ] Test 2 — Archive view: open Archive view → archived records visible
- [ ] Test 3 — Script skip: trigger processing with an archived record present → archived record is skipped, active records processed
- [ ] Test 4 — Existing records unaffected: all records created before this feature have IsArchived = FALSE by default

---

## Phase 1: Google Sheets

**Scope:** Google Sheets manual edits only

### records tab

Add a checkbox column:
- **Column position:** Col N (cell N1)
- **Header:** `IsArchived` (exact, case-sensitive)
- **Type:** Checkbox
- **Default:** Leave unchecked (FALSE)

---

## Phase 2: AppSheet + Docs

**Scope:** AppSheet config changes + `docs/formulas/appsheet_formulas.md` update

### AppSheet — records table

**IsArchived** (new column)
- Column Name: IsArchived
- Display Name: Archived
- Type: Yes/No
- Initial Value: FALSE
- SHOW IF: N/A (always visible)
- EDITABLE: FALSE (set via action only)
- REQUIRE: NO
- Description: "TRUE if this record has been archived. Archived records are hidden from the main view."

### Archive action

- Action Name: Archive Record
- Behavior: Set the value of some columns in this row
- Set: `IsArchived` = `TRUE`
- SHOW IF: `NOT([IsArchived])`
- Prominence: Display overlay

### Archive view (new)

- View Name: Archive
- View Type: Table
- Data: records — slice where `[IsArchived] = TRUE`
- Sort: CreatedDate descending

### Main view — slice update

Add condition to existing Main view slice: `NOT([IsArchived])`

### Docs — appsheet_formulas.md

Add to `records` table documentation:
- `IsArchived` column config
- Archive action config
- Archive view config
- Main view slice condition update

---

## Phase 3: Apps Script Docs

**Scope:** `docs/formulas/appscript_code.md` — all code changes documented

### 3A — New constant

Add after existing column constants:
```javascript
const REC_IS_ARCHIVED_COL = 14;  // Col N: IsArchived (Yes/No)
```

### 3B — processRecords: skip archived rows

In the row processing loop, add an early-continue check:
```javascript
// Skip archived records
const isArchived = rowData[REC_IS_ARCHIVED_COL - 1] === true;
if (isArchived) {
    console.log('processRecords: skipping archived row ' + sheetRow);
    continue;
}
```

### 3C — System Overview update

Update the `processRecords` description to note: "Skips rows where IsArchived = TRUE."

---

## Phase 4: Apply Code in Apps Script Editor

**Scope:** Manual — copy updated code from `appscript_code.md` into the Apps Script editor

Apply in this order:
1. Constants block — add `REC_IS_ARCHIVED_COL`
2. `processRecords` — add archived row skip

---

## Phase 5: Testing

- **Test 1 — Archive action:** Open a record → tap "Archive Record" → IsArchived = TRUE, record no longer appears in Main view
- **Test 2 — Archive view:** Open Archive view → previously archived record is visible
- **Test 3 — Script skip:** Trigger processing → log shows archived row was skipped; active rows processed normally
- **Test 4 — Default value:** All pre-existing records show IsArchived = FALSE (checkbox unchecked)

**What IsArchived never does:**
- Never deletes a record — data is preserved
- Never affects records in other tables
- Never prevents viewing archived records from the Archive view

---

## Files to Modify

| Phase | File | Who | Change |
|-------|------|-----|--------|
| 1 | Google Sheets `records` tab | You | Add Col N `IsArchived` checkbox |
| 2 | AppSheet `records` table | You | Add `IsArchived` column + Archive action |
| 2 | AppSheet Archive view | You | New view with archived records slice |
| 2 | AppSheet Main view slice | You | Exclude archived records |
| 2 | `docs/formulas/appsheet_formulas.md` | Claude | IsArchived column, action, views |
| 3 | `docs/formulas/appscript_code.md` | Claude | New constant + processRecords skip logic |
| 4 | Apps Script editor | You | Apply Phase 3 code changes |
```

---

## Example 2: Minimal Feature (AppSheet Only, No Sheets or Script)

**Feature:** Add a display-only `FullName` virtual column to the `contacts` table that concatenates first and last name.

**Components touched:** AppSheet only (virtual column — no sheet column needed, no script change)

---

```markdown
# Plan: Add FullName Virtual Column to Contacts

## Context

The contacts table stores first and last name as separate columns. Views and references need a single display-friendly label. A virtual column `FullName` concatenates both fields and can be used as the display name in deck views and references without adding a physical column to the sheet.

---

## Progress Checklist

### Phase 1: AppSheet + Docs
- [ ] AppSheet: Add `FullName` virtual column to `contacts` table
- [ ] AppSheet: Update Contacts deck view — set Label to `FullName`
- [ ] Docs: Update `docs/formulas/appsheet_formulas.md` — add `FullName` virtual column and deck view update

### Phase 2: Testing
- [ ] Test 1 — Display: open Contacts deck → each card shows "FirstName LastName"
- [ ] Test 2 — Missing last name: contact with no LastName → shows "FirstName" only (no trailing space)
- [ ] Test 3 — References: any table that references contacts shows FullName as the label

---

## Phase 1: AppSheet + Docs

**Scope:** AppSheet config changes + `docs/formulas/appsheet_formulas.md` update

### AppSheet — contacts table

**FullName** (new virtual column)
- Column Name: FullName
- Type: Text (Virtual)
- App Formula: `CONCATENATE([FirstName], IF(ISBLANK([LastName]), "", CONCATENATE(" ", [LastName])))`
- SHOW IF: N/A
- EDITABLE: FALSE (virtual — computed only)
- Description: "Display name combining first and last name. Used as deck label and reference label."

### Contacts deck view

- Update Label field: set to `FullName` (was: `FirstName`)

### Docs — appsheet_formulas.md

Add to `contacts` table documentation:
- `FullName` virtual column with App Formula
- Note the deck view Label update

---

## Phase 2: Testing

- **Test 1 — Normal display:** Contact with FirstName = "Jane" and LastName = "Smith" → shows "Jane Smith"
- **Test 2 — Missing last name:** Contact with FirstName = "Jane" and no LastName → shows "Jane" (no trailing space)
- **Test 3 — Reference label:** Open a record in another table that references a contact → reference chip shows "Jane Smith"

---

## Files to Modify

| Phase | File | Who | Change |
|-------|------|-----|--------|
| 1 | AppSheet `contacts` table | You | Add `FullName` virtual column |
| 1 | AppSheet Contacts deck view | You | Update Label to FullName |
| 1 | `docs/formulas/appsheet_formulas.md` | Claude | FullName virtual column + deck view |
```

---

## See Also

For real-world examples from this project:
- `LH_TEMPLATE_CSV_IMPORT.md` — full-phase plan (GSheets + AppSheet + Apps Script + error handling)
- `UPDATED_FEATURE_CSV_IMPORT_PLAN.md` — full-phase plan with multiple parallel tracks per phase

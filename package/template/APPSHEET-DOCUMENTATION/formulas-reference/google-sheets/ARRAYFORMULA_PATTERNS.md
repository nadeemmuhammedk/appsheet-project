# Google Sheets ARRAYFORMULA Patterns

AppSheet uses Google Sheets as its data source. Some calculated values are better stored directly in the sheet (via ARRAYFORMULA) rather than as AppSheet virtual columns — particularly when those values need to be accessible to external tools like Looker Studio, Apps Script, or direct sheet exports.

## 1. When to Use ARRAYFORMULA vs AppSheet Virtual Column

| Use ARRAYFORMULA (in Sheet) | Use App Formula (in AppSheet) |
|-----------------------------|-------------------------------|
| Value needs to be in Looker Studio | Value is display-only inside the app |
| Apps Script needs to read the value | Value derives from other AppSheet columns |
| External exports/APIs need the value | Value involves REF_ROWS or AppSheet-specific functions |
| Calculation is pure spreadsheet math | Calculation references multiple AppSheet tables |

---

## 2. ARRAYFORMULA Structure

Place the formula in the **header row (row 1)** of the target column. It auto-fills all rows below.

**Basic pattern:**
```excel
=ARRAYFORMULA(
  IF(ROW(A:A)=1, "Header Name",
    IF(A:A="", "",
      [Calculation Formula using row ranges]
    )
  )
)
```

| Part | Purpose |
|------|---------|
| `ROW(A:A)=1` | Outputs the column header for row 1 |
| `A:A=""` | Returns blank for empty rows (avoids calculating on blank source rows) |
| Inner formula | The actual calculation, applied to every row |

---

## 3. Named Patterns

### Pattern 1: COUNTIF Across Sheets
Count how many times each value in this sheet's column A appears in another sheet's column B.

```excel
=ARRAYFORMULA(
  IF(ROW(A:A)=1, "Interaction Count",
    IF(A:A="", "",
      COUNTIF(Interactions!B:B, A:A)
    )
  )
)
```

**Use case:** Count child records (e.g., number of interactions per lead) and store the result in the parent sheet for Looker Studio access.

---

### Pattern 2: SUMIF Across Sheets
Sum values in another sheet where a reference column matches this sheet's key.

```excel
=ARRAYFORMULA(
  IF(ROW(A:A)=1, "Total Amount",
    IF(A:A="", "",
      SUMIF(OtherSheet!A:A, A:A, OtherSheet!C:C)
    )
  )
)
```

**Use case:** Sum order amounts per customer, stored on the customers sheet.

---

### Pattern 3: Simple Calculated Column
Apply a formula to every row in the sheet.

```excel
=ARRAYFORMULA(
  IF(ROW(A:A)=1, "Full Name",
    IF(A:A="", "",
      A:A & " " & B:B
    )
  )
)
```

---

### Pattern 4: Conditional Value
Apply different values based on a condition across all rows.

```excel
=ARRAYFORMULA(
  IF(ROW(A:A)=1, "Status Label",
    IF(A:A="", "",
      IF(C:C="CompleteValue", "Done", "Pending")
    )
  )
)
```

---

## 4. Constraints & Gotchas

- **Place in row 1 only** — putting ARRAYFORMULA in any other row causes it to overwrite rows below
- **Do NOT manually enter values in rows below** — ARRAYFORMULA controls all rows in the column; manual values in lower rows will cause a conflict error
- **AppSheet must treat the column as non-editable** — if AppSheet users can edit the column, their writes will conflict with ARRAYFORMULA. Set `EDITABLE: FALSE` in AppSheet or use a separate virtual column
- **Blank row guard is required** — without the `IF(A:A="", "")` guard, ARRAYFORMULA calculates on every row in the sheet (millions of rows), severely degrading performance
- **COUNTIF/SUMIF across sheets use full column references** (`Sheet!A:A`) — this is intentional and necessary for ARRAYFORMULA compatibility; avoid using named ranges inside ARRAYFORMULA
- **Google Sheets recalculates on every edit** — extremely complex ARRAYFORMULAs on large sheets can make the sheet slow to edit

---

## 5. Related Documentation

- [Virtual Columns](../../tables-data-schema/virtual-columns/VIRTUAL_COLUMNS_OVERVIEW.md) — AppSheet-side calculated columns
- [Formula Properties](../../tables-data-schema/column-properties/FORMULA_PROPERTIES.md) — App Formula vs Initial Value
- [List and Select](../list-and-select/LIST_AND_SELECT.md) — SELECT, COUNT, SUM in AppSheet formulas

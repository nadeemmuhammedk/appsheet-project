# Dynamic Reference Table Pattern (dropdown_refs)

A dynamic reference table stores auto-populating dropdown values derived from source tables using Google Sheets QUERY formulas. It always reflects current live data without manual maintenance.

---

## 1. Sheet Structure

**Recommended tab name:** `dropdown_refs`

| Column | Type | Notes |
|--------|------|-------|
| Category | Text | Primary key — identifies the reference group |
| Value | Text | One row per unique value pulled from source |

Each row is one Category + Value pair. The sheet is populated entirely by Google Sheets formulas — never edited manually.

**AppSheet table settings:** ADDS = FALSE, UPDATES = FALSE, DELETES = FALSE — strictly read-only in the app.

---

## 2. How It Works

A QUERY formula in the sheet reads from a source table, applies a filter condition, and writes the results as Category + Value rows. When the source data changes (e.g., a record is deactivated), the QUERY output updates automatically on the next sync.

```
Source Table  →  QUERY (filter + select)  →  dropdown_refs rows  →  AppSheet VALID_IF
```

---

## 3. Single Source QUERY

Pull unique values from one source table with a filter condition.

**Google Sheets formula (placed in cell A2):**
```
=QUERY(
    source_tab!A2:C,
    "SELECT A, B WHERE C = 'Active'",
    0
)
```

This outputs two columns: Category in column A, Value in column B.

**Resulting rows:**
```
Category    Value
--------    -------
TypeA       Record1
TypeA       Record2
TypeA       Record3
```

**AppSheet VALID_IF:**
```appsheet
SELECT(dropdown_refs[Value], [Category] = "TypeA")
```

---

## 4. Multiple Sources with VSTACK

When dropdowns need values from several source tables, use `VSTACK` to combine multiple QUERY results into one output block.

**Google Sheets formula (placed in cell A2):**
```
=VSTACK(
    QUERY(source_tab_1!A2:C, "SELECT 'CategoryA', A WHERE C = 'Active'", 0),
    QUERY(source_tab_2!A2:D, "SELECT 'CategoryB', A WHERE D <> 'Archived'", 0)
)
```

**Resulting rows:**
```
Category     Value
---------    -------
CategoryA    Record1
CategoryA    Record2
CategoryB    Record3
CategoryB    Record4
```

Each QUERY block contributes its own Category label as a literal string in the SELECT clause.

---

## 5. Filter Patterns

Common filter conditions applied inside the QUERY:

| Goal | QUERY WHERE clause |
|------|--------------------|
| Active records only | `WHERE StatusColumn = 'Active'` |
| Exclude a specific status | `WHERE StatusColumn <> 'Archived'` |
| Multiple allowed statuses | `WHERE StatusColumn = 'Open' OR StatusColumn = 'In Progress'` |
| Non-blank values only | `WHERE ValueColumn IS NOT NULL` |

---

## 6. AppSheet VALID_IF

The VALID_IF formula on the target column filters `dropdown_refs` by Category:

```appsheet
SELECT(dropdown_refs[Value], [Category] = "CategoryA")
```

This returns only the rows where Category matches, giving the user a filtered dropdown of live values.

---

## 7. dropdown_refs vs dropdown_enums

| | `dropdown_refs` | `dropdown_enums` |
|--|----------------|-----------------|
| **Source** | QUERY from live tables | Manually maintained rows |
| **Updates** | Automatically on sync | Owner edits sheet manually |
| **Use for** | Active records, filtered lists | Static enums, dependent dropdowns |
| **Examples** | Active courses, open batches | Status values, roles, gender |

Use `dropdown_refs` when the valid options depend on the current state of other tables. Use `dropdown_enums` when the options are fixed lists that change rarely and are controlled by the owner.

---

## 8. Key Principles

- **No manual maintenance:** Formulas keep the table current — adding or deactivating a source record automatically updates the dropdown
- **Filter at the source:** Apply WHERE conditions in the QUERY to show only relevant options (active, non-archived, etc.)
- **Flat structure:** Always two columns, any number of rows
- **Combine sources cleanly:** VSTACK merges multiple QUERYs into one table without duplicating sheet tabs

---

**Related Documentation:**
- [Centralized Enum Table Pattern](DROPDOWN_ENUMS_PATTERN.md)
- [Validation Properties](../column-properties/VALIDATION_PROPERTIES.md)
- [Data Validity & Constraints](../../rules-and-logic/data-validity-constraints/DATA_VALIDITY_AND_CONSTRAINTS.md)
- [Google Sheets ARRAYFORMULA Patterns](../../formulas-reference/google-sheets/ARRAYFORMULA_PATTERNS.md)

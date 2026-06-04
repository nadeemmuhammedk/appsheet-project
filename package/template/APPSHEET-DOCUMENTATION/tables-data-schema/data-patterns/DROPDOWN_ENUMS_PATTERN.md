# Centralized Enum Table Pattern (dropdown_enums)

A centralized enum table stores all static dropdown values in one Google Sheet tab. It supports both simple enum lists and multi-level dependent dropdowns using a consistent Category naming convention.

---

## 1. Sheet Structure

**Recommended tab name:** `dropdown_enums`

| Column | Type | Notes |
|--------|------|-------|
| Category | Text | Primary key — identifies the enum group |
| Value | Text | One row per allowed value |

Each row is one Category + Value pair. Multiple rows share the same Category to form a list.

**AppSheet table settings:** ADDS = FALSE, UPDATES = FALSE, DELETES = FALSE — read-only in the app, edited directly in Google Sheets.

---

## 2. Category Naming Convention

The Category name encodes the full dependency chain — what column the dropdown is for, and every parent column + value it depends on. Reading the Category name alone tells you the complete relationship.

### Regular Enum (no dependency)

Category = the column name exactly.

```
Category    Value
--------    --------
Status      Active
Status      Inactive
Status      Pending

Priority    High
Priority    Medium
Priority    Low
```

**VALID_IF:**
```appsheet
SELECT(dropdown_enums[Value], [Category] = "Status")
```

---

### Level 2 — Dependent on One Parent

Category = `{ChildColumn}_{ParentColumn}_{ParentValue}`

```
Category                    Value
--------------------------  ----------
SubType_Type_TypeA          Option 1
SubType_Type_TypeA          Option 2
SubType_Type_TypeB          Option 3
SubType_Type_TypeB          Option 4
```

**VALID_IF** (on the `SubType` column, which depends on `Type`):
```appsheet
SELECT(
    dropdown_enums[Value],
    [Category] = CONCATENATE("SubType_Type_", [Type])
)
```

Reading `SubType_Type_TypeA` tells you: *"SubType options — filtered by the Type column — when Type = TypeA."*

---

### Level 3 — Dependent on Two Parents

Category = `{ChildColumn}_{P1Column}_{P1Value}_{P2Column}_{P2Value}`

Each additional parent appends its own `_{Column}_{Value}` pair.

```
Category                              Value
------------------------------------  ----------
Detail_Type_TypeA_SubType_Option1     Detail X
Detail_Type_TypeA_SubType_Option1     Detail Y
Detail_Type_TypeA_SubType_Option2     Detail Z
Detail_Type_TypeB_SubType_Option3     Detail W
```

**VALID_IF** (on the `Detail` column, which depends on `Type` and `SubType`):
```appsheet
SELECT(
    dropdown_enums[Value],
    [Category] = CONCATENATE(
        "Detail_Type_", [Type],
        "_SubType_", [SubType]
    )
)
```

Reading `Detail_Type_TypeA_SubType_Option1` tells you: *"Detail options — when Type = TypeA AND SubType = Option1."*

---

### Level 4 — Dependent on Three Parents

Category = `{ChildColumn}_{P1Col}_{P1Val}_{P2Col}_{P2Val}_{P3Col}_{P3Val}`

```
Category                                              Value
----------------------------------------------------  ---------
Spec_Type_TypeA_SubType_Option1_Detail_DetailX        Spec 1
Spec_Type_TypeA_SubType_Option1_Detail_DetailX        Spec 2
```

**VALID_IF:**
```appsheet
SELECT(
    dropdown_enums[Value],
    [Category] = CONCATENATE(
        "Spec_Type_", [Type],
        "_SubType_", [SubType],
        "_Detail_", [Detail]
    )
)
```

---

## 3. Pattern Summary

| Level | Category Structure | VALID_IF CONCATENATE |
|-------|--------------------|----------------------|
| Regular | `ChildCol` | `"ChildCol"` |
| 2 | `Child_P1Col_P1Val` | `CONCATENATE("Child_P1Col_", [P1Col])` |
| 3 | `Child_P1Col_P1Val_P2Col_P2Val` | `CONCATENATE("Child_P1Col_", [P1Col], "_P2Col_", [P2Col])` |
| 4 | `Child_P1Col_P1Val_P2Col_P2Val_P3Col_P3Val` | `CONCATENATE("Child_P1Col_", [P1Col], "_P2Col_", [P2Col], "_P3Col_", [P3Col])` |

Each parent adds one `_{Column}_{Value}` pair. The formula complexity grows linearly. The sheet just gains more rows.

---

## 4. Visual Sheet Layout

```
  ┌─────┬──────────────────────────────────────┬───────────┐
  │ Row │              Category                │   Value   │
  ├─────┼──────────────────────────────────────┼───────────┤
  │  1  │ Category                             │ Value     │  ← headers
  ├─────┼──────────────────────────────────────┼───────────┤
  │  2  │ Type                                 │ TypeA     │  ← Level 1
  │  3  │ Type                                 │ TypeB     │
  ├─────┼──────────────────────────────────────┼───────────┤
  │  4  │ SubType_Type_TypeA                   │ Option 1  │  ← Level 2
  │  5  │ SubType_Type_TypeA                   │ Option 2  │
  │  6  │ SubType_Type_TypeB                   │ Option 3  │
  ├─────┼──────────────────────────────────────┼───────────┤
  │  7  │ Detail_Type_TypeA_SubType_Option1    │ Detail X  │  ← Level 3
  │  8  │ Detail_Type_TypeA_SubType_Option1    │ Detail Y  │
  │  9  │ Detail_Type_TypeA_SubType_Option2    │ Detail Z  │
  │ 10  │ Detail_Type_TypeB_SubType_Option3    │ Detail W  │
  └─────┴──────────────────────────────────────┴───────────┘
```

---

## 5. Reading a Category Name

Any Category name is fully self-documenting:

```
Detail_Type_TypeA_SubType_Option1
│      │    │     │       │
│      │    │     │       └── Parent 2 value
│      │    │     └────────── Parent 2 column
│      │    └──────────────── Parent 1 value
│      └───────────────────── Parent 1 column
└──────────────────────────── Child column (the dropdown being filled)
```

No formula or external documentation is needed to understand what the row is for.

---

## 6. Shared Parent Values Across Grandparents

When the same parent value appears under multiple grandparents, rows resolve independently because the full parent chain is encoded in the Category:

```
Detail_Type_TypeA_SubType_Option1  → Detail X, Detail Y   (TypeA path)
Detail_Type_TypeB_SubType_Option1  → Detail W, Detail V   (TypeB path)
```

Same option name (`Option1`), different grandparent (`TypeA` vs `TypeB`) — two distinct Category keys, two distinct sets of options.

---

## 7. Regular and Dependent Enums Together

Both types co-exist in the same table:

```
Category                   Value
-------------------------  ----------
Status                     Active         ← regular enum
Status                     Inactive
SubType_Type_TypeA         Option 1       ← dependent enum (Level 2)
SubType_Type_TypeA         Option 2
Detail_Type_TypeA_         Detail X       ← dependent enum (Level 3)
  SubType_Option1
```

---

## 8. Key Principles

- **Self-documenting:** Every Category name encodes the full dependency chain — child column, and each parent column + value
- **Zero app changes:** Adding or removing options requires only adding or removing rows in the sheet
- **Flat structure:** Always two columns, any number of rows
- **Single VALID_IF pattern:** All levels use `SELECT` + `CONCATENATE` — only the number of concatenated segments changes

---

## 9. Known Behaviours & Gotchas

### Reordering rows does not trigger a cache refresh

AppSheet caches the contents of the `dropdown_enums` table. When you reorder existing rows in Google Sheets (drag, cut/paste, or in-place value swap), AppSheet's change detection does not register it as a meaningful data change — the cached dropdown order stays stale even after using **Regenerate Structure** or syncing the app.

**Symptom:** Dropdown options appear in the old order despite the sheet having the correct row order. Regenerate + sync do not fix it.

**Fix:** Add a dummy row anywhere in the table (any Category + Value), save the sheet, then delete it and save again. Adding a new row triggers a structural change that AppSheet's cache invalidation does detect — it re-reads the full table and picks up the corrected row order at the same time.

```
Workaround steps:
1. Add a dummy row: Category = "TEMP", Value = "TEMP"
2. Save the sheet
3. Delete the dummy row
4. Save the sheet
5. Sync the app — dropdown now reflects the correct row order
```

This applies to any dropdown sourced from `dropdown_enums` via `SELECT` + `VALID_IF`.

---

**Related Documentation:**
- [Enum Types](../column-types/ENUM_TYPES.md)
- [Dynamic Reference Table Pattern](DROPDOWN_REFS_PATTERN.md)
- [Validation Properties](../column-properties/VALIDATION_PROPERTIES.md)
- [Data Validity & Constraints](../../rules-and-logic/data-validity-constraints/DATA_VALIDITY_AND_CONSTRAINTS.md)

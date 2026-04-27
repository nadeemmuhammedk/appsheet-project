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

The Category name encodes both the purpose of the dropdown and what it depends on. Reading the Category name alone tells you the full dependency chain.

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

Category = `{ChildColumnName}_{ParentValue}`

```
Category            Value
-----------------   ----------
SubType_TypeA       Option 1
SubType_TypeA       Option 2
SubType_TypeB       Option 3
SubType_TypeB       Option 4
SubType_TypeC       Option 5
```

**VALID_IF** (on the `SubType` column, which depends on `Type`):
```appsheet
SELECT(
    dropdown_enums[Value],
    [Category] = CONCATENATE("SubType_", [Type])
)
```

Reading `SubType_TypeA` tells you: "These are SubType options, but only when Type = TypeA."

---

### Level 3 — Dependent on Two Parents

Category = `{ChildColumnName}_{Parent1Value}_{Parent2Value}`

Extend the Level 2 category by appending `_` and the next parent value.

```
Category                Value
---------------------   ----------
SubType_TypeA_Option1   Detail X
SubType_TypeA_Option1   Detail Y
SubType_TypeA_Option2   Detail Z
SubType_TypeB_Option3   Detail W
SubType_TypeB_Option3   Detail V
```

**VALID_IF** (on the `Detail` column, which depends on both `Type` and `SubType`):
```appsheet
SELECT(
    dropdown_enums[Value],
    [Category] = CONCATENATE("SubType_", [Type], "_", [SubType])
)
```

Reading `SubType_TypeA_Option1` tells you: "These are the Detail options when Type = TypeA AND SubType = Option1."

---

### Level N — Any Depth

Each level appends `_NextParentValue` to the previous Category name.

| Level | Category Pattern | VALID_IF CONCATENATE |
|-------|-----------------|----------------------|
| Regular | `ColumnName` | `"ColumnName"` |
| 2 | `Col_P1Val` | `CONCATENATE("Col_", [P1Col])` |
| 3 | `Col_P1Val_P2Val` | `CONCATENATE("Col_", [P1Col], "_", [P2Col])` |
| 4 | `Col_P1Val_P2Val_P3Val` | `CONCATENATE("Col_", [P1Col], "_", [P2Col], "_", [P3Col])` |

The formula complexity grows linearly. The sheet just gains more rows.

---

## 3. Visual Sheet Layout

```
  ┌─────┬─────────────────────────┬───────────┐
  │ Row │        Category         │   Value   │
  ├─────┼─────────────────────────┼───────────┤
  │  1  │ Category                │ Value     │  ← headers
  ├─────┼─────────────────────────┼───────────┤
  │  2  │ Type                    │ TypeA     │  ← Level 1 (regular enum)
  │  3  │ Type                    │ TypeB     │
  │  4  │ Type                    │ TypeC     │
  ├─────┼─────────────────────────┼───────────┤
  │  5  │ SubType_TypeA           │ Option 1  │  ← Level 2 (depends on Type)
  │  6  │ SubType_TypeA           │ Option 2  │
  │  7  │ SubType_TypeB           │ Option 3  │
  │  8  │ SubType_TypeB           │ Option 4  │
  │  9  │ SubType_TypeC           │ Option 5  │
  ├─────┼─────────────────────────┼───────────┤
  │ 10  │ SubType_TypeA_Option1   │ Detail X  │  ← Level 3 (depends on Type + SubType)
  │ 11  │ SubType_TypeA_Option1   │ Detail Y  │
  │ 12  │ SubType_TypeA_Option2   │ Detail Z  │
  │ 13  │ SubType_TypeB_Option3   │ Detail W  │
  └─────┴─────────────────────────┴───────────┘
```

---

## 4. Shared Parent Values Across Grandparents

When the same parent value appears under multiple grandparents, Level 3 rows resolve independently because the VALID_IF concatenates the full chain:

```
SubType_TypeA_Option1  → Detail X, Detail Y   (TypeA path)
SubType_TypeB_Option1  → Detail W, Detail V   (TypeB path — same option name, different details)
```

Two different category keys despite the same option name — the grandparent value makes them distinct.

---

## 5. Regular and Dependent Enums Together

Both types co-exist in the same table. Non-dependent values (simple lists) sit alongside dependent ones.

```
Category              Value
--------------------  ----------
Status                Active         ← regular enum
Status                Inactive
Priority              High           ← regular enum
Priority              Medium
SubType_TypeA         Option 1       ← dependent enum
SubType_TypeA         Option 2
SubType_TypeB         Option 3
```

---

## 6. When to Use Each Level

| Scenario | Use |
|----------|-----|
| Fixed list, no dependency | Regular enum |
| Child options vary by one parent | Level 2 |
| Child options vary by two parents | Level 3 |
| Same child options for all values of a parent | Stay at a lower level — no need to repeat rows |

---

## 7. Key Principles

- **Self-documenting:** Category names encode the full dependency chain — the sheet is readable without separate documentation
- **Zero app changes:** Adding or removing options requires only adding or removing rows in the sheet; no formula or AppSheet config changes needed
- **Flat structure:** Always two columns, any number of rows
- **Single VALID_IF pattern:** All levels use `SELECT` + `CONCATENATE` — only the number of concatenated columns changes

---

**Related Documentation:**
- [Enum Types](../column-types/ENUM_TYPES.md)
- [Validation Properties](../column-properties/VALIDATION_PROPERTIES.md)
- [Data Validity & Constraints](../../rules-and-logic/data-validity-constraints/DATA_VALIDITY_AND_CONSTRAINTS.md)

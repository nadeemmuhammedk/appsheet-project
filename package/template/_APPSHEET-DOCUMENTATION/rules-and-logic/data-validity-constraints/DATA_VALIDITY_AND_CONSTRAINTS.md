# AppSheet Data Validity & Constraints Reference

These settings are applied at the Column level and use AppSheet expressions to validate or control input.

## 1. Where to Configure
- **Editor path:** Data > Columns > select a table > column settings.
- **Expression type:** Same expression language used across the platform.

## 2. Constraint Types
- **Valid_If:** Determines if the input is valid.
  - If the expression returns `TRUE`, the input is accepted.
  - If it returns `FALSE`, the user sees a validation error.
  - If it returns a **LIST**, the input becomes a dropdown of allowed values.
- **Show_If:** Shows or hides the column input based on a condition.
- **Required_If:** Makes the column mandatory when the condition is true.
- **Editable_If:** Makes the column read-only unless the condition is true.

## 3. Expression Notes
- Expressions are similar to spreadsheet formulas.
- You can combine conditions with logical functions like `AND()`.

## 4. Examples
- **Age validation:** `[Age] >= 18`
- **Conditional field visibility:** `[Status] = "Other"`
- **Conditional editability:** `USEREMAIL() = [Creator Email]`
- **Dropdown list from a table:** `SELECT(Classes[ClassID], [Capacity] > 0)`
- **Filter expression:** `AND([Status] = "Complete", [Quantity] > 5)`

## 5. SHOW IF Named Patterns

Controls whether the column input is visible on a form. If FALSE, the field is hidden.

**Where:** Data > Tables > [Table] > Column > SHOW IF

### Simple Condition
```appsheet
SHOW IF: [ConditionColumn] = "ExpectedValue"
```

### Multiple Conditions (AND)
```appsheet
SHOW IF: AND(
  [Condition1] = "Value1",
  [Condition2] = "Value2"
)
```

### Multiple Conditions (OR)
```appsheet
SHOW IF: OR(
  [Condition1] = "Value1",
  [Condition2] = "Value2"
)
```

### Negation
```appsheet
SHOW IF: NOT([ConditionColumn] = "HiddenValue")
```

### Value in List
```appsheet
SHOW IF: [ConditionColumn] IN({"Value1", "Value2", "Value3"})
```

### Field Not Blank (Dependent Field)
```appsheet
SHOW IF: NOT(ISBLANK([DependentField]))
```

---

## 6. EDITABLE IF Named Patterns

Controls whether the column is editable. If FALSE, the field appears read-only on the form.

**Where:** Data > Tables > [Table] > Column > EDITABLE IF

### Lock After Set (Cannot Change Once Filled)
Use when: A field should be editable only when still blank — once set, it becomes permanently locked.

```appsheet
EDITABLE IF: ISBLANK([ThisColumn])
```

### Editable Based on Status Field
```appsheet
EDITABLE IF: [StatusField] = "Open"
```

### Owner Only Editable
```appsheet
EDITABLE IF: OR(
  USEREMAIL() = CONTEXT("OwnerEmail"),
  LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin"
)
```

### Editable in Multiple States
```appsheet
EDITABLE IF: [StatusField] IN({"Value1", "Value2", "Value3"})
```

### Editable Until Locked State
```appsheet
EDITABLE IF: NOT([StatusField] = "LockedValue")
```

---

## 7. Related Column Behaviors
- **Suggested values:** Propose input options without enforcing them.
- **Initial value / App formula:** Auto-populate or compute values as data changes.
- **REQUIRE / REQUIRE IF:** Make a field mandatory unconditionally or conditionally.

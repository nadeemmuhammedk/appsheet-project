# AppSheet Conditional Functions

Conditional functions choose between results based on expressions. They are the primary tool for dynamic behavior, status-based display, and multi-branch logic in AppSheet formulas.

## 1. Where Used

Conditional functions appear in virtually every formula context:
- App Formula / Initial Value
- SHOW IF, EDITABLE IF, VALID IF
- Security filters
- Action conditions
- Automation trigger conditions

---

## 2. Function Reference

### IF
**Syntax:** `IF(condition, value_if_true, value_if_false)`

Returns `value_if_true` when condition is TRUE, otherwise `value_if_false`.

```appsheet
IF([Status] = "Complete", "Done", "In Progress")
IF([Amount] > 1000, "High Value", "Standard")
IF(ISBLANK([CompletedDate]), "Open", "Closed")
```

---

### IFS
**Syntax:** `IFS(condition1, value1, condition2, value2, ..., TRUE, default)`

Evaluates conditions in order and returns the value for the first TRUE condition. The final `TRUE, default` acts as a catch-all fallback.

```appsheet
IFS(
  [Score] >= 90, "A",
  [Score] >= 80, "B",
  [Score] >= 70, "C",
  TRUE, "F"
)
```

**When to use IFS over nested IF:** When you have 3 or more mutually exclusive conditions. IFS is more readable than deeply nested IF chains.

---

### SWITCH
**Syntax:** `SWITCH(expression, value1, result1, value2, result2, ..., default_result)`

Compares `expression` to each value in sequence and returns the matching result. The final argument (no matching value) is the default.

```appsheet
SWITCH([Priority],
  "High", 3,
  "Medium", 2,
  "Low", 1,
  0
)
```

**When to use SWITCH over IFS:** When checking one field against a list of exact values (equality only). IFS is needed when conditions involve ranges, inequalities, or multiple fields.

---

## 3. Named Patterns

### Pattern 1: Simple Status Label
Map a status field to a display label.

```appsheet
IF([StatusField] = "ActiveValue", "Display Label A", "Display Label B")
```

---

### Pattern 2: Multi-Branch with IFS
Assign a category based on a numeric range.

```appsheet
IFS(
  [Field] = "Value1", 1,
  [Field] = "Value2", 2,
  [Field] = "Value3", 3,
  TRUE, 0
)
```

---

### Pattern 3: Nested IF (Two-Level Decision)
Use when you need different behavior across two independent conditions.

```appsheet
IF(
  [Condition1] = "Value1",
  [Result1],
  IF(
    [Condition2] = "Value2",
    [Result2],
    [DefaultResult]
  )
)
```

**Prefer IFS** when nesting would go 3+ levels deep — it is more readable.

---

### Pattern 4: Conditional Date Stamp
Set a date field when a status condition is met, blank otherwise.

```appsheet
IF([StatusField] IN({"CompleteValue", "ClosedValue"}), TODAY(), "")
```

---

### Pattern 5: SWITCH for Enum Mapping
Map one enum to another (e.g., priority string to a numeric sort weight).

```appsheet
SWITCH([PriorityField],
  "High", 3,
  "Medium", 2,
  "Low", 1,
  0
)
```

---

### Pattern 6: Conditional Concatenation
Include a field in a display string only when it has a value.

```appsheet
[Field1] & IF(ISBLANK([OptionalField]), "", " - " & [OptionalField])
```

---

### Pattern 7: Role-Based Default
Return different default values based on the current user's role.

```appsheet
IF(
  LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin",
  "AdminDefaultValue",
  "StandardDefaultValue"
)
```

---

## 4. Constraints & Gotchas

- **Both branches of IF are evaluated** — AppSheet evaluates both `value_if_true` and `value_if_false` even when the condition is FALSE. If the false branch contains an expression that errors (e.g., division by zero), wrap it in an IFERROR or add a guard condition
- **IFS requires at least one TRUE condition** — always add `TRUE, defaultValue` as the final pair to prevent errors when no condition matches
- **SWITCH is equality-only** — you cannot use `>` or `<` operators inside SWITCH; use IFS for range comparisons
- **Type consistency** — all branches of an IF/IFS/SWITCH must return the same data type (Text, Number, Date, etc.). Mixing types causes unexpected results
- **Blank vs empty string** — `""` is an empty string (Text type), not the same as a blank/null. Use `ISBLANK()` to test for null; use `= ""` to test for empty string

---

## 5. Related Documentation

- [Logical Functions](../logical/LOGICAL.md) — AND, OR, NOT, ISBLANK
- [References & Dereference](../references/REFERENCES_AND_DEREFERENCE.md) — LOOKUP patterns used inside conditions
- [Data Validity & Constraints](../../rules-and-logic/data-validity-constraints/DATA_VALIDITY_AND_CONSTRAINTS.md) — SHOW IF, EDITABLE IF using conditional logic

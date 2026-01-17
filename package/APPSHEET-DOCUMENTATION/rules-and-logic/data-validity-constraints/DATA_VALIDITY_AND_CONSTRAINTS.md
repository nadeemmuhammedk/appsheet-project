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

## 5. Related Column Behaviors
- **Suggested values:** Propose input options without enforcing them.
- **Initial value / App formula:** Auto-populate or compute values as data changes.

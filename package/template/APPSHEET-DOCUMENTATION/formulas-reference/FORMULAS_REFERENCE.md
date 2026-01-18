# AppSheet Formulas Reference

AppSheet expressions are the core logic engine of your application. They are used to calculate values, determine app behavior, filter data, and control UI logic.

## 1. Syntax Overview
AppSheet expressions are very similar to Google Sheets or Excel formulas.

- **Columns:** Enclosed in square brackets, e.g., `[Status]`, `[Employee Name]`.
- **Text:** Enclosed in double quotes, e.g., `"Complete"`, `"High Priority"`.
- **Functions:** Case-insensitive, usually followed by parentheses, e.g., `AND(...)`, `IF(...)`.

### Basic Examples
- **Equality Check:** `[Status] = "Complete"`
- **Arithmetic:** `[Price] * [Quantity]`
- **Concatenation:** `CONCATENATE([First Name], " ", [Last Name])`

## 2. Expression Categories

### Conditional
Used for logic flow (If/Then/Else).
- `IF(condition, value_if_true, value_if_false)`
- `IFS(condition1, value1, condition2, value2, ...)`
- `SWITCH(expression, value1, result1, value2, result2, ..., default_result)`

### Logical
Used to combine multiple conditions.
- `AND(condition1, condition2, ...)`: Returns true if ALL are true.
- `OR(condition1, condition2, ...)`: Returns true if ANY are true.
- `NOT(condition)`: Inverts the result.
- `IN(value, list)`: Checks if a value exists in a list.

### Text
Used for manipulating strings.
- `CONCATENATE(text1, text2, ...)`: Joins text strings.
- `LEFT(text, number)`, `RIGHT(text, number)`, `MID(text, start, length)`
- `LEN(text)`: Returns the length of the string.
- `UPPER(text)`, `LOWER(text)`
- `CONTAINS(text, keyword)`: Returns true if text contains the keyword.

### Math
Standard mathematical operations.
- `SUM(list)`: Adds up values in a list (e.g., a related column).
- `AVERAGE(list)`
- `MAX(list)`, `MIN(list)`
- `ROUND(number)`
- `ABS(number)`

### Date and Time
Used for handling temporal data.
- `TODAY()`: Current date.
- `NOW()`: Current date and time.
- `TIMENOW()`: Current time.
- `WORKDAY(date, days)`: Returns date after N working days.
- `DATEDIF(start, end, unit)`: Calculates difference between dates.

### List
Powerful functions for handling lists of values (often from related tables).
- `LIST(value1, value2, ...)`
- `COUNT(list)`: Returns number of items.
- `SORT(list)`
- `UNIQUE(list)`: Removes duplicates.
- `SELECT(Table[Column], condition)`: **Crucial Function.** Returns a list of values from a column where the condition is true.
  - *Example:* `SELECT(Orders[OrderID], [Status] = "Open")`

### Yes/No
Expressions that return a boolean (True/False). Often used in:
- **Show_If** constraints (hiding columns/views).
- **Valid_If** constraints (data validation).
- **Security Filters**.

### Dereference
Used to access values from a referenced parent record.
- Syntax: `[RefColumn].[TargetColumn]`
- *Example:* `[EmployeeID].[Department]` (Accesses the 'Department' column of the Employee record referenced by 'EmployeeID').

## 3. Common Use Cases

### Data Validation (Valid_If)
Ensure a start date is before an end date:
```appsheet
[StartDate] < [EndDate]
```

### Conditional Visibility (Show_If)
Show a "Reason" text box only if the Status is "Rejected":
```appsheet
[Status] = "Rejected"
```

### Virtual Columns
Calculate a total cost dynamically:
```appsheet
[Price] * (1 + [TaxRate])
```

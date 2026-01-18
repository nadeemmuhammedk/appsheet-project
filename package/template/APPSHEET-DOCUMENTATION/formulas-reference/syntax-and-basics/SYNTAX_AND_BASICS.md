# AppSheet Expression Syntax & Basics

AppSheet expressions are similar to spreadsheet formulas and are used throughout the editor.

## 1. Where Expressions Are Used
- App formulas and initial values.
- Column constraints and virtual columns.
- View, action, and automation settings that accept expressions.

## 2. Core Syntax
- **Columns:** `[Status]`, `[Employee Name]`
- **Text:** "Complete", "High Priority"
- **Numbers:** `10`, `3.14`, `-5`
- **Functions:** `IF(...)`, `AND(...)`, `SELECT(...)`

## 3. Notes
- Expressions are validated for correct type usage (Number, Date, Yes/No, etc.).
- Use parentheses for clarity when combining logic.

## 4. Quick Examples
- `[Status] = "Complete"`
- `AND([Status] = "Complete", [Quantity] > 5)`
- `[Price] * [Quantity]`

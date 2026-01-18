# AppSheet Logical Functions

Logical functions combine Yes/No expressions.

## 1. Common Functions
- `AND(condition1, condition2, ...)`
- `OR(condition1, condition2, ...)`
- `NOT(condition)`
- `IN(value, list)`

## 2. Examples
- `AND([Status] = "Complete", [Quantity] > 5)`
- `OR([Priority] = "High", [Due Date] < TODAY())`
- `NOT([Is Active])`
- `IN([Dept], LIST("Sales", "Ops"))`

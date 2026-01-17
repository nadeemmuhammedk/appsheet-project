# AppSheet Conditional Functions

Conditional functions choose between results based on expressions.

## 1. Common Functions
- `IF(condition, value_if_true, value_if_false)`
- `IFS(condition1, value1, condition2, value2, ...)`
- `SWITCH(expression, value1, result1, value2, result2, ..., default_result)`

## 2. Examples
- `IF([Status] = "Complete", "Done", "Open")`
- `IFS([Score] >= 90, "A", [Score] >= 80, "B", TRUE, "C")`
- `SWITCH([Priority], "High", 3, "Medium", 2, "Low", 1, 0)`

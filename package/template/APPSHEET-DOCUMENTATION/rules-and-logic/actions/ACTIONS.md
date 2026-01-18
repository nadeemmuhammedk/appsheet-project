# AppSheet Actions Reference

Actions are single, declarative operations that change data or navigate the user.

## 1. Where to Configure
- **Editor path:** Behavior > Actions.
- Many default behaviors are system-created actions and can be customized.

## 2. Action Categories
- **Data change actions:** Update data in the current row or related tables.
  - Set column values in the current row.
  - Add a new row to another table.
  - Delete the current row.
- **Navigation actions:** Move the user to a view or external destination.
  - Go to another view within the app.
  - Go to a website.
  - Open a file.
- **Grouped actions:** Combine multiple actions into a single button.

## 3. How Actions Run
- Usually triggered by user interaction (tap/click).
- Can also be invoked by automation processes.
- Composite actions can apply multiple steps to one or more rows.

## 4. Example Navigation Expressions
- `LINKTOVIEW("All Students")`
- `LINKTOROW([StudentID], "Student Detail")`
- `LINKTOFORM("New Order", "CustomerID", [CustomerID])`

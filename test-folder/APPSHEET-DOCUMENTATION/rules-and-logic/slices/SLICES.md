# AppSheet Slices Reference

Slices are virtual tables that filter and shape data without changing the source table.

## 1. Where to Configure
- **Editor path:** Data > Slices.
- **Output:** A slice can be used anywhere a table is used (views, actions, refs).

## 2. Core Settings
- **Row filter condition:** Expression that decides which rows are included.
- **Column selection:** Choose which columns to expose.
- **Actions:** Limit which actions are available in the slice.

## 3. Use Cases
- "My Tasks" filtered by user.
- "Overdue Orders" filtered by date.
- "Pending Approvals" filtered by status.

## 4. Example Slice Filter
```
SWITCH(
  USERSETTINGS("Search Method"),
  "Type", [Type ID] = USERSETTINGS("Type"),
  "Full Dessert List", [Dessert ID] = USERSETTINGS("Dessert"),
  FALSE
)
```

## 5. Slices and Security Filters
- Slices hide data from the UI, but users may still sync data unless you use a security filter.
- Use security filters to prevent data from downloading to the device.

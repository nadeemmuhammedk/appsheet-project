# AppSheet Table View Reference

**View Type:** Table
**Purpose:** Displays multiple records in a compact, spreadsheet-like grid. Best for data density and comparing values across many rows.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Table
- **Position:** `first` / `next` / `middle` / `later` / `last` / `menu` / `ref`. `menu` puts the view in the main navigation menu; `ref` keeps it out of the menu, reached only by reference (an action, a Ref column popup, or another view); the others position it relative to other views sharing the same menu entry.

## 2. View Options
- **Sort by:** Select one or more columns to sort the data (Ascending/Descending).
- **Group by:** Select one or more columns to group rows. Group headers will be displayed.
  - *Group aggregate:* (Sum, Count, Average, Min, Max) to display in the group header.
- **Column order:**
  - *Automatic:* Shows all eligible columns in spreadsheet order.
  - *Custom:* Manually select and order specific columns.
- **Column width:**
  - *Automatic:* AppSheet decides width based on content.
  - *Narrow / Wide / etc.:* (If applicable in specific contexts, though often automatic in Table view).
- **Freeze column:** (Preview Feature) Freeze the first column so it stays visible while scrolling horizontally.
- **Show column headers:** Toggle to show/hide the header row.

## 3. Display
- **Icon:** Select an icon for the navigation bar/menu.
- **Display name:** Text to show in the app header/navigation (can be a formula).
- **Show if:** Expression to conditionally show/hide the entire view.
  - *Example:* `USERROLE() = "Admin"`

## 4. Behavior
- **Row Selected:** Action to take when a user clicks a row.
  - *Auto assign:* Usually opens the Detail view.
  - *Edit:* Opens the Form view directly.
  - *Delete:* Deletes the row immediately (use with caution).
  - *Custom Action:* Run a specific action.

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

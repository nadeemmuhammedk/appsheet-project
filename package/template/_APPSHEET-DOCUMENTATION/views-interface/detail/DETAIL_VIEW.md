# AppSheet Detail View Reference

**View Type:** Detail
**Purpose:** Displays a single record with all or selected columns in a read-only layout.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Detail
- **Position:** `first` / `next` / `middle` / `later` / `last` / `menu` / `ref`. `menu` puts the view in the main navigation menu; `ref` keeps it out of the menu, reached only by reference (an action, a Ref column popup, or another view); the others position it relative to other views sharing the same menu entry.

## 2. View Options
- **Column order:**
  - *Automatic:* Shows all eligible columns in spreadsheet order.
  - *Custom:* Manually select and order specific columns.
- **Show section headers:** Toggle if sections are defined.
- **Quick edit columns:** Columns that allow inline edits (if enabled).

## 3. Display
- **Icon:** Select an icon for the navigation bar/menu.
- **Display name:** Text to show in the app header/navigation (can be a formula).
- **Show if:** Expression to conditionally show/hide the entire view.
  - *Example:* `USERROLE() = "Admin"`

## 4. Behavior
- **Row Selected:** Action to take when a user opens the detail view (if applicable).
  - *Auto assign:* Usually no action or stays in detail.
  - *Edit:* Opens the Form view directly.
  - *Delete:* Deletes the row immediately (use with caution).
  - *Custom Action:* Run a specific action.

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

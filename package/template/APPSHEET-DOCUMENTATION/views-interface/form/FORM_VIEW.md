# AppSheet Form View Reference

**View Type:** Form
**Purpose:** Captures data for adding or editing a single record.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Form
- **Position:** Primary, Menu, or Reference.

## 2. View Options
- **Column order:**
  - *Automatic:* Shows all eligible columns in spreadsheet order.
  - *Custom:* Manually select and order specific columns.
- **Show action bar:** Toggle form action buttons (Save, Cancel).
- **Auto-save:** Save form values automatically (if enabled).
- **Auto-reopen:** Reopen the form for another entry after save (if enabled).
- **Grouping:** Show columns in sections (if configured).
- **Reset on edit:** Reset values when editing (if enabled).

## 3. Display
- **Icon:** Select an icon for the navigation bar/menu.
- **Display name:** Text to show in the app header/navigation (can be a formula).
- **Show if:** Expression to conditionally show/hide the entire view.
  - *Example:* `USERROLE() = "Admin"`

## 4. Behavior
- **Form Saved:** Action to run after save.
- **Form Canceled:** Action to run after cancel.
- **Row Selected:** Action to take when a user opens the form (if applicable).
  - *Auto assign:* Usually no action or stays in form.
  - *Edit:* Opens the Form view directly.
  - *Delete:* Deletes the row immediately (use with caution).
  - *Custom Action:* Run a specific action.

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

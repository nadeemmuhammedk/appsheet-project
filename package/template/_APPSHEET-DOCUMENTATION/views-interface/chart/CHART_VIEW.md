# AppSheet Chart View Reference

**View Type:** Chart
**Purpose:** Visualizes data using charts such as histogram, bar, pie, or line.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Chart
- **Position:** `first` / `next` / `middle` / `later` / `last` / `menu` / `ref`. `menu` puts the view in the main navigation menu; `ref` keeps it out of the menu, reached only by reference (an action, a Ref column popup, or another view); the others position it relative to other views sharing the same menu entry.

## 2. View Options
- **Chart type:** Histogram, bar, line, pie (or other supported types).
- **Chart columns:** Columns used for grouping and series.
- **Group aggregate:** Count, Sum, Average, Min, or Max.
- **Chart colors:** Palette configuration (if supported in the view).
- **Trend line:** Toggle if applicable.
- **Show legend:** Toggle legend visibility (if applicable).

## 3. Display
- **Icon:** Select an icon for the navigation bar/menu.
- **Display name:** Text to show in the app header/navigation (can be a formula).
- **Show if:** Expression to conditionally show/hide the entire view.
  - *Example:* `USERROLE() = "Admin"`

## 4. Behavior
- **Row Selected:** Action to take when a user taps a data point (if supported).
  - *Auto assign:* Usually opens the Detail view.
  - *Edit:* Opens the Form view directly.
  - *Delete:* Deletes the row immediately (use with caution).
  - *Custom Action:* Run a specific action.

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

# AppSheet Map View Reference

**View Type:** Map
**Purpose:** Displays records as pins on a map using Address or LatLong columns.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Map
- **Position:** Primary, Menu, or Reference.

## 2. View Options
- **Location column:** Address or LatLong column used for pin placement.
- **Label:** Column shown in the pin label (if supported).
- **Color by:** Column to color-code pins (if supported).
- **Sort by:** Sort order for records (Ascending/Descending).
- **Group by:** Group records by a column (optional).
  - *Group aggregate:* (Sum, Count, Average, Min, Max) to display in the group header.

## 3. Display
- **Icon:** Select an icon for the navigation bar/menu.
- **Display name:** Text to show in the app header/navigation (can be a formula).
- **Show if:** Expression to conditionally show/hide the entire view.
  - *Example:* `USERROLE() = "Admin"`

## 4. Behavior
- **Row Selected:** Action to take when a user taps a pin.
  - *Auto assign:* Usually opens the Detail view.
  - *Edit:* Opens the Form view directly.
  - *Delete:* Deletes the row immediately (use with caution).
  - *Custom Action:* Run a specific action.

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

# AppSheet Calendar View Reference

**View Type:** Calendar
**Purpose:** Displays records on a calendar (day, week, month) using Date or DateTime columns.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Calendar
- **Position:** `first` / `next` / `middle` / `later` / `last` / `menu` / `ref`. `menu` puts the view in the main navigation menu; `ref` keeps it out of the menu, reached only by reference (an action, a Ref column popup, or another view); the others position it relative to other views sharing the same menu entry.

## 2. View Options
- **Start date:** Column used for the event start (Date/DateTime).
- **End date:** Column used for the event end (Date/DateTime), if applicable.
- **Color by:** Column to color-code events (if supported).
- **Event title:** Column shown as the event label.
- **Default view:** Day, Week, or Month.
- **Sort by:** Sort order for records (Ascending/Descending).

## 3. Display
- **Icon:** Select an icon for the navigation bar/menu.
- **Display name:** Text to show in the app header/navigation (can be a formula).
- **Show if:** Expression to conditionally show/hide the entire view.
  - *Example:* `USERROLE() = "Admin"`

## 4. Behavior
- **Event Selected:** Action to take when a user taps an event.
  - *Auto assign:* Usually opens the Detail view.
  - *Edit:* Opens the Form view directly.
  - *Delete:* Deletes the row immediately (use with caution).
  - *Custom Action:* Run a specific action.

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

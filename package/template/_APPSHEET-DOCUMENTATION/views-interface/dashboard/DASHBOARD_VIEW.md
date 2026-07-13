# AppSheet Dashboard View Reference

**View Type:** Dashboard
**Purpose:** Combines multiple views into a single page for quick analysis.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **View Type:** Dashboard
- **Position:** `first` / `next` / `middle` / `later` / `last` / `menu` / `ref`. `menu` puts the view in the main navigation menu; `ref` keeps it out of the menu, reached only by reference (an action, a Ref column popup, or another view); the others position it relative to other views sharing the same menu entry.

## 2. View Options
- **Views:** List of child views included in the dashboard.
- **Size:** Layout size per view (Small/Medium/Large) where applicable.
- **Use tabs in mobile view:** Toggle to show tabs on mobile.
- **Interactive mode:** Toggle to allow drill-down interaction.

## 3. Display
- **Icon:** Select an icon for the navigation bar/menu.
- **Display name:** Text to show in the app header/navigation (can be a formula).
- **Show if:** Expression to conditionally show/hide the entire view.
  - *Example:* `USERROLE() = "Admin"`

## 4. Behavior
- **Interactive mode:** When enabled, users can drill into child views.

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

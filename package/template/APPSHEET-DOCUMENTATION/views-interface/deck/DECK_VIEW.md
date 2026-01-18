# AppSheet Deck View Reference

**View Type:** Deck
**Purpose:** Displays records as cards with primary/secondary headers and optional summary. Optimized for mobile browsing.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Deck
- **Position:** Primary, Menu, or Reference.

## 2. View Options
- **Main image:** Column used for the card image (or none).
- **Image shape:** Square or other supported shapes.
- **Primary header:** Main title text shown on each card.
- **Secondary header:** Subheader text shown under the primary header.
- **Summary column:** Right-aligned value for quick scanning.
- **Group by:** Group cards by a column.
  - *Group aggregate:* (Sum, Count, Average, Min, Max) to display in the group header.
- **Sort by:** Sort order for cards (Ascending/Descending).
- **Inline actions:** Edit, Delete, or custom actions shown on the card.

## 3. Display
- **Icon:** Select an icon for the navigation bar/menu.
- **Display name:** Text to show in the app header/navigation (can be a formula).
- **Show if:** Expression to conditionally show/hide the entire view.
  - *Example:* `USERROLE() = "Admin"`

## 4. Behavior
- **Row Selected:** Action to take when a user opens a card.
  - *Auto assign:* Usually opens the Detail view.
  - *Edit:* Opens the Form view directly.
  - *Delete:* Deletes the row immediately (use with caution).
  - *Custom Action:* Run a specific action.
- **Row Swiped Left/Right:** Optional swipe actions.

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

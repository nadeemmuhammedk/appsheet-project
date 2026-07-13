# AppSheet Gallery View Reference

**View Type:** Gallery
**Purpose:** Displays records in a visual grid, optimized for images.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Gallery
- **Position:** `first` / `next` / `middle` / `later` / `last` / `menu` / `ref`. `menu` puts the view in the main navigation menu; `ref` keeps it out of the menu, reached only by reference (an action, a Ref column popup, or another view); the others position it relative to other views sharing the same menu entry.

## 2. View Options
- **Image:** Column used for the card image.
- **Image size:** Size of the image tiles.
- **Primary header:** Main title text shown on each card.
- **Secondary header:** Subheader text shown under the primary header.
- **Sort by:** Sort order for cards (Ascending/Descending).
- **Group by:** Group cards by a column (optional).
  - *Group aggregate:* (Sum, Count, Average, Min, Max) to display in the group header.
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

## 5. Documentation
- **Description:** Internal notes about this view's purpose.

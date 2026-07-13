# AppSheet Deck View Reference

**View Type:** Deck
**Purpose:** Displays records as cards with primary/secondary headers and optional summary. Optimized for mobile browsing.

## 1. General Settings
- **View Name:** Unique internal name for the view.
- **For this data:** Select the Table or Slice.
- **View Type:** Deck
- **Position:** `first` / `next` / `middle` / `later` / `last` / `menu` / `ref`. `menu` puts the view in the main navigation menu; `ref` keeps it out of the menu, reached only by reference (an action, a Ref column popup, or another view); the others position it relative to other views sharing the same menu entry.

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

## 5. Configuration Patterns

### Pattern 1: Grouped by Category
Use when: Records should be grouped into sections by a category field, with a count shown per group.

```appsheet
View Type: Deck
For this data: [Table Name]

View Options:
  Group by: [Category Column] Ascending
  Group aggregate: COUNT
  Sort by: [Date Column] Descending
  Primary header: [Main Field]
  Secondary header: [Status Field]
  Summary column: [Count or Amount Field]
```

### Pattern 2: Ungrouped with Sort
Use when: All records shown in a flat list, ordered by priority or date.

```appsheet
View Type: Deck
For this data: [Table Name]

View Options:
  Sort by: [Priority Column] Ascending
  Primary header: [Name Field]
  Secondary header: [Description or Status Field]
```

---

## 6. Documentation
- **Description:** Internal notes about this view's purpose.

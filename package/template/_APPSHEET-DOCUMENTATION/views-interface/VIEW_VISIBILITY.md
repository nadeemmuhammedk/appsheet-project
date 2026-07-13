# View Visibility (SHOW IF) Patterns

Every view in AppSheet has a **SHOW IF** expression that controls whether the view appears in the navigation bar or menu. If the expression is FALSE, the view is completely hidden from that user.

## 1. Where to Configure

- **Editor path:** UX > Views > [View Name] > Show if
- Accepts any Yes/No expression
- Evaluated per user at sync time

---

## 2. Named Patterns

### Pattern 1: Always Visible
The view is shown to all users unconditionally.

```appsheet
SHOW IF: TRUE
```

---

### Pattern 2: Owner Only
The view is shown only to the app owner (admin access) or users with a specific owner-level role.

```appsheet
SHOW IF: OR(
  USEREMAIL() = CONTEXT("OwnerEmail"),
  LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin"
)
```

---

### Pattern 3: Specific Roles Only
The view is shown only to users whose role matches one of the allowed values.

```appsheet
SHOW IF: LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") IN({"Role1", "Role2"})
```

---

### Pattern 4: Based on User Attribute
The view is shown only to users whose profile has a specific attribute value (e.g., only users assigned to a particular division or department).

```appsheet
SHOW IF: LOOKUP(USEREMAIL(), "users", "UserEmail", "AttributeColumn") = "ExpectedValue"
```

---

## 3. Constraints & Gotchas

- **SHOW IF hides the view in navigation only** — it does not restrict data access. If a user obtains a deep link to a hidden view, they may still be able to reach it. Combine with security filters and table permissions for actual data protection.
- **`CONTEXT("OwnerEmail")`** returns the app owner's email — always include this as an OR condition to avoid accidentally locking the owner out of their own views
- **Performance:** SHOW IF runs per user per sync — keep expressions simple (avoid SELECT)
- **Hidden views are still accessible via LINKTOVIEW()** — a hidden navigation view can still be targeted by actions

---

## 4. Related Documentation

- [Security Filters](../rules-and-logic/security-filters/SECURITY_FILTERS.md) — row-level data visibility
- [Table Security](../tables-data-schema/table-settings/TABLE_SECURITY.md) — UPDATES/ADDS/DELETES permissions
- [Actions](../rules-and-logic/actions/ACTIONS.md) — SHOW IF on action buttons

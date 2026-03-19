# AppSheet Security Filters Reference

Security filters restrict which rows are downloaded to a user's device. If the expression is `TRUE`, the row syncs; if `FALSE`, the row never reaches the device.

## 1. Where to Configure

- **Editor path:** Security > Security Filters > [Table Name]
- Add a Yes/No expression per table
- Evaluated server-side before sync — rows that fail are never sent to the client

## 2. Why Use Security Filters

- Prevents sensitive data from syncing to unauthorized devices
- Reduces sync payload size and improves performance
- Works independently of view-level visibility (rows excluded here are completely invisible to the user)

**Important:** Security filters control data visibility, not edit permissions. Use table UPDATES/ADDS/DELETES for permission control. See [Table Security](../../tables-data-schema/table-settings/TABLE_SECURITY.md).

---

## 3. Basic Row Filter Patterns

### Pattern 1: Filter by Owner Field
Use when: Each row has an owner column and users should only see their own records.

```appsheet
Security Filter (row-level):
  [OwnerEmailColumn] = USEREMAIL()
```

---

### Pattern 2: Owner + Admin Override
Use when: Owners see their rows, admins see all rows.

```appsheet
Security Filter (row-level):
  OR(
    USEREMAIL() = CONTEXT("OwnerEmail"),
    [OwnerField] = USEREMAIL()
  )
```

---

### Pattern 3: Filter by Lookup Field (Branch, Region, Department)
Use when: Users should only see records that match their assigned attribute (e.g., same branch, region, or department).

```appsheet
Security Filter (row-level):
  OR(
    USEREMAIL() = CONTEXT("OwnerEmail"),
    LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin",
    [RecordFilterField] = LOOKUP(USEREMAIL(), "users", "UserEmail", "FilterField")
  )
```

**Example — Branch-based visibility:**
```appsheet
OR(
  USEREMAIL() = CONTEXT("OwnerEmail"),
  LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin",
  [Branch] = LOOKUP(USEREMAIL(), "users", "UserEmail", "Branch")
)
```

---

### Pattern 4: Role-Based Visibility (Specific Roles Only)
Use when: Only users with certain roles should see rows in this table at all.

```appsheet
Security Filter (row-level):
  OR(
    USEREMAIL() = CONTEXT("OwnerEmail"),
    LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") IN({"Role1", "Role2"})
  )
```

---

### Pattern 5: Conditional Visibility Based on Record State
Use when: Some users only see records that are in a specific state (e.g., sales reps only see incomplete/open records).

```appsheet
Security Filter (row-level):
  OR(
    USEREMAIL() = CONTEXT("OwnerEmail"),
    LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin",
    AND(
      LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "UserRole",
      ISBLANK([CompletionField])
    )
  )
```

---

### Pattern 6: Cross-Table Reference Filter
Use when: The row's visibility depends on a field in a parent/related table rather than a field on the row itself.

```appsheet
Security Filter (row-level):
  OR(
    USEREMAIL() = CONTEXT("OwnerEmail"),
    [RefColumn].[OwnerField] = USEREMAIL()
  )
```

---

## 4. Constraints & Gotchas

- **Security filters are evaluated server-side** — they are not bypassable from the client
- **`CONTEXT("OwnerEmail")`** returns the AppSheet app owner's email — always include this OR clause to prevent locking the owner out of their own app
- **Security filters apply at sync time**, not at view time — users with cached data may briefly see filtered-out rows before a sync completes
- **Performance:** Keep security filter expressions simple — complex SELECT/LOOKUP chains on large tables can slow sync times significantly
- **Security filters do not replace view visibility** — a user might still see a row in a view even if they can't edit it; combine with table security formulas for full control
- **Available on AppSheet Core and higher plans**

---

## 5. Common Combinations

### Full Multi-Level Access Pattern
Owner sees all; managers see their region; reps see only their own records:

```appsheet
OR(
  USEREMAIL() = CONTEXT("OwnerEmail"),
  LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin",
  AND(
    LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Manager",
    [Region] = LOOKUP(USEREMAIL(), "users", "UserEmail", "Region")
  ),
  [AssignedTo] = USEREMAIL()
)
```

---

## 6. Related Documentation

- [Table Security](../../tables-data-schema/table-settings/TABLE_SECURITY.md) — UPDATES/ADDS/DELETES permissions
- [Row Filtering](../../tables-data-schema/table-settings/ROW_FILTERING.md) — row filter formula (separate from security filter)
- [User Lookup Patterns](../../formulas-reference/references/REFERENCES_AND_DEREFERENCE.md) — LOOKUP(USEREMAIL(), ...) patterns

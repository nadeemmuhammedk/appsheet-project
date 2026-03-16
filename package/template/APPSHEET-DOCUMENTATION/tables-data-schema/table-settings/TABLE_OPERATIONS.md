# Table Operations

Table operations settings control whether users can create, read, update, and delete records.

---

## Quick Reference Template

**Location in AppSheet:** Data → [Table] → Table Settings → Are updates allowed?

### Mode 1: Simple Toggles (same permission for all users)
```appsheet
Updates Enabled: Yes | No
Adds Enabled:    Yes | No
Deletes Enabled: Yes | No
```

### Mode 2: Expression (dynamic, role-based)
```appsheet
Are updates allowed?:
  IF(
    [who gets more access],
    "[higher permission]",
    "[lower permission]"        # fallback for everyone else
  )
```

**All valid permission strings:**

| String | Add | Update | Delete |
|---|---|---|---|
| "ALL_CHANGES" | ✓ | ✓ | ✓ |
| "ADDS_ONLY" | ✓ | | |
| "ADDS_AND_UPDATES" | ✓ | ✓ | |
| "ADDS_AND_DELETES" | ✓ | | ✓ |
| "UPDATES_ONLY" | | ✓ | |
| "UPDATES_AND_DELETES" | | ✓ | ✓ |
| "DELETES_ONLY" | | | ✓ |
| "READ_ONLY" | | | |

**Common condition functions:**
- `USEREMAIL()` — logged-in user's email
- `CONTEXT("OwnerEmail")` — app creator's email (bootstrap-safe, works before users sheet has data)
- `LOOKUP(USEREMAIL(), "users", "UserEmail", "Role")` — role from custom users table
- `USERROLE()` — role from AppSheet's built-in user management

---

## 1. Operations Settings

**Location:** Data > Tables > [Table Name] > Are updates allowed?

| Setting | Purpose | Default |
|---------|---------|---------|
| **Updates Enabled** | Allow editing existing records | Yes |
| **Adds Enabled** | Allow creating new records | Yes |
| **Deletes Enabled** | Allow deleting records | Yes |

**How It Works:**
- Master switches for CRUD operations
- Must be enabled for security formulas to apply
- No = operation blocked for everyone
- Yes = operation allowed (subject to security formulas)

---

## 2. Updates Enabled

**Controls:** Record editing

**Values:**
- **Yes:** Users can edit existing records (subject to UPDATES formula)
- **No:** Nobody can edit records (read-only table)

**Use Cases:**
```appsheet
# Editable table
Updates Enabled: Yes

# Read-only reference data
Updates Enabled: No

# Append-only log
Updates Enabled: No
Adds Enabled: Yes
```

---

## 3. Adds Enabled

**Controls:** Record creation

**Values:**
- **Yes:** Users can add new records (subject to ADDS formula)
- **No:** Nobody can add records

**Use Cases:**
```appsheet
# Normal operation
Adds Enabled: Yes

# Closed data set (no new records)
Adds Enabled: No

# Import-only data
Adds Enabled: No
```

---

## 4. Deletes Enabled

**Controls:** Record deletion

**Values:**
- **Yes:** Users can delete records (subject to DELETES formula)
- **No:** Nobody can delete records

**Use Cases:**
```appsheet
# Full access
Deletes Enabled: Yes

# Protect historical data
Deletes Enabled: No

# Soft deletes only (use IsDeleted flag instead)
Deletes Enabled: No
```

---

## 5. Common Patterns

### Full Access
```appsheet
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: Yes
```

### Read-Only
```appsheet
Updates Enabled: No
Adds Enabled: No
Deletes Enabled: No
```

### Append-Only Log
```appsheet
Updates Enabled: No
Adds Enabled: Yes
Deletes Enabled: No
```

### No Delete Protection
```appsheet
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: No
```

### Import-Only
```appsheet
Updates Enabled: No
Adds Enabled: No
Deletes Enabled: No
# Data managed externally
```

---

## 6. Combining Toggles with Expression-Based Control

You can use either:
- **Simple toggles** (Yes/No) for static control
- **Expression-based control** for conditional/role-based permissions

Example using expression-based control:
```appsheet
# Expression-based control (conditional)
Are updates allowed?: IF(
  USERROLE() = "Admin",
  "ALL_CHANGES",
  "ADDS_ONLY"
)

# Result:
# - Admins can add, edit, delete
# - Others can add only
```

---

## 7. Expression-Based Operations Control

**Location:** Data > Tables > [Table Name] > Are updates allowed?

Instead of using checkboxes, you can enter an expression that returns one of these permission levels:

**All Permission Levels (from official documentation):**
- **"ALL_CHANGES"** - Can add, update, and delete records
- **"ADDS_ONLY"** - Can add new records only
- **"ADDS_AND_UPDATES"** - Can add and update records (no delete)
- **"ADDS_AND_DELETES"** - Can add and delete records (no update)
- **"UPDATES_ONLY"** - Can update existing records only
- **"UPDATES_AND_DELETES"** - Can update and delete records (no add)
- **"DELETES_ONLY"** - Can delete records only
- **"READ_ONLY"** - Can only view records (no modifications)

### When to Use Expressions vs Checkboxes

**Use Checkboxes When:**
- Simple on/off for all users
- Static operation permissions
- Same permission for everyone

**Use Expressions When:**
- Conditional control based on user
- Role-based operation toggling
- Different users need different permission levels
- Dynamic permission logic

### Basic Pattern

```appsheet
IF(
  condition,
  "ALL_CHANGES",
  "READ_ONLY"
)
```

### Hierarchical Permissions Pattern

```appsheet
IF(
  [role condition 1],
  "ALL_CHANGES",
  IF(
    [role condition 2],
    "UPDATES_ONLY",
    "READ_ONLY"
  )
)
```

### Examples

#### Admin-Only Modifications
```appsheet
IF(
  USEREMAIL() = "admin@example.com",
  "ALL_CHANGES",
  "READ_ONLY"
)

# Result:
# - Admin can add, edit, delete
# - All other users: read-only
```

#### Role-Based Control
```appsheet
IF(
  IN(USEREMAIL(), SELECT(Managers[Email Address], TRUE)),
  "ALL_CHANGES",
  "READ_ONLY"
)

# Result:
# - Managers can add, edit, delete
# - Non-managers: read-only
```

#### App Owner Control
```appsheet
IF(
  USEREMAIL() = CONTEXT("OwnerEmail"),
  "ALL_CHANGES",
  "READ_ONLY"
)

# Result:
# - App creator/owner: full access
# - All users: read-only
```

#### Multiple Role Check
```appsheet
IF(
  OR(
    USERROLE() = "Admin",
    USERROLE() = "Manager"
  ),
  "ALL_CHANGES",
  "READ_ONLY"
)

# Result:
# - Admins and Managers: full access
# - Other roles: read-only
```

### Using Different Permission Levels

#### Staff Can Update Only, Manager Can Do Everything
```appsheet
IF(
  IN(USEREMAIL(), SELECT(Managers[Email], TRUE)),
  "ALL_CHANGES",
  IF(
    IN(USEREMAIL(), SELECT(Staff[Email], TRUE)),
    "UPDATES_ONLY",
    "READ_ONLY"
  )
)

# Result:
# - Managers: Can add, edit, delete
# - Staff: Can edit existing records only
# - Others: Read-only
```

#### Customers Can Add Only
```appsheet
IF(
  USERROLE() = "Admin",
  "ALL_CHANGES",
  "ADDS_ONLY"
)

# Result:
# - Admin: Full access
# - Customers: Can add new records only (cannot edit or delete)
```

### Control Method Comparison

| Control Method | Returns | Use Case |
|----------------|---------|----------|
| **Checkboxes** | Yes or No | Simple static on/off for all users |
| **Expression** | 8 permission levels (ALL_CHANGES, ADDS_ONLY, ADDS_AND_UPDATES, ADDS_AND_DELETES, UPDATES_ONLY, UPDATES_AND_DELETES, DELETES_ONLY, READ_ONLY) | Conditional/role-based permissions with granular control |

### Common Patterns

#### Admin-Only Table
```appsheet
IF(USERROLE() = "Admin", "ALL_CHANGES", "READ_ONLY")
```

#### Manager Access Table
```appsheet
IF(
  IN(USEREMAIL(), SELECT(Managers[Email], TRUE)),
  "ALL_CHANGES",
  "READ_ONLY"
)
```

#### Multi-Role Access
```appsheet
IF(
  IN(USERROLE(), LIST("Admin", "Manager", "Editor")),
  "ALL_CHANGES",
  "READ_ONLY"
)
```

#### App Creator Only
```appsheet
IF(USEREMAIL() = CONTEXT("OwnerEmail"), "ALL_CHANGES", "READ_ONLY")
```

---

**Related Documentation:**
- [Table Settings Overview](TABLE_SETTINGS_OVERVIEW.md)
- [Table Security](TABLE_SECURITY.md)

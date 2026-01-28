# Table Operations

Table operations settings control whether users can create, read, update, and delete records.

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

## 6. With Security Formulas

```appsheet
# Enable operations
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: Yes

# Then restrict with formulas
UPDATES: USERROLE() = "Admin"
ADDS: TRUE
DELETES: USERROLE() = "Admin"

# Result: Anyone can add, only admins can edit/delete
```

---

## 7. Expression-Based Operations Control

**Location:** Data > Tables > [Table Name] > Are updates allowed?

Instead of using checkboxes, you can enter an expression that returns:
- **"ALL_CHANGES"** - Enable Updates, Adds, and Deletes
- **"READ_ONLY"** - Disable all modifications

### When to Use Expressions vs Checkboxes

**Use Checkboxes When:**
- Simple on/off for all users
- Static operation permissions

**Use Expressions When:**
- Conditional control based on user
- Role-based operation toggling
- Dynamic permission logic

### Basic Pattern

```appsheet
IF(
  condition,
  "ALL_CHANGES",
  "READ_ONLY"
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
  ISAPPOWNER(),
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

### Combining with Security Formulas

Expression-based operations work with security formulas (UPDATES/ADDS/DELETES):

```appsheet
# Are updates allowed? (Expression)
IF(USERROLE() = "Manager", "ALL_CHANGES", "READ_ONLY")

# Security formulas (if needed)
UPDATES: [Owner] = USEREMAIL()
ADDS: TRUE
DELETES: [Status] = "Draft"

# Result for Managers:
# - Can add any record
# - Can only edit records they own
# - Can only delete Draft records

# Result for non-Managers:
# - READ_ONLY (cannot add, edit, or delete anything)
```

### Expression vs Security Formula Control

| Control Method | Returns | Controls | Use Case |
|----------------|---------|----------|----------|
| **Expression** | "ALL_CHANGES" or "READ_ONLY" | Enable/disable all operations | User or role-based operation toggling |
| **Security Formula** | TRUE or FALSE | Per-operation, per-record | Granular control (who can do what to which records) |
| **Checkboxes** | Yes or No | Enable/disable operations | Simple static on/off |

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
IF(ISAPPOWNER(), "ALL_CHANGES", "READ_ONLY")
```

---

**Related Documentation:**
- [Table Settings Overview](TABLE_SETTINGS_OVERVIEW.md)
- [Table Security](TABLE_SECURITY.md)

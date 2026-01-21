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

**Related Documentation:**
- [Table Settings Overview](TABLE_SETTINGS_OVERVIEW.md)
- [Table Security](TABLE_SECURITY.md)

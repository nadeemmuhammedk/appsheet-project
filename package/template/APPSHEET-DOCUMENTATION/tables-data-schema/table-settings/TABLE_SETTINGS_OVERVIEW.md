# Table Settings Overview

Table settings control overall behavior, security, and operations for entire tables in AppSheet.

## 1. What Are Table Settings?

Table settings are global configurations that apply to all records in a table, controlling:
- Who can add, edit, and delete records
- Which records users can see
- Language/localization settings
- Data source connections
- Table behavior and permissions

**Location:** Data > Tables > [Table Name]

---

## 2. Core Table Settings

### Operations Settings
Control basic CRUD (Create, Read, Update, Delete) operations.

| Setting | Purpose | Values |
|---------|---------|--------|
| **Updates Enabled** | Allow record editing | Yes/No |
| **Adds Enabled** | Allow new records | Yes/No |
| **Deletes Enabled** | Allow record deletion | Yes/No |

[See Table Operations →](TABLE_OPERATIONS.md)

### Security Settings
Formula-based permissions for fine-grained control.

| Setting | Purpose | Formula Returns |
|---------|---------|-----------------|
| **Are updates allowed?** | Expression to control operations | See permission levels below |
| **Row filter formula** | Which records visible | TRUE/FALSE |

**Permission Levels (from official documentation):**
- `"ALL_CHANGES"` - Can add, update, and delete records
- `"ADDS_ONLY"` - Can add new records only
- `"ADDS_AND_UPDATES"` - Can add and update records (no delete)
- `"ADDS_AND_DELETES"` - Can add and delete records (no update)
- `"UPDATES_ONLY"` - Can update existing records only
- `"UPDATES_AND_DELETES"` - Can update and delete records (no add)
- `"DELETES_ONLY"` - Can delete records only
- `"READ_ONLY"` - Can only view records (no modifications)

[See Table Operations (Expression-Based Control) →](TABLE_OPERATIONS.md#7-expression-based-operations-control)
[See Table Security →](TABLE_SECURITY.md)
[See Row Filtering →](ROW_FILTERING.md)

### Other Settings
Additional table configurations.

| Setting | Purpose |
|---------|---------|
| **Localization** | Multi-language support |
| **Table name** | Display name for table |
[See Table Localization →](TABLE_LOCALIZATION.md)

---

## 3. Common Configuration Patterns

### Method 1: Simple Toggles (Static Control)

#### Open Access (Default)
```appsheet
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: Yes

Row filter formula: (blank - show all)
```
**Use for:** Internal apps, trusted users, collaborative data

#### Read-Only Table
```appsheet
Updates Enabled: No
Adds Enabled: No
Deletes Enabled: No
```
**Use for:** Reference data, lookup tables, reports

#### No Delete Protection
```appsheet
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: No
```
**Use for:** Historical data, audit logs

### Method 2: Expression-Based Control (Conditional/Role-Based)

#### Admin-Only Modifications
```appsheet
Are updates allowed?: IF(
  USERROLE() = "Admin",
  "ALL_CHANGES",
  "READ_ONLY"
)
```
**Use for:** System tables, configuration data

#### Manager Can Edit, Others Read-Only
```appsheet
Are updates allowed?: IF(
  IN(USEREMAIL(), SELECT(Managers[Email], TRUE)),
  "ALL_CHANGES",
  "READ_ONLY"
)
```
**Use for:** Management-controlled data

#### Hierarchical Permissions (Manager/Staff/Viewer)
```appsheet
Are updates allowed?: IF(
  USERROLE() = "Manager",
  "ALL_CHANGES",
  IF(
    USERROLE() = "Staff",
    "UPDATES_ONLY",
    "READ_ONLY"
  )
)
```
**Use for:** Multi-tier access (Manager > Staff > Viewer)
- Manager: Can add, update, delete
- Staff: Can update only
- Others: Read-only

#### User Ownership Model
```appsheet
Are updates allowed?: IF(
  OR([Owner] = USEREMAIL(), USERROLE() = "Admin"),
  "ALL_CHANGES",
  "READ_ONLY"
)

Row filter formula: OR([Owner] = USEREMAIL(), USERROLE() = "Admin")
```
**Use for:** User-specific data, personal records

---

## 4. Settings Hierarchy

### Layer 1: Operations Enabled (Table Level)
```
Updates Enabled: No
↓
Nobody can edit, regardless of other settings
```

### Layer 2: Security Formulas
```
Updates Enabled: Yes
UPDATES: USERROLE() = "Admin"
↓
Only admins can edit
```

### Layer 3: Row Filtering
```
Row filter formula: [Owner] = USEREMAIL()
↓
Users only see their own records
```

### Layer 4: Column-Level (EDITABLE IF)
```
Column: Amount
EDITABLE IF: [Status] = "Draft"
↓
Further restricts editability
```

**All layers must allow the operation for it to succeed.**

---

## 5. Security Model

### Complete Security Configuration

**Option A: Using Simple Toggles**
```appsheet
# Table: Orders

# Enable operations (simple on/off)
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: No

# Which records are visible
Row filter formula: OR(
  [Owner] = USEREMAIL(),
  [AssignedTo] = USEREMAIL(),
  IN(USERROLE(), LIST("Manager", "Admin"))
)
# Users see: own orders, assigned orders, or all if Manager/Admin
```

**Option B: Using Expression-Based Control**
```appsheet
# Table: Orders

# Who can perform operations (conditional)
Are updates allowed?: IF(
  IN(USERROLE(), LIST("Manager", "Admin")),
  "ALL_CHANGES",
  IF(
    [Owner] = USEREMAIL(),
    "UPDATES_ONLY",
    "READ_ONLY"
  )
)

# Which records are visible
Row filter formula: OR(
  [Owner] = USEREMAIL(),
  [AssignedTo] = USEREMAIL(),
  IN(USERROLE(), LIST("Manager", "Admin"))
)
# Result:
# - Manager/Admin: Can add, update, delete all visible orders
# - Owner: Can update their own orders only
# - Others: Read-only
```

---

## 6. Common Use Cases

### Customer Portal
```appsheet
Table: Customer Data

# Expression-based control
Are updates allowed?: IF(
  [CustomerEmail] = USEREMAIL(),
  "UPDATES_ONLY",
  "READ_ONLY"
)

Row filter formula: [CustomerEmail] = USEREMAIL()
```
**Result:** Customers can update their own data but cannot add/delete records

### Team Collaboration
```appsheet
Table: Projects

# Expression-based control
Are updates allowed?: IF(
  USERROLE() = "Admin",
  "ALL_CHANGES",
  IF(
    [ProjectLead] = USEREMAIL(),
    "ALL_CHANGES",
    IF(
      IN(USEREMAIL(), [TeamMembers]),
      "UPDATES_ONLY",
      "READ_ONLY"
    )
  )
)

Row filter formula: OR(
  IN(USEREMAIL(), [TeamMembers]),
  USERROLE() = "Admin"
)
```
**Result:**
- Admin: Full access
- Project Lead: Can add, update, delete
- Team Members: Can update only
- Others: Read-only

### Audit Log (Append-Only)
```appsheet
Table: Activity Log

# Simple toggle approach
Updates Enabled: No
Adds Enabled: Yes
Deletes Enabled: No

ADDS: TRUE
```

### Reference Data
```appsheet
Table: Product Catalog

Updates Enabled: No
Adds Enabled: No
Deletes Enabled: No

# Everyone can view, nobody can modify
```

---

## 7. Best Practices

### Security
- Always enable operations first (Enabled: Yes)
- Then restrict with security formulas
- Use row filtering to hide sensitive data
- Test with different user roles
- Document security model

### Performance
- Keep security formulas simple
- Avoid complex SELECT in security rules
- Use indexed columns in row filters
- Test with production data size

### User Experience
- Provide clear error messages (via workflows)
- Hide unavailable actions in UI
- Use consistent security patterns
- Consider user expectations

### Maintenance
- Document security rules
- Use consistent patterns across tables
- Review security regularly
- Test after changes

---

## 8. Settings Checklist

**Before Deployment:**
- [ ] Operations enabled appropriately
- [ ] Security formulas defined
- [ ] Row filtering configured
- [ ] Tested with different users
- [ ] Tested all CRUD operations
- [ ] Column-level permissions set
- [ ] Security documented
- [ ] User roles configured

---

## 9. Quick Reference

| Category | Setting | Purpose |
|----------|---------|---------|
| **Operations** | Updates/Adds/Deletes Enabled | Enable/disable operations |
| **Security** | UPDATES/ADDS/DELETES | Who can perform operations |
| **Visibility** | Row filter formula | Which records visible |
| **Localization** | Table name, labels | Multi-language support |

---

## 10. Troubleshooting

### Users Can't Edit
- Check Updates Enabled: Yes
- Verify UPDATES formula returns TRUE
- Check row filter shows record
- Verify column EDITABLE IF allows

### Users See Wrong Records
- Check row filter formula
- Test formula with user context
- Verify USEREMAIL() values
- Check for formula errors

### Operations Not Working
- Verify operation enabled
- Check security formula
- Test formula in expression tester
- Verify app synced/deployed

---

**Detailed Documentation:**
- [Table Operations](TABLE_OPERATIONS.md)
- [Table Security](TABLE_SECURITY.md)
- [Row Filtering](ROW_FILTERING.md)
- [Table Localization](TABLE_LOCALIZATION.md)

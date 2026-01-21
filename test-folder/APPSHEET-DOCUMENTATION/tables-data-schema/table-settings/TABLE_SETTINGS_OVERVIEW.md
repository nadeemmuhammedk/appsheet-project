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
| **UPDATES** | Who can edit records | TRUE/FALSE |
| **ADDS** | Who can add records | TRUE/FALSE |
| **DELETES** | Who can delete records | TRUE/FALSE |
| **Row filter formula** | Which records visible | TRUE/FALSE |

[See Table Security →](TABLE_SECURITY.md)
[See Row Filtering →](ROW_FILTERING.md)

### Other Settings
Additional table configurations.

| Setting | Purpose |
|---------|---------|
| **Are updates** | Mark table as update-only (existing records) |
| **Localization** | Multi-language support |
| **Table name** | Display name for table |

[See Table Localization →](TABLE_LOCALIZATION.md)

---

## 3. Common Configuration Patterns

### Open Access (Default)
```appsheet
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: Yes

UPDATES: TRUE
ADDS: TRUE
DELETES: TRUE

Row filter formula: (blank - show all)
```
**Use for:** Internal apps, trusted users, collaborative data

### Read-Only Table
```appsheet
Updates Enabled: No
Adds Enabled: No
Deletes Enabled: No
```
**Use for:** Reference data, lookup tables, reports

### Admin-Only Modifications
```appsheet
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: Yes

UPDATES: USERROLE() = "Admin"
ADDS: USERROLE() = "Admin"
DELETES: USERROLE() = "Admin"
```
**Use for:** System tables, configuration data

### User Ownership Model
```appsheet
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: Yes

UPDATES: OR([Owner] = USEREMAIL(), USERROLE() = "Admin")
ADDS: TRUE
DELETES: OR([Owner] = USEREMAIL(), USERROLE() = "Admin")

Row filter formula: OR([Owner] = USEREMAIL(), USERROLE() = "Admin")
```
**Use for:** User-specific data, personal records

### Approval Workflow
```appsheet
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: No

UPDATES: OR(
  AND([Status] = "Draft", [CreatedBy] = USEREMAIL()),
  AND([Status] = "Pending", USERROLE() = "Approver"),
  USERROLE() = "Admin"
)
ADDS: TRUE
DELETES: USERROLE() = "Admin"
```
**Use for:** Approval processes, submissions

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
```appsheet
# Table: Orders

# Enable operations
Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: No

# Who can perform operations
UPDATES: OR(
  [Owner] = USEREMAIL(),
  IN(USERROLE(), LIST("Manager", "Admin"))
)
ADDS: TRUE  # Anyone can create orders
DELETES: USERROLE() = "Admin"  # Only admins can delete

# Which records are visible
Row filter formula: OR(
  [Owner] = USEREMAIL(),
  [AssignedTo] = USEREMAIL(),
  IN(USERROLE(), LIST("Manager", "Admin"))
)
# Users see: own orders, assigned orders, or all if Manager/Admin
```

---

## 6. Common Use Cases

### Customer Portal
```appsheet
Table: Customer Data

Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: No

UPDATES: [CustomerEmail] = USEREMAIL()
ADDS: TRUE
DELETES: FALSE

Row filter formula: [CustomerEmail] = USEREMAIL()
```

### Team Collaboration
```appsheet
Table: Projects

Updates Enabled: Yes
Adds Enabled: Yes
Deletes Enabled: Yes

UPDATES: IN(USEREMAIL(), [TeamMembers])
ADDS: TRUE
DELETES: [ProjectLead] = USEREMAIL()

Row filter formula: OR(
  IN(USEREMAIL(), [TeamMembers]),
  USERROLE() = "Admin"
)
```

### Audit Log (Append-Only)
```appsheet
Table: Activity Log

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

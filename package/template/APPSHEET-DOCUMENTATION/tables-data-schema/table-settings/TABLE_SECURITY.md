# Table Security Settings

Table security settings control who can add, update, and delete records using formula-based expressions.

## 1. Security Formula Properties

AppSheet provides three table-level security formulas:

| Property | Purpose | Returns | Effect |
|----------|---------|---------|--------|
| **UPDATES** | Control who can edit records | TRUE/FALSE | TRUE = user can edit, FALSE = read-only |
| **ADDS** | Control who can add new records | TRUE/FALSE | TRUE = user can add, FALSE = cannot add |
| **DELETES** | Control who can delete records | TRUE/FALSE | TRUE = user can delete, FALSE = cannot delete |

**Location:** Data > Tables > [Table Name] > Security Filter section

---

## 2. Basic Security Patterns

### Open Access (Default)
```appsheet
UPDATES: TRUE
ADDS: TRUE
DELETES: TRUE

# All users can add, edit, and delete all records
```

### Read-Only Table
```appsheet
UPDATES: FALSE
ADDS: FALSE
DELETES: FALSE

# No user can modify data (view only)
```

### Add-Only Table
```appsheet
UPDATES: FALSE
ADDS: TRUE
DELETES: FALSE

# Users can add new records but cannot edit or delete
# Useful for: Logs, submissions, audit trails
```

### No Delete Table
```appsheet
UPDATES: TRUE
ADDS: TRUE
DELETES: FALSE

# Users can add and edit but cannot delete
# Useful for: Protecting historical data
```

---

## 3. Role-Based Security

### Admin-Only Modifications
```appsheet
UPDATES: USERROLE() = "Admin"
ADDS: USERROLE() = "Admin"
DELETES: USERROLE() = "Admin"

# Only admin users can modify data
```

### Role-Specific Permissions
```appsheet
UPDATES: IN(USERROLE(), LIST("Admin", "Manager"))
ADDS: IN(USERROLE(), LIST("Admin", "Manager", "Employee"))
DELETES: USERROLE() = "Admin"

# Admins and Managers can edit
# Admins, Managers, and Employees can add
# Only Admins can delete
```

### Editor Role
```appsheet
UPDATES: OR(USERROLE() = "Admin", USERROLE() = "Editor")
ADDS: TRUE
DELETES: USERROLE() = "Admin"

# Anyone can add
# Admins and Editors can update
# Only Admins can delete
```

---

## 4. User Ownership Patterns

### Owner Can Edit
```appsheet
UPDATES: [CreatedBy] = USEREMAIL()
ADDS: TRUE
DELETES: [CreatedBy] = USEREMAIL()

# Users can only edit/delete their own records
# Anyone can add new records
```

### Owner or Admin
```appsheet
UPDATES: OR([Owner] = USEREMAIL(), USERROLE() = "Admin")
ADDS: TRUE
DELETES: OR([Owner] = USEREMAIL(), USERROLE() = "Admin")

# Owners can edit/delete their records
# Admins can edit/delete any record
```

### Assigned User
```appsheet
UPDATES: OR(
  [AssignedTo] = USEREMAIL(),
  [CreatedBy] = USEREMAIL(),
  USERROLE() = "Admin"
)
ADDS: TRUE
DELETES: USERROLE() = "Admin"

# Assigned users and creators can edit
# Only admins can delete
```

---

## 5. Status-Based Security

### Edit Only Draft Records
```appsheet
UPDATES: [Status] = "Draft"
ADDS: TRUE
DELETES: [Status] = "Draft"

# Can only edit/delete records in Draft status
```

### Prevent Editing Approved Records
```appsheet
UPDATES: [Status] <> "Approved"
ADDS: TRUE
DELETES: [Status] <> "Approved"

# Cannot edit/delete approved records
```

### Combined Status and Owner
```appsheet
UPDATES: AND([Status] = "Draft", [Owner] = USEREMAIL())
ADDS: TRUE
DELETES: AND([Status] = "Draft", [Owner] = USEREMAIL())

# Can only edit/delete own Draft records
```

---

## 6. Time-Based Security

### Edit Within Time Window
```appsheet
UPDATES: (NOW() - [CreatedAt]) <= 24*60*60
ADDS: TRUE
DELETES: (NOW() - [CreatedAt]) <= 1*60*60

# Can edit within 24 hours of creation
# Can delete within 1 hour of creation
```

### Business Hours Only
```appsheet
UPDATES: AND(
  HOUR(NOW()) >= 9,
  HOUR(NOW()) < 17,
  NOT(IN(WEEKDAY(TODAY()), LIST(1, 7)))
)
ADDS: TRUE
DELETES: FALSE

# Can only edit during business hours (9-5, Mon-Fri)
```

### Future Records Only
```appsheet
UPDATES: [Date] >= TODAY()
ADDS: TRUE
DELETES: [Date] >= TODAY()

# Can only edit/delete future dated records
```

---

## 7. Conditional Security

### Amount-Based Restrictions
```appsheet
UPDATES: IF([Amount] > 10000,
  USERROLE() = "Manager",
  TRUE
)
ADDS: TRUE
DELETES: IF([Amount] > 5000,
  USERROLE() = "Manager",
  TRUE
)

# High-value records require manager permissions
```

### Department-Based Access
```appsheet
UPDATES: OR(
  [Department] = LOOKUP(USEREMAIL(), "Users", "Email", "Department"),
  USERROLE() = "Admin"
)
ADDS: TRUE
DELETES: USERROLE() = "Admin"

# Users can only edit records from their department
```

### Project Team Access
```appsheet
UPDATES: OR(
  [ProjectManager] = USEREMAIL(),
  IN(USEREMAIL(), [TeamMembers]),
  USERROLE() = "Admin"
)
ADDS: IN(USEREMAIL(), [ProjectRef].[TeamMembers])
DELETES: [ProjectManager] = USEREMAIL()

# Team members can edit
# Only project manager can delete
```

---

## 8. Advanced Security Patterns

### Hierarchical Approval
```appsheet
UPDATES: SWITCH([Status],
  "Draft", [CreatedBy] = USEREMAIL(),
  "Pending", [ManagerEmail] = USEREMAIL(),
  "Approved", USERROLE() = "Admin",
  FALSE
)
ADDS: TRUE
DELETES: [CreatedBy] = USEREMAIL() AND [Status] = "Draft"

# Different permissions based on status
```

### Cross-Table Security
```appsheet
UPDATES: IN(USEREMAIL(),
  [ProjectRef].[ApprovedEditors]
)
ADDS: [ProjectRef].[AllowNewItems] = TRUE
DELETES: [ProjectRef].[AllowDeletions] = TRUE

# Security inherited from parent record
```

### Quota-Based Restrictions
```appsheet
ADDS: COUNT(
  SELECT(Records[RecordID],
    AND([UserEmail] = USEREMAIL(), [Date] = TODAY())
  )
) < 10

# Users can only add 10 records per day
```

---

## 9. Security vs Row Filtering vs Operations Control

### Operations Control (Expression-Based)
- **Location:** Table Settings > Are updates allowed?
- **Returns:** "ALL_CHANGES" or "READ_ONLY"
- **Controls:** Enable/disable all operations for specific users/roles
- **Use Case:** User or role-based operation toggling (e.g., admin-only table)
- **See:** [Table Operations - Expression-Based Control](TABLE_OPERATIONS.md#7-expression-based-operations-control)

### Security Formulas (UPDATES/ADDS/DELETES)
- **Location:** Security Filter section
- **Returns:** TRUE or FALSE
- **Controls:** Per-operation, per-record permissions
- **Use Case:** Granular control (who can do what to which records)
- **More granular than expression-based control**

### Row-Level Filtering
- Control WHICH RECORDS users can see
- Filters visible records
- Located in: Security Filter > Row filter formula
- Example: `[Owner] = USEREMAIL()`

**Example Combination:**
```appsheet
# Security formulas
UPDATES: [Owner] = USEREMAIL()
ADDS: TRUE
DELETES: USERROLE() = "Admin"

# Row filter
Row filter formula: OR(
  [Owner] = USEREMAIL(),
  [AssignedTo] = USEREMAIL(),
  USERROLE() = "Admin"
)

# Result:
# - Users see their own records + assigned records
# - Users can only edit their own records
# - Admins see all records and can delete any
```

---

## 10. Common Use Cases

### User Submission System
```appsheet
UPDATES: [Status] = "Draft" AND [SubmittedBy] = USEREMAIL()
ADDS: TRUE
DELETES: [Status] = "Draft" AND [SubmittedBy] = USEREMAIL()

# Users can edit/delete own drafts only
```

### Approval Workflow
```appsheet
UPDATES: OR(
  AND([Status] = "Pending", [ApproverEmail] = USEREMAIL()),
  AND([Status] = "Draft", [CreatedBy] = USEREMAIL()),
  USERROLE() = "Admin"
)
ADDS: TRUE
DELETES: USERROLE() = "Admin"

# Approvers can edit pending items
# Creators can edit drafts
```

### Customer Portal
```appsheet
UPDATES: [CustomerEmail] = USEREMAIL()
ADDS: TRUE
DELETES: FALSE

Row filter formula: [CustomerEmail] = USEREMAIL()

# Customers see and edit only their own records
```

### Team Collaboration
```appsheet
UPDATES: IN(USEREMAIL(), [TeamMembers])
ADDS: IN(USEREMAIL(), [ProjectRef].[TeamMembers])
DELETES: [ProjectLead] = USEREMAIL()

# Team members can edit
# Only lead can delete
```

---

## 11. Best Practices

### Security Formula Design
- Start with most restrictive, relax as needed
- Test with different user roles and scenarios
- Use positive logic (what IS allowed)
- Combine conditions clearly with AND/OR

### Performance
- Keep security formulas simple
- Avoid complex SELECT statements
- Cache lookups in virtual columns if needed
- Test performance with large datasets

### User Experience
- Provide clear feedback when actions blocked
- Use helpful error messages (via workflow rules)
- Hide unavailable actions in UI
- Consider user expectations

### Data Integrity
- Never rely solely on UI hiding (always enforce at table level)
- Combine with row filtering for complete security
- Test edge cases (blank values, null refs)
- Document security model

### Auditing
- Log security-related actions
- Track who made changes (use ChangeTimestamp)
- Monitor failed access attempts
- Review security rules regularly

---

## 12. Troubleshooting

### Users Can't Edit When They Should
- Check security formulas return TRUE
- Verify user role matches expectations
- Test formula in expression tester
- Check row filtering isn't hiding records

### Users Can Edit When They Shouldn't
- Review security formula logic
- Check for OR conditions that are too permissive
- Verify row filtering is applied
- Test with actual user accounts

### Security Not Applied
- Ensure formulas saved correctly
- Check for syntax errors
- Verify app regenerated/synced
- Test in deployed app (not editor preview)

---

## 13. Security Checklist

**Before Deployment:**
- [ ] Security formulas defined for all tables
- [ ] Row filtering applied where needed
- [ ] User roles configured
- [ ] Tested with different user accounts
- [ ] Tested all CRUD operations
- [ ] Sensitive data hidden from unauthorized users
- [ ] Audit logging enabled
- [ ] Security documentation updated

**Common Security Patterns:**
- [ ] Owner-based access
- [ ] Role-based access
- [ ] Status-based restrictions
- [ ] Time-based restrictions
- [ ] Amount/value-based restrictions
- [ ] Department/team-based access

---

**Related Documentation:**
- [Table Operations](TABLE_OPERATIONS.md)
- [Row Filtering](ROW_FILTERING.md)
- [Table Settings Overview](TABLE_SETTINGS_OVERVIEW.md)
- [Column Properties](../column-properties/COLUMN_PROPERTIES_OVERVIEW.md)

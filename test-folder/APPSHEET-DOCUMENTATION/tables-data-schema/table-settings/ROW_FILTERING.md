# Row-Level Filtering

Row-level filtering controls which records users can see based on formula conditions.

## 1. Row Filter Formula

**Location:** Data > Tables > [Table Name] > Security Filter > Row filter formula

**Purpose:** Filter which records are visible to users

**Syntax:**
```appsheet
Row filter formula: <expression returning TRUE or FALSE>
```

**How It Works:**
- Formula evaluated for each row
- TRUE = row visible to user
- FALSE = row hidden from user
- Applies to all views of the table

---

## 2. Common Patterns

### User Ownership
```appsheet
Row filter formula: [Owner] = USEREMAIL()
# Users only see their own records
```

### Role-Based Access
```appsheet
Row filter formula: OR(
  USERROLE() = "Admin",
  [Department] = LOOKUP(USEREMAIL(), "Users", "Email", "Department")
)
# Admins see all, others see their department
```

### Multi-User Access
```appsheet
Row filter formula: OR(
  [CreatedBy] = USEREMAIL(),
  [AssignedTo] = USEREMAIL(),
  IN(USEREMAIL(), [TeamMembers])
)
# See records you created, assigned to you, or team member of
```

### Public + Private Records
```appsheet
Row filter formula: OR(
  [IsPublic] = TRUE,
  [Owner] = USEREMAIL()
)
# See public records and your own private records
```

---

## 3. Department/Region Filtering

### Department-Based
```appsheet
Row filter formula: [Department] = LOOKUP(USEREMAIL(), "Users", "Email", "Department")
```

### Region-Based
```appsheet
Row filter formula: [Region] = LOOKUP(USEREMAIL(), "Users", "Email", "AssignedRegion")
```

### Hierarchical
```appsheet
Row filter formula: OR(
  [Manager] = USEREMAIL(),
  [Employee] = USEREMAIL(),
  USERROLE() = "Executive"
)
```

---

## 4. Time-Based Filtering

### Active Records Only
```appsheet
Row filter formula: AND(
  [StartDate] <= TODAY(),
  [EndDate] >= TODAY()
)
```

### Recent Records
```appsheet
Row filter formula: [CreatedDate] >= TODAY() - 30
# Last 30 days only
```

---

## 5. Status-Based Filtering

```appsheet
Row filter formula: OR(
  [Status] <> "Archived",
  USERROLE() = "Admin"
)
# Hide archived except for admins
```

---

## 6. Best Practices

### Performance
- Keep formulas simple
- Avoid complex SELECT statements
- Use indexed columns
- Test with production data size

### Security
- Combine with table security formulas
- Test with different users
- Verify sensitive data hidden
- Document filter logic

---

**Related Documentation:**
- [Table Security](TABLE_SECURITY.md)
- [Table Settings Overview](TABLE_SETTINGS_OVERVIEW.md)

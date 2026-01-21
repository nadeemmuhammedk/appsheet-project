# Advanced Column Properties

Advanced properties provide fine-grained control over column behavior and type-specific settings.

## 1. EDITABLE IF Property

**Purpose:** Control when users can edit a column based on conditions

**Syntax:**
```appsheet
EDITABLE IF: <expression returning TRUE or FALSE>
```

**How It Works:**
- Formula evaluated dynamically
- TRUE = user can edit
- FALSE = column is read-only
- Different from SHOW IF (column still visible)

**Common Use Cases:**
```appsheet
# Status-based editing
EDITABLE IF: [Status] = "Draft"

# Role-based editing
EDITABLE IF: USERROLE() = "Admin"

# Owner can edit
EDITABLE IF: [Owner] = USEREMAIL()

# Time-window editing
EDITABLE IF: (NOW() - [CreatedAt]) <= 24*60*60

# Amount-based restriction
EDITABLE IF: [Amount] < 1000
```

**vs EDITABLE Property:**
```appsheet
# Static (column property)
EDITABLE: No
# Always read-only

# Dynamic (EDITABLE IF)
EDITABLE IF: [Condition]
# Read-only when condition is FALSE
```

---

## 2. EDITABLE IF Patterns

### Status-Based Lock
```appsheet
Column: Amount
Type: Price
EDITABLE IF: [Status] = "Draft"
# Cannot edit after status changes from Draft
```

### Role-Based Editing
```appsheet
Column: ManagerApproval
Type: Yes/No
EDITABLE IF: USERROLE() = "Manager"
# Only managers can approve
```

### Owner/Creator Only
```appsheet
Column: Description
Type: LongText
EDITABLE IF: [CreatedBy] = USEREMAIL()
# Only creator can edit
```

### Time-Limited Editing
```appsheet
Column: Response
Type: Text
EDITABLE IF: (NOW() - [SubmittedAt]) <= 60*60
# Can only edit within 1 hour of submission
```

### Conditional Editability
```appsheet
Column: Discount
Type: Percent
EDITABLE IF: OR(
  USERROLE() = "Manager",
  AND(USERROLE() = "Sales", [Discount] <= 0.1)
)
# Managers can set any discount, Sales up to 10%
```

### Prevent Editing After Approval
```appsheet
Column: OrderItems
Type: Text
EDITABLE IF: NOT([Approved])
# Lock after approval
```

---

## 3. Type Details Property

**Purpose:** Type-specific configuration settings

**Configuration varies by type:**

### Enum Type Details
```appsheet
Type: Enum
Type Details:
  Values: Value1, Value2, Value3
  Allow other values: No/Yes
  Auto-complete other values: Yes/No
  Base type: Text
  Input mode: Auto/Buttons/Dropdown
```

### EnumList Type Details
```appsheet
Type: EnumList
Type Details:
  Values: Value1, Value2, Value3
  Allow other values: No/Yes
  Auto-complete other values: Yes/No
  Base type: Text
  Item separator: ,
```

### Ref Type Details
```appsheet
Type: Ref
Type Details:
  Source table: TableName
  Label: ColumnName
  Element type: Auto/Ref
  Input mode: Auto/Dropdown/Form
```

### List Type Details
```appsheet
Type: List
Type Details:
  Element type: TableName
  Item separator: ,
```

### Price Type Details
```appsheet
Type: Price
Type Details:
  Decimal digits: 2
  Thousands separator: Yes
  Display mode: Currency symbol
  Currency symbol: $
```

### Number Type Details
```appsheet
Type: Number
Type Details:
  Decimal digits: 0-10
  Thousands separator: Yes/No
```

### Phone Type Details
```appsheet
Type: Phone
Type Details:
  Callable: Yes/No
  Textable: Yes/No
```

### Address Type Details
```appsheet
Type: Address
Type Details:
  Geocoding enabled: Yes/No
```

---

## 4. EDITABLE IF Advanced Patterns

### Multi-Level Approval
```appsheet
Column: Status
Type: Enum
Values: Draft, Submitted, Manager Approved, Director Approved

Column: ManagerApprovalDate
Type: Date
EDITABLE IF: AND(
  [Status] = "Submitted",
  USERROLE() = "Manager"
)

Column: DirectorApprovalDate
Type: Date
EDITABLE IF: AND(
  [Status] = "Manager Approved",
  USERROLE() = "Director"
)
```

### Department-Based Access
```appsheet
Column: DepartmentBudget
Type: Price
EDITABLE IF: OR(
  USERROLE() = "Admin",
  [Department] = LOOKUP(USEREMAIL(), "Users", "Email", "Department")
)
# Users can only edit their department's budget
```

### Workflow State Machine
```appsheet
Column: Status
Type: Enum
EDITABLE IF: OR(
  AND([_THISROW_BEFORE].[Status] = "Draft", [Status] = "Submitted"),
  AND([_THISROW_BEFORE].[Status] = "Submitted", IN([Status], LIST("Approved", "Rejected"))),
  USERROLE() = "Admin"
)
# Enforce valid status transitions
```

---

## 5. Combining Properties

### EDITABLE IF + SHOW IF
```appsheet
Column: ManagerNotes
Type: LongText
SHOW IF: IN(USERROLE(), LIST("Manager", "Admin"))
EDITABLE IF: USERROLE() = "Manager"
# Admins can see but not edit, Managers can edit
```

### EDITABLE IF + VALID_IF
```appsheet
Column: ApprovalAmount
Type: Price
EDITABLE IF: IN(USERROLE(), LIST("Manager", "Director"))
VALID_IF: IF(
  [ApprovalAmount] > 10000,
  USERROLE() = "Director",
  TRUE
)
# Both Manager and Director can edit, but only Director for >$10k
```

### EDITABLE IF + REQUIRE
```appsheet
Column: ClosureNotes
Type: LongText
EDITABLE IF: [Status] = "Closing"
VALID_IF: IF([Status] = "Closed", ISNOTBLANK([ClosureNotes]), TRUE)
# Required when closing, can only edit in "Closing" status
```

---

## 6. Type Details Best Practices

### Enum Configuration
```appsheet
# Good - clear values, no other values
Values: Active, Inactive, Pending
Allow other values: No
Input mode: Auto

# Flexible - allows custom values
Values: Common values...
Allow other values: Yes
Auto-complete other values: Yes
```

### Ref Configuration
```appsheet
# Standard Ref
Source table: Customers
Label: CustomerName
Input mode: Auto

# Form-based selection (for complex refs)
Source table: Products
Label: ProductName
Input mode: Form
```

### Price Formatting
```appsheet
# Standard currency
Decimal digits: 2
Thousands separator: Yes
Display mode: Currency symbol
Currency symbol: $

# High-precision financial
Decimal digits: 4
Thousands separator: Yes
```

---

## 7. Common Patterns

### Read-Only After Creation
```appsheet
Column: OrderNumber
Type: Text
EDITABLE IF: ISBLANK([OrderNumber])
# Can set once, then locked
```

### Admin Override
```appsheet
Column: LockableField
Type: Text
EDITABLE IF: OR(
  [Status] = "Draft",
  USERROLE() = "Admin"
)
# Draft status OR admin can always edit
```

### Timed Edit Window
```appsheet
Column: EventResponse
Type: Text
EDITABLE IF: AND(
  [EventDate] >= TODAY(),
  [EventDate] <= TODAY() + 30
)
# Can only edit for upcoming events within 30 days
```

### Hierarchical Editing
```appsheet
Column: TeamLead
Type: Ref
Source: Employees
EDITABLE IF: OR(
  USERROLE() = "Manager",
  [TeamLead] = LOOKUP(USEREMAIL(), "Employees", "Email", "EmployeeID")
)
# Manager or current team lead can edit
```

---

## 8. Best Practices

### EDITABLE IF Design
- Use for workflow enforcement
- Combine with status fields
- Protect approved/submitted data
- Allow admin overrides
- Test all edge cases

### Type Details Configuration
- Configure for user experience
- Use appropriate input modes
- Set reasonable limits
- Match business requirements
- Consider mobile usability

### Security Considerations
- EDITABLE IF is UI control only
- Still enforce with security rules
- Don't rely solely on EDITABLE IF
- Validate server-side
- Use table-level security too

---

## 9. Troubleshooting

### EDITABLE IF Not Working
- Check formula returns TRUE/FALSE
- Test formula in expression tester
- Verify dependencies exist
- Check for syntax errors
- Force recalculation

### Type Details Not Applied
- Regenerate app structure
- Check for conflicting settings
- Verify data source allows setting
- Test with new record

---

**Related Documentation:**
- [Column Properties Overview](COLUMN_PROPERTIES_OVERVIEW.md)
- [Validation Properties](VALIDATION_PROPERTIES.md)
- [Display Properties](DISPLAY_PROPERTIES.md)
- [Table Security](../table-settings/TABLE_SECURITY.md)

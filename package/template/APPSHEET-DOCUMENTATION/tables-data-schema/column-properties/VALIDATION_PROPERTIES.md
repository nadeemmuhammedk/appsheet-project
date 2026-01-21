# Validation Properties

Validation properties control data quality, enforce business rules, and ensure data integrity.

## 1. VALID_IF Property

**Purpose:** Define a validation rule that input must satisfy

**Syntax:**
```appsheet
VALID_IF: <expression that returns TRUE or FALSE>
```

**How It Works:**
- Formula evaluated when user inputs value
- TRUE = input accepted
- FALSE = input rejected with error message
- Can include custom error message: `<expression> - "Error message"`

**Common Use Cases:**
- Prevent duplicate values
- Enforce data ranges
- Validate relationships
- Conditional requirements
- Format validation
- Business rule enforcement

---

## 2. Basic Validation Patterns

### Not Blank (Required)
```appsheet
VALID_IF: ISNOTBLANK([FieldName])

# With error message
VALID_IF: ISNOTBLANK([Email]) - "Email is required"
```

### Value Range
```appsheet
# Number range
VALID_IF: AND([Age] >= 18, [Age] <= 100)

# Date range
VALID_IF: AND([Date] >= TODAY(), [Date] <= TODAY() + 365)

# Positive numbers only
VALID_IF: [Amount] > 0

# Non-negative
VALID_IF: [Quantity] >= 0
```

### Comparison Validation
```appsheet
# End after start
VALID_IF: [EndDate] >= [StartDate]

# Amount within budget
VALID_IF: [Spent] <= [Budget]

# Password confirmation
VALID_IF: [Password] = [ConfirmPassword]
```

### Text Length
```appsheet
# Minimum length
VALID_IF: LEN([Username]) >= 3

# Maximum length
VALID_IF: LEN([Code]) <= 10

# Exact length
VALID_IF: LEN([PIN]) = 4

# Range
VALID_IF: AND(LEN([Name]) >= 2, LEN([Name]) <= 50)
```

---

## 3. Duplicate Prevention

### Basic Duplicate Check
```appsheet
# Prevent duplicate values in column
VALID_IF: NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))

# Shorter version (but checks during edit too)
VALID_IF: NOT(IN([Code], OtherRows([Code])))

# With error message
VALID_IF: NOT(IN([Username], SELECT(Users[Username], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER]))) - "Username already exists"
```

### Composite Uniqueness
```appsheet
# Unique combination of two columns
VALID_IF: NOT(IN(
  CONCATENATE([FirstName], "|", [LastName]),
  SELECT(
    CONCATENATE(People[FirstName], "|", People[LastName]),
    [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER]
  )
))

# Unique per category
VALID_IF: NOT(IN(
  [Name],
  SELECT(Products[Name],
    AND(
      [Category] = [_THISROW].[Category],
      [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER]
    )
  )
))
```

---

## 4. Conditional Validation

### If-Then Validation
```appsheet
# Require field if condition met
VALID_IF: IF([Status] = "Rejected", ISNOTBLANK([RejectReason]), TRUE)

# Different rules based on type
VALID_IF: IF([Type] = "Employee",
  ISNOTBLANK([EmployeeID]),
  IF([Type] = "Contractor",
    ISNOTBLANK([ContractorID]),
    TRUE
  )
)

# Require approval for large amounts
VALID_IF: IF([Amount] > 1000, ISNOTBLANK([ManagerApproval]), TRUE)
```

### Status-Based Validation
```appsheet
# Prevent editing when approved
VALID_IF: IF([Status] = "Approved", [_THISROW].[Amount] = [_THISROW_BEFORE].[Amount], TRUE)

# Require completion date when complete
VALID_IF: IF([Status] = "Complete", ISNOTBLANK([CompletedDate]), TRUE)

# Validate state transitions
VALID_IF: OR(
  [Status] = "Draft",
  AND([Status] = "Submitted", [_THISROW_BEFORE].[Status] = "Draft"),
  AND([Status] = "Approved", [_THISROW_BEFORE].[Status] = "Submitted")
)
```

---

## 5. Format Validation

### Text Patterns
```appsheet
# Contains specific text
VALID_IF: CONTAINS([Email], "@")

# Starts with prefix
VALID_IF: LEFT([Code], 3) = "PRD"

# Ends with suffix
VALID_IF: RIGHT([Filename], 4) = ".pdf"

# Alphanumeric only
VALID_IF: [Code] = SUBSTITUTE(SUBSTITUTE([Code], " ", ""), "-", "")

# Uppercase only
VALID_IF: [Code] = UPPER([Code])
```

### Numeric Patterns
```appsheet
# Integer only (no decimals)
VALID_IF: [Quantity] = INT([Quantity])

# Two decimal places max
VALID_IF: ROUND([Amount], 2) = [Amount]

# Multiple of value
VALID_IF: MOD([Quantity], 5) = 0 - "Must be multiple of 5"

# Positive even numbers
VALID_IF: AND([Number] > 0, MOD([Number], 2) = 0)
```

---

## 6. Relationship Validation

### Reference Validation
```appsheet
# Valid reference
VALID_IF: IN([CustomerRef], Customers[CustomerID])

# Reference to active records only
VALID_IF: IN([CategoryRef], SELECT(Categories[CategoryID], [IsActive] = TRUE))

# Conditional reference requirement
VALID_IF: IF([Type] = "Customer", ISNOTBLANK([CustomerRef]), TRUE)

# Prevent self-reference
VALID_IF: [ParentRef] <> [_THISROW].[ID]
```

### List Validation
```appsheet
# Require at least one selection
VALID_IF: COUNT([Tags]) > 0

# Limit selections
VALID_IF: COUNT([AssignedTo]) <= 5

# Require specific value in list
VALID_IF: IN("Critical", [Tags])

# All references must be valid
VALID_IF: COUNT([TagsList]) = COUNT(
  SELECT(Tags[TagID], IN([TagID], [_THISROW].[TagsList]))
)
```

---

## 7. Business Logic Validation

### Date Logic
```appsheet
# Future dates only
VALID_IF: [Date] >= TODAY()

# Past dates only
VALID_IF: [Date] <= TODAY()

# Within 30 days
VALID_IF: AND([Date] >= TODAY(), [Date] <= TODAY() + 30)

# Weekday only
VALID_IF: NOT(IN(WEEKDAY([Date]), LIST(1, 7)))

# Business hours
VALID_IF: AND(HOUR([Time]) >= 9, HOUR([Time]) <= 17)
```

### Role-Based Validation
```appsheet
# Admin only values
VALID_IF: IF([Priority] = "Critical", USERROLE() = "Admin", TRUE)

# Owner can't approve own
VALID_IF: IF([Status] = "Approved", [CreatedBy] <> USEREMAIL(), TRUE)

# Manager approval required
VALID_IF: IF([Amount] > 5000,
  AND(ISNOTBLANK([ApprovedBy]), [ApprovedByRole] = "Manager"),
  TRUE
)
```

### Inventory Logic
```appsheet
# Stock available
VALID_IF: [Quantity] <= [ProductRef].[StockQuantity]

# Reorder threshold
VALID_IF: IF([Stock] < [ReorderPoint], ISNOTBLANK([ReorderDate]), TRUE)

# Price within margin
VALID_IF: [SalePrice] >= [Cost] * 1.1
```

---

## 8. Advanced Patterns

### Cross-Table Validation
```appsheet
# Limit total across records
VALID_IF: SUM(SELECT(Allocations[Amount], [ProjectID] = [_THISROW].[ProjectID])) <= [ProjectRef].[Budget]

# Check related records
VALID_IF: COUNT(SELECT(Orders[OrderID], AND([CustomerRef] = [_THISROW].[CustomerRef], [Status] = "Pending"))) < 5

# Prevent if children exist
VALID_IF: IF([Status] = "Deleted",
  COUNT(REF_ROWS("ChildTable", "ParentRef")) = 0,
  TRUE
)
```

### Time-Based Validation
```appsheet
# Can't edit after 24 hours
VALID_IF: NOW() - [CreatedAt] <= 24*60*60

# Must be within business hours
VALID_IF: AND(
  HOUR(NOW()) >= 9,
  HOUR(NOW()) <= 17,
  NOT(IN(WEEKDAY(TODAY()), LIST(1, 7)))
)

# Edit window expired
VALID_IF: IF([_THISROW].[Status] = [_THISROW_BEFORE].[Status],
  TRUE,
  NOW() - [LastModified] <= 300
) - "Edit window expired (5 minutes)"
```

### Conditional Format Validation
```appsheet
# Different format rules by type
VALID_IF: SWITCH([Type],
  "Email", CONTAINS([Value], "@"),
  "Phone", LEN([Value]) = 10,
  "URL", OR(CONTAINS([Value], "http://"), CONTAINS([Value], "https://")),
  TRUE
)

# Complex composite validation
VALID_IF: AND(
  LEN([Code]) = 8,
  LEFT([Code], 3) = [CategoryRef].[Prefix],
  ISNUMBER(VALUE(RIGHT([Code], 5)))
)
```

---

## 9. REQUIRE Property

**Purpose:** Make column mandatory (simple requirement)

**Syntax:**
```appsheet
REQUIRE: Yes/No
```

**How It Works:**
- Yes = Field cannot be blank
- No = Field is optional
- Simpler than VALID_IF for basic requirements
- No custom error message support

**When to Use REQUIRE:**
- Simple "field cannot be blank" validation
- Always required (not conditional)
- No special logic needed

**When to Use VALID_IF Instead:**
- Conditional requirements
- Custom error messages
- Complex validation logic
- Multiple validation rules

**Examples:**
```appsheet
# Simple requirement
Column: Name
REQUIRE: Yes

# Conditional requirement (use VALID_IF)
Column: RejectReason
REQUIRE: No
VALID_IF: IF([Status] = "Rejected", ISNOTBLANK([RejectReason]), TRUE)

# Requirement with validation (use both)
Column: Email
REQUIRE: Yes
VALID_IF: CONTAINS([Email], "@")
```

---

## 10. Error Messages

### Adding Custom Messages
```appsheet
# Syntax
VALID_IF: <expression> - "Custom error message"

# Examples
VALID_IF: [Amount] > 0 - "Amount must be positive"
VALID_IF: [EndDate] >= [StartDate] - "End date must be after start date"
VALID_IF: LEN([Code]) = 6 - "Code must be exactly 6 characters"
```

### Multiple Conditions with Messages
```appsheet
# Use IFS for different messages
VALID_IF: IFS(
  ISBLANK([Email]), "Email is required",
  NOT(CONTAINS([Email], "@")), "Invalid email format",
  IN([Email], OtherRows([Email])), "Email already exists",
  TRUE, TRUE
)

# Use nested IF
VALID_IF: IF(ISBLANK([Amount]),
  "Amount is required",
  IF([Amount] <= 0,
    "Amount must be positive",
    IF([Amount] > 10000,
      "Amount exceeds maximum (10,000)",
      TRUE
    )
  )
)
```

---

## 11. Best Practices

### Formula Design
- Use positive validation (what IS allowed, not what isn't)
- Keep formulas readable (use line breaks for complex logic)
- Test edge cases (blank values, zero, negatives)
- Avoid expensive operations (minimize SELECT)

### Error Messages
- Be specific and helpful
- Explain what's wrong AND how to fix it
- Use plain language (not technical jargon)
- Keep messages concise (< 60 characters)

### Performance
- Minimize SELECT in VALID_IF (runs on every input)
- Cache validation lists in virtual columns
- Use simple checks first (ISNOTBLANK before complex logic)
- Avoid nested SELECT statements

### User Experience
- Validate early (as user types, not just on save)
- Provide clear error messages
- Use REQUIRE for simple requirements
- Don't over-validate (allow reasonable flexibility)

### Data Integrity
- Prevent duplicates where needed
- Validate relationships (IN checks)
- Enforce business rules consistently
- Use VALID_IF on both sides of relationship when needed

---

## 12. Common Validation Patterns

### Email Validation
```appsheet
VALID_IF: AND(
  ISNOTBLANK([Email]),
  CONTAINS([Email], "@"),
  CONTAINS([Email], "."),
  NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
) - "Invalid or duplicate email"
```

### Phone Validation
```appsheet
VALID_IF: AND(
  LEN([Phone]) = 10,
  ISNUMBER(VALUE([Phone]))
) - "Phone must be 10 digits"
```

### Currency Validation
```appsheet
VALID_IF: AND(
  [Amount] > 0,
  ROUND([Amount], 2) = [Amount]
) - "Amount must be positive with max 2 decimals"
```

### Date Range Validation
```appsheet
VALID_IF: AND(
  [Date] >= TODAY(),
  [Date] <= TODAY() + 90
) - "Date must be within next 90 days"
```

### Status Workflow Validation
```appsheet
VALID_IF: OR(
  AND([Status] = "Draft", [_THISROW_BEFORE].[Status] = ""),
  AND([Status] = "Submitted", [_THISROW_BEFORE].[Status] = "Draft"),
  AND([Status] = "Approved", IN([_THISROW_BEFORE].[Status], LIST("Submitted", "Approved"))),
  AND([Status] = "Rejected", [_THISROW_BEFORE].[Status] = "Submitted")
) - "Invalid status transition"
```

---

**Related Documentation:**
- [Column Properties Overview](COLUMN_PROPERTIES_OVERVIEW.md)
- [Formula Properties](FORMULA_PROPERTIES.md)
- [Formulas Reference](../../formulas-reference/FORMULAS_REFERENCE.md)

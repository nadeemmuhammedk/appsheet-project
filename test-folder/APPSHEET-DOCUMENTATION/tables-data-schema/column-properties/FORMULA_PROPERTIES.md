# Formula Properties

Formula properties automatically calculate and set column values using expressions.

## 1. Initial Value

**Purpose:** Set a default value when a new record is created

**Syntax:**
```appsheet
Initial Value: <expression>
```

**How It Works:**
- Evaluates ONCE when record is created
- Result becomes the column's initial value
- User can edit the value afterward (if EDITABLE: Yes)
- Does NOT recalculate after creation
- Works with physical columns only (not virtual)

**Common Use Cases:**
- Set default dates (TODAY(), NOW())
- Auto-generate unique IDs (UNIQUEID())
- Capture current user (USEREMAIL())
- Set default status values
- Initialize counters or flags
- Copy values from related records

---

## 2. App Formula

**Purpose:** Calculate value dynamically (always recalculates)

**Syntax:**
```appsheet
App Formula: <expression>
```

**How It Works:**
- Evaluates EVERY time dependent values change
- Result is always calculated, never stored
- Column is READ-ONLY (users cannot edit)
- Must be a virtual column (no physical storage)
- Recalculates automatically

**Common Use Cases:**
- Calculate totals ([Price] * [Quantity])
- Concatenate values ([FirstName] & " " & [LastName])
- Dereference relationships ([CustomerRef].[Name])
- Reverse references (REF_ROWS)
- Date calculations (TODAY() - [CreatedDate])
- Status indicators
- Aggregations (SUM, COUNT, AVG)

---

## 3. Initial Value Patterns

### Unique Identifiers
```appsheet
# Simple UNIQUEID
Initial Value: UNIQUEID()

# Formatted ID with prefix
Initial Value: "ORD-" & UNIQUEID()

# Date-based ID
Initial Value: "ID-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()

# Sequential ID (simple counter)
Initial Value: MAX(Orders[OrderNumber]) + 1

# Composite ID
Initial Value: [CustomerRef].[CustomerCode] & "-" & TEXT(TODAY(), "YYYYMMDD")
```

### Date and Time Defaults
```appsheet
# Current date
Initial Value: TODAY()

# Current datetime
Initial Value: NOW()

# Current time
Initial Value: TIMENOW()

# Future date (30 days from now)
Initial Value: TODAY() + 30

# Start of week
Initial Value: TODAY() - WEEKDAY(TODAY()) + 2

# End of month
Initial Value: EOMONTH(TODAY(), 0)

# Next business day
Initial Value: WORKDAY(TODAY(), 1)
```

### User Tracking
```appsheet
# Current user email
Initial Value: USEREMAIL()

# Current user role
Initial Value: USERROLE()

# Lookup user details
Initial Value: LOOKUP(USEREMAIL(), "Users", "Email", "UserID")

# User's department
Initial Value: LOOKUP(USEREMAIL(), "Users", "Email", "Department")
```

### Default Values
```appsheet
# Static default
Initial Value: "Pending"

# Calculated default
Initial Value: IF(USERROLE() = "Admin", "Approved", "Pending")

# Copy from related record
Initial Value: [CustomerRef].[DefaultPaymentTerms]

# Previous record's value
Initial Value: INDEX(ORDERBY(Records[Status], [CreatedDate], TRUE), 1)
```

### Conditional Initialization
```appsheet
# Based on user role
Initial Value: IF(USERROLE() = "Manager", "High Priority", "Normal")

# Based on date
Initial Value: IF(WEEKDAY(TODAY()) = 1, "Weekend", "Weekday")

# Based on other column
Initial Value: IF([Type] = "Internal", [InternalCode], [ExternalCode])

# Complex logic
Initial Value: IFS(
  [Amount] > 10000, "Requires Approval",
  [Amount] > 1000, "Manager Review",
  TRUE, "Auto-Approved"
)
```

---

## 4. App Formula Patterns

### Text Calculations
```appsheet
# Concatenation
App Formula: CONCATENATE([FirstName], " ", [LastName])

# With labels
App Formula: "Order #" & [OrderNumber] & " - " & TEXT([OrderDate], "MM/DD/YYYY")

# Formatted display
App Formula: [ProductName] & " (" & [SKU] & ")"

# Uppercase conversion
App Formula: UPPER([Code])

# Extract substring
App Formula: LEFT([Email], FIND("@", [Email]) - 1)
```

### Numeric Calculations
```appsheet
# Simple math
App Formula: [Price] * [Quantity]

# With tax
App Formula: [Subtotal] * (1 + [TaxRate])

# Discount calculation
App Formula: [Price] * (1 - [DiscountPercent])

# Percentage
App Formula: [Completed] / [Total]

# Rounded result
App Formula: ROUND([Price] * [Quantity], 2)

# Conditional calculation
App Formula: IF([Type] = "Wholesale", [Price] * 0.7, [Price])
```

### Date Calculations
```appsheet
# Days since
App Formula: TODAY() - [CreatedDate]

# Age calculation
App Formula: YEAR(TODAY()) - YEAR([BirthDate])

# Business days between
App Formula: NETWORKDAYS([StartDate], [EndDate])

# Add months
App Formula: [StartDate] + 30

# Due date
App Formula: [OrderDate] + [DeliveryDays]

# Is overdue
App Formula: [DueDate] < TODAY()
```

### Dereferencing (Lookup from Ref)
```appsheet
# Single value lookup
App Formula: [CustomerRef].[CompanyName]

# Multiple values
App Formula: [ProductRef].[Category] & " - " & [ProductRef].[SubCategory]

# Chained references
App Formula: [OrderRef].[CustomerRef].[CompanyName]

# Calculated from parent
App Formula: [ProductRef].[BasePrice] * (1 + [_THISROW].[Markup])

# Conditional dereference
App Formula: IF(ISNOTBLANK([CustomerRef]), [CustomerRef].[Name], "Guest")
```

### Reverse References (REF_ROWS)
```appsheet
# Get child records
App Formula: REF_ROWS("Orders", "CustomerRef")

# Count children
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))

# Sum child values
App Formula: SUM(REF_ROWS("OrderItems", "OrderRef")[Amount])

# Filter children
App Formula: SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Pending")

# Latest child
App Formula: INDEX(ORDERBY(REF_ROWS("Logs", "RecordRef"), [Timestamp], TRUE), 1)
```

### Aggregations
```appsheet
# Sum
App Formula: SUM([LineItems][Amount])

# Average
App Formula: AVERAGE([Ratings][Score])

# Count
App Formula: COUNT([Tags])

# Max/Min
App Formula: MAX([Bids][BidAmount])

# Concatenate list
App Formula: CONCATENATE([Tags][TagName])

# Conditional sum
App Formula: SUM(SELECT([Transactions][Amount], [Type] = "Credit"))
```

### Boolean/Status Indicators
```appsheet
# Simple flag
App Formula: [Amount] > 1000

# Status check
App Formula: [CompletedTasks] = [TotalTasks]

# Multiple conditions
App Formula: AND([IsActive], [Balance] > 0)

# Complex logic
App Formula: OR(
  AND([Status] = "Urgent", [DaysOld] > 7),
  AND([Status] = "Normal", [DaysOld] > 30)
)

# Ternary-style
App Formula: IF([Score] >= 90, "A", IF([Score] >= 80, "B", "C"))
```

---

## 5. Initial Value vs App Formula

| Aspect | Initial Value | App Formula |
|--------|---------------|-------------|
| **When** | Once (on create) | Always (on recalc) |
| **Editable** | Yes (if EDITABLE: Yes) | No (always read-only) |
| **Storage** | Stored in data source | Not stored (virtual) |
| **Updates** | Manual user edit only | Auto-recalculates |
| **Column Type** | Physical | Virtual |
| **Use For** | Defaults, IDs, timestamps | Calculations, derivations |

**Example Comparison:**
```appsheet
# Initial Value - Set once, user can change
Column: CreatedDate
Type: Date
Initial Value: TODAY()
EDITABLE: Yes
Result: Date is set to today on creation, user can edit to different date

# App Formula - Always calculated, read-only
Column: DaysSinceCreated
Type: Number (Virtual)
App Formula: TODAY() - [CreatedDate]
Result: Always shows current difference, updates daily, cannot edit
```

---

## 6. Best Practices

### Choosing Between Initial Value and App Formula
- **Initial Value:** Defaults that users might change
- **App Formula:** Always-current calculated values

### Formula Design
- Keep formulas simple and readable
- Break complex calculations into multiple virtual columns
- Use meaningful column names for intermediate calculations
- Comment complex logic (in Description field)

### Performance
- Minimize expensive operations (SELECT, ORDERBY) in App Formulas
- Cache complex lookups in virtual columns
- Use simple Initial Values (avoid SELECT if possible)
- Consider calculation frequency

### Dependencies
- Ensure referenced columns exist
- Be aware of calculation order (dependencies first)
- Avoid circular references
- Test formulas with blank/null values

### Data Integrity
- Use Initial Value for audit fields (CreatedBy, CreatedDate)
- Set EDITABLE: No on auto-generated values
- Validate formula results match expected data types
- Handle edge cases (division by zero, blank values)

---

## 7. Common Patterns

### Auto-Generated Record ID
```appsheet
Column: RecordID
Type: Text
Key: Yes
Initial Value: "REC-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()
SHOW: No
EDITABLE: No
```

### Created Timestamp
```appsheet
Column: CreatedAt
Type: ChangeTimestamp
(Automatically set, no formula needed)

# OR using Initial Value
Column: CreatedAt
Type: DateTime
Initial Value: NOW()
EDITABLE: No
```

### Created By User
```appsheet
Column: CreatedBy
Type: Email
Initial Value: USEREMAIL()
EDITABLE: No
```

### Display Name (Virtual)
```appsheet
Column: DisplayName
Type: Text (Virtual)
App Formula: CONCATENATE([FirstName], " ", [LastName])
Label: Yes
```

### Calculated Total (Virtual)
```appsheet
Column: Total
Type: Price (Virtual)
App Formula: [Quantity] * [UnitPrice]
```

### Days Since Created (Virtual)
```appsheet
Column: DaysSinceCreated
Type: Number (Virtual)
App Formula: TODAY() - [CreatedDate]
```

### Status Indicator (Virtual)
```appsheet
Column: IsOverdue
Type: Yes/No (Virtual)
App Formula: AND([Status] <> "Complete", [DueDate] < TODAY())
```

### Child Count (Virtual)
```appsheet
Column: OrderCount
Type: Number (Virtual)
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))
```

### Inherited Parent Value (Virtual)
```appsheet
Column: CustomerName
Type: Text (Virtual)
App Formula: [CustomerRef].[Name]
```

### Conditional Default
```appsheet
Column: Priority
Type: Enum
Initial Value: IF([Amount] > 5000, "High", "Medium")
Values: High, Medium, Low
```

---

## 8. Advanced Patterns

### Sequential Numbering
```appsheet
# Simple (may have gaps)
Initial Value: MAX(Records[Number]) + 1

# Date-based sequence
Initial Value: TEXT(TODAY(), "YYYYMMDD") & "-" & (
  MAX(
    SELECT(Records[SeqNumber],
      TEXT([Date], "YYYYMMDD") = TEXT(TODAY(), "YYYYMMDD")
    )
  ) + 1
)

# Per-category sequence
Initial Value: [Category] & "-" & (
  MAX(
    SELECT(Records[SeqNumber], [Category] = [_THISROW].[Category])
  ) + 1
)
```

### Cascading Lookups
```appsheet
# Inherit multiple values from parent
Column: ShippingAddress
Type: Address (Virtual)
App Formula: [CustomerRef].[DefaultShippingAddress]

Column: BillingAddress
Type: Address (Virtual)
App Formula: [CustomerRef].[DefaultBillingAddress]

Column: PaymentTerms
Type: Text (Virtual)
App Formula: [CustomerRef].[DefaultPaymentTerms]
```

### Complex Aggregations
```appsheet
# Weighted average
App Formula: SUM([Items][Price] * [Items][Quantity]) / SUM([Items][Quantity])

# Conditional count
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete"))

# Percentage complete
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete")) /
             COUNT(REF_ROWS("Tasks", "ProjectRef"))

# Latest child value
App Formula: INDEX(
  ORDERBY(REF_ROWS("StatusUpdates", "RecordRef"), [Timestamp], TRUE),
  1
).[Status]
```

### Dynamic Timestamps
```appsheet
# Update tracking (requires Action)
Column: LastModifiedDate
Type: DateTime
(Set via Action: Data: set values of columns)

# Time since last update
Column: HoursSinceUpdate
Type: Number (Virtual)
App Formula: (NOW() - [LastModifiedDate]) / 3600
```

---

**Related Documentation:**
- [Column Properties Overview](COLUMN_PROPERTIES_OVERVIEW.md)
- [Validation Properties](VALIDATION_PROPERTIES.md)
- [Formulas Reference](../../formulas-reference/FORMULAS_REFERENCE.md)
- [Virtual Columns](../virtual-columns/VIRTUAL_COLUMNS_OVERVIEW.md)

# Enum Column Types

Enum types provide dropdown selection from predefined value lists.

## 1. Enum Type

**Purpose:** Single choice from a predefined list of values

**Configuration:**
```appsheet
Type: Enum
Type Details:
  Values: Value1, Value2, Value3
  Allow other values: No/Yes
  Auto-complete other values: Yes/No
  Base type: Text
  Input mode: Auto/Buttons/Dropdown
Key: No
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
SEARCH: YES
```

**Common Use Cases:**
- Status fields (Active, Inactive, Pending)
- Priority levels (High, Medium, Low)
- Categories (Sales, Marketing, Support)
- Approval states (Draft, Submitted, Approved, Rejected)
- Roles (Admin, Manager, User, Guest)

**Type Details Parameters:**

**Values:**
- Comma-separated list: `Active, Pending, Completed`
- Can reference another table column: `TableName[ColumnName]`
- Can use expression: `SELECT(Categories[Name], TRUE)`

**Allow other values:**
- `No`: Users must select from list only
- `Yes`: Users can enter custom values not in list

**Auto-complete other values:**
- `Yes`: Custom values added to suggestion list
- `No`: Custom values not suggested in future

**Input mode:**
- `Auto`: AppSheet chooses best input (dropdown or buttons)
- `Buttons`: Show as button group (good for 2-5 values)
- `Dropdown`: Always show as dropdown list

**Base type:**
- `Text`: Enum values stored as text (most common)
- `Number`: Enum values stored as numbers
- `Date`: Enum values stored as dates

---

## 2. Enum Value Sources

### Static List
```appsheet
Values: Active, Inactive, Pending, Archived
```

### Reference Another Table
```appsheet
Values: Categories[CategoryName]
```

### Dynamic Expression
```appsheet
# All active categories
Values: SELECT(Categories[Name], [IsActive] = TRUE)

# Filtered by user
Values: SELECT(Departments[Name], [ManagerEmail] = USEREMAIL())

# Sorted list
Values: SORT(Products[ProductName])

# Unique values from another table
Values: UNIQUE(Orders[Status])
```

### Conditional Values (using VALID_IF instead)
```appsheet
# In VALID_IF (not Type Details):
VALID_IF: IF([Type] = "Hardware", LIST("Laptop", "Desktop", "Phone"), LIST("Word", "Excel", "PowerPoint"))
```

---

## 3. EnumList Type

**Purpose:** Multiple choices from a predefined list of values

**Configuration:**
```appsheet
Type: EnumList
Type Details:
  Values: Value1, Value2, Value3
  Allow other values: No/Yes
  Auto-complete other values: Yes/No
  Base type: Text
  Item separator: , (comma)
Key: No
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: NO (usually)
SEARCH: YES
```

**Common Use Cases:**
- Tags (Marketing, Sales, Product, Engineering)
- Multiple categories
- Skill sets (JavaScript, Python, SQL, React)
- Features (WiFi, Bluetooth, GPS, Camera)
- Days of week (Mon, Tue, Wed, Thu, Fri)

**Storage Format:**
Values stored as comma-separated text: `"Value1, Value2, Value3"`

**Type Details Parameters:**

**Item separator:**
- `,` (comma) - default
- `;` (semicolon)
- `|` (pipe)
- Custom separator

---

## 4. Validation Patterns

### Enum Validation
```appsheet
# Require value from specific list
VALID_IF: IN([Status], LIST("Active", "Inactive", "Pending"))

# Conditional required
VALID_IF: IF([Type] = "Employee", ISNOTBLANK([Department]), TRUE)

# Prevent certain values
VALID_IF: [Status] <> "Archived"

# Status progression logic
VALID_IF:
  OR(
    [Status] = "Draft",
    AND([Status] = "Submitted", [_THISROW_BEFORE].[Status] = "Draft"),
    AND([Status] = "Approved", [_THISROW_BEFORE].[Status] = "Submitted")
  )
```

### EnumList Validation
```appsheet
# Require at least one selection
VALID_IF: COUNT([Tags]) > 0

# Limit number of selections
VALID_IF: COUNT([Skills]) <= 5

# Require specific value
VALID_IF: IN("Required", [Tags])

# Prevent certain combinations
VALID_IF: NOT(AND(IN("A", [Options]), IN("B", [Options])))
```

---

## 5. Formula Examples

### Enum Formulas
```appsheet
# Set initial value based on condition
Initial Value: IF(ISBLANK([AssignedTo]), "Unassigned", "Assigned")

# Default to first value
Initial Value: "Pending"

# Set based on user role
Initial Value: IF(USERROLE() = "Admin", "Approved", "Draft")

# Virtual enum based on calculation
App Formula: IF([Amount] > 1000, "High", IF([Amount] > 500, "Medium", "Low"))
```

### EnumList Formulas
```appsheet
# Combine multiple sources
Initial Value: LIST("Default", "Tag1")

# Virtual EnumList from related records
App Formula: [RelatedItems].[Category]

# Count selections
App Formula (Number): COUNT([Tags])

# Check if contains value
App Formula (Yes/No): IN("Important", [Tags])
```

---

## 6. Best Practices

### Value Design
- Use clear, descriptive values: "In Progress" not "IP"
- Keep values concise (< 20 characters)
- Use consistent capitalization
- Avoid special characters in values
- Order values logically (by workflow, priority, or alphabet)

### List Size
- **Enum:** Ideal 2-10 values, max ~30 (longer lists slow dropdown)
- **EnumList:** Ideal 3-15 values, max ~30

### Input Mode Selection
- **Buttons:** 2-5 values (easy tap selection on mobile)
- **Dropdown:** 6+ values (conserves screen space)
- **Auto:** Let AppSheet decide (usually best)

### Allow Other Values
- **No:** Use for controlled vocabularies (Status, Priority)
- **Yes:** Use for flexible categorization (Tags, Skills)

### Performance
- Avoid complex SELECT expressions in Values if possible
- Cache static lists instead of recalculating
- Use table references for large, changing lists

### Data Quality
- Set REQUIRE: YES for critical status fields
- Use VALID_IF for workflow enforcement
- Prevent invalid state transitions
- Document allowed values in Description

---

## 7. Common Patterns

### Status Field
```appsheet
Column: Status
Type: Enum
Values: Draft, Pending Review, Approved, Rejected, Archived
Allow other values: No
Input mode: Auto
REQUIRE: YES
Initial Value: "Draft"
EDITABLE IF: [Status] <> "Approved"
```

### Priority Field with Buttons
```appsheet
Column: Priority
Type: Enum
Values: High, Medium, Low
Allow other values: No
Input mode: Buttons
Initial Value: "Medium"
REQUIRE: YES
```

### Category with Dynamic Values
```appsheet
Column: Category
Type: Enum
Values: SELECT(Categories[Name], [IsActive] = TRUE)
Allow other values: No
VALID_IF: IN([Category], Categories[Name])
```

### Multi-Select Tags
```appsheet
Column: Tags
Type: EnumList
Values: Marketing, Sales, Product, Engineering, Support, Finance
Allow other values: Yes
Auto-complete other values: Yes
Item separator: ,
REQUIRE: NO
```

### Conditional Enum (using VALID_IF)
```appsheet
Column: SubCategory
Type: Enum
Values: (leave blank in Type Details)
VALID_IF:
  SWITCH([Category],
    "Electronics", LIST("Phones", "Laptops", "Tablets"),
    "Clothing", LIST("Shirts", "Pants", "Shoes"),
    LIST("Other")
  )
```

### Role-Based Enum
```appsheet
Column: ApprovalStatus
Type: Enum
Values: Pending, Approved, Rejected
EDITABLE IF: USERROLE() = "Manager"
SHOW IF: USERROLE() = "Manager" OR [AssignedTo] = USEREMAIL()
```

---

**Related Documentation:**
- [Validation Properties](../column-properties/VALIDATION_PROPERTIES.md)
- [Formulas Reference](../../formulas-reference/FORMULAS_REFERENCE.md)
- [List Functions](../../formulas-reference/list/LIST_FUNCTIONS.md)
- [Centralized Enum Table Pattern](../data-patterns/DROPDOWN_ENUMS_PATTERN.md) — managing all enum values in one sheet tab with support for dependent dropdowns

# Virtual Columns Overview

Virtual columns are formula-calculated columns that don't store data in your data source. They dynamically compute values based on other columns.

## 1. What Are Virtual Columns?

**Definition:** Columns that use App Formula to calculate values instead of storing them

**Key Characteristics:**
- NOT stored in data source (Google Sheets, database)
- Always calculated on-demand
- Always READ-ONLY (users cannot edit)
- Automatically recalculate when dependencies change
- No physical column needed in data source

**Syntax:**
```appsheet
Column Name: CalculatedColumn
Type: [Any type] (Virtual - mark in description or no physical column)
App Formula: <expression>
SHOW: Yes
EDITABLE: No (always read-only)
```

---

## 2. Virtual vs Physical Columns

| Aspect | Physical Column | Virtual Column |
|--------|-----------------|----------------|
| **Storage** | Stored in data source | Not stored |
| **Editable** | Yes (if EDITABLE: Yes) | No (always read-only) |
| **Formula** | Initial Value | App Formula |
| **Updates** | Manual or Action | Automatic |
| **Performance** | Fast (pre-stored) | Calculated (slight overhead) |
| **Use Cases** | User input, permanent data | Calculated, derived values |

**When to Use Virtual:**
- Calculations that change frequently
- Derived values from other columns
- Aggregations (sum, count, average)
- Dereferenced parent values
- Reverse references (child lists)
- Status indicators
- Display-only computed values

**When to Use Physical:**
- User inputs
- Historical data that shouldn't change
- Frequently-accessed values (performance)
- Data from external sources
- Audit fields (if set via Action)

---

## 3. Common Virtual Column Types

### Type 1: Reverse Reference
Get child records that reference the current record.

**Pattern:** `REF_ROWS("ChildTable", "RefColumnInChildTable")`

**Use Cases:**
- One-to-many relationships
- Get all orders for a customer
- Get all tasks for a project
- Get all comments on a post

[See Reverse Reference Patterns →](REVERSE_REFERENCE.md)

### Type 2: Lookup/Dereference
Pull values from a referenced parent record.

**Pattern:** `[RefColumn].[TargetColumn]`

**Use Cases:**
- Display parent record name
- Inherit parent properties
- Calculate based on parent data
- Chain multiple references

[See Lookup Patterns →](LOOKUP_PATTERNS.md)

### Type 3: Calculated Fields
Compute values from other columns.

**Pattern:** Formulas using column values

**Use Cases:**
- Totals ([Price] * [Quantity])
- Concatenations ([First] & " " & [Last])
- Date calculations (TODAY() - [Created])
- Conditional values (IF statements)

[See Calculated Columns →](CALCULATED_COLUMNS.md)

### Type 4: List Type Columns
Work with lists of values.

**Pattern:** LIST(), SELECT(), filter operations

**Use Cases:**
- Filter child records
- Combine multiple lists
- Extract unique values
- Transform list values

[See List Type Columns →](LIST_TYPE_COLUMNS.md)

---

## 4. Virtual Column Patterns

### Reverse Reference (Child Records)
```appsheet
# In parent table (Customers)
Column: Orders
Type: List (Virtual)
App Formula: REF_ROWS("Orders", "CustomerRef")
```

### Lookup (Parent Data)
```appsheet
# In child table (Orders)
Column: CustomerName
Type: Text (Virtual)
App Formula: [CustomerRef].[Name]
```

### Count Children
```appsheet
# In parent table
Column: OrderCount
Type: Number (Virtual)
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))
```

### Sum Children
```appsheet
# In parent table
Column: TotalRevenue
Type: Price (Virtual)
App Formula: SUM(REF_ROWS("Orders", "CustomerRef")[Amount])
```

### Calculated Total
```appsheet
# In any table
Column: Total
Type: Price (Virtual)
App Formula: [Quantity] * [UnitPrice]
```

### Concatenated Display
```appsheet
# In any table
Column: FullName
Type: Text (Virtual)
App Formula: CONCATENATE([FirstName], " ", [LastName])
Label: Yes
```

### Boolean Flag
```appsheet
# In any table
Column: IsOverdue
Type: Yes/No (Virtual)
App Formula: AND([Status] <> "Complete", [DueDate] < TODAY())
```

### Status Indicator
```appsheet
# In any table
Column: StatusColor
Type: Enum (Virtual)
App Formula: IF([Amount] > 1000, "Red", IF([Amount] > 500, "Yellow", "Green"))
```

---

## 5. Aggregation Patterns

### Counting
```appsheet
# Count all children
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))

# Count with condition
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete"))

# Count distinct values
App Formula: COUNT(UNIQUE([Tags]))
```

### Summing
```appsheet
# Simple sum
App Formula: SUM([LineItems][Amount])

# Conditional sum
App Formula: SUM(SELECT([Transactions][Amount], [Type] = "Credit"))

# Sum across relationship
App Formula: SUM(REF_ROWS("Orders", "CustomerRef")[Total])
```

### Averaging
```appsheet
# Simple average
App Formula: AVERAGE([Ratings][Score])

# Weighted average
App Formula: SUM([Items][Price] * [Items][Quantity]) / SUM([Items][Quantity])
```

### Min/Max
```appsheet
# Maximum value
App Formula: MAX([Bids][Amount])

# Minimum date
App Formula: MIN(REF_ROWS("Orders", "CustomerRef")[OrderDate])

# Latest record
App Formula: INDEX(ORDERBY(REF_ROWS("Logs", "RecordRef"), [Timestamp], TRUE), 1)
```

---

## 6. Performance Considerations

### Fast Operations
- Simple arithmetic: `[A] + [B]`
- Text concatenation: `[First] & " " & [Last]`
- Single dereference: `[Ref].[Column]`
- Direct REF_ROWS: `REF_ROWS("Table", "Column")`

### Moderate Operations
- Counting: `COUNT(REF_ROWS(...))`
- Summing: `SUM([List][Column])`
- Filtering: `SELECT(..., condition)`
- Date calculations

### Expensive Operations
- Nested SELECT statements
- Complex ORDERBY operations
- Multiple chained lookups
- Large list iterations
- Recursive calculations

### Optimization Tips
- Cache expensive calculations in virtual columns
- Break complex formulas into multiple virtual columns
- Use simple filters before complex operations
- Minimize SELECT depth
- Avoid calculations in VALID_IF when possible

---

## 7. Best Practices

### Naming Conventions
- Use descriptive names: `OrderCount` not `OC`
- Indicate virtual nature in description
- Prefix aggregations: `Total...`, `Count...`, `Average...`
- Suffix inherited values: `...FromParent`, `...Calculated`

### Formula Design
- Keep formulas simple and readable
- Break complex calculations into steps
- Use meaningful intermediate calculations
- Comment complex logic (in Description)

### When to Use Virtual
**DO use virtual columns for:**
- Calculations that might change
- Derived/computed values
- Display-only fields
- Aggregations of child data
- Dereferenced parent data

**DON'T use virtual columns for:**
- User-editable values
- Historical data that must not change
- High-frequency read operations (consider caching)
- External API results (cache in physical column)

### Data Integrity
- Virtual columns are consistent (always recalculate)
- Physical columns can become stale
- Use virtual for data quality checks
- Use physical for audit trails

---

## 8. Common Patterns

### Display Name
```appsheet
Column: DisplayName
Type: Text (Virtual)
App Formula: CONCATENATE([Code], " - ", [Name])
Label: Yes
```

### Age Calculation
```appsheet
Column: Age
Type: Number (Virtual)
App Formula: YEAR(TODAY()) - YEAR([BirthDate])
```

### Days Remaining
```appsheet
Column: DaysRemaining
Type: Number (Virtual)
App Formula: [DueDate] - TODAY()
```

### Completion Percentage
```appsheet
Column: CompletionPercent
Type: Percent (Virtual)
App Formula: IF([TotalTasks] > 0,
  [CompletedTasks] / [TotalTasks],
  0
)
```

### Has Children Check
```appsheet
Column: HasOrders
Type: Yes/No (Virtual)
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef")) > 0
```

### Latest Child Value
```appsheet
Column: LatestStatus
Type: Text (Virtual)
App Formula: INDEX(
  ORDERBY(REF_ROWS("StatusUpdates", "RecordRef"), [Timestamp], TRUE),
  1
).[Status]
```

### Conditional Display
```appsheet
Column: DisplayStatus
Type: Text (Virtual)
App Formula: IF([IsActive],
  CONCATENATE([Status], " ✓"),
  CONCATENATE([Status], " (Inactive)")
)
```

### Cascaded Lookup
```appsheet
Column: CustomerRegion
Type: Text (Virtual)
App Formula: [OrderRef].[CustomerRef].[Region]
```

---

## 9. Virtual Column Use Cases

### Customer Relationship Management
```appsheet
# In Customers table
Column: TotalOrders
Type: Number (Virtual)
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))

Column: TotalRevenue
Type: Price (Virtual)
App Formula: SUM(REF_ROWS("Orders", "CustomerRef")[Amount])

Column: LastOrderDate
Type: Date (Virtual)
App Formula: MAX(REF_ROWS("Orders", "CustomerRef")[OrderDate])

Column: CustomerValue
Type: Enum (Virtual)
App Formula: IF([TotalRevenue] > 10000, "VIP", IF([TotalRevenue] > 5000, "Premium", "Standard"))
```

### Project Management
```appsheet
# In Projects table
Column: TaskCount
Type: Number (Virtual)
App Formula: COUNT(REF_ROWS("Tasks", "ProjectRef"))

Column: CompletedTasks
Type: Number (Virtual)
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete"))

Column: CompletionPercent
Type: Percent (Virtual)
App Formula: IF([TaskCount] > 0, [CompletedTasks] / [TaskCount], 0)

Column: ProjectStatus
Type: Text (Virtual)
App Formula: IF([CompletionPercent] = 1, "Complete",
  IF([DueDate] < TODAY(), "Overdue", "In Progress")
)
```

### Inventory Management
```appsheet
# In Products table
Column: StockValue
Type: Price (Virtual)
App Formula: [Quantity] * [UnitCost]

Column: NeedsReorder
Type: Yes/No (Virtual)
App Formula: [Quantity] < [ReorderPoint]

Column: DaysSinceLastOrder
Type: Number (Virtual)
App Formula: TODAY() - MAX(REF_ROWS("PurchaseOrders", "ProductRef")[OrderDate])
```

---

## 10. Troubleshooting

### Virtual Column Not Updating
- Check formula syntax
- Verify dependencies exist
- Force recalculation (edit a dependency)
- Check for circular references

### Performance Issues
- Simplify complex formulas
- Break into multiple virtual columns
- Reduce SELECT operations
- Cache results if possible

### Incorrect Values
- Test formula in expression tester
- Check for null/blank handling
- Verify reference relationships
- Test with edge cases

---

## 11. Real-World Patterns

### Stored vs Calculated Decision Framework

**Purpose:** Decide whether to calculate a value as a Google Sheets ARRAYFORMULA (stored in the sheet) or as an AppSheet virtual column (App Formula).

**Decision Table:**

| Requirement | Preferred Approach |
|---|---|
| External tool (Looker Studio, BI, Apps Script) needs to read the value | **Google Sheets ARRAYFORMULA** |
| Value is queried frequently across many rows | **Google Sheets ARRAYFORMULA** |
| Value is only needed inside AppSheet views and formulas | AppSheet App Formula |
| Value must sometimes be editable by the user | Real stored column (no formula) |
| Simple aggregation only used in one AppSheet view | Either |

**Google Sheets ARRAYFORMULA (Stored):**

```excel
# Header cell (Row 1) of the calculated column in the main sheet:
=ARRAYFORMULA(
  IF(ROW(A:A)=1, "ColumnHeader",
    IF(A:A="", "",
      COUNTIF(RelatedSheet!B:B, A:A)    ← replace with your calculation
    )
  )
)
```

**AppSheet App Formula (Virtual — not stored):**

```appsheet
Column Name: [VirtualFieldName]
Type: Number
App Formula: COUNT(SELECT([ChildTable][KeyColumn],
  [RefColumn] = [_THISROW].[KeyColumn]
))
```

**Hybrid Pattern (Sheets calculates, AppSheet reads):**

```appsheet
# Google Sheets: ARRAYFORMULA writes the value to the column
# AppSheet: reads it as a regular non-virtual column (no App Formula needed)
Column Name: [CalculatedCol]
Type: Number
App Formula: (none)
EDITABLE: FALSE    ← prevents accidental overwrite of the sheet-calculated value
```

---

**Detailed Documentation:**
- [Reverse Reference Patterns](REVERSE_REFERENCE.md)
- [Lookup Patterns](LOOKUP_PATTERNS.md)
- [Calculated Columns](CALCULATED_COLUMNS.md)
- [List Type Columns](LIST_TYPE_COLUMNS.md)

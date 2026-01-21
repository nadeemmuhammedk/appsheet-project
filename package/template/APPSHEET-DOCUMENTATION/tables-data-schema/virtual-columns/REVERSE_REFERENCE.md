# Reverse Reference Pattern

Reverse references (REF_ROWS) retrieve child records that reference the current parent record, enabling one-to-many relationships.

## 1. REF_ROWS Function

**Purpose:** Get all child records that reference the current record

**Syntax:**
```appsheet
REF_ROWS("ChildTableName", "RefColumnInChildTable")
```

**Returns:** List of child record references

**Parameters:**
- `ChildTableName`: Name of the child table (in quotes)
- `RefColumnInChildTable`: Name of the Ref column in child table that points to parent

**Example:**
```appsheet
# In Customers table (parent)
Column: Orders
Type: List (Virtual)
App Formula: REF_ROWS("Orders", "CustomerRef")

# Returns all Order records where CustomerRef = current Customer
```

---

## 2. Basic Pattern

### Parent Table Setup
```appsheet
Table: Customers
Primary Key: CustomerID

Column: Orders (Virtual)
Type: List
App Formula: REF_ROWS("Orders", "CustomerRef")
Description: All orders placed by this customer
```

### Child Table Setup
```appsheet
Table: Orders
Primary Key: OrderID

Column: CustomerRef
Type: Ref
Source table: Customers
Label: CustomerName
Description: Reference to customer who placed order
```

**How It Works:**
1. Child table has Ref column pointing to parent
2. Parent table has virtual column with REF_ROWS formula
3. REF_ROWS finds all child records where Ref = current parent record
4. Returns list of child record references

---

## 3. Common Use Cases

### Customer Orders
```appsheet
# In Customers table
Column: Orders
App Formula: REF_ROWS("Orders", "CustomerRef")

Column: OrderCount
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))

Column: TotalRevenue
App Formula: SUM(REF_ROWS("Orders", "CustomerRef")[Amount])
```

### Project Tasks
```appsheet
# In Projects table
Column: Tasks
App Formula: REF_ROWS("Tasks", "ProjectRef")

Column: PendingTasks
App Formula: SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Pending")

Column: CompletionPercent
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete")) /
             COUNT(REF_ROWS("Tasks", "ProjectRef"))
```

### Parent-Child Hierarchy
```appsheet
# In Categories table (self-referencing)
Column: Subcategories
App Formula: REF_ROWS("Categories", "ParentCategoryRef")

Column: SubcategoryCount
App Formula: COUNT(REF_ROWS("Categories", "ParentCategoryRef"))
```

### Comments on Posts
```appsheet
# In Posts table
Column: Comments
App Formula: REF_ROWS("Comments", "PostRef")

Column: CommentCount
App Formula: COUNT(REF_ROWS("Comments", "PostRef"))

Column: LatestComment
App Formula: INDEX(ORDERBY(REF_ROWS("Comments", "PostRef"), [Timestamp], TRUE), 1)
```

---

## 4. Aggregation Patterns

### Count Children
```appsheet
# Count all children
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))

# Count with condition
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete"))

# Has any children
App Formula: COUNT(REF_ROWS("Items", "ParentRef")) > 0
```

### Sum Child Values
```appsheet
# Sum all
App Formula: SUM(REF_ROWS("OrderItems", "OrderRef")[Amount])

# Conditional sum
App Formula: SUM(SELECT(REF_ROWS("Transactions", "AccountRef"), [Type] = "Credit")[Amount])

# Sum of calculated child values
App Formula: SUM(REF_ROWS("LineItems", "OrderRef")[Quantity] * REF_ROWS("LineItems", "OrderRef")[Price])
```

### Average Child Values
```appsheet
# Simple average
App Formula: AVERAGE(REF_ROWS("Ratings", "ProductRef")[Score])

# Weighted average
App Formula: SUM(REF_ROWS("Items", "OrderRef")[Price] * REF_ROWS("Items", "OrderRef")[Quantity]) /
             SUM(REF_ROWS("Items", "OrderRef")[Quantity])
```

### Min/Max Child Values
```appsheet
# Maximum
App Formula: MAX(REF_ROWS("Bids", "AuctionRef")[Amount])

# Minimum
App Formula: MIN(REF_ROWS("Orders", "CustomerRef")[OrderDate])

# Latest/Earliest
App Formula: MAX(REF_ROWS("StatusUpdates", "RecordRef")[Timestamp])
```

---

## 5. Filtering Child Records

### Basic Filtering
```appsheet
# Filter by status
App Formula: SELECT(REF_ROWS("Orders", "CustomerRef"), [Status] = "Pending")

# Filter by date range
App Formula: SELECT(REF_ROWS("Logs", "UserRef"),
  AND([Date] >= TODAY() - 7, [Date] <= TODAY())
)

# Multiple conditions
App Formula: SELECT(REF_ROWS("Tasks", "ProjectRef"),
  AND([Status] = "Pending", [Priority] = "High")
)
```

### Top N Records
```appsheet
# Top 5 most recent
App Formula: TOP(ORDERBY(REF_ROWS("Orders", "CustomerRef"), [OrderDate], TRUE), 5)

# Latest record
App Formula: INDEX(ORDERBY(REF_ROWS("StatusUpdates", "RecordRef"), [Timestamp], TRUE), 1)

# Oldest pending
App Formula: INDEX(ORDERBY(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Pending"), [CreatedDate], FALSE), 1)
```

### Concatenate Child Values
```appsheet
# List of names
App Formula: CONCATENATE(REF_ROWS("Tags", "ItemRef")[TagName])

# List with separator
App Formula: CONCATENATE(REF_ROWS("Assignees", "TaskRef")[Name], ", ")

# Filtered concatenation
App Formula: CONCATENATE(
  SELECT(REF_ROWS("Skills", "EmployeeRef"), [Level] = "Expert")[SkillName]
)
```

---

## 6. Advanced Patterns

### Nested Aggregations
```appsheet
# Total of all grandchild records
App Formula: SUM(
  LIST(
    SELECT(Customers[CustomerID], TRUE),
    SUM(REF_ROWS("Orders", "CustomerRef")[Amount])
  )
)

# Average of child averages
App Formula: AVERAGE(
  SELECT(Projects[ProjectID], TRUE),
  AVERAGE(REF_ROWS("Tasks", "ProjectRef")[Score])
)
```

### Conditional Aggregations
```appsheet
# Sum high-priority items only
App Formula: SUM(
  SELECT(REF_ROWS("Tasks", "ProjectRef"), [Priority] = "High")[EstimatedHours]
)

# Count by multiple conditions
App Formula: COUNT(
  SELECT(REF_ROWS("Orders", "CustomerRef"),
    AND([Status] = "Shipped", [ShipDate] >= TODAY() - 30)
  )
)

# Percentage of completed
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Complete] = TRUE)) /
             COUNT(REF_ROWS("Tasks", "ProjectRef"))
```

### Multiple Child Tables
```appsheet
# Total from two child tables
App Formula: SUM(REF_ROWS("SalesOrders", "CustomerRef")[Amount]) +
             SUM(REF_ROWS("ServiceOrders", "CustomerRef")[Amount])

# Combined count
App Formula: COUNT(REF_ROWS("Contacts", "CompanyRef")) +
             COUNT(REF_ROWS("Employees", "CompanyRef"))
```

### Child Status Indicators
```appsheet
# Has pending children
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Pending")) > 0

# All children complete
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] <> "Complete")) = 0

# Any overdue children
App Formula: COUNT(
  SELECT(REF_ROWS("Tasks", "ProjectRef"),
    AND([Status] <> "Complete", [DueDate] < TODAY())
  )
) > 0
```

---

## 7. Performance Optimization

### Efficient Patterns
```appsheet
# Good: Single REF_ROWS call
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))

# Better: Cache in variable (not directly supported, use multiple virtual columns)
Column: CachedOrders
App Formula: REF_ROWS("Orders", "CustomerRef")

Column: OrderCount
App Formula: COUNT([CachedOrders])
```

### Avoid Expensive Patterns
```appsheet
# Expensive: Multiple REF_ROWS in same formula
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef")) +
             SUM(REF_ROWS("Orders", "CustomerRef")[Amount])
# Better: Use two virtual columns or cache

# Expensive: Nested REF_ROWS
App Formula: SUM(
  REF_ROWS("Orders", "CustomerRef"),
  SUM(REF_ROWS("OrderItems", "OrderRef")[Amount])
)
# Better: Aggregate at lowest level, then sum
```

---

## 8. Common Patterns

### Basic Child List
```appsheet
# In parent table
Column: ChildRecords
Type: List (Virtual)
App Formula: REF_ROWS("ChildTable", "ParentRef")
```

### Child Count
```appsheet
Column: ChildCount
Type: Number (Virtual)
App Formula: COUNT(REF_ROWS("ChildTable", "ParentRef"))
```

### Child Sum
```appsheet
Column: TotalAmount
Type: Price (Virtual)
App Formula: SUM(REF_ROWS("ChildTable", "ParentRef")[Amount])
```

### Has Children
```appsheet
Column: HasChildren
Type: Yes/No (Virtual)
App Formula: COUNT(REF_ROWS("ChildTable", "ParentRef")) > 0
```

### Latest Child
```appsheet
Column: LatestChild
Type: Ref (Virtual)
App Formula: INDEX(
  ORDERBY(REF_ROWS("ChildTable", "ParentRef"), [Date], TRUE),
  1
)
```

### Filtered Children
```appsheet
Column: ActiveChildren
Type: List (Virtual)
App Formula: SELECT(REF_ROWS("ChildTable", "ParentRef"), [IsActive] = TRUE)
```

### Child Status Summary
```appsheet
Column: StatusSummary
Type: Text (Virtual)
App Formula: CONCATENATE(
  "Total: ", COUNT(REF_ROWS("Tasks", "ProjectRef")),
  " | Pending: ", COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Pending")),
  " | Complete: ", COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete"))
)
```

---

## 9. Best Practices

### Naming Conventions
- Use plural names for child lists: `Orders`, `Tasks`, `Comments`
- Use descriptive aggregation names: `OrderCount`, `TotalRevenue`
- Suffix status indicators: `HasOrders`, `AllTasksComplete`

### Performance
- Cache REF_ROWS results in one virtual column
- Reference cached column in other calculations
- Minimize nested REF_ROWS operations
- Use SELECT filters efficiently

### Data Integrity
- Ensure child Ref column exists
- Verify Ref column points to correct parent table
- Test with no children (empty lists)
- Handle null/blank child values

---

**Related Documentation:**
- [Virtual Columns Overview](VIRTUAL_COLUMNS_OVERVIEW.md)
- [Reference Types](../column-types/REFERENCE_TYPES.md)
- [Data Relationships](../data-relationships/RELATIONSHIPS_OVERVIEW.md)
- [List Functions](../../formulas-reference/list/LIST_FUNCTIONS.md)

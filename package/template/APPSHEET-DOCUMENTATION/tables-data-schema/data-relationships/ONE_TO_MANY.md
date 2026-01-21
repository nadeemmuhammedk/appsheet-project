# One-to-Many Relationships

One-to-many (1:M) relationships link a single parent record to multiple child records.

## 1. Relationship Pattern

**Definition:** One record in the parent table relates to many records in the child table

**Examples:**
- One Customer → Many Orders
- One Project → Many Tasks
- One Category → Many Products
- One Teacher → Many Students
- One Department → Many Employees

**Implementation:** Ref column in child table + REF_ROWS in parent table

---

## 2. Basic Setup

### Parent Table (One Side)
```appsheet
Table: Customers
Primary Key: CustomerID

Column: CustomerID
Type: Text
Key: Yes
Initial Value: "CUST-" & UNIQUEID()

Column: CustomerName
Type: Text
Label: Yes

# Virtual column to access child records
Column: Orders
Type: List (Virtual)
App Formula: REF_ROWS("Orders", "CustomerRef")
Description: All orders for this customer
```

### Child Table (Many Side)
```appsheet
Table: Orders
Primary Key: OrderID

Column: OrderID
Type: Text
Key: Yes
Initial Value: "ORD-" & UNIQUEID()

# Reference to parent
Column: CustomerRef
Type: Ref
Source table: Customers
Label: CustomerName
REQUIRE: Yes
Description: Customer who placed this order

# Virtual column to access parent data
Column: CustomerName
Type: Text (Virtual)
App Formula: [CustomerRef].[CustomerName]
```

---

## 3. Parent Table Patterns

### Access Child Records
```appsheet
# In parent table (Customers)

# Get all child records
Column: Orders
Type: List (Virtual)
App Formula: REF_ROWS("Orders", "CustomerRef")
```

### Count Children
```appsheet
Column: OrderCount
Type: Number (Virtual)
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))
```

### Sum Child Values
```appsheet
Column: TotalRevenue
Type: Price (Virtual)
App Formula: SUM(REF_ROWS("Orders", "CustomerRef")[Amount])
```

### Filter Children
```appsheet
Column: PendingOrders
Type: List (Virtual)
App Formula: SELECT(REF_ROWS("Orders", "CustomerRef"), [Status] = "Pending")

Column: PendingOrderCount
Type: Number (Virtual)
App Formula: COUNT(SELECT(REF_ROWS("Orders", "CustomerRef"), [Status] = "Pending"))
```

### Latest Child
```appsheet
Column: LastOrderDate
Type: Date (Virtual)
App Formula: MAX(REF_ROWS("Orders", "CustomerRef")[OrderDate])

Column: LatestOrder
Type: Ref (Virtual)
App Formula: INDEX(
  ORDERBY(REF_ROWS("Orders", "CustomerRef"), [OrderDate], TRUE),
  1
)
```

### Has Children
```appsheet
Column: HasOrders
Type: Yes/No (Virtual)
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef")) > 0
```

---

## 4. Child Table Patterns

### Reference Parent
```appsheet
# In child table (Orders)

Column: CustomerRef
Type: Ref
Source table: Customers
Label: CustomerName
REQUIRE: Yes
VALID_IF: IN([CustomerRef], Customers[CustomerID])
```

### Inherit Parent Values
```appsheet
# Access parent data via dereference

Column: CustomerName
Type: Text (Virtual)
App Formula: [CustomerRef].[CustomerName]

Column: CustomerEmail
Type: Email (Virtual)
App Formula: [CustomerRef].[Email]

Column: CustomerRegion
Type: Text (Virtual)
App Formula: [CustomerRef].[Region]
```

### Validate Against Parent
```appsheet
Column: Amount
Type: Price
VALID_IF: [Amount] <= [CustomerRef].[CreditLimit]

Column: OrderDate
Type: Date
VALID_IF: [OrderDate] >= [CustomerRef].[AccountStartDate]
```

---

## 5. Common Relationship Patterns

### Customer → Orders
```appsheet
# Parent: Customers
Column: Orders
App Formula: REF_ROWS("Orders", "CustomerRef")

Column: TotalSpent
App Formula: SUM(REF_ROWS("Orders", "CustomerRef")[Total])

# Child: Orders
Column: CustomerRef
Type: Ref → Customers

Column: CustomerName
App Formula: [CustomerRef].[Name]
```

### Project → Tasks
```appsheet
# Parent: Projects
Column: Tasks
App Formula: REF_ROWS("Tasks", "ProjectRef")

Column: CompletedTasks
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete"))

Column: CompletionPercent
App Formula: IF(COUNT([Tasks]) > 0,
  COUNT([CompletedTasks]) / COUNT([Tasks]),
  0
)

# Child: Tasks
Column: ProjectRef
Type: Ref → Projects

Column: ProjectName
App Formula: [ProjectRef].[Name]
```

### Category → Products
```appsheet
# Parent: Categories
Column: Products
App Formula: REF_ROWS("Products", "CategoryRef")

Column: ProductCount
App Formula: COUNT(REF_ROWS("Products", "CategoryRef"))

# Child: Products
Column: CategoryRef
Type: Ref → Categories

Column: CategoryName
App Formula: [CategoryRef].[Name]
```

### Department → Employees
```appsheet
# Parent: Departments
Column: Employees
App Formula: REF_ROWS("Employees", "DepartmentRef")

Column: EmployeeCount
App Formula: COUNT(REF_ROWS("Employees", "DepartmentRef"))

Column: TotalSalary
App Formula: SUM(REF_ROWS("Employees", "DepartmentRef")[Salary])

# Child: Employees
Column: DepartmentRef
Type: Ref → Departments

Column: DepartmentName
App Formula: [DepartmentRef].[Name]
```

---

## 6. Cascading Operations

### Prevent Parent Deletion If Has Children
```appsheet
# In parent table (Customers)
DELETES: COUNT(REF_ROWS("Orders", "CustomerRef")) = 0

# Or with custom message
DELETES: IF(
  COUNT(REF_ROWS("Orders", "CustomerRef")) > 0,
  FALSE,
  TRUE
) - "Cannot delete customer with orders"
```

### Auto-Delete Children (Use with Caution)
```appsheet
# Requires Actions and Automation
# Create an Action on parent table that deletes children
# Triggered when parent is deleted
# Not recommended - prefer soft deletes or warnings
```

### Inherit Parent Status
```appsheet
# In child table (Orders)
Column: CustomerStatus
Type: Text (Virtual)
App Formula: [CustomerRef].[Status]

# Show warning if parent inactive
SHOW IF: [CustomerRef].[IsActive] = TRUE
```

---

## 7. Validation Patterns

### Require Valid Parent
```appsheet
# In child table
Column: CustomerRef
REQUIRE: Yes
VALID_IF: IN([CustomerRef], Customers[CustomerID])
```

### Limit Children Per Parent
```appsheet
# In child table
VALID_IF: COUNT(
  SELECT(Orders[OrderID],
    AND([CustomerRef] = [_THISROW].[CustomerRef],
        [Status] = "Pending")
  )
) < 10 - "Customer has too many pending orders"
```

### Parent Must Be Active
```appsheet
# In child table
Column: CustomerRef
VALID_IF: AND(
  IN([CustomerRef], Customers[CustomerID]),
  [CustomerRef].[IsActive] = TRUE
) - "Selected customer is inactive"
```

---

## 8. Display Patterns

### Parent Detail View
```appsheet
# Show child records in parent detail view
# UX > Views > Customer Detail View
# Add "Related Orders" view using Ref column
```

### Child Form Auto-Fill
```appsheet
# In child form, when parent selected
# Auto-fill fields from parent using virtual columns

Column: ShippingAddress (Virtual)
App Formula: IF(ISBLANK([CustomAddress]),
  [CustomerRef].[DefaultAddress],
  [CustomAddress]
)
```

### Parent Summary
```appsheet
# In parent table
Column: OrderSummary
Type: Text (Virtual)
App Formula: CONCATENATE(
  "Total Orders: ", COUNT([Orders]),
  " | Pending: ", COUNT(SELECT([Orders], [Status] = "Pending")),
  " | Revenue: $", TEXT([TotalRevenue], "#,##0.00")
)
```

---

## 9. Performance Optimization

### Cache REF_ROWS
```appsheet
# Instead of multiple REF_ROWS calls
# Bad:
Column: OrderCount
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))

Column: TotalAmount
App Formula: SUM(REF_ROWS("Orders", "CustomerRef")[Amount])

# Good:
Column: Orders (Cache)
App Formula: REF_ROWS("Orders", "CustomerRef")

Column: OrderCount
App Formula: COUNT([Orders])

Column: TotalAmount
App Formula: SUM([Orders][Amount])
```

### Index Ref Columns
```appsheet
# Make Ref column searchable for better performance
Column: CustomerRef
Type: Ref
SEARCH: Yes
```

---

## 10. Best Practices

### Naming Conventions
- **Parent → Child (plural):** `Orders`, `Tasks`, `Products`
- **Child → Parent (singular):** `CustomerRef`, `ProjectRef`, `CategoryRef`
- **Suffix Ref columns:** Always end with "Ref"
- **Aggregations:** `OrderCount`, `TotalRevenue`, `AvgRating`

### Relationship Design
- Store Ref on the "many" side (child table)
- Use REF_ROWS on the "one" side (parent table)
- Always validate Ref columns (VALID_IF)
- Make Ref columns REQUIRE: Yes (unless optional)

### Data Integrity
- Prevent orphaned records (validate Refs)
- Consider cascading deletes carefully
- Use soft deletes (IsDeleted flag) for safety
- Protect parent deletion if has children

### Performance
- Cache REF_ROWS in virtual columns
- Index Ref columns (SEARCH: Yes)
- Minimize nested aggregations
- Use efficient filters

---

## 11. Common Patterns

### Basic 1:M Setup
```appsheet
# Parent table
Table: Customers
Column: CustomerID (Key)
Column: Orders (Virtual): REF_ROWS("Orders", "CustomerRef")

# Child table
Table: Orders
Column: OrderID (Key)
Column: CustomerRef (Ref → Customers)
```

### With Aggregations
```appsheet
# Parent table
Column: OrderCount: COUNT(REF_ROWS("Orders", "CustomerRef"))
Column: TotalRevenue: SUM(REF_ROWS("Orders", "CustomerRef")[Amount])
Column: AvgOrderValue: AVERAGE(REF_ROWS("Orders", "CustomerRef")[Amount])
```

### With Inheritance
```appsheet
# Child table
Column: CustomerName (Virtual): [CustomerRef].[Name]
Column: CustomerEmail (Virtual): [CustomerRef].[Email]
Column: BillingAddress (Virtual): [CustomerRef].[DefaultBillingAddress]
```

### With Validation
```appsheet
# Child table
Column: CustomerRef
REQUIRE: Yes
VALID_IF: AND(
  IN([CustomerRef], Customers[CustomerID]),
  [CustomerRef].[IsActive] = TRUE
) - "Invalid or inactive customer"
```

---

## 12. Troubleshooting

### Ref Not Showing Records
- Verify Source table is correct
- Check Label column exists
- Ensure parent records exist
- Verify Ref column type is Ref

### REF_ROWS Returning Empty
- Check child Ref column name matches formula
- Verify child records exist
- Check child Ref values match parent keys
- Test with known matching records

### Performance Issues
- Cache REF_ROWS results
- Minimize aggregation complexity
- Index Ref columns
- Reduce filter complexity

---

**Related Documentation:**
- [Reference Types](../column-types/REFERENCE_TYPES.md)
- [Reverse Reference](../virtual-columns/REVERSE_REFERENCE.md)
- [Data Relationships Overview](RELATIONSHIPS_OVERVIEW.md)
- [Many-to-Many](MANY_TO_MANY.md)

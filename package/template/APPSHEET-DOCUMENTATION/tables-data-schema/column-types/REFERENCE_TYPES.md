# Reference Column Types

Reference types create relationships between tables, enabling relational data models.

## 1. Ref Type

**Purpose:** Create a foreign key relationship to another table (one-to-one or many-to-one)

**Configuration:**
```appsheet
Type: Ref
Type Details:
  Source table: TableName
  Label: ColumnName (from source table)
  Element type: Auto/Ref
  Input mode: Auto/Dropdown/Form
Key: No
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
SEARCH: YES
```

**Common Use Cases:**
- Customer reference in Orders table
- Employee reference in Tasks table
- Category reference in Products table
- Parent reference in hierarchical data
- Lookup relationships

**How Ref Works:**
- Stores the primary key value from the referenced table
- Displays the Label column value to users
- Creates a navigable link to the referenced record
- Enables dereferencing: `[RefColumn].[TargetColumn]`

**Type Details Parameters:**

**Source table:**
- The table being referenced
- Example: `Customers`

**Label:**
- Column from source table shown to users
- Usually a name or title column
- Example: `CustomerName`

**Element type:**
- `Auto`: AppSheet determines display
- `Ref`: Force reference display

**Input mode:**
- `Auto`: AppSheet chooses best input method
- `Dropdown`: Show as dropdown list
- `Form`: Show selection through form view

---

## 2. List Type

**Purpose:** Create a foreign key relationship to multiple records (one-to-many stored on parent side)

**Configuration:**
```appsheet
Type: List
Type Details:
  Element type: TableName
  Item separator: , (comma)
Key: No
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: NO
SEARCH: NO (usually)
```

**Common Use Cases:**
- Multiple assignees for a task
- Multiple categories for a product
- Multiple skills for an employee
- Tags referencing a lookup table

**How List Works:**
- Stores multiple primary key values
- Format: `"KEY1, KEY2, KEY3"`
- Less common than Ref + REF_ROWS pattern
- Limited functionality compared to proper child tables

**Type Details Parameters:**

**Element type:**
- The table being referenced
- Example: `Employees`

**Item separator:**
- `,` (comma) - default
- `;` (semicolon)
- `|` (pipe)

---

## 3. Dereferencing (Ref Lookup)

**Syntax:** `[RefColumn].[TargetColumn]`

**Purpose:** Access values from the referenced record

**Examples:**
```appsheet
# Get customer name from order
[CustomerRef].[CustomerName]

# Get employee email from task
[AssignedToRef].[Email]

# Get category color from product
[CategoryRef].[Color]

# Chain multiple refs
[OrderRef].[CustomerRef].[CompanyName]

# Get list of values
[CategoryRef].[Tags]
```

**Use Cases:**
- Display related information
- Inherit values from parent
- Validation based on related data
- Calculated fields using parent data

---

## 4. Reverse Reference (REF_ROWS)

**Syntax:** `REF_ROWS("ChildTable", "RefColumnInChildTable")`

**Purpose:** Get all child records that reference the current record

**Examples:**
```appsheet
# Get all orders for a customer (virtual column in Customers table)
REF_ROWS("Orders", "CustomerRef")

# Get all tasks assigned to an employee
REF_ROWS("Tasks", "AssignedToRef")

# Get all comments on a post
REF_ROWS("Comments", "PostRef")

# Filter child records
SELECT(REF_ROWS("Orders", "CustomerRef"), [Status] = "Pending")
```

**Returns:** List of record references

**Use Cases:**
- One-to-many relationships
- Aggregations (count, sum) of child records
- Displaying child records in parent detail view
- Parent-child workflows

---

## 5. Validation Patterns

### Ref Validation
```appsheet
# Require valid reference
VALID_IF: IN([CustomerRef], Customers[CustomerID])

# Conditional requirement
VALID_IF: IF([Type] = "Customer Order", ISNOTBLANK([CustomerRef]), TRUE)

# Prevent self-reference
VALID_IF: [ParentRef] <> [_THISROW].[ID]

# Restrict to active records
VALID_IF: IN([CategoryRef], SELECT(Categories[CategoryID], [IsActive] = TRUE))

# Prevent circular references (complex)
VALID_IF: NOT(IN([_THISROW].[ID], [ParentRef].[AllAncestors]))
```

### List Validation
```appsheet
# Require at least one selection
VALID_IF: COUNT([AssignedToList]) > 0

# Limit selections
VALID_IF: COUNT([TagsList]) <= 5

# Require specific reference
VALID_IF: IN([PrimaryAssignee], [AssignedToList])
```

---

## 6. Formula Examples

### Ref Formulas
```appsheet
# Set default reference
Initial Value: LOOKUP(USEREMAIL(), "Employees", "Email", "EmployeeID")

# Virtual ref based on calculation
App Formula: LOOKUP([CustomerCode], "Customers", "Code", "CustomerID")

# Conditional reference
App Formula: IF([Type] = "Internal", [InternalRef], [ExternalRef])

# Get reference from list (first item)
App Formula: INDEX([RefList], 1)
```

### Dereferencing Formulas
```appsheet
# Inherit parent value
App Formula: [ParentRef].[Status]

# Calculate from parent
App Formula: [ProductRef].[BasePrice] * (1 + [TaxRate])

# Concatenate parent values
App Formula: CONCATENATE([OrderRef].[OrderNumber], "-", [LineNumber])

# Check parent status
VALID_IF: [TaskRef].[Status] <> "Completed"
```

### Reverse Reference Formulas
```appsheet
# Count child records
App Formula (Number): COUNT(REF_ROWS("Orders", "CustomerRef"))

# Sum child values
App Formula (Price): SUM(REF_ROWS("Orders", "CustomerRef")[Amount])

# Check if has children
App Formula (Yes/No): COUNT(REF_ROWS("Comments", "PostRef")) > 0

# Get latest child
App Formula (Ref): INDEX(ORDERBY(REF_ROWS("Logs", "RecordRef"), [Timestamp], TRUE), 1)

# Concatenate child values
App Formula (Text): CONCATENATE(REF_ROWS("Tags", "ItemRef")[TagName])
```

---

## 7. Ref vs List vs REF_ROWS

| Pattern | Use Case | Stored Where | Example |
|---------|----------|--------------|---------|
| **Ref** | Many-to-one | Child table | Many Orders → One Customer |
| **List** | Many-to-many (simple) | Parent table | One Task → Many Assignees |
| **REF_ROWS** | One-to-many (virtual) | Calculated | One Customer → Many Orders |

### Best Practice: Ref + REF_ROWS Pattern

**Recommended approach for one-to-many:**

**Parent Table (Customers):**
```appsheet
Column: CustomerID (Primary Key)
Column: CustomerName
Column: Orders (Virtual, List):
  Formula: REF_ROWS("Orders", "CustomerRef")
Column: OrderCount (Virtual, Number):
  Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))
```

**Child Table (Orders):**
```appsheet
Column: OrderID (Primary Key)
Column: CustomerRef (Ref → Customers)
Column: CustomerName (Virtual, Text):
  Formula: [CustomerRef].[CustomerName]
```

**Why not List type?**
- List stores data redundantly
- Harder to maintain data integrity
- Limited aggregation capabilities
- Ref + REF_ROWS is more flexible

---

## 8. Best Practices

### When to Use Ref
- Many-to-one relationships
- Strict data integrity needed
- Need to dereference parent data
- Standard foreign key pattern

### When to Use List
- Simple many-to-many (no metadata)
- Fewer than 10 references typically
- Don't need aggregations
- Quick prototyping

### When to Use Junction Table Instead
- Many-to-many with metadata
- Need to track relationship details
- More than 10-20 references
- Complex relationship logic

### Performance
- Index referenced columns (set as Key)
- Minimize dereferencing in loops
- Cache dereferenced values in virtual columns
- Use LOOKUP for simple one-time lookups

### Data Integrity
- Always validate Ref columns: `IN([Ref], SourceTable[Key])`
- Set REQUIRE: YES for mandatory relationships
- Prevent orphaned records with security rules
- Use EDITABLE IF to lock references after creation

### User Experience
- Set meaningful Label columns (names, not IDs)
- Use Auto input mode (AppSheet optimizes)
- Enable SEARCH on commonly-filtered refs
- Show ref columns in child table forms
- Hide ref columns in parent table (use virtual reverse refs)

---

## 9. Common Patterns

### Basic Foreign Key
```appsheet
# In Orders table
Column: CustomerRef
Type: Ref
Source table: Customers
Label: CustomerName
REQUIRE: YES
VALID_IF: IN([CustomerRef], Customers[CustomerID])
```

### Hierarchical Data (Self-Reference)
```appsheet
# In Categories table
Column: ParentCategoryRef
Type: Ref
Source table: Categories
Label: CategoryName
REQUIRE: NO
VALID_IF: [ParentCategoryRef] <> [_THISROW].[CategoryID]
```

### Virtual Reverse Reference
```appsheet
# In Customers table (parent)
Column: Orders
Type: List (Virtual)
Formula: REF_ROWS("Orders", "CustomerRef")
```

### Inherited Parent Value
```appsheet
# In Orders table (child)
Column: CustomerName
Type: Text (Virtual)
Formula: [CustomerRef].[CustomerName]
SHOW: TRUE (display only, not editable)
```

### Count of Children
```appsheet
# In Projects table (parent)
Column: TaskCount
Type: Number (Virtual)
Formula: COUNT(REF_ROWS("Tasks", "ProjectRef"))
```

### Sum of Children
```appsheet
# In Orders table (parent)
Column: TotalAmount
Type: Price (Virtual)
Formula: SUM(REF_ROWS("OrderItems", "OrderRef")[Amount])
```

### Conditional Reference
```appsheet
# In Transactions table
Column: AccountRef
Type: Ref
Source table: Accounts
VALID_IF: SELECT(Accounts[AccountID], [AccountType] = [_THISROW].[TransactionType])
```

### Lookup-Based Default Value
```appsheet
# In Orders table
Column: CustomerRef
Type: Ref
Initial Value: LOOKUP(USEREMAIL(), "Customers", "Email", "CustomerID")
```

---

**Related Documentation:**
- [Data Relationships](../data-relationships/RELATIONSHIPS_OVERVIEW.md)
- [Virtual Columns](../virtual-columns/VIRTUAL_COLUMNS_OVERVIEW.md)
- [List Functions](../../formulas-reference/list/LIST_FUNCTIONS.md)
- [Dereference](../../formulas-reference/dereference/DEREFERENCE.md)

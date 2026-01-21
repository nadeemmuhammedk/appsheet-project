# List Type Columns

List type columns work with collections of values, often from REF_ROWS or multi-select fields.

## 1. List Column Types

### List (Ref List)
```appsheet
Type: List
Element type: TableName
# Multiple references to another table
```

### EnumList
```appsheet
Type: EnumList
Values: Value1, Value2, Value3
# Multiple selections from predefined list
```

### Virtual List (REF_ROWS)
```appsheet
Type: List (Virtual)
App Formula: REF_ROWS("ChildTable", "RefColumn")
# List of child record references
```

---

## 2. List Operations

### Count Items
```appsheet
# Count list items
App Formula: COUNT([ListColumn])

# Count child records
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))
```

### Sum List Values
```appsheet
# Sum specific column from list
App Formula: SUM([ChildRecords][Amount])

# Sum from REF_ROWS
App Formula: SUM(REF_ROWS("LineItems", "OrderRef")[Price])
```

### Filter Lists
```appsheet
# Filter child records
App Formula: SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Pending")

# Filter and count
App Formula: COUNT(SELECT([Items], [IsActive] = TRUE))
```

### Concatenate List Values
```appsheet
# Join list items
App Formula: CONCATENATE([Tags])

# With separator
App Formula: CONCATENATE(REF_ROWS("Tags", "ItemRef")[Name], ", ")
```

---

## 3. List Aggregations

### Average
```appsheet
App Formula: AVERAGE([Ratings][Score])
```

### Max/Min
```appsheet
App Formula: MAX([Bids][Amount])
App Formula: MIN([Prices][Value])
```

### Latest/Earliest
```appsheet
# Latest child record
App Formula: INDEX(
  ORDERBY(REF_ROWS("Updates", "RecordRef"), [Timestamp], TRUE),
  1
)
```

---

## 4. Common Patterns

### Child Record List
```appsheet
Column: Orders
Type: List (Virtual)
App Formula: REF_ROWS("Orders", "CustomerRef")
```

### Filtered Children
```appsheet
Column: PendingOrders
Type: List (Virtual)
App Formula: SELECT(REF_ROWS("Orders", "CustomerRef"), [Status] = "Pending")
```

### Count of Children
```appsheet
Column: OrderCount
Type: Number (Virtual)
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))
```

### Sum of Children
```appsheet
Column: TotalRevenue
Type: Price (Virtual)
App Formula: SUM(REF_ROWS("Orders", "CustomerRef")[Amount])
```

---

## 5. EnumList Patterns

### Multi-Select Tags
```appsheet
Column: Tags
Type: EnumList
Values: Marketing, Sales, Product, Engineering
```

### Count Selections
```appsheet
Column: TagCount
Type: Number (Virtual)
App Formula: COUNT([Tags])
```

### Check if Contains
```appsheet
Column: IsMarketing
Type: Yes/No (Virtual)
App Formula: IN("Marketing", [Tags])
```

---

**Related Documentation:**
- [Virtual Columns Overview](VIRTUAL_COLUMNS_OVERVIEW.md)
- [Reverse Reference](REVERSE_REFERENCE.md)
- [List Functions](../../formulas-reference/list/LIST_FUNCTIONS.md)

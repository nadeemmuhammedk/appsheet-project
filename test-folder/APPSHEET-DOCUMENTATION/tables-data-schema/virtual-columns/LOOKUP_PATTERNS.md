# Lookup Patterns (Dereferencing)

Lookup patterns use dereferencing to access values from related tables through Ref columns.

## 1. Basic Dereferencing

**Syntax:** `[RefColumn].[TargetColumn]`

**Purpose:** Access values from referenced parent record

**Example:**
```appsheet
# In Orders table
Column: CustomerName
Type: Text (Virtual)
App Formula: [CustomerRef].[Name]

# Returns the Name from the referenced Customer record
```

---

## 2. Common Lookup Patterns

### Single Value Lookup
```appsheet
# Get customer name
App Formula: [CustomerRef].[CustomerName]

# Get product price
App Formula: [ProductRef].[Price]

# Get category name
App Formula: [CategoryRef].[Name]
```

### Multiple Value Lookup
```appsheet
# Inherit multiple parent values
Column: CustomerEmail
App Formula: [CustomerRef].[Email]

Column: CustomerPhone
App Formula: [CustomerRef].[Phone]

Column: CustomerAddress
App Formula: [CustomerRef].[Address]
```

### Chained Dereference
```appsheet
# Access grandparent value
App Formula: [OrderRef].[CustomerRef].[CompanyName]

# Multiple levels
App Formula: [TaskRef].[ProjectRef].[DepartmentRef].[Name]
```

---

## 3. Calculated Lookups

### Inherit and Calculate
```appsheet
# Customer's discount rate applied to price
App Formula: [ProductRef].[BasePrice] * (1 - [CustomerRef].[DiscountRate])

# Tax based on customer state
App Formula: [Subtotal] * [CustomerRef].[StateTaxRate]
```

### Conditional Lookup
```appsheet
# Use custom or inherit
App Formula: IF(ISNOTBLANK([CustomAddress]),
  [CustomAddress],
  [CustomerRef].[DefaultAddress]
)
```

---

## 4. Lookup Best Practices

- Cache frequently-used lookups in virtual columns
- Minimize chained dereferencing (performance)
- Handle blank refs: `IF(ISNOTBLANK([Ref]), [Ref].[Value], "")`
- Use for read-only inherited data
- Index Ref columns (SEARCH: Yes)

---

## 5. Common Patterns

### Inherit Parent Name
```appsheet
Column: CategoryName
Type: Text (Virtual)
App Formula: [CategoryRef].[Name]
```

### Calculate with Parent Data
```appsheet
Column: DiscountedPrice
Type: Price (Virtual)
App Formula: [ProductRef].[Price] * (1 - [CustomerRef].[DiscountPercent])
```

### Display Formatted Parent Info
```appsheet
Column: ProjectInfo
Type: Text (Virtual)
App Formula: CONCATENATE(
  [ProjectRef].[Code], " - ",
  [ProjectRef].[Name], " (",
  [ProjectRef].[Status], ")"
)
```

---

**Related Documentation:**
- [Virtual Columns Overview](VIRTUAL_COLUMNS_OVERVIEW.md)
- [Reference Types](../column-types/REFERENCE_TYPES.md)
- [Data Relationships](../data-relationships/RELATIONSHIPS_OVERVIEW.md)

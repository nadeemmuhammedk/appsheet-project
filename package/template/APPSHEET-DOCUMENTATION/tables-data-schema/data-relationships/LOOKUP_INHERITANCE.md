# Lookup & Inheritance Patterns

Lookup and inheritance patterns use dereferencing to access and inherit values from parent tables.

## 1. Dereferencing Syntax

**Basic Pattern:** `[RefColumn].[TargetColumn]`

**Purpose:** Access values from referenced parent record

**Example:**
```appsheet
# In Orders table
Column: CustomerName (Virtual)
Type: Text
App Formula: [CustomerRef].[Name]
```

---

## 2. Single Value Inheritance

### Inherit Parent Attribute
```appsheet
# In child table (Orders)
Column: CustomerEmail (Virtual)
App Formula: [CustomerRef].[Email]

Column: CustomerPhone (Virtual)
App Formula: [CustomerRef].[Phone]

Column: CustomerRegion (Virtual)
App Formula: [CustomerRef].[Region]
```

---

## 3. Multiple Value Inheritance

**Inherit several parent values:**
```appsheet
# In Orders table
Column: ShippingAddress (Virtual)
App Formula: [CustomerRef].[DefaultShippingAddress]

Column: BillingAddress (Virtual)
App Formula: [CustomerRef].[DefaultBillingAddress]

Column: PaymentTerms (Virtual)
App Formula: [CustomerRef].[DefaultPaymentTerms]

Column: TaxRate (Virtual)
App Formula: [CustomerRef].[TaxRate]
```

---

## 4. Calculated Inheritance

**Use parent data in calculations:**
```appsheet
# Apply customer discount to product price
Column: DiscountedPrice (Virtual)
Type: Price
App Formula: [ProductRef].[BasePrice] * (1 - [CustomerRef].[DiscountRate])

# Calculate with parent tax rate
Column: TotalWithTax (Virtual)
Type: Price
App Formula: [Subtotal] * (1 + [CustomerRef].[TaxRate])
```

---

## 5. Chained Dereferencing

**Access grandparent values:**
```appsheet
# Orders → Customer → Region
Column: RegionName (Virtual)
App Formula: [CustomerRef].[RegionRef].[Name]

# Tasks → Project → Department
Column: DepartmentName (Virtual)
App Formula: [ProjectRef].[DepartmentRef].[Name]

# LineItem → Order → Customer
Column: CustomerName (Virtual)
App Formula: [OrderRef].[CustomerRef].[Name]
```

---

## 6. Conditional Inheritance

**Use custom or inherit from parent:**
```appsheet
# Use custom address or inherit default
Column: ShippingAddress (Virtual)
App Formula: IF(ISNOTBLANK([CustomShippingAddress]),
  [CustomShippingAddress],
  [CustomerRef].[DefaultShippingAddress]
)

# Override or use parent value
Column: SpecialDiscount (Virtual)
App Formula: IF([HasSpecialDiscount],
  [CustomDiscount],
  [CustomerRef].[StandardDiscount]
)
```

---

## 7. Display Formatting

**Format inherited data for display:**
```appsheet
# Customer info summary
Column: CustomerInfo (Virtual)
App Formula: CONCATENATE(
  [CustomerRef].[Name], " (",
  [CustomerRef].[Email], ") - ",
  [CustomerRef].[Region]
)

# Product details
Column: ProductDetails (Virtual)
App Formula: CONCATENATE(
  [ProductRef].[SKU], " - ",
  [ProductRef].[Name], " - $",
  TEXT([ProductRef].[Price], "#,##0.00")
)
```

---

## 8. Best Practices

### When to Use Inheritance
- Display parent data in child views
- Calculate with parent values
- Apply parent settings/rates
- Show related context

### When NOT to Use
- Frequently changing parent data (performance)
- Complex multi-level chains (slow)
- When data should be snapshot (use physical column)

### Optimization
- Cache in virtual columns
- Avoid deep dereferencing chains
- Use simple lookups first
- Test performance with data volume

---

## 9. Common Patterns

### Display Parent Name
```appsheet
Column: CategoryName (Virtual)
Type: Text
App Formula: [CategoryRef].[Name]
Label: No
SHOW: Yes
```

### Inherit Default Value
```appsheet
Column: DefaultPrice (Virtual)
Type: Price
App Formula: [ProductRef].[StandardPrice]
```

### Apply Parent Rate
```appsheet
Column: Commission (Virtual)
Type: Price
App Formula: [SalesAmount] * [SalesRepRef].[CommissionRate]
```

### Chain Through Multiple Tables
```appsheet
Column: CompanyName (Virtual)
App Formula: [EmployeeRef].[DepartmentRef].[CompanyRef].[Name]
```

---

## 10. Inheritance vs Snapshot

### Inheritance (Virtual Column)
```appsheet
# Always current
Column: CurrentPrice (Virtual)
App Formula: [ProductRef].[Price]
# Updates when product price changes
```

### Snapshot (Physical Column)
```appsheet
# Historical value
Column: OrderPrice
Type: Price
Initial Value: [ProductRef].[Price]
# Captured at order time, never changes
```

**Use Inheritance When:**
- Need current value
- Parent changes frequently
- Don't need historical data

**Use Snapshot When:**
- Need historical record
- Value shouldn't change
- Audit trail required
- Performance critical

---

**Related Documentation:**
- [Relationships Overview](RELATIONSHIPS_OVERVIEW.md)
- [Reference Types](../column-types/REFERENCE_TYPES.md)
- [Virtual Columns](../virtual-columns/VIRTUAL_COLUMNS_OVERVIEW.md)
- [Lookup Patterns](../virtual-columns/LOOKUP_PATTERNS.md)

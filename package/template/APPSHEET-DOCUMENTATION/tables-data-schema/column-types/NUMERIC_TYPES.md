# Numeric Column Types

Numeric types handle numbers, currency, percentages, and decimal values.

## 1. Number Type

**Purpose:** General numeric values (quantities, counts, scores, measurements)

**Configuration:**
```appsheet
Type: Number
Decimal digits: 0-10
Thousands separator: Yes/No
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Common Use Cases:**
- Quantities (inventory count, order quantity)
- Scores (test scores, ratings)
- Measurements (height, weight, distance)
- Counters (page views, login count)
- IDs (numeric identifiers)

**Example Values:**
- 42
- 3.14
- -100
- 1000000

**Validation Patterns:**
```appsheet
# Positive numbers only
VALID_IF: [Quantity] > 0

# Non-negative (zero allowed)
VALID_IF: [Score] >= 0

# Range validation
VALID_IF: AND([Rating] >= 1, [Rating] <= 10)

# Integer only (no decimals)
VALID_IF: [Count] = INT([Count])

# Multiple of value
VALID_IF: MOD([Quantity], 5) = 0 - "Must be multiple of 5"
```

**Formula Examples:**
```appsheet
# Simple calculation
App Formula: [UnitsSold] * [UnitsPerBox]

# Rounding
App Formula: ROUND([Value], 2)

# Average
App Formula: ([Test1] + [Test2] + [Test3]) / 3

# Conditional value
App Formula: IF([Type] = "Wholesale", [Quantity] * 100, [Quantity])
```

---

## 2. Price Type

**Purpose:** Currency values with automatic formatting

**Configuration:**
```appsheet
Type: Price
Type Details:
  Decimal digits: 2 (typically)
  Thousands separator: Yes
  Display mode: Currency symbol/Code/None
  Currency symbol: $, €, £, ¥, etc.
SHOW: TRUE
EDITABLE: TRUE
```

**Common Use Cases:**
- Product prices
- Order totals
- Salaries
- Transaction amounts
- Budget values

**Example Values:**
- $19.99
- €1,250.00
- £99.95
- ¥10,000

**Features:**
- Automatic currency symbol display
- Thousands separator formatting
- Decimal precision control
- Right-aligned in tables

**Validation Patterns:**
```appsheet
# Positive prices
VALID_IF: [Price] > 0

# Maximum price
VALID_IF: [Price] <= 10000

# Price within range
VALID_IF: AND([Price] >= 0.01, [Price] <= 999.99)

# Two decimal places max
VALID_IF: ROUND([Price], 2) = [Price]

# Must be multiple of 0.05
VALID_IF: MOD([Price] * 100, 5) = 0
```

**Formula Examples:**
```appsheet
# Calculate total
App Formula: [Quantity] * [UnitPrice]

# Apply discount
App Formula: [OriginalPrice] * (1 - [DiscountPercent])

# Add tax
App Formula: [Subtotal] * (1 + [TaxRate])

# Markup calculation
App Formula: [Cost] * (1 + [MarkupPercent])

# Sum of line items
App Formula: SUM([LineItems][Amount])
```

---

## 3. Decimal Type

**Purpose:** High-precision decimal numbers

**Configuration:**
```appsheet
Type: Decimal
Decimal digits: 0-10 (typically higher than Number)
Thousands separator: Yes/No
SHOW: TRUE
EDITABLE: TRUE
```

**Common Use Cases:**
- Scientific measurements
- GPS coordinates
- Precise calculations
- Financial calculations requiring precision
- Statistical values

**Example Values:**
- 3.14159265359
- 0.00000123
- 123.456789
- -45.678901

**Differences from Number:**
- Higher precision (more decimal places)
- Better for calculations requiring accuracy
- Stored with more precision internally

**Formula Examples:**
```appsheet
# Precise calculation
App Formula: [Value1] * [Value2]

# Scientific formula
App Formula: 3.14159 * ([Radius] * [Radius])

# Percentage to decimal
App Formula: [PercentValue] / 100
```

---

## 4. Percent Type

**Purpose:** Percentage values with automatic % display

**Configuration:**
```appsheet
Type: Percent
Decimal digits: 0-2 (typically)
SHOW: TRUE
EDITABLE: TRUE
```

**Common Use Cases:**
- Discount rates
- Tax rates
- Completion percentages
- Growth rates
- Success rates

**Example Values:**
- 25%
- 0.15 (displayed as 15%)
- 100%
- 0.5%

**Storage Format:**
- Stored as decimal: 0.25 = 25%
- Displayed with % symbol
- Input can be decimal or percentage

**Validation Patterns:**
```appsheet
# 0-100% range
VALID_IF: AND([Percent] >= 0, [Percent] <= 1)

# Positive percentage
VALID_IF: [DiscountRate] >= 0

# Not exceeding 100%
VALID_IF: [CompletionRate] <= 1
```

**Formula Examples:**
```appsheet
# Calculate percentage
App Formula: [Completed] / [Total]

# Completion rate
App Formula: IF([TotalTasks] > 0, [CompletedTasks] / [TotalTasks], 0)

# Convert to decimal
App Formula: [PercentValue] / 100

# Apply percentage
App Formula: [BaseValue] * [PercentRate]
```

---

## 5. Best Practices

### Type Selection
- **Number:** General integers and basic decimals
- **Price:** Always use for currency (automatic formatting)
- **Decimal:** High-precision calculations
- **Percent:** Percentage values (automatic % display)

### Decimal Places
- **Price:** Usually 2 decimal places
- **Number:** 0-2 for most uses
- **Decimal:** As many as needed for precision
- **Percent:** 0-2 decimal places

### Validation
- Always validate ranges (min/max)
- Use > 0 for positive-only values
- Use >= 0 for non-negative values
- Validate decimal precision if needed
- Check for reasonable limits

### Performance
- Use Number for simple calculations
- Use Decimal only when precision required
- Index numeric columns used in filters
- Round calculated values appropriately

### Display
- Price automatically shows currency symbol
- Percent automatically shows %
- Use thousands separator for readability
- Right-align numeric columns in tables

---

## 6. Common Patterns

### Auto-Calculated Price
```appsheet
Column: Total
Type: Price (Virtual)
App Formula: [Quantity] * [UnitPrice]
```

### Discount Calculation
```appsheet
Column: DiscountedPrice
Type: Price (Virtual)
App Formula: [OriginalPrice] * (1 - [DiscountPercent])
```

### Percentage Complete
```appsheet
Column: CompletionPercent
Type: Percent (Virtual)
App Formula: IF([Total] > 0, [Completed] / [Total], 0)
```

### Tax Calculation
```appsheet
Column: TotalWithTax
Type: Price (Virtual)
App Formula: [Subtotal] * (1 + [TaxRate])
```

### Counter/Increment
```appsheet
Column: ViewCount
Type: Number
Initial Value: 0
# Updated via Actions
```

### Positive Integer Only
```appsheet
Column: Quantity
Type: Number
VALID_IF: AND([Quantity] > 0, [Quantity] = INT([Quantity]))
REQUIRE: Yes
```

### Currency with Range
```appsheet
Column: Price
Type: Price
VALID_IF: AND([Price] >= 0.01, [Price] <= 99999.99)
REQUIRE: Yes
```

### Precise Measurement
```appsheet
Column: GPSLatitude
Type: Decimal
Decimal digits: 8
VALID_IF: AND([GPSLatitude] >= -90, [GPSLatitude] <= 90)
```

---

## 7. Type Conversion

### Number to Text
```appsheet
App Formula: TEXT([Number], "#,##0.00")
App Formula: TEXT([Price], "$#,##0.00")
```

### Text to Number
```appsheet
App Formula: VALUE([TextValue])
```

### Percentage Conversions
```appsheet
# Decimal to percent display (automatic with Percent type)
# Manual: [DecimalValue] * 100

# Percent to decimal
App Formula: [PercentValue] / 100
```

---

## 8. Formatting Options

### Number Formatting
```appsheet
Decimal digits: 0 → 1000
Decimal digits: 2 → 1000.00
Thousands separator: Yes → 1,000.00
Thousands separator: No → 1000.00
```

### Price Formatting
```appsheet
Display mode: Currency symbol → $1,000.00
Display mode: Currency code → USD 1,000.00
Display mode: None → 1,000.00
```

---

## 9. Common Calculations

### Financial
```appsheet
# Profit margin
App Formula: ([Revenue] - [Cost]) / [Revenue]

# ROI
App Formula: ([Gain] - [Cost]) / [Cost]

# Compound interest
App Formula: [Principal] * POWER((1 + [Rate]), [Years])
```

### Statistical
```appsheet
# Average
App Formula: SUM([Values]) / COUNT([Values])

# Percentage change
App Formula: ([New] - [Old]) / [Old]

# Weighted average
App Formula: SUM([Items][Value] * [Items][Weight]) / SUM([Items][Weight])
```

### Business
```appsheet
# Discount amount
App Formula: [Price] * [DiscountRate]

# Final price after discount
App Formula: [Price] * (1 - [DiscountRate])

# Commission
App Formula: [SalesAmount] * [CommissionRate]

# Tax amount
App Formula: [Subtotal] * [TaxRate]
```

---

**Related Documentation:**
- [Column Properties](../column-properties/COLUMN_PROPERTIES_OVERVIEW.md)
- [Validation Properties](../column-properties/VALIDATION_PROPERTIES.md)
- [Formula Properties](../column-properties/FORMULA_PROPERTIES.md)
- [Math Functions](../../formulas-reference/math/MATH_FUNCTIONS.md)

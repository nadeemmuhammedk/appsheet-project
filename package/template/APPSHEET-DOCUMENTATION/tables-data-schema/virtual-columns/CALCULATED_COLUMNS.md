# Calculated Columns

Calculated columns use App Formula to compute values from other columns dynamically.

## 1. What Are Calculated Columns?

**Purpose:** Virtual columns that compute values using formulas

**Characteristics:**
- Always use App Formula
- Recalculate automatically
- Read-only (users cannot edit)
- Not stored in data source

**Syntax:**
```appsheet
Column Name: CalculatedColumn
Type: [Appropriate Type] (Virtual)
App Formula: <calculation expression>
```

---

## 2. Common Calculation Types

### Arithmetic Calculations
```appsheet
# Total price
App Formula: [Quantity] * [UnitPrice]

# With tax
App Formula: [Subtotal] * (1 + [TaxRate])

# Discount amount
App Formula: [Price] * [DiscountPercent]

# Profit margin
App Formula: ([Revenue] - [Cost]) / [Revenue]
```

### Text Calculations
```appsheet
# Full name
App Formula: CONCATENATE([FirstName], " ", [LastName])

# Formatted ID
App Formula: "ORD-" & TEXT([OrderNumber], "00000")

# Address formatting
App Formula: CONCATENATE([Street], ", ", [City], ", ", [State], " ", [ZIP])
```

### Date Calculations
```appsheet
# Days since created
App Formula: TODAY() - [CreatedDate]

# Age in years
App Formula: YEAR(TODAY()) - YEAR([BirthDate])

# Due in X days
App Formula: [StartDate] + 30
```

### Boolean Calculations
```appsheet
# Is overdue
App Formula: AND([Status] <> "Complete", [DueDate] < TODAY())

# Needs approval
App Formula: [Amount] > 1000

# Is weekend
App Formula: IN(WEEKDAY([Date]), LIST(1, 7))
```

---

## 3. Aggregation Calculations

### Sum
```appsheet
# Total of line items
App Formula: SUM([LineItems][Amount])

# Sum filtered
App Formula: SUM(SELECT([Transactions][Amount], [Type] = "Credit"))
```

### Count
```appsheet
# Count children
App Formula: COUNT(REF_ROWS("Orders", "CustomerRef"))

# Count filtered
App Formula: COUNT(SELECT(REF_ROWS("Tasks", "ProjectRef"), [Status] = "Complete"))
```

### Average
```appsheet
# Average rating
App Formula: AVERAGE([Ratings][Score])

# Weighted average
App Formula: SUM([Items][Price] * [Items][Quantity]) / SUM([Items][Quantity])
```

---

## 4. Conditional Calculations

### IF Statements
```appsheet
# Status based on amount
App Formula: IF([Amount] > 1000, "High Value", "Standard")

# Nested IF
App Formula: IF([Score] >= 90, "A",
  IF([Score] >= 80, "B",
    IF([Score] >= 70, "C", "F")
  )
)
```

### IFS Function
```appsheet
# Multi-condition
App Formula: IFS(
  [Amount] > 10000, "Tier 1",
  [Amount] > 5000, "Tier 2",
  [Amount] > 1000, "Tier 3",
  TRUE, "Standard"
)
```

### SWITCH Function
```appsheet
# Category-based calculation
App Formula: SWITCH([Type],
  "Premium", [BasePrice] * 1.5,
  "Standard", [BasePrice],
  "Budget", [BasePrice] * 0.7,
  [BasePrice]
)
```

---

## 5. Best Practices

- Keep formulas simple and readable
- Break complex calculations into multiple virtual columns
- Use appropriate return type
- Handle null/blank values
- Test with edge cases
- Cache expensive calculations

---

## 6. Common Patterns

### Price with Discount
```appsheet
Column: FinalPrice
Type: Price (Virtual)
App Formula: [OriginalPrice] * (1 - [DiscountPercent])
```

### Completion Percentage
```appsheet
Column: CompletionPercent
Type: Percent (Virtual)
App Formula: IF([TotalTasks] > 0, [CompletedTasks] / [TotalTasks], 0)
```

### Status Indicator
```appsheet
Column: StatusColor
Type: Enum (Virtual)
App Formula: IFS(
  [IsComplete], "Green",
  [IsOverdue], "Red",
  [DueDate] < TODAY() + 7, "Yellow",
  TRUE, "Gray"
)
```

---

## 7. Real-World Patterns

### Extract Date and Time from DateTime (for View Grouping and Sorting)

**Use case:** Extract date-only and time-only components from a DateTime column. Use the date virtual column as a "Group by" field in deck/table views; use the time column for correct sort order within each group.

```appsheet
# Date component — used for grouping rows by calendar date
Column Name: [RecordDate]
Type: Date
App Formula: DATE([DateTimeColumn])
SHOW IF: FALSE    ← hidden from forms; used only for view configuration

# Time component — used for sorting within a date group
Column Name: [RecordTime]
Type: Time
App Formula: TIME([DateTimeColumn])
SHOW IF: FALSE    ← hidden from forms; used only for view configuration
```

**View configuration using these virtual columns:**

```appsheet
View Type: Deck (or Table)
Group by: [RecordDate]        ← shows date headers (e.g., "Mar 24")
Sort by:  [RecordTime] Desc   ← most recent entry at top within each date group
```

**Notes:**
- AppSheet may auto-generate these virtual columns when a DateTime column is detected
- `SHOW IF: FALSE` hides them from forms and detail views without deleting the columns
- Avoids storing redundant date/time columns in the backing sheet

---

**Related Documentation:**
- [Virtual Columns Overview](VIRTUAL_COLUMNS_OVERVIEW.md)
- [Formula Properties](../column-properties/FORMULA_PROPERTIES.md)
- [Formulas Reference](../../formulas-reference/FORMULAS_REFERENCE.md)

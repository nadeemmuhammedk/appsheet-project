# Looker Studio Documentation Examples

Generic examples following the blueprint templates. Use these as references for documenting Looker Studio components in any project.

---

## Example 1: Data Source - Google Sheets

### Data Source: Sales Data

**Connection:**
- Type: Google Sheets Connector
- Spreadsheet: Company Sales 2024
- Sheet/Tab: Transactions
- Refresh: Automatic (on view)

**Schema:**
```
Field Name      | Type    | Aggregation | Description
----------------|---------|-------------|---------------------------
TransactionID   | Text    | None        | Unique transaction identifier
Date            | Date    | None        | Transaction date
Product         | Text    | None        | Product name
Category        | Text    | None        | Product category
Quantity        | Number  | Sum         | Items sold
Revenue         | Number  | Sum         | Sales amount
Cost            | Number  | Sum         | Product cost
CustomerID      | Text    | None        | Customer identifier
Region          | Text    | None        | Sales region
Status          | Text    | None        | Order status
```

**Data Freshness:** Updates when report is opened or refreshed
**Row Count:** ~10,000 rows
**Last Updated:** 2024-01-15

---

## Example 2: Calculated Field - Simple Metric

### Calculated Field: Total Revenue

**Type:** Metric
**Data Type:** Number (Currency)
**Aggregation:** Sum
**Category:** Financial

**Formula:**
```looker
SUM(Revenue)
```

**Purpose:** Total sales revenue across all transactions
**Used In:** Revenue Overview scorecard, Executive Dashboard
**Dependencies:** Revenue field

**Example:**
- Data: [100, 200, 150, 50]
- Result: 500

**Notes:**
- ✅ Core KPI for sales performance
- ⚠️ Sensitive to data quality (excludes refunds unless adjusted)

---

## Example 3: Calculated Field - Ratio Metric

### Calculated Field: Profit Margin

**Type:** Metric
**Data Type:** Number (Percent)
**Aggregation:** Average
**Category:** Financial

**Formula:**
```looker
(SUM(Revenue) - SUM(Cost)) / SUM(Revenue) * 100
```

**Purpose:** Calculate profit margin as percentage of revenue
**Used In:** Profitability Scorecard, Monthly Performance Report
**Dependencies:** Revenue, Cost fields

**Example Calculation:**
- Revenue: 1000
- Cost: 600
- Profit: 400
- Margin: 40%

**Notes:**
- ✅ Key profitability indicator
- ⚠️ Returns null if Revenue is 0 (division by zero)
- 💡 Consider adding CASE to handle zero revenue

---

## Example 4: Calculated Field - Date Dimension

### Calculated Field: Month Year

**Type:** Dimension
**Data Type:** Text
**Aggregation:** None
**Category:** Time-based

**Formula:**
```looker
CONCAT(CAST(YEAR(Date) AS TEXT), "-", CAST(MONTH(Date) AS TEXT))
```

**Purpose:** Group data by month for time-series analysis
**Used In:** Monthly Revenue chart, Time-series reports
**Dependencies:** Date field

**Example Output:**
- Input: 2024-01-15, 2024-01-20, 2024-02-01
- Output: "2024-1", "2024-1", "2024-2"

**Notes:**
- ✅ Sorts correctly (2024-1 comes before 2024-2)
- ✅ Works with any chart type
- 💡 Alternative: Use DATETIME_TRUNC(Date, MONTH) for date type

---

## Example 5: Calculated Field - Conditional Category

### Calculated Field: Sales Tier

**Type:** Dimension
**Data Type:** Text
**Aggregation:** None
**Category:** Categorization

**Formula:**
```looker
CASE
  WHEN Revenue < 100 THEN "Small"
  WHEN Revenue < 500 THEN "Medium"
  WHEN Revenue < 1000 THEN "Large"
  ELSE "Enterprise"
END
```

**Purpose:** Categorize transactions by revenue size
**Used In:** Sales Distribution pie chart, Customer Segmentation
**Dependencies:** Revenue field

**Example Mapping:**
- Revenue: 50 → Sales Tier: "Small"
- Revenue: 300 → Sales Tier: "Medium"
- Revenue: 750 → Sales Tier: "Large"
- Revenue: 2000 → Sales Tier: "Enterprise"

**Notes:**
- ✅ Simplifies analysis by grouping
- ⚠️ Order of WHEN clauses matters (first match wins)
- 💡 Adjust thresholds based on business needs

---

## Example 6: Calculated Field - Count with Condition

### Calculated Field: Completed Orders

**Type:** Metric
**Data Type:** Number
**Aggregation:** Count
**Category:** Operational

**Formula:**
```looker
COUNT(CASE WHEN Status = "Completed" THEN TransactionID END)
```

**Purpose:** Count only completed transactions
**Used In:** Order Status Summary, Completion Rate Dashboard
**Dependencies:** Status, TransactionID fields

**Example:**
- Total orders: 100
- Completed orders: 75
- Result: 75

**Notes:**
- ✅ Filters within aggregation
- ⚠️ Case-sensitive to Status values
- 💡 Can add multiple statuses with OR condition

---

## Example 7: Calculated Field - Year-over-Year Growth

### Calculated Field: YoY Growth

**Type:** Metric
**Data Type:** Number (Percent)
**Aggregation:** Auto
**Category:** Performance

**Formula:**
```looker
(SUM(Revenue) - SUM(SUM(Revenue)) OVER (ORDER BY Date DESC OFFSET 1))
 / SUM(SUM(Revenue)) OVER (ORDER BY Date DESC OFFSET 1) * 100
```

**Purpose:** Calculate year-over-year revenue growth percentage
**Used In:** Growth Scorecard, Trend Analysis
**Dependencies:** Revenue field, Date field

**Example Calculation:**
- Current Year: 120,000
- Previous Year: 100,000
- Growth: 20%

**Notes:**
- ✅ Shows growth trend over time
- ⚠️ Window functions may not work in all Looker Studio editions
- 💡 Alternative: Use blended data with separate year columns

---

## Example 8: Blended Data Source

### Blended Data: Sales with Targets

**Purpose:** Compare actual sales against targets by month and product

**Join Type:** Left Outer

**Join Configuration:**
- Left source: Sales Data (transactions)
- Right source: Sales Targets (monthly targets)
- Join key: Month (Sales) = Month (Targets) AND Product (Sales) = Product (Targets)

**Fields Included:**
- From Sales Data: Date, Product, Revenue, Quantity
- From Sales Targets: Target Revenue, Target Quantity

**Use Case:** Track performance against sales targets, calculate variance

**Calculated Fields in Blend:**
- Revenue Variance: SUM(Revenue) - SUM(Target Revenue)
- Achievement Rate: SUM(Revenue) / SUM(Target Revenue) * 100

**Notes:**
- ✅ Enables actual vs. target analysis
- ⚠️ Blend runs on query (may be slower for large datasets)
- 💡 Ensure both sources have compatible date granularities

---

## Example 9: Chart Configuration - Time Series

### Chart: Monthly Revenue Trend

**Chart Type:** Time Series

**Data Source:** Sales Data

**Dimensions:**
- Date (grouped by Month Year)

**Metrics:**
- Total Revenue: SUM(Revenue)
- Target Revenue: SUM(Target Revenue) [from blended source]

**Filters:**
- Date Range: Last 12 Months (user-adjustable)
- Status: Completed

**Sorting:**
- By: Date
- Order: Ascending

**Interactions:**
- Click data point → Filters other charts by month

**Styling:**
- Color theme: Blue (actual), Gray (target)
- Show data labels: Yes
- Show gridlines: Yes
- Line type: Smooth

**Used In:** Sales Dashboard, Executive Overview

---

## Example 10: Chart Configuration - Bar Chart

### Chart: Top Products by Revenue

**Chart Type:** Bar Chart

**Data Source:** Sales Data

**Dimensions:**
- Product

**Metrics:**
- Total Revenue: SUM(Revenue)
- Quantity: COUNT(TransactionID)

**Filters:**
- Date Range: Year to Date
- Status: Completed

**Sorting:**
- By: Total Revenue
- Order: Descending
- Limit: Top 10

**Interactions:**
- Click bar → Filters other charts by product

**Styling:**
- Bar color: Single color gradient
- Show data labels: Yes (Revenue values)
- Bar thickness: Medium

**Used In:** Product Performance Dashboard

---

## Example 11: Filter Control

### Filter Control: Date Range Selector

**Type:** Date Range

**Field:** Date

**Default Value:** Last 30 Days

**Options:**
- Preset ranges: Last 7 days, Last 30 days, Last 90 days, Year to Date, Custom
- Comparison period: None

**Affects:** All charts in dashboard

**Cascading Filters:**
- No (this is a top-level filter)

---

## Example 12: Filter Control - Dropdown

### Filter Control: Region Selector

**Type:** Dropdown

**Field:** Region

**Default Value:** (All) - Show all regions

**Options:**
- Single select
- Enable "All" option: Yes

**Affects:** Revenue by Region chart, Top Products table

**Cascading Filters:**
- No (independent filter)

---

## Example 13: Report Configuration

### Report: Sales Performance Dashboard

**Purpose:** Executive overview of sales performance and trends

**Charts Included:**
1. Total Revenue (Scorecard) - Current period total
2. Revenue Trend (Time Series) - Monthly chart with target comparison
3. Top Products (Bar Chart) - Top 10 by revenue
4. Sales by Region (Geo Map) - Geographic distribution
5. Recent Transactions (Table) - Latest 50 orders

**Filters:**
- Date Range: User-adjustable (default: Last 30 days)
- Region: Dropdown selector
- Product Category: Dropdown selector

**Interactions:**
- Click Revenue Trend point → Filters Top Products and Transaction table
- Click Region on map → Filters all charts by region
- Click Product bar → Filters Transaction table

**Refresh Schedule:** Automatic on view (data refreshes when spreadsheet updates)

**Access:** View-only link shared with stakeholders

---

## Common Looker Studio Formula Patterns

| Pattern | Formula | Use Case |
|---------|---------|----------|
| **Sum** | `SUM(Field)` | Total aggregation |
| **Count** | `COUNT(Field)` | Count records |
| **Average** | `AVG(Field)` | Mean value |
| **Percentage** | `SUM(Part) / SUM(Total) * 100` | Rate calculation |
| **Year-Month** | `CONCAT(CAST(YEAR(Date) AS TEXT), "-", MONTH(Date))` | Group by month |
| **Conditional** | `CASE WHEN condition THEN value ELSE default END` | Categorization |
| **Concatenation** | `CONCAT(Field1, " - ", Field2)` | Combine text |
| **Date Diff** | `DATEDIFF(EndDate, StartDate)` | Days between dates |

---

## Documentation Best Practices

### What Makes Good Looker Studio Documentation

1. **Complete Schema Documentation:** All fields with types and aggregations
2. **Clear Formulas:** Exact formula syntax used in Looker Studio
3. **Purpose Context:** Why each field/chart exists and how it's used
4. **Dependencies:** What fields or data sources are referenced
5. **Example Calculations:** Input → Output examples for complex formulas
6. **Usage Context:** Which reports/charts use each component
7. **Notes Section:** Tips, warnings, and special considerations

### Component Type Quick Reference

| Component | Required Fields |
|-----------|-----------------|
| **Data Source** | Connection type, spreadsheet, schema, refresh |
| **Metric** | Type, data type, aggregation, formula, purpose |
| **Dimension** | Type, data type, formula, grouping logic |
| **Blended Data** | Join type, configuration, field mapping |
| **Chart** | Type, dimensions, metrics, filters, interactions |
| **Filter** | Type, field, default value, affected components |

---

## Common Use Cases by Project Type

### E-Commerce
- Revenue metrics, conversion rates, product performance
- Time-based trends (daily/weekly/monthly)
- Customer segmentation and lifetime value

### Marketing
- Campaign performance metrics
- ROI calculations
- Channel attribution analysis

### Operations
- Order fulfillment rates
- Inventory levels
- Performance KPIs

### Finance
- Revenue and profit tracking
- Budget vs. actual comparisons
- Cash flow analysis

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** Generic examples applicable to any project

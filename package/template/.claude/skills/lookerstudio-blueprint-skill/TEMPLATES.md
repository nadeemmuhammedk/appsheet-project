# Looker Studio Blueprint Templates

## Table of Contents Requirement

**All Looker Studio documentation files should include a table of contents after the version header.**

**Standard TOC Structure:**
```markdown
### 📋 TABLE OF CONTENTS

1. [Data Source Configuration](#data-source-configuration)
2. [Calculated Fields](#calculated-fields)
3. [Blended Data Sources](#blended-data-sources)
4. [Report Configurations](#report-configurations)
```

---

## Data Source Configuration Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.4:

```markdown
### Data Source: [Source Name]

**Connection:**
- Type: Google Sheets Connector / BigQuery / Analytics / Database Connector
- Spreadsheet: [Spreadsheet Name or URL]
- Sheet/Tab: [Tab Name or Range]
- Refresh: Manual / Automatic (on view) / Every [X] hours

**Schema:**
```
Field Name         | Type      | Aggregation | Description
-------------------|-----------|-------------|---------------------------
[Field 1]          | Text      | None        | [Description]
[Field 2]          | Number    | Sum         | [Description]
[Field 3]          | Date      | None        | [Description]
[Field 4]          | Boolean   | None        | [Description]
```

**Data Freshness:** [How often data updates]
**Row Count:** ~[Approximate number of rows]
**Last Updated:** [Date of last schema change]
```

---

## Calculated Field Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.4:

```markdown
### Calculated Field: [Field Name]

**Type:** Metric / Dimension
**Data Type:** Number / Text / Date / Boolean
**Aggregation:** Sum / Count / Average / Max / Min / None (if metric)
**Category:** [e.g., Engagement / Performance / Time-based]

**Formula:**
```looker
[Complete Looker Studio formula]
```

**Purpose:** [What this field calculates and why it's useful]
**Used In:** [Which reports/charts use this field]
**Dependencies:** [Other fields this references]

**Example Calculation:**
```
Input: [Field values]
Output: [Result]
```

**Notes:** [Edge cases, limitations, or special considerations]
```

---

## Blended Data Source Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.4:

```markdown
### Blended Data: [Blend Name]

**Purpose:** [Why this blend is needed]

**Join Type:** Left Outer / Inner / Full Outer / Cross Join

**Join Configuration:**
- Left source: [Source 1]
- Right source: [Source 2]
- Join key: [Field Name] = [Field Name]

**Fields Included:**
- From [Source 1]: [Field1, Field2, Field3]
- From [Source 2]: [Field4, Field5]

**Use Case:** [When to use this blended data]

**Notes:** [Performance considerations, limitations]
```

---

## Report Configuration Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.4:

```markdown
### Report: [Report Name]

**Purpose:** [What this report displays]

**Charts Included:**
1. [Chart 1] - [Chart Type]
2. [Chart 2] - [Chart Type]

**Filters:**
- [Filter Name]: [Field] [Operator] [Value]
- Date Range: [Default time period]

**Interactions:**
- Click [Chart] → Filters [Other Charts]

**Refresh Schedule:** [How often report updates]
```

---

## Metric Template (Aggregated Values)

**Use for:** Sum, Count, Average calculations

```markdown
### Calculated Field: [Metric Name]

**Type:** Metric
**Data Type:** Number / Number (Percent) / Number (Currency)
**Aggregation:** Sum / Count / Average / Max / Min
**Category:** [e.g., Financial / Operational / Performance]

**Formula:**
```looker
SUM([Field Name])
```
OR
```looker
COUNT([Field Name])
```
OR
```looker
AVG([Field Name])
```

**Purpose:** [What this metric measures]
**Used In:** [Chart names, dashboard sections]
**Dependencies:** [Source field(s)]

**Example:**
- Data: [10, 20, 30, 40]
- Result: 100 (if SUM) or 4 (if COUNT) or 25 (if AVG)

**Notes:**
- ✅ [What works well]
- ⚠️ [Any limitations or edge cases]
```

---

## Dimension Template (Grouping Values)

**Use for:** Text, Date, or Boolean fields used for grouping

```markdown
### Calculated Field: [Dimension Name]

**Type:** Dimension
**Data Type:** Text / Date / Boolean
**Aggregation:** None
**Category:** [e.g., Categorization / Time Period / Status]

**Formula:**
```looker
[Formula expression]
```

**Purpose:** [How this dimension groups data]
**Used In:** [Chart axes, grouping, filters]
**Dependencies:** [Source field(s)]

**Example Values:**
- Input: [Raw data examples]
- Output: [Grouped values]

**Notes:**
- ✅ [Grouping logic]
- ⚠️ [Sorting behavior]
```

---

## Ratio/Percentage Template

**Use for:** Calculating rates, percentages, ratios

```markdown
### Calculated Field: [Percentage Name]

**Type:** Metric
**Data Type:** Number (Percent)
**Aggregation:** Average (typically)
**Category:** [e.g., Performance / Conversion / Growth]

**Formula:**
```looker
SUM([Numerator Field]) / SUM([Denominator Field]) * 100
```

**Purpose:** [What this percentage measures]
**Used In:** [Charts, KPI displays]
**Dependencies:** [Numerator and Denominator fields]

**Example Calculation:**
- Numerator: 500 (completed)
- Denominator: 1000 (total)
- Result: 50%

**Notes:**
- ⚠️ Returns null if denominator is 0 (division by zero)
- 💡 Consider adding CASE statement to handle zero denominator
```

---

## Date Dimension Template

**Use for:** Creating time-based groupings

```markdown
### Calculated Field: [Time Period Name]

**Type:** Dimension
**Data Type:** Text / Date
**Aggregation:** None
**Category:** Time-based

**Formula:**
```looker
CONCAT(CAST(YEAR([Date Field]) AS TEXT), "-", CAST(MONTH([Date Field]) AS TEXT))
```
OR
```looker
DATETIME_TRUNC([Date Field], MONTH)
```

**Purpose:** Group data by [time period]
**Used In:** Time-series charts, monthly breakdowns
**Dependencies:** [Date Field]

**Example Output:**
- Input: 2024-06-15, 2024-06-20, 2024-07-01
- Output: "2024-6", "2024-6", "2024-7"

**Notes:**
- ✅ Enables time-series analysis
- ✅ Sortable chronologically
```

---

## Conditional Field Template

**Use for:** CASE/WHEN logic for categorization

```markdown
### Calculated Field: [Category Name]

**Type:** Dimension
**Data Type:** Text
**Aggregation:** None
**Category:** Categorization

**Formula:**
```looker
CASE
  WHEN [Condition 1] THEN "Value 1"
  WHEN [Condition 2] THEN "Value 2"
  ELSE "Default Value"
END
```

**Purpose:** [What categorization this creates]
**Used In:** [Charts, filters, grouping]
**Dependencies:** [Fields referenced in conditions]

**Example Mapping:**
- Input: [Raw values]
- Output: [Categorized values]

**Notes:**
- ✅ Simplifies complex data into readable categories
- ⚠️ Order of WHEN clauses matters (first match wins)
```

---

## Chart Configuration Template

**Use for:** Documenting individual charts in reports

```markdown
### Chart: [Chart Name]

**Chart Type:** Time Series / Bar Chart / Pie Chart / Table / Scorecard

**Data Source:** [Data source name]

**Dimensions:**
- [X-axis or grouping dimension]

**Metrics:**
- [Y-axis or value metric]

**Filters:**
- [Filter Field]: [Condition]
- Date Range: [Default or User-controlled]

**Sorting:**
- By: [Field]
- Order: Ascending / Descending

**Interactions:**
- Click to filter: [Yes/No - what gets filtered]

**Styling:**
- Color theme: [Theme name or custom]
- Show data labels: [Yes/No]
- Axis labels: [Yes/No]

**Used In:** [Report name, section]
```

---

## Filter Control Template

**Use for:** Documenting interactive filters

```markdown
### Filter Control: [Filter Name]

**Type:** Dropdown / Date Range / Slider / Text Input

**Field:** [Field being filtered]

**Default Value:** [Default selection or date range]

**Options:**
- Single select / Multi-select
- Enable "All" option: [Yes/No]

**Affects:** [Charts or components that update]

**Filter Behavior:**
- Cascading filters: [Yes/No - describes dependency]
```

---

## Common Looker Studio Formula Patterns

### Pattern 1: Total Aggregation
```looker
SUM(Field)
COUNT(Field)
AVG(Field)
```

### Pattern 2: Percentage Calculation
```looker
SUM(Part) / SUM(Total) * 100
```

### Pattern 3: Year-Month Grouping
```looker
CONCAT(CAST(YEAR(Date) AS TEXT), "-", CAST(MONTH(Date) AS TEXT))
```

### Pattern 4: Conditional Category
```looker
CASE
  WHEN Value > 100 THEN "High"
  WHEN Value > 50 THEN "Medium"
  ELSE "Low"
END
```

### Pattern 5: Date Difference
```looker
DATEDIFF(EndDate, StartDate)
```

### Pattern 6: Text Concatenation
```looker
CONCAT(Field1, " - ", Field2)
```

---

## How to Use This Skill

### When to Invoke

**User-initiated invocation:**
- "Show me the Looker Studio template"
- "How do I document a calculated field?"
- "What fields are required for data source documentation?"

**Automatic invocation (context-aware):**
- User is documenting any Looker Studio component
- User is writing to `docs/formulas/lookerstudio_formulas.md`
- User mentions: "Looker Studio", "calculated field", "data source"

### Response Pattern

1. **Identify the component type** (Data Source, Calculated Field, Blend, Chart)
2. **Read APPSHEET_SYSTEM_BLUEPRINT.md** Section 4.4 for templates
3. **Extract the appropriate template** from this file
4. **Generate complete documentation** with all fields
5. **Verify completeness** against blueprint requirements

---

## Scope and Limitations

### In Scope
✅ Looker Studio documentation templates
✅ Data source configuration format
✅ Calculated field documentation (metrics and dimensions)
✅ Blended data configuration
✅ Report and chart documentation

### Out of Scope
❌ Looker Studio UI help
❌ Data modeling architecture
❌ Chart design best practices (use Looker Studio resources)
❌ SQL query help for BigQuery

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** APPSHEET_SYSTEM_BLUEPRINT.md Section 4.4

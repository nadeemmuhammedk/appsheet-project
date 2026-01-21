---
name: lookerstudio-blueprint-skill
description: Generate complete Looker Studio documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for data sources, calculated fields, metrics, dimensions, and blended data. Use when documenting Looker Studio reports, writing to docs/formulas/lookerstudio_formulas.md, or when user mentions Looker Studio, calculated fields, data sources, or report configurations.
allowed-tools:
  - Read
---

# Looker Studio Blueprint Skill

Generate complete documentation templates for Looker Studio reports and data sources.

## When to Use This Skill

**Automatic triggers** (no user request needed):
- User is documenting Looker Studio reports or calculated fields
- User is writing to `docs/formulas/lookerstudio_formulas.md`
- User mentions: "Looker Studio", "calculated field", "data source", "report", "metric", "dimension"
- User describes data visualization or dashboard configuration
- User is creating or modifying Looker Studio components

**Manual invocation:**
- `/lookerstudio-blueprint-skill`

**Example triggers:**
- "Document this Looker Studio calculated field" → Auto-use field template
- "Add documentation for the data source" → Auto-use data source template
- User writes to `lookerstudio_formulas.md` → Auto-apply blueprint format

## Template Overview

This skill provides complete documentation templates from `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.4:

**Available Templates:**
- **Data Source Configuration** - Connection type, schema, refresh settings
- **Calculated Fields** - Metrics and dimensions with formulas
- **Blended Data Sources** - Join configuration, field mapping
- **Report Configurations** - Charts, filters, interactive controls

For complete templates with all fields, see [TEMPLATES.md](TEMPLATES.md).

## How to Use

### Step 1: Identify Component Type

Determine what needs documentation:
- **Data Source?** → Use data source configuration template
- **Calculated Field?** → Use field template (metric or dimension)
- **Blended Data?** → Use blend configuration template
- **Report/Chart?** → Use report configuration template

### Step 2: Read Blueprint Template

Access the appropriate template from:
- [TEMPLATES.md](TEMPLATES.md) - All complete templates
- APPSHEET_SYSTEM_BLUEPRINT.md Section 4.4 - Source templates

### Step 3: Generate Complete Documentation

Include ALL required fields:
- **Data Sources:** Connection type, spreadsheet, schema, refresh settings
- **Calculated Fields:** Type (Metric/Dimension), data type, aggregation, formula, purpose, dependencies
- **Blended Data:** Join type, configuration, field mapping

### Step 4: Verify Completeness

Check against requirements:
- All data sources documented with connection details
- All calculated fields with complete formulas
- Dependencies clearly listed
- Schema tables included

## Quick Template Preview

### Data Source Documentation (Minimal Example)
```markdown
### Data Source: Google Sheets - Sales Data

**Connection:**
- Type: Google Sheets Connector
- Spreadsheet: Sales Dashboard 2024
- Sheet/Tab: Sheet1
- Refresh: Automatic (on view)

**Schema:**
Field Name      | Type    | Aggregation | Description
----------------|---------|-------------|---------------------------
Date            | Date    | None        | Transaction date
Product         | Text    | None        | Product name
Revenue         | Number  | Sum         | Sales amount
Quantity        | Number  | Sum         | Items sold

**Data Freshness:** Updates when report is opened
**Row Count:** ~5,000 rows
```

### Calculated Field Documentation (Minimal Example)
```markdown
### Calculated Field: Total Profit

**Type:** Metric
**Data Type:** Number (Currency)
**Aggregation:** Sum

**Formula:**
```looker
SUM(Revenue) - SUM(Cost)
```

**Purpose:** Calculate profit margin across all transactions
**Used In:** Profit Overview chart, Monthly Reports
**Dependencies:** Revenue, Cost fields
```

See [TEMPLATES.md](TEMPLATES.md) for complete templates with all fields.

## Common Looker Studio Patterns

### Pattern 1: Aggregation Metric
```looker
SUM(Field)
```
**Use Case:** Total sum across all records

### Pattern 2: Calculated Ratio
```looker
SUM(Field1) / SUM(Field2) * 100
```
**Use Case:** Percentage or rate calculation

### Pattern 3: Date Dimension
```looker
CONCAT(CAST(YEAR(Date) AS TEXT), "-", CAST(MONTH(Date) AS TEXT))
```
**Use Case:** Group data by month or year

### Pattern 4: Conditional Logic
```looker
CASE
  WHEN Status = "Active" THEN "Yes"
  ELSE "No"
END
```
**Use Case:** Create derived categories

## Completeness Requirements

**Looker Studio documentation MUST include:**
- ✅ Data Source connection details
- ✅ Schema tables with field types and aggregations
- ✅ Calculated Fields with complete formulas
- ✅ Field types (Metric/Dimension, Data Type, Aggregation)
- ✅ Purpose and usage context
- ✅ Dependencies on other fields
- ✅ Report/Chart configurations (if applicable)

## Version Management

**For the complete Experimental→Stable promotion workflow, use `/version-management-skill`.**

### Quick Reference: The 2-Version System

Looker Studio documentation files follow a 2-version discipline:

```
lookerstudio_formulas.md
├── EXPERIMENTAL V[X]  (new data sources/fields being tested)
└── STABLE SYSTEM V[X-1]  (current production)
```

**Key Concepts:**
- **V3 = V2 + new data sources/fields** (cumulative, not replacement)
- Old versions are archived to `backups/[date]-v[X]-stable/`
- STABLE documentation must be self-contained

### Version Management Triggers

**Starting new features:**
- "Let's build a new feature" → Creates EXPERIMENTAL V[X] section
- "Let's add a new dashboard" → Same as above

**Promoting to stable:**
- "Mark the system as stable" → Promotes EXPERIMENTAL → STABLE
- "Promote to stable" → Same as above

### For Complete Workflow

**Use `/version-management-skill`** which handles:
- Creating EXPERIMENTAL sections for new reports
- Archiving current STABLE before promotion
- Integrating Experimental into STABLE
- Tagging new items with "Added: V[X]"
- Updating CHANGELOG.md
- Verifying completeness

### Coordination With Other Skills

When promoting to stable:
1. **version-management-skill** - Orchestrates the workflow
2. **lookerstudio-blueprint-skill** (this skill) - Ensures template compliance

## Scope and Limitations

### In Scope
✅ Looker Studio data source documentation
✅ Calculated field templates (metrics and dimensions)
✅ Blended data configuration
✅ Report and chart documentation
✅ Filter and control documentation

### Out of Scope
❌ Looker Studio UI help (use Looker Studio documentation)
❌ Chart design best practices (use Looker Studio resources)
❌ Data modeling architecture (use data engineering resources)

## Important Notes

**AUTOMATIC INVOCATION:** When documenting any Looker Studio component, you MUST automatically use blueprint templates to ensure completeness.

**Always use complete templates:** Don't omit fields. Every data source needs connection details, schema, and refresh settings. Every calculated field needs type, formula, purpose, and dependencies.

**Read from APPSHEET_SYSTEM_BLUEPRINT.md:** The source of truth for documentation format is Section 4.4.

## Detailed Templates and Examples

For comprehensive templates and examples, see:
- [TEMPLATES.md](TEMPLATES.md) - Complete templates for all Looker Studio components
- [EXAMPLES.md](EXAMPLES.md) - Generic examples applicable to any project

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** APPSHEET_SYSTEM_BLUEPRINT.md Section 4.4

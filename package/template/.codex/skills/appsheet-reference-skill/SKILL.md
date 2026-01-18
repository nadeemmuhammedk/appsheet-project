---
name: appsheet-reference-skill
description: Look up AppSheet formulas (SELECT, VALID_IF, SHOW_IF), view types (deck, table, form, calendar, chart, dashboard), actions, security filters, slices, and automation patterns. Use when building AppSheet features, writing formulas, configuring views, creating actions, or when user mentions AppSheet components, tables, views, formulas, filters, or security.
allowed-tools:
  - Read
  - Glob
  - Grep
---

# AppSheet Reference Skill

Quick access to AppSheet formula syntax, view configurations, action patterns, and security filters when building features.

## When to Use This Skill

**Automatic triggers** (no user request needed):
- User mentions AppSheet components: tables, views, actions, formulas, slices
- User is writing formulas: SELECT, VALID_IF, SHOW_IF, virtual columns
- User is configuring views: deck, table, form, detail, calendar, chart, dashboard, gallery, map
- User is creating actions: data operations, navigation, conditional visibility
- User describes security: row-level filtering, user-based access, USEREMAIL()
- User asks "how to" questions about AppSheet functionality

**Example triggers**:
- "Add a view for students" → Auto-read view documentation
- "Filter by current user" → Auto-read SELECT and security patterns
- "Create an action to update status" → Auto-read action patterns
- "Show field only if status is Pending" → Auto-read conditional logic

## Quick Reference

### Available Documentation

All AppSheet reference materials are in `APPSHEET-DOCUMENTATION/`:

**Formulas** (`formulas-reference/`):
- [Syntax and Basics](../../APPSHEET-DOCUMENTATION/formulas-reference/syntax-and-basics/SYNTAX_AND_BASICS.md)
- [Conditional Logic](../../APPSHEET-DOCUMENTATION/formulas-reference/conditional/CONDITIONAL.md) - IF, IFS, SWITCH
- [List and SELECT](../../APPSHEET-DOCUMENTATION/formulas-reference/list-and-select/LIST_AND_SELECT.md) - SELECT, ANY, IN, FILTER
- [Logical Functions](../../APPSHEET-DOCUMENTATION/formulas-reference/logical/LOGICAL.md) - AND, OR, NOT, ISBLANK
- [Text Functions](../../APPSHEET-DOCUMENTATION/formulas-reference/text/TEXT_FUNCTIONS.md) - CONCATENATE, FIND, SUBSTITUTE
- [Date/Time Functions](../../APPSHEET-DOCUMENTATION/formulas-reference/date-time/DATE_AND_TIME.md) - TODAY, NOW, YEAR, MONTH
- [Math Functions](../../APPSHEET-DOCUMENTATION/formulas-reference/math/MATH_FUNCTIONS.md) - SUM, AVG, ROUND
- [References](../../APPSHEET-DOCUMENTATION/formulas-reference/references/REFERENCES_AND_DEREFERENCE.md) - REF columns, dereferencing

**Views** (`views-interface/`):
- [Table View](../../APPSHEET-DOCUMENTATION/views-interface/table/TABLE_VIEW.md)
- [Deck View](../../APPSHEET-DOCUMENTATION/views-interface/deck/DECK_VIEW.md)
- [Form View](../../APPSHEET-DOCUMENTATION/views-interface/form/FORM_VIEW.md)
- [Detail View](../../APPSHEET-DOCUMENTATION/views-interface/detail/DETAIL_VIEW.md)
- [Calendar View](../../APPSHEET-DOCUMENTATION/views-interface/calendar/CALENDAR_VIEW.md)
- [Chart View](../../APPSHEET-DOCUMENTATION/views-interface/chart/CHART_VIEW.md)
- [Dashboard View](../../APPSHEET-DOCUMENTATION/views-interface/dashboard/DASHBOARD_VIEW.md)
- [Gallery View](../../APPSHEET-DOCUMENTATION/views-interface/gallery/GALLERY_VIEW.md)
- [Map View](../../APPSHEET-DOCUMENTATION/views-interface/map/MAP_VIEW.md)

**Rules & Logic** (`rules-and-logic/`):
- [Actions](../../APPSHEET-DOCUMENTATION/rules-and-logic/actions/ACTIONS.md) - Data operations, navigation, SHOW IF
- [Automation](../../APPSHEET-DOCUMENTATION/rules-and-logic/automation/AUTOMATION.md) - Bots, workflows
- [Data Validity](../../APPSHEET-DOCUMENTATION/rules-and-logic/data-validity-constraints/DATA_VALIDITY_AND_CONSTRAINTS.md) - VALID_IF, constraints
- [Security Filters](../../APPSHEET-DOCUMENTATION/rules-and-logic/security-filters/SECURITY_FILTERS.md) - Row-level security, USEREMAIL()
- [Slices](../../APPSHEET-DOCUMENTATION/rules-and-logic/slices/SLICES.md) - Data subsets, filtered views

For detailed component guidance, see [REFERENCE.md](REFERENCE.md).

## How to Use

### Step 1: Identify the Component

Determine what the user needs:
- **Formula?** → Read formulas-reference/
- **View?** → Read views-interface/
- **Action?** → Read rules-and-logic/actions/
- **Security?** → Read rules-and-logic/security-filters/

### Step 2: Read Relevant Documentation

Use the Read tool to access the specific documentation file from APPSHEET-DOCUMENTATION/.

### Step 3: Extract and Apply

Pull out:
- Exact syntax (case-sensitive)
- Parameter order and types
- Examples from documentation
- Common gotchas

### Step 4: Provide Guidance

Give the user:
- Working code example
- Explanation of the pattern
- Reference to source documentation

## Common Patterns

### Filter by Current User
```appsheet
SELECT(Students[StudentID], [Email] = USEREMAIL())
```
Source: [list-and-select](../../APPSHEET-DOCUMENTATION/formulas-reference/list-and-select/LIST_AND_SELECT.md), [security-filters](../../APPSHEET-DOCUMENTATION/rules-and-logic/security-filters/SECURITY_FILTERS.md)

### Conditional Field Visibility
```appsheet
SHOW IF: [Status] = "Pending"
```
Source: [conditional](../../APPSHEET-DOCUMENTATION/formulas-reference/conditional/CONDITIONAL.md)

### Dynamic Dropdown
```appsheet
VALID_IF: SELECT(Classes[ClassID], [Capacity] > 0)
```
Source: [data-validity-constraints](../../APPSHEET-DOCUMENTATION/rules-and-logic/data-validity-constraints/DATA_VALIDITY_AND_CONSTRAINTS.md)

### Action with Referenced Rows
```appsheet
Referenced Rows: SELECT(Attendance[AttendanceID], [StudentID] = [_THISROW].[StudentID])
```
Source: [actions](../../APPSHEET-DOCUMENTATION/rules-and-logic/actions/ACTIONS.md)

### Row-Level Security
```appsheet
Security Filter: [BatchID] = LOOKUP(USEREMAIL(), "Users", "Email", "BatchID")
```
Source: [security-filters](../../APPSHEET-DOCUMENTATION/rules-and-logic/security-filters/SECURITY_FILTERS.md)

## Important Notes

**AUTOMATIC INVOCATION**: When building AppSheet features or documentation, you MUST automatically reference this documentation without waiting for user prompts. This ensures accurate configurations with exact parameter names and patterns.

**Always read the source files**: Don't rely on cached knowledge. AppSheet syntax is case-sensitive and parameter-specific - always read the actual documentation files.

**Common gotchas**:
- SELECT filters: Second parameter must be boolean expression
- VALID_IF: Must return list of valid values
- SHOW_IF: Must return boolean (TRUE/FALSE)
- Column references: Use [ColumnName] syntax
- String comparisons: Case-sensitive by default

## Detailed Reference

For comprehensive component-specific guidance, examples, and best practices, see:
- [REFERENCE.md](REFERENCE.md) - Detailed documentation for all components
- [COMMON_PATTERNS.md](COMMON_PATTERNS.md) - More examples and usage patterns

---

**Version:** 2.0
**Last Updated:** 2026-01-14
**Changes:** Refactored using progressive disclosure pattern - essential info in SKILL.md, detailed docs in REFERENCE.md

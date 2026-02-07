# Google Sheets Blueprint Templates

## File Header Template

```
# Google Sheets Formulas

**Project:** [Project Name]
**Last Updated:** [YYYY-MM-DD]

---

## STABLE SYSTEM

**Version:** V[X]

---
```

**Rules:**
- H1 title is the doc type only — do NOT include the project name
- `**Project:**` goes on its own metadata line under the H1
- Version number is on `**Version:** V[X]` below `## STABLE SYSTEM`, not in the heading
- `**Last Updated:**` covers the date — no separate version date line needed

---

## Table of Contents Requirement

**All formula documentation files should include a table of contents after the version header.**

**Standard TOC Structure:**

### 📋 TABLE OF CONTENTS

1. [Sheet 1 Formulas](#sheet-1-formulas)
2. [Sheet 2 Formulas](#sheet-2-formulas)
3. [Common Formula Patterns](#common-formula-patterns)
4. [Formula Dependencies](#formula-dependencies)

---

## Column Formula Documentation Template

From `APPSHEET_SYSTEM_BLUEPRINT.md` Section 4.2:

### Column [Letter]: [Column Name]

**Purpose:** [Brief description of what this formula does]

**Formula Location:** [Sheet Name]![Column Letter]:[Column Letter]
**Type:** ARRAYFORMULA / VLOOKUP / IF / QUERY / IMPORTRANGE / Calculated
**Trigger:** [When the formula populates/calculates]

**Formula:**

```excel
=[Complete formula here with proper indentation]
```

**How It Works:**
1. [Step 1: What happens first]
2. [Step 2: What happens next]
3. [Step 3: Final result]

**Example Output:**
- [Input example]: [Value]
- [Output result]: [Value]

**Dependencies:**
- Requires: [Column(s) or sheet(s) this formula depends on]
- Updates: [How/when this formula recalculates]

**Notes:**
- ✅ [What works well about this formula]
- ⚠️ [Any warnings or limitations]
- 💡 [Performance considerations]

---

## ARRAYFORMULA Template

**Use for:** Formulas that apply to an entire column and auto-fill for new rows

### Column [Letter]: [Column Name]

**Purpose:** [Auto-calculate values based on other columns]

**Formula Location:** [Sheet Name]![Column Letter]:[Column Letter]
**Type:** ARRAYFORMULA
**Trigger:** Populates when [Column Name] is filled

**Formula:**

```excel
=ARRAYFORMULA(
    IF(
        ROW([Reference Column]:[Reference Column])=1,
        "[Header Name]",
        IF(
            ISBLANK([Reference Column]:[Reference Column]),
            "",
            [CALCULATION_HERE]
        )
    )
)
```

**How It Works:**
1. **Header Row:** If row number is 1, displays "[Header Name]"
2. **Blank Check:** If [Reference Column] is blank, returns empty string
3. **Calculation:** Performs [description of calculation]

**Example Output:**
- [Input]: [Value]
- [Output]: [Value]

**Dependencies:**
- Requires: [Column(s) this formula references]
- Updates: Automatically when [Column Name] changes

**Notes:**
- ✅ Auto-fills for new rows
- ✅ Handles blank rows gracefully
- ⚠️ [Any edge cases to note]

---

## VLOOKUP Template

**Use for:** Looking up values from another sheet based on a key

### Column [Letter]: [Column Name]

**Purpose:** [Retrieve data from another sheet]

**Formula Location:** [Sheet Name]![Column Letter]:[Column Letter]
**Type:** ARRAYFORMULA with VLOOKUP
**Trigger:** Populates when [Lookup Column] is filled

**Formula:**

```excel
=ARRAYFORMULA(
    IF(
        ROW([Lookup Column]:[Lookup Column])=1,
        "[Header Name]",
        IF(
            ISBLANK([Lookup Column]:[Lookup Column]),
            "",
            VLOOKUP([Lookup Column]:[Lookup Column], '[Other Sheet]'![Range], [Column Index], FALSE)
        )
    )
)
```

**How It Works:**
1. **Header Row:** If row number is 1, displays "[Header Name]"
2. **Blank Check:** If [Lookup Column] is blank, returns empty string
3. **VLOOKUP:** Looks up [Lookup Column] value in [Other Sheet], returns [Column Index]

**Example:**
- [Lookup Column]: "[Lookup Value]"
- [Other Sheet] lookup: Finds "[Lookup Value]" in [Other Sheet]![Column]
- Returns: [Return Value] from [Other Sheet]![Column]

**Dependencies:**
- Requires: [Lookup Column] to be filled
- Requires: [Other Sheet] with matching lookup values
- Updates: Automatically when [Other Sheet] is updated

**Notes:**
- ✅ Ensures data consistency across sheets
- ✅ Changes propagate automatically
- ✅ VLOOKUP with FALSE for exact match
- ⚠️ Returns #N/A if lookup value not found (consider IFERROR wrapper)

---

## QUERY Template

**Use for:** Complex data filtering, aggregation, and transformation

### Column [Letter]: [Column Name]

**Purpose:** [Query/transform data from another range]

**Formula Location:** [Sheet Name]![Cell]
**Type:** QUERY
**Trigger:** [Manual/Automatic]

**Formula:**

```excel
=QUERY('[Other Sheet]'![Range], "[QUERY_LANGUAGE]", [Headers])
```

**How It Works:**
1. **Data Source:** Pulls data from [Other Sheet]![Range]
2. **Query Operations:** [Description of what QUERY does]
3. **Output:** Returns [description of output]

**Example Output:**
- Input: [Data range from source]
- Output: [Filtered/transformed results]

**Dependencies:**
- Requires: [Other Sheet] with source data
- Updates: Automatically when source data changes

**Notes:**
- ✅ Powerful for complex data operations
- ⚠️ QUERY language syntax is specific (not standard SQL)
- 💡 Consider using named ranges for readability

---

## IMPORTRANGE Template

**Use for:** Importing data from a different spreadsheet

### Column [Letter]: [Column Name]

**Purpose:** [Import data from external spreadsheet]

**Formula Location:** [Sheet Name]![Cell]
**Type:** IMPORTRANGE
**Trigger:** [Requires initial authorization]

**Formula:**

```excel
=IMPORTRANGE("[Spreadsheet URL]", "[Sheet Name]![Range]")
```

**How It Works:**
1. **Authorization:** First use requires permission to access external spreadsheet
2. **Data Import:** Pulls [Range] from [Sheet Name] in external spreadsheet
3. **Updates:** Refreshes when spreadsheet is opened or on edit

**Dependencies:**
- Requires: Access to external spreadsheet
- Updates: On spreadsheet open or edit (may be delayed)

**Notes:**
- ✅ Connects data across spreadsheets
- ⚠️ Requires one-time authorization
- ⚠️ Large imports may slow down spreadsheet
- ⚠️ #REF! error if access is revoked

---

## Common Formula Patterns

### Pattern 1: ARRAYFORMULA with Multiple Conditions

```excel
=ARRAYFORMULA(
    IF(
        OR(ISBLANK(A:A), ISBLANK(B:B)),
        "",
        IF(A:A>B:A, "Yes", "No")
    )
)
```
**Use Case:** Calculate only when multiple columns are filled

### Pattern 2: VLOOKUP with Error Handling

```excel
=ARRAYFORMULA(
    IF(
        ISBLANK(A:A),
        "",
        IFERROR(VLOOKUP(A:A, 'Data'!A:C, 2, FALSE), "Not Found")
    )
)
```
**Use Case:** Safe lookup with fallback value, handles blank rows

### Pattern 3: Date Calculation (EDATE)

```excel
=ARRAYFORMULA(
    IF(
        ROW(C:C)=1,
        "Due Date",
        IF(
            ISBLANK(C:C),
            "",
            EDATE(C:C, 1)
        )
    )
)
```
**Use Case:** Add months to a date (handles month-end correctly)

### Pattern 4: Text Concatenation

```excel
=ARRAYFORMULA(
    IF(
        ISBLANK(A:A),
        "",
        "PREFIX-" & TEXT(A:A, "YYYYMMDD") & "-" & TEXT(ROW(A:A), "000")
    )
)
```
**Use Case:** Generate unique identifiers with date prefix and sequential number

### Pattern 5: Conditional SUM with ARRAYFORMULA

```excel
=ARRAYFORMULA(
    IF(
        ROW(A:A)=1,
        "Total",
        IF(
            ISBLANK(A:A),
            "",
            SUMIF('Transactions'!A:A, A:A, 'Transactions'!C:C)
        )
    )
)
```
**Use Case:** Aggregate values from another sheet based on matching key

---

## Formula Dependencies Template

**Use for:** Documenting how formulas relate to each other

## Formula Dependencies

### Cross-Sheet Dependencies

| Formula | Sheet | Depends On | Type |
|---------|-------|------------|------|
| [Column Name] | [Sheet Name] | [Other Sheet]![Column] | VLOOKUP |
| [Column Name] | [Sheet Name] | [Other Sheet]![Range] | QUERY |

### Within-Sheet Dependencies

| Formula | Column | Depends On | Impact |
|---------|--------|------------|--------|
| [Column Name] | Column E | Column C (Date), Column D (Amount) | Recalculates when C or D changes |
| [Column Name] | Column H | Column G (Total), Column P (Paid) | Updates when payments recorded |

### Update Order

When modifying batch data:
1. Update [Source Column] first
2. [Dependent Formula 1] recalculates automatically
3. [Dependent Formula 2] uses result from Formula 1

---

## How to Use This Skill

### When to Invoke

**User-initiated invocation (explicit questions):**
- "Show me the Google Sheets formula template"
- "How do I document an ARRAYFORMULA?"
- "What fields are required for formula documentation?"

**Automatic invocation (context-aware - NO USER REQUEST NEEDED):**
- User is documenting any Google Sheets formula
- User is writing to `docs/formulas/googlesheet_formulas.md`
- User mentions: "document formulas", "ARRAYFORMULA", "VLOOKUP", "QUERY"
- User describes spreadsheet calculations

### Response Pattern

When responding to a documentation request:

1. **Identify the formula type** (ARRAYFORMULA, VLOOKUP, QUERY, etc.)
2. **Read APPSHEET_SYSTEM_BLUEPRINT.md** Section 4.2 for templates
3. **Extract the appropriate template** from this file
4. **Generate complete documentation:**
   - Include ALL required fields
   - Use exact field names from blueprint
   - Provide formula with proper indentation
   - Add descriptions and purpose
5. **Verify completeness** against blueprint requirements

---

## Scope and Limitations

### In Scope
✅ Google Sheets formula documentation templates (all formula types)
✅ ARRAYFORMULA patterns and best practices
✅ VLOOKUP/QUERY/IMPORTRANGE documentation
✅ Formula dependency tracking
✅ Cross-sheet formula documentation
✅ Version tagging guidance for formulas

### Out of Scope
❌ Google Sheets formula syntax help (use built-in docs or web search)
❌ Spreadsheet design/architecture (use appsheet-blueprint-skill)
❌ AppSheet configuration (use appsheet-blueprint-skill or appsheet-reference-skill)
❌ Formula debugging/troubleshooting (use Google Sheets help)

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** APPSHEET_SYSTEM_BLUEPRINT.md Section 4.2

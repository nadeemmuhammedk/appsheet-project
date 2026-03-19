# AppSheet References and Dereferences

References connect rows across tables. Dereference syntax lets you pull values from a referenced row. LOOKUP is the function form for cross-table value retrieval when you don't have a Ref column.

---

## 1. Dereference Syntax

When a column is of type **Ref** (references another table's key), use dot notation to read fields from the referenced row directly.

**Syntax:** `[RefColumn].[TargetColumn]`

```appsheet
# Get a field from the referenced row
[CustomerRef].[CompanyName]
[ProductRef].[UnitPrice]
[ManagerRef].[Email]

# Chain through multiple references
[OrderRef].[CustomerRef].[CompanyName]
```

**Where to use:** App Formula, Initial Value, VALID_IF, SHOW IF, security filters — anywhere an expression is accepted.

---

## 2. LOOKUP Function

Use `LOOKUP()` when you want to retrieve a value from another table without a Ref column — by matching on any column.

**Syntax:**
```appsheet
LOOKUP(SearchValue, "TableName", "SearchColumn", "ReturnColumn")
```

| Argument | Description |
|----------|-------------|
| `SearchValue` | The value to search for |
| `"TableName"` | The table to search in (string literal) |
| `"SearchColumn"` | The column to match against (string literal) |
| `"ReturnColumn"` | The column whose value to return (string literal) |

---

## 3. User Lookup Patterns

These patterns retrieve information about the currently logged-in user from a users/staff table.

### Current User's Role
```appsheet
LOOKUP(USEREMAIL(), "users", "UserEmail", "Role")
```

### Current User's Name
```appsheet
LOOKUP(USEREMAIL(), "users", "UserEmail", "Name")
```

### Current User's Assigned Field (Branch, Region, Department, etc.)
```appsheet
LOOKUP(USEREMAIL(), "users", "UserEmail", "Branch")
LOOKUP(USEREMAIL(), "users", "UserEmail", "Region")
LOOKUP(USEREMAIL(), "users", "UserEmail", "Department")
```

**Common usage — role check in SHOW IF or security filter:**
```appsheet
LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin"
LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") IN({"Admin", "Manager"})
```

---

## 4. Parent Lookup Patterns

Retrieve a value from a parent table using the current row's Ref column.

### Single Value from Parent Table
```appsheet
LOOKUP([RefColumn], "ParentTable", "KeyColumn", "TargetField")
```

### Used in VALID_IF to Filter Dropdown by Parent
```appsheet
VALID_IF: SELECT(data[Value],
  AND(
    [Category] = "CategoryName",
    [FilterField] = LOOKUP([RefColumn], "ParentTable", "KeyColumn", "FilterField")
  )
)
```

**Example — filter sub-items to match parent's division:**
```appsheet
SELECT(data[ServiceName],
  AND(
    [Category] = "Service",
    [Division] = LOOKUP([ParentRef], "ParentTable", "ParentID", "Division")
  )
)
```

---

## 5. Auto-Generated ID Pattern

Combine a prefix, date, and UNIQUEID to generate human-readable, collision-resistant IDs.

```appsheet
Column Name: [ID Column]
Type: Text
Key: Yes
Initial Value: "PREFIX-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()
EDITABLE: FALSE
REQUIRE: YES
```

**Output format:** `PREFIX-20260319-abc123xyz`

**Variations:**
```appsheet
# Date only (no random suffix — use only if volume is low)
Initial Value: "ORD-" & TEXT(TODAY(), "YYYYMMDD")

# User-scoped ID
Initial Value: LEFT(USEREMAIL(), FIND("@", USEREMAIL()) - 1) & "-" & UNIQUEID()

# Numeric suffix from UNIQUEID (first 6 chars)
Initial Value: "TASK-" & LEFT(UNIQUEID(), 6)
```

---

## 6. List Aggregation Patterns

Use `SELECT()` combined with aggregation functions to count, sum, or retrieve values across matching rows.

### Count Matching Rows
```appsheet
COUNT(SELECT([Table][KeyColumn],
  [ConditionColumn] = "Value"
))
```

### Count Related Child Records
```appsheet
COUNT(SELECT([ChildTable][KeyColumn],
  [RefColumn] = [_THISROW].[ParentKeyColumn]
))
```

### Sum Values Across Matching Rows
```appsheet
SUM(SELECT([Table][AmountColumn],
  [RefColumn] = [_THISROW].[KeyColumn]
))
```

### Get the Latest Record (by date)
```appsheet
MAXROW("[Table]", "DateColumn",
  [RefColumn] = [_THISROW].[KeyColumn]
)
```

**Returns the key of the row with the maximum date. Dereference to get a field from that row:**
```appsheet
MAXROW("[Table]", "DateColumn",
  [RefColumn] = [_THISROW].[KeyColumn]
).[FieldName]
```

### Get Any One Matching Value
```appsheet
ANY(SELECT([Table][Column],
  [ConditionColumn] = [Value]
))
```

---

## 7. Constraints & Gotchas

- **LOOKUP returns the first match** — if multiple rows match the search value, only the first is returned. Ensure the search column has unique values (or is the key column) for predictable results
- **Table and column names in LOOKUP are string literals** — they are case-sensitive and must match exactly what appears in the AppSheet Data tab
- **Dereference (`[Ref].[Field]`) requires a Ref-type column** — it does not work on plain text/email columns even if the values match keys in another table
- **SELECT is evaluated row-by-row** — using SELECT inside App Formulas on large tables can significantly impact sync performance; prefer REF_ROWS when a Ref column exists
- **MAXROW returns a key value, not a row** — dereference it to get other fields from the matched row

---

## 8. Related Documentation

- [Virtual Columns](../../tables-data-schema/virtual-columns/VIRTUAL_COLUMNS_OVERVIEW.md) — REF_ROWS, calculated columns
- [Lookup Patterns](../../tables-data-schema/virtual-columns/LOOKUP_PATTERNS.md) — extended dereference patterns
- [Security Filters](../../rules-and-logic/security-filters/SECURITY_FILTERS.md) — LOOKUP(USEREMAIL(),...) in security expressions
- [List and Select](../list-and-select/LIST_AND_SELECT.md) — SELECT, FILTER, COUNT, SUM

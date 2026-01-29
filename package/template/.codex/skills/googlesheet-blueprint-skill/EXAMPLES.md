# Google Sheets Formula Documentation Examples

Generic examples following the blueprint templates. Use these as references for documenting formulas in any project.

---

## Example 1: ARRAYFORMULA - Date Calculation

### Column D: Due Date

**Purpose:** Calculate due date (30 days after order date)

**Formula Location:** Orders!D:D
**Type:** ARRAYFORMULA
**Trigger:** Populates when Order Date (Column C) is filled

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(C:C)=1,
        "Due Date",
        IF(
            ISBLANK(C:C),
            "",
            C:C + 30
        )
    )
)
```

**How It Works:**
1. **Header Row:** If row number is 1, displays "Due Date"
2. **Blank Check:** If Order Date (Column C) is blank, returns empty string
3. **Date Calculation:** Adds 30 days to Order Date

**Example Output:**
- Order Date: 2024-06-15
- Due Date: 2024-07-15

**Dependencies:**
- Requires: Column C (Order Date)
- Updates: Automatically when Order Date changes

**Notes:**
- ✅ Auto-fills for new rows
- ✅ Handles blank rows gracefully

---

## Example 2: ARRAYFORMULA - EDATE for Month Addition

### Column E: Second Payment Date

**Purpose:** Calculate second payment due date (1 month after start date)

**Formula Location:** Payments!E:E
**Type:** ARRAYFORMULA
**Trigger:** Populates when Start Date (Column C) is filled

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(C:C)=1,
        "Second Payment Date",
        IF(
            ISBLANK(C:C),
            "",
            EDATE(C:C, 1)
        )
    )
)
```

**How It Works:**
1. **Header Row:** If row number is 1, displays "Second Payment Date"
2. **Blank Check:** If Start Date (Column C) is blank, returns empty string
3. **Date Calculation:** Uses EDATE to add 1 month to Start Date

**Example Output:**
- Start Date: 2024-01-31
- Second Payment Date: 2024-02-29 (handles month-end correctly)

**Dependencies:**
- Requires: Column C (Start Date)
- Updates: Automatically when Start Date changes

**Notes:**
- ✅ EDATE handles month-end dates correctly (Jan 31 → Feb 28/29)
- ✅ More reliable than simple addition for month-based calculations

---

## Example 3: VLOOKUP - Cross-Sheet Reference

### Column D: Customer Name

**Purpose:** Look up customer name from Customers sheet

**Formula Location:** Orders!D:D
**Type:** ARRAYFORMULA with VLOOKUP
**Trigger:** Populates when Customer ID (Column C) is filled

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(C:C)=1,
        "Customer Name",
        IF(
            ISBLANK(C:C),
            "",
            VLOOKUP(C:C, 'Customers'!A:B, 2, FALSE)
        )
    )
)
```

**How It Works:**
1. **Header Row:** If row number is 1, displays "Customer Name"
2. **Blank Check:** If Customer ID (Column C) is blank, returns empty string
3. **VLOOKUP:** Looks up Customer ID in Customers sheet (A:B range), returns Customer Name (column 2)

**Example:**
- Orders Column C: "CUST-001"
- Customers lookup: Finds "CUST-001" in Customers!A:A
- Returns: Customer Name from Customers!B:B (e.g., "John Smith")

**Dependencies:**
- Requires: Column C (Customer ID) to be filled
- Requires: Customers sheet with matching Customer IDs
- Updates: Automatically when Customers sheet is updated

**Notes:**
- ✅ Ensures data consistency across sheets
- ✅ Changes propagate automatically
- ✅ VLOOKUP with FALSE for exact match
- ⚠️ Returns #N/A if Customer ID not found (consider IFERROR wrapper)

---

## Example 4: VLOOKUP with IFERROR - Safe Lookup

### Column E: Category Name

**Purpose:** Look up category name with fallback for missing values

**Formula Location:** Products!E:E
**Type:** ARRAYFORMULA with VLOOKUP and IFERROR
**Trigger:** Populates when Category ID (Column D) is filled

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(D:D)=1,
        "Category Name",
        IF(
            ISBLANK(D:D),
            "",
            IFERROR(VLOOKUP(D:D, 'Categories'!A:B, 2, FALSE), "Uncategorized")
        )
    )
)
```

**How It Works:**
1. **Header Row:** If row number is 1, displays "Category Name"
2. **Blank Check:** If Category ID (Column D) is blank, returns empty string
3. **Safe VLOOKUP:** Looks up Category ID, returns "Uncategorized" if not found

**Dependencies:**
- Requires: Column D (Category ID)
- Requires: Categories sheet with matching Category IDs
- Updates: Automatically when Categories sheet is updated

**Notes:**
- ✅ Handles missing categories gracefully
- ✅ No #N/A errors visible to users
- ✅ Clearly identifies uncategorized items

---

## Example 5: ARRAYFORMULA - Sequential ID Generation

### Column A: Record ID

**Purpose:** Generate unique sequential IDs with date prefix

**Formula Location:** Data!A:A
**Type:** ARRAYFORMULA
**Trigger:** Populates when Date (Column B) is filled

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(B:B)=1,
        "Record ID",
        IF(
            ISBLANK(B:B),
            "",
            "REC-" & TEXT(B:B, "YYYYMMDD") & "-" & TEXT(COUNTIFS(B:B, B:B, ROW(B:B), "<="&ROW(B:B)), "000")
        )
    )
)
```

**How It Works:**
1. **Header Row:** If row number is 1, displays "Record ID"
2. **Blank Check:** If Date (Column B) is blank, returns empty string
3. **ID Generation:**
   - Prefix: "REC-"
   - Date: Converts date to YYYYMMDD format
   - Sequence: Counts records with same date, formats as 001, 002, 003

**Example Output:**
- Date: 2024-06-15, Record 1: REC-20240615-001
- Date: 2024-06-15, Record 2: REC-20240615-002
- Date: 2024-06-16, Record 1: REC-20240616-001

**Dependencies:**
- Requires: Column B (Date) to be filled
- Updates: Automatically when new records added

**Notes:**
- ✅ Ensures unique IDs per date
- ✅ Sortable by date and sequence
- ⚠️ ID changes if date is modified

---

## Example 6: ARRAYFORMULA - Arithmetic Calculation

### Column F: Balance Due

**Purpose:** Calculate remaining balance (Total - Paid)

**Formula Location:** Invoices!F:F
**Type:** ARRAYFORMULA
**Trigger:** Populates when Total (Column D) exists

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(D:D)=1,
        "Balance Due",
        IF(
            ISBLANK(D:D),
            "",
            D:D - E:E
        )
    )
)
```

**How It Works:**
1. **Header Row:** If row number is 1, displays "Balance Due"
2. **Blank Check:** If Total (Column D) is blank, returns empty string
3. **Calculation:** Subtracts Paid (Column E) from Total (Column D)

**Example Output:**
- Total: $1,000, Paid: $300
- Balance Due: $700

**Dependencies:**
- Requires: Column D (Total)
- References: Column E (Paid)
- Updates: Automatically when payments recorded

**Notes:**
- ✅ Real-time calculation
- ✅ Handles blank rows gracefully

---

## Example 7: QUERY - Filter and Sort Data

### Cell A1: Active Customers List

**Purpose:** Extract and display only active customers, sorted by name

**Formula Location:** Dashboard!A1
**Type:** QUERY
**Trigger:** Automatic

**Formula:**
```excel
=QUERY(Customers!A:Z, "SELECT A, B, C WHERE B = 'Active' ORDER BY A ASC", 1)
```

**How It Works:**
1. **Data Source:** Pulls all columns from Customers sheet
2. **Filter:** WHERE clause selects only rows where Status = 'Active'
3. **Sort:** ORDER BY arranges by Customer Name (Column A) ascending
4. **Headers:** "1" parameter indicates first row is headers

**Dependencies:**
- Requires: Customers sheet with data
- Updates: Automatically when Customers data changes

**Notes:**
- ✅ Powerful for filtering and sorting
- ⚠️ QUERY language syntax is specific (not standard SQL)
- 💡 Use named ranges for readability

---

## Example 8: UNIQUE - Extract Dropdown Values

### Cell A1: Category List

**Purpose:** Extract unique category names for dropdown options

**Formula Location:** Data!A1
**Type:** UNIQUE with QUERY
**Trigger:** Automatic

**Formula:**
```excel
=UNIQUE(QUERY(Products!C2:C, "SELECT C WHERE C IS NOT NULL ORDER BY C ASC"))
```

**How It Works:**
1. **Data Source:** Pulls Category column (C) from Products sheet
2. **Filter:** Removes blanks with "WHERE C IS NOT NULL"
3. **Deduplicate:** UNIQUE removes duplicate categories
4. **Sort:** Orders alphabetically ascending

**Example Output:**
- Input: ["Electronics", "Books", "Electronics", "Clothing", "Books"]
- Output: ["Books", "Clothing", "Electronics"]

**Dependencies:**
- Requires: Products sheet with Category column
- Updates: Automatically when new categories added

**Notes:**
- ✅ Clean dropdown values for AppSheet or data validation
- ✅ Auto-updates when data changes
- ✅ Sorted alphabetically for easy navigation

---

## Example 9: IMPORTRANGE - Cross-Spreadsheet Import

### Cell A1: External Data Import

**Purpose:** Import data from another spreadsheet

**Formula Location:** Imported!A1
**Type:** IMPORTRANGE
**Trigger:** Requires initial authorization

**Formula:**
```excel
=IMPORTRANGE("https://docs.google.com/spreadsheets/d/ABC123", "Sheet1!A:Z")
```

**How It Works:**
1. **Authorization:** First use requires permission to access external spreadsheet
2. **Data Import:** Pulls all columns (A:Z) from "Sheet1" in external spreadsheet
3. **Updates:** Refreshes when spreadsheet is opened

**Dependencies:**
- Requires: Access to external spreadsheet
- Updates: On spreadsheet open or edit (may be delayed)

**Notes:**
- ✅ Connects data across spreadsheets
- ⚠️ Requires one-time authorization
- ⚠️ Large imports may slow down spreadsheet
- ⚠️ #REF! error if access is revoked

---

## Example 10: Conditional Text Formatting

### Column G: Status Display

**Purpose:** Display formatted status based on numeric value

**Formula Location:** Tasks!G:G
**Type:** ARRAYFORMULA
**Trigger:** Populates when Progress (Column F) has value

**Formula:**
```excel
=ARRAYFORMULA(
    IF(
        ROW(F:F)=1,
        "Status",
        IF(
            ISBLANK(F:F),
            "",
            IF(F:F >= 1, "Complete", IF(F:F > 0, "In Progress", "Not Started"))
        )
    )
)
```

**How It Works:**
1. **Header Row:** Displays "Status"
2. **Blank Check:** Returns empty if Progress is blank
3. **Conditional Logic:**
   - If Progress >= 1 (100%): "Complete"
   - If Progress > 0 but < 1: "In Progress"
   - If Progress = 0: "Not Started"

**Example Output:**
- Progress: 1.0 → Status: "Complete"
- Progress: 0.5 → Status: "In Progress"
- Progress: 0 → Status: "Not Started"

**Dependencies:**
- Requires: Column F (Progress) as decimal (0 to 1)
- Updates: Automatically when Progress changes

**Notes:**
- ✅ User-friendly display instead of raw numbers
- ✅ Easy to filter and sort by status

---

## Documentation Best Practices

### What Makes Good Formula Documentation

1. **Complete Formula Display:** Show formula with proper indentation
2. **Clear Purpose:** Explain what it does and why
3. **Step-by-Step Breakdown:** Explain logic flow in "How It Works"
4. **Concrete Examples:** Show Input → Output
5. **Dependencies Listed:** Required columns/sheets
6. **Notes Section:** Tips, warnings, edge cases

### Common Formula Types Quick Reference

| Type | Use Case | Key Functions |
|------|----------|---------------|
| **Date Calculation** | Add days/months to dates | `+`, `EDATE`, `EOMONTH` |
| **Lookup** | Pull data from another sheet | `VLOOKUP`, `IFERROR` |
| **ID Generation** | Create unique identifiers | `TEXT`, `COUNTIFS`, `ROW` |
| **Calculation** | Math operations | `+`, `-`, `*`, `/`, `SUM` |
| **Filter/Sort** | Extract specific data | `QUERY`, `FILTER`, `UNIQUE` |
| **Conditional** | Logic-based values | `IF`, `IFS`, `SWITCH` |
| **Text Formatting** | Combine/format text | `CONCATENATE`, `&`, `TEXT` |

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** Generic examples applicable to any project

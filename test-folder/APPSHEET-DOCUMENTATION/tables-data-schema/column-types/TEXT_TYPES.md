# Text Column Types

Text types handle string data - from short codes to long descriptions.

## 1. Text Type

**Purpose:** Short, single-line text input (names, codes, IDs, titles)

**Configuration:**
```appsheet
Type: Text
Key: No (or Yes for primary keys)
Label: Yes/No (use as display name)
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
SEARCH: YES/NO
```

**Common Use Cases:**
- Names (first name, last name, company name)
- Codes (product code, reference number)
- Identifiers (user ID, tracking number)
- Titles (project title, task name)
- Short descriptions (< 50 characters)

**Example Values:**
- "John Smith"
- "PRD-2026-001"
- "CUSTOMER-ABC123"
- "Project Alpha"

**Validation Patterns:**
```appsheet
# Prevent duplicates
VALID_IF: NOT(IN([Code], SELECT(TableName[Code], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))

# Minimum length
VALID_IF: LEN([Name]) >= 3

# Format validation (alphanumeric only)
VALID_IF: ISNOTBLANK([Value]) AND ([Value] = SUBSTITUTE(SUBSTITUTE([Value], " ", ""), "-", ""))

# Required with custom message
VALID_IF: ISNOTBLANK([Title]) - "Title cannot be empty"
```

**Formula Examples:**
```appsheet
# Concatenate values
Initial Value: CONCATENATE([FirstName], " ", [LastName])

# Extract from date
Initial Value: TEXT(TODAY(), "YYYYMMDD")

# Generate unique ID
Initial Value: "ID-" & UNIQUEID()

# Uppercase conversion
App Formula: UPPER([InputValue])
```

---

## 2. LongText Type

**Purpose:** Multi-line text input (notes, descriptions, comments)

**Configuration:**
```appsheet
Type: LongText
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: NO (usually optional)
SEARCH: YES (if searchable)
```

**Common Use Cases:**
- Notes and comments
- Descriptions (product descriptions, project details)
- Instructions or procedures
- Feedback or reviews
- Multi-paragraph content

**Example Values:**
- "This product is designed for..."
- "Meeting notes:\n- Discussed project timeline\n- Agreed on deliverables"
- "User reported issue with login..."

**Differences from Text:**
- Displays as multi-line input field
- No character limit (up to AppSheet platform limits)
- Better for content > 100 characters
- Shows as text area in forms

**Validation Patterns:**
```appsheet
# Maximum length
VALID_IF: LEN([Description]) <= 1000

# Minimum words
VALID_IF: LEN([Notes]) - LEN(SUBSTITUTE([Notes], " ", "")) + 1 >= 10

# Not blank if other condition
VALID_IF: IF([Status] = "Rejected", ISNOTBLANK([RejectReason]), TRUE)
```

**Formula Examples:**
```appsheet
# Combine multiple fields
App Formula: CONCATENATE("Name: ", [Name], "\n", "Date: ", TEXT([Date], "MM/DD/YYYY"), "\n", "Notes: ", [Notes])

# Extract preview (first 100 chars)
App Formula: LEFT([LongDescription], 100) & "..."
```

---

## 3. Name Type

**Purpose:** Person names with special formatting

**Configuration:**
```appsheet
Type: Name
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
SEARCH: YES
```

**Common Use Cases:**
- Employee names
- Customer names
- Contact names
- Author or creator names

**Example Values:**
- "John Smith"
- "Mary Johnson"
- "Dr. Robert Williams"

**Features:**
- Optimized for person names
- May apply capitalization formatting
- Searchable by default
- Compatible with contact integrations

**Validation Patterns:**
```appsheet
# Require full name (first and last)
VALID_IF: CONTAINS([FullName], " ")

# Minimum characters
VALID_IF: LEN([Name]) >= 2

# Prevent duplicates
VALID_IF: NOT(IN([Name], SELECT(Contacts[Name], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
```

**Formula Examples:**
```appsheet
# Combine first and last name
App Formula: CONCATENATE([FirstName], " ", [LastName])

# Extract first name
App Formula: LEFT([FullName], FIND(" ", [FullName]) - 1)

# Extract last name
App Formula: RIGHT([FullName], LEN([FullName]) - FIND(" ", [FullName]))

# Format as "Last, First"
App Formula: CONCATENATE([LastName], ", ", [FirstName])
```

---

## 4. Best Practices

### When to Use Text vs LongText
- **Text:** Single-line input, < 100 characters, used in lists/cards
- **LongText:** Multi-line input, > 100 characters, detailed content

### When to Use Name vs Text
- **Name:** For person names (benefits from name-specific formatting)
- **Text:** For all other short text (product names, codes, titles)

### Performance
- Index Text columns used in filters (mark as SEARCH: Yes)
- Avoid complex text manipulation in frequently-calculated formulas
- Use Text for primary keys (not LongText)

### Data Quality
- Use VALID_IF for format validation
- Trim whitespace: `TRIM([Value])`
- Enforce case: `UPPER([Code])` or `LOWER([Email])`
- Prevent blank entries: `ISNOTBLANK([Field])`

### User Experience
- Use placeholders for input hints
- Add helpful VALID_IF error messages
- Use LongText for descriptions > 2-3 lines
- Make searchable columns SEARCH: Yes

---

## 5. Common Patterns

### Unique Text Identifiers
```appsheet
Column: ReferenceNumber
Type: Text
Key: No
Initial Value: "REF-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()
VALID_IF: NOT(IN([ReferenceNumber], SELECT(Table[ReferenceNumber], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
EDITABLE: FALSE
```

### Concatenated Display Name (Virtual)
```appsheet
Column: DisplayName
Type: Text (Virtual)
Formula: CONCATENATE([FirstName], " ", [LastName], " (", [Department], ")")
Label: Yes
```

### Notes with Timestamp
```appsheet
Column: Notes
Type: LongText
Initial Value: "[" & TEXT(NOW(), "MM/DD/YYYY HH:MM AM/PM") & "] "
```

### Uppercase Code
```appsheet
Column: ProductCode
Type: Text
App Formula: UPPER([ProductCode])
VALID_IF: LEN([ProductCode]) = 6 AND ([ProductCode] = UPPER([ProductCode]))
```

---

**Related Documentation:**
- [Column Properties](../column-properties/COLUMN_PROPERTIES_OVERVIEW.md)
- [Primary Keys](../primary-keys/PRIMARY_KEYS_OVERVIEW.md)
- [Formulas Reference](../../formulas-reference/FORMULAS_REFERENCE.md)

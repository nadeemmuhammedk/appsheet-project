# Basic Column Properties

Basic properties define the fundamental characteristics of every column in AppSheet.

## 1. Column Name

**Purpose:** Internal identifier for the column

**Requirements:**
- Must match header name in data source (Google Sheets, Excel)
- Case-sensitive in formulas
- Should be unique within table
- Avoid special characters (except spaces)

**Best Practices:**
```
Good Names:
- CustomerName
- OrderDate
- TotalAmount
- IsActive

Avoid:
- CN (too short, unclear)
- customer_name (use camelCase or spaces)
- Name1, Name2 (use descriptive names)
- Special@Chars (avoid special characters)
```

**Naming Conventions:**
- Use descriptive names
- CamelCase or "Spaces Between Words"
- Suffix Ref columns: `CustomerRef`, `ProductRef`
- Prefix booleans: `Is`, `Has`, `Can`
- Indicate virtual: add "(Virtual)" in Description

---

## 2. Type Property

**Purpose:** Define what kind of data the column stores

**All Available Types:**
```
Basic Types:
- Text
- LongText
- Number
- Price

Date/Time Types:
- Date
- DateTime
- Time
- Duration

Selection Types:
- Enum
- EnumList

Relationship Types:
- Ref
- List

Contact Types:
- Phone
- Email
- Name
- Address

Media Types:
- Image
- File
- Drawing

Special Types:
- Yes/No
- ChangeTimestamp
- ChangeLocation
```

**Changing Types:**
- Can change if data is compatible
- Test with sample data first
- May lose type-specific features
- Regenerate structure after change

**Type Selection Guide:**
```appsheet
# For unique IDs
Type: Text

# For names/titles
Type: Text or Name

# For descriptions
Type: LongText

# For prices/currency
Type: Price (not Number)

# For quantities
Type: Number

# For dates without time
Type: Date

# For timestamps
Type: DateTime or ChangeTimestamp

# For predefined options
Type: Enum or EnumList

# For relationships
Type: Ref or List

# For true/false
Type: Yes/No
```

---

## 3. Key Property

**Purpose:** Mark column as primary key (unique identifier)

**Configuration:**
```appsheet
Key: Yes/No
```

**Requirements for Primary Keys:**
- Must be unique for each row
- Cannot be blank
- Should not change after creation
- Only ONE key column per table

**Common Key Patterns:**
```appsheet
# Auto-generated ID
Column: RecordID
Type: Text
Key: Yes
Initial Value: "REC-" & UNIQUEID()
EDITABLE: No

# Email as key
Column: Email
Type: Email
Key: Yes
VALID_IF: NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))

# Natural key (existing identifier)
Column: EmployeeID
Type: Text
Key: Yes
EDITABLE: No
```

**Best Practices:**
- Use Text type for keys
- Auto-generate with UNIQUEID()
- Make keys uneditable (EDITABLE: No)
- Hide from forms (SHOW: No) if internal
- Never reuse keys

---

## 4. Label Property

**Purpose:** Use column value as the display name for records

**Configuration:**
```appsheet
Label: Yes/No
```

**How It Works:**
- Only ONE column can be Label per table
- Used when referencing records from other tables
- Displays in Ref dropdowns
- Shows in navigation breadcrumbs
- Used in card titles

**Example:**
```appsheet
Table: Customers
Column: CustomerName
Type: Text
Label: Yes  # This column displays when referencing Customer records

Table: Orders
Column: CustomerRef
Type: Ref
Source table: Customers
# When selecting customer, shows CustomerName value
```

**Best Practices:**
- Choose human-readable column (Name, Title, Code)
- Not the primary key (unless key is readable)
- Should be unique or identifying
- Keep reasonably short (< 50 chars)
- Use virtual column for formatted display:
  ```appsheet
  Column: DisplayName (Virtual)
  App Formula: CONCATENATE([Code], " - ", [Name])
  Label: Yes
  ```

---

## 5. Description Property

**Purpose:** Internal documentation for the column

**Configuration:**
```appsheet
Description: <text>
```

**What to Include:**
- Purpose of the column
- Expected values/format
- Business rules
- Calculation logic (for virtual columns)
- Validation requirements
- Notes for other developers

**Examples:**
```appsheet
# Simple description
Description: Customer's primary email address

# With format info
Description: Order ID in format ORD-YYYYMMDD-XXXXX

# With business rules
Description: Approval required if amount > $10,000

# For virtual columns
Description: (Virtual) Total of all line items. Calculated as SUM of LineItems[Amount]

# With validation notes
Description: Phone number must be 10 digits, numeric only
```

**Best Practices:**
- Always add descriptions for clarity
- Explain non-obvious logic
- Document formulas
- Note virtual columns
- Include validation rules
- Use for team collaboration

---

## 6. Common Configuration Patterns

### Primary Key Column
```appsheet
Column Name: RecordID
Type: Text
Key: Yes
Label: No
Description: Auto-generated unique identifier
Initial Value: "REC-" & UNIQUEID()
SHOW: No
EDITABLE: No
REQUIRE: Yes
```

### Display Name Column
```appsheet
Column Name: CustomerName
Type: Text
Key: No
Label: Yes
Description: Customer's full business name
SHOW: Yes
EDITABLE: Yes
REQUIRE: Yes
SEARCH: Yes
```

### Virtual Calculated Column
```appsheet
Column Name: TotalAmount
Type: Price (Virtual)
Key: No
Label: No
Description: (Virtual) Sum of all line items
App Formula: SUM([LineItems][Amount])
SHOW: Yes
EDITABLE: No
```

### Reference Column
```appsheet
Column Name: CustomerRef
Type: Ref
Source table: Customers
Label: CustomerName
Key: No
Description: Reference to customer who placed this order
SHOW: Yes
EDITABLE: Yes
REQUIRE: Yes
```

---

## 7. Property Relationships

### Type Determines Available Features
```
Type: Price
  → Decimal digits setting
  → Currency symbol setting
  → Thousands separator

Type: Enum
  → Values list
  → Allow other values
  → Input mode

Type: Ref
  → Source table
  → Label column
  → Input mode
```

### Key Affects Behavior
```
Key: Yes
  → Must be unique
  → Cannot be blank
  → Used for relationships
  → Used in formulas ([_THISROW].[KeyColumn])
```

### Label Affects Display
```
Label: Yes
  → Shows in Ref dropdowns
  → Shows in breadcrumbs
  → Used for record identification
  → Only one per table
```

---

## 8. Best Practices Summary

### Column Naming
- Be descriptive and clear
- Use consistent naming conventions
- Match data source headers exactly
- Avoid abbreviations
- Use CamelCase or spaces

### Type Selection
- Choose most specific type
- Price for currency (not Number)
- Ref for relationships (not Text IDs)
- Enum for controlled values
- ChangeTimestamp for audit trails

### Primary Keys
- Always define a key column
- Use auto-generated UNIQUEIDs
- Make keys non-editable
- Use Text type
- Never expose internal IDs to users

### Labels
- Choose descriptive column
- Keep concise but identifying
- Can use virtual column for formatting
- Only one label per table

### Documentation
- Always add descriptions
- Explain business rules
- Document formulas
- Note validation requirements
- Help future developers

---

## 9. Quick Reference

| Property | Purpose | Required | Multiple |
|----------|---------|----------|----------|
| **Column Name** | Internal identifier | Yes | - |
| **Type** | Data type | Yes | - |
| **Key** | Primary key marker | No | One per table |
| **Label** | Display name column | No | One per table |
| **Description** | Documentation | No | - |

---

**Related Documentation:**
- [Column Properties Overview](COLUMN_PROPERTIES_OVERVIEW.md)
- [Column Types Overview](../column-types/COLUMN_TYPES_OVERVIEW.md)
- [Primary Keys](../primary-keys/PRIMARY_KEYS_OVERVIEW.md)

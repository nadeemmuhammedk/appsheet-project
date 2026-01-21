# Column Properties Overview

Column properties define how columns behave, validate, display, and calculate values in AppSheet.

## 1. All Column Properties

| Property | Category | Purpose | Example |
|----------|----------|---------|---------|
| **Column Name** | Basic | Internal identifier | "CustomerName" |
| **Type** | Basic | Data type | Text, Number, Date, Ref |
| **Key** | Basic | Mark as primary key | Yes/No |
| **Label** | Basic | Use as record display name | Yes/No |
| **Initial Value** | Formula | Default value for new records | TODAY(), USEREMAIL() |
| **App Formula** | Formula | Calculate value dynamically | [Price] * [Quantity] |
| **VALID_IF** | Validation | Restrict allowed values | [StartDate] < [EndDate] |
| **REQUIRE** | Validation | Make column mandatory | Yes/No |
| **EDITABLE IF** | Advanced | Control when editable | [Status] = "Draft" |
| **SHOW** | Display | Display in forms | Yes/No |
| **SHOW IF** | Display | Conditionally display | [Type] = "Other" |
| **SEARCH** | Display | Enable in app search | Yes/No |
| **Description** | Basic | Internal documentation | "Customer's primary email" |
| **Type Details** | Advanced | Type-specific settings | Enum values, Ref source |

## 2. Property Categories

### Basic Properties
Core configuration for every column.
- [Basic Properties →](BASIC_PROPERTIES.md)
  - Column Name, Type, Key, Label, Description

### Formula Properties
Calculate and set values automatically.
- [Formula Properties →](FORMULA_PROPERTIES.md)
  - Initial Value, App Formula

### Validation Properties
Control data quality and requirements.
- [Validation Properties →](VALIDATION_PROPERTIES.md)
  - VALID_IF, REQUIRE

### Display Properties
Control visibility and searchability.
- [Display Properties →](DISPLAY_PROPERTIES.md)
  - SHOW, SHOW IF, SEARCH

### Advanced Properties
Fine-grained control over behavior.
- [Advanced Properties →](ADVANCED_PROPERTIES.md)
  - EDITABLE IF, Type Details

## 3. Property Usage by Scenario

### Setting Up a New Column
**Minimum required:**
1. Column Name
2. Type

**Recommended:**
3. Description (for documentation)
4. REQUIRE (if mandatory)
5. Initial Value (if has default)

### Creating a Primary Key
```appsheet
Column Name: RecordID
Type: Text
Key: Yes
Initial Value: "REC-" & UNIQUEID()
SHOW: No
EDITABLE: No
REQUIRE: Yes
```

### Creating a Virtual Column
```appsheet
Column Name: FullName
Type: Text (Virtual - no physical column)
App Formula: CONCATENATE([FirstName], " ", [LastName])
SHOW: Yes
SEARCH: Yes
```

### Creating a Validated Input
```appsheet
Column Name: Email
Type: Email
REQUIRE: Yes
VALID_IF: NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
EDITABLE IF: USEREMAIL() = [Owner]
```

### Creating a Conditional Field
```appsheet
Column Name: RejectReason
Type: LongText
SHOW IF: [Status] = "Rejected"
REQUIRE IF: [Status] = "Rejected" (use VALID_IF instead)
VALID_IF: IF([Status] = "Rejected", ISNOTBLANK([RejectReason]), TRUE)
```

## 4. Formula Context

### When Formulas Execute

| Property | Execution | Updates | Use Case |
|----------|-----------|---------|----------|
| **Initial Value** | Once (new record) | Never | Set defaults |
| **App Formula** | Every recalc | Read-only | Calculate values |
| **VALID_IF** | On input | N/A | Validate input |
| **EDITABLE IF** | Every recalc | N/A | Lock/unlock field |
| **SHOW IF** | Every recalc | N/A | Hide/show field |

### Available Variables

| Variable | Meaning | Available Where |
|----------|---------|-----------------|
| `[ColumnName]` | Current row value | All formulas |
| `[_THISROW]` | Current record | All formulas |
| `[_THISROW_BEFORE]` | Previous values | VALID_IF, Actions |
| `[_ROWNUMBER]` | Row index | All formulas |
| `USEREMAIL()` | Current user email | All formulas |
| `USERROLE()` | Current user role | All formulas |
| `TODAY()` | Current date | All formulas |
| `NOW()` | Current datetime | All formulas |

## 5. Common Patterns

### Auto-Generated ID
```appsheet
Column Name: OrderID
Type: Text
Key: Yes
Initial Value: "ORD-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()
SHOW: No (or Yes if users should see)
EDITABLE: No
REQUIRE: Yes
```

### Timestamp (Created)
```appsheet
Column Name: CreatedAt
Type: ChangeTimestamp
SHOW: Yes
EDITABLE: No
```

### User Tracking
```appsheet
Column Name: CreatedBy
Type: Email
Initial Value: USEREMAIL()
SHOW: Yes
EDITABLE: No
REQUIRE: Yes
```

### Calculated Total
```appsheet
Column Name: Total
Type: Price (Virtual)
App Formula: SUM([LineItems][Amount])
SHOW: Yes
```

### Conditional Requirement
```appsheet
Column Name: ManagerApproval
Type: Yes/No
SHOW IF: [Amount] > 1000
VALID_IF: IF([Amount] > 1000, ISNOTBLANK([ManagerApproval]), TRUE)
```

### Status-Based Edit Lock
```appsheet
Column Name: Amount
Type: Price
EDITABLE IF: [Status] = "Draft"
REQUIRE: Yes
VALID_IF: [Amount] > 0
```

### Unique Value Validation
```appsheet
Column Name: Username
Type: Text
REQUIRE: Yes
VALID_IF: NOT(IN([Username], SELECT(Users[Username], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
```

### Inherited Parent Value
```appsheet
Column Name: CategoryName
Type: Text (Virtual)
App Formula: [CategoryRef].[Name]
SHOW: Yes
```

### Dynamic Dropdown
```appsheet
Column Name: Subcategory
Type: Enum
VALID_IF:
  SWITCH([Category],
    "Electronics", LIST("Phones", "Laptops"),
    "Clothing", LIST("Shirts", "Pants"),
    LIST()
  )
```

## 6. Best Practices

### Property Selection
- Always set Description for documentation
- Use REQUIRE for mandatory fields
- Use EDITABLE IF for workflow-based locking
- Use SHOW IF sparingly (prefer views/slices)
- Set SEARCH: Yes for frequently-filtered columns

### Formula Best Practices
- Keep formulas simple and readable
- Use virtual columns for complex calculations
- Avoid circular references
- Cache expensive lookups in virtual columns
- Use Initial Value for one-time defaults
- Use App Formula for dynamic calculations

### Validation Best Practices
- Provide helpful error messages in VALID_IF
- Validate at the earliest point
- Use positive validation (what IS allowed)
- Test edge cases
- Prevent duplicates where needed

### Performance
- Minimize complex formulas in VALID_IF
- Use SELECT sparingly in validation
- Cache lookups in virtual columns
- Index searchable columns (SEARCH: Yes)
- Use simple Initial Values

### User Experience
- Show helpful error messages
- Lock fields users shouldn't edit (EDITABLE IF)
- Hide technical fields (SHOW: No for IDs)
- Set sensible defaults (Initial Value)
- Make required fields obvious (REQUIRE: Yes)

## 7. Property Interaction

### SHOW vs SHOW IF
```appsheet
# SHOW: No - Never displayed
Column: InternalID
SHOW: No

# SHOW IF: [Condition] - Conditionally displayed
Column: OptionalField
SHOW: Yes
SHOW IF: [ShowOptional] = TRUE
```

### REQUIRE vs VALID_IF
```appsheet
# REQUIRE: Yes - Simple requirement
Column: Name
REQUIRE: Yes

# VALID_IF - Conditional requirement
Column: RejectReason
REQUIRE: No
VALID_IF: IF([Status] = "Rejected", ISNOTBLANK([RejectReason]), TRUE)
```

### Initial Value vs App Formula
```appsheet
# Initial Value - Set once
Column: CreatedDate
Initial Value: TODAY()
(User can edit afterward if EDITABLE: Yes)

# App Formula - Always calculated
Column: DaysSinceCreated
App Formula: TODAY() - [CreatedDate]
(Always read-only, recalculates)
```

### EDITABLE vs EDITABLE IF
```appsheet
# EDITABLE: No - Never editable
Column: SystemID
EDITABLE: No

# EDITABLE IF: [Condition] - Conditionally editable
Column: Amount
EDITABLE: Yes (base setting)
EDITABLE IF: [Status] = "Draft"
```

## 8. Virtual vs Physical Columns

### Physical Columns
- Stored in data source (Google Sheets, database)
- Can use Initial Value
- Can be edited (if EDITABLE: Yes)
- Persist data

### Virtual Columns
- Not stored (calculated on-demand)
- Must use App Formula
- Always read-only
- Recalculate automatically

**When to use Virtual:**
- Calculated values (totals, concatenations)
- Dereferenced values ([Ref].[Column])
- Reverse references (REF_ROWS)
- Dynamic status indicators
- Values derived from other columns

**When to use Physical:**
- User inputs
- Data from external sources
- Historical values that shouldn't change
- Performance-critical frequently-accessed values

## 9. Troubleshooting

### Formula Not Working
- Check syntax (brackets, quotes, parentheses)
- Verify column names match exactly
- Check formula context (Initial Value vs App Formula)
- Test with simple values first

### Validation Rejecting Valid Input
- Test VALID_IF formula in expression tester
- Check for ISNOTBLANK when field is optional
- Verify comparison operators (=, <>, <, >)
- Check for circular references

### Value Not Updating
- Verify it's an App Formula (not Initial Value)
- Check if column is virtual
- Verify formula dependencies are updating
- Force recalculation (edit a dependency)

### Field Not Showing
- Check SHOW: Yes
- Check SHOW IF condition
- Verify view includes the column
- Check UX > Form settings

---

**Detailed Documentation:**
- [Basic Properties](BASIC_PROPERTIES.md)
- [Formula Properties](FORMULA_PROPERTIES.md)
- [Validation Properties](VALIDATION_PROPERTIES.md)
- [Display Properties](DISPLAY_PROPERTIES.md)
- [Advanced Properties](ADVANCED_PROPERTIES.md)

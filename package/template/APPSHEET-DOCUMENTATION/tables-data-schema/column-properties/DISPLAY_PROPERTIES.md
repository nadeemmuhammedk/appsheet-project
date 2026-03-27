# Display Properties

Display properties control column visibility and searchability in AppSheet apps.

## 1. SHOW Property

**Purpose:** Control whether column appears in forms and views

**Syntax:**
```appsheet
SHOW: Yes/No
```

**How It Works:**
- **Yes:** Column displays in forms and default views
- **No:** Column hidden from forms (still in database, still in formulas)

**When to Use SHOW: No:**
- Internal system fields (record IDs, timestamps)
- Technical columns users don't need to see
- Columns managed by formulas only
- Temporary calculation fields

**Example:**
```appsheet
# Internal ID - hide from users
Column: RecordID
SHOW: No

# User-facing field - show
Column: CustomerName
SHOW: Yes

# System timestamp - usually hidden
Column: CreatedAt
SHOW: No (or Yes if users need to see)
```

**Important Notes:**
- SHOW: No does NOT prevent data access
- Formula can still reference hidden columns
- Use security rules to actually restrict access
- Virtual columns can be hidden or shown

---

## 2. SHOW IF Property

**Purpose:** Conditionally display column based on formula

**Syntax:**
```appsheet
SHOW IF: <expression returning TRUE or FALSE>
```

**How It Works:**
- Formula evaluated dynamically
- TRUE = column displayed
- FALSE = column hidden
- Recalculates as dependencies change

**Common Use Cases:**
```appsheet
# Show field only for specific type
SHOW IF: [Type] = "Other"

# Show when status matches
SHOW IF: [Status] = "Rejected"

# Show for certain roles
SHOW IF: USERROLE() = "Admin"

# Show when value present
SHOW IF: ISNOTBLANK([ParentField])

# Show based on calculation
SHOW IF: [Amount] > 1000
```

**Complex Conditions:**
```appsheet
# Multiple conditions
SHOW IF: AND([Type] = "Premium", [Region] = "US")

# Any condition
SHOW IF: OR([IsUrgent], [Amount] > 5000)

# Role-based with condition
SHOW IF: AND(USERROLE() = "Manager", [Status] = "Pending")

# Date-based
SHOW IF: [DueDate] < TODAY() + 7
```

---

## 3. SEARCH Property

**Purpose:** Enable column in app's search functionality

**Syntax:**
```appsheet
SEARCH: Yes/No
```

**How It Works:**
- **Yes:** Column values included in app search
- **No:** Column values not searchable
- Affects app-wide search bar
- Impacts performance (indexed)

**When to Use SEARCH: Yes:**
- Names (customer names, product names)
- Identifiers (order numbers, codes)
- Titles and labels
- Key descriptive fields
- Any column users might search for

**When to Use SEARCH: No:**
- Internal IDs
- Timestamps
- Technical fields
- Binary flags
- Calculated fields not relevant to search

**Example:**
```appsheet
# Searchable fields
Column: CustomerName
SEARCH: Yes

Column: OrderNumber
SEARCH: Yes

Column: ProductCode
SEARCH: Yes

# Non-searchable
Column: InternalID
SEARCH: No

Column: CalculatedTotal
SEARCH: No

Column: SystemFlag
SEARCH: No
```

**Performance Considerations:**
- Too many searchable columns slows search
- Index important search columns
- Balance searchability vs performance
- Use for user-facing content

---

## 4. Property Interactions

### SHOW vs SHOW IF
```appsheet
# Static visibility
SHOW: No
# Column always hidden

# Dynamic visibility
SHOW: Yes
SHOW IF: [Condition]
# Column shown when condition is TRUE
```

### SHOW IF with Validation
```appsheet
Column: RejectReason
SHOW IF: [Status] = "Rejected"
VALID_IF: IF([Status] = "Rejected", ISNOTBLANK([RejectReason]), TRUE)
# Field shown and required when status is Rejected
```

### SEARCH with SHOW
```appsheet
# Visible and searchable
SHOW: Yes
SEARCH: Yes

# Hidden but not searchable anyway
SHOW: No
SEARCH: No

# Visible but not searchable (possible)
SHOW: Yes
SEARCH: No
```

---

## 5. Common Patterns

### Conditional Detail Fields
```appsheet
Column: Type
Type: Enum
Values: Standard, Premium, Enterprise

Column: PremiumFeatures
Type: Text
SHOW IF: IN([Type], LIST("Premium", "Enterprise"))

Column: EnterpriseOnly
Type: Text
SHOW IF: [Type] = "Enterprise"
```

### Status-Based Fields
```appsheet
Column: Status
Type: Enum
Values: Draft, Submitted, Approved, Rejected

Column: SubmittedDate
Type: Date
SHOW IF: IN([Status], LIST("Submitted", "Approved", "Rejected"))

Column: ApprovalDate
Type: Date
SHOW IF: [Status] = "Approved"

Column: RejectReason
Type: LongText
SHOW IF: [Status] = "Rejected"
REQUIRE: IF([Status] = "Rejected", TRUE, FALSE)
```

### Role-Based Visibility
```appsheet
Column: InternalNotes
Type: LongText
SHOW IF: IN(USERROLE(), LIST("Admin", "Manager"))

Column: AdminOnlyField
Type: Text
SHOW IF: USERROLE() = "Admin"

Column: ManagerApproval
Type: Yes/No
SHOW IF: AND([Amount] > 5000, IN(USERROLE(), LIST("Manager", "Admin")))
```

### Amount-Based Details
```appsheet
Column: Amount
Type: Price

Column: ManagerApproval
Type: Yes/No
SHOW IF: [Amount] > 10000

Column: DirectorApproval
Type: Yes/No
SHOW IF: [Amount] > 50000

Column: ApprovalJustification
Type: LongText
SHOW IF: [Amount] > 10000
```

---

## 6. Search Optimization

### Which Columns to Make Searchable
```appsheet
# High Priority (SEARCH: Yes)
- Customer names
- Product names
- Order numbers
- Reference codes
- Titles
- Email addresses
- Phone numbers

# Low Priority (SEARCH: No)
- Internal IDs
- Timestamps
- Calculated totals
- Boolean flags
- System fields
```

### Search Performance
```appsheet
# Good - selective searchable columns
Column: ProductName (SEARCH: Yes)
Column: ProductCode (SEARCH: Yes)
Column: ProductID (SEARCH: No)
Column: CreatedAt (SEARCH: No)
Column: InternalFlag (SEARCH: No)

# Not ideal - too many searchable columns
All columns: SEARCH: Yes
# This can slow down search significantly
```

---

## 7. Visibility Best Practices

### Hide Technical Fields
```appsheet
# User doesn't need to see these
Column: RecordID
SHOW: No

Column: SyncTimestamp
SHOW: No

Column: InternalCalculation
SHOW: No (Virtual)
```

### Show User-Relevant Fields
```appsheet
# Users need these
Column: OrderNumber
SHOW: Yes

Column: CustomerName
SHOW: Yes

Column: Status
SHOW: Yes
```

### Conditional Display for Clean UI
```appsheet
# Only show when relevant
Column: CancellationReason
SHOW IF: [Status] = "Cancelled"

Column: RefundAmount
SHOW IF: [Status] = "Refunded"

Column: ExtendedWarranty
SHOW IF: [ProductType] = "Electronics"
```

---

## 8. Advanced SHOW IF Patterns

### Cascading Visibility
```appsheet
Column: Category
Type: Enum
Values: A, B, C

Column: SubCategory
Type: Enum
SHOW IF: ISNOTBLANK([Category])
VALID_IF: <category-specific subcategories>

Column: DetailLevel3
Type: Text
SHOW IF: ISNOTBLANK([SubCategory])
```

### Time-Based Visibility
```appsheet
Column: EarlyBirdDiscount
Type: Price
SHOW IF: [RegistrationDate] < DATE(2026, 12, 31)

Column: LateFeePenalty
Type: Price
SHOW IF: [DueDate] < TODAY()
```

### User Ownership
```appsheet
Column: MyPrivateNotes
Type: LongText
SHOW IF: [Owner] = USEREMAIL()

Column: AssignedUserComments
Type: LongText
SHOW IF: [AssignedTo] = USEREMAIL()
```

---

## 9. Common Mistakes

### Mistake: Using SHOW IF for Security
```appsheet
# WRONG - Not secure
Column: SensitiveData
SHOW IF: USERROLE() = "Admin"
# Users can still access via API or formulas

# RIGHT - Use security rules
Row filter formula: USERROLE() = "Admin"
# Or table-level UPDATES/ADDS/DELETES formulas
```

### Mistake: Over-Complicating SHOW IF
```appsheet
# Too complex
SHOW IF: IF(AND(OR([A], [B]), NOT([C])), IF([D], TRUE, FALSE), IF([E], TRUE, FALSE))

# Better - break into virtual column
Column: ShouldShowField (Virtual)
App Formula: <complex logic>

Column: ActualField
SHOW IF: [ShouldShowField] = TRUE
```

### Mistake: Making Everything Searchable
```appsheet
# Bad for performance
All columns: SEARCH: Yes

# Better - selective
Key columns: SEARCH: Yes
Others: SEARCH: No
```

---

## 10. Quick Reference

| Property | Purpose | Values | Performance Impact |
|----------|---------|--------|-------------------|
| **SHOW** | Static visibility | Yes/No | None |
| **SHOW IF** | Dynamic visibility | TRUE/FALSE expression | Low (recalculates) |
| **SEARCH** | Enable in search | Yes/No | Medium (indexing) |

---

## 11. Troubleshooting

### Column Not Showing
- Check SHOW: Yes
- Check SHOW IF condition evaluates to TRUE
- Verify view includes column (UX > Views)
- Check form settings

### Search Not Finding Values
- Verify SEARCH: Yes
- Check column has data
- Regenerate structure
- Check search query format

### SHOW IF Not Working
- Test formula in expression tester
- Check dependencies exist
- Verify formula returns TRUE/FALSE
- Force recalculation (edit dependency)

---

## 12. Real-World Patterns

### Segment-Based Field Visibility (Multi-Tenant / Division Pattern)

**Use case:** Show or hide fields based on a top-level segment selector (e.g., division, region, category). Different segments have different field sets on the same form.

```appsheet
# Show only for Segment A
Column Name: [SegmentAField]
SHOW IF: [SegmentColumn] = "SegmentAValue"

# Show only for Segment B
Column Name: [SegmentBField]
SHOW IF: [SegmentColumn] = "SegmentBValue"

# Show only when two conditions align (segment + parent dropdown)
Column Name: [ContextualField]
SHOW IF: AND(
  [SegmentColumn]       = "SegmentAValue",
  [ParentCategoryColumn] = "SpecificCategory"
)

# Hide for one specific combination, show for everything else
Column Name: [ChildField]
SHOW IF: NOT(AND(
  [SegmentColumn]       = "SegmentAValue",
  [ParentCategoryColumn] = "ExcludedCategory"
))
```

**Notes:**
- Use `AND()` when the field should appear only when ALL conditions are met
- Use `NOT(AND(...))` to exclude one combination while showing for all others
- Field ORDER in the form matters — segment/parent fields must appear ABOVE dependent fields

---

### Display Name — Dynamic Column Label via Formula

**Use case:** Relabel a column dynamically based on another column's value. Useful when a single field serves different semantic purposes depending on context (e.g., a text field that holds a campaign name for some lead types and a post URL for others).

```appsheet
# Dynamic label based on a sibling column value
Column Name: [FieldName]
Type: Text
Display name (formula): IF([ContextColumn] = "ContextValue", "Label A", "Label B")

# Real-world example — campaign name field that relabels for boost leads
Column Name: CampaignName
Type: Text
Display name (formula): IF([LeadSource] = "Instagram Boost", "Post URL", "Campaign Name")
```

**Notes:**
- Display name formula is set in the column's **Display properties** tab in the AppSheet data editor
- The formula must return a text string — any AppSheet expression is valid
- The column name (used in formulas and the sheet header) is unchanged — only the UI label changes
- SHOW IF, VALID_IF, and all other properties remain independent of the display name formula
- Confirmed working in AppSheet as of 2026-03-27

---

**Related Documentation:**
- [Column Properties Overview](COLUMN_PROPERTIES_OVERVIEW.md)
- [Validation Properties](VALIDATION_PROPERTIES.md)
- [Advanced Properties](ADVANCED_PROPERTIES.md)
- [Table Security](../table-settings/TABLE_SECURITY.md)

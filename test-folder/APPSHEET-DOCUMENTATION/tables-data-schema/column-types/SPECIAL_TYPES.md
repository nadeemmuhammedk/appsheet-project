# Special Column Types

Special types include boolean values and auto-updating system columns.

## 1. Yes/No Type

**Purpose:** Boolean/checkbox values (true/false)

**Configuration:**
```appsheet
Type: Yes/No
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: NO (usually)
```

**Storage:** TRUE or FALSE

**Common Use Cases:**
- Flags (IsActive, IsComplete, IsApproved)
- Checkboxes (AgreeToTerms, EmailOptIn)
- Status indicators (HasChildren, IsOverdue)
- Feature toggles (EnableNotifications)
- Conditional logic triggers

**Display:**
- Checkbox in forms
- Checkmark/X in tables
- TRUE/FALSE text

**Example Values:**
- TRUE
- FALSE

**Validation Patterns:**
```appsheet
# Require checked (must be TRUE)
VALID_IF: [AgreeToTerms] = TRUE

# Cannot uncheck after checked
VALID_IF: IF([_THISROW_BEFORE].[Approved] = TRUE, [Approved] = TRUE, TRUE)

# Conditional requirement
VALID_IF: IF([Type] = "Premium", [AcceptTerms] = TRUE, TRUE)
```

**Formula Examples:**
```appsheet
# Set based on condition
App Formula: [Amount] > 1000

# Multiple conditions
App Formula: AND([Status] = "Complete", [Verified] = TRUE)

# Any condition met
App Formula: OR([IsUrgent], [DueDate] < TODAY())

# Negation
App Formula: NOT([IsActive])

# Complex logic
App Formula: IF(COUNT([ChildRecords]) > 0, TRUE, FALSE)
```

---

## 2. ChangeTimestamp Type

**Purpose:** Automatically track when a record was created or modified

**Configuration:**
```appsheet
Type: ChangeTimestamp
SHOW: TRUE
EDITABLE: No (always read-only)
```

**Common Use Cases:**
- Record creation timestamp
- Last modified timestamp
- Audit trails
- Change tracking
- Activity monitoring

**How It Works:**
- **On creation:** Sets to current datetime
- **On edit:** Updates to current datetime
- **Read-only:** Users cannot manually change
- **Automatic:** No formula needed

**Example Use:**
```appsheet
Column: CreatedAt
Type: ChangeTimestamp
Description: When record was created
SHOW: Yes
EDITABLE: No

Column: LastModified
Type: ChangeTimestamp
Description: When record was last updated
SHOW: Yes
EDITABLE: No
```

**Use Cases:**
```appsheet
# Track creation
Column: CreatedTimestamp
Type: ChangeTimestamp

# Track modifications
Column: ModifiedTimestamp
Type: ChangeTimestamp

# Calculate time since
Column: HoursSinceModified (Virtual)
Type: Number
App Formula: (NOW() - [ModifiedTimestamp]) * 24
```

---

## 3. ChangeLocation Type

**Purpose:** Automatically capture GPS location when record created/modified

**Configuration:**
```appsheet
Type: ChangeLocation
SHOW: TRUE
EDITABLE: No (always read-only)
```

**Common Use Cases:**
- Field service check-ins
- Delivery confirmations
- Attendance tracking
- Asset location tracking
- Inspection locations

**How It Works:**
- **On creation/edit:** Captures device GPS location
- **Format:** Latitude, Longitude
- **Requires:** Device GPS/location services enabled
- **Read-only:** Users cannot manually change

**Example Use:**
```appsheet
Column: CheckInLocation
Type: ChangeLocation
Description: GPS location when checked in
SHOW: Yes
EDITABLE: No
```

**Features:**
- Automatic GPS capture
- Click-to-map (opens map app)
- Displays as coordinates
- Can be used with map views

**Privacy Note:**
- Requires location permissions
- User must enable location services
- Consider privacy implications
- Inform users of tracking

---

## 4. Yes/No Patterns

### Boolean Flags
```appsheet
Column: IsActive
Type: Yes/No
Initial Value: TRUE
Description: Indicates if record is active
```

### Completion Status
```appsheet
Column: IsComplete
Type: Yes/No
Initial Value: FALSE

Column: CompletedDate
Type: Date
SHOW IF: [IsComplete] = TRUE
```

### Calculated Booleans (Virtual)
```appsheet
Column: IsOverdue
Type: Yes/No (Virtual)
App Formula: AND([Status] <> "Complete", [DueDate] < TODAY())

Column: NeedsApproval
Type: Yes/No (Virtual)
App Formula: [Amount] > 1000

Column: HasErrors
Type: Yes/No (Virtual)
App Formula: OR(
  ISBLANK([RequiredField1]),
  ISBLANK([RequiredField2])
)
```

### Agreement/Consent
```appsheet
Column: AgreeToTerms
Type: Yes/No
REQUIRE: Yes
VALID_IF: [AgreeToTerms] = TRUE - "You must agree to terms"
```

### Feature Flags
```appsheet
Column: EnableNotifications
Type: Yes/No
Initial Value: TRUE

Column: AllowPublicView
Type: Yes/No
Initial Value: FALSE
```

---

## 5. ChangeTimestamp Patterns

### Basic Audit Trail
```appsheet
Column: CreatedAt
Type: ChangeTimestamp
EDITABLE: No

Column: CreatedBy
Type: Email
Initial Value: USEREMAIL()
EDITABLE: No
```

### Time-Based Logic
```appsheet
Column: UpdatedAt
Type: ChangeTimestamp

Column: MinutesSinceUpdate (Virtual)
Type: Number
App Formula: (NOW() - [UpdatedAt]) * 1440

Column: IsStale (Virtual)
Type: Yes/No
App Formula: (NOW() - [UpdatedAt]) > 7
```

### Activity Tracking
```appsheet
Column: LastActivity
Type: ChangeTimestamp

Column: DaysSinceActivity (Virtual)
Type: Number
App Formula: TODAY() - DATE([LastActivity])
```

---

## 6. ChangeLocation Patterns

### Check-In System
```appsheet
Column: CheckInLocation
Type: ChangeLocation
Description: Location when checked in

Column: CheckInTime
Type: ChangeTimestamp
```

### Delivery Tracking
```appsheet
Column: DeliveryLocation
Type: ChangeLocation
Description: GPS location at delivery

Column: DeliveryTime
Type: ChangeTimestamp

Column: DeliverySignature
Type: Drawing
```

### Field Service
```appsheet
Column: ServiceLocation
Type: ChangeLocation
Description: Where service was performed

Column: ServiceTime
Type: ChangeTimestamp

Column: TechnicianID
Type: Ref
Source: Employees
```

---

## 7. Best Practices

### Yes/No Type
- Use descriptive names (IsActive, not Active)
- Default to FALSE unless user must opt-in
- Use TRUE for enabled/active states
- Validate critical agreements (VALID_IF: TRUE)
- Use virtual Yes/No for calculated flags

### ChangeTimestamp
- Use for audit trails (CreatedAt, UpdatedAt)
- Pair with email tracking (CreatedBy)
- Don't use for user-editable dates
- Consider timezone implications
- Name clearly (avoid just "Timestamp")

### ChangeLocation
- Inform users of GPS tracking
- Verify location permissions
- Use for field work verification
- Consider privacy policies
- Provide map view access

---

## 8. Common Patterns

### Complete Audit Trail
```appsheet
Column: RecordID (Key)
Column: CreatedAt (ChangeTimestamp)
Column: CreatedBy (Email): USEREMAIL()
Column: CreatedLocation (ChangeLocation)
Column: UpdatedAt (ChangeTimestamp)
Column: UpdatedBy (Email - set via Action)
```

### Status with Flags
```appsheet
Column: Status (Enum)
Column: IsComplete (Yes/No - Virtual)
App Formula: [Status] = "Complete"

Column: IsOverdue (Yes/No - Virtual)
App Formula: AND([Status] <> "Complete", [DueDate] < TODAY())

Column: RequiresAttention (Yes/No - Virtual)
App Formula: OR([IsOverdue], [Priority] = "High")
```

### Conditional Display
```appsheet
Column: ShowDetails (Yes/No)
Initial Value: FALSE

Column: DetailedNotes (LongText)
SHOW IF: [ShowDetails] = TRUE
```

---

## 9. Validation Examples

### Require Agreement
```appsheet
Column: AcceptPolicy
Type: Yes/No
VALID_IF: [AcceptPolicy] = TRUE - "You must accept the policy to proceed"
```

### Prevent Unchecking
```appsheet
Column: Approved
Type: Yes/No
VALID_IF: IF([_THISROW_BEFORE].[Approved] = TRUE,
  [Approved] = TRUE,
  TRUE
) - "Cannot unapprove once approved"
```

### Conditional Logic
```appsheet
Column: RequiresManager
Type: Yes/No (Virtual)
App Formula: [Amount] > 5000

Column: ManagerApproval
Type: Yes/No
SHOW IF: [RequiresManager] = TRUE
VALID_IF: IF([RequiresManager] = TRUE,
  [ManagerApproval] = TRUE,
  TRUE
)
```

---

## 10. Formulas with Yes/No

### Boolean Logic
```appsheet
# AND
App Formula: AND([Condition1], [Condition2])

# OR
App Formula: OR([Flag1], [Flag2], [Flag3])

# NOT
App Formula: NOT([IsDisabled])

# IF
App Formula: IF([IsActive], "Active", "Inactive")

# Multiple conditions
App Formula: AND(
  [IsApproved],
  [IsActive],
  NOT([IsDeleted])
)
```

### Count TRUE Values
```appsheet
# Count checked items
App Formula: COUNT(SELECT([Items], [IsChecked] = TRUE))

# All checked?
App Formula: COUNT(SELECT([Items], [IsChecked] = FALSE)) = 0
```

### Status Indicators
```appsheet
# Traffic light logic
App Formula: IFS(
  [IsComplete], "Green",
  [IsOverdue], "Red",
  [IsInProgress], "Yellow",
  TRUE, "Gray"
)
```

---

**Related Documentation:**
- [Column Properties](../column-properties/COLUMN_PROPERTIES_OVERVIEW.md)
- [Formula Properties](../column-properties/FORMULA_PROPERTIES.md)
- [Logical Functions](../../formulas-reference/logical/LOGICAL_FUNCTIONS.md)

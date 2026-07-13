# AppSheet Actions Reference

Actions are declarative operations that change data or navigate the user. They are the primary way to trigger workflows, open forms, make calls, and update records from a button press.

## 1. Where to Configure

- **Editor path:** Behavior > Actions
- Many system-created default actions exist and can be customized
- Actions appear as buttons on record views or inline on columns

---

## 2. Action Categories

| Category | Description |
|----------|-------------|
| **Data: set column values** | Update one or more columns in the current or related row |
| **Data: add a new row** | Insert a record into another table |
| **Data: delete this row** | Remove the current record |
| **App: go to another view** | Navigate using LINKTOVIEW, LINKTOROW, LINKTOFORM |
| **App: go to a website** | Open an external URL |
| **Grouped action** | Execute a sequence of other actions in order |
| **External (email/SMS/call)** | Trigger native phone/email/SMS behavior |

---

## 3. LINKTOFORM Patterns

`LINKTOFORM()` opens a form view and optionally pre-populates fields. The form can be for a new record or an existing record.

**Syntax:**
```appsheet
LINKTOFORM("FormViewName", "ColumnName1", Value1, "ColumnName2", Value2, ...)
```

Column name arguments must be **string literals** (quoted). Values can be expressions.

---

### Pattern 1: Open Form with Key Reference Only
Use when: Opening a form for an existing record identified by its key.

```appsheet
Action Name: Open [Context] Form
For a record of this table: [Parent Table]
Do this: App: go to another view within this app
Formula: LINKTOFORM("FormViewName", "KeyColumn", [KeyValue])
Position: Hidden
```

---

### Pattern 2: Open Form with Single Pre-Populated Field
Use when: Creating a new child record that should be linked to the current parent.

```appsheet
Action Name: Add [Child Record]
For a record of this table: [Parent Table]
Do this: App: go to another view within this app
Formula: LINKTOFORM("FormViewName", "ParentRefColumn", [ParentKeyColumn])
Position: Inline
Inline column: [Column Name]
Icon: [icon-name]
```

---

### Pattern 3: Open Form with Multiple Pre-Populated Fields
Use when: Creating a related record that inherits several values from the parent.

```appsheet
Action Name: Create [Child] from [Parent]
For a record of this table: [Parent Table]
Do this: App: go to another view within this app
Formula:
  LINKTOFORM("FormViewName",
    "KeyColumn", [KeyValue],
    "Field1", [Value1],
    "Field2", [Value2],
    "Field3", "StaticValue"
  )
Position: Inline
Inline column: [Column Name]
```

---

### Pattern 4: Open Existing Record to Edit (Fill-In Pattern)
Use when: Navigating to an already-created row to complete remaining fields (e.g., filling in an outcome after a call).

```appsheet
Action Name: Complete [Record]
For a record of this table: [Parent Table]
Do this: App: go to another view within this app
Formula:
  LINKTOFORM("FormViewName",
    "KeyColumn",
    MAXROW("[ChildTable]", "DateColumn",
      AND([RefColumn] = [_THISROW].[KeyColumn], ISBLANK([StatusColumn]))
    )
  )
Position: Hidden
```

**Constraint:** Column names in `LINKTOFORM()` must match the exact column names in the target table (case-sensitive).

---

## 4. GROUPED ACTION Patterns

A grouped action executes a sequence of other actions in order. Use to combine a native system action (call, email) with a custom data action.

**Editor path:** Behavior > Actions > Do this: Grouped: execute a sequence of actions

---

### Pattern 1: Native + Custom (Two-Step)
Use when: You want to trigger a native action (call, email) AND open a log form immediately after.

```appsheet
Action Name: [Display Name]
For a record of this table: [Table Name]
Do this: Grouped: execute a sequence of actions
Actions to execute (in order):
  1. [Native Action Name]  (e.g., Call Phone, Send Email)
  2. Open [Context] Form   (LINKTOFORM action)
Position: Inline
Inline column: [Column Name]
Icon: [icon-name]
```

---

### Pattern 2: Data Set + Navigate (Two-Step)
Use when: You want to stamp a value AND then navigate the user to a view.

```appsheet
Action Name: [Display Name]
For a record of this table: [Table Name]
Do this: Grouped: execute a sequence of actions
Actions to execute (in order):
  1. Set [Field] Value   (Data: set column values)
  2. Go to [View Name]   (App: go to another view)
Position: Inline
Inline column: [Column Name]
```

---

### Pattern 3: Multi-Step Custom Action
Use when: You need to create a record, trigger a native action, and then open a form.

```appsheet
Action Name: [Display Name]
For a record of this table: [Table Name]
Do this: Grouped: execute a sequence of actions
Actions to execute (in order):
  1. [Sub-Action 1]
  2. [Sub-Action 2]
  3. [Sub-Action 3]
Position: Inline
Inline column: [Column Name]
```

**Constraint:** Actions in a group execute in order but AppSheet does not guarantee atomic rollback if a step fails. If step 2 fails, step 1 already ran.

---

## 5. DATA ACTION Patterns

Data actions update column values in the current row without navigating away.

**Editor path:** Behavior > Actions > Do this: Data: set the values of some columns in this row

---

### Pattern 1: Set Single Column Value
Use when: Updating one field — e.g., stamping a date or changing a status.

```appsheet
Action Name: Set [Field Name]
For a record of this table: [Table Name]
Do this: Data: set the values of some columns in this row
Column values to set:
  [FieldName]: [Value or Formula]
```

---

### Pattern 2: Set Multiple Columns at Once
Use when: A single button should update several fields together.

```appsheet
Action Name: [Display Name]
For a record of this table: [Table Name]
Do this: Data: set the values of some columns in this row
Column values to set:
  [Field1]: [Value1]
  [Field2]: [Value2]
  [Field3]: USEREMAIL()
```

---

### Pattern 3: Set a Relay Flag for External Processing
Use when: You want to signal an Apps Script or webhook to process this row without complex inline logic.

```appsheet
Action Name: Flag for [Process Name]
For a record of this table: [Table Name]
Do this: Data: set the values of some columns in this row
Column values to set:
  [_Process Name Flag]: TRUE
```

**Note:** The external system reads rows where the flag is TRUE, processes them, then resets the flag to FALSE. See [Relay Flag Pattern](../automation/AUTOMATION.md#relay-flag-pattern).

---

### Pattern 4: Toggle Boolean Field
Use when: A button should flip a yes/no field between states.

```appsheet
Action Name: Toggle [Field Name]
For a record of this table: [Table Name]
Do this: Data: set the values of some columns in this row
Column values to set:
  [BooleanField]: NOT([BooleanField])
```

---

## 6. INLINE ACTION Patterns

Inline actions appear as icon buttons directly on a field/column in deck and table views.

**Editor path:** Action settings > Position: Inline > Inline column: [Column Name]

---

### Pattern 1: Single Inline Button on a Field
```appsheet
Action Name: [Action Name]
Position: Inline
Inline column: [Column Name]
Icon: [icon-name]
Do this: [Action Type]
```

---

### Pattern 2: Multiple Inline Actions on the Same Column
Two separate actions can both be inline on the same column — they appear as multiple icon buttons side by side.

```appsheet
# Action 1
Action Name: [Action Name 1]
Position: Inline
Inline column: [Column Name]
Icon: [icon1]

# Action 2
Action Name: [Action Name 2]
Position: Inline
Inline column: [Column Name]
Icon: [icon2]
```

---

### Pattern 3: Inline Action with SHOW IF Condition
Use when: The action button should only appear based on a condition.

```appsheet
Action Name: [Action Name]
Position: Inline
Inline column: [Column Name]
SHOW IF: [StatusField] IN({"Value1", "Value2"})
Icon: [icon-name]
```

---

## 7. Action SHOW IF Patterns

Actions have a `SHOW IF` display condition that controls when the action button is visible to the user.

### Only show for record owner
```appsheet
SHOW IF: [AssignedTo] = USEREMAIL()
```

### Only show when status allows it
```appsheet
SHOW IF: NOT([StatusField] IN({"ClosedValue", "FinalValue"}))
```

### Only show for specific roles
```appsheet
SHOW IF: LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") IN({"Role1", "Role2"})
```

### Only show when field is blank (not yet filled in)
```appsheet
SHOW IF: ISBLANK([OutcomeField])
```

### Only show for owner OR admin
```appsheet
SHOW IF: OR(
  USEREMAIL() = CONTEXT("OwnerEmail"),
  LOOKUP(USEREMAIL(), "users", "UserEmail", "Role") = "Admin"
)
```

---

## 8. Real-World Patterns

### GROUPED ACTION — Native Contact Action + Log Form (Communication Logging)

**Use case:** Tap a phone/email column to open the native device app (dialer, email composer, SMS), then immediately open a log form to record the interaction outcome.

```appsheet
# Step 2 action (custom LINKTOFORM — pre-populates the log form)
Action: Open [InteractionType] Log Form
Formula: LINKTOFORM("LogFormViewName",
  "ParentRefColumn",  [ParentKeyColumn],
  "MediumColumn",     "[InteractionTypeLiteral]"
)

# Grouped action — combines native action with the log form
Action Name: Log [InteractionType]
Do this: Grouped: execute a sequence of actions
  1. [Native Call/Email/SMS Action]    ← auto-generated by AppSheet for Phone/Email columns
  2. Open [InteractionType] Log Form   ← custom LINKTOFORM action above
Position: Inline
Inline column: [PhoneOrEmailColumn]
Icon: [phone / email / message]
```

**Notes:**
- The native action (Step 1) is auto-created by AppSheet when a Phone or Email column exists; do not modify it
- After the user sends/calls and returns to the app, the log form opens automatically
- `"MediumColumn", "[InteractionTypeLiteral]"` pre-fills the medium type (e.g., "Call", "Email", "Message")
- The log form's timestamp and logged-by fields auto-populate via their own Initial Value formulas

---

## 9. Constraints & Gotchas

- **LINKTOFORM column names are case-sensitive** — must match exactly what's in the Data tab
- **Grouped actions are not atomic** — if step 2 fails, step 1 already ran and cannot be undone automatically
- **Hidden actions** (Position: Hidden) can still be called by other grouped actions or automations
- **Data actions run on the client** (no server round-trip) — fast but require a sync to persist to the data source
- **MAXROW in LINKTOFORM** is evaluated at the time the button is tapped — if the target row doesn't exist yet, the form opens as a new blank record
- **Pre-populated fields via LINKTOFORM** only work if the target column is EDITABLE at time of form open — locked columns won't accept pre-populated values

---

## 9. Related Documentation

- [Automation](../automation/AUTOMATION.md) — triggering actions from bots
- [Data Validity & Constraints](../data-validity-constraints/DATA_VALIDITY_AND_CONSTRAINTS.md) — controlling when actions appear
- [Security Filters](../security-filters/SECURITY_FILTERS.md) — row-level visibility
- [Virtual Columns](../../tables-data-schema/virtual-columns/VIRTUAL_COLUMNS_OVERVIEW.md) — REF_ROWS for inline child sections

## Documentation Best Practices

### Completeness Requirements

Documentation rules:

**STABLE section MUST include:**
- ✅ ALL tables with complete schemas
- ✅ ALL columns with ALL configuration fields
- ✅ ALL views with complete settings
- ✅ ALL actions with complete documentation
- ✅ ALL automations/bots with complete event + process configuration
- ✅ ALL security rules (table-level + row-level)
- ✅ ALL enums and reference data

**NO partial documentation allowed** - If a table is in STABLE, ALL its columns, actions, views, and security must be documented.

### Version Management

**2-Version Discipline:**
- Active file contains only: EXPERIMENTAL V[X] + STABLE V[X-1]
- Previous stable versions archived to `backups/`

**When promoting Experimental → Stable:**
1. Create point-in-time backup of current STABLE to `backups/[date]-v[X-1]-stable/`
2. Integrate EXPERIMENTAL changes into STABLE (reorganize by feature/table, NOT chronologically)
3. Update CHANGELOG.md and backups/README.md
4. Remove EXPERIMENTAL section from active file

**Organization:**
- STABLE: Organized by feature/table (logical grouping)
- EXPERIMENTAL: Can be organized chronologically (testing order)
- Archives: Point-in-time snapshots with rollback instructions

### Documentation Structure

**Table documentation order:**
1. Table header and metadata
2. Table-level settings and security
3. Columns (in Google Sheets order: A, B, C, etc.)
4. Virtual columns (after physical columns)
5. Actions
6. Views

**Column documentation completeness:**
Every column MUST have:
- Column Name, Type, Key status
- Initial Value (or blank if none)
- App Formula (or N/A)
- VALID_IF (or N/A)
- EDITABLE status
- EDITABLE IF (if conditional)
- SHOW status
- SHOW IF (if conditional)
- REQUIRE status
- Description (purpose and behavior)

**Table of Contents anchor link examples:**
- "### 📋 SYSTEM OVERVIEW" → `#-system-overview`
- "#### 1. Orders Table" → `#1-orders-table`
- "#### Action: Mark_Shipped" → `#action-mark_shipped`
- "#### Automation: Auto_Notify_Rep" → `#automation-auto_notify_rep`
- "#### View 2: Orders Deck" → `#view-2-orders-deck`

## Common Documentation Patterns

### Pattern 1: Basic Table with Security

#### 1. Orders Table

**Google Sheets:** "Orders" tab
**AppSheet Table Name:** Orders
**Primary Key:** OrderID

**Table-Level Settings:**

```appsheet
Table: Orders
  # Table-Level Operations
  Updates Enabled: Yes
  Adds Enabled: Yes
  Deletes Enabled: No

  # Row-Level Security Filter
  Security Filter (row-level): [RepID] = LOOKUP(USEREMAIL(), "Reps", "Email", "RepID")
```

**Columns:**
[Complete column documentation...]

### Pattern 2: Action — Set Column Values (Variant B)

**Action: Mark Shipped**

```appsheet
Action Name: Mark Shipped
For a record of this table: Orders

Do this: Data: set the values of some columns in this row

Column values to set:
  Status: "Shipped"
  Last Updated: NOW()

Position: Inline

Display:
  Display name: Mark Shipped
  Icon: check_circle

Behavior:
  Only if this condition is true: [Status] = "Pending"
  Needs confirmation?: No

Documentation:
  Descriptive comment: "Mark this order as shipped"
```

### Pattern 2b: Automation Calling an Action

**Automation: Auto_Notify_Rep**

```appsheet
Automation Name: Auto_Notify_Rep

Event:
  Event Name: Order_Cancelled
  Event Source: App
  Table: Orders
  Data change types:
    Adds: No
    Updates: Yes
  Condition: [Status] = "Cancelled"
  Bypass Security Filters?: No

Process 1: Send_Cancellation_Alert
  Run a data action (Custom action)
  Run action on rows: Yes
  Referenced Table: Orders
  Referenced rows: LIST([_THISROW])
  Referenced Action: Notify_Rep

Documentation:
  Descriptive comment: N/A
```

`Notify_Rep` is a separate Action, documented once under its own `#### Action:` heading (Variant D — navigate, or Variant B — set columns, depending what it does) — the Process above only references it by name, never redefines it.

### Pattern 3: View with Security

**View: Orders Deck**

```appsheet
View Name: Orders Deck
View Type: deck
For this data: Orders
Position: ref

Display settings:
  Image: Photo
  Primary header: CustomerName
  Secondary header: Email
  Summary column: RepID

Group by: RepID
Sort by: CustomerName (ascending)

Actions:
  - Mark Shipped
  - Mark Cancelled
  - Edit

SHOW IF: TRUE

Security:
  Managers: Can see all orders
  Reps: Can see only their own orders
```

## Best Practices When Using This Skill

1. **Always use complete templates** - Don't omit fields
2. **Follow exact field names** from blueprint
3. **Include ALL columns** - No partial table documentation
4. **Document security** for every table
5. **Add descriptions** for all components
6. **Organize by feature** in STABLE section
7. **Verify completeness** before promoting to STABLE

## Automatic Invocation Triggers

Claude MUST automatically invoke this skill when:

**Documenting Tables:**
- User creates/mentions a new table
- User is documenting table schema
- User is writing to docs/formulas/appsheet_formulas.md
- User describes table structure

**Documenting Views:**
- User creates/mentions a new view
- User is configuring view settings
- User describes view requirements

**Documenting Actions:**
- User creates/mentions a new action
- User is configuring action behavior
- User describes action functionality

**Documenting Automations/Bots:**
- User creates/mentions a new automation or bot
- User describes an event that should trigger a process (e.g. "when a row is added, split it into...")
- User describes a multi-step or multi-record data process

**Documenting Security:**
- User mentions access control
- User is setting up row-level security
- User describes security requirements

**Creating Documentation:**
- User is writing any AppSheet documentation
- User is updating formulas files
- User is creating feature documentation
- User is promoting experimental to stable

**Example Automatic Triggers:**
- "Create an Orders table" → Auto-read blueprint table template
- "Document the Orders view" → Auto-read blueprint view template
- "Add an action to mark an order shipped" → Auto-read blueprint action template
- "When a row is added with multiple products selected, split it into one per product" → Auto-read blueprint automation template
- "Set up security for reps" → Auto-read blueprint security template
- User writes to docs/formulas/ → Auto-use blueprint format

**CRITICAL:** User should NEVER get incomplete documentation. Claude automatically uses blueprint templates to ensure ALL required fields are included.

## Completeness Checklist

Before finalizing any documentation, verify:

**For Tables:**
- [ ] Table name, Google Sheets tab, primary key documented
- [ ] Table-Level Operations (Are updates allowed?) documented
- [ ] Row-Level Security Filter documented
- [ ] ALL columns documented with ALL fields
- [ ] ALL virtual columns documented
- [ ] ALL actions documented
- [ ] ALL views documented

**For Views:**
- [ ] View name, type, data source documented
- [ ] Display settings (image, headers, summary) documented
- [ ] Group by, sort by documented
- [ ] Actions list documented
- [ ] SHOW IF formula documented
- [ ] Security (who can see) documented

**For Actions:**
- [ ] Action name, table documented
- [ ] Behavior-type variant identified (add row / set columns / delete / navigate / execute on row set) and its variant-specific fields documented (Table to add to, Column values to set, Target, or Referenced Table/Rows, as applicable)
- [ ] Position documented
- [ ] Display (Display name, Icon) documented
- [ ] Behavior (Only if this condition is true, Needs confirmation?, Confirmation message) documented
- [ ] Documentation (Descriptive comment) documented

**For Automations/Bots:**
- [ ] Automation name documented
- [ ] Event (name, source, table, Adds/Updates/Deletes, condition, bypass security filters) documented
- [ ] Each Process numbered in execution order
- [ ] Each Process's Referenced Table/Rows/Action documented, and the Referenced Action matches a documented Action
- [ ] Descriptive comment documented

**For Security:**
- [ ] Table-Level Operations (Are updates allowed?) documented
- [ ] Row-Level Security Filter documented
- [ ] Role-based access documented

---

**Version:** 1.0
**Last Updated:** 2026-01-14
**Changes:** Initial version with complete AppSheet documentation templates from _APPSHEET_SYSTEM_BLUEPRINT.md

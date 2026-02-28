## Documentation Best Practices

### Completeness Requirements

Documentation rules:

**STABLE section MUST include:**
- ✅ ALL tables with complete schemas
- ✅ ALL columns with ALL configuration fields
- ✅ ALL views with complete settings
- ✅ ALL actions with complete documentation
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
- "#### 1. Student Data Table" → `#1-student-data-table`
- "#### Action 1: Create_Attendance" → `#action-1-create_attendance`
- "#### View 2: Batch Deck" → `#view-2-batch-deck`

## Common Documentation Patterns

### Pattern 1: Basic Table with Security

#### 1. Students Table

**Google Sheets:** "Students" tab
**AppSheet Table Name:** Students
**Primary Key:** StudentID

**Table-Level Settings:**

```appsheet
Table: Students
  # Table-Level Operations
  Updates Enabled: Yes
  Adds Enabled: Yes
  Deletes Enabled: No

  # Row-Level Security Filter
  Security Filter (row-level): [BatchID] = LOOKUP(USEREMAIL(), "Users", "Email", "BatchID")
```

**Columns:**
[Complete column documentation...]

### Pattern 2: Action with Referenced Rows

**Action: Mark Present**

```appsheet
Action Name: Mark Present
For a record of this table: Students
Do this:
  - Data: set the values of some columns in this row

Column values to set:
  Status: "Present"
  Last Updated: NOW()

SHOW IF: [Status] = "Absent"
Display prominently: Yes
Icon: check_circle
Description: "Mark this student as present"
```

### Pattern 3: View with Security

**View: Students Deck**

```appsheet
View Name: Students Deck
View Type: deck
For this data: Students
Position: ref

Display settings:
  Image: Photo
  Primary header: Name
  Secondary header: Email
  Summary column: BatchID

Group by: BatchID
Sort by: Name (ascending)

Actions:
  - Mark Present
  - Mark Absent
  - Edit

SHOW IF: TRUE

Security:
  Instructors: Can see all students
  Students: Can see only their own record
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
- "Create a Students table" → Auto-read blueprint table template
- "Document the attendance view" → Auto-read blueprint view template
- "Add an action to mark present" → Auto-read blueprint action template
- "Set up security for teachers" → Auto-read blueprint security template
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
- [ ] Behavior type (data/app) documented
- [ ] Referenced Rows (if applicable) documented
- [ ] Column values to set documented
- [ ] SHOW IF formula documented
- [ ] Display prominently, icon documented
- [ ] Description documented

**For Security:**
- [ ] Table-Level Operations (Are updates allowed?) documented
- [ ] Row-Level Security Filter documented
- [ ] Role-based access documented

---

**Version:** 1.0
**Last Updated:** 2026-01-14
**Changes:** Initial version with complete AppSheet documentation templates from APPSHEET_SYSTEM_BLUEPRINT.md

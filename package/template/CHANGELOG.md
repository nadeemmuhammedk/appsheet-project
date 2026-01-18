# Digital Marketing Institute Student Data App - Version Changelog

**Purpose:** Track version history and feature evolution.

---

## Version History

### V1 - STABLE SYSTEM (Production)
**Status:** ✅ PRODUCTION
**Initial Deployment:** June 2024
**Bot Automation Added:** October 2025
**Apps Script Automation Added:** January 2025
**Documentation Migrated to Blueprint V1:** January 15, 2026
**Location:** docs/formulas/appsheet_formulas.md (STABLE SYSTEM V1 section)

#### Core Features

**Student Management:**
- Complete student registration system with auto-generated registration numbers (format: LHYYYYMMDD###)
- 32-column student data tracking including personal info, course details, and payment status
- Certificate status and course status tracking
- Source and platform attribution tracking
- Emergency contact management

**Financial Management:**
- Multi-installment fee tracking system (First, Second, Third, Settlement)
- Real-time fee payment aggregation from Student Fees table
- Automatic calculation of due fees (Total Fees - Fees Paid)
- Pending fees monitoring with slice filtering
- Payment mode tracking (Online/Cash)

**Attendance Management:**
- Date-based attendance tracking with batch grouping
- Multi-name attendance entry support with EnumList
- Duplicate prevention with VALID_IF formulas
- Attendance status tracking (Present, Late, Excused Absent, Unexcused Absent, Unexpected Office Leave)

**Automation Systems:**
- **Bot Automation:** Auto_Split_Attendance_Names (splits multi-name attendance entries into individual records)
  - Deployed: October 2025
  - Event trigger: Multi_Name_Detected (COUNT([Name]) > 1)
  - Process: Create individual records → Delete original multi-record
- **Apps Script Automation:** Daily empty row cleanup across all sheets
  - Deployed: January 2025
  - Schedule: 2:00 AM daily
  - Sheets: Student Data, Student Attendance, Student Fees

#### Tables

**Student Data** (32 columns + 2 virtual columns)
- Primary table for student information
- Auto-generated registration numbers via Google Sheets ARRAYFORMULA
- Virtual columns for bot processing: Latest_Multi_Entry, In_Current_Multi_Entry
- Comprehensive student profile tracking

**Student Attendance** (7 columns + 1 virtual column)
- Date-based attendance records
- Multi-name entry support with EnumList
- Virtual column: Latest_Multi_Entry (triggers bot automation)

**Student Fees** (7 columns)
- Fee payment transaction records
- Mode of payment tracking
- Notes for payment details

**Data** (Lookup/Enum table)
- Batch list (UNIQUE query from Student Data)
- Emergency Contact Relation values
- Payment, Certificate, and Course Status enums
- Source, Platform, and Gender values
- Installment status enums
- Attendance and Type enums
- Mode of Payment values

**Slices:**
- Ongoing Not Started Students (filters students with Course Status = "Ongoing" OR "Not Started")

#### Views

**Student Data View**
- Type: Deck
- Sort: Registration Number (Ascending)
- Group: Batch (Descending)
- Actions: Call Phone, Send SMS

**Student Attendance View**
- Type: Deck
- Sort: Batch (Descending)
- Group: Date (Descending)

**Student Fees View**
- Type: Deck
- Sort: Batch (Descending)
- Group: Date (Descending)

**Pending Fees View**
- Type: Deck
- Data Source: Ongoing Not Started Students slice
- Sort: Due Fees (Descending)
- Group: Batch (Descending), Aggregate: SUM :: Due Fees
- Actions: Call Phone, Send SMS, Record_Fee_Payment

#### Actions

**Multi-Name Attendance Processing:**
- Create_Attendance_From_Student_Data (creates individual attendance records)
- Delete_Original_Record (removes multi-name entry)
- Create_Individual_Attendance_Record (iterates through student list)

**Payment Management:**
- Record_Fee_Payment (on Pending Fees view)

**Communication:**
- Call Phone (deep link to phone dialer)
- Send SMS (deep link to SMS app)

#### Google Sheets Formulas

**Auto-Generated Registration Numbers:**
```
Format: LHYYYYMMDD###
Logic: "LH" + Batch Starting Date (YYYYMMDD) + Sequential counter (000-999)
```

**Fee Calculations:**
- Due Fees = Total Fees - Fees Paid
- Fees Paid = SUMIFS aggregation from Student Fees table (using BYROW + LAMBDA)

**Installment Dates:**
- Second Installment Date = EDATE(Batch Starting Date, 1)
- Third Installment Date = EDATE(Batch Starting Date, 2)

#### Apps Script Functions

**deleteEmptyRowsInSheet(sheetName):**
- Batch processing with getValue() for efficiency
- Deletes from bottom to top to prevent index shifting
- Returns success status and deletion count

**deleteEmptyRowsInSpreadsheet():**
- Processes all sheets: Student Data, Student Attendance, Student Fees
- Comprehensive error handling and logging

**setupDailyTrigger():**
- Creates time-based trigger at 2:00 AM daily
- Manages trigger lifecycle (removes old triggers before creating new)

#### Security & Data Validation

**VALID_IF Formulas:**
- Batch dropdown: Data table lookup
- Attendance duplicate prevention: Checks for existing Date+Batch+Name combination
- Emergency Contact Relation: Data table enum
- Payment/Certificate/Course Status: Data table enums
- Source, Platform, Gender: Data table enums

**Data Integrity:**
- AppSheet key constraints on all tables
- Google Sheets ARRAYFORMULA for consistent calculations
- Bot automation prevents manual multi-record management errors

#### Testing Status
- ✅ All core features tested in production since June 2024
- ✅ Bot automation tested since October 2025
- ✅ Apps Script automation tested since January 2025
- ✅ Multi-installment fee tracking validated
- ✅ Attendance multi-name entry processing validated
- ✅ Payment aggregation formulas verified

#### Known Limitations
- Apps Script runs at fixed 2:00 AM schedule (no real-time cleanup)
- Bot automation requires manual trigger event (not immediate on data entry)
- Registration number counter resets if Batch Starting Date changes

---

## Version Comparison

| Feature | V1 (Production) |
|---------|-----------------|
| **Tables** | 4 tables (Student Data, Student Attendance, Student Fees, Data) + 1 slice |
| **Total Columns** | 78 columns (32+2 virtual, 7+1 virtual, 7, 32 lookup columns) |
| **Views** | 4 deck views (Student Data, Attendance, Fees, Pending Fees) |
| **Actions** | 6 actions (3 bot-related, 1 fee payment, 2 communication) |
| **Automation** | 2 systems (AppSheet Bot + Apps Script daily cleanup) |
| **Google Sheets Formulas** | 7 ARRAYFORMULA calculations |
| **Apps Script Functions** | 3 functions (2 cleanup + 1 trigger setup) |
| **Security Rules** | VALID_IF constraints on 13+ columns |
| **User Roles** | Single role (institute staff - full access) |
| **Deployment Date** | June 2024 (initial), October 2025 (bot), January 2025 (Apps Script) |

---

## Migration Notes

### Documentation Migration to Blueprint V1 (January 15, 2026)

**Previous State:**
- Documentation scattered across old-files/ directory
- Flat structure with working notes
- Incomplete documentation of formulas and automation

**Migration Process:**
1. Created point-in-time backup at `backups/2026-01-15-pre-migration-snapshot/`
2. Collected all data from temp-data-collection/ directory
3. Migrated to Blueprint V1 format with complete table schemas
4. Documented all Google Sheets formulas with examples
5. Documented all Apps Script code with troubleshooting guides

**New Structure:**
- `docs/formulas/appsheet_formulas.md` - Complete AppSheet configuration (1,975 lines)
- `docs/formulas/googlesheet_formulas.md` - All Google Sheets formulas (815 lines)
- `docs/formulas/appscript_code.md` - Apps Script automation (905 lines)
- `CHANGELOG.md` - This version history file
- `backups/README.md` - Archived versions index

**Blueprint V1 Compliance:**
- ✅ Complete table schemas with all columns
- ✅ All actions documented with SHOW IF conditions
- ✅ All views documented with configuration settings
- ✅ All security rules and VALID_IF constraints
- ✅ Testing results and rollback instructions
- ✅ Google Sheets formula dependencies mapped
- ✅ Apps Script installation and troubleshooting guides

---

## Archived Versions Index

| Version | Archived Date | Location | Status |
|---------|---------------|----------|--------|
| Pre-Migration Snapshot | 2026-01-15 | backups/2026-01-15-pre-migration-snapshot/ | ✅ Archived |
| (V2 and beyond will be listed here) | - | - | - |

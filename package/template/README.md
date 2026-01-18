# Digital Marketing Institute Student Data App - Tirur

AppSheet-based system for managing student data at Digital Marketing Institute, Tirur branch.

---

## 📋 Quick Links

### Documentation
- [Project Overview](docs/project/PROJECT_OVERVIEW.md)
- [AppSheet Formulas](docs/formulas/appsheet_formulas.md)
- [Google Sheets Formulas](docs/formulas/googlesheet_formulas.md)
- [Apps Script Code](docs/formulas/appscript_code.md)
- [Looker Studio Formulas](docs/formulas/lookerstudio_formulas.md)

### Version History
- [CHANGELOG.md](CHANGELOG.md) - Version history and feature comparison
- [Archived Versions](backups/README.md) - Historical versions

---

## 🏗️ Architecture

**Platform Stack:** AppSheet + Google Sheets + Apps Script

**Core Components:**
- **AppSheet App:** Student data management interface with 4 deck views
- **Google Sheets:** Data storage with ARRAYFORMULA calculations
- **Apps Script:** Daily automation (2 AM empty row cleanup)
- **Bot Automation:** Multi-name attendance entry processing

**Tables:**
- Student Data (32 columns + 2 virtual) - Primary student information
- Student Attendance (7 columns + 1 virtual) - Date-based attendance tracking
- Student Fees (7 columns) - Fee payment transactions
- Data (lookup/enum table) - Batch list and dropdown values
- Ongoing Not Started Students (slice) - Pending fees filtering

---

## 👥 User Roles

**Current Configuration:** Single role (institute staff - full access)

All institute staff have full permissions to:
- View and manage student data
- Record attendance and fees
- Access all views and reports
- Execute all actions (Call Phone, Send SMS, Record Fee Payment)

---

## 🚀 Current System Status

**Active Version:** STABLE SYSTEM V1
**Status:** ✅ PRODUCTION
**Deployed:** June 2024 (initial), October 2025 (bot), January 2025 (Apps Script)

**Recent Updates:**
- **January 15, 2026:** Documentation migrated to Blueprint V1 format
  - Created comprehensive table schemas (1,975 lines)
  - Documented all Google Sheets formulas (815 lines)
  - Documented Apps Script automation (905 lines)
  - Point-in-time backup at `backups/2026-01-15-pre-migration-snapshot/`

**Features:**
- 4 tables with 78 total columns
- 4 deck views (Student Data, Attendance, Fees, Pending Fees)
- 6 actions (3 bot-related, 1 fee payment, 2 communication)
- 2 automation systems (Bot + Apps Script)
- Multi-installment fee tracking
- Auto-generated registration numbers
- Multi-name attendance entry support

---

## 📦 Documentation Structure

**Formula Documentation:**
- `appsheet_formulas.md` - Complete AppSheet configuration (tables, views, actions, security)
- `googlesheet_formulas.md` - All Google Sheets ARRAYFORMULA calculations
- `appscript_code.md` - Apps Script automation functions

**Version Management:**
- Active file contains STABLE SYSTEM V1 only
- Previous versions archived in `backups/` directory
- See `CHANGELOG.md` for version history

**Blueprint V1 Compliance:**
- Complete table schemas with all column configurations
- All actions with SHOW IF conditions
- All views with configuration settings
- Security rules and VALID_IF constraints
- Testing results and rollback instructions

---

## 🔧 For Developers & AI Assistants

See [CLAUDE.md](CLAUDE.md) for AI assistant instructions and documentation procedures.

See [APPSHEET_SYSTEM_BLUEPRINT.md](APPSHEET_SYSTEM_BLUEPRINT.md) for complete system template.

# AGENTS.md

This file provides guidance to AI Agents when working with this repository.

## Working with This Repository

### Documentation System

This project uses the AppSheet Documentation System Blueprint.

**Structure:** See APPSHEET_SYSTEM_BLUEPRINT.md for complete system definition.

**Formula Files:**

- `docs/formulas/appsheet_formulas.md` - AppSheet configs (Experimental + Stable only)
- `docs/formulas/googlesheet_formulas.md` - Sheet formulas
- `docs/formulas/appscript_code.md` - Apps Script code
- `docs/formulas/lookerstudio_formulas.md` - Looker Studio queries

**Version Management:**

- Active file: 2 versions (Experimental + Stable only)
- Archive: Previous versions in `backups/[date]-[filename]/`
- History: See `CHANGELOG.md` for deployment history (date-based, not version-based)
- Each file maintains its own version numbers (V1, V2, V3, etc.) - NO "app versions"

**Version Management Structure:**

```
EXPERIMENTAL V[X] (if testing new features) ← TOP of file
    ↓
STABLE SYSTEM V[X-1] (current production) ← Middle of file
    ↓
📚 Archived Versions (pointer to backups/) ← Bottom of file
```

**Placement Rule:**

- EXPERIMENTAL section ALWAYS at TOP (after file header)
- Reason: Quick access during active development
- STABLE section in middle
- Archive pointer at bottom

**Key Principles:**

1. **2-Version Discipline:** Active file contains only Experimental + Stable
2. **Archive Process:** When promoting Experimental → Stable, previous Stable goes to `backups/`
3. **Cumulative Documentation:** V3 = V2 + new features (additive, not replacement)
4. **Complete Documentation:** STABLE section must include ALL tables, views, actions, security
5. **Point-in-Time Backups:** Archives are snapshots before additions (for rollback)

### Formula Documentation Format

Follow templates in APPSHEET_SYSTEM_BLUEPRINT.md Section 4.

**Table Documentation Must Include:**

- Complete table schemas (every column with full AppSheet configuration)
- All actions (name, behavior, SHOW IF conditions)
- All views (type, settings, filters, security)
- All security rules (UPDATES, ADDS, DELETES, row-level filtering)
- All enum values
- Testing results
- Rollback instructions

**⚠️ Critical Documentation Rules:**

When documenting STABLE SYSTEM versions:

- **DO NOT** use "(UNCHANGED IN VX)" markers in section headers
- **DO NOT** use "see previous version" or "unchanged from V1" shortcuts
- **DO NOT** add version tags to individual items - not even "Added: VX" or "Modified: VX"
- **DO** document every table, view, action, and column in full
- **DO** keep STABLE documentation self-contained (reader shouldn't need archives)
- **DO** keep version info ONLY at document top in structured format block

**For detailed examples of what NOT to do, see:**

- [APPSHEET_SYSTEM_BLUEPRINT.md Section 4.2.5](APPSHEET_SYSTEM_BLUEPRINT.md#425-documentation-anti-patterns---what-not-to-do) - Documentation Anti-Patterns

### Version Promotion Workflow

See APPSHEET_SYSTEM_BLUEPRINT.md Section 5 (Version Management System).

**When promoting Experimental → Stable:**

1. Verify backup exists at `backups/[date]-[filename]/` (created when experimental work started)
2. Add Quick Rollback section to archived file (if not present)
3. Integrate Experimental changes into Stable (reorganize by feature/table)
4. **DO NOT** use "(UNCHANGED IN VX)" markers anywhere in the document
5. **DO NOT** use "see previous version" or "unchanged from V1" shortcuts
6. **DO NOT** add version tags to individual items
7. Document EVERYTHING fully - STABLE must be self-contained
8. Update CHANGELOG.md (date-based format) and backups/README.md
9. Remove Experimental section from active file

**Backup Naming Convention:**

- Format: `backups/YYYY-MM-DD-[filename]/`
- Example: `backups/2026-01-29-googlesheet-formulas/`
- NO version numbers or "-stable" suffix

**CHANGELOG Format:**

- Use date + feature name (NOT "V3 - STABLE")
- Example: `## 2026-01-29 - Attendance Overview Reporting`

## Reference Documentation

### System Documentation

- **[APPSHEET_SYSTEM_BLUEPRINT.md](APPSHEET_SYSTEM_BLUEPRINT.md)** - Complete system template
- **[docs/project/PRD.md](docs/project/PRD.md)** - Product requirements document
- **[CHANGELOG.md](CHANGELOG.md)** - Deployment history (date-based, not version-based)
- **[backups/README.md](backups/README.md)** - Archived versions index

### AppSheet Reference Materials

The **[APPSHEET-DOCUMENTATION/](APPSHEET-DOCUMENTATION/)** directory contains comprehensive AppSheet reference documentation organized by category:

- **[formulas-reference/](APPSHEET-DOCUMENTATION/formulas-reference/)** - Complete formula syntax and examples
    - Conditional, Date-Time, List-and-Select, Logical, Math, Text functions
    - References, Syntax basics
    - See [FORMULAS_REFERENCE.md](APPSHEET-DOCUMENTATION/formulas-reference/FORMULAS_REFERENCE.md) for index

- **[rules-and-logic/](APPSHEET-DOCUMENTATION/rules-and-logic/)** - AppSheet business logic patterns
    - Actions, Automation, Data Validity Constraints
    - Security Filters, Slices
    - See [RULES_AND_LOGIC.md](APPSHEET-DOCUMENTATION/rules-and-logic/RULES_AND_LOGIC.md) for index

- **[views-interface/](APPSHEET-DOCUMENTATION/views-interface/)** - View configuration reference
    - Calendar, Chart, Dashboard, Deck, Detail, Form, Gallery, Map, Table views
    - Configuration patterns and best practices

- **[tables-data-schema/](APPSHEET-DOCUMENTATION/tables-data-schema/)** - Tables and data schema reference
    - Column types, Column properties, Table settings
    - Virtual columns, Primary keys, Data relationships
    - See [TABLES_DATA_SCHEMA.md](APPSHEET-DOCUMENTATION/tables-data-schema/TABLES_DATA_SCHEMA.md) for index

## AGENT Skills

This project includes specialized AGENT skills in **[.codex/skills/](.codex/skills/)**:

- **appsheet-blueprint-skill** - Generate complete AppSheet documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for tables, views, actions, and security rules
- **appsheet-reference-skill** - Look up AppSheet formulas, view types, actions, security filters, slices, and automation patterns
- **googlesheet-blueprint-skill** - Generate complete Google Sheets formula documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for ARRAYFORMULA, VLOOKUP, QUERY, and calculated formulas
- **lookerstudio-blueprint-skill** - Generate complete Looker Studio documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for data sources, calculated fields, metrics, dimensions, and blended data
- **appscript-blueprint-skill** - Generate complete Google Apps Script documentation following APPSHEET_SYSTEM_BLUEPRINT.md templates for functions, triggers, installation steps, testing checklists, and troubleshooting
- **version-management-skill** - Manage Experimental→Stable promotion workflow for ALL documentation types. Handles 2-version discipline, archive creation, integration process, and completeness verification. Use when marking system as stable, promoting experimental to stable, or starting new feature work.
- **prd-skill** - Create or update Product Requirements Documents (PRD) following the standardized PRD template. Use at project start, when planning new features, or when user explicitly requests PRD updates. Helps define product scope, user personas, success metrics, and technical requirements.

**Usage:** Invoke skills with `/skill-name` (e.g., `/appsheet-blueprint-skill`, `/version-management-skill`)

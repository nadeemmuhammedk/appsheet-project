# AppSheet Documentation System Blueprint

**Version:** 1.0
**Last Updated:** October 28, 2025
**Purpose:** Reusable documentation system template for AppSheet + Google Sheets projects
**Compatible With:** AppSheet, Google Sheets, Apps Script, Looker Studio

---

## 🎯 What This File Does

This blueprint defines a **standardized documentation system** for AppSheet projects. It serves three purposes:

1. **For AI Assistants (Claude, Gemini, etc.):**
   - Read this file to understand project structure
   - Auto-detect if initialization is needed
   - Maintain version discipline
   - Follow documentation format standards

2. **For Developers:**
   - Quick reference for folder structure
   - Documentation format templates
   - Version management rules
   - Copy to new projects

3. **For Project Setup:**
   - Fresh project initialization
   - Existing project migration
   - Consistent structure across all AppSheet projects

---

## 📂 Required Directory Structure

```
[Project Name]/
├── README.md                          # Project entry point with quick links
├── CLAUDE.md                          # AI assistant instructions (or GEMINI.md, AI_INSTRUCTIONS.md)
├── CHANGELOG.md                       # Version history and feature comparison
├── APPSHEET_SYSTEM_BLUEPRINT.md      # This file (documentation system template)
│
├── docs/                              # All documentation
│   ├── project/
│   │   └── PRD.md                    # Product requirements document
│   │
│   ├── formulas/                     # Current state formulas (Experimental + Stable only)
│   │   ├── appsheet_formulas.md      # AppSheet table configs, columns, formulas
│   │   ├── googlesheet_formulas.md   # Google Sheets ARRAYFORMULA, VLOOKUP, etc.
│   │   ├── appscript_code.md         # Server-side Google Apps Script code
│   │   └── lookerstudio_formulas.md  # Looker Studio calculated fields, queries
│   │
│   ├── templates/
│   │   └── STABLE_SYSTEM_TEMPLATE.md # Documentation structure template
│   │
│   └── proposals/                    # Experimental feature designs
│       └── [feature_name_idea.md]    # Proposals not yet in Experimental phase
│
├── sample_data/                       # CSV exports from Google Sheets
│   └── [Sheet Name - Tab Name.csv]
│
├── utils/                             # Helper scripts for data analysis
│   └── [analysis_scripts.py/.js]
│
└── backups/                           # Historical version archives
    ├── README.md                      # Index of all archived versions
    └── [YYYY-MM-DD-vX-stable]/       # Archived stable versions
        └── appsheet_formulas.md       # Complete archived system with rollback guide
```

### Directory Explanations

| Directory/File | Purpose | When to Update |
|----------------|---------|----------------|
| **README.md** | Project entry point | Rarely - only when fundamental architecture or documentation organization changes |
| **CLAUDE.md** | AI assistant instructions | When documentation procedures change |
| **CHANGELOG.md** | Version history summary | When promoting Experimental → Stable |
| **docs/project/** | System overview docs | When architecture or roles change |
| **docs/formulas/** | Active formulas (2 versions) | Continuously (Experimental work) |
| **docs/templates/** | Documentation templates | Rarely (only if format changes) |
| **docs/proposals/** | Pre-experimental designs | Before adding to Experimental |
| **sample_data/** | Data exports for analysis | As needed for testing/analysis |
| **utils/** | Helper scripts | As needed for automation |
| **backups/** | Archived versions | When promoting new Stable version |

---

## 📋 Documentation Format Templates

Complete templates for each documentation type live in the Claude skills:

| Documentation Type | File | Skill |
|---|---|---|
| AppSheet tables, views, actions, security | `docs/formulas/appsheet_formulas.md` | `/appsheet-blueprint-skill` |
| Google Sheets formulas (ARRAYFORMULA, VLOOKUP, QUERY) | `docs/formulas/googlesheet_formulas.md` | `/googlesheet-blueprint-skill` |
| Google Apps Script functions, triggers, automation | `docs/formulas/appscript_code.md` | `/appscript-blueprint-skill` |
| Looker Studio data sources, calculated fields, reports | `docs/formulas/lookerstudio_formulas.md` | `/lookerstudio-blueprint-skill` |

Invoke a skill (e.g., `/appsheet-blueprint-skill`) to get the full template for that documentation type.

---

### 4.2.5 Documentation Anti-Patterns - What NOT to Do

**Purpose:** The 6 golden rules for STABLE documentation completeness.

#### Summary: The Golden Rules

1. **No `(UNCHANGED IN VX)` markers** - anywhere in documentation
2. **No "see previous version" shortcuts** - document everything fully
3. **No "unchanged from V1" placeholders** - provide complete configuration
4. **No version tags on items** - not even "Added: VX" or "Modified: VX"
5. **Version info at document top only** - in structured format block
6. **Self-contained documentation** - one file tells you everything about current system

**Test:** If a reader needs to open archived files to understand the current system, the documentation is incomplete.

---

## 🔄 Version Management System

### Active File Structure (Cumulative Documentation)

**In `docs/formulas/appsheet_formulas.md`:**

The active file maintains a **complete, cumulative view of the current application state**. Versions are additive - V3 = V2 + new features, not a replacement of V2.

**Organization:** By feature/table (Data Tables, Views, Actions, etc.), NOT chronologically by version

1. **EXPERIMENTAL V[X]** (Optional - if testing new features)
   - **Includes:**
     - What's New (features being added)
     - Changes from previous stable version
     - Execution Plan (step-by-step implementation)
     - Testing Checklist
   - **Purpose:** Document how to implement new features being tested
   - **Status:** ⚠ EXPERIMENTAL - TESTING IN PROGRESS

2. **STABLE SYSTEM V[X-1]** - Complete current application state
   - **Includes:**
     - 📊 COMPLETE TABLE SCHEMAS (ALL tables)
     - 🔧 ALL ACTIONS (from all versions)
     - 📱 ALL VIEWS (from all versions)
     - 🔒 ALL SECURITY RULES
     - 📋 DATA TABLE ENUM VALUES
   - **Purpose:** Single source of truth showing complete cumulative state
   - **Organization:** Grouped by feature/table type
   - **Status:** ✓ TESTED AND WORKING

   ⚠️ **CRITICAL: STABLE SYSTEM documentation must be SELF-CONTAINED**
   - NO "(UNCHANGED IN VX)" markers in headers
   - NO "See previous version" placeholders
   - NO "Unchanged from V1" shortcuts
   - NO version tags on individual items
   - EVERY table, view, action, column documented in full
   - Version info ONLY at document top in structured format block
   - Reader must understand system WITHOUT opening archived files

   **See Section 4.2.5** for detailed examples of what NOT to do (anti-patterns from V1→V2 promotion).

3. **📚 ARCHIVED VERSIONS** - Pointer to backups
   - **Content:** Links to `backups/` directory
   - **Purpose:** Point-in-time snapshots before major additions (for rollback)

### File Size Target
- **Active files:** 1500-2000 lines (fast to read, manageable)
- **Archived files:** Complete documentation (any size needed)

---

### Promotion Process (Experimental → Stable)

**When user confirms "mark as stable":**

**KEY CONCEPT:** Experimental changes get **integrated** into the complete cumulative documentation, while taking a point-in-time backup of the state before the addition.

**Use `/version-management-skill`** for the complete step-by-step promotion workflow.

**Backup Naming Convention:**
- Format: `backups/YYYY-MM-DD-[filename]/`
- Example: `backups/2026-01-29-googlesheet-formulas/`
- NO version numbers in folder name
- NO "-stable" or "-backup" suffixes

---

### Archive Retention Policy

**Keep all archived versions indefinitely.**

**Rationale:**
- Disk space is cheap
- Historical reference valuable
- Rollback capability important
- Compliance may require records

**Future Consideration:**
- If disk space becomes issue, move versions >2 years old to cold storage
- Always keep at least last 3 stable versions

---

## 🤖 AI Assistant Instructions - PROACTIVE VALIDATION REQUIRED

### ⚠️ CRITICAL FOR AI ASSISTANTS

**When working with AppSheet projects, you MUST:**

1. **READ** blueprint thoroughly
2. **VALIDATE** documentation completeness
3. **FIX** any gaps PROACTIVELY (don't wait for user to ask)

**Example - WRONG approach:**
❌ "I'll migrate what's there and wait for user to request complete docs"
❌ "CLAUDE.md looks okay, I'll leave it as-is"
❌ "I'll offer partial documentation as 'quick option'"

**Example - CORRECT approach:**
✅ "Migration done. Validating... CLAUDE.md version management outdated. Updating now."
✅ "Migration done. Validating... appsheet_formulas.md missing complete table schemas. Gathering from user now."
✅ "Setup complete. Running validation checklist to ensure blueprint compliance."

**Why This Matters:**
- Blueprint sets a STANDARD (complete documentation)
- User expects blueprint compliance without having to ask
- Incomplete docs defeat the purpose of the blueprint
- Validation catches gaps before they become issues

---

### Ongoing Maintenance Instructions

**When User Works on Project:**

**Scenario: User adds new table**
1. Ask: "Should I add this table to appsheet_formulas.md?"
2. If yes: Add table documentation using the `/appsheet-blueprint-skill`
3. Update Project Configuration in APPSHEET_SYSTEM_BLUEPRINT.md (table list)
4. Update PRD.md if it exists

**Scenario: User asks to promote Experimental to Stable**
1. Confirm: "Ready to promote Experimental V[X] to Stable?"
2. If yes: Follow the `/version-management-skill` workflow
3. **BEFORE promoting, verify documentation completeness:**
   ☐ No "(UNCHANGED IN VX)" markers anywhere in the document
   ☐ No "See previous version" text anywhere
   ☐ No "Unchanged from V1" shortcuts or placeholders
   ☐ Every table has complete schema documentation (all columns)
   ☐ Every view documented in full
   ☐ Every action documented in full
   ☐ Reader can understand system WITHOUT opening archived files
   ☐ No version tags on individual items (version info at document top only)
4. If any checklist item fails: Fix documentation before promoting
5. Update CHANGELOG.md
6. Update backups/README.md
7. Notify user of completion

**Note:** See Section 4.2.5 for examples of documentation anti-patterns to avoid.

**Scenario: User asks "What's the current production system?"**
1. Read STABLE SYSTEM section in `docs/formulas/appsheet_formulas.md`
2. That section is the single source of truth
3. Provide relevant information from that section

**Scenario: User asks "How do I rollback to previous version?"**
1. Check `backups/README.md` for archived versions index
2. Point user to specific archived file
3. Show Quick Rollback section in that file

**Scenario: User asks about version history**
1. Read `CHANGELOG.md` for quick summary
2. Provide version comparison table
3. Link to archived versions if user wants details

---

## 📋 Metadata

**Blueprint Version:** 1.0
**Created:** October 28, 2025
**Last Updated:** October 28, 2025
**Compatible With:**
- AppSheet (all versions)
- Google Sheets (all versions)
- Google Apps Script (V8 runtime)
- Looker Studio (all versions)

**Maintained By:** Loonyheads AppSheet Team

**Changelog:**
- **v1.0** (2025-10-28): Initial blueprint creation based on SM Total Overdose project

---

## 🔗 Related Resources

### Official Documentation
- [AppSheet Documentation](https://help.appsheet.com/)
- [AppSheet Expression Reference](https://help.appsheet.com/en/articles/961700-expressions)
- [Google Sheets Function List](https://support.google.com/docs/table/25273)
- [Apps Script Reference](https://developers.google.com/apps-script/reference)
- [Looker Studio Help](https://support.google.com/looker-studio)
- [Looker Studio Formula Reference](https://support.google.com/looker-studio/table/6379764)

### Community Resources
- [AppSheet Community Forum](https://community.appsheet.com/)
- [AppSheet YouTube Channel](https://www.youtube.com/c/AppSheet)

### Tools
- [AppSheet Editor](https://www.appsheet.com/start/myApps)
- [Apps Script Editor](https://script.google.com/)
- [Looker Studio](https://lookerstudio.google.com/)

---

## 💡 Tips for AI Assistants

1. **Always read Project Configuration first** - Understand project context before making changes
2. **Maintain 2-version discipline** - Keep active file small (Experimental + Stable only)
3. **Use skill templates** - Use `/appsheet-blueprint-skill`, `/googlesheet-blueprint-skill`, etc. for complete templates
4. **Archive with Quick Rollback** - Always add rollback instructions to archived versions
5. **Update CHANGELOG.md** - Keep version history up-to-date
6. **Ask before initializing** - User confirmation required for fresh/migration
7. **Preserve user content** - When migrating, back up originals first
8. **Link related docs** - Cross-reference between formula files, CHANGELOG, backups
9. **Size matters** - Keep active files under 2000 lines for performance

---

*This file is designed to be read by AI assistants (Claude, Gemini, ChatGPT, etc.) to automatically set up and maintain AppSheet project documentation. It can be copied to any AppSheet project and customized via the Project Configuration section.*

**END OF BLUEPRINT**

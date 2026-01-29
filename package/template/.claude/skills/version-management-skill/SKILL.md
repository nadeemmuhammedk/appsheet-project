---
name: version-management-skill
description: Manage Experimental→Stable promotion workflow for ALL documentation types (AppSheet, Google Sheets, Apps Script, Looker Studio). Handles 2-version discipline, archive creation, integration process, and completeness verification. Use when marking system as stable, promoting experimental to stable, or managing documentation versions.
allowed-tools:
  - Read
  - Bash
---

# Version Management Skill

Manages the Experimental→Stable promotion workflow for all formula documentation files.

## When to Use This Skill

**Automatic triggers** (no user request needed):
- User says: "mark as stable", "promote to stable", "make stable", "system is stable"
- User says: "the system is ready", "ready for production"
- User is promoting Experimental features to Stable
- User mentions: "version management", "archive", "backup version"
- User says: "let's build a new feature" or "let's add a new feature"

**Manual invocation:**
- `/version-management-skill`

**Scope:** Works with ALL formula documentation files:
- `docs/formulas/appsheet_formulas.md`
- `docs/formulas/googlesheet_formulas.md`
- `docs/formulas/appscript_code.md`
- `docs/formulas/lookerstudio_formulas.md`

---

## The 2-Version Discipline

**Core Principle:** Active documentation files contain ONLY 2 versions:

```
[File Name]
├── EXPERIMENTAL V[X]  (if testing new features)
└── STABLE SYSTEM V[X-1]  (current production)
```

**Older versions?** → Archive to `backups/[date]-[filename]/`

**Why:**
- Keeps files small and manageable
- Clear separation between testing and production
- Archives serve as rollback points

---

## Version Lifecycle

```
    [User: "let's build a new feature in google sheets"]
           │
           ▼
┌─────────────────────┐     ┌──────────────────────────────┐
│ Infer target file   │────▶│ backups/YYYY-MM-DD-          │
│ from user context   │     │ googlesheet-formulas/        │
│                     │     │  - googlesheet_formulas.md   │
└─────────────────────┘     └──────────────────────────────┘
           │                              │
           ▼                              │
┌─────────────────────┐                   │
│ Bash: Copy file to  │───────────────────┘
│ backup (NO TOKENS)  │     Backup ready for rollback
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│  EXPERIMENTAL V[X]  │
│  "Testing in progress"│
└──────────┬──────────┘
           │ When features are tested
           ▼
    [User: "mark as stable"]
           │
           ▼
┌─────────────────────┐
│  Integrate V[X]     │
│  into STABLE V[X]   │
│  (cumulative)       │
└─────────────────────┘
           │
           ▼
┌─────────────────────┐    If critical issues found
│  STABLE SYSTEM V[X] │◄───────────────────────
│  "Production ready" │    Restore from backup
└─────────────────────┘
```

**Key Concept:** V3 = V2 + new features (additive, NOT replacement)

---

## Promotion Process (Experimental → Stable)

When user says "mark as stable" or "promote to stable", follow this workflow:

### Step 1: Pre-Promotion Verification

Before promoting, ASK user to confirm:

```
Ready to promote EXPERIMENTAL V[X] to STABLE?

This will:
1. Verify backup exists (created when experimental work started)
2. Integrate Experimental features into STABLE V[X]
3. Update CHANGELOG.md and backups/README.md
4. Remove Experimental section from active file

Continue? (yes/no)
```

### Step 2: Verify Backup Exists

**NOTE:** Backup should already exist from when experimental work started.

1. Identify which file is being promoted (e.g., `googlesheet_formulas.md`)
2. Check backup directory exists: `backups/[YYYY-MM-DD]-googlesheet-formulas/`
3. If missing, create it now using Bash:
   ```bash
   # Example for googlesheet_formulas.md
   mkdir -p backups/2026-01-29-googlesheet-formulas/
   cp docs/formulas/googlesheet_formulas.md backups/2026-01-29-googlesheet-formulas/
   ```
4. Verify backup file is present

**Backup Naming Convention:**
- Format: `backups/YYYY-MM-DD-[filename]/`
- Example: `backups/2026-01-29-googlesheet-formulas/`
- NO version numbers (v[X]-stable)
- NO suffixes like "-backup" or "-stable"

### Step 3: Return Integration Plan to Main Agent

**IMPORTANT:** This skill does NOT have Write access and CANNOT modify files directly.

Return to main agent with detailed plan for integration:

**DO NOT simply append Experimental at the end.**

The integration plan must specify how to **merge and reorganize by feature/table type:**

```
STABLE SYSTEM V[X] - [Feature Name]

## All Table Schemas
├── Core Tables (from V[X-1] + V[X] additions)
├── Transaction Tables (from V[X-1] + V[X] additions)
└── Reference Tables (from V[X-1] + V[X] additions)

## All Views
├── (From V[X-1] + V[X] additions)

## All Actions
├── (From V[X-1] + V[X] additions)
```

**The plan should include:**
1. Which sections from Experimental need to be integrated where
2. How to reorganize content by feature/table (not chronologically)
3. What needs to be removed (the entire EXPERIMENTAL section)
4. What supporting files need updates (CHANGELOG.md, backups/README.md)

### Step 4: Main Agent Executes Integration

Main agent will:
1. Show proposed edits to user for approval
2. Integrate Experimental content into Stable sections
3. Remove EXPERIMENTAL section from active file
4. Update CHANGELOG.md and backups/README.md with new format:

**CHANGELOG.md Format (Date-Based, NOT Version-Based):**
```markdown
## YYYY-MM-DD - [Feature Name]
**Files Changed:** [filename.md]
**Status:** ✅ DEPLOYED

### What's New
- Feature bullet point 1
- Feature bullet point 2
- Feature bullet point 3
```

**backups/README.md Format:**
```markdown
| Date | File | Feature | Location |
|------|------|---------|----------|
| YYYY-MM-DD | filename.md | Feature Name | YYYY-MM-DD-filename/ |
```

**Important:**
- NO "V3 - STABLE" or version-based headers in CHANGELOG
- Use date + feature name instead
- Clearly indicate which file(s) changed

### Step 5: Verify Completeness (Skill Reviews Result)

After main agent completes edits, use Read tool to verify this checklist:

```
☐ No "(UNCHANGED IN VX)" markers anywhere
☐ No "see previous version" shortcuts
☐ Every table/view/action/column documented in full
☐ STABLE documentation is self-contained
☐ No version tags on individual items (version info at document top only)
☐ Archive exists with complete files
☐ CHANGELOG.md updated
☐ backups/README.md updated
```

---

## Critical Documentation Rules

### ❌ What NOT to Do

1. **NEVER use "(UNCHANGED IN VX)" markers in headers**
   - ❌ `#### 3. Student Attendance Table (UNCHANGED IN V2)`
   - ✅ `#### 3. Student Attendance Table`

2. **NEVER say "see previous version"**
   - ❌ `Unchanged from V1 - see V1 documentation`
   - ✅ Full documentation every time

3. **NEVER skip documenting items**
   - ❌ `Columns B through Z: All unchanged from V1`
   - ✅ Document every column in full

4. **NEVER make documentation non-self-contained**
   - ❌ `For views, see V1 documentation in backups/...`
   - ✅ Complete documentation in current file

### ✅ What TO Do

1. **Document EVERYTHING fully** - STABLE must be self-contained
2. **Organize by feature/table type** - NOT chronologically by version
3. **Version info at document top only** - in structured format block
4. **No version tags on items** - version info ONLY at document top

---

## Anti-Patterns from Past Mistakes

These occurred during V1→V2 promotion and must be avoided:

**Section Header Anti-Pattern:**
❌ `#### 3. Student Attendance Table (UNCHANGED IN V2)`
✅ `#### 3. Student Attendance Table`

**Column Documentation Anti-Pattern:**
❌ `**Column A: Student ID** - Unchanged from V1, see V1 docs`
✅ Full column documentation with all fields

**Table Documentation Anti-Pattern:**
❌ `**Columns B through Z:** All unchanged from V1`
✅ Document every column in full

**Cross-Reference Anti-Pattern:**
❌ `For views and actions, see V1 documentation in backups/...`
✅ Complete view and action documentation in current file

---

## Working with Blueprint Skills

This skill coordinates with other blueprint skills during promotion:

| Task | Responsible Skill |
|------|-------------------|
| **Promotion workflow** | version-management-skill (this skill) |
| **AppSheet templates** | appsheet-blueprint-skill |
| **Google Sheets templates** | googlesheet-blueprint-skill |
| **Apps Script templates** | appscript-blueprint-skill |
| **Looker Studio templates** | lookerstudio-blueprint-skill |

**During promotion:**
1. This skill manages the workflow and file operations
2. Blueprint skills ensure documentation completeness
3. Both work together: workflow + templates

---

## Automatic Invocation Behavior

**When user says "let's build a new feature":**

```
version-management-skill:
  → Confirms intent (if auto-triggered)
  → Uses Bash to create backup (NO TOKENS)
  → Returns plan to main agent for adding EXPERIMENTAL section
  → Suggests blueprint skills for content templates

Main agent:
  → Shows user the EXPERIMENTAL section plan
  → Adds EXPERIMENTAL V[X] section with user approval
  → Invokes blueprint skills to add content
```

**When user says "mark as stable":**

```
version-management-skill:
  → Prompts for confirmation
  → Verifies backup exists (created at start of experimental work)
  → Reads current files to analyze integration needs
  → Returns detailed integration plan to main agent
  → Provides completeness checklist

Main agent:
  → Shows user proposed integration edits
  → Integrates Experimental into Stable (with approval)
  → Updates CHANGELOG.md and backups/README.md
  → Removes Experimental section

Blueprint skills (if applicable):
  → Ensure documentation completeness
  → Verify no anti-patterns
  → Check proper tagging
```

**Example:**
```
User: "Mark the system as stable"

version-management-skill:
  → Prompts for confirmation
  → Verifies backup exists
  → Reads files and returns integration plan to main agent

Main agent:
  → Shows proposed edits to user
  → Integrates Experimental into Stable (with approval)
  → Updates CHANGELOG.md and backups/README.md
  → Removes Experimental section

appsheet-blueprint-skill (if promoting AppSheet docs):
  → Ensures all tables documented with complete schemas
  → Verifies no "(UNCHANGED)" markers
  → Checks proper tagging

googlesheet-blueprint-skill (if promoting Google Sheets docs):
  → Ensures all formulas documented
  → Verifies template compliance

appscript-blueprint-skill (if promoting Apps Script docs):
  → Ensures all functions documented
  → Verifies testing checklists included

lookerstudio-blueprint-skill (if promoting Looker Studio docs):
  → Ensures all data sources and fields documented
  → Verifies template compliance
```

---

## Starting a New Feature

When user says "let's build a new feature" or similar:

**Step 0: Confirm Intent (Auto-Trigger Only)**
- **If skill was auto-triggered** (by keywords like "let's build a new feature"):
  - Use AskUserQuestion to confirm:
    ```
    Do you want to start a new experimental feature?
    - Yes - Create backup and EXPERIMENTAL section
    - No - Continue without entering experimental phase
    ```
- **If skill was manually invoked** (`/version-management-skill`):
  - Skip confirmation, proceed directly to Step 1

**If proceeding with experimental feature:**

1. **Infer which file(s) from user's context:**

   User will naturally mention which file they're working on. Infer from keywords:

   | User Keywords | Target File |
   |---------------|-------------|
   | "google sheet(s)", "sheet formula(s)", "sheet", "ARRAYFORMULA", "VLOOKUP" | `googlesheet_formulas.md` |
   | "appsheet", "appsheet formula(s)", "table", "view", "action", "security" | `appsheet_formulas.md` |
   | "apps script", "script", "automation", "trigger", "function" | `appscript_code.md` |
   | "looker studio", "looker", "report", "dashboard", "data source" | `lookerstudio_formulas.md` |

   **Examples:**
   - "Let's add attendance formulas to google sheets" → `googlesheet_formulas.md`
   - "I want to update the appsheet table schema" → `appsheet_formulas.md`
   - "Let's build a script to automate this" → `appscript_code.md`

   **If unclear from context:** Ask user which file to work on.

   **Multi-file scenario:** If user mentions multiple files (e.g., "appsheet and google sheets"), handle both files.

2. **Create Backup FIRST** (using Bash - NO TOKENS USED):
   ```bash
   # Example for googlesheet_formulas.md
   mkdir -p backups/2026-01-29-googlesheet-formulas/
   cp docs/formulas/googlesheet_formulas.md backups/2026-01-29-googlesheet-formulas/

   # Example for appsheet_formulas.md
   mkdir -p backups/2026-01-29-appsheet-formulas/
   cp docs/formulas/appsheet_formulas.md backups/2026-01-29-appsheet-formulas/
   ```

   **Backup Naming Convention:**
   - Format: `backups/YYYY-MM-DD-[filename]/`
   - Use actual filename without extension: `googlesheet-formulas`, `appsheet-formulas`, etc.
   - NO version numbers (v[X]-stable)
   - NO suffixes like "-backup" or "-stable"

   **Multi-file backup:** Create separate folders for each file
   - `backups/2026-01-29-appsheet-formulas/`
   - `backups/2026-01-29-googlesheet-formulas/`

   **Why backup BEFORE experimental work?**
   - Token savings: Simple file copy vs content extraction
   - Safety: Backup exists from day 1 of experimental work
   - Point-in-time accuracy: Captures clean STABLE state
   - Rollback ready: Can restore anytime during experimental phase

3. **Return to Main Agent** with plan to add EXPERIMENTAL section:
   - **CRITICAL: Place at TOP of file** (before STABLE section)
   - Insert after file header/metadata
   - Maintain order: EXPERIMENTAL → STABLE → Archive pointer
   - Set status to "⚠ EXPERIMENTAL - TESTING IN PROGRESS"
   - Suggest invoking blueprint skills to add documentation templates

**Placement Rule:**
- EXPERIMENTAL always goes at TOP (lines immediately after metadata)
- STABLE comes second (middle of file)
- Archive pointer at bottom
- Rationale: Active development needs quick access

---

## Scope and Limitations

### In Scope (What This Skill Does)
✅ Experimental→Stable promotion workflow orchestration
✅ 2-version discipline enforcement
✅ Backup creation via Bash (token-efficient)
✅ Reading files to analyze current state
✅ Returning integration plans to main agent
✅ Documentation completeness verification
✅ Anti-pattern detection and prevention
✅ Rollback procedure guidance
✅ Starting new feature work coordination

### Out of Scope (What Main Agent Does)
❌ Direct file editing (main agent handles with user approval)
❌ CHANGELOG.md updates (main agent edits with approval)
❌ backups/README.md updates (main agent edits with approval)
❌ Adding/removing EXPERIMENTAL sections (main agent with approval)

### Out of Scope (What Blueprint Skills Do)
❌ Actual content documentation (use blueprint skills)
❌ Formula syntax (use reference skills)
❌ Template formatting (use blueprint skills)

---

## Quick Reference: File States

### Starting a New Feature

```
1. Skill: Infer target file from user's context (e.g., "google sheets" → googlesheet_formulas.md)
2. Bash: Create backup (NO TOKENS)
   mkdir -p backups/2026-01-29-googlesheet-formulas/
   cp docs/formulas/googlesheet_formulas.md backups/2026-01-29-googlesheet-formulas/
3. Main agent: Add EXPERIMENTAL section at TOP
4. Blueprint skills: Add documentation templates
5. Document and test thoroughly
6. When ready → "mark as stable"
```

### Promoting to Stable

```
1. Skill: Confirm with user
2. Skill: Verify backup exists (backups/YYYY-MM-DD-[filename]/)
3. Skill: Read files and return integration plan
4. Main agent: Show edits, get user approval
5. Main agent: Merge Experimental into STABLE (reorganize by type)
6. Main agent: Remove Experimental section
7. Main agent: Update CHANGELOG.md (date-based format) and backups/README.md
8. Skill: Verify completeness
```

### Critical Issue Found?

```
1. Stop promotion
2. Restore from backup (backups/YYYY-MM-DD-[filename]/)
   Example: backups/2026-01-29-googlesheet-formulas/
   - Backup was created BEFORE experimental work started
   - Contains clean STABLE state
3. Fix issues in Experimental
4. Re-test
5. Attempt promotion again
```

---

## Important Notes

**This skill orchestrates but doesn't modify files directly.**
- Skill has **Read and Bash only** (no Write tool)
- Uses **Bash for backups** (token-efficient file copying)
- Returns **plans to main agent** for file modifications
- Main agent shows edits and gets user approval

**Backup strategy is token-efficient:**
- Backups created with Bash `cp` command at START of experimental work
- Simple file copy: NO tokens used for content manipulation
- Backup ready for entire experimental phase
- Promotion process simpler (backup already exists)

**File-level vs App-level versioning:**
- Each documentation file maintains its own version (V1, V2, V3, etc.)
- NO "app versions" - each file evolves independently
- Backup folders named by date + filename: `YYYY-MM-DD-[filename]/`
- CHANGELOG tracks deployments by date + feature (NOT version numbers)
- Example: `2026-01-29-googlesheet-formulas/` (NOT `2026-01-29-v3-stable/`)

**This skill orchestrates but doesn't create content.**
- Use **blueprint skills** for actual documentation content
- Use **this skill** for managing the promotion workflow
- Use **main agent** for file edits (with user approval)

**Always verify completeness before promoting.**
- Use the checklist in Step 5
- No partial documentation allowed
- STABLE must be self-contained

**Archives are for rollback, not reference.**
- Current STABLE should never require opening archives
- Archives exist only for emergency recovery
- Backups created BEFORE experimental work for clean rollback

---

**Version:** 3.0
**Last Updated:** 2026-01-29

**Changes in V3:**
- File-level versioning instead of app-level versioning
- Backup naming: `YYYY-MM-DD-[filename]/` (NOT `v[X]-stable`)
- File inference from user context (keywords → target file)
- CHANGELOG format: date-based entries (NOT version-based)
- backups/README.md format: date + filename index
- Updated all examples to show new naming convention

**Changes in V2:**
- Removed Write tool (Read + Bash only)
- Backups now created with Bash at START of experimental work (token savings)
- Skill returns plans to main agent instead of directly editing files
- Updated all workflows to reflect plan-based approach

**Source:** APPSHEET_SYSTEM_BLUEPRINT.md Section 5

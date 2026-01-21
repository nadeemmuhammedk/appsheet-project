---
name: version-management-skill
description: Manage Experimental→Stable promotion workflow for ALL documentation types (AppSheet, Google Sheets, Apps Script, Looker Studio). Handles 2-version discipline, archive creation, integration process, and completeness verification. Use when marking system as stable, promoting experimental to stable, or managing documentation versions.
allowed-tools:
  - Read
  - Write
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

**Older versions?** → Archive to `backups/[date]-v[X-1]-stable/`

**Why:**
- Keeps files small and manageable
- Clear separation between testing and production
- Archives serve as rollback points

---

## Version Lifecycle

```
┌─────────────────────┐
│  EXPERIMENTAL V[X]  │ ← Testing new features
│  "Testing in progress"│
└──────────┬──────────┘
           │
           │ When features are tested & working
           ▼
    [User: "mark as stable"]
           │
           ▼
┌─────────────────────┐     ┌──────────────────────────┐
│  Archive current    │────▶│ backups/YYYY-MM-DD-      │
│  STABLE V[X-1]      │     │ v[X-1]-stable/           │
└─────────────────────┘     │  - appsheet_formulas.md  │
           │                │  - googlesheet_formulas.md│
           ▼                │  - appscript_code.md     │
┌─────────────────────┐     │  - lookerstudio_formulas│
│  Integrate V[X]     │     └──────────────────────────┘
│  into STABLE V[X]   │                  │
│  (cumulative)       │                  │ For rollback
└─────────────────────┘                  │
           │                            ▼
           │                    If critical issues found
           ▼
┌─────────────────────┐     Use archived version to restore
│  STABLE SYSTEM V[X] │◄───┘
│  "Production ready" │
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
1. Archive current STABLE V[X-1] to backups/
2. Integrate Experimental features into STABLE V[X]
3. Update CHANGELOG.md
4. Remove Experimental section from active file

Continue? (yes/no)
```

### Step 2: Create Archive

1. Create backup directory: `backups/[YYYY-MM-DD]-v[X-1]-stable/`
2. Copy current STABLE section from active file to backup
3. Add Quick Rollback section at top of archived file

### Step 3: Integrate Experimental into Stable

**DO NOT simply append Experimental at the end.**

Instead, **merge and reorganize by feature/table type:**

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

**Tag new items:** Add subtle "Added: V[X]" tag to new features only

### Step 4: Remove Experimental Section

Delete the entire EXPERIMENTAL section from active file.

### Step 5: Update Supporting Files

- Update `CHANGELOG.md` with minimal format:
  - Version number, Created, Deployed, Location
  - "What's New" section with bullet points only
  - No migration steps, testing details, or rollback plans
- Update `backups/README.md` with new archive entry
- Update version history in main documentation

### Step 6: Verify Completeness

Use this checklist:

```
☐ No "(UNCHANGED IN VX)" markers anywhere
☐ No "see previous version" shortcuts
☐ Every table/view/action/column documented in full
☐ STABLE documentation is self-contained
☐ New items tagged with "Added: V[X]"
☐ Archive created with rollback instructions
☐ CHANGELOG.md updated
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
2. **Add subtle tags only on changed items** - "Added: V3" or "Modified: V3"
3. **Organize by feature/table type** - NOT chronologically by version
4. **Version info at document top only** - "VERSION: V3"

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
  → Creates EXPERIMENTAL V[X] section
  → Sets up 2-version structure
  → Invites blueprint skills to add content
```

**When user says "mark as stable":**

```
version-management-skill:
  → Prompts for confirmation
  → Creates archive
  → Integrates Experimental into Stable
  → Updates CHANGELOG.md
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
  → Creates archive
  → Integrates Experimental into Stable
  → Updates CHANGELOG.md
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

1. **Identify the file** to update (ask if unclear)
2. **Check current state** - Does EXPERIMENTAL section exist?
3. **Create EXPERIMENTAL V[X]** if needed, or add to existing
4. **Invoke blueprint skills** to add documentation templates
5. **Set status** to "⚠ EXPERIMENTAL - TESTING IN PROGRESS"

---

## Scope and Limitations

### In Scope
✅ Experimental→Stable promotion workflow
✅ 2-version discipline enforcement
✅ Archive creation and management
✅ Documentation completeness verification
✅ CHANGELOG.md updates
✅ Anti-pattern detection and prevention
✅ Rollback procedures
✅ Starting new feature work

### Out of Scope
❌ Actual content documentation (use blueprint skills)
❌ Formula syntax (use reference skills)
❌ Template formatting (use blueprint skills)

---

## Quick Reference: File States

### Adding a New Feature

```
1. Add to EXPERIMENTAL section
2. Document using blueprint skill templates
3. Test thoroughly
4. When ready → "mark as stable"
```

### Promoting to Stable

```
1. Confirm with user
2. Archive current STABLE
3. Merge Experimental into STABLE (reorganize by type)
4. Tag new items: "Added: V[X]"
5. Remove Experimental section
6. Update CHANGELOG.md
7. Verify completeness
```

### Critical Issue Found?

```
1. Stop promotion
2. Restore from archive (backups/[date]-v[X-1]-stable/)
3. Fix issues in Experimental
4. Re-test
5. Attempt promotion again
```

---

## Important Notes

**This skill orchestrates but doesn't create content.**
- Use **blueprint skills** for actual documentation content
- Use **this skill** for managing the promotion workflow

**Always verify completeness before promoting.**
- Use the checklist in Step 6
- No partial documentation allowed
- STABLE must be self-contained

**Archives are for rollback, not reference.**
- Current STABLE should never require opening archives
- Archives exist only for emergency recovery

---

**Version:** 1.0
**Last Updated:** 2026-01-21
**Source:** APPSHEET_SYSTEM_BLUEPRINT.md Section 5

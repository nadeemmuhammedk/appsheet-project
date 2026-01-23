# AppSheet Project

A scaffolding tool for AppSheet projects that initializes a complete development environment with Claude Code skills, documentation, and templates.

## What It Does

AppSheet Project sets up a structured development environment with everything you need for AppSheet development:

- **AI Assistant Skills** - Pre-configured skills for AI-assisted AppSheet, Google Sheets, Apps Script, and Looker Studio development
- **Documentation** - Complete reference library for AppSheet formulas, Google Sheets, and Looker Studio
- **System Blueprints** - Templates and architectural guides
- **Project Structure** - Organized folders for documentation, samples, and utilities
- **2-Version Workflow** - Experimental → Stable version management system

## Installation

No installation required! Use `npx` to run directly:

```bash
npx appsheet-project init
```

## Usage

### Initialize a New Project

```bash
# Create and navigate to your project directory
mkdir my-appsheet-project
cd my-appsheet-project

# Initialize the AppSheet project structure
npx appsheet-project init
```

### Update an Existing Project

```bash
# Navigate to your existing AppSheet project
cd my-appsheet-project

# Update system files to the latest version
npx appsheet-project update
```

The `update` command synchronizes your project's system files with the latest version of the AppSheet Project package. This ensures you have the newest:

- AI Assistant Skills (`.claude/skills/`, `.codex/skills/`)
- AppSheet Documentation (`APPSHEET-DOCUMENTATION/`)
- System Blueprints (`APPSHEET_SYSTEM_BLUEPRINT.md`)
- Agent Documentation (`AGENTS.md`, `CLAUDE.md`)

**What gets updated:**
- System files are completely overwritten with the latest templates
- You'll see a preview of what will be updated before confirming

**What is preserved:**
- Your custom files: `README.md`, `CHANGELOG.md`, `docs/`, `backups/`, `sample_data/`, `utils/`
- Any modifications you've made to non-system files

**When to use update:**
- After a new version of `appsheet-project` is released
- To get the latest skill improvements and documentation
- To fix corrupted or accidentally modified system files

**Example output:**
```
╔═══════════════════════════════════════════════════════════════╗
║   Update AppSheet Project                                     ║
╚═══════════════════════════════════════════════════════════════╝

Updating to: v1.0.7
Project directory: /Users/you/my-project

The following system files will be updated:

  • .claude/
  • .codex/
  • APPSHEET-DOCUMENTATION/
  • AGENTS.md
  • APPSHEET_SYSTEM_BLUEPRINT.md
  • CLAUDE.md

⚠ Warning: System files will be overwritten with template versions.
User files (README.md, CHANGELOG.md, docs/, backups/, etc.) will NOT be touched.

Proceed with update? (y/n):
```

### View Help

```bash
npx appsheet-project help
```

## What Gets Installed

```
your-project/
├── .claude/
│   └── skills/
│       ├── appsheet-blueprint-skill/
│       ├── appsheet-reference-skill/
│       ├── googlesheet-blueprint-skill/
│       ├── lookerstudio-blueprint-skill/
│       ├── appscript-blueprint-skill/
│       ├── version-management-skill/
│       └── prd-skill/
├── .codex/
│   └── skills/ (same as .claude/skills/)
├── APPSHEET-DOCUMENTATION/
│   ├── formulas/
│   │   ├── appsheet_formulas.md
│   │   ├── googlesheet_formulas.md
│   │   ├── lookerstudio_formulas.md
│   │   └── appscript_code.md
│   └── guides/
├── docs/
│   └── project/
│       └── PRD.md
├── sample_data/
├── backups/
├── utils/
├── AGENTS.md
├── APPSHEET_SYSTEM_BLUEPRINT.md
├── CHANGELOG.md
├── CLAUDE.md
└── README.md
```

---

## The 2-Version Workflow System

This project uses a disciplined **Experimental → Stable** version management system.

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    Active Documentation                     │
├─────────────────────────────────────────────────────────────┤
│  EXPERIMENTAL V[X]     ←  Work on new features here        │
│  "Testing in progress"                                      │
├─────────────────────────────────────────────────────────────┤
│  STABLE SYSTEM V[X-1]   ←  Your production version         │
│  "Production ready"                                         │
└─────────────────────────────────────────────────────────────┘
           │ when features are tested & working
           │
           ▼
    [You say: "mark as stable"]
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│  Archive current STABLE → backups/[date]-v[X-1]-stable/    │
│  Merge Experimental into STABLE (cumulative)               │
│  Remove Experimental section                                │
│  New STABLE SYSTEM V[X] is now production-ready            │
└─────────────────────────────────────────────────────────────┘
```

### Typical Workflow

1. **Start a new feature** → `version-management-skill` creates `EXPERIMENTAL V[X]` section
2. **Build & test** → Use blueprint skills to document your work
3. **Iterate** → Make changes, update documentation, test
4. **Mark as stable** → Say "mark as stable" when ready for production
5. **Promotion** → System archives old stable, merges experimental into new stable

---

## Available Skills

| Skill | Description |
|-------|-------------|
| `/version-management-skill` | **Workflow Orchestrator** - Manages Experimental→Stable promotion, 2-version discipline, archives, and version lifecycle. Auto-triggers on "new feature", "mark as stable", "promote to stable" |
| `/appsheet-blueprint-skill` | Generate complete AppSheet documentation (tables, views, actions, security) following system templates |
| `/appsheet-reference-skill` | Quick reference for AppSheet formulas, view types, actions, security filters, slices, and automation patterns |
| `/googlesheet-blueprint-skill` | Generate Google Sheets formula documentation (ARRAYFORMULA, VLOOKUP, QUERY, calculated formulas) |
| `/lookerstudio-blueprint-skill` | Generate Looker Studio documentation (data sources, calculated fields, metrics, dimensions, blended data) |
| `/appscript-blueprint-skill` | Generate Apps Script documentation (functions, triggers, installation steps, testing checklists) |
| `/prd-skill` | Create or update Product Requirements Documents (PRD) for project planning and feature definition |

---

## How Skills Are Invoked

### Automatic Invocation (No Command Needed)

Skills trigger automatically based on keywords in your conversation:

| Your Message | Skill That Activates |
|--------------|---------------------|
| "let's build a new feature", "I want to add a feature" | `version-management-skill` (creates Experimental section) |
| "mark as stable", "promote to stable", "system is stable", "ready for production" | `version-management-skill` (starts promotion workflow) |
| "document this table", "create AppSheet documentation" | `appsheet-blueprint-skill` |
| "how do I write this formula", "what's the syntax for..." | `appsheet-reference-skill` |
| "document this Google Sheets formula" | `googlesheet-blueprint-skill` |
| "document this Looker Studio report" | `lookerstudio-blueprint-skill` |
| "document this Apps Script function" | `appscript-blueprint-skill` |
| "create a PRD", "update the PRD" | `prd-skill` |

### Manual Invocation (Direct Commands)

Invoke any skill directly using `/skill-name`:

```
/appsheet-blueprint-skill
/googlesheet-blueprint-skill
/lookerstudio-blueprint-skill
/appscript-blueprint-skill
/version-management-skill
/appsheet-reference-skill
/prd-skill
```

---

## Example: Building a New Feature

When you say something like:

> "I want to build a new feature to create [new-feature] use /appsheet-blueprint-skill and appsheet-reference-skill and /version-management-skill"

Here's exactly what happens:

### Step 1: Workflow Setup (`version-management-skill`)
- Detects "new feature" trigger
- Creates `EXPERIMENTAL V[X]` section in the appropriate formula file
- Sets up the 2-version structure (Experimental + Stable)
- Sets status to "⚠ EXPERIMENTAL - TESTING IN PROGRESS"

### Step 2: Documentation Generation (`appsheet-blueprint-skill`)
- Uses templates from `APPSHEET_SYSTEM_BLUEPRINT.md`
- Documents table schemas, views, actions, security rules
- Writes documentation to the `EXPERIMENTAL V[X]` section

### Step 3: Formula Reference (`appsheet-reference-skill`)
- Helps with specific AppSheet formulas, view types, actions
- References the `APPSHEET-DOCUMENTATION/` library as needed

### Step 4: Iterative Development
- You make changes, test, update documentation
- The system updates the Experimental section as you go
- Multiple skills may contribute to the same Experimental section

### Step 5: Promotion to Stable
When you say **"mark the system as stable"**:

1. `version-management-skill` prompts for confirmation
2. Archives current Stable to `backups/[date]-v[X-1]-stable/`
3. Merges Experimental into Stable (cumulative: V3 = V2 + new features)
4. Tags new items with "Added: V[X]"
5. Removes Experimental section from active file
6. Updates `CHANGELOG.md`

---

## Next Steps

After running `npx appsheet-project init`:

1. Review `README.md` for detailed documentation
2. Check `APPSHEET_SYSTEM_BLUEPRINT.md` for system overview
3. Start building - just say "let's build a new feature" to activate the workflow
4. Explore `APPSHEET-DOCUMENTATION/` for formulas and guides

## Links

- **npm:** https://www.npmjs.com/package/appsheet-project
- **GitHub:** https://github.com/nadeemmuhammedk/appsheet-project

## License

ISC

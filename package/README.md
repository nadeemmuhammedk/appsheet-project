# AppSheet Project

A scaffolding tool for AppSheet projects that initializes a complete development environment with Claude Code skills, documentation, and templates.

## What It Does

AppSheet Project sets up a structured development environment with everything you need for AppSheet development:

- **Claude Code Skills** - Pre-configured skills for AI-assisted AppSheet development
- **Documentation** - Complete reference library for AppSheet formulas, Google Sheets, and Looker Studio
- **System Blueprints** - Templates and architectural guides
- **Project Structure** - Organized folders for documentation, samples, and utilities

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
│       ├── prd-skill/
│       └── appsheet-reference-skill/
├── .codex/
│   └── skills/
│       ├── appsheet-blueprint-skill/
│       ├── prd-skill/
│       └── appsheet-reference-skill/
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

## Claude Code Skills

After initialization, you can use these skills in Claude Code:

| Skill | Description |
|-------|-------------|
| `/appsheet-blueprint-skill` | Generate AppSheet system blueprints and architecture |
| `/prd-skill` | Create Product Requirements Documents |
| `/appsheet-reference-skill` | Quick reference for AppSheet formulas and features |

## Next Steps

After running `npx appsheet-project init`:

1. Review `README.md` for detailed documentation
2. Check `APPSHEET_SYSTEM_BLUEPRINT.md` for system overview
3. Use Claude Code skills to start building
4. Explore `APPSHEET-DOCUMENTATION/` for formulas and guides

## Links

- **npm:** https://www.npmjs.com/package/appsheet-project
- **GitHub:** https://github.com/nadeemmuhammedk/appsheet-project

## License

ISC

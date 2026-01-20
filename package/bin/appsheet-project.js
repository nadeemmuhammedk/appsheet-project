#!/usr/bin/env node

/**
 * AppSheet Project Scaffolding CLI
 *
 * Initializes a new AppSheet development environment by copying
 * all template files into the current directory.
 *
 * Commands:
 * - init - Initialize AppSheet project in current directory
 * - help - Show usage instructions
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

// Get command and arguments
const args = process.argv.slice(2);
const command = args[0];

// Template directory (in the npm package)
const TEMPLATE_DIR = path.join(__dirname, '..', 'template');

/**
 * Copy directory recursively
 */
function copyDirectorySync(src, dest, indent = '') {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      console.log(`${indent}${colors.dim}  Creating directory: ${entry.name}/${colors.reset}`);
      copyDirectorySync(srcPath, destPath, indent + '  ');
    } else {
      console.log(`${indent}${colors.dim}  Copying: ${entry.name}${colors.reset}`);
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Initialize AppSheet project in current directory
 */
function initProject() {
  console.log('');
  console.log(`${colors.bright}${colors.cyan}╔═══════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║   Initializing AppSheet Project...                           ║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╚═══════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

  const targetDir = process.cwd();

  // Check if template directory exists
  if (!fs.existsSync(TEMPLATE_DIR)) {
    console.error(`${colors.red}Error: Template directory not found at ${TEMPLATE_DIR}${colors.reset}`);
    console.error(`${colors.red}This might indicate a corrupted installation.${colors.reset}`);
    process.exit(1);
  }

  try {
    // Get list of items to copy
    const templateItems = fs.readdirSync(TEMPLATE_DIR);

    if (templateItems.length === 0) {
      console.error(`${colors.red}Error: Template directory is empty${colors.reset}`);
      process.exit(1);
    }

    console.log(`${colors.cyan}Copying files to: ${colors.bright}${targetDir}${colors.reset}\n`);

    let fileCount = 0;
    let dirCount = 0;

    // Copy each item from template to current directory
    for (const item of templateItems) {
      const srcPath = path.join(TEMPLATE_DIR, item);
      const destPath = path.join(targetDir, item);
      const stats = fs.statSync(srcPath);

      if (stats.isDirectory()) {
        console.log(`${colors.green}✓${colors.reset} ${colors.bright}${item}/${colors.reset}`);
        copyDirectorySync(srcPath, destPath, '  ');
        dirCount++;
      } else {
        console.log(`${colors.green}✓${colors.reset} ${colors.bright}${item}${colors.reset}`);
        fs.copyFileSync(srcPath, destPath);
        fileCount++;
      }
    }

    console.log('');
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.green}🎉 AppSheet Project initialized successfully!${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log('');

    console.log(`${colors.bright}${colors.green}What's been set up:${colors.reset}`);
    console.log(`  ${colors.green}✓${colors.reset} Claude Code Skills (${colors.cyan}.claude/skills/${colors.reset})`);
    console.log(`  ${colors.green}✓${colors.reset} AppSheet Documentation (${colors.cyan}APPSHEET-DOCUMENTATION/${colors.reset})`);
    console.log(`  ${colors.green}✓${colors.reset} Project Documentation (${colors.cyan}docs/${colors.reset})`);
    console.log(`  ${colors.green}✓${colors.reset} System Blueprints & Templates`);
    console.log('');

    console.log(`${colors.bright}${colors.magenta}Next Steps:${colors.reset}`);
    console.log(`  ${colors.dim}1.${colors.reset} Review ${colors.cyan}README.md${colors.reset} for detailed documentation`);
    console.log(`  ${colors.dim}2.${colors.reset} Check ${colors.cyan}APPSHEET_SYSTEM_BLUEPRINT.md${colors.reset} for system overview`);
    console.log(`  ${colors.dim}3.${colors.reset} Use Claude Code skills: ${colors.cyan}/appsheet-blueprint-skill${colors.reset}, ${colors.cyan}/prd-skill${colors.reset}, or ${colors.cyan}/appsheet-reference-skill${colors.reset}`);
    console.log(`  ${colors.dim}4.${colors.reset} Explore ${colors.cyan}APPSHEET-DOCUMENTATION/${colors.reset} for formulas and guides`);
    console.log('');

    console.log(`${colors.dim}Your AppSheet development environment is ready!${colors.reset}`);
    console.log('');

  } catch (error) {
    console.error(`${colors.red}Error initializing project:${colors.reset}`, error.message);
    process.exit(1);
  }
}

/**
 * Show help message
 */
function showHelp() {
  console.log('');
  console.log(`${colors.bright}${colors.cyan}AppSheet Project Scaffolding Tool${colors.reset}`);
  console.log('');
  console.log(`${colors.bright}Description:${colors.reset}`);
  console.log(`  Initializes a complete AppSheet development environment with:`);
  console.log(`  - Claude Code skills for AI-assisted development`);
  console.log(`  - Complete AppSheet documentation and formulas reference`);
  console.log(`  - System blueprints and templates`);
  console.log(`  - Project structure and guides`);
  console.log('');
  console.log(`${colors.bright}Usage:${colors.reset}`);
  console.log(`  npx appsheet-project init`);
  console.log(`  npx appsheet-project help`);
  console.log('');
  console.log(`${colors.bright}Commands:${colors.reset}`);
  console.log('');
  console.log(`  ${colors.green}init${colors.reset}`);
  console.log(`    Initialize AppSheet project in the current directory`);
  console.log(`    ${colors.dim}This will copy all template files to your current location${colors.reset}`);
  console.log('');
  console.log(`    ${colors.bright}Example:${colors.reset}`);
  console.log(`      mkdir my-appsheet-project`);
  console.log(`      cd my-appsheet-project`);
  console.log(`      npx appsheet-project init`);
  console.log('');
  console.log(`  ${colors.green}help${colors.reset}`);
  console.log(`    Show this help message`);
  console.log('');
  console.log(`${colors.bright}What Gets Installed:${colors.reset}`);
  console.log(`  ${colors.cyan}.claude/skills/${colors.reset}                - Claude Code skills (appsheet-blueprint-skill, prd-skill, appsheet-reference-skill)`);
  console.log(`  ${colors.cyan}APPSHEET-DOCUMENTATION/${colors.reset}      - Complete reference library`);
  console.log(`  ${colors.cyan}docs/${colors.reset}                        - Project documentation`);
  console.log(`  ${colors.cyan}README.md${colors.reset}                   - Main documentation`);
  console.log(`  ${colors.cyan}CHANGELOG.md${colors.reset}                - Version history`);
  console.log(`  ${colors.cyan}CLAUDE.md${colors.reset}                   - Claude Code guidance`);
  console.log(`  ${colors.cyan}AGENTS.md${colors.reset}                   - Agent documentation`);
  console.log(`  ${colors.cyan}APPSHEET_SYSTEM_BLUEPRINT.md${colors.reset} - System template`);
  console.log('');
  console.log(`${colors.bright}${colors.yellow}Important Notes:${colors.reset}`);
  console.log(`  ${colors.yellow}•${colors.reset} Run ${colors.cyan}init${colors.reset} in an empty directory or your project root`);
  console.log(`  ${colors.yellow}•${colors.reset} All files will be copied to your current location`);
  console.log(`  ${colors.yellow}•${colors.reset} You can freely modify all files after initialization`);
  console.log(`  ${colors.yellow}•${colors.reset} For updates, create a new project with the latest version`);
  console.log('');
  console.log(`${colors.bright}Links:${colors.reset}`);
  console.log(`  ${colors.cyan}npm:${colors.reset}    https://www.npmjs.com/package/appsheet-project`);
  console.log(`  ${colors.cyan}GitHub:${colors.reset} https://github.com/nadeemmuhammedk/appsheet-project`);
  console.log('');
}

/**
 * Main CLI handler
 */
function main() {
  switch (command) {
    case 'init':
      initProject();
      break;

    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;

    case undefined:
      console.log(`${colors.yellow}No command specified.${colors.reset}\n`);
      console.log(`Run: ${colors.cyan}npx appsheet-project init${colors.reset} to initialize a new project`);
      console.log(`Run: ${colors.cyan}npx appsheet-project help${colors.reset} for usage instructions\n`);
      break;

    default:
      console.error(`${colors.red}Unknown command: ${command}${colors.reset}\n`);
      console.log(`Valid commands: ${colors.cyan}init${colors.reset}, ${colors.cyan}help${colors.reset}\n`);
      console.log(`Run: ${colors.cyan}npx appsheet-project help${colors.reset} for more information\n`);
      process.exit(1);
  }
}

// Run CLI
main();

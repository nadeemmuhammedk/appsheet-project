#!/usr/bin/env node

/**
 * AppSheet Project Scaffolding CLI
 *
 * Initializes a new AppSheet development environment by copying
 * all template files into the current directory, and updates
 * existing projects with the latest system files.
 *
 * Commands:
 * - init   - Initialize AppSheet project in current directory
 * - update - Update system files in existing project
 * - help   - Show usage instructions
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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
 * Get package version from package.json
 */
function getPackageVersion() {
  try {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    return 'unknown';
  }
}

/**
 * Get the installed version stored in the project directory
 * Returns null if no version file exists
 */
function getInstalledVersion() {
  try {
    const versionFile = path.join(process.cwd(), '.appsheet-project-version');
    if (fs.existsSync(versionFile)) {
      return fs.readFileSync(versionFile, 'utf8').trim();
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Write the current package version to the project's version file
 */
function writeInstalledVersion() {
  const version = getPackageVersion();
  const versionFile = path.join(process.cwd(), '.appsheet-project-version');
  fs.writeFileSync(versionFile, version, 'utf8');
}

/**
 * Get list of system paths that should be updated
 */
function getSystemPaths() {
  return [
    '.claude',
    '.codex',
    'APPSHEET-DOCUMENTATION',
    'AGENTS.md',
    'APPSHEET_SYSTEM_BLUEPRINT.md',
    'CLAUDE.md'
  ];
}

/**
 * Detect if current directory is an initialized AppSheet project
 * Returns object with initialization status and missing files
 */
function detectInitializedProject() {
  const targetDir = process.cwd();

  const hasDocFolder = fs.existsSync(path.join(targetDir, 'APPSHEET-DOCUMENTATION'));
  const hasBlueprintFile = fs.existsSync(path.join(targetDir, 'APPSHEET_SYSTEM_BLUEPRINT.md'));

  return {
    isInitialized: hasDocFolder && hasBlueprintFile,
    missing: {
      docFolder: !hasDocFolder,
      blueprintFile: !hasBlueprintFile
    }
  };
}

/**
 * Show preview of what will be installed
 */
function showInstallPreview() {
  const version = getPackageVersion();
  const targetDir = process.cwd();

  console.log('');
  console.log(`${colors.bright}${colors.cyan}╔═══════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║   Initialize AppSheet Project                                 ║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╚═══════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

  console.log(`${colors.cyan}Installing to:${colors.reset} ${colors.bright}${targetDir}${colors.reset}`);
  console.log(`${colors.cyan}Package version:${colors.reset} ${colors.bright}v${version}${colors.reset}`);
  console.log('');
  console.log(`${colors.bright}The following will be installed:${colors.reset}`);
  console.log('');

  console.log(`${colors.bright}📁 Directories:${colors.reset}`);
  console.log(`  ${colors.cyan}•${colors.reset} .claude/skills/          - Claude Code AI assistant skills`);
  console.log(`  ${colors.cyan}•${colors.reset} .codex/skills/           - Codex AI assistant skills`);
  console.log(`  ${colors.cyan}•${colors.reset} APPSHEET-DOCUMENTATION/  - Complete AppSheet reference library`);
  console.log(`  ${colors.cyan}•${colors.reset} docs/                    - Project documentation structure`);
  console.log(`  ${colors.cyan}•${colors.reset} backups/                 - Version backup storage`);
  console.log('');

  console.log(`${colors.bright}📄 Files:${colors.reset}`);
  console.log(`  ${colors.cyan}•${colors.reset} README.md                      - Main project documentation`);
  console.log(`  ${colors.cyan}•${colors.reset} CHANGELOG.md                   - Version history tracker`);
  console.log(`  ${colors.cyan}•${colors.reset} CLAUDE.md                      - Claude Code guidance`);
  console.log(`  ${colors.cyan}•${colors.reset} AGENTS.md                      - Agent documentation`);
  console.log(`  ${colors.cyan}•${colors.reset} APPSHEET_SYSTEM_BLUEPRINT.md   - System template & blueprint`);
  console.log('');

  console.log(`${colors.bright}${colors.yellow}⚠ Warning:${colors.reset} ${colors.yellow}Existing files with the same names will be overwritten.${colors.reset}`);
  console.log('');
}

/**
 * Initialize AppSheet project in current directory
 */
async function initProject() {
  // Show preview of what will be installed
  showInstallPreview();

  // Get user confirmation
  const confirmed = await promptUserConfirmation('init');
  if (!confirmed) {
    process.exit(0);
  }

  const targetDir = process.cwd();

  console.log('');
  console.log(`${colors.bright}${colors.cyan}╔═══════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║   Initializing AppSheet Project...                           ║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╚═══════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

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

    writeInstalledVersion();

    const version = getPackageVersion();

    console.log('');
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.green}🎉 AppSheet Project initialized successfully!${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log('');
    console.log(`${colors.bright}Installed version:${colors.reset} v${version}`);
    console.log('');

    console.log(`${colors.bright}${colors.green}What's been set up:${colors.reset}`);
    console.log(`  ${colors.green}✓${colors.reset} AI Assistant Skills (${colors.cyan}.claude/skills/, .codex/skills/${colors.reset})`);
    console.log(`  ${colors.green}✓${colors.reset} AppSheet Documentation (${colors.cyan}APPSHEET-DOCUMENTATION/${colors.reset})`);
    console.log(`  ${colors.green}✓${colors.reset} Project Documentation (${colors.cyan}docs/${colors.reset})`);
    console.log(`  ${colors.green}✓${colors.reset} System Blueprints & Templates`);
    console.log('');

    console.log(`${colors.bright}${colors.magenta}Workflow - 2-Version System:${colors.reset}`);
    console.log(`  ${colors.cyan}Experimental Phase${colors.reset} - Work on new features/updates in development`);
    console.log(`  ${colors.cyan}Stable Phase${colors.reset} - Your production-ready version`);
    console.log(`  ${colors.dim}Say "mark as stable" when your changes are production-ready${colors.reset}`);
    console.log('');

    console.log(`${colors.bright}${colors.magenta}Next Steps:${colors.reset}`);
    console.log(`  ${colors.dim}1.${colors.reset} Review ${colors.cyan}README.md${colors.reset} for detailed documentation`);
    console.log(`  ${colors.dim}2.${colors.reset} Check ${colors.cyan}APPSHEET_SYSTEM_BLUEPRINT.md${colors.reset} for system overview`);
    console.log(`  ${colors.dim}3.${colors.reset} See ${colors.cyan}https://www.npmjs.com/package/appsheet-project${colors.reset} for all available skills`);
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
 * Show preview of what will be updated
 */
function showUpdatePreview(systemPaths) {
  const version = getPackageVersion();
  const targetDir = process.cwd();

  console.log('');
  console.log(`${colors.bright}${colors.cyan}╔═══════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}║   Update AppSheet Project                                     ║${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}╚═══════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

  const installedVersion = getInstalledVersion();
  if (installedVersion) {
    console.log(`${colors.cyan}Installed version:${colors.reset} ${colors.bright}v${installedVersion}${colors.reset}`);
    console.log(`${colors.cyan}Updating to:${colors.reset}      ${colors.bright}v${version}${colors.reset}`);
  } else {
    console.log(`${colors.cyan}Updating to:${colors.reset} ${colors.bright}v${version}${colors.reset}`);
  }
  console.log(`${colors.cyan}Project directory:${colors.reset} ${targetDir}`);
  console.log('');
  console.log(`${colors.bright}${colors.yellow}The following system files will be updated:${colors.reset}`);
  console.log('');

  for (const itemPath of systemPaths) {
    const templatePath = path.join(TEMPLATE_DIR, itemPath);
    if (fs.statSync(templatePath).isDirectory()) {
      console.log(`  ${colors.yellow}•${colors.reset} ${colors.bright}${itemPath}/${colors.reset}`);
    } else {
      console.log(`  ${colors.yellow}•${colors.reset} ${colors.bright}${itemPath}${colors.reset}`);
    }
  }

  console.log('');
  console.log(`${colors.bright}${colors.yellow}⚠ Warning:${colors.reset} ${colors.yellow}System files will be overwritten.${colors.reset}`);
  console.log(`${colors.dim}User files (README.md, CHANGELOG.md, docs/, backups/) will NOT be touched.${colors.reset}`);
  console.log('');
}

/**
 * Prompt user for confirmation
 */
function promptUserConfirmation(action = 'update') {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const message = action === 'init'
      ? `${colors.bright}Proceed with installation? (y/n): ${colors.reset}`
      : `${colors.bright}Proceed with update? (y/n): ${colors.reset}`;

    const cancelMessage = action === 'init'
      ? `${colors.yellow}Installation cancelled.${colors.reset}`
      : `${colors.yellow}Update cancelled.${colors.reset}`;

    rl.question(message, (answer) => {
      rl.close();

      const normalized = answer.trim().toLowerCase();
      const confirmed = normalized === 'y' || normalized === 'yes';

      console.log('');
      if (!confirmed) {
        console.log(cancelMessage);
        console.log('');
      }

      resolve(confirmed);
    });
  });
}

/**
 * Copy system files from template to project
 */
function copySystemFiles(systemPaths) {
  const targetDir = process.cwd();

  console.log(`${colors.cyan}Updating system files...${colors.reset}`);
  console.log('');

  for (const itemPath of systemPaths) {
    const srcPath = path.join(TEMPLATE_DIR, itemPath);
    const destPath = path.join(targetDir, itemPath);

    if (!fs.existsSync(srcPath)) {
      console.log(`${colors.yellow}⚠ Warning: ${itemPath} not found in template, skipping...${colors.reset}`);
      continue;
    }

    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      console.log(`${colors.green}✓${colors.reset} ${colors.bright}${itemPath}/${colors.reset}`);

      // Delete old directory if exists (ensure clean state)
      if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true, force: true });
      }

      // Copy directory recursively
      copyDirectorySync(srcPath, destPath, '  ');
    } else {
      console.log(`${colors.green}✓${colors.reset} ${colors.bright}${itemPath}${colors.reset}`);
      fs.copyFileSync(srcPath, destPath);
    }
  }

  console.log('');
}

/**
 * Update existing AppSheet project
 */
async function updateProject() {
  // Step 1: Detect initialized project
  const detection = detectInitializedProject();

  if (!detection.isInitialized) {
    console.log('');
    console.log(`${colors.red}Error: Not an AppSheet project directory${colors.reset}`);
    console.log('');
    console.log(`${colors.yellow}Required files not found:${colors.reset}`);

    // Only show files that are actually missing
    if (detection.missing.docFolder) {
      console.log(`  ${colors.cyan}APPSHEET-DOCUMENTATION/${colors.reset} (folder)`);
    }
    if (detection.missing.blueprintFile) {
      console.log(`  ${colors.cyan}APPSHEET_SYSTEM_BLUEPRINT.md${colors.reset} (file)`);
    }

    console.log('');
    console.log(`${colors.cyan}To initialize a new project, run:${colors.reset}`);
    console.log(`  ${colors.bright}npx appsheet-project init${colors.reset}`);
    console.log('');
    process.exit(1);
  }

  // Step 1b: Check if already up to date
  const installedVersion = getInstalledVersion();
  const currentVersion = getPackageVersion();

  if (installedVersion === currentVersion) {
    console.log('');
    console.log(`${colors.bright}${colors.green}✓ Already up to date!${colors.reset}`);
    console.log(`${colors.dim}Your project is already on the latest version: ${colors.reset}${colors.bright}v${currentVersion}${colors.reset}`);
    console.log('');
    return;
  }

  // Step 2: Get system paths
  const systemPaths = getSystemPaths();

  // Step 3: Show preview
  showUpdatePreview(systemPaths);

  // Step 4: Get confirmation
  const confirmed = await promptUserConfirmation();
  if (!confirmed) {
    process.exit(0);
  }

  // Step 5: Perform update
  try {
    copySystemFiles(systemPaths);
    writeInstalledVersion();

    // Step 6: Show success message
    const version = getPackageVersion();
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.green}✓ AppSheet Project updated successfully!${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
    console.log('');
    console.log(`${colors.bright}Updated to:${colors.reset} v${version}`);
    console.log(`${colors.dim}System files synchronized with latest templates${colors.reset}`);
    console.log('');
    console.log(`${colors.bright}${colors.magenta}What was updated:${colors.reset}`);
    console.log(`  ${colors.green}✓${colors.reset} AI Assistant Skills (${colors.cyan}.claude/, .codex/${colors.reset})`);
    console.log(`  ${colors.green}✓${colors.reset} AppSheet Documentation (${colors.cyan}APPSHEET-DOCUMENTATION/${colors.reset})`);
    console.log(`  ${colors.green}✓${colors.reset} System Blueprints & Guides`);
    console.log('');
    console.log(`${colors.bright}${colors.yellow}Note:${colors.reset} ${colors.dim}Your custom files (README.md, docs/, backups/) were preserved.${colors.reset}`);
    console.log('');

  } catch (error) {
    console.error(`${colors.red}Error during update:${colors.reset}`, error.message);
    console.log('');
    console.log(`${colors.yellow}Update was interrupted. You can try running the update command again.${colors.reset}`);
    console.log('');
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
  console.log(`  ${colors.green}update${colors.reset}`);
  console.log(`    Update system files in an existing AppSheet project`);
  console.log(`    ${colors.dim}Synchronizes system files with the latest package version${colors.reset}`);
  console.log(`    ${colors.dim}Preserves your custom files (README.md, docs/, backups/, etc.)${colors.reset}`);
  console.log('');
  console.log(`    ${colors.bright}Example:${colors.reset}`);
  console.log(`      cd my-appsheet-project`);
  console.log(`      npx appsheet-project update`);
  console.log('');
  console.log(`  ${colors.green}help${colors.reset}`);
  console.log(`    Show this help message`);
  console.log('');
  console.log(`${colors.bright}What Gets Installed:${colors.reset}`);
  console.log(`  ${colors.cyan}.claude/skills/, .codex/skills/${colors.reset} - AI assistant skills`);
  console.log(`  ${colors.cyan}APPSHEET-DOCUMENTATION/${colors.reset}        - Complete reference library`);
  console.log(`  ${colors.cyan}docs/${colors.reset}                          - Project documentation`);
  console.log(`  ${colors.cyan}README.md${colors.reset}                     - Main documentation`);
  console.log(`  ${colors.cyan}CHANGELOG.md${colors.reset}                  - Version history`);
  console.log(`  ${colors.cyan}CLAUDE.md${colors.reset}                     - Claude Code guidance`);
  console.log(`  ${colors.cyan}AGENTS.md${colors.reset}                     - Agent documentation`);
  console.log(`  ${colors.cyan}APPSHEET_SYSTEM_BLUEPRINT.md${colors.reset}  - System template`);
  console.log('');
  console.log(`${colors.bright}${colors.yellow}Important Notes:${colors.reset}`);
  console.log(`  ${colors.yellow}•${colors.reset} Run ${colors.cyan}init${colors.reset} in an empty directory or your project root`);
  console.log(`  ${colors.yellow}•${colors.reset} Run ${colors.cyan}update${colors.reset} to get the latest system files in existing projects`);
  console.log(`  ${colors.yellow}•${colors.reset} Update preserves your custom files (README.md, docs/, etc.)`);
  console.log(`  ${colors.yellow}•${colors.reset} System files (.claude/, APPSHEET-DOCUMENTATION/, etc.) are overwritten during updates`);
  console.log('');
  console.log(`${colors.bright}Links:${colors.reset}`);
  console.log(`  ${colors.cyan}npm:${colors.reset}    https://www.npmjs.com/package/appsheet-project`);
  console.log(`  ${colors.cyan}GitHub:${colors.reset} https://github.com/nadeemmuhammedk/appsheet-project`);
  console.log('');
}

/**
 * Main CLI handler
 */
async function main() {
  switch (command) {
    case 'init':
      await initProject();
      break;

    case 'update':
      await updateProject();
      break;

    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;

    case undefined:
      console.log(`${colors.yellow}No command specified.${colors.reset}\n`);
      console.log(`Run: ${colors.cyan}npx appsheet-project init${colors.reset} to initialize a new project`);
      console.log(`Run: ${colors.cyan}npx appsheet-project update${colors.reset} to update an existing project`);
      console.log(`Run: ${colors.cyan}npx appsheet-project help${colors.reset} for usage instructions\n`);
      break;

    default:
      console.error(`${colors.red}Unknown command: ${command}${colors.reset}\n`);
      console.log(`Valid commands: ${colors.cyan}init${colors.reset}, ${colors.cyan}update${colors.reset}, ${colors.cyan}help${colors.reset}\n`);
      console.log(`Run: ${colors.cyan}npx appsheet-project help${colors.reset} for more information\n`);
      process.exit(1);
  }
}

// Run CLI
main();

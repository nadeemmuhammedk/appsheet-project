#!/usr/bin/env node

/**
 * Package Validation Test Script (Scaffolding Tool)
 *
 * Validates scaffolding package structure before publishing to npm
 * Run with: npm test
 *
 * Checks:
 * - package.json is valid
 * - bin/appsheet-project.js exists and is executable
 * - template/ directory exists with all content
 * - Claude skills exist in template
 * - Documentation structure is complete in template
 * - Required markdown files present in template
 * - No sensitive files (.env) included
 * - Package size is reasonable (<5MB)
 */

const fs = require('fs');
const path = require('path');

// Color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

let testsPassed = 0;
let testsFailed = 0;

/**
 * Test result helper
 */
function test(name, fn) {
  try {
    fn();
    console.log(`${colors.green}✓${colors.reset} ${name}`);
    testsPassed++;
    return true;
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    console.log(`  ${colors.red}${error.message}${colors.reset}`);
    testsFailed++;
    return false;
  }
}

/**
 * Assert helper
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

console.log(`${colors.bright}${colors.cyan}Running Scaffolding Package Validation Tests...${colors.reset}\n`);

// Test 1: package.json exists and is valid
test('package.json exists and is valid JSON', () => {
  const packageJsonPath = path.join(__dirname, 'package.json');
  assert(fs.existsSync(packageJsonPath), 'package.json not found');

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  assert(packageJson.name, 'package.json missing name');
  assert(packageJson.version, 'package.json missing version');
  assert(packageJson.description, 'package.json missing description');
  assert(!packageJson.main, 'package.json should not have main field (scaffolding tool)');
});

// Test 2: bin/appsheet-project.js exists and has shebang
test('bin/appsheet-project.js CLI tool exists with shebang', () => {
  const cliPath = path.join(__dirname, 'bin', 'appsheet-project.js');
  assert(fs.existsSync(cliPath), 'CLI tool not found at bin/appsheet-project.js');

  const content = fs.readFileSync(cliPath, 'utf8');
  assert(content.startsWith('#!/usr/bin/env node'), 'CLI tool should start with shebang');
});

// Test 3: template/ directory exists
test('template/ directory exists', () => {
  const templatePath = path.join(__dirname, 'template');
  assert(fs.existsSync(templatePath), 'template/ directory not found');
  assert(fs.statSync(templatePath).isDirectory(), 'template/ should be a directory');
});

// Test 4: Claude skills exist in template
test('Claude skills exist in template/.claude/skills/', () => {
  const skillsPath = path.join(__dirname, 'template', '.claude', 'skills');
  assert(fs.existsSync(skillsPath), 'template/.claude/skills directory not found');

  const skills = ['appsheet-blueprint-skill', 'appsheet-reference-skill'];
  for (const skill of skills) {
    const skillPath = path.join(skillsPath, skill);
    assert(fs.existsSync(skillPath), `Skill directory not found in template: ${skill}`);
  }
});

// Test 5: Documentation structure exists in template
test('Documentation structure exists in template', () => {
  const docsPath = path.join(__dirname, 'template', 'APPSHEET-DOCUMENTATION');
  assert(fs.existsSync(docsPath), 'template/APPSHEET-DOCUMENTATION directory not found');

  const categories = ['formulas-reference', 'rules-and-logic', 'views-interface'];
  for (const category of categories) {
    const categoryPath = path.join(docsPath, category);
    assert(fs.existsSync(categoryPath), `Documentation category not found in template: ${category}`);
  }
});

// Test 6: Required markdown files exist in template
test('Required markdown files exist in template', () => {
  const requiredFiles = [
    'README.md',
    'CHANGELOG.md',
    'CLAUDE.md',
    'AGENTS.md',
    'APPSHEET_SYSTEM_BLUEPRINT.md'
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, 'template', file);
    assert(fs.existsSync(filePath), `Required file not found in template: ${file}`);
  }
});

// Test 7: docs directory exists in template
test('docs directory exists in template', () => {
  const docsPath = path.join(__dirname, 'template', 'docs');
  assert(fs.existsSync(docsPath), 'template/docs directory not found');
});

// Test 8: .codex directory exists in template
test('.codex directory exists in template', () => {
  const codexPath = path.join(__dirname, 'template', '.codex');
  assert(fs.existsSync(codexPath), 'template/.codex directory not found');
});

// Test 9: No sensitive files in package root
test('No sensitive files (.env, credentials, etc.) in package root', () => {
  const sensitivePatterns = ['.env', 'credentials', 'secrets', '.pem', '.key'];
  const rootFiles = fs.readdirSync(__dirname);

  for (const file of rootFiles) {
    for (const pattern of sensitivePatterns) {
      assert(!file.includes(pattern), `Potentially sensitive file found: ${file}`);
    }
  }
});

// Test 10: No sensitive files in template
test('No sensitive files in template directory', () => {
  const sensitivePatterns = ['.env', 'credentials', 'secrets', '.pem', '.key'];
  const templatePath = path.join(__dirname, 'template');

  function checkDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      for (const pattern of sensitivePatterns) {
        assert(!entry.name.includes(pattern), `Potentially sensitive file found in template: ${entry.name}`);
      }

      if (entry.isDirectory() && entry.name !== 'node_modules') {
        checkDirectory(fullPath);
      }
    }
  }

  checkDirectory(templatePath);
});

// Test 11: package.json files array is defined correctly
test('package.json has correct files array for scaffolding tool', () => {
  const packageJson = require('./package.json');
  assert(Array.isArray(packageJson.files), 'package.json should have files array');
  assert(packageJson.files.includes('bin/'), 'files array should include bin/');
  assert(packageJson.files.includes('template/'), 'files array should include template/');
});

// Test 12: All files in package.json files array exist
test('All files in package.json files array exist', () => {
  const packageJson = require('./package.json');

  for (const filePattern of packageJson.files) {
    const cleanPath = filePattern.replace(/\/$/, '').replace(/\/\*$/, '');
    const filePath = path.join(__dirname, cleanPath);

    assert(fs.existsSync(filePath), `File/directory in files array not found: ${filePattern}`);
  }
});

// Test 13: Package size check (warn if > 5MB)
test('Package size is reasonable', () => {
  function getDirectorySize(dirPath) {
    let size = 0;

    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dirPath, file.name);

      // Skip node_modules, hidden git files, and excluded dirs
      if (file.name === 'node_modules' || file.name === '.git' || file.name === 'backups' || file.name === 'utils') {
        continue;
      }

      if (file.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        const stats = fs.statSync(filePath);
        size += stats.size;
      }
    }

    return size;
  }

  const packageSize = getDirectorySize(__dirname);
  const sizeMB = (packageSize / (1024 * 1024)).toFixed(2);

  console.log(`    Package size: ${sizeMB} MB`);

  // Warning threshold: 5MB
  if (packageSize > 5 * 1024 * 1024) {
    console.log(`    ${colors.yellow}⚠ Warning: Package is larger than 5MB${colors.reset}`);
  }

  // Hard fail threshold: 10MB
  assert(packageSize < 10 * 1024 * 1024, `Package is too large: ${sizeMB} MB (limit: 10MB)`);
});

// Test 14: bin field in package.json is correct
test('package.json bin field is correctly configured', () => {
  const packageJson = require('./package.json');
  assert(packageJson.bin, 'package.json should have bin field');
  assert(packageJson.bin['appsheet-project'], 'package.json bin should have appsheet-project command');
  assert(packageJson.bin['appsheet-project'] === './bin/appsheet-project.js', 'bin command should point to ./bin/appsheet-project.js');
});

// Test 15: .npmignore exists
test('.npmignore file exists', () => {
  const npmignorePath = path.join(__dirname, '.npmignore');
  assert(fs.existsSync(npmignorePath), '.npmignore not found');
});

// Test 16: Template contains both .claude and .codex
test('Template contains both .claude and .codex directories', () => {
  const claudePath = path.join(__dirname, 'template', '.claude');
  const codexPath = path.join(__dirname, 'template', '.codex');

  assert(fs.existsSync(claudePath), 'template/.claude not found');
  assert(fs.existsSync(codexPath), 'template/.codex not found');
});

// Test 17: CLI contains init command logic
test('CLI tool contains init command implementation', () => {
  const cliPath = path.join(__dirname, 'bin', 'appsheet-project.js');
  const content = fs.readFileSync(cliPath, 'utf8');

  assert(content.includes('init'), 'CLI should have init command');
  assert(content.includes('copyDirectorySync') || content.includes('copy'), 'CLI should have copy functionality');
  assert(content.includes('TEMPLATE_DIR') || content.includes('template'), 'CLI should reference template directory');
});

// Print summary
console.log('');
console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bright}Test Summary${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.green}Passed:${colors.reset} ${testsPassed}`);
console.log(`${colors.red}Failed:${colors.reset} ${testsFailed}`);
console.log(`${colors.bright}Total:${colors.reset}  ${testsPassed + testsFailed}`);
console.log('');

if (testsFailed > 0) {
  console.log(`${colors.red}${colors.bright}✗ Tests failed. Please fix the issues before publishing.${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`${colors.green}${colors.bright}✓ All tests passed! Scaffolding package is ready for publishing.${colors.reset}\n`);
  process.exit(0);
}

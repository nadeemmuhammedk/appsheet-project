# Plan Feature Skill — Templates

## Full Plan Template

Use this as the skeleton for every generated plan. Fill in or remove blocks based on what the feature requires.

---

```markdown
# Plan: [Feature Name]

## Context

[1–3 sentences: what problem this solves, what prompted it, and what the intended outcome is.]

---

## Progress Checklist

### Phase 1: [Phase Name]
- [ ] [Label: ] [Task description]
- [ ] [Label: ] [Task description]

### Phase 2: [Phase Name]
- [ ] [Label: ] [Task description]
- [ ] [Label: ] [Task description]

### Phase N: Testing
- [ ] Test 1 — [Condition]: [Input] → [Expected result]
- [ ] Test 2 — [Condition]: [Input] → [Expected result]

---

## Phase 1: [Phase Name]

**Scope:** [One sentence — what this phase covers and who does it]

[Detailed instructions]

---

## Phase 2: [Phase Name]

**Scope:** [One sentence]

[Detailed instructions]

---

## Phase N: Testing

[Test cases with conditions and expected outcomes]

---

## Files to Modify

| Phase | File | Who | Change |
|-------|------|-----|--------|
| 1 | [File or system] | You / Claude | [What changes] |
```

---

## Phase Block Templates

### Google Sheets Phase

```markdown
## Phase N: Google Sheets

**Scope:** Google Sheets manual edits only

### [Tab name] tab

[Describe the change — add column, rename header, add rows, etc.]

- **Column position:** Col [X] (cell [X]1)
- **Header:** `ColumnName` (exact, case-sensitive)
- **Type:** [Checkbox / Text / Number / Date / Dropdown]
- **Default:** [Leave empty / FALSE / 0 / etc.]

### [Another tab, if needed]

[Additional changes]
```

---

### AppSheet + Docs Phase

```markdown
## Phase N: AppSheet + Docs

**Scope:** AppSheet config changes + `[doc file]` documentation update

### AppSheet — [table name] table

**[Column Name]** (new / update existing)
- Column Name: [ColumnName]
- Display Name: [Human-readable label]
- Type: [Yes/No / Text / Number / Enum / Date / Ref / etc.]
- Initial Value: [value or formula]
- SHOW IF: [formula, or N/A]
- EDITABLE: [TRUE / FALSE / formula]
- REQUIRE: [YES / NO]
- Description: "[What this field is for]"

### [View Name] view (if view changes are needed)

[Describe view change — field order, filter, display setting]

### Docs — [doc filename]

[Describe what Claude adds or updates in the documentation file]
```

---

### Apps Script Docs Phase

```markdown
## Phase N: Apps Script Docs

**Scope:** `docs/formulas/appscript_code.md` — all code changes documented

### NA — New constant(s)

```javascript
const EXAMPLE_COL = 5;  // Col E: ColumnName
```

### NB — Updated [function name]

```javascript
// Before:
function exampleFunction(param1) {
    // old logic
}

// After:
function exampleFunction(param1, param2) {
    // new logic
}
```

### NC — New function: [functionName]

```javascript
/**
 * [What this function does]
 * @param {type} paramName - Description
 * @return {type} Description
 */
function newFunction(paramName) {
    // implementation
}
```
```

---

### Apply Code Phase

```markdown
## Phase N: Apply Code in Apps Script Editor

**Scope:** Manual — copy updated code from `appscript_code.md` into the Apps Script editor

Apply in this order:
1. [First thing to apply — e.g. Constants block]
2. [Second — e.g. updated function X]
3. [Third — e.g. new function Y]
```

---

### Testing Phase

```markdown
## Phase N: Testing

- **Test 1 — [Short label]:** [Setup/input conditions] → [Expected result]
- **Test 2 — [Short label]:** [Setup/input conditions] → [Expected result]
- **Test 3 — [Edge case]:** [Setup/input conditions] → [Expected result]

**What [Feature Name] never does:**
- [Negative boundary — e.g. "never affects existing records created before this feature"]
- [Another boundary]
```

---

## Files to Modify Table Template

```markdown
## Files to Modify

| Phase | File | Who | Change |
|-------|------|-----|--------|
| 1 | Google Sheets `[tab]` tab | You | [Change description] |
| 2 | AppSheet `[table]` table | You | [Change description] |
| 2 | `docs/formulas/appsheet_formulas.md` | Claude | [Change description] |
| 3 | `docs/formulas/appscript_code.md` | Claude | [Change description] |
| 4 | Apps Script editor | You | Apply Phase 3 code changes |
```

**Who values:**
| Value | Meaning |
|-------|---------|
| `You` | Manual step: Google Sheets, AppSheet UI, or Apps Script editor |
| `Claude` | Documentation update in a `docs/formulas/` file |

---

## Progress Checklist Item Labels

| Label prefix | Meaning |
|---|---|
| `Google Sheets:` | Manual edit in the Google Sheet |
| `AppSheet:` | Manual config in the AppSheet editor |
| `Docs:` | Claude writes/updates documentation |
| `Apps Script:` | User applies code in the Apps Script editor |
| *(no prefix)* | Manual step implied (external tool) |

---

## Phase Ordering Reference

Phases are built from only the blocks the feature needs:

| Block | Include when... | Who |
|-------|----------------|-----|
| Google Sheets | Feature adds/renames columns or data rows in a sheet | You |
| AppSheet + Docs | Feature adds/modifies columns, views, or actions in AppSheet | You + Claude |
| Apps Script Docs | Feature changes any Apps Script code | Claude |
| Apply Code | Always paired with Apps Script Docs | You |
| Testing | Always — last phase | You |

Phases are renumbered to fill gaps (no Phase 3 if Phases 1 and 2 are enough).

# AppSheet Automation Reference

Automation lets AppSheet run processes without explicit user interaction. A **Bot** listens for a trigger event and executes a process (sequence of steps) when conditions are met.

## 1. Core Components

| Component | Description |
|-----------|-------------|
| **Bot** | The automation container — holds one trigger and one process |
| **Event (Trigger)** | The condition that fires the bot (data change or schedule) |
| **Process** | The workflow executed when the bot fires |
| **Steps/Tasks** | Individual actions inside a process (send email, call webhook, set values, etc.) |

**Editor path:** Automation > Bots

---

## 2. Where Bots Run

- **Cloud service** — triggered by schedule or backend data changes (most common)
- **Device** — useful for periodic local data capture (e.g., GPS tracking)

---

## 3. Event Types (Trigger Patterns)

### Pattern 1: Trigger on New Records Only
Use when: You want to react to a record being created (e.g., send a welcome email when a user signs up).

```appsheet
Trigger:
  Event: Adds Only
  Table: [Table Name]
  Condition: [optional condition expression]
```

---

### Pattern 2: Trigger on Updates Only
Use when: You want to react to a record being edited (e.g., notify when a status changes).

```appsheet
Trigger:
  Event: Updates Only
  Table: [Table Name]
  Condition: [optional condition expression]
```

---

### Pattern 3: Trigger on Adds or Updates
Use when: The same automation should fire on both creates and edits.

```appsheet
Trigger:
  Event: Adds and Updates
  Table: [Table Name]
  Condition: [optional condition expression]
```

---

### Pattern 4: Trigger When a Specific Column Changes
Use when: You only want to fire when a particular field is modified, not on every update.

```appsheet
Trigger:
  Event: Adds and Updates
  Table: [Table Name]
  Condition: [ColumnName] <> [_THISROW_BEFORE].[ColumnName]
```

**Note:** `[_THISROW_BEFORE]` holds the previous state of the row. This pattern is the standard way to detect a column value change.

---

### Pattern 5: Trigger on a Schedule
Use when: You want to run automation on a time basis (daily digest, weekly report, stale-record alerts).

```appsheet
Trigger:
  Event: Schedule
  Frequency: Daily / Weekly / Custom
  Time: [HH:MM]
```

---

## 4. Relay Flag Pattern

**Purpose:** Flag rows for external processing (Apps Script, webhook) without embedding complex logic inside AppSheet automation. Keeps responsibilities separated: AppSheet flags, external system processes.

### Step 1 — Hidden Flag Column on the Table
```appsheet
Column Name: _[Process Name] Flag
Type: Yes/No
EDITABLE: FALSE
SHOW: FALSE
Initial Value: FALSE
```

### Step 2 — Bot to Set the Flag
```appsheet
Bot Name: Flag [Record] for [Process]
Enabled: Yes

Trigger:
  Event Name: [Event Name]
  Table: [Table Name]
  Event: Adds Only  (or Adds and Updates)
  Condition: [Business logic condition — e.g., [Status] = "Complete"]

Process:
  Step Name: Set Flag
  Step: Run a data action → Set row values
    _[Process Name] Flag = TRUE
```

### Step 3 — External System Reads and Clears Flag
The external system (Apps Script / webhook) polls periodically:

```
1. SELECT rows WHERE _[Process Name] Flag = TRUE
2. Process each row (e.g., update a related table, send notification)
3. SET _[Process Name] Flag = FALSE on each processed row
```

**Why this pattern:**
- Avoids complex AppSheet webhook logic for multi-step operations
- Decouples AppSheet's responsibility (flag) from processing responsibility (external)
- Easy to debug — the flag column shows exactly which rows are pending

---

## 5. Common Process Steps

### Send Email
```appsheet
Step: Send an email
  To: [EmailField]  (or static address)
  Subject: "Notification: " & [RecordName]
  Body: Template or expression
```

### Call a Webhook (HTTP POST)
```appsheet
Step: Call a webhook
  URL: https://your-endpoint.example.com/hook
  Body: {
    "recordId": "<<[KeyColumn]>>",
    "status": "<<[StatusField]>>"
  }
```

### Run a Data Action
```appsheet
Step: Run a data action
  Action: [Name of Data Action on the table]
```

### Create a File (PDF/CSV)
```appsheet
Step: Create a new file
  Template: [Google Doc/Sheet template name]
  Output format: PDF
  Save to: [FileColumn]
```

---

## 6. Real-World Patterns

### CONDITIONAL TRIGGER — Status Rank Comparison (Pipeline Progression Guard)

**Use case:** Fire automation only when a record moves FORWARD in a defined pipeline. Prevents the bot from triggering on status rollbacks or neutral edits.

```appsheet
# Map pipeline stages to numeric ranks in IFS
# Higher number = later stage. TRUE, 0 catches unmapped values (always fails the comparison).

Trigger Condition:
  AND(
    NOT(ISBLANK([OutcomeField])),
    IFS(
      [OutcomeField] = "Stage1", 1,
      [OutcomeField] = "Stage2", 2,
      [OutcomeField] = "Stage3", 3,
      [OutcomeField] = "Stage4", 4,
      [OutcomeField] = "Stage5", 5,
      TRUE, 0
    )
    >
    IFS(
      LOOKUP([RefColumn], "ParentTable", "KeyColumn", "StatusField") = "Stage1", 1,
      LOOKUP([RefColumn], "ParentTable", "KeyColumn", "StatusField") = "Stage2", 2,
      LOOKUP([RefColumn], "ParentTable", "KeyColumn", "StatusField") = "Stage3", 3,
      LOOKUP([RefColumn], "ParentTable", "KeyColumn", "StatusField") = "Stage4", 4,
      LOOKUP([RefColumn], "ParentTable", "KeyColumn", "StatusField") = "Stage5", 5,
      TRUE, 0
    )
  )
```

**Notes:**
- `TRUE, 0` is the fallback — unmapped values get rank 0, which always fails the `>` comparison
- The LOOKUP fetches the CURRENT status from the parent record for comparison against the new outcome
- `NOT(ISBLANK([OutcomeField]))` prevents firing on records where no outcome was entered
- Add more IFS branches to extend the pipeline

---

### RELAY FLAG — Full Pattern with External System (Apps Script)

**Use case:** Bot marks a row immediately when an event fires; a server-side job (Apps Script) processes the flagged rows asynchronously and clears the flags. Decouples fast AppSheet event handling from heavy computation.

```appsheet
# Hidden flag column on the table
Column Name: _[ProcessName]Flag
Type: Yes/No
EDITABLE: FALSE
SHOW: FALSE
Initial Value: FALSE

# Optional error column (Apps Script writes here on failure)
Column Name: _[ProcessName]Error
Type: LongText
EDITABLE: FALSE
SHOW: FALSE

# Bot sets the flag when condition is met
Bot Name: Mark [Record] for [ProcessName]
Trigger:
  Event: Adds Only
  Table: [TableName]
  Condition: [BusinessLogicCondition]
Process:
  Step: Run a data action → Set row values
    _[ProcessName]Flag = TRUE
```

**Apps Script side (time-driven job):**

```javascript
// Pseudocode — implement in Apps Script
function processProcessNameFlags() {
  // 1. Find all rows where flag = TRUE
  // 2. For each flagged row:
  //    a. Read values needed
  //    b. Apply business logic (update other tables, call APIs, etc.)
  //    c. Clear flag: _[ProcessName]Flag = FALSE
  //    d. On error: write to _[ProcessName]Error, leave flag TRUE for retry
}
// Trigger: time-driven, every N minutes
```

**Notes:**
- Bot fires synchronously within the AppSheet save event (no delay for the user)
- Apps Script runs on a schedule — latency is acceptable for background processing
- Leaving the flag `TRUE` on error allows automatic retry on the next scheduled run
- The error column provides a visible audit trail without exposing it to end users (`SHOW: FALSE`)
- See `code-reference/appscript/RELAY_FLAG_PROCESSOR.md` for the full Apps Script implementation

---

## 7. Constraints & Gotchas

- **Bots only fire on server-side changes** — changes made offline that sync later will trigger bots when the sync completes
- **`[_THISROW_BEFORE]`** is only available in Update events — using it in an Adds Only event will return blank
- **Condition expressions** in the trigger reduce unnecessary bot runs — always add a condition to avoid firing on every row change
- **Bot execution order** is not guaranteed when multiple bots fire on the same event — design bots to be independent
- **Scheduled bots** run at the app owner's timezone by default
- **Relay flag pattern** requires the external system to clear the flag — if the external system fails without clearing, the flag remains TRUE and the row will be reprocessed on the next run

---

## 7. Related Documentation

- [Actions](../actions/ACTIONS.md) — actions that can be triggered by bots
- [Table Security](../../tables-data-schema/table-settings/TABLE_SECURITY.md) — controlling which rows bots can modify

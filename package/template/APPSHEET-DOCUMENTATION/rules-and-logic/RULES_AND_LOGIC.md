# AppSheet Rules, Logic & Automation Reference

This document covers the mechanisms for enforcing business logic, securing data, and automating processes.

## 1. Data Validity & Constraints
These settings are applied at the Column level (Data > Columns).

- **Valid_If:** The most powerful data constraint.
  - *Validation:* If the expression returns `TRUE`, the input is valid. If `FALSE`, it shows an error.
    - *Example:* `[Age] >= 18`
  - *Dropdown Lists:* If the expression returns a `LIST`, it turns the input into a dropdown menu of those options.
    - *Example:* `SELECT(Classes[ClassID], [Capacity] > 0)`
- **Show_If:** Controls visibility of a column/input field.
  - *Example:* `[Status] = "Other"` (Only show the "Other Description" field if Status is Other).
- **Required_If:** specific condition makes a field mandatory.
  - *Example:* `ISNOTBLANK([Phone Number])`
- **Editable_If:** specific condition makes a field read-only.
  - *Example:* `USEREMAIL() = [Creator Email]` (Only the creator can edit).

## 2. Slices (Data Subsets)
Slices act as "Virtual Tables". They filter rows and columns from a source table without altering the underlying data.

- **Row Filter Condition:** An expression that defines which rows belong in the slice.
  - *Example:* `AND([Status] = "Open", [Assigned To] = USEREMAIL())`
- **Column Selection:** You can choose to include only specific columns (e.g., hide sensitive "Salary" data in a "Public Employee Directory" slice).
- **Actions:** You can define which specific Actions (buttons) appear on this slice.

**Use Cases:**
- "My Tasks" (Filtered by user)
- "Overdue Orders" (Filtered by date)
- "Pending Approvals" (Filtered by status)

## 3. Actions (Behavior)
Actions are buttons that perform tasks.

- **Data Change Actions:**
  - *Set the values of some columns in this row:* Updates specific fields (e.g., "Mark Complete" button).
  - *Add a new row to another table using values from this row.*
  - *Delete this row.*
- **Navigation Actions:**
  - *Go to another view within this app.*
  - *Go to a website.*
  - *Open a file.*
- **Grouped Actions:** Execute a sequence of multiple actions with a single click.

## 4. Automation (Bots)
Automation replaces manual workflows with background processes.
Structure: **Bot** > **Event** > **Process** > **Step(s)**.

### Events (Triggers)
- **Data Change:** Triggers when a record is Added, Updated, or Deleted.
  - *Condition:* `[Status] = "Approved"` (Only trigger if this is true).
- **Schedule:** Runs at a specific time (Daily, Weekly) or via a Cron expression.

### Processes & Steps (Tasks)
- **Send an Email:** Sends a custom email (can use templates).
- **Send a Notification:** Push notification to the app users.
- **Call a Webhook:** Send JSON data to an external API.
- **Create a new file:** Generate a PDF or CSV report.
- **Run a Data Action:** Modify data in the app (e.g., Reset a counter).

## 5. Security Filters
**Critical for Security & Performance.**
Unlike Slices (which just hide data in the UI), Security Filters prevent data from ever reaching the user's device.

- **Location:** Table Settings > Security > Security Filter.
- **Concept:** Filters rows at the server level before sync.
- **Example:** `[Region] = LOOKUP(USEREMAIL(), "Users", "Email", "Region")` (User only downloads data for their region).

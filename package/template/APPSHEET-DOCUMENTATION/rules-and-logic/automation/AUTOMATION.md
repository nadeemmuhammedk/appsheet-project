# AppSheet Automation Reference

Automation lets AppSheet run processes without explicit user interaction.

## 1. Core Components
- **Bot:** The automation container.
- **Event:** The trigger (data change or schedule).
- **Process:** The workflow executed by the bot.
- **Steps/Tasks:** The individual actions inside a process.

## 2. Where Bots Run
- **Device:** Useful for periodic data capture (like GPS).
- **Cloud service:** Triggered by schedule or backend data changes.

## 3. Event Types
- **Data change:** Added, updated, or deleted rows.
- **Schedule:** Daily/weekly or custom schedules.

## 4. Common Tasks
- Send an email or notification.
- Call a webhook to external services.
- Create a file (PDF/CSV) using templates.
- Run a data-change action.

## 5. Notes
- Bots can trigger multi-step workflows.
- Use templates to format messages or generated files.

# AppSheet Security Filters Reference

Security filters restrict which rows are downloaded to a user device.

## 1. Why Use Security Filters
- Prevents sensitive data from syncing to a client device.
- Improves performance by reducing data volume.

## 2. Where to Configure
- **Editor path:** Security > Security filters.
- Add a Yes/No expression per table.

## 3. Behavior
- If the expression is `TRUE`, the row is included in the app.
- If `FALSE`, the row never syncs to the device.

## 4. Example
`[Region] = LOOKUP(USEREMAIL(), "Users", "Email", "Region")`

## 5. Availability
- Security filters are available in AppSheet Core and higher plans.

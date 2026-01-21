# Date & Time Column Types

Date and time types handle temporal data including dates, times, and durations.

## 1. Date Type

**Purpose:** Calendar dates without time component

**Configuration:**
```appsheet
Type: Date
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Storage Format:** YYYY-MM-DD (e.g., 2026-01-20)

**Common Use Cases:**
- Birth dates
- Due dates
- Event dates
- Start/end dates
- Deadlines
- Anniversaries

**Example Values:**
- 2026-01-20
- 2025-12-31
- 1990-05-15

**Input Methods:**
- Calendar picker
- Manual text entry (formatted)
- Formula calculation

**Validation Patterns:**
```appsheet
# Future dates only
VALID_IF: [Date] >= TODAY()

# Past dates only
VALID_IF: [Date] <= TODAY()

# Date range
VALID_IF: AND([Date] >= DATE(2026, 1, 1), [Date] <= DATE(2026, 12, 31))

# End after start
VALID_IF: [EndDate] >= [StartDate]

# Within 90 days
VALID_IF: [Date] <= TODAY() + 90

# Weekday only
VALID_IF: NOT(IN(WEEKDAY([Date]), LIST(1, 7))) - "Weekends not allowed"
```

**Formula Examples:**
```appsheet
# Current date
Initial Value: TODAY()

# 30 days from now
Initial Value: TODAY() + 30

# First day of month
App Formula: DATE(YEAR(TODAY()), MONTH(TODAY()), 1)

# Last day of month
App Formula: EOMONTH(TODAY(), 0)

# Days between dates
App Formula: [EndDate] - [StartDate]

# Add months
App Formula: EDATE([StartDate], 3)

# Next business day
App Formula: WORKDAY([Date], 1)
```

---

## 2. DateTime Type

**Purpose:** Date and time combined

**Configuration:**
```appsheet
Type: DateTime
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Storage Format:** YYYY-MM-DD HH:MM:SS (e.g., 2026-01-20 14:30:00)

**Common Use Cases:**
- Timestamps (created, modified)
- Event start/end times
- Scheduled appointments
- Reservation times
- Delivery times

**Example Values:**
- 2026-01-20 14:30:00
- 2026-01-20 09:00:00
- 2025-12-31 23:59:59

**Validation Patterns:**
```appsheet
# Future datetime only
VALID_IF: [DateTime] >= NOW()

# Business hours only
VALID_IF: AND(HOUR([DateTime]) >= 9, HOUR([DateTime]) < 17)

# Same day as another date
VALID_IF: DATE([DateTime]) = [EventDate]

# At least 1 hour from now
VALID_IF: [DateTime] >= NOW() + (1/24)
```

**Formula Examples:**
```appsheet
# Current datetime
Initial Value: NOW()

# Current datetime (precise)
Initial Value: TIMENOW()

# Add hours
App Formula: [DateTime] + (2/24)

# Add minutes
App Formula: [DateTime] + (30/1440)

# Hours between
App Formula: ([EndDateTime] - [StartDateTime]) * 24

# Minutes between
App Formula: ([EndDateTime] - [StartDateTime]) * 1440

# Format datetime
App Formula: TEXT([DateTime], "MM/DD/YYYY HH:MM AM/PM")
```

---

## 3. Time Type

**Purpose:** Time of day only (no date component)

**Configuration:**
```appsheet
Type: Time
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Storage Format:** HH:MM:SS (e.g., 14:30:00)

**Common Use Cases:**
- Business hours
- Shift times
- Meeting times
- Opening/closing times
- Time slots

**Example Values:**
- 09:00:00
- 14:30:00
- 23:59:59

**Validation Patterns:**
```appsheet
# Business hours
VALID_IF: AND([Time] >= TIME(9, 0, 0), [Time] < TIME(17, 0, 0))

# End time after start time
VALID_IF: [EndTime] > [StartTime]

# On the hour only
VALID_IF: MINUTE([Time]) = 0

# 15-minute intervals
VALID_IF: MOD(MINUTE([Time]), 15) = 0
```

**Formula Examples:**
```appsheet
# Current time
Initial Value: TIME(HOUR(NOW()), MINUTE(NOW()), 0)

# Fixed time
Initial Value: TIME(9, 0, 0)

# Add hours
App Formula: [Time] + TIME(2, 0, 0)

# Time difference (hours)
App Formula: HOUR([EndTime]) - HOUR([StartTime])
```

---

## 4. Duration Type

**Purpose:** Time spans/periods

**Configuration:**
```appsheet
Type: Duration
SHOW: TRUE
EDITABLE: TRUE
```

**Storage Format:** HH:MM:SS or decimal hours

**Common Use Cases:**
- Task duration
- Work hours
- Time tracking
- Service time
- Break periods

**Example Values:**
- 2:30:00 (2.5 hours)
- 0:15:00 (15 minutes)
- 40:00:00 (40 hours)

**Formula Examples:**
```appsheet
# Calculate duration from dates
App Formula: [EndDateTime] - [StartDateTime]

# Convert to hours
App Formula: ([EndDateTime] - [StartDateTime]) * 24

# Convert to minutes
App Formula: ([EndDateTime] - [StartDateTime]) * 1440

# Sum durations
App Formula: SUM([Tasks][Duration])
```

---

## 5. Date Calculations

### Adding/Subtracting Days
```appsheet
# Add days
App Formula: [Date] + 7

# Subtract days
App Formula: [Date] - 30

# Days between
App Formula: [EndDate] - [StartDate]
```

### Adding/Subtracting Months
```appsheet
# Add months (EDATE)
App Formula: EDATE([Date], 3)

# Subtract months
App Formula: EDATE([Date], -6)
```

### Start/End of Periods
```appsheet
# Start of month
App Formula: DATE(YEAR([Date]), MONTH([Date]), 1)

# End of month
App Formula: EOMONTH([Date], 0)

# Start of week (Monday)
App Formula: [Date] - WEEKDAY([Date]) + 2

# Start of year
App Formula: DATE(YEAR([Date]), 1, 1)
```

### Business Days
```appsheet
# Add business days
App Formula: WORKDAY([Date], 5)

# Business days between
App Formula: NETWORKDAYS([StartDate], [EndDate])
```

---

## 6. Time Calculations

### DateTime Arithmetic
```appsheet
# Add hours
App Formula: [DateTime] + (hours/24)

# Add minutes
App Formula: [DateTime] + (minutes/1440)

# Add seconds
App Formula: [DateTime] + (seconds/86400)

# Examples
App Formula: [DateTime] + (2/24)        # Add 2 hours
App Formula: [DateTime] + (30/1440)     # Add 30 minutes
App Formula: [DateTime] + (45/86400)    # Add 45 seconds
```

### Time Differences
```appsheet
# Hours between
App Formula: ([End] - [Start]) * 24

# Minutes between
App Formula: ([End] - [Start]) * 1440

# Seconds between
App Formula: ([End] - [Start]) * 86400

# Days, hours, minutes format
App Formula: CONCATENATE(
  INT([Duration] * 24), "h ",
  MOD(INT([Duration] * 1440), 60), "m"
)
```

---

## 7. Date Functions

### Current Date/Time
```appsheet
TODAY()          # Current date (no time)
NOW()            # Current datetime
TIMENOW()        # Precise current datetime
```

### Extract Components
```appsheet
YEAR([Date])     # Extract year (2026)
MONTH([Date])    # Extract month (1-12)
DAY([Date])      # Extract day (1-31)
HOUR([DateTime]) # Extract hour (0-23)
MINUTE([DateTime]) # Extract minute (0-59)
WEEKDAY([Date])  # Day of week (1=Sunday, 7=Saturday)
```

### Create Dates
```appsheet
DATE(2026, 1, 20)      # Create date
TIME(14, 30, 0)        # Create time
DATETIME(2026, 1, 20, 14, 30, 0)  # Create datetime
```

### Date Formatting
```appsheet
TEXT([Date], "MM/DD/YYYY")
TEXT([Date], "YYYY-MM-DD")
TEXT([Date], "DD MMM YYYY")
TEXT([DateTime], "MM/DD/YYYY HH:MM AM/PM")
```

---

## 8. Common Patterns

### Created Timestamp
```appsheet
Column: CreatedAt
Type: DateTime
Initial Value: NOW()
EDITABLE: No
```

### Due Date (30 days from creation)
```appsheet
Column: DueDate
Type: Date
Initial Value: TODAY() + 30
```

### Days Remaining
```appsheet
Column: DaysRemaining
Type: Number (Virtual)
App Formula: [DueDate] - TODAY()
```

### Is Overdue
```appsheet
Column: IsOverdue
Type: Yes/No (Virtual)
App Formula: AND([Status] <> "Complete", [DueDate] < TODAY())
```

### Age Calculation
```appsheet
Column: Age
Type: Number (Virtual)
App Formula: YEAR(TODAY()) - YEAR([BirthDate])
```

### Business Hours Check
```appsheet
Column: IsDuringBusinessHours
Type: Yes/No (Virtual)
App Formula: AND(
  HOUR([DateTime]) >= 9,
  HOUR([DateTime]) < 17,
  NOT(IN(WEEKDAY([DateTime]), LIST(1, 7)))
)
```

### Duration in Hours
```appsheet
Column: DurationHours
Type: Number (Virtual)
App Formula: ([EndDateTime] - [StartDateTime]) * 24
```

---

## 9. Best Practices

### Type Selection
- **Date:** When time is not relevant
- **DateTime:** When time matters
- **Time:** For time-of-day only
- **Duration:** For time periods/spans

### Validation
- Always validate date ranges
- Use TODAY() and NOW() for dynamic validation
- Prevent illogical dates (end before start)
- Consider business rules (weekdays, hours)

### Performance
- Index date columns used in filters
- Use simple date comparisons
- Cache complex date calculations

### User Experience
- Date shows calendar picker
- DateTime shows date + time pickers
- Use Initial Value for defaults
- Format dates clearly for display

### Time Zones
- AppSheet uses user's local timezone
- Be aware of timezone differences
- Use UTC for cross-timezone apps
- Test with users in different zones

---

## 10. Validation Examples

### Date Range
```appsheet
VALID_IF: AND([Date] >= DATE(2026, 1, 1), [Date] <= DATE(2026, 12, 31))
```

### Future Only
```appsheet
VALID_IF: [AppointmentDate] >= TODAY() - "Must be today or future date"
```

### Logical Date Order
```appsheet
VALID_IF: [EndDate] >= [StartDate] - "End date must be after start date"
```

### Business Days Only
```appsheet
VALID_IF: NOT(IN(WEEKDAY([Date]), LIST(1, 7))) - "Weekends not allowed"
```

### Within Business Hours
```appsheet
VALID_IF: AND(
  HOUR([MeetingTime]) >= 9,
  HOUR([MeetingTime]) < 17
) - "Must be between 9 AM and 5 PM"
```

---

**Related Documentation:**
- [Column Properties](../column-properties/COLUMN_PROPERTIES_OVERVIEW.md)
- [Validation Properties](../column-properties/VALIDATION_PROPERTIES.md)
- [Date-Time Functions](../../formulas-reference/date-time/DATE_TIME_FUNCTIONS.md)

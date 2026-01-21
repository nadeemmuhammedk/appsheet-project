# Contact Column Types

Contact types handle communication information with special formatting and interactive features.

## 1. Phone Type

**Purpose:** Phone numbers with click-to-call functionality

**Configuration:**
```appsheet
Type: Phone
Type Details:
  Callable: Yes/No (enable click-to-call)
  Textable: Yes/No (enable click-to-text)
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Common Use Cases:**
- Customer phone numbers
- Emergency contacts
- Support hotlines
- Employee contact numbers

**Example Values:**
- +1-555-0123
- (555) 123-4567
- +44 20 7123 4567
- 555-0123

**Features:**
- Click-to-call on mobile devices
- Click-to-text/SMS capability
- Automatic formatting
- International format support

**Validation Patterns:**
```appsheet
# Minimum length
VALID_IF: LEN([Phone]) >= 10

# Exact length (US format)
VALID_IF: LEN([Phone]) = 10

# Numeric only
VALID_IF: ISNUMBER(VALUE([Phone]))

# Required format
VALID_IF: LEN([Phone]) >= 10 - "Phone must be at least 10 digits"
```

**Formula Examples:**
```appsheet
# Format phone number
App Formula: TEXT(VALUE([Phone]), "000-000-0000")

# Extract area code
App Formula: LEFT([Phone], 3)

# Validate US phone
App Formula: AND(LEN([Phone]) = 10, ISNUMBER(VALUE([Phone])))
```

---

## 2. Email Type

**Purpose:** Email addresses with click-to-email functionality

**Configuration:**
```appsheet
Type: Email
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
SEARCH: YES
```

**Common Use Cases:**
- User email addresses
- Contact emails
- Customer communication
- Employee email
- Notification recipients

**Example Values:**
- user@example.com
- john.smith@company.co.uk
- support@app.io

**Features:**
- Click-to-email (opens email client)
- Basic format validation
- Lowercase conversion (automatic)
- Searchable

**Validation Patterns:**
```appsheet
# Basic email validation
VALID_IF: AND(
  ISNOTBLANK([Email]),
  CONTAINS([Email], "@"),
  CONTAINS([Email], ".")
)

# Prevent duplicates
VALID_IF: NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))

# Domain restriction
VALID_IF: CONTAINS([Email], "@company.com") - "Must be company email"

# Multiple conditions
VALID_IF: AND(
  CONTAINS([Email], "@"),
  LEN([Email]) >= 5,
  NOT(CONTAINS([Email], " "))
) - "Invalid email format"
```

**Formula Examples:**
```appsheet
# Extract domain
App Formula: RIGHT([Email], LEN([Email]) - FIND("@", [Email]))

# Extract username
App Formula: LEFT([Email], FIND("@", [Email]) - 1)

# Lowercase email
App Formula: LOWER([Email])

# Current user email
Initial Value: USEREMAIL()
```

---

## 3. Name Type

**Purpose:** Person names with name-specific formatting

**Configuration:**
```appsheet
Type: Name
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
SEARCH: YES
```

**Common Use Cases:**
- Full names
- Employee names
- Customer names
- Contact names
- User names

**Example Values:**
- "John Smith"
- "Mary Johnson"
- "Dr. Robert Williams"

**Features:**
- Optimized for person names
- May apply capitalization
- Searchable by default
- Contact integration support

**Validation Patterns:**
```appsheet
# Require full name (first and last)
VALID_IF: CONTAINS([Name], " ")

# Minimum length
VALID_IF: LEN([Name]) >= 2

# No numbers
VALID_IF: [Name] = SUBSTITUTE([Name], "0", "")

# Prevent duplicates
VALID_IF: NOT(IN([Name], SELECT(Contacts[Name], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
```

**Formula Examples:**
```appsheet
# Combine first and last
App Formula: CONCATENATE([FirstName], " ", [LastName])

# Extract first name
App Formula: LEFT([FullName], FIND(" ", [FullName]) - 1)

# Extract last name
App Formula: RIGHT([FullName], LEN([FullName]) - FIND(" ", [FullName]))

# Format as "Last, First"
App Formula: CONCATENATE([LastName], ", ", [FirstName])

# Title case
App Formula: PROPER([Name])
```

---

## 4. Address Type

**Purpose:** Physical addresses with geocoding and mapping

**Configuration:**
```appsheet
Type: Address
Type Details:
  Geocoding enabled: Yes/No
SHOW: TRUE
EDITABLE: TRUE
REQUIRE: YES/NO
```

**Common Use Cases:**
- Shipping addresses
- Billing addresses
- Office locations
- Customer addresses
- Delivery addresses

**Example Values:**
- "123 Main St, Springfield, IL 62701"
- "456 Oak Avenue, New York, NY 10001"
- "789 Elm Street, Los Angeles, CA 90001"

**Features:**
- Click-to-map (opens map app)
- Geocoding (lat/long extraction)
- Address verification
- Multi-line display

**Format:**
```
Street Address
City, State ZIP
Country (optional)
```

**Validation Patterns:**
```appsheet
# Required field
VALID_IF: ISNOTBLANK([Address])

# Minimum length
VALID_IF: LEN([Address]) >= 10

# Contains street and city
VALID_IF: CONTAINS([Address], ",")
```

**Formula Examples:**
```appsheet
# Combine address components
App Formula: CONCATENATE([Street], ", ", [City], ", ", [State], " ", [ZIP])

# Extract ZIP code
App Formula: RIGHT([Address], 5)

# Same as billing address
Initial Value: [BillingAddress]
```

**Geocoding:**
```appsheet
# If geocoding enabled, AppSheet automatically extracts:
# - Latitude
# - Longitude
# - Formatted address

# Use with map views for location display
```

---

## 5. Best Practices

### Phone Numbers
- Store in consistent format (remove formatting)
- Enable Callable for customer contact
- Enable Textable for SMS notifications
- Validate minimum length
- Consider international formats

### Email Addresses
- Always validate format (contains @)
- Prevent duplicates for user accounts
- Use LOWER() for consistency
- Make searchable (SEARCH: Yes)
- Use as username/identifier when appropriate

### Names
- Decide: full name vs first/last separate
- Use Name type for searchability
- Apply PROPER() for consistent capitalization
- Validate minimum length
- Allow spaces and hyphens

### Addresses
- Use multi-line format for readability
- Enable geocoding for map features
- Separate billing and shipping if needed
- Validate required components
- Consider address verification services

---

## 6. Common Patterns

### User Profile Contact Info
```appsheet
Column: Email
Type: Email
REQUIRE: Yes
VALID_IF: AND(
  CONTAINS([Email], "@"),
  NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
)
Initial Value: USEREMAIL()

Column: Phone
Type: Phone
Callable: Yes
Textable: Yes
VALID_IF: LEN([Phone]) >= 10

Column: FullName
Type: Name
REQUIRE: Yes
Label: Yes
```

### Customer Contact Card
```appsheet
Column: CustomerName
Type: Name
Label: Yes
REQUIRE: Yes

Column: Email
Type: Email
REQUIRE: Yes

Column: Phone
Type: Phone
Callable: Yes

Column: Address
Type: Address
Geocoding enabled: Yes
```

### Emergency Contact
```appsheet
Column: EmergencyContactName
Type: Name
REQUIRE: Yes

Column: EmergencyPhone
Type: Phone
Callable: Yes
REQUIRE: Yes

Column: Relationship
Type: Text
REQUIRE: Yes
```

---

## 7. Interactive Features

### Click-to-Call (Phone)
```appsheet
Type: Phone
Callable: Yes
# On mobile: Tapping opens phone dialer
# On desktop: May open VoIP app
```

### Click-to-Text (Phone)
```appsheet
Type: Phone
Textable: Yes
# Opens SMS/messaging app with number pre-filled
```

### Click-to-Email (Email)
```appsheet
Type: Email
# Tapping opens email client with address pre-filled
```

### Click-to-Map (Address)
```appsheet
Type: Address
Geocoding enabled: Yes
# Tapping opens map app with address
```

---

## 8. Validation Examples

### Email Validation
```appsheet
# Complete email validation
VALID_IF: AND(
  ISNOTBLANK([Email]),
  CONTAINS([Email], "@"),
  CONTAINS([Email], "."),
  LEN([Email]) >= 5,
  NOT(CONTAINS([Email], " ")),
  NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
) - "Invalid or duplicate email"
```

### Phone Validation
```appsheet
# US phone number validation
VALID_IF: AND(
  LEN([Phone]) = 10,
  ISNUMBER(VALUE([Phone]))
) - "Phone must be 10 digits"
```

### Name Validation
```appsheet
# Require first and last name
VALID_IF: AND(
  CONTAINS([Name], " "),
  LEN([Name]) >= 3
) - "Enter first and last name"
```

---

## 9. Integration Patterns

### User Account Setup
```appsheet
Column: Email (Primary Key)
Type: Email
Key: Yes
REQUIRE: Yes
Initial Value: USEREMAIL()

Column: DisplayName
Type: Name
REQUIRE: Yes

Column: Phone
Type: Phone
Callable: Yes
Textable: Yes
```

### Customer Database
```appsheet
Column: CustomerName
Type: Name
Label: Yes

Column: Email
Type: Email
SEARCH: Yes

Column: Phone
Type: Phone
Callable: Yes

Column: ShippingAddress
Type: Address
Geocoding enabled: Yes

Column: BillingAddress
Type: Address
```

---

**Related Documentation:**
- [Text Types](TEXT_TYPES.md)
- [Column Properties](../column-properties/COLUMN_PROPERTIES_OVERVIEW.md)
- [Validation Properties](../column-properties/VALIDATION_PROPERTIES.md)

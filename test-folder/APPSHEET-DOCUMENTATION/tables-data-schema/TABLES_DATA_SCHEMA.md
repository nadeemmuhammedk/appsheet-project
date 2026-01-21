# AppSheet Tables & Data Schema Reference

AppSheet tables are the foundation of your application's data model. They define the structure, validation rules, and relationships between your data entities.

## 1. What Are AppSheet Tables?

AppSheet tables map to data sources (Google Sheets, Excel, SQL databases) and define:
- **Column types** and properties
- **Primary keys** for unique identification
- **Validation rules** (VALID_IF, EDITABLE IF, SHOW IF)
- **Security permissions** (who can add/edit/delete)
- **Relationships** between tables (Ref columns)

## 2. Core Components

| Component | Purpose | Documentation |
|-----------|---------|---------------|
| **Column Types** | Define data format (Text, Number, Date, Ref, etc.) | [Column Types →](column-types/COLUMN_TYPES_OVERVIEW.md) |
| **Column Properties** | Configure behavior (VALID_IF, SHOW IF, formulas) | [Column Properties →](column-properties/COLUMN_PROPERTIES_OVERVIEW.md) |
| **Table Settings** | Control CRUD operations and security | [Table Settings →](table-settings/TABLE_SETTINGS_OVERVIEW.md) |
| **Virtual Columns** | Calculated fields using formulas | [Virtual Columns →](virtual-columns/VIRTUAL_COLUMNS_OVERVIEW.md) |
| **Primary Keys** | Unique identifiers for each row | [Primary Keys →](primary-keys/PRIMARY_KEYS_OVERVIEW.md) |
| **Relationships** | Link tables together (1:M, M:M) | [Relationships →](data-relationships/RELATIONSHIPS_OVERVIEW.md) |

## 3. Column Type Categories

### Basic Data Types
- **Text:** Short text input (names, codes, single-line)
- **LongText:** Multi-line text (notes, descriptions)
- **Number:** Numeric values (quantities, scores)
- **Price:** Currency values with formatting
- **Yes/No:** Boolean/checkbox values

### Date & Time Types
- **Date:** Calendar dates only
- **DateTime:** Date and time combined
- **Time:** Time of day only

### Selection Types
- **Enum:** Single choice from predefined list
- **EnumList:** Multiple choices from predefined list

### Relationship Types
- **Ref:** Reference to another table (foreign key)
- **List:** Multiple references to another table

### Contact Types
- **Phone:** Phone numbers with click-to-call
- **Email:** Email addresses with click-to-email
- **Name:** Person names
- **Address:** Physical addresses with geocoding

### Media Types
- **Image:** Photo/image uploads
- **File:** Document uploads
- **Drawing:** Signature/sketch input

### Special Types
- **ChangeTimestamp:** Auto-updated timestamp
- **ChangeLocation:** Auto-updated GPS location

[See detailed column types →](column-types/COLUMN_TYPES_OVERVIEW.md)

## 4. Essential Column Properties

### Identity & Display
- **Column Name:** Internal identifier for the column
- **Type:** Data type (Text, Number, Date, etc.)
- **Key:** Mark as primary key (unique identifier)
- **Label:** Use column value as display name for records

### Formulas & Automation
- **Initial Value:** Set default values for new records
- **App Formula:** Calculate values dynamically (read-only)

### Validation & Control
- **VALID_IF:** Restrict allowed values with formula
- **EDITABLE IF:** Control when users can edit
- **REQUIRE:** Make column mandatory

### Display & Visibility
- **SHOW:** Display column in forms (Yes/No)
- **SHOW IF:** Conditionally display column
- **SEARCH:** Enable column in app search

[See all column properties →](column-properties/COLUMN_PROPERTIES_OVERVIEW.md)

## 5. Documentation Categories

### [Column Types](column-types/COLUMN_TYPES_OVERVIEW.md)
Complete reference for all AppSheet column types with configuration details.

- [Text Types](column-types/TEXT_TYPES.md)
- [Numeric Types](column-types/NUMERIC_TYPES.md)
- [Date & Time Types](column-types/DATE_TIME_TYPES.md)
- [Enum Types](column-types/ENUM_TYPES.md)
- [Reference Types](column-types/REFERENCE_TYPES.md)
- [Contact Types](column-types/CONTACT_TYPES.md)
- [Media Types](column-types/MEDIA_TYPES.md)
- [Special Types](column-types/SPECIAL_TYPES.md)

### [Column Properties](column-properties/COLUMN_PROPERTIES_OVERVIEW.md)
Configuration options for column behavior and validation.

- [Basic Properties](column-properties/BASIC_PROPERTIES.md)
- [Formula Properties](column-properties/FORMULA_PROPERTIES.md)
- [Validation Properties](column-properties/VALIDATION_PROPERTIES.md)
- [Display Properties](column-properties/DISPLAY_PROPERTIES.md)
- [Advanced Properties](column-properties/ADVANCED_PROPERTIES.md)

### [Table Settings](table-settings/TABLE_SETTINGS_OVERVIEW.md)
Table-level configuration for CRUD operations and security.

- [Table Operations](table-settings/TABLE_OPERATIONS.md)
- [Table Security](table-settings/TABLE_SECURITY.md)
- [Row Filtering](table-settings/ROW_FILTERING.md)
- [Table Localization](table-settings/TABLE_LOCALIZATION.md)

### [Virtual Columns](virtual-columns/VIRTUAL_COLUMNS_OVERVIEW.md)
Formula-calculated columns for dynamic data.

- [Reverse Reference](virtual-columns/REVERSE_REFERENCE.md)
- [Lookup Patterns](virtual-columns/LOOKUP_PATTERNS.md)
- [Calculated Columns](virtual-columns/CALCULATED_COLUMNS.md)
- [List Type Columns](virtual-columns/LIST_TYPE_COLUMNS.md)

### [Primary Keys](primary-keys/PRIMARY_KEYS_OVERVIEW.md)
Best practices for unique identifiers.

- [Auto-Generated Keys](primary-keys/AUTO_GENERATED_KEYS.md)
- [Natural Keys](primary-keys/NATURAL_KEYS.md)
- [Key Best Practices](primary-keys/KEY_BEST_PRACTICES.md)

### [Data Relationships](data-relationships/RELATIONSHIPS_OVERVIEW.md)
Patterns for linking tables together.

- [One-to-Many](data-relationships/ONE_TO_MANY.md)
- [Many-to-Many](data-relationships/MANY_TO_MANY.md)
- [Lookup Inheritance](data-relationships/LOOKUP_INHERITANCE.md)

## 6. See Also

- [AppSheet Formulas Reference](../formulas-reference/FORMULAS_REFERENCE.md)
- [Views & Interface Reference](../views-interface/)
- [Rules & Logic Reference](../rules-and-logic/RULES_AND_LOGIC.md)

---

**Last Updated:** January 2026
**Version:** 1.0

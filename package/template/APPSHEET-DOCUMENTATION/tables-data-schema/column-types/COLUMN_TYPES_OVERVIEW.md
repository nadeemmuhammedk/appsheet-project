# AppSheet Column Types Overview

Column types define how AppSheet handles, displays, and validates data in your tables.

## 1. All Column Types

| Type | Category | Use Case | Example Value |
|------|----------|----------|---------------|
| **Text** | Basic | Short text, IDs, codes | "John Smith", "ABC-123" |
| **LongText** | Basic | Multi-line notes, descriptions | "This is a long description..." |
| **Number** | Numeric | Quantities, scores, counts | 42, 3.14 |
| **Price** | Numeric | Currency values | $19.99, €50.00 |
| **Decimal** | Numeric | Precise decimals | 3.141592653 |
| **Percent** | Numeric | Percentage values | 75%, 0.85 |
| **Date** | Date/Time | Calendar dates | 2026-01-20 |
| **DateTime** | Date/Time | Date with time | 2026-01-20 14:30:00 |
| **Time** | Date/Time | Time of day | 14:30:00 |
| **Duration** | Date/Time | Time spans | 2h 30m |
| **Enum** | Selection | Single choice | "Active", "Pending" |
| **EnumList** | Selection | Multiple choices | "Red, Blue, Green" |
| **Ref** | Relationship | Foreign key to table | → Customer record |
| **List** | Relationship | Multiple foreign keys | → [Order1, Order2, Order3] |
| **Phone** | Contact | Phone numbers | +1-555-0123 |
| **Email** | Contact | Email addresses | user@example.com |
| **Name** | Contact | Person names | "John Smith" |
| **Address** | Contact | Physical addresses | "123 Main St, City, State" |
| **Image** | Media | Photos, images | [uploaded image] |
| **File** | Media | Documents, PDFs | [uploaded file] |
| **Drawing** | Media | Signatures, sketches | [drawn image] |
| **Thumbnail** | Media | Small images | [thumbnail] |
| **Yes/No** | Special | Boolean values | true, false |
| **ChangeTimestamp** | Special | Auto-updated timestamp | 2026-01-20 14:30:00 |
| **ChangeLocation** | Special | Auto-updated GPS | 40.7128° N, 74.0060° W |

## 2. Type Categories

### Basic Types
Simple data values for general use.
- [Text Types →](TEXT_TYPES.md) - Text, LongText, Name

### Numeric Types
Numbers, currency, and calculations.
- [Numeric Types →](NUMERIC_TYPES.md) - Number, Price, Decimal, Percent

### Date & Time Types
Temporal data handling.
- [Date & Time Types →](DATE_TIME_TYPES.md) - Date, DateTime, Time, Duration

### Selection Types
Predefined choice lists.
- [Enum Types →](ENUM_TYPES.md) - Enum, EnumList

### Relationship Types
Link to other tables.
- [Reference Types →](REFERENCE_TYPES.md) - Ref, List

### Contact Types
Contact information with special formatting.
- [Contact Types →](CONTACT_TYPES.md) - Phone, Email, Name, Address

### Media Types
Files and images.
- [Media Types →](MEDIA_TYPES.md) - Image, File, Drawing, Thumbnail

### Special Types
Auto-updated or boolean values.
- [Special Types →](SPECIAL_TYPES.md) - Yes/No, ChangeTimestamp, ChangeLocation

## 3. Choosing the Right Type

### Decision Flow

**Is it a unique identifier?**
- Yes → Text (with UNIQUEID() initial value)

**Is it numeric?**
- Money → Price
- Percentage → Percent
- Precise decimal → Decimal
- General number → Number

**Is it a date or time?**
- Date only → Date
- Date + Time → DateTime
- Time only → Time
- Duration → Duration

**Does it reference another table?**
- Single reference → Ref
- Multiple references → List

**Does it have predefined choices?**
- Single choice → Enum
- Multiple choices → EnumList

**Is it contact information?**
- Phone number → Phone
- Email address → Email
- Person name → Name
- Physical address → Address

**Is it media?**
- Photo → Image
- Document → File
- Signature → Drawing

**Is it true/false?**
- Yes → Yes/No

**Is it auto-updated?**
- Timestamp → ChangeTimestamp
- GPS location → ChangeLocation

**Default:**
- Short text → Text
- Long text → LongText

## 4. Type Conversion

AppSheet automatically converts between compatible types:

| From | To | Result |
|------|----|----|
| Text | Number | "123" → 123 |
| Number | Text | 123 → "123" |
| Date | Text | 2026-01-20 → "2026-01-20" |
| Enum | Text | Enum value → Text value |
| Yes/No | Text | true → "Y", false → "N" |

## 5. Virtual Column Types

Virtual columns use formulas to calculate values. They can be any type:

- **Text:** `CONCATENATE([FirstName], " ", [LastName])`
- **Number:** `[Price] * [Quantity]`
- **Date:** `[StartDate] + 30`
- **Yes/No:** `[Amount] > 1000`
- **Ref:** `LOOKUP([CustomerID], "Customers", "CustomerID", "CustomerID")`
- **List:** `REF_ROWS("Orders", "CustomerID")`

## 6. Best Practices

### Type Selection
- Use most specific type (Price not Number for currency)
- Use Enum for controlled vocabularies
- Use Ref for relationships (not Text IDs)
- Use LongText for descriptions > 1 line

### Performance
- Avoid complex type conversions in formulas
- Use appropriate types for indexing (Text for keys)
- Minimize Ref dereferencing in loops

### Data Quality
- Choose types that enforce validation automatically
- Price ensures currency formatting
- Date ensures valid dates
- Email validates email format (basic)
- Phone validates phone format (basic)

### User Experience
- Enum provides dropdown selection
- Date shows calendar picker
- Phone enables click-to-call
- Email enables click-to-email
- Address enables click-to-map

## 7. Common Patterns

### Primary Keys
```
Column: ID
Type: Text
Initial Value: "REC-" & UNIQUEID()
```

### Timestamps
```
Column: CreatedAt
Type: ChangeTimestamp
(Automatically set on record creation)
```

### Status Fields
```
Column: Status
Type: Enum
Values: Draft, Pending, Approved, Rejected
```

### Foreign Keys
```
Column: CustomerRef
Type: Ref
Source: Customers
```

### Calculated Totals
```
Column: Total
Type: Price (Virtual)
Formula: [Quantity] * [UnitPrice]
```

---

**See detailed documentation for each type category:**
- [Text Types](TEXT_TYPES.md)
- [Numeric Types](NUMERIC_TYPES.md)
- [Date & Time Types](DATE_TIME_TYPES.md)
- [Enum Types](ENUM_TYPES.md)
- [Reference Types](REFERENCE_TYPES.md)
- [Contact Types](CONTACT_TYPES.md)
- [Media Types](MEDIA_TYPES.md)
- [Special Types](SPECIAL_TYPES.md)

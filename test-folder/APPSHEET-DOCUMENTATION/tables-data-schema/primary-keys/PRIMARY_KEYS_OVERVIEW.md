# Primary Keys Overview

Primary keys uniquely identify each record in an AppSheet table.

## 1. What is a Primary Key?

**Definition:** A column that uniquely identifies each row in a table

**Requirements:**
- Must be unique for every record
- Cannot be blank/null
- Should not change after creation
- Only ONE key column per table

**Syntax:**
```appsheet
Column Name: RecordID
Type: Text (recommended)
Key: Yes
```

---

## 2. Key Types

### Auto-Generated Keys (Recommended)
```appsheet
Initial Value: "REC-" & UNIQUEID()
```
[See Auto-Generated Keys →](AUTO_GENERATED_KEYS.md)

### Natural Keys
```appsheet
Key: Yes
# Using existing unique identifier (Email, SSN, etc.)
```
[See Natural Keys →](NATURAL_KEYS.md)

---

## 3. Common Key Patterns

### UNIQUEID Pattern
```appsheet
Column: RecordID
Type: Text
Key: Yes
Initial Value: UNIQUEID()
SHOW: No
EDITABLE: No
```

### Formatted ID
```appsheet
Column: OrderID
Type: Text
Key: Yes
Initial Value: "ORD-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()
SHOW: Yes
EDITABLE: No
```

### Email as Key
```appsheet
Column: Email
Type: Email
Key: Yes
VALID_IF: NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
```

---

## 4. Best Practices

- **Use Text type** for keys
- **Auto-generate** with UNIQUEID()
- **Make non-editable** (EDITABLE: No)
- **Never reuse** keys
- **Hide internal IDs** (SHOW: No)
- **Use readable format** for user-facing keys

[See Key Best Practices →](KEY_BEST_PRACTICES.md)

---

## 5. Key Column Configuration

```appsheet
Column Name: RecordID
Type: Text
Key: Yes
Label: No
Description: Unique record identifier
Initial Value: "REC-" & UNIQUEID()
SHOW: No
EDITABLE: No
REQUIRE: Yes
SEARCH: No
```

---

## 6. Using Keys in Relationships

```appsheet
# Parent table
Table: Customers
Column: CustomerID (Key)

# Child table
Table: Orders
Column: CustomerRef (Ref → Customers)
# References CustomerID
```

---

## 7. Common Mistakes

**Don't:**
- Use auto-incrementing numbers (unreliable)
- Allow users to edit keys
- Reuse deleted keys
- Use Number type for keys
- Leave keys blank

**Do:**
- Use UNIQUEID()
- Make keys immutable
- Use Text type
- Validate uniqueness
- Keep keys internal

---

**Detailed Documentation:**
- [Auto-Generated Keys](AUTO_GENERATED_KEYS.md)
- [Natural Keys](NATURAL_KEYS.md)
- [Key Best Practices](KEY_BEST_PRACTICES.md)

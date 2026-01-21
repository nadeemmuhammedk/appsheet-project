# Primary Key Best Practices

Guidelines for designing and implementing effective primary keys in AppSheet.

## 1. Type Selection

**Always use Text type for keys**
```appsheet
# Correct
Column: RecordID
Type: Text
Key: Yes

# Incorrect
Column: ID
Type: Number
Key: Yes
# Numbers can have precision issues, use Text
```

---

## 2. Generation Strategy

**Prefer auto-generated over natural keys**
```appsheet
# Recommended
Initial Value: "REC-" & UNIQUEID()

# Use cautiously
Key: [Email]  # Natural key
```

---

## 3. Immutability

**Make keys non-editable**
```appsheet
Column: RecordID
Key: Yes
EDITABLE: No
```

**Never allow key changes**
- Keys should never change after creation
- Changing keys breaks relationships
- Use EDITABLE: No

---

## 4. Uniqueness

**Validate uniqueness for natural keys**
```appsheet
VALID_IF: NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
```

**UNIQUEID() guarantees uniqueness**
- No validation needed
- AppSheet ensures uniqueness

---

## 5. Visibility

**Hide internal IDs**
```appsheet
# Internal system ID
Column: InternalID
SHOW: No

# User-facing ID
Column: OrderNumber
SHOW: Yes
```

---

## 6. Format

**Use descriptive prefixes**
```appsheet
# Good
"CUST-" & UNIQUEID()
"ORD-" & UNIQUEID()
"PROD-" & UNIQUEID()

# Acceptable
UNIQUEID()

# Avoid
TEXT(sequential number)  # Can have gaps
```

**Include date for sortability**
```appsheet
"ORD-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()
# Sortable by date
```

---

## 7. Documentation

**Add clear descriptions**
```appsheet
Description: Auto-generated unique identifier for orders. Format: ORD-YYYYMMDD-XXXXX
```

---

## 8. Relationships

**Use as foreign keys**
```appsheet
# Parent
Table: Customers
Column: CustomerID (Key)

# Child
Table: Orders
Column: CustomerRef (Ref → Customers)
```

---

## 9. Common Mistakes

**Don't:**
- Use auto-incrementing numbers
- Allow editing
- Reuse deleted keys
- Use Number type
- Leave keys blank
- Use sensitive data as keys (unless necessary)

**Do:**
- Use UNIQUEID()
- Make immutable
- Use Text type
- Validate natural keys
- Add prefixes
- Document format

---

## 10. Quick Checklist

- [ ] Type is Text
- [ ] Key: Yes
- [ ] EDITABLE: No
- [ ] REQUIRE: Yes
- [ ] Initial Value uses UNIQUEID()
- [ ] Prefix included (if user-visible)
- [ ] Description added
- [ ] Uniqueness validated (if natural key)

---

## 11. Recommended Pattern

```appsheet
Column Name: RecordID
Type: Text
Key: Yes
Label: No
Description: Auto-generated unique identifier (Format: REC-XXXXX)
Initial Value: "REC-" & UNIQUEID()
SHOW: No
EDITABLE: No
REQUIRE: Yes
SEARCH: No
```

---

**Related Documentation:**
- [Primary Keys Overview](PRIMARY_KEYS_OVERVIEW.md)
- [Auto-Generated Keys](AUTO_GENERATED_KEYS.md)
- [Natural Keys](NATURAL_KEYS.md)

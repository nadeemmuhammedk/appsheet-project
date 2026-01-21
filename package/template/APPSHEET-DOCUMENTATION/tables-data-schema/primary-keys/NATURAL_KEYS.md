# Natural Keys

Natural keys use existing unique identifiers as primary keys instead of generated IDs.

## 1. What is a Natural Key?

**Definition:** Using an existing unique value from your domain as the primary key

**Examples:**
- Email address
- Social Security Number
- ISBN (books)
- VIN (vehicles)
- Product SKU
- Employee number

---

## 2. Common Natural Keys

### Email as Key
```appsheet
Column: Email
Type: Email
Key: Yes
VALID_IF: NOT(IN([Email], SELECT(Users[Email], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
```

### Product SKU
```appsheet
Column: SKU
Type: Text
Key: Yes
VALID_IF: NOT(IN([SKU], SELECT(Products[SKU], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
```

### Employee ID
```appsheet
Column: EmployeeNumber
Type: Text
Key: Yes
EDITABLE: No
```

---

## 3. Advantages

- Meaningful to users
- No duplicate storage
- Natural for lookups
- Business-relevant

---

## 4. Disadvantages

- May change over time
- Not always guaranteed unique
- May be sensitive data
- Harder to validate uniqueness

---

## 5. When to Use Natural Keys

**Good candidates:**
- Email (user accounts)
- Permanent employee IDs
- Standard identifiers (ISBN, VIN)
- User-created unique codes

**Poor candidates:**
- Names (can change, duplicates)
- Phone numbers (can change)
- Addresses (can change)
- Temporary identifiers

---

## 6. Validation Required

Always validate uniqueness:
```appsheet
VALID_IF: NOT(IN([NaturalKey], SELECT(Table[NaturalKey], [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER])))
```

---

## 7. Best Practices

- Validate uniqueness strictly
- Consider immutability
- Protect sensitive keys
- Have fallback (generated ID) if uncertain
- Make non-editable if possible

---

**Related Documentation:**
- [Primary Keys Overview](PRIMARY_KEYS_OVERVIEW.md)
- [Auto-Generated Keys](AUTO_GENERATED_KEYS.md)
- [Key Best Practices](KEY_BEST_PRACTICES.md)

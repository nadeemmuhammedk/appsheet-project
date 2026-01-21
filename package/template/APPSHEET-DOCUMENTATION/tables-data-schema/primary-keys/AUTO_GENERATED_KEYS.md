# Auto-Generated Keys

Auto-generated keys use formulas to create unique identifiers automatically.

## 1. UNIQUEID() Function

**Purpose:** Generate guaranteed-unique identifiers

**Syntax:**
```appsheet
Initial Value: UNIQUEID()
```

**Returns:** Random alphanumeric string (e.g., "a1b2c3d4")

**Example:**
```appsheet
Column: RecordID
Type: Text
Key: Yes
Initial Value: UNIQUEID()
```

---

## 2. Formatted Key Patterns

### With Prefix
```appsheet
Initial Value: "REC-" & UNIQUEID()
# Result: REC-a1b2c3d4
```

### With Date
```appsheet
Initial Value: "ORD-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()
# Result: ORD-20260120-a1b2c3d4
```

### With Table Prefix
```appsheet
Initial Value: "CUST-" & UNIQUEID()
Initial Value: "PROD-" & UNIQUEID()
Initial Value: "INV-" & UNIQUEID()
```

### With Counter
```appsheet
Initial Value: TEXT(TODAY(), "YYYYMMDD") & "-" & TEXT(MAX(Records[Number]) + 1, "0000")
# Result: 20260120-0001
# Note: Can have gaps if records deleted
```

---

## 3. Key Patterns by Use Case

### Internal System ID
```appsheet
Column: InternalID
Initial Value: UNIQUEID()
SHOW: No
```

### User-Visible Order Number
```appsheet
Column: OrderNumber
Initial Value: "ORD-" & TEXT(TODAY(), "YYYYMMDD") & "-" & UNIQUEID()
SHOW: Yes
EDITABLE: No
```

### Customer ID
```appsheet
Column: CustomerID
Initial Value: "CUST-" & TEXT(TODAY(), "YYYYMM") & "-" & UNIQUEID()
```

### Invoice Number
```appsheet
Column: InvoiceNumber
Initial Value: "INV-" & TEXT(YEAR(TODAY()), "0000") & "-" & UNIQUEID()
```

---

## 4. Best Practices

- Always use Text type
- Set EDITABLE: No
- Use descriptive prefixes
- Include date for sortability
- Hide technical IDs (SHOW: No)
- Show user-friendly IDs (SHOW: Yes)

---

## 5. Complete Configuration

```appsheet
Column Name: RecordID
Type: Text
Key: Yes
Initial Value: "REC-" & UNIQUEID()
SHOW: No
EDITABLE: No
REQUIRE: Yes
Description: Auto-generated unique identifier
```

---

**Related Documentation:**
- [Primary Keys Overview](PRIMARY_KEYS_OVERVIEW.md)
- [Key Best Practices](KEY_BEST_PRACTICES.md)

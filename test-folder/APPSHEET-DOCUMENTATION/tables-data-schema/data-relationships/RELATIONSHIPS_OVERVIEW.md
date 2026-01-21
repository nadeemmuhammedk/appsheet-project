# Data Relationships Overview

Data relationships link tables together, enabling relational data models in AppSheet.

## 1. Relationship Types

### One-to-Many (1:M)
**Most common pattern**
- One parent record → Many child records
- Example: One Customer → Many Orders
- Implementation: Ref column in child table

[See One-to-Many →](ONE_TO_MANY.md)

### Many-to-Many (M:M)
**Junction table pattern**
- Many records → Many related records
- Example: Many Students → Many Courses
- Implementation: Junction table with two Refs

[See Many-to-Many →](MANY_TO_MANY.md)

### Lookup/Inheritance
**Dereferencing parent data**
- Access parent table values
- Example: Order inherits Customer address
- Implementation: `[Ref].[Column]` syntax

[See Lookup Inheritance →](LOOKUP_INHERITANCE.md)

---

## 2. Implementing Relationships

### One-to-Many Setup
```appsheet
# Parent table (Customers)
Column: CustomerID (Key)
Column: Orders (Virtual): REF_ROWS("Orders", "CustomerRef")

# Child table (Orders)
Column: OrderID (Key)
Column: CustomerRef (Ref → Customers)
```

### Many-to-Many Setup
```appsheet
# Table 1: Students
Column: StudentID (Key)

# Table 2: Courses
Column: CourseID (Key)

# Junction: Enrollments
Column: EnrollmentID (Key)
Column: StudentRef (Ref → Students)
Column: CourseRef (Ref → Courses)
```

---

## 3. Ref Column (Foreign Key)

**Create relationship:**
```appsheet
Column: CustomerRef
Type: Ref
Source table: Customers
Label: CustomerName
```

**Purpose:**
- Link to parent table
- Enable dereferencing
- Support REF_ROWS
- Maintain data integrity

---

## 4. REF_ROWS (Reverse Reference)

**Access child records:**
```appsheet
Column: Orders (Virtual)
Type: List
App Formula: REF_ROWS("Orders", "CustomerRef")
```

**Purpose:**
- Get all child records
- Count children
- Sum/aggregate child data
- Filter related records

---

## 5. Dereferencing (Lookup)

**Access parent data:**
```appsheet
Column: CustomerName (Virtual)
Type: Text
App Formula: [CustomerRef].[Name]
```

**Purpose:**
- Inherit parent values
- Display related data
- Calculate with parent data

---

## 6. Relationship Patterns

### Parent → Children
```appsheet
REF_ROWS("ChildTable", "ParentRefColumn")
```

### Child → Parent
```appsheet
[ParentRef].[ParentColumn]
```

### Aggregations
```appsheet
COUNT(REF_ROWS("Orders", "CustomerRef"))
SUM(REF_ROWS("LineItems", "OrderRef")[Amount])
```

---

## 7. Best Practices

- Use Ref type for relationships
- Name Ref columns with "Ref" suffix
- Create virtual columns for REF_ROWS
- Validate Refs with VALID_IF
- Use meaningful Label columns
- Document relationships

---

## 8. Common Mistakes

**Don't:**
- Store foreign keys as Text
- Skip validation
- Use List type for simple 1:M
- Break relationship chains

**Do:**
- Use Ref type
- Validate references
- Use REF_ROWS for children
- Document relationship structure

---

**Detailed Documentation:**
- [One-to-Many](ONE_TO_MANY.md)
- [Many-to-Many](MANY_TO_MANY.md)
- [Lookup Inheritance](LOOKUP_INHERITANCE.md)
- [Reference Types](../column-types/REFERENCE_TYPES.md)

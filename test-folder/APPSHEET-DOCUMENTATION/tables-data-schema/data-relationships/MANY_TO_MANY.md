# Many-to-Many Relationships

Many-to-many (M:M) relationships connect multiple records in one table to multiple records in another table.

## 1. M:M Relationship Pattern

**Definition:** Many records in Table A relate to many records in Table B

**Examples:**
- Many Students → Many Courses (students enroll in multiple courses)
- Many Products → Many Tags (products have multiple tags)
- Many Employees → Many Projects (employees work on multiple projects)
- Many Authors → Many Books (co-authorship)

**Implementation:** Junction table with two Ref columns

---

## 2. Junction Table Setup

### Example: Students & Courses

**Table 1: Students**
```appsheet
Column: StudentID (Key)
Column: StudentName
```

**Table 2: Courses**
```appsheet
Column: CourseID (Key)
Column: CourseName
```

**Junction Table: Enrollments**
```appsheet
Column: EnrollmentID (Key)
Type: Text
Initial Value: "ENR-" & UNIQUEID()

Column: StudentRef (Ref → Students)
Type: Ref
Source table: Students
REQUIRE: Yes

Column: CourseRef (Ref → Courses)
Type: Ref
Source table: Courses
REQUIRE: Yes

# Optional metadata
Column: EnrollmentDate (Date)
Column: Grade (Text)
```

---

## 3. Virtual Columns for Navigation

### In Students Table (View Courses)
```appsheet
Column: Enrollments (Virtual)
Type: List
App Formula: REF_ROWS("Enrollments", "StudentRef")

Column: Courses (Virtual)
Type: List
App Formula: REF_ROWS("Enrollments", "StudentRef")[CourseRef]

Column: CourseCount (Virtual)
Type: Number
App Formula: COUNT(REF_ROWS("Enrollments", "StudentRef"))
```

### In Courses Table (View Students)
```appsheet
Column: Enrollments (Virtual)
Type: List
App Formula: REF_ROWS("Enrollments", "CourseRef")

Column: Students (Virtual)
Type: List
App Formula: REF_ROWS("Enrollments", "CourseRef")[StudentRef]

Column: StudentCount (Virtual)
Type: Number
App Formula: COUNT(REF_ROWS("Enrollments", "CourseRef"))
```

---

## 4. Common M:M Patterns

### Products & Tags
```appsheet
# Junction: ProductTags
Column: ProductRef (Ref → Products)
Column: TagRef (Ref → Tags)

# In Products
Column: Tags (Virtual): REF_ROWS("ProductTags", "ProductRef")[TagRef]

# In Tags
Column: Products (Virtual): REF_ROWS("ProductTags", "TagRef")[ProductRef]
```

### Employees & Projects
```appsheet
# Junction: Assignments
Column: EmployeeRef (Ref → Employees)
Column: ProjectRef (Ref → Projects)
Column: Role (Text)
Column: HoursAllocated (Number)

# In Employees
Column: Projects (Virtual): REF_ROWS("Assignments", "EmployeeRef")[ProjectRef]

# In Projects
Column: TeamMembers (Virtual): REF_ROWS("Assignments", "ProjectRef")[EmployeeRef]
```

---

## 5. Junction Table with Metadata

**Add relationship-specific data:**
```appsheet
# Table: Enrollments
Column: EnrollmentID (Key)
Column: StudentRef (Ref → Students)
Column: CourseRef (Ref → Courses)

# Relationship metadata
Column: EnrollmentDate (Date)
Column: Grade (Enum: A, B, C, D, F)
Column: Status (Enum: Active, Dropped, Completed)
Column: Credits (Number)
```

---

## 6. Validation

**Prevent duplicate combinations:**
```appsheet
# In junction table (Enrollments)
VALID_IF: NOT(IN(
  CONCATENATE([StudentRef], "|", [CourseRef]),
  SELECT(
    CONCATENATE(Enrollments[StudentRef], "|", Enrollments[CourseRef]),
    [_ROWNUMBER] <> [_THISROW].[_ROWNUMBER]
  )
)) - "Student already enrolled in this course"
```

---

## 7. Aggregations

### Count Related Records
```appsheet
# In Students table
Column: EnrolledCourses (Virtual)
Type: Number
App Formula: COUNT(REF_ROWS("Enrollments", "StudentRef"))
```

### List Related Names
```appsheet
# In Students table
Column: CourseList (Virtual)
Type: Text
App Formula: CONCATENATE(REF_ROWS("Enrollments", "StudentRef")[CourseRef].[CourseName], ", ")
```

### Sum Metadata
```appsheet
# In Students table
Column: TotalCredits (Virtual)
Type: Number
App Formula: SUM(REF_ROWS("Enrollments", "StudentRef")[Credits])
```

---

## 8. Best Practices

- Create junction table with own primary key
- Use two Ref columns (not List type)
- Add metadata columns as needed
- Validate unique combinations
- Create virtual columns for navigation
- Name junction table descriptively

---

## 9. Complete Example

```appsheet
# Table: Students
Column: StudentID (Key, Text): "STU-" & UNIQUEID()
Column: Name (Text, Label)
Column: Courses (Virtual, List): REF_ROWS("Enrollments", "StudentRef")[CourseRef]
Column: CourseCount (Virtual, Number): COUNT(REF_ROWS("Enrollments", "StudentRef"))

# Table: Courses
Column: CourseID (Key, Text): "CRS-" & UNIQUEID()
Column: CourseName (Text, Label)
Column: Students (Virtual, List): REF_ROWS("Enrollments", "CourseRef")[StudentRef]
Column: EnrollmentCount (Virtual, Number): COUNT(REF_ROWS("Enrollments", "CourseRef"))

# Junction: Enrollments
Column: EnrollmentID (Key, Text): "ENR-" & UNIQUEID()
Column: StudentRef (Ref → Students, REQUIRE: Yes)
Column: CourseRef (Ref → Courses, REQUIRE: Yes)
Column: EnrollmentDate (Date): TODAY()
Column: Grade (Enum): A, B, C, D, F
VALID_IF: NOT(IN(CONCATENATE([StudentRef], "|", [CourseRef]), ...)) # Prevent duplicates
```

---

**Related Documentation:**
- [Relationships Overview](RELATIONSHIPS_OVERVIEW.md)
- [One-to-Many](ONE_TO_MANY.md)
- [Reference Types](../column-types/REFERENCE_TYPES.md)
- [Reverse Reference](../virtual-columns/REVERSE_REFERENCE.md)

### Example Interactions

#### Example 1: Manual Invocation

**User:** "How do I filter a list by current user?"

**Response:**
1. Read `APPSHEET-DOCUMENTATION/formulas-reference/list-and-select/LIST_AND_SELECT.md`
2. Read `APPSHEET-DOCUMENTATION/rules-and-logic/security-filters/SECURITY_FILTERS.md`
3. Extract: SELECT syntax, USEREMAIL() function
4. Provide guidance:
   ```
   To filter by current user:

   SELECT(Students[StudentID], [Email] = USEREMAIL())

   This filters the Students table to show only rows where the Email column
   matches the current user's email.

   Pattern:
   - SELECT(Table[KeyColumn], [FilterColumn] = USEREMAIL())
   - USEREMAIL() returns the email of the currently logged-in user

   Common use cases:
   - Security filters (show only user's data)
   - VALID_IF (dropdown with user's options)
   - Slice conditions (filtered views)
   ```

#### Example 2: Automatic Invocation (NO USER REQUEST)

**User:** "Add a deck view that shows students from the current user's batch"

**Claude thinks:** This requires deck view configuration + SELECT filtering + security pattern

**Claude automatically:**
1. Reads `APPSHEET-DOCUMENTATION/views-interface/deck/DECK_VIEW.md`
2. Reads `APPSHEET-DOCUMENTATION/formulas-reference/list-and-select/LIST_AND_SELECT.md`
3. Reads `APPSHEET-DOCUMENTATION/rules-and-logic/security-filters/SECURITY_FILTERS.md`
4. Generates complete view configuration with proper formulas

**User sees:** Complete deck view documentation with accurate SELECT formula and view settings

#### Example 3: Automatic Invocation for Actions

**User:** "Create an action to mark students as present"

**Claude thinks:** This requires action configuration + data operation pattern

**Claude automatically:**
1. Reads `APPSHEET-DOCUMENTATION/rules-and-logic/actions/ACTIONS.md`
2. Extracts action structure, behavior types, column value syntax
3. Generates complete action documentation

**User sees:** Complete action documentation with proper syntax and parameters

#### Example 4: Automatic Invocation for Formulas

**User:** "I need a formula to show this field only if status is Pending"

**Claude thinks:** This requires SHOW_IF syntax + conditional logic

**Claude automatically:**
1. Reads `APPSHEET-DOCUMENTATION/formulas-reference/conditional/CONDITIONAL.md`
2. Extracts SHOW_IF pattern and IF syntax
3. Provides formula

**User sees:** `[Status] = "Pending"` formula with explanation


# Patterns Discovered

Track recurring implementation patterns discovered in this codebase.

This file accumulates learnings over time and should be updated whenever a pattern repeatedly helps solve problems.

---

## Pattern Template

### Pattern Name
- <short, descriptive name>

### Context
- <where/when this pattern appears>

### Problem
- <issue this pattern solves>

### Solution
- <preferred implementation approach>

### Example
- <small snippet or behavior example>

### Related Files
- <path 1>
- <path 2>

---

## Example Pattern: Service Initialization (Empty Array vs Null)

### Pattern Name
- Service initialization defaults to empty collections

### Context
- Services or state containers that hold lists of TODO items.

### Problem
- Initializing list state as `null` forces repeated null checks and increases risk of runtime errors when iterating.

### Solution
- Initialize list-like structures with empty arrays (`[]`) instead of `null`.
- Treat `[]` as the canonical “no items yet” state.

### Example
- Prefer: `const todos = [];`
- Avoid: `const todos = null;`

### Related Files
- packages/backend/src/app.js
- packages/frontend/src/App.js
---

## Pattern: String Validation with trim()

### Pattern Name
- String validation with whitespace handling

### Context
- Form inputs, API request validation where empty or whitespace-only strings should be rejected

### Problem
- Simple null/undefined checks don't catch empty strings or strings with only whitespace
- Tests often verify that empty strings (`""`) are rejected

### Solution
- Use combined check: `!value || value.trim() === ''`
- This catches: null, undefined, empty string, and whitespace-only strings

### Example
```javascript
if (!title || title.trim() === '') {
  return res.status(400).json({ error: 'Title is required' });
}
```

### Related Files
- packages/backend/src/app.js (POST /api/todos)

---

## Pattern: Array Element Removal with findIndex

### Pattern Name
- Safe array element removal by ID

### Context
- REST DELETE operations that need to remove items from in-memory arrays

### Problem
- Need to both check if item exists (return 404) and remove it efficiently
- Using `filter` creates new array; using `splice` requires index

### Solution
- Use `findIndex` to get position, check for -1 (not found), then `splice` to modify in place

### Example
```javascript
const todoIndex = todos.findIndex((t) => t.id === id);
if (todoIndex === -1) {
  return res.status(404).json({ error: 'Todo not found' });
}
todos.splice(todoIndex, 1);
```

### Related Files
- packages/backend/src/app.js (DELETE /api/todos/:id)

---

## Pattern: Boolean Toggle Pattern

### Pattern Name
- Boolean state toggle with negation

### Context
- Toggle operations for completed/incomplete states, on/off states

### Problem
- Setting boolean to hardcoded value (`true` or `false`) instead of toggling prevents bidirectional state change

### Solution
- Use negation operator: `value = !value`
- Ensures proper toggle behavior in both directions

### Example
```javascript
// ❌ Wrong - always sets to true
todo.completed = true;

// ✅ Correct - toggles between states
todo.completed = !todo.completed;
```

### Related Files
- packages/backend/src/app.js (PATCH /api/todos/:id/toggle)

---

## Pattern: Systematic Lint Error Resolution

### Pattern Name
- Categorize and fix lint errors by type

### Context
- Code quality cleanup when multiple ESLint errors exist across files

### Problem
- Many mixed lint errors can be overwhelming
- Random fixes lead to missed issues and repeated test runs

### Solution
- Run lint to identify all errors
- Group errors by type/rule (no-unused-vars, no-console, etc.)
- Fix one category at a time across all files
- Verify tests pass after each category
- Rerun lint to confirm all issues resolved

### Example
```bash
# 1. Identify errors
npm run lint

# 2. Fix by category:
#    a) Remove unused variables
#    b) Remove/replace console statements
#    c) Fix import order
#    d) Fix formatting

# 3. Verify after each category
npm test
npm run lint
```

### Related Files
- packages/backend/src/app.js
- packages/backend/src/index.js
- packages/frontend/src/App.js

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

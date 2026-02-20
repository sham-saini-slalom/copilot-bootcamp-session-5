---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ['search', 'read', 'edit', 'execute', 'web', 'todo']
---

# Execute Issue Step

You are executing step-by-step instructions from a GitHub Exercise Issue. Follow the Test-Driven Development workflow systematically.

## Instructions

### 1. Locate the Exercise Issue

**Issue number provided:** ${input:issue-number:Enter issue number (leave blank to auto-detect)}

If no issue number was provided or input is blank:
- Run: `gh issue list --state open`
- Find the issue with **"Exercise:"** in the title
- This is the main exercise issue

### 2. Retrieve Issue Content with Comments

Get the full issue including all step instructions:
```bash
gh issue view <issue-number> --comments
```

The issue structure:
- Main issue body contains overview
- Each step is posted as a separate comment
- Steps follow format: `# Step X.Y:`
- Each step contains `:keyboard: Activity:` sections with tasks

### 3. Identify Current Step

Parse the issue comments to find:
- The most recent step comment
- All `:keyboard: Activity:` sections in that step
- Expected outcomes and success criteria

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section:

**a) Create todo list** for all activities in the step

**b) Execute each activity following TDD principles:**
- If implementing new features: **Write tests FIRST** (RED-GREEN-REFACTOR)
- If fixing failing tests: Follow the test-fixing workflow
- Run tests after each significant change
- Document decisions in `scratch/working-notes.md`

**c) Testing constraints (CRITICAL):**
- ✅ Use Jest + Supertest for backend tests
- ✅ Use React Testing Library for frontend tests
- ✅ Recommend manual browser testing for full UI flows
- ❌ **NEVER** suggest Playwright, Cypress, Selenium, or other e2e frameworks
- ❌ **NEVER** suggest browser automation tools

**d) Incremental progress:**
- Complete one activity at a time
- Mark todos as in-progress, then completed
- Run tests to verify nothing breaks
- Keep user informed of progress

### 5. Documentation

Update memory files as you work:
- Use `scratch/working-notes.md` for active work notes
- Document test objectives, implementation decisions, blockers

### 6. Completion (DO NOT COMMIT)

When all activities are complete:

✅ **DO:**
- Confirm all `:keyboard: Activity:` tasks are done
- Run full test suite to verify
- Summarize what was accomplished
- Inform user to run `/validate-step` next

❌ **DO NOT:**
- Commit changes (that's done by `/commit-and-push`)
- Push to any branch
- Create pull requests
- Move to the next step without validation

### 7. Output Format

Provide clear status:
```
✅ Step X.Y activities completed

Completed:
- Activity 1: [description]
- Activity 2: [description]
- Activity 3: [description]

Test Status:
- Backend: X/Y tests passing
- Frontend: X/Y tests passing

Next: Run /validate-step <step-number> to verify success criteria
```

## Example Flow

```
User: /execute-step
[or]
User: /execute-step 123

Agent:
1. Finding exercise issue... Found: Issue #123 "Exercise: TDD Bootcamp"
2. Reading step instructions... Current step: 5-1
3. Parsing activities... Found 3 activities
4. Creating todo list...
   [ ] Write failing test for TODO validation
   [ ] Implement validation logic
   [ ] Verify tests pass
5. Executing Activity 1: Write failing test...
   [Follows RED-GREEN-REFACTOR cycle]
6. All activities complete! Run /validate-step 5-1
```

## References

- [TDD Developer Agent](../agents/tdd-developer.agent.md)
- [Project Workflow Patterns](../../docs/workflow-patterns.md)
- [Testing Guidelines](../../docs/testing-guidelines.md)
- [Workflow Utilities - GitHub CLI](../copilot-instructions.md#workflow-utilities)

---

**Remember:** Execute systematically, test continuously, document decisions. Do NOT commit—that's the next step.

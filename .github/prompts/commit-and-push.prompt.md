---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['read', 'execute', 'todo']
---

# Commit and Push Changes

Analyze current changes, generate a descriptive commit message following conventional commit format, and push to a feature branch.

## Instructions

### 1. Get Branch Name (REQUIRED)

**Target branch:** ${input:branch-name:Enter feature branch name (e.g., feature/add-validation)}

**CRITICAL:** A branch name MUST be provided. If not provided, STOP and ask the user for it.

### 2. Analyze Changes

Review what has changed:
```bash
git status
git diff
```

Identify:
- Files modified
- Nature of changes (feat, fix, chore, docs, refactor, test)
- Scope of changes (backend, frontend, tests, docs)

### 3. Generate Commit Message

Follow conventional commit format from project Git Workflow:

**Format:**
```
<type>: <description>

[optional body]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates

**Examples:**
- `feat: add TODO validation for empty titles`
- `fix: resolve failing DELETE endpoint test`
- `test: add integration tests for POST /api/todos`
- `refactor: extract validation logic to middleware`
- `chore: clean up console statements and unused vars`

**Guidelines:**
- Keep description concise (50 chars or less for summary)
- Use imperative mood ("add" not "added")
- Include scope if helpful: `feat(backend): add validation`
- Add body for complex changes explaining why

### 4. Create or Switch to Feature Branch

```bash
# Check if branch exists
git branch --list <branch-name>

# If branch doesn't exist, create it
git checkout -b <branch-name>

# If branch exists, switch to it
git checkout <branch-name>
```

**IMPORTANT:** 
- NEVER commit directly to `main`
- ONLY use the branch name provided by the user
- Feature branches should follow pattern: `feature/<descriptive-name>`

### 5. Stage All Changes

```bash
git add .
```

Verify staged changes:
```bash
git status
```

### 6. Commit Changes

```bash
git commit -m "<generated-commit-message>"
```

If commit message needs a body:
```bash
git commit -m "<summary>" -m "<detailed-body>"
```

### 7. Push to Remote

```bash
git push origin <branch-name>
```

If this is the first push to the branch:
```bash
git push -u origin <branch-name>
```

### 8. Confirmation

Provide clear summary:
```
✅ Changes committed and pushed

Branch: feature/add-validation
Commit: feat: add TODO validation for empty titles
Files changed: 3
- packages/backend/src/app.js
- packages/backend/__tests__/app.test.js
- .github/memory/scratch/working-notes.md

Pushed to: origin/feature/add-validation

Next steps:
- Create pull request if ready for review
- Continue working on this branch
- Run tests in CI/CD pipeline
```

## Workflow Integration

This prompt works with the complete TDD workflow:

1. `/execute-step` - Execute step activities (TDD agent)
2. `/validate-step` - Check success criteria (code-reviewer agent)
3. `/commit-and-push` - Commit and push changes (current agent)
4. Create PR or continue to next step

## Safety Checks

Before committing:
- ✅ All tests passing?
- ✅ No lint errors (or acceptable exceptions)?
- ✅ Changes align with step objectives?
- ✅ Memory files updated?

If any check fails, warn user and ask whether to proceed.

## Error Handling

**If branch name not provided:**
```
❌ Branch name is required for commit and push.

Please provide a feature branch name:
Examples:
- feature/add-validation
- feature/fix-delete-endpoint
- feature/improve-error-handling

Run: /commit-and-push
Then enter branch name when prompted.
```

**If no changes to commit:**
```
❌ No changes detected to commit.

Run: git status

If you expected changes, they may already be committed.
```

**If push fails (e.g., conflicts):**
```
❌ Push failed. Possible reasons:
- Remote branch has changes you don't have
- Network issues
- Permission issues

Try:
git pull origin <branch-name> --rebase
git push origin <branch-name>
```

## References

- [Git Workflow](../copilot-instructions.md#git-workflow)
- [Project Workflow Patterns](../../docs/workflow-patterns.md)

---

**Remember:** Always use feature branches, never commit to main directly. Follow conventional commit format for clear history.

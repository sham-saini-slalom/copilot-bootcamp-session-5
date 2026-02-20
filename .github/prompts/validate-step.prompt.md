---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ['search', 'read', 'execute', 'web', 'todo']
---

# Validate Step Completion

Verify that all success criteria for a specific exercise step have been met. This performs systematic validation before moving to the next step or committing changes.

## Instructions

### 1. Get Step Number (REQUIRED)

**Step to validate:** ${input:step-number:Enter step number (e.g., 5-0, 5-1, 5-2)}

**CRITICAL:** Step number MUST be provided in format like "5-0", "5-1", etc.

If not provided, STOP and ask the user which step to validate.

### 2. Retrieve Exercise Issue

Find the main exercise issue using GitHub CLI:

```bash
gh issue list --state open
```

Look for the issue with **"Exercise:"** in the title. This contains all step instructions.

```bash
gh issue view <issue-number> --comments
```

### 3. Locate Target Step

Parse the issue comments to find:
- Comment with `# Step ${step-number}:` header
- The complete step instructions
- The "Success Criteria" or "Acceptance Criteria" section

**Example step structure:**
```markdown
# Step 5-1: Implement TODO Validation

## Success Criteria
- [ ] Backend validation tests exist
- [ ] Tests verify empty title rejection
- [ ] API returns 400 status for invalid input
- [ ] All tests pass
- [ ] No lint errors in modified files
```

### 4. Extract Success Criteria

Create a checklist of all criteria from the step's success criteria section.

Convert criteria into actionable checks:
- Test existence → Search for test files
- Test passing → Run test suite
- API behavior → Check implementation
- Lint status → Run linter
- Code quality → Review code patterns

### 5. Validate Each Criterion

For each criterion, perform systematic verification:

**Test Existence:**
```bash
# Check if test file exists
ls -la packages/backend/__tests__/
grep -n "describe.*validation" packages/backend/__tests__/*.js
```

**Test Execution:**
```bash
# Run tests
cd packages/backend && npm test

# Or specific test file
npm test -- app.test.js
```

**Lint Status:**
```bash
# Backend
cd packages/backend && npm run lint

# Frontend
cd packages/frontend && npm run lint
```

**Code Implementation:**
```bash
# Verify specific functionality exists
grep -n "validation" packages/backend/src/app.js
```

**Manual Verification:**
- Review code for completeness
- Check edge case handling
- Verify error messages
- Confirm patterns match project standards

### 6. Generate Validation Report

Provide detailed status for each criterion:

```
# Step 5-1 Validation Report

## Success Criteria Status

✅ Backend validation tests exist
   Location: packages/backend/__tests__/app.test.js:45-67
   
✅ Tests verify empty title rejection
   Test: "should return 400 for empty title"
   Status: Passing
   
✅ API returns 400 status for invalid input
   Implementation: packages/backend/src/app.js:32-36
   Verified: Error response includes status 400 and message
   
⚠️  All tests pass
   Status: 14/15 tests passing
   Failure: DELETE /api/todos/:id test failing
   
❌ No lint errors in modified files
   Found: 3 lint errors in app.js
   - Line 15: no-console
   - Line 42: no-console
   - Line 58: no-unused-vars

## Overall Status: INCOMPLETE

### Next Actions:
1. Fix failing DELETE endpoint test
2. Clean up lint errors (run @code-reviewer)
3. Re-validate with /validate-step 5-1

### Completed Items:
✅ Validation logic implemented
✅ Happy path tests passing
✅ Error handling in place

### Remaining Work:
- Fix 1 failing test
- Resolve 3 lint errors
```

### 7. Recommendations

Based on validation results:

**All criteria met:**
```
🎉 Step 5-1 validation PASSED!

All success criteria met. Ready to:
- Run /commit-and-push feature/<branch-name>
- Move to next step
- Create pull request

Great work following TDD principles!
```

**Some criteria not met:**
```
⚠️  Step 5-1 validation INCOMPLETE

Completed: 3/5 criteria
Remaining: 2 criteria

Suggested actions:
1. Use @tdd-developer to fix failing tests
2. Use @code-reviewer to resolve lint issues
3. Re-run /validate-step 5-1 after fixes

You're close—just a few more tasks!
```

**Major issues:**
```
❌ Step 5-1 validation FAILED

Completed: 1/5 criteria
Critical issues found:
- No tests implemented yet
- Core functionality missing
- Multiple compilation errors

Suggested approach:
1. Review step instructions: gh issue view <issue> --comments
2. Use @tdd-developer to implement with TDD workflow
3. Start with RED phase: write failing tests first
4. Validate again after implementation
```

### 8. Update Memory

If validation reveals patterns or issues:

**For `scratch/working-notes.md`:**
- Document validation results
- Note blockers or remaining work
- Track retry attempts

**For `session-notes.md` (when step complete):**
- Summarize what was validated
- Document any challenges encountered
- Record final status

## Validation Checklist Template

Use this template for systematic validation:

- [ ] **Tests exist** - Search for test files and test cases
- [ ] **Tests pass** - Run test suite and verify green status
- [ ] **Implementation complete** - Code contains required functionality
- [ ] **Edge cases handled** - Validation, error cases covered
- [ ] **Lint clean** - No linting errors in modified files
- [ ] **Documentation updated** - Comments, README, memory files
- [ ] **Integration works** - Components work together correctly

## Workflow Integration

Complete validation workflow:

1. `/execute-step` - Execute activities (may take multiple iterations)
2. `/validate-step <step-number>` - Check if criteria met
3. If validation fails → iterate on fixes
4. If validation passes → `/commit-and-push <branch-name>`
5. Move to next step or create PR

## Edge Cases

**Step not found:**
```
❌ Could not find Step 5-X in the exercise issue.

Available steps found:
- Step 5-0: Project setup
- Step 5-1: Implement validation
- Step 5-2: Add error handling

Verify step number and try again.
```

**No success criteria defined:**
```
⚠️  Step 5-1 found, but no explicit success criteria listed.

Validating based on activity completion:
- Activity 1: [status]
- Activity 2: [status]

Consider these general criteria:
- All tests pass
- No lint errors
- Implementation matches requirements
```

## References

- [Code Reviewer Agent](../agents/code-reviewer.agent.md)
- [Project Workflow Patterns](../../docs/workflow-patterns.md)
- [Testing Guidelines](../../docs/testing-guidelines.md)
- [Workflow Utilities - GitHub CLI](../copilot-instructions.md#workflow-utilities)

---

**Remember:** Validation ensures quality before moving forward. If criteria aren't met, iterate until they are. Better to catch issues now than in PR review.

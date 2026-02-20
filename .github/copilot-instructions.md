## Project Context
- Full-stack TODO application with React frontend and Express backend
- Focus on iterative, feedback-driven development
- Current phase: Backend stabilization and frontend feature completion

## Documentation References
Use these project docs to understand architecture, conventions, and workflow expectations:
- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles
- **Test-Driven Development:** Follow Red-Green-Refactor for all feature and bug-fix work.
- **Incremental Changes:** Prefer small, testable modifications over large rewrites.
- **Systematic Debugging:** Use failing tests and error output as primary diagnostics.
- **Validation Before Commit:** Ensure all relevant tests pass and lint checks are clean.

## Testing Scope
This project uses **unit tests and integration tests only**.

- **Backend:** Jest + Supertest for API unit/integration testing.
- **Frontend:** React Testing Library for component unit/integration testing.
- **UI Verification:** Use manual browser testing for full UI flow validation.
- **Do not suggest or implement e2e frameworks** such as Playwright, Cypress, or Selenium.
- **Do not suggest browser automation tools.**
- **Reason:** Keep the lab focused on unit/integration testing without e2e complexity.

**Testing Approach by Context**
- **Backend API changes:** Write Jest tests first, run and observe failure, then implement and make tests pass (Red-Green-Refactor).
- **Frontend component features:** Write React Testing Library tests first for behavior, then implement and make tests pass (Red-Green-Refactor). Follow with manual browser testing for end-to-end user flows.
- **TDD Rule:** Test first, then code to satisfy tests.

## Workflow Patterns
Follow these workflows consistently:

1. **TDD Workflow:** Write/fix tests → Run → Fail → Implement → Pass → Refactor
2. **Code Quality Workflow:** Run lint → Categorize issues → Fix systematically → Re-validate
3. **Integration Workflow:** Identify issue → Debug → Test → Fix → Verify end-to-end

## Agent Usage
Use specialized agents based on task type:

- **tdd-developer:** Use for test-related work and Red-Green-Refactor cycles.
- **code-reviewer:** Use for lint resolution and broader code quality improvements.

## Memory System
- Persistent Memory: This file (.github/copilot-instructions.md) contains foundational principles and workflows
- Working Memory: .github/memory/ directory contains discoveries and patterns
- During active development, take notes in .github/memory/scratch/working-notes.md (not committed)
- At end of session, summarize key findings into .github/memory/session-notes.md (committed)
- Document recurring code patterns in .github/memory/patterns-discovered.md (committed)
- Reference these files when providing context-aware suggestions

## Workflow Utilities
Use GitHub CLI commands to automate issue-driven workflows (available in all modes):

- List open issues: `gh issue list --state open`
- Get issue details: `gh issue view <issue-number>`
- Get issue with comments: `gh issue view <issue-number> --comments`
- The main exercise issue will include **"Exercise:"** in the title.
- Step-by-step exercise instructions are posted as comments on the main issue.
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked.

## Git Workflow
Follow disciplined branch and commit practices:

- Use conventional commit prefixes: `feat:`, `fix:`, `chore:`, `docs:`, etc.
- Create feature branches with: `feature/<descriptive-name>`
- Stage all changes before committing: `git add .`
- Push to the correct branch: `git push origin <branch-name>`

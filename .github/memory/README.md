# Working Memory System

This directory provides a lightweight memory system for capturing development discoveries, decisions, and reusable patterns as you work on this TODO application.

## Purpose
- Track implementation patterns discovered during coding.
- Record important decisions and why they were made.
- Preserve lessons learned from debugging, testing, and refactoring.
- Improve future AI assistance by providing project-specific context.

## Two Types of Memory

### 1) Persistent Memory (Foundational)
- Stored in `.github/copilot-instructions.md`.
- Contains stable, long-lived guidance: principles, workflows, and project rules.
- Changes less frequently and acts as the baseline behavior for AI assistance.

### 2) Working Memory (Evolving)
- Stored in `.github/memory/`.
- Captures session-level discoveries and recurring code patterns.
- Evolves as implementation details, issues, and team learnings emerge.

## Directory Structure

- `session-notes.md`
  - Historical summaries of completed sessions.
  - High-signal, concise records of outcomes and decisions.
  - **Committed to git** as a durable project memory.

- `patterns-discovered.md`
  - Accumulated coding and debugging patterns over time.
  - Includes context, problem, solution, and examples.
  - **Committed to git** for future reuse.

- `scratch/working-notes.md`
  - Active session notes while work is in progress.
  - Capture raw findings, trial-and-error, and next actions.
  - Intended as temporary workspace notes.

- `scratch/.gitignore`
  - Uses `*` to ignore all scratch files by default.
  - Keeps active notes ephemeral and out of version history.

## When to Use Each File

### During TDD (Red-Green-Refactor)
- Use `scratch/working-notes.md` while writing failing tests and iterating on fixes.
- Move stable conclusions (e.g., edge cases, final approach) into `session-notes.md` when done.
- Add reusable test patterns (naming, setup, fixture strategy) to `patterns-discovered.md`.

### During Linting and Code Quality Work
- Track noisy or confusing lint findings in `scratch/working-notes.md` as you triage.
- Summarize root causes and final remediation strategy in `session-notes.md`.
- Document repeated lint fixes as patterns in `patterns-discovered.md`.

### During Debugging and Integration Fixes
- Capture hypotheses, reproductions, and failed attempts in `scratch/working-notes.md`.
- Record verified causes and final decisions in `session-notes.md`.
- Promote recurring debugging tactics and architecture insights to `patterns-discovered.md`.

## Session Lifecycle
1. Start work in `scratch/working-notes.md`.
2. Track current task, decisions, blockers, and findings as they occur.
3. At session end, summarize important outcomes in `session-notes.md`.
4. Extract any recurring, reusable solution into `patterns-discovered.md`.

## How AI Uses This Memory
- AI reads persistent rules from `.github/copilot-instructions.md` first.
- AI uses `.github/memory/session-notes.md` for recent historical context.
- AI references `.github/memory/patterns-discovered.md` for established implementation patterns.
- AI can use `scratch/working-notes.md` during active work for in-progress context.

This layered approach helps AI provide context-aware suggestions that are consistent with prior decisions while still adapting to current session needs.

## Important Distinction
- `session-notes.md` is for **completed session summaries** and is **committed**.
- `scratch/working-notes.md` is for **active work-in-progress notes** and is generally **not committed**.

Use this distinction to keep version history clean while preserving high-value project memory.
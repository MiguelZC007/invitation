---
name: task
description: Start a new task by creating a feature branch from develop. Use when beginning any new work on the project.
argument-hint: "<type/branch-name> or <description>"
allowed-tools: Bash, Read, Glob
---

Create a feature branch from `develop` to start a new task.

**Input:** $ARGUMENTS

## Steps

1. **Check working directory is clean:**
   ```bash
   git status --porcelain
   ```
   If there are uncommitted changes, warn the user and STOP.

2. **Switch to develop and ensure it's up to date:**
   ```bash
   git checkout develop
   ```

3. **Create the feature branch:**
   - If `$ARGUMENTS` looks like a branch name (has `/` prefix like `feat/`, `fix/`, etc.), use it directly.
   - Otherwise, generate a name: pick the conventional prefix (`feat/`, `fix/`, `refactor/`, `test/`, `docs/`, `chore/`) and convert the description to kebab-case.
   ```bash
   git checkout -b <branch-name> develop
   ```

4. **Confirm to user:**
   ```
   Branch created: <branch-name>
   Base: develop

   Available commands:
   - /component <level> <Name> — create a component
   - /template <Name> — create a template
   - /test <Name> — write tests
   - /validate — check lint, tests, coverage, build
   - /finish — validate everything and merge to develop
   ```

---
name: task
description: Start a new task by creating a feature branch from develop. Use when beginning any new work on the project.
---

Create a feature branch from `develop` to start a new task.

**Input:** User provides branch name (e.g. `feat/my-feature`) or description. Parse: if it looks like a branch name (has `/` like `feat/`, `fix/`, etc.), use directly. Otherwise generate: conventional prefix + kebab-case description.

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

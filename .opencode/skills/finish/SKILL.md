---
name: finish
description: Validate the project, commit pending changes, and merge the current feature branch into develop. Use when the user has completed their work on a feature branch and wants to integrate it.
---

Finalize the current task: validate everything, commit, and merge to develop.

## Pre-conditions
Must be on a feature branch (NOT `main` or `develop`).

## Steps

### 1. Verify branch
```bash
git branch --show-current
```
If on `main` or `develop`, STOP and tell the user.

### 2. Handle uncommitted changes
```bash
git status --porcelain
```
If there are changes:
- Stage relevant files (specific files, not `git add .`)
- Create an appropriate conventional commit
- Never stage `.env`, credentials, or secrets

### 3. Run validations (ALL must pass)

#### 3a. Lint
```bash
pnpm lint
```
If errors found: fix them, commit the fix (`fix: resolve lint errors`), re-run.

#### 3b. Tests
```bash
pnpm test:run
```
ALL tests must pass. If failures: investigate, fix, commit fix, re-run.

#### 3c. Coverage
```bash
pnpm coverage
```
Must meet 80% thresholds. If below: add tests, commit, re-run.

#### 3d. Build
```bash
pnpm build
```
Must succeed. If fails: investigate, fix, commit, re-run.

### 4. If any validation fails after fix attempts
STOP. Report what failed and why. DO NOT merge. Suggest corrective actions.

### 5. Merge to develop (only if ALL validations pass)
```bash
git checkout develop
git merge --no-ff <feature-branch>
```

### 6. Report
```
## Finish: <branch> → develop

| Check    | Status |
|----------|--------|
| Lint     | ✅     |
| Tests    | ✅ (X passed) |
| Coverage | ✅ (lines: X%, fn: X%, branch: X%) |
| Build    | ✅     |
| Merge    | ✅ <branch> → develop |

No push performed — push when ready.
```

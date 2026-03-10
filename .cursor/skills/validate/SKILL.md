---
name: validate
description: Run all project validations - lint, tests, coverage, and build. Use to check project health before committing or merging, or when the user wants a status report.
---

Run all validations and report project health status.

## Steps (execute in order)

### 1. Lint
```bash
pnpm lint
```
If errors found, list them with file and line number.

### 2. Tests
```bash
pnpm test:run
```
ALL tests must pass. Report count of passed/failed.

### 3. Coverage
```bash
pnpm coverage
```
Check thresholds: 80% minimum for lines, functions, branches, statements.

### 4. Build
```bash
pnpm build
```
Static export must generate successfully.

### 5. Report
Present a clear summary:

```
## Project Validation Report

| Check    | Status | Details                                        |
|----------|--------|------------------------------------------------|
| Lint     | ✅ / ❌ | clean / X errors                              |
| Tests    | ✅ / ❌ | X passed, Y failed                            |
| Coverage | ✅ / ❌ | lines: X%, fn: X%, branch: X%, stmt: X%       |
| Build    | ✅ / ❌ | success / error details                        |

Overall: HEALTHY / NEEDS ATTENTION
```

If any check fails, suggest specific actions to fix.

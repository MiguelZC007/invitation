---
name: test
description: Create or run tests for a specific component or template. Use when the user wants to add test coverage, fix failing tests, or verify a specific component works correctly.
---

Create, update, or run tests for a component or template.

**Input:** Parse component name or file path to test.

## Steps

### 1. Locate the component
Search in `src/components/` and `src/templates/` for the target.
Read the source code to understand props, variants, behavior.

### 2. Check existing tests
Look for `<Name>.test.tsx` alongside the component.
If tests exist, read them to understand current coverage.

### 3. Write or update tests
File: `<path>/<Name>.test.tsx`

Delegate to test-writer agent for comprehensive test creation. Or follow: `describe` + `it`, accessible queries (getByRole > getByLabelText > getByText > getByTestId), `userEvent.setup()` for interactions. Mock next-intl if needed. Cover: rendering, variants, accessibility, interactions, defaults, edge cases.

### 4. Run ALL tests
```bash
pnpm test:run
```
Every test in the project must pass — not just the new ones.

### 5. Check coverage
```bash
pnpm coverage
```
Verify component-level and global thresholds (80%).

### 6. Commit
```bash
git add <test-files>
git commit -m "test: add tests for <ComponentName>"
```
Use `fix:` if fixing broken tests.

### 7. Report
```
Tests for: <ComponentName>
File: <path>/<ComponentName>.test.tsx
Tests written: X new, Y updated
All tests: Z passed (Z total)
Coverage: lines X%, functions X%, branches X%
Commit: <hash>
```

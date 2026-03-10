---
name: test
description: Create or run tests for a specific component or template. Use when the user wants to add test coverage, fix failing tests, or verify a specific component works correctly.
argument-hint: "<ComponentName> or <file-path>"
---

Create, update, or run tests for a component or template.

**Input:** $ARGUMENTS
Parse: component name or file path to test.

## Steps

### 1. Locate the component
Search in `src/components/` and `src/templates/` for the target.
Read the source code to understand props, variants, behavior.

### 2. Check existing tests
Look for `<Name>.test.tsx` alongside the component.
If tests exist, read them to understand current coverage.

### 3. Write or update tests
File: `<path>/<Name>.test.tsx`

Structure:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentName } from "./ComponentName";

// Mock next-intl if needed
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("ComponentName", () => {
  it("renders with required props", () => {
    render(<ComponentName prop="value" />);
    expect(screen.getByRole("...")).toBeInTheDocument();
  });
});
```

Cases to cover:
- Rendering with required and optional props
- Each variant/visual state
- Accessibility: ARIA roles, labels, semantics
- User interactions (click, type, navigate) via `userEvent.setup()`
- Conditional rendering based on props
- Default prop values
- Edge cases

Query priority: `getByRole` > `getByLabelText` > `getByText` > `getByTestId` (last resort).

### 4. Run ALL tests
```bash
pnpm test:run
```
Every test in the project must pass — not just the new ones.

### 5. Check coverage
```bash
pnpm coverage
```
Verify:
- Component-level coverage is high
- Global thresholds (80%) are maintained

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

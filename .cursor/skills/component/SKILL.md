---
name: component
description: Create or modify a component following Atomic Design. Use when the user wants to add a new atom, molecule, or organism, or modify an existing component.
---

Create or modify a component following Atomic Design and project conventions.

**Input:** Parse level (atom/molecule/organism), ComponentName (PascalCase), optional description.

## Steps

### 1. Verify branch
Confirm you are NOT on `main` or `develop`. If you are, tell the user to run `/task` first.

### 2. Check if component exists
Look in `src/components/<level>s/<ComponentName>.tsx`.
- If it exists: read it and its test file before modifying.
- If new: proceed to create.

### 3. Create/modify the component
File: `src/components/<level>s/<ComponentName>.tsx`

Follow these rules strictly:
- `"use client"` only if using hooks, events, or browser APIs.
- Named export: `export function ComponentName({ ... }: Props)`.
- Props as `type Props = { ... }`.
- Tailwind utility classes for styling — static class names only.
- Responsive: mobile-first with `sm:`, `md:`, `lg:` per design; see `responsive-design` rule.
- Import animation presets from `@/theme/animationPresets` if animating.
- Import tokens from `@/theme/tokens` if using theme values.
- Direct imports only — no barrel exports.
- Proper accessibility: semantic HTML, ARIA roles/labels.
- No `any`, no `React.FC`, no `forwardRef`, no default exports.

### 4. Create/update tests
File: `src/components/<level>s/<ComponentName>.test.tsx`

Delegate to test-writer agent when tests are complex, or follow: `describe` + `it`, accessible queries (`getByRole`, `getByText`, `getByLabelText`), `userEvent.setup()` for interactions. Test: rendering, variants, accessibility, interactions, defaults. NO snapshot tests.

### 5. Run ALL tests
```bash
pnpm test:run
```
Every test in the project must pass. If any fail, fix them.

### 6. Run lint
```bash
pnpm lint
```
Fix any errors found.

### 7. Commit
Stage only the component and test files:
```bash
git add src/components/<level>s/<ComponentName>.tsx src/components/<level>s/<ComponentName>.test.tsx
git commit -m "feat: add <ComponentName> <level>"
```
Use `fix:` or `refactor:` if modifying an existing component.

### 8. Report
```
Component: <ComponentName> (<level>)
File: src/components/<level>s/<ComponentName>.tsx
Tests: X passed (Y total)
Lint: clean
Commit: <hash> <message>
```

---
name: design-audit
description: Audit components and templates against UI/UX design criteria. Use when verifying visual coherence, palette, contrast, and responsive behavior without touching logic or tests.
---

Audit design UI/UX only. Do NOT modify code, run lint, or run tests.

## Scope
Read files: `*.tsx` (components, templates), `globals.css`, `tokens.ts`, `src/theme/**`.

## Checklist (design only)

| Criterion | Verification |
|-----------|--------------|
| **Palette** | Single palette per template? Buttons and text use same accent colors? |
| **Tokens** | Tokens/CSS vars used instead of hex/arbitrary Tailwind values? |
| **Contrast** | Text readable per WCAG AA (4.5:1 / 3:1)? |
| **Responsive** | Mobile-first? Breakpoints used correctly? |
| **Spacing** | Standard scale (4, 6, 8…)? No unnecessary arbitrary values? |
| **Components** | Button, Text, etc. coherent with template context? |
| **Touch** | Buttons/links ≥44px on mobile? |

## Steps

1. Read files to audit.
2. Apply checklist per file or template.
3. Report: OK / WARNING / ERROR per criterion.
4. Do NOT modify code. Do NOT run lint, tests, or build.

## Report format

```
## Design Audit: [scope]

| Criterion  | Status | Detail                          |
|------------|--------|----------------------------------|
| Palette    | WARN   | Buttons indigo, text amber       |
| Contrast   | OK     | AA met                           |
| Responsive | OK     | Mobile-first, breakpoints used   |
| ...        | ...    | ...                              |

Overall: PASS / NEEDS CHANGES
```

---
description: UI/UX design conventions - palette, tokens, contrast, responsive
globs: ["src/**/*.{tsx,css}", "src/theme/**"]
---

# UI Design Conventions

- **Palette per template**: One coherent palette per template. Do not mix accent colors (e.g. amber content with indigo buttons).
- **Buttons and text aligned**: Buttons and text must use the same color family in each template.
- **Tokens**: Use `@theme` in globals.css and tokens.ts. Prefer semantic tokens over raw hex/arbitrary values.
- **Responsive**: Mobile-first; breakpoints sm:, md:, lg:. Touch targets ≥44px for buttons/links.
- **Contrast WCAG AA**: Normal text 4.5:1, large text 3:1. Prefer amber-700/amber-800 over amber-600 on white.

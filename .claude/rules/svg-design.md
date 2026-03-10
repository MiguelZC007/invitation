---
description: SVG design conventions - accessibility, viewBox, symbols, motion
globs: "src/**/*.{tsx,svg}"
---

# SVG Design Conventions

- **Semantic SVG**: `role="img"`, `<title>` (and `<desc>` if needed). Decorative: `aria-hidden`.
- **ViewBox**: Always set `viewBox`; use `preserveAspectRatio` for aspect control.
- **Icons**: `fill="currentColor"` or theme tokens; prefer `<symbol>` + `<use href="#id">` for reuse.
- **Animation**: Use Motion from `@/theme/animationPresets`.

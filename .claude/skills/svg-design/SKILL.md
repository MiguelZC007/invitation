---
name: svg-design
description: Apply SVG design best practices for inline graphics. Use when creating or modifying SVG elements, icons, illustrations, or decorative graphics in components or templates.
---

Apply SVG design best practices for inline graphics. Use native SVG with Motion for animations. No external SVG libraries.

## Steps

### 1. Verify branch
Confirm you are NOT on `main` or `develop`. Create feature branch first if needed.

### 2. Accessibility
- **Semantic SVG** (conveys information): `role="img"`, `<title>` as first child, optional `<desc>`; use `aria-labelledby` if referencing ids.
- **Decorative SVG** (purely visual): `aria-hidden="true"`.
- Example semantic:
  ```tsx
  <svg viewBox="0 0 24 24" role="img" aria-labelledby="iconTitle">
    <title id="iconTitle">Location</title>
    <path d="..." fill="currentColor" />
  </svg>
  ```
- Example decorative: `aria-hidden` on the svg or wrapping element.

### 3. Responsive
- Always use `viewBox` (e.g. `viewBox="0 0 24 24"`); never rely on fixed width/height alone.
- For fluid sizing: `width="100%"` / `height="100%"` or Tailwind classes.
- Use `preserveAspectRatio` when needed: `xMidYMid meet` (default) or `xMidYMid slice` for cover-like behavior.

### 4. Reuse
- Prefer `<defs>` + `<symbol>` + `<use href="#id">` for icons/shapes used multiple times.
- Put reusable gradients, patterns in `<defs>`.

### 5. Colors
- Icons that inherit from context: `fill="currentColor"` so they adopt parent text color.
- Use theme tokens or CSS variables for template-specific colors.

### 6. Animation
- Use Motion (`motion/react`) from `@/theme/animationPresets` when animating SVG elements.
- Wrap SVG or paths in `motion.path`, `motion.g`, etc. as needed.

### 7. References
- MDN: SVG in HTML, viewBox, defs, symbol, accessibility.
- Optional: SVG.js (`/websites/svgjs_dev_3_2`), D3 (`/d3/d3`) for programmatic/generated graphics if required later.

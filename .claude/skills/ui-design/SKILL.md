---
name: ui-design
description: Apply UI/UX design best practices. Use when creating or modifying components, templates, or tokens to achieve coherent design.
---

Apply UI/UX design best practices for Next.js + Tailwind CSS. Follow these steps when implementing or correcting visual design.

## Steps

### 1. Verify branch
Confirm you are NOT on `main` or `develop`. Create feature branch first if needed.

### 2. Tokens per context
- Templates with their own palette: define in `globals.css` under `[data-template="<slug>"]` or pass variant to composed components.
- Example: FairyTale = `--color-accent` amber; buttons inherit from context.
- Avoid mixing template-specific colors (amber) with global theme (primary indigo).

### 3. Limited and consistent palette
- Max 1 primary color + 1 accent + neutrals (white, gray).
- Use semantic tokens: `--color-action-primary`, `--color-foreground`, etc.
- Never mix `text-amber` with `bg-primary` (indigo) in the same view.

### 4. Buttons and text aligned
- If template is amber: use amber buttons (`bg-amber-600`, `border-amber-500`).
- Or add `accent` variant to `Button` that uses template tokens.
- Buttons and text must share the same color family in each template.

### 5. Responsive
- Mobile-first: base styles for mobile; overrides with `sm:`, `md:`, `lg:`.
- Touch targets: `min-h-[44px]` for buttons and interactive links on mobile.
- Typography: `text-base` on mobile; `text-lg` / `text-xl` on `md:` for headings.

### 6. WCAG AA contrast
- Normal text: 4.5:1 minimum.
- Large text (≥18px or 14px bold): 3:1 minimum.
- Prefer `amber-700` / `amber-800` over `amber-600` on white backgrounds for readability.

### 7. Spacing
- Use Tailwind scale: `gap-4`, `gap-6`, `p-6`, etc.
- Avoid arbitrary values (`p-[17px]`) unless justified.

### 8. References
- Tailwind v4 `@theme`, design-tokens.dev
- WCAG 1.4.3 (Contrast Minimum)
- Mavik Labs: Design Tokens Tailwind v4

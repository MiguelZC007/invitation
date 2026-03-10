---
name: template
description: Create or modify an invitation template. Use when the user wants to add a new invitation design or modify an existing template.
---

Create or modify an invitation template following project conventions.

**Input:** Parse TemplateName (PascalCase), optional description.

## Steps

### 0. Obtener contexto (OBLIGATORIO)
Verificar que el skill `invitation-context` se ha ejecutado y el usuario ha proporcionado toda la información requerida (nombre, slug, contenido, fecha, ubicación, etc.). Si no: ejecutar `.cursor/skills/invitation-context/SKILL.md`, formular las preguntas pendientes y **DETENER**. No continuar al paso 1 hasta tener contexto completo. NUNCA suponer valores.

### 1. Verify branch
Confirm you are NOT on `main` or `develop`. If you are, tell the user to run `/task` first.

### 2. Check existing components
Read available organisms in `src/components/organisms/` to compose the template.
Check if template exists in `src/templates/`.

### 3. Create/modify the template
File: `src/templates/<TemplateName>.tsx`

Rules:
- `"use client"` directive (templates use hooks and Motion).
- Named export: `export function TemplateName({ ... }: Props)`.
- Props `type` with all customizable content (title, subtitle, message, date, etc.).
- Compose from existing organisms: `InvitationHeader`, `InvitationBody`, `ScreenTransition`.
- Motion animations using presets from `@/theme/animationPresets`.
- Responsive Tailwind layout: mobile-first, standard breakpoints; i18n with namespaces and ICU for dates/numbers.
- Semantic HTML structure with proper landmarks.

### 4. Create/update tests
File: `src/templates/<TemplateName>.test.tsx`

Test: all content renders correctly, default props work, accessibility (roles, labels, semantic elements), interactions if any (buttons, navigation).

### 5. Create route page (new templates only)
File: `src/app/[locale]/invitation/<kebab-name>/page.tsx`

Async component, `await params`, validate locale, `setRequestLocale`.

### 6. Update i18n messages (if needed)
Add keys to both `src/messages/es.json` and `src/messages/en.json`.
Keep both files synchronized.

### 7. Run ALL tests
```bash
pnpm test:run
```
Every test must pass.

### 8. Run lint
```bash
pnpm lint
```

### 9. Commit
```bash
git add src/templates/<TemplateName>.tsx src/templates/<TemplateName>.test.tsx
git add src/app/[locale]/invitation/<kebab-name>/  # if new route
git add src/messages/  # if messages updated
git commit -m "feat: add <TemplateName> template"
```

### 10. Report
```
Template: <TemplateName>
File: src/templates/<TemplateName>.tsx
Route: /[locale]/invitation/<kebab-name>
Tests: X passed (Y total)
Lint: clean
Commit: <hash> <message>
```

# Agents (Cursor / AI)

## Reglas del proyecto

- **Package manager**: solo pnpm. No usar npm ni yarn.
- **Next.js 16**: App Router, `output: 'export'` (sitio estático). Rutas bajo `src/app/[locale]/` con next-intl. `params` es Promise — siempre `await params`.
- **React 19**: no forwardRef, no React.FC. Named exports, props como `type`, destructurar en firma.
- **TypeScript 5.9**: strict mode, nunca `any`, usar `unknown`. Types sobre interfaces para props.
- **Idioma**: código y commits en inglés; mensajes de usuario y documentación en español.
- **Testing**: Vitest + React Testing Library. Cobertura mínima 80%. Tests colocados junto a componentes (`*.test.tsx`). Ejecutar TODOS los tests antes de commit/merge.
- **Estructura**: Atomic Design (atoms, molecules, organisms); plantillas en `src/templates/`; tema en `src/theme/`; i18n en `src/i18n/` y `src/messages/`.
- **Diseño**: Tailwind CSS v4 con `@theme inline`; clases estáticas para variantes. Motion (`motion/react`) para animaciones con presets de `@/theme/animationPresets`.
- **No barrel exports**: no `index.ts` re-exportando. Importar siempre desde ruta directa (`@/components/atoms/Button`, no `@/components/atoms`). ESLint enforce.

## Git workflow

- Rama de desarrollo: `develop`. Producción: `main`.
- Nunca commit directo a `main` o `develop`.
- Crear rama feature desde `develop`, trabajar, validar, mergear a `develop`.
- Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
- Validaciones pre-merge: `pnpm lint` + `pnpm test:run` + `pnpm coverage` + `pnpm build`.
- Merge con `--no-ff`. No push automático.

## Rules contextuales

Las reglas detalladas están en `.claude/rules/`:
- `nextjs.md` — reglas específicas de Next.js 16 (scope: `src/app/`)
- `react.md` — patrones de React 19 (scope: `*.tsx`)
- `testing.md` — estándares de testing Vitest + RTL (scope: `*.test.*`)
- `styling.md` — Tailwind CSS v4 + Motion (scope: `*.tsx`, `*.css`)
- `imports.md` — reglas de importación, no barrel exports (global)
- `typescript.md` — TypeScript strict rules (scope: `*.ts`, `*.tsx`)
- `i18n.md` — next-intl 4.x (scope: `*.ts`, `*.tsx`, `*.json`)
- `git-workflow.md` — branching, commits, validaciones (global)

## Commands (slash commands)

- `/task` — Iniciar tarea: crea rama feature desde develop
- `/component` — Crear/modificar componente con tests
- `/template` — Crear/modificar template de invitación
- `/test` — Crear/ejecutar tests para un componente
- `/validate` — Ejecutar lint + tests + coverage + build
- `/finish` — Validar todo y mergear rama a develop

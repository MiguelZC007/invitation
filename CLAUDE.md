# Claude Code Rules

## Imports

- **No barrel exports**: nunca crear archivos `index.ts` que re-exporten módulos. Importar siempre desde la ruta directa del archivo.
  - Correcto: `import { Button } from "@/components/atoms/Button"`
  - Incorrecto: `import { Button } from "@/components/atoms"`
- Esto aplica a todos los directorios: `components/`, `templates/`, `theme/`, etc.
- La regla está reforzada con `no-restricted-imports` en ESLint.

## Package manager

- Solo pnpm. No usar npm ni yarn.

## Testing

- Vitest + React Testing Library. Tests junto al componente (`*.test.tsx`).
- `pnpm test:run` para una pasada, `pnpm coverage` para cobertura con umbrales.
- Antes de cualquier commit o merge: ejecutar TODOS los tests (`pnpm test:run`), no solo los nuevos.

## Git workflow

- Rama de desarrollo: `develop`. Rama de producción: `main`.
- NUNCA hacer commit directo a `main` o `develop`. Siempre crear rama feature desde `develop`.
- Nomenclatura: `feat/`, `fix/`, `refactor/`, `test/`, `docs/`, `chore/` + descripción en kebab-case.
- Conventional commits en inglés: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
- Validaciones antes de merge: lint + ALL tests + coverage (80%) + build.
- Merge con `--no-ff`. No hacer push automáticamente.

## Commands disponibles

- `/task <nombre-rama>` — Crear rama feature desde develop para iniciar una tarea.
- `/component <nivel> <Nombre> [desc]` — Crear/modificar componente (atom, molecule, organism).
- `/template <Nombre> [desc]` — Crear/modificar template de invitación.
- `/test <Nombre>` — Crear/ejecutar tests para un componente.
- `/validate` — Ejecutar todas las validaciones (lint, tests, coverage, build).
- `/finish` — Validar todo y mergear la rama actual a develop.

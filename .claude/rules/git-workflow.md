# Git Workflow Rules

## Ramas
- Rama principal de desarrollo: `develop`.
- Rama de producción: `main` (solo el usuario hace merge a main).
- NUNCA hacer commit directo a `main` o `develop`.
- Siempre crear una rama feature desde `develop` y volver a `develop`.
- Nomenclatura de ramas: `<tipo>/<descripción-kebab-case>`.
  - `feat/` — nueva funcionalidad.
  - `fix/` — corrección de bug.
  - `refactor/` — refactorización sin cambio funcional.
  - `test/` — solo cambios en tests.
  - `docs/` — solo documentación.
  - `chore/` — mantenimiento, configuración, tooling.

## Commits
- Conventional commits en inglés:
  - `feat: add RSVP form component`
  - `fix: correct locale validation in layout`
  - `refactor: simplify animation presets`
  - `test: add tests for LocationBlock`
  - `docs: update CLAUDE.md with workflow rules`
  - `chore: configure ESLint import rules`
- Un cambio lógico por commit.
- Mensaje conciso en la primera línea (max 72 chars).
- Body opcional para contexto adicional.

## Validaciones antes de merge
- `pnpm lint` — sin errores de ESLint.
- `pnpm test:run` — TODOS los tests pasan (no solo los nuevos).
- `pnpm coverage` — cobertura cumple umbrales (80%).
- `pnpm build` — la build estática genera correctamente.

## Merge
- Merge con `--no-ff` para mantener historial de ramas.
- No hacer push — el usuario decide cuándo y a dónde hacer push.
- No eliminar la rama feature después del merge (el usuario decide).

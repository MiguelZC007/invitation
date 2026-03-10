# Git Workflow Rules (OBLIGATORIAS — SIEMPRE CUMPLIR)

## PRIMER PASO — Antes de CUALQUIER edición o plan

**OBLIGATORIO.** Aplica a planes, skills, y cualquier sesión de edición:

1. Ejecutar `git branch --show-current`.
2. Si el resultado es `main` o `develop`: **NO editar**. Crear rama feature primero:
   ```bash
   git checkout develop
   git checkout -b <tipo>/<descripcion> develop
   ```
3. Nombrar la rama según el trabajo: `feat/...`, `fix/...`, `docs/...`, `chore/...`, etc.
4. Solo después de estar en una rama feature: proceder con edits, commits, etc.

**NUNCA** editar archivos ni hacer commit estando en `main` o `develop`. Si el agente detecta que está en develop al iniciar un plan o tarea, DEBE crear la rama antes del primer edit.

## Ramas
- Rama principal de desarrollo: `develop`. Rama de producción: `main` (solo el usuario hace merge a main).
- **NUNCA** commit directo a `main` o `develop`.
- **SIEMPRE** crear rama feature desde `develop` antes de trabajar; al terminar, merge a `develop` (via `/finish` o git-ops).
- Nomenclatura: `<tipo>/<descripción-kebab-case>` — `feat/`, `fix/`, `refactor/`, `test/`, `docs/`, `chore/`.

## Commits
- Conventional commits en inglés. Un cambio lógico por commit. Max 72 chars en la primera línea.

## Validaciones antes de merge (OBLIGATORIAS)
- `pnpm lint` — sin errores.
- `pnpm test:run` — TODOS los tests pasan.
- `pnpm coverage` — umbrales 80%.
- `pnpm build` — build exitosa.

## Merge
- Merge con `--no-ff`. No push automático. No eliminar rama feature tras merge (lo decide el usuario).

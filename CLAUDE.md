# Invitation Project — Orchestration Guide

Orquestador para Claude Code. Indica dónde están rules, skills y agents y cómo usarlos automáticamente.

Referencia unificada: [AGENTS.md](AGENTS.md). Cursor: [CURSOR.md](CURSOR.md).

## Uso automático

Aplicar los sistemas sin esperar invocación explícita (`/task`, etc.):

1. **Rules**: Se cargan solas al editar archivos que coinciden con los globs. No invocar manualmente.

2. **Skills**: Cuando la intención del usuario encaje con el workflow (crear componente, rama, template, tests, validar, mergear), leer y seguir el `SKILL.md` correspondiente en `.claude/skills/<nombre>/`.

3. **Agents**: Cuando la tarea requiera un especialista (revisión, tests complejos, git), delegar al agent indicado en `.claude/agents/`.

## Ubicaciones

| System    | Location                  | Activación automática                    |
|-----------|---------------------------|------------------------------------------|
| Rules     | `.claude/rules/*.md`      | Por globs según archivos en contexto     |
| Skills    | `.claude/skills/<nombre>/SKILL.md` | Por intención del usuario = description |
| Agents    | `.claude/agents/<nombre>.md`       | Por delegación cuando la tarea lo pida   |
| Hooks     | `.claude/settings.json`   | PreToolUse, Stop (automáticos)            |

## Workflow

```
/task feat/my-feature     →  creates branch from develop
  ↓
/component atom Button    →  creates component + tests + commit
/template GalaInvitation  →  creates template + route + commit
/test Button              →  writes/runs tests + commit
  ↓
/validate                 →  lint + ALL tests + coverage + build
  ↓
/finish                   →  validates everything → merge to develop
```

Always start from `develop`. Never commit to `main` or `develop` directly.

## Rules (auto-loaded)

| Rule       | Archivo                 | Scope              |
|------------|-------------------------|--------------------|
| nextjs     | `.claude/rules/nextjs.md`    | `src/app/**`       |
| react      | `.claude/rules/react.md`     | `*.tsx`            |
| testing    | `.claude/rules/testing.md`  | `*.test.*`         |
| styling    | `.claude/rules/styling.md`  | `*.tsx`, `*.css`   |
| imports    | `.claude/rules/imports.md`  | global             |
| typescript | `.claude/rules/typescript.md`| `*.ts`, `*.tsx`    |
| i18n       | `.claude/rules/i18n.md`     | `*.ts`, `*.tsx`, `*.json` |
| git-workflow | `.claude/rules/git-workflow.md` | global     |

Cargar automáticamente al editar archivos que coincidan. No invocar.

## Skills (aplicar por intención)

| Intención                    | Skill path                     | Acción                                      |
|-----------------------------|---------------------------------|---------------------------------------------|
| Crear rama, empezar tarea   | `.claude/skills/task/SKILL.md`   | Branch desde develop                        |
| Añadir/modificar componente | `.claude/skills/component/SKILL.md` | Componente + tests + commit                 |
| Añadir/modificar template   | `.claude/skills/template/SKILL.md` | Template + ruta + commit                    |
| Escribir o corregir tests   | `.claude/skills/test/SKILL.md`    | Tests + commit                              |
| Validar proyecto            | `.claude/skills/validate/SKILL.md` | lint + tests + coverage + build            |
| Finalizar, mergear          | `.claude/skills/finish/SKILL.md`   | Validar + merge a develop                    |

Si el usuario pide algo equivalente (p.ej. "añade un Botón", "crea la rama feat/button"), leer el SKILL.md y ejecutarlo. No esperar a `/command`.

## Agents (delegar cuando convenga)

| Agent          | Archivo                    | Delegar cuando                          |
|----------------|----------------------------|-----------------------------------------|
| code-reviewer  | `.claude/agents/code-reviewer.md` | Review, validar calidad, lint/tests |
| test-writer    | `.claude/agents/test-writer.md`    | Tests complejos, cobertura, fixes  |
| git-ops        | `.claude/agents/git-ops.md`        | Branch, commit, merge                 |

Delegar para tareas focalizadas. No modificar código en code-reviewer/git-ops.

## Critical rules (always enforced)

### Imports
- **No barrel exports**: never create `index.ts` re-export files.
- Import from direct path: `import { Button } from "@/components/atoms/Button"`.
- Enforced by ESLint `no-restricted-imports`.

### Package manager
- **Only pnpm**. Never npm or yarn.

### Testing
- Vitest + React Testing Library. Tests colocated: `*.test.tsx`.
- Run ALL tests before any commit: `pnpm test:run`.
- Coverage thresholds: 80% (lines, functions, branches, statements).

### Git workflow
- Branch from `develop`, merge back to `develop` with `--no-ff`.
- Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
- Pre-merge: lint + ALL tests + coverage + build must pass.
- Never push automatically. User decides when to push.

### Code standards
- TypeScript strict: no `any`. Props as `type`, not `interface`.
- React 19: no `forwardRef`, no `React.FC`. Named exports only.
- Next.js 16: `await params`, `setRequestLocale()`, `"use client"` only when needed.
- Tailwind: static utility classes. No dynamic class interpolation.
- Motion: import from `motion/react`, use presets from `@/theme/animationPresets`.
- Accessibility: semantic HTML, ARIA roles, keyboard support.

# Cursor — Invitation Project

Orquestador para Cursor IDE. Indica dónde están rules, skills y agents y cómo usarlos automáticamente.

Referencia unificada: [AGENTS.md](AGENTS.md). Claude: [CLAUDE.md](CLAUDE.md).

## Uso automático

Aplicar sin esperar `/command`:

1. **Rules**: Cursor las carga por globs (`Apply to Specific Files`) o relevance (`Apply Intelligently`). No invocar.

2. **Skills**: Cuando la intención encaje con la `description` del skill, leer `.cursor/skills/<nombre>/SKILL.md` y seguir los pasos.

3. **Agents**: Usar `mcp_task` con `subagent_type` cuando la tarea requiera especialista (review, tests, git).

## Ubicaciones

| System  | Location                          | Activación                                |
|---------|-----------------------------------|-------------------------------------------|
| Rules   | `.cursor/rules/*.mdc`             | Por globs o description (Cursor)          |
| Skills  | `.cursor/skills/<nombre>/SKILL.md`| Por intención = description del skill     |
| Agents  | `mcp_task` + `subagent_type`      | code-reviewer | test-writer | git-ops           |

## Workflow

```
/task feat/my-feature     →  crea rama desde develop
  ↓
/component atom Button    →  componente + tests + commit
/template GalaInvitation   →  template + ruta + commit
/test Button              →  escribe/ejecuta tests + commit
  ↓
/validate                 →  lint + tests + coverage + build
  ↓
/finish                   →  valida todo → merge a develop
```

Siempre partir de `develop`. Nunca commit directo en `main` o `develop`.

## Skills (aplicar por intención)

| Intención                    | Skill path                           | Acción                          |
|-----------------------------|--------------------------------------|---------------------------------|
| Crear rama, empezar tarea   | `.cursor/skills/task/SKILL.md`       | Branch desde develop            |
| Añadir/modificar componente | `.cursor/skills/component/SKILL.md`  | Componente + tests + commit     |
| Añadir/modificar template   | `.cursor/skills/template/SKILL.md`   | Template + ruta + commit        |
| Escribir o corregir tests   | `.cursor/skills/test/SKILL.md`       | Tests + commit                  |
| Validar proyecto            | `.cursor/skills/validate/SKILL.md`   | lint + tests + coverage + build |
| Finalizar, mergear          | `.cursor/skills/finish/SKILL.md`     | Validar + merge a develop       |

Si el usuario pide "añade un Botón" o "crea feat/button", aplicar el skill sin esperar `/task` o `/component`.

## Rules (rutas)

| Regla    | Archivo                               | Scope             |
|----------|---------------------------------------|-------------------|
| nextjs   | `.cursor/rules/nextjs.mdc`             | `src/app/**`      |
| react    | `.cursor/rules/react.mdc`             | `*.tsx`           |
| typescript | `.cursor/rules/typescript.mdc`       | `*.ts`, `*.tsx`   |
| styling  | `.cursor/rules/styling.mdc`           | `*.tsx`, `*.css`  |
| testing  | `.cursor/rules/testing.mdc`           | `*.test.*`        |
| i18n     | `.cursor/rules/i18n.mdc`              | `*.ts`, `*.tsx`, `*.json` |
| imports  | `.cursor/rules/imports.mdc`           | alwaysApply       |
| git-workflow | `.cursor/rules/git-workflow.mdc`   | alwaysApply       |
| agent-delegation | `.cursor/rules/agent-delegation.mdc` | alwaysApply  |

## Delegación a agents (mcp_task)

| Tarea                    | subagent_type   |
|---------------------------|-----------------|
| Revisar código            | `code-reviewer` |
| Escribir/corregir tests   | `test-writer`   |
| Branching, commits, merge | `git-ops`       |

Usar cuando la tarea requiera especialista aislado, sin que el usuario lo pida.

## Reglas críticas

- Sin barrel exports: `import { Button } from "@/components/atoms/Button"`
- Solo pnpm (no npm, no yarn)
- Tests: Vitest + RTL, cobertura 80%
- Git: conventional commits, merge `--no-ff`

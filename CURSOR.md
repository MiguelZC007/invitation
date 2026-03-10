# Cursor — Invitation Project

Orquestador para Cursor IDE. Indica dónde están rules, skills y agents y cómo usarlos automáticamente.

Referencia unificada: [AGENTS.md](AGENTS.md). Claude: [CLAUDE.md](CLAUDE.md).

## Uso automático

Aplicar sin esperar `/command`:

1. **Rules**: Cursor las carga por globs (`Apply to Specific Files`) o relevance (`Apply Intelligently`). No invocar.

2. **Skills**: Cuando la intención encaje con la `description` del skill, leer `.cursor/skills/<nombre>/SKILL.md` y seguir los pasos.

3. **Agents**: Usar `mcp_task` con `subagent_type` cuando la tarea requiera especialista (review, tests, git, diseño, SVG).

## Ubicaciones

| System  | Location                          | Activación                                |
|---------|-----------------------------------|-------------------------------------------|
| Rules   | `.cursor/rules/*.mdc`             | Por globs o description (Cursor)          |
| Skills  | `.cursor/skills/<nombre>/SKILL.md`| Por intención = description del skill     |
| Agents  | `.cursor/agents/<nombre>.md`       | mcp_task + subagent_type                  |

## Workflow

```
PRIMERO: git branch --show-current → si main/develop → crear rama feat/... desde develop
  ↓
/task feat/my-feature     →  crea rama desde develop (si no existe)
  ↓
Nueva invitación: invitation-context (OBLIGATORIO) → template  (sin contexto completo, NO iniciar)
  ↓
/component, /template, /test, planes  →  TODO en rama feature
  ↓
/validate                 →  lint + tests + coverage + build
  ↓
/finish                   →  valida todo → merge a develop
```

**OBLIGATORIO:** Antes de ejecutar planes, skills o cualquier edit: verificar rama. Si está en `main` o `develop`, crear rama feature y hacer checkout. NUNCA editar en develop.

**Invitation context:** Antes de cualquier tarea de invitación: ejecutar `invitation-context`. Sin contexto completo del usuario, NO iniciar. La IA no debe suponer; siempre preguntar.

## Skills (aplicar por intención)

| Intención                    | Skill path                           | Acción                          |
|-----------------------------|--------------------------------------|---------------------------------|
| Crear rama, empezar tarea   | `.cursor/skills/task/SKILL.md`       | Branch desde develop            |
| Obtener contexto invitación | `.cursor/skills/invitation-context/SKILL.md` | OBLIGATORIO antes de template. Sin contexto, no iniciar. |
| Añadir/modificar componente | `.cursor/skills/component/SKILL.md`  | Componente + tests + commit     |
| Añadir/modificar template   | `.cursor/skills/template/SKILL.md`   | Template + ruta + commit (requiere invitation-context previo) |
| Escribir o corregir tests   | `.cursor/skills/test/SKILL.md`       | Tests + commit                  |
| Validar proyecto            | `.cursor/skills/validate/SKILL.md`   | lint + tests + coverage + build |
| Finalizar, mergear          | `.cursor/skills/finish/SKILL.md`     | Validar + merge a develop       |
| Implementar/corregir diseño UI/UX | `.cursor/skills/ui-design/SKILL.md` | Aplicar buenas prácticas de diseño |
| Crear/modificar SVG, iconos, ilustraciones | `.cursor/skills/svg-design/SKILL.md` | Buenas prácticas SVG inline |
| Verificar diseño UI/UX     | `.cursor/skills/design-audit/SKILL.md` | Auditar paleta, contraste, responsive |

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
| invitation-checklist | `.cursor/rules/invitation-checklist.mdc` | alwaysApply  |
| ui-design | `.cursor/rules/ui-design.mdc`        | `*.tsx`, `*.css`, `src/theme/**` |
| svg-design | `.cursor/rules/svg-design.mdc`      | `src/**/*.{tsx,svg}` |

## Delegación a agents (mcp_task)

| Tarea                     | subagent_type     |
|----------------------------|-------------------|
| Revisar código             | `code-reviewer`   |
| Escribir/corregir tests    | `test-writer`     |
| Branching, commits, merge  | `git-ops`         |
| Implementar diseño UI/UX   | `ui-designer`     |
| Crear/modificar SVG        | `svg-designer`    |
| Verificar diseño UI/UX     | `design-verifier` |

Usar cuando la tarea requiera especialista aislado, sin que el usuario lo pida.

## Reglas críticas

- Sin barrel exports: `import { Button } from "@/components/atoms/Button"`
- Solo pnpm (no npm, no yarn)
- Tests: Vitest + RTL, cobertura 80%
- Git: conventional commits, merge `--no-ff`
- **Persistir cambios**: Al completar un plan, SIEMPRE hacer commit. NUNCA revertir a develop sin merge. Permanecer en la rama feature con los commits aplicados.
- **Invitation context**: No suponer. Solicitar contexto antes de implementar invitaciones. Ejecutar `invitation-context` antes de `template`.

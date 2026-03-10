# Agents Guide — Invitation Project

Orquestador central (Claude, Cursor, etc.). Indica dónde están rules, skills y agents, y cómo usarlos automáticamente según el contexto.

Referencias por entorno: [CLAUDE.md](CLAUDE.md) (Claude Code), [CURSOR.md](CURSOR.md) (Cursor IDE).

## Uso automático (sin invocación explícita)

El agente debe detectar la intención del usuario y aplicar los sistemas correspondientes:

| Intención detectada | Acción automática |
|--------------------|-------------------|
| Usuario edita `src/app/**`, `*.tsx`, `*.test.*`, etc. | Reglas aplican por glob — leer `.cursor/rules/*.mdc` o `.claude/rules/*.md` según el entorno |
| Usuario pide **nueva invitación** o crear/modificar template | PRIMERO `invitation-context` (obtener información). Sin contexto completo, NO iniciar. Luego `template`. |
| Usuario pide crear rama, componente, tests, validar o mergear | Aplicar skill correspondiente — leer `SKILL.md` de la carpeta indicada |
| Usuario pide revisión de código, tests complejos, o operaciones git | Delegar a agent — `mcp_task` (Cursor) con `subagent_type` adecuado |

No esperar a que el usuario escriba `/task` o `/component`. Si dice "añade un botón" o "crea la rama feat/button", aplicar el skill directamente.

## Ubicaciones y activación

```
.claude/                         ← Claude Code
├── rules/*.md                   ← Activación: archivos abiertos coinciden con globs
├── agents/*.md                  ← Delegación explícita (code-reviewer, test-writer, git-ops, ui-designer, svg-designer, design-verifier)
├── skills/<nombre>/SKILL.md     ← Activación: intención del usuario coincide con description
└── settings.json                ← Hooks automáticos

.cursor/                         ← Cursor IDE
├── rules/*.mdc                  ← Activación: Apply Intelligently o Apply to Specific Files
├── skills/<nombre>/SKILL.md     ← Activación: Agent decide por description, o /skill-name
└── (agents vía mcp_task)         ← subagent_type: code-reviewer | test-writer | git-ops
```

**Rules**: Se cargan solas cuando archivos coinciden. No invocar manualmente.
- Cursor: `.cursor/rules/*.mdc`
- Claude: `.claude/rules/*.md`
- `responsive-design` → globs: `*.tsx`, `*.css`

**Skills**: Leer el SKILL.md cuando la petición del usuario encaje con la `description`.
- Cursor: `.cursor/skills/<nombre>/SKILL.md`
- Claude: `.claude/skills/<nombre>/SKILL.md`

**Agents**: Delegar cuando la tarea requiera especialista.
- Cursor: `mcp_task` + `subagent_type` (code-reviewer | test-writer | git-ops)
- Claude: invocar agent desde `.claude/agents/<nombre>.md`

## Project stack

| Tech          | Version  | Key notes                                    |
|---------------|----------|----------------------------------------------|
| Next.js       | 16.1.6   | App Router, `output: 'export'`, `await params` |
| React         | 19.2.3   | No forwardRef/FC, named exports, ref as prop |
| TypeScript    | 5.9      | Strict mode, no `any`, type over interface   |
| Tailwind CSS  | 4.x      | `@theme inline`, static class names          |
| Motion        | 12.x     | `motion/react`, presets in animationPresets   |
| next-intl     | 4.8.3    | es (default), en; `setRequestLocale`         |
| Vitest        | 4.x      | + RTL + jest-dom; 80% coverage thresholds    |
| pnpm          | 10.28.2  | Only package manager allowed                 |

## Git workflow

```
main (production — user merges manually)
 └── develop (integration)
      └── feat/my-feature (work here)
           ├── commit: feat: add component
           ├── commit: test: add tests
           └── /finish → validate → merge --no-ff → develop
```

- **Start**: `/task feat/branch-name` (or manually: `git checkout -b feat/name develop`)
- **Work**: implement, test, commit with conventional commits
- **End**: `/finish` validates lint + ALL tests + coverage + build, then merges to develop
- **Deploy**: user merges develop → main manually

## Mandatory validations (before any merge)

```bash
pnpm lint          # ESLint — no errors
pnpm test:run      # ALL tests pass (not just new ones)
pnpm coverage      # 80% lines, functions, branches, statements
pnpm build         # Static export succeeds
```

## Project structure

```
src/
├── app/                          # App Router
│   ├── globals.css               # Tailwind @theme inline
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Redirects to /es
│   └── [locale]/                 # i18n routes
│       ├── layout.tsx            # NextIntlClientProvider
│       ├── page.tsx              # Home
│       ├── invitation/           # Invitation routes
│       └── templates/            # Template preview routes
├── components/                   # Atomic Design
│   ├── atoms/                    # Button, Icon, Text
│   ├── molecules/                # DateTimeBlock, LocationBlock, TitleSubtitle
│   └── organisms/                # InvitationHeader, InvitationBody, ScreenTransition
├── templates/                    # Invitation templates
│   ├── SinglePageInvitation.tsx
│   └── MultiScreenInvitation.tsx
├── theme/                        # Design tokens (NO index.ts)
│   ├── tokens.ts
│   └── animationPresets.ts
├── i18n/                         # Internationalization config
│   ├── routing.ts
│   └── request.ts
└── messages/                     # Translation files
    ├── es.json
    └── en.json
```

## Non-negotiable rules

1. **Branch before edit**: Antes de CUALQUIER edit o plan, verificar `git branch --show-current`. Si `main` o `develop`, crear rama feature primero. NUNCA editar en develop.
2. **Persist changes on completion**: Al completar un plan o tarea, SIEMPRE hacer commit de los cambios. NUNCA terminar con cambios sin commitear. NUNCA hacer `git checkout develop` sin merge previo; permanecer en la rama feature.
3. **No barrel exports**: never `index.ts`. Import `@/components/atoms/Button`, not `@/components/atoms`.
4. **Only pnpm**: no npm, no yarn.
5. **ALL tests must pass** before commit or merge.
6. **Never commit to main or develop** directly.
7. **Conventional commits** in English: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
8. **TypeScript strict**: no `any`, no type assertions without justification.
9. **Accessible by default**: semantic HTML, ARIA, keyboard support.
10. **Invitation context**: No suponer. Antes de implementar una invitación, ejecutar `invitation-context` y obtener toda la información del usuario. Sin contexto completo, NO iniciar la tarea.

## Mapeo: intención → skill → agent

| Intención del usuario | Skill a aplicar | Delegar a agent cuando |
|-----------------------|-----------------|-------------------------|
| Crear rama, empezar tarea | `task` → `.cursor/skills/task/` | git-ops para operaciones git |
| **Añadir nueva invitación** | PRIMERO `invitation-context` (obligatorio), luego `template` | test-writer si tests complejos |
| Añadir/modificar componente | `component` → `.cursor/skills/component/` | test-writer si tests complejos |
| Añadir/modificar template | `template` → `.cursor/skills/template/` (requiere contexto de invitation-context) | test-writer si tests complejos |
| Escribir o corregir tests | `test` → `.cursor/skills/test/` | test-writer para cobertura amplia |
| Revisar código, validar calidad | `validate` → `.cursor/skills/validate/` | code-reviewer para review completo |
| Finalizar, mergear a develop | `finish` → `.cursor/skills/finish/` | git-ops para merge |
| Implementar/corregir diseño UI/UX | `ui-design` → `.cursor/skills/ui-design/` | ui-designer (Claude) o agente principal con skill |
| Implementar/modificar SVG, iconos, ilustraciones | `svg-design` → `.cursor/skills/svg-design/` | svg-designer (Claude) o agente principal con skill |
| Verificar diseño UI/UX | `design-audit` → `.cursor/skills/design-audit/` | design-verifier (Claude) o generalPurpose (Cursor) |

### Cursor: mcp_task

Delegar sin que el usuario lo pida cuando la tarea lo requiera:

- `subagent_type: "code-reviewer"` — review, lint, tests (Read, Bash)
- `subagent_type: "test-writer"` — crear/corregir tests (Read, Write, Edit, Bash)
- `subagent_type: "git-ops"` — branch, commit, merge (Read, Bash)
- `subagent_type: "generalPurpose"` — design-audit: verificar diseño UI/UX (Read, Grep, Glob). Prompt: aplicar design-audit SKILL, no modificar código.

### Claude

Agents definidos en `.claude/agents/`. Delegar con el mecanismo nativo de Claude.
- ui-designer: implementar diseño siguiendo ui-design skill
- svg-designer: implementar SVG siguiendo svg-design skill
- design-verifier: auditar diseño UI/UX solo (no modifica código)

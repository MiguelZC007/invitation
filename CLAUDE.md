# Invitation Project — Orchestration Guide

This document is the central orchestrator. It tells Claude where everything is and how to use each system.

## Quick reference

| System    | Location                  | Purpose                          |
|-----------|---------------------------|----------------------------------|
| Rules     | `.claude/rules/*.md`      | Best practices auto-loaded by file context |
| Skills    | `.claude/skills/*/SKILL.md` | User-invocable workflows (`/task`, `/component`, etc.) |
| Agents    | `.claude/agents/*.md`     | Specialized AI assistants for delegation |
| Hooks     | `.claude/settings.json`   | Deterministic enforcement (pre/post tool) |

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

## Rules (auto-loaded by file context)

| Rule       | Scope                  | Enforces                                  |
|------------|------------------------|--------------------------------------------|
| nextjs     | `src/app/**`           | Next.js 16: async params, static export    |
| react      | `*.tsx`                | React 19: no legacy APIs, named exports    |
| testing    | `*.test.*`             | Vitest + RTL: accessible queries, coverage |
| styling    | `*.tsx`, `*.css`       | Tailwind v4 static classes, Motion presets |
| imports    | global                 | No barrel exports, direct `@/*` paths      |
| typescript | `*.ts`, `*.tsx`        | Strict: no `any`, type over interface      |
| i18n       | `*.ts`, `*.tsx`, `*.json` | next-intl: locales sync, setRequestLocale |
| git-workflow | global               | Branching, conventional commits, validations |

Rules load automatically when editing matching files. No manual invocation needed.

## Skills (user-invocable slash commands)

| Command                            | What it does                              |
|-------------------------------------|-------------------------------------------|
| `/task <branch-name>`              | Create feature branch from develop        |
| `/component <level> <Name> [desc]` | Create/modify component + tests + commit  |
| `/template <Name> [desc]`         | Create/modify template + route + commit   |
| `/test <Name>`                     | Write/run tests for a component           |
| `/validate`                        | Run lint + tests + coverage + build       |
| `/finish`                          | Validate all + merge branch to develop    |

Each skill handles the full cycle: implement → test → lint → commit.

## Agents (specialized delegation)

| Agent          | Use when                                    | Can do         |
|----------------|---------------------------------------------|----------------|
| code-reviewer  | Need to review code quality and practices   | Read, Bash     |
| test-writer    | Need to create or fix tests                 | Read, Write, Edit, Bash |
| git-ops        | Need branching, committing, or merging      | Read, Bash     |

Agents run in isolated context. Delegate to them for focused subtasks.

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

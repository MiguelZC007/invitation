# Agents Guide — Invitation Project

This document serves as the orchestration reference for AI agents (Claude Code, Cursor, and others).

## Architecture overview

```
.claude/
├── rules/          ← Best practices, auto-loaded by file context
│   ├── nextjs.md        (src/app/**)
│   ├── react.md         (*.tsx)
│   ├── testing.md       (*.test.*)
│   ├── styling.md       (*.tsx, *.css)
│   ├── imports.md       (global)
│   ├── typescript.md    (*.ts, *.tsx)
│   ├── i18n.md          (*.ts, *.tsx, *.json)
│   └── git-workflow.md  (global)
├── agents/         ← Specialized AI assistants
│   ├── code-reviewer.md  (read-only review, lint, tests)
│   ├── test-writer.md     (create/fix tests, coverage)
│   └── git-ops.md         (branching, commits, merges)
├── skills/         ← User-invocable workflows
│   ├── task/        → /task: create branch from develop
│   ├── component/   → /component: create component + tests
│   ├── template/    → /template: create template + route
│   ├── test/        → /test: write/run tests
│   ├── validate/    → /validate: lint + tests + coverage + build
│   └── finish/      → /finish: validate + merge to develop
└── settings.json   ← Hooks and shared settings
```

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

1. **No barrel exports**: never `index.ts`. Import `@/components/atoms/Button`, not `@/components/atoms`.
2. **Only pnpm**: no npm, no yarn.
3. **ALL tests must pass** before commit or merge.
4. **Never commit to main or develop** directly.
5. **Conventional commits** in English: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
6. **TypeScript strict**: no `any`, no type assertions without justification.
7. **Accessible by default**: semantic HTML, ARIA, keyboard support.

## Agent delegation guide

| Task                        | Delegate to     | Skill to use  |
|-----------------------------|-----------------|---------------|
| Create new component        | (self + test-writer) | `/component` |
| Create new template         | (self + test-writer) | `/template`  |
| Write or fix tests          | test-writer     | `/test`       |
| Review code quality         | code-reviewer   | (manual)      |
| Branch/commit/merge         | git-ops         | `/task`, `/finish` |
| Full project validation     | code-reviewer   | `/validate`   |

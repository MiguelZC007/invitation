# Invitation

Proyecto de invitaciones digitales: diseño altamente configurable, multiidioma y animado. Next.js (App Router, static export), React 19, TypeScript, next-intl, Motion, Tailwind CSS, Atomic Design.

## Requisitos

- Node.js 20+
- pnpm (recomendado Corepack: `corepack enable`)

## Instalación

Solo por línea de comandos con pnpm:

```bash
pnpm install
```

## Scripts

- `pnpm dev` — desarrollo
- `pnpm build` — build estático (salida en `out/`)
- `pnpm start` — sirve el build (si no usas static export)
- `pnpm test` — tests (Vitest) en watch
- `pnpm test:run` — tests una vez
- `pnpm coverage` — cobertura; falla si no se cumplen umbrales
- `pnpm lint` — ESLint

## Estructura

- `src/app/[locale]/` — rutas por idioma
- `src/components/` — Atomic Design (atoms, molecules, organisms)
- `src/templates/` — plantillas de invitación (single-page, multi-pantalla)
- `src/theme/` — tokens y presets de animación
- `src/i18n/` y `src/messages/` — i18n (next-intl)

## Idiomas

Configurados en `src/i18n/routing.ts`. Mensajes en `src/messages/`.

---
globs: ["src/app/**/*.{ts,tsx}"]
---

# Next.js 16 Rules

- `params` en pages y layouts es `Promise<{...}>` — siempre usar `await params`.
- Usar `setRequestLocale(locale)` en cada page y layout para habilitar static rendering.
- Validar locale con `hasLocale(routing.locales, locale)` antes de usarlo.
- Los componentes de page son `async` por defecto en App Router.
- Usar `generateStaticParams()` en layouts/pages dinámicos para static export.
- `output: 'export'` — NO usar features de servidor: no API routes, no middleware, no server actions, no `cookies()`, no `headers()`.
- Layouts envuelven children con providers (`NextIntlClientProvider`).
- Directiva `"use client"` solo cuando se usan hooks, event handlers o APIs del navegador.
- Metadata se exporta desde layouts/pages server-side (no en client components).
- Imports de fuentes con `next/font/google`, aplicar via CSS variables en el body.

## Server vs Client
- Server Components por defecto; `"use client"` solo para: hooks (`useState`, `useEffect`), event handlers, `useRouter`, `usePathname`, `useSearchParams`, APIs del navegador.
- Data fetching en Server Components: `fetch()` con `cache: 'force-cache'` (estático), `cache: 'no-store'` (dinámico), `next: { revalidate: N }` para revalidación.
- Imports de routing: `useRouter`, `usePathname`, `useSearchParams` desde `next/navigation` (no `next/router`).

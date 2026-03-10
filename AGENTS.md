# Agents (Cursor / AI)

## Reglas del proyecto

- **Package manager**: solo pnpm. No usar npm ni yarn. Instalación y scaffold únicamente por línea de comandos (`pnpm create next-app`, `pnpm add`, etc.); no crear el proyecto manualmente.
- **Next.js**: App Router, `output: 'export'` (sitio estático). Rutas bajo `src/app/[locale]/` con next-intl.
- **Idioma**: código y commits en español cuando sea documentación o mensajes de usuario; identificadores y nombres técnicos en inglés.
- **Testing**: Vitest + React Testing Library. Cobertura con umbrales estrictos; `pnpm run coverage` debe pasar en CI. Tests junto a componentes (`*.test.tsx`) o en `__tests__/`.
- **Estructura**: Atomic Design (atoms, molecules, organisms); plantillas en `src/templates/`; tema en `src/theme/`; i18n en `src/i18n/` y `src/messages/`.
- **Diseño**: Tailwind con `@theme`; variantes de componente con clases completas/estáticas para que Tailwind las detecte. Animaciones con Motion (variants, AnimatePresence).
- **No barrel exports**: no crear archivos `index.ts` que solo re-exporten otros módulos. Importar siempre desde la ruta directa del archivo (e.g. `@/components/atoms/Button`, no `@/components/atoms`). Esto mejora el tree-shaking, evita dependencias circulares y hace explícito el origen de cada import.

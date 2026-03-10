# Claude Code Rules

## Imports

- **No barrel exports**: nunca crear archivos `index.ts` que re-exporten módulos. Importar siempre desde la ruta directa del archivo.
  - Correcto: `import { Button } from "@/components/atoms/Button"`
  - Incorrecto: `import { Button } from "@/components/atoms"`
- Esto aplica a todos los directorios: `components/`, `templates/`, `theme/`, etc.
- La regla está reforzada con `no-restricted-imports` en ESLint.

## Package manager

- Solo pnpm. No usar npm ni yarn.

## Testing

- Vitest + React Testing Library. Tests junto al componente (`*.test.tsx`).
- `pnpm test:run` para una pasada, `pnpm coverage` para cobertura con umbrales.

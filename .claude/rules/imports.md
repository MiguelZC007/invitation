# Import Rules

## No barrel exports
- NUNCA crear archivos `index.ts` que re-exporten módulos.
- Importar siempre desde la ruta directa del archivo.
  - Correcto: `import { Button } from "@/components/atoms/Button"`.
  - Incorrecto: `import { Button } from "@/components/atoms"`.
- Aplica a todos los directorios: `components/`, `templates/`, `theme/`, etc.
- ESLint enforce con `no-restricted-imports`.

## Alias y organización
- Usar alias `@/*` para todas las importaciones internas (mapea a `src/*`).
- Orden de imports:
  1. React / framework (`react`, `next/*`, `motion/react`).
  2. Paquetes externos (`next-intl`, etc.).
  3. Módulos internos (`@/components/*`, `@/theme/*`, `@/templates/*`).
  4. Relativos (solo si es en el mismo directorio y tiene sentido).
- No dependencias circulares.
- Usar `import { type X }` para importaciones solo de tipos.

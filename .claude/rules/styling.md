---
globs: ["src/**/*.tsx", "src/**/*.css"]
---

# Styling Rules (Tailwind CSS v4 + Motion)

## Tailwind CSS v4
- Usar clases utilitarias de Tailwind — no inline styles (`style={}`).
- Theme tokens en `src/theme/tokens.ts` — usar para acceso programático.
- Variables CSS definidas en `src/app/globals.css` con `@theme inline`.
- Clases de variante deben ser completas/estáticas para que Tailwind las detecte:
  - Correcto: `const classes = { primary: "bg-indigo-500", secondary: "bg-amber-500" }`.
  - Incorrecto: `const cls = \`bg-${color}-500\`` (Tailwind no detecta clases dinámicas).
- Responsive: enfoque mobile-first (`sm:`, `md:`, `lg:`).
- Dark mode: usar `prefers-color-scheme` (ya configurado en globals.css).

## Responsive (Tailwind v4)
- Mobile-first: base = móvil; `sm:`, `md:`, `lg:` para escalar.
- Ejemplo: `class="w-full md:w-1/2 lg:w-1/3"`.
- Container queries: `@container` en padre, `@md:flex-row` en hijos cuando el contenedor crece.
- No clases dinámicas: `cls=\`bg-${color}\`` incorrecto; usar mapas de clases estáticos.

## Motion (motion/react)
- Importar desde `motion/react`, NO desde `framer-motion`.
- Usar presets de `@/theme/animationPresets`: `fadeIn`, `slideUp`, `scaleIn`, `staggerContainer`, `defaultTransition`.
- `motion.div`, `motion.button`, etc. para elementos animados.
- `AnimatePresence` para animaciones de entrada/salida.
- `whileInView` con `once: true` para animaciones al scroll.
- `whileHover` y `whileTap` para feedback de interacción.
- Variants para animaciones coordinadas (parent stagger + children).

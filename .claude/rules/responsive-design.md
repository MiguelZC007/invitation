---
globs: ["src/**/*.{tsx,css}"]
---

# Responsive Design Rules

- Mobile-first: clases base aplican a móvil; prefijos `sm:`, `md:`, `lg:` sobrescriben en pantallas mayores.
- Breakpoints Tailwind: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px — cada uno `@media (min-width: X)`.
- Patrón: estilos sin prefijo = móvil; `md:` y `lg:` para tablet/desktop.
- Container queries para componentes reutilizables: `@container` en padre, variantes `@md:`, `@lg:` en hijos cuando el contenedor crece.
- No interpolación dinámica de clases — Tailwind no detecta `cls=\`bg-${color}\``; usar mapas estáticos.
- Touch-friendly: `min-h-[44px]` o equivalente para botones/links interactivos en móvil.

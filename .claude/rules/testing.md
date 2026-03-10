---
globs: ["src/**/*.test.{ts,tsx}"]
---

# Testing Rules (Vitest + React Testing Library)

## Estructura
- Usar `describe` + `it` (no `test`).
- Un `describe` por componente/función, `it` por caso de uso.
- Archivo colocado junto al componente: `ComponentName.test.tsx`.

## Imports
- De `vitest`: `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach`.
- De `@testing-library/react`: `render`, `screen`, `within`, `waitFor`.
- De `@testing-library/user-event`: `userEvent` para interacciones (click, type, etc.).
- NO importar de `@testing-library/jest-dom` (ya está en vitest.setup.ts).

## Queries (orden de preferencia)
1. `getByRole` — siempre preferido (botones, headings, links, navigation, etc.).
2. `getByLabelText` — para inputs con label.
3. `getByText` — para contenido de texto visible.
4. `getByTestId` — SOLO si no hay alternativa accesible.
- NUNCA usar `container.querySelector` ni acceder al DOM directamente.

## Assertions
- Usar matchers de jest-dom: `toBeInTheDocument()`, `toHaveClass()`, `toHaveAttribute()`, `toBeVisible()`.
- Testear comportamiento, no implementación — no snapshot tests.
- Verificar accesibilidad: roles ARIA, labels, estructura semántica.

## Mocks
- next-intl: `vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }))`.
- Motion: los componentes renderizan sin animación (IntersectionObserver mock en vitest.setup.ts).
- NO mockear componentes internos del proyecto salvo necesidad justificada.

## Ejecución
- `pnpm test:run` — todos los tests deben pasar.
- `pnpm coverage` — umbrales mínimos: 80% lines, functions, branches, statements.
- Antes de commit o merge: ejecutar TODOS los tests, no solo los nuevos.

## Interacciones
- Siempre usar `const user = userEvent.setup()` al inicio del test.
- Usar `await user.click()`, `await user.type()`, etc. (no `fireEvent`).

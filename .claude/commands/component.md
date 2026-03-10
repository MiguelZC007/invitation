Crear o modificar un componente siguiendo Atomic Design y las convenciones del proyecto.

Argumento: $ARGUMENTS (formato: `<nivel> <NombreComponente> [descripción]`)
- Niveles válidos: `atom`, `molecule`, `organism`
- Ejemplo: `atom InputField campo de texto con label`

## Pasos:

### 1. Parsear argumentos
- Extraer nivel (atom/molecule/organism), nombre del componente (PascalCase) y descripción opcional.
- Directorio destino: `src/components/<nivel>s/` (atoms, molecules, organisms).

### 2. Verificar estado
- Comprobar si el componente ya existe en el directorio destino.
- Si existe, leer el componente y sus tests antes de modificar.

### 3. Crear o modificar componente
Crear `src/components/<nivel>s/<NombreComponente>.tsx` siguiendo estas reglas:
- `"use client"` solo si usa hooks, eventos o APIs del navegador.
- Named export: `export function NombreComponente({ ... }: Props)`.
- Props como `type Props = { ... }`.
- Usar Tailwind para estilos — clases estáticas, no dinámicas.
- Importar animaciones de `@/theme/animationPresets` si necesita Motion.
- Importar tokens de `@/theme/tokens` si necesita valores del tema.
- Importar desde rutas directas (NO barrel exports).
- Accesibilidad: roles ARIA, labels, estructura semántica apropiada.

### 4. Crear o actualizar tests
Crear `src/components/<nivel>s/<NombreComponente>.test.tsx`:
- Imports: `describe`, `it`, `expect` de vitest; `render`, `screen` de RTL.
- Un `describe("<NombreComponente>")` con múltiples `it` blocks.
- Testear: renderizado, variantes/props, accesibilidad, interacciones.
- Usar queries accesibles: `getByRole`, `getByText`, `getByLabelText`.
- `userEvent.setup()` para interacciones.
- NO snapshot tests.

### 5. Ejecutar ALL tests
```bash
pnpm test:run
```
- TODOS los tests deben pasar, no solo los del componente nuevo.
- Si algún test falla, investigar y corregir.

### 6. Ejecutar lint
```bash
pnpm lint
```
- Corregir cualquier error de lint.

### 7. Crear commit
```bash
git add src/components/<nivel>s/<NombreComponente>.tsx src/components/<nivel>s/<NombreComponente>.test.tsx
git commit -m "feat: add <NombreComponente> <nivel>"
```
- Si es modificación: `fix: update <NombreComponente>` o `refactor: simplify <NombreComponente>`.

### 8. Reportar resultado
- Componente creado/modificado exitosamente.
- Tests: X pasaron de Y total.
- Lint: sin errores.

Crear o ejecutar tests para un componente o módulo específico.

Argumento: $ARGUMENTS (nombre del componente o ruta del archivo)
- Ejemplo: `Button` o `src/components/atoms/Button.tsx`

## Pasos:

### 1. Localizar el componente
- Buscar el archivo del componente en `src/components/`, `src/templates/`, u otra ubicación.
- Leer el código fuente para entender qué testear.

### 2. Verificar si ya existen tests
- Buscar `<NombreComponente>.test.tsx` junto al componente.
- Si existen, leerlos para entender qué ya está cubierto.

### 3. Crear o actualizar tests
Archivo: `<ruta>/<NombreComponente>.test.tsx`

Estructura:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NombreComponente } from "./<NombreComponente>";

describe("<NombreComponente>", () => {
  it("renders correctly with required props", () => {
    render(<NombreComponente prop="value" />);
    expect(screen.getByRole("...")).toBeInTheDocument();
  });

  // Más tests...
});
```

Casos a cubrir:
- **Renderizado**: con props mínimas y con todas las props.
- **Variantes**: cada variante/estado del componente.
- **Accesibilidad**: roles ARIA, labels, estructura semántica.
- **Interacciones**: clicks, inputs, navegación (usar `userEvent`).
- **Edge cases**: props opcionales, valores vacíos, props por defecto.

### 4. Ejecutar TODOS los tests
```bash
pnpm test:run
```
- TODOS los tests del proyecto deben pasar, no solo los nuevos.
- Si algún test existente falla, investigar si el cambio lo rompió.

### 5. Verificar cobertura del componente
```bash
pnpm coverage
```
- Revisar que la cobertura del componente específico sea alta.
- Verificar que los umbrales globales (80%) se mantienen.

### 6. Crear commit si hay cambios
```bash
git add <archivos de test>
git commit -m "test: add tests for <NombreComponente>"
```

### 7. Reportar resultado
- Tests creados/actualizados para `<NombreComponente>`.
- Total de tests del proyecto: X pasaron.
- Cobertura del componente y global.

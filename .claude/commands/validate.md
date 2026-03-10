Ejecutar todas las validaciones del proyecto para verificar su estado.

## Pasos (ejecutar en orden):

### 1. Lint
```bash
pnpm lint
```
- Si hay errores, listarlos con archivo y línea.
- Intentar corregir errores automáticamente si es posible.

### 2. Tests
```bash
pnpm test:run
```
- TODOS los tests deben pasar.
- Si algún test falla, reportar cuál y por qué.

### 3. Cobertura
```bash
pnpm coverage
```
- Verificar que se cumplen los umbrales mínimos: 80% lines, functions, branches, statements.
- Reportar porcentajes actuales.

### 4. Build
```bash
pnpm build
```
- Verificar que la build estática se genera correctamente.
- Si falla, reportar el error.

### 5. Reporte final
Presentar resumen al usuario:
```
## Validación del proyecto

- Lint:      ✅ / ❌ (detalles si falla)
- Tests:     ✅ / ❌ (X pasaron, X fallaron)
- Coverage:  ✅ / ❌ (lines: X%, functions: X%, branches: X%, statements: X%)
- Build:     ✅ / ❌ (detalles si falla)
```

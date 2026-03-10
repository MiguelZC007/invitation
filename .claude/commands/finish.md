Validar el proyecto, hacer commit de cambios pendientes, y mergear la rama actual a develop.

## Pre-condiciones
- Debe estar en una rama feature (NO en `main` ni `develop`).
- Si no se cumple, avisar al usuario y NO continuar.

## Pasos:

### 1. Verificar rama actual
```bash
git branch --show-current
```
- Si es `main` o `develop`, PARAR y avisar al usuario.

### 2. Revisar cambios pendientes
```bash
git status
```
- Si hay cambios sin commitear, crear commit con los cambios pendientes antes de validar.

### 3. Ejecutar validaciones completas

#### 3a. Lint
```bash
pnpm lint
```
- Si hay errores, intentar corregirlos, commitear las correcciones, y volver a validar.

#### 3b. Tests
```bash
pnpm test:run
```
- TODOS los tests deben pasar (no solo los nuevos).
- Si algún test falla, intentar corregirlo, commitear, y re-ejecutar.

#### 3c. Cobertura
```bash
pnpm coverage
```
- Debe cumplir umbrales de 80%.
- Si no cumple, identificar qué falta cobertura y agregar tests.

#### 3d. Build
```bash
pnpm build
```
- La build estática debe generar correctamente.

### 4. Si alguna validación falla irremediablemente
- Reportar al usuario qué falló y por qué.
- NO mergear.
- Sugerir acciones correctivas.

### 5. Si todas las validaciones pasan — Merge
```bash
git checkout develop
git merge --no-ff <rama-feature>
```
- Usar `--no-ff` para preservar historial de la rama.

### 6. Reportar resultado final
```
## Finish: <rama-feature> → develop

- Lint:      ✅
- Tests:     ✅ (X tests pasaron)
- Coverage:  ✅ (lines: X%, functions: X%, branches: X%)
- Build:     ✅
- Merge:     ✅ <rama-feature> → develop

La rama se ha mergeado a develop correctamente.
No se hizo push — haz push cuando estés listo.
```

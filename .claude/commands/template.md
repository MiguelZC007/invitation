Crear o modificar un template de invitación siguiendo las convenciones del proyecto.

Argumento: $ARGUMENTS (formato: `<NombreTemplate> [descripción]`)
- Ejemplo: `GalaInvitation template elegante para evento de gala`

## Pasos:

### 1. Parsear argumentos
- Extraer nombre del template (PascalCase) y descripción opcional.
- Directorio: `src/templates/`.

### 2. Verificar estado
- Comprobar si el template ya existe.
- Si existe, leer el template y sus tests antes de modificar.
- Revisar componentes disponibles en `src/components/` para componer.

### 3. Crear o modificar template
Crear `src/templates/<NombreTemplate>.tsx`:
- `"use client"` directive (los templates usan hooks y Motion).
- Named export: `export function NombreTemplate({ ... }: Props)`.
- Props `type` con todo el contenido personalizable.
- Componer desde organismos existentes: `InvitationHeader`, `InvitationBody`, etc.
- Usar Motion para animaciones (presets de `@/theme/animationPresets`).
- Diseño responsive con Tailwind.
- Accesibilidad: estructura semántica, landmarks, labels.

### 4. Crear o actualizar tests
Crear `src/templates/<NombreTemplate>.test.tsx`:
- Testear renderizado de todo el contenido.
- Testear props por defecto.
- Testear accesibilidad (roles, labels).
- Testear interacciones si las hay.

### 5. Crear ruta (si es template nuevo)
Crear `src/app/[locale]/invitation/<kebab-name>/page.tsx`:
- Async component con `await params`.
- Validar locale con `hasLocale`.
- `setRequestLocale(locale)` para static rendering.
- `useTranslations()` para contenido i18n.
- Renderizar el template con las props apropiadas.

### 6. Actualizar mensajes i18n (si aplica)
- Agregar keys necesarias a `src/messages/es.json` y `src/messages/en.json`.
- Mantener ambos archivos sincronizados.

### 7. Ejecutar ALL tests
```bash
pnpm test:run
```
- TODOS los tests deben pasar.

### 8. Ejecutar lint
```bash
pnpm lint
```

### 9. Crear commit
```bash
git add src/templates/ src/app/[locale]/invitation/ src/messages/
git commit -m "feat: add <NombreTemplate> template"
```

### 10. Reportar resultado
- Template creado/modificado.
- Ruta: `/[locale]/invitation/<kebab-name>`.
- Tests: todos pasaron.

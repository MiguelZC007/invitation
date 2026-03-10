Iniciar una nueva tarea creando una rama feature desde develop.

Argumento: $ARGUMENTS (nombre de rama o descripción de la tarea)

## Pasos:

1. Verificar que el directorio de trabajo está limpio (sin cambios no commiteados). Si hay cambios, avisar al usuario y NO continuar.

2. Cambiar a la rama `develop`:
   ```
   git checkout develop
   ```

3. Crear una nueva rama desde `develop`:
   - Si el argumento tiene formato de rama (e.g., `feat/add-form`), usarlo directamente.
   - Si es una descripción, generar un nombre con prefijo convencional:
     - `feat/` para nueva funcionalidad
     - `fix/` para corrección
     - `refactor/` para refactorización
     - `test/` para solo tests
     - `docs/` para documentación
     - `chore/` para mantenimiento
   ```
   git checkout -b <branch-name> develop
   ```

4. Confirmar al usuario:
   - Rama creada: `<branch-name>`
   - Estás listo para trabajar
   - Recordar: usa `/finish` cuando termines para validar y mergear a develop

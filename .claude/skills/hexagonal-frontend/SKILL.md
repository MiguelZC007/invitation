---
name: hexagonal-frontend
description: Execute frontend tasks under strict hexagonal architecture (domain/application/adapters/ui) without breaking Atomic Design or responsive behavior.
argument-hint: "<scope> [feature-or-file]"
---

Implementar o refactorizar trabajo frontend siguiendo arquitectura hexagonal estricta.

**Input:** $ARGUMENTS (scope sugerido: `domain`, `application`, `adapters`, `ui`, `migration`, `audit`).

## Workflow accionable

### 1) Verificar branch
- Si estás en `main` o `develop`, detener y pedir `/task`.

### 2) Identificar tipo de cambio
- **Nuevo comportamiento de negocio** → empezar por `domain` + `application`.
- **Integración externa** (API/storage/SDK) → crear/usar puerto + adaptador.
- **Cambio visual** → solo `ui/components/templates`, sin mover reglas de negocio.

### 3) Diseñar puertos antes de implementar
- Definir contrato en `domain/.../ports` o `application` según corresponda.
- Inyectar dependencias en composition root (`src/app/**` o bootstrap equivalente).

### 4) Implementar por orden obligatorio
1. `domain` (entities/value objects/services)
2. `application` (use-cases + DTO/mappers de aplicación)
3. `adapters` (implementaciones concretas)
4. `ui` (view-model + componentes/templates)
5. `app` (wiring)

### 5) Validar prohibiciones
- No lógica de dominio en `page.tsx`, templates ni componentes.
- No `fetch`/SDK en dominio.
- No imports que violen dependencias entre capas.

### 6) Testing mínimo por capa tocada
- Domain: unit
- Application: unit/contract
- Adapters: integration
- UI: interacción/accesibilidad

### 7) Auditoría rápida antes de cerrar
- Ejecutar checklist de PR (abajo).
- Si hay dudas de cumplimiento, pedir revisión con `hexagonal-guardian`.

## Do / Don't breve

### ✅ Do
- Crear `GetInvitationData` en `application/use-cases` y recibir `InvitationRepositoryPort`.
- Implementar `InvitationApiRepository` en `adapters/repositories`.

### ❌ Don't
- Resolver reglas de RSVP en `src/templates/*`.
- Llamar API desde `src/components/organisms/*` para componer datos de negocio.

## Checklist rápido de PR

- [ ] ¿Existe separación clara domain/application/adapters/ui/app?
- [ ] ¿Se definieron puertos antes de adaptadores?
- [ ] ¿No hay lógica de negocio en templates/pages/components?
- [ ] ¿Se mantiene Atomic Design?
- [ ] ¿Responsive mobile-first intacto (`sm/md/lg`)?
- [ ] ¿Tests agregados/actualizados por capa afectada?

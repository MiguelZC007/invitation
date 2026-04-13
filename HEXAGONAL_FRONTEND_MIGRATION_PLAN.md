# Plan de migración — Arquitectura Hexagonal Frontend-Friendly (estricta)

## 1) Objetivo

Adoptar arquitectura hexagonal en frontend de forma **estricta**, preservando:

- Atomic Design (`src/components/atoms|molecules|organisms`)
- responsive design mobile-first
- stack actual (Next.js App Router, TypeScript strict, Tailwind)

El resultado esperado es separar responsabilidades en capas claras (`domain`, `application`, `adapters`, `ui`) para reducir acoplamiento, mejorar testabilidad y permitir cambios de infraestructura sin tocar reglas de negocio.

---

## 2) Alcance

### Incluye

- Definir estructura objetivo de carpetas y reglas de dependencia.
- Migrar gradualmente casos de uso críticos a puertos/adaptadores.
- Prohibir lógica de dominio en `app`, `templates` y componentes.
- Establecer estrategia de testing por capa.
- Establecer checklist de PR para cumplimiento rápido.

### No incluye (por ahora)

- Reescritura completa “big bang”.
- Cambios de UI por estética no vinculados a arquitectura.
- Cambios de framework.

---

## 3) Estructura target de carpetas

```text
src/
├── domain/                          # Núcleo puro (sin React/Next/fetch/window)
│   ├── invitation/
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── services/
│   │   └── ports/
│   │       ├── repositories/
│   │       └── gateways/
│   └── shared/
├── application/                     # Casos de uso y orquestación
│   ├── invitation/
│   │   ├── use-cases/
│   │   ├── dto/
│   │   └── mappers/
│   └── shared/
├── adapters/                        # Implementaciones concretas de puertos
│   ├── repositories/
│   ├── gateways/
│   ├── mappers/
│   └── next/
│       ├── server/
│       └── client/
├── ui/                              # Capa de presentación, mantiene Atomic Design
│   ├── components/                  # atoms/molecules/organisms
│   ├── templates/
│   ├── hooks/
│   └── view-models/
├── app/                             # Entrypoints/routing/composición de dependencias
└── test/
    ├── unit/
    ├── integration/
    └── e2e/
```

### Nota de transición

Durante la migración se permite coexistencia temporal con carpetas actuales (`src/components`, `src/templates`), pero todo código nuevo debe seguir esta estructura target o un alias transicional equivalente documentado.

---

## 4) Reglas de dependencia (arquitectura estricta)

Dependencia permitida:

1. `domain` → no depende de nadie.
2. `application` → depende solo de `domain`.
3. `adapters` → depende de `application` y `domain` (implementa puertos).
4. `ui` → depende de `application` (casos de uso/DTO/view-model), nunca de adaptadores concretos.
5. `app` → compone adaptadores + casos de uso + UI.

Dependencia prohibida:

- `domain` importando React, Next, `fetch`, `window`, `document`, `localStorage`.
- `templates/pages/components` con reglas de negocio, validaciones de dominio o acceso directo a infraestructura.

---

## 5) Fases incrementales

## Fase 0 — Baseline y guardrails

### Objetivo

Fijar reglas y artefactos de control antes de mover lógica.

### Tareas

- Publicar este plan y reglas (Claude/Cursor).
- Publicar skill operativa para tareas hexagonales.
- Publicar agent auditor (`hexagonal-guardian`).
- Alinear `AGENTS.md` con intención → skill/agent.

### Criterios de aceptación

- Existen reglas activables por glob en Claude y Cursor.
- Existe skill `hexagonal-frontend` en ambos entornos.
- Existe agent `hexagonal-guardian` en ambos entornos.
- `AGENTS.md` documenta el nuevo flujo.

---

## Fase 1 — Núcleo de dominio y primer caso de uso

### Objetivo

Introducir el primer vertical hexagonal de punta a punta sin romper UI existente.

### Tareas

- Extraer un caso de uso real de invitación a `domain` + `application`.
- Definir puertos mínimos en `domain/.../ports`.
- Implementar 1 adaptador concreto en `adapters`.
- Conectar desde `app` (composition root) hacia UI.

### Criterios de aceptación

- Caso de uso ejecuta sin importar framework en `domain/application`.
- No hay lógica de negocio nueva en `app`, `templates` ni componentes.
- Tests unitarios de dominio y aplicación cubren escenarios críticos.

---

## Fase 2 — Migración de flujos prioritarios

### Objetivo

Mover flujos core de invitación de forma incremental.

### Tareas

- Migrar N casos de uso priorizados (definir backlog).
- Normalizar DTO/view-models para UI.
- Reemplazar acoples directos a infraestructura por puertos.

### Criterios de aceptación

- Cada flujo migrado tiene puerto + adaptador + test de integración.
- UI consume casos de uso o view-models, no infraestructura directa.
- Se eliminan duplicaciones de reglas de negocio en templates/pages.

---

## Fase 3 — Endurecimiento y limpieza

### Objetivo

Cerrar deuda de transición y dejar enforcement estricto.

### Tareas

- Deprecar rutas legacy de acceso a lógica.
- Limpiar utilidades ambiguas fuera de capa.
- Ejecutar auditoría de cumplimiento global.

### Criterios de aceptación

- No quedan imports prohibidos en capas núcleo.
- Auditoría `hexagonal-guardian` marca PASS en todos los criterios.
- Documentación y checklist de PR quedan como referencia oficial.

---

## 6) Estrategia de testing por capa

- **Domain (unit):** tests puros, determinísticos, sin mocks de framework.
- **Application (unit + contract):** tests de casos de uso y contratos de puertos (dobles/fakes).
- **Adapters (integration):** validar implementación concreta de puertos y mapeos.
- **UI (component):** comportamiento visual/interacción, nunca reglas de negocio profundas.
- **App (integration smoke):** wiring/composición de dependencias y flujo básico.

---

## 7) Riesgos y mitigaciones

1. **Riesgo:** migración parcial inconsistente.
   - **Mitigación:** vertical slices (feature por feature) con criterios de aceptación por PR.

2. **Riesgo:** mezclar lógica en UI por urgencia.
   - **Mitigación:** reglas estrictas + agent auditor + checklist obligatorio.

3. **Riesgo:** sobreingeniería temprana.
   - **Mitigación:** puertos mínimos por caso de uso, refinar por necesidad real.

4. **Riesgo:** fricción con Atomic Design.
   - **Mitigación:** Atomic permanece en `ui/components`; hexagonal organiza lógica, no reemplaza diseño atómico.

5. **Riesgo:** degradación responsive al mover capas.
   - **Mitigación:** UI conserva reglas responsive actuales; cambios en capa lógica no deben alterar layout/composición sin test.

---

## 8) Definition of Done (DoD)

Una historia/PR de migración hexagonal está DONE si:

- Respeta separación `domain/application/adapters/ui/app`.
- Incluye puertos explícitos y adaptadores concretos donde aplique.
- No introduce lógica de dominio en `app`, `templates`, `pages`, `components`.
- Incluye tests por capa afectados.
- Pasa checklist rápido de PR (abajo).
- No rompe Atomic Design ni responsive.

---

## 9) Checklist rápido de PR (obligatorio)

- [ ] ¿La lógica de negocio vive en `domain`/`application` y no en UI?
- [ ] ¿Hay puertos definidos antes de implementar adaptadores?
- [ ] ¿`domain` está libre de React/Next/APIs de navegador?
- [ ] ¿`ui/components` sigue Atomic Design (atoms/molecules/organisms)?
- [ ] ¿Se mantuvo responsive mobile-first (`sm/md/lg`) donde corresponde?
- [ ] ¿Hay tests mínimos por capa modificada?
- [ ] ¿No se introdujeron imports prohibidos entre capas?

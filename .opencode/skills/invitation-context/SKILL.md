---
name: invitation-context
description: Obtiene la información requerida del usuario antes de crear o modificar una invitación. OBLIGATORIO ejecutar antes del skill template. Sin contexto completo, no se puede iniciar la tarea. Usar cuando el usuario quiera añadir una nueva invitación o cuando se detecte intención de crear/modificar template.
---

# Invitation Context — Recolectar información antes de implementar

## Regla estricta (NO NEGOCIABLE)

**La IA NUNCA debe suponer nada. Siempre debe preguntar al usuario.**

- Si falta cualquier dato, solicitarlo explícitamente antes de implementar.
- No inventar contenido, fechas, lugares, nombres ni textos por defecto.
- **Sin el contexto correcto, NO se puede iniciar una tarea nueva de invitación.**

---

## Flujo

1. Verificar si el usuario ha proporcionado toda la información requerida.
2. Si falta información: formular las preguntas obligatorias correspondientes y **DETENER**. No continuar al skill template hasta tener respuestas.
3. Si la información está completa: proceder al skill template.

---

## Información requerida (7 categorías)

| Categoría | Campos |
|-----------|--------|
| **Definición** | nombre template (PascalCase), slug (kebab-case), estructura (single/multi), tipo de evento |
| **Contenido** | título, subtítulo, mensaje principal, mensaje despedida |
| **Fecha/hora** | fecha evento, hora, countdown (si aplica), etiquetas |
| **Ubicación** | nombre lugar, dirección, mapUrl |
| **CTAs** | nextLabel, prevLabel, rsvpLabel |
| **Visual** | imágenes, paleta, estilo |
| **i18n** | locales activos (es, en, otros) |

---

## Preguntas obligatorias (formular o verificar antes de implementar)

### Bloque A — Concepto básico
1. ¿Cuál es el **nombre** del template (ej. BeachWeddingInvitation)?
2. ¿Qué **slug** quieres para la ruta (ej. beach-wedding)?
3. ¿Será una invitación de **una sola página** o de **múltiples pantallas**?
4. ¿Qué **tipo de evento** es (boda, cumpleaños, Navidad, reunión, etc.)?

### Bloque B — Contenido
5. ¿Cuál es el **título** exacto de la invitación?
6. ¿Cuál es el **subtítulo**?
7. ¿Cuál es el **mensaje de bienvenida o principal**?
8. ¿Hay **mensaje de despedida**? ¿Cuál es?

### Bloque C — Fecha y hora
9. ¿Cuál es la **fecha del evento** (y formato preferido)?
10. ¿Hay **hora**? ¿Cuál?
11. ¿Quieres **countdown** hacia el evento? Si sí, ¿cuál es la fecha objetivo exacta?

### Bloque D — Ubicación
12. ¿Hay **lugar físico**? ¿Nombre del lugar?
13. ¿Cuál es la **dirección completa**?
14. ¿Tienes **URL de Google Maps** (u otro) para enlazar?

### Bloque E — Navegación y CTAs
15. ¿Quieres botones Siguiente/Anterior con texto personalizado? ¿Cuáles?
16. ¿Hay botón de **confirmar asistencia (RSVP)**? ¿Qué texto debe tener?

### Bloque F — Visual y recursos
17. ¿Qué **imágenes** usarás (rutas, URLs o descripción)?
18. ¿Tienes preferencia de **colores** o paleta?
19. ¿Qué **estilo** buscas (elegante, minimalista, festivo, etc.)?

### Bloque G — i18n
20. ¿Qué **idiomas** debe soportar (es, en, otros)?

---

## Acción si falta información

- Formular las preguntas pendientes al usuario.
- **NO** continuar al skill template.
- **NO** suponer valores ni usar placeholders.
- Esperar respuestas explícitas antes de implementar.

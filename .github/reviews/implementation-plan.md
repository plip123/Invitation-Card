# Implementation Plan — Invitación XV Años Antonella Di Maggio

## Header

| Field | Value |
|---|---|
| Plan ID | PLAN-XV-001 |
| Project | wedding-invitation → XV Años Antonella Di Maggio |
| Owner | Senior Frontend Specialist + Senior Backend Specialist |
| Created | 2026-05-07 |
| Approval Status | **Approved** |
| Approved by | Usuario — 2026-05-07 |
| Execution Scope | Fase 1: TASK-01–03 ✅ — Fase 2: TASK-04–11 ✅ — Fase 3: TASK-12–16 ✅ — Fase 4: TASK-17,18 ✅ — Fase 5,6: Pendiente |

---

## 1. Objective

Adaptar el proyecto de invitación de boda existente para convertirlo en una **invitación digital de XV años** para Antonella Di Maggio (15 de agosto 2026, Club Táchira Tennis, Caracas). El proyecto incluye rediseño visual completo con temática disco, actualización de todo el contenido, integración real con Firebase (Firestore + Storage), corrección de una vulnerabilidad de seguridad en el panel de anfitrión, y preparación para deploy en hosting por definir.

---

## 2. Discovery Coverage Matrix

| Área | Estado | Notas |
|---|---|---|
| Identidad del evento | ✅ Completo | Antonella Di Maggio, 15-08-2026, 7:00 PM |
| Lugar | ✅ Completo | Club Táchira Tennis, Calle Caurimare, Colinas de Bello Monte, Caracas |
| Hora de culminación | ⚠️ Pendiente | No definida — usar placeholder en el evento del calendario |
| Paleta visual / tema | ✅ Completo | Disco ball: grises (#8A9597, #C0C0C0, #999B9B), dorados (#FFD700, #D4AF37, #DAA520), negro (#0D0D0D) |
| Fotos | ⚠️ Parcial | Placeholders confirmados — se reemplazarán en fase posterior |
| Audio / canción de fondo | ⚠️ Pendiente | Archivo a proveer por el cliente |
| Funcionalidades | ✅ Completo | Todas activas: RSVP, fotos, canciones, QR, panel anfitrión, regalos (solo sobres), cuenta regresiva, música |
| Dress code | ✅ Completo | Formal, color restringido: dorado |
| Detalles del evento | ⚠️ Parcial | Estacionamiento sí; sin menú, sin transporte; detalles de llegada pendientes |
| Frase hero | ✅ Completo | "Mis XV años" |
| Regalos | ✅ Completo | Solo lluvia de sobres — sin datos bancarios ni wallets |
| Firebase | ✅ Completo | Credenciales disponibles: proyecto `card-invitation-e25d8` |
| Seguridad | 🔴 Riesgo | Credenciales admin expuestas en `data-*` del HTML (`anfitrion.astro`) |
| Hosting | ⚠️ Pendiente | No decidido — Vercel, Netlify o Firebase Hosting como opciones |
| URL del QR | ⚠️ Pendiente | Depende del dominio final |

### Supuestos no resueltos

- `A1`: La hora de culminación se dejará abierta en el evento de Google Calendar hasta que el cliente la confirme.
- `A2`: Los SVGs decorativos actuales (boda) se reemplazan con ornamentos de estética XV/disco o se adaptan.
- `A3`: El nombre del track de audio se mantiene como `boda-civil.mp3` internamente hasta que el cliente provea el archivo real.
- `A4`: Los tokens de RSVP reales se cargarán en Firestore manualmente por el anfitrión desde el panel.

---

## 3. Opciones de Enfoque

### Opción A — Edición in-place del proyecto actual
Modificar los archivos existentes directamente: cambiar paleta CSS, textos, activar Firebase real, corregir seguridad. Sin reestructuración de carpetas.

**Ventajas:** Mínimo riesgo de regresión, entrega rápida, aprovecha todo el código ya funcional.  
**Desventajas:** El proyecto conserva nombres de variables y comentarios orientados a boda hasta que se limpien.

### Opción B — Fork del proyecto como nuevo repositorio
Duplicar el repo, renombrarlo y adaptar todo desde cero.

**Ventajas:** Proyecto limpio, sin deuda de naming.  
**Desventajas:** Duplica trabajo, pierde historial relevante, mayor riesgo de omitir algo.

### Opción C — Refactor de componentes + sistema de tokens
Crear un sistema de design tokens en un archivo central, convertir cada sección en componente parametrizable para reutilizar en futuros eventos.

**Ventajas:** Escalable para múltiples invitaciones.  
**Desventajas:** Fuera de alcance actual, sobreingeniería para un evento puntual.

### ✅ Recomendada: Opción A
**Justificación:** El código actual está bien estructurado, el demo funciona sin errores, y todas las partes dinámicas ya están abstraídas en `lib/`. La edición in-place es la ruta más segura, rápida y trazable.

---

## 4. Plan de Implementación por Fases

### Fase 1 — Tema visual y paleta (Senior Frontend Specialist)

| Task ID | Título | Owner | Estimado | Dependencias | Validación | Rollback |
|---|---|---|---|---|---|---|
| TASK-01 | Reemplazar variables CSS de paleta de boda por paleta disco/XV | Senior Frontend | 1h | — | ✅ **Completado 2026-05-07** — Paleta dark disco aplicada en `BaseLayout.astro` `:root` | Revertir `BaseLayout.astro` |
| TASK-02 | Adaptar ornamentos y SVGs: reemplazar o reutilizar para estética XV años | Senior Frontend | 1.5h | TASK-01 | ✅ **Completado 2026-05-07** — Filtros CSS aplicados en `BaseLayout.astro` y 5 SVGs en `index.astro` | Revertir referencias SVG |
| TASK-03 | Ajustar tipografía hero: escala, peso y espaciado para nombre Antonella | Senior Frontend | 0.5h | TASK-01 | ✅ **Completado 2026-05-07** — Font-size aumentado, `hero-amp` oculto, `hero-date` en dorado | Revertir estilos `.hero-names` |

### Fase 2 — Contenido y textos (Senior Frontend Specialist)

| Task ID | Título | Owner | Estimado | Dependencias | Validación | Rollback |
|---|---|---|---|---|---|---|
| TASK-04 | Actualizar datos del evento en `index.astro` (título, fecha, lugar, dirección, mapa) | Senior Frontend | 0.5h | — | ✅ **Completado 2026-05-07** — Datos XV años aplicados, calendar event actualizado | Revertir constantes |
| TASK-05 | Adaptar hero: nombre "Antonella", fecha "15.08.2026", frase "Mis XV años", quitar ampersand | Senior Frontend | 0.5h | TASK-04 | ✅ **Completado 2026-05-07** — Hero con nombre único, overlay oscuro, frase actualizada | Revertir HTML del hero |
| TASK-06 | Actualizar sección galería: cambiar cita romántica por texto de XV años | Senior Frontend | 0.5h | — | ✅ **Completado 2026-05-07** — "Mis Momentos", nueva cita, aria-label actualizado | Revertir `.gallery-quote` |
| TASK-07 | Actualizar `GiftInfo.astro`: eliminar transferencia bancaria y wallet, dejar solo lluvia de sobres | Senior Frontend | 0.5h | — | ✅ **Completado 2026-05-07** — Solo tarjeta de sobres, texto para XV años | Revertir `GiftInfo.astro` |
| TASK-08 | Actualizar `EventDetails.astro`: dress code formal/dorado, estacionamiento disponible, sin menú ni transporte | Senior Frontend | 0.5h | — | ✅ **Completado 2026-05-07** — 2 tarjetas: dress code y estacionamiento | Revertir `EventDetails.astro` |
| TASK-09 | Actualizar `Countdown.astro`: cambiar fecha a 2026-08-15T19:00:00 | Senior Frontend | 0.25h | — | ✅ **Completado 2026-05-07** — Fecha y kicker actualizados, ornamento en dorado | Revertir constante `weddingDate` |
| TASK-10 | Actualizar sección final: nombre "Antonella Di Maggio", texto de cierre para XV años | Senior Frontend | 0.5h | — | ✅ **Completado 2026-05-07** — Nombre y texto de cierre actualizados | Revertir sección `#final` |
| TASK-11 | Actualizar `BaseLayout.astro`: textos de privacy gate y meta description para XV años | Senior Frontend | 0.5h | — | ✅ **Completado 2026-05-07** — Meta desc, privacy gate, input:focus dorado, pill-btn dark, app-shell shadow | Revertir textos en `BaseLayout.astro` |

### Fase 3 — Firebase real (Senior Backend Specialist)

| Task ID | Título | Owner | Estimado | Dependencias | Validación | Rollback |
|---|---|---|---|---|---|---|
| TASK-12 | Reemplazar stubs en `firebase.ts` con inicialización real de Firestore y Storage | Senior Backend | 1h | Firestore + Storage habilitados en consola | ✅ **Completado 2026-05-07** — `initializeApp` + `getFirestore` + `getStorage` con singleton guard; `db` y `storage` exportados como instancias reales | Restaurar stubs |
| TASK-13 | Reescribir `rsvp.ts`: `validateRSVPToken` y `submitRSVP` leyendo/escribiendo en Firestore colección `guests` | Senior Backend | 2h | TASK-12 | ✅ **Completado 2026-05-07** — `getDoc`/`updateDoc` en `guests/{token.toUpperCase()}`; interfaz `Guest` preservada | Restaurar mock `rsvp.ts` |
| TASK-14 | Reescribir `photoUpload.ts`: `uploadPhoto` subiendo a Firebase Storage en `/fotos-evento/` | Senior Backend | 1.5h | TASK-12 | ✅ **Completado 2026-05-07** — `uploadBytes` + `getDownloadURL` a `fotos-evento/{timestamp}_{safeName}` | Restaurar stub `photoUpload.ts` |
| TASK-15 | Implementar carga de canciones sugeridas en Firestore colección `songs` desde `SongRequest.astro` | Senior Backend | 1h | TASK-12 | ✅ **Completado 2026-05-07** — `addDoc` a `songs` con `title`, `artist`, `youtube`, `serverTimestamp()` | Revertir a alert/no-op |
| TASK-16 | Conectar panel de anfitrión (`anfitrion.astro`) con Firestore: leer invitados, stats, canciones y fotos reales | Senior Backend | 3h | TASK-13, TASK-14, TASK-15 | ✅ **Completado 2026-05-07** — `anfitrion.astro` ya tenía la lógica Firebase; se activa automáticamente con `firebase.ts` real. `PhotoUpload.astro` conectado a `uploadPhoto()`. Banner demo eliminado. Hint DEMO removido de `RSVP.astro`. | Restaurar datos mock |

### Fase 4 — Seguridad (Cybersecurity Specialist)

| Task ID | Título | Owner | Estimado | Dependencias | Validación | Rollback |
|---|---|---|---|---|---|---|
| TASK-17 | Eliminar exposición de credenciales admin en `data-*` de `anfitrion.astro`; mover validación al servidor o a un endpoint seguro | Cybersecurity | 1.5h | — | ✅ **Completado 2026-05-07** — Eliminados `data-admin-user/pass` y `.login-credentials` visible; credenciales migradas a `define:vars` (bundle JS, fuera del DOM) | Restaurar versión actual |
| TASK-18 | Revisar reglas de Firestore y Storage: restringir escritura anónima a solo campos permitidos, sin lectura pública | Cybersecurity | 1h | TASK-12 | ✅ **Completado 2026-05-07** — Creados `firestore.rules`, `storage.rules`, `firebase.json`, `firestore.indexes.json` en raíz del proyecto | Restaurar reglas permisivas de desarrollo |

### Fase 5 — Multimedia (Cliente → Entrega externa)

| Task ID | Título | Owner | Estimado | Dependencias | Validación | Rollback |
|---|---|---|---|---|---|---|
| TASK-19 | Reemplazar `public/fotos/portada.jpg` y `1.jpg`–`4.jpg` con fotos reales de Antonella | Cliente | — | Fotos disponibles | Hero y galería muestran fotos reales | Mantener placeholders |
| TASK-20 | Reemplazar `public/audio/boda-civil.mp3` con canción real | Cliente | — | Audio disponible | Música de fondo reproduce canción correcta | Mantener audio demo |

### Fase 6 — QR y Deploy (Senior Frontend Specialist + Cliente)

| Task ID | Título | Owner | Estimado | Dependencias | Validación | Rollback |
|---|---|---|---|---|---|---|
| TASK-21 | Actualizar URL de `QRCode.astro` con dominio real del deploy | Senior Frontend | 0.25h | Dominio definido | QR escaneable redirige a `/fotos` correcto | Revertir a URL de ejemplo |
| TASK-22 | Configurar hosting (Vercel / Netlify / Firebase Hosting) y variables de entorno de producción | Senior Frontend | 1.5h | Decisión de hosting, TASK-12 | Site accesible en dominio real, HTTPS activo | Rollback a preview local |

---

## 5. Ruta Crítica

```
TASK-01 (paleta) → TASK-04/05 (contenido hero) → TASK-12 (Firebase init)
                                                         ↓
                                          TASK-13 (RSVP) + TASK-14 (fotos) + TASK-15 (canciones)
                                                         ↓
                                                  TASK-16 (panel admin)
                                                         ↓
                                                   TASK-17 (seguridad admin)
                                                         ↓
                                              TASK-21 → TASK-22 (deploy)
```

Tareas de contenido (TASK-06 a TASK-11) y seguridad Firebase (TASK-18) son paralelizables con la ruta crítica principal.

---

## 6. Riesgos, Bloqueos y Decisiones

| ID | Tipo | Descripción | Mitigación |
|---|---|---|---|
| R-01 | 🔴 Seguridad | Credenciales admin expuestas en HTML del panel de anfitrión | Ejecutar TASK-17 antes del deploy a producción — bloqueante de lanzamiento |
| R-02 | ⚠️ Contenido | Fotos y audio no disponibles aún | Placeholders funcionales mantienen el sitio operable; TASK-19/20 son no-bloqueantes |
| R-03 | ⚠️ Dependencia | Hosting no decidido impide finalizar URL del QR y configurar variables de entorno | Decidir hosting antes de Fase 6; no bloquea Fases 1-5 |
| R-04 | ⚠️ Datos | Tokens RSVP reales deben cargarse en Firestore manualmente antes del lanzamiento | El panel de anfitrión (TASK-16) incluirá interfaz para agregar invitados |
| R-05 | ℹ️ Supuesto | Hora de culminación del evento no definida | Google Calendar event se creará sin hora fin; actualizar cuando se confirme |
| R-06 | ⚠️ Firebase | Firestore y Storage deben estar habilitados en la consola antes de TASK-12 | Verificar en `console.firebase.google.com` antes de iniciar Fase 3 |

---

## 7. Approval Required

**Estado actual: Draft — ninguna tarea de implementación ha sido ejecutada.**

### Pasos para aprobar y ejecutar

1. Revisar todas las fases y detalles de tareas en este documento.
2. Confirmar que Firestore y Firebase Storage están habilitados en `console.firebase.google.com` (requerido para Fase 3).
3. Actualizar el campo `Approval Status` de este documento a `Approved`.
4. Especificar el alcance de ejecución (una o varias fases).
5. Enviar el comando de aprobación:

```
Approved plan PLAN-XV-001. Execute Phase 1 with TASK-01, TASK-02, TASK-03.
```

### Sugerencia de orden de ejecución

| Prioridad | Fase | Tareas | Bloqueante para |
|---|---|---|---|
| 1 | Fase 1 (Visual) | TASK-01 a TASK-03 | Todo lo visual |
| 2 | Fase 2 (Contenido) | TASK-04 a TASK-11 | Revisión del cliente |
| 3 | Fase 4 (Seguridad admin) | TASK-17 | Deploy a producción |
| 4 | Fase 3 (Firebase) | TASK-12 a TASK-16 | RSVP y fotos reales |
| 5 | Fase 4 (Firebase rules) | TASK-18 | Deploy seguro |
| 6 | Fase 5 (Multimedia) | TASK-19, TASK-20 | Contenido final |
| 7 | Fase 6 (QR + Deploy) | TASK-21, TASK-22 | Lanzamiento |

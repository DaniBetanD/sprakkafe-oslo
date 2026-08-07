---
name: manage-sprakkafe-oslo
description: Gestiona Språkkafé Oslo con sus reglas de producto, seguridad y aprobación. Usar cuando Codex trabaje en el repositorio C:\Users\karina\sprakkafe-oslo sobre desarrollo web, QA móvil, datos de actividades u organizaciones, auditoría semanal, altas de contenido, marketing, Git, Vercel o preparación de una publicación.
---

# Gestionar Språkkafé Oslo

## Fijar el contexto correcto

1. Trabajar únicamente sobre el repositorio real `C:\Users\karina\sprakkafe-oslo` cuando la tarea requiera código, Git o despliegue.
2. Tratar el proyecto ChatGPT de Språkkafé como contexto y material de gestión, no como copia publicable del repositorio.
3. Usar directorios bajo `.codex\visualizations` solo para artefactos temporales. No crear commits ni hacer push desde ellos.
4. Detener cualquier edición si el directorio activo pertenece a otro proyecto.

## Preparar cada tarea

1. Leer completos `AGENTS.md`, `PROJECT.md/PROJECT_HANDBOOK.md` y `PROJECT.md/PROJECT_STATUS.md`.
2. Leer solo la documentación especializada que corresponda al objetivo.
3. Revisar `git status --short`, la rama y los cambios locales antes de editar.
4. Conservar todos los cambios preexistentes. No añadirlos al índice, confirmarlos, moverlos ni descartarlos sin autorización.
5. Definir un único objetivo, su alcance, lo que queda fuera y los criterios de aceptación.

## Elegir el flujo

### Desarrollo y experiencia web

- Leer `PROJECT.md/UX_PRINCIPLES.md` y `PROJECT.md/DESIGN_SYSTEM.md` para cambios visuales.
- Leer `PROJECT.md/ARCHITECTURE.md` antes de cambiar estructura, rutas o datos compartidos.
- Proteger los componentes y decisiones congelados. Corregir únicamente el defecto solicitado.
- Empezar la validación visual en 390 px; después revisar escritorio, navegación por teclado, foco y consola.
- Usar el navegador integrado para inspección real cuando esté disponible.

### Actividades y organizaciones

- Leer completos `PROJECT.md/WEEKLY_VERIFICATION.md` y `PROJECT.md/ACTIVITY_INTAKE.md`.
- Consultar únicamente fuentes oficiales de la entidad responsable.
- Comparar la fuente con `src/data/activities.json` y `src/data/organizations.json` sin deducir datos ausentes.
- Durante una auditoría semanal, mantener todo en solo lectura y clasificar el informe como `Sin cambios`, `Cambio propuesto`, `Requiere confirmación`, `Pausa temporal` o `Retirada propuesta`.
- No modificar datos, logos, Git ni Vercel hasta recibir aprobación administrativa explícita para cada alta, cambio o retirada.

### Contenido y marketing

- Leer `PROJECT.md/CONTENT_GUIDELINES.md` y el documento vigente del sprint.
- Para redes sociales, consultar `PROJECT.md/SOCIAL_MEDIA_PROMPT_SYSTEM.md` y la estrategia o calendario relacionado.
- Escribir mensajes breves, humanos, en singular y con una sola acción principal.
- No publicar, enviar ni programar contenido sin aprobación explícita de la administradora.

## Ejecutar con mínima intervención

- Reutilizar componentes, utilidades y datos existentes.
- Mantener actividades y organizaciones fuera de los componentes.
- No añadir dependencias, categorías, abstracciones, rediseños o refactorizaciones laterales sin autorización.
- Usar parches pequeños y revisar el diff después de cada cambio relevante.
- Si aparece un problema fuera del sprint, registrarlo y volver al objetivo activo.

## Aplicar puertas de aprobación

Exigir aprobación explícita antes de:

- dar de alta, modificar, pausar o retirar una actividad u organización;
- enviar mensajes o correos;
- publicar o programar contenido;
- crear un commit, hacer push o desplegar, salvo que la petición actual ya autorice expresamente esas acciones;
- cambiar dependencias, arquitectura o elementos visuales congelados.

## Validar y cerrar

1. Revisar `git diff`, `git diff --check` y `git status --short`.
2. Ejecutar `npm run lint` y `npm run build` cuando exista cambio de código o antes de una entrega técnica.
3. Para cambios visuales, comprobar 390 px y escritorio con navegador real y consola limpia.
4. Para cambios de datos, comprobar IDs, relaciones, filtros, rutas y páginas afectadas.
5. Si se autoriza un despliegue, publicar desde el repositorio real y verificar la URL de producción y las rutas relacionadas.
6. Informar qué se cambió, qué validaciones pasaron, qué queda pendiente y qué todavía requiere aprobación.

No declarar una tarea terminada si falta una validación exigida. Indicar el bloqueo concreto y conservar el trabajo de forma segura.

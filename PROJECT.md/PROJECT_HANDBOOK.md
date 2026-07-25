# Manual de trabajo — Språkkafé Oslo

Versión: 3.0
Estado: Documento vivo
Última actualización: 25 de julio de 2026

## Propósito

Este manual define cómo trabajar en el repositorio. La visión vive en `PROJECT_VISION.md`; el estado real en `PROJECT_STATUS.md`; y el trabajo futuro en `../docs/ROADMAP.md`.

## Jerarquía documental

1. Decisiones expresas aprobadas por la administradora.
2. `AGENTS.md`.
3. Este manual.
4. Documentos especializados.
5. Estado y roadmap.
6. Archivos históricos.

Una decisión aprobada no se reabre automáticamente porque exista otra alternativa técnica o visual.

## Principios obligatorios

- Usuario primero: reducir miedo, incertidumbre, aislamiento o dificultad para practicar.
- Mobile First: comenzar y validar en 390 px.
- Mínima intervención: modificar únicamente lo necesario.
- Un sprint, un objetivo.
- Calidad y estabilidad antes que cantidad.
- Datos centralizados y componentes reutilizables.
- Ninguna publicación de contenido sin aprobación administrativa.

## Inicio de un sprint

Antes de escribir código:

1. Leer `AGENTS.md` y la documentación relacionada.
2. Revisar `git status` y conservar cambios preexistentes.
3. Identificar la causa o necesidad real.
4. Definir objetivo, alcance, fuera de alcance y criterios de aceptación.
5. Revisar los archivos relacionados antes de editarlos.

No se añaden mejoras laterales, dependencias, rediseños o refactorizaciones no solicitadas.

## Desarrollo

- Mantener nombres claros y una responsabilidad principal por componente.
- Reutilizar utilidades y datos existentes antes de duplicar lógica.
- No codificar actividades u organizaciones directamente en componentes.
- Mantener la identidad visual aprobada.
- Evitar abstracciones prematuras.

### Tamaño de componentes

El número de líneas es una señal, no una regla automática:

- Entre 250 y 300 líneas: revisar responsabilidades.
- Más de 400 líneas: justificar que existe una sola responsabilidad o dividir.
- No dividir si el resultado añade complejidad sin mejorar claridad, pruebas o reutilización.

## Datos y fuentes

- Usar únicamente fuentes oficiales o proporcionadas por la administración.
- No asumir gratuidad, duración, fecha o disponibilidad.
- Si solo existe hora de inicio, mostrar únicamente esa hora.
- Cuando falte información de precio, remitir a la entidad.
- Respetar `ACTIVITY_INTAKE.md` y `WEEKLY_VERIFICATION.md`.

## Git

Antes del cambio:

```bash
git status
git pull origin main
```

Antes del commit:

```bash
git diff
npm run lint
npm run build
```

Convenciones principales:

- `feat:` nueva capacidad aprobada.
- `fix:` corrección de comportamiento.
- `docs:` documentación.
- `refactor:` reorganización sin cambio funcional.
- `chore:` mantenimiento técnico.

Un commit puede agrupar los cambios coherentes de un sprint o de una sesión. No es necesario crear un commit por cada edición pequeña.

## Validación

Según el alcance:

- Lint y build.
- Revisión de `git diff`.
- Móvil a 390 px y escritorio.
- Navegación por teclado y foco visible.
- Consola sin errores.
- Rutas y enlaces relacionados.
- Producción después del despliegue.

Los cambios exclusivamente documentales requieren revisar enlaces, formato y diff; lint y build se ejecutan para confirmar que el repositorio sigue estable.

## Componentes congelados

Home, Hero, Header, Footer, MissionSection, ActivityCard, OrganizationPage y el sistema visual no se rediseñan sin un sprint específico.

## Definition of Done

- El objetivo solicitado está resuelto.
- No existen cambios fuera de alcance.
- Se mantienen las decisiones aprobadas.
- Las validaciones correspondientes pasan.
- Se indican archivos modificados y resultados.
- El commit y el push se realizan después de la aprobación cuando formen parte del cierre.
- El despliegue se revisa cuando el cambio afecta producción.

## Archivos históricos

Los documentos guardados en `archive/` explican decisiones antiguas, pero no constituyen instrucciones vigentes.

# SPRINT-TECH-ANALYTICS-SCHEMA-001 — Analytics limpio y eventos verificables

Estado: planificado; Bloque 1 en observación
Fecha de preparación: 26 de agosto de 2026
Ventana prevista: 26 de agosto–4 de septiembre de 2026
Orden obligatorio: Bloque 1 → puerta de decisión → Bloque 2

## Objetivo

Cerrar la depuración de Vercel Web Analytics con evidencia suficiente de que el tráfico legítimo continúa registrándose y, solo después, corregir el marcado `Schema.org Event` para que represente exclusivamente datos reales y confirmados.

## Resultado esperado

Al terminar el sprint:

- los navegadores internos conocidos estarán marcados para no enviar Analytics;
- producción y previews permanecerán separados;
- existirán al menos tres días completos de observación posterior al filtro;
- la comparación con la línea base estará documentada;
- los eventos `active` y `upcoming` incluirán `EventScheduled`;
- `Offer` aparecerá únicamente cuando una fuente confirme que la actividad es gratuita;
- no existirán `endDate`, `performer` ni `image` inventados;
- el marcado desplegado habrá superado validación técnica;
- Search Console habrá recibido la solicitud de validación o mostrará un nuevo rastreo sin errores.

## Principios del sprint

1. Secuencia estricta: no editar Schema.org antes de cerrar Analytics.
2. Ausencia de dato confirmado significa campo ausente.
3. No usar variaciones de tráfico aisladas para tomar decisiones.
4. No mezclar cambios locales documentales o técnicos ajenos al sprint.
5. No rediseñar páginas ni componentes congelados.
6. Cada publicación requiere diff acotado, lint, build y comprobación de producción.

## Responsabilidades

| Responsable | Tareas |
| --- | --- |
| Administración | Marcar sus navegadores internos, facilitar o confirmar fuentes de gratuidad cuando no estén documentadas y aprobar cualquier dato editorial nuevo. |
| Codex | Consultar métricas, conservar evidencia, auditar datos y JSON-LD, implementar cambios aprobados, validar, preparar Git/Vercel y comprobar producción. |
| Vercel | Recibir Analytics, separar entornos y desplegar los cambios fusionados. |
| Google Search Console | Informar del rastreo y la validación de los elementos de calendario. |

## Bloque 1 — Cierre de TECH-ANALYTICS-002

### A1. Inventario de navegadores internos

Objetivo: cubrir todos los navegadores utilizados para revisar producción.

Acciones de la administración:

1. Abrir `https://sprakkafe-oslo.vercel.app` en cada navegador, perfil y dispositivo de trabajo.
2. Abrir la consola y ejecutar:

```js
localStorage.setItem('sprakkafe.analytics.internal', '1')
```

3. Recargar la página.
4. Confirmar la marca con:

```js
localStorage.getItem('sprakkafe.analytics.internal')
```

Resultado esperado: `"1"`.

Lista de control:

- [ ] Navegador principal de escritorio.
- [ ] Segundo navegador o perfil de escritorio, si se utiliza.
- [ ] Navegador móvil habitual.
- [x] Navegador automático de QA.
- [ ] Otros dispositivos desde los que se revise producción.

Evidencia: confirmación administrativa de los dispositivos marcados, sin registrar IPs ni identificadores personales.

### A2. Ventana de observación

El filtro se desplegó el 24 de agosto de 2026 a las 22:11, hora de Madrid. Los tres primeros días naturales completos posteriores son:

| Día | Estado esperado |
| --- | --- |
| 25 de agosto | Completo |
| 26 de agosto | Completo al finalizar el día |
| 27 de agosto | Completo al finalizar el día |

Primer punto válido de decisión: **28 de agosto de 2026 por la mañana**.

El seguimiento automático consultará exclusivamente `environment = production` y excluirá el día parcial del despliegue de la comparación principal.

### A3. Métricas a comparar

Registrar para el periodo posterior:

- páginas vistas totales y por día;
- visitantes únicos totales y por día;
- hostnames observados;
- principales rutas;
- distribución básica por dispositivo y país, solo como control de coherencia;
- presencia continuada de tráfico normal después del filtro.

Línea base existente:

- 201 páginas vistas en los siete días anteriores al cambio;
- rango diario observado: 1–70;
- alta variabilidad y muestra pequeña.

No se exigirá igualar 201 vistas. El objetivo es comprobar continuidad y descartar un corte técnico o una exclusión demasiado amplia.

### A4. Reglas de interpretación

Clasificar el resultado el 28 de agosto:

| Estado | Evidencia | Decisión |
| --- | --- | --- |
| Verde | Producción sigue registrando visitas normales; no hay corte sostenido; la prueba positiva y negativa sigue siendo coherente. | Cerrar Bloque 1 y habilitar Bloque 2. |
| Amarillo | Volumen muy bajo, pero existe tráfico; la muestra no permite separar efecto del filtro y variación natural. | Ampliar observación hasta el 31 de agosto sin modificar Schema.org. |
| Rojo | Cero tráfico sostenido o señales de que el hostname canónico está siendo bloqueado. | Reabrir diagnóstico, corregir Analytics y repetir la ventana de observación. |

No se considerará anomalía una jornada aislada con pocas visitas, porque la línea base ya contiene días de una sola vista.

### A5. Entregables y cierre

- [x] Criterio y limitaciones documentados en `TECH_ANALYTICS_002.md`.
- [x] Exclusión desplegada en producción.
- [x] Prueba positiva: tráfico normal registrado.
- [x] Prueba negativa: navegador marcado sin envío.
- [ ] Inventario de navegadores internos confirmado.
- [ ] Tres días completos comparados.
- [ ] Semáforo final documentado.
- [ ] Evidencia final publicada.

Puerta de salida: todas las casillas anteriores completas y resultado verde. Con resultado amarillo o rojo, el Bloque 2 permanece bloqueado.

## Bloque 2 — Schema.org Event

Precondición: Bloque 1 cerrado en verde.

### S1. Auditoría antes de editar

Revisar:

- `src/data/activities.json`;
- `src/utils/seo.js`;
- generador de páginas SEO estáticas;
- validador local de datos estructurados;
- JSON-LD servido en las rutas ES y EN.

Crear una matriz por actividad con:

| Campo | Comprobación |
| --- | --- |
| `status` | Valor interno real y mapeo permitido. |
| `availableFrom` / fecha | Fuente del `startDate`. |
| gratuidad | Confirmada, no confirmada o desconocida. |
| moneda | NOK cuando sea necesaria y corresponda. |
| `endDate` | Solo si existe fin real. |
| `performer` | Solo si existe persona o grupo confirmado. |
| `image` | Solo si existe imagen real asociada y publicable. |

No usar textos promocionales generales como prueba automática de gratuidad. Cada `Offer` necesita evidencia trazable en los datos actuales o en una fuente oficial.

### S2. `eventStatus`

Regla de implementación:

- `active` → `https://schema.org/EventScheduled`;
- `upcoming` → `https://schema.org/EventScheduled`;
- cualquier otro estado → no modificar en este sprint salvo instrucción aprobada.

Criterio de aceptación:

- todas las páginas ES/EN de actividades `active` y `upcoming` contienen el valor;
- ninguna actividad fuera de esos estados recibe el valor por defecto.

### S3. `Offer`

Regla de implementación:

```json
{
  "@type": "Offer",
  "price": "0",
  "priceCurrency": "NOK"
}
```

El nodo solo se genera cuando la actividad tiene gratuidad confirmada. Si el repositorio no diferencia actualmente entre gratuidad confirmada y desconocida, se propondrá el mínimo cambio de datos necesario y se solicitará aprobación antes de modificar actividades.

Criterios de aceptación:

- ninguna actividad desconocida recibe `Offer`;
- todas las actividades con `Offer` tienen evidencia oficial o aprobación administrativa registrada;
- el precio se serializa como `"0"` y la moneda corresponde al contexto real.

### S4. Campos prohibidos sin evidencia

Comprobar de forma automática y manual que no se incorporan valores de relleno:

- `endDate` ausente cuando no hay fin confirmado;
- `performer` ausente cuando no hay participante o responsable confirmado;
- `image` ausente cuando no existe una imagen real del evento;
- ningún texto, URL o fecha genérica utilizado para satisfacer artificialmente un validador.

### S5. Pruebas y validación local

Añadir o ampliar una validación reproducible que cubra todas las páginas de actividad generadas en ES y EN:

1. `eventStatus` correcto según estado.
2. `Offer` coherente con el dato de gratuidad.
3. Ausencia de campos opcionales no respaldados.
4. `startDate` principal presente cuando corresponda.
5. JSON válido y un único bloque principal esperado por página.

Ejecutar:

```bash
npm run lint
npm run build
npm run validate:seo
git diff --check
```

### S6. Validación externa y publicación

1. Crear una rama `codex/` exclusiva para Schema.org.
2. Preparar solo los archivos del bloque.
3. Revisar el diff y las páginas generadas.
4. Publicar PR y esperar Vercel Preview.
5. Probar muestras representativas en el Rich Results Test o validador equivalente:
   - una actividad `active` gratuita confirmada;
   - una actividad `upcoming`, si existe;
   - una actividad sin gratuidad confirmada;
   - versiones ES y EN.
6. Corregir cualquier error antes de fusionar.
7. Fusionar y verificar producción.

### S7. Search Console

Después del despliegue:

1. Inspeccionar las URL representativas.
2. Solicitar indexación o validación únicamente cuando el JSON-LD publicado sea correcto.
3. Revisar el informe de elementos de calendario o mejoras.
4. Registrar fecha de solicitud, URL y estado.
5. Mantener el sprint abierto si Google todavía no ha rastreado las páginas; el procesamiento externo puede requerir varios días.

## Cronograma

| Fecha prevista | Trabajo |
| --- | --- |
| 26–27 de agosto | Marcar navegadores internos y acumular observación. |
| 28 de agosto | Comparación de tres días y semáforo del Bloque 1. |
| 28–31 de agosto | Ventana adicional solo si el resultado es amarillo. |
| Tras resultado verde | Auditoría de actividades y fuentes de gratuidad. |
| Día técnico 1 | Implementación y validación local de Schema.org. |
| Día técnico 2 | PR, Preview, validación externa y producción. |
| Días posteriores | Seguimiento de rastreo en Search Console. |

Las fechas del Bloque 2 son relativas a la puerta verde de Analytics, no compromisos independientes.

## Riesgos y mitigaciones

| Riesgo | Mitigación |
| --- | --- |
| Tráfico real muy bajo | Usar continuidad, prueba controlada y comparación ampliada; no exigir volumen fijo. |
| Navegadores propios sin marcar | Mantener inventario y repetir activación por perfil/dispositivo. |
| Nuevo dominio de producción | Añadirlo explícitamente a la lista permitida antes de usarlo. |
| Gratuidad descrita de forma ambigua | Omitir `Offer` y solicitar confirmación. |
| Cambios locales mezclados | Preparar rutas explícitas y revisar staged diff antes de cada commit. |
| Rich Results Test sin acceso automatizable | Guardar resultado manual o usar un validador equivalente y verificar JSON-LD de producción. |
| Search Console tarda en rastrear | Registrar la solicitud y mantener seguimiento sin declarar rastreo confirmado antes de verlo. |

## Definition of Done

- [ ] Todos los navegadores internos conocidos están marcados.
- [ ] Tres días completos de Analytics están comparados y documentados.
- [ ] No existe una caída anómala atribuible al filtro.
- [ ] TECH-ANALYTICS-002 está cerrado y publicado.
- [ ] `EventScheduled` aparece en todos los eventos `active` y `upcoming`.
- [ ] `Offer` aparece solo con gratuidad confirmada.
- [ ] No existen `endDate`, `performer` ni `image` inventados.
- [ ] Validaciones local y externa sin errores.
- [ ] Cambio fusionado y verificado en producción.
- [ ] Search Console muestra el nuevo rastreo sin errores o la validación solicitada queda registrada y pendiente explícitamente.
- [ ] Documentación final publicada.

## Acciones inmediatas

1. La administración marca sus navegadores restantes y confirma la lista.
2. El seguimiento automático continúa hasta el corte del 28 de agosto.
3. Codex registra el semáforo y publica la evidencia.
4. Solo con resultado verde se inicia la auditoría de Schema.org.

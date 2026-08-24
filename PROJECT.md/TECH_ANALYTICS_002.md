# TECH-ANALYTICS-002 — Exclusión de tráfico interno y de pruebas

Estado: implementación local; despliegue y verificación real pendientes
Fecha de inicio: 24 de agosto de 2026

## Objetivo

Evitar que las visitas de desarrollo, previews de Vercel y navegadores internos identificados contaminen las métricas de producción, sin aplicar reglas amplias que puedan descartar tráfico legítimo.

## Fuentes de tráfico no real consideradas

| Fuente | Tratamiento |
| --- | --- |
| Desarrollo local | `@vercel/analytics` permanece en modo de desarrollo y no envía datos reales. |
| Despliegues Preview de Vercel | Se cancelan los eventos cuyo hostname no sea `sprakkafe-oslo.vercel.app`. El panel debe consultarse además con el entorno **Production**, no **All Environments**. |
| Navegadores propios usados contra producción | Se cancelan cuando el navegador tiene la marca local `sprakkafe.analytics.internal=1`. |
| Herramientas de QA ejecutadas en previews o local | Cubiertas por el filtro de hostname o por el modo de desarrollo. |
| Bots internos conocidos | Cubiertos solo si usan preview/local o un navegador marcado. |

## Criterio elegido

La integración usa `beforeSend`, mecanismo oficial de `@vercel/analytics`, para devolver `null` y cancelar el envío cuando:

1. el hostname no es el canónico de producción; o
2. el almacenamiento local del navegador contiene `sprakkafe.analytics.internal` con valor `1`.

No se usa la IP como identificador: los filtros documentados de Vercel Web Analytics permiten explorar dimensiones como hostname, página, país o dispositivo, pero no configuran una exclusión persistente por IP. La marca local evita depender de IPs domésticas o móviles que pueden cambiar.

## Activación en un navegador interno

Abrir la consola del navegador en la web de producción y ejecutar:

```js
localStorage.setItem('sprakkafe.analytics.internal', '1')
```

Recargar la página. La marca se limita a ese navegador y origen.

Para retirar la exclusión:

```js
localStorage.removeItem('sprakkafe.analytics.internal')
```

## Línea base anterior al cambio

Consulta ejecutada el 24 de agosto de 2026 mediante Vercel CLI, filtrada por `environment eq 'production'`:

- periodo: últimos siete días;
- páginas vistas: 201;
- rango diario observado: entre 1 y 70 páginas vistas.

La variación es demasiado alta y la muestra demasiado pequeña para atribuir una caída de un solo día al filtro.

## Limitaciones conocidas

- Un acceso propio a producción desde un navegador sin la marca local seguirá contando.
- La marca no se sincroniza entre navegadores, perfiles, dispositivos ni sesiones privadas.
- No se puede distinguir con certeza a una persona interna de una visitante real solo por país, dispositivo, navegador o IP dinámica.
- Un bot interno que visite el hostname canónico sin la marca podría seguir contando si Vercel no lo filtra como bot.
- Si se añade otro dominio legítimo de producción, habrá que incorporarlo a la lista permitida antes de usarlo.
- Los datos históricos ya recopilados no se eliminan ni se reclasifican.

## Plan de verificación

1. Desplegar el filtro en producción.
2. Desde un navegador sin marca, visitar una ruta de control y confirmar que su página vista aparece en Analytics.
3. Activar la marca interna en otro navegador o perfil, visitar otra ruta de control y confirmar que no aparece.
4. Verificar que un deployment Preview tampoco envía eventos.
5. Comparar varios días antes y después; investigar cualquier caída anómala antes de cerrar el bloque.

## Criterio de cierre

El bloque solo se cerrará cuando la exclusión esté desplegada, la prueba positiva y negativa esté confirmada con datos reales, y la observación posterior no muestre una caída anómala. Hasta entonces no comienza el bloque Schema.org Event.

## Fuentes técnicas

- [Configuración avanzada de `@vercel/analytics`](https://vercel.com/docs/analytics/package)
- [Filtros disponibles en Web Analytics](https://vercel.com/docs/analytics/filtering)
- [Consulta de Analytics mediante Vercel CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli)

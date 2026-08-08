# TECH-ANALYTICS-002 — Exclusión local de tráfico administrativo

## Objetivo

Impedir que las visitas de la administradora contaminen Vercel Web Analytics y Vercel Speed Insights mediante una preferencia local por navegador, sin identificar ni almacenar direcciones IP y sin afectar a visitantes reales.

## Alcance

- Usar la opción oficial `beforeSend` de `@vercel/analytics` y `@vercel/speed-insights`.
- Compartir un único filtro para ambas integraciones.
- Guardar únicamente la preferencia booleana de exclusión en `localStorage`, dentro del navegador y origen donde se activa.
- Documentar cómo activar, comprobar y desactivar la exclusión.

## Fuera de alcance

- Identificación, consulta, transmisión o almacenamiento de direcciones IP.
- Cookies nuevas, perfiles de usuario o seguimiento entre navegadores o dispositivos.
- Eventos personalizados, cambios en el panel de Vercel o nuevas dependencias.
- Interfaz visible, rediseños o cambios en componentes de producto.

## Funcionamiento

La clave local es `sprakkafe.analytics.exclude`.

- Cuando su valor exacto es `true`, el filtro devuelve `null` y el evento no se envía a Vercel.
- Cuando la clave no existe, tiene otro valor o el almacenamiento no está disponible, el evento se conserva sin cambios.
- La preferencia se limita a la combinación de navegador, perfil y origen. Debe activarse por separado en cada navegador, perfil, dispositivo y dominio que use la administradora.
- La aplicación consulta la preferencia en cada evento, por lo que no recopila ni mantiene un identificador de la persona administradora.

## Activación en cada navegador

1. Abrir el sitio en el dominio que se quiere excluir.
2. Abrir las herramientas de desarrollo del navegador y seleccionar la consola.
3. Ejecutar:

```js
localStorage.setItem('sprakkafe.analytics.exclude', 'true')
```

4. Recargar la página. Desde ese momento, las páginas vistas y las métricas de rendimiento de ese navegador y origen se descartan antes de enviarse.
5. Comprobar el estado con:

```js
localStorage.getItem('sprakkafe.analytics.exclude')
```

El resultado esperado es `"true"`. La visita usada para configurar la preferencia puede haberse enviado antes de activarla; las visitas posteriores quedan excluidas.

## Desactivación

En la consola del mismo navegador y origen, ejecutar y después recargar:

```js
localStorage.removeItem('sprakkafe.analytics.exclude')
```

La navegación vuelve al comportamiento normal de cualquier visitante.

## Criterios de aceptación

- Web Analytics y Speed Insights usan `beforeSend` con el mismo filtro.
- Con la clave activa, ambos filtros devuelven `null` y no envían eventos.
- Sin la clave activa, ambos conservan los eventos sin modificarlos y los visitantes reales no se ven afectados.
- No se identifican ni almacenan IPs ni datos personales.
- La exclusión puede activarse, comprobarse y desactivarse por navegador sin interfaz visible.
- No se añaden dependencias, eventos personalizados ni cambios visuales.
- `git diff --check`, lint y build finalizan correctamente.

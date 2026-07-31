# ANALYTICS-MVP-001 — Medición privada del MVP

## Objetivo

Conocer el uso real de Språkkafé Oslo con datos agregados y anónimos, sin cookies de analítica, grabaciones de sesiones ni perfiles individuales.

## Herramienta aprobada

Vercel Web Analytics mediante el paquete oficial `@vercel/analytics`.

No se incorporan en este sprint:

- Google Analytics;
- Google Tag Manager;
- Microsoft Clarity;
- mapas de calor o grabaciones;
- publicidad o seguimiento entre sitios;
- eventos personalizados;
- identificadores personales.

## Datos que revisaremos

- visitantes y páginas vistas;
- páginas de actividades más consultadas;
- páginas de organizaciones más consultadas;
- versión española o inglesa;
- país aproximado;
- dispositivo, sistema operativo y navegador;
- fuente de procedencia cuando esté disponible;
- evolución semanal del tráfico.

## Preguntas de producto

La medición debe ayudarnos a responder:

1. ¿Las personas encuentran y abren actividades?
2. ¿Qué actividades y organizaciones generan más interés?
3. ¿La mayoría del uso procede de teléfonos móviles?
4. ¿La versión inglesa recibe tráfico suficiente para mantenerla?
5. ¿Qué canales de difusión generan visitas?
6. ¿Existen páginas relevantes que casi nadie consulta?

Una cifra solo justifica un cambio cuando muestra un patrón repetido. No se rediseñará una parte aprobada por una variación aislada.

## Revisión semanal

Revisar cada domingo:

| Indicador | Comparación |
| --- | --- |
| Visitantes | Semana actual frente a la anterior |
| Páginas vistas | Semana actual frente a la anterior |
| Actividades más visitadas | Cinco primeras |
| Organizaciones más visitadas | Cinco primeras |
| Idioma | Español frente a inglés |
| Dispositivo | Móvil frente a escritorio |
| Navegador | Principales navegadores |
| Procedencia | Canales o páginas de referencia |

Registrar únicamente conclusiones que puedan conducir a una decisión concreta.

## Interpretación inicial

- **Muchas visitas y pocas aperturas de actividades:** revisar descubrimiento, filtros o claridad de las tarjetas.
- **Una actividad concentra las visitas:** comprobar si responde a una necesidad concreta y buscar ofertas similares.
- **Tráfico móvil dominante:** priorizar siempre la validación a 390 px.
- **Tráfico desde una organización:** mantener la relación y facilitar enlaces a sus fichas.
- **Tráfico desde WhatsApp:** reforzar mensajes directos y tarjetas sociales.
- **Páginas sin visitas:** comprobar si son difíciles de encontrar antes de eliminarlas.

## Privacidad

La integración se limita a Vercel Web Analytics. Según la documentación del proveedor, utiliza datos agregados y anónimos y no instala cookies para identificar visitantes.

No deben enviarse nombres, correos electrónicos, teléfonos ni otra información personal en rutas, parámetros o futuros eventos.

Si más adelante se propone una herramienta con cookies, grabaciones o seguimiento adicional, será obligatorio abrir un sprint independiente para revisar consentimiento y política de privacidad antes de instalarla.

## Activación y verificación

1. Activar Web Analytics en el panel del proyecto de Vercel.
2. Publicar la integración en producción.
3. Abrir `/es` y `/en` desde un navegador.
4. Abrir al menos una actividad y una organización.
5. Esperar a que Vercel procese las primeras visitas.
6. Confirmar que aparecen páginas vistas en el panel Analytics.

## Criterios de aceptación

- El paquete oficial está integrado una sola vez.
- La aplicación compila sin errores.
- Las rutas españolas e inglesas siguen funcionando.
- No se añaden cookies ni un banner de consentimiento.
- No se modifica ningún componente visual congelado.
- La revisión semanal queda documentada.
- Vercel empieza a recibir páginas vistas después del despliegue.

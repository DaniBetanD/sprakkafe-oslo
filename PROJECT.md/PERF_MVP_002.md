# PERF-MVP-002 — Speed Insights

## Objetivo

Medir el rendimiento que experimentan las personas reales en Språkkafé Oslo mediante Core Web Vitals, sin modificar el diseño ni añadir seguimiento publicitario.

## Implementación

- Paquete oficial: `@vercel/speed-insights`.
- Integración React única mediante `SpeedInsights`.
- Cargador autorizado por Trusted Types únicamente bajo `/_vercel/speed-insights/`.
- Sin cookies adicionales, mapas de calor ni grabaciones.

## Indicadores

- **LCP:** rapidez con la que aparece el contenido principal.
- **INP:** respuesta de la interfaz después de una interacción.
- **CLS:** estabilidad visual durante la carga.
- **FCP:** tiempo hasta el primer contenido visible.
- **TTFB:** tiempo de respuesta inicial.

Los resultados deben revisarse separando móvil y escritorio. No se aplicarán cambios por datos aislados; primero debe existir una muestra suficiente de visitas reales.

## Revisión

Durante la revisión semanal:

1. consultar producción y excluir previews;
2. priorizar resultados móviles;
3. identificar rutas con rendimiento inferior;
4. comprobar si el problema se repite durante al menos dos revisiones;
5. abrir un sprint específico antes de modificar componentes congelados.

## Criterios de aceptación

- Speed Insights está habilitado en Vercel.
- El script de rendimiento carga sin errores de CSP o Trusted Types.
- Las versiones española e inglesa siguen funcionando.
- Lint y build son correctos.
- No hay cambios visuales.

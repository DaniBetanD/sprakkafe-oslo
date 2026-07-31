# Auditoría de dependencias — 31 de julio de 2026

## Resultado

La auditoría completa detectó inicialmente tres vulnerabilidades de severidad alta.

### Dependencia de desarrollo corregida

`brace-expansion` 5.0.7 llegaba al proyecto a través de ESLint y `minimatch`. El aviso describía una posible denegación de servicio por una expansión sin límite.

Se aplicó `npm audit fix` sin `--force`. La corrección actualizó dependencias compatibles del archivo de bloqueo, elevó `brace-expansion` a 5.0.9 y eliminó este aviso. React Router también recibió una actualización de parche de 7.18.1 a 7.18.2, sin eliminar el aviso relacionado con RSC.

### Aviso restante

`npm audit --omit=dev` informa de dos entradas de severidad alta asociadas a:

- `react-router`;
- `react-router-dom`, por su dependencia de `react-router`.

Ambos avisos corresponden a la misma vulnerabilidad:

- **GHSA:** `GHSA-qwww-vcr4-c8h2`
- **Tipo:** omisión de protección CSRF en rutas RSC inestables.
- **Versiones afectadas:** React Router `>=7.12.0 <8.3.0`.
- **Versión corregida publicada:** `8.3.0`.

## Exposición del proyecto

Språkkafé Oslo utiliza React Router en modo declarativo mediante `BrowserRouter`, `Routes` y `Route`.

El proyecto no utiliza:

- APIs RSC inestables;
- acciones de servidor de React Router;
- loaders o actions del modo Data/Framework;
- sesiones autenticadas;
- mutaciones de datos gestionadas por React Router.

La condición necesaria descrita por el aviso no está presente. Por tanto, el riesgo práctico para la arquitectura actual se considera **no aplicable**, aunque npm mantiene el aviso por la versión instalada.

## Decisión

No ejecutar `npm audit fix --force`.

La corrección automática propuesta cambiaría a otra versión potencialmente incompatible y no representa una actualización segura y controlada.

La migración a React Router 8 debe tratarse en un sprint técnico independiente que incluya:

1. revisión de la guía de migración;
2. comprobación de compatibilidad con React y Vite;
3. pruebas de todas las rutas y redirecciones;
4. validación de enlaces compartidos y páginas 404;
5. revisión móvil y escritorio;
6. nuevo `npm audit`.

## Seguimiento

- Revisar si se publica una corrección compatible con la rama 7.
- Mantener deshabilitadas las APIs RSC inestables.
- Repetir `npm audit` después de cada actualización de dependencias.
- Resultado después de la corrección segura: dos entradas pendientes, ambas correspondientes al mismo aviso de React Router no aplicable a la arquitectura actual.

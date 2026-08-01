# Roadmap — Språkkafé Oslo

Versión: 2.0
Estado: Documento vivo
Última actualización: 1 de agosto de 2026

## Objetivo

Ayudar a una persona recién llegada a Noruega a encontrar una actividad gratuita, comprender la información esencial y sentirse preparada para asistir.

El roadmap contiene trabajo futuro. El estado de lo ya implementado se mantiene en `PROJECT.md/PROJECT_STATUS.md`.

## Base completada del MVP

- Directorio de actividades y organizaciones con datos JSON centralizados.
- Buscador, filtros y bloque de actividades de hoy.
- Páginas de actividad, organización y error 404.
- Experiencia móvil validada a 390 px.
- Comunidad y newsletter conectadas con MailerLite.
- Alta de actividades con aprobación administrativa obligatoria.
- Revisión semanal administrada de fuentes oficiales.
- SEO técnico: metadatos, canonical, Open Graph, Twitter Card, robots, sitemap y datos estructurados.
- Rendimiento: carga diferida de rutas y optimización de recursos.
- Accesibilidad: contraste, foco visible, navegación por teclado y estructura semántica.
- Seguridad: CSP, COOP, X-Frame-Options y Trusted Types.

## Fase actual — Estabilización del MVP

Prioridad alta:

- Mantener actualizados los horarios y estados de verano.
- Establecer contacto directo y administrado con las organizaciones.
- Validar periódicamente suscripción, navegación, enlaces compartidos y páginas de detalle.
- Medir errores reales antes de incorporar nuevas funcionalidades.

Sprint activo:

- `SEO-GEO-002` — Indexación, confianza y medición.

## Próxima fase — Operación y contenidos

- Preparar un flujo asistido para extraer información desde una URL oficial.
- Mantener la aprobación final del administrador antes de publicar cambios.
- Definir una rutina editorial para la newsletter.
- Crear recursos breves que reduzcan barreras para la primera visita.
- Evaluar analítica respetuosa con la privacidad.
- Revisar la posible actividad de Tøyen Frivilligsentral y su comunidad de Facebook.
- Evaluar en un sprint UX propio una invitación contextual a la newsletter durante el scroll.

## Fase futura — Datos y administración

Solo se iniciará cuando el mantenimiento con JSON deje de ser suficiente.

- Base de datos gestionada.
- Panel de administración.
- Historial de revisiones.
- Alertas ante cambios en fuentes oficiales.
- Roles y permisos.

## Fase futura — Crecimiento

- Páginas por zona o ciudad cuando exista contenido suficiente.
- Multiidioma según necesidades verificadas.
- Expansión gradual a otras ciudades de Noruega.
- Herramientas para que las organizaciones soliciten altas o correcciones.

## Fuera del alcance inmediato

- Perfiles de usuario.
- Comentarios y valoraciones.
- Favoritos y gamificación.
- Recomendaciones personalizadas.
- Paneles complejos para organizaciones.

Estas ideas no están aprobadas como sprints y no deben implementarse por iniciativa propia.

## Criterio para abrir un sprint

Una propuesta debe resolver al menos una necesidad comprobada:

1. Facilitar encontrar una actividad.
2. Reducir incertidumbre o miedo.
3. Mejorar la fiabilidad de la información.
4. Simplificar el mantenimiento aprobado.
5. Mejorar accesibilidad, rendimiento o seguridad.

Cada sprint tendrá un único objetivo, alcance explícito y criterios de aceptación.

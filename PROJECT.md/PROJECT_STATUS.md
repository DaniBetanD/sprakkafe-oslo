# Estado del proyecto

Versión: 3.1
Estado: Documento vivo
Última actualización: 31 de julio de 2026

## Estado general

**MVP funcional, desplegado y en fase de estabilización.**

El objetivo actual es proteger la fiabilidad de la información, comprobar los flujos reales y mantener una experiencia sencilla antes de ampliar el producto.

## Capacidades activas

| Área | Estado |
| --- | --- |
| Home y navegación | Estable y aprobada |
| Buscador y filtros | Funcionales |
| Actividades de hoy y listado completo | Funcionales |
| ActivityCard | Estable y aprobada |
| Página de actividad | Funcional |
| Página de organización | Funcional |
| Página 404 | Funcional |
| Header, Hero, MissionSection y Footer | Estables y aprobados |
| Responsive | Validado en móvil y escritorio |
| Newsletter | Activa mediante MailerLite |
| Contacto de organizaciones | Activo desde el footer |
| Compartir por WhatsApp | Metadatos configurados |
| SEO técnico | Implementado |
| Accesibilidad | Auditoría principal superada; mantenimiento continuo |
| Rendimiento | Optimizado y validado |
| Seguridad web | CSP, COOP, XFO y Trusted Types activos |
| Administración de contenidos | Manual, con aprobación obligatoria |
| Idiomas | Español e inglés activos |
| Analítica | Vercel Web Analytics activo |
| Rendimiento real | Vercel Speed Insights activo |

## Arquitectura vigente

- React 19 y Vite 8.
- Tailwind CSS 4.
- React Router 7 con carga diferida de páginas secundarias.
- Datos centralizados en `src/data/activities.json` y `src/data/organizations.json`.
- Vercel conectado al repositorio para producción.
- Node.js 22 definido para desarrollo y despliegue.

Rutas públicas:

- `/es` y `/en`
- `/:locale/activity/:id`
- `/:locale/organization/:id`
- ruta comodín para la página 404

## Operación de contenidos

- La revisión de actividades se realiza cada domingo.
- Se consultan fuentes oficiales.
- La ausencia de información se comunica sin inventar horarios, duración o precio.
- Ningún cambio de datos se publica sin revisión y aprobación administrativa.
- Las nuevas actividades comienzan con una URL oficial y una ficha de aprobación.

## Decisiones cerradas

No se rediseñan fuera de un sprint específico:

- Home y Hero.
- Header y navegación.
- Footer.
- MissionSection.
- ActivityCard.
- OrganizationPage.
- Sistema de colores, tipografía, espaciados y layouts.

## Trabajo actual

- `UX-NEWSLETTER-002`: invitación contextual preparada y pendiente de revisión visual.
- `SEO-GEO-002`: base indexable y páginas de confianza en revisión antes de publicar.
- `MARKETING-001`: primera activación orgánica de 14 días en ejecución.
- `CONTENT-ORG-002`: perfil de LIN preparado como borrador; revisión prevista para el 7 de agosto de 2026.
- Construcción de una línea base semanal con Analytics y Speed Insights.
- Contacto y seguimiento administrado con organizaciones.
- Mantenimiento de información estacional.
- QA periódico de suscripción, enlaces, rutas y producción.

## Pendiente aprobado a corto plazo

- Mantener una rutina editorial para la newsletter.
- Mejorar el flujo asistido de incorporación desde fuentes oficiales.
- Evaluar los primeros datos de Analytics y Speed Insights cuando exista una muestra suficiente.
- Revisar el perfil de LIN el 7 de agosto de 2026 y decidir su publicación.
- Comprobar una posible actividad de Tøyen Frivilligsentral y el grupo de Facebook facilitado por la administración; no publicar sin revisión.
- Valorar en un sprint UX independiente una invitación a la newsletter activada durante el desplazamiento, sin implementarla dentro de SEO-GEO-002.

## No implementado

- Base de datos y panel administrativo.
- Perfiles de usuario, favoritos, comentarios o valoraciones.
- Multi-ciudad y otros idiomas además de español e inglés.
- Automatización de publicaciones sin aprobación humana.

Estos elementos pertenecen al roadmap y no están autorizados como desarrollo inmediato.

## Definition of Done

Una tarea se considera cerrada cuando funciona, mantiene las decisiones aprobadas, pasa lint y build, ha sido revisada en los tamaños relevantes y, cuando corresponde, cuenta con commit, push, despliegue y validación en producción.

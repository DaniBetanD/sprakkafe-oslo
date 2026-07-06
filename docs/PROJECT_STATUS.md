Språkkafé Oslo — Estado del Proyecto

Última actualización: 4 julio 2026
Stack: React + Vite + Tailwind + React Router + Vercel
Estado general: 🟢 MVP funcional, entrando en fase de refinamiento UX/UI profesional


Visión del producto

Ayudamos a las personas a sentirse parte de Noruega a través del idioma, la comunidad y la cultura.

El proyecto ha evolucionado de ser un directorio a convertirse en una plataforma comunitaria centrada en la integración de personas en Noruega.


Principios del proyecto


🤝 Comunidad — Las personas aprenden mejor juntas
🌍 Pertenencia — Ayudar a sentirse parte de la sociedad noruega
💙 Accesibilidad — Información gratuita, clara y fácil de encontrar
🛡️ Confianza — Actividades verificadas, espacios seguros
🌱 Aprendizaje continuo — Acompañar más allá de una actividad



Infraestructura


 React + Vite
 Tailwind CSS
 React Router
 Deploy automático en Vercel (sprakkafe-oslo.vercel.app)
 GitHub conectado
 Desarrollo local estable (npm run dev)
 vercel.json con rewrites para SPA
 .nvmrc con Node 22
 engines en package.json
 .vscode/settings.json con formatOnSave: false en GitHub
 Vite build sin warnings bloqueantes



Arquitectura actual

src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── ActivityCard.jsx
│   ├── Filters.jsx
│   ├── Footer.jsx
│   ├── MobileDetailPanel.jsx
│   ├── MissionSection.jsx
│   └── ScrollToTop.jsx
├── pages/
│   ├── Home.jsx
│   ├── ActivityPage.jsx
│   └── OrganizationPage.jsx
├── data/
│   ├── activities.json
│   └── organizations.json
├── assets/
│   └── logos/ (10 logos reales: png/svg)
├── utils/
│   └── translations.js
├── App.jsx
├── main.jsx
├── index.css
└── app.css


Modelo de datos

organizations.json — 10 organizaciones

Røde Kors, Deichman, Caritas, Norsk Start, Haugerud, Paulus Kirke, Ethnos, Alfaskolen (en pausa), Sagene, Tøyen Frivilligsentral.

Campos: id, name, tipo, website, email, phone, logo, logoImg, verified, description, lastChecked.

activities.json — 10 actividades

Campos: id, organizationId, name, district, day, time, level, address, description.


Sprints completados

✅ Sprint MVP-010 — Navegación


 ScrollToTop en cada cambio de ruta
 Header funcional con anchors (#actividades, #proyecto)
 Footer con links reales (no href="#")
 Navegación consistente en todas las páginas
 Back consistente — siempre <Link to="/">, nunca history.back()
 Logo en ActivityPage y OrganizationPage enlaza a Home
 Nav minimalista en páginas de detalle (Volver + Logo)
 Auditoría completa de navegación realizada
 CTA "Únete a la comunidad" — pendiente (ver Sprint MVP-014)


✅ Sprint UX-001 — Re-arquitectura de información


 Descripción priorizada en tarjetas
 Día y hora unificados en una línea
 Nivel convertido en badge con color
 Dirección enlazada a Google Maps
 Orden: Descripción → Día/Hora + Nivel → Dirección


✅ Sprint UX-002 — Jerarquía visual del panel


 Panel desktop sincronizado con nueva jerarquía
 Descripción destacada con fondo sutil
 Badge de nivel en el panel
 Dirección unificada con link a mapa
 MobileDetailPanel — pendiente sincronizar exactamente con desktop


✅ Sprint UX-003 — Hero


 Gradiente refinado
 Subtítulo orientado a la misión
 Chips informativos (En toda Oslo, Comunidad, Cultura local)


✅ Sprint UX-004 — Header


 Efecto cristal (bg-white/70 backdrop-blur-xl)
 Navegación definitiva (Actividades, Sobre el proyecto, Únete)
 CTA "Únete a la comunidad" visible
 Menú móvil funcional con cierre al navegar


✅ Sprint UX-005 — Conversión y CTAs


 CTA "Ver detalles del evento" como acción principal
 Jerarquía de acciones: principal → secundaria → terciaria
 ActivityPage rediseñada con orden psicológico: Confianza → Interés → Motivación → Decisión


✅ Sprint UX-006 — MissionSection


 Sección "Sentirse parte de Noruega"
 3 tarjetas de misión (Practica, Descubre, Conecta)
 Bloque "Nuestra misión" con texto institucional
 Sección "¿Cómo funciona?" con 3 pasos
 CTA final "¿Listo para empezar?" enlazado a #actividades
 id="proyecto" para anchor del header



Sprints pendientes

🔄 Sprint MVP-011 — Sistema de diseño


 Revisar consistencia de colores en todos los componentes
 Revisar tipografía y espaciados
 Estandarizar bordes, sombras y radios
 Revisar estados hover/focus/active


⬜ Sprint MVP-012 — Revisión de contenido


 Copys y mensajes
 CTAs
 Textos institucionales


⬜ Sprint MVP-013 — Preparación para producción


 SEO (meta tags, og:image, sitemap)
 Performance (lazy loading, imágenes optimizadas)
 Accesibilidad WCAG


⬜ Sprint MVP-014 — Comunidad / Newsletter


 Google Form para captura de emails
 Modal "Únete a la comunidad" con honeypot + timestamp
 Checkbox de consentimiento GDPR
 Texto legal inline
 Página /privacidad
 Link a privacidad en footer



Roadmap técnico

Próximo


 Página 404 global
 MobileDetailPanel sincronizado con desktop
 Optimización SEO
 Accesibilidad WCAG


Medio plazo


 Supabase (migración de JSON a base de datos real)
 Panel Admin
 Automatización de actualización de actividades


Largo plazo


 Multi-ciudad (sprakkafe.no/oslo, /bergen, /trondheim)



Lecciones aprendidas


Hacer commit después de cada cambio estable
formatOnSave: false evita que Prettier rompa JSX
Pegar archivos completos reduce errores de copy-paste parcial
Verificar siempre en modo incógnito antes de reportar bugs visuales
El error de Vercel era app.css con mayúscula incorrecta en el import
Node.js 24.x en Vercel causaba fallos — solucionado con Node 22
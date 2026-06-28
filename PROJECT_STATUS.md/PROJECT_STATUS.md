Språkkafé Oslo — Estado del Proyecto

Última actualización: Junio 2026

Stack: React + Vite + Tailwind + React Router + Vercel

Estado general: 🟢 MVP funcional con arquitectura profesional


Objetivo

Directorio ligero, móvil primero, para encontrar actividades de intercambio lingüístico en Oslo dirigido a hispanohablantes.


Infraestructura


 Proyecto creado con Vite + React
 Código gestionado con GitHub
 Deploy funcionando en Vercel (sprakkafe-oslo.vercel.app)
 Desarrollo local con npm run dev
 Tailwind CSS configurado correctamente
 React Router configurado con 3 rutas



Arquitectura actual

src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── ActivityCard.jsx
│   └── Filters.jsx
├── pages/
│   ├── Home.jsx
│   ├── ActivityPage.jsx
│   └── OrganizationPage.jsx
├── data/
│   ├── activities.json
│   └── organizations.json
├── utils/
│   └── translations.js
├── App.jsx
├── main.jsx
└── index.css


Modelo de datos

organizations.json


 Separado de activities (arquitectura escalable)
 9 organizaciones reales de Oslo
 Campos: id, name, tipo, website, email, phone, logo, verified, description, lastChecked
 Verificar y completar URLs de websites
 Añadir coordenadas GPS para mapas futuros


activities.json


 Enlazadas a organizaciones via organizationId
 8 actividades reales
 Campos: id, organizationId, name, district, day, time, level, address, description
 Añadir actividades de las organizaciones que faltan (alfaskolen, caritas completo)
 Verificar horarios y direcciones con fuentes oficiales



Componentes

App.jsx


 Routing configurado: /, /activity/:id, /organization/:id


Home.jsx


 Buscador funcional (por nombre, organización, barrio, nivel)
 Filtros por barrio, día, nivel y organización
 Contador de resultados
 Grid de tarjetas responsive
 Bug corregido: filtro organización usa organizationId correctamente
 getOrganization() centralizado y pasado como prop a las cards


ActivityCard.jsx


 Recibe organization como prop (sin reimportar JSON)
 Días mostrados en español via DAYS
 Niveles mostrados con descripción via LEVELS
 Links a /activity/:id y /organization/:id


ActivityPage.jsx


 Vista completa: nombre, organización, día, horario, barrio, nivel, descripción
 Grid de datos clave responsive
 Sección de información de la organización
 Links a web oficial y página de organización
 Vista de error si la actividad no existe
 Navbar con "Volver al directorio"
 Días y niveles en español
 Mostrar address en la ficha de datos (campo existe en JSON pero no se renderiza)
 Integrar mapa (Google Maps embed o similar)


OrganizationPage.jsx


 Muestra info completa de la organización (logo, nombre, tipo, descripción)
 Botones de web, email y teléfono (condicionales si existen)
 Lista de actividades de esa organización con link a cada una
 Días y niveles en español
 Vista de error si la organización no existe
 Import de Link corregido
 Mostrar badge "verificado" / "en pausa"


Filters.jsx


 Filtros por barrio, día, nivel y organización
 Botón "Limpiar filtros"
 Estilos uniformes en los 4 selects
 Días mostrados en español en el desplegable
 Niveles mostrados con descripción en el desplegable


utils/translations.js


 DAYS — traducciones de días inglés → español
 LEVELS — descripciones de niveles A1-C1
 Importado en: ActivityCard, ActivityPage, OrganizationPage, Filters



Bugs corregidos


 ActivityCard reimportaba organizations.json duplicando lógica de Home
 Filtro de organización comparaba activity.organization (inexistente) en lugar de activity.organizationId
 OrganizationPage usaba Link sin importarlo
 translations.js guardado como .json en lugar de .js
 Select de Organización en Filters sin clases CSS



Próximos pasos

Fase 2 — Mejoras de detalle (inmediato)


 Mostrar address en ActivityPage
 Badge "En pausa" para alfaskolen en las cards y páginas
 Mejorar diseño móvil general
 Mejorar diseño visual de Home (hero, tipografía, espaciado)
 Añadir página 404 global


Fase 3 — Mapas


 Embed de Google Maps en ActivityPage usando address
 Añadir coordenadas GPS al JSON
 Vista de mapa general en Home (opcional)


Fase 4 — Base de datos real


 Migrar activities.json + organizations.json → Supabase
 Configurar API automática con Supabase
 Actualizar componentes para fetch en lugar de import JSON


Fase 5 — Actualización automática


 Scraper mensual de webs oficiales
 Comparador de cambios
 GitHub Actions o Supabase Edge Functions como cron
 Sistema de marcado de cambios pendientes de revisión


Fase 6 — Panel de administración


 Ruta privada /admin
 Añadir / editar organizaciones y actividades
 Aprobar cambios del scraper
 Marcar actividades como verificadas o en pausa


Fase 7 — Monetización (opcional)


 Actividades destacadas
 Anuncios de organizaciones
 Membresías o eventos patrocinados



Estado por módulo

MóduloEstadoInfraestructura✅ CompletoModelo de datos✅ CompletoHome + Buscador + Filtros✅ CompletoActivityCard✅ CompletoActivityPage🟡 Falta address + mapaOrganizationPage🟡 Falta badge pausaTraducciones centralizadas✅ CompletoDiseño móvil🟡 MejorableBase de datos real⏳ PendienteActualización automática⏳ PendientePanel admin⏳ Pendiente
# Språkkafé Oslo — Estado del Proyecto
**Última actualización:** 30 junio 2026
**Stack:** React + Vite + Tailwind + React Router + Vercel
**Estado general:** 🟢 MVP funcional, diseño pulido, desktop y móvil operativos

---

## Objetivo

Directorio ligero, móvil primero, para encontrar actividades de intercambio lingüístico en Oslo dirigido a hispanohablantes.

---

## Infraestructura

- [x] Proyecto creado con Vite + React
- [x] Código gestionado con GitHub
- [x] Deploy funcionando en Vercel (`sprakkafe-oslo.vercel.app`)
- [x] Desarrollo local con `npm run dev`
- [x] Tailwind CSS configurado correctamente
- [x] React Router configurado con 3 rutas
- [x] `.vscode/settings.json` con `formatOnSave: false` para evitar que Prettier rompa JSX al guardar

---

## Arquitectura actual

```
src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── ActivityCard.jsx
│   ├── Filters.jsx
│   ├── Footer.jsx
│   └── MobileDetailPanel.jsx
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
└── app.css (vacío, reservado)
```

---

## Modelo de datos

### organizations.json — 10 organizaciones
Røde Kors, Deichman, Caritas, Norsk Start, Haugerud, Paulus Kirke, Ethnos, Alfaskolen (en pausa), Sagene, Tøyen Frivilligsentral.

Campos: `id`, `name`, `tipo`, `website`, `email`, `phone`, `logo` (emoji fallback), `logoImg` (archivo real), `verified`, `description`, `lastChecked`.

- [x] Logos reales en `src/assets/logos/` (mezcla de .png y .svg, nombres coinciden con `logoImg`)
- [x] Website de Røde Kors apunta a la página específica de norsktrening, no a la home genérica
- [ ] Verificar y completar websites de organizaciones restantes
- [ ] Añadir coordenadas GPS para mapas futuros

### activities.json — 10 actividades
Incluye las 2 actividades de Tøyen Frivilligsentral (Språkkafé + New Amigos Language Café).

Campos: `id`, `organizationId`, `name`, `district`, `day`, `time`, `level`, `address`, `description`.

- [x] Todas con descripción y dirección completas
- [ ] Niveles actuales solo cubren A1-A2; B1-B2 definidos en translations pero sin actividades aún (no es bug, es reflejo real de datos)

---

## Componentes

### App.jsx
- [x] Routing: `/`, `/activity/:id`, `/organization/:id`

### Home.jsx
- [x] Hero con gradiente azul, búsqueda flotante sobre el hero (`-mt-8`)
- [x] Buscador + 4 filtros (Barrio, Día, Nivel, Organización)
- [x] Grid de tarjetas responsive (1 col móvil / 2-3 cols desktop)
- [x] Panel lateral en desktop (`hidden md:flex`) con: logo, datos, descripción de actividad, descripción de organización, y 3 acciones (ver página completa, ver organización, sitio web)
- [x] `MobileDetailPanel` conectado como bottom sheet fuera de `<main>`, con overlay oscuro
- [x] Grid se reduce a 45% de ancho en desktop cuando hay selección, sin solaparse

### ActivityCard.jsx
- [x] Logo real vía `new URL(...).href` (compatible con Vite, sin rutas rotas)
- [x] Fallback a emoji si no hay `logoImg`
- [x] Días y niveles traducidos
- [x] Borde azul sutil en tarjeta seleccionada (sin texto redundante "Ver detalles", eliminado por UX)
- [x] Truncado de texto largo (`truncate`)

### ActivityPage.jsx
- [x] Badge dinámico Verificado/En pausa según `organization.verified`
- [x] Fichas de datos en grid: Día, Horario, Barrio, Nivel, Dirección
- [x] Descripción de la actividad
- [x] Bloque "Sobre la entidad organizadora" con descripción + botones (sitio web, email, teléfono, ver perfil)
- [x] Sección "Más actividades de [organización]" enlazando otras actividades de la misma org
- [x] Vista de error si la actividad no existe

### OrganizationPage.jsx
- [x] Logo real, nombre, tipo
- [x] Botones condicionales de web, email, teléfono
- [x] Lista de actividades de esa organización
- [x] Vista de error si la organización no existe

### Filters.jsx
- [x] 4 selects con mismo estilo (`rounded-xl border bg-white px-4 py-3`)
- [x] Días y niveles traducidos en las opciones
- [x] Botón "Limpiar filtros"

### MobileDetailPanel.jsx
- [x] Bottom sheet con overlay, handle visual, animación slideUp/fadeIn
- [x] Mismo contenido que el panel desktop, adaptado a móvil
- [x] `onClick={onClose}` en los links para cerrar el panel al navegar

### Footer.jsx
- [x] 3 columnas: marca + descripción, enlaces, información
- [x] Sin dependencias de iconos externos (evita errores de imports inexistentes en lucide-react)

### utils/translations.js
- [x] `DAYS` — inglés → español
- [x] `LEVELS` — A1 a B2 con descripción (C1 eliminado por no usarse)

---

## CSS global (index.css)
- [x] `h1-h6 { font-size: unset; ... }` para neutralizar estilos heredados del boilerplate de Vite que rompían el tamaño de títulos con Tailwind
- [x] Animaciones `slideUp` / `fadeIn` para el bottom sheet
- [x] `.mobile-panel` con `max-height: 85vh` y scroll táctil

---

## Bugs corregidos (historial)

- [x] `ActivityCard` reimportaba `organizations.json` duplicando lógica de `Home`
- [x] Filtro de organización comparaba campo inexistente (`activity.organization` → `activity.organizationId`)
- [x] `OrganizationPage` usaba `Link` sin importarlo
- [x] `translations.js` guardado como `.json` en lugar de `.js`
- [x] Select de Organización sin clases CSS (inconsistente con los otros 3)
- [x] JSON con comas mal puestas / faltantes en `organizations.json` (errores de parseo en Vite)
- [x] Rutas de logos `/src/assets/...` no funcionaban en Vite → solucionado con `new URL(..., import.meta.url).href`
- [x] `lucide-react` import de ícono inexistente (`Instagram`) rompía toda la app — causado por código viejo cacheado, no por el código actual
- [x] CSS global (`h1, h2 { font-size: 56px }`) sobreescribía Tailwind
- [x] `app.css` contenía accidentalmente el código de `App.jsx`
- [x] Múltiples casos de `<a>`/`<Link>` con atributos fuera de la etiqueta de apertura (`<a>` en vez de `<a href=...>`), causado por el autoformateador de VS Code — resuelto desactivando `formatOnSave`
- [x] `MobileDetailPanel` importado pero no usado en `Home.jsx` — conectado y movido fuera de `<main>` para que `position: fixed` funcionara correctamente
- [x] Panel lateral y tarjeta seleccionada mostraban información redundante — simplificado eliminando el texto "Ver detalles →" de la tarjeta

---

## Próximos pasos

### Fase 2 — Pulido visual restante
- [ ] Revisar logos que aún fallan en algunas vistas (Deichman, Caritas, Paulus reportados intermitentemente)
- [ ] Confirmar consistencia de tamaño de hero entre todas las vistas (posible caché residual)
- [ ] Página 404 global para rutas inexistentes

### Fase 3 — Mapas
- [ ] Embed de Google Maps en `ActivityPage` usando `address`
- [ ] Añadir coordenadas GPS al JSON

### Fase 4 — Base de datos real
- [ ] Migrar `activities.json` + `organizations.json` → Supabase
- [ ] Actualizar componentes para fetch en lugar de import JSON

### Fase 5 — Actualización automática
- [ ] Scraper mensual de webs oficiales
- [ ] GitHub Actions o Supabase Edge Functions como cron

### Fase 6 — Panel de administración
- [ ] Ruta privada `/admin` para añadir/editar organizaciones y actividades

### Fase 7 — Monetización (opcional)
- [ ] Actividades destacadas, anuncios, membresías

---

## Estado por módulo

| Módulo | Estado |
|--------|--------|
| Infraestructura | ✅ Completo |
| Modelo de datos | ✅ Completo |
| Home (hero, buscador, filtros, grid) | ✅ Completo |
| Panel lateral desktop | ✅ Completo |
| Panel móvil (bottom sheet) | ✅ Completo |
| ActivityCard | ✅ Completo |
| ActivityPage | ✅ Completo |
| OrganizationPage | ✅ Completo |
| Footer | ✅ Completo |
| Traducciones centralizadas | ✅ Completo |
| Logos reales | 🟡 Mayoría funcionando, algunos por revisar |
| Diseño móvil | ✅ Completo |
| Base de datos real | ⏳ Pendiente |
| Actualización automática | ⏳ Pendiente |
| Panel admin | ⏳ Pendiente |

---

## Lecciones aprendidas (para evitar retrocesos)

1. **Hacer commit y push después de cada cambio estable**, no acumular muchos cambios sin guardar — facilita volver atrás con `git checkout <commit> -- archivo`.
2. **Desactivar el autoformateador de VS Code** (`formatOnSave: false`) evita que JSX se rompa silenciosamente al guardar.
3. **Pegar el archivo completo en lugar de fragmentos** reduce errores de copy-paste parcial que dejan código viejo mezclado con nuevo.
4. **Verificar siempre en modo incógnito** antes de reportar un bug visual — la caché del navegador/Vercel genera falsos positivos.
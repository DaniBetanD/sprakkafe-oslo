Språkkafé Oslo — Estado del Proyecto

Proyecto: Directorio de Språkkafé en Oslo para personas hispanohablantes
Stack actual: React + Vite + Tailwind + Vercel
Estado: MVP funcional en fase de diseño y arquitectura
Última actualización: Junio 2026

1. Objetivo del proyecto

Crear un directorio ligero, intuitivo y móvil primero para encontrar actividades de intercambio lingüístico en Oslo.

Inspiración UX:

Diseño minimalista tipo directorios públicos
Navegación simple
Buscador principal
Filtros rápidos
Información actualizada automáticamente

Usuarios principales:

Personas hispanohablantes viviendo en Oslo
Nuevos residentes
Personas aprendiendo noruego
Organizaciones que ofrecen actividades gratuitas
2. Infraestructura actual
Completado ✅
Entorno de desarrollo
 Proyecto creado con Vite + React
 Código gestionado con GitHub
 Deploy funcionando en Vercel
 Desarrollo local con:
npm run dev
Tecnologías instaladas
Frontend
React
React Router
Tailwind CSS
Lucide React
Headless UI

Dependencias principales:

react
react-dom
react-router-dom
tailwindcss
lucide-react
@headlessui/react
3. Arquitectura actual

Estructura:

src
│
├── components
│   │
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── ActivityCard.jsx
│   └── Filters.jsx
│
├── pages
│   │
│   └── Home.jsx
│
├── data
│   │
│   └── activities.json
│
├── App.jsx
├── main.jsx
└── index.css
4. Funcionalidades implementadas
Home principal ✅

Actualmente existe:

Header
Hero principal
Buscador
Listado de actividades
Contador de resultados
Buscador ✅

Permite buscar por:

Nombre actividad
Organización
Barrio
Nivel

Ejemplo:

buscar:
røde

resultado:
Språkkafé Røde Kors
Sistema de tarjetas ✅

Cada actividad aparece como una tarjeta.

Incluye:

Nombre
Organización
Ubicación
Información básica
Sistema de filtros ✅

Implementado:

Barrio

Ejemplo:

Grünerløkka
Tøyen
Majorstuen
Día

Ejemplo:

Monday
Tuesday
Wednesday
Nivel

Ejemplo:

A1
A2
B1
Organización

Ejemplo:

Røde Kors
Deichman
Limpiar filtros ✅

Añadido botón:

Limpiar filtros

que devuelve todos los resultados.

5. Problemas solucionados
Estructura duplicada del proyecto

Problema:

Existían dos proyectos:

sprakkafe-oslo
     |
     └── sprakkafe

Solucionado:

Mantener:

sprakkafe-oslo

como proyecto principal.

Tailwind

Configurado correctamente.

Errores Vite

Solucionados:

imports incorrectos
estructura duplicada
configuración Tailwind
componentes faltantes
6. Estado actual del diseño UX

Actualmente:

Nivel:

🟡 Funcional

Pendiente:

refinamiento visual
más parecido al diseño objetivo
mejor experiencia móvil
7. Próxima fase inmediata
Fase 1 — Modelo de datos profesional

Estado:

⏳ Pendiente

Objetivo:

Separar organizaciones de actividades.

Actualmente:

activities.json

{
"name":"Språkkafé",
"organization":"Røde Kors"
}

Problema:

La organización está repetida.

Nueva estructura:

organizations.json

Røde Kors
Deichman
Kirkens Bymisjon


activities.json

Actividad
      |
      └── organizationId

Beneficios:

Escala a cientos de actividades
Una organización puede tener múltiples eventos
Actualizaciones automáticas más fáciles
Mejor SEO
8. Fase 2 — Páginas individuales

Pendiente:

Crear:

/activity/:id

Ejemplo:

sprakkafe-oslo.com/activity/rode-kors-tuesday

Contenido:

descripción
horario
dirección
mapa
contacto
organización

Crear:

/organization/:id

Ejemplo:

sprakkafe-oslo.com/organization/rodekors
9. Fase 3 — Base de datos real

Actualmente:

JSON local

Migrar a:

Opciones:

Supabase
Firebase
PostgreSQL

Recomendado:

Supabase

Motivos:

gratis inicialmente
PostgreSQL real
API automática
autenticación
10. Fase 4 — Sistema de actualización automática

Objetivo original:

Cada mes revisar información.

Arquitectura:

Web oficial organización

        ↓

Scraper

        ↓

Comparador

        ↓

Base datos

        ↓

Actualización directorio

Herramientas posibles:

GitHub Actions
Cron jobs
Supabase Edge Functions

Proceso:

Cada mes:

Visitar webs guardadas
Extraer:
horarios
dirección
cambios
Comparar con datos actuales
Marcar cambios
Actualizar
11. Fase 5 — Administración

Pendiente:

Panel privado:

/admin

Funciones:

añadir organización
editar actividad
aprobar cambios
marcar verificado
12. Fase 6 — Monetización futura (opcional)

Posibilidades:

destacados
anuncios de organizaciones
membresías
eventos patrocinados
CHECKLIST GENERAL
MVP actual
 React funcionando
 Vercel deploy
 Home
 Buscador
 Cards
 Filtros
 Diseño responsive inicial
Próximos pasos
 Migrar actividades → entidades reales
 Crear organizations.json
 Añadir organizationId
 Crear página detalle actividad
 Crear página organización
 Mejorar diseño móvil
 Añadir mapas
 Migrar JSON → base de datos
 Crear scraper mensual
 Crear panel admin
 Sistema de verificación
Visión final

El proyecto debe evolucionar hacia:

Directorio
      ↓
Base de datos
      ↓
Motor de búsqueda
      ↓
Actualización automática
      ↓
Plataforma mantenida

Estado actual:
🟢 MVP funcional
🟡 Arquitectura en transición
🚀 Próximo hito: entidades reales y estructura escalable

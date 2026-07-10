# 01_PROJECT_STATUS.md

> **Proyecto:** Språkkafé Oslo
> **Versión:** 2.0
> **Última actualización:** Julio 2026
> **Estado:** Documento vivo

---

# Estado General del Proyecto

## Estado actual

🟢 **MVP funcional y estable**

La aplicación se encuentra desplegada en producción y dispone de una arquitectura suficientemente sólida para continuar evolucionando.

El objetivo actual ya no es construir funcionalidades básicas, sino mejorar la experiencia de usuario, optimizar la navegación y preparar el proyecto para crecer.

---

# Objetivo del MVP

El propósito del MVP es validar una idea muy concreta:

> **Ayudar a una persona recién llegada a Noruega a encontrar fácilmente su primer Språkkafé.**

Todo el desarrollo actual gira alrededor de ese objetivo.

No se están desarrollando funcionalidades complejas hasta asegurar una experiencia excelente para el usuario.

---

# Estado por áreas

| Área              | Estado                |
| ----------------- | --------------------- |
| Home              | 🟢 Muy avanzada (95%) |
| Navegación        | 🟢 Estable            |
| Buscador          | 🟢 Funcional          |
| Filtros           | 🟢 Funcionales        |
| Activity Cards    | 🟢 Funcionales        |
| Activity Page     | 🟡 En evolución       |
| Organization Page | 🟡 Funcional          |
| Footer            | 🟢 Rediseñado         |
| Sistema de Scroll | 🟢 Estable            |
| Responsive        | 🟢 En mejora continua |
| Comunidad         | ⚪ Pendiente           |
| Newsletter        | ⚪ Pendiente           |
| Administración    | ⚪ Pendiente           |
| Base de datos     | ⚪ Pendiente           |

---

# Sprints completados

---

## MVP-001 — Arquitectura inicial

### Objetivo

Construir la primera versión funcional.

### Estado

✅ Completado

Incluye:

* React + Vite
* Tailwind CSS
* React Router
* Datos en JSON
* Primer despliegue en Vercel

---

## MVP-002 — Directorio de actividades

### Estado

✅ Completado

Incluye:

* Listado de actividades
* Tarjetas reutilizables
* Organización mediante JSON
* Páginas individuales

---

## UX-001 — Reorganización de Activity Page

### Estado

✅ Completado

Mejoras:

* Descripción situada inmediatamente bajo el título
* Día y horario unificados
* Nivel convertido en badge visual
* Dirección integrada en un único bloque
* Menor tiempo de escaneo

---

## UX-002 — Jerarquía visual

### Estado

✅ Completado

Mejoras:

* Reducción del ruido visual
* Mayor separación entre bloques
* Eliminación de contenido redundante
* Tipografía reorganizada
* Mejor equilibrio visual

---

## UX-003 — Hero principal

### Estado

✅ Completado

Nuevo mensaje:

> Practica noruego en un entorno real, conoce gente y descubre la cultura de Oslo.

Añadidos:

* Chips informativos
* Diseño más compacto
* Mejor equilibrio vertical

---

## UX-004 — Navegación

### Estado

✅ Completado

Header simplificado.

Menú reducido a las acciones más importantes.

* Actividades
* Sobre el proyecto
* Únete

Además:

* Scroll mejorado
* Navegación entre páginas
* Header preparado para crecer

---

## UX-005 — Storytelling del proyecto

### Estado

✅ Completado

Nueva sección:

**Sentirse parte de Noruega**

Incluye:

* Filosofía del proyecto
* Tarjetas de misión
* Nuestra misión
* Cómo funciona
* CTA comunitario

---

## UX-006 — Footer

### Estado

✅ Completado

Nuevo footer con:

* Identidad del proyecto
* Navegación simplificada
* Información del proyecto
* Diseño responsive

---

## UX-007 — Mobile First

### Estado

🟢 Muy avanzado

Mejoras realizadas:

* Header optimizado
* Menú móvil
* Carruseles reutilizables
* Mejor experiencia táctil
* Botones con microinteracciones
* Scroll optimizado
* Correcciones de navegación

---

# Arquitectura actual

El proyecto utiliza una arquitectura basada en componentes reutilizables.

Actualmente dispone de:

* Header
* Footer
* Hero
* SearchBar
* Filters
* ActivityCard
* MissionSection
* MobileCarousel
* ScrollToTop
* MobileDetailPanel

Esta estructura permite seguir creciendo sin necesidad de grandes refactorizaciones.

---

# Estado del diseño

## Diseño general

🟢 Consistente

El proyecto ya dispone de una identidad visual definida.

Se mantiene:

* mismo lenguaje visual
* mismos radios
* mismas sombras
* misma tipografía
* mismos colores

---

## Responsive

Estado:

🟢 Muy bueno

Se prioriza siempre el desarrollo Mobile First.

Cada cambio se valida antes en 390px que en escritorio.

---

# Calidad técnica

Actualmente el proyecto cumple con:

✅ Build estable

✅ Deploy automático en Vercel

✅ Arquitectura modular

✅ Componentes reutilizables

✅ Scroll personalizado

✅ Navegación SPA

✅ Datos centralizados

---

# Próximo Sprint

## Home 2.0

### Objetivo

Reducir el scroll y facilitar el descubrimiento de actividades.

Se implementará una nueva arquitectura basada en bloques.

---

### Orden previsto

Hero

↓

Cómo funciona

↓

Categorías

↓

Språkkafé hoy

↓

Todas las actividades

↓

Nuestra misión

↓

Footer

---

## Categorías iniciales

Se comenzará con cuatro categorías:

* 📅 Språkkafé hoy
* 👨‍👩‍👧 Familias
* 💻 Digital
* 📚 Todas las actividades

Estas categorías podrán ampliarse en futuras versiones según el comportamiento de los usuarios.

---

# Próximos hitos

## Corto plazo

* Finalizar Home 2.0
* Mejorar Activity Page
* Rediseñar Organization Page
* Optimizar experiencia móvil
* Mejorar accesibilidad

---

## Medio plazo

* Comunidad
* Newsletter
* Recursos para aprender noruego
* Historias de usuarios
* Sistema de favoritos

---

## Largo plazo

* Supabase
* Panel de administración
* Actualización automática de actividades
* Multiidioma
* Multi-ciudad

---

# Objetivo de la siguiente fase

Cuando el MVP esté completamente validado comenzará una nueva etapa.

El foco dejará de ser únicamente mostrar actividades y pasará a construir una comunidad alrededor del aprendizaje del noruego.

---

# Indicadores de éxito

Actualmente el éxito del proyecto no se mide por el número de funcionalidades.

Se medirá por:

* Facilidad para encontrar una actividad.
* Tiempo necesario para decidir asistir.
* Experiencia en dispositivos móviles.
* Claridad de la información.
* Confianza transmitida por la plataforma.

---

# Estado global

**Proyecto:** 🟢 Saludable

**Arquitectura:** 🟢 Escalable

**Código:** 🟢 Estable

**Diseño:** 🟢 Consistente

**Experiencia móvil:** 🟢 Prioridad absoluta

**Fase actual:** Construcción del mejor MVP posible antes de incorporar funcionalidades avanzadas y escalar el proyecto a nivel nacional.

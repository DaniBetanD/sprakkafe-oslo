# Språkkafé Oslo
# Architecture

Versión: 1.0  
Estado: Documento vivo  
Última actualización: Julio 2026

---

# Objetivo

Este documento describe la arquitectura técnica de Språkkafé Oslo.

No explica cómo programar.

Explica cómo está organizado el proyecto y por qué está organizado de esta manera.

Debe servir como referencia para cualquier desarrollador que se incorpore al proyecto.

---

# Filosofía de la arquitectura

La arquitectura de Språkkafé Oslo se basa en cinco principios:

- Simplicidad
- Reutilización
- Escalabilidad
- Mantenibilidad
- Mobile First

Cada decisión técnica debe respetar estos principios.

---

# Arquitectura general

Actualmente el proyecto utiliza una arquitectura basada en componentes.

```
Usuario

↓

React Router

↓

Pages

↓

Components

↓

Utils

↓

JSON Data

↓

Assets
```

Cada capa tiene una única responsabilidad.

---

# Stack tecnológico

Frontend

- React 19
- Vite 8

Routing

- React Router 7

Estilos

- Tailwind CSS 4

Datos

- JSON local

Hosting

- Vercel

Repositorio

- GitHub

Runtime

- Node.js 22

---

# Estructura del proyecto

```
sprakkafe-oslo/

src/

components/
pages/
data/
utils/
assets/

public/

package.json

vercel.json

.nvmrc
```

---

# Organización de carpetas

## components/

Contiene componentes reutilizables.

Ejemplos:

```
Header

Footer

ActivityCard

MissionSection

SearchBar

Filters

ScrollToTop

MobileCarousel

MobileDetailPanel
```

Los componentes no deben depender unos de otros innecesariamente.

---

## pages/

Representan las pantallas completas.

Actualmente:

```
Home

ActivityPage

OrganizationPage
```

Las páginas únicamente organizan componentes.

No deben contener lógica compleja.

---

## data/

Fuente de datos temporal del MVP.

Actualmente:

```
activities.json

organizations.json
```

En el futuro serán sustituidos por Supabase.

---

## assets/

Contiene recursos estáticos.

```
logos/

images/

icons/
```

Todos los recursos deben estar optimizados.

---

## utils/

Funciones reutilizables.

Ejemplos:

```
scrollTo.js

translations.js
```

Nunca duplicar funciones dentro de componentes.

---

# Flujo de datos

Actualmente

```
JSON

↓

Home.jsx

↓

Props

↓

ActivityCard
```

Los datos siempre fluyen en una única dirección.

Nunca modificar directamente los datos desde un componente hijo.

---

# Arquitectura de componentes

Modelo recomendado

```
Home

↓

Hero

↓

CategorySection

↓

RecommendedActivities

↓

ActivityCard + DesktopDetailPanel / MobileDetailPanel

↓

MissionSection

↓

Footer
```

Cada componente tiene una única responsabilidad.

---

# Routing

React Router controla toda la navegación.

```
/

↓

Home

/activity/:id

↓

ActivityPage

/organization/:id

↓

OrganizationPage
```

La navegación interna utiliza:

```
<Link>

navigate()
```

Nunca:

```
history.back()

window.location
```

para navegación interna.

---

# Sistema de scroll

Toda la navegación por secciones utiliza:

```
scrollToId()
```

Ventajas:

- offset del Header
- animación consistente
- comportamiento uniforme

Nunca utilizar directamente:

```
scrollIntoView()
```

---

# Arquitectura visual

El diseño sigue una estructura modular.

```
Header

↓

Hero

↓

Contenido

↓

CTA

↓

Footer
```

Cada bloque debe poder reutilizarse.

---

# Estado de la aplicación

Actualmente:

Estado local mediante React.

No existe estado global.

```
useState

↓

Props

↓

Componentes hijos
```

Cuando el proyecto crezca se evaluará Context API o una solución similar si realmente es necesaria.

---

# Organización de datos

## activities.json

Cada actividad contiene información como:

- id
- nombre
- organización
- dirección
- horario
- nivel
- barrio
- categorías
- tipo
- coordenadas (futuro)

---

## organizations.json

Cada organización contiene:

- id
- nombre
- descripción
- logo
- contacto
- web
- redes sociales (futuro)

Las organizaciones no deben duplicar información de actividades.

---

# Relación entre entidades

```
Organization

↓

1

↓

N

↓

Activities
```

Una organización puede tener muchas actividades.

Una actividad pertenece únicamente a una organización.

---

# Sistema de componentes

Existen tres tipos.

## Componentes de layout

Ejemplo

Header

Footer

---

## Componentes de contenido

Ejemplo

ActivityCard

FirstVisitConfidence

MissionSection

OrganizationCard

---

## Componentes funcionales

Ejemplo

Filters

SearchBar

ScrollToTop

---

# Responsive

La arquitectura se diseña primero para móvil.

```
390 px

↓

768 px

↓

1024 px
```

Desktop reutiliza los mismos componentes.

No existen versiones independientes para móvil y escritorio salvo casos excepcionales.

---

# Mobile First

Todas las decisiones siguen este orden.

```
Móvil

↓

Tablet

↓

Desktop
```

Nunca al contrario.

---

# Carruseles

Los carruseles son componentes independientes.

Objetivos:

- mejorar la navegación móvil
- reducir el scroll vertical
- aumentar el descubrimiento de contenido

Actualmente:

```
MobileCarousel.jsx
```

En el futuro podrá reutilizarse para:

- categorías
- actividades
- organizaciones
- recursos

---

# Sistema de categorías

La Home se organiza mediante categorías.

Ejemplo:

```
Språkkafé hoy

↓

Familias

↓

Todas las actividades

↓

Misión

↓

Cómo funciona
```

El sistema debe permitir añadir nuevas categorías sin modificar la arquitectura.

---

# Arquitectura de navegación

El usuario siempre debe tener un camino claro.

```
Home

↓

Actividad

↓

Organización

↓

Home
```

Nunca crear callejones sin salida.

---

# Arquitectura preparada para escalar

Actualmente

```
Oslo
```

En el futuro

```
Noruega

↓

Oslo

Bergen

Trondheim

Stavanger

Tromsø
```

La arquitectura debe permitir añadir nuevas ciudades sin rehacer el proyecto.

---

# Evolución prevista de datos

Fase MVP

```
JSON
```

↓

Fase 2

```
Supabase
```

↓

Fase 3

```
Panel administración
```

↓

Fase 4

```
Actualización automática
```

Los componentes no deben depender de que la fuente sea JSON.

Solo deben consumir datos.

---

# Futura arquitectura

```
Frontend

↓

API

↓

Supabase

↓

Storage

↓

Authentication

↓

Admin Panel
```

La estructura actual ya está pensada para facilitar esa migración.

---

# Principios de escalabilidad

Cada nuevo componente debe cumplir:

✓ Independiente

✓ Reutilizable

✓ Fácil de eliminar

✓ Fácil de ampliar

✓ Compatible con móvil

---

# Dependencias

Se intenta minimizar el número de librerías externas.

Antes de añadir una nueva dependencia preguntar:

¿React ya lo hace?

¿Tailwind ya lo hace?

¿Podemos construirlo nosotros?

---

# Rendimiento

Objetivos:

- Componentes ligeros
- Evitar renders innecesarios
- Imágenes optimizadas
- Código reutilizable
- Bundle pequeño

La velocidad forma parte de la experiencia de usuario.

---

# Seguridad

Actualmente:

- Sin autenticación
- Sin base de datos
- Sin información sensible

En fases posteriores se implementarán:

- Autenticación
- Roles
- Validaciones
- Protección de formularios
- Gestión segura de datos

---

# Convenciones

Todos los componentes deben seguir la misma estructura.

Ejemplo:

```jsx
Imports

↓

Estado

↓

Funciones

↓

Return

↓

Export
```

Mantener siempre el mismo orden facilita la lectura del código.

---

# Objetivo de la arquitectura

La arquitectura debe permitir que el proyecto siga creciendo durante años sin necesidad de ser reconstruido.

Añadir una nueva ciudad, una nueva categoría o una nueva funcionalidad debe requerir el menor número posible de cambios.

---

# Regla de oro

Si una modificación hace que el proyecto sea más difícil de entender, mantener o ampliar...

...esa modificación probablemente no pertenece a la arquitectura de Språkkafé Oslo.

# Språkkafé Oslo
# Development Guide

Versión: 1.0  
Estado: Documento vivo  
Última actualización: Julio 2026

---

# Objetivo

Este documento define la forma oficial de desarrollar Språkkafé Oslo.

No pretende explicar React.

Explica cómo trabajar dentro de este proyecto sin romper su arquitectura.

Todo desarrollador debe leer este documento antes de realizar su primer commit.

---

# Filosofía de desarrollo

El objetivo NO es escribir mucho código.

El objetivo es escribir código sencillo que siga siendo fácil de mantener dentro de uno, dos o cinco años.

Siempre priorizamos:

• simplicidad

• reutilización

• legibilidad

• estabilidad

• consistencia

---

# Arquitectura del proyecto

```
src/

components/
pages/
data/
utils/
assets/

App.jsx
main.jsx
```

Cada carpeta tiene una única responsabilidad.

Nunca mezclar responsabilidades.

---

# Componentes

Los componentes deben ser:

• pequeños

• reutilizables

• fáciles de leer

Si un componente supera aproximadamente las 200-250 líneas, estudiar dividirlo.

---

## Componentes reutilizables

Actualmente:

Header

Footer

ActivityCard

SearchBar

Filters

MissionSection

MobileCarousel

ScrollToTop

MobileDetailPanel

OrganizationCard

Antes de crear uno nuevo preguntarse:

¿Ya existe uno parecido?

---

# Páginas

Las páginas únicamente organizan componentes.

No deben contener grandes bloques de lógica.

Ejemplo:

Home

↓

Hero

↓

CategorySection

↓

TodayActivities

↓

MissionSection

↓

Footer

---

# Datos

Durante el MVP todos los datos viven en JSON.

```
activities.json

organizations.json
```

No duplicar información.

Si un dato pertenece a una organización debe almacenarse únicamente en organizations.json.

---

# Utilidades

Toda lógica reutilizable debe ir en:

```
src/utils/
```

Ejemplos:

scrollTo.js

translations.js

Nunca duplicar funciones entre componentes.

---

# Routing

Se utiliza:

React Router 7

Toda navegación debe hacerse mediante:

```
<Link>

navigate()

useNavigate()
```

Nunca usar:

```
history.back()

window.location.href
```

salvo casos muy concretos de navegación externa.

---

# Scroll interno

Nunca usar:

```
scrollIntoView()
```

Siempre utilizar:

```
scrollToId()
```

Porque incorpora:

•

offset del Header

•

animación consistente

•

comportamiento uniforme

---

# Estado

Prioridad:

1.

Estado local

↓

2.

Props

↓

3.

Context

↓

4.

Base de datos

No introducir estados globales innecesarios.

---

# Convenciones de nombres

Componentes

```
Header.jsx

ActivityCard.jsx

MissionSection.jsx
```

PascalCase.

---

Funciones

camelCase

```
scrollToId()

handleSearch()

handleClick()
```

---

Variables

camelCase

```
activities

filteredActivities

selectedDay
```

---

Constantes

UPPER_CASE

cuando realmente sean constantes globales.

---

# Importaciones

Orden recomendado:

React

↓

Librerías

↓

Componentes

↓

Utils

↓

Datos

↓

CSS

Ejemplo

```jsx
import { useState } from "react";

import { Link } from "react-router-dom";

import ActivityCard from "../components/ActivityCard";

import { scrollToId } from "../utils/scrollTo";

import activities from "../data/activities.json";
```

Mantener siempre el mismo orden.

---

# Tailwind

Preferimos Tailwind antes que CSS personalizado.

Solo crear CSS cuando:

•

no sea posible con Tailwind

•

animaciones

•

casos muy específicos

---

# CSS

Actualmente:

index.css

App.css

Evitar crear hojas nuevas sin necesidad.

---

# Responsive

Todo cambio debe revisarse en:

390 px

768 px

1024 px

Nunca considerar terminado un cambio que solo funciona en desktop.

---

# Mobile First

Siempre diseñar primero en móvil.

Después adaptar a desktop.

Nunca al revés.

---

# Accesibilidad

Cada botón debe tener:

mínimo

44x44 px

Los formularios deben incluir:

id

name

autocomplete

Todos los inputs deben ser accesibles.

---

# Performance

Prioridades:

•

Componentes reutilizables

•

Evitar renders innecesarios

•

No duplicar datos

•

No importar archivos gigantes si no son necesarios

---

# Dependencias

Antes de instalar una nueva dependencia preguntarse:

¿React ya puede hacer esto?

¿Tailwind ya puede hacerlo?

¿Ya tenemos una utilidad parecida?

Cuantas menos dependencias tenga el proyecto, mejor.

---

# Git

Flujo obligatorio.

```
git status

↓

npm run dev

↓

desarrollo

↓

npm run build

↓

git add .

↓

git commit

↓

git push
```

Nunca saltarse pasos.

---

# Commits

Formato:

```
feat:

fix:

docs:

refactor:

style:

chore:
```

Ejemplos

```
feat: add mobile carousel

fix: correct header scroll

docs: update project handbook

refactor: simplify filters logic
```

---

# Builds

Antes de cualquier push:

```
npm run build
```

Si falla:

No hacer push.

Resolver primero.

---

# Vercel

Después de cada push:

Comprobar:

Deploy

↓

Ready

↓

Production

↓

Sin errores

No continuar un sprint si producción está rota.

---

# Manejo de errores

Cuando aparece un error:

1.

Leer el mensaje completo.

2.

Identificar el archivo.

3.

Corregir únicamente ese problema.

4.

Volver a probar.

Nunca hacer cambios masivos intentando "arreglar todo".

---

# Flujo de desarrollo

Cada tarea debe seguir este orden:

1.

Comprender el problema

↓

2.

Diseñar la solución

↓

3.

Modificar un archivo

↓

4.

Guardar

↓

5.

Probar

↓

6.

Continuar

Nunca modificar cinco archivos a la vez sin verificar.

---

# Refactorización

Antes de refactorizar preguntarse:

¿Hace el código más simple?

¿Reduce duplicación?

¿Rompe algo?

Si no aporta una mejora clara, no refactorizar.

---

# Creación de componentes

Checklist

□ ¿Es reutilizable?

□ ¿Tiene una única responsabilidad?

□ ¿Es responsive?

□ ¿Funciona en móvil?

□ ¿Mantiene la identidad visual?

Solo si todas las respuestas son sí, crear el componente.

---

# Organización de sprints

Cada sprint debe tener:

Objetivo

Cambios

Archivos afectados

Validación

Commit

Deploy

Nunca mezclar varios objetivos distintos en un mismo sprint.

---

# Checklist antes de cerrar un sprint

□ git status limpio

□ npm run build correcto

□ Deploy en Vercel correcto

□ Revisado en móvil

□ Revisado en desktop

□ Sin errores en consola

□ Commit descriptivo

□ Push realizado

---

# Errores aprendidos

Lecciones incorporadas al proyecto:

• No modificar varios archivos críticos simultáneamente.

• Hacer commits pequeños y frecuentes.

• Probar cada cambio antes de continuar.

• No confiar únicamente en localhost; verificar también en producción.

• Evitar duplicar lógica de navegación y scroll.

• Mantener los componentes desacoplados y reutilizables.

• Documentar cada decisión importante para facilitar la incorporación de nuevos colaboradores.

---

# Objetivo final

El código de Språkkafé Oslo debe poder ser entendido por cualquier desarrollador nuevo en menos de una hora.

La mejor arquitectura no es la más compleja.

Es la que cualquiera puede mantener sin miedo a romper el proyecto.
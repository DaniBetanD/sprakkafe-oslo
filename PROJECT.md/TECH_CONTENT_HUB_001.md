# TECH-CONTENT-HUB-001 — Área de guías

Estado: Implementado y validado, pendiente de publicación
Fecha: 7 de agosto de 2026

## Objetivo

Crear un área bilingüe de recursos breves que reduzcan la incertidumbre antes de participar en actividades y publicar una primera guía útil para la visita inicial a un Språkkafé.

## Alcance

- Índice de guías en español e inglés.
- Página de detalle bilingüe con contenido centralizado.
- Primera guía: «Cómo prepararte para tu primer Språkkafé» / «How to prepare for your first language café».
- Acceso desde la navegación principal y el footer.
- Metadatos, datos estructurados, HTML SEO, `hreflang` y sitemap.
- Validación Mobile First, escritorio, teclado y consola.

## Fuera de alcance

- CMS o base de datos.
- Buscador, filtros o categorías de guías.
- Comentarios, perfiles o recomendaciones personalizadas.
- Rediseño de Home, Header, Footer o del sistema visual.

## Rutas

- `/:locale/guides`
- `/:locale/guides/first-sprakkafe`

## Criterios de aceptación

- La guía se entiende en una sola lectura y ofrece acciones concretas.
- Español e inglés mantienen la misma estructura y significado.
- El cambio de idioma conserva la guía abierta.
- Existe un único `h1` y una jerarquía semántica correcta.
- Las páginas aparecen en sitemap y tienen canonical, alternates y schema válidos.
- No hay desbordamiento horizontal a 390 px ni errores de consola.

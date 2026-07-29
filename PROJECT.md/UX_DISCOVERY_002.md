# UX-DISCOVERY-002 — Categorías de actividades

Estado: Aprobado e implementado  
Fecha: 29 de julio de 2026

## Objetivo

Ayudar a encontrar actividades por su finalidad principal ahora que el directorio incluye propuestas de idioma, empleo, comunidad, naturaleza y deporte.

## Taxonomía

| Código | Etiqueta |
| --- | --- |
| `language-practice` | Práctica de noruego |
| `language-cafe` | Café de idiomas |
| `employment` | Empleo y orientación |
| `community` | Cultura y comunidad |
| `nature` | Naturaleza y paseos |
| `sport` | Deporte |
| `women` | Actividades para mujeres |
| `digital` | Digital |

Cada actividad utiliza una sola categoría principal. Las categorías sin actividades visibles no aparecen en el filtro.

## Alcance implementado

- Campo `category` centralizado en todas las actividades.
- Traducciones centralizadas.
- Filtro por tipo de actividad.
- Categoría incluida en la búsqueda textual.
- Limpieza individual y conjunta compatible con el nuevo filtro.

## Fuera de alcance

- Rediseñar `ActivityCard`.
- Mostrar etiquetas nuevas en las tarjetas.
- Permitir varias categorías por actividad.
- Cambiar los componentes congelados.

## Validación pendiente

- [x] Móvil a 390 px.
- [x] Escritorio.
- [x] Combinación con los otros filtros.
- [x] Estado sin resultados.
- [x] Consola del navegador.
- [x] `npm run lint`.
- [x] `npm run build`.

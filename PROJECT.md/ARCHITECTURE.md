# Arquitectura — Språkkafé Oslo

Versión: 3.0
Última actualización: 25 de julio de 2026

## Objetivo

Mantener una aplicación sencilla, rápida y fácil de operar mientras los datos JSON sigan siendo suficientes para el MVP.

## Stack

| Capa | Tecnología |
| --- | --- |
| Interfaz | React 19 |
| Build | Vite 8 |
| Estilos | Tailwind CSS 4 |
| Rutas | React Router 7 |
| Iconos | Lucide React |
| Datos | JSON local |
| Producción | Vercel |
| Runtime | Node.js 22 |

## Estructura vigente

```text
sprakkafe-oslo/
├── api/                       # Integraciones serverless necesarias
├── docs/                      # Roadmap y marca
├── PROJECT.md/                # Documentación de producto
├── public/                    # Recursos públicos, robots y sitemap
├── scripts/                   # Automatización de build
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   ├── activities.json
│   │   └── organizations.json
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

`dist/`, `.vercel/` y `node_modules/` son artefactos locales o generados, no fuentes del producto.

## Rutas

```text
/                         Home
/activity/:id             ActivityPage
/organization/:id         OrganizationPage
/*                        NotFoundPage
```

Las páginas secundarias se cargan con `React.lazy` y `Suspense`. `ScrollToTop` restablece la posición al cambiar de ruta.

## Componentes principales

### Layout y navegación

- `Header`
- `Footer`
- `ScrollToTop`

### Descubrimiento

- `SearchBar`
- `Filters`
- `TodayActivities`
- `HorizontalCarousel`
- `ActivityCard`

### Detalle

- `ActivityPracticalInfo`
- `MobileDetailPanel`
- `DesktopDetailPanel`

### Comunidad y contenido

- `MissionSection`
- `CommunityInviteSection`
- `CommunitySignupModal`

## Datos

`activities.json` y `organizations.json` son la fuente local única. Los componentes relacionan ambas entidades mediante identificadores; no se duplican datos de organización dentro de la interfaz.

Reglas:

- No inventar datos ausentes.
- Mantener identificadores estables.
- Aprobar administrativamente cada alta o corrección.
- Revisar fuentes oficiales según `WEEKLY_VERIFICATION.md`.

## Estado

El estado de búsqueda, filtros y selección permanece cerca de los componentes que lo consumen. No se incorpora un gestor global mientras no exista una necesidad demostrada.

## Estilos

Tailwind resuelve la mayor parte del sistema visual. `src/index.css` contiene estilos globales y tokens compartidos; `src/App.css` solo debe conservar reglas todavía utilizadas.

## SEO

- Metadatos y URL canónica en `index.html`.
- Open Graph y Twitter Card.
- JSON-LD para datos estructurados.
- `robots.txt` y sitemap generado durante `prebuild`.

## Rendimiento

- Rutas secundarias diferidas.
- Recursos locales optimizados.
- Dependencias limitadas.
- Sin introducir complejidad de caché o estado hasta medir una necesidad real.

## Seguridad

`vercel.json` configura cabeceras de protección, incluidas CSP, COOP, control de marcos y Trusted Types. Cualquier cambio debe validarse contra MailerLite, recursos de fuentes y funcionamiento de la SPA.

## Evolución

Una base de datos o panel administrativo solo se incorporarán cuando el volumen o la frecuencia de mantenimiento justifiquen sustituir JSON. La arquitectura futura debe conservar revisión humana antes de publicar.

## Regla de oro

Elegir la solución más sencilla que mantenga claridad, estabilidad, accesibilidad y capacidad de mantenimiento.

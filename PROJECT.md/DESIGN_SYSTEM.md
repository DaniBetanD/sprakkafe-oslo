# Sistema de diseño — Språkkafé Oslo

Versión: 3.0
Última actualización: 25 de julio de 2026

## Propósito

Mantener una experiencia simple, cálida y reconocible. Este documento registra reglas; no autoriza rediseñar componentes congelados.

## Principios

- Mobile First desde 390 px.
- Una acción principal clara por bloque.
- Información que pueda escanearse rápidamente.
- Espacio suficiente para reducir carga cognitiva.
- Consistencia antes que novedad visual.

## Personalidad

La interfaz debe sentirse cercana, tranquila, clara y fiable. No debe parecer un panel administrativo ni una aplicación corporativa fría.

## Color

- Azul principal: acciones, foco y elementos de identidad.
- Azul claro: superficies informativas y estados suaves.
- Blanco: fondo principal y tarjetas.
- Grises oscuros: títulos y texto principal.
- `gray-500` o más oscuro para texto secundario pequeño.

No utilizar `gray-400` en textos pequeños sobre blanco cuando no alcance WCAG AA.

## Tipografía

La familia principal es Inter Variable, servida localmente.

- Texto normal móvil: preferentemente 16 px.
- Texto auxiliar: solo reducir cuando conserve legibilidad y contraste.
- Títulos: jerarquía clara, sin saltos decorativos innecesarios.
- Párrafos: ancho y altura de línea cómodos.

## Espaciado y forma

- Utilizar la escala de Tailwind y evitar valores arbitrarios sin motivo.
- Mantener radios, bordes y sombras ya aprobados en cada familia de componentes.
- Áreas táctiles de al menos 44 × 44 px.
- Respetar áreas seguras del dispositivo cuando existan acciones cercanas al borde.

## Botones y enlaces

- Texto orientado a una acción comprensible.
- Foco visible mediante teclado.
- Estados hover, active y disabled coherentes.
- No depender únicamente del color para comunicar estado.
- La longitud responde a claridad; no existe un máximo rígido de tres palabras.

## Iconografía

Utilizar Lucide React o los recursos aprobados. Los iconos complementan el texto; no sustituyen etiquetas necesarias.

## Componentes congelados

Necesitan un sprint específico para cambiar su identidad visual:

- Header y navegación.
- Hero.
- Footer.
- MissionSection.
- ActivityCard.
- OrganizationPage.
- Home.
- Colores, tipografía, espaciados y layouts globales.

Se permiten correcciones concretas de comportamiento, contenido o accesibilidad que preserven el diseño aprobado.

## Responsive

Validar:

1. Móvil a 390 px.
2. Tablet cuando el cambio lo afecte.
3. Escritorio.

Evitar scroll horizontal accidental, controles demasiado juntos y bloques que pierdan su jerarquía.

## Accesibilidad

- Contraste WCAG AA.
- Navegación por teclado.
- Foco visible.
- HTML semántico.
- Etiquetas accesibles para controles.
- Texto alternativo útil.
- Preferencias de movimiento respetadas.

## Animación

Usar movimiento breve y funcional. No debe retrasar acciones, distraer ni ser imprescindible para comprender la interfaz.

## Fuente de verdad

La implementación aprobada es la referencia visual principal. Si este documento y un componente congelado difieren, no se modifica el componente automáticamente: se documenta la diferencia y se abre un sprint específico.

# Språkkafé Oslo
# Design System

Versión: 1.0
Estado: Documento vivo
Última actualización: Julio 2026

---

# Filosofía del diseño

El diseño de Språkkafé Oslo no busca impresionar.

Busca transmitir confianza.

Una persona que llega a esta web normalmente:

• acaba de llegar a Noruega
• está aprendiendo el idioma
• tiene dudas
• puede sentirse sola
• necesita información clara

Cada decisión visual debe reducir la ansiedad del usuario.

Nuestro trabajo consiste en hacer que la información sea fácil de encontrar y que el usuario quiera dar el siguiente paso.

---

# Principios del diseño

## 1. Mobile First

Toda pantalla se diseña primero para móvil.

Desktop es una adaptación.

Nunca al revés.

Viewport de referencia:

390 px

---

## 2. Simplicidad

Eliminar cualquier elemento que no aporte valor.

Cada bloque debe responder únicamente a una pregunta del usuario.

Ejemplo:

¿Dónde practico?

↓

Lista de actividades

No necesitamos explicar cinco cosas antes.

---

## 3. Escaneo rápido

La mayoría de usuarios no leen.

Escanean.

Por ello:

•

Pocos textos largos

•

Mucho espacio en blanco

•

Jerarquía visual clara

•

Bloques separados

---

## 4. Una acción principal

Cada pantalla tiene un único objetivo.

Ejemplos:

Home

↓

Encontrar una actividad

Activity Page

↓

Convencer al usuario para asistir

Organization Page

↓

Generar confianza

---

# Personalidad visual

Språkkafé Oslo debe sentirse como:

✓ amable

✓ moderna

✓ humana

✓ limpia

✓ cercana

Nunca:

✗ corporativa

✗ fría

✗ saturada

✗ complicada

---

# Paleta de colores

## Color principal

Blue 600

Uso:

•

Botones principales

•

Links activos

•

Badges destacados

---

## Azul claro

Blue 100

Uso:

Fondos suaves

Iconos

Cards

---

## Gris

Gray 50

Fondos

Gray 100

Separadores

Gray 400

Texto secundario

Gray 900

Texto principal

---

# Colores de niveles

Estos colores nunca deben cambiar.

| Nivel | Color |
|--------|--------|
| A1 | Verde |
| A2 | Azul |
| B1 | Púrpura |
| B2 | Naranja |

---

# Espaciado

El espacio es parte del diseño.

Nunca juntar bloques.

Separaciones recomendadas:

Entre secciones:

80–96 px

Entre tarjetas:

24 px

Entre título y texto:

16 px

Entre botones:

12 px

---

# Bordes

Cards

rounded-2xl

Botones

rounded-xl

Badges

rounded-full

---

# Sombras

Siempre suaves.

Usar:

shadow-sm

o

shadow-md

Nunca sombras agresivas.

---

# Tipografía

Fuente:

Inter

---

## Hero

40-48 px

Bold

---

## Títulos principales

32 px

Bold

---

## Subtítulos

24 px

Semibold

---

## Texto normal

16 px

Line-height amplio

---

## Texto auxiliar

14 px

Gray 500

---

# Botones

Todos los botones deben tener:

hover

↓

Ligero cambio de color

active

↓

scale-95

transition

↓

150 ms

Ejemplo:

```
active:scale-95
transition-all
duration-150
```

---

# Cards

Las tarjetas deben transmitir tranquilidad.

Siempre:

•

bordes redondeados

•

mucho padding

•

iconografía sencilla

•

texto corto

Nunca:

•

mucho texto

•

iconos grandes

•

colores fuertes

---

# Iconografía

Biblioteca:

Lucide React

Estilo:

simple

lineal

coherente

Nunca mezclar estilos diferentes.

---

# Animaciones

Las animaciones deben ser discretas.

Permitidas:

fade

slide

scale

Duración:

150–300 ms

Nunca:

rebotes

giros

animaciones largas

---

# Carruseles

En móvil:

scroll horizontal

snap

cards grandes

En desktop:

grid

Nunca carruseles automáticos.

El usuario controla el movimiento.

---

# Header

Identidad aprobada:

Inspirado en Notion, sin copiarlo literalmente.

Debe sentirse editorial, ordenado y cercano; nunca como una barra corporativa o una landing comercial genérica.

La marca utiliza una ficha cuadrada con iconografía lineal de idioma, el nombre Språkkafé y la ubicación Oslo en dos líneas.

La navegación usa enlaces discretos con fondos suaves al interactuar. El CTA comunitario se integra en el conjunto y no debe dominar visualmente todo el Header.

Siempre visible.

Sticky.

Transparencia ligera.

Blur.

Tres acciones principales:

•

Actividades

•

Sobre el proyecto

•

Únete

En móvil:

El CTA «Únete» permanece visible.

El menú hamburguesa despliega Inicio, Actividades y Sobre el proyecto con etiquetas claras y una breve descripción.

---

# Footer

El footer no es un lugar para esconder enlaces.

La marca visual debe reutilizar la misma ficha de idioma y el mismo nombre en dos líneas aprobados para el Header.

Debe transmitir confianza.

Incluye:

•

identidad

•

proyecto

•

copyright

No añadir enlaces innecesarios.

---

# Activity Cards

Cada tarjeta responde a tres preguntas:

¿Qué actividad es?

↓

¿Dónde?

↓

¿Cuándo?

Todo lo demás es secundario.

---

# Activity Page

Orden psicológico obligatorio:

1.

Confianza

↓

2.

Interés

↓

3.

Motivación

↓

4.

Decisión

Nunca cambiar este orden.

---

# Home

Orden recomendado

1 Hero

↓

2 Categorías

↓

3 Actividades destacadas

↓

4 Misión

↓

5 Cómo funciona

↓

6 Footer

Jerarquía adaptativa aprobada:

- Antes del listado se muestra un único bloque compacto de confianza para la primera visita.
- Este bloque responde únicamente a tres inseguridades universales: venir solo, escuchar primero y no hablar perfecto.
- No incluye requisitos concretos de una actividad, botones ni llamadas a la acción que compitan con el listado.
- El buscador y los filtros aparecen cuando existen al menos cuatro actividades; con menos contenido, el listado directo tiene prioridad.
- La búsqueda filtra al escribir y mantiene un campo táctil de al menos 48 px.
- Una única actividad se muestra a ancho completo en móvil, sin carrusel ni controles de desplazamiento.
- Las descripciones de carruseles y categorías utilizan un mínimo de 14 px en móvil, salvo badges puramente auxiliares.
- Las categorías solo se muestran cuando existe contenido real para alguna categoría específica.
- Nunca se muestran categorías vacías o controles deshabilitados únicamente para completar una cuadrícula.
- Las actividades recomendadas solo aparecen cuando hay al menos cuatro actividades y aportan descubrimiento real.
- Con una sola actividad, se muestra directamente como «Actividad disponible» y nunca se duplica en varios bloques.
- Los avisos estacionales contextualizan la disponibilidad sin ocultar la actividad confirmada.

Cierre narrativo aprobado:

- «Nuestra misión» funciona como etiqueta editorial y «Sentirse parte de Noruega» como único título principal del bloque.
- Las tres ideas —confianza, cultura y personas— tienen el mismo peso y utilizan textos breves de al menos 14 px.
- La declaración de misión se integra como una cita visual sencilla y memorable: «El idioma es el comienzo. Sentirse parte es la meta.»
- El CTA final utiliza una superficie blanca y un único botón azul; no compite con el contenido ni repite el Hero.
- Con una sola actividad el CTA dice «Ver la actividad»; con varias utiliza «Ver actividades».
- El Footer continúa visualmente el cierre y comparte la misma identidad de marca que el Header.

---

# Accesibilidad

Objetivo:

WCAG AA

Siempre comprobar:

Contraste

Área táctil mínima

44x44 px

Navegación con teclado

Textos legibles

---

# Responsive

Referencia móvil:

390 px

Tablet:

768 px

Desktop:

1024+

Todo nuevo componente debe revisarse en las tres resoluciones.

---

# Componentes reutilizables

Siempre reutilizar antes de crear.

Actualmente existen:

Header

Footer

ActivityCard

SearchBar

Filters

MissionSection

MobileCarousel

ScrollToTop

MobileDetailPanel

No duplicar componentes.

---

# Filosofía de UX

El usuario nunca debe preguntarse:

"¿Y ahora qué hago?"

Siempre debe existir una siguiente acción clara.

---

# Regla de oro

Si un elemento no ayuda al usuario a encontrar una actividad o a sentirse más seguro para asistir...

...ese elemento no pertenece a Språkkafé Oslo.

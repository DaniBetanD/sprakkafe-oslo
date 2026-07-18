Lo que NOS FALTA (Trabajo pendiente)
F1.1 — Navegación Global: Nos falta cazar y eliminar todos los enlaces muertos (href="#") que queden en el Footer o en las secciones de la Home.

F1.5 — Botón Volver (Parte 2 - Conservar filtros): Al darle a "← Actividades", la aplicación reinicia el estado de la Home (filtros, búsquedas). Falta guardar el contexto en un estado global (o en la URL/Context) para regresar exactamente a la misma posición y vista del listado.

F1.6 — Header (Identidad visual): Cambiar el logo actual por la propuesta de dos líneas preparada para crecer: 🇳🇴 Språkkafé Oslo.

F1.7 — Footer: El pie de página actual necesita una reestructuración completa para convertirse en el mapa de navegación detallado (Proyecto, Comunidad, Recursos, etc.).

F1.8 — Consistencia visual (Design System): Revisar que todas las tarjetas usen rounded-2xl border-gray-100 shadow-sm y los botones rounded-xl font-medium transition.

F1.9 — Mobile Safe Area: Asegurar el padding dinámico (pb-safe) para que las barras de navegación nativas de los smartphones (como la de iOS) no tapen el contenido inferior.

F1.11 — Performance: Limpiar los imports duplicados que detectamos hace un momento en las páginas y dejar el código impoluto.


Sprint F1.1 — Navegación Global
Objetivo UX

Eliminar cualquier enlace "muerto".

Actualmente todavía existen enlaces que no hacen nada (href="#").

Eso genera una sensación de producto inacabado.

Debe quedar así
Header

Logo

↓

Home

Actividades

↓

Listado de actividades (Hero + buscador)

Sobre el proyecto

↓

AboutSection

Únete a la comunidad

↓

CTA del Footer

Contacto

↓

Footer

Sprint F1.2 — Navegación por Scroll

Aquí debemos decidir una regla para todo el proyecto.

Yo utilizaría esta:

Todo lo que pertenece a Home

➡️ Scroll suave.

Ejemplo

Actividades

↓

scroll

↓

Hero
Sobre el proyecto

↓

scroll

↓

AboutSection
Únete

↓

scroll

↓

CTA Footer

Nunca cambiar de página.

Siempre scroll.

Sprint F1.3 — Navegación entre páginas

Aquí sí cambiamos de ruta.

Home

↓

Ver detalles

↓

ActivityPage
Home

↓

Organización

↓

OrganizationPage
OrganizationPage

↓

Actividad

↓

ActivityPage

Todo consistente.

Sprint F1.4 — Scroll Restoration

Muy importante.

Cada cambio de página debe comenzar aquí:

↑
↑
↑
TOP

Nunca aquí

↓

mitad

↓

↓


Ya tienes un ScrollToTop.

Ahora debemos verificar que funciona para todas las rutas.

Sprint F1.5 — Botón Volver

Ahora mismo:

← Volver al directorio

Funciona.

Pero UX moderna:

← Actividades

Mucho más corto.

Mucho más claro.

Además:

Debe volver exactamente al punto donde estaba el usuario.

No reiniciar filtros.

No perder contexto.

Esto más adelante lo podremos mejorar guardando el estado del listado.

Sprint F1.6 — Header

Aquí hay bastante trabajo.

Identidad

Ahora:

S
Språkkafé

Yo evolucionaría hacia:

🇳🇴

Språkkafé
Oslo

Dos líneas.

Preparado para crecer.

CTA

Ahora desaparece en móvil.

No debería.

Propuesta:

❤️ Únete

Siempre visible.

Porque es el objetivo principal del proyecto.

Menú

Actualmente

☰

↓

dropdown

En móviles modernos funciona mejor un panel lateral o un menú desplegable con más espacio.

Pero eso puede esperar a una segunda iteración.

Sprint F1.7 — Footer

Debe convertirse en el centro de navegación.

No solamente un pie de página.

Debe tener

Proyecto
Sobre el proyecto
Cómo funciona
Contacto
Comunidad
Únete
Próximamente newsletter
Recursos
Organizaciones
GitHub
Política (más adelante)
Sprint F1.8 — Consistencia visual

Aquí entra Design System.

Todo debe usar exactamente el mismo lenguaje.

Botones

rounded-xl

font-medium

transition

hover

Siempre.

Cards

Siempre

rounded-2xl

border-gray-100

shadow-sm

Espaciados

Siempre múltiplos de 4

4

8

12

16

24

32

48

64

Nada aleatorio.

Sprint F1.9 — Mobile Safe Area

Importantísimo.

En iPhone:

Nunca dejar botones pegados abajo.

Hay que respetar el área segura.

Padding inferior

pb-safe

o

padding-bottom:
env(safe-area-inset-bottom);

cuando llegue el momento.

Sprint F1.10 — Accesibilidad

Checklist.

Todo debe cumplir:

✅ Área táctil mínima

44x44

Texto

mínimo

16 px

en móvil.

Contraste

WCAG AA.

Focus visible.

Navegable con teclado.

Sprint F1.11 — Performance

Eliminar:

imports sin usar
renders innecesarios
imágenes pesadas
logos demasiado grandes

Preparar lazy loading más adelante.

Sprint F1.12 — Preparación para crecimiento

Esta quizá sea la más importante.

Hace unas horas dijiste algo que cambia completamente el proyecto:

"No estaremos solo en Oslo."

Eso significa que debemos dejar de pensar en una web para Oslo y empezar a pensar en una plataforma.

La estructura debería evolucionar hacia algo como:

Språkkafé
│
├── Oslo
├── Bergen
├── Trondheim
├── Stavanger
└── Tromsø

Por eso, desde ahora, evitaremos escribir "Oslo" directamente en los componentes cuando pueda convertirse en un dato configurable más adelante.

Resultado esperado al finalizar la Fase 1

No añadiremos ni una sola funcionalidad nueva, pero el proyecto se sentirá mucho más sólido.

El usuario percibirá:

Una navegación clara y consistente.
Un flujo sin interrupciones ni enlaces rotos.
Una identidad coherente en todas las pantallas.
Una experiencia móvil cuidada desde el primer toque.
Una base preparada para escalar a nuevas ciudades y futuras funcionalidades.
Mi recomendación sobre el orden de implementación

Para minimizar retrabajo, seguiría exactamente esta secuencia:

Eliminar todos los href="#" y hacer que la navegación funcione de verdad.
Implementar scroll suave hacia las secciones de la Home.
Verificar ScrollToTop en todos los cambios de ruta.
Refinar el Header (identidad, CTA "Únete", navegación móvil).
Refinar el Footer para que sea un centro de navegación y confianza.
Revisar la consistencia visual (espaciados, botones, radios, sombras).
Realizar una auditoría completa en móvil antes de pasar a la siguiente fase.

Con esa base, todo lo que construyamos después (mapas, recomendaciones, comunidad, newsletter, multi-ciudad, etc.) se apoyará sobre una estructura estable en lugar de tener que rehacer navegación o componentes más adelante.
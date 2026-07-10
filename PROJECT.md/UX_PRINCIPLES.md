# UX Principles
## Språkkafé Oslo

Versión: MVP 1.0
Estado: Documento vivo

---

# Filosofía

Språkkafé Oslo no pretende ser un directorio de actividades.

Pretende ayudar a una persona que acaba de llegar a Noruega a dar el primer paso.

Cada decisión de diseño debe responder a una pregunta:

> ¿Hace que asistir al primer Språkkafé sea más fácil?

Si la respuesta es no,
la funcionalidad probablemente no pertenece al MVP.

---

# Nuestro usuario

No diseñamos para todo el mundo.

Diseñamos principalmente para:

• Personas hispanohablantes

• Nuevas en Noruega

• Nivel A1–B1

• Poco conocimiento de la ciudad

• Uso principalmente desde móvil

• Poco tiempo disponible

• Baja confianza hablando noruego

---

# Objetivo principal

Reducir la ansiedad.

No solamente encontrar actividades.

Sino conseguir que una persona diga:

"Creo que puedo ir."

---

# Principios UX

## 1. Mobile First

El móvil es la plataforma principal.

Todo comienza diseñándose en:

390 px

Después se adapta a escritorio.

Nunca al revés.

---

## 2. Escaneo rápido

El usuario no lee.

Escanea.

Por ello:

•

Títulos claros

•

Mucho espacio

•

Tarjetas pequeñas

•

Información agrupada

•

Pocos párrafos largos

---

## 3. Una acción principal

Cada pantalla debe tener una acción clara.

Ejemplos:

Home

↓

Encontrar una actividad

Activity Page

↓

Decidir asistir

Organization Page

↓

Descubrir más actividades

---

## 4. Reducir decisiones

No mostrar demasiadas opciones.

El exceso de opciones produce abandono.

Preferimos:

4 categorías muy claras

antes que

20 filtros complicados.

---

## 5. Mostrar primero lo importante

Orden psicológico:

1.

Confianza

↓

2.

Información

↓

3.

Beneficios

↓

4.

Acción

---

# Jerarquía visual

Cada pantalla debe tener:

Hero

↓

Acción principal

↓

Contenido

↓

Información secundaria

↓

Footer

Nunca mezclar bloques.

Nunca romper el flujo.

---

# Flujo emocional

Queremos llevar al usuario por este recorrido:

Curiosidad

↓

Entiendo qué es

↓

Parece fácil

↓

Me interesa

↓

Quiero probar

↓

Asisto

---

# Carga cognitiva

Reducir todo lo posible.

Ejemplos:

✔ iconos

✔ colores

✔ badges

✔ tarjetas

✔ listas

Evitar:

❌ texto largo

❌ demasiados botones

❌ información repetida

---

# Actividades

Las actividades son el centro del producto.

Nunca deben quedar escondidas.

Pero tampoco ocupar toda la Home.

La Home debe inspirar.

Las actividades deben convertir.

---

# Categorías

Las categorías ayudan a descubrir.

No sustituyen al buscador.

No sustituyen los filtros.

Funcionan como accesos rápidos.

MVP:

• Språkkafé hoy

• Familias

• Conversación

• Ver todas

En el futuro podrán crecer.

---

# Carruseles

Los carruseles tienen un objetivo:

Reducir scroll.

Nunca esconder contenido importante.

Reglas:

•

Swipe natural

•

Snap obligatorio

•

Una tarjeta visible

•

Indicadores simples

---

# Animaciones

Todas las animaciones deben ser:

rápidas

naturales

discretas

Duración recomendada:

150–300 ms

Nunca usar animaciones largas.

Nunca distraer.

---

# Botones

Todos los botones deben responder visualmente.

Mínimo:

hover

active

focus

En móvil:

active:scale-95

para generar sensación táctil.

---

# Navegación

Debe ser evidente.

Nunca depender del botón Atrás del navegador.

Siempre navegación explícita.

Utilizar:

React Router

+

scrollToId()

Nunca:

history.back()

---

# Scroll

El scroll forma parte de la experiencia.

Siempre:

scroll suave

offset para el Header

Nunca:

scrollIntoView()

directamente.

---

# Colores

El color comunica significado.

Ejemplo:

Azul

Confianza

Verde

Principiante

Naranja

Intermedio

Rojo

Sólo errores

No utilizar colores aleatorios.

---

# Accesibilidad

Objetivo:

WCAG AA

Requisitos:

•

Contraste suficiente

•

Botones grandes

•

Área táctil mínima

44 px

•

Texto legible

•

Focus visible

---

# Microcopys

El lenguaje debe ser:

humano

positivo

simple

Nunca burocrático.

Ejemplo:

❌

"No existen resultados"

✔

"No hemos encontrado actividades con esos filtros."

---

# Qué NO queremos

No queremos parecer:

•

un directorio antiguo

•

una página institucional

•

una web gubernamental

•

un listado infinito

Queremos parecer:

una comunidad.

---

# Definición de éxito

Una persona entra.

En menos de dos minutos:

✔ entiende el proyecto

✔ encuentra una actividad

✔ pierde el miedo

✔ decide asistir

Si conseguimos eso,

la experiencia ha cumplido su objetivo.

---

# Regla de oro

Siempre priorizar:

claridad

antes que diseño.

simplicidad

antes que funcionalidades.

personas

antes que tecnología.
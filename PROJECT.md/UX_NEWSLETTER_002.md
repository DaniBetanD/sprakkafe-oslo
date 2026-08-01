# UX-NEWSLETTER-002 — Invitación contextual

Estado: Completado y publicado
Fecha: 1 de agosto de 2026

## Objetivo

Invitar a formar parte de la newsletter después de que el usuario haya explorado la Home, sin interrumpir la búsqueda de actividades.

## Comportamiento

- Aparece una vez por sesión después de recorrer aproximadamente el 55 % de la página.
- Utiliza un panel inferior compacto y no abre automáticamente el formulario.
- El CTA reutiliza el formulario existente de MailerLite.
- No aparece mientras una ficha rápida de actividad está abierta.
- Desaparece cuando el bloque permanente de newsletter entra en pantalla.
- Si se cierra, no vuelve a mostrarse durante siete días en ese navegador.
- Si el usuario abre o envía el formulario, no vuelve a aparecer durante la visita.
- No guarda emails ni información personal en el navegador.

## Copy aprobado para revisión

**Título:** Tu noruego también crece fuera del aula

**Texto:** Descubre actividades gratuitas para practicar, conocer personas y sentirte más parte de Oslo.

**CTA:** Quiero descubrir nuevas actividades

Existe una versión equivalente en inglés.

## Validación

- [x] `npm run lint`
- [x] `npm run build`
- [x] Sin desbordamiento horizontal a 390 px
- [x] Vista de escritorio comprobada
- [x] CTA abre el modal existente
- [x] No compite con el bloque permanente
- [x] Sin errores de consola
- [x] Revisión visual administrativa
- [x] Commit, push y producción

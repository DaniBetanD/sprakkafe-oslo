# SEO-GEO-002 — Indexación, confianza y medición

Estado: En revisión
Fecha de preparación: 1 de agosto de 2026

## Objetivo

Publicar una base indexable, explicar quién mantiene el proyecto y cómo se revisa la información, y medir señales externas reales sin afirmar colaboraciones no confirmadas.

## Alcance implementado

- HTML específico, canonical, `hreflang` y datos estructurados para cada ruta pública.
- Sitemap bilingüe con actividades, organizaciones y páginas informativas.
- Páginas bilingües de quiénes somos, metodología editorial, privacidad y condiciones de uso.
- Enlaces visibles desde el footer sin cambiar su identidad visual.
- Proceso de alta y comprobación en buscadores.
- Registro mínimo de menciones y enlaces externos.

## Publicación e indexación

Después de aprobar, hacer commit, push y comprobar el despliegue de producción.

### Google Search Console

1. Abrir Search Console con la cuenta del proyecto.
2. Añadir la propiedad por prefijo `https://sprakkafe-oslo.vercel.app/`.
3. Elegir verificación mediante etiqueta HTML si Google la solicita.
4. Facilitar la etiqueta a Codex para incorporarla; no compartir contraseñas.
5. Enviar `https://sprakkafe-oslo.vercel.app/sitemap.xml`.
6. Inspeccionar `/es`, `/en` y una ficha de actividad de cada idioma.
7. Solicitar indexación solo después de confirmar canonical, respuesta 200 y contenido visible.

### Bing Webmaster Tools

1. Abrir Bing Webmaster Tools con la cuenta del proyecto.
2. Importar la propiedad verificada desde Google Search Console o añadirla manualmente.
3. Enviar el mismo sitemap.
4. Revisar errores de rastreo e indexación una vez por semana durante el primer mes.

## Confianza editorial

La información pública debe permitir responder:

- quién mantiene Språkkafé Oslo;
- por qué existe;
- de dónde proceden los datos;
- cuándo se revisan;
- cómo comunicar un error;
- qué relación existe con las organizaciones;
- qué ocurre con los emails y la medición de visitas.

No se publicarán sellos, colaboraciones, testimonios ni cifras sin confirmación verificable.

## Autoridad externa

Registrar solo menciones públicas o respuestas autorizadas. Una conversación privada no se presenta como recomendación.

| Fecha | Entidad o perfil | URL pública | Tipo | Idioma | Enlace hacia la web | Estado | Próximo paso |
| --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  | Mención, ficha, publicación o recurso |  | Sí / No | Propuesta, publicada o retirada |  |

Se priorizan fuentes relacionadas con integración, aprendizaje de noruego, voluntariado y vida comunitaria en Oslo. No se publican mensajes repetitivos ni comentarios fuera de contexto.

## Medición durante cuatro semanas

Cada domingo registrar:

- páginas indexadas en Google y Bing;
- consultas y clics orgánicos disponibles;
- páginas con impresiones;
- dominios que enlazan al proyecto;
- menciones públicas confirmadas;
- errores de rastreo o páginas excluidas;
- decisión concreta para la semana siguiente.

Los cambios de posicionamiento se evalúan por tendencia. No se promete una posición determinada ni presencia automática en respuestas de IA.

## Criterios de aceptación

- [ ] Lint y build correctos.
- [ ] Rutas informativas en español e inglés con respuesta 200.
- [ ] Canonical y `hreflang` correctos en ambos idiomas.
- [ ] Sitemap incluye todas las páginas públicas.
- [ ] Rutas inexistentes responden 404.
- [ ] Footer conserva su diseño aprobado.
- [ ] Commit, push y despliegue de producción completados.
- [ ] Sitemap enviado y validado en Google y Bing.

Los dos últimos pasos externos necesitan la revisión manual de la administración.

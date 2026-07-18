# Språkkafé Oslo — instrucciones del repositorio

## Misión

Ayudar a personas hispanohablantes recién llegadas a Noruega a practicar el idioma, conocer personas y sentirse parte de la comunidad.

## Forma de trabajo

- Mobile First: validar primero a 390 px y después en escritorio.
- Aplicar la mínima intervención posible.
- No añadir funcionalidades ni refactorizaciones fuera del sprint activo.
- Mantener los datos centralizados y los componentes pequeños y reutilizables.
- No modificar dependencias, arquitectura, carpetas o estilos globales sin autorización expresa.

## Elementos congelados

No rediseñar sin un sprint específico:

- Home y Hero
- Header y navegación global
- Footer
- MissionSection
- ActivityCard
- sistema de colores, tipografía, espaciados y layouts

Se permiten correcciones concretas que preserven su identidad visual.

## Validación obligatoria

Antes de terminar cualquier cambio:

1. Revisar `git diff` y confirmar que no hay cambios fuera de alcance.
2. Ejecutar `npm run lint`.
3. Ejecutar `npm run build`.
4. Revisar móvil a 390 px y escritorio cuando el cambio sea visual.
5. Confirmar que la consola del navegador está limpia.
6. Indicar archivos modificados y resultado de la validación.

## Prohibiciones

No realizar por iniciativa propia rediseños, cambios globales de estilos, reorganizaciones generales, nuevas dependencias, nuevas funcionalidades o modificaciones de contenido no solicitado.

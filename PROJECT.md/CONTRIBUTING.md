# Cómo contribuir

Última actualización: 25 de julio de 2026

Språkkafé Oslo acepta aportaciones que mejoren la fiabilidad de la información y ayuden a las personas a encontrar una comunidad donde practicar noruego.

## Informar sobre una actividad

Utiliza una fuente oficial y proporciona:

- nombre de la actividad;
- organización responsable;
- enlace oficial;
- lugar;
- día y hora conocidos;
- cualquier cambio o fecha de actualización relevante.

La incorporación sigue `ACTIVITY_INTAKE.md`. La administradora revisa y aprueba la ficha antes de modificar datos o publicar.

## Solicitar una corrección

Las organizaciones pueden utilizar el contacto del footer para:

- añadir una organización o actividad;
- corregir horarios, dirección o enlaces;
- informar sobre vacaciones o cancelaciones;
- solicitar la retirada de información.

Incluye la URL oficial que respalda el cambio siempre que sea posible.

## Desarrollo

Antes de comenzar:

1. Lee `AGENTS.md`.
2. Consulta `PROJECT_HANDBOOK.md`.
3. Revisa `PROJECT_STATUS.md` y el documento especializado relacionado.
4. Confirma que existe un sprint con objetivo y alcance definidos.

Validación mínima:

```bash
npm run lint
npm run build
```

Los cambios visuales se revisan primero a 390 px y después en escritorio.

## Principios

- Resolver una necesidad real.
- Aplicar la mínima intervención.
- No reabrir decisiones aprobadas.
- No inventar datos ausentes.
- Mantener accesibilidad y claridad.
- No añadir dependencias o funcionalidades fuera del sprint.

## Pull requests y commits

Un cambio debe ser coherente, revisable y limitado al objetivo. Utiliza mensajes como `fix:`, `feat:`, `docs:`, `refactor:` o `chore:` según corresponda.

No incluyas secretos, `.env.local`, artefactos generados o dependencias instaladas.

## Gracias

Cada corrección ayuda a que otra persona encuentre un lugar donde practicar, conocer gente y sentirse parte de Noruega.

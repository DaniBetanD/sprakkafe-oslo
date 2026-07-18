# Alta administrada de actividades

## Formato de solicitud

La administradora inicia una verificación enviando:

```text
NUEVA ACTIVIDAD

Fuente oficial:
https://organizacion.no/sprakkafe

Notas opcionales:
Información adicional conocida.
```

La URL debe pertenecer a la organización, biblioteca, iglesia, ayuntamiento o plataforma oficial responsable de la actividad. Una publicación oficial en redes sociales puede utilizarse si muestra una fecha y un horario inequívocos.

## Extracción automática

La revisión prepara una ficha con:

- organización y tipo;
- nombre de la actividad;
- día, hora y periodo de vigencia;
- dirección y distrito;
- nivel recomendado;
- precio;
- necesidad de inscripción;
- restricciones de acceso;
- web, correo y teléfono;
- pausas o condiciones estacionales;
- logo disponible;
- fuente y fecha de comprobación.

Los campos ausentes se marcan como `No confirmado`. Nunca se inventan ni se deducen como hechos.

## Ficha de aprobación

```text
ESTADO: PENDIENTE DE APROBACIÓN

Organización:
Actividad:
Horario:
Vigencia:
Dirección:
Nivel:
Precio:
Inscripción:
Restricciones:
Contacto:
Fuente oficial:
Fecha de comprobación:

Cambios propuestos:
- organizations.json
- activities.json
- logo, si corresponde

Decisión de la administradora:
[ ] Aprobar
[ ] Corregir
[ ] Rechazar
```

## Puerta administrativa obligatoria

Antes de la aprobación solo se permite investigar, extraer, comparar y preparar una propuesta. Está prohibido modificar JSON, crear commits, hacer push o publicar en Vercel.

Después de una aprobación explícita se puede:

1. actualizar los datos y añadir el logo optimizado;
2. validar relaciones, IDs y campos obligatorios;
3. ejecutar lint y build;
4. revisar móvil, escritorio, filtros y páginas relacionadas;
5. presentar el diff final;
6. crear commit y publicar;
7. verificar Vercel y registrar la fuente consultada.

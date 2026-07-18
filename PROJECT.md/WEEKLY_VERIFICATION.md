# Revisión semanal administrada

## Frecuencia

Cada domingo a las 09:00, hora local, se ejecuta una auditoría de solo lectura.

## Alcance

- Revisar fuentes oficiales de organizaciones existentes.
- Detectar cambios de horario, pausas, cancelaciones y reaperturas.
- Buscar nuevas actividades claramente publicadas por las organizaciones verificadas.
- Comparar los hallazgos con `activities.json` y `organizations.json`.
- Señalar registros cuya fecha `lastChecked` necesite actualización.

## Informe esperado

Para cada posible cambio se indica:

- fuente oficial;
- dato publicado actualmente;
- dato encontrado;
- fecha y vigencia;
- nivel de confianza;
- acción propuesta.

## Restricción

La revisión semanal no puede modificar archivos, JSON, GitHub o Vercel. Toda acción queda pendiente de aprobación explícita de la administradora.

## Estados

- `Sin cambios`: la fuente confirma el dato actual.
- `Cambio propuesto`: existe información oficial nueva.
- `Requiere confirmación`: la fuente es incompleta o ambigua.
- `Pausa temporal`: la organización anuncia vacaciones o suspensión.
- `Retirada propuesta`: la actividad ya no aparece o consta como cancelada.

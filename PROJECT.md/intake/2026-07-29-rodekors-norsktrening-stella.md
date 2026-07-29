# Ficha de aprobación — Røde Kors Norsktrening y Stella

Estado: Aprobado e implementado  
Preparada: 29 de julio de 2026

## Fuentes oficiales

- Norsktrening:
  https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/
- Horarios de verano:
  https://www.rodekors.no/lokalforeninger/oslo/sommer-oslo-rode-kors/
- Facebook de Norsktrening:
  https://www.facebook.com/ORKnorsktrening/
- Stella:
  https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/kvinner/stella/
- Facebook de Stella:
  https://www.facebook.com/stellakvinnesenteroslo/

La web oficial será la fuente principal. Facebook se utilizará como enlace complementario para novedades y cambios recientes.

## 1. Organización Røde Kors Oslo

### Cambios propuestos

- Mantener el email `norsktrening.oslo@redcross.no`.
- Mostrar los dos teléfonos publicados:
  - `+47 911 98 339`
  - `+47 458 66 125`
- Añadir la página oficial de Facebook de Norsktrening.
- Actualizar `lastChecked` a `2026-07-29`.

## 2. Actividades presenciales de Norsktrening

Las seis ubicaciones existentes coinciden con la programación oficial:

| Lugar | Día y horario | Estado propuesto |
| --- | --- | --- |
| Hausmanns gate 23 | martes, miércoles y sábado, 11:00–13:00 | Próxima desde el 10 de agosto |
| Deichman Bjørvika | lunes, 17:00–19:00 | Próxima desde el 10 de agosto |
| Furuset/FUBIAK | martes, 17:00–19:00 | Próxima desde el 10 de agosto |
| Deichman Grünerløkka | lunes, 17:00–19:00 | Próxima desde el 10 de agosto |
| Deichman Majorstuen | martes y jueves, 17:00–19:00 | Próxima desde el 10 de agosto |
| Veitvet Senter | miércoles, 17:00–19:00 | Próxima desde el 10 de agosto |

### Corrección necesaria

Majorstuen aparece activa durante las vacaciones. Debe pasar a `upcoming` con `availableFrom: 2026-08-10`.

### Información común

- Para personas mayores de 18 años.
- Todos los niveles de noruego.
- No es un curso de idiomas.
- Práctica oral en grupos guiados por voluntariado.
- Los grupos se organizan según el nivel.
- No requiere inscripción.
- Se recomienda llegar al menos 15 minutos antes.
- Bjørvika requiere llegar a la cuarta planta antes de las 16:30.
- Las plazas son limitadas.

## 3. Norsktrening presencial de verano

La ficha actual es correcta:

- Hausmanns gate 23.
- Miércoles, 11:00–13:00.
- Activa hasta el 3 de agosto.
- Programación ordinaria desde el 10 de agosto.

## 4. Norsktrening digital — verano

### Datos propuestos

```json
{
  "id": "rodekors-digital-summer",
  "organizationId": "rodekors",
  "name": "Norsktrening digital Røde Kors — verano",
  "district": "Digital",
  "day": "Monday",
  "time": "17:00",
  "endTime": "18:00",
  "level": "all",
  "address": "En línea",
  "description": "Práctica oral de noruego en línea para personas mayores de 18 años.",
  "cost": "free",
  "registration": "required",
  "format": "Conversación digital en grupos guiados por voluntariado.",
  "status": "active",
  "availableUntil": "2026-08-03",
  "seasonNote": "Programación digital de verano los lunes. El horario ordinario vuelve el 10 de agosto.",
  "sourceUrl": "https://oslo.norsktrening.rodekors.no/pamelding/digital/norsktrening",
  "lastChecked": "2026-07-29"
}
```

## 5. Norsktrening digital — programación ordinaria

### Datos propuestos

```json
{
  "id": "rodekors-digital",
  "organizationId": "rodekors",
  "name": "Norsktrening digital Røde Kors",
  "district": "Digital",
  "days": ["Monday", "Tuesday", "Wednesday"],
  "day": "Monday",
  "time": "Según el día",
  "level": "all",
  "address": "En línea",
  "description": "Práctica oral de noruego en línea para personas mayores de 18 años.",
  "cost": "free",
  "registration": "required",
  "format": "Conversación digital en grupos guiados por voluntariado.",
  "status": "upcoming",
  "availableFrom": "2026-08-10",
  "seasonNote": "Lunes y miércoles de 17:00 a 18:00. Martes de 11:00 a 12:00.",
  "sourceUrl": "https://oslo.norsktrening.rodekors.no/pamelding/digital/norsktrening",
  "lastChecked": "2026-07-29"
}
```

## 6. Nueva organización — Stella

Stella debe registrarse como organización diferenciada porque dispone de identidad, contacto, público y programación propios dentro de Oslo Røde Kors.

### Datos propuestos

```json
{
  "id": "stella-kvinnesenter",
  "name": "Stella – Røde Kors kvinnesenter",
  "tipo": "Centro comunitario para mujeres",
  "website": "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/kvinner/stella/",
  "facebook": "https://www.facebook.com/stellakvinnesenteroslo/",
  "email": "stella@redcross.no",
  "phone": "+47 22 05 44 45",
  "description": "Centro gratuito de cursos, actividades y encuentro para mujeres de Oslo y alrededores, con especial atención a mujeres de minorías y madres.",
  "lastChecked": "2026-07-29"
}
```

El teléfono atiende de lunes a viernes, de 12:00 a 17:00.

## 7. Stella — horario especial de verano

Según la página oficial de horarios de verano:

- Del 2 de julio al 13 de agosto.
- Jueves, 11:00–14:30.
- Todos los servicios son gratuitos.
- Público: mujeres de Oslo y alrededores.

### Ficha propuesta

```json
{
  "id": "stella-open-house-summer",
  "organizationId": "stella-kvinnesenter",
  "name": "Encuentro abierto Stella — verano",
  "district": "Sentrum",
  "day": "Thursday",
  "time": "11:00",
  "endTime": "14:30",
  "level": "all",
  "address": "Hausmanns gate 23, 0182 Oslo",
  "description": "Espacio gratuito de encuentro, orientación y actividades para mujeres.",
  "cost": "free",
  "registration": "none",
  "format": "Encuentro abierto con conversación, información práctica y actividades.",
  "status": "active",
  "availableUntil": "2026-08-13",
  "seasonNote": "Horario especial de verano los jueves, de 11:00 a 14:30.",
  "sourceUrl": "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/kvinner/stella/",
  "lastChecked": "2026-07-29"
}
```

## 8. Stella — horario ordinario

La página oficial publica:

- Lunes a jueves, 11:00–17:00.
- Viernes, 11:00–15:00.
- Acceso libre al encuentro abierto.
- Cursos y actividades adicionales con programación variable.

Se propone mostrar una ficha ordinaria desde el 14 de agosto. Esta fecha se deduce del final del horario especial y debe tratarse como una transición estacional, no como una confirmación independiente de reapertura.

## 9. Enlaces de Facebook en la interfaz

Para que las personas puedan consultar novedades:

- Añadir el campo `facebook` a las organizaciones que dispongan de página oficial.
- Mostrar un botón secundario `Ver Facebook` en la página de la organización.
- Mantener `Sitio oficial` como enlace principal.
- Abrir ambos enlaces en una pestaña nueva.

## 10. Decisión de alcance — actividades para la integración

Språkkafé Oslo no se limitará a actividades que utilicen expresamente el nombre `Språkkafé`.

También podrán incluirse actividades que ayuden de forma clara a:

- practicar noruego en situaciones reales;
- conocer personas;
- reducir el aislamiento;
- crear redes de apoyo;
- conocer Oslo y la sociedad noruega;
- participar en espacios comunitarios.

Estas actividades conservarán su nombre y categoría reales. No se presentarán como cursos de idiomas ni como Språkkafés si la organización no las define de esa manera.

Fuente oficial:

https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/turgruppe/

## 11. Turgruppa — Oslo Røde Kors

### Valoración

Actividad de baja barrera dirigida a personas adultas con experiencia migratoria o de refugio. Permite conocer Oslo, practicar noruego y crear nuevas relaciones. También admite familias con niños.

### Datos propuestos

```json
{
  "id": "rodekors-turgruppa",
  "organizationId": "rodekors",
  "name": "Turgruppa — Oslo Røde Kors",
  "district": "Oslo",
  "day": "Sunday",
  "time": "Horario según la ruta",
  "level": "all",
  "address": "Distintos lugares de Oslo",
  "description": "Rutas inclusivas para conocer Oslo, practicar noruego y crear nuevas relaciones.",
  "registration": "required",
  "canComeAlone": true,
  "arrivalAdvice": "Únase al grupo oficial de WhatsApp para consultar la próxima ruta, el horario y el punto de encuentro.",
  "format": "Ruta guiada de baja barrera para personas adultas con experiencia migratoria o de refugio. Las familias con niños también pueden participar.",
  "status": "active",
  "seasonNote": "La actividad se organiza el primer domingo de cada mes y dura aproximadamente entre dos y tres horas.",
  "sourceUrl": "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/turgruppe/",
  "registrationUrl": "https://chat.whatsapp.com/EWqka9FP7kC6zSjcLHHogE",
  "lastChecked": "2026-07-29"
}
```

### Información no publicada

- Precio.
- Hora concreta de cada ruta.
- Punto de encuentro.

Estos datos deben consultarse en el grupo oficial de WhatsApp. No se mostrará la etiqueta `Gratis`.

## 12. Fotballgruppa — Oslo Røde Kors

### Valoración

Actividad deportiva para personas mayores de 18 años que quieren jugar al fútbol y crear una red social. Se realiza en espacios interiores o exteriores según la temporada.

### Datos propuestos

```json
{
  "id": "rodekors-fotballgruppa",
  "organizationId": "rodekors",
  "name": "Fotballgruppa — Oslo Røde Kors",
  "district": "Oslo",
  "days": ["Saturday", "Sunday"],
  "day": "Saturday",
  "time": "15:00",
  "endTime": "17:00",
  "level": "all",
  "address": "Lugar comunicado por la organización",
  "description": "Grupo de fútbol para personas mayores de 18 años que quieren practicar deporte y crear nuevas relaciones.",
  "registration": "required",
  "canComeAlone": true,
  "arrivalAdvice": "Únase al grupo oficial de WhatsApp para confirmar el lugar y cualquier cambio de temporada.",
  "format": "Partidos y encuentros de fútbol en espacios interiores o exteriores según la temporada.",
  "status": "active",
  "sourceUrl": "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/turgruppe/",
  "registrationUrl": "https://chat.whatsapp.com/DPvzng1fEOc1DTZMoX20Ev",
  "lastChecked": "2026-07-29"
}
```

### Información no publicada

- Precio.
- Lugar concreto.
- Condiciones de participación adicionales.

No se mostrará la etiqueta `Gratis` mientras la fuente oficial no lo confirme.

## 13. Enlaces de participación

Para evitar que un enlace de WhatsApp sustituya la fuente oficial:

- `sourceUrl`: página oficial con la descripción de la actividad;
- `registrationUrl`: grupo oficial de WhatsApp;
- botón principal: `Consultar información oficial`;
- botón secundario: `Unirse al grupo de WhatsApp`.

El botón de WhatsApp debe abrirse en una pestaña nueva e indicar claramente que lleva a un servicio externo.

## Decisión administrativa

- [x] Aprobar la corrección de Majorstuen.
- [x] Aprobar los dos teléfonos de Norsktrening.
- [x] Aprobar Facebook como enlace complementario.
- [x] Aprobar las dos fichas de Norsktrening digital.
- [x] Aprobar Stella como organización diferenciada.
- [x] Aprobar la ficha de verano de Stella.
- [x] Aprobar la ficha ordinaria de Stella desde el 14 de agosto.
- [x] Aprobar la ampliación de alcance hacia actividades de integración.
- [x] Aprobar Turgruppa.
- [x] Aprobar Fotballgruppa.
- [x] Aprobar el campo y el botón `registrationUrl`.

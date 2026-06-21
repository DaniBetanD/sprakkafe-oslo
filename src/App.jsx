import { useState, useMemo } from "react";

const DATA = [
  // ── LUNES ──────────────────────────────────────────────────────
  {
    id: 1,
    nombre: "Norsktrening – Røde Kors @ Bjørvika",
    direccion: "Anne-Cath. Vestlys plass 1, 0150 Oslo",
    barrio: "Bjørvika / Sentrum",
    dia: "Lunes",
    hora: "17:00–19:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no · 911 98 339",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "Llegar 30 min antes (4.ª planta). Drop-in.",
  },
  {
    id: 2,
    nombre: "Norsktrening – Røde Kors @ Grünerløkka",
    direccion: "Schous Plass 10, 0552 Oslo",
    barrio: "Grünerløkka",
    dia: "Lunes",
    hora: "17:00–19:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "Llegar 15 min antes. Drop-in.",
  },
  {
    id: 3,
    nombre: "Språkkafé – Deichman Lambertseter",
    direccion: "Langbølgen 1, 1150 Oslo",
    barrio: "Lambertseter",
    dia: "Lunes",
    hora: "12:00–14:00",
    organizador: "Deichman Lambertseter",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "Ambiente relajado, sin estructura escolar.",
  },
  {
    id: 4,
    nombre: "Språkkafé – Deichman Torshov",
    direccion: "Sandakerveien 59, 0477 Oslo",
    barrio: "Torshov / Sagene",
    dia: "Lunes",
    hora: "17:00–19:00",
    organizador: "Deichman + Grefsen Sanitetsforening",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "Colaboración con Grefsen, Kjelsås og omegn Sanitetsforening.",
  },
  {
    id: 5,
    nombre: "Språkkafé – Deichman Tøyen",
    direccion: "Hagegata 28, 0653 Oslo",
    barrio: "Tøyen / Gamle Oslo",
    dia: "Lunes",
    hora: "17:00–19:00",
    organizador: "Tøyen Frivilligsentral + Deichman",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "Organizado por Tøyen Frivilligsentral.",
  },
  {
    id: 6,
    nombre: "Norsktrening digital – Røde Kors",
    direccion: "Online (Zoom/Teams)",
    barrio: "Digital",
    dia: "Lunes",
    hora: "17:00–18:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: true,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Digital",
    nota: "Requiere registro previo online.",
  },
  {
    id: 7,
    nombre: "Språkkafé – Deichman Grünerløkka",
    direccion: "Schous Plass 15, 0552 Oslo",
    barrio: "Grünerløkka",
    dia: "Lunes",
    hora: "17:00–19:00",
    organizador: "Deichman Grünerløkka",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "Norsktrening con voluntarios.",
  },

  // ── MARTES ─────────────────────────────────────────────────────
  {
    id: 8,
    nombre: "Norsktrening – Røde Kors @ Hausmanns gate",
    direccion: "Hausmanns gate 23, 0182 Oslo",
    barrio: "Sentrum / Grønland",
    dia: "Martes",
    hora: "11:00–13:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no · 45866125",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "También miércoles y sábado misma hora. Llegar 15 min antes.",
  },
  {
    id: 9,
    nombre: "Norsktrening – Røde Kors @ Furuset",
    direccion: "Trygve Lies Plass 5, 1051 Oslo",
    barrio: "Furuset / Alna",
    dia: "Martes",
    hora: "17:00–19:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "Llegar 15 min antes.",
  },
  {
    id: 10,
    nombre: "Norsktrening – Røde Kors @ Majorstuen",
    direccion: "Harald Hårfagres gate 2, 0363 Oslo",
    barrio: "Majorstuen / Frogner",
    dia: "Martes",
    hora: "17:00–19:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "También jueves mismo horario.",
  },
  {
    id: 11,
    nombre: "Språkkafé – Norsk Start Oslo @ OsloMet",
    direccion: "Pilestredet 52, 0167 Oslo",
    barrio: "Sentrum",
    dia: "Martes",
    hora: "17:00–18:30",
    organizador: "Norsk Start Oslo + Akademisk Dugnad",
    contacto: "norskstartoslo@gmail.com",
    idiomas: ["Norsk", "Engelsk"],
    nivel: "A1–B2",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.norskstart.no/aktiviteter-oslo",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Universidad",
    nota: "Cuadernillos A1–B2 semanales. Todos los niveles bienvenidos.",
  },
  {
    id: 12,
    nombre: "Norsktrening digital – Røde Kors",
    direccion: "Online",
    barrio: "Digital",
    dia: "Martes",
    hora: "11:00–12:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: true,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Digital",
    nota: "Requiere registro online.",
  },
  {
    id: 13,
    nombre: "Språktrening – Caritas Ressurssenter",
    direccion: "Storgata 38, 0182 Oslo",
    barrio: "Sentrum / Grønland",
    dia: "Martes + Miércoles",
    hora: "Ver web",
    organizador: "Caritas Norge",
    contacto: "caritas.no/ressurssenteret_oslo",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://caritas.no/kurs/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "ONG",
    nota: "Combinan språktrening (estructurado) + språkkafé (informal). Horario variable, revisar web.",
  },

  // ── MIÉRCOLES ──────────────────────────────────────────────────
  {
    id: 14,
    nombre: "Norsktrening – Røde Kors @ Hausmanns gate",
    direccion: "Hausmanns gate 23, 0182 Oslo",
    barrio: "Sentrum / Grønland",
    dia: "Miércoles",
    hora: "11:00–13:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "Llegar 15 min antes. Drop-in.",
  },
  {
    id: 15,
    nombre: "Norsktrening – Røde Kors @ Veitvet (Familiesenter)",
    direccion: "Veitvetveien 8, 0596 Oslo (3.ª planta, entrada C)",
    barrio: "Veitvet / Bjerke",
    dia: "Miércoles",
    hora: "17:00–19:00",
    organizador: "Røde Kors Familiesenter",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/moteplasser/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "Comida ligera incluida. Actividades para niños disponibles.",
  },
  {
    id: 16,
    nombre: "Norsktrening digital – Røde Kors",
    direccion: "Online",
    barrio: "Digital",
    dia: "Miércoles",
    hora: "17:00–18:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: true,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Digital",
    nota: "Registro previo requerido.",
  },
  {
    id: 17,
    nombre: "Holmlia Misjonskirke Språkkafé",
    direccion: "Ravnåsveien 3, Holmlia, Oslo",
    barrio: "Holmlia",
    dia: "Miércoles",
    hora: "19:30",
    organizador: "Holmlia Misjonskirke",
    contacto: "facebook.com/norskkafe.digital",
    idiomas: ["Norsk"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.facebook.com/norskkafe.digital",
    actualizado: "Jun 2026",
    estado: "Confirmar",
    tipo: "Iglesia",
    nota: "Hay también versión digital. Verificar fechas en Facebook.",
  },
  {
    id: 18,
    nombre: "Språkkafé – Haugerud Frivillighetssentral",
    direccion: "Hagapynten 38C, 0673 Oslo",
    barrio: "Haugerud / Østensjø",
    dia: "Miércoles",
    hora: "16:30–18:30",
    organizador: "Haugerud Frivillighetssentral",
    contacto: "Ver web local",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Frivilligsentral",
    nota: "Casa amarilla junto a la estación de metro.",
  },

  // ── JUEVES ─────────────────────────────────────────────────────
  {
    id: 19,
    nombre: "Norsktrening – Røde Kors @ Majorstuen (jueves)",
    direccion: "Harald Hårfagres gate 2, 0363 Oslo",
    barrio: "Majorstuen / Frogner",
    dia: "Jueves",
    hora: "17:00–19:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "También martes mismo horario.",
  },
  {
    id: 20,
    nombre: "Språkkafé – Deichman Nydalen",
    direccion: "Nydalsveien 33, 0484 Oslo",
    barrio: "Nydalen",
    dia: "Jueves",
    hora: "16:30–18:30",
    organizador: "Deichman Nydalen",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Confirmar",
    tipo: "Deichman",
    nota: "Frecuencia quincenal. Verificar en deichman.no.",
  },
  {
    id: 21,
    nombre: "Paulus kirke Språkkafé",
    direccion: "Thorvald Meyers gate 31, 0555 Oslo",
    barrio: "Grünerløkka",
    dia: "Jueves",
    hora: "10:00–12:00",
    organizador: "Paulus kirke",
    contacto: "pauluskirke.no",
    idiomas: ["Norsk"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Iglesia",
    nota: "Cada jueves. Ambiente acogedor.",
  },
  {
    id: 22,
    nombre: "Språkkafé – Deichman Røa",
    direccion: "Tore Hals Mejdells vei 8, 0751 Oslo",
    barrio: "Røa / Vestre Aker",
    dia: "Martes",
    hora: "16:30–18:30",
    organizador: "Deichman Røa",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "Martes tarde.",
  },

  // ── VIERNES ────────────────────────────────────────────────────
  {
    id: 23,
    nombre: "Filadelfiakirken Språkkafé",
    direccion: "St. Olavs gate 24 (2.ª planta), 0166 Oslo",
    barrio: "Sentrum",
    dia: "Viernes",
    hora: "Ver Facebook",
    organizador: "Filadelfiakirken / Misjonssalen",
    contacto: "facebook.com",
    idiomas: ["Norsk"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Confirmar",
    tipo: "Iglesia",
    nota: "Frecuencia quincenal. Revisar Facebook para fechas exactas.",
  },

  // ── SÁBADO ─────────────────────────────────────────────────────
  {
    id: 24,
    nombre: "Norsktrening – Røde Kors @ Hausmanns (sábado)",
    direccion: "Hausmanns gate 23, 0182 Oslo",
    barrio: "Sentrum / Grønland",
    dia: "Sábado",
    hora: "11:00–13:00",
    organizador: "Røde Kors Oslo",
    contacto: "norsktrening.oslo@redcross.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "Llegar 15 min antes.",
  },
  {
    id: 25,
    nombre: "Språkkafé – Sogn Frivilligsentral",
    direccion: "Sognsveien (ver web)",
    barrio: "Sogn / Nordre Aker",
    dia: "Sábado",
    hora: "12:00–14:00",
    organizador: "Sogn Frivilligsentral",
    contacto: "sogn.frivilligsentral.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://sogn.frivilligsentral.no/aktivitet?Id=16920",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Frivilligsentral",
    nota: "Desde 14 enero. Desde 15 años. Kulturutveksling og sosialt nettverk.",
  },
  {
    id: 26,
    nombre: "Språkkafé con Gamle Oslo Bydel",
    direccion: "Ver påmeldingskjema",
    barrio: "Gamle Oslo",
    dia: "Lunes",
    hora: "Ver inscripción",
    organizador: "Bydel Gamle Oslo",
    contacto: "deichman.no/event/sprakkafe_1q4rjN25Zf",
    idiomas: ["Norsk"],
    nivel: "A2",
    gratis: true,
    inscripcion: true,
    enlace: "https://deichman.no/event/spr%C3%A5kkaf%C3%A9_1q4rjN25Zf",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Ayuntamiento",
    nota: "Requiere inscripción. Formulario abre miércoles 12:00, cierra lunes 10:00. Solo para residentes de Bydel Gamle Oslo.",
  },

  // ── DOMINGO ────────────────────────────────────────────────────
  {
    id: 27,
    nombre: "Sagene Frivilligsentral Språkkafé",
    direccion: "Sandakerveien 61, 0477 Oslo",
    barrio: "Sagene",
    dia: "Domingo",
    hora: "13:00–16:00",
    organizador: "Sagene Frivilligsentral",
    contacto: "sagene.frivilligsentral.no",
    idiomas: ["Norsk"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://sagene.frivilligsentral.no",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Frivilligsentral",
    nota: "Drop-in. Ambiente familiar.",
  },

  // ── VARIOS DÍAS / ESPECIALES ────────────────────────────────────
  {
    id: 28,
    nombre: "Norsktrening – Røde Kors @ Rosenhof",
    direccion: "Dynekilgata 10, Oslo",
    barrio: "Sentrum",
    dia: "Lunes",
    hora: "13:00–15:00",
    organizador: "Røde Kors + Oslo VO Rosenhof",
    contacto: "rosenhof.oslovo.no",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://rosenhof.oslovo.no/for-deltakere/RosenhofVO/norsktrening-med-rode-kors-pa-rosenhof/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Røde Kors",
    nota: "Tickets en biblioteca escolar (Dynekilgata + Trondheimsveien) desde las 12:00. 2 sesiones: 13–14 y 14–15.",
  },
  {
    id: 29,
    nombre: "Nordberg kirke Språkkafé",
    direccion: "Kringsjågrenda 1, 0862 Oslo",
    barrio: "Nordberg / Oslo Nord",
    dia: "Quincenal / variable",
    hora: "Ver web",
    organizador: "Nordberg kirke",
    contacto: "nordbergkirke.no",
    idiomas: ["Norsk"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Confirmar",
    tipo: "Iglesia",
    nota: "Cada tercera semana aprox. Verificar calendario en la web.",
  },
  {
    id: 30,
    nombre: "Ethnos Språk- og integreringsskole",
    direccion: "Lofsrudveien 6, 1281 Oslo (Oslo Søndre Frikirke)",
    barrio: "Mortensrud / Søndre Nordstrand",
    dia: "Lunes–Jueves",
    hora: "17:30–20:00",
    organizador: "Ethnos",
    contacto: "ethnos.no",
    idiomas: ["Norsk"],
    nivel: "A1–B2",
    gratis: true,
    inscripcion: true,
    enlace: "https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "ONG",
    nota: "A1 martes, A2 mar+jue, B1 lun+mié, B2 lun+jue. Cursos estructurados gratuitos.",
  },
  {
    id: 31,
    nombre: "Alfaskolen Språkkafé",
    direccion: "Kongens gate 15, 0153 Oslo",
    barrio: "Sentrum",
    dia: "Variable",
    hora: "Ver Instagram/Facebook",
    organizador: "Alfaskolen",
    contacto: "alfaskolen.no | Instagram @alfaskolen",
    idiomas: ["Norsk"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: true,
    enlace: "https://www.alfaskolen.no/blog/sprakkafe/",
    actualizado: "Jun 2026",
    estado: "Pausado",
    tipo: "Escuela",
    nota: "⚠️ PAUSADO primavera 2026. Reanudan en otoño. Seguir en Instagram para actualizaciones.",
  },
  {
    id: 32,
    nombre: "UiO Språkkafé",
    direccion: "Litteratursalongen, Georg Sverdrups hus, Blindern",
    barrio: "Blindern / Nordre Aker",
    dia: "Variable (semestral)",
    hora: "17:00–19:00",
    organizador: "Universitetet i Oslo (UiO)",
    contacto: "uio.no/livet-rundt-studiene",
    idiomas: ["Norsk", "Varios"],
    nivel: "Todos los niveles",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.uio.no/livet-rundt-studiene/arrangementer/knutepunktet/spraakkafe-05-mars-v26.html",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Universidad",
    nota: "Varias fechas por semestre. Bueno para estudiantes de intercambio.",
  },
  {
    id: 33,
    nombre: "Oasen / Norsk Folkehjelp Språktrening",
    direccion: "Alna, Oslo",
    barrio: "Alna",
    dia: "Ver Facebook",
    hora: "Ver Facebook",
    organizador: "Norsk Folkehjelp",
    contacto: "facebook.com / norskfolkehjelp.no",
    idiomas: ["Norsk"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Confirmar",
    tipo: "ONG",
    nota: "Verificar actividad actual en Facebook.",
  },
  {
    id: 34,
    nombre: "Café Mestizo Språkkafé",
    direccion: "Pilestredet Park 5, Oslo",
    barrio: "St. Hanshaugen",
    dia: "Ver web",
    hora: "Ver web",
    organizador: "Café Mestizo",
    contacto: "cafemestizo.no",
    idiomas: ["Norsk", "Español"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Confirmar",
    tipo: "ONG",
    nota: "Ambiente multicultural. Verificar fechas actuales.",
  },
  {
    id: 35,
    nombre: "Språkkafé – Deichman Bjerke",
    direccion: "Ver deichman.no/bibliotekene/bjerke",
    barrio: "Bjerke",
    dia: "Ver deichman.no",
    hora: "Ver deichman.no",
    organizador: "Deichman Bjerke",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "Revisar calendario en deichman.no para horarios exactos.",
  },
  {
    id: 36,
    nombre: "Språkkafé – Deichman Furuset",
    direccion: "Trygve Lies Plass 1, 1051 Oslo",
    barrio: "Furuset / Alna",
    dia: "Ver deichman.no",
    hora: "Ver deichman.no",
    organizador: "Deichman Furuset",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "También sede de Røde Kors norsktrening.",
  },
  {
    id: 37,
    nombre: "Språkkafé – Deichman Holmlia",
    direccion: "Holmlia senter vei 16, 1255 Oslo",
    barrio: "Holmlia / Søndre Nordstrand",
    dia: "Ver deichman.no",
    hora: "Ver deichman.no",
    organizador: "Deichman Holmlia",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "Revisar calendario en deichman.no.",
  },
  {
    id: 38,
    nombre: "Språkkafé – Deichman Stovner",
    direccion: "Stovner senter",
    barrio: "Stovner / Grorud",
    dia: "Ver deichman.no",
    hora: "Ver deichman.no",
    organizador: "Deichman Stovner",
    contacto: "deichman.no",
    idiomas: ["Norsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Deichman",
    nota: "Revisar calendario en deichman.no.",
  },
  {
    id: 39,
    nombre: "Kvinneprat på tvers (solo mujeres)",
    direccion: "Solskinnsveien 12, Smestad, Oslo",
    barrio: "Smestad / Vestre Aker",
    dia: "Ver web",
    hora: "Ver web",
    organizador: "Frivilligsentral Smestad",
    contacto: "Ver web local",
    idiomas: ["Norsk"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe",
    actualizado: "Jun 2026",
    estado: "Confirmar",
    tipo: "Frivilligsentral",
    nota: "⚠️ SOLO MUJERES. Verificar actividad actual.",
  },
  {
    id: 40,
    nombre: "Caritas Norsk Språkkafé",
    direccion: "Storgata 38 (entrada Hausmannsgate), 0182 Oslo",
    barrio: "Sentrum / Grønland",
    dia: "Semanal (ver web)",
    hora: "17:00–18:30",
    organizador: "Caritas Norge – Ressurssenter",
    contacto: "info@caritas.no · 23 33 43 61",
    idiomas: ["Norsk", "Engelsk"],
    nivel: "A2+",
    gratis: true,
    inscripcion: false,
    enlace: "https://caritas.no/en/courses-and-activities/",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "ONG",
    nota: "Sin inscripción, presentarse directamente. También ofrecen Språktrening más estructurado el mismo edificio. Centro abierto lun–jue 10–16. Tram: parada Storgata.",
  },
  {
    id: 41,
    nombre: "Tøyen Frivilligsentral – Språkkafé propio",
    direccion: "Kolstadgata 1 (Aktivitetshuset K1), Oslo",
    barrio: "Tøyen / Gamle Oslo",
    dia: "Lunes",
    hora: "Se anuncian en Facebook",
    organizador: "Tøyen Frivilligsentral",
    contacto: "facebook.com/toyenfrivilligsentral | dijana.sekulic@bgo.oslo.kommune.no",
    idiomas: ["Norsk"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://frivillig.no/tyen-frivilligsentral",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Frivilligsentral",
    nota: "Dos ofertas: språkkafé propio en K1 + colaboración con Deichman Tøyen (lun 17–19). Åpen dør viernes 12–14 en K1 (apto para consultar). T-bane: Tøyen.",
  },
  {
    id: 42,
    nombre: "Norsk Start Oslo – Tirsdagskafé @ OsloMet",
    direccion: "Pilestredet 52, 0167 Oslo (OsloMet campus Pilestredet)",
    barrio: "Sentrum / St. Hanshaugen",
    dia: "Martes",
    hora: "17:00–18:30",
    organizador: "Norsk Start Oslo (studentorganisasjon)",
    contacto: "norskstartoslo@gmail.com | facebook.com/NorskStartOslo",
    idiomas: ["Norsk", "Engelsk"],
    nivel: "A1–B2",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.norskstart.no/aktiviteter-oslo",
    actualizado: "Jun 2026",
    estado: "Activo",
    tipo: "Universidad",
    nota: "Cuadernillos nuevos cada semana (A1–B2). Antes solo para refugiados, ahora abierto a todos los inmigrantes. Voluntarios son estudiantes universitarios de Oslo. Antes llamado 'Tirsdagskafé'.",
  },
  {
    id: 43,
    nombre: "LIN – Likestilling, Inkludering, Nettverk",
    direccion: "Oslo (ver web para ubicación exacta)",
    barrio: "Sentrum",
    dia: "Variable (ver web)",
    hora: "Ver web",
    organizador: "LIN – Likestilling, Inkludering, Nettverk",
    contacto: "lin.no",
    idiomas: ["Norsk", "Varios idiomas"],
    nivel: "A1+",
    gratis: true,
    inscripcion: false,
    enlace: "https://www.oslo.kommune.no/flyktninger-og-inkludering/bidra-med-aktiviteter-til-flyktninger/",
    actualizado: "Jun 2026",
    estado: "Confirmar",
    tipo: "ONG",
    nota: "Ofrece norsktrening + asesoría legal gratuita + apoyo en varios idiomas. Recomendado por el Ayuntamiento de Oslo para recién llegados. Verificar horarios actuales en web.",
  }
];

const PALETA_PRINCIPAL = {
  primario: "#E65F2B",      // Naranja Enérgico
  primarioSec: "#F3A152",   // Oro Cálido / Salmón claro
  fondoFondo: "#FFFDF9",    // Marfil Cálido / Crema Suave
  textoBase: "#2C2520",     // Café Oscuro (suave para lectura prolongada)
};

const TIPOS_COLOR = {
  "Deichman": { bg: "#DE6B48", light: "#FBECE7", text: "#7A321A" },       // Terracota
  "Røde Kors": { bg: "#E74C3C", light: "#FDEDEC", text: "#78281F" },      // Rojo enérgico
  "Universidad": { bg: "#8E44AD", light: "#F4ECF7", text: "#4A235A" },   // Púrpura creativo
  "ONG": { bg: "#27AE60", light: "#EAF7EE", text: "#145A32" },            // Verde social
  "Iglesia": { bg: "#D35400", light: "#FBEEE6", text: "#6E2C00" },        // Ámbar profundo
  "Frivilligsentral": { bg: "#16A085", light: "#E8F8F5", text: "#0E6251" },// Turquesa hospitalario
  "Ayuntamiento": { bg: "#7F8C8D", light: "#F2F4F4", text: "#34495E" },   // Gris neutral
  "Digital": { bg: "#2980B9", light: "#EBF5FB", text: "#1B4F72" },        // Azul tecnológico
  "Escuela": { bg: "#E67E22", light: "#FEF9E7", text: "#7E5109" },        // Naranja educativo
};

const ESTADOS = {
  "Activo": { color: "#16a34a", bg: "#dcfce7", icon: "✅" },
  "Pausado": { color: "#d97706", bg: "#fef9c3", icon: "⏸️" },
  "Cerrado": { color: "#dc2626", bg: "#fee2e2", icon: "🔴" },
  "Confirmar": { color: "#6b7280", bg: "#f3f4f6", icon: "❓" },
};

const DIAS_ORDEN = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Variable", "Quincenal / variable", "Lunes–Jueves", "Martes + Miércoles", "Ver deichman.no", "Ver Facebook", "Ver inscripción", "Ver web"];

// ── PANEL ADMIN ────────────────────────────────────────────────
function AdminPanel({ items, onAdd, onDelete, onClose }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const TIPOS = ["Deichman", "Røde Kors", "Universidad", "ONG", "Iglesia", "Frivilligsentral", "Ayuntamiento", "Digital", "Escuela"];
  const DIAS_OPT = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo", "Variable (ver web)", "Semanal (ver web)", "Ver Facebook", "Ver web"];
  const ESTADOS_OPT = ["Activo", "Pausado", "Confirmar", "Cerrado"];

  async function extractFromUrl() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setPreview(null);
    try {
      const prompt = `Extrae datos de esta URL sobre un språkkafé en Oslo: ${url}. Devuelve exclusivamente un objeto JSON basado en el esquema siguiente.`;

      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: "application/json", // <-- Obliga a Gemini a responder en JSON estructurado puro sin markdown
            }
          })
        }
      );

      if (!resp.ok) throw new Error(`API status: ${resp.status}`);

      const data = await resp.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Al usar responseMimeType, "text" ya es una cadena JSON válida sin triple backtick.
      const parsed = JSON.parse(text);
      parsed.enlace = url;
      setPreview(parsed);
    } catch (e) {
      console.error(e);
      setError("La IA no pudo procesar el enlace directamente (CORS o restricción). Rellena los datos manualmente abajo.");
      setPreview({
        nombre: "", direccion: "", barrio: "", dia: "Lunes",
        hora: "17:00–19:00", organizador: "", contacto: "", idiomas: ["Norsk"],
        nivel: "Todos los niveles", gratis: true, inscripcion: false,
        enlace: url, estado: "Activo", tipo: "ONG", nota: ""
      });
    }
    setLoading(false);
  }

  function handleSave() {
    if (!preview?.nombre) { setError("El nombre es obligatorio."); return; }
    const newItem = { ...preview, id: Date.now(), actualizado: new Date().toLocaleDateString("es-ES", { month: "short", year: "numeric" }) };
    onAdd(newItem);
    setSuccessMsg(`🚀 "${newItem.nombre}" añadido de forma exitosa.`);
    setPreview(null);
    setUrl("");
    setTimeout(() => setSuccessMsg(""), 3000);
  }

  function handleDelete(id, nombre) {
    if (deleteConfirm === id) {
      onDelete(id);
      setDeleteConfirm(null);
      setSuccessMsg(`🗑️ "${nombre}" ha sido eliminado.`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 4000);
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(44, 37, 32, 0.7)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "1rem", backdropFilter: "blur(4px)" }}>
      <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 760, margin: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
        {/* Header Panel */}
        <div style={{ background: `linear-gradient(135deg, ${PALETA_PRINCIPAL.primario}, ${PALETA_PRINCIPAL.primarioSec})`, color: "white", padding: "1.25rem 1.5rem", borderRadius: "16px 16px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>⚙️ Panel de Control del Directorio</h2>
            <p style={{ margin: "0.2rem 0 0", opacity: 0.9, fontSize: "0.8rem" }}>Mantén al día la base de datos de la comunidad</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {successMsg && <div style={{ background: "#dcfce7", color: "#166534", padding: "0.75rem 1rem", borderRadius: 8, marginBottom: "1rem", fontWeight: 600, fontSize: "0.875rem" }}>{successMsg}</div>}

          {/* SECCIÓN AÑADIR */}
          <div style={{ background: "#FFFBF2", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem", border: `1.5px solid ${PALETA_PRINCIPAL.primarioSec}` }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 700, color: PALETA_PRINCIPAL.primario }}>⚡ Alimentar el buscador con un enlace</h3>

            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <input
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && extractFromUrl()}
                placeholder="Pega el enlace oficial aquí (ej: https://caritas.no/kurs/)"
                style={{ flex: 1, padding: "0.6rem 0.8rem", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: "0.875rem" }}
              />
              <button onClick={extractFromUrl} disabled={loading || !url.trim()}
                style={{ padding: "0.6rem 1rem", background: loading ? "#94a3b8" : PALETA_PRINCIPAL.primario, color: "white", border: "none", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", fontWeight: 700, fontSize: "0.85rem", whiteSpace: "nowrap", transition: "background 0.2s" }}>
                {loading ? "⏳ Leyendo con IA..." : "🤖 Autocompletar con IA"}
              </button>
            </div>

            {error && <div style={{ color: "#dc2626", fontSize: "0.8rem", marginBottom: "0.75rem", fontWeight: 500 }}>{error}</div>}

            {preview && (
              <div style={{ background: "white", borderRadius: 10, padding: "1rem", border: "1.5px solid #e2e8f0" }}>
                <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>✨ Datos estructurados listos para revisión:</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                  {[
                    ["nombre", "Nombre Completo", "text"], ["direccion", "Dirección / Calle", "text"],
                    ["barrio", "Barrio / Zona de Oslo", "text"], ["organizador", "Quién lo organiza", "text"],
                    ["contacto", "Método de contacto público", "text"], ["hora", "Horario específico", "text"], ["nivel", "Nivel requerido (ej: Todos, A2)", "text"], ["nota", "Tip/Consejo útil rápido", "text"],
                  ].map(([field, label]) => (
                    <div key={field} style={{ gridColumn: field === "nota" || field === "nombre" ? "1/-1" : "auto" }}>
                      <label style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, display: "block", marginBottom: 3 }}>{label}</label>
                      <input value={preview[field] || ""} onChange={e => setPreview(p => ({ ...p, [field]: e.target.value }))}
                        style={{ width: "100%", padding: "0.4rem 0.6rem", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: "0.82rem", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  {[
                    ["dia", "Día de la semana", DIAS_OPT],
                    ["tipo", "Categoría de Organizador", TIPOS],
                    ["estado", "Estado Actual", ESTADOS_OPT],
                  ].map(([field, label, opts]) => (
                    <div key={field}>
                      <label style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600, display: "block", marginBottom: 3 }}>{label}</label>
                      <select value={preview[field] || ""} onChange={e => setPreview(p => ({ ...p, [field]: e.target.value }))}
                        style={{ width: "100%", padding: "0.4rem 0.6rem", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: "0.82rem", backgroundColor: "white" }}>
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <label style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontWeight: 600 }}>
                      <input type="checkbox" checked={preview.gratis} onChange={e => setPreview(p => ({ ...p, gratis: e.target.checked }))} /> 🆓 Acceso Gratis
                    </label>
                    <label style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontWeight: 600 }}>
                      <input type="checkbox" checked={preview.inscripcion} onChange={e => setPreview(p => ({ ...p, inscripcion: e.target.checked }))} /> 📝 Requiere anotarse antes
                    </label>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                  <button onClick={handleSave}
                    style={{ flex: 1, padding: "0.65rem", background: "#16a34a", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: "0.875rem" }}>
                    🚀 Publicar inmediatamente en el mapa
                  </button>
                  <button onClick={() => setPreview(null)}
                    style={{ padding: "0.65rem 1rem", background: "#f1f5f9", color: "#374151", border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", fontSize: "0.875rem" }}>
                    Descartar
                  </button>
                </div>
              </div>
            )}

            {!preview && !loading && (
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>
                💡 Tip de diseño: Pega enlaces de portales como deichman.no o caritas.no. La IA extraerá los campos clave para agilizar tu flujo editorial.
              </p>
            )}
          </div>

          {/* SECCIÓN GESTIONAR / ELIMINAR */}
          <div>
            <h3 style={{ margin: "0 0 0.75rem", fontSize: "1rem", fontWeight: 700, color: "#7f1d1d" }}>📋 Actividades Listadas</h3>
            <div style={{ maxHeight: 320, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {items.map(item => {
                const tc = TIPOS_COLOR[item.tipo] || TIPOS_COLOR["ONG"];
                const es = ESTADOS[item.estado];
                const isConfirming = deleteConfirm === item.id;
                return (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 0.75rem", borderRadius: 8, background: isConfirming ? "#fee2e2" : "#f8fafc", border: `1.5px solid ${isConfirming ? "#fca5a5" : "#f1f5f9"}`, transition: "all 0.2s" }}>
                    <span style={{ fontSize: "0.65rem", padding: "0.15rem 0.4rem", borderRadius: 20, backgroundColor: tc.light, color: tc.text, fontWeight: 600, whiteSpace: "nowrap" }}>{item.tipo}</span>
                    <span style={{ flex: 1, fontSize: "0.8rem", fontWeight: 600, color: PALETA_PRINCIPAL.textoBase }}>{item.nombre}</span>
                    <span style={{ fontSize: "0.7rem", color: "#64748b", whiteSpace: "nowrap" }}>{item.dia}</span>
                    <span style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem", borderRadius: 20, backgroundColor: es.bg, color: es.color, fontWeight: 700 }}>{es.icon}</span>
                    <button onClick={() => handleDelete(item.id, item.nombre)}
                      style={{ padding: "0.3rem 0.6rem", background: isConfirming ? "#dc2626" : "#fee2e2", color: isConfirming ? "white" : "#dc2626", border: "none", borderRadius: 6, cursor: "pointer", fontSize: "0.78rem", fontWeight: 700, whiteSpace: "nowrap", transition: "all 0.2s" }}>
                      {isConfirming ? "⚠️ ¿Seguro?" : "🗑️"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ────────────────────────────────────────
export default function App() {
  const [items, setItems] = useState(DATA);
  const [search, setSearch] = useState("");
  const [filterDia, setFilterDia] = useState("Todos");
  const [filterTipo, setFilterTipo] = useState("Todos");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [filterGratis, setFilterGratis] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("tarjetas");
  const [showAdmin, setShowAdmin] = useState(false);

  const dias = ["Todos", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const tipos = ["Todos", ...Object.keys(TIPOS_COLOR)];
  const estados = ["Todos", "Activo", "Pausado", "Confirmar", "Cerrado"];

  const filtered = useMemo(() => {
    return items.filter(d => {
      const s = search.toLowerCase();
      const matchSearch = !s || d.nombre.toLowerCase().includes(s) || d.barrio.toLowerCase().includes(s) || d.direccion.toLowerCase().includes(s) || d.organizador.toLowerCase().includes(s);
      const matchDia = filterDia === "Todos" || d.dia.includes(filterDia);
      const matchTipo = filterTipo === "Todos" || d.tipo === filterTipo;
      const matchEstado = filterEstado === "Todos" || d.estado === filterEstado;
      const matchGratis = filterGratis === "Todos" || (filterGratis === "Gratis" && d.gratis) || (filterGratis === "Pago" && !d.gratis);
      return matchSearch && matchDia && matchTipo && matchEstado && matchGratis;
    });
  }, [search, filterDia, filterTipo, filterEstado, filterGratis]);

  const byDay = useMemo(() => {
    const map = {};
    dias.slice(1).forEach(d => { map[d] = []; });
    filtered.forEach(item => {
      dias.slice(1).forEach(d => {
        if (item.dia.includes(d)) map[d].push(item);
      });
    });
    return map;
  }, [filtered]);

  const stats = {
    total: items.length,
    activos: items.filter(d => d.estado === "Activo").length,
    gratis: items.filter(d => d.gratis).length,
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", backgroundColor: PALETA_PRINCIPAL.fondoFondo, color: PALETA_PRINCIPAL.textoBase }}>
      {showAdmin && (
        <AdminPanel
          items={items}
          onAdd={item => setItems(prev => [...prev, item])}
          onDelete={id => setItems(prev => prev.filter(i => i.id !== id))}
          onClose={() => setShowAdmin(false)}
        />
      )}

      {/* HERO / HEADER CON EMOCIÓN Y COPIES GANCHO */}
      <div style={{ background: `linear-gradient(135deg, ${PALETA_PRINCIPAL.primario} 0%, ${PALETA_PRINCIPAL.primarioSec} 100%)`, color: "white", padding: "2.5rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "2.2rem" }}>🗣️</span>
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                De Extranjero a Local: Encuentra tu Språkkafé ideal en Oslo y empieza a hablar noruego con confianza.
              </h1>
              <p style={{ margin: "0.4rem 0 0", opacity: 0.95, fontSize: "1.05rem", fontWeight: 500 }}>
                Habla, ríe, equivócate y repite. No se trata de ser perfecto, sino de no rendirse.
              </p>
            </div>
            <button onClick={() => setShowAdmin(true)}
              style={{ background: "rgba(255,255,255,0.25)", border: "1.5px solid rgba(255,255,255,0.5)", color: "white", padding: "0.6rem 1.2rem", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: "0.85rem", whiteSpace: "nowrap", backdropFilter: "blur(4px)", transition: "transform 0.15s, background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}>
              ⚙️ Modo Administrador
            </button>
          </div>

          {/* Tarjetas de Estadísticas Vibrantes */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Puntos de encuentro activos", value: stats.activos, icon: "📍" },
              { label: "Opciones 100% Gratis", value: stats.gratis, icon: "🆓" },
              { label: "Distritos cubiertos", value: "15+", icon: "🗺️" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.18)", borderRadius: 12, padding: "0.6rem 1.2rem", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ fontSize: "1.4rem", fontWeight: 800, display: "inline-block", marginRight: 4 }}>{s.icon} {s.value}</span>
                <span style={{ opacity: 0.9, fontSize: "0.85rem", fontWeight: 600, marginLeft: 4 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTROS SEGÚN ORGANIZADOR */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0.85rem 1.5rem", overflowX: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 700, marginRight: 4, letterSpacing: "0.05em" }}>FILTRAR POR AMBIENTE:</span>
          {Object.entries(TIPOS_COLOR).map(([tipo, col]) => (
            <span key={tipo} onClick={() => setFilterTipo(filterTipo === tipo ? "Todos" : tipo)}
              style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", borderRadius: 20, backgroundColor: col.light, color: col.text, fontWeight: 700, cursor: "pointer", border: filterTipo === tipo ? `2px solid ${col.bg}` : "2px solid transparent", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", transition: "all 0.15s" }}>
              {tipo}
            </span>
          ))}
        </div>
      </div>

      {/* CONTROLES DE BÚSQUEDA AVANZADOS */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "1rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍  ¿Qué barrio, día u organizador buscas hoy?..."
              style={{ flex: "1 1 260px", padding: "0.6rem 1rem", border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = PALETA_PRINCIPAL.primario}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
            <select value={filterDia} onChange={e => setFilterDia(e.target.value)}
              style={{ padding: "0.6rem 0.8rem", border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.85rem", backgroundColor: "white", fontWeight: 600 }}>
              {dias.map(d => <option key={d}>{d === "Todos" ? "🗓️ Cualquier día" : d}</option>)}
            </select>
            <select value={filterEstado} onChange={e => setFilterEstado(e.target.value)}
              style={{ padding: "0.6rem 0.8rem", border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.85rem", backgroundColor: "white", fontWeight: 600 }}>
              {estados.map(e => <option key={e}>{e === "Todos" ? "⚡ Todos los estados" : e}</option>)}
            </select>
            <select value={filterGratis} onChange={e => setFilterGratis(e.target.value)}
              style={{ padding: "0.6rem 0.8rem", border: "2px solid #e2e8f0", borderRadius: 10, fontSize: "0.85rem", backgroundColor: "white", fontWeight: 600 }}>
              {["Todos", "Gratis", "Pago"].map(g => <option key={g}>{g === "Todos" ? "💵 Costo" : g}</option>)}
            </select>

            <div style={{ display: "flex", gap: "0.4rem", marginLeft: "auto" }}>
              {[["tarjetas", "⊞ Tarjetas"], ["tabla", "☰ Tabla"], ["calendario", "📅 Horarios"]].map(([v, label]) => (
                <button key={v} onClick={() => setView(v)}
                  style={{ padding: "0.5rem 0.9rem", borderRadius: 8, border: "2px solid", borderColor: view === v ? PALETA_PRINCIPAL.primario : "#e2e8f0", background: view === v ? PALETA_PRINCIPAL.primario : "white", color: view === v ? "white" : "#475569", fontSize: "0.85rem", cursor: "pointer", fontWeight: 700, transition: "all 0.15s" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Microcopy de Empatía / UX */}
          <div style={{ marginTop: "0.6rem", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#64748b", fontWeight: 500 }}>
            <span>📍 Mostrando {filtered.length} alternativas perfectas para ti</span>
            <span>💡 <b>¿Miedo al nivel?</b> La gran mayoría son Drop-in: llegas, te sientas y hablas a tu ritmo.</span>
          </div>
        </div>
      </div>

      {/* CONTENIDO DENTRO DE VISTAS */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* === VISTA TARJETAS === */}
        {view === "tarjetas" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
            {filtered.map(item => {
              const tc = TIPOS_COLOR[item.tipo] || TIPOS_COLOR["ONG"];
              const es = ESTADOS[item.estado];
              return (
                <div key={item.id} onClick={() => setSelected(selected?.id === item.id ? null : item)}
                  style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)", border: "2px solid", borderColor: selected?.id === item.id ? tc.bg : "transparent", cursor: "pointer", transition: "all 0.2s", transform: selected?.id === item.id ? "scale(1.01)" : "none" }}>
                  {/* Decorative tag color accent */}
                  <div style={{ height: 6, backgroundColor: tc.bg }} />
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: PALETA_PRINCIPAL.textoBase, lineHeight: 1.3, flex: 1 }}>
                        {item.nombre}
                      </h3>
                      <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: 20, backgroundColor: es.bg, color: es.color, fontWeight: 800, whiteSpace: "nowrap", flexShrink: 0 }}>
                        {es.icon} {item.estado}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 6, marginTop: "0.6rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, backgroundColor: tc.light, color: tc.text, fontWeight: 700 }}>{item.tipo}</span>
                      {item.gratis && <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, backgroundColor: "#E8F8F5", color: "#117A65", fontWeight: 700 }}>🆓 Gratis</span>}
                      {!item.inscripcion && <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, backgroundColor: "#EAF2F8", color: "#2471A3", fontWeight: 700 }}>⚡ Acceso Libre</span>}
                      {item.inscripcion && <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, backgroundColor: "#FEF9E7", color: "#B7950B", fontWeight: 700 }}>📝 Con Inscripción</span>}
                    </div>

                    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      <div style={{ fontSize: "0.85rem", color: PALETA_PRINCIPAL.textoBase, fontWeight: 500 }}>
                        <span style={{ marginRight: 6 }}>📅</span> <b>{item.dia}</b> · {item.hora}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "#475569" }}>
                        <span style={{ marginRight: 6 }}>📍</span> {item.barrio}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#94a3b8", paddingLeft: "1.2rem" }}>{item.direccion}</div>
                      <div style={{ fontSize: "0.82rem", color: "#475569", marginTop: 2 }}>
                        <span>🎯 Nivel sugerido:</span> <b>{item.nivel}</b>
                      </div>
                    </div>

                    {selected?.id === item.id && (
                      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f1f5f9", animation: "fadeIn 0.2s ease-out" }}>
                        <div style={{ fontSize: "0.8rem", color: "#475569", marginBottom: 6 }}>
                          <b>Coordinado por:</b> {item.organizador}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#475569", marginBottom: 6 }}>
                          <b>Contacto / Canal:</b> {item.contacto}
                        </div>
                        {item.nota && (
                          <div style={{ fontSize: "0.78rem", color: tc.text, backgroundColor: tc.light, padding: "0.6rem 0.8rem", borderRadius: 8, marginBottom: 8, fontWeight: 500 }}>
                            💡 {item.nota}
                          </div>
                        )}
                        <a href={item.enlace} target="_blank" rel="noreferrer"
                          style={{ display: "inline-block", marginTop: 4, fontSize: "0.82rem", color: PALETA_PRINCIPAL.primario, fontWeight: 700, textDecoration: "none" }}>
                          🔗 Visitar web oficial →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* === VISTA TABLA STYLING === */}
        {view === "tabla" && (
          <div style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: PALETA_PRINCIPAL.primario, color: "white" }}>
                    {["Nombre de Actividad", "Zona", "Día", "Horas", "Organiza", "Nivel", "Gratis", "Ingreso", "Estado"].map(h => (
                      <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => {
                    const tc = TIPOS_COLOR[item.tipo] || TIPOS_COLOR["ONG"];
                    const es = ESTADOS[item.estado];
                    return (
                      <tr key={item.id} style={{ backgroundColor: i % 2 === 0 ? "white" : "#FFFDF9", borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: PALETA_PRINCIPAL.textoBase, maxWidth: 240 }}>
                          <div>{item.nombre}</div>
                          <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 2 }}>{item.organizador}</div>
                        </td>
                        <td style={{ padding: "0.75rem 1rem", color: "#475569" }}>{item.barrio}</td>
                        <td style={{ padding: "0.75rem 1rem", color: "#475569", whiteSpace: "nowrap", fontWeight: 600 }}>{item.dia}</td>
                        <td style={{ padding: "0.75rem 1rem", color: "#475569", whiteSpace: "nowrap" }}>{item.hora}</td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: 20, backgroundColor: tc.light, color: tc.text, fontWeight: 700 }}>{item.tipo}</span>
                        </td>
                        <td style={{ padding: "0.75rem 1rem", color: "#475569", fontWeight: 600 }}>{item.nivel}</td>
                        <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>{item.gratis ? "🆓" : "💰"}</td>
                        <td style={{ padding: "0.75rem 1rem", textAlign: "center" }}>{item.inscripcion ? "📝" : "🚶"}</td>
                        <td style={{ padding: "0.75rem 1rem" }}>
                          <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: 20, backgroundColor: es.bg, color: es.color, fontWeight: 800 }}>
                            {es.icon} {item.estado}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === VISTA CALENDARIO CRÍTICA (ALTA CONVERSIÓN) === */}
        {view === "calendario" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {dias.slice(1).map(dia => {
              const items = byDay[dia] || [];
              if (items.length === 0) return null;
              return (
                <div key={dia} style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                  <div style={{ backgroundColor: PALETA_PRINCIPAL.primarioSec, color: "white", padding: "0.75rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800 }}>📅 Agenda del {dia}</h3>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{items.length} opciones mapeadas</span>
                  </div>
                  <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {items.map(item => {
                      const tc = TIPOS_COLOR[item.tipo] || TIPOS_COLOR["ONG"];
                      const es = ESTADOS[item.estado];
                      return (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1rem", borderRadius: 10, backgroundColor: "#FFFDF9", border: "1px solid #f1f5f9", flexWrap: "wrap" }}>
                          <div style={{ minWidth: 90, fontSize: "0.85rem", fontWeight: 800, color: PALETA_PRINCIPAL.primario }}>⏱️ {item.hora}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: PALETA_PRINCIPAL.textoBase }}>{item.nombre}</div>
                            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>📍 {item.barrio} · Requisito: {item.nivel}</div>
                          </div>
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            <span style={{ fontSize: "0.68rem", padding: "0.2rem 0.5rem", borderRadius: 20, backgroundColor: tc.light, color: tc.text, fontWeight: 700 }}>{item.tipo}</span>
                            <span style={{ fontSize: "0.68rem", padding: "0.2rem 0.5rem", borderRadius: 20, backgroundColor: es.bg, color: es.color, fontWeight: 800 }}>{es.icon} {item.estado}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER MARKETING EN ACCIÓN */}
      <div style={{ background: "#2C2520", color: "#cbd5e1", padding: "2rem 1.5rem", marginTop: "4rem", fontSize: "0.85rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <div style={{ color: "white", fontWeight: 700, marginBottom: 8, fontSize: "0.95rem" }}>🔑 Portales de Origen</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• deichman.no (Consultas de agenda semanal)</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• rodekors.no/norsktrening</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• norskstart.no</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• caritas.no/kurs</div>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, marginBottom: 8, fontSize: "0.95rem" }}>📅 Cronograma de Auditoría</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• Deichman: Auditoría el 1 de cada mes</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• Røde Kors: Confirmación Semestral</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• Alfaskolen: ⚠️ Pausado temporalmente hasta otoño 2026</div>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, marginBottom: 8, fontSize: "0.95rem" }}>💡 Consejos Clave para tu Primer Día</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• <b>Pierde el miedo:</b> Comienza en Røde Kors, no te pedirán registrarte ni evaluar tu nivel.</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• <b>Estudiantes:</b> NorskStart en OsloMet es ideal para conectar con jóvenes locales.</div>
              <div style={{ opacity: 0.85, lineHeight: 1.6 }}>• <b>Doble Impacto:</b> Caritas unifica dinámicas guiadas y charlas libres.</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #443B35", paddingTop: "1rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: "0.8rem", opacity: 0.8 }}>
            <span>Última revisión completa de datos: <strong style={{ color: "white" }}>Junio 2026</strong></span>
            <span>🇳🇴 Construido con ❤️ para la comunidad de Oslo · Código de uso abierto</span>
          </div>
        </div>
      </div>
    </div>
  );
}
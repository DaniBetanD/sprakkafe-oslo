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
    tipo: "Caritas Norge",
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

  // ── NUEVAS ENTRADAS (junio 2026) ───────────────────────────────
  {
    id: 40,
    nombre: "Caritas Norsk Språkkafé",
    direccion: "Storgata 38, 0182 Oslo",
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
    tipo: "Caritas Norge",
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
  },
];

const TIPOS_COLOR = {
  "Deichman": { bg: "#1a4a7a", light: "#dbeafe", text: "#1e3a5f" },
  "Røde Kors": { bg: "#c0392b", light: "#fee2e2", text: "#7f1d1d" },
  "Universidad": { bg: "#5b21b6", light: "#ede9fe", text: "#4c1d95" },
  "Caritas Norge": { bg: "#0284c7", light: "#e0f2fe", text: "#0369a1" },
  "ONG": { bg: "#065f46", light: "#d1fae5", text: "#064e3b" },
  "Iglesia": { bg: "#92400e", light: "#fef3c7", text: "#78350f" },
  "Frivilligsentral": { bg: "#0e7490", light: "#cffafe", text: "#0c4a6e" },
  "Ayuntamiento": { bg: "#374151", light: "#f3f4f6", text: "#1f2937" },
  "Digital": { bg: "#6d28d9", light: "#f5f3ff", text: "#4c1d95" },
  "Escuela": { bg: "#b45309", light: "#fef9c3", text: "#78350f" },
};

const ESTADOS = {
  "Activo": { color: "#16a34a", bg: "#dcfce7", icon: "✅" },
  "Pausado": { color: "#d97706", bg: "#fef9c3", icon: "⏸️" },
  "Cerrado": { color: "#dc2626", bg: "#fee2e2", icon: "🔴" },
  "Confirmar": { color: "#6b7280", bg: "#f3f4f6", icon: "❓" },
};

export default function App() {
  const [search, setSearch] = useState("");
  const [filterDia, setFilterDia] = useState("Todos");
  const [filterTipo, setFilterTipo] = useState("Todos");
  const [filterEstado, setFilterEstado] = useState("Todos");
  const [filterGratis, setFilterGratis] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("tarjetas");

  const dias = ["Todos", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const tipos = ["Todos", ...Object.keys(TIPOS_COLOR)];
  const estados = ["Todos", "Activo", "Pausado", "Confirmar", "Cerrado"];

  const filtered = useMemo(() => {
    return DATA.filter(d => {
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
    total: DATA.length,
    activos: DATA.filter(d => d.estado === "Activo").length,
    gratis: DATA.filter(d => d.gratis).length,
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#f0f4f8" }}>
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #0f2d5a 0%, #1a4a7a 60%, #1e6fa8 100%)", color: "white", padding: "2rem 1.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "2rem" }}>🇳🇴</span>
            <div>
              <h1 style={{ margin: 0, fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Språkkafé Oslo — Directorio 2026
              </h1>
              <p style={{ margin: "0.25rem 0 0", opacity: 0.8, fontSize: "0.9rem" }}>
                Guía completa de grupos de conversación noruega · Actualizado junio 2026
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {[
              { label: "Actividades", value: stats.total, icon: "📍" },
              { label: "Activas", value: stats.activos, icon: "✅" },
              { label: "Gratuitas", value: stats.gratis, icon: "🆓" },
              { label: "Barrios", value: "15+", icon: "🗺️" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "0.5rem 1rem", backdropFilter: "blur(4px)" }}>
                <span style={{ fontSize: "1.3rem", fontWeight: 800 }}>{s.icon} {s.value}</span>
                <span style={{ opacity: 0.75, fontSize: "0.8rem", marginLeft: 6 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEYENDA COLORES (ORGANIZADORES) */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0.75rem 1.5rem", overflowX: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, marginRight: 4 }}>ORGANIZADOR:</span>
          {Object.entries(TIPOS_COLOR).map(([tipo, col]) => (
            <span key={tipo} onClick={() => setFilterTipo(filterTipo === tipo ? "Todos" : tipo)}
              style={{ fontSize: "0.72rem", padding: "0.2rem 0.6rem", borderRadius: 20, backgroundColor: col.light, color: col.text, fontWeight: 600, cursor: "pointer", border: filterTipo === tipo ? `2px solid ${col.bg}` : "2px solid transparent", transition: "all 0.15s" }}>
              {tipo}
            </span>
          ))}
        </div>
      </div>

      {/* FILTROS Y BÚSQUEDA */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0.75rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍  Buscar por nombre, barrio, organizador..."
              style={{ flex: "1 1 220px", padding: "0.5rem 0.8rem", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: "0.875rem", outline: "none" }}
            />
            <select value={filterDia} onChange={e => setFilterDia(e.target.value)}
              style={{ padding: "0.5rem 0.7rem", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: "0.85rem", backgroundColor: "white" }}>
              {dias.map(d => <option key={d}>{d}</option>)}
            </select>
            <select value={filterTipo} onChange={e => setFilterTipo(e.target.value)}
              style={{ padding: "0.5rem 0.7rem", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: "0.85rem", backgroundColor: "white" }}>
              {tipos.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={filterEstado} onChange={e => setFilterEstado(e.target.value)}
              style={{ padding: "0.5rem 0.7rem", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: "0.85rem", backgroundColor: "white" }}>
              {estados.map(e => <option key={e}>{e}</option>)}
            </select>
            <select value={filterGratis} onChange={e => setFilterGratis(e.target.value)}
              style={{ padding: "0.5rem 0.7rem", border: "1.5px solid #cbd5e1", borderRadius: 8, fontSize: "0.85rem", backgroundColor: "white" }}>
              {["Todos", "Gratis", "Pago"].map(g => <option key={g}>{g}</option>)}
            </select>
            <div style={{ display: "flex", gap: "0.4rem", marginLeft: "auto" }}>
              {[["tarjetas", "⊞"], ["tabla", "☰"], ["calendario", "📅"]].map(([v, icon]) => (
                <button key={v} onClick={() => setView(v)}
                  style={{ padding: "0.4rem 0.8rem", borderRadius: 7, border: "1.5px solid", borderColor: view === v ? "#1a4a7a" : "#cbd5e1", background: view === v ? "#1a4a7a" : "white", color: view === v ? "white" : "#374151", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600 }}>
                  {icon} {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: "0.4rem", fontSize: "0.8rem", color: "#64748b" }}>
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} · {filtered.filter(d => d.estado === "Activo").length} activos
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.25rem 1rem" }}>

        {/* === VISTA TARJETAS === */}
        {view === "tarjetas" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {filtered.map(item => {
              const tc = TIPOS_COLOR[item.tipo] || TIPOS_COLOR["ONG"];
              const es = ESTADOS[item.estado];
              return (
                <div key={item.id} onClick={() => setSelected(selected?.id === item.id ? null : item)}
                  style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: "1.5px solid", borderColor: selected?.id === item.id ? tc.bg : "#e2e8f0", cursor: "pointer", transition: "all 0.18s" }}>
                  <div style={{ height: 5, backgroundColor: tc.bg }} />
                  <div style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <h3 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: "#1e293b", lineHeight: 1.3, flex: 1 }}>
                        {item.nombre}
                      </h3>
                      <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: 20, backgroundColor: es.bg, color: es.color, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
                        {es.icon} {item.estado}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 6, marginTop: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, backgroundColor: tc.light, color: tc.text, fontWeight: 600 }}>{item.tipo}</span>
                      {item.gratis && <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, backgroundColor: "#dcfce7", color: "#166534", fontWeight: 600 }}>🆓 Gratis</span>}
                      {!item.inscripcion && <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, backgroundColor: "#f0fdf4", color: "#15803d", fontWeight: 600 }}>Drop-in</span>}
                      {item.inscripcion && <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 20, backgroundColor: "#fef9c3", color: "#854d0e", fontWeight: 600 }}>📝 Inscripción</span>}
                    </div>

                    <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                      <div style={{ fontSize: "0.8rem", color: "#374151" }}>
                        <span style={{ fontWeight: 700, color: "#1a4a7a" }}>📅</span> {item.dia} · {item.hora}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                        <span style={{ fontWeight: 700 }}>📍</span> {item.barrio}
                      </div>

                      {/* DIRECCIÓN CLICABLE CON ENLACE A GOOGLE MAPS */}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nombre + " " + item.direccion)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()} // Evita que al pulsar el link se colapse la tarjeta
                        style={{ fontSize: "0.75rem", color: "#0284c7", textDecoration: "underline", fontWeight: 500, cursor: "pointer" }}
                        title="Abrir en Google Maps"
                      >
                        🗺️ {item.direccion}
                      </a>

                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        <span style={{ fontWeight: 600 }}>Nivel:</span> {item.nivel}
                      </div>
                    </div>

                    {selected?.id === item.id && (
                      <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #f1f5f9" }}>
                        <div style={{ fontSize: "0.78rem", color: "#374151", marginBottom: 6 }}>
                          <strong>Organizador:</strong> {item.organizador}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#374151", marginBottom: 6 }}>
                          <strong>Contacto:</strong> {item.contacto}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "#374151", marginBottom: 6 }}>
                          <strong>Idiomas:</strong> {item.idiomas.join(", ")}
                        </div>
                        {item.nota && (
                          <div style={{ fontSize: "0.75rem", color: "#64748b", backgroundColor: "#f8fafc", padding: "0.5rem", borderRadius: 6, marginBottom: 6 }}>
                            💡 {item.nota}
                          </div>
                        )}
                        <a href={item.enlace} target="_blank" rel="noreferrer"
                          style={{ display: "inline-block", marginTop: 4, fontSize: "0.78rem", color: "#1a4a7a", fontWeight: 600, textDecoration: "none" }}>
                          🔗 Ir al sitio oficial →
                        </a>
                        <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: 4 }}>Actualizado: {item.actualizado}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
                <div style={{ fontSize: "3rem" }}>🔍</div>
                <p>No se encontraron resultados con estos filtros.</p>
              </div>
            )}
          </div>
        )}

        {/* === VISTA TABLA === */}
        {view === "tabla" && (
          <div style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#1a4a7a", color: "white" }}>
                    {["Nombre", "Barrio", "Día", "Hora", "Tipo", "Nivel", "Gratis", "Inscripción", "Estado"].map(h => (
                      <th key={h} style={{ padding: "0.6rem 0.75rem", textAlign: "left", fontWeight: 700, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => {
                    const tc = TIPOS_COLOR[item.tipo] || TIPOS_COLOR["ONG"];
                    const es = ESTADOS[item.estado];
                    return (
                      <tr key={item.id} style={{ backgroundColor: i % 2 === 0 ? "white" : "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "0.6rem 0.75rem", fontWeight: 600, color: "#1e293b", maxWidth: 250 }}>
                          <div>{item.nombre}</div>
                          <div style={{ fontSize: "0.7rem", color: "#94a3b8", marginTop: 2 }}>{item.organizador}</div>
                          {/* Dirección directa en tabla también */}
                          <div style={{ marginTop: 4 }}>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nombre + " " + item.direccion)}`} target="_blank" rel="noreferrer" style={{ fontSize: "0.68rem", color: "#0284c7", textDecoration: "underline" }}>
                              🗺️ Ver mapa
                            </a>
                          </div>
                        </td>
                        <td style={{ padding: "0.6rem 0.75rem", color: "#475569" }}>{item.barrio}</td>
                        <td style={{ padding: "0.6rem 0.75rem", color: "#475569", whiteSpace: "nowrap" }}>{item.dia}</td>
                        <td style={{ padding: "0.6rem 0.75rem", color: "#475569", whiteSpace: "nowrap" }}>{item.hora}</td>
                        <td style={{ padding: "0.6rem 0.75rem" }}>
                          <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: 20, backgroundColor: tc.light, color: tc.text, fontWeight: 600 }}>{item.tipo}</span>
                        </td>
                        <td style={{ padding: "0.6rem 0.75rem", color: "#475569" }}>{item.nivel}</td>
                        <td style={{ padding: "0.6rem 0.75rem", textAlign: "center" }}>{item.gratis ? "🆓" : "💰"}</td>
                        <td style={{ padding: "0.6rem 0.75rem", textAlign: "center" }}>{item.inscripcion ? "📝" : "🚶"}</td>
                        <td style={{ padding: "0.6rem 0.75rem" }}>
                          <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: 20, backgroundColor: es.bg, color: es.color, fontWeight: 700 }}>
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

        {/* === VISTA CALENDARIO === */}
        {view === "calendario" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {dias.slice(1).map(dia => {
              const items = byDay[dia] || [];
              if (items.length === 0) return null;
              return (
                <div key={dia} style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
                  <div style={{ backgroundColor: "#1a4a7a", color: "white", padding: "0.6rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 800 }}>📅 {dia}</h3>
                    <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>{items.length} actividad{items.length !== 1 ? "es" : ""}</span>
                  </div>
                  <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {items.map(item => {
                      const tc = TIPOS_COLOR[item.tipo] || TIPOS_COLOR["ONG"];
                      const es = ESTADOS[item.estado];
                      return (
                        <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.6rem", borderRadius: 8, backgroundColor: "#f8fafc", border: "1px solid #f1f5f9" }}>
                          <div style={{ minWidth: 70, fontSize: "0.75rem", fontWeight: 700, color: "#1a4a7a", paddingTop: 2 }}>{item.hora}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1e293b" }}>{item.nombre}</div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{item.barrio} · {item.nivel}</div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                            <span style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem", borderRadius: 20, backgroundColor: tc.light, color: tc.text, fontWeight: 600 }}>{item.tipo}</span>
                            <span style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem", borderRadius: 20, backgroundColor: es.bg, color: es.color, fontWeight: 700 }}>{es.icon} {item.estado}</span>
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

      {/* FOOTER */}
      <div style={{ background: "#1e293b", color: "#94a3b8", padding: "1.5rem", marginTop: "2rem", fontSize: "0.8rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <div style={{ color: "white", fontWeight: 700, marginBottom: 6 }}>🔑 Fuentes principales</div>
              <div>• deichman.no (programa semanal)</div>
              <div>• rodekors.no/norsktrening</div>
              <div>• norskstart.no</div>
              <div>• caritas.no/kurs</div>
              <div>• bnorsk.no/spraakkafe</div>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, marginBottom: 6 }}>📅 Sistema de revisión</div>
              <div>• Deichman: revisar mensualmente en deichman.no</div>
              <div>• Røde Kors: estable, confirmar en sept/ene</div>
              <div>• ⚠️ Alfaskolen: PAUSADO, reanudar otoño 2026</div>
              <div>• Iglesias: frecuencia variable, confirmar</div>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, marginBottom: 6 }}>💡 Consejos para nuevos</div>
              <div>• Empezar con Røde Kors (sin inscripción)</div>
              <div>• Deichman: verificar en deichman.no antes de ir</div>
              <div>• NorskStart OsloMet: ideal para estudiantes</div>
              <div>• Caritas: estructura + conversación juntas</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #334155", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span>Última actualización completa: <strong style={{ color: "white" }}>Junio 2026</strong></span>
            <span>🇳🇴 Directorio elaborado con fuentes oficiales verificadas · Uso público libre</span>
          </div>
        </div>
      </div>
    </div>
  );
}
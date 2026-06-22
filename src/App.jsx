// App.jsx - Versión Mejorada "El Directorio"
import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Users,
  CheckCircle,
  AlertCircle,
  Building,
  Coffee,
  BookOpen,
  Monitor,
  Map,
  ChevronRight,
  Filter,
  X,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

// ============================================================
// 1. MODELO DE DATOS SEPARADO (Organizaciones + Actividades)
// ============================================================

// ORGANIZACIONES
const ORGANIZATIONS = [
  {
    id: 'org_rodekors',
    nombre: 'Røde Kors Oslo',
    tipo: 'ONG',
    webOficial: 'https://www.rodekors.no/lokalforeninger/oslo/',
    emailContacto: 'norsktrening.oslo@redcross.no',
    telefono: '+47 911 98 339',
    logo: '🔴',
    verificada: true,
    descripcion: 'Røde Kors ofrece norsktrening gratuito en múltiples ubicaciones de Oslo. Grupos de conversación y práctica estructurada para todos los niveles.'
  },
  {
    id: 'org_deichman',
    nombre: 'Deichman Bibliotek',
    tipo: 'Biblioteca',
    webOficial: 'https://deichman.no/',
    emailContacto: 'post@deichman.no',
    telefono: '+47 23 43 29 00',
    logo: '📚',
    verificada: true,
    descripcion: 'Las bibliotecas Deichman organizan språkkafé en varios distritos de Oslo. Ambiente relajado y sin estructura escolar.'
  },
  {
    id: 'org_caritas',
    nombre: 'Caritas Norge',
    tipo: 'ONG',
    webOficial: 'https://caritas.no/',
    emailContacto: 'info@caritas.no',
    telefono: '+47 23 33 43 61',
    logo: '🤝',
    verificada: true,
    descripcion: 'Caritas ofrece språktrening estructurado y språkkafé informal en el centro de Oslo. Combinan aprendizaje formal con conversación.'
  },
  {
    id: 'org_norskstart',
    nombre: 'Norsk Start Oslo',
    tipo: 'Universidad',
    webOficial: 'https://www.norskstart.no/',
    emailContacto: 'norskstartoslo@gmail.com',
    logo: '🎓',
    verificada: true,
    descripcion: 'Organización estudiantil de la Universidad de Oslo que ofrece språkkafé gratuito para inmigrantes. Cuadernillos semanales A1-B2.'
  },
  {
    id: 'org_haugerud',
    nombre: 'Haugerud Frivillighetssentral',
    tipo: 'Voluntariado',
    webOficial: 'https://www.bnorsk.no/',
    emailContacto: 'post@haugerud.frivillig.no',
    logo: '🏠',
    verificada: true,
    descripcion: 'Centro de voluntariado en Haugerud que organiza språkkafé semanal en un ambiente acogedor.'
  },
  {
    id: 'org_pauluskirke',
    nombre: 'Paulus Kirke',
    tipo: 'Iglesia',
    webOficial: 'https://pauluskirke.no/',
    emailContacto: 'post@pauluskirke.no',
    logo: '⛪',
    verificada: true,
    descripcion: 'La iglesia Paulus en Grünerløkka ofrece språkkafé cada jueves en un ambiente acogedor y comunitario.'
  },
  {
    id: 'org_ethnos',
    nombre: 'Ethnos',
    tipo: 'ONG',
    webOficial: 'https://www.ethnos.no/',
    emailContacto: 'post@ethnos.no',
    logo: '🌍',
    verificada: true,
    descripcion: 'Ethnos ofrece cursos estructurados de noruego gratuitos en varios niveles, de lunes a jueves.'
  },
  {
    id: 'org_alfaskolen',
    nombre: 'Alfaskolen',
    tipo: 'Escuela',
    webOficial: 'https://www.alfaskolen.no/',
    emailContacto: 'post@alfaskolen.no',
    logo: '✏️',
    verificada: true,
    descripcion: 'Escuela de noruego que organiza språkkafé de forma regular. Actualmente en pausa hasta otoño 2026.'
  },
  {
    id: 'org_sagene',
    nombre: 'Sagene Frivilligsentral',
    tipo: 'Voluntariado',
    webOficial: 'https://sagene.frivilligsentral.no/',
    emailContacto: 'post@sagene.frivillig.no',
    logo: '🏘️',
    verificada: true,
    descripcion: 'Centro de voluntariado en Sagene que organiza språkkafé los domingos en un ambiente familiar.'
  }
];

// ACTIVIDADES
const ACTIVITIES = [
  // ── RØDE KORS ────────────────────────────────────────────────
  {
    id: 'act_1',
    organizationId: 'org_rodekors',
    nombre: 'Norsktrening @ Bjørvika',
    slug: 'norsktrening-bjørvika',
    categoria: 'Norsktrening',
    modalidad: 'Presencial',
    descripcion: 'Sesión de práctica de noruego guiada por voluntarios. Llegar 30 minutos antes (4ª planta). Drop-in sin inscripción.',
    direccion: 'Anne-Cath. Vestlys plass 1, 0150 Oslo',
    barrio: 'Bjørvika / Sentrum',
    codigoPostal: '0150',
    ciudad: 'Oslo',
    dias: ['Lunes'],
    horario: '17:00–19:00',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_2',
    organizationId: 'org_rodekors',
    nombre: 'Norsktrening @ Grünerløkka',
    slug: 'norsktrening-grunerlokka',
    categoria: 'Norsktrening',
    modalidad: 'Presencial',
    descripcion: 'Sesión de práctica de noruego para todos los niveles. Llegar 15 minutos antes. Drop-in.',
    direccion: 'Schous Plass 10, 0552 Oslo',
    barrio: 'Grünerløkka',
    codigoPostal: '0552',
    ciudad: 'Oslo',
    dias: ['Lunes'],
    horario: '17:00–19:00',
    nivel: 'Todos los niveles',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_3',
    organizationId: 'org_rodekors',
    nombre: 'Norsktrening @ Hausmanns gate',
    slug: 'norsktrening-hausmanns',
    categoria: 'Norsktrening',
    modalidad: 'Presencial',
    descripcion: 'Sesión de práctica de noruego en el centro de Oslo. También miércoles y sábado mismo horario. Llegar 15 min antes.',
    direccion: 'Hausmanns gate 23, 0182 Oslo',
    barrio: 'Sentrum / Grønland',
    codigoPostal: '0182',
    ciudad: 'Oslo',
    dias: ['Martes', 'Miércoles', 'Sábado'],
    horario: '11:00–13:00',
    nivel: 'Todos los niveles',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_4',
    organizationId: 'org_rodekors',
    nombre: 'Norsktrening @ Furuset',
    slug: 'norsktrening-furuset',
    categoria: 'Norsktrening',
    modalidad: 'Presencial',
    descripcion: 'Sesión de práctica de noruego en Furuset. Llegar 15 minutos antes. Drop-in.',
    direccion: 'Trygve Lies Plass 5, 1051 Oslo',
    barrio: 'Furuset / Alna',
    codigoPostal: '1051',
    ciudad: 'Oslo',
    dias: ['Martes'],
    horario: '17:00–19:00',
    nivel: 'Todos los niveles',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_5',
    organizationId: 'org_rodekors',
    nombre: 'Norsktrening @ Majorstuen',
    slug: 'norsktrening-majorstuen',
    categoria: 'Norsktrening',
    modalidad: 'Presencial',
    descripcion: 'Sesión de práctica de noruego en Majorstuen. También jueves mismo horario. Llegar 15 minutos antes.',
    direccion: 'Harald Hårfagres gate 2, 0363 Oslo',
    barrio: 'Majorstuen / Frogner',
    codigoPostal: '0363',
    ciudad: 'Oslo',
    dias: ['Martes', 'Jueves'],
    horario: '17:00–19:00',
    nivel: 'Todos los niveles',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_6',
    organizationId: 'org_rodekors',
    nombre: 'Norsktrening Digital',
    slug: 'norsktrening-digital',
    categoria: 'Norsktrening',
    modalidad: 'Digital',
    descripcion: 'Sesión de práctica de noruego online a través de Zoom/Teams. Requiere registro previo online.',
    direccion: 'Online',
    barrio: 'Digital',
    codigoPostal: '0000',
    ciudad: 'Oslo',
    dias: ['Lunes', 'Martes', 'Miércoles'],
    horario: '17:00–18:00',
    nivel: 'Todos los niveles',
    etiquetas: ['Gratis', 'Inscripción'],
    estado: 'Activo',
    fuente: 'https://www.rodekors.no/lokalforeninger/oslo/aktiviteter/flyktninger-innvandrere/norsktrening/',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_28',
    organizationId: 'org_rodekors',
    nombre: 'Norsktrening @ Rosenhof',
    slug: 'norsktrening-rosenhof',
    categoria: 'Norsktrening',
    modalidad: 'Presencial',
    descripcion: 'Sesión en colaboración con Oslo VO Rosenhof. Tickets en biblioteca escolar desde las 12:00. 2 sesiones: 13-14 y 14-15.',
    direccion: 'Dynekilgata 10, Oslo',
    barrio: 'Sentrum',
    codigoPostal: '0560',
    ciudad: 'Oslo',
    dias: ['Lunes'],
    horario: '13:00–15:00',
    nivel: 'Todos los niveles',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://rosenhof.oslovo.no/for-deltakere/RosenhofVO/norsktrening-med-rode-kors-pa-rosenhof/',
    ultimaRevision: '2026-06-01'
  },

  // ── DEICHMAN ──────────────────────────────────────────────────
  {
    id: 'act_7',
    organizationId: 'org_deichman',
    nombre: 'Språkkafé @ Deichman Lambertseter',
    slug: 'spraakkafe-lambertseter',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Ambiente relajado, sin estructura escolar. Ideal para practicar conversación en un entorno informal.',
    direccion: 'Langbølgen 1, 1150 Oslo',
    barrio: 'Lambertseter',
    codigoPostal: '1150',
    ciudad: 'Oslo',
    dias: ['Lunes'],
    horario: '12:00–14:00',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_8',
    organizationId: 'org_deichman',
    nombre: 'Språkkafé @ Deichman Torshov',
    slug: 'spraakkafe-torshov',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Colaboración con Grefsen, Kjelsås og omegn Sanitetsforening. Ambiente acogedor y comunitario.',
    direccion: 'Sandakerveien 59, 0477 Oslo',
    barrio: 'Torshov / Sagene',
    codigoPostal: '0477',
    ciudad: 'Oslo',
    dias: ['Lunes'],
    horario: '17:00–19:00',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_9',
    organizationId: 'org_deichman',
    nombre: 'Språkkafé @ Deichman Tøyen',
    slug: 'spraakkafe-tøyen',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Organizado por Tøyen Frivilligsentral en colaboración con Deichman. Ambiente inclusivo.',
    direccion: 'Hagegata 28, 0653 Oslo',
    barrio: 'Tøyen / Gamle Oslo',
    codigoPostal: '0653',
    ciudad: 'Oslo',
    dias: ['Lunes'],
    horario: '17:00–19:00',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_10',
    organizationId: 'org_deichman',
    nombre: 'Språkkafé @ Deichman Grünerløkka',
    slug: 'spraakkafe-grunerlokka',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Norsktrening con voluntarios. Ambiente relajado en una de las bibliotecas más populares de Oslo.',
    direccion: 'Schous Plass 15, 0552 Oslo',
    barrio: 'Grünerløkka',
    codigoPostal: '0552',
    ciudad: 'Oslo',
    dias: ['Lunes'],
    horario: '17:00–19:00',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_20',
    organizationId: 'org_deichman',
    nombre: 'Språkkafé @ Deichman Nydalen',
    slug: 'spraakkafe-nydalen',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Frecuencia quincenal. Verificar en deichman.no para fechas exactas.',
    direccion: 'Nydalsveien 33, 0484 Oslo',
    barrio: 'Nydalen',
    codigoPostal: '0484',
    ciudad: 'Oslo',
    dias: ['Jueves'],
    horario: '16:30–18:30',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Confirmar',
    fuente: 'https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_35',
    organizationId: 'org_deichman',
    nombre: 'Språkkafé @ Deichman Bjerke',
    slug: 'spraakkafe-bjerke',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Revisar calendario en deichman.no para horarios exactos.',
    direccion: 'Ver deichman.no/bibliotekene/bjerke',
    barrio: 'Bjerke',
    codigoPostal: '0588',
    ciudad: 'Oslo',
    dias: ['Ver web'],
    horario: 'Ver web',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_36',
    organizationId: 'org_deichman',
    nombre: 'Språkkafé @ Deichman Furuset',
    slug: 'spraakkafe-furuset',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'También sede de Røde Kors norsktrening. Revisar calendario en deichman.no.',
    direccion: 'Trygve Lies Plass 1, 1051 Oslo',
    barrio: 'Furuset / Alna',
    codigoPostal: '1051',
    ciudad: 'Oslo',
    dias: ['Ver web'],
    horario: 'Ver web',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_37',
    organizationId: 'org_deichman',
    nombre: 'Språkkafé @ Deichman Holmlia',
    slug: 'spraakkafe-holmlia',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Revisar calendario en deichman.no para fechas y horarios.',
    direccion: 'Holmlia senter vei 16, 1255 Oslo',
    barrio: 'Holmlia / Søndre Nordstrand',
    codigoPostal: '1255',
    ciudad: 'Oslo',
    dias: ['Ver web'],
    horario: 'Ver web',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://deichman.no/hva-skjer?tag=tag_spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },

  // ── CARITAS ──────────────────────────────────────────────────
  {
    id: 'act_13',
    organizationId: 'org_caritas',
    nombre: 'Språktrening + Språkkafé Caritas',
    slug: 'caritas-spraaktraining',
    categoria: 'Intercambio de Idiomas',
    modalidad: 'Presencial',
    descripcion: 'Combinan språktrening (estructurado) + språkkafé (informal). Horario variable, revisar web. Sin inscripción, presentarse directamente.',
    direccion: 'Storgata 38, 0182 Oslo (entrada Hausmannsgate)',
    barrio: 'Sentrum / Grønland',
    codigoPostal: '0182',
    ciudad: 'Oslo',
    dias: ['Martes', 'Miércoles'],
    horario: 'Ver web',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://caritas.no/kurs/',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_40',
    organizationId: 'org_caritas',
    nombre: 'Caritas Norsk Språkkafé',
    slug: 'caritas-spraakkafe',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Sin inscripción, presentarse directamente. También ofrecen Språktrening más estructurado en el mismo edificio. Centro abierto lun-jue 10-16.',
    direccion: 'Storgata 38 (entrada Hausmannsgate), 0182 Oslo',
    barrio: 'Sentrum / Grønland',
    codigoPostal: '0182',
    ciudad: 'Oslo',
    dias: ['Semanal'],
    horario: '17:00–18:30',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://caritas.no/en/courses-and-activities/',
    ultimaRevision: '2026-06-01'
  },

  // ── NORSK START ─────────────────────────────────────────────
  {
    id: 'act_11',
    organizationId: 'org_norskstart',
    nombre: 'Norsk Start Oslo @ OsloMet',
    slug: 'norsk-start-oslomet',
    categoria: 'Intercambio de Idiomas',
    modalidad: 'Presencial',
    descripcion: 'Cuadernillos A1-B2 semanales. Todos los niveles bienvenidos. Voluntarios son estudiantes universitarios de Oslo. Abierto a todos los inmigrantes.',
    direccion: 'Pilestredet 52, 0167 Oslo (OsloMet campus Pilestredet)',
    barrio: 'Sentrum / St. Hanshaugen',
    codigoPostal: '0167',
    ciudad: 'Oslo',
    dias: ['Martes'],
    horario: '17:00–18:30',
    nivel: 'A1–B2',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.norskstart.no/aktiviteter-oslo',
    ultimaRevision: '2026-06-01'
  },

  // ── HAUGERUD ─────────────────────────────────────────────────
  {
    id: 'act_18',
    organizationId: 'org_haugerud',
    nombre: 'Språkkafé Haugerud Frivillighetssentral',
    slug: 'spraakkafe-haugerud',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Casa amarilla junto a la estación de metro. Ambiente acogedor y comunitario.',
    direccion: 'Hagapynten 38C, 0673 Oslo',
    barrio: 'Haugerud / Østensjø',
    codigoPostal: '0673',
    ciudad: 'Oslo',
    dias: ['Miércoles'],
    horario: '16:30–18:30',
    nivel: 'A2+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },

  // ── PAULUS KIRKE ─────────────────────────────────────────────
  {
    id: 'act_21',
    organizationId: 'org_pauluskirke',
    nombre: 'Paulus Kirke Språkkafé',
    slug: 'paulus-kirke-spraakkafe',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Cada jueves. Ambiente acogedor y comunitario. Ideal para todos los niveles.',
    direccion: 'Thorvald Meyers gate 31, 0555 Oslo',
    barrio: 'Grünerløkka',
    codigoPostal: '0555',
    ciudad: 'Oslo',
    dias: ['Jueves'],
    horario: '10:00–12:00',
    nivel: 'A1+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },

  // ── ETHNOS ───────────────────────────────────────────────────
  {
    id: 'act_30',
    organizationId: 'org_ethnos',
    nombre: 'Ethnos Språk- og integreringsskole',
    slug: 'ethnos-spraakskole',
    categoria: 'Norsktrening',
    modalidad: 'Presencial',
    descripcion: 'Cursos estructurados gratuitos. A1 martes, A2 mar+jue, B1 lun+mié, B2 lun+jue. Aprendizaje formal y progresivo.',
    direccion: 'Lofsrudveien 6, 1281 Oslo (Oslo Søndre Frikirke)',
    barrio: 'Mortensrud / Søndre Nordstrand',
    codigoPostal: '1281',
    ciudad: 'Oslo',
    dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves'],
    horario: '17:30–20:00',
    nivel: 'A1–B2',
    etiquetas: ['Gratis', 'Inscripción'],
    estado: 'Activo',
    fuente: 'https://www.bnorsk.no/1-for-elever/spr%C3%A5kkafe',
    ultimaRevision: '2026-06-01'
  },

  // ── ALFASKOLEN ──────────────────────────────────────────────
  {
    id: 'act_31',
    organizationId: 'org_alfaskolen',
    nombre: 'Alfaskolen Språkkafé',
    slug: 'alfaskolen-spraakkafe',
    categoria: 'Språkkafé',
    modalidad: 'Híbrido',
    descripcion: '⚠️ PAUSADO primavera 2026. Reanudan en otoño. Seguir en Instagram para actualizaciones.',
    direccion: 'Kongens gate 15, 0153 Oslo',
    barrio: 'Sentrum',
    codigoPostal: '0153',
    ciudad: 'Oslo',
    dias: ['Ver web'],
    horario: 'Ver web',
    nivel: 'Todos los niveles',
    etiquetas: ['Gratis', 'Inscripción', 'Pausado'],
    estado: 'Pausado',
    fuente: 'https://www.alfaskolen.no/blog/sprakkafe/',
    ultimaRevision: '2026-06-01'
  },

  // ── SAGENE ──────────────────────────────────────────────────
  {
    id: 'act_27',
    organizationId: 'org_sagene',
    nombre: 'Sagene Frivilligsentral Språkkafé',
    slug: 'sagene-spraakkafe',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Drop-in. Ambiente familiar y comunitario. Ideal para familias y personas que buscan un ambiente cálido.',
    direccion: 'Sandakerveien 61, 0477 Oslo',
    barrio: 'Sagene',
    codigoPostal: '0477',
    ciudad: 'Oslo',
    dias: ['Domingo'],
    horario: '13:00–16:00',
    nivel: 'A1+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://sagene.frivilligsentral.no',
    ultimaRevision: '2026-06-01'
  },

  // ── TØYEN ────────────────────────────────────────────────────
  {
    id: 'act_41',
    organizationId: 'org_haugerud',
    nombre: 'Tøyen Frivilligsentral Språkkafé',
    slug: 'toyen-frivilligsentral-spraakkafe',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Dos ofertas: språkkafé propio en K1 + colaboración con Deichman Tøyen (lun 17-19). Åpen dør viernes 12-14 en K1.',
    direccion: 'Kolstadgata 1 (Aktivitetshuset K1), Oslo',
    barrio: 'Tøyen / Gamle Oslo',
    codigoPostal: '0652',
    ciudad: 'Oslo',
    dias: ['Lunes'],
    horario: 'Se anuncian en Facebook',
    nivel: 'A1+',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://frivillig.no/tyen-frivilligsentral',
    ultimaRevision: '2026-06-01'
  },

  // ── OTRAS ACTIVIDADES ──────────────────────────────────────
  {
    id: 'act_42',
    organizationId: 'org_norskstart',
    nombre: 'Norsk Start Oslo – Tirsdagskafé',
    slug: 'norsk-start-tirsdagskafe',
    categoria: 'Intercambio de Idiomas',
    modalidad: 'Presencial',
    descripcion: 'Cuadernillos nuevos cada semana (A1-B2). Antes solo para refugiados, ahora abierto a todos los inmigrantes.',
    direccion: 'Pilestredet 52, 0167 Oslo (OsloMet campus Pilestredet)',
    barrio: 'Sentrum / St. Hanshaugen',
    codigoPostal: '0167',
    ciudad: 'Oslo',
    dias: ['Martes'],
    horario: '17:00–18:30',
    nivel: 'A1–B2',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.norskstart.no/aktiviteter-oslo',
    ultimaRevision: '2026-06-01'
  },
  {
    id: 'act_32',
    organizationId: 'org_norskstart',
    nombre: 'UiO Språkkafé',
    slug: 'uio-spraakkafe',
    categoria: 'Språkkafé',
    modalidad: 'Presencial',
    descripcion: 'Varias fechas por semestre. Bueno para estudiantes de intercambio. Ver fechas en la web de la UiO.',
    direccion: 'Litteratursalongen, Georg Sverdrups hus, Blindern',
    barrio: 'Blindern / Nordre Aker',
    codigoPostal: '0371',
    ciudad: 'Oslo',
    dias: ['Variable'],
    horario: '17:00–19:00',
    nivel: 'Todos los niveles',
    etiquetas: ['Gratis', 'Drop-in'],
    estado: 'Activo',
    fuente: 'https://www.uio.no/livet-rundt-studiene/arrangementer/knutepunktet/spraakkafe-05-mars-v26.html',
    ultimaRevision: '2026-06-01'
  }
];

// ============================================================
// 2. COMPONENTES
// ============================================================

// Badge de Estado
const StatusBadge = ({ estado }) => {
  const config = {
    'Activo': { color: '#16a34a', bg: '#dcfce7', icon: '✅' },
    'Pausado': { color: '#d97706', bg: '#fef9c3', icon: '⏸️' },
    'Cerrado': { color: '#dc2626', bg: '#fee2e2', icon: '🔴' },
    'Confirmar': { color: '#6b7280', bg: '#f3f4f6', icon: '❓' }
  };
  const style = config[estado] || config['Confirmar'];
  return (
    <span style={{
      fontSize: '0.7rem',
      padding: '0.2rem 0.6rem',
      borderRadius: '20px',
      backgroundColor: style.bg,
      color: style.color,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem'
    }}>
      {style.icon} {estado}
    </span>
  );
};

// Badge de Etiqueta
const TagBadge = ({ tag }) => {
  const colors = {
    'Gratis': { bg: '#dcfce7', color: '#166534' },
    'Drop-in': { bg: '#f0fdf4', color: '#15803d' },
    'Inscripción': { bg: '#fef9c3', color: '#854d0e' },
    'Solo mujeres': { bg: '#fce7f3', color: '#9d174d' },
    'Pausado': { bg: '#fee2e2', color: '#991b1b' }
  };
  const style = colors[tag] || { bg: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      fontSize: '0.65rem',
      padding: '0.15rem 0.5rem',
      borderRadius: '20px',
      backgroundColor: style.bg,
      color: style.color,
      fontWeight: 600
    }}>
      {tag}
    </span>
  );
};

// Tarjeta de Actividad
const ActivityCard = ({ activity, organization, onClick }) => {
  const getModalidadIcon = () => {
    if (activity.modalidad === 'Digital') return '💻';
    if (activity.modalidad === 'Híbrido') return '🔄';
    return '📍';
  };

  const getCategoriaIcon = () => {
    if (activity.categoria === 'Språkkafé') return '☕';
    if (activity.categoria === 'Norsktrening') return '📝';
    if (activity.categoria === 'Intercambio de Idiomas') return '🔄';
    return '💬';
  };

  return (
    <div
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        border: '1.5px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#1a4a7a';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#e2e8f0';
      }}
    >
      <div style={{ padding: '1rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{getCategoriaIcon()}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.3 }}>
                {activity.nombre}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
                <span style={{ fontSize: '0.8rem' }}>{organization?.logo || '🏢'}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{organization?.nombre}</span>
                {organization?.verificada && (
                  <CheckCircle size={14} color="#16a34a" />
                )}
              </div>
            </div>
          </div>
          <StatusBadge estado={activity.estado} />
        </div>

        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={14} color="#1a4a7a" />
            <span>{activity.barrio}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>• {activity.codigoPostal}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={14} color="#1a4a7a" />
            <span>{activity.dias.join(', ')}</span>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>• {activity.horario}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Users size={14} color="#1a4a7a" />
            <span>Nivel: {activity.nivel}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.15rem' }}>
            <span style={{ fontSize: '0.8rem' }}>{getModalidadIcon()}</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{activity.modalidad}</span>
            <span style={{ marginLeft: 'auto', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {activity.etiquetas.slice(0, 3).map(tag => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </span>
          </div>
        </div>
      </div>

      <div style={{
        padding: '0.75rem 1rem',
        borderTop: '1px solid #f1f5f9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8fafc'
      }}>
        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
          ✅ Revisado: {activity.ultimaRevision}
        </span>
        <span style={{
          fontSize: '0.8rem',
          color: '#1a4a7a',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          Ver actividad <ChevronRight size={16} />
        </span>
      </div>
    </div>
  );
};

// Página de Detalle
const ActivityDetail = ({ activity, organization, onClose }) => {
  if (!activity) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: '1rem',
            right: '1rem',
            float: 'right',
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid #e2e8f0',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1rem',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{ padding: '0 2rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#1e293b' }}>
                {activity.nombre}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{organization?.logo || '🏢'}</span>
                <span style={{ fontSize: '1rem', color: '#374151', fontWeight: 600 }}>{organization?.nombre}</span>
                {organization?.verificada && (
                  <span style={{ fontSize: '0.8rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle size={16} /> Verificada
                  </span>
                )}
              </div>
            </div>
            <StatusBadge estado={activity.estado} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a4a7a', marginBottom: '0.75rem' }}>Información</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <MapPin size={18} color="#1a4a7a" style={{ marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{activity.direccion}</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{activity.barrio} • {activity.codigoPostal}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <Calendar size={18} color="#1a4a7a" style={{ marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{activity.dias.join(' y ')}</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{activity.horario}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <Users size={18} color="#1a4a7a" style={{ marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Nivel</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{activity.nivel}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <Globe size={18} color="#1a4a7a" style={{ marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Modalidad</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{activity.modalidad}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <Monitor size={18} color="#1a4a7a" style={{ marginTop: '0.15rem' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>Categoría</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{activity.categoria}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Descripción</h4>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>{activity.descripcion}</p>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Etiquetas</h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {activity.etiquetas.map(tag => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a4a7a', marginBottom: '0.75rem' }}>Contacto y Enlaces</h3>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                {organization?.webOficial && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Web oficial</div>
                    <a href={organization.webOficial} target="_blank" rel="noopener noreferrer" style={{ color: '#1a4a7a', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {organization.webOficial} <ExternalLink size={14} />
                    </a>
                  </div>
                )}

                {organization?.emailContacto && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Email</div>
                    <a href={`mailto:${organization.emailContacto}`} style={{ color: '#1a4a7a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Mail size={14} /> {organization.emailContacto}
                    </a>
                  </div>
                )}

                {organization?.telefono && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Teléfono</div>
                    <a href={`tel:${organization.telefono}`} style={{ color: '#1a4a7a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Phone size={14} /> {organization.telefono}
                    </a>
                  </div>
                )}

                {activity.fuente && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.2rem' }}>Fuente de información</div>
                    <a href={activity.fuente} target="_blank" rel="noopener noreferrer" style={{ color: '#1a4a7a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <ExternalLink size={14} /> Ver fuente original
                    </a>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1.5rem', background: '#f0f7ff', padding: '1rem', borderRadius: '8px', border: '1.5px solid #bfdbfe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={18} color="#16a34a" />
                  <span style={{ fontWeight: 700, color: '#1a4a7a' }}>Sistema de Confianza</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#374151' }}>
                  <div>✅ Última revisión: <strong>{activity.ultimaRevision}</strong></div>
                  <div>🏷️ Fuente: <strong>{organization?.nombre}</strong></div>
                  {organization?.verificada && (
                    <div>✅ Organización verificada</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Búsqueda
const SearchBar = ({ onSearch }) => {
  const [postalCode, setPostalCode] = useState('');
  const [day, setDay] = useState('');
  const [modalidad, setModalidad] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ postalCode, day, modalidad });
  };

  return (
    <form onSubmit={handleSearch} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr auto',
      gap: '0.75rem',
      background: 'white',
      padding: '1.25rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>
          <MapPin size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
          ¿Dónde estás?
        </label>
        <input
          type="text"
          placeholder="Código postal o barrio"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '1.5px solid #cbd5e1',
            borderRadius: '8px',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>
          <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
          ¿Cuándo puedes?
        </label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '1.5px solid #cbd5e1',
            borderRadius: '8px',
            fontSize: '0.9rem',
            outline: 'none',
            backgroundColor: 'white'
          }}
        >
          <option value="">Cualquier día</option>
          <option value="Lunes">Lunes</option>
          <option value="Martes">Martes</option>
          <option value="Miércoles">Miércoles</option>
          <option value="Jueves">Jueves</option>
          <option value="Viernes">Viernes</option>
          <option value="Sábado">Sábado</option>
          <option value="Domingo">Domingo</option>
        </select>
      </div>

      <div>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>
          <Monitor size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
          Modalidad
        </label>
        <select
          value={modalidad}
          onChange={(e) => setModalidad(e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '1.5px solid #cbd5e1',
            borderRadius: '8px',
            fontSize: '0.9rem',
            outline: 'none',
            backgroundColor: 'white'
          }}
        >
          <option value="">Todas</option>
          <option value="Presencial">Presencial</option>
          <option value="Digital">Digital</option>
          <option value="Híbrido">Híbrido</option>
        </select>
      </div>

      <button type="submit" style={{
        padding: '0.6rem 1.5rem',
        background: '#1a4a7a',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '0.95rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        alignSelf: 'flex-end',
        whiteSpace: 'nowrap'
      }}>
        <Search size={18} />
        Buscar
      </button>
    </form>
  );
};

// Componente de Filtros
const Filters = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={() => setShowFilters(!showFilters)}
        style={{
          padding: '0.5rem 1rem',
          background: 'white',
          border: '1.5px solid #cbd5e1',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          color: '#374151'
        }}
      >
        <Filter size={18} />
        Filtros avanzados
        {showFilters ? ' ▲' : ' ▼'}
      </button>

      {showFilters && (
        <div style={{
          marginTop: '0.75rem',
          padding: '1rem',
          background: 'white',
          borderRadius: '8px',
          border: '1.5px solid #e2e8f0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Barrio</label>
            <input
              type="text"
              placeholder="Filtrar por barrio"
              value={filters.barrio}
              onChange={(e) => onFilterChange('barrio', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1.5px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Categoría</label>
            <select
              value={filters.categoria}
              onChange={(e) => onFilterChange('categoria', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1.5px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.85rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Todas</option>
              <option value="Språkkafé">Språkkafé</option>
              <option value="Norsktrening">Norsktrening</option>
              <option value="Intercambio de Idiomas">Intercambio de Idiomas</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Nivel</label>
            <select
              value={filters.nivel}
              onChange={(e) => onFilterChange('nivel', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1.5px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.85rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Todos</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="Todos los niveles">Todos los niveles</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Estado</label>
            <select
              value={filters.estado}
              onChange={(e) => onFilterChange('estado', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1.5px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.85rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Pausado">Pausado</option>
              <option value="Confirmar">Confirmar</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Etiquetas</label>
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
              {['Gratis', 'Drop-in', 'Inscripción', 'Solo mujeres'].map(tag => (
                <label key={tag} style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.etiquetas.includes(tag)}
                    onChange={() => onFilterChange('etiquetas', tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// 3. APP PRINCIPAL
// ============================================================

function App() {
  const [searchParams, setSearchParams] = useState({
    postalCode: '',
    day: '',
    modalidad: ''
  });

  const [filters, setFilters] = useState({
    barrio: '',
    categoria: '',
    nivel: '',
    estado: '',
    etiquetas: []
  });

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [view, setView] = useState('grid');

  // Obtener organización por ID
  const getOrganization = (orgId) => {
    return ORGANIZATIONS.find(org => org.id === orgId);
  };

  // Filtrar actividades
  const filteredActivities = useMemo(() => {
    return ACTIVITIES.filter(activity => {
      // Búsqueda por código postal o barrio
      if (searchParams.postalCode) {
        const search = searchParams.postalCode.toLowerCase();
        if (!activity.codigoPostal.includes(search) && !activity.barrio.toLowerCase().includes(search)) {
          return false;
        }
      }

      // Búsqueda por día
      if (searchParams.day) {
        if (!activity.dias.some(d => d.includes(searchParams.day))) {
          return false;
        }
      }

      // Búsqueda por modalidad
      if (searchParams.modalidad) {
        if (activity.modalidad !== searchParams.modalidad) {
          return false;
        }
      }

      // Filtros
      if (filters.barrio && !activity.barrio.toLowerCase().includes(filters.barrio.toLowerCase())) {
        return false;
      }

      if (filters.categoria && activity.categoria !== filters.categoria) {
        return false;
      }

      if (filters.nivel) {
        if (filters.nivel === 'Todos los niveles') {
          if (activity.nivel !== 'Todos los niveles') return false;
        } else {
          if (!activity.nivel.includes(filters.nivel)) return false;
        }
      }

      if (filters.estado && activity.estado !== filters.estado) {
        return false;
      }

      if (filters.etiquetas.length > 0) {
        if (!filters.etiquetas.every(tag => activity.etiquetas.includes(tag))) {
          return false;
        }
      }

      return true;
    });
  }, [searchParams, filters]);

  // Estadísticas
  const stats = {
    total: ACTIVITIES.length,
    activos: ACTIVITIES.filter(a => a.estado === 'Activo').length,
    gratis: ACTIVITIES.filter(a => a.etiquetas.includes('Gratis')).length,
    barrios: [...new Set(ACTIVITIES.map(a => a.barrio))].length,
    organizaciones: ORGANIZATIONS.length
  };

  // Handler para el cambio de filtros
  const handleFilterChange = (key, value) => {
    if (key === 'etiquetas') {
      setFilters(prev => ({
        ...prev,
        etiquetas: prev.etiquetas.includes(value)
          ? prev.etiquetas.filter(t => t !== value)
          : [...prev.etiquetas, value]
      }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      minHeight: '100vh',
      backgroundColor: '#f0f4f8'
    }}>
      {/* HEADER */}
      <header style={{
        background: 'linear-gradient(135deg, #0f2d5a 0%, #1a4a7a 60%, #1e6fa8 100%)',
        color: 'white',
        padding: '3rem 1.5rem'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '3rem' }}>🇳🇴</span>
            <h1 style={{ margin: 0, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Språkkafé.no
            </h1>
          </div>
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', opacity: 0.9, margin: '0 0 0.5rem', fontWeight: 300 }}>
            Encuentra tu lugar para practicar noruego
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', opacity: 0.75, margin: 0 }}>
            Bibliotecas, ONG, cafés y grupos de conversación cerca de ti.
          </p>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div style={{ maxWidth: '1100px', margin: '-1.5rem auto 0', padding: '0 1rem', position: 'relative', zIndex: 10 }}>
        <SearchBar onSearch={setSearchParams} />
      </div>

      {/* STATS */}
      <div style={{ maxWidth: '1100px', margin: '2rem auto 0', padding: '0 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          background: 'white',
          padding: '1.25rem',
          borderRadius: '12px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
        }}>
          {[
            { label: 'Actividades', value: stats.total, icon: '📍' },
            { label: 'Activas', value: stats.activos, icon: '✅' },
            { label: 'Gratuitas', value: stats.gratis, icon: '🆓' },
            { label: 'Barrios', value: stats.barrios, icon: '🗺️' },
            { label: 'Organizaciones', value: stats.organizaciones, icon: '🏢' }
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a4a7a' }}>
                {s.icon} {s.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth: '1100px', margin: '1.5rem auto 0', padding: '0 1rem' }}>
        <Filters filters={filters} onFilterChange={handleFilterChange} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
            {filteredActivities.length} resultado{filteredActivities.length !== 1 ? 's' : ''}
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[
              ['grid', '⊞', 'Cuadrícula'],
              ['list', '☰', 'Lista']
            ].map(([v, icon, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '7px',
                  border: '1.5px solid',
                  borderColor: view === v ? '#1a4a7a' : '#cbd5e1',
                  background: view === v ? '#1a4a7a' : 'white',
                  color: view === v ? 'white' : '#374151',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem 2rem' }}>
        <div style={{
          display: view === 'grid' ? 'grid' : 'flex',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          flexDirection: view === 'list' ? 'column' : undefined,
          gap: '1rem'
        }}>
          {filteredActivities.map(activity => {
            const org = getOrganization(activity.organizationId);
            return (
              <ActivityCard
                key={activity.id}
                activity={activity}
                organization={org}
                onClick={() => setSelectedActivity(activity)}
              />
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <div style={{ fontSize: '3rem' }}>🔍</div>
            <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>No se encontraron actividades con estos filtros.</p>
            <p style={{ fontSize: '0.9rem' }}>Prueba a ajustar los filtros o la búsqueda.</p>
          </div>
        )}
      </main>

      {/* DETAIL VIEW */}
      {selectedActivity && (
        <ActivityDetail
          activity={selectedActivity}
          organization={getOrganization(selectedActivity.organizationId)}
          onClose={() => setSelectedActivity(null)}
        />
      )}

      {/* FOOTER */}
      <footer style={{ background: '#1e293b', color: '#94a3b8', padding: '2rem 1.5rem', marginTop: '2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '0.75rem' }}>🔑 Fuentes principales</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>• Deichman Bibliotek</li>
                <li>• Røde Kors Norge</li>
                <li>• Caritas Norge</li>
                <li>• Norsk Start Oslo</li>
                <li>• Frivilligsentraler</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '0.75rem' }}>📅 Sistema de confianza</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>✓ Información verificada</li>
                <li>✓ Fuentes oficiales</li>
                <li>✓ Revisiones regulares</li>
                <li>✓ Estado actualizado</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '0.75rem' }}>💡 Consejos</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>• Empieza con Røde Kors (sin inscripción)</li>
                <li>• Deichman: verifica antes de ir</li>
                <li>• Norsk Start: ideal para estudiantes</li>
                <li>• Caritas: estructura + conversación</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #334155', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span>Última actualización: <strong style={{ color: 'white' }}>Junio 2026</strong></span>
            <span>🇳🇴 Directorio para integración · Uso libre</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
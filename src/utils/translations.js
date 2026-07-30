export const DAYS = {
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado",
  Sunday: "Domingo"
};

export const LEVELS = {
  all: "Todos los niveles",
  A1: "A1 — Principiante",
  A2: "A2 — Básico",
  B1: "B1 — Intermedio",
  B2: "B2 — Intermedio alto"
};

export const ACTIVITY_CATEGORIES = {
  "language-practice": "Práctica de noruego",
  "language-cafe": "Café de idiomas",
  employment: "Empleo y orientación",
  community: "Cultura y comunidad",
  nature: "Naturaleza y paseos",
  sport: "Deporte",
  women: "Actividades para mujeres",
  digital: "Digital"
};

export const TRANSLATIONS_BY_LOCALE = {
  es: { days: DAYS, levels: LEVELS, categories: ACTIVITY_CATEGORIES },
  en: {
    days: {
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
      Saturday: "Saturday",
      Sunday: "Sunday",
    },
    levels: {
      all: "All levels",
      A1: "A1 — Beginner",
      A2: "A2 — Elementary",
      B1: "B1 — Intermediate",
      B2: "B2 — Upper intermediate",
    },
    categories: {
      "language-practice": "Norwegian practice",
      "language-cafe": "Language café",
      employment: "Employment and guidance",
      community: "Culture and community",
      nature: "Nature and walks",
      sport: "Sport",
      women: "Activities for women",
      digital: "Online",
    },
  },
};

export function getUiTranslations(locale) {
  return TRANSLATIONS_BY_LOCALE[locale] || TRANSLATIONS_BY_LOCALE.es;
}

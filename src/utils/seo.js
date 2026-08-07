const SITE_URL = "https://sprakkafe-oslo.vercel.app";
const SITE_NAME = "Språkkafé Oslo";

const schemaDays = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
};

const spanishDays = {
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
  Sunday: "domingo",
};

export function getHomeSeo(activities, locale) {
  const pathname = `/${locale}`;
  const isEnglish = locale === "en";
  return {
    pathname,
    title: isEnglish
      ? "Språkkafé Oslo — Practise Norwegian and connect"
      : "Språkkafé Oslo — Practica noruego y conecta",
    description: isEnglish
      ? "Find free activities in Oslo where you can practise Norwegian, meet people and take part in the community."
      : "Encuentra actividades gratuitas en Oslo para practicar noruego, conocer personas y sentirte parte de la comunidad.",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: SITE_NAME,
          url: `${SITE_URL}${pathname}`,
          inLanguage: locale,
        },
        {
          "@type": "ItemList",
          name: isEnglish ? "Free activities in Oslo" : "Actividades gratuitas en Oslo",
          itemListElement: activities.map((activity, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: activity.name,
            url: `${SITE_URL}${pathname}/activity/${encodeURIComponent(activity.id)}`,
          })),
        },
      ],
    },
  };
}

export function getActivitiesSeo(activities, locale) {
  const pathname = `/${locale}/activities`;
  const isEnglish = locale === "en";
  return {
    pathname,
    title: isEnglish
      ? `All activities in Oslo | ${SITE_NAME}`
      : `Todas las actividades en Oslo | ${SITE_NAME}`,
    description: isEnglish
      ? "Browse available activities in Oslo where you can practise Norwegian, meet people and take part in the community."
      : "Consulta las actividades disponibles en Oslo para practicar noruego, conocer personas y participar en la comunidad.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: isEnglish ? "Activities in Oslo" : "Actividades en Oslo",
      url: `${SITE_URL}${pathname}`,
      inLanguage: locale,
      itemListElement: activities.map((activity, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: activity.name,
        url: `${SITE_URL}/${locale}/activity/${encodeURIComponent(activity.id)}`,
      })),
    },
  };
}

export function getGuidesSeo(guides, locale) {
  const pathname = `/${locale}/guides`;
  const isEnglish = locale === "en";
  const title = isEnglish ? "Practical guides for newcomers" : "Guías prácticas para personas recién llegadas";
  const description = isEnglish
    ? "Practical guides to help you prepare for language cafés, practise Norwegian and take part in community activities in Oslo."
    : "Guías prácticas para prepararte antes de un Språkkafé, practicar noruego y participar en actividades comunitarias en Oslo.";

  return {
    pathname,
    title: `${title} | ${SITE_NAME}`,
    description,
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      description,
      url: `${SITE_URL}${pathname}`,
      inLanguage: locale,
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: `${SITE_URL}${pathname}/${encodeURIComponent(guide.slug)}`,
      })),
    },
  };
}

export function getGuideSeo(guide, locale) {
  const pathname = `/${locale}/guides/${encodeURIComponent(guide.slug)}`;
  return {
    pathname,
    title: `${guide.title} | ${SITE_NAME}`,
    description: guide.description,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      url: `${SITE_URL}${pathname}`,
      inLanguage: locale,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
      publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
    },
  };
}

export function getActivitySeo(activity, organization, locale) {
  const pathname = `/${locale}/activity/${encodeURIComponent(activity.id)}`;
  const isEnglish = locale === "en";
  const visibleDay = isEnglish ? activity.day : spanishDays[activity.day] || activity.day;
  const schedule = [visibleDay, activity.time].filter(Boolean).join(" · ");
  const description = [
    activity.description,
    schedule && (isEnglish ? `Schedule: ${schedule}.` : `Horario: ${schedule}.`),
    activity.district && `${activity.district}, Oslo.`,
  ].filter(Boolean).join(" ");
  const eventSchedule = activity.day && activity.time ? {
    "@type": "Schedule",
    repeatFrequency: "P1W",
    byDay: schemaDays[activity.day],
    startTime: activity.time,
    endTime: activity.endTime || undefined,
    scheduleTimezone: "Europe/Oslo",
    startDate: activity.availableFrom || undefined,
    endDate: activity.availableUntil || undefined,
  } : undefined;

  return {
    pathname,
    title: `${activity.name} — ${activity.district || "Oslo"} | ${SITE_NAME}`,
    description,
    schema: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: activity.name,
      description: activity.description,
      url: `${SITE_URL}${pathname}`,
      inLanguage: locale,
      isAccessibleForFree: activity.cost === "free" ? true : undefined,
      eventAttendanceMode: activity.address
        ? "https://schema.org/OfflineEventAttendanceMode"
        : "https://schema.org/OnlineEventAttendanceMode",
      eventSchedule,
      location: activity.address ? {
        "@type": "Place",
        name: activity.district || "Oslo",
        address: activity.address,
      } : {
        "@type": "VirtualLocation",
        url: activity.registrationUrl || activity.sourceUrl,
      },
      organizer: organization ? {
        "@type": "Organization",
        name: organization.name,
        url: `${SITE_URL}/${locale}/organization/${encodeURIComponent(organization.id)}`,
      } : undefined,
      sameAs: activity.sourceUrl || undefined,
    },
  };
}

export function getOrganizationSeo(organization, locale) {
  const pathname = `/${locale}/organization/${encodeURIComponent(organization.id)}`;
  const isEnglish = locale === "en";
  return {
    pathname,
    title: `${organization.name} — ${isEnglish ? "activities in Oslo" : "actividades en Oslo"} | ${SITE_NAME}`,
    description: organization.description,
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: organization.name,
      description: organization.description,
      url: `${SITE_URL}${pathname}`,
      email: organization.email || undefined,
      telephone: organization.phone || undefined,
      sameAs: [organization.website, organization.facebook].filter(Boolean),
    },
  };
}

export function getInformationSeo(slug, content, locale) {
  const pathname = `/${locale}/info/${encodeURIComponent(slug)}`;
  const counterparts = {
    proyecto: "project",
    metodologia: "methodology",
    privacidad: "privacy",
    project: "proyecto",
    methodology: "metodologia",
    privacy: "privacidad",
    uso: "terms",
    terms: "uso",
  };
  const otherLocale = locale === "en" ? "es" : "en";
  return {
    pathname,
    alternatePath: `/${otherLocale}/info/${counterparts[slug]}`,
    title: `${content.title} | ${SITE_NAME}`,
    description: content.intro,
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.title,
      description: content.intro,
      url: `${SITE_URL}${pathname}`,
      inLanguage: locale,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
      publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/${locale}` },
    },
  };
}

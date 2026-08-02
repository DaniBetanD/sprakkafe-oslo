import { getUiTranslations } from "./translations.js";

export function getActivityDays(activity) {
  return activity.days || [activity.day];
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function activityMatchesQuery(activity, organization, query, locale = "es") {
  const normalizedQuery = normalizeSearchText(query.trim());
  if (!normalizedQuery) {
    return true;
  }

  const { categories, days, levels } = getUiTranslations(locale);
  const activityDays = getActivityDays(activity);
  const searchableText = [
    activity.name,
    organization?.name,
    activity.district,
    activity.level,
    levels[activity.level],
    activity.category,
    categories[activity.category],
    ...activityDays,
    ...activityDays.map((day) => days[day]),
  ].join(" ");

  return normalizeSearchText(searchableText).includes(normalizedQuery);
}

export function getScheduleLabel(activity, locale = "es") {
  const { days: dayLabels } = getUiTranslations(locale);
  const conjunction = locale === "en" ? " and " : " y ";
  const days = getActivityDays(activity).map((day) => dayLabels[day] || day).join(conjunction);
  const hours = activity.endTime ? `${activity.time}–${activity.endTime}` : activity.time;
  return `${days} · ${hours}`;
}

export function getActivityAvailability(activity, date = new Date()) {
  if (activity.availableFrom && date < new Date(`${activity.availableFrom}T00:00:00`)) {
    return "upcoming";
  }
  if (activity.availableUntil && date > new Date(`${activity.availableUntil}T23:59:59`)) {
    return "expired";
  }
  if (activity.status === "paused") {
    return "paused";
  }
  return "active";
}

export function isActivityAvailableOn(activity, date = new Date()) {
  return getActivityAvailability(activity, date) === "active";
}

export function isActivityListed(activity, date = new Date()) {
  return getActivityAvailability(activity, date) !== "expired";
}

export function isActivityVisible(activity, date = new Date()) {
  const availability = getActivityAvailability(activity, date);

  if (availability === "expired") {
    return false;
  }
  if (availability !== "upcoming" || !activity.availableFrom) {
    return true;
  }

  const visibleFrom = new Date(`${activity.availableFrom}T00:00:00`);
  visibleFrom.setDate(visibleFrom.getDate() - 3);
  return date >= visibleFrom;
}

export function getDaysUntilAvailableFrom(activity, date = new Date()) {
  if (!activity.availableFrom) {
    return null;
  }

  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  const availableFrom = new Date(`${activity.availableFrom}T00:00:00`);
  return Math.round((availableFrom - today) / (24 * 60 * 60 * 1000));
}

export function getDaysUntilAvailableUntil(activity, date = new Date()) {
  if (!activity.availableUntil) {
    return null;
  }

  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  const availableUntil = new Date(`${activity.availableUntil}T00:00:00`);
  return Math.round((availableUntil - today) / (24 * 60 * 60 * 1000));
}

export function shouldShowAvailableUntil(activity, date = new Date()) {
  const daysUntilEnd = getDaysUntilAvailableUntil(activity, date);
  return daysUntilEnd !== null && daysUntilEnd >= 0 && daysUntilEnd <= 7;
}

export function formatAvailableWeekday(date, locale = "es") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es-ES", {
    weekday: "long",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatAvailableFrom(date, locale = "es") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es-ES", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatCheckedDate(date, locale = "es") {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

import { DAYS } from "./translations.js";

export function getActivityDays(activity) {
  return activity.days || [activity.day];
}

export function getScheduleLabel(activity) {
  const days = getActivityDays(activity).map((day) => DAYS[day] || day).join(" y ");
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

export function formatAvailableFrom(date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatCheckedDate(date) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

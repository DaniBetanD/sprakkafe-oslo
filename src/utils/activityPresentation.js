import { DAYS } from "./translations";

export function getActivityDays(activity) {
  return activity.days || [activity.day];
}

export function getScheduleLabel(activity) {
  const days = getActivityDays(activity).map((day) => DAYS[day] || day).join(" y ");
  const hours = activity.endTime ? `${activity.time}–${activity.endTime}` : activity.time;
  return `${days} · ${hours}`;
}

export function isActivityAvailableOn(activity, date = new Date()) {
  if (activity.status !== "upcoming" || !activity.availableFrom) return true;
  return date >= new Date(`${activity.availableFrom}T00:00:00`);
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

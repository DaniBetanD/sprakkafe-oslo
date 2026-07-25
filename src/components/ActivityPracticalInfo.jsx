import { CalendarClock, CircleDollarSign, ClipboardCheck, UserRoundCheck, UsersRound } from "lucide-react";
import { formatAvailableFrom, formatCheckedDate, getActivityAvailability } from "../utils/activityPresentation";

export default function ActivityPracticalInfo({ activity, compact = false }) {
  const availability = getActivityAvailability(activity);
  const items = [
    availability === "upcoming" && activity.availableFrom && {
      icon: CalendarClock,
      label: `Desde el ${formatAvailableFrom(activity.availableFrom)}`,
      accent: true,
    },
    availability === "expired" && {
      icon: CalendarClock,
      label: "Programación finalizada",
      accent: true,
    },
    activity.availableUntil && {
      icon: CalendarClock,
      label: `Hasta el ${formatAvailableFrom(activity.availableUntil)}`,
      accent: true,
    },
    activity.cost === "free" && {
      icon: CircleDollarSign,
      label: "Gratis",
    },
    activity.registration === "none" && {
      icon: UserRoundCheck,
      label: "Sin inscripción",
    },
    activity.registration === "required" && {
      icon: ClipboardCheck,
      label: "Inscripción necesaria",
    },
    activity.canComeAlone && {
      icon: UsersRound,
      label: "Puedes venir por tu cuenta",
    },
  ].filter(Boolean);

  const visibleItems = compact ? items.slice(0, 3) : items;

  return (
    <div className={compact ? "flex flex-wrap gap-1.5" : "space-y-4"}>
      <div className="flex flex-wrap gap-2">
        {visibleItems.map(({ icon: Icon, label, accent }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${
              accent ? "bg-amber-50 text-amber-800" : "bg-blue-50 text-blue-700"
            }`}
          >
            <Icon size={14} aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>

      {!compact && (
        <>
          <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm leading-relaxed">
            {activity.format && (
              <div>
                <p className="font-semibold text-gray-900">Qué puedes esperar</p>
                <p className="mt-0.5 text-gray-600">{activity.format}</p>
              </div>
            )}
            {activity.arrivalAdvice && (
              <div>
                <p className="font-semibold text-gray-900">Antes de ir</p>
                <p className="mt-0.5 text-gray-600">{activity.arrivalAdvice}</p>
              </div>
            )}
            {activity.seasonNote && (
              <div>
                <p className="font-semibold text-gray-900">Información temporal</p>
                <p className="mt-0.5 text-gray-600">{activity.seasonNote}</p>
              </div>
            )}
          </div>
          {activity.lastChecked && (
            <p className="text-xs text-gray-500">
              Información revisada el {formatCheckedDate(activity.lastChecked)}.
            </p>
          )}
        </>
      )}
    </div>
  );
}

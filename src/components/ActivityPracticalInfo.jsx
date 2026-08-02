import { CalendarClock, CircleDollarSign, ClipboardCheck, UserRoundCheck, UsersRound } from "lucide-react";
import {
  formatAvailableFrom,
  formatAvailableWeekday,
  formatCheckedDate,
  getActivityAvailability,
  getDaysUntilAvailableFrom,
} from "../utils/activityPresentation";
import { useLanguage } from "../i18n/LanguageContext";

export default function ActivityPracticalInfo({ activity, compact = false }) {
  const { locale, t } = useLanguage();
  const availability = getActivityAvailability(activity);
  const daysUntilStart = getDaysUntilAvailableFrom(activity);
  let upcomingLabel = null;

  if (activity.availableFrom) {
    if (daysUntilStart === 1) {
      upcomingLabel = t("startsTomorrow");
    } else if (daysUntilStart >= 2 && daysUntilStart <= 3) {
      upcomingLabel = t("startsNextDay", { day: formatAvailableWeekday(activity.availableFrom, locale) });
    } else {
      upcomingLabel = t("fromDate", { date: formatAvailableFrom(activity.availableFrom, locale) });
    }
  }
  const items = [
    availability === "upcoming" && activity.availableFrom && {
      icon: CalendarClock,
      label: upcomingLabel,
      accent: true,
    },
    availability === "expired" && {
      icon: CalendarClock,
      label: t("scheduleEnded"),
      accent: true,
    },
    activity.availableUntil && {
      icon: CalendarClock,
      label: t("untilDate", { date: formatAvailableFrom(activity.availableUntil, locale) }),
      accent: true,
    },
    activity.cost === "free" && {
      icon: CircleDollarSign,
      label: t("free"),
    },
    activity.registration === "none" && {
      icon: UserRoundCheck,
      label: t("noRegistration"),
    },
    activity.registration === "required" && {
      icon: ClipboardCheck,
      label: t("registrationRequired"),
    },
    activity.canComeAlone && {
      icon: UsersRound,
      label: t("comeAlone"),
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
                <p className="font-semibold text-gray-900">{t("whatToExpect")}</p>
                <p className="mt-0.5 text-gray-600">{activity.format}</p>
              </div>
            )}
            {activity.arrivalAdvice && (
              <div>
                <p className="font-semibold text-gray-900">{t("beforeGoing")}</p>
                <p className="mt-0.5 text-gray-600">{activity.arrivalAdvice}</p>
              </div>
            )}
            {activity.seasonNote && (
              <div>
                <p className="font-semibold text-gray-900">{t("seasonalInformation")}</p>
                <p className="mt-0.5 text-gray-600">{activity.seasonNote}</p>
              </div>
            )}
          </div>
          {activity.lastChecked && (
            <p className="text-xs text-gray-500">
              {t("checkedOn", { date: formatCheckedDate(activity.lastChecked, locale) })}
            </p>
          )}
        </>
      )}
    </div>
  );
}

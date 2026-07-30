import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { getUiTranslations } from "../utils/translations";
import ActivityPracticalInfo from "./ActivityPracticalInfo";
import { getScheduleLabel } from "../utils/activityPresentation";
import { useLanguage } from "../i18n/LanguageContext";

const LEVEL_COLORS = {
    "all": "bg-blue-50 text-blue-700",
    "A1": "bg-green-100 text-green-700",
    "A2": "bg-blue-100 text-blue-700",
    "B1": "bg-purple-100 text-purple-700",
    "B2": "bg-orange-100 text-orange-700",
};

export default function ActivityCard({ activity, organization, onClick, searchContext }) {
    const { locale, pathFor } = useLanguage();

    return (
        <article className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between h-full">
            <div className="space-y-4">
                {/* Cabecera Tarjeta */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                        {organization?.logoImg ? (
                            <img
                                src={new URL(`../assets/logos/${organization.logoImg}`, import.meta.url).href}
                                alt={organization.name}
                                loading="lazy"
                                decoding="async"
                                width="36"
                                height="36"
                                className="w-full h-full object-contain p-0.5"
                            />
                        ) : (
                            <span className="text-xl">{organization?.logo || "🏢"}</span>
                        )}
                    </div>
                    <span className="text-xs font-semibold text-gray-500 truncate max-w-[180px]">
                        {organization?.name}
                    </span>
                </div>

                {/* Título Enlazable con Estado Contextual */}
                <Link 
                    to={pathFor(`/activity/${activity.id}`)}
                    state={{ fromSearch: searchContext }}
                    className="block group min-h-[44px]"
                >
                    <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-blue-600 transition">
                        {activity.name}
                    </h3>
                </Link>

                {/* Meta Info */}
                <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-blue-500 shrink-0" />
                        <span>{getScheduleLabel(activity, locale)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-blue-500 shrink-0" />
                        <span className="truncate">{activity.district}</span>
                    </div>
                </div>

                <ActivityPracticalInfo activity={activity} compact />
            </div>

            {/* Fila Inferior con Nivel y Acceso Rápido Móvil */}
            <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold ${LEVEL_COLORS[activity.level] || "bg-gray-100 text-gray-600"}`}>
                    {getUiTranslations(locale).levels[activity.level]}
                </span>
                
                <button
                    type="button"
                    onClick={onClick}
                    aria-label={`Vista rápida de ${activity.name}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 md:hidden min-h-[44px] px-2 flex items-center"
                >
                    Vista rápida
                </button>
            </div>
        </article>
    );
}

import { MapPin, Calendar } from "lucide-react";
import { DAYS, LEVELS } from "../utils/translations";

const LEVEL_COLORS = {
    "A1": "bg-green-100 text-green-700",
    "A2": "bg-blue-100 text-blue-700",
    "B1": "bg-purple-100 text-purple-700",
    "B2": "bg-orange-100 text-orange-700",
};

export default function ActivityCard({ activity, organization, onClick, isSelected }) {

    const logoSrc = organization?.logoImg
        ? new URL(`../assets/logos/${organization.logoImg}`, import.meta.url).href
        : null;

    // CORREGIDO: Sintaxis de template string ($ en vez de 0) y URL de búsqueda oficial de Google Maps
    const mapsUrl = activity?.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address + ', Oslo')}`
        : null;

    return (
        <div
            onClick={onClick}
            className={`
                bg-white rounded-xl border p-5 cursor-pointer
                hover:shadow-lg hover:border-blue-200 transition-all duration-300
                ${isSelected ? 'ring-2 ring-blue-500 shadow-lg border-blue-200' : 'border-gray-200'}
            `}
        >
            {/* Header: logo + nombre + org */}
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                    {logoSrc ? (
                        <img src={logoSrc} alt={organization?.name} className="w-full h-full object-contain p-1" />
                    ) : (
                        <span className="text-xl">{organization?.logo}</span>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 leading-tight truncate">
                        {activity?.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 truncate">{organization?.name}</p>
                </div>
            </div>

            {/* Descripción */}
            {activity?.description && (
                <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                    {activity.description}
                </p>
            )}

            {/* Día + hora y badge de nivel */}
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Calendar size={14} className="text-blue-500 shrink-0" />
                    <span>
                        {activity?.day && DAYS[activity.day] ? DAYS[activity.day] : ""}{activity?.time ? `, ${activity.time}` : ""}
                    </span>
                </div>
                {activity?.level && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${LEVEL_COLORS[activity.level] || "bg-gray-100 text-gray-600"}`}>
                        {LEVELS[activity.level] || activity.level}
                    </span>
                )}
            </div>

            {/* Ubicación con link a mapa */}
            {/* CORREGIDO: Se añadió la etiqueta de apertura <a ... */}
            {mapsUrl && (
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition group mt-1"
                >
                    <MapPin size={14} className="text-blue-400 shrink-0 group-hover:text-blue-600" />
                    <span className="truncate">{activity?.address}</span>
                </a>
            )}
        </div>
    );
}
import { Calendar, MapPin, Award } from "lucide-react";
import { DAYS, LEVELS } from "../utils/translations";
import { useState } from "react";

export default function ActivityCard({ activity, organization, onClick, isSelected }) {
    const [imgError, setImgError] = useState(false);

    const logoSrc = organization?.logoImg && !imgError
        ? new URL(`../assets/logos/${organization.logoImg}`, import.meta.url).href
        : null;

    return (
        <div
            onClick={onClick}
            className={`
                bg-white rounded-xl border border-gray-200 p-5 cursor-pointer
                hover:shadow-lg hover:border-blue-200 transition-all duration-300
                ${isSelected ? 'ring-2 ring-blue-500 shadow-lg border-blue-200' : ''}
            `}
        >
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                    {logoSrc ? (
                        <img
                            src={logoSrc}
                            alt={organization.name}
                            className="w-full h-full object-contain p-1"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <span className="text-xl">{organization?.logo || '📚'}</span>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 leading-tight truncate">
                        {activity.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{organization?.name}</p>
                </div>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={14} className="text-blue-500 shrink-0" />
                    <span className="truncate">{activity.district}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-blue-500 shrink-0" />
                    <span>{DAYS[activity.day]} · {activity.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <Award size={14} className="text-blue-500 shrink-0" />
                    <span>{LEVELS[activity.level]}</span>
                </div>
            </div>

            {isSelected && (
                <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-blue-600 font-medium">
                    Ver detalles →
                </div>
            )}
        </div>
    );
}
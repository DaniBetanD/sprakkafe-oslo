import { ArrowRight, Calendar, Globe, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";
import { DAYS, LEVELS } from "../utils/translations";

const LEVEL_COLORS = {
  A1: "bg-green-100 text-green-700",
  A2: "bg-blue-100 text-blue-700",
  B1: "bg-purple-100 text-purple-700",
  B2: "bg-orange-100 text-orange-700",
};

export default function DesktopDetailPanel({ selected, organization, onClose }) {
  if (!selected) return null;

  return (
    <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 h-fit sticky top-20 gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
            {organization?.logoImg ? (
              <img
                src={new URL(`../assets/logos/${organization.logoImg}`, import.meta.url).href}
                alt={organization.name}
                className="w-full h-full object-contain p-1"
              />
            ) : (
              <span className="text-xl">{organization?.logo}</span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{selected.name}</h3>
            <p className="text-sm text-gray-500">{organization?.name}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalles de la actividad"
          className="text-gray-400 hover:text-gray-600 transition min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl"
        >
          <X size={18} />
        </button>
      </div>

      <hr className="border-gray-100" />

      <div className="space-y-3">
        {selected.description && (
          <div className="rounded-xl bg-blue-50/40 p-4">
            <p className="text-sm text-gray-700 leading-relaxed">{selected.description}</p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={15} className="text-blue-500 shrink-0" />
            <span>{DAYS[selected.day]}, {selected.time}</span>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${LEVEL_COLORS[selected.level] || "bg-gray-100 text-gray-600"}`}>
            {LEVELS[selected.level]}
          </span>
        </div>

        {selected.address && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${selected.address}, Oslo`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition group"
          >
            <MapPin size={15} className="text-blue-400 shrink-0 group-hover:text-blue-600" />
            <span className="truncate">{selected.address}</span>
          </a>
        )}

        {organization?.description && (
          <>
            <hr className="border-gray-100" />
            <div>
              <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-1">
                🏛️ Sobre la organización
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{organization.description}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <Link
          to={`/activity/${selected.id}`}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-blue-700 transition min-h-[44px]"
        >
          Ver página completa <ArrowRight size={15} />
        </Link>
        <Link
          to={`/organization/${organization?.id}`}
          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-200 transition min-h-[44px]"
        >
          Ver organización
        </Link>
        {organization?.website && (
          <a
            href={organization.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-gray-500 text-sm px-4 py-2 rounded-xl hover:text-gray-700 transition"
          >
            <Globe size={14} /> Sitio web oficial
          </a>
        )}
      </div>
    </div>
  );
}

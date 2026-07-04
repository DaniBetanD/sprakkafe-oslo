import { Link } from "react-router-dom";
import { X, ArrowRight, Globe, MapPin, Calendar } from "lucide-react";
import { DAYS, LEVELS } from "../utils/translations";

const LEVEL_COLORS = {
    "A1": "bg-green-100 text-green-700",
    "A2": "bg-blue-100 text-blue-700",
    "B1": "bg-purple-100 text-purple-700",
    "B2": "bg-orange-100 text-orange-700",
};

export default function MobileDetailPanel({ selected, selectedOrg, onClose }) {
    if (!selected) return null;

    // CORREGIDO: Interpolación de variables con $ en lugar de 0, y uso de la URL de búsquedas tradicional
    const mapsUrl = selected.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.address + ', Oslo')}`
        : null;

    return (
        <div className="md:hidden">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

            {/* Panel desde abajo */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl"
                style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>

                <div className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                                {selectedOrg?.logoImg ? (
                                    <img
                                        src={new URL(`../assets/logos/${selectedOrg.logoImg}`, import.meta.url).href}
                                        alt={selectedOrg.name}
                                        className="w-full h-full object-contain p-1"
                                    />
                                ) : (
                                    <span className="text-xl">{selectedOrg?.logo}</span>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">{selected.name}</h3>
                                <p className="text-sm font-medium text-gray-600">{selectedOrg?.name}</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                            <X size={20} />
                        </button>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Descripción */}
                    {selected.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {selected.description}
                        </p>
                    )}

                    {/* Día + hora y badge nivel */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={14} className="text-blue-500 shrink-0" />
                            <span>{DAYS[selected.day]}, {selected.time}</span>
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${LEVEL_COLORS[selected.level] || "bg-gray-100 text-gray-600"}`}>
                            {LEVELS[selected.level] || selected.level}
                        </span>
                    </div>

                    {/* Ubicación unificada */}
                    {/* CORREGIDO: Se agregó la etiqueta de apertura <a ... */}
                    {mapsUrl && (
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition group"
                        >
                            <MapPin size={14} className="text-blue-400 shrink-0 group-hover:text-blue-600" />
                            <span className="truncate">{selected.address}</span>
                        </a>
                    )}

                    {/* Sobre la organización */}
                    {selectedOrg?.description && (
                        <>
                            <hr className="border-gray-100" />
                            <div>
                                <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-1">
                                    🏛️ Sobre la organización
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedOrg.description}
                                </p>
                            </div>
                        </>
                    )}

                    <hr className="border-gray-100" />

                    {/* Acciones */}
                    <div className="flex flex-col gap-2 pb-2">
                        <Link
                            to={`/activity/${selected.id}`}
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-3 rounded-xl hover:bg-blue-700 transition"
                        >
                            Ver página completa <ArrowRight size={15} />
                        </Link>
                        <Link
                            to={`/organization/${selectedOrg?.id}`}
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-3 rounded-xl hover:bg-gray-200 transition"
                        >
                            Ver organización
                        </Link>
                        {/* CORREGIDO: Se agregó la etiqueta de apertura <a ... */}
                        {selectedOrg?.website && (
                            <a
                                href={selectedOrg.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 text-gray-500 text-sm px-4 py-2 rounded-xl hover:text-gray-700 transition"
                            >
                                <Globe size={14} /> Sitio web oficial
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
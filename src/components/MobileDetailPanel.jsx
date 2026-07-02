import { Link } from "react-router-dom";
import { X, ArrowRight, Globe, MapPin, Calendar, Award } from "lucide-react";
import { DAYS, LEVELS } from "../utils/translations";

export default function MobileDetailPanel({ selected, selectedOrg, onClose }) {
    if (!selected) return null;

    return (
        <div className="md:hidden">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

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
                                <p className="text-sm text-gray-500">{selectedOrg?.name}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Datos */}
                    <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2 text-gray-600 bg-gray-50 rounded-lg p-2.5">
    <MapPin size={14} className="text-blue-500 shrink-0 mt-0.5" />
    <div>
        <span>{selected.district}{selected.address ? ` — ${selected.address}` : ""}</span>
        {selected.address && (
            <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selected.address + ', Oslo')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
                Ver en mapa →
            </a>
        )}
    </div>
</div>
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2.5">
                            <Calendar size={14} className="text-blue-500 shrink-0" />
                            <span>{DAYS[selected.day]} · {selected.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2.5">
                            <Award size={14} className="text-blue-500 shrink-0" />
                            <span>{LEVELS[selected.level]}</span>
                        </div>
                    </div>

                    {selected.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {selected.description}
                        </p>
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
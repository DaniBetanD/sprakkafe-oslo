import { Link } from "react-router-dom";
import { X, ArrowRight, Globe, MapPin, Calendar, Award } from "lucide-react";
import { DAYS, LEVELS } from "../utils/translations";

export default function MobileDetailPanel({ selected, selectedOrg, onClose }) {
    if (!selected) return null;

    return (
        <>
            {/* Overlay oscuro */}
            <div
                className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl p-4 animate-slideUp mobile-panel">
                {/* Handle visual */}
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

                {/* Botón cerrar */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">Detalles</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Contenido */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                            {selectedOrg?.logoImg ? (
                                <img
                                    src={new URL(`../assets/logos/${selectedOrg.logoImg}`, import.meta.url).href}
                                    alt={selectedOrg.name}
                                    className="w-full h-full object-contain p-1"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.textContent = selectedOrg?.logo || '🏛️';
                                    }}
                                />
                            ) : (
                                <span className="text-2xl">{selectedOrg?.logo || '🏛️'}</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 leading-tight text-base truncate">
                                {selected.name}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                                {selectedOrg?.name}
                            </p>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                            <MapPin size={14} className="text-blue-500 shrink-0" />
                            <span className="truncate">{selected.district} {selected.address && `— ${selected.address}`}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                            <Calendar size={14} className="text-blue-500 shrink-0" />
                            <span>{DAYS[selected.day]} · {selected.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                            <Award size={14} className="text-blue-500 shrink-0" />
                            <span>{LEVELS[selected.level]}</span>
                        </div>
                    </div>

                    {selected.description && (
                        <>
                            <hr className="border-gray-100" />
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                {selected.description}
                            </p>
                        </>
                    )}

                    <hr className="border-gray-100" />

                    <div className="flex flex-col gap-2">
                        <Link
                            to={`/activity/${selected.id}`}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium px-4 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-sm"
                            onClick={onClose}
                        >
                            Ver página completa <ArrowRight size={15} />
                        </Link>
                        <Link
                            to={`/organization/${selectedOrg?.id}`}
                            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-3 rounded-xl hover:bg-gray-200 transition"
                            onClick={onClose}
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
        </>
    );
}
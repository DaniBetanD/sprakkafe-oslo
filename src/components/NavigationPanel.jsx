import { X, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavigationPanel({ isOpen, onClose, navLinks, onAction }) {
    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Panel Notion */}
            <aside 
                className={`fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-r border-gray-100 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header: Click en logo te lleva al Home directo y cierra el panel */}
                <div className="p-5 flex items-center justify-between border-b border-gray-50">
                    <Link 
                        to="/" 
                        onClick={onClose}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:opacity-80 transition"
                    >
                        <span className="text-xl">🇳🇴</span>
                        <span className="tracking-tight text-base">Språkkafé</span>
                    </Link>
                    <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition">
                        <X size={18} />
                    </button>
                </div>

                {/* Enlaces sin herfs flotantes vacíos */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navLinks.map((link) => (
                        <a 
                            key={link.id}
                            href={link.type === "scroll" ? `#${link.id}` : link.type === "mail" ? "mailto:hola@sprakkafeoslo.no" : "#"} 
                            onClick={(e) => onAction(e, link)}
                            className="flex items-center gap-3 px-4 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-50 hover:text-blue-600 transition group"
                        >
                            <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
                                {link.icon}
                            </div>
                            <span>{link.label}</span>
                        </a>
                    ))}
                </nav>

                {/* Footer anclado abajo */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 bg-white rounded-xl border border-gray-200/60 shadow-sm">
                        <MapPin size={16} className="text-blue-500" />
                        <span>Oslo</span>
                    </div>
                </div>
            </aside>
        </>
    );
}
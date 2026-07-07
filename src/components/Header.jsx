import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { scrollToId } from "../utils/scrollTo";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (e, targetId) => {
        e.preventDefault();
        setIsOpen(false);

        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: targetId } });
        } else {
            scrollToId(targetId);
        }
    };

    const triggerJoin = () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent("open-subscription-modal"));
    };

    return (
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 w-full">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* F1.6 — LOGO REDISEÑADO DE IDENTIDAD VISUAL EN DOS LÍNEAS */}
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition min-h-[44px] select-none">
                    <span className="text-2xl">🇳🇴</span>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900 leading-tight text-base tracking-tight">Språkkafé</span>
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase leading-none">Oslo</span>
                    </div>
                </Link>

                {/* MENÚ DESKTOP */}
                <nav className="hidden md:flex items-center gap-2">
                    <a
                        href="#actividades"
                        onClick={(e) => handleNavigation(e, "actividades")}
                        className="text-sm font-medium text-gray-600 hover:text-blue-600 px-4 h-11 flex items-center rounded-xl transition"
                    >
                        Actividades
                    </a>
                    <a
                        href="#proyecto"
                        onClick={(e) => handleNavigation(e, "proyecto")}
                        className="text-sm font-medium text-gray-600 hover:text-blue-600 px-4 h-11 flex items-center rounded-xl transition"
                    >
                        Sobre el proyecto
                    </a>
                    <button
                        onClick={triggerJoin}
                        className="ml-2 text-sm font-semibold bg-blue-600 text-white px-5 h-11 flex items-center rounded-xl transition-all duration-150 hover:bg-blue-700 active:scale-95 active:bg-blue-800"
                    >
                        Únete
                    </button>
                </nav>

                {/* BOTÓN HAMBURGUESA (MÓVIL) - 44x44px */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden h-11 w-11 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-gray-50 active:bg-gray-100 rounded-xl transition"
                    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* MENÚ DESPLEGABLE MÓVIL (ESTILO NOTION) */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
                    
                    {/* Bloque Superior: Identificador */}
                    <div className="px-4 py-1 text-sm font-semibold text-gray-400 tracking-wider uppercase select-none">
                        🇳🇴 Språkkafé
                    </div>

                    <hr className="border-gray-100 mx-2" />

                    {/* Bloque Central: Navegación Táctil Viva */}
                    <nav className="space-y-1">
                        <a
                            href="#actividades"
                            onClick={(e) => handleNavigation(e, "actividades")}
                            className="w-full h-12 flex items-center gap-3 text-base font-medium text-gray-700 rounded-xl px-4 transition-all duration-100 active:scale-[0.98] active:bg-gray-50 active:text-blue-600"
                        >
                            <span className="text-lg">🏠</span> Actividades
                        </a>
                        
                        <button
                            onClick={triggerJoin}
                            className="w-full h-12 flex items-center gap-3 text-base font-medium text-gray-700 rounded-xl px-4 text-left transition-all duration-100 active:scale-[0.98] active:bg-gray-50 active:text-blue-600"
                        >
                            <span className="text-lg">❤️</span> Comunidad
                        </button>
                        
                        <a
                            href="#proyecto"
                            onClick={(e) => handleNavigation(e, "proyecto")}
                            className="w-full h-12 flex items-center gap-3 text-base font-medium text-gray-700 rounded-xl px-4 transition-all duration-100 active:scale-[0.98] active:bg-gray-50 active:text-blue-600"
                        >
                            <span className="text-lg">ℹ️</span> Sobre el proyecto
                        </a>

                        <button
                            onClick={triggerJoin}
                            className="w-full h-12 flex items-center gap-3 text-base font-medium text-gray-700 rounded-xl px-4 text-left transition-all duration-100 active:scale-[0.98] active:bg-gray-50 active:text-blue-600"
                        >
                            <span className="text-lg">📩</span> Contacto
                        </button>
                    </nav>

                    <hr className="border-gray-100 mx-2" />

                    {/* Bloque Inferior: Ubicación */}
                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-widest select-none">
                        Oslo
                    </div>
                </div>
            )}
        </header>
    );
}
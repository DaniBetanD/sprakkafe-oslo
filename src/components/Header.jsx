import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { scrollToId } from "../utils/scrollTo";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const closeMenu = () => setIsMenuOpen(false);

    function handleNavClick(e, id) {
        e.preventDefault();
        closeMenu();
        if (location.pathname !== "/") {
            navigate("/");
            // Pequeño delay para asegurar el renderizado de la Home antes del scroll
            setTimeout(() => scrollToId(id), 100);
        } else {
            scrollToId(id);
        }
    }

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm">
                 <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
                        <Link to="/" onClick={(e) => handleNavClick(e, "hero")} className="flex items-center gap-2.5 group">
                           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg transition-transform duration-200 group-hover:scale-105 shrink-0">
                                S
                            </div>
                            <div className="leading-tight">
                                <div className="font-bold text-gray-900 text-base leading-none">Språkkafé</div>
                                <div className="text-xs text-gray-400 font-medium leading-none mt-0.5">Oslo</div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
                            <a href="#actividades" onClick={(e) => handleNavClick(e, "actividades")}
                                className="text-gray-600 hover:text-blue-600 transition-all duration-150 active:scale-95">
                                Actividades
                            </a>

                            <button onClick={() => setShowModal(true)}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition shadow-sm cursor-pointer">
                                Únete a la comunidad
                            </button>
                        </nav>

                        {/* Mobile Burger Trigger */}
                        <div className="md:hidden flex items-center">
                           <button
    className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 active:scale-95 cursor-pointer"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    aria-label="Menu"
>
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Panel (Optimized for 390px) */}
                    <nav
                        className={`
                            md:hidden
                            flex
                            flex-col
                            gap-2
                            overflow-hidden
                            transition-all
                            duration-300
                            ${isMenuOpen ? "max-h-96 opacity-100 mt-4 pt-4 border-t border-gray-100" : "max-h-0 opacity-0"}
                        `}
                    >
                        <a
                            href="#hero"
                            onClick={(e) => handleNavClick(e, "hero")}
                            className="px-4 py-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-150 font-medium"
                        >
                            🏠 Inicio
                        </a>

                        <a
                            href="#actividades"
                            onClick={(e) => handleNavClick(e, "actividades")}
                            className="px-4 py-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-150 font-medium"
                        >
                            📍 Actividades
                        </a>

                       <div className="border-t border-gray-100 mt-3 pt-5" />

                        <button
                            onClick={() => {
                                closeMenu();
                                setShowModal(true);
                            }}
                          className="w-full rounded-xl bg-blue-600 py-4 text-white font-semibold hover:bg-blue-700 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                        >
                            ❤️ Únete a la comunidad
                        </button>
                    </nav>

            </header>

            {/* Modal Global "Muy pronto" */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center space-y-4 animate-fade-in">
                        <div className="text-4xl">🎉 🎉 🎉</div>
                        <h3 className="text-2xl font-bold text-gray-900">¡Muy pronto!</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Estamos preparando la comunidad de Språkkafé Oslo. Muy pronto podrás recibir novedades, descubrir nuevas actividades y formar parte de este proyecto.
                        </p>
                        <button onClick={() => setShowModal(false)}
                            className="mt-2 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition cursor-pointer">
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

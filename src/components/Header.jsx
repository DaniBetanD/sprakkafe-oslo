import { useLocation, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogoClick = (e) => {
        // Si estamos en Home, hacer scroll al Hero
        if (location.pathname === "/") {
            e.preventDefault();
            const hero = document.querySelector("section");
            if (hero) {
                hero.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
        // Si estamos en Activity o Organization, volver a Home arriba
        // (el Link to="/" lo maneja automáticamente)
    };

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
            <div className="max-w-5xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link 
                        to="/" 
                        onClick={handleLogoClick}
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110">
                            S
                        </div>
                        <span className="font-bold text-xl text-gray-900">
                            Språkkafé<span className="text-blue-600">.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm">
                        <a
                            href="#actividades"
                            className="text-gray-600 hover:text-blue-600 transition font-medium"
                        >
                            Actividades
                        </a>
                        
                        <a
                            href="#proyecto"
                            className="text-gray-600 hover:text-blue-600 transition font-medium"
                        >
                            Sobre el proyecto
                        </a>
                        
                        <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition shadow-sm hover:shadow-md">
                            Únete a la comunidad
                        </button>
                    </nav>

                    {/* Mobile button */}
                    <button
                        className="md:hidden text-gray-600 hover:text-gray-900 transition"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                        <a
                            href="#actividades"
                            onClick={closeMenu}
                            className="py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition font-medium"
                        >
                            Actividades
                        </a>
                        
                        <a
                            href="#proyecto"
                            onClick={closeMenu}
                            className="py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition font-medium"
                        >
                            Sobre el proyecto
                        </a>
                        
                        <button
                            onClick={closeMenu}
                            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700 transition"
                        >
                            Únete a la comunidad
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
}

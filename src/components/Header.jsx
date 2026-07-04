import { Link } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">            <div className="max-w-5xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-105">
                            S
                        </div>
                        <span className="font-bold text-xl text-gray-900">
                            Språkkafé
                            <span className="text-blue-600">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm">
    <a
        href="#actividades"
        className="text-gray-600 hover:text-blue-600 transition"
    >
        Actividades
    </a>

    <a
        href="#proyecto"
        className="text-gray-600 hover:text-blue-600 transition"
    >
        Sobre el proyecto
    </a>

    <button
        className="rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition"
    >
        Únete a la comunidad
    </button>
</nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 hover:text-gray-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">

    <a href="#actividades" className="py-1 text-gray-600 hover:text-blue-600">
        Actividades
    </a>

    <a href="#proyecto" className="py-1 text-gray-600 hover:text-blue-600">
        Sobre el proyecto
    </a>

    <button className="mt-2 rounded-xl bg-blue-600 px-4 py-2.5 text-white font-medium hover:bg-blue-700 transition">
        Únete a la comunidad
    </button>

</nav>
                )}
            </div>
        </header>
    );
}
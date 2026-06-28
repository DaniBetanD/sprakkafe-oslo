import { Link } from "react-router-dom";
import { Coffee, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 py-4">
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
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition">Actividades</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition">Organizaciones</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition">Sobre nosotros</a>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-sm">
                            Únete
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
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition py-1">Actividades</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition py-1">Organizaciones</a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition py-1">Sobre nosotros</a>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition text-center">
                            Únete
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
}
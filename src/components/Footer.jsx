export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                                S
                            </div>
                            <span className="font-bold text-xl text-gray-900">Språkkafé</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Practica noruego y conecta con personas en Oslo.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Enlaces</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Sobre nosotros</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Cómo funciona</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Organizaciones</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Información</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="text-gray-500">📍 Oslo, Noruega</li>
                            <li className="text-gray-500">🕐 Eventos semanales</li>
                            <li className="text-gray-500">🇳🇴 Todos los niveles</li>
                        </ul>
                    </div>

                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Språkkafé Oslo. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
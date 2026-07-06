import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { scrollToId } from "../utils/scrollTo"; // CORREGIDO: Movido arriba de la función

export default function Footer() {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    function handleNavClick(e, id) {
        e.preventDefault();
        if (location.pathname !== "/") {
            navigate("/");
            scrollToId(id);
        } else {
            scrollToId(id);
        }
    }

    return (
        <>
            <footer className="bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-16">

                    {/* CTA Banner */}
                    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-14 text-center text-white shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Aprender un idioma comienza con una conversación.
                        </h2>
                        <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-blue-100">
                            Nosotros te ayudamos a encontrar la primera.
                        </p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                        >
                            Únete a la comunidad
                        </button>
                    </div>

                    {/* Links */}
                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Identidad */}
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                        🇳🇴
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900">Språkkafé Oslo</h3>
                                        <p className="text-sm text-gray-500">Comunidad para practicar noruego</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Reunimos en un solo lugar actividades gratuitas para practicar
                                    noruego, conocer personas y sentirse parte de la vida en Noruega.
                                </p>
                            </div>

                            {/* Enlaces */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4">Enlaces</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a href="#proyecto" onClick={(e) => handleNavClick(e, "proyecto")}
                                            className="text-gray-500 hover:text-blue-600 transition">
                                            Sobre el proyecto
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#como-funciona" onClick={(e) => handleNavClick(e, "como-funciona")}
                                            className="text-gray-500 hover:text-blue-600 transition">
                                            Cómo funciona
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#actividades" onClick={(e) => handleNavClick(e, "actividades")}
                                            className="text-gray-500 hover:text-blue-600 transition">
                                            Actividades
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:hola@sprakkafe.no"
                                            className="text-gray-500 hover:text-blue-600 transition">
                                            Contacto
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Información */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4">Información</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="text-gray-500">📍 Oslo, Noruega</li>
                                    <li className="text-gray-500">🕐 Eventos semanales</li>
                                    <li className="text-gray-500">🇳🇴 Todos los niveles</li>
                                </ul>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500">
                                Hecho con ❤️ para ayudar a más personas a sentirse parte de Noruega.
                            </p>
                            <p className="mt-2 text-xs text-gray-400">
                                © {new Date().getFullYear()} Språkkafé Oslo
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center space-y-4">
                        <div className="text-4xl">🎉</div>
                        <h3 className="text-2xl font-bold text-gray-900">¡Próximamente!</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Estamos preparando un espacio para compartir novedades, historias y actividades. Muy pronto podrás unirte.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-2 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
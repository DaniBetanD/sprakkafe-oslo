import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
    const [showCommunityToast, setShowCommunityToast] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleAboutClick = (e) => {
        e.preventDefault();
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const proyecto = document.getElementById("proyecto");
                if (proyecto) {
                    proyecto.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            const proyecto = document.getElementById("proyecto");
            if (proyecto) {
                proyecto.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    const handleHowItWorksClick = (e) => {
        e.preventDefault();
        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const comoFunciona = document.getElementById("cómo-funciona");
                if (comoFunciona) {
                    comoFunciona.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            const comoFunciona = document.getElementById("cómo-funciona");
            if (comoFunciona) {
                comoFunciona.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    const handleOrganizationsClick = (e) => {
        e.preventDefault();
        navigate("/organizations");
    };

    const handleCommunityClick = () => {
        setShowCommunityToast(true);
        setTimeout(() => setShowCommunityToast(false), 4000);
    };

    return (
        <>
            <footer className="bg-white border-t border-gray-100"> 
                <div className="max-w-6xl mx-auto px-6 py-16">

                    {/* Banner superior (CTA) */}
                    <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-14 text-center text-white shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Aprender un idioma comienza con una conversación.
                        </h2>
                        <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-blue-100">
                            Nosotros te ayudamos a encontrar la primera.
                        </p>
                        <button 
                            onClick={handleCommunityClick}
                            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                        >
                            Únete a la comunidad
                        </button>
                    </div>

                    {/* Bloque contenedor de enlaces e información */}
                    <div className="mt-16">      
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* Columna 1: Identidad */}
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                        🇳🇴
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900">
                                            Språkkafé Oslo
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Comunidad para practicar noruego
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Reunimos en un solo lugar actividades gratuitas para practicar
                                    noruego, conocer personas y sentirse parte de la vida en Noruega.
                                </p>
                            </div>

                            {/* Columna 2: Enlaces */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4">Enlaces</h3>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="/#proyecto" className="text-gray-500 hover:text-blue-600 transition">Sobre el proyecto</a></li>

                                    <li><a href="/#proyecto" className="text-gray-500 hover:text-blue-600 transition">Cómo funciona</a></li>

                                    <li><a href="/#actividades" className="text-gray-500 hover:text-blue-600 transition">Organizaciones</a></li>

                                    <li><a href="mailto:hola@sprakkafe.no" className="text-gray-500 hover:text-blue-600 transition">Contacto</a></li>

                                </ul>
                            </div>

                            {/* Columna 3: Información */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4">Información</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="text-gray-500">📍 Oslo, Noruega</li>
                                    <li className="text-gray-500">🕐 Eventos semanales</li>
                                    <li className="text-gray-500">🇳🇴 Todos los niveles</li>
                                </ul>
                            </div>

                        </div>

                        {/* Copyright e información comunitaria inferior */}
                        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                            <p className="text-sm text-gray-500">
                                Hecho con ❤️ para ayudar a más personas a sentirse parte de Noruega.
                            </p>
                            <p className="mt-3 text-xs text-gray-400">
                                Proyecto comunitario creado para facilitar la integración en Noruega.
                            </p>
                            <p className="mt-2 text-xs text-gray-400">
                                La información se obtiene de organizaciones y bibliotecas oficiales.
                            </p>
                            
                            <button className="mt-5 text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                                ¿Conoces un grupo que no aparece?
                            </button>
                            
                            <p className="mt-6 text-xs text-gray-400">
                                © {new Date().getFullYear()} Språkkafé Oslo
                            </p>
                        </div>
                    </div>

                </div>
            </footer>

            {/* Coming Soon Toast */}
            {showCommunityToast && (
                <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 z-40 bg-white rounded-lg shadow-lg border border-gray-200 p-4 md:max-w-md animate-in slide-in-from-bottom-4 duration-300">
                    <h3 className="font-semibold text-gray-900 text-base">
                        Próximamente 🎉
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        Podrás unirte a nuestra comunidad. Estamos preparando un espacio para compartir novedades, historias y actividades.
                    </p>
                </div>
            )}
        </>
    );
}

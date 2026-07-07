import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "../utils/scrollTo";

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    function handleNavClick(e, id) {
        e.preventDefault();
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: id } });
        } else {
            scrollToId(id);
        }
    }

    const triggerJoinModal = () => {
        window.dispatchEvent(new CustomEvent("open-subscription-modal"));
    };

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-6 py-16">

                {/* F1.1 — CTA PRINCIPAL: Con microinteracción táctil y clases de consistencia visual */}
                <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-14 text-center text-white shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                        Aprender un idioma comienza con una conversación.
                    </h2>
                    <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-blue-100">
                        Nosotros te ayudamos a encontrar la primera.
                    </p>
                    <button
                        onClick={triggerJoinModal}
                        className="mt-8 rounded-xl bg-white px-6 py-3 h-11 inline-flex items-center font-semibold text-blue-700 shadow-sm transition-all duration-150 hover:bg-blue-50 active:scale-95"
                    >
                        Únete a la comunidad
                    </button>
                </div>

                {/* F1.7 — MAPA DE NAVEGACIÓN TOTALMENTE REESTRUCTURADO */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Columna Identidad */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg shadow-sm select-none">
                                🇳🇴
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 leading-tight">Språkkafé</h3>
                                <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Oslo</p>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Reunimos actividades gratuitas para practicar noruego, conocer gente y conectar con la vida local.
                        </p>
                    </div>

                    {/* Columna: Proyecto */}
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-4">Proyecto</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#proyecto" onClick={(e) => handleNavClick(e, "proyecto")}
                                   className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    Sobre el proyecto
                                </a>
                            </li>
                            <li>
                                <a href="#actividades" onClick={(e) => handleNavClick(e, "actividades")}
                                   className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    Cómo funciona
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hola@sprakkafe.no"
                                   className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna: Comunidad */}
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-4">Comunidad</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <button onClick={triggerJoinModal}
                                   className="text-gray-600 hover:text-blue-600 text-left transition min-h-[44px] flex items-center w-full">
                                    Únete
                                </button>
                            </li>
                            <li>
                                <button onClick={triggerJoinModal}
                                   className="text-gray-400 flex items-center gap-2 cursor-not-allowed min-h-[44px]" disabled>
                                    Próximamente newsletter <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded">Pronto</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Columna: Recursos */}
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-4">Recursos</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#actividades" onClick={(e) => handleNavClick(e, "actividades")}
                                   className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    Organizaciones
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                                   className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright e Información Inferior */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-sm text-gray-500">
                        Hecho con ❤️ para ayudar a más personas a sentirse parte de Noruega.
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                        © {new Date().getFullYear()} Språkkafé Oslo
                    </p>
                </div>

            </div>
        </footer>
    );
}
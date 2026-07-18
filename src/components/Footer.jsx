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

  

    return (
        <footer id="contacto"
        className="bg-white border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-6 py-16">

                {/* F1.1 — CTA PRINCIPAL: Con microinteracción táctil y clases de consistencia visual */}
               

                {/* F1.7 — MAPA DE NAVEGACIÓN TOTALMENTE REESTRUCTURADO */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-12">                    {/* Columna Identidad */}
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
    <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-4">
        Proyecto
    </h4>

    <ul className="space-y-3 text-sm">

        <li>
            <a
                href="#proyecto"
                onClick={(e) => handleNavClick(e, "proyecto")}
                className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center"
            >
                Sobre el proyecto
            </a>
        </li>

    </ul>
</div>

                    {/* Columna: Comunidad */}
                   

                    {/* Columna: Recursos */}
                    
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
import { useLocation, useNavigate } from "react-router-dom";
import sprakkafeMark from "../assets/sprakkafe-mark.svg";
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
        <footer id="contacto" className="bg-white border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-6 py-10 md:py-12">
                <div className="grid grid-cols-1 gap-9 md:grid-cols-[1.4fr_0.8fr_1fr_1.2fr] md:gap-10">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={sprakkafeMark} alt="" className="h-11 w-11" aria-hidden="true" />
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 leading-tight">Språkkafé</h3>
                                <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Oslo</p>
                            </div>
                        </div>
                        <p className="max-w-sm text-gray-600 text-sm leading-relaxed">
                            Reunimos actividades gratuitas para practicar noruego, conocer gente y conectar con la vida local.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-3">
                            Explorar
                        </h4>
                        <ul className="text-sm">
                            <li>
                                <a href="#actividades" onClick={(e) => handleNavClick(e, "actividades")} className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    Actividades
                                </a>
                            </li>
                            <li>
                                <a href="#proyecto" onClick={(e) => handleNavClick(e, "proyecto")} className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    Sobre el proyecto
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-3">
                            Comunidad
                        </h4>
                        <a href="#comunidad" onClick={(e) => handleNavClick(e, "comunidad")} className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center text-sm">
                            Recibir novedades
                        </a>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                            Actividades y cambios importantes, directamente en tu email.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
                            Organizaciones
                        </h4>
                        <p className="text-sm leading-relaxed text-gray-600">
                            ¿Organizas un Språkkafé? Escríbenos para añadirlo, actualizar información o realizar una consulta.
                        </p>
                        <a
                            href="mailto:sprakkafenorge@gmail.com?subject=Organizaci%C3%B3n%20%E2%80%94%20Spr%C3%A5kkaf%C3%A9%20Oslo"
                            className="mt-2 flex min-h-[44px] items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                        >
                            Contactar con nosotros →
                        </a>
                    </div>
                </div>

                <div className="mt-9 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                    <p className="text-sm text-gray-500">
                        Hecho con cariño ❤️ para ayudar a más personas a sentirse parte de Noruega.
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                        © {new Date().getFullYear()} Språkkafé Oslo
                    </p>
                </div>
            </div>
        </footer>
    );
}

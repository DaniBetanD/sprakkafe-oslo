import { useLocation, useNavigate } from "react-router-dom";
import sprakkafeMark from "../assets/sprakkafe-mark.svg";
import { scrollToId } from "../utils/scrollTo";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathFor, t } = useLanguage();

    function handleNavClick(e, id) {
        e.preventDefault();
        if (location.pathname !== pathFor("/")) {
            navigate(pathFor("/"), { state: { scrollTo: id } });
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
                            {t("footerDescription")}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-3">
                            {t("explore")}
                        </h4>
                        <ul className="text-sm">
                            <li>
                                <a href="#actividades" onClick={(e) => handleNavClick(e, "actividades")} className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    {t("activities")}
                                </a>
                            </li>
                            <li>
                                <a href="#proyecto" onClick={(e) => handleNavClick(e, "proyecto")} className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center">
                                    {t("aboutProject")}
                                </a>
                            </li>
                            <li><a href={pathFor(`/info/${t("projectSlug")}`)} className="flex min-h-[44px] items-center text-gray-600 transition hover:text-blue-600">{t("projectPage")}</a></li>
                            <li><a href={pathFor(`/info/${t("methodologySlug")}`)} className="flex min-h-[44px] items-center text-gray-600 transition hover:text-blue-600">{t("editorialMethod")}</a></li>
                            <li><a href={pathFor(`/info/${t("privacySlug")}`)} className="flex min-h-[44px] items-center text-gray-600 transition hover:text-blue-600">{t("privacy")}</a></li>
                            <li><a href={pathFor(`/info/${t("termsSlug")}`)} className="flex min-h-[44px] items-center text-gray-600 transition hover:text-blue-600">{t("terms")}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 text-sm tracking-wider uppercase mb-3">
                            {t("community")}
                        </h4>
                        <a href="#comunidad" onClick={(e) => handleNavClick(e, "comunidad")} className="text-gray-600 hover:text-blue-600 transition min-h-[44px] flex items-center text-sm">
                            {t("receiveNews")}
                        </a>
                        <p className="mt-1 text-xs leading-relaxed text-gray-500">
                            {t("receiveNewsText")}
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
                            {t("organizations")}
                        </h4>
                        <p className="text-sm leading-relaxed text-gray-600">
                            {t("organizationContactText")}
                        </p>
                        <a
                            href="mailto:sprakkafenorge@gmail.com?subject=Organizaci%C3%B3n%20%E2%80%94%20Spr%C3%A5kkaf%C3%A9%20Oslo"
                            className="mt-2 flex min-h-[44px] items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700 md:hidden"
                        >
                            {t("contactUs")}
                        </a>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=sprakkafenorge@gmail.com&su=Organizaci%C3%B3n%20%E2%80%94%20Spr%C3%A5kkaf%C3%A9%20Oslo"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 hidden min-h-[44px] items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700 md:flex"
                        >
                            {t("contactUs")}
                        </a>
                        <p className="break-all text-xs text-gray-500">
                            sprakkafenorge@gmail.com
                        </p>
                    </div>
                </div>

                <div className="mt-9 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                    <p className="text-sm text-gray-500">
                        {t("footerStatement")}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                        © {new Date().getFullYear()} Språkkafé Oslo
                    </p>
                </div>
            </div>
        </footer>
    );
}

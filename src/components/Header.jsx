import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CalendarDays, Globe2, Heart, House, Info, Menu, X } from "lucide-react";
import sprakkafeMark from "../assets/sprakkafe-mark.svg";
import { scrollToId } from "../utils/scrollTo";
import CommunitySignupModal from "./CommunitySignupModal";
import { useLanguage } from "../i18n/LanguageContext";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const menuButtonRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { locale, pathFor, setLocale, t } = useLanguage();

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        if (!isMenuOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    function handleNavClick(e, id) {
        e.preventDefault();
        closeMenu();
        if (location.pathname !== pathFor("/")) {
            navigate(pathFor("/"));
            // Pequeño delay para asegurar el renderizado de la Home antes del scroll
            setTimeout(() => scrollToId(id), 100);
        } else {
            scrollToId(id);
        }
    }

    function handleActivitiesClick(event) {
        event.preventDefault();
        closeMenu();
        navigate(pathFor("/activities"));
    }

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-xl">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-blue-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    {t("skipToContent")}
                </a>
                 <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
                        <Link
                            to={pathFor("/")}
                            onClick={(e) => handleNavClick(e, "hero")}
                            className="flex items-center gap-2.5 rounded-lg p-1 -ml-1 hover:bg-gray-100 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                            aria-label={t("homeAria")}
                        >
                            <img
                                src={sprakkafeMark}
                                alt=""
                                className="h-10 w-10 shrink-0 transition-transform duration-150 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                            <div className="leading-tight">
                                <div className="font-semibold text-gray-900 text-[15px] leading-none tracking-tight">Språkkafé</div>
                                <div className="text-xs text-gray-500 font-medium leading-none mt-1">Oslo</div>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav aria-label={t("mainNavigation")} className="hidden md:flex items-center gap-1 text-sm font-medium">
                            <a href={pathFor("/activities")} onClick={handleActivitiesClick}
                                className="min-h-[44px] inline-flex items-center rounded-lg px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                                {t("activities")}
                            </a>

                            <a href="#proyecto" onClick={(e) => handleNavClick(e, "proyecto")}
                                className="min-h-[44px] inline-flex items-center rounded-lg px-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
                                {t("aboutProject")}
                            </a>

                            <button type="button" onClick={() => setShowModal(true)}
                                className="ml-2 min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 text-white font-medium hover:bg-blue-700 active:scale-[0.98] transition shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                                <Heart size={16} aria-hidden="true" />
                                {t("joinCommunity")}
                            </button>
                            <button
                                type="button"
                                onClick={() => setLocale(locale === "es" ? "en" : "es")}
                                className="ml-1 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                aria-label={`${t("languageLabel")}: ${locale.toUpperCase()}`}
                            >
                                <Globe2 size={16} aria-hidden="true" />
                                {locale === "es" ? "EN" : "ES"}
                            </button>
                        </nav>

                        {/* Mobile actions */}
                        <div className="md:hidden flex items-center gap-1.5">
                           <button
                                type="button"
                                onClick={() => {
                                    closeMenu();
                                    setShowModal(true);
                                }}
                                className="min-h-[44px] inline-flex items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-blue-700 hover:bg-blue-50 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                           >
                                <Heart size={16} aria-hidden="true" />
                                {t("join")}
                           </button>
                           <button
                                type="button"
                                onClick={() => setLocale(locale === "es" ? "en" : "es")}
                                className="flex h-11 min-w-11 items-center justify-center rounded-lg px-2 text-xs font-bold text-gray-600 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                aria-label={`${t("languageLabel")}: ${locale.toUpperCase()}`}
                           >
                                {locale === "es" ? "EN" : "ES"}
                           </button>
                           <button
                                ref={menuButtonRef}
                                type="button"
                                className="w-11 h-11 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-150 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-navigation"
                            >
                                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Panel (Optimized for 390px) */}
                    <nav
                        id="mobile-navigation"
                        aria-label={t("mobileNavigation")}
                        aria-hidden={!isMenuOpen}
                        className={`md:hidden max-w-5xl mx-auto px-3 overflow-hidden transition-all duration-200 ${isMenuOpen ? "max-h-80 opacity-100 pb-3" : "max-h-0 opacity-0"}`}
                    >
                        <div className="border-t border-gray-200 pt-2">
                            {[
                                { id: "hero", label: t("home"), description: t("backToStart"), icon: House },
                                { id: "actividades", label: t("activities"), description: t("allActivitiesMenuDescription"), icon: CalendarDays, route: true },
                                { id: "proyecto", label: t("aboutProject"), description: t("knowMission"), icon: Info },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.id}
                                        href={item.route ? pathFor("/activities") : `#${item.id}`}
                                        onClick={(event) => (
                                            item.route ? handleActivitiesClick(event) : handleNavClick(event, item.id)
                                        )}
                                        tabIndex={isMenuOpen ? 0 : -1}
                                        className="flex min-h-[56px] items-center gap-3 rounded-lg px-3 text-gray-700 hover:bg-gray-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                                    >
                                        <span className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 shadow-sm" aria-hidden="true">
                                            <Icon size={17} />
                                        </span>
                                        <span className="text-left">
                                            <span className="block text-sm font-medium text-gray-900">{item.label}</span>
                                            <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </nav>

            </header>

            {showModal && <CommunitySignupModal onClose={() => setShowModal(false)} />}
        </>
    );
}

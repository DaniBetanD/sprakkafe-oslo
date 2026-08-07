import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { getLocaleFromPath } from "./i18n/locale";
import LanguageSuggestion from "./components/LanguageSuggestion";
import Home from "./pages/Home";

const ActivityPage = lazy(() => import("./pages/ActivityPage"));
const ActivitiesPage = lazy(() => import("./pages/ActivitiesPage"));
const OrganizationPage = lazy(() => import("./pages/OrganizationPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const InformationPage = lazy(() => import("./pages/InformationPage"));
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const GuidePage = lazy(() => import("./pages/GuidePage"));

function LoadingFallback() {
    const { t } = useLanguage();
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
            <p className="text-sm text-gray-600">{t("loading")}</p>
        </main>
    );
}

function App() {
    const location = useLocation();

    if (!getLocaleFromPath(location.pathname)) {
        const suffix = location.pathname === "/" ? "" : location.pathname;
        return <Navigate to={`/es${suffix}${location.search}${location.hash}`} replace />;
    }

    return (
        <LanguageProvider>
            <ScrollToTop />
            <LanguageSuggestion />
            <Suspense
                fallback={<LoadingFallback />}
            >
                <Routes>
                    <Route path="/:locale" element={<Home />} />
                    <Route path="/:locale/activities" element={<ActivitiesPage />} />
                    <Route path="/:locale/activity/:id" element={<ActivityPage />} />
                    <Route path="/:locale/organization/:id" element={<OrganizationPage />} />
                    <Route path="/:locale/info/:page" element={<InformationPage />} />
                    <Route path="/:locale/guides" element={<GuidesPage />} />
                    <Route path="/:locale/guides/:slug" element={<GuidePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </LanguageProvider>
    );
}

export default App;

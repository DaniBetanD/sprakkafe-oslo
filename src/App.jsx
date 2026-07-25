import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

const ActivityPage = lazy(() => import("./pages/ActivityPage"));
const OrganizationPage = lazy(() => import("./pages/OrganizationPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
    return (
        <>
            <ScrollToTop />
            <Suspense
                fallback={(
                    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
                        <p className="text-sm text-gray-600">Cargando…</p>
                    </main>
                )}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/activity/:id" element={<ActivityPage />} />
                    <Route path="/organization/:id" element={<OrganizationPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;

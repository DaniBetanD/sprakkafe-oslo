import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ActivityPage from "./pages/ActivityPage";
import OrganizationPage from "./pages/OrganizationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/activity/:id" element={<ActivityPage />} />
                <Route path="/organization/:id" element={<OrganizationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;

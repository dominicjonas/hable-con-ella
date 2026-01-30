import { Routes, Route } from "react-router-dom";
import IntroPage from "../components/pages/IntroPage";
import CategoryPage from "../components/pages/CategoryPage";
import PhrasePage from "../components/pages/PhrasePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/phrase/:categoryId" element={<PhrasePage />} />
      <Route path="*" element={<div>404 - Pagina no encontrada</div>} />
    </Routes>
  );
}

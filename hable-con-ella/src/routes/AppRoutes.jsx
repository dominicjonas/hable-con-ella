import { Routes, Route } from "react-router-dom";
import AuthRedirect from "./AuthRedirect";
import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "../components/pages/SignupPage";
import Login from "../components/pages/LoginPage";
import CategoryPage from "../components/pages/CategoryPage";
import PhrasePage from "../components/pages/PhrasePage";
import FavouritesPage from "../components/pages/FavouritesPage";
import ProfilePage from "../components/pages/ProfilePage";
import AuthRootRedirect from "./AuthRouteRedirect";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public landing */}
      <Route path="/" element={<AuthRootRedirect />} />

      {/* Public routes if logged in */}
      <Route element={<AuthRedirect />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Protected routes for logged-in users */}
      <Route element={<ProtectedRoute />}>
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/phrase/:categoryId" element={<PhrasePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<div>404 - Pagina no encontrada</div>} />
    </Routes>
  );
}

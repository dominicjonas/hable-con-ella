// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  //   while firebase checks auth status, show loading
  if (loading) {
    return <div>Loading...</div>;
  }

  //   if no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //   if user exists, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;

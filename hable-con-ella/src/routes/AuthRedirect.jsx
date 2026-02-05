import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If already logged in → redirect to main app
  if (user) {
    return <Navigate to="/categories" replace />;
  }

  // Not logged in → show the login/signup page
  return <Outlet />;
};

export default AuthRedirect;

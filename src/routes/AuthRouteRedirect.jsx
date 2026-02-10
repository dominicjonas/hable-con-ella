import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import IntroPage from "../components/pages/IntroPage";

const AuthRootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Verifying session...</div>;
  }

  // If logged in → go to home page
  if (user) {
    return <Navigate to="/home" replace />;
  }

  // Not logged in → show IntroPage
  return <IntroPage />;
};

export default AuthRootRedirect;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import "./AuthPages.scss"; // shared styles, create below

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/categories");
      toast.success("Logged in successfully! ¡Bienvenida de nuevo!");
    } catch (err) {
      toast.error("Login failed, please try again. ¡Qué macana! " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/categories");
      toast.success("Logged in with Google! ¡Bienvenida de nuevo!");
    } catch (err) {
      toast.error("Google sign-in failed, please try again. ¡Qué macana! " + (err.message || ""));
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <Button variant="outline" size="lg" onClick={handleGoogleSignIn} disabled={loading}>
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          width="18"
          height="18"
          style={{ marginRight: "0.75rem" }}
        />
        Sign in with Google
      </Button>

      <p className="auth-link">
        Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;

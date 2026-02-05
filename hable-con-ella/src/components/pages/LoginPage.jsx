// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import "./AuthPages.scss"; // shared styles, create below

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/categories");
    } catch (err) {
      setError(err.message || "Error logging in, please try again.");
    } finally {
      setLoading(false);
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

      <p className="auth-link">
        Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;

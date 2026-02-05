import Header from "../common/Header";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "./IntroPage.scss";

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-page-container">
      <Header />
      <div className="intro-content">
        <h2 className="intro-welcome">¡Bienvenido!</h2>
        <p className="intro-subtitle">
          Practica español argentino con frases reales y útiles. Crea una cuenta para guardar tus favoritos y más.
        </p>
        <div className="auth-buttons">
          <Button variant="primary" size="lg" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="primary" size="lg" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;

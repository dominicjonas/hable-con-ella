import Header from '../common/Header';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import './IntroPage.scss';

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-page">
      <Header title="Hable con Ella" />

      <div className="intro-content">
        <h2 className="intro-welcome">¡Bienvenido!</h2>
        <p className="intro-subtitle">
          ...
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/categories')}
        >
          Empezar
        </Button>
      </div>
    </div>
  );
};

export default IntroPage;
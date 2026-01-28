// src/components/common/Header.jsx
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from './Button'; // Reuse your Button!
import './Header.scss';

const Header = ({
  title = 'Hable con Ella',
  showBackButton = false,
  rightContent = null, // Can be a JSX element (e.g., button, icon)
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <header className={`header ${className}`}>
      <div className="header-container">
        {/* Left: Back button or empty space */}
        <div className="header-left">
          {showBackButton && (
            <Button
              variant="ghost"
              size="md"
              onClick={() => navigate(-1)} // Go back one page
              aria-label="Volver"
            >
              ← Volver
            </Button>
          )}
        </div>

        {/* Center: Title */}
        <h1 className="header-title">{title}</h1>

        {/* Right: Custom content (e.g., future favorites icon) */}
        <div className="header-right">
          {rightContent}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  rightContent: PropTypes.node,
  className: PropTypes.string,
};

export default Header;
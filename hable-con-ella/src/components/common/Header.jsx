// src/components/common/Header.jsx
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import "./Header.scss";

const Header = ({
  title = "Hable Con Ella",
  showBackButton = false,
  showTitle = true,
  showRightContent = false,
  rightContent = null,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <header className={`header ${className}`}>
      <div className="header-container">
        <div className="header-left">
          {showBackButton && <Icon className="back-button" name="chevron-left" onClick={() => navigate(-1)} />}
        </div>

        {showTitle && <h1 className="header-title">{title}</h1>}

        {showRightContent && <div className="header-right">{rightContent}</div>}
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  showTitle: PropTypes.bool,
  showRightContent: PropTypes.bool,
  className: PropTypes.string,
};

export default Header;

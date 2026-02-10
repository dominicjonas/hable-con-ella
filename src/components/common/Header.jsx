import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import "./style/Header.scss";
import SideDrawer from "./SideDrawer";

const Header = ({
  title = "Hable Con Ella",
  showBackButton = false,
  showTitle = true,
  showRightContent = false,
  className = "",
}) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      <header className={`header ${className}`}>
        <div className="header-container">
          <div className="header-left">
            {showBackButton && <Icon className="back-button" name="chevron-left" onClick={() => navigate(-1)} />}
          </div>

          {showTitle && <h1 className="header-title">{title}</h1>}

          {showRightContent && (
            <div className="header-right">
              <Icon name="menu" className="hamburger-button" onClick={toggleDrawer} aria-label="Open menu" />
            </div>
          )}
        </div>
      </header>

      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
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

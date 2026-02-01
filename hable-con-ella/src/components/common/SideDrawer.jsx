// src/components/common/SideDrawer.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // if you want real links later
import "./SideDrawer.scss";

const SideDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`drawer-overlay ${isOpen ? "open" : ""}`} onClick={onClose} />
      <div className={`side-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Menu</h2>
          <button className="close-button" onClick={onClose} aria-label="Close menu">
            ×
          </button>
        </div>

        <nav className="drawer-nav">
          <ul>
            <li>
              <a href="/" onClick={onClose}>
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={onClose}>
                Profile
              </a>
            </li>
            <li>
              <a href="/categories" onClick={onClose}>
                Categories
              </a>
            </li>
            <li>
              <a href="/favourites" onClick={onClose}>
                Favourites
              </a>
            </li>
            <li>
              <a href="#" onClick={onClose}>
                Settings
              </a>
            </li>
            <li className="logout">
              <a href="#" onClick={onClose}>
                Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

SideDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideDrawer;

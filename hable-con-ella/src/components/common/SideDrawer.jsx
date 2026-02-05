// src/components/common/SideDrawer.jsx
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./SideDrawer.scss";

const SideDrawer = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

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
            {user && (
              <li>
                <a href="/favourites" onClick={onClose}>
                  Favourites
                </a>
              </li>
            )}
            <li>
              <a href="#" onClick={onClose}>
                Settings
              </a>
            </li>
            {user && (
              <li className="logout">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Log out
                </a>
              </li>
            )}
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

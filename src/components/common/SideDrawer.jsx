import PropTypes from "prop-types";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./style/SideDrawer.scss";

const SideDrawer = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully! Nos vemos");
    } catch (error) {
      toast.error("Logout failed. ¡Qué macana!", error);
    }
  };

  return (
    <>
      <div className={`drawer-overlay ${isOpen ? "open" : ""}`} onClick={onClose} />
      <div className={`side-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          {user && user.photoURL && (
            <img src={user.photoURL} alt="Profile" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
          )}
          <h2>{user?.displayName || user?.email?.split("@")[0] || "Menu"}</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <nav className="drawer-nav">
          <ul>
            <li>
              <Link to="/" onClick={onClose}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={onClose}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={onClose}>
                Categories
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/favourites" onClick={onClose}>
                  Favourites
                </Link>
              </li>
            )}
            <li>
              <a href="#" onClick={onClose}>
                Settings
              </a>
            </li>
            {user && (
              <li className="logout">
                <Link
                  to="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Log out
                </Link>
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

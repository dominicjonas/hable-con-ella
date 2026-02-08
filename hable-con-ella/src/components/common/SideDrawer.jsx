import PropTypes from "prop-types";
import { toast } from "sonner";
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
      toast.success("Logged out successfully! Nos vemos");
    } catch (error) {
      toast.error("Logout failed. ¡Qué macana!", error);
    }
  };

  console.log("user>>>>", user);

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

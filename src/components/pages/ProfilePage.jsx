import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";
import { db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import Button from "../common/Button";
import Header from "../common/Header";
import Icon from "../common/Icon";
import "./style/ProfilePage.scss";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoPreview(user.photoURL || "");
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!user) {
      setError("No authenticated user found.");
      setLoading(false);
      return;
    }

    try {
      let photoURL = user.photoURL;

      // Upload new photo if selected
      if (photoFile) {
        const storageRef = ref(storage, `profiles/${user.uid}`);
        await uploadBytes(storageRef, photoFile);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: displayName.trim(),
        photoURL,
      });

      // Update Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName: displayName.trim(),
        photoURL,
        updatedAt: new Date().toISOString(),
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("Failed to update profile. Please try again.");
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed.", error);
    }
  };

  return (
    <div className="profile-page">
      <Header title="Profile" showBackButton={true} showRightContent={true} />

      <div className="profile-content">
        {user ? (
          <>
            <div className="profile-header">
              <div className="profile-avatar-wrapper">
                <img src={photoPreview || "https://via.placeholder.com/80"} alt="Profile" className="profile-avatar" />
                <label htmlFor="photo-upload" className="edit-avatar-icon" aria-label="Change profile picture">
                  <Icon name="camera" size={20} color="white" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>

              <h2>{user.displayName || "User"}</h2>
              <p className="profile-email">{user.email}</p>
            </div>

            <form onSubmit={handleSave} className="profile-form">
              <label htmlFor="displayName">Display Name</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
              />

              <Button variant="primary" size="lg" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>

            {error && <p className="error">{error}</p>}

            <div className="profile-actions">
              <Button variant="outline-accent" size="md" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

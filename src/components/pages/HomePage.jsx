// src/components/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from "../common/Header";
import Button from "../common/Button";
// import { toast } from "sonner";
import "./style/HomePage.scss";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favouriteCount, setFavouriteCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchFavourites = async () => {
      try {
        const favsRef = collection(db, "users", user.uid, "favourites");
        const snap = await getDocs(favsRef);
        setFavouriteCount(snap.size);
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user]);

  if (!user) {
    // Optional: redirect to login or show intro content
    return <div>Please log in to access your dashboard.</div>;
  }

  return (
    <div className="home-page">
      <Header title="Home" showBackButton={false} showRightContent={true} />

      <div className="dashboard">
        <h1 className="greeting">Welcome back, {user.displayName || "User"}</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Favourites</h3>
            <p className="stat-value">{loading ? "..." : favouriteCount}</p>
          </div>
          {/* Add more stats later: phrases reviewed, streak, etc. */}
        </div>

        <div className="quick-actions">
          <Button variant="outline" size="lg" onClick={() => navigate("/categories")}>
            Browse Categories
          </Button>

          <Button variant="outline-accent" size="lg" onClick={() => navigate("/favourites")}>
            View Favourites
          </Button>

          <Button variant="outline" size="lg" onClick={() => navigate("/profile")}>
            Profile & Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

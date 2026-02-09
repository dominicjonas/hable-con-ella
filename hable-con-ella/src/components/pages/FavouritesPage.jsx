import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path to your firebase config
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";
import Header from "../common/Header";
import ProgressBar from "../common/ProgressBar";
import FooterNav from "../common/FooterNav";
import { useFavourites } from "../../hooks/useFavourites";
import "./PhrasePage.scss";

const FavouritesPage = () => {
  const { favourites: favouriteIds, toggleFavourite } = useFavourites();

  const [favouritePhrases, setFavouritePhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const variants = {
    hidden: { opacity: 0, x: direction > 0 ? 40 : -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: direction > 0 ? -40 : 40, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const fetchFavouritePhrases = async () => {
      if (favouriteIds.length === 0) {
        setFavouritePhrases([]);
        setLoading(false);
        return;
      }

      try {
        const loaded = [];

        for (const phraseId of favouriteIds) {
          // Fetch the phrase document
          const phraseRef = doc(db, "phrases", phraseId);
          const phraseSnap = await getDoc(phraseRef);

          if (phraseSnap.exists()) {
            loaded.push({
              phraseId,
              ...phraseSnap.data(),
            });
          }
        }

        setFavouritePhrases(loaded);
      } catch (err) {
        console.error("Failed to load favourite phrases:", err);
        setError("Could not load your favourites. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavouritePhrases();
  }, [favouriteIds]);

  if (loading) {
    return (
      <div className="favourites-page">
        <Header title="Favourites" showBackButton={true} />
        <div className="empty-state">
          <p>Loading your favourites...</p>
        </div>
      </div>
    );
  }

  if (error || favouritePhrases.length === 0) {
    return (
      <div className="favourites-page">
        <Header title="Favourites" showBackButton={true} showRightContent={true} />

        <div className="empty-state">
          <p>{error || "No favourites yet. Heart some phrases to see them here!"}</p>
        </div>
      </div>
    );
  }

  const currentFavourite = favouritePhrases[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < favouritePhrases.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleUnfavourite = () => {
    toggleFavourite(currentFavourite.phraseId);
    // If this was the last item, go back one
    if (currentIndex >= favouritePhrases.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="favourites-page">
      <Header title="Favourites" showBackButton={true} showRightContent={true} />

      <ProgressBar current={currentIndex + 1} total={favouritePhrases.length} />

      <div className="icon-container">
        <Icon
          name="shuffle"
          className="shuffle-icon"
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * favouritePhrases.length);
            setCurrentIndex(randomIndex);
          }}
          aria-label="Shuffle favourite"
        />

        <Icon
          name="heart"
          className="heart-icon"
          aria-label="Remove from favourites"
          color="#e74c3c"
          fill="#e74c3c"
          onClick={handleUnfavourite}
        />
      </div>

      <div className="phrase-content-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial={false}
            animate="visible"
            exit="exit"
            className="phrase-content"
          >
            <div className="phrase-card">
              <h2 className="phrase-spanish">{currentFavourite.spanish}</h2>
              <p className="phrase-english">{currentFavourite.english}</p>
              <p className="phrase-phonetic">/{currentFavourite.phonetic}/</p>

              <p className="phrase-category">
                From: {currentFavourite.categoryId.charAt(0).toUpperCase() + currentFavourite.categoryId.slice(1)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <FooterNav onPrev={handlePrev} onNext={handleNext} currentIndex={currentIndex} total={favouritePhrases.length} />
    </div>
  );
};

export default FavouritesPage;

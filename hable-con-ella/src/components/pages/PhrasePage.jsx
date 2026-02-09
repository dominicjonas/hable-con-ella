// src/components/pages/PhrasePage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../common/Icon";
import Header from "../common/Header";
import ProgressBar from "../common/ProgressBar";
import FooterNav from "../common/FooterNav";
import { useFavourites } from "../../hooks/useFavourites";
import "./PhrasePage.scss";

const PhrasePage = () => {
  const { categoryId } = useParams();
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const { isFavourited, toggleFavourite } = useFavourites();

  const variants = {
    hidden: { opacity: 0, x: direction > 0 ? 40 : -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: direction > 0 ? -40 : 40, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const q = query(collection(db, "phrases"), where("categoryId", "==", categoryId));
        const snapshot = await getDocs(q);
        const loadedPhrases = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhrases(loadedPhrases);
      } catch (err) {
        console.error("Failed to load phrases:", err);
        setError("Could not load phrases. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhrases();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="phrase-page">
        <Header showBackButton={true} title="Loading..." />
        <div className="phrase-content">
          <p>Loading phrases...</p>
        </div>
      </div>
    );
  }

  if (error || phrases.length === 0) {
    return (
      <div className="phrase-page">
        <Header showBackButton={true} title={categoryId || "Category"} />
        <div className="phrase-content">
          <p>{error || "No phrases found for this category."}</p>
        </div>
      </div>
    );
  }

  const currentPhrase = phrases[currentIndex];
  const phraseId = `${categoryId}-${currentIndex + 1}`;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < phrases.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setDirection(randomIndex > currentIndex ? 1 : -1);
    setCurrentIndex(randomIndex);
  };

  const categoryTitle = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

  return (
    <div className="phrase-page">
      <Header title={categoryTitle} showBackButton={true} showRightContent={true} />

      {phrases.length > 1 && <ProgressBar current={currentIndex + 1} total={phrases.length} />}

      <div className="icon-container">
        <Icon name="shuffle" className="shuffle-icon" onClick={() => handleShuffle()} aria-label="Shuffle phrase" />
        <motion.div
          animate={
            isFavourited(phraseId)
              ? { scale: [1, 1.3, 1], transition: { duration: 0.3, times: [0, 0.5, 1] } }
              : { scale: 1 }
          }
          style={{ display: "inline-block", cursor: "pointer" }}
        >
          <Icon
            name="heart"
            className="heart-icon"
            aria-label={isFavourited(phraseId) ? "Remove from favourites" : "Add to favourites"}
            color={isFavourited(phraseId) ? "#e74c3c" : "#666"}
            fill={isFavourited(phraseId) ? "#e74c3c" : "none"}
            onClick={() => toggleFavourite(phraseId)}
          />
        </motion.div>
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
              <h2 className="phrase-spanish">{currentPhrase.spanish}</h2>
              <p className="phrase-english">{currentPhrase.english}</p>
              <p className="phrase-phonetic">/{currentPhrase.phonetic}/</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <FooterNav onPrev={handlePrev} onNext={handleNext} currentIndex={currentIndex} total={phrases.length} />
    </div>
  );
};

export default PhrasePage;

import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useFavourites } from "../../hooks/useFavourites";

import PhraseLayout from "../common/PhraseLayout";
import Header from "../common/Header";
import PhraseCard from "../common/PhraseCard";
import "./style/PhrasePage.scss";

const FavouritesPage = () => {
  const { favourites: favouriteIds, isFavourited, toggleFavourite } = useFavourites();
  const [favouritePhrases, setFavouritePhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (favouriteIds.length === 0) {
        setFavouritePhrases([]);
        setLoading(false);
        return;
      }

      const loaded = [];
      for (const phraseId of favouriteIds) {
        const phraseRef = doc(db, "phrases", phraseId);
        const snap = await getDoc(phraseRef);
        if (snap.exists()) {
          loaded.push({ phraseId, ...snap.data() });
        }
      }
      setFavouritePhrases(loaded);
      setLoading(false);
    };

    fetchFavourites();
  }, [favouriteIds]);

  if (loading || favouritePhrases.length === 0) {
    return (
      <div className="favourites-page">
        <Header title="Favourites" showBackButton={true} showRightContent={true} />
        <div className="empty-state">
          <p>{loading ? "Loading..." : "No favourites yet."}</p>
        </div>
      </div>
    );
  }

  const currentPhrase = favouritePhrases[currentIndex];
  const phraseId = currentPhrase.phraseId;

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

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * favouritePhrases.length);
    setDirection(randomIndex > currentIndex ? 1 : -1);
    setCurrentIndex(randomIndex);
  };

  return (
    <PhraseLayout
      title="Favourites"
      showBackButton={true}
      showRightContent={true}
      currentIndex={currentIndex}
      total={favouritePhrases.length}
      onPrev={handlePrev}
      onNext={handleNext}
      currentPhrase={currentPhrase}
      phraseId={phraseId}
      isFavourited={isFavourited}
      toggleFavourite={toggleFavourite}
      handleShuffle={handleShuffle}
    >
      {({ setShowDetail }) => (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              hidden: { opacity: 0, y: direction > 0 ? 40 : -40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              exit: { opacity: 0, y: direction > 0 ? -40 : 40, transition: { duration: 0.3 } },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <PhraseCard phrase={currentPhrase} onClick={() => setShowDetail(true)} />
          </motion.div>
        </AnimatePresence>
      )}
    </PhraseLayout>
  );
};

export default FavouritesPage;

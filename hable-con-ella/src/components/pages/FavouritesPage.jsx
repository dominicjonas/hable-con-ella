// src/components/pages/FavouritesPage.jsx
import { useState } from "react";
import Icon from "../common/Icon";
import Header from "../common/Header";
import ProgressBar from "../common/ProgressBar";
import FooterNav from "../common/FooterNav";
import { phraseData } from "../../data/phrases";
import { useFavourites } from "../../hooks/usefavourites";
import "./PhrasePage.scss";

const FavouritesPage = () => {
  const { favourites: favouriteIds, toggleFavourite } = useFavourites();

  // Build list of favourited phrases from all categories
  const allFavourites = [];
  Object.keys(phraseData).forEach((catId) => {
    phraseData[catId].forEach((phrase, index) => {
      const phraseId = `${catId}-${index}`;
      if (favouriteIds.includes(phraseId)) {
        allFavourites.push({
          phraseId,
          categoryId: catId,
          index,
          ...phrase,
        });
      }
    });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentFavourite = allFavourites[currentIndex];

  if (allFavourites.length === 0) {
    return (
      <div className="phrase-page">
        <Header title="Favourites" showBackButton={true} />

        <div className="empty-state">
          <p>No favourites yet. Heart some phrases to see them here!</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < allFavourites.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleUnfavourite = () => {
    toggleFavourite(currentFavourite.phraseId);
    if (currentIndex >= allFavourites.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="favourites-page">
      <Header title="Favourites" showBackButton={true} />

      <ProgressBar current={currentIndex + 1} total={allFavourites.length} />

      <div className="icon-container">
        <Icon
          name="shuffle"
          className="shuffle-icon"
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * allFavourites.length);
            setCurrentIndex(randomIndex);
          }}
          aria-label="Shuffle favourite"
        />

        <Icon
          name="heart"
          className="heart-icon"
          aria-label="Remove from favourites"
          color="#e74c3c" // always red since it's favourited
          fill="#e74c3c"
          onClick={handleUnfavourite}
        />
      </div>

      <div className="phrase-content">
        <div className="phrase-card">
          <h2 className="phrase-spanish">{currentFavourite.phrase}</h2>
          <p className="phrase-english">{currentFavourite.translation}</p>
          <p className="phrase-phonetic">/{currentFavourite.phonetic}/</p>
          {/* show category */}
          <p className="phrase-category">
            From: {currentFavourite.categoryId.charAt(0).toUpperCase() + currentFavourite.categoryId.slice(1)}
          </p>
        </div>
      </div>

      <FooterNav onPrev={handlePrev} onNext={handleNext} currentIndex={currentIndex} total={allFavourites.length} />
    </div>
  );
};

export default FavouritesPage;

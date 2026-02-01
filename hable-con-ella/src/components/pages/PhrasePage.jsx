import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFavourites } from "../../hooks/usefavourites";
import Icon from "../common/Icon";
import Header from "../common/Header";
import ProgressBar from "../common/ProgressBar";
import FooterNav from "../common/FooterNav";
import { phraseData } from "../../data/phrases";
import "./PhrasePage.scss";

const PhrasePage = () => {
  const { categoryId } = useParams();
  const phrases = phraseData[categoryId] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPhrase = phrases[currentIndex];

  const { isFavourited, toggleFavourite } = useFavourites();
  const phraseId = currentPhrase ? `${categoryId}-${currentIndex}` : null;

  if (!currentPhrase) {
    return (
      <div className="phrase-page">
        <Header showBackButton={true} showRightContent={true} title={categoryId || "Categoría"} />
        <div className="phrase-content">
          <p>No phrases found for this category yet.</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < phrases.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const categoryTitle = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

  return (
    <div className="phrase-page">
      <Header title={categoryTitle} showBackButton={true} showRightContent={true} />

      {phrases.length > 1 && <ProgressBar current={currentIndex + 1} total={phrases.length} />}

      <div className="icon-container">
        <Icon
          name="shuffle"
          className="shuffle-icon"
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            setCurrentIndex(randomIndex);
          }}
          aria-label="Shuffle phrase"
        />
        <Icon
          name="heart"
          className="heart-icon"
          aria-label={isFavourited(phraseId) ? "Remove from favourites" : "Add to favourites"}
          color={isFavourited(phraseId) ? "#e74c3c" : "#666"}
          fill={isFavourited(phraseId) ? "#e74c3c" : "none"}
          onClick={() => toggleFavourite(phraseId)}
        />
      </div>

      <div className="phrase-content">
        <div className="phrase-card">
          <h2 className="phrase-spanish">{currentPhrase.phrase}</h2>
          <p className="phrase-english">{currentPhrase.translation}</p>
          <p className="phrase-phonetic">/{currentPhrase.phonetic}/</p>
        </div>
      </div>

      <FooterNav onPrev={handlePrev} onNext={handleNext} currentIndex={currentIndex} total={phrases.length} />
    </div>
  );
};

export default PhrasePage;

import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";
import FooterNav from "./FooterNav";
import PhraseDetailModal from "./PhraseDetailModal";

const PhraseLayout = ({
  title,
  showBackButton = true,
  showRightContent = true,
  currentIndex,
  total,
  onPrev,
  onNext,
  currentPhrase,
  phraseId,
  isFavourited,
  toggleFavourite,
  handleShuffle,
  children,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="phrase-page">
      <Header title={title} showBackButton={showBackButton} showRightContent={showRightContent} />

      {total > 1 && <ProgressBar current={currentIndex + 1} total={total} />}

      <div className="icon-container">
        <Icon name="shuffle" className="shuffle-icon" onClick={handleShuffle} aria-label="Shuffle" />
        <motion.div
          animate={isFavourited(phraseId) ? { scale: [1, 1.3, 1], transition: { duration: 0.3 } } : { scale: 1 }}
          style={{ display: "inline-block" }}
        >
          <Icon
            name="heart"
            className="heart-icon"
            aria-label={isFavourited(phraseId) ? "Unfavourite" : "Favourite"}
            color={isFavourited(phraseId) ? "#e74c3c" : "#666"}
            fill={isFavourited(phraseId) ? "#e74c3c" : "none"}
            onClick={() => toggleFavourite(phraseId)}
          />
        </motion.div>
      </div>

      <div className="phrase-content-wrapper">{children({ setShowDetail })}</div>

      <FooterNav onPrev={onPrev} onNext={onNext} currentIndex={currentIndex} total={total} />

      <PhraseDetailModal phrase={currentPhrase} isOpen={showDetail} onClose={() => setShowDetail(false)} />
    </div>
  );
};

export default PhraseLayout;

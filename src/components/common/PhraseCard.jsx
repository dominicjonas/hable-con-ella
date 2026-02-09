// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const PhraseCard = ({ phrase, onClick }) => {
  return (
    <motion.button
      className="phrase-card-wrapper"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="View phrase details"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="phrase-card">
        <h2 className="phrase-spanish">{phrase.spanish}</h2>
        <p className="phrase-english">{phrase.english}</p>
        <p className="phrase-phonetic">/{phrase.phonetic}/</p>
      </div>
    </motion.button>
  );
};

export default PhraseCard;

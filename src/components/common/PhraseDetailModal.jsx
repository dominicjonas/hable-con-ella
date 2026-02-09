// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import "./style/PhraseDetailModal.scss";

const PhraseDetailModal = ({ phrase, isOpen, onClose }) => {
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(phrase.spanish);
    utterance.lang = "es-AR";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const copyPhrase = () => {
    navigator.clipboard.writeText(phrase.spanish);
    toast.success("Phrase copied to clipboard!");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="phrase-detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="phrase-detail-content"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="close-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.2 }}
              onClick={onClose}
              aria-label="Close detail view"
            >
              ×
            </motion.button>

            <h2 className="detail-spanish">{phrase.spanish}</h2>
            <p className="detail-english">{phrase.english}</p>
            <p className="detail-phonetic">/{phrase.phonetic}/</p>

            <div className="examples">
              <h3>Example Usage</h3>
              <p>{phrase.example || "No example available yet."}</p>
            </div>

            <div className="detail-actions">
              <button className="audio-btn" onClick={playAudio} aria-label="Play pronunciation">
                🔊 Play
              </button>
              <button className="copy-btn" onClick={copyPhrase} aria-label="Copy phrase">
                📋 Copy
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhraseDetailModal;

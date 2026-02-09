import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import PhraseLayout from "../common/PhraseLayout";
import { useFavourites } from "../../hooks/usefavourites";
import PhraseCard from "../common/PhraseCard";

const PhrasePage = () => {
  const { categoryId } = useParams();
  const [phrases, setPhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const { isFavourited, toggleFavourite } = useFavourites();

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const q = query(collection(db, "phrases"), where("categoryId", "==", categoryId));
        const snapshot = await getDocs(q);
        setPhrases(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhrases();
  }, [categoryId]);

  if (loading || phrases.length === 0) {
    return <div>Loading...</div>; // or error handling
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
    <PhraseLayout
      title={categoryTitle}
      showBackButton={true}
      showRightContent={true}
      currentIndex={currentIndex}
      total={phrases.length}
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
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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

export default PhrasePage;

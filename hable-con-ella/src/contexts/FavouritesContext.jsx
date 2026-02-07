import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, deleteDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const FavouritesContext = createContext(null);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // When auth state changes → sync with Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User logged in → load from Firestore
        try {
          const favsRef = collection(db, "users", user.uid, "favourites");
          const snapshot = await getDocs(favsRef);
          const loadedFavs = snapshot.docs.map((doc) => doc.id); // use doc IDs as phraseIds

          setFavourites(loadedFavs);
          localStorage.setItem("favourites", JSON.stringify(loadedFavs));
        } catch (err) {
          console.error("Failed to load favourites from Firestore:", err);
        }
      } else {
        // User logged out → clear or keep local
        setFavourites([]);
        localStorage.removeItem("favourites");
      }
    });

    return unsubscribe;
  }, []);

  const isFavourited = (phraseId) => favourites.includes(phraseId);

  const toggleFavourite = async (phraseId) => {
    let updatedFavs;

    if (favourites.includes(phraseId)) {
      updatedFavs = favourites.filter((id) => id !== phraseId);
    } else {
      updatedFavs = [...favourites, phraseId];
    }

    // Update local state + storage immediately
    setFavourites(updatedFavs);
    localStorage.setItem("favourites", JSON.stringify(updatedFavs));

    // If logged in → sync to Firestore
    const user = auth.currentUser;
    if (user) {
      const favRef = doc(db, "users", user.uid, "favourites", phraseId);

      try {
        if (updatedFavs.includes(phraseId)) {
          // Add
          await setDoc(favRef, {
            phraseId,
            addedAt: new Date().toISOString(),
          });
        } else {
          // Remove
          await deleteDoc(favRef);
        }
      } catch (err) {
        console.error("Firestore sync failed:", err);
        // Optional: rollback local state if you want atomicity
      }
    }
  };

  const getFavourites = () => favourites;

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourited, toggleFavourite, getFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContext;

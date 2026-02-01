import { createContext, useState, useEffect } from "react";

const FavouritesContext = createContext(null);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const isFavourited = (phraseId) => favourites.includes(phraseId);

  const toggleFavourite = (phraseId) => {
    setFavourites((prev) => {
      if (prev.includes(phraseId)) {
        return prev.filter((id) => id !== phraseId);
      }
      return [...prev, phraseId];
    });
  };

  const getFavourites = () => favourites;

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourited, toggleFavourite, getFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContext; // optional – if you ever need the raw context

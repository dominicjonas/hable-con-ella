import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { FavouritesProvider } from "./contexts/FavouritesContext";

function App() {
  return (
    <Router>
      <FavouritesProvider>
        <AppRoutes />
      </FavouritesProvider>
    </Router>
  );
}

export default App;

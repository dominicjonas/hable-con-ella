import { BrowserRouter as Router } from "react-router-dom";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

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

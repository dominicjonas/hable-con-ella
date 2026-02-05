import { BrowserRouter as Router } from "react-router-dom";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavouritesProvider>
          <AppRoutes />
        </FavouritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

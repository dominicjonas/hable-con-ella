import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavouritesProvider>
          <Toaster richColors position="bottom-right" />
          <AppRoutes />
        </FavouritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Header from './components/common/Header'

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App

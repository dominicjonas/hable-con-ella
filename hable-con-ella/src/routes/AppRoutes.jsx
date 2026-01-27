import { Routes, Route } from 'react-router-dom'
import IntroPage from '../components/pages/IntroPage'
import Category from '../components/pages/Category'

export default function AppRoutes() {
  return (
     <Routes>
        <Route path='/' element={<IntroPage />} />
        <Route path='/categories' element={<Category />} />
        <Route path="*" element={<div>404 - Pagina no encontrada</div>} />
     </Routes>
  );
}

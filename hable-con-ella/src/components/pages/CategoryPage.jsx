import CategoryCard from '../common/CategoryCard'
import Header from '../common/Header'
import './CategoryPage.scss'

const CategoryPage = () => {
  return (
    <>
    <Header showBackButton={true} />
      <div className="category-page-container">
        <div className="category-card-container">
          <CategoryCard icon="👋" title="Saludos" description="Greetings"/>
          <CategoryCard icon="🥩" title="Comida" description="Food"/>
          <CategoryCard icon="🗣️" title="Lunfardo" description="Slang"/>
          <CategoryCard icon="✈️" title="Viaje" description="Travel"/>
          <CategoryCard icon="☕️" title="Vida Diaria" description="Daily Life"/>
          <CategoryCard icon="💬" title="Expresiones" description="Expressions"/>
        </div>
      </div>
    </>
  )
}

export default CategoryPage
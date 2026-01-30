import CategoryCard from "../common/CategoryCard";
import Header from "../common/Header";
import "./CategoryPage.scss";
import { categories } from "../../data/categories";

const CategoryPage = () => {
  return (
    <>
      <Header showBackButton={true} title="Hable Con Ella" />
      <div className="category-page-container">
        <div className="category-card-container">
          {categories.map((category) => (
            <CategoryCard key={category.id} icon={category.icon} title={category.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

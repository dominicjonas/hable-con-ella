import { useNavigate } from "react-router-dom";
import CategoryCard from "../common/CategoryCard";
import Header from "../common/Header";
import "./CategoryPage.scss";
import { useAuth } from "../../hooks/useAuth";
import { categories } from "../../data/categories";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <>
      <Header showBackButton={!user} showRightContent={true} title="Categorías" />
      <div className="category-page-container">
        <div className="category-card-container">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              onClick={() => navigate(`/phrase/${category.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CategoryCard from "../common/CategoryCard";
import Header from "../common/Header";
import { useAuth } from "../../hooks/useAuth";
import { categories } from "../../data/categories";
import "./style/CategoryPage.scss";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <>
      <Header showBackButton={!user} showRightContent={true} title="Categorías" />
      <div className="category-page-container">
        <motion.div className="category-card-container" variants={containerVariants}>
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              initial="hidden"
              animate="visible"
              cursor="pointer"
            >
              <CategoryCard
                key={category.id}
                icon={category.icon}
                title={category.title}
                onClick={() => navigate(`/phrase/${category.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default CategoryPage;

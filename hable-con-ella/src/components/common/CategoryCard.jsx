// src/components/common/CategoryCard.jsx
import PropTypes from 'prop-types';
import './CategoryCard.scss';

const CategoryCard = ({
  title,
  description,
  icon,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <div
      className={`category-card ${className} ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`Ir a la categoría ${title}`}
      aria-disabled={disabled}
    >
      <div className="category-card-icon">{icon}</div>
      <div className="category-card-body">
        <h3 className="category-card-title">{title}</h3>
        <p className="category-card-description">{description}</p>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired, // emoji, <img />, <svg />, etc.
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CategoryCard;
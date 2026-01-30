import PropTypes from "prop-types";
import Icon from "./Icon";
import "./FooterNav.scss";

const FooterNav = ({ onPrev, onNext, currentIndex, total }) => {
  return (
    <footer className="phrase-footer">
      <button className="nav-button prev" onClick={onPrev} disabled={currentIndex === 0} aria-label="Previous phrase">
        <Icon name="chevron-left" size={32} />
      </button>

      <span className="progress">
        {currentIndex + 1} / {total}
      </span>

      <button
        className="nav-button next"
        onClick={onNext}
        disabled={currentIndex === total - 1}
        aria-label="Next phrase"
      >
        <Icon name="chevron-left" size={32} className="rotate-180" />
      </button>
    </footer>
  );
};

FooterNav.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default FooterNav;

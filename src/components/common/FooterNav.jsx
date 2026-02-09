import PropTypes from "prop-types";
import Icon from "./Icon";
import "./style/FooterNav.scss";

const FooterNav = ({ onPrev, onNext, currentIndex, total }) => {
  return (
    <footer className="phrase-footer">
      <button className="nav-button prev" onClick={onPrev} disabled={currentIndex === 0} aria-label="Previous phrase">
        <Icon name="chevron-left" size={32} />
      </button>

      <div className="progress-dots">
        {Array.from({ length: total }).map((_, idx) => (
          <span key={idx} className={`dot ${idx === currentIndex ? "active" : ""}`} />
        ))}
      </div>

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

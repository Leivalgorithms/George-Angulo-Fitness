// HamburgerButton.jsx
import { HEADER_CONFIG } from './constants';

const HamburgerButton = ({ menuOpen, toggleMenu }) => {
  return (
    <div className="mobile-menu-button">
      <button
        className={`hamburger ${menuOpen ? "hamburger--active" : ""}`}
        onClick={toggleMenu}
        aria-label={HEADER_CONFIG.menuAriaLabel}
        aria-expanded={menuOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
    </div>
  );
};

export default HamburgerButton;
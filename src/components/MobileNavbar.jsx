import { Link } from 'react-router-dom';
import './MobileNavbar.css';

function MobileNavbar({ onMenuClick }) {
  return (
    <header className="mobile-navbar">
      <button
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        ☰
      </button>
      <Link to="/" className="mobile-brand">
        <span className="mobile-brand-mark">A</span>
        AssistLink
      </Link>
    </header>
  );
}

export default MobileNavbar;
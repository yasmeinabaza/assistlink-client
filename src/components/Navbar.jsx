import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onMenuClick }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="home-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-mark">A</span>
          AssistLink
        </Link>

        {isHome ? (
          <div className="navbar-actions">
            <Link to="/login" className="nav-link-login">Login</Link>
            <Link to="/register" className="nav-link-register">Create Account</Link>
          </div>
        ) : (
          <button
            className="menu-button"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            ☰
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="home-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-mark">A</span>
          AssistLink
        </Link>

        <div className="navbar-actions">
          <Link to="/login" className="nav-link-login">Login</Link>
          <Link to="/register" className="nav-link-register">Create Account</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
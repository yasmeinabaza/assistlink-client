import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/"> AssistLink</Link>

        <div className="d-flex">
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
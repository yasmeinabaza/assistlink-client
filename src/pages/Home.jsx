import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Healthcare Assistive Device Platform</h1>
              <p className="hero-tagline">
                Connecting Patients with the<br />Assistive Devices They Need
              </p>
              <p className="hero-description">
                AssistLink manages the complete journey — from submitting a device<br />
                request through care center review, engineering, production, and delivery.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn-get-started">
                  Get Started →
                </Link>
                <Link to="/login" className="btn-login-outline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How AssistLink Works</h2>
          <p className="section-subtitle">
            A simple, transparent process from request to delivery.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Patient Submits a Request</h3>
              <p>
                Patients describe their condition and the type of device they 
                need. They select their registered care center during sign-up.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Care Center Reviews &amp; Approves</h3>
              <p>
                A clinician reviews the request, selects a device reference 
                via AccessGUDID, and assigns a certified engineer.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Engineer Assesses &amp; Produces</h3>
              <p>
                The engineer reviews patient measurements, completes the 
                assessment, manages production, and coordinates delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Care Centers Section */}
      <section className="care-centers-section">
        <div className="container">
          <h2>Registered Care Centers</h2>
          <p className="section-subtitle">
            Patients select their care center when creating an account.
          </p>

          <div className="centers-grid">
            <div className="center-card">
              <h4>Metropolitan Rehab Center</h4>
              <p className="center-type">Rehabilitation &amp; Prosthetics</p>
              <p className="center-location">📍 Nairobi</p>
            </div>

            <div className="center-card">
              <h4>City Orthopedic Clinic</h4>
              <p className="center-type">Orthopedic Devices</p>
              <p className="center-location">📍 Nairobi</p>
            </div>

            <div className="center-card">
              <h4>National Prosthetics Institute</h4>
              <p className="center-type">Prosthetics &amp; Orthotics</p>
              <p className="center-location">📍 Mombasa</p>
            </div>

            <div className="center-card">
              <h4>St. Luke's Rehabilitation</h4>
              <p className="center-type">Physical Rehabilitation</p>
              <p className="center-location">📍 Kisumu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <p>© 2025 AssistLink — Healthcare Assistive Device Management</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
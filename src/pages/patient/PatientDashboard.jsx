// Import necessary React hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions to fetch data from backend
import { getRequestsByPatient, getPatients } from '../../services/api';
import './PatientDashboard.css';

function PatientDashboard() {
  // State variables to store data and UI states
  const [requests, setRequests] = useState([]);      // Store user's requests
  const [loading, setLoading] = useState(true);      // Show loading indicator
  const [error, setError] = useState(null);          // Store error messages
  const [user, setUser] = useState(null);            // Store logged-in user data

  // useEffect runs when component mounts
  // Get user from localStorage (saved after login - like course demo)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
  }, []); // Empty dependency array = runs once on mount

  // Fetch requests when user is loaded
  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]); // Runs when 'user' state changes

  // Function to fetch user's requests from backend
  const fetchRequests = async () => {
    try {
      setLoading(true);
      // Call API to get requests for this patient
      const data = await getRequestsByPatient(user.id);
      setRequests(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch requests');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  // Status order for progress bar
  const statusOrder = ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Delivered'];

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Patient" userName={user?.name || 'Patient'} userEmail={user?.email || ''}>
        <div className="patient-dashboard">
          <div className="loading-text">Loading your requests...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Patient" userName={user?.name || 'Patient'} userEmail={user?.email || ''}>
        <div className="patient-dashboard">
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchRequests}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    // Layout component wraps page with SideNav and Navbar
    <Layout userRole="Patient" userName={user?.name || 'Patient'} userEmail={user?.email || ''}>
      <div className="patient-dashboard">
        {/* Page Header */}
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <p className="welcome-text">Welcome back, {user?.name?.split(' ')[0] || 'User'}.</p>
        </div>

        <div className="dashboard-grid">
          {/* Left Column - Requests List */}
          <div className="requests-column">
            <div className="section-header">
              <h2>My Requests</h2>
              {/* Link to create new request */}
              <Link to="/patient/request/new" className="btn-new-request">
                + New Request
              </Link>
            </div>

            {requests.length === 0 ? (
              // Show empty state if no requests
              <div className="no-requests">
                <p>You haven't submitted any requests yet.</p>
                <Link to="/patient/request/new" className="btn-primary">
                  Create Your First Request
                </Link>
              </div>
            ) : (
              // Map through requests and display each one
              requests.map(request => {
                // Calculate progress based on status
                const currentStep = statusOrder.indexOf(request.status) + 1;
                const totalSteps = statusOrder.length;
                const progressWidth = (currentStep / totalSteps) * 100;

                return (
                  <div key={request.id} className="request-card">
                    <div className="request-top">
                      <span className="request-id">{request.request_number}</span>
                      <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                        {request.status}
                      </span>
                    </div>

                    <h3 className="request-device">{request.device_type}</h3>
                    <p className="request-meta">Submitted {request.submitted_date}</p>

                    {/* Progress steps bar */}
                    <div className="progress-steps">
                      {statusOrder.map((step, idx) => (
                        <div key={step} className="step-wrapper">
                          <div className={`step-dot ${idx < currentStep ? 'done' : ''}`} />
                          <span className={`step-label ${idx < currentStep ? 'done' : ''}`}>
                            {step}
                          </span>
                          {idx < statusOrder.length - 1 && (
                            <div className={`step-line ${idx < currentStep - 1 ? 'done' : ''}`} />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="request-footer">
                      <Link to={`/patient/request/${request.id}`} className="btn-view">
                        View Request
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column - Sidebar with user info */}
          <div className="sidebar-column">
            <div className="sidebar-card">
              <h3>My Care Center</h3>
              <p className="center-name">{user?.careCenterName || 'N/A'}</p>
              <p className="center-location">{user?.careCenterLocation || ''}</p>
            </div>

            <div className="sidebar-card">
              <div className="address-header">
                <h3>Delivery Address</h3>
                <button className="btn-edit">Edit address</button>
              </div>
              <p className="address-text">14 Maple Avenue, Apt 2B, Nairobi 00100</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PatientDashboard;
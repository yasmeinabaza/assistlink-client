// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getRequests, getPatients } from '../../services/api';
import './CareCenterDashboard.css';

function CareCenterDashboard() {
  // useLocation gives us the current URL path
  const location = useLocation();
  
  // State variables
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'requests', 'patients'
  const [requests, setRequests] = useState([]);
  const [patients, setPatients] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage (like course demo)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Set active tab based on URL path (for direct navigation from SideNav)
  useEffect(() => {
    const path = location.pathname;
    if (path === '/care-center/requests') {
      setActiveTab('requests');
    } else if (path === '/care-center/patients') {
      setActiveTab('patients');
    } else if (path === '/care-center') {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  // Fetch data when user is loaded
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Function to fetch requests and patients from backend
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both requests and patients in parallel (Promise.all)
      const [requestsData, patientsData] = await Promise.all([
        getRequests(),
        getPatients()
      ]);
      setRequests(requestsData);
      setPatients(patientsData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change from SideNav
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Calculate stats
  const totalPatients = patients.length;
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
        <div className="care-center-dashboard">
          <div className="loading-text">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
        <div className="care-center-dashboard">
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchData}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout 
      userRole="Care Center" 
      userName={user?.name || 'Staff'} 
      userEmail={user?.email || ''}
      onTabChange={handleTabChange}
    >
      <div className="care-center-dashboard">
        {/* ============================================ */}
        {/* DASHBOARD VIEW - Overview of the care center */}
        {/* ============================================ */}
        {activeTab === 'dashboard' && (
          <div className="cc-dashboard-view">
            <div className="cc-header">
              <h1>{user?.careCenterName || 'Care Center'}</h1>
              <p className="cc-stats">Welcome back, {user?.name || 'Staff'}</p>
            </div>

            {/* Stats Cards */}
            <div className="cc-stats-grid">
              <div className="cc-stat-card">
                <div className="stat-number">{totalPatients}</div>
                <div className="stat-label">Patients</div>
              </div>
              <div className="cc-stat-card">
                <div className="stat-number">{totalRequests}</div>
                <div className="stat-label">Total Requests</div>
              </div>
              <div className="cc-stat-card">
                <div className="stat-number">{pendingRequests}</div>
                <div className="stat-label">Pending Review</div>
              </div>
              <div className="cc-stat-card">
                <div className="stat-number">{user?.careCenterLocation || 'N/A'}</div>
                <div className="stat-label">Location</div>
              </div>
            </div>

            {/* About Section */}
            <div className="cc-info-card">
              <h2>About Your Care Center</h2>
              <p>
                {user?.careCenterName || 'Your care center'} is a dedicated rehabilitation facility providing 
                assistive device services to patients in need. Our team works closely 
                with patients, engineers, and healthcare providers to ensure the best 
                outcomes.
              </p>
              <div className="cc-info-actions">
                <Link to="/care-center/requests" className="cc-info-btn">
                  View All Requests
                </Link>
                <Link to="/care-center/patients" className="cc-info-btn secondary">
                  View Patients
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="cc-recent">
              <h3>Recent Activity</h3>
              <div className="cc-activity-list">
                {requests.slice(0, 3).map(r => (
                  <div key={r.id} className="cc-activity-item">
                    <span className="activity-request">{r.request_number}</span>
                    <span className="activity-patient">{r.patient_name}</span>
                    <span className={`activity-status ${r.status.toLowerCase().replace(' ', '-')}`}>
                      {r.status}
                    </span>
                    <span className="activity-date">{r.submitted_date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* REQUESTS VIEW - Table of all requests */}
        {/* ============================================ */}
        {activeTab === 'requests' && (
          <div className="cc-tab-view">
            <div className="cc-tab-header">
              <h2>All Requests</h2>
              <p className="cc-tab-stats">{totalRequests} total requests</p>
            </div>

            <div className="cc-table-wrapper">
              <table className="cc-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Patient</th>
                    <th>Device Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id}>
                      <td className="cc-req-id">{r.request_number}</td>
                      <td>
                        <Link to={`/care-center/patient/${r.patient_id}`} className="cc-patient-link">
                          {r.patient_name}
                        </Link>
                      </td>
                      <td>{r.device_type}</td>
                      <td>{r.submitted_date}</td>
                      <td>
                        <span className={`status-badge ${r.status.toLowerCase().replace(' ', '-')}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/care-center/request/${r.id}`} className="cc-btn-view">
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================ */}
        {/* PATIENTS VIEW - List of all patients */}
        {/* ============================================ */}
        {activeTab === 'patients' && (
          <div className="cc-tab-view">
            <div className="cc-tab-header">
              <h2>My Patients</h2>
              <p className="cc-tab-stats">{totalPatients} patients</p>
            </div>

            <div className="cc-patients-list">
              {patients.map(p => {
                // Count requests for this patient
                const patientRequests = requests.filter(r => r.patient_id === p.id);
                const active = patientRequests.filter(r => r.status !== 'Delivered' && r.status !== 'Rejected');

                return (
                  <div key={p.id} className="cc-patient-card">
                    <div className="cc-patient-info">
                      <Link to={`/care-center/patient/${p.id}`} className="cc-patient-name">
                        <h4>{p.name}</h4>
                      </Link>
                      <p className="cc-patient-detail">📧 {p.email}</p>
                      <p className="cc-patient-detail">📞 {p.phone || 'N/A'}</p>
                    </div>
                    <div className="cc-patient-stats">
                      <span className="cc-stat-badge">{patientRequests.length} requests</span>
                      <span className="cc-stat-badge active">{active.length} active</span>
                      <Link to={`/care-center/patient/${p.id}`} className="cc-btn-view">
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CareCenterDashboard;
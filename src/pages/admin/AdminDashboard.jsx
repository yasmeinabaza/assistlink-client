// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getUsers, getCareCenters, getEngineers } from '../../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  // State variables
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [careCenters, setCareCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch data when user is loaded
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Function to fetch all admin data
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch all data in parallel
      const [usersData, centersData, engineersData] = await Promise.all([
        getUsers(),
        getCareCenters(),
        getEngineers()
      ]);
      
      // Filter patients from all users
      const patientsData = usersData.filter(u => u.role === 'patient');
      
      setPatients(patientsData);
      setCareCenters(centersData);
      setEngineers(engineersData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalPatients = patients.length;
  const totalEngineers = engineers.length;
  const totalCareCenters = careCenters.length;
  const activeRequests = 3; // You can fetch this from API

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="admin-dashboard">
          <div className="loading-text">Loading dashboard...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="admin-dashboard">
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchData}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
      <div className="admin-dashboard">
        {/* Page Header with Stats */}
        <div className="admin-header">
          <h1>Platform Overview</h1>
          <p className="admin-stats">
            {totalPatients} patients · {totalEngineers} engineers · {totalCareCenters} care centers · {activeRequests} active requests
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="admin-grid">
          {/* Patients Card */}
          <div className="admin-card">
            <div className="card-icon">👤</div>
            <h3>Patients</h3>
            <p>Manage all registered patients.</p>
            <Link to="/admin/patients" className="card-link">Manage Patients →</Link>
          </div>

          {/* Care Centers Card */}
          <div className="admin-card">
            <div className="card-icon">🏥</div>
            <h3>Care Centers</h3>
            <p>View and manage registered care centers.</p>
            <Link to="/admin/centers" className="card-link">Manage Care Centers →</Link>
          </div>

          {/* Request Management Card */}
          <div className="admin-card">
            <div className="card-icon">📋</div>
            <h3>Request Management</h3>
            <p>View and manage all active device requests.</p>
            <Link to="/admin/requests" className="card-link">Manage Requests →</Link>
          </div>

          {/* Engineers Card */}
          <div className="admin-card">
            <div className="card-icon">🔧</div>
            <h3>Engineers</h3>
            <p>View and manage certified engineers.</p>
            <Link to="/admin/engineers" className="card-link">Manage Engineers →</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
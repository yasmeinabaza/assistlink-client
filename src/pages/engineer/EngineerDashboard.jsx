// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getRequestsByEngineer } from '../../services/api';
import './EngineerDashboard.css';

function EngineerDashboard() {
  // State variables
  const [search, setSearch] = useState('');
  const [cases, setCases] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage (like course demo)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
    }
  }, []);

  // Fetch cases when user is loaded
  useEffect(() => {
    if (user) {
      fetchCases();
    }
  }, [user]);

  // Function to fetch engineer's cases from backend
  const fetchCases = async () => {
    try {
      setLoading(true);
      // Get requests assigned to this engineer
      // You'll need to add this function to api.js
      const data = await getRequestsByEngineer(user.id);
      setCases(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch cases');
    } finally {
      setLoading(false);
    }
  };

  // Filter cases based on search input
  const filteredCases = cases.filter(c =>
    c.request_number.toLowerCase().includes(search.toLowerCase()) ||
    c.patient_name.toLowerCase().includes(search.toLowerCase())
  );

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Engineer" userName={user?.name || 'Engineer'} userEmail={user?.email || ''}>
        <div className="engineer-dashboard">
          <div className="loading-text">Loading your cases...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Engineer" userName={user?.name || 'Engineer'} userEmail={user?.email || ''}>
        <div className="engineer-dashboard">
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchCases}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Engineer" userName={user?.name || 'Engineer'} userEmail={user?.email || ''}>
      <div className="engineer-dashboard">
        {/* Header with search bar in same row */}
        <div className="engineer-header-row">
          <div>
            <h1>My Cases</h1>
            <p className="engineer-subtitle">
              Good morning, {user?.name?.split(' ')[0] || 'Engineer'}.
            </p>
          </div>
          {/* Search input - filters cases by patient or ID */}
          <input
            type="text"
            placeholder="Search patient or ID..."
            className="engineer-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cases Table */}
        <div className="engineer-table-wrapper">
          <table className="engineer-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Patient</th>
                <th>Device</th>
                <th>Measurements</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(c => (
                <tr key={c.id}>
                  <td className="eng-req-id">{c.request_number}</td>
                  <td>{c.patient_name}</td>
                  <td>{c.device_type}</td>
                  {/* Show if measurements are on file */}
                  <td>{c.height || c.weight ? 'On file' : 'Pending'}</td>
                  <td>
                    <span className={`status-badge ${c.status.toLowerCase().replace(' ', '-')}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    {/* Link to case detail page */}
                    <Link to={`/engineer/case/${c.id}`} className="eng-btn-view">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show empty state if no cases */}
        {filteredCases.length === 0 && (
          <div className="no-cases">
            <p>No cases found. {search ? 'Try a different search term.' : ''}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default EngineerDashboard;
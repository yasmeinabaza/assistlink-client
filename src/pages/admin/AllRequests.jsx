// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getRequests } from '../../services/api';
import './AllRequests.css';

function AllRequests() {
  // State variables
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch requests when user is loaded
  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  // Function to fetch all requests from backend
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getRequests();
      setRequests(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  // Filter requests based on search
  const filteredRequests = requests.filter(r =>
    r.request_number.toLowerCase().includes(search.toLowerCase()) ||
    r.patient_name.toLowerCase().includes(search.toLowerCase()) ||
    r.device_type.toLowerCase().includes(search.toLowerCase())
  );

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="all-requests">
          <div className="loading-text">Loading requests...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="all-requests">
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchRequests}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
      <div className="all-requests">
        {/* Page Header */}
        <div className="ar-header">
          <h1>All Requests</h1>
          <p className="ar-stats">{requests.length} total requests</p>
        </div>

        {/* Search Bar */}
        <div className="ar-controls">
          <input
            type="text"
            placeholder="Search requests..."
            className="ar-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Requests Table */}
        <div className="ar-table-wrapper">
          <table className="ar-table">
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
              {filteredRequests.map(r => (
                <tr key={r.id}>
                  <td className="ar-req-id">{r.request_number}</td>
                  <td>
                    <Link to={`/care-center/patient/${r.patient_id}`} className="ar-patient-link">
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
                    <Link to={`/care-center/request/${r.id}`} className="ar-btn-view">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show empty state if no requests */}
        {filteredRequests.length === 0 && (
          <div className="no-requests">
            <p>No requests found. {search ? 'Try a different search term.' : ''}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AllRequests;
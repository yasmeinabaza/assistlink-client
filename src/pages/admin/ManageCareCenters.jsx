// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getCareCenters, deleteCareCenter } from '../../services/api';
import './ManageCareCenters.css';

function ManageCareCenters() {
  // State variables
  const [user, setUser] = useState(null);
  const [centers, setCenters] = useState([]);
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

  // Fetch care centers when user is loaded
  useEffect(() => {
    if (user) {
      fetchCenters();
    }
  }, [user]);

  // Function to fetch care centers from backend
  const fetchCenters = async () => {
    try {
      setLoading(true);
      const data = await getCareCenters();
      setCenters(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch care centers');
    } finally {
      setLoading(false);
    }
  };

  // Filter centers based on search
  const filteredCenters = centers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete care center
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this care center?')) {
      try {
        await deleteCareCenter(id);
        alert('Care center deleted successfully!');
        fetchCenters(); // Refresh list
      } catch (err) {
        alert(err.message || 'Failed to delete care center');
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="manage-centers">
          <div className="loading-text">Loading care centers...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="manage-centers">
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchCenters}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
      <div className="manage-centers">
        {/* Page Header */}
        <div className="mc-header">
          <h1>Care Centers</h1>
          <p className="mc-stats">{centers.length} registered care centers</p>
        </div>

        {/* Controls: Search and Add Button */}
        <div className="mc-controls">
          <Link to="/admin/centers/add" className="btn-add-center">
            + Add Center
          </Link>
          <input
            type="text"
            placeholder="Search centers..."
            className="mc-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ===== DESKTOP TABLE ===== */}
        <div className="mc-table-wrapper">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Center Name</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Patients</th>
                <th>Staff</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCenters.map(c => (
                <tr key={c.id}>
                  <td className="mc-center-name">{c.name}</td>
                  <td>📍 {c.location}</td>
                  <td>{c.phone || 'N/A'}</td>
                  <td>{c.patients || 0}</td>
                  <td>{c.staff || 0}</td>
                  <td>
                    <div className="mc-action-buttons">
                      <button className="mc-btn-edit" onClick={() => alert(`Edit ${c.name}`)}>
                        ✎
                      </button>
                      <button className="mc-btn-delete" onClick={() => handleDelete(c.id)}>
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== MOBILE CARDS ===== */}
        <div className="mc-mobile-cards">
          {filteredCenters.map(c => (
            <div key={c.id} className="mc-mobile-card">
              <h4 className="mc-mobile-name">{c.name}</h4>
              <p className="mc-mobile-detail">📍 {c.location}</p>
              <p className="mc-mobile-detail">📞 {c.phone || 'N/A'}</p>
              <p className="mc-mobile-detail">Patients: {c.patients || 0} · Staff: {c.staff || 0}</p>
              <div className="mc-mobile-actions">
                <button className="edit" onClick={() => alert(`Edit ${c.name}`)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(c.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mc-footer">
          <span>Showing {filteredCenters.length} of {centers.length} centers</span>
        </div>
      </div>
    </Layout>
  );
}

export default ManageCareCenters;
// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getEngineers, deleteEngineer, updateEngineer } from '../../services/api';
import './ManageEngineers.css';

function ManageEngineers() {
  // State variables
  const [user, setUser] = useState(null);
  const [engineers, setEngineers] = useState([]);
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

  // Fetch engineers when user is loaded
  useEffect(() => {
    if (user) {
      fetchEngineers();
    }
  }, [user]);

  // Function to fetch engineers from backend
  const fetchEngineers = async () => {
    try {
      setLoading(true);
      const data = await getEngineers();
      setEngineers(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch engineers');
    } finally {
      setLoading(false);
    }
  };

  // Filter engineers based on search
  const filteredEngineers = engineers.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.specialization.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete engineer
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this engineer?')) {
      try {
        await deleteEngineer(id);
        alert('Engineer deleted successfully!');
        fetchEngineers(); // Refresh list
      } catch (err) {
        alert(err.message || 'Failed to delete engineer');
      }
    }
  };

  // Handle toggle engineer status (active/inactive)
  const handleToggleStatus = async (id) => {
    const engineer = engineers.find(e => e.id === id);
    const newStatus = engineer.status === 'active' ? 'inactive' : 'active';
    
    try {
      await updateEngineer(id, { status: newStatus });
      alert(`${engineer.name} status changed to ${newStatus}`);
      fetchEngineers(); // Refresh list
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="manage-engineers">
          <div className="loading-text">Loading engineers...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="manage-engineers">
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchEngineers}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
      <div className="manage-engineers">
        {/* Page Header */}
        <div className="me-header">
          <h1>Engineers</h1>
          <p className="me-stats">{engineers.length} registered engineers</p>
        </div>

        {/* Controls: Search and Add Button */}
        <div className="me-controls">
          <Link to="/admin/engineers/add" className="btn-add-engineer">
            + Add Engineer
          </Link>
          <input
            type="text"
            placeholder="Search engineers..."
            className="me-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ===== DESKTOP TABLE ===== */}
        <div className="me-table-wrapper">
          <table className="me-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEngineers.map(e => (
                <tr key={e.id}>
                  <td>
                    <div className="me-engineer-name">
                      <span className="me-avatar">{e.name.charAt(0)}</span>
                      <span>{e.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="me-specialization-badge">
                      {e.specialization}
                    </span>
                  </td>
                  <td>
                    <span className={`me-status-badge ${e.status}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <div className="me-action-buttons">
                      <button className="me-btn-edit" onClick={() => alert(`Edit ${e.name}`)}>
                        ✎
                      </button>
                      <button className="me-btn-toggle" onClick={() => handleToggleStatus(e.id)}>
                        ⟳
                      </button>
                      <button className="me-btn-delete" onClick={() => handleDelete(e.id)}>
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
        <div className="me-mobile-cards">
          {filteredEngineers.map(e => (
            <div key={e.id} className="me-mobile-card">
              <div className="me-mobile-card-header">
                <span className="me-mobile-name">{e.name}</span>
                <span className={`me-mobile-status ${e.status}`}>{e.status}</span>
              </div>
              <p className="me-mobile-detail"><strong>Specialization:</strong> {e.specialization}</p>
              <div className="me-mobile-actions">
                <button className="edit" onClick={() => alert(`Edit ${e.name}`)}>Edit</button>
                <button className="toggle" onClick={() => handleToggleStatus(e.id)}>Toggle</button>
                <button className="delete" onClick={() => handleDelete(e.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="me-footer">
          <span>Showing {filteredEngineers.length} of {engineers.length} engineers</span>
        </div>
      </div>
    </Layout>
  );
}

export default ManageEngineers;
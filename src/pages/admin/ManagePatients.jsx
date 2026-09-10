// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getPatients, deleteUser, updateUser } from '../../services/api';
import './ManagePatients.css';

function ManagePatients() {
  // State variables
  const [user, setUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch patients when user is loaded
  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  // Function to fetch patients from backend
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  // Filter patients based on search and status filter
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle delete patient
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deleteUser(id);
        alert('Patient deleted successfully!');
        fetchPatients(); // Refresh list
      } catch (err) {
        alert(err.message || 'Failed to delete patient');
      }
    }
  };

  // Handle toggle patient status (active/inactive)
  const handleToggleStatus = async (id) => {
    const patient = patients.find(p => p.id === id);
    const newStatus = patient.status === 'active' ? 'inactive' : 'active';
    
    try {
      await updateUser(id, { status: newStatus });
      alert(`${patient.name} status changed to ${newStatus}`);
      fetchPatients(); // Refresh list
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="manage-patients">
          <div className="loading-text">Loading patients...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
        <div className="manage-patients">
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchPatients}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Administrator" userName={user?.name || 'Admin'} userEmail={user?.email || ''}>
      <div className="manage-patients">
        {/* Page Header */}
        <div className="mp-header">
          <h1>Patients</h1>
          <p className="mp-stats">{patients.length} registered patients</p>
        </div>

        {/* Controls: Filters, Search, Add Button */}
        <div className="mp-controls">
          <div className="mp-filter-group">
            <button 
              className={`mp-filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button 
              className={`mp-filter-btn ${statusFilter === 'active' ? 'active' : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              Active
            </button>
            <button 
              className={`mp-filter-btn ${statusFilter === 'inactive' ? 'active' : ''}`}
              onClick={() => setStatusFilter('inactive')}
            >
              Inactive
            </button>
          </div>
          <div className="mp-controls-row">
            {/* Link to add patient page */}
            <Link to="/admin/patients/add" className="btn-add-patient">
              + Add Patient
            </Link>
            <input
              type="text"
              placeholder="Search patients..."
              className="mp-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ===== DESKTOP TABLE ===== */}
        <div className="mp-table-wrapper">
          <table className="mp-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Care Center</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="mp-patient-name">
                      <span className="mp-avatar">{p.name.charAt(0)}</span>
                      <div>
                        <span className="mp-fullname">{p.name}</span>
                        <span className="mp-phone">{p.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="mp-email">{p.email}</td>
                  <td>{p.care_center_name || 'N/A'}</td>
                  <td>
                    <span className={`mp-status-badge ${p.status}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="mp-action-buttons">
                      <button className="mp-btn-edit" onClick={() => alert(`Edit ${p.name}`)}>
                        ✎
                      </button>
                      <button className="mp-btn-toggle" onClick={() => handleToggleStatus(p.id)}>
                        ⟳
                      </button>
                      <button className="mp-btn-delete" onClick={() => handleDelete(p.id)}>
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
        <div className="mp-mobile-cards">
          {filteredPatients.map(p => (
            <div key={p.id} className="mp-mobile-card">
              <div className="mp-mobile-card-header">
                <span className="mp-mobile-name">{p.name}</span>
                <span className={`mp-mobile-status ${p.status}`}>{p.status}</span>
              </div>
              <p className="mp-mobile-detail"><strong>Email:</strong> {p.email}</p>
              <p className="mp-mobile-detail"><strong>Phone:</strong> {p.phone || 'N/A'}</p>
              <p className="mp-mobile-detail"><strong>Care Center:</strong> {p.care_center_name || 'N/A'}</p>
              <div className="mp-mobile-actions">
                <button className="edit" onClick={() => alert(`Edit ${p.name}`)}>Edit</button>
                <button className="toggle" onClick={() => handleToggleStatus(p.id)}>Toggle</button>
                <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mp-footer">
          <span>Showing {filteredPatients.length} of {patients.length} patients</span>
        </div>
      </div>
    </Layout>
  );
}

export default ManagePatients;
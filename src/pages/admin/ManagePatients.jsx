import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyAdmin, dummyUsers } from '../../data/dummyData';
import './ManagePatients.css';

function ManagePatients() {
  const admin = dummyAdmin;
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const patients = dummyUsers.filter(u => u.role === 'patient');
  
  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      alert('Patient deleted! (Demo)');
    }
  };

  const handleToggleStatus = (id) => {
    const patient = patients.find(p => p.id === id);
    const newStatus = patient.status === 'active' ? 'inactive' : 'active';
    alert(`${patient.name} status changed to ${newStatus}`);
  };

  return (
    <Layout userRole="Administrator" userName={admin.name} userEmail={admin.email}>
      <div className="manage-patients">
        <div className="mp-header">
          <h1>Patients</h1>
          <p className="mp-stats">{patients.length} registered patients</p>
        </div>

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
                        <span className="mp-phone">{p.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="mp-email">{p.email}</td>
                  <td>{p.careCenter || 'N/A'}</td>
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
              <p className="mp-mobile-detail"><strong>Phone:</strong> {p.phone}</p>
              <p className="mp-mobile-detail"><strong>Care Center:</strong> {p.careCenter || 'N/A'}</p>
              <div className="mp-mobile-actions">
                <button className="edit" onClick={() => alert(`Edit ${p.name}`)}>Edit</button>
                <button className="toggle" onClick={() => handleToggleStatus(p.id)}>Toggle</button>
                <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mp-footer">
          <span>Showing {filteredPatients.length} of {patients.length} patients</span>
        </div>
      </div>
    </Layout>
  );
}

export default ManagePatients;
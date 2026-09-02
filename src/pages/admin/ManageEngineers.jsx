import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyAdmin, dummyEngineers } from '../../data/dummyData';
import './ManageEngineers.css';

function ManageEngineers() {
  const admin = dummyAdmin;
  const [engineers, setEngineers] = useState(dummyEngineers);
  const [search, setSearch] = useState('');

  const filteredEngineers = engineers.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this engineer?')) {
      setEngineers(engineers.filter(e => e.id !== id));
      alert('Engineer deleted! (Demo)');
    }
  };

  const handleToggleStatus = (id) => {
    setEngineers(engineers.map(e => {
      if (e.id === id) {
        const newStatus = e.status === 'active' ? 'inactive' : 'active';
        alert(`${e.name} status changed to ${newStatus}`);
        return { ...e, status: newStatus };
      }
      return e;
    }));
  };

  return (
    <Layout userRole="Administrator" userName={admin.name} userEmail={admin.email}>
      <div className="manage-engineers">
        <div className="me-header">
          <h1>Engineers</h1>
          <p className="me-stats">{engineers.length} registered engineers</p>
        </div>

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

        <div className="me-footer">
          <span>Showing {filteredEngineers.length} of {engineers.length} engineers</span>
        </div>
      </div>
    </Layout>
  );
}

export default ManageEngineers;
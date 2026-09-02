import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyAdmin, dummyCareCenters } from '../../data/dummyData';
import './ManageCareCenters.css';

function ManageCareCenters() {
  const admin = dummyAdmin;
  const [centers, setCenters] = useState(dummyCareCenters);
  const [search, setSearch] = useState('');

  const filteredCenters = centers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this care center?')) {
      setCenters(centers.filter(c => c.id !== id));
      alert('Care center deleted! (Demo)');
    }
  };

  return (
    <Layout userRole="Administrator" userName={admin.name} userEmail={admin.email}>
      <div className="manage-centers">
        <div className="mc-header">
          <h1>Care Centers</h1>
          <p className="mc-stats">{centers.length} registered care centers</p>
        </div>

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
                  <td>{c.phone}</td>
                  <td>{c.patients}</td>
                  <td>{c.staff}</td>
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
              <p className="mc-mobile-detail">📞 {c.phone}</p>
              <p className="mc-mobile-detail">Patients: {c.patients} · Staff: {c.staff}</p>
              <div className="mc-mobile-actions">
                <button className="edit" onClick={() => alert(`Edit ${c.name}`)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(c.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mc-footer">
          <span>Showing {filteredCenters.length} of {centers.length} centers</span>
        </div>
      </div>
    </Layout>
  );
}

export default ManageCareCenters;
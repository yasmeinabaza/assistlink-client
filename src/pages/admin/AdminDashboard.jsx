import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dummyAdmin, dummyUsers, dummyCareCenters } from '../../data/dummyData';

function AdminDashboard() {
  const [viewMode, setViewMode] = useState('users'); // 'users' or 'centers'
  const admin = dummyAdmin;
  const users = dummyUsers;
  const centers = dummyCareCenters;

  // Count stats
  const totalUsers = users.length;
  const patients = users.filter(u => u.role === 'patient').length;
  const careStaff = users.filter(u => u.role === 'care-center').length;
  const engineers = users.filter(u => u.role === 'engineer').length;
  const activeUsers = users.filter(u => u.status === 'active').length;

  // Handle user status toggle
  const toggleUserStatus = (userId) => {
    // In the future: send to API
    const user = users.find(u => u.id === userId);
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    alert(`${user.name} status changed to ${newStatus}`);
  };

  // Handle delete user
  const deleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      alert(`${user.name} has been deleted.`);
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Administration</h2>
          <p className="text-muted">Welcome back, {admin.name}</p>
        </div>
        <div className="text-end">
          <span className="badge bg-danger p-2">Admin</span>
          <div className="small text-muted">{admin.email}</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">{totalUsers}</h5>
              <p className="card-text small">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">{activeUsers}</h5>
              <p className="card-text small">Active Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">{patients}</h5>
              <p className="card-text small">Patients</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">{careStaff + engineers}</h5>
              <p className="card-text small">Staff</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="btn-group mb-4" role="group">
        <button 
          className={`btn ${viewMode === 'users' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setViewMode('users')}
        >
          User Management
        </button>
        <button 
          className={`btn ${viewMode === 'centers' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setViewMode('centers')}
        >
          Care Centers
        </button>
      </div>

      {/* Users View */}
      {viewMode === 'users' && (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title fw-bold">All Users</h5>
              <button className="btn btn-success btn-sm">
                + Add User
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>
                        <strong>{user.name}</strong>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${
                          user.role === 'admin' ? 'bg-danger' :
                          user.role === 'care-center' ? 'bg-success' :
                          user.role === 'engineer' ? 'bg-info text-dark' :
                          'bg-secondary'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          user.status === 'active' ? 'bg-success' : 'bg-secondary'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => alert(`Edit ${user.name}`)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-warning me-1"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Care Centers View */}
      {viewMode === 'centers' && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold">Care Centers</h5>
            <button className="btn btn-success btn-sm">
              + Add Center
            </button>
          </div>
          {centers.map(center => (
            <div key={center.id} className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h6 className="fw-bold mb-1">{center.name}</h6>
                    <div className="small text-muted">
                      <div>{center.location}</div>
                      <div>{center.phone}</div>
                      <div>
                        {center.patients} patients · {center.staff} staff members
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-md-end">
                    <button className="btn btn-sm btn-outline-primary me-1">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
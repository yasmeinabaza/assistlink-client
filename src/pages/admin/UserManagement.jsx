import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dummyUsers } from '../../data/dummyData';

function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Filter users
  const filteredUsers = dummyUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Get role badge color
  const getRoleBadge = (role) => {
    switch(role) {
      case 'admin': return 'bg-danger';
      case 'care-center': return 'bg-success';
      case 'engineer': return 'bg-info text-dark';
      case 'patient': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container py-4">
      <Link to="/admin" className="btn btn-outline-secondary btn-sm mb-3">
        ← Back to Dashboard
      </Link>

      <h3 className="fw-bold mb-4">User Management</h3>

      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="patient">Patients</option>
            <option value="care-center">Care Center Staff</option>
            <option value="engineer">Engineers</option>
            <option value="admin">Admins</option>
          </select>
        </div>
        <div className="col-md-3 text-md-end">
          <button className="btn btn-success">+ Add User</button>
        </div>
      </div>

      {/* User Cards */}
      <div className="row">
        {filteredUsers.map(user => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h6 className="fw-bold mb-1">{user.name}</h6>
                  <span className={`badge ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                </div>
                <p className="small text-muted mb-1">{user.email}</p>
                <p className="small text-muted mb-1">{user.phone}</p>
                <p className="small text-muted mb-2">
                  Status: <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                    {user.status}
                  </span>
                </p>
                <div className="d-flex gap-1">
                  <button className="btn btn-sm btn-outline-primary">Edit</button>
                  <button className="btn btn-sm btn-outline-warning">
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No users found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
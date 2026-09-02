import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyAdmin, dummyUsers, dummyCareCenters, dummyEngineers } from '../../data/dummyData';
import './AdminDashboard.css';

function AdminDashboard() {
  const admin = dummyAdmin;

  const patients = dummyUsers.filter(u => u.role === 'patient').length;
  const engineers = dummyEngineers.length;
  const careCenters = dummyCareCenters.length;
  const activeRequests = 3;

  return (
    <Layout userRole="Administrator" userName={admin.name} userEmail={admin.email}>
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Platform Overview</h1>
          <p className="admin-stats">
            {patients} patients · {engineers} engineers · {careCenters} care centers · {activeRequests} active requests
          </p>
        </div>

        <div className="admin-grid">
          {/* Patients */}
          <div className="admin-card">
            <div className="card-icon">👤</div>
            <h3>Patients</h3>
            <p>Manage all registered patients.</p>
            <Link to="/admin/patients" className="card-link">Manage Patients →</Link>
          </div>

          {/* Care Centers */}
          <div className="admin-card">
            <div className="card-icon">🏥</div>
            <h3>Care Centers</h3>
            <p>View and manage registered care centers.</p>
            <Link to="/admin/centers" className="card-link">Manage Care Centers →</Link>
          </div>

          {/* Request Management */}
          <div className="admin-card">
            <div className="card-icon">📋</div>
            <h3>Request Management</h3>
            <p>View and manage all active device requests.</p>
            <Link to="/admin/requests" className="card-link">Manage Requests →</Link>
          </div>

          {/* Engineers */}
          <div className="admin-card">
            <div className="card-icon">🔧</div>
            <h3>Engineers</h3>
            <p>View and manage certified engineers.</p>
            <Link to="/admin/engineers" className="card-link">Manage Engineers →</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
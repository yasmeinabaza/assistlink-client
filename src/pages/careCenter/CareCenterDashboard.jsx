import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyRequests, dummyCareCenterStaff } from '../../data/dummyData';
import './CareCenterDashboard.css';

function CareCenterDashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const staff = dummyCareCenterStaff;
  const requests = dummyRequests;

  // Get unique patients
  const patients = [...new Set(requests.map(r => r.patientName))];
  const totalPatients = patients.length;
  const activeRequests = requests.filter(r => r.status !== 'Delivered' && r.status !== 'Rejected').length;

  // Set active tab based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/care-center/requests') {
      setActiveTab('requests');
    } else if (path === '/care-center/patients') {
      setActiveTab('patients');
    } else if (path === '/care-center') {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  // Handle tab change from SideNav
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout 
      userRole="Care Center" 
      userName={staff.name} 
      userEmail="amara.osei@assistlink.com"
      onTabChange={handleTabChange}
    >
      <div className="care-center-dashboard">
        {/* Dashboard View - Information about the center */}
        {activeTab === 'dashboard' && (
          <div className="cc-dashboard-view">
            <div className="cc-header">
              <h1>{staff.careCenter}</h1>
              <p className="cc-stats">Welcome back, {staff.name}</p>
            </div>

            <div className="cc-stats-grid">
              <div className="cc-stat-card">
                <div className="stat-number">{totalPatients}</div>
                <div className="stat-label">Patients</div>
              </div>
              <div className="cc-stat-card">
                <div className="stat-number">{requests.length}</div>
                <div className="stat-label">Total Requests</div>
              </div>
              <div className="cc-stat-card">
                <div className="stat-number">{activeRequests}</div>
                <div className="stat-label">Active Requests</div>
              </div>
              <div className="cc-stat-card">
                <div className="stat-number">{staff.careCenterLocation}</div>
                <div className="stat-label">Location</div>
              </div>
            </div>

            <div className="cc-info-card">
              <h2>About Your Care Center</h2>
              <p>
                {staff.careCenter} is a dedicated rehabilitation facility providing 
                assistive device services to patients in need. Our team works closely 
                with patients, engineers, and healthcare providers to ensure the best 
                outcomes.
              </p>
              <div className="cc-info-actions">
                <Link to="/care-center/requests" className="cc-info-btn">
                  View All Requests
                </Link>
                <Link to="/care-center/patients" className="cc-info-btn secondary">
                  View Patients
                </Link>
              </div>
            </div>

            <div className="cc-recent">
              <h3>Recent Activity</h3>
              <div className="cc-activity-list">
                {requests.slice(0, 3).map(r => (
                  <div key={r.id} className="cc-activity-item">
                    <span className="activity-request">{r.requestNumber}</span>
                    <span className="activity-patient">{r.patientName}</span>
                    <span className={`activity-status ${r.status.toLowerCase().replace(' ', '-')}`}>
                      {r.status}
                    </span>
                    <span className="activity-date">{r.submittedDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Requests View */}
        {activeTab === 'requests' && (
          <div className="cc-tab-view">
            <div className="cc-tab-header">
              <h2>All Requests</h2>
              <p className="cc-tab-stats">{requests.length} total requests</p>
            </div>
            <div className="cc-table-wrapper">
              <table className="cc-table">
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
                  {requests.map(r => (
                    <tr key={r.id}>
                      <td className="cc-req-id">{r.requestNumber}</td>
                      <td>
                        <Link to={`/care-center/patient/${r.patientId}`} className="cc-patient-link">
                          {r.patientName}
                        </Link>
                      </td>
                      <td>{r.deviceType}</td>
                      <td>{r.submittedDate}</td>
                      <td>
                        <span className={`status-badge ${r.status.toLowerCase().replace(' ', '-')}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <Link to={`/care-center/request/${r.id}`} className="cc-btn-view">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Patients View */}
        {activeTab === 'patients' && (
          <div className="cc-tab-view">
            <div className="cc-tab-header">
              <h2>My Patients</h2>
              <p className="cc-tab-stats">{totalPatients} patients</p>
            </div>
            <div className="cc-patients-list">
              {patients.map(name => {
                const patientRequests = requests.filter(r => r.patientName === name);
                const active = patientRequests.filter(r => r.status !== 'Delivered' && r.status !== 'Rejected');
                const patientId = patientRequests[0]?.patientId;

                return (
                  <div key={name} className="cc-patient-card">
                    <div className="cc-patient-info">
                      <Link to={`/care-center/patient/${patientId}`} className="cc-patient-name">
                        <h4>{name}</h4>
                      </Link>
                      <p className="cc-patient-detail">📧 {name.toLowerCase().replace(' ', '.')}@email.com</p>
                      <p className="cc-patient-detail">📍 123 Main St, Nairobi</p>
                    </div>
                    <div className="cc-patient-stats">
                      <span className="cc-stat-badge">{patientRequests.length} requests</span>
                      <span className="cc-stat-badge active">{active.length} active</span>
                      <Link to={`/care-center/patient/${patientId}`} className="cc-btn-view">
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CareCenterDashboard;
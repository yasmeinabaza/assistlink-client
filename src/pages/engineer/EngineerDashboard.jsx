import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyEngineer, dummyEngineerCases } from '../../data/dummyData';
import './EngineerDashboard.css';

function EngineerDashboard() {
  const [search, setSearch] = useState('');
  const engineer = dummyEngineer;
  const cases = dummyEngineerCases;

  const filteredCases = cases.filter(c =>
    c.requestNumber.toLowerCase().includes(search.toLowerCase()) ||
    c.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout userRole="Engineer" userName={engineer.name} userEmail={engineer.email}>
      <div className="engineer-dashboard">
        <div className="engineer-header-row">
          <div>
            <h1>My Cases</h1>
            <p className="engineer-subtitle">Good morning, {engineer.name.split(' ')[0]}.</p>
          </div>
          <input
            type="text"
            placeholder="Search patient or ID..."
            className="engineer-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="engineer-table-wrapper">
          <table className="engineer-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Patient</th>
                <th>Device</th>
                <th>Measurements</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(c => (
                <tr key={c.id}>
                  <td className="eng-req-id">{c.requestNumber}</td>
                  <td>{c.patientName}</td>
                  <td>{c.deviceType}</td>
                  <td>{c.measurements ? 'On file' : 'Pending'}</td>
                  <td>
                    <span className={`status-badge ${c.status.toLowerCase().replace(' ', '-')}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/engineer/case/${c.id}`} className="eng-btn-view">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default EngineerDashboard;
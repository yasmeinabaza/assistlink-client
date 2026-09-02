import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyAdmin, dummyRequests } from '../../data/dummyData';
import './AllRequests.css';

function AllRequests() {
  const admin = dummyAdmin;
  const requests = dummyRequests;

  return (
    <Layout userRole="Administrator" userName={admin.name} userEmail={admin.email}>
      <div className="all-requests">
        <div className="ar-header">
          <h1>All Requests</h1>
          <p className="ar-stats">{requests.length} total requests</p>
        </div>

        <div className="ar-controls">
          <input
            type="text"
            placeholder="Search requests..."
            className="ar-search"
          />
        </div>

        <div className="ar-table-wrapper">
          <table className="ar-table">
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
                  <td className="ar-req-id">{r.requestNumber}</td>
                  <td>
                    <Link to={`/care-center/patient/${r.patientId}`} className="ar-patient-link">
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
                    <Link to={`/care-center/request/${r.id}`} className="ar-btn-view">
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

export default AllRequests;
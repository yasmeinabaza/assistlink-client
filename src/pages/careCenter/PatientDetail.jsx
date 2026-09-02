import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyRequests, dummyCareCenterStaff } from '../../data/dummyData';
import './PatientDetail.css';

function PatientDetail() {
  const { id } = useParams();
  const patientId = parseInt(id);
  const staff = dummyCareCenterStaff;

  // Get all requests for this patient
  const patientRequests = dummyRequests.filter(r => r.patientId === patientId);
  const patientName = patientRequests.length > 0 ? patientRequests[0].patientName : 'Unknown Patient';

  // Get patient info from first request
  const patientInfo = patientRequests.length > 0 ? {
    email: patientName.toLowerCase().replace(' ', '.') + '@email.com',
    phone: '+254 712 345 678',
    address: '14 Maple Avenue, Apt 2B, Nairobi 00100',
    dob: '1985-03-14',
    registered: '2025-01-10'
  } : null;

  const statusOrder = ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Delivered'];

  if (patientRequests.length === 0) {
    return (
      <Layout userRole="Care Center" userName={staff.name} userEmail="amara.osei@assistlink.com">
        <div className="patient-detail">
          <Link to="/care-center" className="back-link">← Back to Patients</Link>
          <div className="not-found">Patient not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout userRole="Care Center" userName={staff.name} userEmail="amara.osei@assistlink.com">
      <div className="patient-detail">
        <Link to="/care-center" className="back-link">← Back to Patients</Link>

        <div className="patient-detail-header">
          <h1>{patientName}</h1>
          <p className="patient-detail-subtitle">Patient Information</p>
        </div>

        <div className="patient-detail-grid">
          {/* Left - Patient Info */}
          <div className="patient-detail-left">
            <div className="info-card">
              <h3>Personal Information</h3>
              <div className="info-row"><strong>DOB:</strong> {patientInfo.dob}</div>
              <div className="info-row">📧 {patientInfo.email}</div>
              <div className="info-row">📞 {patientInfo.phone}</div>
              <div className="info-row">📍 {patientInfo.address}</div>
              <div className="info-row"><strong>Registered:</strong> {patientInfo.registered}</div>
            </div>

            <div className="info-card">
              <h3>Requests ({patientRequests.length})</h3>
              {patientRequests.map(request => {
                const currentStep = statusOrder.indexOf(request.status) + 1;
                const progressWidth = (currentStep / statusOrder.length) * 100;

                return (
                  <div key={request.id} className="request-item">
                    <div className="request-item-header">
                      <span className="request-number">{request.requestNumber}</span>
                      <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="request-device">{request.deviceType}</p>
                    <p className="request-area">{request.affectedArea || 'Not specified'} · Submitted {request.submittedDate}</p>
                    <p className="request-notes">{request.notes}</p>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${progressWidth}%` }} />
                    </div>
                    <Link to={`/care-center/request/${request.id}`} className="btn-review">
                      Review Request
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Measurements */}
          <div className="patient-detail-right">
            <div className="info-card">
              <h3>Patient Measurements</h3>
              {patientRequests.some(r => r.measurements) ? (
                <div className="measurements-display">
                  <div className="measurement-row">
                    <span className="measurement-label">Height</span>
                    <span className="measurement-value">165 cm</span>
                  </div>
                  <div className="measurement-row">
                    <span className="measurement-label">Weight</span>
                    <span className="measurement-value">72 kg</span>
                  </div>
                  <div className="measurement-row">
                    <span className="measurement-label">Limb Length</span>
                    <span className="measurement-value">45 cm</span>
                  </div>
                  <div className="measurement-row">
                    <span className="measurement-label">Circumference</span>
                    <span className="measurement-value">38 cm</span>
                  </div>
                </div>
              ) : (
                <p className="no-measurements">No measurements on file yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PatientDetail;
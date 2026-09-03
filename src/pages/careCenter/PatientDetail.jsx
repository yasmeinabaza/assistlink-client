// Import React hooks and components
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getRequestById, getRequestsByPatient } from '../../services/api';
import './PatientDetail.css';

function PatientDetail() {
  // useParams gets the 'id' from URL: /care-center/patient/:id
  const { id } = useParams();
  const patientId = parseInt(id);
  
  // State variables
  const [patient, setPatient] = useState(null);
  const [patientRequests, setPatientRequests] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch patient data when component mounts
  useEffect(() => {
    if (id && user) {
      fetchPatientData();
    }
  }, [id, user]);

  // Function to fetch patient details and their requests
  const fetchPatientData = async () => {
    try {
      setLoading(true);
      
      // First, get all requests for this patient
      const requestsData = await getRequestsByPatient(patientId);
      setPatientRequests(requestsData);
      
      // Get patient info from the first request
      if (requestsData.length > 0) {
        setPatient({
          id: patientId,
          name: requestsData[0].patient_name,
          email: requestsData[0].patient_email,
          phone: requestsData[0].patient_phone,
          // You might need to fetch more patient details from a separate endpoint
        });
      } else {
        // If no requests, we need to get patient info from users endpoint
        // For now, set basic info
        setPatient({
          id: patientId,
          name: 'Patient',
          email: '',
          phone: ''
        });
      }
      
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch patient data');
    } finally {
      setLoading(false);
    }
  };

  // Status order for progress bar
  const statusOrder = ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Delivered'];

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
        <div className="patient-detail">
          <div className="loading-text">Loading patient data...</div>
        </div>
      </Layout>
    );
  }

  // Show error state
  if (error) {
    return (
      <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
        <div className="patient-detail">
          <Link to="/care-center" className="back-link">← Back to Patients</Link>
          <div className="error-text">Error: {error}</div>
          <button onClick={fetchPatientData}>Retry</button>
        </div>
      </Layout>
    );
  }

  // Show not found state
  if (!patient || patientRequests.length === 0) {
    return (
      <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
        <div className="patient-detail">
          <Link to="/care-center" className="back-link">← Back to Patients</Link>
          <div className="not-found">Patient not found or has no requests</div>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Care Center" userName={user?.name || 'Staff'} userEmail={user?.email || ''}>
      <div className="patient-detail">
        {/* Back button */}
        <Link to="/care-center" className="back-link">← Back to Patients</Link>

        {/* Patient Header */}
        <div className="patient-detail-header">
          <h1>{patient.name}</h1>
          <p className="patient-detail-subtitle">Patient Information</p>
        </div>

        <div className="patient-detail-grid">
          {/* ============================================ */}
          {/* LEFT COLUMN - Patient Info & Requests */}
          {/* ============================================ */}
          <div className="patient-detail-left">
            {/* Personal Information */}
            <div className="info-card">
              <h3>Personal Information</h3>
              <div className="info-row"><strong>Name:</strong> {patient.name}</div>
              <div className="info-row">📧 {patient.email || 'N/A'}</div>
              <div className="info-row">📞 {patient.phone || 'N/A'}</div>
              <div className="info-row"><strong>Patient ID:</strong> {patient.id}</div>
            </div>

            {/* Requests List */}
            <div className="info-card">
              <h3>Requests ({patientRequests.length})</h3>
              {patientRequests.map(request => {
                // Calculate progress for each request
                const currentStep = statusOrder.indexOf(request.status) + 1;
                const progressWidth = (currentStep / statusOrder.length) * 100;

                return (
                  <div key={request.id} className="request-item">
                    <div className="request-item-header">
                      <span className="request-number">{request.request_number}</span>
                      <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="request-device">{request.device_type}</p>
                    <p className="request-area">
                      {request.affected_area || 'Not specified'} · Submitted {request.submitted_date}
                    </p>
                    <p className="request-notes">{request.notes || 'No notes'}</p>
                    
                    {/* Progress bar */}
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

          {/* ============================================ */}
          {/* RIGHT COLUMN - Measurements */}
          {/* ============================================ */}
          <div className="patient-detail-right">
            <div className="info-card">
              <h3>Patient Measurements</h3>
              {/* Check if any request has measurements */}
              {patientRequests.some(r => r.height || r.weight) ? (
                <div className="measurements-display">
                  {/* Show measurements from the first request that has them */}
                  {patientRequests.map(r => {
                    if (r.height || r.weight) {
                      return (
                        <div key={r.id}>
                          <p className="measurement-request">{r.request_number}</p>
                          <div className="measurement-row">
                            <span className="measurement-label">Height</span>
                            <span className="measurement-value">{r.height || 'N/A'} cm</span>
                          </div>
                          <div className="measurement-row">
                            <span className="measurement-label">Weight</span>
                            <span className="measurement-value">{r.weight || 'N/A'} kg</span>
                          </div>
                          {r.limb_length && (
                            <div className="measurement-row">
                              <span className="measurement-label">Limb Length</span>
                              <span className="measurement-value">{r.limb_length} cm</span>
                            </div>
                          )}
                          {r.circumference && (
                            <div className="measurement-row">
                              <span className="measurement-label">Circumference</span>
                              <span className="measurement-value">{r.circumference} cm</span>
                            </div>
                          )}
                          {r.additional_notes && (
                            <p className="measurement-notes"><strong>Notes:</strong> {r.additional_notes}</p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
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
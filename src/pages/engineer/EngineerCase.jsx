// Import React hooks and components
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getRequestById, updateRequestStatus } from '../../services/api';
import './EngineerCase.css';

function EngineerCase() {
  // useParams gets the 'id' from URL: /engineer/case/:id
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State variables
  const [caseItem, setCaseItem] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch case data when component mounts
  useEffect(() => {
    if (id && user) {
      fetchCase();
    }
  }, [id, user]);

  // Function to fetch case details from backend
  const fetchCase = async () => {
    try {
      setLoading(true);
      const data = await getRequestById(id);
      setCaseItem(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch case');
    } finally {
      setLoading(false);
    }
  };

  // Handle starting work on a case (Approved -> In Progress)
  const handleStartWork = async () => {
    setSubmitting(true);
    try {
      await updateRequestStatus(id, { status: 'In Progress' });
      alert(`Case ${caseItem.request_number} is now in progress.`);
      navigate('/engineer');
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle marking case as delivered (In Progress -> Delivered)
  const handleDeliver = async () => {
    if (window.confirm(`Mark ${caseItem.request_number} as delivered?`)) {
      setSubmitting(true);
      try {
        await updateRequestStatus(id, { status: 'Delivered' });
        alert(`Case ${caseItem.request_number} marked as delivered!`);
        navigate('/engineer');
      } catch (err) {
        alert(err.message || 'Failed to update status');
      } finally {
        setSubmitting(false);
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Engineer" userName={user?.name || 'Engineer'} userEmail={user?.email || ''}>
        <div className="engineer-case-page">
          <div className="loading-text">Loading case details...</div>
        </div>
      </Layout>
    );
  }

  // Show error or not found state
  if (error || !caseItem) {
    return (
      <Layout userRole="Engineer" userName={user?.name || 'Engineer'} userEmail={user?.email || ''}>
        <div className="engineer-case-page">
          <div className="not-found">Case not found</div>
          <Link to="/engineer" className="back-link">← Back to Cases</Link>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Engineer" userName={user?.name || 'Engineer'} userEmail={user?.email || ''}>
      <div className="engineer-case-page">
        {/* Back button */}
        <Link to="/engineer" className="back-link">← Back to Cases</Link>

        {/* Case Header with Status Badge */}
        <div className="case-header">
          <div>
            <h1>{caseItem.request_number}</h1>
            <p className="case-subtitle">{caseItem.device_type} · {caseItem.patient_name}</p>
          </div>
          <span className={`status-badge ${caseItem.status.toLowerCase().replace(' ', '-')}`}>
            {caseItem.status}
          </span>
        </div>

        <div className="case-grid">
          {/* ============================================ */}
          {/* LEFT COLUMN - Case Information */}
          {/* ============================================ */}
          <div className="case-main">
            {/* Production Status Steps */}
            <div className="info-card">
              <h3>Production Status</h3>
              <div className="status-steps">
                <span className={`step ${caseItem.status === 'Approved' || caseItem.status === 'In Progress' || caseItem.status === 'Delivered' ? 'active' : ''}`}>
                  Assessment
                </span>
                <span className={`step ${caseItem.status === 'In Progress' || caseItem.status === 'Delivered' ? 'active' : ''}`}>
                  Production
                </span>
                <span className={`step ${caseItem.status === 'Delivered' ? 'active' : ''}`}>
                  Ready
                </span>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="info-card">
              <h3>Delivery Information</h3>
              <div className="delivery-row"><strong>Patient:</strong> {caseItem.patient_name}</div>
              <div className="delivery-row"><strong>Delivery Address:</strong> 14 Maple Avenue, Apt 2B, Nairobi 00100</div>
              <div className="delivery-row"><strong>Expected Delivery:</strong> May 12–15, 2025</div>
              <div className="delivery-row"><strong>Delivery Status:</strong> Awaiting dispatch</div>
            </div>

            {/* Measurements if available */}
            {caseItem.height && (
              <div className="info-card">
                <h3>Measurements</h3>
                <div className="measurements-grid">
                  {caseItem.height && <span>Height: {caseItem.height} cm</span>}
                  {caseItem.weight && <span>Weight: {caseItem.weight} kg</span>}
                  {caseItem.limb_length && <span>Limb Length: {caseItem.limb_length} cm</span>}
                  {caseItem.circumference && <span>Circumference: {caseItem.circumference} cm</span>}
                </div>
                {caseItem.additional_notes && (
                  <p className="measurement-notes"><strong>Notes:</strong> {caseItem.additional_notes}</p>
                )}
              </div>
            )}

            {/* Patient Notes */}
            <div className="info-card">
              <h3>Patient Notes</h3>
              <p className="notes-text">{caseItem.notes || 'No notes provided.'}</p>
            </div>
          </div>

          {/* ============================================ */}
          {/* RIGHT COLUMN - Actions */}
          {/* ============================================ */}
          <div className="case-sidebar">
            <div className="action-card">
              <h3>Update Status</h3>
              
              {/* Show different buttons based on current status */}
              {caseItem.status === 'Approved' && (
                <button className="btn-start" onClick={handleStartWork} disabled={submitting}>
                  {submitting ? 'Processing...' : 'Mark as Ready for Delivery'}
                </button>
              )}

              {caseItem.status === 'In Progress' && (
                <button className="btn-deliver" onClick={handleDeliver} disabled={submitting}>
                  {submitting ? 'Processing...' : 'Mark as Delivered'}
                </button>
              )}

              {caseItem.status === 'Delivered' && (
                <div className="delivered-message">✓ This case has been delivered.</div>
              )}

              {caseItem.status === 'Submitted' || caseItem.status === 'Under Review' && (
                <div className="pending-message">⏳ Awaiting approval from care center.</div>
              )}

              {/* Device Information */}
              <div className="device-info">
                <h4>Device</h4>
                <p className="device-name">Ossur Proprio Foot</p>
                <p className="device-manufacturer">Ossur Americas, Inc.</p>
                <p className="device-id">00811632010017</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EngineerCase;
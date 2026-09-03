// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { getRequestById, addMeasurements } from '../../services/api';
import './RequestDetails.css';

function RequestDetails() {
  // useParams gets the 'id' from URL: /patient/request/:id
  const { id } = useParams();
  
  // State variables
  const [request, setRequest] = useState(null);          // Request data
  const [user, setUser] = useState(null);                // Logged-in user
  const [loading, setLoading] = useState(true);          // Loading state
  const [error, setError] = useState(null);              // Error state
  const [showForm, setShowForm] = useState(false);       // Show/hide measurements form
  const [submitted, setSubmitted] = useState(false);     // Whether measurements already submitted
  const [measurements, setMeasurements] = useState({     // Measurements form data
    height: '',
    weight: '',
    limbLength: '',
    circumference: '',
    additionalNotes: ''
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // Get user from localStorage (like course demo)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch request when component mounts or ID changes
  useEffect(() => {
    if (id) {
      fetchRequest();
    }
  }, [id]);

  // Function to fetch request details from backend
  const fetchRequest = async () => {
    try {
      setLoading(true);
      const data = await getRequestById(id);
      setRequest(data);
      // Check if measurements already exist
      if (data.height || data.weight) {
        setSubmitted(true);
      }
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch request');
    } finally {
      setLoading(false);
    }
  };

  // Handle measurements form input changes
  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({ ...prev, [name]: value }));
  };

  // Handle measurements form submission
  const handleSubmitMeasurements = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!measurements.height || !measurements.weight || !measurements.limbLength || !measurements.circumference) {
      alert('Please fill in all required fields.');
      return;
    }

    setSubmitLoading(true);
    try {
      // Send measurements to backend
      await addMeasurements(id, measurements);
      setSubmitted(true);
      setShowForm(false);
      alert('Measurements submitted successfully!');
      fetchRequest(); // Refresh to get updated status
    } catch (error) {
      alert(error.message || 'Failed to submit measurements');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Status order for progress bar
  const statusOrder = ['Submitted', 'Under Review', 'Approved', 'In Progress', 'Delivered'];
  const currentStep = request ? statusOrder.indexOf(request.status) + 1 : 0;
  const progressWidth = (currentStep / statusOrder.length) * 100;

  // Show loading state
  if (loading) {
    return (
      <Layout userRole="Patient" userName={user?.name || 'Patient'} userEmail={user?.email || ''}>
        <div className="request-details-page">
          <div className="loading-text">Loading request details...</div>
        </div>
      </Layout>
    );
  }

  // Show error or not found state
  if (error || !request) {
    return (
      <Layout userRole="Patient" userName={user?.name || 'Patient'} userEmail={user?.email || ''}>
        <div className="request-details-page">
          <div className="not-found">Request not found</div>
          <Link to="/patient" className="btn-primary">Back to Dashboard</Link>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Patient" userName={user?.name || 'Patient'} userEmail={user?.email || ''}>
      <div className="request-details-page">
        {/* Back button */}
        <Link to="/patient" className="back-link">← Back to Dashboard</Link>

        {/* Request header with status badge */}
        <div className="details-header">
          <h1>{request.request_number}</h1>
          <span className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
            {request.status}
          </span>
        </div>
        <p className="details-submitted">Submitted {request.submitted_date}</p>

        <div className="details-grid">
          {/* Left Column - Main Content */}
          <div className="details-main">
            {/* Progress Card */}
            <div className="progress-card">
              <h3>Progress</h3>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progressWidth}%` }} />
              </div>
              <div className="progress-labels">
                {statusOrder.map((step, idx) => (
                  <span key={step} className={idx < currentStep ? 'done' : ''}>
                    {idx + 1}. {step}
                  </span>
                ))}
              </div>
              <p className="status-message">{request.status}</p>
            </div>

            {/* Measurements Form - Show if Approved and not submitted */}
            {request.status === 'Approved' && !submitted && (
              <div className="measurements-card">
                {!showForm ? (
                  // Show "Add Measurements" button
                  <div className="measurements-prompt">
                    <h3>Ready for Measurements</h3>
                    <p>Your request has been approved. Please provide your measurements.</p>
                    <button onClick={() => setShowForm(true)} className="btn-primary">
                      Add Measurements
                    </button>
                  </div>
                ) : (
                  // Show measurements form
                  <form onSubmit={handleSubmitMeasurements} className="measurements-form">
                    <h3>Provide Your Measurements</h3>
                    <p className="form-hint">Please fill in your measurements so the engineer can begin.</p>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Height (cm) *</label>
                        <input
                          type="number"
                          name="height"
                          value={measurements.height}
                          onChange={handleMeasurementChange}
                          placeholder="e.g. 165"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Weight (kg) *</label>
                        <input
                          type="number"
                          name="weight"
                          value={measurements.weight}
                          onChange={handleMeasurementChange}
                          placeholder="e.g. 72"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Limb Length (cm) *</label>
                        <input
                          type="number"
                          name="limbLength"
                          value={measurements.limbLength}
                          onChange={handleMeasurementChange}
                          placeholder="e.g. 45"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Circumference (cm) *</label>
                        <input
                          type="number"
                          name="circumference"
                          value={measurements.circumference}
                          onChange={handleMeasurementChange}
                          placeholder="e.g. 38"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Additional Notes</label>
                      <textarea
                        name="additionalNotes"
                        rows="2"
                        value={measurements.additionalNotes}
                        onChange={handleMeasurementChange}
                        placeholder="Any additional information for the engineer..."
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-submit" disabled={submitLoading}>
                        {submitLoading ? 'Submitting...' : 'Submit Measurements'}
                      </button>
                      <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Show submitted measurements */}
            {submitted && (
              <div className="measurements-submitted">
                <h3>✓ Measurements Submitted</h3>
                <div className="measurements-display">
                  <span>Height: {request.height || measurements.height} cm</span>
                  <span>Weight: {request.weight || measurements.weight} kg</span>
                  <span>Limb Length: {request.limb_length || measurements.limbLength} cm</span>
                  <span>Circumference: {request.circumference || measurements.circumference} cm</span>
                  {(request.additional_notes || measurements.additionalNotes) && (
                    <span className="note-text">Notes: {request.additional_notes || measurements.additionalNotes}</span>
                  )}
                </div>
              </div>
            )}

            {/* Request Information */}
            <div className="info-card">
              <h3>Request Information</h3>
              <div className="info-row"><strong>Device Type:</strong> {request.device_type}</div>
              <div className="info-row"><strong>Reason:</strong> {request.reason}</div>
              <div className="info-row"><strong>Affected Area:</strong> {request.affected_area || 'Not specified'}</div>
              <div className="info-row"><strong>Care Center:</strong> {request.care_center_name}</div>
              <div className="info-row"><strong>Your Notes:</strong> {request.notes || 'No notes'}</div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="details-sidebar">
            <div className="info-card">
              <h3>Delivery Address</h3>
              <p className="address-text">14 Maple Avenue, Apt 2B, Nairobi 00100</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RequestDetails;
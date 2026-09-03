// Import React hooks and components
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
// Import API functions
import { createRequest, getCareCenters } from '../../services/api';
import './NewRequest.css';

function NewRequest() {
  // useNavigate for programmatic navigation after form submit
  const navigate = useNavigate();
  
  // State variables
  const [user, setUser] = useState(null);              // Logged-in user
  const [careCenters, setCareCenters] = useState([]);   // List of care centers
  const [loading, setLoading] = useState(false);        // Form submission loading
  const [formData, setFormData] = useState({           // Form field values
    deviceType: '',
    reason: '',
    affectedArea: '',
    notes: '',
    careCenterId: ''
  });
  const [errors, setErrors] = useState({});             // Validation errors

  // Device and reason options for dropdowns
  const deviceOptions = ['Prosthetic Limb', 'Orthotic Device', 'Wheelchair', 'Hearing Aid', 'Vision Aid', 'Other'];
  const reasonOptions = ['New Device', 'Replacement', 'Adjustment', 'Repair', 'Upgrade'];

  // Get user from localStorage (like course demo)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Auto-fill care center if user already has one
      if (userData.careCenterId) {
        setFormData(prev => ({ ...prev, careCenterId: userData.careCenterId }));
      }
    }
  }, []);

  // Fetch care centers from backend when component mounts
  useEffect(() => {
    const fetchCareCenters = async () => {
      try {
        const data = await getCareCenters();
        setCareCenters(data);
      } catch (error) {
        console.error('Error fetching care centers:', error);
      }
    };
    fetchCareCenters();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form before submitting
  const validate = () => {
    const newErrors = {};
    if (!formData.deviceType) newErrors.deviceType = 'Please select a device type';
    if (!formData.reason) newErrors.reason = 'Please select a reason';
    if (!formData.careCenterId) newErrors.careCenterId = 'Please select a care center';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page refresh
    
    // Validate form
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Prepare data for API call
      const requestData = {
        patientId: user.id,
        careCenterId: parseInt(formData.careCenterId),
        deviceType: formData.deviceType,
        reason: formData.reason,
        affectedArea: formData.affectedArea,
        notes: formData.notes
      };

      // Send request to backend
      const result = await createRequest(requestData);
      alert(`Request ${result.request_number} submitted successfully!`);
      navigate('/patient'); // Redirect to dashboard
    } catch (error) {
      alert(error.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  // Show message if user not logged in
  if (!user) {
    return (
      <Layout userRole="Patient" userName="Patient" userEmail="">
        <div className="new-request-page">
          <p>Please login to submit a request.</p>
        </div>
      </Layout>
    );
  }

  // Main render
  return (
    <Layout userRole="Patient" userName={user.name} userEmail={user.email}>
      <div className="new-request-page">
        {/* Back button to dashboard */}
        <Link to="/patient" className="back-link">← Back</Link>

        <div className="request-form-grid">
          {/* Left Column - Form */}
          <div className="form-column">
            <h1>Submit a Device Request</h1>
            <p className="form-subtitle">
              Your request will be sent to your care center for review.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Device Type Dropdown */}
              <div className="form-group">
                <label>Device Type *</label>
                <select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleChange}
                  className={errors.deviceType ? 'error' : ''}
                >
                  <option value="">Select device type...</option>
                  {deviceOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.deviceType && <span className="error-text">{errors.deviceType}</span>}
              </div>

              {/* Reason Dropdown */}
              <div className="form-group">
                <label>Reason *</label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className={errors.reason ? 'error' : ''}
                >
                  <option value="">Select reason...</option>
                  {reasonOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.reason && <span className="error-text">{errors.reason}</span>}
              </div>

              {/* Affected Area Input */}
              <div className="form-group">
                <label>Affected Area</label>
                <input
                  type="text"
                  name="affectedArea"
                  value={formData.affectedArea}
                  onChange={handleChange}
                  placeholder="e.g. Left leg, below knee"
                />
              </div>

              {/* Care Center Dropdown */}
              <div className="form-group">
                <label>Care Center *</label>
                <select
                  name="careCenterId"
                  value={formData.careCenterId}
                  onChange={handleChange}
                  className={errors.careCenterId ? 'error' : ''}
                >
                  <option value="">Select care center...</option>
                  {careCenters.map(center => (
                    <option key={center.id} value={center.id}>
                      {center.name} - {center.location}
                    </option>
                  ))}
                </select>
                {errors.careCenterId && <span className="error-text">{errors.careCenterId}</span>}
              </div>

              {/* Notes Textarea */}
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  rows="4"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Include any relevant details about your condition or preferences."
                />
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
                <Link to="/patient" className="btn-cancel">Cancel</Link>
              </div>
            </form>
          </div>

          {/* Right Column - Sidebar */}
          <div className="form-sidebar">
            <div className="info-card">
              <h4>Request Sent To</h4>
              <p className="info-name">{user.careCenterName || 'Your care center'}</p>
              <p className="info-location">{user.careCenterLocation || ''}</p>
            </div>

            <div className="info-card">
              <div className="info-header">
                <h4>Delivery To</h4>
                <button className="btn-edit">Edit address</button>
              </div>
              <p className="info-address">14 Maple Avenue, Apt 2B, Nairobi 00100</p>
            </div>

            <div className="info-card next-step">
              <h4>Next step:</h4>
              <p>After your request is approved, you will be asked to provide measurements so the engineer can begin work.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewRequest;
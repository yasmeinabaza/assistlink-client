import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dummyUser } from '../../data/dummyData';

function NewRequest() {
  const navigate = useNavigate();
  const user = dummyUser;
  
  const [formData, setFormData] = useState({
    deviceType: '',
    reason: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const deviceOptions = ['Prosthetic Limb', 'Orthotic Device', 'Wheelchair', 'Hearing Aid', 'Vision Aid', 'Other'];
  const reasonOptions = ['New Device', 'Replacement', 'Adjustment', 'Repair', 'Upgrade'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => { //if user didn't fill the form info
    const newErrors = {};
    if (!formData.deviceType) newErrors.deviceType = 'Please select a device type';
    if (!formData.reason) newErrors.reason = 'Please select a reason';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    console.log('Submitting request:', formData);
    alert('Request submitted successfully!');
    navigate('/patient');
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-8">
          <Link to="/patient" className="btn btn-outline-secondary btn-sm mb-3">← Back</Link>
          
          <h3 className="fw-bold">New Device Request</h3>
          <p className="text-muted">Your request will be sent to {user.careCenter} for review.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Device Type <span className="text-danger">*</span></label>
              
              <select
                className={`form-select ${errors.deviceType ? 'is-invalid' : ''}`}
                name="deviceType"
                value={formData.deviceType}
                onChange={handleChange}
              >
                <option value="">Select device type...</option>
                {deviceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}

              </select>
              {errors.deviceType && <div className="invalid-feedback">{errors.deviceType}</div>}
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Reason <span className="text-danger">*</span></label>
              
              <select
                className={`form-select ${errors.reason ? 'is-invalid' : ''}`}
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              >
                <option value="">Select reason...</option>
                {reasonOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}

              </select>
              {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Notes</label>
              
              <textarea
                className="form-control"
                name="notes"
                rows="4"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any relevant details about your condition or preferences."
              ></textarea>
              
            </div>
            
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success px-4">Submit Request</button>
              <Link to="/patient" className="btn btn-outline-secondary">Cancel</Link>
            </div>
          </form>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h6 className="fw-bold">Request Sent To</h6>
              <p className="mb-0 fw-semibold">{user.careCenter}</p>
              <p className="text-muted small">{user.careCenterLocation}</p>
            </div>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="fw-bold">Delivery To</h6>
              <p className="text-muted small mb-0">{user.deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRequest;
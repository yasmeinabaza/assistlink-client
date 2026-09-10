import { useState } from 'react';

function MeasurementsForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    limbLength: '',
    circumference: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.height) newErrors.height = 'Height is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    if (!formData.limbLength) newErrors.limbLength = 'Limb length is required';
    if (!formData.circumference) newErrors.circumference = 'Circumference is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h6 className="fw-bold">Provide Your Measurements</h6>
        <p className="text-muted small">
          Your request has been approved. Please fill in your measurements so the engineer can begin the assessment.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Height (cm) *</label>
              <input
                type="number"
                className={`form-control ${errors.height ? 'is-invalid' : ''}`}
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="e.g. 165"
              />
              {errors.height && <div className="invalid-feedback">{errors.height}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Weight (kg) *</label>
              <input
                type="number"
                className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 72"
              />
              {errors.weight && <div className="invalid-feedback">{errors.weight}</div>}
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Limb Length (cm) *</label>
              <input
                type="number"
                className={`form-control ${errors.limbLength ? 'is-invalid' : ''}`}
                name="limbLength"
                value={formData.limbLength}
                onChange={handleChange}
                placeholder="e.g. 45"
              />
              {errors.limbLength && <div className="invalid-feedback">{errors.limbLength}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Circumference (cm) *</label>
              <input
                type="number"
                className={`form-control ${errors.circumference ? 'is-invalid' : ''}`}
                name="circumference"
                value={formData.circumference}
                onChange={handleChange}
                placeholder="e.g. 38"
              />
              {errors.circumference && <div className="invalid-feedback">{errors.circumference}</div>}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Additional Notes</label>
            <textarea
              className="form-control"
              name="additionalNotes"
              rows="2"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any additional information for the engineer..."
            ></textarea>
          </div>
          
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              Submit Measurements
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MeasurementsForm;
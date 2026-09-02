import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyAdmin } from '../../data/dummyData';
import './AddCareCenter.css';

function AddCareCenter() {
  const navigate = useNavigate();
  const admin = dummyAdmin;

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
    address: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Center name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert('Care center added successfully! (Demo)');
    navigate('/admin/centers');
  };

  return (
    <Layout userRole="Administrator" userName={admin.name} userEmail={admin.email}>
      <div className="add-carecenter">
        <div className="ac-header">
          <Link to="/admin/centers" className="ac-back-link">← Back to Care Centers</Link>
          <h1>Add Care Center</h1>
          <p className="ac-subtitle">Register a new care center.</p>
        </div>

        <form onSubmit={handleSubmit} className="ac-form">
          <div className="ac-form-grid">
            <div className="ac-form-left">
              <div className="ac-form-group">
                <label>Center Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter care center name"
                />
                {errors.name && <span className="ac-error">{errors.name}</span>}
              </div>

              <div className="ac-form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={errors.location ? 'error' : ''}
                  placeholder="Enter city/location"
                />
                {errors.location && <span className="ac-error">{errors.location}</span>}
              </div>

              <div className="ac-form-row">
                <div className="ac-form-group">
                  <label>Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <span className="ac-error">{errors.phone}</span>}
                </div>
                <div className="ac-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="ac-form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter street address"
                />
              </div>
            </div>

            <div className="ac-form-right">
              <div className="ac-form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description of the care center..."
                />
              </div>
            </div>
          </div>

          <div className="ac-form-actions">
            <button type="submit" className="ac-btn-submit">Add Care Center</button>
            <Link to="/admin/centers" className="ac-btn-cancel">Cancel</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddCareCenter;
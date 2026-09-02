import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { dummyAdmin, dummyCareCenters } from '../../data/dummyData';
import './AddPatient.css';

function AddPatient() {
  const navigate = useNavigate();
  const admin = dummyAdmin;
  const careCenters = dummyCareCenters;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    careCenter: '',
    address: '',
    city: '',
    postcode: '',
    password: '',
    confirmPassword: ''
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
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.careCenter) newErrors.careCenter = 'Please select a care center';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert('Patient added successfully! (Demo)');
    navigate('/admin/patients');
  };

  return (
    <Layout userRole="Administrator" userName={admin.name} userEmail={admin.email}>
      <div className="add-patient">
        <div className="ap-header">
          <Link to="/admin/patients" className="ap-back-link">← Back to Patients</Link>
          <h1>Add New Patient</h1>
          <p className="ap-subtitle">Create a new patient account.</p>
        </div>

        <form onSubmit={handleSubmit} className="ap-form">
          <div className="ap-form-grid">
            {/* Left Column */}
            <div className="ap-form-left">
              <div className="ap-form-section">
                <h3>Personal Information</h3>
                <div className="ap-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter full name"
                  />
                  {errors.name && <span className="ap-error">{errors.name}</span>}
                </div>

                <div className="ap-form-row">
                  <div className="ap-form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter email address"
                    />
                    {errors.email && <span className="ap-error">{errors.email}</span>}
                  </div>
                  <div className="ap-form-group">
                    <label>Phone *</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <span className="ap-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="ap-form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={errors.dateOfBirth ? 'error' : ''}
                  />
                  {errors.dateOfBirth && <span className="ap-error">{errors.dateOfBirth}</span>}
                </div>
              </div>

              <div className="ap-form-section">
                <h3>Care Center Assignment</h3>
                <div className="ap-form-group">
                  <label>Care Center *</label>
                  <select
                    name="careCenter"
                    value={formData.careCenter}
                    onChange={handleChange}
                    className={errors.careCenter ? 'error' : ''}
                  >
                    <option value="">Select a care center...</option>
                    {careCenters.map(c => (
                      <option key={c.id} value={c.name}>{c.name} - {c.location}</option>
                    ))}
                  </select>
                  {errors.careCenter && <span className="ap-error">{errors.careCenter}</span>}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="ap-form-right">
              <div className="ap-form-section">
                <h3>Delivery Address</h3>
                <div className="ap-form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter street address"
                  />
                </div>
                <div className="ap-form-row">
                  <div className="ap-form-group">
                    <label>City / Town</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="ap-form-group">
                    <label>Postcode</label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="Enter postcode"
                    />
                  </div>
                </div>
              </div>

              <div className="ap-form-section">
                <h3>Account Security</h3>
                <div className="ap-form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Enter password"
                  />
                  {errors.password && <span className="ap-error">{errors.password}</span>}
                </div>
                <div className="ap-form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <span className="ap-error">{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="ap-form-actions">
            <button type="submit" className="ap-btn-submit">Add Patient</button>
            <Link to="/admin/patients" className="ap-btn-cancel">Cancel</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddPatient;